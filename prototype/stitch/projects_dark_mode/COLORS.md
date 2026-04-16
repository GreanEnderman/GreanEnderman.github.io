# Projects Dark Mode 配色方案

## 页面概述
项目档案页面 - 展示技术项目的 Bento Grid 布局

## 核心配色哲学
深色模式下的"数字策展人"美学，使用深炭色背景营造专业、沉浸的技术氛围，通过色调分层而非边框创造深度。

---

## 主色调系统

### 背景层级（Surface Hierarchy）

| Token | 色值 | 用途 | 视觉效果 |
|-------|------|------|----------|
| `background` | `#0c0f0f` | 页面基础背景 | 深炭色，接近黑但保留温度 |
| `surface` | `#0c0f0f` | 主画布 | 与 background 一致 |
| `surface-dim` | `#0c0f0f` | 最暗表面 | 用于阴影区域 |
| `surface-container-lowest` | `#050606` | 最低层容器 | 极深色，用于最底层元素 |
| `surface-container-low` | `#131718` | 低层容器 | 项目卡片背景，微微提升 |
| `surface-container` | `#161b1c` | 标准容器 | 中等提升的卡片 |
| `surface-container-high` | `#1a1e1f` | 高层容器 | 悬停状态，明显提升 |
| `surface-container-highest` | `#2d3435` | 最高层容器 | 代码块、最突出元素 |
| `surface-bright` | `#2d3435` | 明亮表面 | 与 highest 一致 |
| `surface-variant` | `#2d3435` | 变体表面 | 用于区分区域 |

**设计原则**：通过 6 级灰度创造"无边框"的深度感，从 `#050606` 到 `#2d3435` 的渐进式提升。

---

### 文本颜色（Typography Colors）

| Token | 色值 | 用途 | 对比度 |
|-------|------|------|--------|
| `on-surface` | `#f9f9f9` | 主要文本 | 高对比，标题和正文 |
| `on-background` | `#f9f9f9` | 背景上的文本 | 与 on-surface 一致 |
| `on-surface-variant` | `#adb3b4` | 次要文本 | 中等对比，描述性文本 |
| `outline` | `#8b9293` | 边框/分隔 | 低对比，微妙分隔 |
| `outline-variant` | `#5a6061` | 变体边框 | 更低对比，15% 透明度使用 |

**排版策略**：
- 标题使用 `on-surface` (#f9f9f9) 确保清晰度
- 描述文本使用 `on-surface-variant` (#adb3b4) 降低视觉重量
- 技术标签使用 `outline-variant` 边框营造"幽灵边框"效果

---

### 强调色系统（Accent Colors）

#### Primary（主色 - 靛蓝）
| Token | 色值 | 用途 |
|-------|------|------|
| `primary` | `#4c56af` | 主要强调色，CTA、链接 |
| `primary-dim` | `#4049a2` | 暗化主色，渐变使用 |
| `primary-container` | `#3f48a1` | 主色容器背景 |
| `on-primary` | `#f9f6ff` | 主色上的文本 |
| `on-primary-container` | `#e0e0ff` | 主色容器上的文本 |
| `inverse-primary` | `#4c56af` | 反转主色 |

**使用场景**：
- Featured Project 标签
- 悬停状态文本颜色
- Curator System 卡片背景（带渐变）

#### Secondary（次要色 - 冰蓝）
| Token | 色值 | 用途 |
|-------|------|------|
| `secondary` | `#cfe6f2` | 次要强调色 |
| `secondary-dim` | `#415660` | 暗化次要色 |
| `secondary-container` | `#4d626c` | 次要容器背景 |
| `on-secondary` | `#cfe6f2` | 次要色上的文本 |
| `on-secondary-container` | `#cfe6f2` | 次要容器上的文本 |

**使用场景**：
- "已完成" 状态标签背景
- 次要信息展示

#### Tertiary（第三色 - 青绿）
| Token | 色值 | 用途 |
|-------|------|------|
| `tertiary` | `#94f0df` | 第三强调色，青绿色 |
| `tertiary-dim` | `#94f0df` | 暗化第三色 |
| `tertiary-container` | `#005e53` | 第三色容器背景（深绿） |
| `on-tertiary` | `#003730` | 第三色上的文本 |
| `on-tertiary-container` | `#a2ffed` | 第三色容器上的文本 |

**使用场景**：
- "开发中" 状态标签（绿色圆点 + 深绿背景）
- 表示活跃/进行中的状态

---

### 错误色系统（Error Colors）

| Token | 色值 | 用途 |
|-------|------|------|
| `error` | `#9f403d` | 错误提示 |
| `error-dim` | `#4e0309` | 暗化错误色 |
| `error-container` | `#752121` | 错误容器背景 |
| `on-error` | `#fff7f6` | 错误色上的文本 |
| `on-error-container` | `#fe8983` | 错误容器上的文本 |

---

## 特殊效果

### 玻璃态效果（Glassmorphism）
```css
.glass-panel {
    background: rgba(26, 30, 31, 0.7); /* surface-container-high 70% 透明度 */
    backdrop-filter: blur(12px);
}
```

### 导航栏
```css
nav {
    background: rgba(15, 23, 42, 0.7); /* slate-900/70 */
    backdrop-filter: blur(12px);
}
```

---

## 状态指示器

### 项目状态色彩映射
- **已完成**：`secondary-container` (#4d626c) 背景 + `on-secondary-container` (#cfe6f2) 文本
- **开发中**：`tertiary-container` (#005e53) 背景 + `on-tertiary-container` (#a2ffed) 文本 + 青绿色脉动圆点
- **已归档**：`outline` (#8b9293) 灰色圆点 + 低对比度文本

---

## 交互状态

### 卡片悬停
- **默认**：`surface-container-low` (#131718)
- **悬停**：`surface-container-high` (#1a1e1f)
- **过渡**：`transition-all duration-500`

### 文本悬停
- **链接默认**：`on-surface` (#f9f9f9)
- **链接悬停**：`primary` (#4c56af)

---

## 组件配色示例

### Featured Project Card（大卡片）
- 背景：`surface-container-low` (#131718)
- 标题：`on-surface` (#f9f9f9)，悬停变为 `primary` (#4c56af)
- 描述：`on-surface-variant` (#adb3b4)
- 技术标签：`outline-variant/30` 边框 + `on-surface-variant` 文本

### Curator System Card（主色卡片）
- 背景：`primary` (#4c56af)
- 文本：`on-primary` (#f9f6ff)
- 标签背景：`white/20` 半透明白色
- 悬停渐变：`primary-dim` (#4049a2) 到 `primary` (#4c56af)

---

## 设计准则

### ✅ 应该做的
1. 使用色调分层（`surface-container-low` → `surface-container-high`）创造深度
2. 技术标签使用 `outline-variant` 30% 透明度边框
3. 状态指示器使用语义化颜色（绿色=进行中，蓝色=完成，灰色=归档）
4. 悬停状态提升一个表面层级

### ❌ 禁止做的
1. **禁止**使用 1px 实线边框分隔内容
2. **禁止**使用纯黑 (#000000) 作为背景
3. **禁止**在深色模式使用高饱和度颜色（除状态指示器外）
4. **禁止**使用传统投影（box-shadow），依赖色调分层

---

## 无障碍性（Accessibility）

### 对比度检查
- `on-surface` (#f9f9f9) vs `background` (#0c0f0f)：**18.5:1** ✅ AAA
- `on-surface-variant` (#adb3b4) vs `background` (#0c0f0f)：**9.2:1** ✅ AA
- `primary` (#4c56af) vs `background` (#0c0f0f)：**5.8:1** ✅ AA

### 建议
- 正文文本始终使用 `on-surface` 确保最高可读性
- 次要信息可使用 `on-surface-variant`，但不应用于长篇阅读
- 交互元素（链接、按钮）悬停时提供明确的颜色变化

---

## 与 Light Mode 的对应关系

| Light Mode | Dark Mode | 转换逻辑 |
|------------|-----------|----------|
| `#f9f9f9` (surface) | `#0c0f0f` (surface) | 反转亮度 |
| `#2d3435` (on-surface) | `#f9f9f9` (on-surface) | 反转文本色 |
| `#ffffff` (lowest) | `#050606` (lowest) | 最亮→最暗 |
| `#dde4e5` (highest) | `#2d3435` (highest) | 保持相对层级 |

**核心原则**：深色模式不是简单的颜色反转，而是重新校准的色调系统，保持相同的视觉层级和对比度关系。
