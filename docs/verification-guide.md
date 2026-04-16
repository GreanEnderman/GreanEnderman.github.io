# 验证指南

## 如何验证阶段一的完成情况

### 1. 检查文件是否创建

```bash
# 检查配置文件
ls -la src/content.config.ts

# 检查工具函数
ls -la src/lib/

# 检查内容文件
ls -la src/content/posts/tech/
ls -la src/content/posts/essays/
ls -la src/content/projects/
```

### 2. 验证构建是否成功

```bash
# 运行类型检查和构建
npm run build

# 应该看到：
# - 0 errors
# - 构建成功完成
```

### 3. 启动开发服务器

```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:4321
```

### 4. 测试内容集合 API

创建一个测试页面 `src/pages/test.astro`：

```astro
---
import { getAllPosts } from '@lib/posts';
import { getAllProjects } from '@lib/projects';
import { getAllTags } from '@lib/tags';

const posts = await getAllPosts();
const projects = await getAllProjects();
const tags = await getAllTags();
---

<html>
<head>
  <title>内容测试</title>
</head>
<body>
  <h1>内容验证</h1>
  
  <h2>文章 ({posts.length})</h2>
  <ul>
    {posts.map(post => (
      <li>
        <strong>{post.data.title}</strong>
        <br />
        分类: {post.data.category} | 模板: {post.data.template}
        <br />
        标签: {post.data.tags.join(', ')}
      </li>
    ))}
  </ul>

  <h2>项目 ({projects.length})</h2>
  <ul>
    {projects.map(project => (
      <li>
        <strong>{project.data.title}</strong>
        <br />
        状态: {project.data.status}
        <br />
        技术栈: {project.data.stack.join(', ')}
      </li>
    ))}
  </ul>

  <h2>标签 ({tags.length})</h2>
  <ul>
    {tags.map(({ tag, count }) => (
      <li>{tag} ({count})</li>
    ))}
  </ul>
</body>
</html>
```

然后访问 `http://localhost:4321/test`

### 5. 预期结果

**文章列表应该显示**：
- Astro 性能优化实战（tech）
- CSS Grid vs Flexbox（tech）
- TypeScript 类型体操（tech）
- 慢工具赞（essay）
- 数字园艺的哲学（essay）
- 代码的寂静（essay）

**项目列表应该显示**：
- Lume 渲染引擎（in-progress）
- 个人博客系统重构（completed）

**标签列表应该显示**：
- Astro, 性能优化, CSS, TypeScript, 思考, 工具, 互联网, 编程等

### 6. 检查类型提示

在 VSCode 中打开 `src/pages/index.astro`，尝试输入：

```astro
---
import { getAllPosts } from '@lib/posts';

const posts = await getAllPosts();
// 输入 posts[0].data. 应该看到完整的类型提示
---
```

应该看到 `title`, `description`, `date`, `category`, `template`, `tags` 等字段的自动补全。

### 7. 验证内容 Schema

尝试创建一个错误的文章（用于测试验证）：

```bash
# 创建测试文件
cat > src/content/posts/tech/test-invalid.md << 'EOF'
---
title: "测试"
description: "测试"
date: 2024-01-01
category: "invalid"  # 应该报错，只允许 tech/essay
template: "tech"
---
测试内容
EOF

# 运行构建
npm run build
```

应该看到类型错误，提示 `category` 只能是 `tech` 或 `essay`。

### 8. 快速验证清单

- [ ] `src/content.config.ts` 存在
- [ ] `src/lib/` 下有 4 个 .ts 文件
- [ ] `src/content/posts/tech/` 有 3 个 .md 文件
- [ ] `src/content/posts/essays/` 有 3 个 .md 文件
- [ ] `src/content/projects/` 有 2 个 .md 文件
- [ ] `npm run build` 成功（0 errors）
- [ ] 测试页面能正确显示内容
- [ ] VSCode 有完整的类型提示

## 常见问题

### Q: 构建失败怎么办？

```bash
# 清理缓存重试
rm -rf node_modules/.astro
npm run build
```

### Q: 类型提示不工作？

```bash
# 重新生成类型
npx astro sync
```

### Q: 看不到内容？

检查文章的 `draft` 字段是否为 `true`，`getAllPosts()` 默认过滤草稿。

## 下一步

验证通过后，可以继续阶段二的开发。
