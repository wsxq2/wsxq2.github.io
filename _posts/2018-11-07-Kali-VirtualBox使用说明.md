---
layout: post
tags: [Kali, VirtualBox,TODO]
categories: blog
---


<!-- vim-markdown-toc GFM -->

* [1 Vim](#1-vim)
  * [1.1 YouCompleteMe：补全代码的插件](#11-youcompleteme补全代码的插件)
  * [1.2 ultisnips 和 vim-snippets：实现编写代码片段的插件](#12-ultisnips-和-vim-snippets实现编写代码片段的插件)
  * [1.3 IndentLine: 显示对齐线](#13-indentline-显示对齐线)
  * [1.4 Autopep8: 格式化Python代码](#14-autopep8-格式化python代码)
* [2 Bash](#2-bash)
  * [2.1 vi模式使用技巧](#21-vi模式使用技巧)
    * [2.1.1 插入模式](#211-插入模式)
    * [2.1.2 普通模式](#212-普通模式)
* [3 关于科学上网](#3-关于科学上网)
* [4 关于拼音输入法](#4-关于拼音输入法)

<!-- vim-markdown-toc -->


我封装的`Kali-VirtualBox`虚拟机有如下特点：
* 英文系统，终端可以设置为中文（`export LANG=zh_CN.UTF-8`）
* 已安装拼音输入法（默认只有英文输入法），后面有简述
* 已实现科学上网，后面有简述
* 已按我的使用习惯配置了`Bash`和`Vim`，后面会详述
* 已将`apt`（`kali`中用于安装软件包的程序）源设置为西电开源镜像站
* 已禁用了`network-manager`（一个图形化的网络管理器，禁用它是怕冲突，以及为了更好地学习底层知识）
* 已更新至 2018-11-07 （即在2018-11-07这一天使用了`apt upgrade`命令）
* 只有root用户，密码为`346342`，开机自动登陆

下面将详细讲解各部分的用法：

## 1 Vim

主要配置文件为`~/.vimrc`（也就是每次启动`vim`都会执行的vim脚本，也是在命令行模式下输入的命令的集合）

我的Vim中主要安装了下列插件：

```
Plug 'junegunn/vim-plug'
Plug 'Raimondi/delimitMate'
Plug 'mzlogin/vim-markdown-toc', { 'for': 'markdown'}
Plug 'dhruvasagar/vim-table-mode', { 'for': 'markdown'}
Plug 'mattn/emmet-vim', {'for': ['html', 'css', 'xml']}
Plug 'Valloric/YouCompleteMe' ", { 'do': './install.py --clang-completer --java-completer' }
Plug 'SirVer/ultisnips'
Plug 'honza/vim-snippets'
Plug 'Yggdroot/indentLine', {'for': ['python']}
Plug 'tell-k/vim-autopep8'
```

且编译时加了`python2.7`的支持，可以和`python2.7`很好地合作。

先简要提一下在`Vim`本身中常用的技巧：

`Vim`五种常用模式：普通模式、插入模式、命令行模式、选择模式(Visual Mode)、搜索模式。在任意模式中按`Esc`或`Ctrl+[`进入（可能需要多次）普通模式；在普通模式中使用插入相关的命令（如`i`）进入插入模式；在普通模式中按`:`进入命令行模式；在普通模式中按`v`进入选择模式；在普通模式中按`/`或`?`进入搜索模式

在普通模式下：
* 参见[2.1.2 普通模式](#212-普通模式)
* `*` `#`: 搜索命令。`*`搜索当前单词并跳转到下一处；`#`搜索当前单词并跳转到上一处
* `K` `\K`: 查询帮助命令。`K`查询当前单词的`man`手册（也可以先选择后再查询，即`vWK`）；`\K`和`K`一样，因为我设置的缘故，详见vim内置帮助文档`:h :Man` 
* `gg` `G`: 跳转命令。`gg`跳至整个文件的第一行；`G`跳到整个文件的最后一行
* `50%` `%`: 跳转命令。`50%`跳到文件的50%处（即一半的地方，同理，`25%`则跳到 1/4 处）；`%`（即前面不加数字）则完全不同，它用于跳转到当前括号的匹配括号处（如当前是`(`，则跳到`)`）
* `<Space>`: 折叠命令。本来和`l`的作用相同（即向右移动一个字符），但我将其绑定到了`za`，即自动折叠或反折叠
* `gd` `gD` `gf`: 跳转命令。`gd`跳到当前光标所指局部变量的定义位置；`gD`跳到当前光标所指全局变量的定义位置；`gf`跳到当前光标所指路径的文件
* `qa<一堆操作>q` `@a`: 宏录制命令。宏是操作的集合，
* `@:`:
* `Ctrl+6`:
* `Ctrl+h` `Ctrl+j` `Ctrl+k` `Ctrl+l`:
* `ma` `'a`:
* `.`
* `u` `Ctrl+r`: 
* `=`:
* `&`:
* `!`:
* `>>` `<<`:
* `Ctrl+c`:
* `Ctrl+g` `1<C-g>` `2<C-g>`

在插入模式下：
* `Ctrl+P`: 
* `Ctrl+N`:
* `Ctrl+X Ctrl+L`:
* `Ctrl+X Ctrl+F`:
* `Ctrl+O u`:
* `<C-r>"`:
* ``

在命令行模式下：
* `Ctrl+D`: 显示所有可能的结果
* `Tab`: 按可能的结果依次补全
* `h<CR>`: 输入`h<CR>`（其中`<CR>`是回车）可查看帮助。如下述例子：
  * `h gd`: 输入`h gd`可查看普通模式下`gd`命令的帮助
  * `h :h`: 输入`h :h`可查看命令模式下`h`命令的帮助
  * `h i_CTRL_N`: 输入`h i_CTRL_N`可查看插入模式下`Ctrl+N`的帮助
  * `h 'nu`: 输入`h 'nu`可查看选项`nu`的帮助（选项通过命令模式下的`set`命令来设置，如`set nu`）

在选择模式下：
* `//`: 
* `K`:

在搜索模式下（使用正则表达式，注意和标准的有点不同）：
* `/abc`:
* `/\<abc\>`
* `/^abc`:


下面就针对Python语言详述各插件（Python用得上的插件）的常见用法：

### 1.1 YouCompleteMe：补全代码的插件
输入字符超过2个，即会出现补全菜单，主要支持本文档内的补全（注释中的不会用于补全，如想补全注释中的内容，可以使用Ctrl+N和Ctrl+P）、语义补全（根据编程语言自动解析补全，精准度很高）、代码片断补全（和 vim-snippets 配合使用）
* `Ctrl+N`和`Ctrl+P`：出现补全菜单后，使用`Ctrl+N`向下选择（也可以使用`Tab`），使用`Ctrl+P`向上选择
* `\gd`(GetDoc)：获取光标所在单词的帮助文档（主要是它的API）
* `\gr`(GoToReferences)：获取引用光标所在单词的所有位置
* `\gc`(GoToDeclaration)：跳转至光标所在变量的声明处，其实还可以使用Vim自带的命令`gd`跳转到声明处
* `\gg`(GoTo): 先尝试跳转至声明处，若失败，则跳转至定义处
* `Ctrl+L`: 强制补全
* `Ctrl+Y`：在补全菜单出现时可以使用该快捷键关闭补全菜单（有时很有用）

### 1.2 ultisnips 和 vim-snippets：实现编写代码片段的插件
`UltiSnips`为程序本身，`vim-snippets`为常用的代码片段

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

### 1.3 IndentLine: 显示对齐线
在多重循环中异常有用

* `\i`: 启用或关闭该插件（若原本的状态是关闭的，则启用，反之亦然）

### 1.4 Autopep8: 格式化Python代码
按照官方标准格式化`Python`代码，超级好用

* `:w`: 即每次保存时会自动格式化代码

## 2 Bash
我采用的是vi模式（在Python解释器中亦是如此，默认的是Emacs模式），若不习惯，可修改`~/.inputrc`文件，将相应的行删掉即可（其实里面只有一行 /笑哭）

主要配置文件是`~/.bashrc`

### 2.1 vi模式使用技巧
vi模式其实挺方便的（对于用过vim的人而言），下面简述某些技巧：
#### 2.1.1 插入模式
* `Ctrl+W`: 向前清除一个单词
* `Ctrl+U`: 向前清除到行首
* `Ctrl+P`: 向上查找命令，**注意，因为我在bash默认的启动文件`~/.bashrc`（MacOS是`~/.bash_profile`)进行了如下设置**：
  ```
  bind '\C-p: history-search-backward'
  bind '\C-n: history-search-forward'
  bind '"\e[A":history-search-backward'
  bind '"\e[B":history-search-backward'
  ```
  **所以`Ctrl+P`将会向上查找与当前行带有相同前缀的命令**，如：
  ```
  vim ~/.vimrc
  vim<Ctrl+P> #将会得到：
  vim ~/.vimrc
  ```
  这个功能使得输入曾经输入过的命令变得异常方便，再也不需要傻乎乎地先用`history`查看一下命令历史，再傻乎乎地用`!<history结果前的数字>`来执行输入过的命令了
* `Ctrl+N`: 和`Ctrl+P`类似，只是向下查找

#### 2.1.2 普通模式
默认情况下处于插入模式，按`Esc`或`Ctrl+[`进入普通模式，普通模式下的常用命令如下：
* `i` `a` `I` `A`: 均用于进入插入模式。`i`(insert)在当前字符前插入，`a`(append)在当前字符后插入，`I`在当前行的第一个字符前插入，`A`在当前行的最后一个字符后插入
 
* `j` `k`: 回溯历史的命令。如同方向键向上键和向下键。**注意，这和VIM中的行为不同，VIM中`j`用于移动到下一行，`k`用于移动到上一行**
 
* `h` `l`：移动命令。`h`向左移动一个字符；`l`向右移动一个字符
* `0` `^` `$`: 移动命令。`0`移动到行首；`^`和`0`类似，只是移动到行首的第一个非空白字符（如空格）；`$`移动到行尾
* `w` `e` `b` `W` `E` `B`: 移动命令。`w`右移一个单词；`e`和`w`类似，只是停在末尾处；`b`左移一个单词；`W`移动到下一个空格后的第一个字符；`E`和`W`类似，只是停在末尾处；`B`移动到上一个空格后的第一个字符
* `f` `F` `t` `T` `,` `;`: 移动命令。`f`向后移动至某个字符，如`fa`向后移动至`a`字符；`F`向前移动至某个字符；`t`向后移动至某个字符的前一个字符；`T`向前移动至某个字符的后一个字符；`,`重复上一个和前述命令相同的移动命令；`;`和`,`类似，不过方向相反
* `,` `;`:
 
* `c`(change): 改变文本并进入插入模式。该命令就配合移动命令使用，如`cw`改变一个单词，`cb`反向改变一个单词，`cl`改变一个字符等等 
* `cc`: 改变当前行的所有内容，相当于`0c$`
* `C`: 改变当前光标所在位置至行尾的内容，相当于`c$`
* `s`(substitute): `cl`的简写，用于修改一个字符
* `r`(replace): 和`s`类似，只是不会进入插入模式
 
* `d`(delete): 删除文本。该命令同样配合移动命令使用
* `dd`: 删除当前行的所有内容，相当于`0d$`
* `D`: 删除当前光标所在位置至行尾的内容，相当于`d$`
* `x`: `dl`的简写，用于删除一个字符
 
* `p` `P`: 粘贴命令。`p`(paste)在当前字符后粘贴，`P`在当前字符前粘贴。**注意，该命令亦可粘贴已经删除的内容**
 
* `y`(yank): 复制命令。和移动命令配合使用，如`yl`复制一个字符，`yw`复制一个单词
* `yy`: 复制整行内容。相当于`0y$`
 
* `v`: 进入vim中编辑（编辑多行命令或长命令时非常有用）。**注意，这和VIM中的行为不同，VIM中`v`用于选择，以进入Visual模式**


## 3 关于科学上网
配置文件：`~/shadowsocksr/config.json`

账号找我要，仅给熟人。如果不是熟人，我们或许可以成为熟人:)。

对于浏览器`FireFox`是全局的，终端下默认没有科学上网，如果需要，也可以使用`sp`(Set Proxy)命令设置，这是我在`~/.bashrc`中写的一个函数，灰常简单，设置了几个环境变量。取消代理使用`up`(Unset Proxy)命令。

## 4 关于拼音输入法
使用的`fcitx-pinyin`（即小企鹅输入法，这个比较强大）。可以先按`Win`，再按`fctix`搜索`fcitx configuration`以查看更详细的信息

相关快捷键如下：
* `Ctrl+Space`: 启用或关闭`fcitx`输入法
* `Ctrl+.`: 切换中英文标点
* `Ctrl+;`: 显示粘贴板当前的内容，按相应的数字可直接粘贴相应的内容。**非常好用**
