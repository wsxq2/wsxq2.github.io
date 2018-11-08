---
layout: post
tags: [VirtualBox, MacOS]
categories: blog
---


<!-- vim-markdown-toc GFM -->

* [1 安装 Virtual Box](#1-安装-virtual-box)
* [2 下载 MacOS 虚拟机的 `.vmdk` 文件](#2-下载-macos-虚拟机的-vmdk-文件)
* [3 创建 MacOS 虚拟机](#3-创建-macos-虚拟机)
* [4 设置 MacOS 虚拟机](#4-设置-macos-虚拟机)
* [5 使用 CMD 添加代码到 Virtual Box](#5-使用-cmd-添加代码到-virtual-box)
* [6 其它问题](#6-其它问题)
* [7 参考链接](#7-参考链接)

<!-- vim-markdown-toc -->

### 1 安装 Virtual Box
1. 下载：
   1. 官网：<https://www.virtualbox.org/>，进入后点击**Downloads**，再点击[**Windows hosts**](https://download.virtualbox.org/virtualbox/5.2.20/VirtualBox-5.2.20-125813-Win.exe)下载。不科学上网可能会很慢。
   2. 西电开源镜像站（校外无法访问）：<https://linux.xidian.edu.cn/>，进入后点击**开源镜像**，滑到页面底端，点击**VirtualBox**，选择**[virtualbox-Win-latest.exe](https://linux.xidian.edu.cn/mirrors/virtualbox/virtualbox-Win-latest.exe)**以下载。开源镜像站几乎每个大学都有，强烈推荐使用本校的开源镜像站下载各种开源软件（速度超快）。当然也可以使用部分其它大学的，如中科大开源镜像站：<http://mirrors.ustc.edu.cn/>
2. 安装：一路**Next**即可。

### 2 下载 MacOS 虚拟机的 `.vmdk` 文件
1. 下载链接（共 6 个 rar 压缩包，需要科学上网）：[macOS High Sierra 10.13.6 Final (6 of 6)](https://drive.google.com/drive/folders/1G8tLAdllZq-lxp91DJ2K1VVz-2yY1z2S)
2. 使用 7zip（推荐） 或 WinRAR 解压缩：解压缩第一个即可，它会自动解压其它文件（因为它们是一个整体）

### 3 创建 MacOS 虚拟机
设置如下：
```
Name: macOS 10.13 High Sierra
Type: Mac OS X
Version: macOS 10.13 or 10.12
Memory size: 3GB to 6GB ( 65% of your RAM)
Virtual disk file: macOS high Sierra 10.13.vmdk
```
其中`Virtual disk file`即刚刚解压缩的.vmdk文件

### 4 设置 MacOS 虚拟机
选中刚刚创建的 MacOS 虚拟机，然后**CTRL+S**打开设置面板，修改如下设置：
1. 系统:
   1. 主板:  启用 **EFI**, 修改**芯片组**为 PIIX3 或 IHC9
   2. 处理器:  设置**处理器数量**为 2（更高也可以） 并启用 **PAE/NX**. 
2. 显示：改变**显存大小**为 128 MB.
3. （可选）网络：添加**仅主机（Host-Only）网络**

### 5 使用 CMD 添加代码到 Virtual Box
打开cmd（**`Win+S`->输入`cmd`->右键->以管理员身份运行**），输入以下命令，注意替换命令中的相应内容（如**"Your Virtual Machine Name"**根据上面的设置应为`macOS 10.13 High Sierra`）
<pre>
cd "C:\Program Files\Oracle\VirtualBox\"
VBoxManage modifyvm "Your Virtual Machine Name" --cpuidset 00000001 000106e5 00100800 0098e3fd bfebfbff
VBoxManage setextradata "Your Virtual Machine Name" "VBoxInternal/Devices/efi/0/Config/DmiSystemProduct" "iMac11,3"
VBoxManage setextradata "Your Virtual Machine Name" "VBoxInternal/Devices/efi/0/Config/DmiSystemVersion" "1.0"
VBoxManage setextradata "Your Virtual Machine Name" "VBoxInternal/Devices/efi/0/Config/DmiBoardProduct" "Iloveapple"
VBoxManage setextradata "Your Virtual Machine Name" "VBoxInternal/Devices/smc/0/Config/DeviceKey" "ourhardworkbythesewordsguardedpleasedontsteal(c)AppleComputerInc"
VBoxManage setextradata "Your Virtual Machine Name" "VBoxInternal/Devices/smc/0/Config/GetKeyFromRealSMC" 1
</pre>

成功后就大功告成了，直接运行虚拟机，完成虚拟机内的配置即可

### 6 其它问题
1. 不能全屏？按如下步骤修改屏幕分辨率：
   1. 关闭 MacOS 虚拟机
   2. 打开cmd（**`Win+S`->输入`cmd`->右键->以管理员身份运行**）
   3. 运行如下命令：
      ```
      cd "C:\Program Files\Oracle\VirtualBox"
      VBoxManage setextradata "Your Virtual Machine Name" VBoxInternal2/EfiGraphicsResolution 1920x1080
      ```
      其中**"Your Virtual Machine Name"**根据上面的设置应为`macOS 10.13 High Sierra`）
   4. 启动你的 MacOS 虚拟机

2. 安装 VirtualBox 增强功能？
   
   由官网给出的[`Virtualbox Manual : Chapter 14: Known limitations`](https://www.virtualbox.org/manual/ch14.html)中的`14.2. Known Issues`中的`Mac OS X guests:`可知:

   > #### 14.2. Known Issues
   > * Mac OS X guests:
   >   * VirtualBox does not provide Guest Additions for Mac OS X at this time

   即**VirtualBox 目前不提供 Mac OS X 的增强功能**

### 7 参考链接
* [HOW TO INSTALL MACOS HIGH SIERRA IN VIRTUALBOX ON WINDOWS 10](https://saintlad.com/install-macos-high-sierra-in-virtualbox-on-windows-10/)
* [Changing Screen Resolution of Mac OS VirtualBox Guest](https://scribles.net/changing-screen-resolution-of-mac-os-virtualbox-guest/)
