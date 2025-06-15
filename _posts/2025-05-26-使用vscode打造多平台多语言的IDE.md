---
title: 使用 VSCode 打造多平台多语言的 IDE
tags:
  - vscode
  - nvim
  - IDE
---

## 概述

虽然我是 vim/nvim 爱好者，但在用过 vscode 之后也不得不承认 vscode 也非常好用，甚至在某些方面比 vim 还好用，相比 vim/nvim，它有以下优势：

* 学习成本低：vscode 基本不需要通过专门阅读其官方文档来学习，它是直观的、容易理解的、形象的。
* 具备一定的定制能力：vscode 本身只是一个文本编辑器，类似记事本，也类似 vim/nvim。但它的拓展机制（类似 vim 的插件机制，后文也称之为插件）让它可以实现各种功能，从而可以按需拓展。除了拓展机制，还有其 json 格式的配置文件也非常容易阅读和理解，也容易修改。
* 开箱即用：vscode 基本不需要额外的配置，打开即可用，拓展方面也是安装好后基本就能用了，不需要单独配置，甚至不需要重启 vscode 就能生效。
* 诸多好用的细节：包括编辑器右侧的预览条、差异条、错误条，最下方的状态栏，会记住常用命令的命令面板（`Ctrl + Shift + P`），统一的左侧工具栏和上方菜单栏等。
* ……

此外，和 vim/nvim 一样，它是跨平台通用的，即支持 Windows、Linux、MacOS，而且由于它是由微软开发，所以在 Windows 上的体验甚至比在 Linux 中还好。

和 vim/nvim 一样，由于 LSP 和 DAP 的产生，vscode 很容易支持基于各种语言、各种平台的开发和调试，包括 stm32、ros、qt 等。

下面将首先说明 vscode 本身的基本用法，再根据具体的开发场景讲述配置步骤和使用方法，后面以 Windows 平台为例，Linux 和 MacOS 只会更简单，就不再赘述。

## VS Code

VS Code 是 Visual Studio Code 的简称，为了打字方便，也常常称之为 vscode。需要注意的是，vscode 不是 Visual Studio，后者通常简称为 VS，是个非常庞大的家伙，安装都要花很长时间，让人讨厌。与之相反，VS Code 是个轻量级的文本编辑器，在 Linux 中只有 100MB 左右（相比 vim/nvim 还是有点大，:joy:）

### 安装

最方便的安装方法是使用 `winget` 命令：

```pwsh
winget install Microsoft.VisualStudioCode
```

### 配置

按快捷键 `Ctrl + ,` 即可打开 vscode 的配置界面， vscode 的配置主要分为两个级别：用户级和工作空间级（工程级）。用户级的配置对你的所有工程均生效，工作空间级则只对当前打开的工程生效。简单来说，就是一个是全局配置，另一个是局部配置。全局配置默认存放在`C:\Users\<username>\AppData\Roaming\Code\User\settings.json`，局部配置默认存放在`./.vscode/settings.json`中。

关于详尽的配置说明可参见此界面中的说明，以及[VSCode官方配置文档]。

[VSCode官方配置文档]: https://code.visualstudio.com/docs/configure/settings

这里讲几个好用的小细节：

1. `Ctrl + ,`打开的默认是界面，不是对应的 json 文件，那么如何打开对应的 json 文件呢？答案很简单，直接点击该界面右上角的相应图标即可，至于具体是哪个图标，就等待你自己去探索了，:joy:。
1. 某些情况下不只前述两个级别的配置文件，比如使用 remote 开发时，会多出一个远程 vscode server 的配置。
1. 配置文件 json 本身不支持注释和后面多余的逗号，但 vscode 做了拓展，所以你可以放心地写`//`格式的注释了，以及添加多余的逗号，方便追加内容。

### 使用

谈到 vscode 的使用，我觉得最重要的便是它的“命令面板”，如何唤出呢？最简单的方式是使用快捷键`Ctrl + Shift + p`。下面详细说明“命令面板”这一伟大的功能。

#### 常用快捷键

##### `Ctrl + Shift + p`

打开命令面板的快捷键是 vscode 中必记的快捷键，其他所以快捷键都可以遗忘，唯有这个不能。因为“命令面板”几乎可以做所有事情，甚至帮你记快捷键。

比如前面提到的打开配置可以使用`Ctrl + ,`快捷键，但也可以使用“命令面板”，直接输入`sett`，就可以找到“Preferences: Open User Settings”，回车即可打开。

又比如打开面板后输入`shortcut`，就可以看到 **Preferences: Open Keyboard Shortcuts**，并且提示你该命令的快捷键是`Ctrl + K, Ctrl + S`，即先按`Ctrl+K`，然后再按`Ctrl + S`，这里的 `Ctrl + K` 就类似 vim 中的 `<leader>` 键。

你也可以在命令面板中输入`help`查看感兴趣的帮助文档。

##### `Ctrl + p`

在当前工程中搜索文件

##### `Ctrl + Shift + f`

在当前工程中搜索所有文件中的内容

#### Terminal

vscode 中集成了 Terminal 功能，可以方便地打开你喜欢的终端，你可以设置默认的终端，在 settings.json 中添加如下内容即可：

```json
  "terminal.integrated.shell.windows": "C:\\Program Files\\PowerShell\\7\\pwsh.exe",
```

pwsh 是个值得推荐的 shell，最初只用于 Windows，后来已经跨平台了。需要注意的是，pwsh 通常指跨平台版本，和 Windows 中内置的 powershell 有一定区别。pwsh 处于活跃状态，推荐使用。

#### Task

vscode 的 Task 是个不错的功能，可以按序执行各种命令，其中包括 shell 命令、cmake 命令等等，方便处理一些重复的事情，比如可以实现 STM32 中的下载 Flash 程序、部署文件到特定平台等，你想要做的事都可以在这里尝试。

Task 位于菜单栏中的 Terminal 中。

其中有个比较重要的是 build task，即构建任务。其快捷键是`Ctrl + Shift + B`。

#### 跳转

vscode 自身就提供了一些基本的跳转能力，它位于菜单栏中的 Go 处，可以自行探索一番。

#### 视图

vscode 中提供了非常多的视图，其中包括浏览视图、搜索视图、版本控制视图、调试视图、拓展视图等，可在菜单栏中的 View 中打开。

#### 其他

一些心得：

* vscode 的插件不使用代理时下载得更快。
* 遇到问题时优先尝试更新 vscode 或 vscode 插件的版本，常常有奇效，对于某些插件，还可尝试其 Pre-Release 版本
* 对于 vscode 的插件，最好使用 ID 来表达，因为 ID 具有唯一性，而名称是可能重复的，而且 vscode 也支持通过 ID 来搜索指定插件，直接在搜索框中输入 ID 即可。

纸上得来终觉浅，建议还是自行探索一番，更能发现一些 vscode 内置的有趣的功能。

## C/C++ 本地应用开发

该场景对我而言主要用于测试，包括测试语言特性、语言标准、进行模块单元测试等，也可用于开发一些命令行程序，实现一些小工具。

该场景配置起来非常简单，首先安装一个喜欢的编译器，然后装几个插件就 ok。下面具体说明：

> 官方也提供了一个教程，可供参考：[C/C++ for Visual Studio Code](https://code.visualstudio.com/docs/languages/cpp)。
{: .prompt-tip }

### 安装编译器

#### GCC

GCC 是最经典的编译器，且跨平台，三大平台都能用，可以使用 scoop 命令安装：

```ps1
scoop install gcc
```

#### clang

clang 是 llvm 项目的一部分，所以建议直接安装 llvm 包，可以使用 scoop 命令安装。

```ps1
scoop install llvm
```

#### MSVC

MSVC 是 Microsoft Visual C/C++ 的简称，是微软官方的 C/C++ 编译器及相关工具，是最适合 Windows 的编译器，比较推荐，可以直接使用`winget`安装

```ps1
winget install Microsoft.VisualStudio.2022.BuildTools
```

### 安装 vscode 拓展

* clangd：C/C++ LSP，是 llvm 中的一部分，功能非常强大，提供 C/C++ 语言感知、自动补全、代码重构等功能，在某些方面比微软官方的 C/C++ 插件还好用。
* cmake：对 cmake 文件提供编辑支持，包括语法高亮、自动补全、代码片段、注释等。
* cmake tools：cmake 工程支持。
* cpp reference: C++ 标准官方参考手册。

> 官方提供的智能感知插件是 C/C++，其 ID 为 `ms-vscode.cpptools`，我这里推荐的是 clangd，这两个插件是互斥的，使用某一个时必须禁用或卸载另一个，可结合个人体验自行选择
{: .prompt-tip }

## STM32 应用开发

STM32 应用开发主要使用的是 C 语言，核心插件是 cortex-debug。

### 准备工作

1. 安装 STM32CubeMX：去[官网](https://www.st.com/en/development-tools/stm32cubemx.html)下载安装即可。
1. 在 vscode 中安装以下插件：

   * clangd: 提供代码补全、语法检查等功能。安装后打开工程时会提示你下载 clangd，确认下载即可。这个插件会和 cpptools（C/C++插件） 冲突，需要将 cpptools 卸载掉。cpptools 是微软官方的插件，功能类似于 clangd，但不如 clangd 好用。此外，我们需要在工程根目录下额外添加一个配置文件`.clangd`，内容如下所示：

     ```yaml
     CompileFlags:
       Add: [--sysroot=D:\ST\STM32CubeCLT_1.18.0\GNU-tools-for-STM32\arm-none-eabi]
       CompilationDatabase: ./hardware/ys/build/Debug
     ```

     其中的`--sysroot`是为了解决标准库函数找不到的问题，`CompilationDatabase`是为了指定`compile_commands.json`的路径，clangd 依赖此文件。

   * cortex-debug：提供调试功能。安装好后需要设置下 cortex-debug 插件使用的 flash 下载工具的路径，我们使用的是 STM32CubeCLT 中的 "D:\ST\STM32CubeCLT_1.18.0\STM32CubeProgrammer\bin\STM32_Programmer_CLI.exe"，可以在用户配置文件中添加设置如下（注意只写其所在目录即可）：

     ```json
     {
       "cortex-debug.stm32cubeprogrammer": "D:\\ST\\STM32CubeCLT_1.18.0\\STM32CubeProgrammer\\bin",
     }
     ```

     当然，如果你安装了 STM32CubeProgrammer，且默认安装在了 C 盘，那么 cortex-debug 插件会自动找到，无需上述配置。

   * github copilot：提供 AI 代码补全功能，提高代码编写效率
   * github copilot chat：提供 AI 聊天功能，辅助代码编写
   * STM32 VS Code Extension（又名STM32Cube for Visual Studio Code）: ST 官方插件，结合 STM32CubeMX 提供代码生成、文档查看等功能。它依赖于[STM32CubeCLT](https://www.st.com/en/development-tools/stm32cubeclt.html)，这个需要手动下载安装，它比较大，建议安装在 D 盘

### 使用步骤

1. 使用 STM32CubeMX 生成代码时选择 cmake 方式
1. 在 vscode 中打开 STM32 项目文件夹，vscode 会提示 CMakeLists.txt 选择，此处选择对应板子的 CMakeLists.txt 即可（如果没提示，就是它自己找到了，不用管），然后它会提示配置预设项（CMake presets），选择 Debug 即可。然后项目会自动配置和初始化。过程中遇到的问题根据 vscode 的提示进行操作即可。

### 使用技巧

* 编译：`F7`
* 下载：`F8`。这个快捷键需要手动设置下：
  1. 打开命令面板（`Ctrl+Shift+P`），输入`open keyboard json`，然后回车，打开`C:\Users\wsxq2\AppData\Roaming\Code\User\keybindings.json`，添加以下内容：

     ```json
     [
         {
             "key": "f8",
             "command": "workbench.action.tasks.runTask",
             "args": "Flash STM32"
         }
     ]
     ```
  
  1. 此外，还需要在`.vscode`目录下添加`tasks.json`，其中定义`Flash STM32`，如下所示：

     ```json
     {
        "version": "2.0.0",
        "tasks": [
          {
            "type": "shell",
            "label": "Flash STM32",
            "command": "STM32_Programmer_CLI.exe",
            "args": [
              "-c",
              "port=SWD",
              "-d",
              "${workspaceFolder}/hardware/ys/build/Debug/master_ys.elf",
              "-rst"
            ],
            "problemMatcher": [],
            "group": {
              "kind": "none",
              "isDefault": false
            },
            "dependsOn": [
              "CMake: build"
            ]
          },
          {
            "type": "cmake",
            "label": "CMake: build",
            "command": "build",
            "targets": [
              "all"
            ],
            "preset": "${command:cmake.activeBuildPresetName}",
            "group": "build",
            "problemMatcher": [],
          }
        ]
     }
     ```

     其中设置了依赖`CMake: build`，这样就能保证下载的总是最新的代码。

* 运行并调试：`F5`。需要配置 `launch.json`，如下所示（我这里使用的是 stlink 仿真器）：
  
  ```json
  {
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Cortex Debug",
            "cwd": "${workspaceFolder}",
            "executable": "${workspaceFolder}/hardware/ys/build/Debug/master_ys.elf",
            "request": "launch",
            "type": "cortex-debug",
            "runToEntryPoint": "main",
            "servertype": "stlink",
        }
    ]
  }
  ```

* 跳转到定义：`F12`
* 查看所有引用：`Shift+F12`

## ROS 应用开发

ROS 即 Robot Operate System 的缩写，意即“机器人操作系统”，虽然名为操作系统，但实际并不是，它更倾向一个软件框架，涉及一系列软件包。ROS 应用的开发主要是指节点（Node）的开发，通常在此节点上发布或订阅主题（Topic），实现相关的功能。

ROS 的开发环境一直以来是个难点，因为它涉及大量的库，查找特定变量或函数时如何快速地正确地跳转到其定义和引用，一直以来都比较困难。对此，微软提供了解决方案，即 ROS 插件，其 ID 为 `ms-iot.vscode-ros`。

### ROS 插件

ROS 插件主要依赖两个插件，Python 和 C/C++，因此能够支持 ROS 两种主要编程语言的使用。ROS 插件提供了许多有用的功能（其中加粗的是个人感觉特别有用的功能）：

* 自动配置 ROS 环境。  
* 支持启动、停止并查看 ROS core 状态。  
* 自动创建 catkin_make 或 catkin build 的构建任务。  
* 通过 catkin_create_pkg 脚本或 catkin create pkg 创建 catkin 包。  
* 运行 rosrun 或 roslaunch。  
* 通过 rosdep 快捷方式解决依赖关系。  
* 为 .msg、.urdf 及其他 ROS 文件提供语法高亮。  
* **自动添加 ROS C++ 头文件和 Python 导入路径**。  
* **使用 ROS clang-format 风格格式化 C++ 代码**。  
* **预览 URDF 和 Xacro 文件**。  
* 通过附加进程调试单个 ROS 节点（C++ 或 Python）。  
* 调试通过 .launch 文件启动的 ROS 节点（C++ 或 Python）。

详情参见官方页面: [ROS - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-iot.vscode-ros)

> 务必使用最新版本的 ROS 插件，需要注意的是，当前最新版本的插件是 pre release 的**0.9.6**（2023-11-14更新），只需要在该插件页面点击“Switch to Pre-Release Version”按钮即可。
{: .prompt-warning }

实际使用下来，发现 ROS 插件对 cpp 文件解析非常慢，可能是 C/C++ 插件本身的性能有限导致的，后续可考虑改用 clangd 插件。

### SSH 远程开发

vscode 引进了一个个人认为非常先进的（但也非常危险的）概念：**远程开发**。这个远程开发和以前所谓的“远程开发”不同，它不是简单地编辑远程服务器的代码，也不是“编辑本地代码，然后通过 SSH 等方式推送到远程服务器”，而是引入了 vscode server， vscode server 是 vscode 的服务端，运行在远程主机上，处理许多 vscode 相关业务，关于它的详细介绍可参见官方文档：[Visual Studio Code Server](https://code.visualstudio.com/docs/remote/vscode-server)。

这个功能对于 ROS 开发而言非常有用。为什么呢？因为 ROS 环境通常部署在工控机中，通常为 Ubuntu 系统，而一般的开发机是 Windows 系统。一个简单的方案是直接在工控机上安装 vscode，然后通过远程桌面协议（如 RDP 或 VNC）或者 X11 协议得到 vscode 的图形界面，安装前述的 ROS 插件进行相应的开发，但这个方法的问题是需要额外安装相关软件，且配置通常比较繁琐，而 vscode server 的引入可以实现在开发机上不部署 ROS 环境，但能访问远程的 ROS 环境，从而实现高效的代码编写、编译以及调试。

使用 vscode 中的 SSH 远程开发，基本不需要配置，点击最左下角的图标，再点击“Connect to Host”，点击“Add New SSH Host...”，再根据提示操作即可。

> 建议配置 SSH 的公私钥，这样就不需要每次打开都输入密码了。另外我结合 VMware 虚拟机 Ubuntu 使用时，发现即使配置了 SSH 的公私钥，也总是提示需要输入密码，很奇怪。后来又发现配置了`"remote.SSH.showLoginTerminal": true`后能解决此问题，但还是不清楚根本原因，官方相关说明：[Remote Development Tips and Tricks](https://code.visualstudio.com/docs/remote/troubleshooting#_troubleshooting-hanging-or-failing-connections)。
{: .prompt-tip }

后面发现对于我的 VMware 虚拟机（Ubuntu 20.04, ROS1 noetic），总是提示 ROS 插件依赖的 C/C++ 插件未安装，手动安装报错不兼容，折腾很长时间后，使用`sudo apt upgrade`命令更新虚拟机所有包（其中包括 vscode，更新到了 1.101.0），然后也更新了 Windows 上的 vscode 到最新版本（使用`winget upgrade Microsoft.VisualStudioCode`命令，也是更新到了 1.101.0），再 Kill vscode server（详情参见[Remote Development Tips and Tricks](https://code.visualstudio.com/docs/remote/troubleshooting#_troubleshooting-hanging-or-failing-connections)），以使其重新下载安装，然后再重新尝试在远程安装 C/C++ 插件就好了。由此可见，遇到问题优先使用新版本的 vscode 及相关插件。

此外，还发现一个现象是，vscode 的插件不使用代理就可以下载得比较快，相反，使用代理后反而慢些。

## Qt 应用开发

TODO.

## vim 相关插件

由于我习惯了 vim 的操作方式，而且 vim 的操作方式确实非常高效，所以 vscode 中的 vim 插件就显得格外重要了，那么 vim 插件有哪些呢？下面罗列如下：

* VSCode Neovim：500k+ 下载量
* Vim：也叫 VSCode Vim，7M+ 下载量
* nvim：17k+ 下载量

其中最值得使用的是 VSCode Neovim（ID 为 `asvetliakov.vscode-neovim`），它是当前更新最频繁，且最先进的 vim 相关插件。
