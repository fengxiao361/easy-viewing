#!/usr/bin/env sh

# 定义静态资源的访问路径
PUBLIC_URL="/easy-viewing" # 将 "your-repo-name" 替换为你的 GitHub 仓库名称

# 打包构建
npm run build

# 进入构建输出目录
cd dist

# 初始化 Git 仓库并提交代码
git init
git add -A
git commit -m 'deploy'

# 推送到 GitHub Pages
git push -f git@github.com:fengxiao361/easy-viewing.git master:gh-pages
