---
tags: [Vim, IndentLine]
last_modified_time: 2021-08-22 22:41:44 +0800
---

<p id="markdown-toc"></p>
<!-- vim-markdown-toc GFM -->

* [遇到过的问题](#遇到过的问题)
* [使用](#使用)

<!-- vim-markdown-toc -->

显示对齐线，在多重循环中异常有用

## 遇到过的问题
* 过少且完全不整齐？过少是因为本身没有对齐（先使用 gg=G 对齐后再使用）；完全不整齐可能是因为 Tab 键，IndentLine 默认不显示 Tab 字符导致的缩进（得替换为空格才行，开启 expandtab 选项即可）

## 使用

* `\i`: 启用或关闭该插件（若原本的状态是关闭的，则启用，反之亦然）


