---
tags: [FROM_DOCX, 刀片服务器, HP, 服务器]
last_modified_time: 2022-03-16 15:25:55 +0800
title: HP ProLiant 刀片服务器装机指南
---


<p id="markdown-toc"></p>
<!-- vim-markdown-toc GFM -->

* [通用方法和思路](#通用方法和思路)
    * [获取型号](#获取型号)
    * [快捷键获取](#快捷键获取)
* [iLO说明](#ilo说明)
    * [配置DHCP或静态IP](#配置dhcp或静态ip)
    * [保证链路通畅](#保证链路通畅)
    * [远程访问](#远程访问)
* [常见服务器型号](#常见服务器型号)
    * [HPE ProLiant DL360p Gen8](#hpe-proliant-dl360p-gen8)
        * [开机快捷键](#开机快捷键)
            * [加载硬件界面](#加载硬件界面)
            * [后续界面（具体忘了）](#后续界面具体忘了)
        * [常用链接](#常用链接)
        * [遇到过的问题](#遇到过的问题)
            * [切分支、交叉编译时异常重启](#切分支交叉编译时异常重启)
            * [Firmware Bug\]: The BIOS Has Corrupted Hw-PMU Resources](#firmware-bug-the-bios-has-corrupted-hw-pmu-resources)
            * [license问题](#license问题)
* [缩略语](#缩略语)
* [修订记录](#修订记录)

<!-- vim-markdown-toc -->


## 通用方法和思路

### 获取型号

拿到一个新机器，需要装机，第一件事是知道它的型号，然后才能去官网上找它的相关资料，为后续工作打下基础。获取型号主要有以下途径：

1.  机器上的标签

2.  BIOS

3.  iLO管理界面（HTTPS）

### 快捷键获取

启动时可能需要进入BIOS、调整启动顺序。但是每个服务器的启动快捷键是不同的。但获取方法是通用的。主要有以下途径：

1.  屏幕上的提示。由于人眼可能反应不及，建议使用手机录制后慢速回放，这样就不会错误任何有用的提示信息

2.  查阅官网手册。根据前面找到的型号去官网上查找该服务器的手册

3.  搜索引擎搜索。

## iLO说明

iLO是个非常重要的概念，其本质是一个额外的迷你操作系统，用于管理和控制服务器。

**iLO功能需要License才能完全使用（高级版）**

iLO体现在服务器后的iLO接口（其实就是网口，上面运行TCP/IP协议），将网线连接到该口上，就能实现BIOS级别的远程管理和控制。控制通过Remote Console（一个客户端应用程序）进行。管理通过Web HTTPS进行。

iLO的实现大致需要以下几个步骤：

1.  配置DHCP或静态IP

2.  保证链路通畅

3.  远程访问

下面详细说明

### 配置DHCP或静态IP

iLO既能使用DHCP，也能使用静态IP。推荐使用静态IP，因为DHCP得到的IP地址可能变动。其配置方法如下（以HPE ProLiant DL360p Gen8为例）：

1.  开机（电源键可能很小，且可能是个指示灯，反正到处按按总会找到的）

2.  在加载硬件界面（参见后方的[开机快捷键-加载硬件界面](#加载硬件界面)）时按F8进入iLO配置

3.  配置DHCP或静态IP。如果要配置静态IP则需要先关闭DHCP

4.  配置用户。如果默认用户和密码没有改变的话直接使用默认用户和密码即可，默认用户为administrator，默认密码可在机器的标签上获取

5.  保存并退出。此后启动时就能看到iOL通过DHCP获取的IP地址或者配置的静态IP地址（通常在屏幕上的左下角）

### 保证链路通畅

正确插好网线、确保网线是好的、确保对端的网口是好、确保链路是好的

### 远程访问

1.  使用浏览器远程访问。访问地址为 <https://192.168.125.126>（注意替换IP）。登录时用户和密码分别为administrator和“服务器标签上记录的默认密码”（如果你没有改过）

2.  在浏览器上启动Remote Console。主要有两种：基于.NET的和基于Java的（推荐前者）

## 常见服务器型号

### HPE ProLiant DL360p Gen8

#### 开机快捷键

##### 加载硬件界面

-   F9：进入BIOS。进入后按CTRL+A，显示隐藏选项

-   F11：启动菜单

-   F8：配置iLO

以上快捷键在以下界面处可用：

![image1.png](http://wsxq12.55555.io/HP-ProLiant-刀片服务器装机指南/image1.png)

##### 后续界面（具体忘了）

TODO：待完善

-   F11修改默认启动选项

-   CTRL+S：xx配置

#### 常用链接

-   链接汇总：[HPE ProLiant DL360p Gen8 Server - Overview](https://support.hpe.com/hpesc/public/docDisplay?docId=emr_na-c03223744#N10677)

-   官网手册：[搜索 \| 慧与支持中心 –HPE ProLiant DL360p Gen8 Server文档](https://support.hpe.com/hpesc/public/km/product/5194968/Product#t=Documents&sort=relevancy&layout=table&numberOfResults=25&f:@kmdoclanguagecode=[cv1871440,cv1871454]&hpe=1)

-   程序和软件：[搜索 \| 慧与支持中心 –HPE ProLiant DL360p Gen8 Server驱动程序](https://support.hpe.com/hpesc/public/km/product/5194968/Product#t=DriversandSoftware&sort=relevancy&layout=table&numberOfResults=25&f:@kmdoclanguagecode=[cv1871440,cv1871454]&hpe=1)

-   Remote console: [Drivers & software \| HP Lights-Out Stand Alone Remote Console for Windows](https://support.hpe.com/hpsc/swd/public/detail?swItemId=MTX_4f842ceb31cf48d392e22705a8#tab-history)

#### 遇到过的问题

##### 切分支、交叉编译时异常重启

通过反复尝试，发现是内存问题。拔掉特定的两个内存条就好了（尚未定位是内存插槽有问题还是内存条有问题）

##### Firmware Bug\]: The BIOS Has Corrupted Hw-PMU Resources

问题描述：启动时屏幕提示Firmware Bug\]: The BIOS Has Corrupted Hw-PMU Resources

解决方法：参考以下链接：

-   [Advisory: (Revision) Red Hat Enterprise Linux - "\[Firmware Bug\]: The BIOS Has Corrupted Hw-PMU Resources" Message Can Be Safely Ignored Displayed with Red Hat Enterprise Linux 6 and Red Hat Enterprise Linux 7](https://support.hpe.com/hpesc/public/docDisplay?docId=emr_na-c03265132)

##### license问题

使用Remote console一段时间后提示需要导入license，此时可找服务器提供商获取license，然后在Web页面的**Administration-Licensing**处导入license即可

## 缩略语

-   iOL：HP Integrated Lights-Out

## 修订记录

| 修订时间   | 修订人       | 版本 | 说明 |
|------------|--------------|------|------|
| 2020-12-23 | wsxq2 | 1.0  | 初稿 |
