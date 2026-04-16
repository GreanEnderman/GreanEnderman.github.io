---
title: "个人博客系统重构"
description: "从 WordPress 迁移到 Astro，打造以内容为中心的个人数字刊物。"
date: 2024-03-10
status: "completed"
stack: ["Astro", "TypeScript", "CSS", "Markdown"]
featured: false
relatedPosts: ["astro-performance-optimization", "css-grid-vs-flexbox"]
---

## 项目动机

之前的博客使用 WordPress，虽然功能完善，但存在几个问题：

1. **性能差**：加载时间 3-4 秒，Lighthouse 评分只有 60 分
2. **维护成本高**：需要定期更新插件、处理安全问题
3. **写作体验差**：富文本编辑器不如 Markdown 流畅
4. **过度设计**：90% 的功能用不到，但增加了复杂度

## 技术选型

### 为什么选择 Astro

对比了几个静态站点生成器：

| 框架 | 优点 | 缺点 |
|------|------|------|
| Next.js | 生态完善 | 过于复杂，需要 React |
| Gatsby | 插件丰富 | 构建慢，GraphQL 学习成本 |
| Hugo | 构建快 | Go 模板语法不友好 |
| **Astro** | 性能好，灵活 | 生态较新 |

最终选择 Astro 的原因：
- **零 JS 默认**：只在需要时加载 JavaScript
- **组件无关**：可以混用 React、Vue、Svelte
- **Content Collections**：内置的内容管理方案
- **性能优先**：自动优化图像、CSS、字体

## 设计理念

### "数字策展人"美学

不想做一个"标准博客"，而是打造一个有个性的数字出版物：

**核心原则**：
1. **内容优先**：排版服务于阅读体验
2. **克制设计**：低饱和度、大留白、不对称布局
3. **双模板系统**：技术文和随笔使用不同的排版风格

**视觉特征**：
- 无边框设计（用背景色分层代替 1px 边框）
- 三字体策略（Newsreader + Manrope + Space Grotesk）
- 玻璃态导航（70% 透明度 + backdrop-blur）

### 内容模型

设计了灵活的内容分类系统：

```typescript
// category: 内容归类（tech/essay）
// template: 渲染样式（tech/essay）
// 两者解耦，允许技术文使用随笔模板
```

这样可以写"技术随笔"——内容是技术的，但排版是随笔风格。

## 实施过程

### 阶段一：基础架构（1 周）

- ✅ 项目初始化
- ✅ 设计令牌系统（tokens.css）
- ✅ Content Collections 配置
- ✅ 工具函数层（posts.ts, projects.ts, tags.ts, seo.ts）

### 阶段二：页面开发（2 周）

- ✅ 首页（精选内容 + 分栏展示）
- ✅ 文章列表页（不对称网格布局）
- ✅ 文章详情页（双模板系统）
- ✅ 项目页

### 阶段三：功能完善（1 周）

- ✅ 标签系统
- ✅ 归档页
- ✅ 搜索功能（Pagefind）
- ✅ SEO 优化（sitemap, RSS, Open Graph）

### 阶段四：内容迁移（1 周）

- ✅ 从 WordPress 导出 Markdown
- ✅ 图片优化和迁移
- ✅ 链接重定向配置

## 技术亮点

### 1. 性能优化

最终 Lighthouse 评分：**100/100/100/100**

关键优化：
- 图像自动转 WebP
- 字体预加载 + font-display: swap
- 关键 CSS 内联
- 组件按需加载（client:visible）

### 2. 类型安全

全栈 TypeScript，从内容到组件都有类型检查：

```typescript
// content.config.ts 定义 Schema
// lib/ 工具函数提供类型推导
// 组件使用 CollectionEntry<'posts'> 类型
```

### 3. 开发体验

- 热更新（HMR）
- 类型提示
- 路径别名（@components, @lib, @styles）
- 统一的代码风格（Prettier + ESLint）

## 成果

**性能提升**：
- 加载时间：3.5s → 0.8s
- Lighthouse：60 → 100
- 包体积：2.5MB → 180KB

**写作体验**：
- Markdown 编辑器（VSCode）
- 实时预览
- Git 版本控制

**维护成本**：
- 无需服务器
- 无需数据库
- 无需插件更新
- GitHub Actions 自动部署

## 经验总结

1. **静态优先**：对于个人博客，静态生成足够了
2. **设计系统先行**：先定义 tokens，再写组件
3. **内容模型要灵活**：category 和 template 解耦很重要
4. **性能是特性**：快速加载本身就是用户体验

## 相关文章

- [Astro 性能优化实战](../posts/astro-performance-optimization)
- [CSS Grid vs Flexbox 的选择](../posts/css-grid-vs-flexbox)

## 技术栈

- **框架**：Astro 5.1.3
- **语言**：TypeScript
- **样式**：原生 CSS + 设计令牌
- **搜索**：Pagefind
- **部署**：GitHub Pages
- **CI/CD**：GitHub Actions
