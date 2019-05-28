---
tags: [SSH,Secure Shell, OpenSSH, Dropbear, 非对称加密]
last_modified_time: 2019-05-28 22:04:09 +0800
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

### Dropbear

## 链接
下面总结了本文中使用的所有链接：

<!-- link start -->

<!-- link end -->
