---
tags: [FROM_DOCX, tcpreplay]
last_modified_time: 2022-03-16 15:31:46 +0800
title: tcpreplay使用笔记
---


<p id="markdown-toc"></p>
<!-- vim-markdown-toc GFM -->

* [说明](#说明)
* [使用方法](#使用方法)
    * [直接回放](#直接回放)
    * [穿墙流量](#穿墙流量)
* [tcpreplay软件包](#tcpreplay软件包)
    * [tcpreplay](#tcpreplay)
    * [tcpprep](#tcpprep)
    * [tcpreplay-edit](#tcpreplay-edit)
    * [tcprewrite](#tcprewrite)
* [FAQ](#faq)
    * [回放接口可否配置IP？](#回放接口可否配置ip)
    * [常见协议样本？](#常见协议样本)
    * [设置MTU?](#设置mtu)
        * [Windows](#windows)
        * [Linux](#linux)
* [修订记录](#修订记录)

<!-- vim-markdown-toc -->


## 说明

本文标题中的tcpreplay实际是指tcpreplay软件包

## 使用方法

### 直接回放

    sudo tcpreplay -i eth0 -l 0 -M 1 a.pcap

### 穿墙流量

    tcpprep -a bridge -i a.pcap -o a.pcap
    sudo tcpreplay -i eth2 -I eth3 -c a.cache -l 1 -M 1 a.pcap

详情参见man tcpprep和man tcpreplay，以及tcpreplay的源码——[appneta/tcpreplay: Pcap editing and replay tools for \*NIX and Windows](https://github.com/appneta/tcpreplay)

## tcpreplay软件包

### tcpreplay

回放报文

详情参见man tcpreplay

### tcpprep

分离客户端和服务器，使tcpreplay可以从两个接口回放，一个接口专门回放客户端报文，另一接口专门回放服务端报文

详情参见man tcpprep

### tcpreplay-edit

在回放前修改某些报文内容

### tcprewrite

修改报文内容

遇到过的问题：

-   [pcap - tcprewrite - truncated packet error - Stack Overflow](https://stackoverflow.com/questions/28401509/tcprewrite-truncated-packet-error)

## FAQ

### 回放接口可否配置IP？

可以。但没有什么实际作用

### 常见协议样本？

-   [SampleCaptures - The Wireshark Wiki](https://wiki.wireshark.org/SampleCaptures)

### 设置MTU?

MTU太小可能报的错：

-   Unable to send packet: Error with PF_PACKET send() \[1418\]: Message too long (errno = 90)。设置后部分网卡可能因为质量问题出现另一个问题：回放速率变得奇慢且CTRL+C不能及时停止

#### Windows

-   [Changing the MTU size in Windows Vista, 7 or 8 (mtu, speed, windows, Windows 7, Windows 8, Windows Vista)](https://support.zen.co.uk/kb/Knowledgebase/Changing-the-MTU-size-in-Windows-Vista-7-or-8)

#### Linux

ip -d link list

找到maxmtu

然后：ip link set mtu \<maxmtu\> dev \<dev\>

例如：ip link set mtu 1500 dev eth0

## 修订记录

| 修订时间 | 修订人       | 版本 | 说明 |
|----------|--------------|------|------|
| TODO     | wsxq2 | 1.0  | 初稿 |

