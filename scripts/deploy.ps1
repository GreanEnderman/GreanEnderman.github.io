# Windows PowerShell deployment script
# Usage: .\scripts\deploy.ps1 "commit message"

param(
    [string]$CommitMessage = "Update content $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
)

$ErrorActionPreference = "Stop"

Write-Host "Starting deployment..." -ForegroundColor Cyan

# 1. Check for uncommitted changes
$status = git status --short
if ($status) {
    Write-Host "Uncommitted changes detected" -ForegroundColor Yellow

    # 2. Stage all changes
    git add .

    # 3. Commit changes
    git commit -m $CommitMessage
    Write-Host "Committed: $CommitMessage" -ForegroundColor Green
} else {
    Write-Host "No changes to commit" -ForegroundColor Gray
}

# 4. Build the site
Write-Host "Building the site..." -ForegroundColor Cyan
npm run build

# 5. Push to the remote repository
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push origin main

Write-Host "Deployment complete" -ForegroundColor Green
Write-Host "GitHub Pages will update in a few minutes" -ForegroundColor Gray
