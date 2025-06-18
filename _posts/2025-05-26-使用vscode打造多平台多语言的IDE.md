---
title: 使用 VSCode 打造多平台多语言通用的 IDE
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

这里提一些个人使用心得：

1. `Ctrl + ,`打开的默认是界面，不是对应的 json 文件，那么如何打开对应的 json 文件呢？答案很简单，直接点击该界面右上角的相应图标即可，至于具体是哪个图标，就等待你自己去探索了，:joy:。
2. 某些情况下不只前述两个级别的配置文件，比如使用 remote 开发时，会多出一个远程 vscode server 的配置。
3. 配置文件 json 本身不支持注释和后面多余的逗号，但 vscode 做了拓展，所以你可以放心地写`//`格式的注释了，以及添加多余的逗号，方便追加内容。
4. vscode 的配置并不总是全部生效，它和打开的文件类型或者工程类型相关，拓展的加载也和这个有关系。比如，打开非 C++ 工程，在配置界面中找不到 C/C++ 插件的配置，打开对应的 JSON 文件会发现相关的配置是暗的，表示未启用，将光标移过去时 vscode 也会有相关提示。可见 vscode 的细节做得非常好。

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

### 一些先进理念

这里简单介绍下 vscode 引入的一些先进的理念，包括 LSP、DAP、远程开发等，内容主要来自 AI。

#### LSP

LSP（Language Server Protocol）是一种由 Microsoft 提出的协议，用于在编辑器（如 VS Code）和编程语言服务器之间进行通信。它的主要目的是将语言相关的功能（如代码补全、语法高亮、跳转定义、重构等）从编辑器中解耦出来，由独立的语言服务器实现。

LSP 的核心概念包括：

- **客户端（Client）**：通常是代码编辑器或 IDE，负责与用户交互，并通过 LSP 与语言服务器通信。
- **服务器（Server）**：实现了 LSP 协议的后端服务，负责分析代码并提供语言智能功能。
- **协议（Protocol）**：基于 JSON-RPC 的通信协议，定义了客户端和服务器之间的消息格式和交互方式。

LSP 的优势在于：只需实现一次语言服务器，就可以让多种编辑器获得该语言的智能支持，大大减少了重复开发的工作量

#### DAP

DAP（Debug Adapter Protocol）是由 Microsoft 提出的调试通信协议，用于在代码编辑器（如 VS Code）和调试器后端之间进行通信。它的目标是将调试功能（如断点、单步执行、变量查看、调用栈等）从编辑器中解耦出来，由独立的调试适配器实现。

DAP 的核心概念包括：

- **客户端（Client）**：通常是代码编辑器或 IDE，负责与用户交互，并通过 DAP 与调试适配器通信。
- **调试适配器（Debug Adapter）**：实现了 DAP 协议的后端服务，负责与具体的调试器（如 GDB、Node.js 调试器等）交互，并将调试信息传递给客户端。
- **协议（Protocol）**：基于 JSON 的通信协议，定义了客户端和调试适配器之间的消息格式和交互流程。

DAP 的优势在于：只需实现一次调试适配器，就可以让多种编辑器获得该调试器的支持，极大地提升了调试工具的可复用性和扩展性。

#### 远程开发

在 VS Code 中，远程开发（Remote Development）是一项强大的功能，允许开发者在本地 VS Code 编辑器中，连接并开发运行在远程主机或容器中的项目代码。这样可以利用远程环境的计算资源、依赖和配置，同时保持本地编辑体验。

主要的远程开发方式包括：

1. SSH 远程开发

   - 通过 **Remote - SSH** 扩展，VS Code 可以通过 SSH 协议连接到远程 Linux 或 macOS 主机。
   - 连接后，VS Code 会在远程主机上启动一个后台服务，所有的代码编辑、调试、终端操作都在远程主机上进行，本地只负责界面显示和交互。
   - 适用于需要在云服务器、虚拟机或物理服务器上开发的场景。

1. WSL（Windows Subsystem for Linux）远程开发

   - 通过 **Remote - WSL** 扩展，允许在 Windows 系统下直接使用 VS Code 连接并开发 WSL 子系统中的 Linux 环境。
   - 适用于需要在 Windows 上开发和运行 Linux 应用的场景。
   
1. Dev Containers（开发容器）

   - 通过 **Dev Containers**，可以基于`.devcontainer`配置文件快速搭建和共享一致的开发环境。
   - 适合团队协作和开源项目，确保每个人的开发环境一致。
   
这些方式都可以让开发者在本地 VS Code 中无缝访问和操作远程或虚拟化的开发环境，提升开发效率和灵活性。
通过这些远程开发方式，VS Code 实现了“本地体验，远程运行”，极大地提升了跨平台和分布式开发的便捷性。

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

> 官方提供的智能感知插件是 C/C++，其 ID 为 `ms-vscode.cpptools`，我这里推荐的是 clangd，这两个插件在智能感知功能这块是互斥的，推荐使用 clangd 的智能感知，它依赖于 compile_commands.json，但解析 CPP 文件更快，这样需要禁用 C/C++ 插件的智能感知功能（在设置文件中添加`"C_Cpp.intelliSenseEngine": "disabled",`）。
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

### 遇到过的问题

1. 调试无法进行，像是跑飞了？当时一直以为对于有 bootloader 的应用开发，我遗漏了什么配置导致的此问题，最后才发现是当时使用的是 Keil 下载的 bootloader，然后使用 vscode 下载的用户程序，由于二者编译器的差异导致了这个问题，都使用 vscode 下载即可。vscode 使用的工具链是 GCC 工具链，使用它开发 bootloader 及用户程序的核心配置要点如下：
   1. bootloader 不修改任何启动相关设置，从而使其从默认的 0x0800 0000 启动
   2. 用户程序需要调整两个位置（以 STM32H743 为例）：
      1. ld 文件：修改 flash 的 ORIGIN 为用户程序段起始地址，如 0x802 0000，并设置 LENGTH 为 **原本 LENGTH -  bootloader 占用长度**，如 1920 K。
      2. system_stm32h7xx.c 文件，其中取消 `#define USER_VECT_TAB_ADDRESS` 一行的注释，并设置 `VECT_TAB_OFFSET` 为相应值，如 0x0002 0000。

2. STM32H743 无法通过 DMA 方式接收串口数据？这是由于 STM32CubeMX 默认生成的 ld 文件中，使用的内存是 0x2000 0000 开始的 DTCMRAM，该部分内存虽然很快，但无法访问 DMA，可以将 DTCMRAM 仅用于栈，将 RAM （起始地址为 0x2400 0000） 用于其他，修改后的 ld 文件如下所示（仅列出了关键部分）：

   ```ld
   _estack = ORIGIN(DTCMRAM) + LENGTH(DTCMRAM)
   ...
   /* Specify the memory areas */
   MEMORY
   {
   DTCMRAM (xrw)      : ORIGIN = 0x20000000, LENGTH = 128K
   RAM (xrw)      : ORIGIN = 0x24000000, LENGTH = 512K
   RAM_D2 (xrw)      : ORIGIN = 0x30000000, LENGTH = 288K
   RAM_D3 (xrw)      : ORIGIN = 0x38000000, LENGTH = 64K
   ITCMRAM (xrw)      : ORIGIN = 0x00000000, LENGTH = 64K
   FLASH (rx)      : ORIGIN = 0x8020000, LENGTH = 1920K
   }
   ...
   /* Initialized data sections goes into RAM, load LMA copy after code */
   .data :
   {
     . = ALIGN(4);
     _sdata = .;        /* create a global symbol at data start */
     *(.data)           /* .data sections */
     *(.data*)          /* .data* sections */
     *(.RamFunc)        /* .RamFunc sections */
     *(.RamFunc*)       /* .RamFunc* sections */
 
     . = ALIGN(4);
     _edata = .;        /* define a global symbol at data end */
   } >RAM AT> FLASH
 
 
   /* Uninitialized data section */
   . = ALIGN(4);
   .bss :
   {
     /* This is used by the startup in order to initialize the .bss secion */
     _sbss = .;         /* define a global symbol at bss start */
     __bss_start__ = _sbss;
     *(.bss)
     *(.bss*)
     *(COMMON)
 
     . = ALIGN(4);
     _ebss = .;         /* define a global symbol at bss end */
     __bss_end__ = _ebss;
   } >RAM
 
   /* User_heap_stack section, used to check that there is enough RAM left */
   ._user_heap_stack :
   {
     . = ALIGN(8);
     PROVIDE ( end = . );
     PROVIDE ( _end = . );
     . = . + _Min_Heap_Size;
     . = . + _Min_Stack_Size;
     . = ALIGN(8);
   } >RAM
   ```

## ROS 应用开发

ROS 即 Robot Operate System 的缩写，意即“机器人操作系统”，虽然名为操作系统，但实际并不是，它更倾向一个软件框架，涉及一系列软件包。ROS 应用的开发主要是指节点（Node）的开发，通常在此节点上发布或订阅主题（Topic），实现相关的功能。

ROS 应用开发主要使用 C++ 和 Python 语言，其中 C++ 的开发环境一直以来是个难点，因为它涉及大量的库，查找特定变量或函数时如何快速地正确地跳转到其定义和引用，一直以来都比较困难，此外，URDF及其宏文件XACRO的编写由于缺乏预览也比较困难。对此，微软提供了解决方案，即 ROS 插件，其 ID 为 `ms-iot.vscode-ros`。

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

当前（2025-06-17）的 Qt 有两个大版本，Qt5 和 Qt 6。Qt5 较老，最新版本为5.15.16，目前官方只提供安全更新，Qt 6 较新，但也使用了好几年了，趋于稳定，所以可以考虑迁移到 Qt 6。

此外，Qt6 引入了新的开发方式，即 Qml，目前我还没深入研究。

另外，在很早之前，就有 Python 版本的 Qt，用 Python 开发 Qt 应用比较快，目前我还未尝试。Python 的 Qt 库有两种，PySide 和 PyQt，前者是官方提供的，后者是社区驱动的。后续推荐使用 PySide。

还需要注意的是，Qt5 从 Qt5.15 开始，官方不再提供编译好的二进制文件，要使用的话，需要自己在 Windows 上编译其源码，比较麻烦。但有些方式可以获得这样的二进制文件，如 vcpkg，它会自动下载并编译，所以 vcpkg 也逐渐成为一种 qt 官方支持的安装方式。

### 相关插件

- Qt Extension Pack：包含 Qt Core, Qt C++, Qt Qml, Qt UI
- Qt Core：Qt 核心插件。其他 Qt 相关插件均依赖此插件。
- Qt C++：C++ 开发方式插件
- Qt Qml：Qml 开发方式插件
- Qt UI：ui 文件相关插件
- Qt for Python：非官方（前述插件都是 qt 官方的），但比较成熟，下载量较高（730k），用于 Python 语言开发 qt 界面，其中有两种库——pyside 和 pyqt，pyside 是官方支持的，推荐使用。
  
以上官方插件相关文档可参见：[Qt Extension for VS Code](https://doc.qt.io/vscodeext/index.html)

### 使用

我之前有个基于 Qt5 的工程，准确地说，是 Qt 5.14.2。一直以来我都希望在 vscode 中开发它，但尝试了许多思路，都未达到理想的效果，下面简单罗列下（Windows平台）：

- 使用官方的 Qt 离线安装方式安装 Qt 5.14.2，然后使用 MSVC 2022 编译器，结合 vcpkg.json 和 CMakePreset.json，其中 vcpkg.json 主要是用于安装依赖库 ceres，CMakePreset.json 用于进行 kits 相关的配置（其中配置 cmake 生成器为 `Visual Studio 17 2022`， `CMAKE_TOOLCHAIN_FILE` 为 `D:\\vcpkg\\scripts\\buildsystems\\vcpkg.cmake`），这样能成功 cmake configure 和 编译，但无法运行。（现在想来，应该可以通过 windeployqt 处理后直接运行，如果需要调试，则需要添加 launch.json 文件，并配置 PATH 环境变量，让其能找到 Qt 的动态库文件，通常是`C:\Qt\Qt5.14.2\5.14.2\msvc2017_64\bin`）
- 使用 vcpkg 方式安装 Qt5.15.16，同样使用 vcpkg.json 和 CMakePreset.json 方式，但常常卡在 cmake configure 阶段，该阶段报各种错，尝试许多方法没有得到解决。（现在想来，可以在其中添加 `"CMAKE_CXX_COMPILER": "cl.exe"`相关配置，vscode 就会自动导入 VS 2022 开发环境，从而成功配置和编译）

尝试了上述思路无果后，我觉得可能是 Qt5 较老，不受待见导致的，于是尝试 Qt6，大致步骤如下：

1. 我先按照官方推荐的方式（即在线安装器）安装最新的 Qt6.9.1，其中勾选了 MSVC 2022 组件以及必要的库，如 SerialBus 等，以及勾选 Qt Designer Studio（或许也不需要勾选这个？），但未勾选 Qt Creator。
1. 然后我安装并配置了上述 vscode 官方插件：先是直接安装那个 Qt Extension Pack，然后在配置文件中添加了以下内容：

   ```
   "qt-core.qtInstallationRoot": "D:\\Qt",
   ```
   
1. 然后我直接重命名 vcpkg.json 为 vcpkg.json.bak，CMakePreset.json 为 CMakePreset.json.bak，这样的重命名相当于删除这两个文件，让 vscode 不做相应的解析。
1. 重新用 vscode 打开那个工程，配置并编译，发现配置成功，但编译失败，编译报错通常咨询 AI 发现是 Qt 5 迁移到 Qt6 导致的问题，即代码需要做相应的调整，于是我新建了一个 git 分支，并根据指导做了相应修改，再编译发现编译成功
1. 编写类似如下的调试文件（launch.json）：
   
   ```json
   {
       "version": "0.2.0",
       "configurations": [
           {
               "name": "Launch Program",
               "type": "cppvsdbg",
               "request": "launch",
               "program": "${command:cmake.launchTargetPath}",
               "args": [],
               "stopAtEntry": false,
               "cwd": "${workspaceFolder}",
               "environment": [],
           }
       ]
    }
    ```

1. 尝试调试，发现报错无法加载依赖的动态库，咨询 AI，说是需要添加相应的 PATH 环境变量，让其能找到 Qt 的动态库文件，我这里是`D:\Qt\6.9.1\msvc2022_64\bin`，然后就能成功调试了，打断点也是 OK 的

至此，一个基本的功能打通了，可以用 vscode 进行 Qt 开发了。对了，差点忘了提 ui 文件相关的事，ui 文件可以使用插件 Qt UI 中自动配置的 qt widgets designer 打开编辑（可能会提示你选择 kits，选择正确的即可，例如我的是 msvc 2022），不需要打开 Qt Creator，这个工具的路径为 `D:\Qt\6.9.1\msvc2022_64\bin\designer.exe`。

而后，我还是希望使用 vcpkg.json 和 CMakePreset.json 的方式，通过一系列折腾，发现以下两个内容的相应文件是可用的：

```json
{
  "dependencies": [
    "ceres"
  ],
  "builtin-baseline": "cd124b84feb0c02a24a2d90981e8358fdee0e077"
}
```
{: file="vcpkg.json" }

```json
{
  "version": 4,
  "cmakeMinimumRequired": {
    "major": 3,
    "minor": 19,
    "patch": 0
  },
  "configurePresets": [
    {
      "name": "ninja-debug",
      "displayName": "Ninja Debug",
      "generator": "Ninja",
      "description": "Use Ninja generator for Debug build",
      "binaryDir": "${sourceDir}/build/ninja-debug",
      "cacheVariables": {
        "CMAKE_BUILD_TYPE": "Debug",
        "VCPKG_TARGET_TRIPLET": "x64-windows",
        "VCPKG_MANIFEST_MODE": "ON",
        "QT_USE_VCPKG": "ON",
        "CMAKE_CXX_COMPILER": "cl.exe",
        "CMAKE_TOOLCHAIN_FILE": "$env{VCPKG_ROOT}/scripts/buildsystems/vcpkg.cmake"
      }
    }
  ]
}
```
{: file="CMakePreset.json" }

后续我想不依赖在线安装器安装 Qt 这一方式，改为使用 vcpkg 进行 Qt 的安装（`vcpkg.json` 中添加 qt 相关包，如`qtbase`等），但折腾一段时间后，能编译通过，但无法调试。调试时报错：

```
qt.qpa.plugin: Could not find the Qt platform plugin "windows" in ""
This application failed to start because no Qt platform plugin could be initialized. Reinstalling the application may fix this problem.

Debug Error!

Program: ...\sprayingrobot\sprayingrobotpc\build\ninja-debug\Qt6Cored.dll
Module: 6.8.3
File: D:\vcpkg\buildtrees\qtbase\src\here-src-6-9f44591ee6.clean\src\gui\kernel\qguiapplication.cpp
Line: 1327

This application failed to start because no Qt platform plugin could be initialized. Reinstalling the application may fix this problem.

(Press Retry to debug the application)
```

又结合 AI 的建议尝试了许多思路，发现依然没有解决。感觉太难了，回头再说吧。

至少目前已经找出一个思路，即使用在线安装器安装 Qt 最新版本，然后可使用 vcpkg.json + CMakePreset 的方式进行开发，也可删除这两个文件，安装了前述插件的 vscode 会自动处理。

## GitHub Pages 博客

自 2018 年搭建个人博客以来，写博客对我而言一直是个麻烦的事情，由于最初我是在 Linux（CentOS 7） 中搭建的开发环境和测试环境，且该 Linux 位于 VirtualBox 虚拟机中，就导致我每次写博客需要启动虚拟机，然后通过 putty 连接该虚拟机，再使用 vim 写文章，而且当时 vim 的插件并没有现在这么完善，许多功能我采用了比较原始的方法，如 vim 的宏录制，这就导致写个文章非常麻烦，此外当时选择的模板越看越丑，还缺少一些必要的功能，如自动生成目录等，导致我自行添加了相关的 JS 代码，就比较混乱，不能专注于写文章。而且当时自己还弄了个复杂的文章结构，比如必须包括概述、链接、缩略语等章节，搞得非常痛苦。所以工作后就很少写文章了。

直到前不久找了个专注内容，同时又简洁大方、五脏俱全的模板——chirpy，才让我燃起了重新写博客的兴致。我花了大量时间迁移我的博客，在此期间发现以前写的许多文章真的非常糟糕，于是部分重构了下，但精力有限，还有许多文章没有优化。

扯远了，重点是什么呢？重点是我在查阅 chirpy 官方文档时发现，在 Windows 上，它推荐的开发环境是 vscode + Docker + Dev Containers，深入一看，发现这个方案可牛了，最重要的是搭建和使用起来都非常方便，它的环境搭建是一键完成的，即只需要等待一段时间，就能完成开发环境和测试环境的搭建了。当然，等待的过程中可能会报错，这时还是需要人工干预一下的。总之，这个开发环境非常牛逼，完全减轻了环境搭建的负担，让博主专注于写文章，同时使用起来也非常简单，打开 vscode，稍等一下就可以开始写文章了，由于内置了许多插件，体验也非常不错。关于该方案的详细说明可参见 [Getting Started \| Chirpy](https://chirpy.cotes.page/posts/getting-started/#using-dev-containers-recommended-for-windows)，另外可结合 [Dev Containers - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)相关文档。

## 网站开发

目前我用过的网站开发框架只有 thinkcmf，之所以选择它是因为它比较上层，开发起来比较简单，其开发测试环境搭建的一个方案也是基于 Docker，详见我的 [Web 开发笔记 —— thinkcmf]({% post_url 2022-03-16-Web开发笔记 %}#thinkcmf)。该笔记主要完成了测试环境的搭建，开发环境并未提及，开发环境即 IDE，当时想的是使用 nvim 开发，但后续由于其它事项也暂停了。

由于使用了 Docker 作为测试环境，这样一来就可以采用和 GitHub Pages 博客一样的思路，结合微软的 dev container 插件进行远程开发，这样 Docker 中的测试环境同时也是开发环境，本地的 vscode 相当于图形界面。但目前还未尝试。

## 其他

### AI

现在 AI 的功能非常强大，用来辅助编程和写博客都非常成熟了，在 vscode 的使用体验比在 neovim 中还要好很多（vscode 真的太牛了）。下面简单说明下个人的使用心得。

这里主要指 LLM，即大语言模型。vscode 中的官方推荐的是 copilot ，copilot 也是微软出品，相关插件主要是 GitHub Copilot，它是个插件包，除了包含它本身外，还包含 GitHub Copilot Chat，所以安装前者即可，它会自动安装后者。

Copilot 主要使用的是 OpenAI 的 ChatGPT，相比 deepseek 等，由于出的比较早，所以更加成熟，个人使用下来体验也非常不错，比较推荐。 Copilot 每月都有免费额度，基本够用了。

下面简单说下 vscode 的 AI 插件（主要是指 GitHub Copilot）能做哪些事：

1. 根据需求快速生成代码，需求描述得越清楚，则生成的代码越准确
2. 评审代码，提供修改意见，并能一键应用
3. 自动生成此次 commit 的 message
4. 协助写文章，如提供一些基础组件的介绍。有时介绍得比官方还清楚。
5. 协助解决问题，包括编译问题、工程问题、运行问题等，基本所有问题都能咨询它，还可以附上相关的上下文提供更准确的解决思路
6. ……

总之 AI 的功能非常强大，还有许多尚未发现。**但需要留意的是**，AI 可能犯常识性错误，或者一些低级错误，或者一些隐藏错误，因此，对于 AI 生成的东西，还是需要通过搜索引擎进一步验证。

### vim 相关插件

由于我习惯了 vim 的操作方式，而且 vim 的操作方式确实非常高效，所以 vscode 中的 vim 插件就显得格外重要了，那么 vim 插件有哪些呢？下面罗列如下：

* VSCode Neovim：500k+ 下载量
* Vim：也叫 VSCode Vim，7M+ 下载量
* nvim：17k+ 下载量

其中最值得使用的是 VSCode Neovim（ID 为 `asvetliakov.vscode-neovim`），它是当前（2025-06-16）更新最频繁，且最先进的 vim 相关插件。

该插件使用下来，发现还是有不少 bug 的，比如写 markdown 时容易出现些没有的字符，或者说字符错乱，以及有时会卡死，`jkl`都用不了，不管如何，该插件提供了一个重启的命令（`Neovim: Restart Extension`），重启可以解决以上问题。总体使用起来还是非常方便的。

后续还发现一个非常有意思的事，就是 LazyVim 和 vscode neovim 插件可以完美配合，详见 [VS Code \| LazyVim](https://www.lazyvim.org/extras/vscode)

### vcpkg

官方文档：[vcpkg 文档 \| Microsoft Learn](https://learn.microsoft.com/zh-cn/vcpkg/)

> vcpkg 是由 Microsoft 开发的跨平台 C/C++ 包管理工具，旨在简化 C/C++ 库的获取、安装和管理流程。它支持 Windows、Linux 和 macOS，可以自动下载、编译并集成第三方库到你的项目中。
> 
> **主要特点：**
> - 跨平台支持，适用于主流操作系统。
> - 丰富的库仓库，内置数千个常用 C/C++ 库。
> - 易于集成，支持 CMake、MSBuild 等主流构建系统。
> - 支持清单模式（manifest mode），可通过 `vcpkg.json` 文件声明依赖，方便团队协作和环境一致性。
> 
> **VS Code 相关支持：**
> - VS Code 的 [CMake Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cmake-tools) 扩展可以自动检测并集成 vcpkg 安装的库，无需手动配置 include 路径和链接库。
> - 通过 vcpkg 安装的库会自动被 VS Code 的 C/C++ 扩展（如 Microsoft C/C++ 扩展）识别，提供代码补全、跳转定义等智能提示功能。
> - 支持调试和构建集成，结合 vcpkg 管理依赖后，VS Code 可以无缝进行编译、调试和运行，无需手动配置复杂的依赖路径。
> - 在 VS Code 设置中搜索 `vcpkg`，可以看到如 `C_Cpp.vcpkg.enabled` 等相关配置项，方便集成和管理。
> 
> **总结：**
> vcpkg 极大简化了 C/C++ 项目的依赖管理流程，并与 VS Code 实现了深度集成，提升了开发效率和体验。对于使用 VS Code 进行 C/C++ 开发的用户，推荐结合 vcpkg 管理第三方库依赖。
> 
> ——引用自 AI

一些使用心得：

- triplet 是 vcpkg 中非常重要的概念，它决定了编译 C++ 库时使用的工具链（编译器），如 x64-windows 表示使用 MSVC 64 位编译器编译，如果要使用 mingw64 编译，则应将 triplet 设置为 x64-mingw-dynamic（动态链接） 或 x64-mingw-static（静态链接）。此外 x64-windows 默认包含 debug 和 release 两个版本，用于开发比较合适，因为通常需要先调试好再发布，调试期间可能用到 debug 版本的 C++ 库以便于定位问题。但如果不想要 debug 版本，可以使用 x64-windows-release 这一 triplet。关于 vcpkg 支持的 triplet 可以查看`vcpkg help triplet`
- 使用 vcpkg 通常需要导入其工具链 cmake，通常位于 `$env:VCPKG_ROOT/scripts/buildsystems/vcpkg.cmake`（pwsh 写法）
- vcpkg 有两个重要的环境变量：

  - VCPKG_ROOT：指示了 vcpkg 安装的根目录，如`D:\vcpkg\`
  - VCPKG_DEFAULT_TRIPLET：指示了默认的 triplet，建议设置 x64-windows
  
  此外还需要添加 vcpkg.exe 所在目录到 PATH 环境变量，添加后可以这样检查：

  ```pwsh
  PS C:\Users\wsxq2> $env:PATH -split ';' |sls vcpkg

  D:\vcpkg

  PS C:\Users\wsxq2> ls D:\vcpkg\*.exe

      Directory: D:\vcpkg

  Mode                 LastWriteTime         Length Name
  ----                 -------------         ------ ----
  -a---           2025/6/17    11:00        8474680 vcpkg.exe

  PS C:\Users\wsxq2> vcpkg --version
  vcpkg package management program version 2025-06-02-145689e84b7637525510e2c9b4ee603fda046b56

  See LICENSE.txt for license information.
  PS C:\Users\wsxq2>
  ```
- vcpkg 有缓存机制：vcpkg 会把所有已编译的包（无论是 classic 还是 manifest 模式）都缓存到 `C:\Users\<你的用户名>\AppData\Local\vcpkg\archives` 目录下。当你用 manifest 方式（vcpkg.json）管理依赖时，如果请求的包和 triplet 在缓存中已存在，vcpkg 会直接从缓存恢复，无需重新下载和编译。这大大加快了依赖安装速度。
- 推荐使用 manifest 模式，这也是官方推荐的使用方式，可以减少使用全局库造成的冲突和干扰，也更便于移植到另一台电脑
- vcpkg 是一种被 qt 官方支持的安装 qt 的方式，包括 qt5 和 qt6，当前尝试后发现编译能通过了，但运行时报 DLL 相关错误，尝试多个思路未解决。如果能使用该方式安装 qt，则可以简化过程，节约时间，qt 官方提供的在线安装器实在太慢了，且安装的东西太多了。一个参考链接：[安装 Qt5（使用 vcpkg）（在 Windows 上）](https://www.kkaneko.jp/tools/win/qt5.html#)
- vcpkg 类似于 python 中的 pip，用于安装 C++ 相关的库，由于 C++ 是编译型语言，预编译出二进制文件非常麻烦，且不通用，所以 vcpkg 选择的方式是下载源码并自动选择相应的工具链（由 triplet 决定，可设置系统环境变量 `VCPKG_DEFAULT_TRIPLET`）编译。
- `vcpkg integrate install`命令对于 vscode 使用方式而言不是必须的，它主要用于 vs。
- vcpkg 遇到编译失败问题时，优先更新编译器版本和 vcpkg 版本，后者主要通过以下几个命令完成：

  1. `git pull`: 切换到安装目录执行该命令以拉取最新的 C++ 库信息
  2. `vcpkg update`：列出可以升级的包。同样建议切换到安装目录执行，可添加 `./` 的前缀（即 `./vcpkg`），这会
  3. `vcpkg upgrade`：升级所有包，这会重新构建所有过时的包，耗时较长

- vcpkg 有强大的版本设置能力，详见 [教程：安装包的特定版本 | Microsoft Learn](https://learn.microsoft.com/zh-cn/vcpkg/consume/lock-package-versions?tabs=inspect-powershell)
- vcpkg 可以使用代理（不使用代理时下载通常很慢，因为源代码通常在 GitHub 上），在 pwsh 直接设置环境变量即可，可以使用如下函数进行设置：
  
  ```pwsh
  function Set-Proxy
  {
    param (
      [string]$ProxyUrl,
      [string]$Username,
      [string]$Password
    )

    if ($Username -and $Password)
    {
      $ProxyUrl = "http://$Username`:$Password@$ProxyUrl"
    }

    $env:HTTP_PROXY = $ProxyUrl
    $env:HTTPS_PROXY = $ProxyUrl

    Write-Host "Proxy set to $ProxyUrl"
  }
  ```
  
  使用例子:
  
  ```pwsh
  Set-Proxy http://127.0.0.1:7890
  ```
  
  可以使用如下函数取消代理：
  
  ```pwsh
  function Remove-Proxy
  {
    Remove-Item Env:HTTP_PROXY
    Remove-Item Env:HTTPS_PROXY

    Write-Host "Proxy removed"
  }
  ```
  
  然后执行 vcpkg 命令安装包时就会提示相关字样


### CMakePresets.json

官方文档：[cmake-presets(7) — CMake 4.0.3 Documentation](https://cmake.org/cmake/help/latest/manual/cmake-presets.7.html)

> `CMakePresets.json` 是 CMake 官方引入的一种标准化配置文件格式，用于统一管理和保存 CMake 的构建预设（Presets）。通过该文件，可以方便地定义不同的构建配置（如 Debug、Release）、生成器、工具链、缓存变量等，提升项目的可移植性和团队协作效率。
> 
> **主要特点：**
> - 支持多种构建预设（如不同平台、不同编译器、不同构建类型）。
> - 配置集中、结构清晰，便于版本控制和共享。
> - 支持继承和扩展，方便维护复杂项目的构建需求。
> 
> **VS Code 相关支持：**
> - VS Code 的 [CMake Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cmake-tools) 扩展原生支持 `CMakePresets.json`，可自动识别并加载其中定义的所有构建预设。
> - 在 VS Code 中打开项目后，可以在命令面板或底部状态栏中直接选择和切换不同的 CMake Preset，无需手动修改配置。
> - 支持与 vcpkg、远程开发等功能联动，提升跨平台和多环境开发体验。
> 
> **总结：**
> `CMakePresets.json` 让 CMake 项目的构建配置更加标准化和易于管理，配合 VS Code 使用可以大幅提升 C/C++ 项目的开发效率和和协作体验。
> 
> ——引用自 AI

一些使用心得：

- 才开始使用时建议只添加一个配置，把这个配置调好后再添加其他配置，添加其他配置时如果有可以复用的就充分利用其 inherit 机制，将可复用的部分提取出来。
- 其中尽可能多地添加相关配置和变量，以保证其可移植性，否则可能换个电脑就无法正常工作了。这里总结些遇到过的：

  - VCPKG_MANIFEST_MODE: 决定是否使用 vcpkg 的清单模式（局部安装包），默认为 ON，可以设置为 OFF，从而强制使用 classic 模式，即全局安装的包。
  - VCPKG_TARGET_TRIPLET: vcpkg 使用 triplet 概念决定工具链（编译器），非常重要。
  - QT_USE_VCPKG: 和 后面的 CMAKE_TOOLCHAIN_FILE 相关，那里使用了 qt.toolchain.cmake，该 cmake 中会检测 QT_USE_VCPKG 变量，如果为 ON 则会导入 vcpkg 的工具链 cmake
  - CMAKE_CXX_COMPILER：编译器，不指定可能会使用错误的编译器，这里不需要指定 MSVC 的全路径，直接写可执行文件名称即可，即使不在 PATH 环境变量中，vscode 检测到后也会自动导入 VS 2022 的开发环境，从而得到其全路径。
  - CMAKE_TOOLCHAIN_FILE：工具链 cmake，非常重要，例如使用 vcpkg 时就需要设置为 `D:\\vcpkg\\scripts\\buildsystems\\vcpkg.cmake`

- 如果暂时不希望 IDE 解析此文件但又不想删除，则可以将其重命名
- `CMAKE_TOOLCHAIN_FILE` 只能设置一个值，但部分工具链 cmake 文件可以自动识别并处理其他工具链 cmake 文件，例如 qt 的工具链文件 `D:/Qt/6.9.1/msvc2022_64/lib/cmake/Qt6/qt.toolchain.cmake` 可以自动处理 vcpkg 的工具链文件 `D:\\vcpkg\\scripts\\buildsystems\\vcpkg.cmake`，前提是设置 `QT_USE_VCPKG` 变量为 `ON` 或者在其他地方设置了 `CMAKE_TOOLCHAIN_FILE`（如命令行或 CMakeLists.txt 文件中）。

### 为什么如此执着于一个优秀的开发环境和测试环境？

可以看到，我对开发环境和测试环境的折腾非常之多，网络上也有非常多的志同道合之人。为什么大家热衷于此呢？原因很简单——**工欲善其事，必先利其器**，优秀的开发环境和测试环境可以大大提高开发效率和开发质量，举个例子，STM32 开发时使用 Keil 和 vscode 的对比，使用 Keil 写代码时无法流畅地使用自动补全，以致面对长单词时非常痛苦，敲了半天还非常容易敲错，最重要的是，它将程序员的注意力转移到了打字上，而非编码细节上，这会大大降低开发效率和质量，其他类似的例子还有很多。

因此，真的非常感谢那些“爱折腾”的人，他们常常深入细节，刻苦钻研，从而打造出一个比一个优秀的开发环境和测试环境，并且乐于分享。我们通常只需要站在巨人的肩膀上，学会使用即可，而无需深入实现细节。但如若遇到有需要的时候，我也乐于贡献出一份力量。
