---
tags: [Wireshark, 抓包]
last_modified_time: 2020-06-15 16:30:00 +0800
---

本文介绍了世界闻名的包嗅探器 Wireshark

<p id="markdown-toc"></p>
<!-- vim-markdown-toc GFM -->

* [简介](#简介)
* [常用链接](#常用链接)
* [使用技巧](#使用技巧)
  * [抓包](#抓包)
    * [只抓包头](#只抓包头)
    * [只抓必要的包（使用 Capture Filter）](#只抓必要的包使用-capture-filter)
    * [为每步操作打上标记](#为每步操作打上标记)
    * [写个脚本循环抓包，直到某个事件停止](#写个脚本循环抓包直到某个事件停止)
  * [个性化设置](#个性化设置)
    * [时间格式设置](#时间格式设置)
    * [自定义颜色](#自定义颜色)
    * [更多设置](#更多设置)
    * [时区设置](#时区设置)
  * [过滤](#过滤)
    * [协议名称](#协议名称)
    * [流跟踪](#流跟踪)
    * [用好鼠标](#用好鼠标)
    * [保存过滤后的内容](#保存过滤后的内容)
  * [让 Wireshark 自动分析](#让-wireshark-自动分析)
    * [Expert Info](#expert-info)
    * [Service Response Time](#service-response-time)
    * [TCP Stream Graph](#tcp-stream-graph)
    * [Summary](#summary)
  * [搜索功能](#搜索功能)
    * [`Ctrl+F`](#ctrlf)
* [遇到过的问题](#遇到过的问题)
  * [Decrypt TLS packets?](#decrypt-tls-packets)
* [链接](#链接)

<!-- vim-markdown-toc -->

## 简介
> &emsp;&emsp;Wireshark（前称 Ethereal）是一个免费开源的网络数据包分析软件。网络数据包分析软件的功能是截取网络数据包，并尽可能显示出最为详细的网络数据包数据。
> 
> &emsp;&emsp;在过去，网络数据包分析软件是非常昂贵，或是专门属于营利用的软件，然而 Wireshark 的出现却改变了这种生态。[原创研究？]在 GNU 通用公共许可证的保障范围底下，用户可以以免费的代价获取软件与其代码，并拥有针对其源代码修改及定制的权利。Wireshark 是目前全世界最广泛的网络数据包分析软件之一。
> 
> &emsp;&emsp;——引用自[Wireshark - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/Wireshark)

## 常用链接
* <https://www.wireshark.org/>
* [Wiresahrk用户手册](https://web.archive.org/web/20101210144835/http://man.lupaworld.com/content/network/wireshark/)
* [Wireshark User's Guide](https://web.archive.org/web/20110101093304/http://www.wireshark.org/docs/wsug_html_chunked/)
* [《Wireshark网络分析就这么简单》高清 PDF 免费下载地址 - Http Server - Java电子书大全 - Powered by Discuz!](https://www.ebook23.com/thread-3529-1-1.html)

## 使用技巧
本部分内容来自《Wireshark网络分析就这么简单》中的**初试锋芒**中的**你一定喜欢的技巧**一节

### 抓包
#### 只抓包头
**Capture-Options-Limit each packet to**，通常设置为 80（For TCP） 或 200（For HTTP）。

`tcpdump`中对应的参数是`-s`

#### 只抓必要的包（使用 Capture Filter）
**Capture-Options-Capture Filter**，输入 Capture Filter 即可（注意区别于 Display Filter）。例如输入`host 192.168.1.1`。

Capture Filter 的语法详情，请参见 [CaptureFilters - The Wireshark Wiki](https://wiki.wireshark.org/CaptureFilters)

`tcpdump`中对应的参数是`expression`

#### 为每步操作打上标记
方法应该有很多，一个简单的例子是使用`ping`命令。例如：
```
ping 192.168.1.1 -n 1 -l 1
操作步骤1
ping 192.168.1.1 -n 1 -l 2
操作步骤2
ping 192.168.1.1 -n 1 -l 3
操作步骤3
```

#### 写个脚本循环抓包，直到某个事件停止
比如用于嗅探密码等

### 个性化设置
#### 时间格式设置
有时需要参照服务器上的日志时间，找到发生问题时的网络包。所以需要把 Wireshark 的时间调成和服务器一样的格式：

**View-Time Display Format-Date and Time of Day**

#### 自定义颜色
有时需要为某个特定协议自定义颜色：

**View-Coloring Rules**

#### 更多设置
**Edit-Preference**

其中一个经常需要用到的设置是启用**Relative sequence numbers**：**Edit-Preference-Protocols-TCP-Relative sequence numbers**

#### 时区设置
如果你在其他时区的服务器上抓包，然后下载到自己的电脑上分析，最好把自己电脑的时区调成和抓包的服务器一样。否则需要换算时间

### 过滤
#### 协议名称
如果已知某个协议发生问题，则可以用协议名称过滤一下。

**注意**：用协议过滤时务必考虑到协议间的依赖性。比如 NFS 共享挂载失败，则过滤表达式应为`portmap||mount`。

#### 流跟踪
右键感兴趣的包，选择**Follow-TCP/UDP Stream**。这等价于明确指定两端的 IP 和端口（即右键后选择**Conversation Filter**）。比如在某个抓包中：
```
tcp.stream eq 277
```
等价于：
```
(ip.addr eq 192.168.0.109 and ip.addr eq 61.157.34.171) and (tcp.port eq 29783 and tcp.port eq 22)
```

#### 用好鼠标
右键单击 Wireshark 上感兴趣的内容，然后选择**Prepare a Filter-Selected**，就会在 Filter 框中自动生成过滤表达式。在有复杂需求的时候，还可以选择 **Add**、**Or** 等选项来生成一个组合的过滤表达式。

假如右键单击之后选择的不是 **Prepare a Filter**，而是 **Apply as Filter-Selected**，则该过滤表达式生成之后还会自动执行。

#### 保存过滤后的内容
**File-Export Specified Packets-Displayed-Save**，得到的文件就是过滤后的部分。

但是要慎重选择，因为可能后续打开时会显示很多错误

### 让 Wireshark 自动分析
#### Expert Info
**Analyze-Expert Information**

#### Service Response Time
**Statistic-Service Response Time-选定协议名称**

#### TCP Stream Graph
**Statistics-TCP Stream Graph**。例如其中很有用的**Time-Sequence Graph（Stevens）**

#### Summary
**Statistics-Summary**。在这里可以查看**平均流量**等信息

### 搜索功能
#### `Ctrl+F`
假如我们怀疑包里含有`error`一词，就可以按下`Ctrl+F`之后选中`String`单选按钮，然后在`Filter`中输入`error`进行搜索。很多应用层的错误都可以靠这个方法锁定问题包。

## 遇到过的问题
### Decrypt TLS packets?
1. [TLS - The Wireshark Wiki](https://wiki.wireshark.org/TLS#TLS_Decryption)

## 链接
下面总结了本文中使用的所有链接：

<!-- link start -->

* [CaptureFilters - The Wireshark Wiki](https://wiki.wireshark.org/CaptureFilters)
* [TLS - The Wireshark Wiki](https://wiki.wireshark.org/TLS#TLS_Decryption)
* [Wiresahrk用户手册](https://web.archive.org/web/20101210144835/http://man.lupaworld.com/content/network/wireshark/)
* [Wireshark - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/Wireshark)
* [Wireshark User's Guide](https://web.archive.org/web/20110101093304/http://www.wireshark.org/docs/wsug_html_chunked/)
* [《Wireshark网络分析就这么简单》高清 PDF 免费下载地址 - Http Server - Java电子书大全 - Powered by Discuz!](https://www.ebook23.com/thread-3529-1-1.html)
<!-- link end -->

