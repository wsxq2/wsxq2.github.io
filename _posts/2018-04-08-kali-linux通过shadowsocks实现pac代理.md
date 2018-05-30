---
layout: post
tags: [kali,shadowsocks]
categories: blog
---

## 实现步骤
1. 在`/etc/apt/sources.list`末尾添加: `deb http://ppa.launchpad.net/hzwhuang/ss-qt5/ubuntu devel main`
2. 更新apt软件列表：
	```
	apt update #这里会提示错误，以下两步解决该错误
	gpg --keyserver keyserver.ubuntu.com --recv 6DA746A05F00FA99
	gpg --export --armor 6DA746A05F00FA99 | sudo apt-key add -
	apt update #这一步成功后便可安装shadowsocks-qt5了
	```
3. 安装shadowsocks-qt5: `apt install shadowsocks-qt5 `。
4. 安装后在`bash`中输入`ss-qt5`, 完成配置, 配置好后的图如下：![ss-qt5](http://wsxq12.55555.io/ss-qt5)
   图中的服务器使用的是我花**180￥/年**租用的搬瓦工的VPS(见下图)
   ![bwg](http://wsxq12.55555.io/bwg)
4. 获得pac文件：

	    pip install genpac
	    pip install --upgrade genpac
	    mkdir ~/vpnPAC
	    cd ~/vpnPAC
	    touch user-rules.txt
	    genpac -p "SOCKS5 127.0.0.1:1080" --gfwlist-proxy="SOCKS5 127.0.0.1:1080" --output="autoproxy.pac" --gfwlist-url="https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt" --user-rule-from="user-rules.txt"

												
5. 系统设置自动代理: **设置->网络->网络代理**，**方式**改为**自动**，**配置URL**改为：`file://~/vpnPAC/autoproxy.pac`(如果需要的话，请用具体的家目录代替`～`(如`/root`))

## 优化
1. 设置开机启动：通过`kali linux`自带的优化工具实现: `Win+a`, 直接输入优化工具，出现优化工具图标（当然你也可以自己找），双击，找到开机启动程序，添加`shadowsock-qt5`
2. 自动连接某个节点：打开`bash`，输入`ss-qt5`，**右键某个节点->编辑->程序启动时自动连接**
3. 通过快捷键开启或关闭shadowsocks-qt5: **设置->键盘->添加自定义快捷键**（滑到最下面你会看到一个`+`）， **名字**可以随意，**命令**输入`ss-qt5`（关闭时输入`pkill ss-qt5`），**按键**设置成你喜欢的即可。
