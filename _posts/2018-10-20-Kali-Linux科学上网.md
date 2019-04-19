---
tags: [kali,shadowsocks,shadowsocksr,科学上网]
---

众所周知，科学上网是每个学计算机的人员的必备技能，本文简要讲解基于`Debian`的用于安全测试的`kali Linux`系统科学上网的方法，其它基于`Debian`的`Linux`（如`Ubuntu`）类似，再其它的可能就仅做参考了 :) 。
<p id="markdown-toc"></p>
<!-- vim-markdown-toc GFM -->

* [1 通过 shadowsocks 实现科学上网](#1-通过-shadowsocks-实现科学上网)
  * [1.1 实现步骤](#11-实现步骤)
  * [1.2 优化](#12-优化)
* [2 通过 shadowsocksr 实现科学上网](#2-通过-shadowsocksr-实现科学上网)
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
* [3 通过 ssh -D 参数实现科学上网](#3-通过-ssh--d-参数实现科学上网)
* [4 通过已经可以科学上网的电脑实现科学上网](#4-通过已经可以科学上网的电脑实现科学上网)

<!-- vim-markdown-toc -->

## 1 通过 shadowsocks 实现科学上网
该方法最后更新时间：2018-04-08。此方法截止 2018-10-20 已不可用。建议使用本文中第二个方法 [2 通过 shadowsocksr 实现科学上网](#2-通过-shadowsocksr-实现科学上网)

### 1.1 实现步骤
1. 在`/etc/apt/sources.list`文件末尾添加: `deb http://ppa.launchpad.net/hzwhuang/ss-qt5/ubuntu devel main`
2. 更新apt软件列表：
	```
	apt update #这里会提示错误，以下两步解决该错误
	gpg --keyserver keyserver.ubuntu.com --recv 6DA746A05F00FA99
	gpg --export --armor 6DA746A05F00FA99 | sudo apt-key add -
	apt update #这一步成功后便可安装shadowsocks-qt5了
	```
3. 安装shadowsocks-qt5: `apt install shadowsocks-qt5 `。
4. 安装后在`bash`中输入`ss-qt5`, 完成配置, 配置好后的图如下：

   ![ss-qt5](http://wsxq12.55555.io/Kali-Linux科学上网/ss-qt5主界面.png)

   图中使用的服务器账号是我花**180元/年**租用的搬瓦工的VPS(见下图)（大家也可以搭建一个属于自己的SSR服务器，可以学到不少东西）

   ![bwg](http://wsxq12.55555.io/Kali-Linux科学上网/bwg主机信息界面.png)

4. 获得pac文件：

	    pip install genpac
	    pip install --upgrade genpac
	    mkdir ~/vpnPAC
	    cd ~/vpnPAC
	    touch user-rules.txt
	    genpac -p "SOCKS5 127.0.0.1:1080" --gfwlist-proxy="SOCKS5 127.0.0.1:1080" --output="autoproxy.pac" --gfwlist-url="https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt" --user-rule-from="user-rules.txt"

												
5. 系统设置自动代理: **设置->网络->网络代理**，**方式**改为**自动**，**配置URL**改为：`file://~/vpnPAC/autoproxy.pac`(如果需要的话，请用具体的家目录代替`～`(如`/root`))

### 1.2 优化
1. 设置开机启动：通过`kali linux`自带的优化工具实现: `Win+a`, 直接输入优化工具，出现优化工具图标（当然你也可以自己找），双击，找到开机启动程序，添加`shadowsock-qt5`
2. 自动连接某个节点：打开`bash`，输入`ss-qt5`，**右键某个节点->编辑->程序启动时自动连接**
3. 通过快捷键开启或关闭shadowsocks-qt5: **设置->键盘->添加自定义快捷键**（滑到最下面你会看到一个`+`）， **名字**可以随意，**命令**输入`ss-qt5`（关闭时输入`pkill ss-qt5`），**按键**设置成你喜欢的即可。

*[SS]: shadowsocks
*[SSR]: shadowsocksr

## 2 通过 shadowsocksr 实现科学上网
该方法最后更新时间：2018-10-20

主要是因为 SS 不能用了，所以把服务器改成了 SSR 的。而 Linux 下的 SSR 客户端配置起来有点麻烦，故更新此文，添加了该内容。

起初我以为最简单的方法为使用[electron-ssr](https://github.com/erguotou520/electron-ssr)，因为它看起来那么的棒，结果安装后却只有第一次可以成功打开，不知是它的 BUG 还是`kali`的 BUG 。

后来根据[Python版SSR客户端](https://www.jianshu.com/p/68d8462a0fe0)和[4 - Ubuntu 16.04 + SSR翻墙](https://www.jianshu.com/p/a0f3268bfa33)这两个参考链接才成功，下面简要总结如下:

### 2.1 安装并配置Python版SSR客户端（最重要）
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
    export http_proxy=http://127.0.0.1:1080/
    export ftp_proxy=http://127.0.0.1:1080/
    export all_proxy=socks://127.0.0.1:1080/
    export https_proxy=http://127.0.0.1:1080/
    export no_proxy=localhost,127.0.0.1,192.168.0.0
}

# Unset Proxy
function up() {
    unset all_proxy,no_proxy,http_proxy,ftp_proxy,https_proxy
}
```

#### 2.3.2 使用程序的代理相关参数
1. `git`：使用`git config`设置：
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
   对应的.gitconfig配置文件内容如下：
   ```
   [http]
       proxy = socks5://127.0.0.1:1080
   [https]
       proxy = socks5://127.0.0.1:1080
   ```

## 3 通过 ssh -D 参数实现科学上网
> -D port 

> This works by allocating a socket to listen to port on the local side, and whenever a connection is made to this port, the connection is forwarded over the secure channel, and the application protocol is then used to determine where to connect to from the remote machine. Currently the SOCKS4 and SOCKS5 protocols are supported, and ssh will act as a SOCKS server. Only root can forward privileged ports. Dynamic port forwardings can also be specified in the configuration file.

```
ssh -ND 12345 -p 22  <user>@<hostname> 
```
具体可参考这个链接：[实战 SSH 端口转发](https://www.ibm.com/developerworks/cn/linux/l-cn-sshforward/index.html)

现在就相当于做了[2.1 安装并配置Python版SSR客户端（最重要）](#21-安装并配置python版ssr客户端最重要)这个步骤，只是端口不是`1080`了，而是`12345`。所以后续配置相似，选择[2.2 各种方法](#22-各种方法)中的一个即可

该方法非常简单，你甚至不需要在服务器上做任何配置，客户端的话**ssh+一个浏览器插件**即可（当然，也可以采用上述的各种方法中的其它方法），但前提在于你有一个在国外的服务器，并且每次使用都需要使用ssh连接你的服务器，故只适合特殊情况使用（比如你刚买/租用一个国外的服务器，并且迫切需要科学上网）。

## 4 通过已经可以科学上网的电脑实现科学上网
也就是说，如果你有一台设备通过上述的方法之一实现了科学上网，那么你就可以借助那台设备轻松地让其它和那台设备**属于同一局域网的设备**实现科学上网。比如你的实体机实现了科学上网，那么对于你的kali虚拟机你就没必要想尽各种办法让它与你的实体机进行类似的配置以实现科学上网。具体方法如下：

前提条件：和可以科学上网的主机处于**同一局域网**

实验环境：主机Windows10（已实现科学上网），虚拟机Kali Linux（需要实现科学上网），对于虚拟机，我使用了两个网卡，**网络地址转换**和**仅主机网络**。

实现步骤：
1. 配置主机的ssr客户端，使其**允许来自局域网的连接**。于我而言，我是这么设置的：**右键小飞机->选项设置->勾选来自局域网的连接**
2. 在虚拟机中，配置FireFox浏览器中的网络代理或系统代理，选择手动代理，在所有代理中填入主机的IP地址和其默认的端口（我的是`192.168.56.100`和`1080`）
3. 完成
