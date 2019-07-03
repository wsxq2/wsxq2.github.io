---
tags: [kali,shadowsocks,shadowsocksr,科学上网]
last_modified_time: 2019-07-03 12:51:22 +0800
---

> * TODO: 本文正在更新中，每天都会有新内容 <2019-07-02>

**本文说明**：本文最初写的是在 Kali Linux 中如何实现科学上网（只讲解了客户端的操作），但是后来压根儿就没怎么用 Kali Linux 了，而且发现科学上网这块内容是真的复杂，只讲解客户端的操作非常不完整。并且随着时间的推移，对科学上网的了解也逐渐增加，于是萌生了一个大胆的想法——从头梳理一下科学上网的知识。于是本文变成了现在这个样子——内容多又长，而且还有好多坑没填 `-_-`

众所周知，科学上网是每个学计算机的人员的必备技能。本文从科学上网的基本概念开始，简要讲解科学上网的各种方法以及相关的原理。

<p id="markdown-toc"></p>
<!-- vim-markdown-toc GFM -->

* [概述](#概述)
  * [何为翻墙（科学上网）？](#何为翻墙科学上网)
  * [何为墙？](#何为墙)
  * [为什么要翻墙？](#为什么要翻墙)
* [方法](#方法)
  * [免费](#免费)
  * [付费](#付费)
    * [“机场”](#机场)
    * [VPS](#vps)
      * [VPS 提供商](#vps-提供商)
      * [使用的方案](#使用的方案)
  * [总结](#总结)
* [SSH](#ssh)
* [Shadowsocks](#shadowsocks)
  * [是什么](#是什么)
  * [运行原理](#运行原理)
  * [安全性](#安全性)
  * [实现](#实现)
  * [使用方法](#使用方法)
    * [环境说明](#环境说明)
    * [服务器配置](#服务器配置)
      * [安装`shadowsocks-libev`](#安装shadowsocks-libev)
      * [配置`shadowsocks-libev`](#配置shadowsocks-libev)
      * [控制`shadowsocks-libev`及日志查看](#控制shadowsocks-libev及日志查看)
      * [关于将`shadowsocks-libev`用作客户端](#关于将shadowsocks-libev用作客户端)
    * [客户端配置](#客户端配置)
      * [安装`shadowsocks-qt5`](#安装shadowsocks-qt5)
      * [配置`shadowsocks-qt5`](#配置shadowsocks-qt5)
      * [设置 PAC 自动代理](#设置-pac-自动代理)
      * [优化](#优化)
* [shadowsocksr](#shadowsocksr)
  * [简介](#简介)
  * [基本原理](#基本原理)
  * [安全性](#安全性-1)
  * [实现](#实现-1)
  * [使用方法](#使用方法-1)
    * [服务器配置（SS Server）](#服务器配置ss-server)
    * [客户端配置（SS Local + PC）](#客户端配置ss-local--pc)
      * [2.1 安装并配置Python版SSR客户端（最重要）](#21-安装并配置python版ssr客户端最重要)
  * [2.2 各种方法](#22-各种方法)
    * [2.2.1 浏览器中设置手动的网络代理（全局，浏览器，最简单）](#221-浏览器中设置手动的网络代理全局浏览器最简单)
    * [2.2.2 Polipo + 系统代理（全局,所有应用）](#222-polipo--系统代理全局所有应用)
      * [2.2.1.1 安装并配置 Polipo](#2211-安装并配置-polipo)
      * [2.2.1.2 设置系统代理](#2212-设置系统代理)
    * [2.2.3 Firefox + FoxyProxy（自动,浏览器）](#223-firefox--foxyproxy自动浏览器)
    * [2.2.4 genpac + 系统代理设置（自动,所有应用）](#224-genpac--系统代理设置自动所有应用)
  * [2.3 关于终端下的代理设置](#23-关于终端下的代理设置)
    * [2.3.1 终端代理环境变量](#231-终端代理环境变量)
    * [2.3.2 使用程序的代理相关参数](#232-使用程序的代理相关参数)
* [4 通过已经可以科学上网的电脑实现科学上网](#4-通过已经可以科学上网的电脑实现科学上网)
* [链接](#链接)

<!-- vim-markdown-toc -->

## 概述
### 何为翻墙（科学上网）？
> &emsp;&emsp;突破网络审查或突破网络封锁，俗称翻墙、穿墙、爬墙、科学上网、魔法上网、爱国上网、自由上网、正常上网等。由于“翻墙”在中国大陆境内成为敏感词汇，现在更多的使用科学上网来代替“翻墙”，通常特指在中国大陆绕过互联网审查封锁技术（IP封锁、端口封锁、关键词过滤、域名劫持等），突破防火长城，实现对网络内容的访问。
> 
> &emsp;&emsp;突破网络审查的软件通常被称作翻墙软件，俗称梯子。翻墙软件并不只是VPN、代理软件。它们着眼于获得被屏蔽的网站内容，并在访问受限网站时向ISP隐藏自己的真实地址信息。
> 
> &emsp;&emsp;——引用自[突破网络审查 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/%E7%AA%81%E7%A0%B4%E7%BD%91%E7%BB%9C%E5%AE%A1%E6%9F%A5)

### 何为墙？
> &emsp;&emsp;防火长城[1]（英语：Great Firewall，常用简称：GFW，中文也称中国国家防火墙[2]，中国大陆民众俗称墙、防火墙、功夫网[3]等等），是对中华人民共和国政府在其互联网边界审查系统（包括相关行政审查系统）的统称。此系统起步于1998年[4]，其英文名称得自于2002年5月17日Charles R. Smith所写的一篇关于中国网络审查的文章《The Great Firewall of China》[5]，取与Great Wall（长城）相谐的效果，简写为Great Firewall，缩写GFW[6]。随着使用的拓广，中文“墙”和英文“GFW”有时也被用作动词，网友所说的“被墙”即指网站内容被防火长城所屏蔽或者指服务器的通讯被封阻，“翻墙”也被引申为突破网络审查浏览境内外被屏蔽的网站或使用服务的行为。
> 
> &emsp;&emsp;——引用自[防火长城 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/%E9%98%B2%E7%81%AB%E9%95%BF%E5%9F%8E)

### 为什么要翻墙？
有人常常问我翻墙有什么好处，为什么要翻墙，现我将其总结如下：
* 搜索引擎：作为搞机人员最重要的工具，国外的 [Google](https://www.google.com/) 比国内的 [百度](https://www.baidu.com) 好用得不要太多。
* [维基百科](https://www.wikipedia.org/)：比国内的百度百科等更客观，更合理，更准确。其底蕴（维基百科推出时间 2001 年，百度百科 2006 年）是国内任何百科都无法比拟的。详情参见 [维基百科 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/%E7%BB%B4%E5%9F%BA%E7%99%BE%E7%A7%91)和 [百度百科 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/%E7%99%BE%E5%BA%A6%E7%99%BE%E7%A7%91)
* [GitHub](github.com)：作为全球最大的“同性交友网站”（大误），这是一个开发者流连忘返的地方，然后在国内时而能访问，时而不能访问
* 问答网站：如 [Stack Overflow](https://stackoverflow.com/)比国内百度大力推荐的百度知道靠谱得不要太多。
* 官方网站：很多好的软件的官网都在国外，如 Windows，Ubuntu，Kali Linux，CentOS，VirtualBox，7zip，Java，Google Chrome等，在国内访问它们要么访问很慢要么完全无法访问
* 学习环境：国内不少论坛贴吧等交流网站日常进行着无意义的争辩，且常有学到一点东西就得意忘形的人在其中炫耀，少有技术干货。
* “翻墙”与“墙”的博弈的趣味性：在学习“翻墙”和“墙”的过程可以收获大量知识
* ......

## 方法
现今（2019-07-01）比较流行的方法如下：

### 免费
* 网上找免费的 VPN、SS、SSR 账号
* 使用免费工具。如蓝灯（Lantern）等
* 网上查找免费的 SSR 订阅
* 免费蹭好友的 VPS

### 付费
#### “机场”
购买 VPN, SS, SSR 账号，也被称为“机场”。比较便宜的推荐如下：
* [justmysocks](https://justmysocks.net)：亲测好用。

  > 目前只有三个方案可选，支持月/季/半年/年付，付款周期越长价格越便宜，年付只需付10个月，目前支持paypal和支付宝付款，带宽分1G/2.5G/5G，对于GIA来说带宽相当大了。
  >
  > | 方案               | 流量/设备数       | 带宽     | 优惠码（5.2%） | 价格     | 购买链接                                              |
  > | Just My Socks 100  | 100G/月 3台设备   | GIA 1G   | JMS9272283     | 2.88$/月 | [点击购买](https://justmysocks1.net/members/cart.php) |
  > | Just My Socks 500  | 500G/月 5台设备   | GIA 2.5G | JMS9272283     | 5.88$/月 | [点击购买](https://justmysocks1.net/members/cart.php) |
  > | Just My Socks 1000 | 1000G/月 无限设备 | GIA 5G   | JMS9272283     | 9.88$/月 | [点击购买](https://justmysocks1.net/members/cart.php) |
  >
  > ——引用自[好用的机场推荐 \| Atrandys](https://www.atrandys.com/2019/1582.html)

  常用链接：

  * 无需科学上网的官网地址：<https://justmysocks1.net>
  * 无需科学上网的 clientarea 地址：<https://justmysocks1.net/members/clientarea.php>

* buyV
* kdatacenter

#### VPS
自己租用 VPS 搭建代理服务器。

##### VPS 提供商
* [搬瓦工](https://bwg.net)：笔者一直用的它，它价格便宜（笔者当时的是200元/年左右）、速度较快（200KB/s+），但是延迟较高（`200ms`左右）。近期搬瓦工的大量 VPS IP地址被封，笔者就是其中的一员，但是亲测可以通过套 cf(cloudflare) 的方法继续使用。
  
  其它常用链接：

  * 无需科学上网的官网地址：<https://bwh88.net/>
  * 无需科学上网的 clientarea 地址：<https://bwh88.net/clientarea.php>

* [vultr](https://www.vultr.com/)：曾经尝试过使用它，但是其 IP 地址大多被封，因为我试了好几个都没有找到没被封的，于是就放弃了
* virmach：一个好友用过，价格也比较便宜（200元/年），但是速度较慢（20KB/s，20Mbps带宽）、延迟较高（`376ms`）。以上是我的测试，我的好友的测试结果和我截然相反，他那边速度较快（`1MB/s`，100Mbps带宽）、延迟较低（`250ms`左右）
* 其他：hostdare cloudcone hosthatch anynode hostsolutions hostflyte justhost sentris gullo cheapnat GCP xenspec。以上 VPS 提供商笔者和笔者的好友都没有用过，它们是热心网友推荐的

##### 使用的方案
* SSH：使用 OpenSSH 软件包中`ssh`命令的 `-D` 参数即可实现科学上网。具体参见后文
* VPN：未曾尝试过
* SS：使用 shadowsocks 服务器端软件和客户端软件即可实现科学上网。详情参见后文
* SSR：使用 shadowsocksr 服务器端软件和客户端软件即可实现科学上网。详情参见后文
* V2ray：使用 V2ray 服务器端软件和客户端软件即可实现科学上网。详情参见后方
* V2ray+CDN：即“俗称”的“套cf”。由于用到的 CDN 通常是免费的 cloudflare，所以被网友戏称为“套cf”。它能让被墙 IP 的 VPS 继续使用

### 总结
须知，天下没有免费的午餐（就算有也很少）。上述的方法中，免费的那几种方法大多存在不安全、有流量限制、有速度限制、有广告、不稳定等问题。而付费的机场虽然体验极佳，但是价格昂贵，且通常只能 1~3 人使用。

而自己租用 VPS 则不然，相对安全、流量上限高（如 500G/月，你几乎不可能用完）、无广告、相对稳定，此外如果某个方法无效了换个方法即可，同时会学到更多知识，尤其是网络方面的知识。但是凡事皆有利弊，自己租用 VPS 的弊端在于你会遇到大量问题，花费大量时间。

至于如何选择，可以结合你的需求、兴趣、未来的研究方向综合考虑。我之所以从一开始（好吧，事实上最初我也用了将近一年的机场）就果断选择了自己租用 VPS 这条不归路，是出于较大的科学上网需求、对科学上网的兴趣和所选择的研究方向——计算机科学与技术之网络安全。

因此，本文着重讲解，如何通过自己租用的 VPS 搭建代理服务器实现科学上网


## SSH
ssh 可以使用`-D`参数实现科学上网：
> &emsp;&emsp;-D port 

> &emsp;&emsp;This works by allocating a socket to listen to port on the local side, and whenever a connection is made to this port, the connection is forwarded over the secure channel, and the application protocol is then used to determine where to connect to from the remote machine. Currently the SOCKS4 and SOCKS5 protocols are supported, and ssh will act as a SOCKS server. Only root can forward privileged ports. Dynamic port forwardings can also be specified in the configuration file.
> 
> &emsp;&emsp;——引用自`man ssh`

```
ssh -ND 1080 -p 22  <user>@<hostname> 
```
其中`-N`：

>  &emsp;&emsp;-N&emsp;&emsp;Do not execute a remote command.  This is useful for just forwarding ports.
> 
> &emsp;&emsp;——引用自`man ssh`

具体可参考这个链接：[实战 SSH 端口转发](https://www.ibm.com/developerworks/cn/linux/l-cn-sshforward/index.html)

现在就相当于做了[2.1 安装并配置Python版SSR客户端（最重要）](#21-安装并配置python版ssr客户端最重要)这个步骤。所以后续配置相似，选择[2.2 各种方法](#22-各种方法)中的一个即可

该方法非常简单，你甚至不需要在服务器上做任何配置，客户端的话**ssh+一个浏览器插件**即可（当然，也可以采用上述的各种方法中的其它方法），但前提在于你有一个在国外的服务器，并且每次使用都需要使用 ssh 连接你的服务器，故只适合特殊情况使用（比如你刚买/租用一个国外的服务器，并且迫切需要科学上网）。

## Shadowsocks
重要相关网站： 
* [Shadowsocks - A secure socks5 proxy](https://shadowsocks.org/en/index.html)
* [GitHub - shadowsocks](https://github.com/shadowsocks)
* [Shadowsocks - Implementations](https://shadowsocks.org/en/spec/Implementations.html)：包括服务器和客户端的实现，且进行了比较。强烈建议看一下

此方法截止 2018-10-20 已不可用。建议使用本文中的其它方法（可以逐个尝试）

2019-06-30 更新： 事实上，`shadowsocks`并非真的不可用了，毕竟现在 [shadowsocks-libev](https://github.com/shadowsocks/shadowsocks-libev) 还在更新（其开发相当活跃），而且不少机场都是用的`shadowsocks`（如搬瓦工官方机场[justmysocks](https://justmysocks1.net/members/index.php)）。所以当时我那个服务器上的`shadowsocks`不可用了应该另有其它原因

### 是什么
> &emsp;&emsp;Shadowsocks（简称SS）是一种基于Socks5代理方式的加密传输协议，也可以指实现这个协议的各种开发包。当前包使用Python、C、C++、C#、Go语言等编程语言开发，大部分主要实现（iOS平台的除外）采用Apache许可证、GPL、MIT许可证等多种自由软件许可协议开放源代码。Shadowsocks分为服务器端和客户端，在使用之前，需要先将服务器端程序部署到服务器上面，然后通过客户端连接并创建本地代理。
> 
> &emsp;&emsp;在中国大陆，本工具广泛用于突破防火长城（GFW），以浏览被封锁、遮蔽或干扰的内容。2015年8月22日，Shadowsocks原作者Clowwindy称受到了中国政府的压力，宣布停止维护此计划（项目）并移除其个人页面所存储的源代码。
> 
> &emsp;&emsp;为了避免关键词过滤，网民会根据谐音将ShadowsocksR称为“酸酸乳”（SSR），将Shadowsocks称为“酸酸”（SS）。
> 
> &emsp;&emsp;——引用自[Shadowsocks - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/Shadowsocks)

### 运行原理
> &emsp;&emsp;Shadowsocks的运行原理与其他代理工具基本相同，使用特定的中转服务器完成数据传输。例如，用户无法直接访问Google，但代理服务器可以访问，且用户可以直接连接代理服务器，那么用户就可以通过特定软件连接代理服务器，然后由代理服务器获取网站内容并回传给用户，从而实现代理上网的效果。另外用户在成功连接到服务器后，客户端会在本机构建一个本地Socks5代理（或VPN、透明代理等）。浏览网络时，网络流量需要先通过本地代理传递到客户端软件，然后才能发送到服务器端，反之亦然。
> 
> &emsp;&emsp;为防止流量被识别和拦截，服务器和客户端软件会要求提供密码和加密方式，并且在数据传输期间会对传入和传出流量进行加密。
> 
> &emsp;&emsp;——引用自[Shadowsocks - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/Shadowsocks)

图解：

> 简单理解的话，shadowsocks 是将原来 ssh 创建的 Socks5 协议拆开成 server 端和 client 端，所以下面这个原理图基本上和利用 ssh tunnel 大致类似
> 
> ![shadowsocks原理图解](https://vc2tea.com/public/upload/whats-shadowsocks-04.png)
> 
> 其中：
> * 1、6) 客户端发出的请求基于 Socks5 协议跟 ss-local 端进行通讯，由于这个 ss-local 一般是本机或路由器或局域网的其他机器，不经过 GFW，所以解决了上面被 GFW 通过特征分析进行干扰的问题
> * 2、5) ss-local 和 ss-server 两端通过多种可选的加密方法进行通讯，经过 GFW 的时候是常规的TCP包，没有明显的特征码而且 GFW 也无法对通讯数据进行解密
> * 3、4) ss-server 将收到的加密数据进行解密，还原原来的请求，再发送到用户需要访问的服务，获取响应原路返回
> 
> ——引用自[写给非专业人士看的 Shadowsocks 简介 \| 綠茶如是说](https://vc2tea.com/whats-shadowsocks/)

因此，如果要使用 VPS 自行搭建 SS 服务并使用它，我们需要做如下几件事情：
* 在 VPS 服务器上搭建 SS 服务（对应上图中的**SS Server**）：这个步骤可简单可复杂。想简单的话使用一键安装脚本即可，但是缺点在于你遇到问题后会一脸懵逼；复杂点的方法则是自己一步一步的根据官网指导，结合别人的博客来安装，缺点在于费时
* 在客户端上进行配置（对应上图中的**PC**和**SS Local**）：对于 Windows, MacOS, Android 这几个操作系统来说这个过程是非常简单的。因为它们的客户端几乎都是带图形界面的（MacOS 也可以使用命令行），且近乎傻瓜式的操作在网上很容易找到带图的教程。而在 Linux 上则稍微麻烦些，不过现在也变得简单了，因为它也有了图形界面的客户端——shadowsocks-qt5，而且是跨平台的（因为 Qt5 这个图形界面接口是跨平台的）

### 安全性
> &emsp;&emsp;Shadowsocks的最初设计目的只是为了绕过GFW，而不是提供密码学意义的安全，所以Shadowsocks自行设计的加密协议对双方的身份验证仅限于预共享密钥，亦无完全前向保密，也未曾有安全专家公开分析或评估协议及其实现。如果是在监听类型的国家内想更加安全的上网，基本上Shadowsocks功能不够完善，应该使用隐密性更高的工具。[8]
> 
> &emsp;&emsp;Shadowsocks本质上只是设置了密码的专用网络代理协议，不能替代TLS或者VPN，不能用作匿名通信方案，该协议的目标不在于提供完整的通信安全机制，主要是为了协助上网用户在严苛的网络环境中突破封锁。
> 
> &emsp;&emsp;在某些极端的环境下，通过深度包检测（DPI）也有可能识别出协议特征。为了确保安全，用户应做好额外的加密和验证措施，以免泄露信息，无论使用的服务器来源是否可靠。2017年9月21日，一篇名为《The Random Forest based Detection of Shadowsock's Traffic》的论文在IEEE发表，该论文介绍了通过随机森林算法检测Shadowsocks流量的方法，并自称可达到85％的检测精度[9]，虽然该论文的有效性遭到网友质疑[10]，但机器学习配合GFW已经实现的深度数据包检测来识别网络流量特征的做法是实际可行的，而且还适用于任何网络代理协议而不仅仅局限于Shadowsocks。[11]
> 
> &emsp;&emsp;——引用自[Shadowsocks - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/Shadowsocks)

### 实现
> &emsp;&emsp;当前Shadowsocks有多个实现支持，以自由软件形式发布的主要有原始Shadowsocks（以Python语言编写）、Shadowsocks-libev（分支项目openwrt-Shadowsocks）、Shadowsocks-rust、Shadowsocks-go/go-Shadowsocks2、libQtShadowsocks、Shadowsocks-qt5（仅作为客户端）、Shadowsocks-android（仅作为客户端）、Shadowsocks-windows（仅作为客户端）、ShadowsocksX-NG（仅作为客户端）、Outline[12]、V2Ray、Brook[13]等等，还有为数甚多的免费软件及专有软件。
> 
> &emsp;&emsp;——引用自[Shadowsocks - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/Shadowsocks)

官方的尚在更新的实现请参见： [Shadowsocks - Implementations](https://shadowsocks.org/en/spec/Implementations.html)

### 使用方法
#### 环境说明
* 服务器操作系统：CentOS7.2
  * 使用的 shadowsocks 实现（服务器）：[shadowsocks-libev](https://github.com/shadowsocks/shadowsocks-libev)
  * 使用的用户：root
* 客户端操作系统：Kali-Linux
  * 使用的 shadowsocks 实现（客户端）：[shadowsocks-qt5](https://github.com/shadowsocks/shadowsocks-qt5)
  * 使用的用户：root

值得注意的是上面的服务器和客户端用的软件不一样，但是重要的不是软件表面，而是它们的“内涵”，它们都是使用的 shadowsocks 协议，只不过 shadowsocks-libev（C语言、轻量、快速、开发活跃） 通常用作服务器端（也可用作客户端），shadowsocks-qt5（C++、图形界面、跨平台） 只能用做客户端

另外，对于其它操作系统和实现，参考相应的官网文档操作即可。它们的官网链接在[Shadowsocks - Implementations](https://shadowsocks.org/en/spec/Implementations.html)页面中

这里还有份来自别的博客的对`shadowsocks-libev`的简介，备受启发：

> shadowsocks-libev 是一个 shadowsocks 协议的轻量级实现，是 shadowsocks-android, shadowsocks-ios 以及 shadowsocks-openwrt 的上游项目。其具有以下特点：
> 
> * 体积小巧，静态编译并打包后只有 100 KB。
> * 高并发，基于 libev 实现的异步 I/O，以及基于线程池的异步 DNS，同时连接数可上万。
> * 低资源占用，几乎不占用 CPU 资源，服务器端内存占用一般在 3MB 左右。
> * 跨平台，适用于所有常见硬件平台，已测试通过的包括 x86，ARM 和 MIPS。也适用于大部分 POSIX 的操作系统或平台，包括 Linux，OS X 和 gwin 等。
> * 协议及配置兼容，完全兼容 shadowsocks 协议，且兼容标准实现中的 JSON 风格配置文件，可与任意实现的 shadowsocks 端或服务端搭配使用。
> 
> ——引用自[CentOS 7 配置 shadowsocks-libev 服务器端进行科学上网 \| 鸣沙山侧 月牙泉畔](https://roxhaiy.wordpress.com/2017/08/04/430/)

#### 服务器配置
先说简单方法，使用一键安装脚本 [teddysun/shadowsocks_install at master](https://github.com/teddysun/shadowsocks_install/tree/master)。注意，因为某些原因，该一键安装脚本已经停止更新，参见 [Shadowsocks非官方网站](https://shadowsocks.be/)

再说复杂点的方法（即后文）

##### 安装`shadowsocks-libev`
```
cd /etc/yum.repos.d/ #进入 CentOS 软件源目录
wget https://copr.fedorainfracloud.org/coprs/librehat/shadowsocks/repo/epel-7/librehat-shadowsocks-epel-7.repo #下载librehat-shadowsocks 软件源
yum install epel-release #安装额外的软件源（shadowsocks-libev的依赖 libsodium 和 mbedtls 要用）
yum makecache fast #更新软件缓存信息（类似 apt update）
yum install shadowsocks-libev #安装
```

其中，如果安装了 epel-release 依然显示找不到 `libsodium`和`mbedtls` ，则可以使用命令`yum reinstall epel-release`重新安装

详情参见[Install from repository](https://github.com/shadowsocks/shadowsocks-libev#install-from-repository-1)

**温馨提示**：通过这种方法安装的`shadowsocks-libev`的版本为`3.2.0`（2018年5月发布（参见[shadowsocks/shadowsocks-libev at v3.2.0](https://github.com/shadowsocks/shadowsocks-libev/tree/v3.2.0)））。如果想要安装最新版本（当前（2019-07-01）为`3.3.0`）），建议使用从源码编译的方法，具体方法参见[Build from source with centos](https://github.com/shadowsocks/shadowsocks-libev#build-from-source-with-centos)

安装好后让我们来看一下`shadowsocks-libev`软件包展开后都有哪些文件（使我们对这个软件包有着更清晰的认识）：
```
# rpm -ql shadowsocks-libev
/etc/shadowsocks-libev/config.json
/etc/sysconfig/shadowsocks-libev
/usr/bin/ss-local
/usr/bin/ss-manager
/usr/bin/ss-nat
/usr/bin/ss-redir
/usr/bin/ss-server
/usr/bin/ss-tunnel
/usr/lib/systemd/system/shadowsocks-libev-local.service
/usr/lib/systemd/system/shadowsocks-libev-local@.service
/usr/lib/systemd/system/shadowsocks-libev-redir@.service
/usr/lib/systemd/system/shadowsocks-libev-server@.service
/usr/lib/systemd/system/shadowsocks-libev-tunnel@.service
/usr/lib/systemd/system/shadowsocks-libev.service
/usr/lib64/libshadowsocks-libev.la
/usr/lib64/libshadowsocks-libev.so
/usr/lib64/libshadowsocks-libev.so.2
/usr/lib64/libshadowsocks-libev.so.2.0.0
/usr/lib64/pkgconfig
/usr/lib64/pkgconfig/shadowsocks-libev.pc
/usr/share/doc/shadowsocks-libev
/usr/share/doc/shadowsocks-libev/shadowsocks-libev.html
/usr/share/doc/shadowsocks-libev/ss-local.html
/usr/share/doc/shadowsocks-libev/ss-manager.html
/usr/share/doc/shadowsocks-libev/ss-nat.html
/usr/share/doc/shadowsocks-libev/ss-redir.html
/usr/share/doc/shadowsocks-libev/ss-server.html
/usr/share/doc/shadowsocks-libev/ss-tunnel.html
/usr/share/man/man1
/usr/share/man/man1/ss-local.1.gz
/usr/share/man/man1/ss-manager.1.gz
/usr/share/man/man1/ss-nat.1.gz
/usr/share/man/man1/ss-redir.1.gz
/usr/share/man/man1/ss-server.1.gz
/usr/share/man/man1/ss-tunnel.1.gz
/usr/share/man/man8
/usr/share/man/man8/shadowsocks-libev.8.gz
```

可以看到其最主要的配置文件（`/etc/...`）应该是`/etc/shadowsocks-libev/config.json`，其最常用的命令（`/usr/bin/...`）应该是`ss-server`（用于服务器），其次应是`ss-local`（用于客户端）。此外，可以通过`systemctl`命令（`/usr/lib/systemd/system/...`）实现对所有命令的控制，如：
```
systemctl enable shadowsocks-libev-local@client
systemctl enable shadowsocks-libev-server@server
```
其中`client`表示`/etc/shadowsocks-libev/client.json`，`server`类似，不使用`config`是为了避免混乱，毕竟服务器和客户端所使用的配置文件还是不一样的

另外其还有静态和动态运行库（`/usr/lib64/...`，其中`*.la`表示静态库，`*.so`表示动态库）。最后其文档也是相当完善的，有用于`man`命令的在线手册（`/usr/share/man/...`），也有`html`格式的网页（`/usr/share/doc/...`）。因此，强烈建议至少通读一下`man 8 shadowsocks-libev`

##### 配置`shadowsocks-libev`
由于在服务器端只使用`ss-server`，所以我们直接修改默认的配置文件`/etc/shadowsocks-libev/config.json`即可：
```
{
    "server":"0.0.0.0",
    "server_port":1234,
    "local_address": "0.0.0.0",
    "local_port":1080,
    "password":"shadowsocks",
    "timeout":60,
    "method":"aes-256-cfb"
}
```

##### 控制`shadowsocks-libev`及日志查看
使用如下命令启动：
```
systemctl start shadowsocks-libev-server@config
```
使用如下命令设置开机自启：
```
systemctl enable shadowsocks-libev-server@config
```
使用如下命令查看状态：
```
systemctl status shadowsocks-libev-server@config
```
使用如下命令停止：
```
systemctl stop shadowsocks-libev-server@config
```

可以在`/var/log/messages`中查看相关日志，也可以使用`journalctl -u shadowsocks-libev-server@config`命令查看

##### 关于将`shadowsocks-libev`用作客户端
其实如果使用`shadowsocks-libev`作为客户端也是极为简单的，其配置文件只需更改`server`字段即可。如对于上述配置的服务器，客户端可以使用如下配置文件（假设命名为`client.json`）：
```
{
    "server":"serverip",
    "server_port":1234,
    "local_address": "0.0.0.0",
    "local_port":1080,
    "password":"shadowsocks",
    "timeout":60,
    "method":"aes-256-cfb"
}
```

使用如下命令启动：
```
systemctl start shadowsocks-libev-local@client
```
使用如下命令设置开机自启：
```
systemctl enable shadowsocks-libev-local@client
```

......

#### 客户端配置
本部分最后更新时间：2018-04-08。

2019-07-02更新： 客户端选择`shadowsocks-qt5`是因为它简单，界面友好（好吧，是因为当初只听说过它）。现在的我更倾向于使用`shadowsocks-libev`作为客户端，因为它最近一次更新在 2019 年 7 月，而 shadowsocks（即原始的 Python 版）最后更新时间是 2018 年 10 月，shadowsocks-qt5 最近一次更新则是在 2018 年 8 月

##### 安装`shadowsocks-qt5`

1. 在`/etc/apt/sources.list`文件末尾添加: `deb http://ppa.launchpad.net/hzwhuang/ss-qt5/ubuntu devel main`
2. 更新 apt 软件列表：
	```
	apt update #这里会提示错误，以下两步解决该错误
	gpg --keyserver keyserver.ubuntu.com --recv 6DA746A05F00FA99
	gpg --export --armor 6DA746A05F00FA99 | sudo apt-key add -
	apt update #这一步成功后便可安装shadowsocks-qt5了
	```
3. 安装shadowsocks-qt5: `apt install shadowsocks-qt5 `。

##### 配置`shadowsocks-qt5`
4. 安装后在`bash`中输入`ss-qt5`, 完成配置, 配置好后的图如下：

   ![ss-qt5](http://wsxq12.55555.io/Kali-Linux科学上网/ss-qt5主界面.png)

   图中使用的服务器账号是我花**180元/年**租用的搬瓦工的 VPS (见下图)（大家也可以搭建一个属于自己的 SS 服务器，可以学到不少东西）

   ![bwg](http://wsxq12.55555.io/Kali-Linux科学上网/bwg主机信息界面.png)

##### 设置 PAC 自动代理
4. 获得 pac 文件：

   ```
	 pip install genpac
	 pip install --upgrade genpac
	 mkdir ~/vpnPAC
	 cd ~/vpnPAC
	 touch user-rules.txt
	 genpac -p "SOCKS5 127.0.0.1:1080" --gfwlist-proxy="SOCKS5 127.0.0.1:1080" --output="autoproxy.pac" --gfwlist-url="https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt" --user-rule-from="user-rules.txt"
   ```
												
5. 系统设置自动代理: **设置->网络->网络代理**，**方式**改为**自动**，**配置URL**改为：`file://root/vpnPAC/autoproxy.pac`

##### 优化
1. 设置开机启动：通过`kali linux`自带的优化工具实现: `Win+a`, 直接输入优化工具，出现优化工具图标（当然你也可以自己找），双击，找到开机启动程序，添加`shadowsock-qt5`
2. 自动连接某个节点：打开`bash`，输入`ss-qt5`，**右键某个节点->编辑->程序启动时自动连接**
3. 通过快捷键开启或关闭shadowsocks-qt5: **设置->键盘->添加自定义快捷键**（滑到最下面你会看到一个`+`）， **名字**可以随意，**命令**输入`ss-qt5`（关闭时输入`pkill ss-qt5`），**按键**设置成你喜欢的即可。


## shadowsocksr
* 该方法最初发布时间：2018-10-20
* 该方法最后更新时间：2019-07-03。更新处会以`2019-07-03 更新`标明

重要相关网站： 
* [GitHub - breakwa11](https://github.com/breakwa11)：原开发者
* [shadowsocksr-backup](https://github.com/shadowsocksr-backup)：由于原开发者将其 shadowsocksr 项目删除了，所以这是一个由热心网友整合的备份。几乎完全没有更新
* [GitHub - shadowsocksrr](https://github.com/shadowsocksrr)：现在的开发 & 维护者
* [大概是萌新也看得懂的SSR功能详细介绍&使用教程 - 神代綺凜の萌化小基地](https://moe.best/tutorial/shadowsocksr.html)：一个非常详细的 SSR 客户端教程

主要是因为 SS 不能用了，所以把服务器改成了 SSR 的。而 Linux 下的 SSR 客户端配置起来有点麻烦，故更新此文，添加了该内容。

起初我以为最简单的方法为使用[electron-ssr](https://github.com/erguotou520/electron-ssr)，因为它看起来那么的棒，结果安装后却只有第一次可以成功打开，不知是它的 BUG 还是`kali`的 BUG 。

后来根据[Python版SSR客户端](https://www.jianshu.com/p/68d8462a0fe0)和[4 - Ubuntu 16.04 + SSR翻墙](https://www.jianshu.com/p/a0f3268bfa33)这两个参考链接才成功，下面简要总结如下:

### 简介
> &emsp;&emsp;ShadowsocksR（简称SSR）是网名为breakwa11的用户发起的Shadowsocks分支，在Shadowsocks的基础上增加了一些数据混淆方式，称修复了部分安全问题并可以提高QoS优先级。[20]后来贡献者Librehat也为Shadowsocks补上了一些此类特性，[21]甚至增加了类似Tor的可插拔传输层功能。[22]
> 
> &emsp;&emsp;——引用自[Shadowsocks#ShadowsocksR - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/Shadowsocks#ShadowsocksR)

需要注意的是其原开发者 [breakwa11](https://github.com/breakwa11) 已删除了 GitHub 上的所有 ShadowsocksR 代码、解散了相关 Telegram 交流群组，停止开发 ShadowsocksR 项目。但该项目已被多人 fork，并有人在其基础上继续发布新的版本，例如较为知名的 [SSRR](https://github.com/shadowsocksrr) （ShadowsocksRR）。而本部分（shadowsocksr）讲解的也正是 SSRR

### 基本原理
由于其前身是 shadowsocks，所以它的基本原理和 shadowsocks 相同，依然可以用前文所述的方法解释，只是将 SS 替换为 SSR 即可：

> > 简单理解的话，shadowsocks 是将原来 ssh 创建的 Socks5 协议拆开成 server 端和 client 端，所以下面这个原理图基本上和利用 ssh tunnel 大致类似
> > 
> > ![shadowsocks原理图解](https://vc2tea.com/public/upload/whats-shadowsocks-04.png)
> > 
> > 其中：
> > * 1、6) 客户端发出的请求基于 Socks5 协议跟 ss-local 端进行通讯，由于这个 ss-local 一般是本机或路由器或局域网的其他机器，不经过 GFW，所以解决了上面被 GFW 通过特征分析进行干扰的问题
> > * 2、5) ss-local 和 ss-server 两端通过多种可选的加密方法进行通讯，经过 GFW 的时候是常规的TCP包，没有明显的特征码而且 GFW 也无法对通讯数据进行解密
> > * 3、4) ss-server 将收到的加密数据进行解密，还原原来的请求，再发送到用户需要访问的服务，获取响应原路返回
> > 
> > ——引用自[写给非专业人士看的 Shadowsocks 简介 \| 綠茶如是说](https://vc2tea.com/whats-shadowsocks/)
> 
> 因此，如果要使用 VPS 自行搭建 SS 服务并使用它，我们需要做如下几件事情：
>
> * 在 VPS 服务器上搭建 SS 服务（对应上图中的**SS Server**）：这个步骤可简单可复杂。想简单的话使用一键安装脚本即可，但是缺点在于你遇到问题后会一脸懵逼；复杂点的方法则是自己一步一步的根据官网指导，结合别人的博客来安装，缺点在于费时
> * 在客户端上进行配置（对应上图中的**PC**和**SS Local**）：对于 Windows, MacOS, Android 这几个操作系统来说这个过程是非常简单的。因为它们的客户端几乎都是带图形界面的（MacOS 也可以使用命令行），且近乎傻瓜式的操作在网上很容易找到带图的教程。而在 Linux 上则稍微麻烦些，不过现在也变得简单了，因为它也有了图形界面的客户端——shadowsocks-qt5，而且是跨平台的（因为 Qt5 这个图形界面接口是跨平台的）
> 
> ——引用自[运行原理](#运行原理)

不过为了加深理解，本部分（shadowsocksr）将其中的**PC**、**SS Local**和**SS Server**分开说明（前文的 shadowsocks 中只将**SS Local+PC**和**SS Server**分开说明了，因为 SS 和 SSR 的相似性，其中 **PC**连接**SS Local**的部分对 SS 也有效）

### 安全性
如[简介](#简介)中所述：

> 在 Shadowsocks 的基础上增加了一些数据混淆方式，称修复了部分安全问题并可以提高 QoS 优先级

### 实现
和 shadowsocks 类似，不过其开发并不活跃。结合 [Shadowsocks - Implementations](https://shadowsocks.org/en/spec/Implementations.html) 和 [GitHub - shadowsocksrr](https://github.com/shadowsocksrr)可以知晓它的实现和 SS 的对应关系。

需要注意的是有的实现很长时间没有更新了，例如 shadowsocksr-libev、shadowsocksr-android，最近一次更新是 2018 年 3 月，shadowsocksr（即原始的 Python 版）最近一次更新是在 2018 年 5月，shadowsocksr-csharp（Windows客户端）最近一次更新是在 2018 年 4 月，electron-ssr 最近一次更新是在 2019 年 5 月。而令人震惊的是，上述所有软件的最近一次更新全是由 [Akkariiin (Akkariiin)](https://github.com/Akkariiin ) 完成的，当然，也可能只是因为他恰好负责打包和发布这一工作

### 使用方法
#### 服务器配置（SS Server）
先说简单方法，使用一键安装脚本 [teddysun/shadowsocks_install at master](https://github.com/teddysun/shadowsocks_install/tree/master)

再说复杂点的方法

#### 客户端配置（SS Local + PC）
##### 2.1 安装并配置Python版SSR客户端（最重要）
之所以使用Python版，是因为我只找到Python版的，/笑哭。 这一步是最重要的，后面的方法都建立在这个基础之上

1. 获得Python版SSR的相关文件：
   ```
   cd ~/
   git clone https://github.com/shadowsocksrr/shadowsocksr
   ```
   经测试，其实只有shadowsocksr下的shadowsocks目录是必须的

2. 根据你的服务器配置修改配置文件`~/shadowsocksr/config.json`:
   ```
   {
       "server": "<ip address>",
       "server_ipv6": "::",
       "server_port": 8388,
       "local_address": "127.0.0.1",
       "local_port": 1080,
   
       "password": "password",
       "method": "none",
       "protocol": "auth_chain_a",
       "protocol_param": "",
       "obfs": "plain",
       "obfs_param": "",
       "speed_limit_per_con": 0,
       "speed_limit_per_user": 0,
   
       "additional_ports" : {},
       "additional_ports_only" : false,
       "timeout": 120,
       "udp_timeout": 60,
       "dns_ipv6": false,
       "connect_verbose_info": 0,
       "redirect": "",
       "fast_open": false
   }
   ```
3. 启动SSR客户端：
   ```
   cd ~/shadowsocksr/shadowsocks
   python2 local.py -c ~/shadowsocksr/config.json
   ```
4. 测试：暂时无法测试（欢迎知道的人告诉我此处应如何测试）
5. 自动化：将如下bash脚本添加到`~/.bashrc`文件中（我自己写的，欢迎提建议）：
   ```
   function pg(){
     ps aux | grep -v "grep" |grep $1 
   }
   function ssr(){
   	ps aux |grep "[l]ocal\.py" > /dev/null
   	if [ $? -eq 1 ]; then
   		python ~/shadowsocksr/shadowsocks/local.py -c ~/shadowsocksr/config.json -d start
   	else
   		if [ -n "$1" ]; then
   			kill `pg "local\.py" | awk '{print $2}'`
   		else
   			echo "ssr has been run!"
   		fi
   	fi
   }
   ssr
   ```
   简要说一下上面那个函数`ssr`的用法：直接在bash中输入`ssr`后回车则后台启动（关闭终端也能继续运行）ssr客户端，输入`ssr <任意字符>`则关闭已启动的ssr客户端。

### 2.2 各种方法
#### 2.2.1 浏览器中设置手动的网络代理（全局，浏览器，最简单）
以FireFox为例：

点击右上角的菜单，选择**Preferences**，选择**General**，滑到最下面，选择**Network Proxy**标签下的**Settings**，选择**Manual proxy configuration**，只需填**SOCKS Host**一栏，填入`127.0.0.1`和`1080`，在下面选择`SOCKS v5`，并在之后的**No Proxy for**中填入不需要代理的网址或IP地址或网段。

完！

这时便可以访问`www.google.com`了，简单吧？

**注意**：此方法有时不行，原因未知

#### 2.2.2 Polipo + 系统代理（全局,所有应用）
##### 2.2.1.1 安装并配置 Polipo
`Polipo`可以用来将`SOCKS`的代理转换为`HTTP`的代理，从而使那些使用`HTTP`协议的软件（如`curl`, `wget`，浏览器）也可以科学上网

1. 安装`polipo`:
   ```
   apt install polipo
   ```
2. 修改`/etc/polipo/config`文件为如下内容：
   ```
   logSyslog = true
   logFile = /var/log/polipo/polipo.log
   
   socksParentProxy = "127.0.0.1:1080"
   socksProxyType = socks5
   proxyAddress = "0.0.0.0"
   proxyPort = 8123
   ```
3. 重启`polipo`（安装后它会自动启动，故这里说重启）：
   ```
   systemctl restart polipo
   ```
4. 验证polipo是否正常工作：
   ```
   export http_proxy="http://127.0.0.1:8123/"
   curl www.google.com
   ```
   如果正常，就会返回抓取到的Google网页内容。可通过`man polipo`查看其帮助文档。
  
##### 2.2.1.2 设置系统代理
1. 设置系统手动代理：设置->网络->网络代理，方式改为手动，HTTP、HTTPS、FTP均改为`0.0.0.0 8123`,SOCKS改为`127.0.0.1 1080`
2. 测试：打开浏览器，输入网址`www.google.com`看是否访问成功

#### 2.2.3 Firefox + FoxyProxy（自动,浏览器）
因为有科学上网需求的主要是浏览器，故若只是为了让浏览器科学上网，则可采用此方法。当然，如果用的是Chrome，则可采用Chrome + SwitchyOmega的方案替代之。

1. 安装`FoxyProxy`插件：<https://addons.mozilla.org/en-US/firefox/addon/foxyproxy-standard/>
2. 设置`FoxyProxy`选项：
   1. **Add Proxy**: `Proxy Type`选`SOCKS5`，`IP address`填`127.0.0.1`，`Port`填`1080`，记得最后点下`Save`
   2. 添加`Patterns`: 在选项主界面，点击刚刚添加的`Proxy`的`Patterns`，根据自己的需要添加`Patterns`
3. 启用`FoxyProxy`：单击浏览器中右上角相应的图标，选择`Use Enabled Proxies By Patterns and Priority`
4. 测试：输入网址`www.google.com`看是否访问成功

#### 2.2.4 genpac + 系统代理设置（自动,所有应用）
此方法主要使用了`genpac`（generate pac file）生成pac文件，并将系统设置中的网络代理方式改为自动，将其`Configuration URL`指向相应的pac文件位置，具体过程如下：
1. 安装`genpac`：
   ```
   #安装
   pip install genpac
   #更新
   pip install --upgrade genpac
   ```
2. 生成PAC文件：
   ```
   mkdir ~/.pac
   cd ~/.pac
   touch user-rules.txt #可在此文件中添加用户自定义规则，此处省略
   genpac --pac-proxy "SOCKS5 127.0.0.1:1080" --output="ProxyAutoConfig.pac" --user-rule-from="user-rules.txt"
   ```
3. 设置系统自动代理：**设置->网络->网络代理**，方式改为**自动**，`Configuration URL`改为`file:///root/.pac/ProxyAutoConfig.pac`（注意我用的是root用户，如果非root用户请将`/root`改为`/home/<your username>`）
4. 测试：打开浏览器，输入网址`www.google.com`看是否访问成功

### 2.3 关于终端下的代理设置
#### 2.3.1 终端代理环境变量

```
# Set Proxy
function sp(){
    export all_proxy=socks5://127.0.0.1:1080/
    export ALL_PROXY=socks5://127.0.0.1:1080/ #有的命令行工具使用大写的变量名，如 curl
    export http_proxy=socks5://127.0.0.1:1080/ #有的命令行工具使用小写的变量名，如 curl、wget
    export ftp_proxy=socks5://127.0.0.1:1080/ #有的命令行工具使用小写的变量名，如 wget
    export FTP_PROXY=socks5://127.0.0.1:1080/ #有的命令行工具使用大写的变量名，如 curl
    export https_proxy=socks5://127.0.0.1:1080/ #有的命令行工具使用小写的变量名，如 wget
    export HTTPS_PROXY=socks5://127.0.0.1:1080/ #有的命令行工具使用大写的变量名，如 curl
    export no_proxy=localhost,127.0.0.1,192.168.0.0 #有的命令行工具使用小写的变量名，如 wget
    export NO_PROXY=localhost,127.0.0.1,192.168.0.0 #有的命令行工具使用大写的变量名，如 curl
}

# Unset Proxy
function up() {
    unset all_proxy ALL_PROXY http_proxy ftp_proxy FTP_PROXY https_proxy HTTPS_PROXY no_proxy NO_PROXY
}
```
其中的`http_proxy`表示访问`http`协议站点使用的代理，而不是使用`http`代理访问`http`协议站点。同理`ftp_proxy`表示访问`ftp`站点时使用的代理

#### 2.3.2 使用程序的代理相关参数
1. `git`：已知（亲测）支持`socks5`、`http`这两种代理方式，支持上述的终端代理环境变量。也可单独设置代理以覆盖全局设置：
   ```
   # 设置`socks5`代理
   git config --global http.proxy 'socks5://127.0.0.1:1080'
   git config --global https.proxy 'socks5://127.0.0.1:1080'
   # 设置`http`代理
   git config --global https.proxy http://127.0.0.1:1080
   git config --global https.proxy https://127.0.0.1:1080
   # 取消代理
   git config --global --unset http.proxy
   git config --global --unset https.proxy
   ```
   对应的`.gitconfig`配置文件内容如下：
   ```
   [http]
       proxy = socks5://127.0.0.1:1080
   [https]
       proxy = socks5://127.0.0.1:1080
   ```

2. `curl`：支持`socks4`、`socks4a`、`socks5`、`http`这几种代理方式，支持上述的终端代理环境变量。也可单独设置代理以覆盖全局设置：
   ```
   curl -i4 -m3 -x socks5://192.168.56.11:1080 https://www.google.com
   curl -i4 -m3 -x socks5h://192.168.56.11:1080 https://www.google.com
   ```
   注意`socks5`和`socks5h`的区别，前者解析域名时不使用代理，后者解析域名时要使用代理，由于国内 DNS 可能被污染，故建议使用`socks5h`。详情参见`man curl`：

   >    --socks5-hostname <host[:port]>
   >
   >    Use the specified SOCKS5 proxy (and let the proxy resolve the host name). If the port number is not specified, it is assumed at port 1080. (Added in 7.18.0)
   >
   >    --socks5 <host[:port]>
   >
	 >    Use the specified SOCKS5 proxy - but resolve the host name locally. If the port number is not specified, it is assumed at port 1080.

3. `wget`: 似乎只支持`http`协议代理，支持上述的终端代理环境变量。不可单独设置代理以覆盖全局变量
   

## 4 通过已经可以科学上网的电脑实现科学上网
也就是说，如果你有一台设备通过上述的方法之一实现了科学上网，那么你就可以借助那台设备轻松地让其它和那台设备**属于同一局域网的设备**实现科学上网。比如你的实体机实现了科学上网，那么对于你的kali虚拟机你就没必要想尽各种办法让它与你的实体机进行类似的配置以实现科学上网。具体方法如下：

前提条件：和可以科学上网的主机处于**同一局域网**

实验环境：主机Windows10（已实现科学上网），虚拟机Kali Linux（需要实现科学上网），对于虚拟机，我使用了两个网卡，**网络地址转换**和**仅主机网络**。

实现步骤：
1. 配置主机的ssr客户端，使其**允许来自局域网的连接**。于我而言，我是这么设置的：**右键小飞机->选项设置->勾选来自局域网的连接**
2. 在虚拟机中，配置FireFox浏览器中的网络代理或系统代理，选择手动代理，在所有代理中填入主机的IP地址和其默认的端口（我的是`192.168.56.100`和`1080`）
3. 完成

## 链接
下面总结了本文中使用的所有链接：

<!-- link start -->

* [4 - Ubuntu 16.04 + SSR翻墙](https://www.jianshu.com/p/a0f3268bfa33)
* [Build from source with centos](https://github.com/shadowsocks/shadowsocks-libev#build-from-source-with-centos)
* [CentOS 7 配置 shadowsocks-libev 服务器端进行科学上网 \| 鸣沙山侧 月牙泉畔](https://roxhaiy.wordpress.com/2017/08/04/430/)
* [GitHub - shadowsocks](https://github.com/shadowsocks)
* [Google](https://www.google.com/)
* [Install from repository](https://github.com/shadowsocks/shadowsocks-libev#install-from-repository-1)
* [Python版SSR客户端](https://www.jianshu.com/p/68d8462a0fe0)
* [Shadowsocks - A secure socks5 proxy](https://shadowsocks.org/en/index.html)
* [Shadowsocks - Implementations](https://shadowsocks.org/en/spec/Implementations.html)
* [Shadowsocks - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/Shadowsocks)
* [Stack Overflow](https://stackoverflow.com/)
* [bwg](http://wsxq12.55555.io/Kali-Linux科学上网/bwg主机信息界面.png)
* [electron-ssr](https://github.com/erguotou520/electron-ssr)
* [justmysocks](https://justmysocks.net)
* [justmysocks](https://justmysocks1.net/members/index.php)
* [shadowsocks-libev](https://github.com/shadowsocks/shadowsocks-libev)
* [shadowsocks-qt5](https://github.com/shadowsocks/shadowsocks-qt5)
* [shadowsocks/shadowsocks-libev at v3.2.0](https://github.com/shadowsocks/shadowsocks-libev/tree/v3.2.0)
* [shadowsocks原理图解](https://vc2tea.com/public/upload/whats-shadowsocks-04.png)
* [ss-qt5](http://wsxq12.55555.io/Kali-Linux科学上网/ss-qt5主界面.png)
* [vultr](https://www.vultr.com/)
* [写给非专业人士看的 Shadowsocks 简介 \| 綠茶如是说](https://vc2tea.com/whats-shadowsocks/)
* [好用的机场推荐 \| Atrandys](https://www.atrandys.com/2019/1582.html)
* [实战 SSH 端口转发](https://www.ibm.com/developerworks/cn/linux/l-cn-sshforward/index.html)
* [搬瓦工](https://bwg.net)：笔者一直用的它，它价格便宜（笔者当时的是200元/年左右）、速度较快（200KB/s+），但是延迟较高（`200ms`左右）。近期搬瓦工的大量 VPS IP地址被封，笔者就是其中的一员，但是亲测可以通过套 cf(cloudflare)
* [点击购买](https://justmysocks1.net/members/cart.php)
* [百度](https://www.baidu.com)
* [百度百科 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/%E7%99%BE%E5%BA%A6%E7%99%BE%E7%A7%91)
* [突破网络审查 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/%E7%AA%81%E7%A0%B4%E7%BD%91%E7%BB%9C%E5%AE%A1%E6%9F%A5)
* [维基百科 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/%E7%BB%B4%E5%9F%BA%E7%99%BE%E7%A7%91)
* [维基百科](https://www.wikipedia.org/)
* [防火长城 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/%E9%98%B2%E7%81%AB%E9%95%BF%E5%9F%8E)
<!-- link end -->

<!-- abbreviations start -->

*[SS]: shadowsocks
*[SSR]: shadowsocksr

<!-- abbreviations end -->
*[ARM]: Advanced RISC Machines
*[BUG]: 
*[CDN]: Content Delivery Network
*[CPU]: Central Processing Unit
*[DNS]: Domain Name System
*[DPI]: Deep Packet Inspection
*[DPI]: Dots Per Inch
*[FTP]: File Transfer Protocol
*[GCP]: 
*[GFW]: 
*[GIA]: 
*[GPL]: General Public License
*[GPL]: General-Purpose Language
*[HTTP]: Hypertext Transfer Protocol
*[HTTPS]: HTTP Secure
*[IEEE]: Institute of Electrical and Electronics Engineers
*[IP]: Instruction Pointer
*[IP]: Intellectual Property
*[IP]: Internet Protocol
*[ISP]: Internet Service Provider
*[JSON]: JavaScript Object Notation
*[KB]: Keyboard
*[KB]: Kilobyte
*[KB]: Knowledge Base
*[MB]: Megabyte
*[MIPS]: Microprocessor without Interlocked Pipeline Stages
*[MIPS]: Million Instructions Per Second
*[MIT]: Massachusetts Institute of Technology
*[ND]: 
*[NG]: 
*[OS]: Open Source
*[OS]: Operating System
*[PAC]: 
*[POSIX]: Portable Operating System Interface, formerly IEEE-IX
*[PROXY]: 
*[SOCKS]: 
*[SS]: Stack Segment
*[SSH]: Secure Shell
*[SSR]: 
*[TCP]: Transmission Control Protocol
*[TLS]: Thread-Local Storage
*[TLS]: Transport Layer Security
*[URL]: Uniform Resource Locator
*[US]: 
*[VPN]: Virtual Private Network
*[VPS]: 
