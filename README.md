# MyBlog - 个人数字刊物

基于 Astro 构建的个人博客，定位为"个人数字刊物"。

## ✨ 特性

- 📝 支持技术文章和随笔两种模板
- 🎨 克制、理性、低饱和的视觉风格
- 🚀 静态生成，极致性能
- 📱 响应式设计
- 🌓 深色模式支持

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

访问 http://localhost:4321

### 构建生产版本

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 📝 写作工作流

### 方式一：使用 npm 命令（推荐）

```bash
# 创建技术文章
npm run new:tech
# 然后重命名 src/content/posts/tech/new-article.md

# 创建随笔
npm run new:essay
# 然后重命名 src/content/posts/essays/new-essay.md

# 创建项目
npm run new:project
# 然后重命名 src/content/projects/new-project.md
```

### 方式二：手动复制模板

```bash
# 从 templates/ 目录复制对应模板到内容目录
cp templates/tech-template.md src/content/posts/tech/你的文章.md
```

### 一键部署

```bash
# Windows PowerShell
.\scripts\deploy.ps1 "提交信息"

# macOS/Linux
./scripts/deploy.sh "提交信息"

# 或使用 npm 命令（使用默认提交信息）
npm run deploy
```

## 📁 项目结构

```
MyBlog/
├── src/
│   ├── components/      # 可复用组件
│   ├── content/         # 内容集合（Markdown 文件）
│   │   ├── posts/
│   │   │   ├── tech/    # 技术文章
│   │   │   └── essays/  # 随笔
│   │   └── projects/    # 项目展示
│   ├── layouts/         # 页面布局
│   ├── lib/             # 工具函数
│   ├── pages/           # 路由页面
│   └── styles/          # 样式系统
├── templates/           # 文章模板
├── scripts/             # 部署脚本
├── public/              # 静态资源
└── WORKFLOW.md          # 详细工作流指南
```

## 📖 详细文档

- [WORKFLOW.md](./WORKFLOW.md) - 完整的写作工作流指南
- [CLAUDE.md](./CLAUDE.md) - 项目架构和开发规范
- [docs/](./docs/) - 设计文档和实施蓝图

## 🔧 技术栈

- **框架**: Astro 5.x
- **语言**: TypeScript
- **样式**: CSS Variables + 设计令牌
- **部署**: GitHub Pages + GitHub Actions

## 📝 内容模型

### 文章 (posts)

```yaml
---
title: "文章标题"
description: "文章摘要"
date: 2026-04-16
category: "tech"  # tech 或 essay
template: "tech"  # tech 或 essay
tags: ["标签1", "标签2"]
featured: false
toc: true
draft: false
---
```

### 项目 (projects)

```yaml
---
title: "项目名称"
description: "项目简介"
date: 2026-04-16
status: "in-progress"  # in-progress | completed | archived
stack: ["技术1", "技术2"]
featured: false
repo: "https://github.com/..."
demo: "https://..."
relatedPosts: ["article-slug"]
---
```

## 🚀 部署

### 自动部署（推荐）

推送到 `main` 分支后，GitHub Actions 会自动构建并部署到 GitHub Pages。

**首次配置：**

1. 进入仓库 `Settings` → `Pages`
2. Source 选择 `GitHub Actions`
3. 推送代码即可自动部署

### 手动部署

```bash
# Windows
.\scripts\deploy.ps1

# macOS/Linux
./scripts/deploy.sh
```

## 📄 许可证

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
