---
tags: [SSH,Secure Shell, OpenSSH, Dropbear, 非对称加密, TODO]
last_modified_time: 2019-11-15 22:25:50 +0800
---

Secure Shell（SSH）是一种加密的应用层网络协议，用于在**不安全的网络**上**安全地**运行网络服务。典型应用包括**远程命令行登录**和**远程命令执行**。事实上，可以使用 SSH 保护任何网络服务。

协议规范区分了两个主要版本，称为 SSH-1 和 SSH-2。SSH 的标准 TCP 端口是22. SSH 通常用于访问类 Unix 操作系统，但也可以用于访问 Microsoft Windows（Windows 10 1809 版本已在**设置**中的**应用和功能**中的**管理可选功能**中提供服务端 OpenSSH）。Windows 10 使用 OpenSSH 作为其默认 SSH 客户端（1709 版本后）

SSH 被设计为替代 Telnet 和其它不安全的远程 shell 协议，例如 Berkeley rlogin，rsh 和 rexec 协议。这些协议以明文形式发送信息（包括密码），使得它们易于使用数据包分析器（如 wireshark ）进行嗅探。SSH 使用的加密旨在通过不安全的网络（如Internet）提供数据的机密性和完整性

更多内容请参见 [安全外壳 - 维基百科](https://en.wikipedia.org/wiki/Secure_Shell)

<p id="markdown-toc"></p>
<!-- vim-markdown-toc GFM -->

* [原理](#原理)
  * [公钥密码学](#公钥密码学)
    * [简介](#简介)
    * [产生目的](#产生目的)
    * [公钥密码体制](#公钥密码体制)
* [应用](#应用)
  * [远程 Shell](#远程-shell)
  * [备份文件](#备份文件)
  * [实现 VPN](#实现-vpn)
  * [转发 X11](#转发-x11)
  * [SOCKS 代理](#socks-代理)
  * [保护文件传输协议](#保护文件传输协议)
* [实现](#实现)
  * [OpenSSH](#openssh)
    * [简介](#简介-1)
    * [安装和配置](#安装和配置)
      * [Linux](#linux)
        * [Ubuntu](#ubuntu)
        * [CentOS](#centos)
      * [Windows 10](#windows-10)
  * [PuTTY](#putty)
    * [基本使用](#基本使用)
    * [保存设置](#保存设置)
    * [界面配置](#界面配置)
    * [配置公私钥登录](#配置公私钥登录)
    * [遇到的问题](#遇到的问题)
      * [`pscp`无响应？](#pscp无响应)
      * [`pscp`复制文件到 Linux 后中文文件名乱码？](#pscp复制文件到-linux-后中文文件名乱码)
  * [Dropbear](#dropbear)
* [链接](#链接)

<!-- vim-markdown-toc -->

## 原理
SSH 使用了公钥加密系统，因此，为了解其原理，我们需要了解公钥密码学
### 公钥密码学
#### 简介
公钥加密也被称为非对称加密，是 20 世纪 70 年代才出现的；与之相对的是单钥加密，单钥加密也被称为对称加密、传统加密。在公钥加密出现前，几乎所有的密码体制都是基于**替换**和**置换**这些初等方法。公钥加密则不同，首先，公钥算法是基于**数学函数**而不是基于替换和置换；其次，公钥密码是非对称的，它使用**两个独立的密钥**（公钥和私钥）。使用两个密钥在**消息的保密性**、**密钥分配**和**认证**领域有着重要意义。但是，对于公钥加密存在如下几大误解：
1. 从密码分析的角度看，公钥密码比传统密码更安全。事实上，任何加密方法的安全性依赖于密钥的长度和破译密文所需要的计算量
1. 公钥密码是一种通用的方法，所以传统密码已经过时。其实正相反，由于现有的公钥密码方法所需的计算量大，所以取缔传统密码似乎不太可能
1. 传统密码中与密钥分配中心的会话是一件异常麻烦的事情，与之相比，用公钥密码实现密钥分配则非常简单。事实上，使用公钥密码也需要某种形式的协议，该协议通常包含一个中心代理，并且它所包含的处理过程既不比传统密码中的那些过程更简单，也不比之更有效

#### 产生目的
为了解决如下问题：
* 密钥分配问题。即传统密码学无法很好地实现密钥分配的问题。其可能的方法如下：
  * 通过某种方法，如电话、短信、email等
  * 利用密钥分配中心。然而这有悖于密码学的精髓
* “数字签名”问题。如同手写签名一样，电子消息和文件也需要签名以确认来源。即能否设计一种方法，它能确保数字签名是出自某个特定的人，并且双方对此均无异议？

#### 公钥密码体制
特点：


## 应用

### 远程 Shell
登录远程主机上的 shell（替换 Telnet 和 rlogin）

### 备份文件
与rsync结合使用可高效，安全地备份，复制和镜像文件

### 实现 VPN
用作完整的加密 VPN。请注意，只有 OpenSSH 服务器和客户端支持此功能。

### 转发 X11
从远程主机转发X（可能通过多个中间主机）

### SOCKS 代理
> &emsp;&emsp;-N      Do not execute a remote command.  This is useful for just forwarding ports.
> 
> &emsp;&emsp;-D port
> 
> &emsp;&emsp;&emsp;&emsp;This works by allocating a socket to listen to port on the local side, and whenever a connection is made to this port, the connection is forwarded over the secure channel, and the application protocol is then used to determine where to connect to from the remote machine. Currently the SOCKS4 and SOCKS5 protocols are supported, and ssh will act as a SOCKS server. Only root can forward privileged ports. Dynamic port forwardings can also be specified in the configuration file.
>
> &emsp;&emsp;——引用自 `man ssh`

```
ssh -ND 12345 -p 22  <user>@<hostname>
```

上述命令将在本地端口`12345`处监听连接，并将发送至该端口的内容转发至你连接的 SSH 服务器。可以用来快速实现科学上网（前提是你的那个服务器是国外的）

### 保护文件传输协议
例如 SFTP

## 实现
### OpenSSH
#### 简介
OpenSSH（也称为 OpenBSD Secure Shell）是一套基于Secure Shell（SSH）协议的安全网络实用程序。OpenSSH 不是一个单独的计算机程序，而是一套程序，可以替代未加密的协议，如 Telnet 和 FTP 。OpenSSH 集成在多个操作系统中，包括 Linux、MacOS、Windows。其中 Windows 有点特殊：2015 年 10 月 19 日，微软才宣布 OpenSSH 将在 Microsoft Windows 上得到本机支持，并可通过 PowerShell 访问。不过自 1803 版本以来，基于 OpenSSH 的客户端和服务器程序已包含在 Windows 10 中。默认情况下，SSH 客户端已启用并可用，SSH 服务器是可选的按需功能（通过**设置**中的**应用和功能**中的**管理可选功能**来启用或关闭该功能）。

OpenSSH 套件包括以下命令行实用程序和守护程序：

* `scp`: `rcp`的替代品
* `sftp`: 替换`ftp`以在计算机之间复制文件
* `ssh`: `rlogin`，`rsh`和`telnet`的替代品，允许 shell 访问远程机器。
* `ssh-add`和`ssh-agent`: 通过保持密钥就绪来简化身份验证的实用程序，避免每次使用密码时都需要输入密码
* `ssh-keygen`: 一种检查和生成用于用户和主机身份验证的`RSA`， `DSA`和`Elliptic Curve`密钥的工具
* `ssh-keyscan`: 扫描主机列表并收集其公钥
* `sshd`: SSH 服务器守护进程

详情参见 [OpenSSH - 维基百科](https://en.wikipedia.org/wiki/OpenSSH)

#### 安装和配置
##### Linux
###### Ubuntu
```
apt install openssh-server openssh-client
```
相关配置文件在`/etc/ssh/`目录中，其中用于客户端的主配置文件为`/etc/ssh/ssh_config`，用于服务器端的主配置文件为`/etc/ssh/sshd_config`。

###### CentOS
```
yum install openssh-server openssh-clients openssh
```
和 Ubuntu 相同：相关配置文件在`/etc/ssh/`目录中，其中用于客户端的主配置文件为`/etc/ssh/ssh_config`，用于服务器端的主配置文件为`/etc/ssh/sshd_config`。

##### Windows 10
1. 打开**应用和功能**设置：`Win+X,F`
1. 点击**管理可选功能**
1. 点击**添加功能**
1. 找到并安装**OpenSSH服务器**

如果没有的话（实测**Windows10 家庭版 1803**和**专业版 1809**均有），可到 [OpenSSH 官网](https://www.openssh.com/)下载

配置及更详细的内容请参见 [OpenSSH in Windows \| Microsoft Docs](https://docs.microsoft.com/en-us/windows-server/administration/openssh/openssh_overview)

如果要配置通过公钥/私钥登录，可参见 [OpenSSH Server Configuration for Windows \| Microsoft Docs](https://docs.microsoft.com/en-us/windows-server/administration/openssh/openssh_keymanagement)，然后你会发现其中要求使用如下命令安装`OpenSSHUtils`模块
```
Install-Module -Force OpenSSHUtils -Scope AllUsers
```

但事实上，这一步会在努力后失败（至少我是这样的），解决方法是手动安装`OpenSSHUtils`模块，即在[openssh-portable/contrib/win32/openssh at latestw_all · PowerShell/openssh-portable](https://github.com/PowerShell/openssh-portable/tree/latestw_all/contrib/win32/openssh)处下载`OpenSSHUtils.psd1`和`OpenSSHUtils.psm1`文件，并将它们放到`C:\Users\wsxq2\Documents\WindowsPowerShell\Modules\OpenSSHUtils\`目录中（没有则新建），这样就算安装完成了。详情参见：[How to install PowerShell modules](https://activedirectorypro.com/install-powershell-modules/)

然后就可以继续后面的步骤了

如果依然发现不能使用公钥/私钥登录你的 Windows 服务器，可参见如下链接： [ssh - Setting up OpenSSH for Windows using public key authentication - Stack Overflow](https://stackoverflow.com/questions/16212816/setting-up-openssh-for-windows-using-public-key-authentication#answer-50502015)

### PuTTY
* 官网：<https://www.putty.org/>
* 最新版下载链接：<https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html>

PuTTY 是一个软件包，包含如下组件:

> * `PuTTY`: the Telnet, rlogin, and SSH client itself, which can also connect to a serial port
> * `PSCP`: an SCP client, i.e. command-line secure file copy. Can also use SFTP to perform transfers
> * `PSFTP`: an SFTP client, i.e. general file transfer sessions much like FTP
> * `PuTTYtel`: a Telnet-only client
> * `Plink`: a command-line interface to the PuTTY back ends. Usually used for SSH Tunneling
> * `Pageant`: an SSH authentication agent for PuTTY, PSCP and Plink
> * `PuTTYgen`: an RSA, DSA, ECDSA and EdDSA key generation utility
> * `pterm`: (Unix version only) an X11 client which supports the same terminal emulation as PuTTY
> 
> ——引用自 [PuTTY - Wikipedia](https://en.wikipedia.org/wiki/PuTTY)

#### 基本使用
打开 PuTTY，在**Host Name**中填写你的服务器的 IP 地址，在**Port**处填写你的服务器的 SSH 服务使用的端口，在**Connection type**处选择**SSH**（默认使用的就是**SSH**，这里提一下是为了以防万一）

然后点击 **Open** 即可

#### 保存设置
很多新人使用 PuTTY 时都会为如何保存设置而感到苦恼，事实上非常简单：
1. 打开 PuTTY
2. 设置。包含**Host Name**等等
3. 在 **Saved Sessions** 处输入一个你喜欢的名字，点击右边的 **Save** 即可
4. 此后只需双击你保存的 Session 名就可以了

#### 界面配置
可以看到，PuTTY 默认的界面和字体极为丑陋。但我们只需简单设置一下就可以让它变得相对好看：
1. 打开 PuTTY。`Win+S` -> 输入`putty` -> 回车
2. 在左侧的 **Category** 的 **Windows** 下点击 **Appearance**
3. 设置字体。在 **Font setting** 处点击 **Change**，字体选择 **Consolas**（笔者推荐，你也可以选择自己喜欢的），大小选择 **14**
4. 设置其他内容。
5. 保存。保存方法参见上一节

#### 配置公私钥登录
上传 SSH 客户端的公钥到服务器以方便以后登录（即使用公私钥认证而非用户密码认证，公私钥认证的优点在于不需要每次手动输入密码）。具体方法如下（以 Windows10 上的 PuTTY 客户端为例）：
1. 使用`PuTTYgen`工具生成公私钥对。具体步骤如下：
   1. 打开 PuTTYgen。按快捷键`Win+S`->输入`puttygen`->回车
   1. 生成公私钥对。点击 **Generate**->随意晃动鼠标以生成随机参数->生成完成
1. 复制公钥到剪贴板。全选**Public key for pasting into OpenSSH authorized_keys file**下面的文本框中的内容，按`Ctrl+C`复制到剪贴板
1. 保存私钥到安全的位置。点击 **Save private key**->点击**确定**（为了方便不设置 passphrase，passphrase 相当于一个用于保护私钥文件的密码，如果设置了的话，每次使用私钥文件时都会要求输入 passphrase，除非使用 Pageant 工具）->选定要保存到的目录（建议放到个人目录`C:\Users\<username>\putty`中，注意其中`<username>`要替换成你自己的用户名）->**确定**
1. 上传公钥到 VPS。使用 PuTTY 以用户密码的登录方式登录你的 VPS。登录成功后，使用如下命令：
   ```
   echo '<公钥>' >> ~/.ssh/authorized_keys
   ```
   其中`<公钥>`是你之前生成的公私钥对中的**Public key**，在 PuTTY 中可以使用`Shift+Insert`粘贴剪贴板的内容（`Ctrl+Insert`是复制）
1. 配置 PuTTY。具体步骤如下：
   1. 打开 PuTTY。`Win+S`->输入`putty`->回车
   1. 设置主机和端口。在主界面输入**Host Name**、**Port**
   1. 设置默认登录用户名。在 PuTTY 主界面点击左侧的**Connection**中的**Data**，在**Login Details**处的**Auto-login username**处输入`root`（通常是使用`root`登录 VPS）
   1. 设置使用的私钥文件。点击左侧的**Connection**中的**SSH**中的**Auth**，在**Authentication Parameters**处点击**Browse**，选择你刚刚保存的私钥文件
   1. 设置字体和大小（可选）。PuTTY 默认的字体和字体大小过于丑陋，可以简单设置一下。点击**Window**中的**Apprearance**中**Font setting**处的**Change**，**Font**处输入`consolas`，**Size**选择`14`，点击**OK**
   1. 保存为一个会话。点击左侧的**Session**回到主界面，在**Saved session**处输入`bwg`（或者一个你喜欢的名字），然后点击右下侧的**Save**。
1. 使用公私钥登录。打开 PuTTY，双击**Saved session**中的`bwg`即可

#### 遇到的问题
##### `pscp`无响应？
检查你的服务器上的`.bashrc`文件，看其中是否有输出命令（例如使用了`echo`），有输出的话将相关语句删除。参见 [PuTTY FAQ](https://the.earth.li/~sgtatham/putty/0.71/htmldoc/AppendixA.html#faq-trouble)中`PSCP`相关内容

##### `pscp`复制文件到 Linux 后中文文件名乱码？
使用`convmv`工具将文件名编码从`gbk`变为`utf8`：
```
yum install convmv -y
convmv -f gbk -t utf8 -r --notest .
```

### Dropbear


## 链接
下面总结了本文中使用的所有链接：

<!-- link start -->

<!-- link end -->
