---
tags: [VirtualBox]
---

<!-- vim-markdown-toc GFM -->

* [VirtualBox 使用物理硬盘作为虚拟机硬盘](#virtualbox-使用物理硬盘作为虚拟机硬盘)
  * [Linux](#linux)
  * [Windows](#windows)
  * [遇到的问题](#遇到的问题)
    * [VERR_SHARING_VIOLATION？](#verr_sharing_violation)
    * [VERR_ACCESS_DENIED？](#verr_access_denied)
* [链接](#链接)

<!-- vim-markdown-toc -->

## VirtualBox 使用物理硬盘作为虚拟机硬盘
官方相关文档：[VirtualBox手册第9章第9节第1小节](https://www.virtualbox.org/manual/ch09.html#rawdisk)

参考[CSDN: 让VirtualBox使用物理硬盘作为虚拟硬盘镜像](https://blog.csdn.net/dewafer/article/details/41366441) 和 [GitHub: VirtualBox 使用物理硬盘作为虚拟机硬盘](https://github.com/sintrb/techblog/blob/master/tools/virtualbox-using-a-raw-host-harddisk.md)

### Linux
```
fdisk -l
VBoxManage internalcommands listpartitions -rawdisk /dev/sda
VBoxManage internalcommands createrawvmdk -filename ~/mydisk.vmdk -rawdisk /dev/sda
```

### Windows
```
wmic diskdrive list brief
cd "C:\Program Files\Oracle\VirtualBox"
.\VBoxManage internalcommands listpartitions -rawdisk \\.\PhysicalDrive0 
.\VBoxManage internalcommands createrawvmdk -filename mydisk.vmdk -rawdisk \\.\PhysicalDrive0
```

### 遇到的问题
#### VERR_SHARING_VIOLATION？
1. 问题：
    ```
    Admin>VBoxManage internalcommands listpartitions -rawdisk \\.\PhysicalDrive0
    VBoxManage.exe: error: Cannot open the raw disk: VERR_SHARING_VIOLATION
    ```

1. 原因：磁盘被其它进程占用
1. 解决思路：找到占用该磁盘的进程，关闭它
1. 具体步骤：
   > The VERR_SHARING_VIOLATION comes up because a running process in the host is using the hard disk. You'll need to "release" it. Use the  ["Process Explorer"](https://docs.microsoft.com/en-us/sysinternals/downloads/process-explorer) from SysInternals to see who's responsible for that. You could actually download the whole  ["SysInternals Suite"](https://docs.microsoft.com/en-us/sysinternals/), invaluable set of tools.
   > 
   > In my case, I enabled the Admin mode (menu "File" » "Show Details for All Processes") and I used the menu "Find" » "Find Handle or DLL..." » "HardDisk0"

详情参考[VMDK: VERR_SHARING_VIOLATION](https://www.virtualbox.org/ticket/8760)(末尾)

#### VERR_ACCESS_DENIED？
问题；
```
SimpleUser>VBoxManage internalcommands listpartitions -rawdisk \\.\PhysicalDrive0
VBoxManage.exe: error: Cannot open the raw disk: VERR_ACCESS_DENIED
```
原因：权限不够
解决思路：以管理员身份运行即可


## 链接
下面总结了本文中使用的所有链接：

<!-- link start -->
* [VirtualBox手册第9章第9节第1小节](https://www.virtualbox.org/manual/ch09.html#rawdisk)
* [CSDN: 让VirtualBox使用物理硬盘作为虚拟硬盘镜像](https://blog.csdn.net/dewafer/article/details/41366441)
* [GitHub: VirtualBox 使用物理硬盘作为虚拟机硬盘](https://github.com/sintrb/techblog/blob/master/tools/virtualbox-using-a-raw-host-harddisk.md)
* ["Process Explorer"](https://docs.microsoft.com/en-us/sysinternals/downloads/process-explorer)
* ["SysInternals Suite"](https://docs.microsoft.com/en-us/sysinternals/)
* [VMDK: VERR_SHARING_VIOLATION](https://www.virtualbox.org/ticket/8760)

<!-- link end -->

<!-- abbreviations start -->

<!-- abbreviations end -->
