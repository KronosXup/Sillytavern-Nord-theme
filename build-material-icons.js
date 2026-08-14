// Nord Material Symbols(Sharp 描边) 图标追加构建器
// 从 build-eva-icons.js 换源而来：结构/管线一致，图标源改 @material-symbols/svg-400/sharp。
// Sharp 描边（非填充）风格。
// MS 没有品牌图标（discord/github）与个别杂项，保留 FA 原生兜底。
// 用法：一般不单独跑——由 scripts/build.js 在 sass 编译后调用（读 themes/Nord.json、追加图标块、写回）。
//       单独跑仅用于调试图标块本身（要求 JSON 里已有手写 CSS）。
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
// 图标源：本机 @material-symbols/svg-400/sharp 目录。用环境变量覆盖，默认 ../node_modules 下找。
const MS_BASE = process.env.MS_SVG_BASE || path.join(ROOT, 'node_modules/@material-symbols/svg-400/sharp/');
const CONT = path.join(ROOT, 'themes/Nord.json');
// hover 强调走语义令牌（:root --accent），不再硬编码 hex——令牌化后 accent 单点可换
const ACCENT = 'var(--accent)';

// 读当前产物(已含 Nord-Dark base + 纹理/hover/logo，不含旧图标块)
const cont = JSON.parse(fs.readFileSync(CONT, 'utf8'));
const baseCSS = cont.custom_css;
console.log('base CSS:', baseCSS.length, 'chars (Nord-Dark base)');

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
m('fa-1', 'token');                          // 词符计数器入口（Token Counter），统计整段聊天 token 总数
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
m('fa-asterisk', 'drag_handle');           // 提示词管理器拖拽把手（星号易误读为收藏）
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
m('fa-ghost', 'visibility_off');           // 隐藏楼层（AI 不读防超上下文）：FA 幽灵字形过高拉歪整列，取"不可见"语义
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

// ── 生成 CSS（瘦身结构：唯一 SVG 收进 :root 变量 → 公共声明一条选择器列表 → 每条只写 mask 引用）──
const blocks = [];
const hoverSels = [];   // 收集所有图标 ::before 选择器，末尾合并成一条共享 hover 规则

// fa-undo 别名组（FA 同一字形多个别名 class）——公共声明/引用/hover 全并进共享池
const undoAliases = ['.fa-arrow-left-rotate::before', '.fa-arrow-rotate-back::before', '.fa-arrow-rotate-backward::before', '.fa-arrow-rotate-left::before'];

// 选择器生成（fa-brands 特殊拼接保留）
const selFor = (fa) => fa.startsWith('fa-brands.fa-') ? '.fa-brands.fa-' + fa.slice(13) + '::before' : '.' + fa + '::before';

// 1) 收集唯一图标文件 → :root 变量（--ms-<iconname>）
const varNames = {};   // iconname -> var 名
const varDecls = [];
for (const ms of new Set([...Object.values(M), 'star-fill', 'wifi', 'flag-fill'])) {
  const vname = '--ms-' + ms;
  const svg = fs.readFileSync(path.join(MS_BASE, ms + '.svg'), 'utf8');
  const uri = 'data:image/svg+xml,' + encodeURIComponent(svg);
  varNames[ms] = vname;
  varDecls.push('  ' + vname + ': url("' + uri + '");');
}
blocks.push(':root{\n' + varDecls.join('\n') + '\n}');

// 2) 公共声明：全部映射 + undo 别名 + 星标激活态选择器一条列表
// （content 清字形/图标盒/mask 渲染/hover 过渡；星标激活态另有 mask fill + warn 色覆盖，特异性更高）
const allSels = [...Object.keys(M).map(selFor), ...undoAliases, '.fa-star.fav_on::before', '.ch_fav_icon.fa-star::before', '.group_fav_icon.fa-star::before'];
blocks.push(allSels.join(',\n') + '{\n' +
  '  content:""!important;display:inline-block!important;\n' +
  '  width:1.1em!important;height:1.1em!important;\n' +
  '  background-color:currentColor!important;\n' +
  '  mask-size:contain!important;-webkit-mask-size:contain!important;\n' +
  '  mask-repeat:no-repeat!important;-webkit-mask-repeat:no-repeat!important;\n' +
  '  mask-position:center!important;-webkit-mask-position:center!important;\n' +
  '  transition:background-color 200ms ease-in-out!important;\n}');

// 3) mask 引用：同一图标的多 class 合并一条（按图标分组）
const groups = {};
for (const fa in M) {
  const ms = M[fa];
  (groups[ms] || (groups[ms] = [])).push(selFor(fa));
}
for (const ms in groups) {
  const v = varNames[ms];
  blocks.push(groups[ms].join(',') + '{mask-image:var(' + v + ')!important;-webkit-mask-image:var(' + v + ')!important;}');
}
// undo 别名组引用（别名不在 M 表，单独补 mask）
blocks.push(undoAliases.join(',') + '{mask-image:var(' + varNames['undo'] + ')!important;-webkit-mask-image:var(' + varNames['undo'] + ')!important;}');

// 4) 染色特例（放公共块后，同特异性后者胜覆盖 bg）：发送键 accent / 未连接 danger
blocks.push('.fa-paper-plane::before{background-color:var(--accent)!important}');
blocks.push('.fa-plug-circle-exclamation::before{background-color:var(--danger)!important}');

// 发送键 hover：ghost 底上图标保持 accent（底色淡染由基座 #send_but:hover 负责）
blocks.push('#send_but:hover .fa-paper-plane::before{background-color:var(--accent)!important}');

// 实心星：收藏激活态换 fill（fav_on / ch_fav_icon / group_fav_icon）
blocks.push('.fa-star.fav_on::before,.ch_fav_icon.fa-star::before,.group_fav_icon.fa-star::before{' +
  'mask-image:var(' + varNames['star-fill'] + ')!important;-webkit-mask-image:var(' + varNames['star-fill'] + ')!important;' +
  'background-color:var(--warn)!important;}');

// wifi 断开状态红色
blocks.push('.fa-wifi[style*="rgb(170"][style*="0, 0)"]::before{background-color:var(--danger)!important;' +
  'mask-image:var(' + varNames['wifi'] + ')!important;-webkit-mask-image:var(' + varNames['wifi'] + ')!important;}');

// 检查点状态：无存档点显示创建按钮(mes_create_bookmark, fa-flag-checkered 描边)、
// 有存档点显示打开按钮(mes_bookmark, fa-solid fa-flag 实心)。
// 创建按钮 class 里 fa-regular/fa-solid 恒共存，不能拿 fa-solid 当状态判断（曾误覆盖成实心）；
// 打开按钮专用规则压成 flag-fill（特异性 (0,2,0) 压过 .fa-flag::before 基础描边引用）
blocks.push('#chat .mes .mes_bookmark::before{mask-image:var(' + varNames['flag-fill'] + ')!important;-webkit-mask-image:var(' + varNames['flag-fill'] + ')!important;}');

// hover 收集：映射图标（发送键不共享）+ undo 别名
for (const fa in M) if (fa !== 'fa-paper-plane') hoverSels.push(selFor(fa));
hoverSels.push(...undoAliases);

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
' * 960 网格 viewBox；描边（非填充）风格\n' +
' * 颜色=父级 currentColor 贯穿；未映射 FA 类（品牌/杂项）保留 FA 原生\n' +
' * hover 边界：普通按钮/顶栏/抽屉→var(--accent)；active/selected/red_button/tag 不染\n' +
' * 令牌化：hover 合并为末尾一条共享规则（原 247 条 per-icon 重复声明收敛），accent 单点可换\n' +
' * ============================================================ */\n' + blocks.join('\n');

const finalCSS = baseCSS + '\n\n' + msCSS;
const out = { ...cont, name: 'Nord', custom_css: finalCSS };
fs.writeFileSync(CONT, JSON.stringify(out, null, 2), 'utf8');

const chk = JSON.parse(fs.readFileSync(CONT, 'utf8'));
console.log('round-trip:', chk.custom_css === finalCSS ? 'OK' : 'FAIL');
console.log('name:', chk.name);
console.log('total:', finalCSS.length, 'chars (base', baseCSS.length, '+ ms', msCSS.length, ')');
console.log('Nord preserved:', finalCSS.includes('welcomeHeaderLogo'));
console.log('MS added:', finalCSS.includes('mask-image') && finalCSS.includes('Material Symbols Sharp'));
console.log('mappings:', Object.keys(M).length, '| hover blocks:', blocks.filter(b => b.includes('.drawer-toggle:hover')).length);
