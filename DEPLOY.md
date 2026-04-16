# 🚀 GitHub Pages 部署指南

## 前提条件

- GitHub 账号
- 项目已在本地开发完成

## 部署步骤

### 1. 修改 Astro 配置

打开 `astro.config.mjs`，修改 `site` 配置：

```js
export default defineConfig({
  site: 'https://你的用户名.github.io/仓库名',  // 修改这里
  base: '/仓库名',  // 如果不是用户主页仓库，需要添加这行
  output: 'static',
  build: {
    format: 'directory'
  }
});
```

**两种情况：**

#### 情况 A：用户主页仓库（仓库名为 `username.github.io`）

```js
export default defineConfig({
  site: 'https://你的用户名.github.io',
  // 不需要 base
  output: 'static',
  build: {
    format: 'directory'
  }
});
```

#### 情况 B：项目仓库（仓库名为其他名字，如 `myblog`）

```js
export default defineConfig({
  site: 'https://你的用户名.github.io/myblog',
  base: '/myblog',  // 添加这行
  output: 'static',
  build: {
    format: 'directory'
  }
});
```

### 2. 初始化 Git 仓库

```bash
# 初始化 Git
git init

# 添加所有文件
git add .

# 首次提交
git commit -m "初始化博客项目"
```

### 3. 在 GitHub 创建仓库

1. 访问 https://github.com/new
2. 填写仓库名（如 `myblog` 或 `username.github.io`）
3. **不要**勾选 "Add a README file"
4. 点击 "Create repository"

### 4. 关联远程仓库并推送

```bash
# 关联远程仓库（替换成你的仓库地址）
git remote add origin https://github.com/你的用户名/仓库名.git

# 重命名分支为 main（如果当前是 master）
git branch -M main

# 推送代码
git push -u origin main
```

### 5. 配置 GitHub Pages

1. 进入 GitHub 仓库页面
2. 点击 `Settings`（设置）
3. 左侧菜单找到 `Pages`
4. 在 **Source** 下拉菜单选择：`GitHub Actions`

### 6. 等待部署完成

1. 点击仓库顶部的 `Actions` 标签
2. 查看部署进度（首次部署约 1-2 分钟）
3. 部署成功后，访问你的网站：
   - 用户主页：`https://你的用户名.github.io`
   - 项目仓库：`https://你的用户名.github.io/仓库名`

## 后续更新流程

配置完成后，每次更新只需：

```bash
# 方式一：使用部署脚本
.\scripts\deploy.ps1 "更新说明"

# 方式二：手动操作
git add .
git commit -m "更新内容"
git push origin main
```

推送后，GitHub Actions 会自动构建和部署。

## 常见问题

### Q: 页面显示 404

**原因**：`base` 配置不正确

**解决**：
- 用户主页仓库：删除 `base` 配置
- 项目仓库：确保 `base: '/仓库名'` 与实际仓库名一致

### Q: 样式丢失

**原因**：资源路径不正确

**解决**：检查 `astro.config.mjs` 中的 `site` 和 `base` 配置

### Q: GitHub Actions 失败

**解决步骤**：
1. 查看 Actions 日志找到错误信息
2. 常见原因：
   - 类型检查失败：运行 `npm run build` 本地测试
   - 权限问题：确保 Settings → Actions → General → Workflow permissions 设置为 "Read and write permissions"

### Q: 如何使用自定义域名？

1. 在仓库 `Settings` → `Pages` → `Custom domain` 填写域名
2. 在域名服务商添加 DNS 记录：
   ```
   类型: CNAME
   名称: www (或 @)
   值: 你的用户名.github.io
   ```
3. 等待 DNS 生效（可能需要几小时）

## 验证部署

部署成功后，检查：

- ✅ 首页能正常访问
- ✅ 文章列表显示正确
- ✅ 点击文章能正常打开
- ✅ 样式和图片正常加载
- ✅ 深色模式切换正常

## 快速命令参考

```bash
# 初始化并首次部署
git init
git add .
git commit -m "初始化项目"
git remote add origin https://github.com/用户名/仓库名.git
git branch -M main
git push -u origin main

# 后续更新
.\scripts\deploy.ps1 "更新说明"
```

## 需要帮助？

如果遇到问题：
1. 查看 GitHub Actions 日志
2. 检查浏览器控制台错误
3. 确认配置文件正确
