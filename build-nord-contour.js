// Nord-Contour v2：两角 wavy concentric 纹理（等高线替掉）+ logo + 玻璃 UI
const fs = require('fs');
const SRC = 'F:/sillytavern-themes/nord-theme/themes/Nord-Dark.json';
const OUT = 'F:/sillytavern-themes/nord-theme/themes/Nord-Contour.json';
const base = JSON.parse(fs.readFileSync(SRC, 'utf8'));

// 两角 wavy concentric：16 顶点 Catmull-Rom 平滑，每层同形状放大
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

const lb = (r) => makeSmooth(20, 720, r, 0);
const rt = (r) => makeSmooth(407, 10, r, 3);

const bgSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 427 722' preserveAspectRatio='xMidYMid slice'>
  <rect width='427' height='722' fill='%232e3440'/>
  <path d='${lb(320)}' fill='%235e81ac' opacity='0.30'/>
  <path d='${lb(220)}' fill='%2381a1c1' opacity='0.45'/>
  <path d='${lb(140)}' fill='%235e81ac' opacity='0.65'/>
  <path d='${lb(80)}'  fill='%2381a1c1' opacity='0.85'/>
  <path d='${rt(320)}' fill='%2388c0d0' opacity='0.30'/>
  <path d='${rt(220)}' fill='%238fbcbb' opacity='0.45'/>
  <path d='${rt(140)}' fill='%2388c0d0' opacity='0.65'/>
  <path d='${rt(80)}'  fill='%238fbcbb' opacity='0.85'/>
</svg>`;
const bgUri = 'data:image/svg+xml,' + encodeURIComponent(bgSvg).replace(/%2523/g, '%23');

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
 * 背景：两角 wavy concentric（左下 nord10/nord9、右上 nord8/nord7），
 *       每层同形状放大、Catmull-Rom 平滑，两角同色系(frost)起点；
 *       中心由两层 nord0 构成结构感。
 * aurora 点缀：角色名红 nord11、标签紫 nord15。
 * UI 透明化：消息/聊表半透浮在纹理上，面板半透玻璃，顶栏/输入栏也透。
 * ============================================================ */
body {
  background-color: #2e3440 !important;
  background-image: url("${bgUri}") !important;
  background-attachment: fixed !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
}
#chat, #sheld { background-color: transparent !important; background-image: url("${bgUri}") !important; background-attachment: fixed !important; background-repeat: no-repeat !important; background-size: cover !important; border: none !important; box-shadow: none !important; }
.welcomePanel { background-color: transparent !important; }
.mes {
  background-color: rgba(46,52,64,0.08) !important;
  border: 1px solid rgba(216,222,233,0.05) !important;
  border-radius: var(--r) !important;
}
.mes.last_mes { background-color: rgba(46,52,64,0.14) !important; }
.ch_name { color: #bf616a !important; }              /* aurora 红 nord11 */
.tag {
  background-color: rgba(180,142,173,0.12) !important;  /* aurora 紫 nord15 */
  color: #b48ead !important;
  border: 1px solid rgba(180,142,173,0.25) !important;
}
#send_form, #top-settings-holder { background-color: rgba(59,66,82,0.38) !important; border: 1px solid rgba(216,222,233,0.06) !important; }
.text_pole, #send_textarea, select {
  background-color: rgba(46,52,64,0.30) !important;
  border: 1px solid rgba(216,222,233,0.05) !important;
  color: #e5e9f0 !important;
}
#right-nav-panel, #left-nav-panel, #character_popup, #dialogue_popup, .popup, .draggable, #WorldInfo, #floatingPrompt {
  background-color: #3b4252 !important;
  border: 1px solid rgba(216,222,233,0.08) !important;
  box-shadow: 0 12px 36px rgba(0,0,0,0.35) !important;
}
/* Nord 官网 Card hover：轻影抬深影 */
.recentChat, .character_select, .inline-drawer-header, .toast {
  box-shadow: 0 3px 6px rgba(0,0,0,0.2) !important;
  transition: box-shadow 400ms ease-in-out, background-color 400ms ease-in-out !important;
}
.recentChat:hover, .character_select:hover, .inline-drawer-header:hover, .toast:hover {
  box-shadow: 0 10px 20px 2px rgba(0,0,0,0.2) !important;
}
.welcomeHeaderLogo {
  content: url("${logoUri}") !important;
  width: 40px !important;
  height: 40px !important;
  filter: drop-shadow(0 2px 6px rgba(0,0,0,0.3));
}
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
console.log('has aurora ch_name #bf616a:', css.includes('#bf616a'));
console.log('has transparent UI:', css.includes('rgba(46,52,64,0.08)') && css.includes('rgba(59,66,82,0.38)'));