---
tags: [kali,U盘]
---

kali官方网站：<https://www.kali.org>

<p id="markdown-toc"></p>
<!-- vim-markdown-toc GFM -->

* [下载 Kali Linux](#下载-kali-linux)
* [制作U盘启动盘](#制作u盘启动盘)
* [设置 Live USB Persistence](#设置-live-usb-persistence)
* [FAQ](#faq)
  * [Linux Bash中如何编辑磁盘分区卷标？](#linux-bash中如何编辑磁盘分区卷标)
* [链接](#链接)

<!-- vim-markdown-toc -->

## 下载 Kali Linux
在[Kali Linux Downloads](https://www.kali.org/downloads/)下载`Kali Linux 64 Bit`（或32位）, 也可以在各大**开源镜像站**(比如[USTC Mirror - 中国科学技术大学][ustc-mirror])下载。

[ustc-mirror]:http://www.url.com

通常在国内的开源镜像站下载要快得多，而国内开源镜像站的`kali`镜像目录及文件通常较多，常常让人眼花缭乱，但事实上都很有规律，下面简要说明一下（以[USTC Mirror][ustc-mirror]为例。

```
../
current/                                           04-Mar-2019 14:04                   -
kali-2018.3a/                                      14-Sep-2018 19:33                   -
kali-2018.4/                                       29-Oct-2018 07:16                   -
kali-2019.1/                                       17-Feb-2019 19:06                   -
kali-2019.1a/                                      04-Mar-2019 14:04                   -
kali-weekly/                                       17-Mar-2019 04:22                   -
project/                                           04-Dec-2014 14:11                   -
README                                             14-Jan-2019 13:57                 519
```

* `current/`: 最新版
* `kali-<date>.xx/`: 旧版（最后一个是最新版）
* `kali-weekly/`: 周更新版本（kali特色），也可以使用
* `README`: 说明文件

## 制作U盘启动盘
简单起见，我们使用[rufus](https://rufus.ie/)（for Windows）制作启动U盘。这个软件界面简单，操作方便，强烈推荐

> Rufus 是一个可以帮助格式化和创建可引导USB闪存盘的工具，比如 USB 随身碟，记忆棒等等。
>                                                                       ——引用自官网


设置如下图所示即可：
![rufus3.4p截图.png](/kali-linux-live-usb-persistence/rufus3.4p截图.png)


## 设置 Live USB Persistence
3. 进入启动界面后选择`Live USB Persistence`
4. 使用`gparted` 新建 label 为`persistence`的分区`/dev/sdb3`（可能不是sdb3，根据情况修改）
5. 挂载 persistence 分区：
   ```
   mount /dev/sdb3 /mnt
   ```

6. 往`persistence`分区的根目录添加一个内容为`/ union`的新文件`persistence.conf`：
   ```
   echo "/ union" > /mnt/persistence.conf
   ```

7. 缷载`persitence`分区：
   ```
   umount /dev/sdb3
   ```

详情：[Kali Linux Live USB Persistence](https://docs.kali.org/downloading/kali-linux-live-usb-persistence)

## FAQ
###  Linux Bash中如何编辑磁盘分区卷标？

编辑ext2/ext3/FAT32/NTFS磁盘分区卷标, 根据不同的磁盘分区类型, 有3个程序可供选用:
1. `FAT32`: `dosfstools`软件包中的`dosfslabel`命令
2. `NTFS`: `ntfsprogs`
3. `ext2`,`ext3`: `e2label`

详情：[重命名USB磁盘挂载分区卷标](https://wiki.ubuntu.org.cn/%E9%87%8D%E5%91%BD%E5%90%8DUSB%E7%A3%81%E7%9B%98%E6%8C%82%E8%BD%BD%E5%88%86%E5%8C%BA%E5%8D%B7%E6%A0%87)


## 链接
下面总结了本文中使用的所有链接：

<!-- link start -->
* [Kali Linux Downloads](https://www.kali.org/downloads/)
* [rufus](https://rufus.ie/)
* [Kali Linux Live USB Persistence](https://docs.kali.org/downloading/kali-linux-live-usb-persistence)
* [重命名USB磁盘挂载分区卷标](https://wiki.ubuntu.org.cn/%E9%87%8D%E5%91%BD%E5%90%8DUSB%E7%A3%81%E7%9B%98%E6%8C%82%E8%BD%BD%E5%88%86%E5%8C%BA%E5%8D%B7%E6%A0%87)
* [USTC Mirror - 中国科学技术大学][ustc-mirror]

<!-- link end -->

<!-- abbreviations start -->

<!-- abbreviations end -->
