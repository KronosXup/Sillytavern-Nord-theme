// Nord-Contour v2：两角 wavy concentric 纹理（等高线替掉）+ logo + 玻璃 UI
// 基座：src/contour-base.json（冻结自 Nord-Dark v3；Dark 已是废案，Contour 自立门户，不再依赖 themes/Nord-Dark.json）
const fs = require('fs');
const SRC = 'F:/sillytavern-themes/nord-theme/src/contour-base.json';
const OUT = 'F:/sillytavern-themes/nord-theme/themes/Contour-Nord.json';
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

// logo：雪花冰晶（六角放射 + 分枝），nord8 主臂 + nord7 分枝
const logoSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
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
#chat { background-color: transparent !important; background-image: none !important; border: none !important; box-shadow: none !important; }
/* sheld 整体罩 50% bg-0 一层纱：消息卡/输入栏浮在同一层底上，纹理只剩边缘隐约。
   rgba 在前兜底——老手机浏览器不认 color-mix 会整条丢弃，得留一条能解析的 */
#sheld { background-color: rgba(46,52,64,0.5) !important; background-color: color-mix(in srgb, var(--bg-0) 50%, transparent) !important; background-image: none !important; border: none !important; box-shadow: none !important; }
/* 移动端蒙版落到 #chat + #form_sheld（移植 Gruvbox 结构：ST 移动端关掉桌面罩层机制，蒙版得直接糊滚动区），移动端单独 60% */
@media screen and (max-width: 1000px) {
  #chat { background-color: rgba(46,52,64,0.6) !important; background-color: color-mix(in srgb, var(--bg-0) 60%, transparent) !important; }
  #form_sheld { background-color: rgba(46,52,64,0.6) !important; background-color: color-mix(in srgb, var(--bg-0) 60%, transparent) !important; }
  /* 底缝修复：原生给 sheld 写死 height:calc(100dvh - 36px)，浏览器UI伸缩/dvh不支持时就漏底缝；
     改 auto + 上下锚定（top 沿用原生 var(--topBarBlockSize)），永远拉到屏幕底 */
  #sheld { height: auto !important; min-height: 0 !important; max-height: none !important; bottom: 0 !important; }
}
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
/* 输入区：发送栏整条垫 bg-1 面板实底（浮起托底），输入框在其上用 bg-2——两阶明度差拉开边界。
   面板不画边框，靠 bg-1 底色+轻影与 chat 区分界；顶边发丝线贴 chat 下缘会横成一道突兀亮线（“缺一块”观感） */
#send_form { background-color: var(--bg-1) !important; border: none !important; border-radius: var(--radius) !important; box-shadow: var(--shadow-raised) !important; }
/* textarea：下沉底铺满、不留边框；聚焦高亮全扔（frost-ring/原生 outline 都关）。
   ST 原生 clip-path（脚本进度条）会裁顶边 5px，一并关 */
#send_textarea {
  background-color: var(--bg-sunken) !important;
  border: 1px solid transparent !important;  /* 占位防聚焦抖动 */
  border-radius: var(--radius) !important;
  clip-path: none !important;
  transition: border-color .14s var(--ease-out) !important;
}
/* 聚焦发丝线：只转 frost 细边，不要光环/outline */
#send_textarea:focus, #send_textarea:focus-visible {
  border-color: var(--accent) !important;
  box-shadow: none !important;
  outline: none !important;
}
#send_form:has(#send_textarea:focus-visible) { outline: none !important; border-color: transparent !important; }
/* 输入栏贴底（移植 Gruvbox）：sheld 钉底 + 去 form_sheld 原生 margin(1px/桌面4px) + PWA 底部预留清零 */
#sheld { bottom: 0 !important; }
#form_sheld { margin: 0 !important; padding-bottom: 0 !important; }
body.PWA #sheld { padding-bottom: 0 !important; }
#top-settings-holder { background-color: color-mix(in srgb, var(--bg-1) 38%, transparent) !important; border: 1px solid color-mix(in srgb, var(--text) 6%, transparent) !important; }
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

/* 移动端头部三行（max-width:899.98px）：
 *   行1  名字 + 锚点图标（inline 跟名字后）
 *   行2  时间戳 + ?模型图标（图标在时间戳后；用户消息无图标，时间戳始终 left:0 不留空）
 *   行3  #id / token / 响应时间（mesAvatarWrapper 底部 flex 横排，自动排开，:empty 自动收）
 * 头像 40px 左上单列占行1-2，编辑按钮右上，正文通栏。
 * 尺寸全部走 --mb-* 变量，改 --mb-avatar 一处联动。 */
const mobileHeader = `
@media (max-width: 899.98px) {
  #chat .mes {
    --mb-avatar: 40px;   /* 头像边长（= 2×--mb-row + --mb-gap，正好覆盖行1+行2） */
    --mb-row: 18px;      /* 名字/时间戳行高 */
    --mb-meta: 16px;     /* 计数器行高 */
    --mb-gap: 4px;       /* 三行统一行间距 */
    --mb-head: calc(var(--mb-avatar) + var(--mb-gap) + var(--mb-meta));  /* 头部总高 */
    position: relative !important;
    display: block !important;
    padding: 10px 12px !important;
    box-sizing: border-box !important;
  }
  /* 头像列容器：全宽，计数器在底部 flex 横排（左 padding 让出头像列，上 padding 把计数器压到行3） */
  #chat .mes .mesAvatarWrapper {
    position: absolute !important;
    top: 10px !important; left: 12px !important; right: 12px !important;
    width: auto !important; min-width: 0 !important; height: var(--mb-head) !important;
    display: flex !important; flex-direction: row !important; align-items: flex-start !important; column-gap: 8px !important;
    padding: calc(var(--mb-avatar) + 2px) 0 0 calc(var(--mb-avatar) + 10px) !important; box-sizing: border-box !important;
    pointer-events: none !important; z-index: 5 !important;
  }
  #chat .mes .mesAvatarWrapper .avatar {
    position: absolute !important; top: 2px !important; left: 0 !important;
    width: var(--mb-avatar) !important; height: var(--mb-avatar) !important;
    min-width: 0 !important; min-height: 0 !important; margin: 0 !important; pointer-events: auto !important;
  }
  #chat .mes .mesAvatarWrapper .avatar img { width: 100% !important; height: 100% !important; object-fit: cover !important; }
  /* 计数器三件套：行3 flex 子项，顺序 #id → token → 响应时间 */
  #chat .mes .mesAvatarWrapper .mesIDDisplay,
  #chat .mes .mesAvatarWrapper .mes_timer,
  #chat .mes .mesAvatarWrapper .tokenCounterDisplay {
    position: static !important; display: inline-flex !important; align-items: center !important;
    height: var(--mb-meta) !important; margin: 0 !important; padding: 0 !important; background: none !important;
    font-size: calc(var(--mainFontSize) * 0.8) !important; line-height: 1 !important; white-space: nowrap !important;
    color: var(--text-dim) !important; pointer-events: auto !important;
  }
  #chat .mes .mesAvatarWrapper .mesIDDisplay { order: 0 !important; }
  #chat .mes .mesAvatarWrapper .tokenCounterDisplay { order: 1 !important; }
  #chat .mes .mesAvatarWrapper .mes_timer { order: 2 !important; }
  #chat .mes .mesAvatarWrapper .mes_timer:empty,
  #chat .mes .mesAvatarWrapper .tokenCounterDisplay:empty { display: none !important; }
  /* 正文通栏，贴头部 */
  #chat .mes .mes_block { display: block !important; width: 100% !important; padding: var(--mb-head) 0 0 0 !important; box-sizing: border-box !important; }
  /* ch_name：行1+行2 定位上下文 */
  #chat .mes .ch_name {
    position: absolute !important; top: 10px !important;
    left: calc(12px + var(--mb-avatar) + 10px) !important; right: 12px !important;
    height: var(--mb-avatar) !important; display: block !important;
    overflow: visible !important; border: none !important; margin: 0 !important; padding: 0 !important;
  }
  #chat .mes .ch_name > .flex-container.flex1, #chat .mes .ch_name > .flex1 { position: static !important; display: block !important; height: 100% !important; }
  #chat .mes .ch_name .alignItemsBaseline { display: contents !important; }
  /* 行1：名字 + 锚点图标 */
  #chat .mes .ch_name .name_text {
    position: absolute !important; top: 0 !important; left: 0 !important; height: var(--mb-row) !important;
    display: flex !important; align-items: center !important;
    max-width: calc(100% - 6em) !important; overflow: hidden !important; text-overflow: ellipsis !important; white-space: nowrap !important;
  }
  #chat .mes .ch_name .name_text .sp-anchor-btn {
    position: static !important; display: inline-flex !important; align-items: center !important;
    margin-left: 4px !important; width: 1em !important; height: 1em !important; flex: 0 0 auto !important;
  }
  /* 行2：时间戳（left:0，用户消息无图标不留空）+ ?模型图标（时间戳后） */
  #chat .mes .ch_name .timestamp {
    position: absolute !important; top: calc(var(--mb-row) + var(--mb-gap)) !important; left: 0 !important; height: var(--mb-row) !important;
    display: inline-flex !important; align-items: center !important;
    font-size: calc(var(--mainFontSize) * 0.8) !important; opacity: 0.7 !important; white-space: nowrap !important;
  }
  #chat .mes .ch_name .timestamp-icon {
    position: absolute !important; top: calc(var(--mb-row) + var(--mb-gap)) !important; left: 118px !important; height: var(--mb-row) !important;
    width: 12px !important; display: inline-flex !important; align-items: center !important;
    opacity: 0.7 !important; color: var(--text-dim) !important;
  }
  /* 操作按钮：右上 */
  #chat .mes .ch_name .mes_buttons {
    position: absolute !important; top: 0 !important; right: 0 !important;
    display: flex !important; align-items: center !important; height: var(--mb-avatar) !important; z-index: 6 !important;
  }
  #chat .mes .swipeRightBlock, #chat .mes .swipe_left { display: none !important; }
}
`;

const css = base.custom_css + append + mobileHeader;
const out = { ...base, name: 'Contour-Nord', custom_css: css };
fs.writeFileSync(OUT, JSON.stringify(out, null, 2), 'utf8');
const chk = JSON.parse(fs.readFileSync(OUT, 'utf8'));
console.log('round-trip', chk.custom_css === css ? 'OK' : 'FAIL');
console.log('name:', chk.name);
console.log('css chars:', css.length);
console.log('has wavy concentric:', css.includes('makeSmooth') || (css.includes('Catmull') || css.includes('W1.0,1.08')));
console.log('has logo:', css.includes('welcomeHeaderLogo') && css.includes('88c0d0'));
console.log('ch_name 红已撤(应为 false):', css.includes('#bf616a'));
console.log('has transparent UI:', css.includes('rgba(46,52,64,0.08)') && css.includes('rgba(59,66,82,0.38)'));