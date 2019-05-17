---
tags: [Powershell,TODO]
last_modified_time: 2019-05-14 19:52:30 +0800
---


<p id="markdown-toc"></p>
<!-- vim-markdown-toc GFM -->

* [重要链接](#重要链接)
* [遇到的问题](#遇到的问题)
  * [获取某个命令的路径？（如`bash`中的`which`）](#获取某个命令的路径如bash中的which)
    * [使用 `Get-Command`](#使用-get-command)
    * [使用 `where.exe`](#使用-whereexe)
  * [添加 Windows 功能？](#添加-windows-功能)
* [链接](#链接)

<!-- vim-markdown-toc -->

## 重要链接
* 维基百科: [Windows PowerShell - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/Windows_PowerShell)
* GitHub: [PowerShell/PowerShell: PowerShell for every system!](https://github.com/PowerShell/PowerShell)
* 官方文档: [PowerShell Documentation \| Microsoft Docs](https://docs.microsoft.com/en-us/powershell/)
* 官方脚本资源: [PowerShell Gallery \| Home](https://www.powershellgallery.com/)
* 非官方教程: [PowerShell 在线教程 – PowerShell 中文博客](https://www.pstips.net/powershell-online-tutorials)

## 遇到的问题
### 获取某个命令的路径？（如`bash`中的`which`）
详情参见 [windows - Equivalent of cmd's "where" in powershell - Super User](https://superuser.com/questions/675837/equivalent-of-cmds-where-in-powershell/675838)

#### 使用 `Get-Command`
```
PS C:\Users\alec> (get-command notepad.exe).Path
C:\WINDOWS\system32\notepad.exe
```

#### 使用 `where.exe`
```
PS C:\Users\alec> where
cmdlet Where-Object at command pipeline position 1
...

PS C:\Users\alec> where.exe
The syntax of this command is:

WHERE [/R dir] [/Q] [/F] [/T] pattern...
```

### 添加 Windows 功能？
详情参见 [Add or Remove Windows Features Via Command Prompt or PowerShell • Raymond.CC](https://www.raymond.cc/blog/add-or-remove-windows-features-through-the-command-prompt/)


## 链接
下面总结了本文中使用的所有链接：

<!-- link start -->

<!-- link end -->
