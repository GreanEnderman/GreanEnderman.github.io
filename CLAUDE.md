# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 语言偏好

**使用中文进行所有交流和文档编写。**

## 项目概述

这是一个基于 Astro 的个人博客项目，定位为"个人数字刊物"。核心特点：
- 内容优先，阅读体验为重
- 支持技术文章和随笔两种模板
- 克制、理性、低饱和的视觉风格
- 静态生成，部署到 GitHub Pages

## 常用命令

```bash
# 开发服务器
npm run dev

# 类型检查和构建
npm run build

# 预览构建结果
npm run preview

# 仅运行 Astro CLI
npm run astro
```

## 项目架构

### 目录结构

- `src/components/` - 可复用组件
  - `site/` - 站点级组件（Header、Footer、ThemeToggle）
  - `post/` - 文章相关组件
  - `project/` - 项目相关组件
  - `common/` - 通用组件
- `src/content/` - 内容集合（使用 Astro Content Collections）
  - `posts/tech/` - 技术文章
  - `posts/essays/` - 随笔
  - `projects/` - 项目展示
- `src/layouts/` - 页面布局
  - `BaseLayout.astro` - 基础 HTML 结构、SEO、全局 Header/Footer
  - `PostLayoutTech.astro` - 技术文章模板（目录、代码高亮、阅读进度）
  - `PostLayoutEssay.astro` - 随笔模板（宽松留白、沉浸式阅读）
  - `ProjectLayout.astro` - 项目详情模板
- `src/lib/` - 工具函数
  - `posts.ts` - 文章获取、排序、筛选
  - `projects.ts` - 项目获取、关联文章
  - `archive.ts` - 按年月聚合
  - `tags.ts` - 标签提取
  - `seo.ts` - SEO 元信息生成
- `src/pages/` - 路由页面
- `src/styles/` - 样式系统
  - `tokens.css` - 设计令牌（颜色、字号、间距）
  - `global.css` - 全局样式
  - `prose.css` - Markdown 正文排版
  - `article-tech.css` / `article-essay.css` - 模板差异样式
- `public/` - 静态资源

### 路径别名

TypeScript 配置了以下路径别名：
- `@/*` → `src/*`
- `@components/*` → `src/components/*`
- `@layouts/*` → `src/layouts/*`
- `@lib/*` → `src/lib/*`
- `@styles/*` → `src/styles/*`

## 内容模型

### 文章（posts）

关键字段：
- `title` - 标题
- `description` - 摘要
- `date` - 发布时间
- `category` - 内容分类（`tech` 或 `essay`）
- `template` - 渲染模板（`tech` 或 `essay`）
- `tags` - 标签数组
- `draft` - 是否草稿
- `featured` - 是否首页精选
- `toc` - 是否显示目录

注意：`category` 用于内容归类，`template` 用于页面渲染样式，两者解耦。

### 项目（projects）

关键字段：
- `title` - 项目名
- `description` - 项目摘要
- `status` - 状态（进行中、已完成、归档）
- `stack` - 技术栈数组
- `repo` / `demo` - 仓库和演示地址
- `relatedPosts` - 关联文章 slug 数组

## 设计系统规范

### 设计理念："数字策展人"（The Digital Curator）

这个设计系统旨在连接技术精确性与文学优雅，摆脱标准个人博客的"模板感"，打造定制化的数字出版物。系统优先考虑内容而非容器，使用有意的不对称和"排版优先"哲学。

**核心美学特征：**
- **有意的呼吸空间**：留白不是"空的"，而是引导视线的功能性元素
- **不对称平衡**：使用偏移列创造动态的编辑节奏，而非居中一切
- **材质感**：通过色调分层创造物理纸张和玻璃的质感，而非扁平的数字像素

### 色彩与表面哲学

**"无线条"规则（关键约束）：**
禁止使用 1px 实线边框来分隔内容。边界必须通过以下方式定义：
1. **背景色变化**：将 `surface-container-low` 区域放在 `surface` 背景上
2. **垂直节奏**：使用间距尺度创造清晰分隔
3. **色调过渡**：从 `surface` 过渡到 `surface-variant`

**表面层级：**
- **基础层（`surface`）**：画布
- **次级层（`surface-container-low`）**：用于分组相关元数据或侧边栏元素
- **提升层（`surface-container-highest`）**：用于高优先级交互卡片

**特色纹理：玻璃态与渐变**
- **玻璃态**：导航和浮动面板使用 `surface` 颜色 70% 透明度 + `backdrop-blur: 12px`
- **渐变**：主要 CTA 使用从 `primary` 到 `primary-dim` 的微妙线性渐变，营造"精密加工"的高级感

### 排版系统

排版是系统的骨架。使用三字体策略区分"技术"和"随笔"模式：

| 尺度 | 字体 | 角色 |
| :--- | :--- | :--- |
| **Display** | *Newsreader* | 编辑之声。大尺寸、高对比度衬线字体用于标题 |
| **Headline** | *Newsreader* | 在长篇随笔中建立内容层级 |
| **Title** | *Manrope* | 结构清晰。干净的无衬线字体用于 UI 元素和卡片标题 |
| **Body** | *Manrope* | 高可读性无衬线字体用于技术文本和描述 |
| **Label** | *Space Grotesk* | "技术"口音。类等宽字体用于标签、日期和代码 |

**编辑对比：**
- 随笔：使用 `display-lg`（Newsreader）标题配合宽边距
- 技术文档：使用 `title-lg`（Manrope）配合 `label-md`（Space Grotesk）创造结构化的"蓝图"外观

### 高度与深度

摒弃传统阴影，采用**色调分层**：
- **分层原则**：通过堆叠实现深度。在 `surface-container-low` 背景上放置 `surface-container-lowest` 卡片，无需视觉噪音即可创造自然"提升"
- **环境阴影**：如需浮动元素（如模态框），使用 32px 模糊、4% 透明度的阴影，用 `on-surface` 着色
- **"幽灵边框"后备**：如需边框以满足无障碍要求，使用 `outline-variant` token 的 **15% 透明度**，绝不使用 100% 不透明边框

### 组件规范

**导航（编辑刊头）：**
- 极简主义，固定在顶部，使用 `surface` 玻璃态效果
- 活动链接使用微妙的 `primary` 下划线（2px），偏移 8px，或简单的字重变化

**卡片与文章预览：**
- **规则**：禁止分隔线
- **样式**：卡片主体使用 `surface-container-low`，悬停时过渡到 `surface-container-high`
- **排版**：标题用 `title-lg`，元信息（日期/标签）用 `label-sm`（Space Grotesk）

**专业化正文样式：**
- **技术文章**：使用严格网格。25% 宽度用于目录（ToC），75% 用于内容。代码块使用 `surface-container-highest`，语言指示器用 `spaceGrotesk` 标签
- **随笔**：单列居中（最大宽度 680px）。引用块使用 `headline-md`（Newsreader），左边距不对称缩进 40px，无引号，仅用微妙的 `surface-tint` 垂直线

**按钮与输入：**
- **主按钮**：`primary` 背景 + `on-primary` 文本，圆角 `sm`（0.125rem）营造锐利的建筑感
- **标签芯片**：`secondary-container` 背景 + `on-secondary-container` 文本，使用 `label-sm` 字体营造技术感
- **输入框**：极简下划线或 `surface-container-low` 块，焦点状态使用 2px `primary` 发光

### 设计准则

**应该做的：**
- 在随笔布局中使用不对称边距创造视觉趣味
- 使用 `on-surface-variant` 作为次要文本，保持柔和对比度以减少眼睛疲劳
- 在 *Newsreader* 和 *Manrope* 之间切换以标示内容"情绪"变化（编辑性 vs. 实用性）

**禁止做的：**
- **禁止**使用 1px 实线边框。使用背景色阶（`surface` → `surface-container-low`）代替
- **禁止**在深色模式使用纯黑（#000000）。使用调校为深炭色的 `surface` 和 `on-background` tokens
- **禁止**在卡片上使用标准"投影"。依靠间距尺度和色调分层定义层级
- **禁止**居中对齐长篇正文。始终使用左对齐以提高可读性

### 代码规范
- 优先静态生成，减少运行时负担
- 组件拆分清晰，避免过度抽象
- 样式通过 CSS 变量实现深色模式切换
- 数据处理逻辑封装在 `src/lib/` 中，保持页面层干净

### 内容策略
- 技术文章：强调结构、层级、代码体验
- 随笔：强调气氛、留白、沉浸式阅读
- 项目与文章互相关联，形成内容网络

## 开发注意事项

1. **双模板系统**：技术文和随笔使用不同布局，但保持整体气质统一
2. **内容驱动**：优先完善内容模型和阅读体验，避免过早引入复杂功能
3. **静态优先**：所有页面静态生成，确保可部署到 GitHub Pages
4. **路径处理**：注意 GitHub Pages 子路径配置（如果不是用户主页仓库）

## 参考文档

项目详细规划文档位于 `docs/` 目录：
- `blog-product-plan.md` - 产品定位和设计原则
- `astro-implementation-blueprint.md` - Astro 实施蓝图和技术细节
