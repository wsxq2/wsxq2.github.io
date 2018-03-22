---
layout: post
tags: [github]
categories: blog
description: null.
---

# Git
---

Git Author: Linus
## Install && Config
```bash
sudo apt-get install git
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
```
## Create repository
```bash
$ mkdir learngit
$ cd learngit
$ pwd
/Users/michael/learngit
$ git init
git add readme.txt
git commit -m "wrote a readme file"
```
## 时光穿梭
```bash
git status
git diff readme.txt
```
### 版本回退
```bash
git log
git log --pretty=oneline
git reset --hard HEAD^
git reset --hard 3628164
git reflog
```
