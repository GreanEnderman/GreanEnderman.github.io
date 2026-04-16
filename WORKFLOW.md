# 📝 写作工作流指南

## 快速开始

### 1. 创建新文章

#### 方式一：使用默认文件名

```bash
# 技术文章（创建 new-article.md）
npm run new:tech

# 随笔（创建 new-article.md）
npm run new:essay

# 项目（创建 new-article.md）
npm run new:project
```

#### 方式二：指定自定义文件名（推荐）

```bash
# 技术文章
npm run new tech my-awesome-article

# 随笔
npm run new essay thoughts-on-coding

# 项目
npm run new project my-cool-project
```

**注意**：
- 文件名使用小写字母和连字符（如 `my-article-name`）
- 不要包含 `.md` 后缀，脚本会自动添加
- 日期会自动设置为今天

### 2. 编辑内容

用你喜欢的编辑器（VS Code、Typora、Obsidian 等）打开创建的 MD 文件，编辑内容。

**重要字段说明：**

- `title`: 文章标题
- `description`: 摘要（用于 SEO 和列表展示）
- `date`: 发布日期（自动设置为今天）
- `category`: 内容分类（`tech` 或 `essay`）
- `template`: 渲染模板（`tech` 或 `essay`）
- `tags`: 标签数组
- `featured`: 是否在首页精选（`true` 或 `false`）
- `toc`: 是否显示目录（`true` 或 `false`）
- `draft`: 是否草稿（`true` 则不会发布）

### 3. 本地预览

```bash
npm run dev
```

访问 http://localhost:4321 查看效果。

### 4. 一键部署

#### Windows (PowerShell)

```powershell
.\scripts\deploy.ps1 "你的提交信息"
```

或使用默认提交信息：

```powershell
.\scripts\deploy.ps1
```

#### macOS/Linux (Bash)

```bash
chmod +x scripts/deploy.sh  # 首次使用需要添加执行权限
./scripts/deploy.sh "你的提交信息"
```

#### 使用 npm 命令（跨平台）

```bash
npm run deploy
```

## 工作流程

```
1. 创建文章 → 2. 编辑内容 → 3. 本地预览 → 4. 一键部署
   (10秒)       (专注写作)      (实时查看)     (自动发布)
```

## 完整示例

```bash
# 1. 创建一篇关于 TypeScript 的技术文章
npm run new tech typescript-best-practices

# 输出：
# ✅ 创建成功！
# 📝 文件位置: src/content/posts/tech/typescript-best-practices.md
# 📅 日期已设置为: 2026-04-16

# 2. 编辑文件
code src/content/posts/tech/typescript-best-practices.md

# 3. 本地预览
npm run dev

# 4. 部署
.\scripts\deploy.ps1 "添加 TypeScript 最佳实践文章"
```

## 自动化部署

项目已配置 GitHub Actions，当你推送代码到 `main` 分支时，会自动：

1. ✅ 运行类型检查
2. ✅ 构建静态站点
3. ✅ 部署到 GitHub Pages

**首次使用需要配置：**

1. 进入 GitHub 仓库设置
2. 找到 `Settings` → `Pages`
3. 在 `Build and deployment` 下选择：
   - Source: `GitHub Actions`

## 文件命名建议

使用小写字母和连字符，便于 URL 友好：

```
✅ good-article-name
✅ my-awesome-project
✅ thoughts-on-design
❌ 我的文章 (中文不利于 URL)
❌ MyArticle (大写字母不规范)
❌ my_article (下划线不推荐)
```

## 图片管理

将图片放在 `public/images/` 目录下，在 MD 中引用：

```markdown
![图片描述](/images/your-image.jpg)
```

## 常见问题

### Q: 如何写草稿？

在 frontmatter 中设置 `draft: true`，该文章不会被构建。

### Q: 如何修改已发布的文章？

直接编辑对应的 MD 文件，然后重新部署即可。

### Q: 如何删除文章？

删除对应的 MD 文件，然后重新部署。

### Q: 文件已存在怎么办？

脚本会检测文件是否存在，如果存在会提示错误。请使用不同的文件名或删除现有文件。

### Q: 部署失败怎么办？

1. 检查 GitHub Actions 日志
2. 确保 `astro.config.mjs` 中的 `site` 配置正确
3. 确保 GitHub Pages 已启用

## 进阶技巧

### 快速查看最近文章

```bash
# PowerShell
Get-ChildItem -Path src\content\posts -Recurse -Filter *.md | Sort-Object LastWriteTime -Descending | Select-Object -First 5

# Bash
ls -lt src/content/posts/**/*.md | head -5
```

### 搜索特定标签的文章

```bash
# PowerShell
Select-String -Path src\content\posts\**\*.md -Pattern "tags.*TypeScript"

# Bash
grep -r "tags.*TypeScript" src/content/posts/
```

### 统计文章数量

```bash
# PowerShell
(Get-ChildItem -Path src\content\posts -Recurse -Filter *.md).Count

# Bash
find src/content/posts -name "*.md" | wc -l
```

## 推荐编辑器配置

### VS Code

安装插件：
- Markdown All in One
- Markdown Preview Enhanced
- Code Spell Checker

### Typora

设置 → 图片 → 复制图片到 `./public/images/` 文件夹

### Obsidian

在 Vault 中链接 `src/content/` 目录，享受双向链接和图谱视图。

## 命令速查表

| 命令 | 说明 |
|------|------|
| `npm run new tech <name>` | 创建技术文章 |
| `npm run new essay <name>` | 创建随笔 |
| `npm run new project <name>` | 创建项目 |
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览构建结果 |
| `npm run deploy` | 一键部署 |
| `.\scripts\deploy.ps1 "msg"` | 部署并指定提交信息 |
