---
layout: post
tags: [CentOS,LAMP]
categories: blog
---

## 一、安装Apache
`yum install httpd #根据提示，输入Y安装即可成功安装`

## 二、安装MariaDB
CentOS 7 中，已经使用MariaDB替代了MySQL数据库
1. 安装MariaDB
```bash
yum install mariadb mariadb-server #询问是否要安装，输入Y即可自动安装,直到安装完成
cp /usr/share/mysql/my-huge.cnf /etc/my.cnf #拷贝配置文件（注意：如果/etc目录下面默认有一个my.cnf，直接覆盖即可）
```

2. 为root账户设置密码: `mysql_secure_installation`

3. (可选)远程连接MariaDB: `firewall-cmd --zone=public --add-service=mysql --permanent`, 
测试：`mysql -h $MySQL_IP -u $MySQL_User -p $Database`


## 三、安装PHP
1、安装`php`, `php-devel`, `php-mysqlnd`: `yum install php php-devel php-mysqlnd #根据提示输入Y直到安装完成`
, 重启`mariadb`, `httpd`服务: 
```bash
systemctl restart mariadb.service #重启MariaDB
systemctl restart httpd.service #重启apache
```

## 四、验证

```bash
cd /var/www/html
vi index.php #输入下面内容
<?php
phpinfo();
?>
:wq! #保存退出
```

## 五、可能出现的问题

1. 防火墙未配置(开放相应的端口), 配置如下：
```bash
firewall-cmd --permanent --zone=public --add-service=http
firewall-cmd --permanent --zone=public --add-service=https
firewall-cmd --reload
```

2. 未关闭SELINUX, 修改`/etc/selinux/config`:
```
SELINUX=enforcing #修改enforcing为disabled
#SELINUXTYPE=targeted #注释掉
```
使配置立即生效: `setenforce 0`

## 参考链接
1. [http://php.net/manual/zh/mysql.installation.php](http://php.net/manual/zh/mysql.installation.php)
2. [How to Allow MySQL Traffic using firewalld on CentOS 7](https://wiki.mikejung.biz/Firewalld)
3. [CentOS 7 安装配置LAMP服务器方法(Apache+PHP+MariaDB) ](https://my.oschina.net/sallency/blog/467647)
