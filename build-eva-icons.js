// Nord-Contour Eva Icons 追加构建器
// 从 build-remix-icons.js 换源而来：结构/管线一致，图标源改 Eva Icons(fill)。
// Eva 没有的语义（文本格式/品牌/跑团杂项）不映射，保留 FA 原生字形兜底——
// Eva fill 与 FA solid 同为实心风格，混用不违和。
// 用法：node build-nord-contour.js && node build-eva-icons.js
const fs = require('fs');
const path = require('path');

const EVA_BASE = 'C:/temp/eva-icons/package/icons/fill/svg/';
const CONT = 'F:/sillytavern-themes/nord-theme/themes/Nord-Contour.json';
const ACCENT = '#88c0d0'; // 普通按钮图标 hover 冰青；active/selected/red_button 不参与

// 读当前 Contour(已含 Nord-Dark base + Contour 纹理/hover/logo，不含旧图标块)
const cont = JSON.parse(fs.readFileSync(CONT, 'utf8'));
const baseCSS = cont.custom_css;
console.log('base CSS:', baseCSS.length, 'chars (Nord-Dark + Contour)');

// ── FA 类名 → Eva 图标名（C:/temp/eva-icons/package/icons/fill/svg/<name>.svg）──
const M = {};
const m = (fa, eva) => { M[fa] = eva; };

m('fa-cog', 'settings-2'); m('fa-gear', 'settings-2');
m('fa-plug', 'power'); // 已连接：power 图标
m('fa-plug-circle-exclamation', 'power'); // 未连接：power 图标 + 红色（下方特例染色）
m('fa-cubes', 'cube');
m('fa-palette', 'color-palette');
m('fa-address-card', 'person');
m('fa-user', 'person'); m('fa-user-circle', 'person');
m('fa-shield-halved', 'shield');
m('fa-lock', 'lock'); m('fa-unlock', 'unlock'); m('fa-lock-open', 'unlock');
m('fa-users', 'people'); m('fa-users-gear', 'people');
m('fa-right-from-bracket', 'log-out');
m('fa-power-off', 'power');
m('fa-grip', 'move');
m('fa-desktop', 'monitor');
m('fa-sun', 'sun'); m('fa-moon', 'moon');
m('fa-circle-info', 'info'); m('fa-info-circle', 'info');
m('fa-circle-question', 'question-mark-circle'); m('fa-question-circle', 'question-mark-circle');
m('fa-chevron-down', 'chevron-down'); m('fa-chevron-up', 'chevron-up');
m('fa-chevron-left', 'chevron-left'); m('fa-chevron-right', 'chevron-right');
m('fa-circle-chevron-down', 'chevron-down'); m('fa-circle-chevron-up', 'chevron-up');
m('fa-arrow-left', 'arrow-left'); m('fa-arrow-right', 'arrow-right');
m('fa-undo', 'undo'); m('fa-redo', 'refresh');
m('fa-repeat', 'repeat');
m('fa-rotate', 'sync'); m('fa-sync', 'sync');
m('fa-arrows-rotate', 'refresh'); m('fa-refresh', 'refresh');
m('fa-paper-plane', 'paper-plane');
m('fa-microphone-lines', 'mic');
m('fa-volume-high', 'volume-up'); m('fa-volume-low', 'volume-down');
m('fa-headphones', 'headphones');
m('fa-play', 'play-circle'); m('fa-circle-play', 'play-circle');
m('fa-circle-stop', 'stop-circle'); m('fa-pause', 'pause-circle'); m('fa-stop', 'stop-circle');
/* fa-thumbtack/fa-thumb-tack：Eva 的 pin 是地图定位钉不是图钉，保留 FA 原生 */
m('fa-pen-to-square', 'edit-2'); m('fa-pencil', 'edit-2'); m('fa-edit', 'edit');
m('fa-trash', 'trash-2'); m('fa-trash-can', 'trash-2'); m('fa-trash-alt', 'trash-2');
m('fa-star', 'star'); m('fa-heart', 'heart'); m('fa-bookmark', 'bookmark');
m('fa-link', 'link'); m('fa-chain', 'link-2');
m('fa-paperclip', 'attach-2');
m('fa-at', 'at'); m('fa-hashtag', 'hash');
m('fa-external-link', 'external-link'); m('fa-up-right-from-square', 'external-link');
m('fa-share-from-square', 'share');
m('fa-plus', 'plus'); m('fa-plus-square', 'plus-square'); m('fa-minus', 'minus');
m('fa-times', 'close'); m('fa-xmark', 'close'); m('fa-x', 'close'); m('fa-close', 'close'); m('fa-cancel', 'close');
m('fa-check', 'checkmark'); m('fa-check-double', 'done-all');
m('fa-circle-check', 'checkmark-circle-2');
m('fa-circle-xmark', 'close-circle');
m('fa-circle-exclamation', 'alert-circle');
m('fa-exclamation-triangle', 'alert-triangle'); m('fa-triangle-exclamation', 'alert-triangle');
m('fa-file-alt', 'file-text'); m('fa-file-lines', 'file-text');
m('fa-file-arrow-up', 'upload');
m('fa-file-export', 'download'); m('fa-file-import', 'upload');
m('fa-file-circle-plus', 'file-add');
m('fa-file-zipper', 'archive');
m('fa-folder', 'folder'); m('fa-folder-open', 'folder');
m('fa-folder-plus', 'folder-add'); m('fa-folder-minus', 'folder-remove'); m('fa-folder-tree', 'folder');
m('fa-clipboard-list', 'clipboard'); m('fa-paste', 'clipboard');
m('fa-copy', 'copy'); m('fa-clone', 'copy');
m('fa-save', 'save'); m('fa-download', 'download'); m('fa-upload', 'upload');
m('fa-cloud-arrow-down', 'cloud-download');
m('fa-magnifying-glass', 'search'); m('fa-search', 'search');
m('fa-filter', 'funnel'); m('fa-filter-circle-xmark', 'funnel');
m('fa-comment', 'message-circle'); m('fa-comment-dots', 'message-circle');
m('fa-comments', 'message-circle'); m('fa-message', 'message-circle');
m('fa-envelope-open-text', 'email'); m('fa-envelope', 'email');
m('fa-code', 'code'); m('fa-terminal', 'code');
m('fa-database', 'hard-drive');
m('fa-image', 'image'); m('fa-image-portrait', 'image'); m('fa-panorama', 'image');
m('fa-images', 'image-2'); m('fa-photo-film', 'image-2');
m('fa-film', 'film'); m('fa-music', 'music');
m('fa-paintbrush', 'brush'); m('fa-pen-ruler', 'brush');
m('fa-compass-drafting', 'compass');
m('fa-object-ungroup', 'layers');
m('fa-sliders', 'options-2');
m('fa-wrench', 'settings'); m('fa-tools', 'settings');
m('fa-ellipsis', 'more-horizontal'); m('fa-ellipsis-h', 'more-horizontal');
m('fa-ellipsis-vertical', 'more-vertical');
m('fa-bars', 'menu-2');
m('fa-bell', 'bell');
m('fa-bolt', 'flash');
m('fa-lightbulb', 'bulb');
m('fa-globe', 'globe-2'); m('fa-language', 'globe-3');
m('fa-wifi', 'wifi');
m('fa-clock-rotate-left', 'clock');
m('fa-tag', 'pricetags'); m('fa-tags', 'pricetags');
m('fa-list', 'list'); m('fa-list-check', 'list'); m('fa-list-ol', 'list'); m('fa-list-ul', 'list');
m('fa-book', 'book'); m('fa-book-open-reader', 'book-open'); m('fa-book-atlas', 'book-open');
m('fa-flag', 'flag'); m('fa-flag-checkered', 'flag');
m('fa-briefcase', 'briefcase'); m('fa-toolbox', 'briefcase');
m('fa-archive', 'archive');
m('fa-id-card', 'person'); m('fa-address-book', 'book');
m('fa-right-left', 'swap'); m('fa-arrow-right-arrow-left', 'swap');
m('fa-table', 'grid'); m('fa-table-cells-large', 'grid');
m('fa-table-columns', 'layout');
m('fa-chart-line', 'trending-up');
m('fa-square-poll-horizontal', 'bar-chart-2');
m('fa-note-sticky', 'file-text'); m('fa-sticky-note', 'file-text');
m('fa-notes-medical', 'file-text'); m('fa-file-invoice', 'file-text');
m('fa-toggle-on', 'toggle-right'); m('fa-toggle-off', 'toggle-left');
m('fa-check-to-slot', 'checkmark-square-2');
m('fa-face-smile', 'smiling-face'); m('fa-smile', 'smiling-face');
m('fa-eye', 'eye'); m('fa-eye-slash', 'eye-off');
m('fa-crown', 'award'); m('fa-ranking-star', 'award');
m('fa-cut', 'scissors'); m('fa-scissors', 'scissors');
m('fa-radio', 'radio');
m('fa-plug-circle-check', 'charging'); m('fa-plug-circle-exclamation', 'charging');
m('fa-asterisk', 'star');
m('fa-bucket', 'inbox');
m('fa-font', 'text');
m('fa-circle', 'radio-button-on');
m('fa-spinner', 'refresh'); m('fa-circle-notch', 'refresh');
m('fa-user-graduate', 'person');
m('fa-user-check', 'person-done');
m('fa-user-pen', 'edit');
m('fa-user-plus', 'person-add');
m('fa-user-shield', 'shield');
m('fa-user-cog', 'settings');
m('fa-square', 'square');
m('fa-window-maximize', 'maximize'); m('fa-maximize', 'maximize');
m('fa-window-restore', 'browser');
m('fa-minimize', 'minimize');
m('fa-expand', 'expand');
m('fa-compress', 'collapse');
m('fa-mobile-screen-button', 'smartphone');
m('fa-people-arrows', 'people');
m('fa-brands.fa-github', 'github');
m('fa-left-long', 'arrow-back');
m('fa-pie-chart', 'pie-chart');

// 校验所有映射的 svg 存在
const missing = Object.entries(M).filter(([, eva]) => !fs.existsSync(path.join(EVA_BASE, eva + '.svg')));
if (missing.length) {
  console.error('缺失 svg:', missing.map(([fa, eva]) => `${fa}=>${eva}`).join(', '));
  process.exit(1);
}

// ── 生成 CSS ──
const blocks = [];
for (const fa in M) {
  const eva = M[fa];
  const svg = fs.readFileSync(path.join(EVA_BASE, eva + '.svg'), 'utf8');
  const uri = 'data:image/svg+xml,' + encodeURIComponent(svg);

  let color = 'currentColor';
  if (fa === 'fa-paper-plane') color = 'var(--on-accent,#2e3440)';
  if (fa === 'fa-plug-circle-exclamation') color = 'var(--danger,#bf616a)'; // 未连接：power 图标变红

  let sel;
  if (fa.startsWith('fa-brands.fa-')) {
    sel = '.fa-brands.fa-' + fa.slice(13) + '::before';
  } else {
    sel = '.' + fa + '::before';
  }

  blocks.push(sel + '{' +
    'content:""!important;display:inline-block!important;' +
    'width:1.1em!important;height:1.1em!important;' +
    'background-color:' + color + '!important;' +
    'mask-image:url("' + uri + '")!important;' +
    '-webkit-mask-image:url("' + uri + '")!important;' +
    'mask-size:contain!important;-webkit-mask-size:contain!important;' +
    'mask-repeat:no-repeat!important;-webkit-mask-repeat:no-repeat!important;' +
    'mask-position:center!important;-webkit-mask-position:center!important;' +
    'transition:background-color 200ms ease-in-out!important;}');

  blocks.push('.menu_button:not(.active):not(.selected):not(.red_button):hover ' + sel + ',.drawer-toggle:hover ' + sel + ',' +
    '.drawer-icon:hover ' + sel + ',.interactable:not(.tag):hover ' + sel +
    '{background-color:' + ACCENT + '!important}');
}

// 发送键 hover
blocks.push('#send_but:hover .fa-paper-plane::before{background-color:#2e3440!important}');

// fa-undo 别名组（FA 同一字形多个别名 class）
const undoSvg = fs.readFileSync(path.join(EVA_BASE, 'undo.svg'), 'utf8');
const undoUri = 'data:image/svg+xml,' + encodeURIComponent(undoSvg);
blocks.push('.fa-arrow-left-rotate::before,.fa-arrow-rotate-back::before,.fa-arrow-rotate-backward::before,.fa-arrow-rotate-left::before{' +
  'content:""!important;display:inline-block!important;width:1.1em!important;height:1.1em!important;' +
  'background-color:currentColor!important;' +
  'mask-image:url("' + undoUri + '")!important;-webkit-mask-image:url("' + undoUri + '")!important;' +
  'mask-size:contain!important;-webkit-mask-size:contain!important;' +
  'mask-repeat:no-repeat!important;-webkit-mask-repeat:no-repeat!important;' +
  'mask-position:center!important;-webkit-mask-position:center!important;' +
  'transition:background-color 200ms ease-in-out!important;}');
blocks.push('.menu_button:not(.active):not(.selected):not(.red_button):hover .fa-arrow-left-rotate::before,.menu_button:not(.active):not(.selected):not(.red_button):hover .fa-arrow-rotate-back::before,.menu_button:not(.active):not(.selected):not(.red_button):hover .fa-arrow-rotate-backward::before,.menu_button:not(.active):not(.selected):not(.red_button):hover .fa-arrow-rotate-left::before,' +
  '.drawer-toggle:hover .fa-arrow-left-rotate::before,.drawer-toggle:hover .fa-arrow-rotate-back::before,.drawer-toggle:hover .fa-arrow-rotate-backward::before,.drawer-toggle:hover .fa-arrow-rotate-left::before,' +
  '.interactable:not(.tag):hover .fa-arrow-left-rotate::before,.interactable:not(.tag):hover .fa-arrow-rotate-back::before,.interactable:not(.tag):hover .fa-arrow-rotate-backward::before,.interactable:not(.tag):hover .fa-arrow-rotate-left::before{background-color:' + ACCENT + '!important}');

// wifi 断开状态红色
const wifiSvg = fs.readFileSync(path.join(EVA_BASE, 'wifi.svg'), 'utf8');
const wifiUri = 'data:image/svg+xml,' + encodeURIComponent(wifiSvg);
blocks.push('.fa-wifi[style*="rgb(170"][style*="0, 0)"]::before{background-color:#bf616a!important;' +
  'mask-image:url("' + wifiUri + '")!important;-webkit-mask-image:url("' + wifiUri + '")!important;}');

console.log('CSS rules:', blocks.length);

const evaCSS = '/* ============================================================\n' +
' * Eva Icons fill 图标替换（' + Object.keys(M).length + ' FA 类名 → mask-image SVG）\n' +
' * Nord 官网同源图标库；24×24 viewBox，颜色=父级 currentColor 贯穿\n' +
' * 未映射的 FA 类（文本格式/品牌/跑团杂项）保留 FA 原生字形兜底\n' +
' * hover：.menu_button/.drawer-toggle/.drawer-icon/.interactable:hover → #88c0d0\n' +
' * ============================================================ */\n' + blocks.join('\n');

const finalCSS = baseCSS + '\n\n' + evaCSS;
const out = { ...cont, name: 'Nord-Contour', custom_css: finalCSS };
fs.writeFileSync(CONT, JSON.stringify(out, null, 2), 'utf8');

const chk = JSON.parse(fs.readFileSync(CONT, 'utf8'));
console.log('round-trip:', chk.custom_css === finalCSS ? 'OK' : 'FAIL');
console.log('name:', chk.name);
console.log('total:', finalCSS.length, 'chars (base', baseCSS.length, '+ eva', evaCSS.length, ')');
console.log('Contour preserved:', finalCSS.includes('welcomeHeaderLogo'));
console.log('Eva added:', finalCSS.includes('settings-2') && finalCSS.includes('mask-image'));
console.log('mappings:', Object.keys(M).length, '| hover blocks:', blocks.filter(b => b.includes('.drawer-toggle:hover')).length);
