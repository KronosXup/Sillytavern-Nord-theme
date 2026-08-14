/* Nord-Contour SCSS 构建链：src/parts/*.scss -> sass 编译 -> 纹理/logo 注入 -> Material 图标包 -> 语义对账 -> 写回 JSON
 * 用法:
 *   node scripts/build.js           构建并写入 themes/Contour-Nord.json（对账失败拒绝写）
 *   node scripts/build.js --verify  只对账不写入（拿现产物当基准；实际会先构建再比）
 *   node scripts/build.js --force   跳过对账直接写（有意改样式时用）
 * 环境变量:
 *   MS_SVG_BASE   Material Symbols svg 目录（默认 ../node_modules/@material-symbols/svg-400/sharp/）
 */
const fs = require('fs');
const path = require('path');
const sass = require('sass');
const { execFileSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'themes', 'Contour-Nord.json');

const WRITE = !process.argv.includes('--verify');
const FORCE = process.argv.includes('--force');

/* ---------- 纹理 / logo 的 SVG data-uri 生成器（从 build-nord-contour.js 抽来，逻辑原样） ---------- */
const makeSmooth = (cx, cy, r, seed) => {
  const w = [1.0, 1.08, 0.93, 1.06, 0.95, 1.09, 0.92, 1.07, 0.96, 1.08, 0.94, 1.05, 0.97, 1.06, 0.93, 1.04];
  const n = 16;
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const rr = r * w[(i + seed) % n];
    pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
  }
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)} `;
  for (let i = 0; i < n; i++) {
    const c1x = pts[i][0] + (pts[(i+1)%n][0] - pts[(i-1+n)%n][0]) / 6;
    const c1y = pts[i][1] + (pts[(i+1)%n][1] - pts[(i-1+n)%n][1]) / 6;
    const c2x = pts[(i+1)%n][0] - (pts[(i+2)%n][0] - pts[i][0]) / 6;
    const c2y = pts[(i+1)%n][1] - (pts[(i+2)%n][1] - pts[i][1]) / 6;
    d += `C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${pts[(i+1)%n][0].toFixed(1)},${pts[(i+1)%n][1].toFixed(1)} `;
  }
  return d + 'Z';
};
const ringOp = [0.85, 0.62, 0.42, 0.25, 0.13, 0.06];
const ringR  = [70, 120, 180, 250, 330, 420];
const toUri = (svg) => 'data:image/svg+xml,' + encodeURIComponent(svg).replace(/%2523/g, '%23');
const flower = (ax, ay, cA, cB, gid) => {
  const rings = ringR.map((r, i) => `<path d='${makeSmooth(ax, ay, r, 3)}' fill='${i % 2 ? cB : cA}' opacity='${ringOp[i]}'/>`).join('');
  return toUri(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500'>
  <defs><radialGradient id='${gid}' gradientUnits='userSpaceOnUse' cx='${ax}' cy='${ay}' r='420'>
    <stop offset='0' stop-color='${cA}' stop-opacity='0.30'/>
    <stop offset='0.6' stop-color='${cA}' stop-opacity='0.10'/>
    <stop offset='1' stop-color='${cA}' stop-opacity='0'/>
  </radialGradient></defs>
  <rect width='500' height='500' fill='url(%23${gid})'/>
  ${rings}
</svg>`);
};
const TEXTURES = {
  __TEXTURE_TR__: flower(480, 20, '%2388c0d0', '%238fbcbb', 'gTR'),
  __TEXTURE_BL__: flower(20, 480, '%235e81ac', '%2381a1c1', 'gBL'),
  __LOGO_URI__: toUri(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
  <g stroke='%2388c0d0' stroke-width='2.4' stroke-linecap='round' fill='none'>
    <line x1='32' y1='10' x2='32' y2='54'/>
    <line x1='32' y1='10' x2='32' y2='54' transform='rotate(60 32 32)'/>
    <line x1='32' y1='10' x2='32' y2='54' transform='rotate(120 32 32)'/>
  </g>
  <g stroke='%238fbcbb' stroke-width='1.6' stroke-linecap='round' fill='none'>
    <path d='M 27 16 L 32 21 L 37 16'/>
    <path d='M 27 48 L 32 43 L 37 48'/>
    <path d='M 27 16 L 32 21 L 37 16' transform='rotate(60 32 32)'/>
    <path d='M 27 48 L 32 43 L 37 48' transform='rotate(60 32 32)'/>
    <path d='M 27 16 L 32 21 L 37 16' transform='rotate(120 32 32)'/>
    <path d='M 27 48 L 32 43 L 37 48' transform='rotate(120 32 32)'/>
  </g>
  <circle cx='32' cy='32' r='3' fill='%238fbcbb'/>
</svg>`),
};

/* ---------- 读 parts 拼接（纯文本连接，编译输入与拆分前一致） ---------- */
function loadParts() {
  const dir = path.join(ROOT, 'src', 'parts');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.scss')).sort();
  if (!files.length) throw new Error('src/parts 为空');
  return files.map(f => fs.readFileSync(path.join(dir, f), 'utf8').replace(/\r\n/g, '\n')).join('');
}

/* ---------- sass 编译（占位符旁路：属性选择器带引号值 + rgba alpha=1，防 sass 剥引号/简化 rgb） ---------- */
const ATTR_RE = /\[[\w-]+[~|^$*]?="[^"\n]*"\]/g;
const RGBA1_RE = /rgba\([^)\n]*,\s*1\.?0?\s*\)/g;
function compile(src) {
  const stash = [];
  src = src.replace(ATTR_RE, mm => { stash.push(mm); return `__STASH${stash.length - 1}__`; });
  src = src.replace(RGBA1_RE, mm => { stash.push(mm); return `__STASH${stash.length - 1}__`; });
  const out = sass.compileString(src, {
    style: 'expanded', charset: false,
    loadPaths: [path.join(ROOT, 'src')],
    silenceDeprecations: ['import', 'global-builtin'],
  });
  let css = out.css;
  stash.forEach((a, i) => { css = css.split(`__STASH${i}__`).join(a); });
  return css;
}

/* ---------- 注入纹理/logo data-uri ---------- */
function injectAssets(css) {
  for (const [ph, uri] of Object.entries(TEXTURES)) css = css.split(ph).join(uri);
  return css;
}

/* ---------- 语义对账 ----------
 * sass expanded 会重排格式，逐字节/逐行都无意义。规范化到「内容骨架」再比对：
 *   - 去注释
 *   - 去所有空白（空格/换行/制表）——sass 会任意重排
 *   - 去所有引号（单/双）——sass 统一双引号，源文件混用；去掉后只比内容字符
 *   - 小数去前导零（0.12s 与 .12s 对齐）
 * 按顶层 {} 配对切语句（@media/@supports 块整体一条），入 Set 比对。 */
function normRule(t) {
  return t
    .replace(/0\.(\d)/g, '.$1')   // 0.12 -> .12
    .replace(/[\s"']+/g, '');       // 去空白 + 引号
}
function ruleSet(css) {
  const s = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const set = new Set();
  let depth = 0, buf = '';
  for (const ch of s) {
    buf += ch;
    if (ch === '{') depth++;
    else if (ch === '}') { depth--; if (depth === 0) { const t = normRule(buf); if (t) set.add(t); buf = ''; } }
  }
  return set;
}

/* ---------- 主流程 ---------- */
const handCSS = injectAssets(compile(loadParts()));

// 基准（写入前的旧产物），对账要用
const baseJson = JSON.parse(fs.readFileSync(OUT, 'utf8'));
const oldCss = baseJson.custom_css;

// 写临时 JSON（手写 CSS），跑图标包脚本追加 Material 块（它读 OUT、追加、写回 OUT）
fs.writeFileSync(OUT, JSON.stringify({ ...baseJson, name: 'Contour-Nord', custom_css: handCSS }, null, 2), 'utf8');
execFileSync('node', [path.join(ROOT, 'build-material-icons.js')], { stdio: 'inherit', env: process.env });
const finalCss = JSON.parse(fs.readFileSync(OUT, 'utf8')).custom_css;

if (FORCE) { console.log('[force] 跳过对账，已写入。'); process.exit(0); }

const a = ruleSet(oldCss), b = ruleSet(finalCss);
const onlyOld = [...a].filter(x => !b.has(x));
const onlyNew = [...b].filter(x => !a.has(x));
console.log(`对账：旧 ${a.size} 条 / 新 ${b.size} 条`);

const restore = () => fs.writeFileSync(OUT, JSON.stringify(baseJson, null, 2), 'utf8');
if (onlyOld.length || onlyNew.length) {
  console.error('对账失败：');
  onlyOld.slice(0, 8).forEach(x => console.error('  仅旧(丢失): ' + x.slice(0, 100)));
  onlyNew.slice(0, 8).forEach(x => console.error('  仅新(多出): ' + x.slice(0, 100)));
  restore();
  console.error('已恢复旧产物，未生效。');
  process.exit(1);
}
if (!WRITE) { restore(); console.log('对账通过（verify，产物未改动）'); process.exit(0); }
console.log('对账通过，已写入 ' + OUT);
