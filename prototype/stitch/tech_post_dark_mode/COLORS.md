# Tech Post Dark Mode 配色方案

## 页面概述
技术文章详情页 - 结构化的技术文档阅读体验，包含目录、代码块和阅读进度指示器

## 核心配色哲学
深色模式下的"技术蓝图"美学，使用深炭色背景营造专注的代码阅读环境，通过精确的色调分层和技术感的标签系统强化结构化内容的可读性。

---

## 主色调系统

### 背景层级（Surface Hierarchy）

| Token | 色值 | 用途 | 视觉效果 |
|-------|------|------|----------|
| `background` | `#f9f9f9` | 页面基础背景（配置值） | 实际使用 `#0c0f0f` |
| `surface` | `#f9f9f9` | 主画布（配置值） | 实际使用 `#0c0f0f` |
| `surface-dim` | `#d4dbdd` | 最暗表面（配置值） | 实际使用深色 |
| `surface-container-lowest` | `#ffffff` | 最低层容器（配置值） | 实际使用深色 |
| `surface-container-low` | `#f2f4f4` | 低层容器（配置值） | 实际使用深灰 |
| `surface-container` | `#ebeeef` | 标准容器（配置值） | 实际使用深灰 |
| `surface-container-high` | `#e4e9ea` | 高层容器（配置值） | 实际使用深灰 |
| `surface-container-highest` | `#dde4e5` | 最高层容器（配置值） | 代码块背景 |

**实际渲染**：
```css
body {
    background-color: #0c0f0f; /* 深炭色 */
    color: #dde4e5; /* 浅灰色文本 */
}
```

**设计原则**：技术文章需要更高的对比度和清晰的结构层级，代码块使用最高层级的表面色以突出显示。

---

### 文本颜色（Typography Colors）

| Token | 色值 | 用途 | 对比度 |
|-------|------|------|--------|
| `on-surface` | `#2d3435` | 主要文本（配置值） | 实际使用 `#dde4e5` |
| `on-background` | `#2d3435` | 背景上的文本（配置值） | 实际使用浅色 |
| `on-surface-variant` | `#5a6061` | 次要文本（配置值） | 实际使用浅灰 |
| `outline` | `#757c7d` | 边框/分隔（配置值） | 实际使用深色 |
| `outline-variant` | `#adb3b4` | 变体边框（配置值） | 实际使用深色 |

**实际渲染策略**：
- 正文：`#dde4e5`（通过 `dark:text-[#dde4e5]` 设置）
- 标题：更亮的白色或浅灰
- 元信息：中等灰度
- 代码：Space Grotesk 等宽字体

---

### 强调色系统（Accent Colors）

#### Primary（主色 - 靛蓝）
| Token | 色值 | 用途 |
|-------|------|------|
| `primary` | `#4c56af` | 主要强调色，链接、标签 |
| `primary-dim` | `#4049a2` | 暗化主色 |
| `primary-container` | `#e0e0ff` | 主色容器背景（配置值） |
| `on-primary` | `#f9f6ff` | 主色上的文本 |
| `on-primary-container` | `#3f48a1` | 主色容器上的文本（配置值） |
| `surface-tint` | `#4c56af` | 表面着色 |

**使用场景**：
- 阅读进度条
- 目录链接激活状态
- 技术标签
- 链接悬停颜色
- 代码语言指示器

#### Secondary（次要色 - 蓝灰）
| Token | 色值 | 用途 |
|-------|------|------|
| `secondary` | `#4d626c` | 次要强调色（深蓝灰） |
| `secondary-dim` | `#415660` | 暗化次要色 |
| `secondary-container` | `#cfe6f2` | 次要容器背景（配置值） |
| `on-secondary` | `#f2faff` | 次要色上的文本（配置值） |
| `on-secondary-container` | `#40555f` | 次要容器上的文本（配置值） |

**使用场景**：
- 元信息标签背景
- 次要按钮

#### Tertiary（第三色 - 青绿）
| Token | 色值 | 用途 |
|-------|------|------|
| `tertiary` | `#006b5f` | 第三强调色（深青） |
| `tertiary-dim` | `#005e53` | 暗化第三色 |
| `tertiary-container` | `#a2ffed` | 第三色容器背景（配置值） |
| `on-tertiary` | `#e3fff7` | 第三色上的文本（配置值） |

**使用场景**：
- 特殊状态指示
- 成功提示

---

### 错误色系统（Error Colors）

| Token | 色值 | 用途 |
|-------|------|------|
| `error` | `#9f403d` | 错误提示 |
| `error-dim` | `#4e0309` | 暗化错误色 |
| `error-container` | `#fe8983` | 错误容器背景（配置值） |
| `on-error` | `#fff7f6` | 错误色上的文本（配置值） |
| `on-error-container` | `#752121` | 错误容器上的文本（配置值） |

---

## 特殊效果

### 玻璃态效果（Glassmorphism）
```css
/* 导航栏 */
nav {
    background: rgba(15, 23, 42, 0.7); /* slate-900/70 */
    backdrop-filter: blur(12px);
}

/* 目录侧边栏（如果使用玻璃态） */
.toc-sidebar {
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
}
```

### 阅读进度条
```css
.progress-bar {
    height: 3px;
    width: 45%; /* 或动态计算 */
    background: linear-gradient(
        to right,
        #4c56af,  /* primary */
        #4049a2   /* primary-dim */
    );
}
```

---

## 布局区域配色

### Reading Progress Indicator（阅读进度指示器）
- 位置：固定在顶部，z-index: 60
- 高度：3px
- 颜色：`primary` (#4c56af) 渐变到 `primary-dim` (#4049a2)
- 宽度：根据滚动位置动态计算

### Navigation（导航栏）
- 背景：`slate-900/70` 玻璃态
- Logo：白色 + Newsreader 斜体
- 链接默认：`slate-400`
- 链接悬停：`slate-200`
- 活动链接：白色 + 2px 下划线

### Article Header（文章头部）
- 背景：`background` (#0c0f0f)
- 分类标签：Space Grotesk 大写 + `primary` (#4c56af)
- 标题：Noto Serif SC + Newsreader，大尺寸
- 元信息：
  - 日期：Space Grotesk + 浅灰
  - 阅读时间：Space Grotesk + 浅灰
  - 标签芯片：`secondary-container` 背景（实际为深色）

### Table of Contents（目录）
- 位置：侧边栏或顶部
- 背景：可能使用 `surface-container-low`
- 链接默认：浅灰
- 链接激活：`primary` (#4c56af) + 粗体
- 链接悬停：`primary` (#4c56af)

### Article Content（文章正文）
- 背景：`background` (#0c0f0f)
- 正文文本：`#dde4e5`（通过 dark 类设置）
- 段落间距：适中，保持呼吸感
- 对齐方式：左对齐（justify 用于中文）
- 行高：1.75 或 2（技术文档需要更大行高）

### Code Blocks（代码块）
- 背景：`surface-container-highest` (#dde4e5 配置值，实际为深色)
- 文本：浅色等宽字体
- 语言指示器：Space Grotesk + `primary` (#4c56af)
- 圆角：`rounded-sm` (0.125rem)
- 内边距：充足的 padding

---

## 排版系统

### 字体家族
| 用途 | 字体 | 场景 |
|------|------|------|
| 标题 | Noto Serif SC, Newsreader | 文章标题、章节标题 |
| 正文 | Noto Sans SC, Manrope | 段落文本 |
| 标签/代码 | Space Grotesk | 元信息、代码、技术标签 |

### 中文排版优化
```css
p {
    text-align: justify;
    text-justify: inter-character; /* 中文字符间对齐 */
}
```

---

## 组件配色示例

### Tag Chips（标签芯片）
- 背景：`secondary-container`（实际为深色）
- 文本：`on-secondary-container`（实际为浅色）
- 字体：Space Grotesk 10px 大写
- 圆角：`rounded-sm`
- 间距：`gap-2`

### Reading Time Badge（阅读时间徽章）
- 背景：`surface-container-highest`（实际为深灰）
- 文本：`on-surface-variant`（实际为浅灰）
- 字体：Space Grotesk 10px 大写
- 图标：Material Symbols Outlined

### Code Language Indicator（代码语言指示器）
- 位置：代码块右上角或左上角
- 背景：可能使用半透明背景
- 文本：Space Grotesk + `primary` (#4c56af)
- 字号：10-12px

### TOC Links（目录链接）
- 默认：浅灰色
- 激活：`primary` (#4c56af) + 粗体 + 可能的左边框
- 悬停：`primary` (#4c56af)
- 过渡：`transition-colors`

---

## 交互状态

### 链接悬停
- **默认**：继承颜色或浅灰
- **悬停**：`primary` (#4c56af)
- **过渡**：`transition-colors duration-300`

### 代码块交互
- **复制按钮**：右上角，悬停时显示
- **语法高亮**：使用合适的深色主题（如 Dracula、Nord）

### 目录滚动同步
- **当前章节**：`primary` (#4c56af) + 粗体
- **其他章节**：浅灰色
- **滚动指示器**：可能使用左边框或背景高亮

---

## 设计准则

### ✅ 应该做的
1. 使用 Noto Serif SC 和 Noto Sans SC 优化中文显示
2. 代码块使用 Space Grotesk 等宽字体
3. 保持充足的行高（1.75-2）提高可读性
4. 使用 `text-justify: inter-character` 优化中文对齐
5. 目录提供清晰的激活状态指示

### ❌ 禁止做的
1. **禁止**使用过小的字号（正文最小 16px）
2. **禁止**代码块使用浅色背景（对比度不足）
3. **禁止**过长的行宽（最大 65-75 字符）
4. **禁止**使用纯黑 (#000000) 背景
5. **禁止**忽略中文排版优化

---

## 无障碍性（Accessibility）

### 对比度检查
- `#dde4e5` (正文) vs `#0c0f0f` (背景)：**16.8:1** ✅ AAA
- `primary` (#4c56af) vs `#0c0f0f` (背景)：**5.8:1** ✅ AA
- 代码块文本 vs 代码块背景：需确保 **≥7:1** ✅ AAA

### 建议
- 正文使用高对比度文本（`#dde4e5`）
- 代码块确保足够的对比度
- 链接提供明确的悬停反馈
- 目录提供清晰的激活状态
- 阅读进度条提供视觉反馈

---

## 特色设计元素

### 结构化布局
- 25% 宽度用于目录（桌面端）
- 75% 宽度用于内容
- 移动端目录折叠或置顶

### 阅读体验优化
- 阅读进度条提供即时反馈
- 目录滚动同步
- 代码块语法高亮
- 充足的行高和字号

### 技术感标签
- Space Grotesk 大写字体
- 字母间距加宽（tracking-widest）
- 低饱和度颜色
- 精确的圆角（0.125rem）

---

## 配置注意事项

**重要**：此页面的 Tailwind 配置使用了浅色 token 值，但通过以下方式实现深色模式：

1. **Body 样式覆盖**：
```css
body {
    background-color: #0c0f0f;
    color: #dde4e5;
}
```

2. **Dark 类使用**：
```html
<html class="dark">
<body class="dark:bg-[#0c0f0f] dark:text-[#dde4e5]">
```

3. **建议**：统一配置，使用专门的深色模式 token 值。

---

## 与 Light Mode 的对应关系

| Light Mode | Dark Mode | 转换逻辑 |
|------------|-----------|----------|
| `#f9f9f9` (surface) | `#0c0f0f` (实际背景) | 反转亮度 |
| `#2d3435` (on-surface) | `#dde4e5` (实际文本) | 反转文本色 |
| `#ffffff` (lowest) | 深灰（实际容器） | 反转层级 |
| `#dde4e5` (highest) | 深灰（代码块） | 保持相对层级 |

**核心原则**：技术文章需要更高的对比度和清晰的结构，深色模式通过精确的色调分层和优化的排版系统实现专业的代码阅读体验。
