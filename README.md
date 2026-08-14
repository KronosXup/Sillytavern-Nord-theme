# SillyTavern Nord 主题

Nord 配色（arctic, north-bluish）的 SillyTavern 主题，暗版。

## 设计

- 遵循 [Nord](https://www.nordtheme.com/) 官方设计哲学：clean/uncluttered、flat 纯色无渐变
- Polar Night 深底 + Snow Storm 浅前景
- Frost 冰青（nord8 `#88c0d0`）作主强调色
- Aurora 极光作语义态：红=错误、黄=警告、绿=成功（紫=数字/字面量，仅语法高亮）；info 用 frost 雾蓝 nord9
- 字体与分层取自官网设计系统：Rubik（UI，中文回落 HarmonyOS Sans SC，可读性选择）+ Source Code Pro（等宽）、双向明度分层（浮起/下沉）、发丝线回归（nord2/nord3，官方 passive border）、浮层极微阴影、easeOutCubic 动效
- 小锐角（3px），不用大圆角

## 令牌架构

`custom_css` 顶部 `:root` 分两层：

- 第一层 `--nord0`~`--nord15`：Nord 原子色（固定）
- 第二层 `--bg`/`--accent`/`--danger` 等：语义令牌（**变体只改这层**）

## 构建

主线 **Nord**，SCSS 分件结构：

```
npm install          # 装 sass（仅首次）
npm run build        # src/parts/*.scss → sass 编译 → 纹理/logo 注入 → Material 图标包 → 语义对账 → themes/Nord.json
npm run verify       # 只对账不写入
```

- 手写 CSS 在 `src/parts/*.scss`（按文件名排序拼接：`01-tokens` / `02-global` / `03-chat` / `04-chrome` / `05-modern-ui` / `06-append` / `07-mobile-header` / `08-a-fixes`），改样式直接编辑对应文件。
- 等高线纹理 / logo 是 `scripts/build.js` 里的 SVG data-uri 生成器（JS 逻辑），在 `06-append.scss` 里以 `__TEXTURE_TR__`/`__TEXTURE_BL__`/`__LOGO_URI__` 占位符注入。
- Material 图标包（452K data-uri）由 `build-material-icons.js` 从 `@material-symbols/svg-400/sharp` 生成，图标源路径走环境变量 `MS_SVG_BASE`（默认 `node_modules/@material-symbols/svg-400/sharp/`）。
- 构建带语义对账：sass 重排格式后，新旧产物按「规则集合」比对，不一致拒绝写入。

## 安装

把 `themes/Nord.json` 放进 SillyTavern 的 `data/<用户>/themes/`，在设置里选 **Nord**。
