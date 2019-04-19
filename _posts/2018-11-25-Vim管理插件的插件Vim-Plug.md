---
tags: [Vim, Vim-lug, Vim插件]
---

**GitHub**: <https://github.com/junegunn/vim-plug>

<p id="markdown-toc"></p>
<!-- vim-markdown-toc GFM -->

* [简介](#简介)
* [安装](#安装)
* [使用](#使用)
  * [基本使用——安装插件](#基本使用安装插件)
  * [其它用法](#其它用法)
    * [命令行模式可用的命令](#命令行模式可用的命令)
    * [在 Plug 后使用的`Plug`选项](#在-plug-后使用的plug选项)
    * [可在 .vimrc 文件中使用的全局选项](#可在-vimrc-文件中使用的全局选项)
    * [在`:PlugDiff/PlugStatus`窗口中的键绑定](#在plugdiffplugstatus窗口中的键绑定)
  * [官方 Tips](#官方-tips)

<!-- vim-markdown-toc -->

## 简介
> 一个简约的Vim插件管理器。

只有一个文件`plug.vim`（不过有 2500+ 行）

## 安装
在 bash 中使用如下命令即可：

```
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

## 使用
### 基本使用——安装插件
在你的`~/.vimrc`中添加一个`vim-plug`部分：

1. 使用`call plug#begin()`开始该部分
2. 使用`Plug`命令列出插件
3. 使用`call plug#end()`结束该部分。使用`call plug#end()`后会更新`&runtimepath`并初始化插件系统，且会：
   * 自动执行`filetype plugin indent on`和`syntax enable`。您可以在`call`后恢复设置。即`filetype indent off`, `syntax off`等

如：

<pre>
" Specify a directory for plugins
" - For Neovim: ~/.local/share/nvim/plugged
" - Avoid using standard Vim directory names like 'plugin'
call plug#begin('~/.vim/plugged')

" Make sure you use single quotes

" Shorthand notation; fetches https://github.com/junegunn/vim-easy-align
Plug 'junegunn/vim-easy-align'

" Any valid git URL is allowed
Plug 'https://github.com/junegunn/vim-github-dashboard.git'

" Multiple Plug commands can be written in a single line using | separators
Plug 'SirVer/ultisnips' | Plug 'honza/vim-snippets'

" On-demand loading
Plug 'scrooloose/nerdtree', { 'on':  'NERDTreeToggle' }
Plug 'tpope/vim-fireplace', { 'for': 'clojure' }

" Using a non-master branch
Plug 'rdnetto/YCM-Generator', { 'branch': 'stable' }

" Using a tagged release; wildcard allowed (requires git 1.9.2 or above)
Plug 'fatih/vim-go', { 'tag': '*' }

" Plugin options
Plug 'nsf/gocode', { 'tag': 'v.20150303', 'rtp': 'vim' }

" Plugin outside ~/.vim/plugged with post-update hook
Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' }

" Unmanaged plugin (manually installed and updated)
Plug '~/my-prototype-plugin'

" Initialize plugin system
call plug#end()
</pre>

重新加载`~/.vimrc`文件（可以使用`:source ~/.vimrc`命令）并使用`:PlugInstall`命令来安装插件

### 其它用法
#### 命令行模式可用的命令

| 命令                                | 描述                                     |
|-------------------------------------+------------------------------------------|
| `PlugInstall [name ...] [#threads]` | 安装插件                                 |
| `PlugUpdate [name ...] [#threads]`  | 安装或更新插件                           |
| `PlugClean[!]`                      | 删除未使用的目录（爆炸版将清除而不提示） |
| `PlugUpgrade`                       | 更新`vim-plug`它自己                     |
| `PlugStatus`                        | 检查插件的状态                           |
| `PlugDiff`                          | 检查当前插件和最新插件的区别             |
| `PlugSnapshot[!] [output path]`     | 生成用于还原插件的当前快照的脚本         |

#### 在 Plug 后使用的`Plug`选项

| 选项                | 描述                                           |
|---------------------+------------------------------------------------|
| `branch/tag/commit` | Branch/tag/commit of the repository to use     |
| `rtp`               | Subdirectory that contains Vim plugin          |
| `dir`               | Custom directory for the plugin                |
| `as`                | Use different name for the plugin              |
| `do`                | Post-update hook (string or funcref)           |
| `on`                | On-demand loading: Commands or <Plug>-mappings |
| `for`               | On-demand loading: File types                  |
| `frozen`            | Do not update unless explicitly specified      |

#### 可在 .vimrc 文件中使用的全局选项

| 选项                | 默认值                            | 描述                                                                           |
|---------------------+-----------------------------------+--------------------------------------------------------------------------------|
| `g:plug_threads`    | `16`                              | Default number of threads to use                                               |
| `g:plug_timeout`    | `60`                              | Time limit of each task in seconds (Ruby & Python)                             |
| `g:plug_retries`    | `2`                               | Number of retries in case of timeout (Ruby & Python)                           |
| `g:plug_shallow`    | `1`                               | Use shallow clone                                                              |
| `g:plug_window`     | `vertical topleft new`            | Command to open plug window                                                    |
| `g:plug_pwindow`    | `above 12new`                     | Command to open preview window in PlugDiff                                     |
| `g:plug_url_format` | `https://git::@github.com/%s.git` | printf format to build repo URL (Only applies to the subsequent Plug commands) |

#### 在`:PlugDiff/PlugStatus`窗口中的键绑定

* `D` - PlugDiff
* `S` - PlugStatus
* `R` - Retry failed update or installation tasks
* `U` - Update plugins in the selected range
* `q` - Close the window
* `:PlugStatus`
  * `L` - Load plugin
* `:PlugDiff`
  * `X` - Revert the update

### 官方 Tips
<https://github.com/junegunn/vim-plug/wiki/tips>
