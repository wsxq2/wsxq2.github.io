---
layout: post
tags: [VirtualBox]
categories: blog
---

<!-- vim-markdown-toc GFM -->

* [安装增强功能（Guest Additions）](#安装增强功能guest-additions)
  * [Ubuntu](#ubuntu)
* [链接](#链接)

<!-- vim-markdown-toc -->

## 安装增强功能（Guest Additions）
安装增强功能用于方便主机和虚拟机间的操作，如共享剪贴板、支持拖放、主机共享文件夹。下面将先下载 VirtualBox 扩展包并在全局设置中安装。

1. 下载`VirtualBox Extension Pack`: [Oracle_VM_VirtualBox_Extension_Pack-5.2.12-122591.vbox-extpack](https://linux.xidian.edu.cn/mirrors/virtualbox/5.2.12/Oracle_VM_VirtualBox_Extension_Pack-5.2.12-122591.vbox-extpack)
2. 打开VirtualBox: **管理->全局设定->扩展->添加新包图标->选择下载的`Oracle_VM_VirtualBox_Extension_Pack`->打开->确定**

此后便可给虚拟机安装增强功能了

### Ubuntu
1. 打开虚拟机 Ubuntu
2. 在打开的 Ubuntu 虚拟机中的菜单栏中点击**设备->安装增强功能**。如果虚拟机出现提示，按提示操作即可完成安装，之后重启(重启命令：`reboot`)即可。如果未出现提示，可以手动执行如下操作：
   1. 挂载安装增强功能的光盘。先使用`lsblk`查看安装增强功能的光盘是否存在：
      ```
      wsxq2@ubuntu-server:~$ lsblk
      NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
      sda      8:0    0   10G  0 disk
      ├─sda1   8:1    0    9G  0 part /
      ├─sda2   8:2    0    1K  0 part
      └─sda5   8:5    0  975M  0 part [SWAP]
      sr0     11:0    1   82M  0 rom
      ```
   
      可以看到安装增强功能的光盘存在且在`/dev/sr0`，使用如下命令将其挂载到`/mnt/cd`
      
      ```
      wsxq2@ubuntu-server:~$ mkdir /mnt/cd/ # 如果已有该目录可以跳过这一步
      wsxq2@ubuntu-server:~$ mount /dev/sr0 /mnt/cd/ # 挂载设备 /dev/sr0 到 /mnt/cd 目录
      ```

   2. 安装。在光盘目录中使用`./VBoxLinuxAdditions.run`命令安装增强功能
      ```
      wsxq2@ubuntu-server:~$ cd /mnt/cd # 切换工作目录到用于安装增强功能的光盘中
      wsxq2@ubuntu-server:cd$ ls
      AUTORUN.INF  cert  OS2           TRANS.TBL                VBoxDarwinAdditionsUninstall.tool  VBoxSolarisAdditions.pkg        VBoxWindowsAdditions.exe
      autorun.sh   NT3x  runasroot.sh  VBoxDarwinAdditions.pkg  VBoxLinuxAdditions.run             VBoxWindowsAdditions-amd64.exe  VBoxWindowsAdditions-x86.exe
      wsxq2@ubuntu-server:cd$ ./VBoxLinuxAdditions.run
      ....
      ```

此时增强功能已安装完成，下面将为虚拟机开启剪贴板共享、拖放支持、共享主机文件夹`d:\`。

1. 开启剪贴板共享、拖放支持：**控制->设置->常规->高级->共享粘贴板:双向->拖放:双向->确定**
2. 共享主机文件夹`d:\`:

   1. **控制->设置->共享文件夹->点击添加共享文件夹图标->共享文件夹路径（此处填写要共享的文件夹，这里我填的是`d:\`，以共享整个 D 盘)->共享文件夹名称（此处填写一个共享文件夹名称，我填的`d`，后面修改`/etc/fstab`文件时会用到）->勾选固定分配->确定**
   2. 在虚拟机中打开终端(`Ctrl+Alt+T`)，输入如下命令(`#`后面的内容为注释，`` ` ``用于界定，不用输入)：

      <pre>
      sudo gedit /etc/fstab # 此处会要求输入密码（安装时设置的密码）(因为使用sudo意味着将执行危险操作，故要求验证身份)，
                            # 然后会打开一个文件编辑器(gedit)编辑/etc/fstab文件，
                            # 在该文件末尾添加如下内容：
                            # `d  /mnt/d  vboxsf  defaults  0  0`
                            # 然后Ctrl+S保存，Ctrl+Q退出，继续输入如下命令:
      sudo mkdir /mnt/d
      sudo mount -a
      </pre>


## 链接
下面总结了本文中使用的所有链接：

<!-- link start -->

<!-- link end -->

<!-- abbreviations start -->

<!-- abbreviations end -->
