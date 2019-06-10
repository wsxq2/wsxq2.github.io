---
tags: [Vim, vim-autoformat, Vim插件]
last_modified_time: 2019-06-10 13:20:23 +0800
---

<p id="markdown-toc"></p>
<!-- vim-markdown-toc GFM -->

* [vim-autoformat 是什么？](#vim-autoformat-是什么)
* [安装 vim-autoformat](#安装-vim-autoformat)
* [使用 vim-autoformat](#使用-vim-autoformat)
  * [通用配置](#通用配置)
  * [`clang-format`](#clang-format)
  * [`autopep8`](#autopep8)
  * [`sqlformat`](#sqlformat)
    * [安装](#安装)
    * [配置](#配置)
    * [遇到的问题](#遇到的问题)
  * [总的配置文件](#总的配置文件)

<!-- vim-markdown-toc -->

## vim-autoformat 是什么？
GitHub: <https://github.com/Chiel92/vim-autoformat>

[vim-autoformat]: https://github.com/Chiel92/vim-autoformat

来自官方的说明：

> &emsp;&emsp;按一个快捷键格式化代码（或保存时自动格式化）。
> 
> &emsp;&emsp;这个插件利用外部格式化程序来格式化代码。检查[ formatprogram 列表](https://github.com/Chiel92/vim-autoformat#default-formatprograms)，查看默认支持哪些语言。大多数`formatprograms`都会遵循 Vim 设置，例如`textwidth`和`shiftwidth()`。您可以轻松自定义现有的`formatprogram`定义或添加自己的`formatprogram`。当某个文件类型不存在`formatprogram`（或者没有安装`formatprogram`）时，`vim-autoformat`默认会退化为缩进（使用 Vim 的自动缩进功能），retabbing 并删除尾随空格。
>
> &emsp;&emsp;——翻译自 [GitHub——Chiel92/vim-autoformat](https://github.com/Chiel92/vim-autoformat#vim-autoformat)

这个插件利用外部格式化程序来格式化代码（虽然`Vim`自带的格式化功能`gg=G`已经很好用了，但是有时依然感觉不够强大）。

这些外部格式化程序包括但不限于[clang-format](http://clang.llvm.org/docs/ClangFormat.html)、[autopep8](https://github.com/hhatto/autopep8)、[sqlformat](https://github.com/andialbrecht/sqlparse)。其中，`clang-format`支持`C/C++/Java/JavaScript/Objective-C/Protobuf`语言（支持格式化范围），`autopep8`只支持`Python`语言（也支持格式化范围），`sqlformat`是`sqlparse`的一部分，只支持 SQL 语句。

## 安装 vim-autoformat
使用 [vim-plug][vim-plug]安装，整个过程灰常简单：
1. 先在`~/.vimrc`中的相应位置添加如下内容:
   ```
   Plug 'Chiel92/vim-autoformat'
   ```
   
2. 然后在`Vim`中输入以下命令即可安装：
   ```
   :PlugInstall
   ```

至于如何安装`vim-plug`，可以参考我的另一篇博客[Vim管理插件的插件Vim-Plug](https://wsxq2.55555.io/blog/2018/11/25/Vim管理插件的插件Vim-Plug)

## 使用 vim-autoformat
### 通用配置
编辑`~/.vimrc`如下（仅供参考）：

<pre>
let g:autoformat_verbosemode=1 "开启详细模式便于查错
autocmd BufWrite *.sql,*.c,*.py,*.java,*.js :Autoformat "设置发生保存事件时执行格式化

"let g:autoformat_autoindent = 0
"let g:autoformat_retab = 0
"let g:autoformat_remove_trailing_spaces = 0
"autocmd FileType vim,tex let b:autoformat_autoindent=0
"gg=G :retab :RemoveTrailingSpaces
</pre>

详情参见 [Chiel92/vim-autoformat#how-to-use](https://github.com/Chiel92/vim-autoformat#how-to-use)

### `clang-format`
官网：<http://clang.llvm.org/docs/ClangFormat.html>

因为`clang-format`是`clang`的一部分，所以直接安装`clang`是最简单的方法

```
yum install clang
```

在`~/.vimrc`中做如下配置即可：
```
let g:formatdef_clangformat_google = '"clang-format -style google -"' # 我比较喜欢 google 风格的代码
let g:formatters_c = ['clangformat_google']
```

此后使用 Vim 编辑 C 源文件时，使用`:Autoformat`即可格式化代码。

关于`clang-format`的高级使用（如自定义风格等）可参考 [Clang-Format格式化选项介绍][csdn-clang-format]

[csdn-clang-format]:https://blog.csdn.net/softimite_zifeng/article/details/78357898

      
[vim-plug]:https://github.com/junegunn/vim-plug

### `autopep8`
GitHub 项目地址：<https://github.com/hhatto/autopep8>

`autopep8`是使用 Python 语言写的，可以直接使用`pip`安装：

```
pip install autopep8
```

它似乎不需要配置，可能是因为`vim-autoformat`能自动识别`Python`语言的特点

      
### `sqlformat`
GitHub 项目地址：<https://github.com/andialbrecht/sqlparse>。注意`sqlformat`是`sqlparse`的一部分

#### 安装
如前所述，`sqlformat`是`sqlparse`（一个 Python 模块）的一部分，所以只需安装`sqlparse`即可：
```
pip install sqlparse
```

#### 配置
在`~/.vimrc`中进行如下配置（和`clang-format`类似）：
<pre>
let g:formatdef_sqlformat = '"sqlformat --keywords upper -"'
let g:formatters_sql = ['sqlformat']
</pre>

此后使用 Vim 编辑 SQL 文件，每当执行`:Autoformat`命令都会使用`sqlformat`这个外部程序格式化代码

#### 遇到的问题
虽然这个插件（`sqlparse`）官方说既支持 Python2 ，也支持 Python3 ，但是当我使用 Python2 安装后格式化代码（即在 Vim 中运行`:Autoformat`命令，另外代码中有中文）时出现了如下错误：

<pre>
Trying definition from g:formatdef_mysql
Evaluated formatprg: sqlformat --keywords upper -
Using python 2 code...
Formatter mysql has errors: Traceback (most recent call last):
File "/root/.pyenv/versions/2.7.15/bin/sqlformat", line 11, in &lt;module&gt;
sys.exit(main())
File "/root/.pyenv/versions/2.7.15/lib/python2.7/site-packages/sqlparse/cli.py", line 180, in main
stream.write(s)
UnicodeEncodeError: 'ascii' codec can't encode characters in position 100-101: ordinal not in range(128)
</pre>

Python3 默认使用 UTF-8，应该不会出现此错误，所以这可能是个 BUG (2018-11-25)。我的解决方法如下：

**根据错误提示将`/root/.pyenv/versions/2.7.15/lib/python2.7/site-packages/sqlparse/cli.py`文件中的第 180 行`stream.write(s)`改为`stream.write(s.encode('utf8'))`**

### 总的配置文件
综上，可以格式化 C 语言、Python 语言、SQL 语言的配置文件如下（仅供参考）：
<pre>
"for vim-autoformat
"let g:autoformat_verbosemode=1
"autocmd BufWrite *.sql,*.c,*.py,*.java,*.js :Autoformat
noremap &lt;F3&gt; :Autoformat&lt;CR&gt;

"let g:autoformat_autoindent = 0
"let g:autoformat_retab = 0
"let g:autoformat_remove_trailing_spaces = 0
"autocmd FileType vim,tex let b:autoformat_autoindent=0
"gg=G :retab :RemoveTrailingSpaces

let g:formatdef_sqlformat = '"sqlformat --keywords upper -"'
let g:formatters_sql = ['sqlformat']
let g:formatdef_clangformat_google = '"clang-format -style google -"'
let g:formatters_c = ['clangformat_google']
</pre>

其中，由于发现保存文件时自动格式化是个危险的操作，所以改为了绑定快捷键`<F3>`。
