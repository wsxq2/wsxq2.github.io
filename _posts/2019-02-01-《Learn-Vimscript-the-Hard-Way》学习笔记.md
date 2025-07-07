---
tags: [vim]
---

# 《Learn Vimscript the Hard Way》学习笔记

本文是学习[《Learn Vimscript the Hard Way》](https://learnvimscriptthehardway.stevelosh.com/chapters/01.html)一文的笔记。 Vimscript 的大多数命令都可以在 VIM 的命令行模式（`:`）中运行（如`:echo "Hello the world!"`）

## 1 `echo`

* `echo`: 显示文本（在最下面）
* `echom`: 显示文本，并保存到`:messages`中
* `messages`: 显示保存的信息
* `"`: 注释

### Exercises
>
> Read :help echo.
>
> Read :help echom.
>
> Read :help :messages.
>
> Add a line to your ~/.vimrc file that displays a friendly ASCII-art cat (>^.^<) whenever you open Vim.

## 2 Options

### 2.1 Boolean Options

`set <name>`, `set no<name>`: 设置 Boolean 选项如`set number`和`set nonumber`
`set <name>!`: 开启/关闭（Toggle） Boolean 选项。如`set number!`
`set <name>?`: 检查选项值。如`set number?`

### 2.2 Options with Values

`set <name>=<value>`: 设置带值的选项。如`set numberwidth=10`

### 2.3 Setting Multiple Options at Once

```vim
:set number numberwidth=6
```

### Exercises

Read :help 'number' (notice the quotes).

Read :help relativenumber.

Read :help numberwidth.

Read :help wrap.

Read :help shiftround.

Read :help matchtime.

Add a few lines to your ~/.vimrc file to set these options however you like.

## 3 `map`

`map - dd`: 将`-`映射为`dd`（即按下`-`会删除当前行）
`map <keyname> <keys>`: 使用特殊键。如`map <space> viw`，`map <c-d> dd`
`map <space> viw " Select word`: 这里的注释无效

### Exercises

Map the - key to "delete the current line, then paste it below the one we're on now". This will let you move lines downward in your file with one keystroke.

Add that mapping command to your ~/.vimrc file so you can use it any time you start Vim.

Figure out how to map the _ key to move the line up instead of down.

Add that mapping to your ~/.vimrc file too.

Try to guess how you might remove a mapping and reset a key to its normal function.

## 4 Modal Mapping

`nmap`(Normal MAP): 正常模式下的按键映射
`vmap`(Visual MAP): Visual模式下的按键映射。如`vmap \ U`
`imap`(Insert MAP): 插入模式下的按键映射。如`imap <c-d> <esc>ddi`

### Exercises

Set up a mapping so that you can press <c-u> to convert the current word to uppercase when you're in insert mode. Remember that U in visual mode will uppercase the selection. I find this mapping extremely useful when I'm writing out the name of a long constant like MAX_CONNECTIONS_ALLOWED. I type out the constant in lower case and then uppercase it with the mapping instead of holding shift the entire time.

Add that mapping to your ~/.vimrc file.

Set up a mapping so that you can uppercase the current word with <c-u> when in normal mode. This will be slightly different than the previous mapping because you don't need to enter normal mode. You should end up back in normal mode at the end instead of in insert mode as well.

Add that mapping to your ~/.vimrc file.

## 5 Strict Mapping

### 5.1 Side Effects

`*map`的副作用：

* 存在递归风险
* 安装插件时插件按键映射时存在引用的风险。如：

  ```vim
  :nmap - dd
  :nmap \ -
  ```

### 5.2 Nonrecursive Mapping

每个`*map`命令都对应一个`*noremap`(NOt REMAP)命令：`noremap`, `nnoremap`, `vnoremap`, `inoremap`。**建议总是使用`*noremap`命令**

### Exercises

Convert all the mappings you added to your ~/.vimrc file in the previous chapters to their nonrecursive counterparts.

Read :help unmap.

## 6 Leaders

### 6.1 `<leader>`

```vim
let mapleader = "-"
nnoremap <leader>d dd
```

### 6.2 `<localleader>`

```vim
let maplocalleader = "\\"
nnoremap <leader>d dd
```

### Exercises

Read :help mapleader.

Read :help maplocalleader.

Set mapleader and maplocalleader in your ~/.vimrc file.

Convert all the mappings you added to your ~/.vimrc file in the previous chapters to be prefixed with <leader> so they don't shadow existing commands.

## 7 Editing Your Vimrc

```vim
" Edit my Vimrc file
nnoremap <leader>ev :vsplit $MYVIMRC<cr>
" Source my Vimrc file
nnoremap <leader>sv :source $MYVIMRC<cr>
```

### Exercises

Add mappings to "edit my ~/.vimrc" and "source my ~/.vimrc" to your ~/.vimrc file.

Try them out a few times, adding dummy mappings each time.

Read :help myvimrc.

## 8 Abbreviations

```vim
iabbrev adn and
iabbrev waht what
iabbrev tehn then
```

### 8.1 Keyword Characters

```vim
set iskeyword?
```

### 8.2 More Abbreviations

```vim
iabbrev @@    wsxq2@qq.com
iabbrev ccopy Copyright 2019 wsxq2, all rights reserved.
```

### Exercises

Add abbreviations for some common typos you know you personally make to your ~/.vimrc file. Be sure to use the mappings you created in the last chapter to open and source the file!

Add abbreviations for your own email address, website, and signature as well.

Think of some pieces of text you type very often and add abbreviations for them too.
