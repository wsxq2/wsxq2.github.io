
kali官方网站：`kali.org`, kali中文论坛：`kali.org.cn`

## 关于镜像源
该部分对于所有基于`Debian`的`Linux`均适用

kali常用镜像源(文件位置：`/etc/apt/source.list`)：

<pre>
#官方
#deb https://http.kali.org/kali kali-rolling main non-free contrib 
#deb-src https://http.kali.org/kali kali-rolling main non-free contrib
#deb https://security.kali.org/kali-security kali/updates main contrib non-free

#中国科学技术大学开源镜像
deb http://mirrors.ustc.edu.cn/kali kali main non-free contrib
deb-src http://mirrors.ustc.edu.cn/kali kali main non-free contrib
deb http://mirrors.ustc.edu.cn/kali-security kali/updates main contrib non-free

#阿里云镜像
#deb http://mirrors.aliyun.com/kali kali main non-free contrib
#deb-src http://mirrors.aliyun.com/kali kali main non-free contrib
#deb http://mirrors.aliyun.com/kali-security kali/updates main contrib non-free
</pre>

可以[点击这里](`http://http.kali.org/README.mirrorlist`)获取最佳镜像，然而亲测并不好用，强烈推荐你所在大学的镜像站，如果没有的话建议使用**中国科学技术大学开源镜像**。

获得`Https`支持：`apt install apt-transport-https`

可以使用`apt edit-source`快速编辑`/etc/apt/source.list`

## 在U盘使用 Kali Linux Persistence
1. 在[Kali Linux Downloads](https://www.kali.org/downloads/)下载`Kali Linux 64 Bit`（或32位）, 也可以在各大**开源镜像站**(比如[USTC Mirror - 中国科学技术大学](http://mirrors.ustc.edu.cn/kali-images/))下载。
2. 制作U盘启动盘
3. 进入启动界面后选择`Live USB Persistence`
4. 使用`gparted` 新建`label`为`persistence`的分区`/dev/sdb2`
5. 挂载persistence分区：`mount /dev/sdb2 /mnt`
6. 往`persistence`分区的根目录添加一个内容为`/ union`的新文件`persistence.conf`：`echo "/ union" > /mnt/persistence.conf`
7. 缷载`persitence`分区：`umount /dev/sdb2`

详情：[Kali Linux Live USB Persistence](https://docs.kali.org/downloading/kali-linux-live-usb-persistence)

## 编辑磁盘分区卷标
该部分对于所有`Linux`均适用

编辑ext2/ext3/FAT32/NTFS磁盘分区卷标, 根据不同的磁盘分区类型, 有3个程序可供选用:
1. `FAT32`: `Mtools`
2. `NTFS`: `ntfsprogs`
3. `ext2`,`ext3`: `e2label`

详情：[重命名USB磁盘挂载分区卷标](http://wiki.ubuntu.org.cn/%E9%87%8D%E5%91%BD%E5%90%8DUSB%E7%A3%81%E7%9B%98%E6%8C%82%E8%BD%BD%E5%88%86%E5%8C%BA%E5%8D%B7%E6%A0%87)

