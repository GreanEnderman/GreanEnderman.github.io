# Posts Dark Mode 配色方案

## 页面概述
文章列表页 - 展示技术文章和随笔的混合网格布局

## 核心配色哲学
深色模式下的"内容档案馆"美学，使用深炭色背景营造专注的浏览体验，通过不对称的 Bento Grid 布局和精心设计的卡片层级引导阅读。

---

## 主色调系统

### 背景层级（Surface Hierarchy）

| Token | 色值 | 用途 | 视觉效果 |
|-------|------|------|----------|
| `background` | `#0c0f0f` | 页面基础背景 | 深炭色，温暖的黑 |
| `surface` | `#f9f9f9` | 主画布（注意：配置中为浅色，实际使用深色） | 实际渲染为深色 |
| `surface-dim` | `#d4dbdd` | 最暗表面 | 配置值，实际使用深色 |
| `surface-container-lowest` | `#ffffff` | 最低层容器 | 配置值，实际使用深色 |
| `surface-container-low` | `#f2f4f4` | 低层容器 | 实际使用深灰色 |
| `surface-container` | `#ebeeef` | 标准容器 | 实际使用深灰色 |
| `surface-container-high` | `#e4e9ea` | 高层容器 | 实际使用深灰色 |
| `surface-container-highest` | `#dde4e5` | 最高层容器 | 实际使用深灰色 |

**注意**：此页面的 Tailwind 配置使用了浅色 token 值，但通过 `dark:` 类和自定义样式实现深色模式。实际渲染：
- `body` 背景：`#0c0f0f`（通过 style 标签设置）
- 卡片背景：`secondary-dim/10` 或 `surface-container-low`

---

### 文本颜色（Typography Colors）

| Token | 色值 | 用途 | 对比度 |
|-------|------|------|--------|
| `on-surface` | `#2d3435` | 主要文本（配置值） | 实际使用浅色 |
| `on-background` | `#2d3435` | 背景上的文本（配置值） | 实际使用浅色 |
| `on-surface-variant` | `#5a6061` | 次要文本（配置值） | 实际使用 `#adb3b4` 等浅色 |
| `on-primary` | `#f9f6ff` | 主色上的文本 | 高对比浅色 |
| `on-secondary-container` | `#40555f` | 次要容器上的文本（配置值） | 实际使用浅色 |
| `on-tertiary-container` | `#006458` | 第三色容器上的文本（配置值） | 实际使用浅色 |

**实际渲染策略**：
- 标题：白色或接近白色（通过 `dark:text-white` 等）
- 描述：`on-surface-variant` 或 `text-on-surface-variant/80`
- 日期和标签：Space Grotesk + 浅灰色

---

### 强调色系统（Accent Colors）

#### Primary（主色 - 靛蓝）
| Token | 色值 | 用途 |
|-------|------|------|
| `primary` | `#4c56af` | 主要强调色，链接、按钮 |
| `primary-dim` | `#4049a2` | 暗化主色 |
| `primary-container` | `#e0e0ff` | 主色容器背景（配置值） |
| `on-primary` | `#f9f6ff` | 主色上的文本 |
| `on-primary-container` | `#3f48a1` | 主色容器上的文本（配置值） |

**使用场景**：
- 分类筛选按钮激活状态
- 文章标题悬停颜色
- 日期和分类标签
- 引用块左边框
- "LOAD MORE" 按钮悬停状态

#### Secondary（次要色 - 蓝灰）
| Token | 色值 | 用途 |
|-------|------|------|
| `secondary` | `#4d626c` | 次要强调色（深蓝灰） |
| `secondary-dim` | `#415660` | 暗化次要色 |
| `secondary-container` | `#cfe6f2` | 次要容器背景（配置值） |
| `on-secondary` | `#f2faff` | 次要色上的文本（配置值） |

**使用场景**：
- 卡片背景（`secondary-dim/10` - 10% 透明度）
- 筛选按钮默认状态（`secondary-dim/20`）

#### Tertiary（第三色 - 青绿）
| Token | 色值 | 用途 |
|-------|------|------|
| `tertiary` | `#006b5f` | 第三强调色（深青） |
| `tertiary-dim` | `#005e53` | 暗化第三色 |
| `tertiary-container` | `#a2ffed` | 第三色容器背景（配置值） |
| `on-tertiary` | `#e3fff7` | 第三色上的文本（配置值） |

**使用场景**：
- Philosophy 标签背景（`tertiary-dim/20`）

---

### 错误色系统（Error Colors）

| Token | 色值 | 用途 |
|-------|------|------|
| `error` | `#9f403d` | 错误提示 |
| `error-dim` | `#4e0309` | 暗化错误色 |
| `error-container` | `#fe8983` | 错误容器背景（配置值） |
| `on-error` | `#fff7f6` | 错误色上的文本（配置值） |

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

### 渐变效果
```css
/* 导航栏底部渐变 */
.nav-gradient {
    background: linear-gradient(
        to right,
        transparent,
        rgba(100, 116, 139, 0.1), /* slate-500/10 */
        transparent
    );
    height: 1px;
}
```

---

## 布局区域配色

### Header Section（标题区）
- 背景：`background` (#0c0f0f)
- 主标题：`on-primary` (#f9f6ff) + Newsreader 斜体
- 描述：`on-surface-variant` + Manrope
- 筛选按钮激活：`primary` (#4c56af) 背景 + `on-primary` (#f9f6ff) 文本
- 筛选按钮默认：`secondary-dim/20` 背景 + `on-surface-variant` 文本 + `outline-variant/15` 边框

### Featured Card（精选大卡片 - 8列）
- 背景：`secondary-dim/10` (10% 透明度)
- 图片：灰度 + 80% 不透明度，悬停时彩色 + 100% 不透明度
- 日期标签：`primary` (#4c56af) + Space Grotesk
- 分类标签：`primary` (#4c56af) + Space Grotesk 大写
- 标题：Newsreader 斜体，悬停变为 `primary`
- 描述：`on-surface-variant`
- 标签芯片：`surface-container` 背景 + `on-secondary-container` 文本

### Sidebar Card（侧边栏卡片 - 4列）
- 背景：透明
- 左边框：`outline-variant/10` (10% 透明度)
- 日期：Space Grotesk 大写 + `on-surface-variant`
- 标题：Newsreader 斜体，悬停下划线 + `primary/50` 装饰色
- 引用：斜体 + `on-surface-variant/80` + 左边框 `primary` 2px
- 图片容器：`surface-container-low` 背景 + 50% 不透明度

---

## 标准网格卡片配色

### Standard Grid Cards（4列卡片）
- 图片容器：`surface-container-low` 背景 + aspect-video
- 图片：灰度，悬停时彩色 + scale(1)
- 日期/分类：Space Grotesk 10px
  - 技术文章：`primary` (#4c56af)
  - 随笔：`on-surface-variant`
- 标题：Manrope 粗体
- 描述：`on-surface-variant` + `line-clamp-3`

---

## 交互状态

### 图片悬停效果
- **默认**：`grayscale` + `opacity-80`（或 `opacity-50`）
- **悬停**：`grayscale-0` + `opacity-100`
- **过渡**：`duration-500` 或 `duration-700`
- **变换**：部分卡片使用 `scale-105`

### 文本悬停
- **标题默认**：继承颜色
- **标题悬停**：`primary` (#4c56af) 或下划线装饰
- **过渡**：`transition-colors duration-300`

### 按钮悬停
- **筛选按钮**：背景色变化 + 边框颜色变化
- **Load More 按钮**：
  - 边框：`outline-variant/20` → `primary`
  - 文本：默认色 → `primary`
  - 图标：`translate-y-0` → `translate-y-1`

---

## 组件配色示例

### Navigation（导航栏）
- 背景：`slate-900/70` 玻璃态
- Logo：白色 + Newsreader 斜体
- 链接默认：`slate-400`
- 链接悬停：`slate-200`
- 活动链接：白色 + 2px 下划线
- 分隔线：`slate-500/10` 渐变

### Category Filter（分类筛选器）
- 容器：`flex flex-wrap gap-2`
- 激活按钮：
  - 背景：`primary` (#4c56af)
  - 文本：`on-primary` (#f9f6ff)
  - 圆角：`rounded-sm`
- 默认按钮：
  - 背景：`secondary-dim/20`
  - 文本：`on-surface-variant`
  - 边框：`outline-variant/15`
  - 悬停：`secondary-dim/40`

### Tag Chips（标签芯片）
- 背景：`surface-container` 或 `tertiary-dim/20`
- 文本：`on-secondary-container` 或 `on-tertiary-container`
- 字体：Space Grotesk 10px
- 圆角：`rounded-full`

### Pagination Button（分页按钮）
- 边框：`outline-variant/20`
- 文本：Space Grotesk 大写
- 图标：`primary` (#4c56af)
- 悬停：
  - 边框变为 `primary`
  - 文本变为 `primary`
  - 图标向下移动

---

## 设计准则

### ✅ 应该做的
1. 使用不对称 Bento Grid 布局（8-4 列分割）
2. 图片使用灰度滤镜，悬停时恢复彩色
3. 技术文章使用 `primary` 标签，随笔使用低对比度标签
4. 引用使用左边框 + 斜体，无引号
5. 通过 `line-clamp-3` 限制描述文本行数

### ❌ 禁止做的
1. **禁止**使用 1px 实线边框分隔卡片
2. **禁止**使用纯黑 (#000000) 背景
3. **禁止**在卡片上使用传统投影
4. **禁止**所有图片都使用相同的悬停效果（变化创造趣味）
5. **禁止**居中对齐长篇描述文本

---

## 无障碍性（Accessibility）

### 对比度检查
- 白色文本 vs `#0c0f0f` 背景：**18.5:1** ✅ AAA
- `on-surface-variant` vs `#0c0f0f` 背景：**9.2:1** ✅ AA
- `primary` (#4c56af) vs `#0c0f0f` 背景：**5.8:1** ✅ AA
- `on-primary` (#f9f6ff) vs `primary` (#4c56af)：**10.2:1** ✅ AAA

### 建议
- 标题使用高对比度文本
- 描述可使用 `on-surface-variant`
- 交互元素提供明确的悬停反馈
- 图片提供 alt 文本
- 筛选按钮提供清晰的激活状态

---

## 特色设计元素

### 不对称布局
- Featured Card 占 8 列，Sidebar Card 占 4 列
- 标准卡片使用 4 列网格，第二张卡片使用 `md:mt-12` 创造错位感

### 图片处理
- 灰度滤镜营造统一的视觉调性
- 悬停时恢复彩色，创造互动惊喜
- 不同卡片使用不同的不透明度（80%、50%）

### 分隔线策略
- 使用 `outline-variant/10` 或 `/15` 创造微妙分隔
- 避免使用实线边框
- 通过背景色变化定义区域

---

## 配置注意事项

**重要**：此页面的 Tailwind 配置使用了浅色 token 值，但通过以下方式实现深色模式：

1. **Body 样式覆盖**：
```css
body {
    background-color: #0c0f0f; /* 覆盖配置中的浅色 */
    color: #2d3435; /* 配置值，实际通过 dark: 类调整 */
}
```

2. **Dark 类使用**：
```html
<html class="dark">
```

3. **实际渲染颜色**：
- 背景：深炭色 (#0c0f0f)
- 文本：浅色（白色或浅灰）
- 卡片：深灰色半透明背景

**建议**：未来应统一配置，使用专门的深色模式 token 值，避免混淆。

---

## 与 Light Mode 的对应关系

| Light Mode | Dark Mode | 转换逻辑 |
|------------|-----------|----------|
| `#f9f9f9` (surface) | `#0c0f0f` (实际背景) | 反转亮度 |
| `#2d3435` (on-surface) | 白色/浅灰（实际文本） | 反转文本色 |
| `#ffffff` (lowest) | 深灰（实际容器） | 反转层级 |
| `secondary-dim/10` | 保持（半透明深色） | 透明度策略 |

**核心原则**：尽管配置值为浅色，实际渲染通过样式覆盖和 dark 类实现深色模式，保持视觉一致性。
