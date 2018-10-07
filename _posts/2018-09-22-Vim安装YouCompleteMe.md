---
layout: post
tags: [CentOS7, YouCompleteMe,Vim,TODO]
categories: blog
---

目标：使`YouCompleteMe`能作用于`C`、`Java`、`JavaScript`。

根据`YouCompleteMe`插件的要求，我们需要**Vim 7.4.1578 with Python 2 or Python 3 support**。你可以通过`vim --version`命令来查看你的`Vim`是否符合上述要求。如果不符合，则可以通过第1、2步源码编译重装Vim；如果符合，则可跳至第3步

<!-- vim-markdown-toc GFM -->

* [1 安装 Python](#1-安装-python)
* [2 安装 Vim](#2-安装-vim)
* [3 通过安装 vim-plug 安装 YouCompleteMe](#3-通过安装-vim-plug-安装-youcompleteme)
* [4 安装 YouCompleteMe 并配置 JavaScript 支持](#4-安装-youcompleteme-并配置-javascript-支持)
* [5 参考链接](#5-参考链接)

<!-- vim-markdown-toc -->

### 1 安装 Python
使用 [`pyenv`](https://github.com/pyenv/pyenv#basic-github-checkout)(Simple Python version management)进行安装
1. 安装`pyenv`
   ```
   git clone https://github.com/pyenv/pyenv.git ~/.pyenv
   echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
   echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
   echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.bashrc
   . ~/.bashrc
   ```

2. 安装编译`CPython`（即最流行的`Python`）需要使用的依赖，因为`pyenv`要用:
   ```
   yum install gcc zlib-devel bzip2 bzip2-devel readline-devel sqlite sqlite-devel openssl-devel tk-devel libffi-devel
   ```

3. 使之后`Python`的编译拥有动态库（dynamic library），因为后面需要:
   ```
   echo 'export PYTHON_CONFIGURE_OPTS="--enable-shared"' >> ~/.bashrc
   ```

4. 安装一个`Python`版本（如`2.7.15`）：
   ```
   pyenv install 2.7.15
   ```

### 2 安装 Vim 
1. 安装编译`Vim`需要的依赖：
   ```
   sudo yum install -y ruby ruby-devel lua lua-devel luajit \
   luajit-devel ctags git \
   tcl-devel perl perl-devel perl-ExtUtils-ParseXS \
   perl-ExtUtils-XSpp perl-ExtUtils-CBuilder \
   perl-ExtUtils-Embed
   ```

2. 移除已经安装的`Vim`：
   ```
   apt remove vim vim-runtime gvim
   ```
   
3. 安装`Vim`：
   ```
   cd ~
   git clone https://github.com/vim/vim.git
   cd vim/src
   ./configure --with-features=huge \
               --enable-multibyte \
   	    --enable-pythoninterp=yes \
   	    --with-python-config-dir=/root/.pyenv/versions/2.7.15/lib/python2.7/config/ \ #通过 `find ~/.pyenv -name "config"` 获取该目录
   	    --enable-luainterp=yes \
               --enable-cscope \
   	   --prefix=/usr/local
   
   make VIMRUNTIMEDIR=/usr/local/share/vim/vim81
   make install
   ```

4. 验证安装，确认Vim已带有python支持：
   ```
   vim --version
   ```

注：如果失败了可以使用`make uninstall`卸载找到原因后重来（我重来了好几次，因为系统自带的`Python2.7.5`好像不行，所以我才使用`Python`的版本管理工具`pyenv`安装了`Python2.7.15`，之所以没直接卸载系统自带的`Python2.7.5`是因为我卸载不掉，它说它被很多其他软件依赖）
   

### 3 通过安装 vim-plug 安装 YouCompleteMe
1. 往`~/.vimrc`中添加如下配置：
   ```
   if empty(glob('~/.vim/autoload/plug.vim'))
     silent !curl -fLo ~/.vim/autoload/plug.vim --create-dirs
       \ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
     autocmd VimEnter * PlugInstall --sync | source $MYVIMRC
   endif
   
   call plug#begin('~/.vim/bundle')
   Plug 'junegunn/vim-plug'
   Plug 'Raimondi/delimitMate'
   " Plug 'yianwillis/vimcdoc'
   " Plug 'vim-scripts/VimIM'
   Plug 'mzlogin/vim-markdown-toc'
   Plug 'dhruvasagar/vim-table-mode'
   Plug 'ervandew/supertab'
   Plug 'mattn/emmet-vim'
   Plug 'Valloric/YouCompleteMe' # { 'do': './install.py --clang-completer --java-completer' }
   call plug#end()
   ```

2. 进入Vim后输入`:PlugInstall`安装各种插件（包括`YouCompleteMe`）。其实这个时候并没有成功安装`YouCompleteMe`，只是把`YouCompleteMe`的`git`源克隆到了`~/.vim/bundle`目录

### 4 安装 YouCompleteMe 并配置 JavaScript 支持
编译并安装YouCompleteMe:
```
cd ~/.vim/bundle/YouCompleteMe/
python install.py --clang-completer --java-completer
```

1. 如果错误如下：
   ```
   CMake Error at ycm/CMakeLists.txt:103 (file):
   file DOWNLOAD HASH mismatch
   for file: [/home/up_ding/.vim/bundle/YouCompleteMe/third_party/ycmd/cpp/../clang_archives/clang+llvm-3.7.0-x86_64-linux-gnu-ubuntu-14.04.tar.xz]
     expected hash: [093a94ff8982ae78461f0d2604c98f6b454c15e2ef768d34c235c6676c336460]
       actual hash: [a12a54f4e937e521a5e9ff790db0bf7a358f6dbc6febebcddab62c798ffc4d51]
   ```

   则可以手动下载 [Clang archive](https://dl.bintray.com/micbou/libclang/libclang-6.0.0-x86_64-linux-gnu-ubuntu-14.04.tar.bz2), 然后将它移动至`~/.vim/bundle/YouCompleteMe/third_party/ycmd/clang_archives`目录下，然后重新安装YouCompleteMe，具体可参考<https://github.com/Valloric/YouCompleteMe/issues/1711>

2. 如果安装成功，启动Vim时却显示`undefined symbol: clang_parseTranslationUnit2`，则参考<https://github.com/Valloric/YouCompleteMe/issues/2055>。

   注：如果遇到上个错误时没有采纳解决方案参考链接中的`./install.py --clang-completer --system-libclang`方案，则应该不会出现这个问题

3. 安装 TSServer 引擎（通过安装TypeScript SDK）：
   1. 安装`nvm`（node version manager，安装它后再安装各种版本的node.js就非常简单了，因为后面要用到`npm`）：
      ```
      curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
      ```

      根据提示将如下内容添加至`~/.bashrc`：
      ```
      # node version manager
      export NVM_DIR="$HOME/.nvm"
      [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
      [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
      ```
 
      退出并重进终端（或者使用`source ~/.bashrc`命令），然后使用`nvm --help`以确认是否安装成功
   
   2. 安装最新稳定版的node.js（会自动安装npm）：
      ```
      nvm install stable
      ```

   3. 安装`TypeScript SDK`：
      ```
      npm install -g typescript
      ```

   4. 为了获得语法检查的功能，可以在工程目录中的`jsconfig.json`文件里设置`checkJs`选项：
      <pre>
      {
          "compilerOptions": {
              "checkJs": true
          }
      }
      </pre>

### 5 参考链接
* [Building-Vim-from-source](https://github.com/Valloric/YouCompleteMe/wiki/Building-Vim-from-source)
* [vim-plug](https://github.com/junegunn/vim-plug)
* [Why I choose vim-plug](https://ssarcandy.tw/2016/08/17/vim-plugin-manager/)
* [YouCompleteMe Install for linux-64-bit](https://github.com/Valloric/YouCompleteMe#linux-64-bit)

*[npm]: node package manager
*[nvm]: node version manager
*[pyenv]: python version manager
