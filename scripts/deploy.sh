#!/bin/bash

# 一键部署脚本
# 用法: ./scripts/deploy.sh "提交信息"

set -e  # 遇到错误立即退出

echo "🚀 开始部署流程..."

# 1. 检查是否有未提交的更改
if [[ -n $(git status -s) ]]; then
  echo "📝 检测到未提交的更改"

  # 2. 添加所有更改
  git add .

  # 3. 提交更改
  COMMIT_MSG="${1:-"更新内容 $(date +'%Y-%m-%d %H:%M:%S')"}"
  git commit -m "$COMMIT_MSG"
  echo "✅ 已提交: $COMMIT_MSG"
else
  echo "ℹ️  没有需要提交的更改"
fi

# 4. 构建站点
echo "🔨 开始构建..."
npm run build

# 5. 推送到远程仓库
echo "📤 推送到 GitHub..."
git push origin main

echo "✨ 部署完成！"
echo "📍 GitHub Pages 将在几分钟内更新"
