---
tags: [Note,TouchSprite,ADB,Lua,脚本]
---


<p id="markdown-toc"></p>
<!-- vim-markdown-toc GFM -->

* [1 学习路线](#1-学习路线)
* [2 常用链接](#2-常用链接)
* [3 连接安卓模拟器](#3-连接安卓模拟器)
* [4 常用ADB命令](#4-常用adb命令)
  * [4.1 push pull](#41-push-pull)
  * [4.2 install uninstall](#42-install-uninstall)
  * [4.3 shell](#43-shell)
    * [4.3.1 pm](#431-pm)
    * [4.3.2 am](#432-am)
    * [4.3.3 input](#433-input)
    * [4.3.4 screencap](#434-screencap)
    * [4.3.5 getprop setprop](#435-getprop-setprop)
    * [4.3.6 dumpsys](#436-dumpsys)
  * [4.4 logcat](#44-logcat)
  * [4.5 start-server kill-server](#45-start-server-kill-server)
* [5 Lua语言](#5-lua语言)
  * [5.1 基本特性](#51-基本特性)
  * [5.2 程序控制语句](#52-程序控制语句)
  * [5.3 运算符](#53-运算符)
  * [5.4 变量](#54-变量)
* [6 IDE 常用快捷键](#6-ide-常用快捷键)
  * [6.1 调试运行](#61-调试运行)
  * [6.2 脚本编辑](#62-脚本编辑)
* [7 我写的脚本](#7-我写的脚本)

<!-- vim-markdown-toc -->

*[TS]: TouchSprite
*[ADB]: Android Debug Bridge

[Awesome Adb]: https://github.com/mzlogin/awesome-adb
[adb命令模拟按键事件 KeyCode]: https://blog.csdn.net/jlminghui/article/details/39268419
[触动精灵脚本开发Lua简明教程]: https://www.zybuluo.com/miniknife/note/317045
[【雷电命令】雷电安卓模拟器修改信息及常用adb命令整理贴]: http://www.ldmnq.com/bbs/thread-32-1-1.html
[【新手指导】夜神安卓模拟器adb命令详解]: https://www.yeshen.com/faqs/H15tDZ6YW
[触动精灵开发手册大全]: http://www.touchsprite.com/helpdoc

## 1 学习路线
1. 连接安卓模拟器：
   1. 夜神：[【新手指导】夜神安卓模拟器adb命令详解]
   2. 雷电：[【雷电命令】雷电安卓模拟器修改信息及常用adb命令整理贴]
2. ADB命令：[Awesome Adb]
3. lua语言：[触动精灵脚本开发Lua简明教程]
4. 触动精灵相关知识：
   1. [触动精灵脚本开发新手指南](https://www.zybuluo.com/miniknife/note/509515)
   1. [触动精灵脚本开发手册](https://www.zybuluo.com/miniknife/note/212706)
   1. [TSLib 触动精灵基础扩展库使用手册](https://www.zybuluo.com/miniknife/note/293935)
   
   1. [触动精灵 IDE 脚本编辑器使用手册](https://www.zybuluo.com/miniknife/note/123055)
   1. [触动精灵抓色器使用手册](https://www.zybuluo.com/miniknife/note/629913)
   1. [触动精灵字库工具使用手册](https://www.zybuluo.com/miniknife/note/629179)
   
   1. [手机脚本开发实用技巧 - 触动精灵官网](https://www.touchsprite.com/docs/5026)
   1. [触动精灵 Android 模拟器使用手册](https://www.zybuluo.com/miniknife/note/443336)
   1. [触动精灵 Lua 脚本开发常用英文词汇大全 - 触动精灵官网](https://www.touchsprite.com/docs/5484)
   1. [开发常见问题 - 触动精灵官网](https://www.touchsprite.com/docs/629)
   1. [触动精灵常见问题 - 触动精灵官网](https://www.touchsprite.com/docs/531)
   1. [触动精灵脚本开发实例代码](https://www.zybuluo.com/miniknife/note/323513)


## 2 常用链接
1. 安卓模拟器：
   1. 雷电：
      1. 官网：<https://www.ldmnq.com>
      2. [【雷电命令】雷电安卓模拟器修改信息及常用adb命令整理贴]

   2. 夜神：
      1. 官网：<https://www.yeshen.com>
      2. [【新手指导】夜神安卓模拟器adb命令详解]

2. ADB:
	 1. ADB参考手册：[Awesome Adb]
   2. [adb命令模拟按键事件 KeyCode]
   3. [【新手指导】夜神安卓模拟器adb命令详解]
   4. [【雷电命令】雷电安卓模拟器修改信息及常用adb命令整理贴]

3. lua:
	 1. [触动精灵脚本开发Lua简明教程]
	 2. lua语言官方手册(英文)：<https://www.lua.org/manual/5.2/>
	 3. [Programming in Lua (first edition)](https://www.lua.org/pil/contents.html)
	 4. lua语言中文手册：<http://manual.luaer.cn/>

4. TS:
	 1. 触动精灵官网：<https://www.touchsprite.com/>
	 2. 触动精灵论坛：<https://bbs.touchsprite.com/forum.php>
	 3. 触动精灵开发手册大全：<https://www.touchsprite.com/helpdoc>
   4. 触动精灵脚本开发手册: <https://www.zybuluo.com/miniknife/note/212706>


## 3 连接安卓模拟器
* 添加`adb`命令到`PATH`环境变量。安装完成后，找到安装路径（如`D:\Changzhi\dnplayer2`），将`adb.exe`所在目录（即前述的安装路径）添加到`PATH`**环境变量**以方便使用。关于如何在 Windows 中添加`PATH`环境变量，可自行百度。如果没有添加环境变量，则每次使用`adb`命令前，你都需要先执行`cd`命令，如下所示：
  ```
  cd D:\Changzhi\dnplayer2
  adb devices
  ……
  ```
  
* 使用`adb devices`查看正在运行的设备。如下所示（我用的 Powershell，CMD类似）：
  ```
  PS C:\Users\wsxq2> adb devices # 查看正在运行的模拟器
  List of devices attached
  127.0.0.1:5555  device
  127.0.0.1:5557  device
  ```
  
* 使用`adb -s {127.0.0.1:<指定端口>|<模拟器标识>}` 可连接任意指定的设备。如打开`adb shell`：
  ```
  adb -s 127.0.0.1:5555 shell
  ```
  或者
  ```
  adb -s emulator-5556 shell
  ```
  
* 使用` adb -s {127.0.0.1:<指定端口>|<模拟器标识>} forward tcp:50005 tcp:50005`转发模拟器中触动精灵的端口（50005）到电脑的本地端口（50005），用于连接 IDE 和模拟器、连接取色器和模拟器。如：
  ```
  adb -s 127.0.0.1:5555 forward tcp:50005 tcp:50005
  ```
  
  其中`-s`参数用来选定模拟器`127.0.0.1:5555`，`forward`表示转发模拟器中的端口到计算机本地端口，`forward`之后的参数之所以均为`tcp:50005`是因为模拟器中触动精灵每次启动时会打开 TCP 协议的`50005`端口，而相关的开发工具（主要是指`TouchSpriteStudio.exe`和`TSColorPicker.exe`，因为它们需要和模拟器连接，前者用于调试，后者用于截图）默认也会使用计算机本地的 TCP 协议的`50005`端口，所以将模拟器中的`50005`端口转发至本地计算机的`50005`端口以便于使用。

* 使用`adb kill-server`杀死正在运行的服务，然后执行`adb start-server`重新启动服务。很多时候连不上，就是因为没有 kill

此外，夜神模拟器和雷电模拟器在某些地方略有差别，简述如下：

1. 夜神：
   * `adb.exe`默认路径为：`D:\Program Files (x86)\Nox\bin\adb.exe`
   * 端口规律：第一个模拟器端口是`62001`，第二个模拟器端口是`62025`，第三个是`62025+1`，以此类推
   * `nox_adb.exe`完全等同于`adb.exe`
2. 雷电：
   * `adb.exe`默认路径为：`D:\Changzhi\dnplayer2\adb.exe`
   * 端口规律：`5555 + index * 2`

## 4 常用ADB命令
本部分主要参考自[【新手指导】夜神安卓模拟器adb命令详解] 和 [【雷电命令】雷电安卓模拟器修改信息及常用adb命令整理贴]

使用`adb /?`查看命令自带帮助，参考手册：[Awesome Adb]

### 4.1 push pull
* `push`: 把电脑上的文件或文件夹传到模拟器
  ```
  adb push D:/aaa.avi /mnt/avi/
  ```
* `pull`: 把模拟器里面的文件或文件夹传到电脑上
  ```
  adb pull /mnt/avi/aaa.avi D:/avi/
  ```

### 4.2 install uninstall
* `install`: 安装APK
  ```
  adb install d:\\qq.apk
  ```

* `uninstall`: 卸载APK
  ```
  adb uninstall com.tencent.mobileqq
  ```

### 4.3 shell
`shell`: 执行在安卓上执行的shell命令。即这部分的命令既能以`adb shell ...`的形式执行（如`adb shell pm list packages`），也能使用`adb shell`先进入设备的终端然后直接执行（如`pm list packages`）

#### 4.3.1 pm
`pm`: Package Manager
* `list`: 获取模拟器所有包名
  ```
  adb shell pm list packages #获取模拟器所有包名
  adb shell pm list packages -f #获取模拟器所有包名并且包括APK路径
  ```
* `path`: 获取包名对应的APK路径
  ```
  adb shell pm path packageName
  ```
* `clear`: 清理应用数据
  ```
  adb shell pm clear packageName
  ```

#### 4.3.2 am
`am`: Activity Manager。该命令用来执行一些系统动作, 例如启动指定activity, 结束进程, 发送广播, 更改屏幕属性等. 调试利器.
* `start`: 根据intent指向启动Activity, Intent可以是显示的指向activity, 也可以是ACTION方式, 并且可以添加flag, data等参数信息.
  ```
  adb shell am start com.tencent.android.qqdownloader/com.tencent.assistant.activity.SplashActivity #启动应用宝
  ```
* `force-stop`: 关闭应用
  ```
  adb shell am force-stop 包名
  ```
* `startservice <Intent>`: 启动Service, 可以添加flag, data等参数信息.
* `broadcast <Intent>`: 发送广播, 可以添加flag, data等参数信息.
* `monitor`: 启动一个Crash和ANR的监听器, 如有Crash或ANR会在控制台输出相关信息.
* `force-stop <Package>`: 强制停止该包相关的一切, 传入package name.
* `kill <Package>`: 杀死该包相关的所有进程, 传入package name.
* `kill-all`: 杀死所有后台进程
* `display-size WxH`: 改变显示的分辨率. 手机可能不支持.
  ```
    adb shell am display-size 1280x720
  ```
* `display-density <dpi>`: 改变显示的density, 手机可能不支持.
  ```
  adb shell am display-density 320,
  ```

#### 4.3.3 input
`input`: 模拟输入

* `text`: 模拟输入文本
  ```
  adb shell input text 字符串(不支持中文)
  ```
* `keyevent`: 模拟按键。KeyCode参考手册: [adb命令模拟按键事件 KeyCode]
  ```
  adb shell input keyevent 键值
  ```
* `tap`: 模拟鼠标点击
  ```
  adb shell input tap X Y
  ```
* `swipe`: 模拟鼠标滑动
  ```
  adb shell input swipe X1 Y1 X2 Y2
  ```

#### 4.3.4 screencap
`screencap`: 截屏
```
adb shell screencap -p /sdcard/screencap.png
```

#### 4.3.5 getprop setprop
`setprop`: 设置手机IMEI/IMSI/手机号/SIM卡序列号
```
adb shell setprop persist.nox.modem.imei 352462010682470
adb shell setprop persist.nox.modem.imsi 460000000000000
adb shell setprop persist.nox.modem.phonumber 15605569000
adb shell setprop persist.nox.modem.serial 89860000000000000000
# adb shell进去然后执行下面的命令修改经纬度
setprop persist.nox.gps.latitude xxx
setprop persist.nox.gps.longitude xxx
# adb shell进去然后执行下面的命令修改mac地址
setprop persist.nox.wifimac xxx                  # 修改mac地址
setprop persist.nox.modem.phonumber 138111111111 # 手机号，生成一个随机11位数字
setprop persist.nox.model ABC001                 # 手机型号，英文加数字随机
setprop persist.nox.manufacturer XiaoMi          # 手机制造商英文随机
setprop persist.nox.brand Mi                     # 手机品牌英文随机
```

#### 4.3.6 dumpsys
`dumpsys`: 强大的dump工具, 可以输出很多系统信息. 例如window, activity, task/back stack信息, wifi信息等.
* `activity`: 输出app组件相关信息。可以用细分参数获得单项内容
  * `activites`: 获取activity task/back stack信息.
    ```
    adb shell dumpsys activity activities
    ```
  * `service`
  * `providers`
  * `intents`
  * `broadcasts`
  * `processes`
* `alarm`: 输出当前系统的alarm信息
* `cpuinfo`: 输出当前的CPU使用情况
* `diskstats`: 输出当前的磁盘使用状态
* `batterystats`: 电池使用信息
* `package`: package相关信息, 相当于pm功能的集合, 输出诸如libs, features, packages等信息
* `meminfo`: 输出每个App的内存使用和系统内存状态, 可以指定包名, 例如adb shell dumpsys meminfo com.anly.githubapp
* `window`: 输出当前窗口相关信息. 
  * `policy`
  * `animator`
  * `tokens`
  * `windows`

### 4.4 logcat
`logcat`: 打印log信息
```
adb logcat #打印log
adb logcat -c #清除手机的log buffer(有些手机权限控制, 不支持.)
adb logcat -b <buffer> #打印指定buffer的log信息,buffer有: main(主log区,默认), events(事件相关的log), radio(射频, telephony相关的log)
adb logcat -v <format> #格式化输出log, 常用的用adb logcat -v time显示时间
adb logcat -f <filename> #输出log到指定文件
```

### 4.5 start-server kill-server
`start-server/kill-server`: 启动/杀死adb简介中提到的Server端进程。

<pre>
adb kill-server #由于adb并不稳定, 有时候莫名的问题掉线时 
adb start-server #可以先kill-server, 然后start-server来确保Server进程启动。往往可以解决问题。
</pre>

## 5 Lua语言
### 5.1 基本特性
* 注释：
   ```lua
   print("hello the world") --这是单行注释
   --[[这是
   多行
   注释
   ]]
   ```
* 语句分隔符：`空白字符`或`;`。建议多个语句写在同一行时使用`;`
   ```lua
   x=1;y=1
   print("x,y: "..x..","..y)
   ```
* 语句块：
   ```lua
   do
       语句块
   end
   ```
* 赋值语句：
   ```lua
   a,b,c,d=1,2,3,4
   a,b=b,a -- 多么方便的交换变量功能啊。
   local a,b,c = 1,2,3 -- a,b,c 都是局部变量(不使用local则为全局变量)
   ```
* 关键字：
  ```lua
  and break do else elseif
  end false for function if in local nil not or 
  repeat return then true until　while
  ```

### 5.2 程序控制语句
   1. 条件控制：
      ```lua
	  if 条件 then
	      语句
	  elseif 条件 then
	      语句
	  else
	      语句
	  end
	  ```
   2. 循环语句：
      1. `while`
		 <pre>
   	     my_table = {1,2,3}
         local index = 1  -- 注意: table 中的索引从 1 开始
         
         while my_table[index] do   -- 只要条件返回 true，就一直执行循环
         print(my_table[index])
         index = index +1   -- Lua 中没有 i++ 的写法，所以只能用这种写法
         end
         
         -- 输出 1
         --      2
         --      3
		 </pre>
	  2. `repeat`(相当于`do while`)
         ```lua
		 local snum = 1 --起始值
         repeat
         print("snum is "..snum)
         snum = snum + 1
         until snum == 4   --当 snum 等于 4 时 跳出循环
         
         --输出:
         --snum is 1
         --snum is 2
         --snum is 3
         ```
	  3. `for`
	     > **Note**:
	     > * First, all three expressions are evaluated once, before the loop starts;
		 > * Second, the control variable is a local variable automatically declared by the for statement and is visible only inside the loop;
		 > * Third, you should **never change** the value of the control variable: The effect of such changes is unpredictable.(you can use `while` instead)

         ```lua
		 my_table = {1,2,3,4,5}
		 --下面的for循环中：1为起始值，5为最大值，2为步进值
		 for i = 1,#my_table,2 do --#my_table 表示取表的长度,上边定义了长度为 5
             print(my_table[i])
         end
         ```

### 5.3 运算符
  * 数值运算：`+`, `-`, `*`, `/`, `%`, `^`
  * 比较运算：`>`, `<`, `>=`, `<=`, `==`, `~=`. 分别表示: `小于`，`大于`，`不大于`，`不小于`，`相等`，`不相等`。所有这些操作符总是返回 `true` 或 `false`。对于`Table`,`Function`和`Userdata`类型的数据，只有`==`和`~=`可以用。相等表示两个变量引用的是同一个数据。
    ```lua
    a={1,2}
    b=a
    print(a==b, a~=b) -- true, false
    a={1,2}
    b={1,2}
    print(a==b, a~=b) -- false, true
    ```
  * 逻辑运算：`and`, `or`, `not`。其中，`and`和`or`与`C`语言区别特别大。在`Lua`中，只有`false`和`nil`才计算为`false`，其它任何数据都计算为`true`，`0`也是`true`！`and`和`or`的运算结果不是`true`和`false`，而是和它的两个操作数相关。  

    `a and b`： 如果`a`为`false`，则返回`a`；否则返回`b`  
    `a or b`： 如果`a`为`true`，则返回`a`；否则返回`b`
    ```lua
    print(4 and 5) --> 5
    print(nil and 13) --> nil
    print(false and 13) --> false
    print(4 or 5) --> 4
    print(false or 5) --> 5
    ```
    技巧：
    ```lua
    x = a and b or c --相当于x = a? b : c
    x = x or v --相当于if not x then x = v end
    ```
  * 运算符优先级：从高到低顺序如下：

    ```lua
    ^
    not - （一元运算）
    * /
    + -
    ..（字符串连接）
    < > <= >= ~= ==
    and
    or
    ```

### 5.4 变量
* 变量类型：使用`type()`获得
  * `nil`空值: 所有没有使用过的变量，都是 nil。nil 既是值，又是类型。
  * `boolean`布尔值：`true`和`false`。在`Lua`中，只有`false`和`nil`才计算为`false`，其它任何数据都计算为`true`，`0`也是`true`！
  * `number`数值：相当于`c语言`中的`double`类型
  * `string`字符串：可以包含'\0'字符。使用`..`连接两个字符串。可以使用`[[我是一个跨行的字符串]]`来避免在一行插入过多的转义字符(详见变量的定义中的示例)。
  * `table`关系表：Lua中非常强大的类型: 可以用除了nil的任意类型来作数组的索引，用除了 nil的任意类型的值来作数组的内容。使用`{`和`}`
  * `function`函数：在Lua中，函数也是一种类型。也就是说，所有的函数都是变量。可以接受可变参数，使用`...`和`arg`（`table`类型）。可以同时返回多个结果，使用`,`分隔
  * `userdata`用户数据：这个类型专门用来和`Lua`的宿主打交道的。宿主通常是用`C`和`C++`来编写的，在这种情况下，`userdata`可以是宿主的任意数据类型，常用的有`struct`和`指针`。
  * `thread`线程：在`Lua`中没有真正的线程。`Lua`中可以将一个函数分成几部份运行。
* 变量的定义：在 Lua 中，不管你在什么地方使用变量，都不需要声明，并且所有的这些变量总是全局变量，除非，你在前面加上`local`。定义一个变量的方法就是赋值。变量名是大小写相关的。

  <pre>
  <code>
  var_nil=nil -- 请注意 nil 一定要小写

  var_boolean = true --只有 false 和 nil 才被计算为 false

  var_number=4.57e-3 --Lua没有整数类型

  var_string1="one line\nnext line\n\"in quotes\", 'in quotes'"
  var_string2=[[
  one line
  next line
  "in quotes", 'inquotes']] --比var_string1的可读性强

  var_table1= --超级强大的table类型
  {
          10, -- 相当于 [1] = 10
        [100] = 40,
              John= -- 如果你原意，你还可以写成：["John"] =
              {
                      Age=27,   -- 如果你原意，你还可以写成：["Age"] =27
                      Gender=Male   -- 如果你原意，你还可以写成：["Gender"] =Male
                  },
              20 -- 相当于 [2] = 20
  }
  var_table2= --面向对象编程
  {
   Age = 27
   add = function(self, n) self.Age = self.Age+n end --t.add(t,10)可以简写成t:add(10)
  }
  
  var_function1=function (a,b) return a+b end
  function var_function2(a,b)
      return a+b
  end
  function var_minmax(a,b,...)
     local min,max,temp,arg
     arg={...}
     min=a>b and b or a
     max=a<b and b or a
     for i=1,#arg do
        temp=arg[i]
        min=min>temp and temp or min
        max=max<temp and temp or max
     end
     return min,max
  end
  </code>
  </pre>

## 6 IDE 常用快捷键
这部分的内容参考自：[触动精灵 IDE 脚本编辑器使用手册 - 作业部落 Cmd Markdown 编辑阅读器](https://www.zybuluo.com/miniknife/note/123055#%E5%B8%B8%E7%94%A8%E5%BF%AB%E6%8D%B7%E9%94%AE)

### 6.1 调试运行
* `F6`: 本地代码运行，不支持运行包含触动精灵扩展函数的代码
* `Alt + S`: 发送文件到设备，需先在左侧项目列表中选中需要发送的文件（支持ctrl多选），发送文件格式支持 lua、luac、txt，使用此功能前需要先连接设备
* `Alt + R`: 将当前脚本传至设备上并运行，使用此功能远程运行脚本不会出现运行提示框，此功能需先连接设备
* `F7`: 对当前代码进行二进制编译，生成的文件路径会在输出窗口提示
* `Shift + F7`: 代码检查，可检查是否有语法错误，可在输出栏直接双击错误提示跳转到对应行
* `F9`: 在当前光标行设置断点，在远程调试中使用
* `F10`: 单步运行跟踪，在远程调试中使用
* `Ctrl + Shift + D`: 开始/继续 远程调试，在远程调试中使用
* `Shift + F5`: 终止远程调试中的脚本运行
* `Ctrl + Shift + W`: 打开/关闭 监视窗口，用于远程调试
* `Ctrl + Shift + S`: 打开/关闭 调用堆栈窗口，用于远程调试

### 6.2 脚本编辑
* `Ctrl + Shift + p`: 打开/关闭 文件管理窗口
* `F12`: 对整个代码进行折叠，再按一次取消折叠
* `Ctrl + I`: 一键自动缩进，可对当前代码进行智能缩进排版
* `Ctrl + D`: 快速复制当前行，以当前光标为准
* `Ctrl + C`: 快速复制当前行到剪贴板
* `Ctrl + V`: 黏贴剪贴板内容到光标位置
* `Ctrl + U`: 代码注释，对已经注释的代码使用会取消注释
* `Ctrl + B`: 打开快捷操作栏，可用来快速检索内容，如：直接输入字符可直接在整个项目目录搜索对应内容打开并显示在当前窗口
* `Ctrl + G`: 可通过输入行号快速跳转到指定行
* `Ctrl + F2`: 对光标所在行设置标签，用于不同行之间的快速跳转
* `F2`: 跳转至下一个标签行，需先设置标签
* `Shift + F2`: 跳转到上一个标签行，需先设置标签
* `Ctrl + F`: 搜索替换
* `Ctrl + F`: 在当前代码中搜索
* `Ctrl + Shift + F`: 在文件中进行搜索、支持多级子目录、支持搜索结果上下文显示，在搜索结果中双击可自动打开对应文件并跳转至对应行
* `Ctrl + "+"`: 对显示字体进行放大
* `Ctrl + "-"`: 对显示字体进行缩小
* `Ctrl + 0`: 还原字体大小为默认

## 7 我写的脚本
* 全民k歌刷鲜花脚本：<https://github.com/wsxq2/WeSingFlowers>
* 微信跳一跳自动运行脚本：<https://github.com/wsxq2/jump>
