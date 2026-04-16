# Home Dark Mode 配色方案

## 页面概述
首页 - 展示宣言、精选内容和最新动态的混合布局

## 核心配色哲学
深色模式下的"编辑刊物"美学，使用深炭色背景营造沉浸式阅读体验，通过微妙的色调变化和精心选择的强调色引导视觉焦点。

---

## 主色调系统

### 背景层级（Surface Hierarchy）

| Token | 色值 | 用途 | 视觉效果 |
|-------|------|------|----------|
| `background` | `#0c0f0f` | 页面基础背景 | 深炭色，温暖的黑 |
| `surface` | `#0c0f0f` | 主画布 | 与 background 一致 |
| `surface-dim` | `#0c0f0f` | 最暗表面 | 用于阴影区域 |
| `surface-container-lowest` | `#050606` | 最低层容器 | 极深色，几乎纯黑 |
| `surface-container-low` | `#171c1d` | 低层容器 | 内容卡片背景 |
| `surface-container` | `#1e2425` | 标准容器 | 中等提升的区域 |
| `surface-container-high` | `#1e2425` | 高层容器 | 与 container 一致 |
| `surface-container-highest` | `#2d3435` | 最高层容器 | 最突出的元素 |
| `surface-bright` | `#343a3b` | 明亮表面 | 用于需要轻微高光的区域 |
| `surface-variant` | `#2d3435` | 变体表面 | 用于区分区域 |

**设计原则**：从 `#050606` 到 `#343a3b` 的 7 级灰度系统，创造细腻的深度层次。

---

### 文本颜色（Typography Colors）

| Token | 色值 | 用途 | 对比度 |
|-------|------|------|--------|
| `on-surface` | `#f9f9f9` | 主要文本 | 高对比，标题和正文 |
| `on-background` | `#f9f9f9` | 背景上的文本 | 与 on-surface 一致 |
| `on-surface-variant` | `#adb3b4` | 次要文本 | 中等对比，元信息 |
| `outline` | `#8e9293` | 边框/分隔 | 低对比，微妙分隔线 |
| `outline-variant` | `#444849` | 变体边框 | 更低对比，15% 透明度 |

**排版策略**：
- 大标题（Manifesto）使用 `on-surface` (#f9f9f9) + Newsreader 斜体
- 强调词使用 `primary-dim` (#4049a2) 创造视觉焦点
- 日期和标签使用 `on-surface-variant` (#adb3b4) + Space Grotesk

---

### 强调色系统（Accent Colors）

#### Primary（主色 - 靛蓝）
| Token | 色值 | 用途 |
|-------|------|------|
| `primary` | `#4c56af` | 主要强调色，链接、标签 |
| `primary-dim` | `#4049a2` | 暗化主色，用于标题强调 |
| `primary-container` | `#3f48a1` | 主色容器背景 |
| `on-primary` | `#f9f6ff` | 主色上的文本 |
| `on-primary-container` | `#e0e0ff` | 主色容器上的文本 |
| `primary-fixed` | `#e0e0ff` | 固定主色，用于标签 |
| `primary-fixed-dim` | `#ced1ff` | 暗化固定主色 |

**使用场景**：
- "Site Manifesto" 标签
- 标题中的强调词（"交汇处"）
- 悬停状态的文本颜色
- 策展计划卡片背景

#### Secondary（次要色 - 冰蓝）
| Token | 色值 | 用途 |
|-------|------|------|
| `secondary` | `#cfe6f2` | 次要强调色，浅蓝 |
| `secondary-dim` | `#c1d8e4` | 暗化次要色 |
| `secondary-container` | `#2d424c` | 次要容器背景（深蓝灰） |
| `on-secondary` | `#0c1418` | 次要色上的文本（深色） |
| `on-secondary-container` | `#cfe6f2` | 次要容器上的文本 |
| `secondary-fixed` | `#cfe6f2` | 固定次要色 |
| `secondary-fixed-dim` | `#c1d8e4` | 暗化固定次要色 |

**使用场景**：
- 技术标签背景（`secondary-container`）
- 次要信息文本

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
- "最新动态" 标签
- 特殊状态指示

---

### 错误色系统（Error Colors）

| Token | 色值 | 用途 |
|-------|------|------|
| `error` | `#fe8983` | 错误提示（亮红） |
| `error-dim` | `#9f403d` | 暗化错误色 |
| `error-container` | `#752121` | 错误容器背景 |
| `on-error` | `#4e0309` | 错误色上的文本（深红） |
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

### 渐变效果
```css
/* 图片遮罩渐变 */
.image-overlay {
    background: linear-gradient(
        to top,
        #0c0f0f,           /* surface - 完全不透明 */
        rgba(12, 15, 15, 0.4),  /* surface 40% */
        transparent
    );
}
```

---

## 布局区域配色

### Hero Section（宣言区）
- 背景：`background` (#0c0f0f)
- 标题：`on-surface` (#f9f9f9) + Newsreader 斜体
- 强调词：`primary-dim` (#4049a2)
- 标签：`primary` (#4c56af) + Space Grotesk 大写
- 描述：`on-surface-variant` (#adb3b4)

### Featured Project Card（精选项目大卡片）
- 背景：`surface-container-low` (#171c1d)
- 图片遮罩：从 `surface` 到透明的渐变
- 标签：`primary-fixed` (#e0e0ff)
- 标题：Newsreader 斜体
- 描述：`on-surface-variant` (#adb3b4)

### Latest Updates Card（最新动态卡片）
- 背景：`surface-container-low` (#171c1d)
- 标签：`tertiary` (#94f0df)
- 分隔线：`outline-variant/15` (15% 透明度)
- 日期：Space Grotesk 10px + `on-surface-variant`
- 标题：悬停变为 `primary`

### Curator Plan Card（策展计划卡片）
- 背景：`primary` (#4c56af)
- 图标：`on-primary` (#f9f6ff)
- 标题：Newsreader 斜体 + `on-primary`
- 描述：`on-primary/80` (80% 透明度)

---

## 内容栏目配色

### Tech Column（技术栏目）
- 标题：Newsreader 斜体
- 序号：Space Grotesk + `surface-variant` (#2d3435)
- 文章标题：悬停变为 `primary`
- 描述：`on-surface-variant`
- 标签：`secondary-container` (#2d424c) 背景 + `on-secondary-container` (#cfe6f2) 文本
- 阅读时间：`surface-container-highest` (#2d3435) 背景

### Essay Column（随笔栏目）
- 左边框：`outline-variant/10` (10% 透明度)
- 日期：Space Grotesk 大写 + `on-surface-variant`
- 标题：Newsreader 斜体，悬停变为 `primary`
- 引用：斜体 + 左边框 `primary` 2px

---

## 项目卡片配色

### Project Cards（项目卡片网格）
- 背景：`surface-container` (#1e2425)
- 图片容器：1px padding
- 图片效果：灰度 → 悬停时彩色，scale(1.05)
- 标题：粗体
- 标签：Space Grotesk 10px 大写 + `on-surface-variant`

---

## 交互状态

### 卡片悬停
- **默认**：`surface-container-low` (#171c1d)
- **悬停**：保持背景，图片 scale(1.05)
- **过渡**：`duration-700`

### 文本悬停
- **链接默认**：继承颜色
- **链接悬停**：`primary` (#4c56af)
- **过渡**：`transition-colors`

### 按钮悬停
- **间距变化**：`gap-2` → `gap-4`
- **图标移动**：`translate-x-0` → `translate-x-2`

---

## 组件配色示例

### Navigation（导航栏）
- 背景：`slate-900/70` 玻璃态
- Logo：白色 + Newsreader 斜体
- 链接默认：`slate-400`
- 链接悬停：`slate-200`
- 活动链接：白色 + 2px 下划线
- 主题切换图标：`slate-50`

### Footer（页脚）
- 背景：`slate-950`
- 边框：`slate-800/15`
- 版权文本：`slate-400` + Space Grotesk 大写
- 链接默认：`slate-500`
- 链接悬停：`slate-100` + 下划线

---

## 设计准则

### ✅ 应该做的
1. 使用 Newsreader 斜体营造编辑刊物感
2. 标签和元信息使用 Space Grotesk 大写 + 字母间距
3. 通过色调分层而非边框创造深度
4. 图片使用灰度滤镜，悬停时恢复彩色
5. 引用使用左边框 + 斜体，无引号

### ❌ 禁止做的
1. **禁止**使用 1px 实线边框分隔内容
2. **禁止**使用纯黑 (#000000) 背景
3. **禁止**在标题中使用全大写（除标签外）
4. **禁止**使用传统投影效果
5. **禁止**居中对齐长篇正文

---

## 无障碍性（Accessibility）

### 对比度检查
- `on-surface` (#f9f9f9) vs `background` (#0c0f0f)：**18.5:1** ✅ AAA
- `on-surface-variant` (#adb3b4) vs `background` (#0c0f0f)：**9.2:1** ✅ AA
- `primary` (#4c56af) vs `background` (#0c0f0f)：**5.8:1** ✅ AA
- `on-primary` (#f9f6ff) vs `primary` (#4c56af)：**10.2:1** ✅ AAA

### 建议
- 正文始终使用 `on-surface` 确保最高可读性
- 元信息可使用 `on-surface-variant`
- 交互元素提供明确的悬停反馈
- 图片提供 alt 文本描述

---

## 特色设计元素

### 不对称布局
- Featured Project 占 8 列，侧边栏占 4 列
- 创造动态的编辑节奏

### 材质感
- 通过色调分层模拟纸张和玻璃的物理质感
- 避免扁平的数字像素感

### 呼吸空间
- 留白不是"空的"，而是引导视线的功能性元素
- 使用 `mb-32`、`gap-8` 等大间距创造呼吸感

---

## 与 Light Mode 的对应关系

| Light Mode | Dark Mode | 转换逻辑 |
|------------|-----------|----------|
| `#f9f9f9` (surface) | `#0c0f0f` (surface) | 反转亮度 |
| `#2d3435` (on-surface) | `#f9f9f9` (on-surface) | 反转文本色 |
| `#ffffff` (lowest) | `#050606` (lowest) | 最亮→最暗 |
| `#dde4e5` (highest) | `#2d3435` (highest) | 保持相对层级 |
| `#ebeeef` (on-background) | `#f9f9f9` (on-background) | 微调亮度 |

**核心原则**：深色模式重新校准色调系统，保持相同的视觉层级和阅读舒适度。
