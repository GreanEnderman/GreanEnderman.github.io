# Windows PowerShell 部署脚本
# 用法: .\scripts\deploy.ps1 "提交信息"

param(
    [string]$CommitMessage = "更新内容 $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
)

$ErrorActionPreference = "Stop"

Write-Host "🚀 开始部署流程..." -ForegroundColor Cyan

# 1. 检查是否有未提交的更改
$status = git status --short
if ($status) {
    Write-Host "📝 检测到未提交的更改" -ForegroundColor Yellow

    # 2. 添加所有更改
    git add .

    # 3. 提交更改
    git commit -m $CommitMessage
    Write-Host "✅ 已提交: $CommitMessage" -ForegroundColor Green
} else {
    Write-Host "ℹ️  没有需要提交的更改" -ForegroundColor Gray
}

# 4. 构建站点
Write-Host "🔨 开始构建..." -ForegroundColor Cyan
npm run build

# 5. 推送到远程仓库
Write-Host "📤 推送到 GitHub..." -ForegroundColor Cyan
git push origin main

Write-Host "✨ 部署完成！" -ForegroundColor Green
Write-Host "📍 GitHub Pages 将在几分钟内更新" -ForegroundColor Gray
