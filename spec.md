# Role & Objective
你是一位拥有极致审美的前端架构师。你的任务是从零构建一个现代化的、高性能的“个人博客”项目。
该项目必须完美适配 **GitHub Pages** 托管环境（纯静态导出），并采用流行的 **Bento Grid（便当盒风格）** UI 设计。

# Tech Stack (Strict Constraints)
必须严格遵守以下技术选型，不接受降级：
1.  **Framework**: Next.js 14+ (App Router)
2.  **Language**: TypeScript
3.  **Styling**: Tailwind CSS (利用 Grid 布局实现 Bento 风格)
4.  **Content**: MDX (使用 `next-mdx-remote` 或 `contentlayer`，推荐使用简单的 `next-mdx-remote` 以减少依赖复杂度)
5.  **Icons**: Lucide React
6.  **Animation**: Framer Motion (用于卡片微交互)
7.  **Deployment**: GitHub Pages (Static Export Mode)

# Design Specifications (UI/UX)
1.  **Layout (首页)**:
    - 采用 Bento Grid 布局（CSS Grid）。
    - 包含模块：个人简介卡片（带头像）、社媒链接模块、最新文章列表模块、Tech Stack 展示模块、Spotify/正在阅读模块（静态模拟即可）、深色模式切换开关。
    - 移动端响应式：在手机上自动堆叠为单栏流式布局。
2.  **Theme**:
    - 支持 System/Light/Dark 切换 (使用 `next-themes`)。
    - 视觉风格：极简、圆角卡片 (Rounded-xl)、微边框 (Subtle Borders)、背景模糊 (Backdrop Blur)。
3.  **Typography**: 使用 `Inter` 或 `Geist Sans` 字体。

# Critical Configuration for GitHub Pages
由于托管在 GitHub Pages，必须确保：
1.  在 `next.config.mjs` 中设置 `output: 'export'`。
2.  图片组件处理：由于 Next.js 默认 Image Optimization 依赖服务器，需在配置中设置 `images: { unoptimized: true }`，或者配置自定义 loader。
3.  路由：不能使用依赖服务器的 API Routes (No /api/*)。

# Implementation Plan (Step-by-Step)
请按照以下步骤执行，每完成一步后向我确认，再进行下一步：

## Phase 1: Initialization & Config
1.  检查当前目录是否为空，如果为空，使用 `npx create-next-app@latest . --typescript --tailwind --eslint` 初始化项目。
2.  安装必要依赖：`npm install next-themes lucide-react framer-motion clsx tailwind-merge next-mdx-remote gray-matter date-fns`。
3.  **关键修正**: 修改 `next.config.mjs` 以支持 Static Export。
4.  配置 `tailwind.config.ts`，添加必要的颜色变量和插件（如 `@tailwindcss/typography`）。

## Phase 2: Core Components
1.  创建基础 UI 组件：`Card` (Bento 基础容器), `Badge`, `Button`.
2.  创建 `ThemeProvider` 包装器并在 `layout.tsx` 中使用。
3.  创建 `Navbar` 和 `Footer`。

## Phase 3: The Bento Grid (Home Page)
1.  在 `app/page.tsx` 中实现 Bento Grid 布局。
2.  编写各个 Bento 子模块组件：
    - `ProfileCard`: 头像 + 简介 + 状态。
    - `SocialLinks`: GitHub/Twitter 入口。
    - `PostList`: 读取最新的 3 篇 Markdown 文章标题。

## Phase 4: Blog System
1.  创建 `/content/posts` 目录，并生成 2 篇测试用的 `.mdx` 文章（带 Frontmatter）。
2.  创建 `lib/posts.ts` 工具函数，用于读取文件系统中的 Markdown 文件（使用 `fs` 和 `gray-matter`）。
3.  创建文章详情页 `app/posts/[slug]/page.tsx`，使用 `generateStaticParams` 确保所有文章在构建时生成静态 HTML。
4.  配置 Markdown 渲染样式 (`prose` class via Tailwind Typography)。

# Execution Instructions
- 你有权运行终端命令（如 `npm install`, `mkdir` 等）。
- 编写代码时，请直接创建或修改文件。
- **开始行动**：请先执行 Phase 1 的第一步。