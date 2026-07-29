// Nord-Contour Remix Icon 追加构建器
// 关键：base 从 Nord-Contour.json(326f2b3)读，保留纹理/hover/logo，只追加图标块
// 输出仍写 Nord-Contour.json（覆盖）
const fs = require('fs');
const path = require('path');

const REMIX_BASE = 'C:/temp/remix-icon/icons/';
const CONT = 'F:/sillytavern-themes/nord-theme/themes/Nord-Contour.json';

// 读当前 Contour(已含 Nord-Dark base + Contour 纹理/hover/logo)
const cont = JSON.parse(fs.readFileSync(CONT, 'utf8'));
const baseCSS = cont.custom_css;
console.log('base CSS:', baseCSS.length, 'chars (Nord-Dark + Contour)');

// ── 索引 Remix fill SVG ──
const index = {};
(function walk(dir) {
  fs.readdirSync(dir, {withFileTypes:true}).forEach(e => {
    if (e.isDirectory()) walk(path.join(dir, e.name));
    else {
      const key = e.name.replace('-fill.svg','').replace('.svg','');
      index[key] = path.join(dir, e.name).replace(REMIX_BASE, '');
    }
  });
})(REMIX_BASE);
console.log('Remix icons indexed:', Object.keys(index).length);

// ── FA → Remix 映射（Gruvbox 224 类对齐）──
const M = {};
const m = (fa, ri) => { M[fa] = ri; };

// 顶栏
m('fa-cog','System/settings-2-fill.svg'); m('fa-gear','System/settings-2-fill.svg');
m('fa-plug','Others/plug-fill.svg');
m('fa-cubes','Development/puzzle-fill.svg');
m('fa-palette','Design/palette-fill.svg');
m('fa-address-card','Business/id-card-fill.svg');
m('fa-user','User & Faces/user-3-fill.svg'); m('fa-user-circle','User & Faces/user-3-fill.svg');
m('fa-shield-halved','System/shield-user-fill.svg');
m('fa-lock','System/lock-fill.svg'); m('fa-unlock','System/lock-fill.svg'); m('fa-lock-open','System/lock-fill.svg');
m('fa-users','User & Faces/group-fill.svg'); m('fa-users-gear','User & Faces/group-fill.svg');
m('fa-right-from-bracket','Others/door-open-fill.svg');
m('fa-power-off','Device/shut-down-fill.svg');
m('fa-grip','Arrows/drag-move-fill.svg');
m('fa-desktop','Device/computer-fill.svg');
m('fa-sun','Weather/sun-fill.svg'); m('fa-moon','Weather/moon-fill.svg');
m('fa-circle-info','System/information-fill.svg'); m('fa-info-circle','System/information-fill.svg');
m('fa-circle-question','System/question-fill.svg'); m('fa-question-circle','System/question-fill.svg');

// 导航
m('fa-chevron-down','Arrows/arrow-down-s-fill.svg'); m('fa-chevron-up','Arrows/arrow-up-s-fill.svg');
m('fa-chevron-left','Arrows/arrow-left-s-fill.svg'); m('fa-chevron-right','Arrows/arrow-right-s-fill.svg');
m('fa-circle-chevron-down','Arrows/arrow-down-s-fill.svg'); m('fa-circle-chevron-up','Arrows/arrow-up-s-fill.svg');
m('fa-arrow-left','Arrows/arrow-left-fill.svg'); m('fa-arrow-right','Arrows/arrow-right-fill.svg');
m('fa-undo','Arrows/arrow-go-back-fill.svg'); m('fa-redo','Arrows/arrow-go-forward-fill.svg');
m('fa-repeat','Media/repeat-fill.svg'); m('fa-rotate','System/loop-right-fill.svg');
m('fa-sync','System/refresh-fill.svg'); m('fa-arrows-rotate','System/refresh-fill.svg'); m('fa-refresh','System/refresh-fill.svg');

// 发送
m('fa-paper-plane','Business/send-plane-fill.svg');

// 媒体
m('fa-microphone-lines','Media/mic-fill.svg');
m('fa-volume-high','Media/volume-up-fill.svg'); m('fa-volume-low','Media/volume-down-fill.svg');
m('fa-headphones','Media/headphone-fill.svg');
m('fa-play','Media/play-fill.svg'); m('fa-circle-play','Media/play-circle-fill.svg');
m('fa-circle-stop','Media/stop-circle-fill.svg'); m('fa-pause','Media/pause-circle-fill.svg'); m('fa-stop','Media/stop-circle-fill.svg');

// 聊天操作
m('fa-thumbtack','Map/pushpin-fill.svg'); m('fa-thumb-tack','Map/pushpin-fill.svg');
m('fa-pen-to-square','Design/pencil-fill.svg'); m('fa-pencil','Design/pencil-fill.svg'); m('fa-edit','Design/pencil-fill.svg');
m('fa-trash','System/delete-bin-fill.svg'); m('fa-trash-can','System/delete-bin-fill.svg'); m('fa-trash-alt','System/delete-bin-fill.svg');
m('fa-star','User & Faces/star-smile-fill.svg'); m('fa-heart','Health & Medical/heart-fill.svg');
m('fa-bookmark','Business/bookmark-fill.svg');
m('fa-link','Business/links-fill.svg'); m('fa-chain','Business/links-fill.svg');
m('fa-paperclip','Editor/attachment-2.svg');
m('fa-at','Business/at-fill.svg'); m('fa-hashtag','Editor/hashtag.svg');
m('fa-external-link','System/external-link-fill.svg'); m('fa-up-right-from-square','System/external-link-fill.svg');
m('fa-share-from-square','System/share-forward-fill.svg');
m('fa-chain-broken','Editor/link-unlink.svg'); m('fa-link-slash','Editor/link-unlink.svg');
m('fa-comment-slash','Communication/chat-off-fill.svg');

// 表单
m('fa-plus','System/add-fill.svg'); m('fa-plus-square','System/add-box-fill.svg'); m('fa-minus','System/subtract-fill.svg');
m('fa-times','System/close-fill.svg'); m('fa-xmark','System/close-fill.svg'); m('fa-x','System/close-fill.svg');
m('fa-close','System/close-fill.svg'); m('fa-cancel','System/close-fill.svg');
m('fa-check','System/check-fill.svg'); m('fa-check-double','System/check-double-fill.svg');
m('fa-circle-check','System/checkbox-circle-fill.svg'); m('fa-circle-xmark','System/close-circle-fill.svg');
m('fa-circle-exclamation','System/error-warning-fill.svg'); m('fa-exclamation-triangle','System/error-warning-fill.svg'); m('fa-triangle-exclamation','System/error-warning-fill.svg');

// 文件
m('fa-file-alt','Document/file-fill.svg'); m('fa-file-lines','Document/file-text-fill.svg');
m('fa-file-arrow-up','Document/file-upload-fill.svg');
m('fa-file-export','System/export-fill.svg'); m('fa-file-import','System/import-fill.svg');
m('fa-file-circle-plus','Document/file-add-fill.svg'); m('fa-file-zipper','Document/file-zip-fill.svg');
m('fa-folder','Document/folder-2-fill.svg'); m('fa-folder-open','Document/folder-open-fill.svg');
m('fa-folder-plus','Document/folder-add-fill.svg'); m('fa-folder-minus','Document/folder-reduce-fill.svg');
m('fa-folder-tree','Document/folder-chart-2-fill.svg');
m('fa-clipboard-list','Document/clipboard-fill.svg');
m('fa-copy','Document/file-copy-fill.svg'); m('fa-clone','Document/file-copy-2-fill.svg'); m('fa-paste','Document/clipboard-fill.svg');
m('fa-save','Device/save-fill.svg');
m('fa-download','System/download-fill.svg'); m('fa-upload','System/upload-fill.svg');
m('fa-cloud-arrow-down','System/download-cloud-fill.svg');

// 搜索
m('fa-magnifying-glass','System/search-fill.svg'); m('fa-search','System/search-fill.svg');
m('fa-filter','System/filter-fill.svg'); m('fa-filter-circle-xmark','System/filter-off-fill.svg');

// 沟通
m('fa-comment','Communication/chat-1-fill.svg'); m('fa-comment-dots','Communication/chat-3-fill.svg');
m('fa-comments','Communication/chat-4-fill.svg'); m('fa-message','Communication/chat-1-fill.svg');
m('fa-envelope-open-text','Business/mail-open-fill.svg'); m('fa-bullhorn','Business/megaphone-fill.svg');

// 开发
m('fa-code','Development/code-fill.svg'); m('fa-code-branch','Development/git-branch-fill.svg');
m('fa-terminal','Development/terminal-box-fill.svg');
m('fa-bug','Development/bug-fill.svg'); m('fa-bug-slash','Development/bug-2-fill.svg');
m('fa-database','Device/database-fill.svg');

// 图像/设计
m('fa-image','Media/image-fill.svg'); m('fa-images','Media/gallery-fill.svg');
m('fa-image-portrait','User & Faces/user-fill.svg');
m('fa-photo-film','Media/camera-fill.svg'); m('fa-film','Media/film-fill.svg'); m('fa-music','Media/music-fill.svg');
m('fa-paintbrush','Design/brush-fill.svg'); m('fa-pen-ruler','Design/pencil-ruler-fill.svg');
m('fa-compass-drafting','Design/compasses-2-fill.svg'); m('fa-object-ungroup','Design/shapes-fill.svg');
m('fa-sliders','Media/equalizer-fill.svg'); m('fa-wrench','Design/tools-fill.svg'); m('fa-tools','Design/tools-fill.svg');

// 杂项
m('fa-ellipsis','System/more-fill.svg'); m('fa-ellipsis-h','System/more-fill.svg'); m('fa-ellipsis-vertical','System/more-2-fill.svg');
m('fa-bars','System/menu-fill.svg');
m('fa-bell','Media/notification-3-fill.svg'); m('fa-bolt','Weather/flashlight-fill.svg'); m('fa-lightbulb','Others/lightbulb-fill.svg');
m('fa-key','Others/key-2-fill.svg'); m('fa-globe','Business/global-fill.svg'); m('fa-language','Editor/translate.svg');
m('fa-wifi','Device/wifi-fill.svg');
m('fa-clock-rotate-left','System/history-fill.svg');
m('fa-tag','Finance/price-tag-3-fill.svg'); m('fa-tags','Finance/price-tag-3-fill.svg');
m('fa-list','Editor/list-check.svg'); m('fa-list-check','Editor/list-check-3.svg');
m('fa-list-ol','Editor/list-ordered.svg'); m('fa-list-ul','Editor/list-unordered.svg');
m('fa-gamepad','Device/gamepad-fill.svg');
m('fa-book','Document/book-fill.svg'); m('fa-book-open-reader','Document/book-open-fill.svg');
m('fa-flag','Business/flag-fill.svg'); m('fa-flag-checkered','Business/flag-2-fill.svg');
m('fa-flask','Health & Medical/flask-fill.svg');
m('fa-calculator','Business/calculator-fill.svg'); m('fa-scale-balanced','Others/scales-fill.svg');
m('fa-briefcase','Business/briefcase-fill.svg'); m('fa-archive','Business/archive-2-fill.svg');
m('fa-id-card','Business/id-card-fill.svg'); m('fa-address-book','Document/contacts-book-fill.svg');
m('fa-right-left','Arrows/arrow-left-right-fill.svg'); m('fa-arrow-right-arrow-left','Arrows/arrow-left-right-fill.svg');
m('fa-recycle','Others/recycle-fill.svg');
m('fa-table','Editor/table-2.svg'); m('fa-table-cells-large','Design/layout-grid-fill.svg'); m('fa-table-columns','Design/layout-column-fill.svg');
m('fa-chart-line','Business/line-chart-fill.svg'); m('fa-square-poll-horizontal','Business/bar-chart-horizontal-fill.svg');
m('fa-function','System/function-fill.svg');
m('fa-robot','User & Faces/robot-fill.svg');
m('fa-magic-wand-sparkles','Design/magic-fill.svg'); m('fa-wand-magic','Design/magic-fill.svg'); m('fa-wand-magic-sparkles','Design/magic-fill.svg');
m('fa-note-sticky','Document/sticky-note-fill.svg'); m('fa-sticky-note','Document/sticky-note-2-fill.svg');
m('fa-toggle-on','System/toggle-fill.svg'); m('fa-toggle-off','System/toggle-fill.svg');
m('fa-check-to-slot','System/checkbox-fill.svg');
m('fa-face-smile','User & Faces/emotion-happy-fill.svg'); m('fa-smile','User & Faces/emotion-happy-fill.svg');
m('fa-frown','User & Faces/emotion-sad-fill.svg'); m('fa-meh','User & Faces/emotion-normal-fill.svg'); m('fa-grin','User & Faces/emotion-laugh-fill.svg');
m('fa-angry','User & Faces/emotion-fill.svg'); m('fa-tired','User & Faces/emotion-sad-fill.svg'); m('fa-surprise','User & Faces/emotion-fill.svg');
m('fa-thumbs-up','System/thumb-up-fill.svg'); m('fa-thumbs-down','System/thumb-down-fill.svg');
m('fa-eye','System/eye-fill.svg'); m('fa-eye-slash','System/eye-close-fill.svg');
m('fa-square-root-variable','Editor/square-root.svg');
m('fa-dice-d20','Game & Sports/dice-fill.svg'); m('fa-dice-d6','Game & Sports/dice-fill.svg');
m('fa-ghost','User & Faces/ghost-fill.svg'); m('fa-crown','Finance/vip-crown-fill.svg'); m('fa-skull','User & Faces/skull-fill.svg');
m('fa-scroll','Arrows/scroll-to-bottom-fill.svg'); m('fa-passport','Map/passport-fill.svg');
m('fa-cut','Design/scissors-fill.svg'); m('fa-scissors','Design/scissors-2-fill.svg');
m('fa-sd-card','Device/sd-card-fill.svg'); m('fa-radio','Media/radio-fill.svg');
m('fa-truck-arrow-right','Map/truck-fill.svg');
m('fa-plug-circle-check','Others/plug-2-fill.svg');
m('fa-circle-nodes','Editor/node-tree.svg'); m('fa-asterisk','Editor/asterisk.svg');
m('fa-bucket','Business/inbox-fill.svg');
m('fa-ranking-star','Business/medal-fill.svg'); m('fa-envelope','Business/mail-fill.svg');
m('fa-hand-pointer','Development/cursor-fill.svg');
m('fa-font','Editor/font-size.svg'); m('fa-bold','Editor/bold.svg'); m('fa-italic','Editor/italic.svg');
m('fa-underline','Editor/underline.svg'); m('fa-strikethrough','Editor/strikethrough.svg');
m('fa-markdown','Document/markdown-fill.svg');
m('fa-circle','System/checkbox-blank-circle-fill.svg'); m('fa-spinner','System/loader-fill.svg'); m('fa-circle-notch','System/loader-fill.svg');
m('fa-satellite-dish','Device/radar-fill.svg'); m('fa-notes-medical','Document/clipboard-fill.svg');
m('fa-person-circle-question','System/question-fill.svg');
m('fa-code-compare','Arrows/arrow-left-right-fill.svg'); m('fa-keyboard','Device/keyboard-fill.svg');
m('fa-user-graduate','Others/graduation-cap-fill.svg');
m('fa-user-check','System/check-fill.svg'); m('fa-user-pen','Design/edit-fill.svg');
m('fa-user-plus','User & Faces/user-add-fill.svg');
m('fa-user-secret','User & Faces/user-received-fill.svg');
m('fa-user-shield','System/shield-user-fill.svg'); m('fa-user-tie','User & Faces/user-star-fill.svg');
m('fa-user-gear','User & Faces/user-settings-fill.svg');
m('fa-cursor','Development/cursor-fill.svg');
m('fa-1','Editor/number-1.svg');
m('fa-square','System/checkbox-blank-fill.svg'); m('fa-window-maximize','System/checkbox-blank-fill.svg'); m('fa-window-restore','System/checkbox-blank-fill.svg');
m('fa-maximize','Media/fullscreen-fill.svg'); m('fa-minimize','Media/fullscreen-exit-fill.svg');
m('fa-expand','Media/fullscreen-fill.svg'); m('fa-compress','Media/fullscreen-exit-fill.svg');
m('fa-mobile-screen-button','Device/smartphone-fill.svg');
m('fa-people-arrows','Arrows/arrow-left-right-fill.svg');
m('fa-arrow-down-1-9','Editor/sort-number-desc.svg'); m('fa-arrow-down-9-1','Editor/sort-number-asc.svg');
m('fa-toolbox','Design/tools-fill.svg');
m('fa-brands.fa-discord','Logos/discord-fill.svg'); m('fa-brands.fa-github','Logos/github-fill.svg');

// 漏网补遗（preview 扫 DOM 发现）
m('fa-book-atlas','Document/book-2-fill.svg');          // 世界书 WI
m('fa-user-cog','User & Faces/user-settings-fill.svg'); // 用户设置
m('fa-panorama','Media/landscape-fill.svg');            // 背景
m('fa-file-invoice','Document/file-list-2-fill.svg');   // 发票/清单
m('fa-left-long','Arrows/arrow-left-long-fill.svg');    // 长左箭头
m('fa-pie-chart','Business/pie-chart-fill.svg');        // 饼图
m('fa-plug-circle-exclamation','Others/plug-2-fill.svg'); // API 警告

// 验证全部存在
let missing = [];
for (const fa in M) {
  if (!fs.existsSync(path.join(REMIX_BASE, M[fa]))) missing.push(fa + ' -> ' + M[fa]);
}
console.log('mappings:', Object.keys(M).length, 'missing:', missing.length);
if (missing.length) missing.forEach(x => console.log('  MISS', x));

// ── 颜色策略 ──
// 顶栏/按钮图标: #d8dee9, hover → #88c0d0 (frost8)
// 发送键: var(--on-accent)
// chevron/箭头/表单/状态/列表: currentColor
const TOOLBAR = '#d8dee9';
const ACCENT  = '#88c0d0';

const TOOLBAR_HOVER = new Set([
  'fa-cog','fa-gear','fa-plug','fa-cubes','fa-palette','fa-address-card',
  'fa-user','fa-user-circle','fa-shield-halved','fa-lock','fa-unlock','fa-lock-open',
  'fa-users','fa-users-gear','fa-right-from-bracket','fa-power-off','fa-grip',
  'fa-desktop','fa-sun','fa-moon','fa-circle-info','fa-info-circle',
  'fa-circle-question','fa-question-circle','fa-wrench','fa-tools',
  'fa-ellipsis','fa-ellipsis-h','fa-ellipsis-vertical','fa-bars',
  'fa-bell','fa-bug','fa-database','fa-code','fa-terminal',
  'fa-key','fa-globe','fa-language','fa-tag','fa-tags',
  'fa-list','fa-list-check','fa-sliders','fa-filter',
  'fa-gamepad','fa-robot','fa-wand-magic-sparkles','fa-wand-magic','fa-magic-wand-sparkles',
  'fa-undo','fa-redo','fa-repeat','fa-rotate','fa-sync','fa-arrows-rotate','fa-refresh',
  'fa-lightbulb','fa-bolt','fa-bookmark','fa-book','fa-book-open-reader',
  'fa-archive','fa-briefcase','fa-calculator','fa-keyboard',
  'fa-pencil','fa-edit','fa-pen-to-square','fa-flask','fa-scale-balanced',
  'fa-chart-line','fa-square-poll-horizontal','fa-table','fa-table-cells-large','fa-table-columns',
  'fa-function','fa-toggle-on','fa-toggle-off','fa-eye','fa-eye-slash',
  'fa-font','fa-bold','fa-italic','fa-underline','fa-strikethrough',
  'fa-thumbtack','fa-thumb-tack','fa-sd-card','fa-radio',
  'fa-music','fa-film','fa-images','fa-image','fa-photo-film',
  'fa-paintbrush','fa-pen-ruler','fa-compass-drafting','fa-object-ungroup',
  'fa-code-branch','fa-code-compare','fa-bug-slash','fa-user-graduate',
  'fa-user-check','fa-user-pen','fa-user-plus','fa-user-secret','fa-user-shield','fa-user-tie','fa-user-gear',
  'fa-user-circle','fa-address-book','fa-id-card','fa-passport','fa-bucket',
  'fa-toolbox','fa-ranking-star','fa-envelope','fa-envelope-open-text',
  'fa-bullhorn','fa-cloud-arrow-down','fa-download','fa-upload','fa-save',
  'fa-folder','fa-folder-open','fa-folder-plus','fa-folder-minus','fa-folder-tree',
  'fa-clipboard-list','fa-notes-medical','fa-paste','fa-copy','fa-clone',
  'fa-file-alt','fa-file-lines','fa-file-arrow-up','fa-file-export','fa-file-import',
  'fa-file-circle-plus','fa-file-zipper','fa-markdown',
  'fa-sticky-note','fa-note-sticky','fa-asterisk','fa-circle-nodes',
  'fa-plug-circle-check','fa-truck-arrow-right','fa-recycle','fa-hand-pointer',
  'fa-satellite-dish','fa-comment-slash',
  // 漏网补遗
  'fa-book-atlas','fa-user-cog','fa-panorama','fa-file-invoice',
  'fa-pie-chart','fa-plug-circle-exclamation',
]);

// ── 生成 CSS ──
const blocks = [];
for (const fa in M) {
  const rel = M[fa];
  const svg = fs.readFileSync(path.join(REMIX_BASE, rel), 'utf8');
  const uri = 'data:image/svg+xml,' + encodeURIComponent(svg);

  let color = 'currentColor';
  if (fa === 'fa-paper-plane') color = 'var(--on-accent,#2e3440)';

  let sel;
  if (fa.startsWith('fa-brands.fa-')) {
    sel = '.fa-brands.fa-' + fa.slice(13) + '::before';
  } else {
    sel = '.' + fa + '::before';
  }

  let rule = sel + '{' +
    'content:""!important;display:inline-block!important;' +
    'width:1.1em!important;height:1.1em!important;' +
    'background-color:' + color + '!important;' +
    'mask-image:url("' + uri + '")!important;' +
    '-webkit-mask-image:url("' + uri + '")!important;' +
    'mask-size:contain!important;-webkit-mask-size:contain!important;' +
    'mask-repeat:no-repeat!important;-webkit-mask-repeat:no-repeat!important;' +
    'mask-position:center!important;-webkit-mask-position:center!important;';
  if (TOOLBAR_HOVER.has(fa)) {
    rule += 'transition:background-color 200ms ease-in-out!important;';
  }
  rule += '}';
  blocks.push(rule);

  if (TOOLBAR_HOVER.has(fa)) {
    blocks.push('.menu_button:hover ' + sel + ',.drawer-toggle:hover ' + sel + ',' +
      '.drawer-icon:hover ' + sel + ',.interactable:hover ' + sel +
      '{background-color:' + ACCENT + '!important}');
  }
}

// 发送键 hover
blocks.push('#send_but:hover .fa-paper-plane::before{background-color:#2e3440!important}');

// fa-undo 别名组
const undoSvg = fs.readFileSync(path.join(REMIX_BASE, 'Arrows/arrow-go-back-fill.svg'), 'utf8');
const undoUri = 'data:image/svg+xml,' + encodeURIComponent(undoSvg);
blocks.push('.fa-arrow-left-rotate::before,.fa-arrow-rotate-back::before,.fa-arrow-rotate-backward::before,.fa-arrow-rotate-left::before{' +
  'content:""!important;display:inline-block!important;width:1.1em!important;height:1.1em!important;' +
  'background-color:currentColor!important;' +
  'mask-image:url("' + undoUri + '")!important;-webkit-mask-image:url("' + undoUri + '")!important;' +
  'mask-size:contain!important;-webkit-mask-size:contain!important;' +
  'mask-repeat:no-repeat!important;-webkit-mask-repeat:no-repeat!important;' +
  'mask-position:center!important;-webkit-mask-position:center!important;' +
  'transition:background-color 200ms ease-in-out!important;}');
blocks.push('.menu_button:hover .fa-arrow-left-rotate::before,.menu_button:hover .fa-arrow-rotate-back::before,.menu_button:hover .fa-arrow-rotate-backward::before,.menu_button:hover .fa-arrow-rotate-left::before,' +
  '.drawer-toggle:hover .fa-arrow-left-rotate::before,.drawer-toggle:hover .fa-arrow-rotate-back::before,.drawer-toggle:hover .fa-arrow-rotate-backward::before,.drawer-toggle:hover .fa-arrow-rotate-left::before,' +
  '.interactable:hover .fa-arrow-left-rotate::before,.interactable:hover .fa-arrow-rotate-back::before,.interactable:hover .fa-arrow-rotate-backward::before,.interactable:hover .fa-arrow-rotate-left::before{background-color:' + ACCENT + '!important}');

// wifi 断开状态红色
const wifiSvg = fs.readFileSync(path.join(REMIX_BASE, 'Device/wifi-fill.svg'), 'utf8');
const wifiUri = 'data:image/svg+xml,' + encodeURIComponent(wifiSvg);
blocks.push('.fa-wifi[style*="rgb(170"][style*="0, 0)"]::before{background-color:#bf616a!important;' +
  'mask-image:url("' + wifiUri + '")!important;-webkit-mask-image:url("' + wifiUri + '")!important;}');

console.log('CSS rules:', blocks.length);

const remixCSS = '/* ============================================================\n * Remix Icon fill 图标替换（' + Object.keys(M).length + ' FA 类名 → mask-image SVG）\n * 24×24 viewBox, fill-current, 锐利几何实心替代 FA 厚重圆润\n * 颜色：背景色贯穿色（默认继承父色，hover 时父元素 color 变 frost8 → background-color 跟随）\n * hover 选择器：.menu_button:hover,.drawer-toggle:hover,.drawer-icon:hover,.interactable:hover → #88c0d0\n * ============================================================ */\n' + blocks.join('\n');

const finalCSS = baseCSS + '\n\n' + remixCSS;
const out = { ...cont, name: 'Nord-Contour', custom_css: finalCSS };
fs.writeFileSync(CONT, JSON.stringify(out, null, 2), 'utf8');

const chk = JSON.parse(fs.readFileSync(CONT, 'utf8'));
console.log('round-trip:', chk.custom_css === finalCSS ? 'OK' : 'FAIL');
console.log('name:', chk.name);
console.log('total:', finalCSS.length, 'chars (base', baseCSS.length, '+ remix', remixCSS.length, ')');
console.log('Contour preserved:', finalCSS.indexOf('wavy concentric') >= 0 && finalCSS.indexOf('0 10px 20px 2px') >= 0 && finalCSS.indexOf('welcomeHeaderLogo') >= 0);
console.log('Remix added:', finalCSS.indexOf('mask-image') >= 0);
console.log('Wider hover rules:', blocks.filter(b => b.includes('.drawer-toggle:hover')).length, 'toggle-hover blocks');
