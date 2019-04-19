---
tags: [Vim, ultisnips,vim-snippets, TODO]
---

* UltiSnips: <https://github.com/SirVer/ultisnips>
* vim-snippets: <https://github.com/honza/vim-snippets>

<p id="markdown-toc"></p>
<!-- vim-markdown-toc GFM -->

* [简介](#简介)
* [使用](#使用)

<!-- vim-markdown-toc -->

## 简介
`UltiSnips`为程序本身，`vim-snippets`为常用的代码片段

## 使用
* `Ctl+J`: 在输入部分代码后按该快捷键自动补全代码片段，如`#!<Ctrl+J>`自动补全如下代码片段（在Python文件中）:
  ```
  #!/usr/bin/env python
  # -*- coding: utf-8 -*-
  ```
  又如定义函数的代码片段`def<Ctrl+J>`：
  ```
  def function(arg1):
      """TODO: Docstring for function.
  
      :arg1: TODO
      :returns: TODO
  
      """
      pass
  ```
  输入函数名后按<Ctrl+J>跳转至下一位置，如上将是`arg1`
  又如，时常使用的插入日期的代码片段`date<Ctrl+J>`：
  ```
  2018-11-07
  ```
  若想知道有哪些可能的代码片段，可以查看`~/.vim/bundle/vim-snippets/UltiSnips/all.snippets`和`~/.vim/bundle/vim-snippets/UltiSnips/python.snippets`这两个文件，此外，也可以在编辑时按`<F2>`键查看针对当前文件可用的代码片段。

* `<F2>`: 查看当前文件可用的代码片段
* `:UltiSnipsEdit`：编辑当前文件类型的代码片段文件
* `:UltiSnipsAddFiletypes`: 添加其它文件类型的代码段


