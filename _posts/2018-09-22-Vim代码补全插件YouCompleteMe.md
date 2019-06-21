---
tags: [CentOS7, YouCompleteMe,Vim,TODO]
last_modified_time: 2019-06-12 16:18:28 +0800
---

目标：使`YouCompleteMe`能作用于`C`、`Java`、`JavaScript`。

根据`YouCompleteMe`插件的要求，我们需要**Vim 7.4.1578 with Python 2 or Python 3 support**。你可以通过`vim --version`命令来查看你的`Vim`是否符合上述要求。如果不符合，则可以通过第1、2步源码编译重装Vim；如果符合，则可跳至第3步

<p id="markdown-toc"></p>
<!-- vim-markdown-toc GFM -->

* [0 简介](#0-简介)
* [1 安装 Python](#1-安装-python)
* [2 安装 Vim](#2-安装-vim)
* [3 通过安装 vim-plug 安装 YouCompleteMe](#3-通过安装-vim-plug-安装-youcompleteme)
* [4 安装并配置 YouCompleteMe](#4-安装并配置-youcompleteme)
  * [4.1 安装 YouCompleteMe](#41-安装-youcompleteme)
  * [4.2 配置 C 支持](#42-配置-c-支持)
  * [4.3 配置 JavaScript 支持](#43-配置-javascript-支持)
* [5 使用](#5-使用)
  * [5.1 通用](#51-通用)
  * [5.2 C语言](#52-c语言)
* [6 参考链接](#6-参考链接)

<!-- vim-markdown-toc -->

### 0 简介
> YouCompleteMe is a fast, as-you-type, fuzzy-search code completion engine for Vim. It has several completion engines:
> 
> * an identifier-based engine that works with every programming language,
> * a Clang-based engine that provides native semantic code completion for C/C++/Objective-C/Objective-C++/CUDA (from now on referred to as "the C-family languages"),
> * a Jedi-based completion engine for Python 2 and 3,
> * an OmniSharp-based completion engine for C#,
> * a combination of Gocode and Godef semantic engines for Go,
> * a TSServer-based completion engine for JavaScript and TypeScript,
> * a racer-based completion engine for Rust,
> * a jdt.ls-based experimental completion engine for Java.
> * and an omnifunc-based completer that uses data from Vim's omnicomplete system to provide semantic completions for many other languages (Ruby, PHP etc.).

总之，YouCompleteMe 是目前（2018-11-26）最强大的代码补全插件（但同时也是最难安装的插件）

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

### 4 安装并配置 YouCompleteMe
#### 4.1 安装 YouCompleteMe
1. 编译并安装YouCompleteMe（建议先让终端科学上网后再编译安装，否则极有可能会出现下述问题中的第二个问题，且其解决方案似乎已经失效，2018-11-28）:
   ```
   cd ~/.vim/bundle/YouCompleteMe/
   python install.py --clang-completer --java-completer 
   #可在此添加加的语言支持有C(--clang-completer), C#(--cs-completer), Go(--go-completer), Rust(--rust-completer), Java(--java-completer)
   ```
   
   以上步骤的可能遇到的问题
   1. 如果在`git submodule update --init --recursive`这一步（隐含在`python install.py --clang-completer --java-completer`中）中发现下载很慢，则可以参考我的另一篇博客[Kali Linux科学上网](https://wsxq2.55555.io/blog/2018/10/20/Kali-Linux%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/#232-%E4%BD%BF%E7%94%A8%E7%A8%8B%E5%BA%8F%E7%9A%84%E4%BB%A3%E7%90%86%E7%9B%B8%E5%85%B3%E5%8F%82%E6%95%B0)配置好git部分后再下载。
   
   
   2. 如果在：
      ```
      -- Downloading libclang 7.0.0 from https://dl.bintray.com/micbou/libclang/libclang-7.0.0-x86_64-unknown-linux-gnu.tar.bz2
      ```
      这一步中卡住了

      或者等待很长时间后错误如下（`--clang-completer`参数导致的问题）：
      ```
      CMake Error at ycm/CMakeLists.txt:103 (file):
      file DOWNLOAD HASH mismatch
      for file: [/home/up_ding/.vim/bundle/YouCompleteMe/third_party/ycmd/cpp/../clang_archives/clang+llvm-3.7.0-x86_64-linux-gnu-ubuntu-14.04.tar.xz]
        expected hash: [093a94ff8982ae78461f0d2604c98f6b454c15e2ef768d34c235c6676c336460]
          actual hash: [a12a54f4e937e521a5e9ff790db0bf7a358f6dbc6febebcddab62c798ffc4d51]
      ```
      则可以手动下载 Clang archive(复制那个下载链接即可，记得要科学上网后再下载), 然后将它移动至`~/.vim/bundle/YouCompleteMe/third_party/ycmd/clang_archives`目录下，然后重新安装YouCompleteMe（即运行上面那个`python intall.py……`命令），具体可参考<https://github.com/Valloric/YouCompleteMe/issues/1711>
   
2. 编译YCM需要的`ycm_core`库:
   ```
   mkdir ~/.ycm_build
   cd ~/.ycm_build
   cmake -G "Unix Makefiles" -DEXTERNAL_LIBCLANG_PATH=/root/.vim/bundle/YouCompleteMe/third_party/ycmd/libclang.so.6.0 . ~/.vim/bundle/YouCompleteMe/third_party/ycmd/cpp
   cmake --build . --target ycm_core
   ```
   详情见[YouCompleteMe#full-installation-guide](https://github.com/Valloric/YouCompleteMe#full-installation-guide)

3. （可选）为改善Unicode支持和更好的正则表达式性能构建正则表达式模块:
   ```
   cd ~
   mkdir .regex_build
   cd .regex_build
   cmake -G "Unix Makefiles" . ~/.vim/bundle/YouCompleteMe/third_party/ycmd/third_party/cregex
   cmake --build . --target _regex --config Release
   ```

4. `Vim`配置（仅供参考）：

   ```vim
   " for ycm"
   let g:ycm_min_num_identifier_candidate_chars = 4
   let g:ycm_min_num_of_chars_for_completion = 2 "set 99 to turn off identifiers completer"
   let g:ycm_max_num_identifier_candidates = 10 "identifier completion"
   let g:ycm_max_num_candidates = 30 "semantic completion"
   let g:ycm_auto_trigger = 1
   let g:ycm_key_list_stop_completion = ['<C-y>']
   let g:ycm_server_python_interpreter='/root/.pyenv/shims/python'
   let g:ycm_global_ycm_extra_conf='~/.vim/.ycm_extra_conf.py' "used for c-family language"
   let g:ycm_error_symbol = '>>'
   let g:ycm_warning_symbol = '>*'
   let g:ycm_key_invoke_completion = '<c-l>'
   nnoremap <leader>gl :YcmCompleter GoToDeclaration<CR>
   nnoremap <leader>gf :YcmCompleter GoToDefinition<CR>
   nnoremap <leader>gg :YcmCompleter GoToDefinitionElseDeclaration<CR>
   nmap <F4> :YcmDiags<CR>
   ```


#### 4.2 配置 C 支持
1. 复制并修改 `.ycm_extra_conf.py`文件：
   
   ```
   cp ~/.vim/bundle/YouCompleteMe/third_party/ycmd/examples/.ycm_extra_conf.py ~/.vim/
   ```
   
2. 然后在`~/.vimrc`中设置`g:ycm_global_ycm_extra_conf`变量：
   
   ```
   let g:ycm_global_ycm_extra_conf='~/.vim/.ycm_extra_conf.py' "used for c-family language"
   ```

#### 4.3 配置 JavaScript 支持
1. 安装 TSServer 引擎（通过安装TypeScript SDK）：
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

2. （可选）为了获得语法检查的功能，可以在工程目录中的`jsconfig.json`文件里设置`checkJs`选项：
    <pre>
    {
        "compilerOptions": {
            "checkJs": true
        }
    }
    </pre>

### 5 使用
参见`:h youcompleteme-commands`及`:h youcompleteme-ycmcompleter-subcommands`
#### 5.1 通用
8. Commands                                           `youcompleteme-commands`
   1. The `:YcmRestartServer` command
   2. The `:YcmForceCompileAndDiagnostics` command
   3. The `:YcmDiags` command
   4. The `:YcmShowDetailedDiagnostic` command
   5. The `:YcmDebugInfo` command
   6. The `:YcmToggleLogs` command
   7. The `:YcmCompleter` command
9. YcmCompleter Subcommands           `youcompleteme-ycmcompleter-subcommands`
   1. GoTo Commands                                `youcompleteme-goto-commands`
      1. The `GoToInclude` subcommand
      2. The `GoToDeclaration` subcommand
      3. The `GoToDefinition` subcommand
      4. The `GoTo` subcommand
      5. The `GoToImprecise` subcommand
      6. The `GoToReferences` subcommand
      7. The `GoToImplementation` subcommand
      8. The `GoToImplementationElseDeclaration` subcommand
      9. The `GoToType` subcommand
   2. Semantic Information Commands `youcompleteme-semantic-information-commands`
      1. The `GetType` subcommand
      2. The `GetTypeImprecise` subcommand
      3. The `GetParent` subcommand
      4. The `GetDoc` subcommand
      5. The `GetDocImprecise` subcommand
   3. Refactoring Commands                  `youcompleteme-refactoring-commands`
      1. The `FixIt` subcommand
      2. The 'RefactorRename <new name>' subcommand      `RefactorRename-new-name`
      3. Multi-file Refactor                   `youcompleteme-multi-file-refactor`
      4. The `Format` subcommand
      5. The `OrganizeImports` subcommand
   4. Miscellaneous Commands              `youcompleteme-miscellaneous-commands`
      1. The `RestartServer` subcommand
      2. The `ClearCompilationFlagCache` subcommand
      3. The `ReloadSolution` subcommand

关于它们的用法请参见`:h :<命令名>`，如`:h :YcmRestartServer`

输入字符超过2个，即会出现补全菜单，主要支持本文档内的补全（注释中的不会用于补全，如想补全注释中的内容，可以使用Ctrl+N和Ctrl+P）、语义补全（根据编程语言自动解析补全，精准度很高）、代码片断补全（和 vim-snippets 配合使用）
* `Ctrl+N`和`Ctrl+P`：出现补全菜单后，使用`Ctrl+N`向下选择（也可以使用`Tab`），使用`Ctrl+P`向上选择
* `\gd`(GetDoc)：获取光标所在单词的帮助文档（主要是它的API）
* `\gr`(GoToReferences)：获取引用光标所在单词的所有位置
* `\gg`(GoTo): 先尝试跳转至声明处，若失败，则跳转至定义处
* `Ctrl+L`: 强制补全
* `Ctrl+Y`：在补全菜单出现时可以使用该快捷键关闭补全菜单（有时很有用）

#### 5.2 C语言

| normal | cmdline(`:YcmCompleter <subcmd>`) | Description                                                                                  | 备注                                                  |
|--------|-----------------------------------|----------------------------------------------------------------------------------------------|-------------------------------------------------------|
| `\gi`  | `GoToInclude`                     | Looks up the current line for a header and jumps to it.                                      | 和 Vim 自带的`gf`命令类似                             |
| `\gc`  | `GoToDeclaration`                 | Looks up the symbol under the cursor and jumps to its declaration.                           | 和 Vim 自带的`gd`命令类似                             |
| `\gf`  | `GoToDefinition`                  | Looks up the symbol under the cursor and jumps to its definition.                            |                                                       |
| `\gg`  | `GoTo`                            | Auto select from above                                                                       |                                                       |
| `\gt`  | `GetType`                         | Echos the type of the variable or method under the cursor                                    |                                                       |
| `\gp`  | `GetParent`                       | Echos the semantic parent of the point under the cursor.                                     |                                                       |
| `\gd`  | `GetDoc`                          | Displays the preview window populated with quick info about the identifier under the cursor. | 可以使用`K`或`\K`命令查看`man`手册，详情参见`:h :Man` |

注意，上述命令需要配置文件`~/.vimrc`如下：
```
nnoremap <leader>gi :YcmCompleter GoToInclude<CR>
nnoremap <leader>gc :YcmCompleter GoToDeclaration<CR>
nnoremap <leader>gf :YcmCompleter GoToDefinition<CR>
nnoremap <leader>gg :YcmCompleter GoTo<CR>
nnoremap <leader>gt :YcmCompleter GetType<CR>
nnoremap <leader>gp :YcmCompleter GetParent<CR>
nnoremap <leader>gd :YcmCompleter GetDoc<CR>
```
且其中的`<leader>`没有被修改过，即为默认的`\`。详情参见`:h <leader>`


### 6 参考链接
* [Building-Vim-from-source](https://github.com/Valloric/YouCompleteMe/wiki/Building-Vim-from-source)
* [vim-plug](https://github.com/junegunn/vim-plug)
* [Why I choose vim-plug](https://ssarcandy.tw/2016/08/17/vim-plugin-manager/)
* [YouCompleteMe#linux-64-bit](https://github.com/Valloric/YouCompleteMe#linux-64-bit)
* [YouCompleteMe#full-installation-guide](https://github.com/Valloric/YouCompleteMe#full-installation-guide)
* [一步一步带你安装史上最难安装的 vim 插件 —— YouCompleteMe](https://www.jianshu.com/p/d908ce81017a)

