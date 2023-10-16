#!/usr/bin/env sh

# 忽略错误
set -e  #有错误抛出错误

# 构建
pnpm run build:git

cd dist

git init
git add -A
git commit -m 'deploy docs'

git push -f git@github.com:biggerstar/personal-homepage.git main:docs-pages

cd -

rm -rf dist
