---
layout: post
tags: [emmet, Vim, emmet-vim]
categories: blog
---


<!-- vim-markdown-toc GFM -->

* [简介](#简介)
* [安装](#安装)

<!-- vim-markdown-toc -->

**Emmet-vim**: https://github.com/mattn/emmet-vim

## 简介
来自官方文档<https://docs.emmet.io/>的说明如下：
> ### Emmet — the essential toolkit for web-developers
> 
> Emmet是一个Web开发人员的工具包，可以极大地改善您的HTML和CSS工作流程。
>
> 基本上，大多数文本编辑器允许您存储和重用常用的代码块，称为“片段”。虽然片段是提高工作效率的好方法，但所有实现都有一些常见的陷阱：您必须先定义片段，然后才能在运行时扩展它们。
> 
> Emmet将片段创意提升到一个全新的水平：您可以键入类似CSS的表达式，可以动态解析，并根据您在缩写中键入的内容生成输出。 Emmet是为Web开发人员开发和优化的，其工作流依赖于HTML / XML和CSS，但也可以与编程语言一起使用。

## 安装
使用 [Vim-plug](https://github.com/junegunn/vim-plug) 插件管理器安装，过程非常简单：
添加如下内容到`~/.vimrc`中的相应位置：
```
" add this line to your .vimrc file
Plug 'mattn/emmet-vim'
```

然后进入 Vim，输入如下命令：
```
:PlugInstall
```

