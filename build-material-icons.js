// Nord-Contour Material Symbols(Sharp 描边) 图标追加构建器
// 从 build-eva-icons.js 换源而来：结构/管线一致，图标源改 @material-symbols/svg-400/sharp。
// Sharp 细描边+尖角收尾，贴合 Nord 冰/棱角气质；非填充（描边）风格。
// MS 没有品牌图标（discord/github）与个别杂项，保留 FA 原生兜底。
// 用法：一般不单独跑——由 scripts/build.js 在 sass 编译后调用（读 themes/Contour-Nord.json、追加图标块、写回）。
//       单独跑仅用于调试图标块本身（要求 JSON 里已有手写 CSS）。
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
// 图标源：本机 @material-symbols/svg-400/sharp 目录。用环境变量覆盖，默认 ../node_modules 下找。
const MS_BASE = process.env.MS_SVG_BASE || path.join(ROOT, 'node_modules/@material-symbols/svg-400/sharp/');
const CONT = path.join(ROOT, 'themes/Contour-Nord.json');
// hover 强调走语义令牌（:root --accent），不再硬编码 hex——令牌化后 accent 单点可换
const ACCENT = 'var(--accent)';

// 读当前 Contour(已含 Nord-Dark base + Contour 纹理/hover/logo，不含旧图标块)
const cont = JSON.parse(fs.readFileSync(CONT, 'utf8'));
const baseCSS = cont.custom_css;
console.log('base CSS:', baseCSS.length, 'chars (Nord-Dark + Contour)');

// ── FA 类名 → Material Symbols 图标名（sharp/<name>.svg）──
const M = {};
const m = (fa, ms) => { M[fa] = ms; };

m('fa-cog', 'settings'); m('fa-gear', 'settings');
m('fa-plug', 'power');
m('fa-plug-circle-exclamation', 'power_off');   // 未连接：power_off（带斜杠）+ 红色特例染色
m('fa-plug-circle-check', 'power');
m('fa-cubes', 'widgets');
m('fa-palette', 'palette');
m('fa-address-card', 'badge');
m('fa-user', 'person'); m('fa-user-circle', 'account_circle');
m('fa-shield-halved', 'shield');
m('fa-lock', 'lock'); m('fa-unlock', 'lock_open'); m('fa-lock-open', 'lock_open');
m('fa-users', 'group'); m('fa-users-gear', 'group');
m('fa-right-from-bracket', 'logout');
m('fa-power-off', 'power_off');
m('fa-grip', 'drag_indicator');
m('fa-desktop', 'desktop_windows');
m('fa-sun', 'light_mode'); m('fa-moon', 'dark_mode');
m('fa-circle-info', 'info'); m('fa-info-circle', 'info');
m('fa-circle-question', 'help'); m('fa-question-circle', 'help');
m('fa-chevron-down', 'keyboard_arrow_down'); m('fa-chevron-up', 'keyboard_arrow_up');
m('fa-chevron-left', 'keyboard_arrow_left'); m('fa-chevron-right', 'keyboard_arrow_right');
m('fa-circle-chevron-down', 'keyboard_arrow_down'); m('fa-circle-chevron-up', 'keyboard_arrow_up');
m('fa-arrow-left', 'arrow_back'); m('fa-arrow-right', 'arrow_forward');
m('fa-undo', 'undo'); m('fa-redo', 'redo');
m('fa-repeat', 'repeat');
m('fa-rotate', 'sync'); m('fa-sync', 'sync');
m('fa-arrows-rotate', 'refresh'); m('fa-refresh', 'refresh');
m('fa-paper-plane', 'send');
m('fa-microphone-lines', 'mic');
m('fa-volume-high', 'volume_up'); m('fa-volume-low', 'volume_down');
m('fa-headphones', 'headphones');
m('fa-play', 'play_circle'); m('fa-circle-play', 'play_circle');
m('fa-circle-stop', 'stop_circle'); m('fa-pause', 'pause_circle'); m('fa-stop', 'stop_circle');
m('fa-thumbtack', 'fiber_pin'); m('fa-thumb-tack', 'fiber_pin'); // MS 无 push_pin，fiber_pin 最近
m('fa-pen-to-square', 'edit'); m('fa-pencil', 'edit'); m('fa-edit', 'edit');
m('fa-trash', 'delete'); m('fa-trash-can', 'delete'); m('fa-trash-alt', 'delete');
m('fa-star', 'star'); m('fa-heart', 'favorite'); m('fa-bookmark', 'bookmark');
m('fa-link', 'link'); m('fa-chain', 'link');
m('fa-chain-broken', 'link_off'); m('fa-link-slash', 'link_off');
m('fa-paperclip', 'attach_file');
m('fa-at', 'alternate_email'); m('fa-hashtag', 'tag');
m('fa-external-link', 'open_in_new'); m('fa-up-right-from-square', 'open_in_new');
m('fa-share-from-square', 'share');
m('fa-plus', 'add'); m('fa-plus-square', 'add_box'); m('fa-minus', 'remove');
m('fa-times', 'close'); m('fa-xmark', 'close'); m('fa-x', 'close'); m('fa-close', 'close'); m('fa-cancel', 'close');
m('fa-check', 'check'); m('fa-check-double', 'done_all');
m('fa-circle-check', 'check_circle');
m('fa-circle-xmark', 'cancel');
m('fa-circle-exclamation', 'error');
m('fa-exclamation-triangle', 'warning'); m('fa-triangle-exclamation', 'warning');
m('fa-file-alt', 'description'); m('fa-file-lines', 'description');
m('fa-file-arrow-up', 'upload');
m('fa-file-export', 'download'); m('fa-file-import', 'upload');
m('fa-file-circle-plus', 'note_add');
m('fa-file-zipper', 'folder_zip');
m('fa-folder', 'folder'); m('fa-folder-open', 'folder_open');
m('fa-folder-plus', 'create_new_folder'); m('fa-folder-minus', 'folder_delete'); m('fa-folder-tree', 'account_tree');
m('fa-clipboard-list', 'checklist'); m('fa-paste', 'content_paste');
m('fa-copy', 'content_copy'); m('fa-clone', 'content_copy');
m('fa-save', 'save'); m('fa-download', 'download'); m('fa-upload', 'upload');
m('fa-cloud-arrow-down', 'cloud_download');
m('fa-magnifying-glass', 'search'); m('fa-search', 'search');
m('fa-filter', 'filter_list'); m('fa-filter-circle-xmark', 'filter_list');
m('fa-comment', 'chat_bubble'); m('fa-comment-dots', 'chat_bubble');
m('fa-comments', 'forum'); m('fa-message', 'chat_bubble');
m('fa-comment-slash', 'comments_disabled');
m('fa-envelope-open-text', 'mail'); m('fa-envelope', 'mail');
m('fa-bullhorn', 'campaign');
m('fa-code', 'code'); m('fa-terminal', 'terminal');
m('fa-code-branch', 'call_split'); m('fa-code-compare', 'compare');
m('fa-bug', 'bug_report'); m('fa-bug-slash', 'bug_report');
m('fa-database', 'database');
m('fa-image', 'image'); m('fa-image-portrait', 'image'); m('fa-panorama', 'panorama');
m('fa-images', 'photo_library'); m('fa-photo-film', 'photo_library');
m('fa-film', 'movie'); m('fa-music', 'music_note');
m('fa-paintbrush', 'brush'); m('fa-pen-ruler', 'architecture');
m('fa-compass-drafting', 'architecture');
m('fa-object-ungroup', 'layers');
m('fa-sliders', 'tune');
m('fa-wrench', 'build'); m('fa-tools', 'build');
m('fa-ellipsis', 'more_horiz'); m('fa-ellipsis-h', 'more_horiz');
m('fa-ellipsis-vertical', 'more_vert');
m('fa-bars', 'menu');
m('fa-bell', 'notifications');
m('fa-bolt', 'electric_bolt');
m('fa-lightbulb', 'lightbulb');
m('fa-key', 'key');
m('fa-globe', 'public'); m('fa-language', 'language');
m('fa-wifi', 'wifi');
m('fa-clock-rotate-left', 'history');
m('fa-tag', 'sell'); m('fa-tags', 'sell');
m('fa-list', 'list'); m('fa-list-check', 'checklist');
m('fa-list-ol', 'format_list_numbered'); m('fa-list-ul', 'format_list_bulleted');
m('fa-gamepad', 'sports_esports');
m('fa-book', 'menu_book'); m('fa-book-open-reader', 'auto_stories'); m('fa-book-atlas', 'map');
m('fa-flag', 'flag'); m('fa-flag-checkered', 'flag');
m('fa-flask', 'science');
m('fa-calculator', 'calculate');
m('fa-scale-balanced', 'balance');
m('fa-briefcase', 'work'); m('fa-toolbox', 'work');
m('fa-archive', 'inventory_2');
m('fa-id-card', 'badge'); m('fa-address-book', 'menu_book');
m('fa-right-left', 'swap_horiz'); m('fa-arrow-right-arrow-left', 'swap_horiz');
m('fa-recycle', 'recycling');
m('fa-table', 'table'); m('fa-table-cells-large', 'grid_view');
m('fa-table-columns', 'view_column');
m('fa-chart-line', 'trending_up');
m('fa-square-poll-horizontal', 'monitoring');
m('fa-function', 'functions');
m('fa-robot', 'smart_toy');
m('fa-magic-wand-sparkles', 'wand_stars'); m('fa-wand-magic', 'wand_stars'); m('fa-wand-magic-sparkles', 'wand_stars');
m('fa-note-sticky', 'sticky_note_2'); m('fa-sticky-note', 'sticky_note_2');
m('fa-notes-medical', 'medical_information'); m('fa-file-invoice', 'receipt');
m('fa-toggle-on', 'toggle_on-fill'); m('fa-toggle-off', 'toggle_off'); // 开=实心fill、关=空心
m('fa-check-to-slot', 'task_alt');
m('fa-face-smile', 'mood'); m('fa-smile', 'mood'); m('fa-grin', 'mood'); m('fa-surprise', 'mood');
m('fa-frown', 'sentiment_dissatisfied'); m('fa-meh', 'sentiment_neutral');
m('fa-angry', 'sentiment_very_dissatisfied'); m('fa-tired', 'sentiment_very_dissatisfied');
m('fa-thumbs-up', 'thumb_up'); m('fa-thumbs-down', 'thumb_down');
m('fa-eye', 'visibility'); m('fa-eye-slash', 'visibility_off');
m('fa-square-root-variable', 'functions');
m('fa-dice-d20', 'casino'); m('fa-dice-d6', 'casino');
m('fa-crown', 'crown'); m('fa-ranking-star', 'workspace_premium');
m('fa-skull', 'skull');
m('fa-cut', 'content_cut'); m('fa-scissors', 'content_cut');
m('fa-sd-card', 'sd_card');
m('fa-radio', 'radio');
m('fa-truck-arrow-right', 'local_shipping');
m('fa-circle-nodes', 'hub');
m('fa-asterisk', 'star');
m('fa-bucket', 'inbox');
m('fa-hand-pointer', 'pan_tool');
m('fa-font', 'title');
m('fa-bold', 'format_bold'); m('fa-italic', 'format_italic');
m('fa-underline', 'format_underlined'); m('fa-strikethrough', 'strikethrough_s');
m('fa-circle', 'circle');
m('fa-spinner', 'sync'); m('fa-circle-notch', 'sync');
m('fa-satellite-dish', 'satellite_alt');
m('fa-person-circle-question', 'quiz');
m('fa-keyboard', 'keyboard');
m('fa-user-graduate', 'school');
m('fa-user-check', 'person_check');
m('fa-user-pen', 'edit');
m('fa-user-plus', 'person_add');
m('fa-user-shield', 'shield');
m('fa-user-gear', 'manage_accounts'); m('fa-user-cog', 'manage_accounts');
m('fa-square', 'square');
m('fa-window-maximize', 'open_in_full'); m('fa-maximize', 'open_in_full');
m('fa-window-restore', 'close_fullscreen'); m('fa-minimize', 'close_fullscreen');
m('fa-expand', 'fullscreen'); m('fa-compress', 'fullscreen_exit');
m('fa-people-arrows', 'group');
m('fa-left-long', 'arrow_back');
m('fa-pie-chart', 'pie_chart');

// ── 补漏（对照 Gruvbox 261 图标清单，Nord 缺的 41 个真实缺口；discord/github 品牌保留 FA）──
m('fa-arrow-down-1-9', 'arrow_downward_alt'); m('fa-arrow-down-9-1', 'arrow_downward_alt');
m('fa-arrow-right-to-bracket', 'login'); m('fa-arrows-alt', 'open_in_full');
m('fa-book-bookmark', 'bookmark_added');   // 柏宝书入口
m('fa-broom', 'clean_hands');              // MS 无 broom，语义最近
m('fa-cake-candles', 'cake');
m('fa-calendar', 'calendar_month'); m('fa-calendar-alt', 'calendar_month');
m('fa-calendar-check', 'calendar_clock'); m('fa-calendar-days', 'calendar_month');  // 构画入口
m('fa-champagne-glasses', 'celebration');
m('fa-circle-dot', 'pending'); m('fa-circle-half-stroke', 'brightness_4');
m('fa-clock', 'schedule');
m('fa-crosshairs', 'center_focus_strong');  // MS 无 crosshair，取瞄准语义
m('fa-diagram-project', 'account_tree');
m('fa-floppy-disk', 'save');
m('fa-forward', 'fast_forward');
// fa-ghost 不映射：MS 无幽灵图标，隐藏助手入口保留 FA 原生幽灵字形（笑脸语义不对）
m('fa-globe-asia', 'language');
m('fa-grip-lines', 'view_carousel');        // MS 无 grip-lines，取横条语义
m('fa-i-cursor', 'text_fields');
m('fa-layer-group', 'layers');
m('fa-location-crosshairs', 'location_searching'); m('fa-location-dot', 'my_location');
m('fa-markdown', 'description');
m('fa-masks-theater', 'theater_comedy');
m('fa-mobile-screen-button', 'mobile_2');
m('fa-passport', 'maps_ugc');              // MS 无 passport，取通行证语义
m('fa-pen', 'draw');                        // MS 无 pen，draw 最近（fa-pen 是旧别名）
m('fa-rotate-left', 'rotate_left'); m('fa-rotate-right', 'rotate_right');
m('fa-route', 'route');                     // 追踪激活来源
m('fa-scroll', 'history_edu');
m('fa-shuffle', 'sync');                    // MS 无 shuffle，sync 语义最近
m('fa-up-right-and-down-left-from-center', 'contract');
m('fa-user-secret', 'badge');               // AI 帮答入口，取身份语义
m('fa-user-tie', 'verified_user');

// 校验所有映射的 svg 存在
const missing = Object.entries(M).filter(([, ms]) => !fs.existsSync(path.join(MS_BASE, ms + '.svg')));
if (missing.length) {
  console.error('缺失 svg:', missing.map(([fa, ms]) => `${fa}=>${ms}`).join(', '));
  process.exit(1);
}

// ── 生成 CSS ──
const blocks = [];
const hoverSels = [];   // 收集所有图标 ::before 选择器，末尾合并成一条共享 hover 规则
for (const fa in M) {
  const ms = M[fa];
  const svg = fs.readFileSync(path.join(MS_BASE, ms + '.svg'), 'utf8');
  const uri = 'data:image/svg+xml,' + encodeURIComponent(svg);

  let color = 'currentColor';
  if (fa === 'fa-paper-plane') color = 'var(--accent)'; // 发送键 ghost 化：frost 描边图标
  if (fa === 'fa-plug-circle-exclamation') color = 'var(--danger)'; // 未连接：power 变红

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

  // fa-paper-plane 发送键常态 accent，hover 也走 accent（ghost 底上不融底），不共享 hover 规则
  if (fa !== 'fa-paper-plane') hoverSels.push(sel);
}

// 发送键 hover：ghost 底上图标保持 accent（底色淡染由基座 #send_but:hover 负责）
blocks.push('#send_but:hover .fa-paper-plane::before{background-color:var(--accent)!important}');

// 实心星：收藏激活态换 fill（fav_on / ch_fav_icon / group_fav_icon）
const starFillSvg = fs.readFileSync(path.join(MS_BASE, 'star-fill.svg'), 'utf8');
const starFillUri = 'data:image/svg+xml,' + encodeURIComponent(starFillSvg);
blocks.push('.fa-star.fav_on::before,.ch_fav_icon.fa-star::before,.group_fav_icon.fa-star::before{' +
  'mask-image:url("' + starFillUri + '")!important;-webkit-mask-image:url("' + starFillUri + '")!important;' +
  'background-color:var(--warn)!important;}');

// fa-undo 别名组（FA 同一字形多个别名 class）——base 规则照推，hover 选择器并进共享池
const undoSvg = fs.readFileSync(path.join(MS_BASE, 'undo.svg'), 'utf8');
const undoUri = 'data:image/svg+xml,' + encodeURIComponent(undoSvg);
const undoAliases = ['.fa-arrow-left-rotate::before', '.fa-arrow-rotate-back::before', '.fa-arrow-rotate-backward::before', '.fa-arrow-rotate-left::before'];
blocks.push(undoAliases.join(',') + '{' +
  'content:""!important;display:inline-block!important;width:1.1em!important;height:1.1em!important;' +
  'background-color:currentColor!important;' +
  'mask-image:url("' + undoUri + '")!important;-webkit-mask-image:url("' + undoUri + '")!important;' +
  'mask-size:contain!important;-webkit-mask-size:contain!important;' +
  'mask-repeat:no-repeat!important;-webkit-mask-repeat:no-repeat!important;' +
  'mask-position:center!important;-webkit-mask-position:center!important;' +
  'transition:background-color 200ms ease-in-out!important;}');
hoverSels.push(...undoAliases);

// wifi 断开状态红色
const wifiSvg = fs.readFileSync(path.join(MS_BASE, 'wifi.svg'), 'utf8');
const wifiUri = 'data:image/svg+xml,' + encodeURIComponent(wifiSvg);
blocks.push('.fa-wifi[style*="rgb(170"][style*="0, 0)"]::before{background-color:var(--danger)!important;' +
  'mask-image:url("' + wifiUri + '")!important;-webkit-mask-image:url("' + wifiUri + '")!important;}');

// ── 共享 hover 规则（一条替代原先 247 条 per-icon 重复声明）──
// .interactable 分支排除菜单（#extensionsMenu/#options）——菜单项是 .interactable，hover 时
// 图标会被染 accent，而菜单 hover 已有自身背景/文字变色，图标该跟随文字色
const HOVER_CTX = ['.menu_button:not(.active):not(.selected):not(.red_button):not(.fav_on):hover', '.drawer-toggle:hover', '.drawer-icon:hover', '.interactable:not(.tag):not(.active):not(.selected):not(.fav_on):not(:is(#extensionsMenu *, #options *)):hover'];
const hoverCombined = [];
for (const s of hoverSels) for (const ctx of HOVER_CTX) hoverCombined.push(ctx + ' ' + s);
blocks.push('/* 图标 hover 染 accent（共享一条，accent 语义令牌单点可换；active/selected/red_button/tag 边界不染） */\n' +
  hoverCombined.join(',\n') + '{background-color:' + ACCENT + '!important}');

console.log('CSS rules:', blocks.length);

const msCSS = '/* ============================================================\n' +
' * Material Symbols Sharp 图标替换（' + Object.keys(M).length + ' FA 类名 → mask-image SVG）\n' +
' * 细描边+尖角收尾，贴合 Nord 冰/棱角气质；960 网格 viewBox\n' +
' * 颜色=父级 currentColor 贯穿；未映射 FA 类（品牌/杂项）保留 FA 原生\n' +
' * hover 边界：普通按钮/顶栏/抽屉→var(--accent)；active/selected/red_button/tag 不染\n' +
' * 令牌化：hover 合并为末尾一条共享规则（原 247 条 per-icon 重复声明收敛），accent 单点可换\n' +
' * ============================================================ */\n' + blocks.join('\n');

const finalCSS = baseCSS + '\n\n' + msCSS;
const out = { ...cont, name: 'Contour-Nord', custom_css: finalCSS };
fs.writeFileSync(CONT, JSON.stringify(out, null, 2), 'utf8');

const chk = JSON.parse(fs.readFileSync(CONT, 'utf8'));
console.log('round-trip:', chk.custom_css === finalCSS ? 'OK' : 'FAIL');
console.log('name:', chk.name);
console.log('total:', finalCSS.length, 'chars (base', baseCSS.length, '+ ms', msCSS.length, ')');
console.log('Contour preserved:', finalCSS.includes('welcomeHeaderLogo'));
console.log('MS added:', finalCSS.includes('mask-image') && finalCSS.includes('Material Symbols Sharp'));
console.log('mappings:', Object.keys(M).length, '| hover blocks:', blocks.filter(b => b.includes('.drawer-toggle:hover')).length);
