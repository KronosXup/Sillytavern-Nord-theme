# Nord-Dark SillyTavern 主题

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

后续出 frost/aurora 多色变体时，只需改 `--accent` 与 `--accent-deep` 一处。

## 后续计划

- 主题色变体（aurora-red / aurora-green / aurora-purple 等）
- 图标替换（FA → Phosphor，与 Gruvbox 同源）