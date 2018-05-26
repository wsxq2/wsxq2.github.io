---
layout: post
tags: [CentOS,sftp]
categories: blog
---

**注意**：此教程是在网站的根目录（`/var/www/html/`）下搭建sftp
## 搭建
A. 创建一个用户组`sftp`和用户`website`，并设置密码:
```bash
groupadd sftp
useradd -g sftp -s /bin/false -d /var/www/html/ website
passwd website
```

B. 编辑sftp(sshd)的配置文件: `vim /etc/ssh/sshd_config`, 作如下修改：
1. 在`Subsystem      sftp    /usr/libexec/openssh/sftp-server`前面添加`#`号
2. 末尾添加：（部分有的话就直接修改）
```sshdconfig
Subsystem       sftp    internal-sftp  ##指定使用sftp服务使用系统自带的internal-sftp  
Match Group sftp  ##匹配sftp组的用户，如果要匹配多个组，多个组之间用逗号分割  
ChrootDirectory /var/www/html/ ##sftp主目录指定到/var/www/html/
ForceCommand    internal-sftp  ##指定sftp命令  
AllowTcpForwarding no  ##用户不能使用端口转发
X11Forwarding no   ##用户不能使用端口转发 
```

C. 设定sftp的主目录权限
```bash
chown root:apache /var/www/html/  #文件夹所有者必须为root，用户组可以不是root
chmod 744 /var/www/html  #权限不能超过755，否则会导致登录报错，可以是755
```

**注意**: 错误的目录权限设定会导致在log(/var/log/secure)中出现**”fatal: bad ownership or modes for chroot directory XXXXXX”**, 目录的权限设定有两个要点：
1. 由ChrootDirectory指定的目录开始一直往上到系统根目录为止的目录拥有者都只能是root
2. 由ChrootDirectory指定的目录开始一直往上到系统根目录为止都不可以具有群组写入权限

D. 在sftp主目录下创建一个`uploads`文件夹，并设置所有者为`website`，用户组为`sftp`
```bash
mkdir /var/www/html/uploads/
chown website:sftp /var/www/html/uploads/
chmod 744 /var/www/html/uploads/
```

E. 重启`sshd`服务: `systemctl restart sshd.service`

## 登陆
1. linux：`sftp website@ip地址`
2. windows：并不自带sftp命令，只能通过下载ftp连接工具，比如xftp，filezilla, 或者flashfxp等等 

## 参考链接
1. [Centos7搭建sftp服务](https://www.idaobin.com/archives/184.html)
2. [ Centos 7 搭建 sftp ](https://blog.csdn.net/qq_16681279/article/details/78022382)
