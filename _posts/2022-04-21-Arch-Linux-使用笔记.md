---
tags: [Arch Linux, pacman]
last_modified_time: 2022-04-21 23:18:16 +0800
title: Arch Linux 使用笔记
---

本文是笔者使用 Arch Linux 的笔记，主要包括一些基本操作和遇到过的问题

<p id="markdown-toc"></p>
<!-- vim-markdown-toc GFM -->

* [基础学习](#基础学习)
* [安装](#安装)
* [pacman](#pacman)
* [网络配置](#网络配置)
* [安装好后需要做的事](#安装好后需要做的事)

<!-- vim-markdown-toc -->

## 基础学习
* [Arch Linux](https://archlinux.org/)：大致浏览官网各个页面，从而可以了解到 Arch Linux 的几乎所有内容都可以从官网找到，这点是非常好的
* [Help:Reading (简体中文) - ArchWiki](https://wiki.archlinux.org/title/Help:Reading_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))：讲述了如何读 ArchWiki
* [Arch Linux (简体中文) - ArchWiki](https://wiki.archlinux.org/title/Arch_Linux_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))：讲述了 Arch Linux 的原则和历史

## 安装
* [Installation guide (简体中文) - ArchWiki](https://wiki.archlinux.org/title/Installation_guide_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))：官方教程。讲述了如何从 ISO 安装 Arch Linux
* [Arch Linux - Downloads](https://archlinux.org/download/)：下载页面。其中有虚机 Virtual Box 的 ovf 文件（VM images 部分中的 Gitlab Instance 链接中的`Arch-Linux-x86_64-virtualbox-20220420.53723.box`, `tar xf`后就有 ovf 文件），从而可以快速部署 Arch Linux 虚机

## pacman
* [pacman (简体中文) - ArchWiki](https://wiki.archlinux.org/title/Pacman_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))：官方教程
* [Pacman (简体中文)/Rosetta (简体中文) - ArchWiki](https://wiki.archlinux.org/title/Pacman_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)/Rosetta_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))：与其他 Linux 发行版包管理器的比较
* [pacman (简体中文)/Tips and tricks (简体中文) - ArchWiki](https://wiki.archlinux.org/title/Pacman_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)/Tips_and_tricks_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))

遇到过的问题：
* [Get history of package installation / Pacman & Package Upgrade Issues / Arch Linux Forums](https://bbs.archlinux.org/viewtopic.php?id=88600)

## 网络配置
* [systemd-networkd (简体中文) - ArchWiki](https://wiki.archlinux.org/title/Systemd-networkd_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))：官方教程


## 安装好后需要做的事
- 学会快速安装软件：如下两个方案
  - 使用代理：`sudo -E pacman -S xxx`（临时）和 在`/etc/sudoers`中添加一行：`Defaults env_keep += "ftp_proxy http_proxy https_proxy no_proxy"`（永久）
  - 使用国内镜像
- 配置静态IP
- 检查 [Installation guide (简体中文) - ArchWiki](https://wiki.archlinux.org/title/Installation_guide_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
  - 设置时区
- 检查 [General recommendations (简体中文) - ArchWiki](https://wiki.archlinux.org/title/General_recommendations_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
- 设置 root 密码
- 创建用户并设置密码
- 部署常用配置文件（vimrc等）：MyProfile
  ```bash
  sudo pacman -S python python-pip socat minicom tmux bear
  ```
  
- 配置 ssh 公私钥
- 磁盘大小是否合适
- 共享 Windows 文件夹
- 搭建本地博客环境
  ```bash
  install_rvm
  sudo pacman -S base-devel clang
  deploy_local_github_pages_environment
  jes
  ```
  
