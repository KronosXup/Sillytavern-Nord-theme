# 交接 / 开发指南（给接手的模型或人）

> 这份文件是「当前状态 + 怎么构建 + 关键坑」的快照。接手时先读完这份再动手。

## 这是什么

SillyTavern 主题，Nord 配色（暗版）。主线成品是 `themes/Contour-Nord.json`。

## 构建（唯一入口）

```bash
npm install        # 仅首次，装 sass
npm run build      # 构建 + 语义对账 + 写入 themes/Contour-Nord.json
npm run verify     # 只对账不写入
```

环境变量 `MS_SVG_BASE` 指向本机 `@material-symbols/svg-400/sharp/` 目录（图标 svg 源），默认 `node_modules/@material-symbols/svg-400/sharp/`（即 `npm i @material-symbols/svg-400` 后免设）。

## 目录结构与职责

- `src/parts/*.scss` — **手写 CSS 的唯一源头**。按文件名排序拼接：
  - `01-tokens.scss`：`:root` 原子色（--nord0~15）+ 语义令牌（--bg/--accent/...）+ 字体加载
  - `02-global.scss`：全局字体/面板/标题/按钮/状态色/主操作/输入区/select2/base-select
  - `03-chat.scss`：聊天区/正文格式/代码块
  - `04-chrome.scss`：滚动条/选区/标签/滑条/浮层/toastr/头像/顶栏/链接/tooltip/列表/设置面板/圆角/引号/全局克制
  - `05-modern-ui.scss`：酒馆助手 modern-ui 适配（`body.th-modern-enabled` 限定）
  - `06-append.scss`：等高线纹理 + logo + 玻璃 UI + 发送栏（**纹理/logo 是 `__TEXTURE_TR__`/`__TEXTURE_BL__`/`__LOGO_URI__` 占位符**，由 build.js 注入 data-uri）
  - `07-mobile-header.scss`：移动端消息头三行布局（`--mb-*` 变量）
  - `08-a-fixes.scss`：A 档纯修复（A2~A18，源自 Gruvbox 移植清单）
- `scripts/build.js` — 构建链：拼接 → sass 编译（占位符旁路 ATTR_RE/RGBA1_RE）→ 纹理/logo 注入 → 调 `build-material-icons.js` 追加图标包 → 语义对账 → 写回。
- `build-material-icons.js` — Material Symbols Sharp 图标包生成器（452K data-uri）。**一般不单独跑**，由 build.js 调用；单独跑仅调试图标块（要求 JSON 已有手写 CSS）。
- `src/contour-base.json` — **元数据模板**：ST 主题的非 custom_css 字段（颜色/开关等）的唯一源。其 `custom_css` 字段是占位注释（真 CSS 在 parts）。
- `themes/Contour-Nord.json` — **产物**，勿手改。

## 改样式的正确姿势

1. 改 `src/parts/` 里对应的 `.scss` 文件（**不要**改成品 JSON，也不要新建 build-nord-contour.js 之类的旧入口）。
2. `npm run build`（图标源不在默认位置就 `MS_SVG_BASE=<路径> npm run build`）。
3. 对账失败 = sass 改写了你的语法 → 在 build.js 的占位符旁路加规则（参照 ATTR_RE/RGBA1_RE）。
4. **有意改样式**（对账必然失败）时用 `npm run build -- --force` 跳过对账。
5. 部署：把 `themes/Contour-Nord.json` 拷到 ST 的 `data/<用户>/themes/`。

## 关键坑（踩过的）

- **sass 会改写格式**：剥属性选择器引号、`rgba(...,1)`→`rgb()`、小数补前导零、引号统一双引号、任意重排空白。对账器（ruleSet + normRule）已把这些规范化掉，只比内容骨架。
- **纹理/logo 的 data-uri 不能写进 scss**（`%`/`#`/引号会炸），必须用占位符，build.js 编译后注入。
- **Material 图标包 452K 不进 scss**，是生成器产物，最后追加。
- 旧入口 `build-nord-contour.js` 已删除，逻辑在 `scripts/build.js`（纹理生成器）+ `src/parts/`（CSS 本体）。

## 部署目标（本机两套 ST）

- `D:\Luker\data\default-user\themes\`（主，8001 端口）
- `D:\SillyTavern-1.18.0\data\default-user\themes\`（8000 端口）

## 背景参考

- 移植清单（A/B/C/D 档，含每条修复的「不修会怎样」）：本地文件 `Nord-移植清单.md`（**未跟踪进库**，在仓库根目录，gitignore 挡着）。
