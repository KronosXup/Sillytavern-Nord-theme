// Nord-Contour v2：两角 wavy concentric 纹理（等高线替掉）+ logo + 玻璃 UI
const fs = require('fs');
const SRC = 'F:/sillytavern-themes/nord-theme/themes/Nord-Dark.json';
const OUT = 'F:/sillytavern-themes/nord-theme/themes/Nord-Contour.json';
const base = JSON.parse(fs.readFileSync(SRC, 'utf8'));

// 两角等高线极光：每角一朵独立的"花"，各自锚定视口角（右上/左下），
// 双图层背景，与屏幕宽高比无关（单图 cover 会把竖版 SVG 放大 9 倍、把另一角推出屏外）
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
  d += 'Z';
  return d;
};

// 每朵 6 层同心环：核心最亮，外圈渐隐
const ringOp = [0.85, 0.62, 0.42, 0.25, 0.13, 0.06];
const ringR  = [70, 120, 180, 250, 330, 420];
const toUri = (svg) => 'data:image/svg+xml,' + encodeURIComponent(svg).replace(/%2523/g, '%23');
// 一朵花：锚点 (ax,ay) 在角落，色对 (cA,cB) 交替，光晕 id 防冲突
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
const trUri = flower(480, 20, '%2388c0d0', '%238fbcbb', 'gTR');  /* 右上：nord8/nord7 冰青 */
const blUri = flower(20, 480, '%235e81ac', '%2381a1c1', 'gBL');  /* 左下：nord10/nord9 深蓝 */

// logo：简洁冰晶菱形 + nord8 线条
const logoSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
  <rect width='64' height='64' fill='none'/>
  <polygon points='32,4 52,32 32,60 12,32' fill='none' stroke='%2388c0d0' stroke-width='2.5' stroke-linejoin='round'/>
  <polygon points='32,14 44,32 32,50 20,32' fill='none' stroke='%238fbcbb' stroke-width='1.5' stroke-linejoin='round' opacity='0.7'/>
  <line x1='32' y1='4' x2='32' y2='60' stroke='%235e81ac' stroke-width='1' opacity='0.4'/>
  <line x1='12' y1='32' x2='52' y2='32' stroke='%235e81ac' stroke-width='1' opacity='0.4'/>
</svg>`;
const logoUri = 'data:image/svg+xml,' + encodeURIComponent(logoSvg).replace(/%2523/g, '%23');

const append = `
/* ============================================================
 * Nord-Contour 纹理 + UI 透明化 + logo
 * 背景：两角等高线极光——两朵独立的"花"各锚视口一角（双图层 background，与宽高比无关），
 *       右上 nord8/nord7 冰青、左下 nord10/nord9 深蓝，核心鲜亮、外圈渐隐，正文区保持 nord0；
 *       只注入 body，#bg1 自定义背景图不被遮盖。
 * aurora 点缀：角色名红 nord11、标签紫 nord15。
 * UI 透明化：消息/聊表半透浮在纹理上，顶栏/发送栏也透；
 *       设置菜单控件保持实底（玻璃化会丢辨识度，只给发送栏）。
 * ============================================================ */
body {
  background-color: var(--bg-0) !important;
  background-image: url("${trUri}"), url("${blUri}") !important;
  background-position: right top, left bottom !important;
  background-repeat: no-repeat, no-repeat !important;
  background-size: 640px 640px, 640px 640px !important;
  background-attachment: fixed !important;
}
#chat, #sheld { background-color: transparent !important; background-image: none !important; border: none !important; box-shadow: none !important; }
.welcomePanel { background-color: transparent !important; }
.mes, .mes.last_mes {
  background-color: color-mix(in srgb, var(--bg-0) 45%, transparent) !important;
  border: 1px solid color-mix(in srgb, var(--text) 5%, transparent) !important;
  border-radius: var(--radius) !important;
  padding: 14px 16px !important;
  margin-bottom: 12px !important;
}
/* inline 头像（hotswap 顶栏/内联小头像）豁免 padding：否则 10px padding 把50px容器内容盒挤成30px，图显小（大框包小图） */
.character_select:not(.inline_avatar) { padding: 10px !important; }
.inline-drawer-header { padding: 6px 14px !important; }
.mes_text q, q {
  quotes: none !important;
  color: var(--nord7) !important;
  font-weight: 500 !important;
}
/* ch_name 回落基线 nord6 亮白（aurora 红与"强调色只给交互"的纪律冲突，已撤回） */
.tag {
  background-color: color-mix(in srgb, var(--nord15) 12%, transparent) !important;  /* aurora 紫 nord15 */
  color: var(--nord15) !important;
  border: 1px solid color-mix(in srgb, var(--nord15) 25%, transparent) !important;
}
#send_form, #top-settings-holder { background-color: color-mix(in srgb, var(--bg-1) 38%, transparent) !important; border: 1px solid color-mix(in srgb, var(--text) 6%, transparent) !important; }
#send_form .text_pole, #send_textarea {
  background-color: color-mix(in srgb, var(--bg-0) 30%, transparent) !important;
  border: 1px solid color-mix(in srgb, var(--text) 5%, transparent) !important;
  color: var(--text-hover) !important;
}
#character_popup, #dialogue_popup, .popup, .draggable, #floatingPrompt {
  background-color: var(--bg-1) !important;
  border: 1px solid color-mix(in srgb, var(--text) 8%, transparent) !important;
  box-shadow: 0 12px 36px rgba(0,0,0,0.35) !important;
}
/* 抽屉三兄弟（WorldInfo/左右 nav-panel）不归浮层：回基线 shadow-raised 轻影，与其它抽屉一致 */
/* Nord 官网 Card hover：轻影抬深影 */
.recentChat, .character_select, .inline-drawer-header, .toast {
  box-shadow: 0 3px 6px rgba(0,0,0,0.2) !important;
  transition: box-shadow 400ms ease-in-out, background-color 400ms ease-in-out !important;
}
.recentChat:hover, .character_select:hover, .inline-drawer-header:hover, .toast:hover {
  box-shadow: 0 10px 20px 2px rgba(0,0,0,0.2) !important;
}
/* 标题hover去高亮：覆盖酒馆原生 style.css 5437 行的 brightness(150%) */
.inline-drawer-header:hover { filter: brightness(100%) !important; }
.inline-drawer-header:hover .inline-drawer-icon { color: var(--text-dim) !important; }
/* Nord 官网小按钮 hover：边框+字色→frost8，图标过渡变色(fill→color)；
   边界：active/selected（已是冰青底，再染图标会融底）与 red_button（红底）不参与 */
.menu_button {
  transition: border-color 200ms ease-in-out, color 200ms ease-in-out, background-color 200ms ease-in-out !important;
}
.menu_button:not(.active):not(.selected):not(.red_button):hover {
  border-color: var(--accent) !important;
  color: var(--accent) !important;
}
.menu_button .fa-solid, .menu_button .fa-regular, .menu_button i {
  transition: color 200ms ease-in-out !important;
}
.menu_button:not(.active):not(.selected):not(.red_button):hover .fa-solid,
.menu_button:not(.active):not(.selected):not(.red_button):hover .fa-regular,
.menu_button:not(.active):not(.selected):not(.red_button):hover i,
.menu_button:not(.active):not(.selected):not(.red_button):hover span {
  color: var(--accent) !important;
}
.welcomeHeaderLogo {
  content: url("${logoUri}") !important;
  width: 40px !important;
  height: 40px !important;
  filter: drop-shadow(0 2px 6px rgba(0,0,0,0.3));
}
`;

const css = base.custom_css + append;
const out = { ...base, name: 'Nord-Contour', custom_css: css };
fs.writeFileSync(OUT, JSON.stringify(out, null, 2), 'utf8');
const chk = JSON.parse(fs.readFileSync(OUT, 'utf8'));
console.log('round-trip', chk.custom_css === css ? 'OK' : 'FAIL');
console.log('name:', chk.name);
console.log('css chars:', css.length);
console.log('has wavy concentric:', css.includes('makeSmooth') || (css.includes('Catmull') || css.includes('W1.0,1.08')));
console.log('has logo:', css.includes('welcomeHeaderLogo') && css.includes('88c0d0'));
console.log('ch_name 红已撤(应为 false):', css.includes('#bf616a'));
console.log('has transparent UI:', css.includes('rgba(46,52,64,0.08)') && css.includes('rgba(59,66,82,0.38)'));