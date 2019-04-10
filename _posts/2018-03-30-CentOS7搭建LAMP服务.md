---
tags: [CentOS,LAMP]
---

本文讲解在 CentOS 7 上如何搭建 LAMP 服务。应注意到 MariaDB 和 SQL 非常相似（MariaDB fork from MySQL），所以它们的好多命令是一样的，本文没有严格区分。下面是本文的目录：

<!-- vim-markdown-toc GFM -->

* [1 什么是 LAMP ?](#1-什么是-lamp-)
* [2 安装 Apache](#2-安装-apache)
* [3 安装 MariaDB](#3-安装-mariadb)
* [4 安装 PHP](#4-安装-php)
* [5 验证](#5-验证)
* [6 可能出现的问题](#6-可能出现的问题)
* [7 参考链接](#7-参考链接)

<!-- vim-markdown-toc -->

## 1 什么是 LAMP ?
维基百科 [WIKI: LAMP][wiki-lamp] 中给出了如下说明：

[wiki-lamp]:https://zh.wikipedia.org/wiki/LAMP

> LAMP是指一组通常一起使用来运行动态网站或者服务器的自由软件名称首字母缩写：
> 
> * Linux，操作系统
> * Apache，网页服务器
> * MariaDB或MySQL，数据库管理系统（或者数据库服务器）
> * PHP、Perl或Python，脚本语言

关于数据库管理系统，有一个比较权威的排名：[DB-Engines Ranking](https://db-engines.com/en/ranking)

## 2 安装 Apache
1. 安装 Apache
   ```
   yum install httpd #根据提示，输入Y安装即可成功安装
   ```
   
2. 配置防火墙，以使 http 服务可以被远程访问:
   ```
   firewall-cmd --zone=public --add-service=http --permanent 
   firewall-cmd --reload
   ```
   
3. 检查 httpd 服务的状态：
   ```
   systemctl status httpd
   ```


## 3 安装 MariaDB
CentOS 7 中，已经使用MariaDB替代了MySQL数据库
1. 安装 MariaDB
   ```bash
   yum install mariadb mariadb-server #询问是否要安装，输入Y即可自动安装,直到安装完成
   cp /usr/share/mysql/my-huge.cnf /etc/my.cnf #（可选）拷贝配置文件（注意：如果/etc目录下面默认有一个my.cnf，直接覆盖即可）
   ```

2. 检查 MariaDB 的状态：
   ```
   systemctl status mariadb
   ```
   
3. 为root账户设置密码（根据提示操作）: 
   ```
   mysql_secure_installation
   ```
   
4. (可选)为某一项目创建相应的用户以提高安全性：
   ```
   DROP USER 'wsxq'@'%';
   CREATE USER 'wsxq'@'%' IDENTIFIED BY '658231';
   GRANT ALL PRIVILEGES ON bus.* TO 'wsxq'@'%';
   ```
   
   

5. (可选)让 root 用户远程连接MariaDB（默认情况下拒绝 root 用户远程连接数据库）: 
   1. 通过授权实现远程连接：
      ```sql
      UPDATE USER SET host = '%' WHERE user = 'root'; # 或者
      GRANT ALL PRIVILEGES ON . TO root@'%' IDENTIFIED BY "root";
      ```
   
   2. 在防火墙中打开相应的端口：
      ```
      firewall-cmd --zone=public --add-service=mysql --permanent 
      firewall-cmd --reload
      ```

   3. 在你的客户机上测试：

      ```bash
      mysql -h <MySQL_IP> -u <MySQL_User> -p <Database> # 执行后会让你输入相应用户的密码
      ```


## 4 安装 PHP
1. 安装 php 和 php-mysqlnd: 
   
   ```
   yum install php php-mysqlnd # 根据提示输入Y直到安装完成
   ```
   
   其中`php-mysqlnd`即`mysql native driver`简写,即是由 PHP 源码提供的 mysql 驱动连接代码。它的目的是代替旧的`libmysql`驱动。详情参考： [PHP 5.3.0以上推荐使用mysqlnd驱动- 老张的自言自语- ITeye博客][mysqlnd]
   
   [mysqlnd]:http://zhangxugg-163-com.iteye.com/blog/1894990
   
2. 重新启动`mariadb`和`httpd`以使其生效：
   ```bash
   systemctl restart mariadb httpd
   ```

## 5 验证
1. 验证`php`:
   ```bash
   cd /var/www/html
   vim index.php #输入下面内容
   <?php
   phpinfo();
   ?>
   :wq! #保存退出
   ```

   然后访问你的网站
   
2. 验证`mariadb`:
   ```
   cd /var/www/html/
   vim index.php # 输入以下内容：
   <?php
   
   $servername = "localhost";
   $username = "wsxq";
   $password = "658231";
   $dababase = "bus";
   
   try {
       $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
       // set the PDO error mode to exception
       $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
       echo "Connected successfully";
   }
   catch(PDOException $e)
   {
       echo "Connection failed: " . $e->getMessage();
   }
   
   ?>
   :wq # 保存退出
   ```

   然后访问你的网站


## 6 可能出现的问题
1. 防火墙未配置(开放相应的端口), 配置如下：
   ```bash
   firewall-cmd --permanent --zone=public --add-service=http
   firewall-cmd --permanent --zone=public --add-service=https
   firewall-cmd --permanent --zone=public --add-service=mysql
   firewall-cmd --reload
   ```

2. 未关闭 SELINUX（应该有比关闭更好的解决方案，只是现在还不知道），修改`/etc/selinux/config`:
   ```
   SELINUX=enforcing #修改enforcing为disabled
   #SELINUXTYPE=targeted #注释掉
   ```
   使配置立即生效: `setenforce 0`

   事实上，我并未遇到这个问题

## 7 参考链接
1. [mysqlnd 简介——官方文档](http://php.net/manual/zh/intro.mysqlnd.php)
2. [How to Allow MySQL Traffic using firewalld on CentOS 7](https://wiki.mikejung.biz/Firewalld)
3. [CentOS 7 安装配置LAMP服务器方法(Apache+PHP+MariaDB) ](https://my.oschina.net/sallency/blog/467647)
4. [WIKI: LAMP][wiki-lamp]
5. [PHP 5.3.0以上推荐使用mysqlnd驱动- 老张的自言自语- ITeye博客][mysqlnd]
