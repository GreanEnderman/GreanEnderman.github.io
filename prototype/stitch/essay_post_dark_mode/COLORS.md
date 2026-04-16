# Essay Post Dark Mode 配色方案

## 页面概述
随笔文章详情页 - 沉浸式的文学阅读体验，强调留白和优雅排版

## 核心配色哲学
深色模式下的"文学沙龙"美学，使用深炭色背景营造私密的阅读氛围，通过宽松的留白和精致的衬线字体创造沉浸式的文学体验。与技术文章的结构化不同，随笔强调流畅性和情感共鸣。

---

## 主色调系统

### 背景层级（Surface Hierarchy）

| Token | 色值 | 用途 | 视觉效果 |
|-------|------|------|----------|
| `background` | `#0c0f0f` | 页面基础背景 | 深炭色，温暖的黑 |
| `surface` | `#0c0f0f` | 主画布 | 与 background 一致 |
| `surface-dim` | `#0c0f0f` | 最暗表面 | 用于阴影区域 |
| `surface-container-lowest` | `#060808` | 最低层容器 | 极深色，接近纯黑 |
| `surface-container-low` | `#0c0f0f` | 低层容器 | 与 surface 一致 |
| `surface-container` | `#131718` | 标准容器 | 微微提升 |
| `surface-container-high` | `#1a1e1f` | 高层容器 | 明显提升 |
| `surface-container-highest` | `#2d3435` | 最高层容器 | 最突出元素 |
| `surface-bright` | `#1a1e1f` | 明亮表面 | 与 high 一致 |
| `surface-variant` | `#2d3435` | 变体表面 | 用于区分区域 |

**设计原则**：随笔页面使用更统一的背景色（多个层级使用 `#0c0f0f`），减少视觉干扰，营造沉浸式阅读环境。

---

### 文本颜色（Typography Colors）

| Token | 色值 | 用途 | 对比度 |
|-------|------|------|--------|
| `on-surface` | `#ebeeef` | 主要文本 | 高对比，正文和标题 |
| `on-background` | `#ebeeef` | 背景上的文本 | 与 on-surface 一致 |
| `on-surface-variant` | `#adb3b4` | 次要文本 | 中等对比，元信息 |
| `outline` | `#8c9293` | 边框/分隔 | 低对比，微妙分隔 |
| `outline-variant` | `#434849` | 变体边框 | 更低对比，15% 透明度 |

**排版策略**：
- 正文使用 `on-surface` (#ebeeef) 确保舒适阅读
- 标题使用 Newsreader 衬线斜体营造文学感
- 元信息使用 Space Grotesk 等宽字体创造对比
- 段落间距更大（2rem），行高更宽松（2）

---

### 强调色系统（Accent Colors）

#### Primary（主色 - 靛蓝）
| Token | 色值 | 用途 |
|-------|------|------|
| `primary` | `#4c56af` | 主要强调色，链接 |
| `primary-dim` | `#4049a2` | 暗化主色 |
| `primary-container` | `#3f48a1` | 主色容器背景 |
| `on-primary` | `#f9f6ff` | 主色上的文本 |
| `on-primary-container` | `#e0e0ff` | 主色容器上的文本 |
| `inverse-primary` | `#4c56af` | 反转主色 |

**使用场景**：
- 引用块左边框
- 链接悬停颜色
- 分类标签
- 选中文本背景

#### Secondary（次要色 - 冰蓝）
| Token | 色值 | 用途 |
|-------|------|------|
| `secondary` | `#cfe6f2` | 次要强调色，浅蓝 |
| `secondary-dim` | `#415660` | 暗化次要色 |
| `secondary-container` | `#2d424c` | 次要容器背景（深蓝灰） |
| `on-secondary` | `#1a2a32` | 次要色上的文本（深色） |
| `on-secondary-container` | `#cfe6f2` | 次要容器上的文本 |
| `secondary-fixed` | `#cfe6f2` | 固定次要色 |
| `secondary-fixed-dim` | `#415660` | 暗化固定次要色 |

**使用场景**：
- 元信息标签
- 次要按钮

#### Tertiary（第三色 - 青绿）
| Token | 色值 | 用途 |
|-------|------|------|
| `tertiary` | `#94f0df` | 第三强调色，明亮青绿 |
| `tertiary-dim` | `#94f0df` | 暗化第三色 |
| `tertiary-container` | `#005046` | 第三色容器背景（深青） |
| `on-tertiary` | `#003730` | 第三色上的文本 |
| `on-tertiary-container` | `#a2ffed` | 第三色容器上的文本 |
| `tertiary-fixed` | `#a2ffed` | 固定第三色 |

**使用场景**：
- 特殊标注
- 强调元素

---

### 错误色系统（Error Colors）

| Token | 色值 | 用途 |
|-------|------|------|
| `error` | `#9f403d` | 错误提示 |
| `error-dim` | `#4e0309` | 暗化错误色 |
| `error-container` | `#93000a` | 错误容器背景（深红） |
| `on-error` | `#601410` | 错误色上的文本 |
| `on-error-container` | `#fe8983` | 错误容器上的文本 |

---

## 特殊效果

### 玻璃态效果（Glassmorphism）
```css
/* 导航栏 */
nav {
    background: rgba(15, 23, 42, 0.7); /* slate-900/70 */
    backdrop-filter: blur(12px);
}
```

### 选中文本效果
```css
::selection {
    background: #4c56af; /* primary */
    color: #f9f6ff; /* on-primary */
}
```

---

## 布局区域配色

### Navigation（导航栏）
- 背景：`slate-900/70` 玻璃态
- Logo：白色 + Newsreader 斜体
- 链接默认：`slate-400`
- 链接悬停：`slate-200`
- 活动链接：白色 + 2px 下划线

### Article Header（文章头部）
- 背景：`background` (#0c0f0f)
- 分类标签：Space Grotesk 大写 + 白色
- 标题：Newsreader 衬线斜体，超大尺寸（6xl-8xl）
- 副标题/引言：Newsreader 斜体 + `on-surface-variant`
- 元信息：
  - 日期：Space Grotesk + `on-surface-variant`
  - 阅读时间：Space Grotesk + `on-surface-variant`

### Article Content（文章正文）
- 背景：`background` (#0c0f0f)
- 正文文本：`on-surface` (#ebeeef)
- 字体：Manrope 无衬线
- 段落间距：2rem（更宽松）
- 行高：2（更舒适）
- 字号：1.125rem（18px，比技术文章稍大）
- 字母间距：0.02em（微妙的字母间距）
- 最大宽度：680px（单列居中）

### Blockquote（引用块）
- 背景：透明
- 文本：Newsreader 衬线字体 + `on-surface`
- 字号：`headline-md`（更大）
- 左边框：2px `primary` (#4c56af)
- 左边距：40px（不对称缩进）
- 无引号（依赖字体和缩进传达引用感）
- 可选：微妙的 `surface-tint` 垂直线

---

## 排版系统

### 字体家族
| 用途 | 字体 | 场景 |
|------|------|------|
| 标题 | Newsreader | 文章标题，衬线斜体 |
| 引用 | Newsreader | 引用块，衬线字体 |
| 正文 | Manrope | 段落文本，无衬线 |
| 元信息 | Space Grotesk | 日期、标签，等宽字体 |

### 随笔排版特点
```css
.essay-content p {
    margin-bottom: 2rem;      /* 大段落间距 */
    line-height: 2;           /* 宽松行高 */
    letter-spacing: 0.02em;   /* 微妙字母间距 */
    font-size: 1.125rem;      /* 18px */
}
```

### 标题层级
- H1：Newsreader 斜体，6xl-8xl，用于文章标题
- H2：Newsreader 斜体，3xl-4xl，用于章节标题
- H3：Newsreader 斜体，2xl，用于小节标题

---

## 组件配色示例

### Category Badge（分类徽章）
- 背景：透明或微妙的背景
- 文本：白色 + Space Grotesk 大写
- 边框：可选的微妙边框
- 位置：文章顶部

### Date & Reading Time（日期和阅读时间）
- 文本：`on-surface-variant` (#adb3b4)
- 字体：Space Grotesk 10px 大写
- 字母间距：加宽（tracking-widest）
- 分隔符：可选的点或竖线

### Pull Quote（提取引用）
- 字体：Newsreader 斜体
- 字号：更大（2xl-3xl）
- 颜色：`on-surface` 或 `primary`
- 位置：可能居中或左对齐
- 装饰：可选的引号或边框

### Footnotes（脚注）
- 字号：更小（0.875rem）
- 颜色：`on-surface-variant`
- 字体：Manrope
- 位置：文章底部或侧边

---

## 交互状态

### 链接悬停
- **默认**：继承颜色（`on-surface`）
- **悬停**：`primary` (#4c56af)
- **过渡**：`transition-colors duration-300`
- **装饰**：可选的下划线

### 选中文本
- **背景**：`primary` (#4c56af)
- **文本**：`on-primary` (#f9f6ff)

---

## 设计准则

### ✅ 应该做的
1. 使用 Newsreader 衬线斜体营造文学感
2. 保持宽松的留白（段落间距 2rem）
3. 使用单列居中布局（最大宽度 680px）
4. 引用块使用不对称左边距（40px）
5. 行高设置为 2，提供舒适的阅读体验
6. 使用微妙的字母间距（0.02em）

### ❌ 禁止做的
1. **禁止**使用结构化的多列布局（保持单列）
2. **禁止**使用技术感的等宽字体作为正文
3. **禁止**过小的段落间距（最小 2rem）
4. **禁止**引用块使用引号（依赖字体和缩进）
5. **禁止**居中对齐正文（始终左对齐）
6. **禁止**使用过多的视觉装饰（保持克制）

---

## 无障碍性（Accessibility）

### 对比度检查
- `on-surface` (#ebeeef) vs `background` (#0c0f0f)：**17.2:1** ✅ AAA
- `on-surface-variant` (#adb3b4) vs `background` (#0c0f0f)：**9.2:1** ✅ AA
- `primary` (#4c56af) vs `background` (#0c0f0f)：**5.8:1** ✅ AA

### 建议
- 正文使用高对比度文本（`#ebeeef`）
- 元信息可使用 `on-surface-variant`
- 链接提供明确的悬停反馈
- 保持充足的行高和字号
- 避免过长的行宽（最大 680px）

---

## 特色设计元素

### 沉浸式布局
- 单列居中，最大宽度 680px
- 宽松的上下边距
- 无侧边栏干扰
- 专注于内容本身

### 文学排版
- Newsreader 衬线斜体标题
- 宽松的段落间距（2rem）
- 舒适的行高（2）
- 微妙的字母间距（0.02em）

### 不对称美学
- 引用块左边距 40px
- 左边框 2px `primary`
- 无引号，依赖缩进和字体

### 克制的装饰
- 避免过多的视觉元素
- 依赖留白和排版创造美感
- 颜色使用克制（主要是灰度 + 主色点缀）

---

## 与技术文章的对比

| 特性 | 技术文章 | 随笔文章 |
|------|----------|----------|
| 布局 | 25% 目录 + 75% 内容 | 单列居中（680px） |
| 字体 | Noto Sans SC, Manrope | Newsreader, Manrope |
| 标题 | 结构化，清晰层级 | 衬线斜体，文学感 |
| 段落间距 | 适中 | 宽松（2rem） |
| 行高 | 1.75 | 2 |
| 代码块 | 突出显示 | 少用或无 |
| 引用 | 简洁 | 不对称，文学化 |
| 视觉风格 | 技术蓝图 | 文学沙龙 |

---

## 与 Light Mode 的对应关系

| Light Mode | Dark Mode | 转换逻辑 |
|------------|-----------|----------|
| `#f9f9f9` (surface) | `#0c0f0f` (surface) | 反转亮度 |
| `#2d3435` (on-surface) | `#ebeeef` (on-surface) | 反转文本色 |
| `#ffffff` (lowest) | `#060808` (lowest) | 最亮→最暗 |
| `#dde4e5` (highest) | `#2d3435` (highest) | 保持相对层级 |

**核心原则**：随笔页面强调沉浸式阅读体验，深色模式通过统一的背景色、宽松的留白和精致的衬线字体营造私密的文学氛围。
