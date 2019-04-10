---
tags: [Vim, vim-table-mode]
---

<!-- vim-markdown-toc GFM -->

* [安装](#安装)
* [使用](#使用)
* [链接](#链接)

<!-- vim-markdown-toc -->

## 安装
使用Vim-Plug 安装：
1. 在Vim配置文件（`~/.vimrc`）中的相应位置（`call plug#begin('~/.vim/bundle')`后）添加如下内容：
   ```
   Plug 'dhruvasagar/vim-table-mode', { 'for': 'markdown'}
   ```
   
1. 打开 Vim，输入`:PlugInstall`完成安装即可

关于Vim-Plug 的使用可以参考 [Vim管理插件的插件Vim-Plug](https://wsxq2.55555.io/blog/2018/11/25/Vim管理插件的插件Vim-Plug)

## 使用

| 按键   | 助记单词                         | 功能                               |
|--------+----------------------------------+------------------------------------|
| `\t`   | table                            | 该插件前缀                         |
| `\T`   | tableize                         | 将内容转换为表格                   |
| `\tm`  | table mode                       | 开启或关闭table mode               |
| `\tr`  | table realign                    | 重新对齐表的每一列                 |
| `\t?`  |                                  | 显示用于定义公式的当前单元格的表示 |
| `\tdd` | table dd                         | 删除某一行                         |
| `\tdc` | table delete column              | 删除当前列                         |
| `\tfa` | table formula add                | 添加公式                           |
| `\tfe` | table formula evaluate           | 计算公式                           |
| `\ts`  | table sort                       | 对某一列排序                       |
| `|`    |                                  | 输入表的单元格                     |
| `||`   |                                  | 输入表头（表的第一行）             |
| `[|`   |                                  | 移动到左边的单元格                 |
| `]|`   |                                  | 移动到右边的单元格                 |
| `{|`   |                                  | 移动到上面的单元格                 |
| `}|`   |                                  | 移动到下面的单元格                 |


## 链接
<!-- link start -->

<!-- link end -->

<!-- abbreviations start -->

<!-- abbreviations end -->
