# AGENTS.md

## 项目概览

本仓库是基于 Astro 5、TypeScript 和 CSS Variables 构建的个人博客（“个人数字刊物”）。站点以内容和阅读体验为中心，区分技术文章与随笔两类展示模板，并通过 Astro 静态生成部署到 GitHub Pages。

- 默认使用中文交流和编写项目文档；文件名、命令、路径、API、环境变量和代码标识符保持 English。
- 保持 static-first：不要在没有明确需求时引入服务端运行时或重型客户端依赖。
- 改动应延续克制、低饱和、排版优先的既有视觉语言。

## 仓库结构

- `src/pages/`：Astro file-based routes。
- `src/layouts/`：基础页面、技术文章、随笔和项目详情布局。
- `src/components/`：按 `site/`、`post/`、`project/` 组织的可复用组件。
- `src/lib/`：文章、项目、归档、标签和 SEO 等数据处理逻辑。
- `src/content/`：Markdown 内容；文章位于 `posts/tech/`、`posts/essays/`，项目位于 `projects/`。
- `src/content.config.ts`：当前 Astro Content Collections schema 的主要定义；修改 frontmatter 前先与此文件核对。
- `src/styles/`：`tokens.css`、全局样式、正文排版及双文章模板样式。
- `templates/` 与 `scripts/new.js`：新内容模板和创建脚本。
- `public/`：原样复制的静态资源。
- `.github/workflows/deploy.yml`：`main` 分支的 GitHub Pages 构建与部署流程。
- `dist/` 与 `.astro/`：生成目录，已被 `.gitignore` 忽略；不要手工编辑或提交。

## 安装、开发与验证

CI 使用 Node.js 20 和 npm。依赖锁定文件为 `package-lock.json`。

```bash
npm ci          # 按 lockfile 安装，适合干净环境和 CI
npm run dev     # 启动本地开发服务器，默认 http://localhost:4321
npm run build   # 运行 astro check，再生成 dist/
npm run preview # 本地预览已生成的站点
```

- 提交代码前至少运行 `npm run build`；它是当前仓库唯一已配置的 typecheck/build 门禁。
- 当前没有独立的 `test`、`lint` 或 `format` npm script，不要声称已运行这些检查，也不要臆造对应命令。
- 涉及布局、主题、响应式样式或内容渲染时，在 `npm run build` 后用 `npm run dev` 或 `npm run preview` 检查受影响页面；同时检查 light/dark theme、窄屏和桌面视口。
- 构建后留意 broken routes、缺失静态资源、Content Collections schema errors 和 TypeScript diagnostics。

## 内容工作流与模型

优先通过现有脚本创建内容：

```bash
npm run new tech <slug>
npm run new essay <slug>
npm run new project <slug>
```

- `<slug>` 使用 lowercase kebab-case，脚本会自动添加 `.md` 并更新日期。
- 文章必需字段包括 `title`、`description`、`date`、`category` 和 `template`；`category` 与 `template` 均只接受 `tech` 或 `essay`，但语义彼此独立。
- 项目的 `status` 只接受 `in-progress`、`completed` 或 `archived`。
- `draft: true` 的文章不会出现在公开文章查询中。
- 图片放入 `public/images/`，在 Markdown 中以 `/images/...` 引用。
- 调整字段或默认值时，以 `src/content.config.ts` 和实际调用点为准，并同步模板与相关文档。仓库同时存在旧式 `src/content/config.ts`；不要让两份 schema 继续产生不一致，修改前确认 Astro 当前加载的配置入口。

## 代码约定

- 遵循现有 Astro/TypeScript 风格：Astro frontmatter、ES modules、single quotes、分号和 2-space indentation。
- 使用 `tsconfig.json` 中已有 aliases：`@/*`、`@components/*`、`@layouts/*`、`@lib/*`、`@styles/*`。
- 页面负责组合和路由；可复用 UI 放入 `src/components/`，数据获取、排序、筛选和派生逻辑放入 `src/lib/`。
- 保持组件职责清晰，避免仅为复用少量标记而过度抽象。
- 优先使用 `src/styles/tokens.css` 中的 design tokens/CSS variables；light/dark theme 通过 `[data-theme="dark"]` 覆盖变量。
- 不要在长篇正文中使用居中对齐，也不要以纯黑 `#000000` 作为 dark theme 背景。
- 内容分隔优先使用 spacing、surface color layers 和 tonal transitions；避免 1px opaque solid borders 和普通 card drop shadows。无障碍确需边界时，使用低透明度 `outline-variant`。
- 技术文章保持结构化、清晰的层级与代码体验；随笔保持较窄正文、充足留白和沉浸式排版。两种模板应共享整体设计气质。

## 环境、部署与安全

- 不要提交 `.env`、`.env.production`、credentials、tokens 或其他 secrets。
- `astro.config.mjs` 当前配置 `site: 'https://GreanEnderman.github.io'`、`output: 'static'`；修改部署地址时同时核对 GitHub Pages 是否需要 `base` path，并检查所有绝对资源路径。
- 推送 `main` 会触发 GitHub Actions 部署。`.github/workflows/deploy.yml` 使用 `npm ci`、`npm run build` 并发布 `dist/`。
- `npm run deploy`、`scripts/deploy.ps1` 和 `scripts/deploy.sh` 会进行 Git staging、commit 和 push。除非用户明确要求发布，否则不要运行这些命令。
- 不要擅自提交、推送、删除内容文件或改写 Git history。

## Agent 工作规则

- 开始修改前先运行 `git status --short`，识别并保留用户已有改动；不要覆盖或清理无关工作区文件。
- 先阅读与任务最接近的 layout、component、style、content schema 和文档，再做局部、可审查的改动。
- 不要直接编辑 `dist/`、`.astro/`、`node_modules/` 或 `.obsidian/workspace.json` 等工具状态文件。
- 新增依赖必须有明确必要性，并同步更新 `package.json` 与 `package-lock.json`。
- 修改路由、内容 slug、schema 或部署配置属于高影响变更：检查引用、生成路径、GitHub Pages base path 和现有 Markdown 内容兼容性。
- 完成后报告实际运行的验证命令和结果；若未能进行浏览器或部署验证，应明确说明缺口。
