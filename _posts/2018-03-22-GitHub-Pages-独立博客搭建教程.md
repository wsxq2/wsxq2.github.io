---
tags: [GitHub Pages,独立博客,jekyll]
last_modified_time: 2019-05-12 11:56:30 +0800
---

**温馨提示**: 

1. 本文所用平台： Kali Linux (基于 Debian)。对于 Mac OS 用户推荐参考 [用Jekyll搭建的Github Pages个人博客](http://louisly.com/2016/04/used-jekyll-to-create-my-github-blog/)。当然，结合本文食用应该效果更佳
2. 本文适合对象：对 git 和 GitHub 有一定了解，对 GitHub Pages 几乎完全不了解的**有强烈愿望**搭建独立博客的人。因为要学的东西超多，不过有的东西浅尝辄止即可，不要过于深入

使用 GitHub Pages 搭建独立博客涉及以下内容：`git`、`GitHub Pages`、`GitHub`、`jekyll`、`markdown`、`liquid`、`YAML`、`ruby`

<p id="markdown-toc"></p>

<!-- vim-markdown-toc GFM -->

* [概述](#概述)
  * [独立博客是什么](#独立博客是什么)
  * [为什么要搭建独立博客](#为什么要搭建独立博客)
    * [为什么要搭建博客](#为什么要搭建博客)
    * [为什么要搭建独立博客](#为什么要搭建独立博客-1)
  * [如何搭建](#如何搭建)
* [概念区分](#概念区分)
  * [git](#git)
  * [GitHub](#github)
  * [GitHub Pages](#github-pages)
* [最基本独立博客搭建](#最基本独立博客搭建)
* [认识 Jekyll](#认识-jekyll)
  * [基本结构](#基本结构)
  * [调试](#调试)
* [使用模板](#使用模板)
  * [模板选择](#模板选择)
  * [如何使用](#如何使用)
* [搭建和 GitHub Pages 一致的本地 Jekyll 环境](#搭建和-github-pages-一致的本地-jekyll-环境)
  * [将你的 GitHub Pages 对应的 repository 克隆到本地](#将你的-github-pages-对应的-repository-克隆到本地)
  * [安装 ruby 语言开发环境](#安装-ruby-语言开发环境)
  * [安装 bundle](#安装-bundle)
  * [安装 GitHub Pages 需要的包](#安装-github-pages-需要的包)
  * [运行](#运行)
* [写博客](#写博客)
  * [博客文章放置的位置及标记语言选择](#博客文章放置的位置及标记语言选择)
  * [文章命名格式](#文章命名格式)
  * [文章头信息](#文章头信息)
* [自动化](#自动化)
* [结语](#结语)
* [链接](#链接)

<!-- vim-markdown-toc -->


## 概述
这一部分回答三个问题：独立博客是什么？为什么要搭建独立博客？如何搭建？

### 独立博客是什么
在此之前，想必大家也在搜索时发现了一个解决问题的好去处——CSDN博客，那里的方法通常都是靠谱的，回答也是准确的。当然，还有简书、cnblog、知乎专栏等其它好去处。这些博客均被称为第三方博客。

而所谓的独立博客和 CSDN 之类的博客不同的地方在于，它是几乎不依赖其它平台的。因此，也就不会存在广告和其它不必要的东西。一言以蔽之，使用独立博客，你将拥有绝对的自由

### 为什么要搭建独立博客
这个问题分成两点回答：为什么要搭建博客？为什么要搭建独立博客？
#### 为什么要搭建博客
1. 记录和分享。将一些东西存储下来，以便以后查阅

#### 为什么要搭建独立博客
1. 对自由的追求，可完全自主
2. 拥有自己的独立域名，高大上
3. 我讨厌广告
4. 第三方博客提供的功能不够。例如 CSDN、简书等都没有侧边栏目录
5. 喜欢在折腾中学习

### 如何搭建
以前搭建独立博客，通常需要先租用一个服务器，学会 Web 前端的大量知识，然后设计网页，写博客时要写 HTML 代码（这点是我猜的，虽然应该不会这么凄惨）。总之，在以前搭建独立博客是相当困难的。但是，现在不一样了。

现在搭建一个独立博客有非常多的解决方案，而其中一个非常流行的解决方案便是 GitHub Pages。本文便是讲述如何搭建 GitHub Pages 独立博客

## 概念区分
首先，让我们区分一些基本的概念：`git`, `GitHub`和`GitHub Pages`。其实它们的区别很明显。简而言之，`git`是个版本控制软件，`GitHub`是个放代码的地方，`GitHub Pages`是个放文档的地方。

### git
git 是一个分布式版本控制软件，最初目的是为更好地管理Linux内核开发而设计。与 git 类似的还有 SVN（Apache Subversion）。详情参见 [git - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/Git)

为学习 git 你可能需要[git教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)，如果已通过该网站学习过，则可参考我的另一篇博客 [git教程笔记](https://wsxq2.55555.io/blog/2018/04/02/Git教程笔记) 进行复习

### GitHub
GitHub 简介: 

> &emsp;&emsp;GitHub is a **code hosting platform** for **version control and collaboration(合作)**. It lets you and others work together on projects from **anywhere**.

即 GitHub 是一个保存代码的，用于版本控制与合作的平台。它允许你和其他人共同对一个项目进行开发，而且不受地域限制（有网即可）

GitHub官网：[GitHub](https://github.com/)

### GitHub Pages

GitHub Pages 简介:

> &emsp;&emsp;GitHub Pages is a **static site hosting service** designed to host your **personal, organization, or project pages** directly from a **GitHub repository**.

即 GitHub Pages 是一个静态站点主机服务，目的在于直接通过 GitHub repository 寄存你的个人、组织、或项目文档。有用的相关链接如下：

* GitHub Pages 官网： [GitHub Pages](https://pages.github.com/)
* GitHub Pages 使用的依赖及版本：[Dependency versions \| GitHub Pages](https://pages.github.com/versions/)。该链接非常有用，它指出了 GitHub Pages 支持的插件及版本
* [GitHub Pages Basics - GitHub Help](https://help.github.com/en/categories/github-pages-basics)
* [GitHub Pages指南 GitHub Pages开发中文手册下载-极客学院Wiki](http://wiki.jikexueyuan.com/project/github-pages-basics/)。**注意中文版的内容可能严重滞后**

GitHub Pages 大量使用 ruby 语言（比如其使用的模板系统 Jekyll 就主要是由 ruby 语言写的）

## 最基本独立博客搭建
让我们从最基本的开始： [官方教程](https://pages.github.com/)

**温馨提示**： GitHub Pages 有两种：**User or organization site**和**Project site**，前者可用于个人博客，后者用于项目文档

官方教程很重要，它会让你有个初步认识。看完后**最基本的独立博客**就算搭建好了。

## 认识 Jekyll
你应该已经发现了，最基本的博客非常难看，所以为让它更好看，我们将使用别人做的模板。在使用模板前，让我们先来认识一下 GitHub Pages 使用的模板系统 Jekyll。`Jekyll`是一个强大的静态模板系统，一些相关的有用的链接如下：

* GitHub: [jekyll/jekyll: Jekyll is a blog-aware static site generator in Ruby](https://github.com/jekyll/jekyll)
* 官网：[Jekyll • Simple, blog-aware, static sites \| Transform your plain text into static websites and blogs](https://jekyllrb.com/)
* 中文官网：[Jekyll • 简单静态博客网站生成器 - 将纯文本转换为静态博客网站](http://jekyllcn.com/)

`Jekyll`是一种简单的、适用于博客的、静态网站生成引擎。它使用一个模板目录作为网站布局的基础框架，支持`Markdown`、`Textile`等标记语言的解析，提供了模板、变量、插件等功能，最终生成一个完整的静态`Web`站点。说白了就是，只要按照`Jekyll`的规范和结构，不用写`html`，就可以生成网站。

强烈建议浏览一下 Jekyll 的中文官方文档： [欢迎 - Jekyll • 简单静态博客网站生成器](http://jekyllcn.com/docs/home/)

Jekyll 使用`liquid`模板语言（[Shopify/liquid: Liquid markup language. Safe, customer facing template language for flexible web apps.](https://github.com/Shopify/liquid)）来处理模板。对于`liquid`模板语言，有如下重要的相关链接：
* GitHub: [Liquid template language](https://shopify.github.io/liquid/)
* Github wiki：[Home · Shopify/liquid Wiki](https://github.com/Shopify/liquid/wiki)
* Website: [Shopify/liquid: Liquid markup language. Safe, customer facing template language for flexible web apps.](https://github.com/Shopify/liquid)
* 参考手册：[Jekyll Liquid Cheatsheet](https://gist.github.com/JJediny/a466eed62cee30ad45e2)

### 基本结构

{% raw %}
> Jekyll 的核心其实是一个文本转换引擎。它的概念其实就是：你用你最喜欢的标记语言来写文章，可以是 Markdown, 也可以是 Textile, 或者就是简单的 HTML, 然后 Jekyll 就会帮你套入一个或一系列的布局中。在整个过程中你可以设置 URL 路径，你的文本在布局中的显示样式等等。这些都可以通过纯文本编辑来实现，最终生成的静态页面就是你的成品了。
> 
> 一个基本的 Jekyll 网站的目录结构一般是像这样的：
> 
> <pre>
> .
> ├── _config.yml
> ├── _drafts
> |   ├── begin-with-the-crazy-ideas.textile
> |   └── on-simplicity-in-technology.markdown
> ├── _includes
> |   ├── footer.html
> |   └── header.html
> ├── _layouts
> |   ├── default.html
> |   └── post.html
> ├── _posts
> |   ├── 2007-10-29-why-every-programmer-should-play-nethack.textile
> |   └── 2009-04-26-barcamp-boston-4-roundup.textile
> ├── _site
> ├── .jekyll-metadata
> └── index.html
> </pre>
> 
> 来看看这些都有什么用：
> 
> 
> | 文件 / 目录                                                | 描述                                                                                                                                                                                                                                                    |
> | `_config.yml`                                              | 保存配置数据。很多配置选项都可以直接在命令行中进行设置，但是如果你把那些配置写在这儿，你就不用非要去记住那些命令了。                                                                                                                                    |
> | `_drafts`                                                  | drafts（草稿）是未发布的文章。这些文件的格式中都没有 title.MARKUP 数据。学习如何 使用草稿.                                                                                                                                                              |
> | `_includes`                                                | 你可以加载这些包含部分到你的布局或者文章中以方便重用。可以用这个标签  {% include file.ext %} 来把文件  _includes/file.ext 包含进来。                                                                                                                    |
> | `_layouts`                                                 | layouts（布局）是包裹在文章外部的模板。布局可以在 YAML 头信息中根据不同文章进行选择。 这将在下一个部分进行介绍。标签  {{ content }} 可以将content插入页面中。                                                                                           |
> | `_posts`                                                   | 这里放的就是你的文章了。文件格式很重要，必须要符合:  YEAR-MONTH-DAY-title.MARKUP。 永久链接 可以在文章中自己定制，但是数据和标记语言都是根据文件名来确定的。                                                                                            |
> | `_data`                                                    | 格式化好的网站数据应放在这里。jekyll 的引擎会自动加载在该目录下所有的 yaml 文件（后缀是 .yml, .yaml,  .json 或者 .csv ）。这些文件可以经由 ｀site.data｀ 访问。如果有一个 members.yml 文件在该目录下，你就可以通过 site.data.members 获取该文件的内容。 |
> | `_site`                                                    | 一旦 Jekyll 完成转换，就会将生成的页面放在这里（默认）。最好将这个目录放进你的 .gitignore 文件中。                                                                                                                                                      |
> | `.jekyll-metadata`                                         | 该文件帮助 Jekyll 跟踪哪些文件从上次建立站点开始到现在没有被修改，哪些文件需要在下一次站点建立时重新生成。该文件不会被包含在生成的站点中。将它加入到你的  .gitignore 文件可能是一个好注意。                                                             |
> | `index.html` and other `HTML`, `Markdown`, `Textile` files | 如果这些文件中包含 YAML 头信息 部分，Jekyll 就会自动将它们进行转换。当然，其他的如 .html, .markdown, .md, 或者 .textile 等在你的站点根目录下或者不是以上提到的目录中的文件也会被转换。                                                                  |
> | Other Files/Folders                                        | 其他一些未被提及的目录和文件如  css 还有 images 文件夹，  favicon.ico 等文件都将被完全拷贝到生成的 site 中。这里有一些使用 Jekyll 的站点，如果你感兴趣就来看看吧。                                                                                      |
> 
> 
> ——引用自 [目录结构 - Jekyll • 简单静态博客网站生成器](http://jekyllcn.com/docs/structure/)
{% endraw %}

{% raw %}

### 调试
显示某个变量的值：
```
{{ variable | inspect }}
```
查看对象具体信息：
```
{{ variable | jsonify }}
```

{% endraw %}

详情参见 [ruby - jekyll debug or print all variables - Stack Overflow](https://stackoverflow.com/questions/34048313/jekyll-debug-or-print-all-variables)

## 使用模板
### 模板选择
投其所好即可。以下两个模板我认为挺好：
1. <https://github.com/cnfeat/blog.io>。本博客用的便是此模板
1. <https://github.com/onevcat/vno-jekyll>。一个相见恨晚的模板

你也可以通过如下方式找到官方推荐的模板：
1. [http://jekyllthemes.org/](http://jekyllthemes.org/)
2. 在你的 GitHub repositories 中找到和 GitHub Pages 相关联的 repository（通常为`username.github.io`），点击右边的`settings`，找到`options`下的`GitHub Pages`板块，点击`Choose a theme`即可看见大量的模板。

### 如何使用

1. **Fork** 一个模板到你的 GitHub 账号，比如: [https://github.com/cnfeat/blog.io][other_template_1], **注意**认真看它的README.md文件
2. 在你的 GitHub 中将其重命名为`username.github.io`(**注意用你的用户名替换`username`**，后文也如此)。现在再打开`https://username.github.io`, 就会发现其模板的效果了。这里可能需要等待较长时间


## 搭建和 GitHub Pages 一致的本地 Jekyll 环境
### 将你的 GitHub Pages 对应的 repository 克隆到本地
```
git clone git@github.com:username/username.github.io.git
```
此处用的是**SSH**的克隆方法([How to Clone with SSH](/blog/2018/04/02/Git教程笔记/#31-clone-with-ssh)), 也可以使用**HTTPS**方式：
```
git clone https://github.com/username/username.github.io.git
```

### 安装 ruby 语言开发环境
详情参见[安装ruby](https://www.ruby-lang.org/zh_cn/documentation/installation/)。对于 Ubuntu 等基于 Debian 的 Linux 系统，可以使用如下命令安装: 
```
apt install ruby-full
```

Ruby 是一种面向对象、命令式、函数式、开源的、注重简洁和效率、动态的通用编程语言。它的句法优雅，读起来自然，写起来舒适。在20世纪90年代中期由日本计算机科学家松本行弘设计并开发。它的灵感与特性来自于Perl、Smalltalk、Eiffel、Ada以及Lisp语言。它诞生在 Python（1991） 之后（1995）。

它非常适用于搭建网站，相应的代表是 [Ruby on Rails \| A web-application framework that includes everything needed to create database-backed web applications according to the Model-View-Controller (MVC) pattern.](https://rubyonrails.org/)

自然地，在 GitHub Pages 中，ruby 被大量使用，如其模板系统 Jekyll 的主要代码便是 ruby。此外，放于`_plugins`目录中的文件通常为`*.rb`文件，即 ruby 源码文件。**不过 GitHub Pages 不支持自定义插件**，详情参见 [插件 - Jekyll • 简单静态博客网站生成器](http://jekyllcn.com/docs/plugins/)

### 安装 bundle
如果上一步顺利的话，这一步应该非常简单，执行如下命令即可：
```
gem install bundle
```

**温馨提示**：`gem`是`ruby`语言的包管理器，正如`python`语言的`pip`一样；`bundle`则是配置环境（安装必要`ruby`包）的利器，只需一个`Gemfile`配置文件就可配置相应的环境。对于 ruby 相关的概念区分，可参见 [bundler vs RVM vs gems vs RubyGems vs gemsets vs system ruby - Stack Overflow](https://stackoverflow.com/questions/15586216/bundler-vs-rvm-vs-gems-vs-rubygems-vs-gemsets-vs-system-ruby) ）

此外，命令`bundle`和`bundler`具有相同的功能。在我看来，`bundle`命令比`bundler`命令更常用。

注意，和`pip`的`index-url`一样，`gem`也有相应的镜像源，如果感觉使用默认的镜像太慢，可以使用如下命令修改

```bash
gem source -r https://rubygems.org/ #移除默认镜像
gem source -a http://gems.ruby-china.com/ #添加国内镜像
gem source #查看正在使用的镜像
```

### 安装 GitHub Pages 需要的包

1. 进入之前克隆到本地的`username.github.io`目录：
   ```
   cd username.github.io
   ```

1. 创建`Gemfile`文件, 往其中加入以下内容：

   ```
	 source 'http://gems.ruby-china.com/'
	 gem 'github-pages'
   ```

   其中 `github-pages` 是一个 ruby 软件包，详情参见 [github-pages \| RubyGems.org \| Ruby 社区 Gem 托管](https://rubygems.org/gems/github-pages)

   Bash 中可以直接使用如下代码：
   
   <pre>
   echo '
   source "http://gems.ruby-china.com/"
   gem "github-pages"
   ' >Gemfile
   </pre>
   
1. 安装和 GitHub Pages 一样的 Jekyll 环境：
   ```
   bundle install
   ```

   命令会根据当前目录下的`Gemfile`，安装所需要的所有 ruby 软件包(使其和 GitHub Pages 环境一致), 这样可以方便本地调试博客，以确保它正确无误，然后再提交到 GitHub

   这一步可能出现以下错误：
   ```
   zlib is missing; necessary for building libxml2
   ```
   此时安装`zlib1g-dev`软件包即可：
   ```
   apt install zlib1g-dev
   ```

1. （可选）更新本地 Jekyll 环境
   ```
   bundle update
   ```
   出现问题的时候，或者和 GitHub Pages 出现不一致的时候可以尝试一下

### 运行
执行如下命令即可：
```
bundle exec jekyll serve
```
注意等待两分钟左右，根据输出的信息找到可通过浏览器访问的网址（默认是`http://127.0.0.1:4000/`）。成功后即可看见和`https://username.github.io`一样的内容

现在你便可以在你的电脑上修改并在浏览器中调试你的博客了, 确保无误后便可以使用如下命令提交到 GitHub：
	
```
git add -A #添加当前目录下的所有文件到暂存区
git commit -m 'comment' #提交暂存区的内容到当前分支（如 master）
git push #把本地库的所有内容推送到远程库上
```

如果你对上述命令不熟悉，建议你参考 [Git教程 - 廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/896043488029600) 和 我的另一篇博客——[Git教程笔记](https://wsxq2.55555.io/blog/2018/04/02/Git教程笔记)

## 写博客
写博客需要注意的东西有很多，包括`Jekyll`中的格式要求、好用的写作工具、写作风格、写出好文章的方法等。这里只讲述 Jekyll 模板系统中的格式要求。对于写作工具，如果使用`markdown`的话，任意选择一个你喜欢的编辑器即可（如`vim`）；对于写作风格，则因人而异；而如何写出好文章，我也正在学习

### 博客文章放置的位置及标记语言选择
如前所述，博客对应的目录是`_posts`，在这个目录中，你可以写`markdown`、`Textile`、`html`等格式的文件。

笔者建议使用 `markdown`，因为它简单易学且很流行（如被 GitHub 大力支持），本博客站点的所有文章的源文件均是 `markdown` 文件。如果需要学习 `markdown`，可参考我的另一篇博客 [markdown笔记](https://wsxq2.55555.io/blog/2018/04/07/markdown笔记)

### 文章命名格式
格式如下：
```
YEAR-MONTH-DAY-title.MARKUP
```

其中`.MARKUP`是你选择标记语言的后缀，如对于`markdown`则为`.md`或`.markdown`。下面是一些合格的命名格式：
```
2011-12-31-new-years-eve-is-awesome.md
2012-09-12-how-to-write-a-blog.md
2018-03-22-GitHub-Pages-独立博客搭建教程.md
```

生成 URL 时，它会自动处理你的标题使其符合 URL 规范。比如将`《`和`》`变为`-`（如 [《learn Vimscript The Hard Way》学习笔记](https://wsxq2.55555.io/blog/2019/02/01/Learn-Vimscript-the-Hard-Way-%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/)）。常见的处理如下：
* 将`《`和`》`转换为`-`
* 将`——`转换为`-`

除了生成 URL 时会处理外，在网页中显示标题时也会处理。常见的处理如下：
* 将`-`转换为` `（空格）
* 将文件名中每个单词的首个英文字母大写。这点非常讨厌，如对于`2018-10-22-MacOS-使用笔记.md`在网页中显示标题时会变为`Macos 使用笔记`。然而我找了很长时间也没能找到解决方案，只能强行将文件名改为`2018-10-22-Mac-O-S-使用笔记.md`


### 文章头信息
文章头信息的官方名称是`Front Matter`（ [Front Matter \| Jekyll • Simple, blog-aware, static sites](https://jekyllrb.com/docs/front-matter/) ），它是采用的`YAML`文件格式，必需放在文章最前面。对于文章页面通常为（其它页面也会用到头信息）：
```
---
layout: post
title: 我是标题
date: 2016-04-16 11:11:11.000000000 +09:00
published: false
categories: [note,tech]
tags: [GitHub Pages,git,GitHub,独立博客,jekyll,markdown]
---
```
其中

* `layout`：指文章布局的类型，需要使用指定的模板文件。模板文件放在`_layouts`目录下，通常有`default.html`、`page.html`和`post.html`这三个模板文件（对于普通博客文章通常使用`post`即可）。可以打开它们查看一下它们之前的互相引用关系。**注意在`Front Matter`中不要加文件名后缀`.html`**。有能力的也可以自己写一个文章页面的布局模板文件。
* `title`：文章的标题。默认为你的文件名（`2018-03-22-GitHub-Pages-独立博客搭建教程.md`）的中间部分（`GitHub Pages 独立博客搭建教程`）。
* `date`：发布文章的时间。默认使用文件名的前面部分（`2018-03-22`）
* `published`: 在站点生成时（使用`bundle exec jekyll serve`时），如果你不想这篇文章被转换，就设置为`false`，否则设为`true`
* `categories`: 文章所属的分类，**使用空格分隔**或者**写成数组的形式**。你可以指定通过它指定文章的类别，如生活、笔记、技术、日记等。或者根据内容分类，如`Windows`、`Linux`、`MacOS`、`人工智能`、`数据挖掘`等等
* `tags`：标签，一篇文章可以设置多个标签，**使用空格分隔**或者**写成数组的形式**。建议写成数组的形式，因为这样的话，单个标签中允许使用空格（如`GitHub Pages`）

上述字段中`layout`是必要的，其它都是可选的。当然，除了在每篇文章都指定头信息之外，你还可以设置全局头信息，这样对于重复的头信息（如`layout`）就不需要在每篇文章中重复了。只需在主配置文件（`_config.yml`）添加相应的内容即可。如，于我而言：
```
defaults:
  -
    scope: 
      path: ""
      type: "posts"
    values:
      layout: "post"
      author: "wsxq2" # 你的名字
      header-img: "img/green.jpg" # We don't want posts without a header image, that whould mean white on white
      comments: true
      categories: "blog"
```
这样即可对所有的`posts`（即`_posts`中的文件）都设置上述头信息。详情参见 [Front Matter Defaults \| Jekyll • Simple, blog-aware, static sites](https://jekyllrb.com/docs/configuration/front-matter-defaults/)

写好后便可在浏览器中测试，然后确保没问题后就可以`push`到 GitHub 了

## 自动化
可以在你的`~/.bashrc`文件中添加如下内容，然后就能在打开终端时自动运行了。当然，也可以通过`jes`手动运行。通过`gp <comment>`推送当前目录中的所有内容到 GitHub
```
function pg(){
	ps aux | grep -v "grep" |grep $1 
}
function jes(){
	ps aux |grep "[j]ekyll" > /dev/null
	if [ $? -eq 1 ]; then
		{
			cd $bl/..
			bundle exec jekyll serve -H 0.0.0.0 -P 8888 -q --watch &
			cd -
		} > /dev/null
	else 
		if [ -n "$1" ]; then
			kill `pg jekyll | awk '{print $2}'`
		else
			echo "jes has been run!"
		fi
	fi
}
jes
function gp(){
	git add -A
	git commit -m "$1" && git push
}
```

## 结语
> &emsp;&emsp;好了，至此我便可以在属于我自己的博客中写文章了。乍一看是不是觉得很简陋呢，但是我喜欢这个样子。我费了这了大力气搭建博客，并不是要向别人展现什么，我只是为了满足自己，为了记录和备忘。我的博客，我所写的文章会不会有人来看，这不重要，重要的是，我自己会看。我觉得我是一个记忆力非常不好的人，别人很容易记住的东西我要花很长时间才能记住。以前我总是会在书包里放一个笔记本，记录自己所看到的，所想到的。有些东西，如果你遇到了，但没有收藏，或许以后你就再也找不到他了；有些灵感，如果出现了，但没有记录，那将转瞬即逝再也捕捉不到。后来我就把我所想到的，所看到的，所学到的记录到了博客上。毕竟现在网络无处不在，当我需要的时候， 我会凭着我微弱的记忆到博客中寻找。
> 
> &emsp;&emsp;不知道从什么开始，我已经不再刻意的花大量的时间去记住某些东西了，我所做的是在为自己创建更多的“第二类记忆”（此概念出自一位教师所写的《忘记是最好的老师》一文，此后我将在博文中贴出此文）。我在相信，凡是你记不住的，都是本来就不需要记住的东西。
> 
> &emsp;&emsp;——引用自[博客搭建历程 \| Huoty's Blog](http://blog.konghy.cn/2015/05/06/process-blog-build/)

## 链接
下面总结了本文中使用的所有链接：

<!-- link start -->

* [Dependency versions \| GitHub Pages](https://pages.github.com/versions/)
* [GitHub Pages Basics - GitHub Help](https://help.github.com/en/categories/github-pages-basics)
* [GitHub Pages](https://pages.github.com/)
* [GitHub Pages指南 GitHub Pages开发中文手册下载-极客学院Wiki](http://wiki.jikexueyuan.com/project/github-pages-basics/)
* [GitHub](https://github.com/)
* [Git教程 - 廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/896043488029600)
* [Git教程笔记](https://wsxq2.55555.io/blog/2018/04/02/Git教程笔记)
* [Home · Shopify/liquid Wiki](https://github.com/Shopify/liquid/wiki)
* [Jekyll Liquid Cheatsheet](https://gist.github.com/JJediny/a466eed62cee30ad45e2)
* [Jekyll • Simple, blog-aware, static sites \| Transform your plain text into static websites and blogs](https://jekyllrb.com/)
* [Jekyll • 简单静态博客网站生成器 - 将纯文本转换为静态博客网站](http://jekyllcn.com/)
* [Liquid template language](https://shopify.github.io/liquid/)
* [Ruby on Rails \| A web-application framework that includes everything needed to create database-backed web applications according to the Model-View-Controller (MVC) pattern.](https://rubyonrails.org/)
* [Shopify/liquid: Liquid markup language. Safe, customer facing template language for flexible web apps.](https://github.com/Shopify/liquid)
* [bundler vs RVM vs gems vs RubyGems vs gemsets vs system ruby - Stack Overflow](https://stackoverflow.com/questions/15586216/bundler-vs-rvm-vs-gems-vs-rubygems-vs-gemsets-vs-system-ruby)
* [git - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/Git)
* [github-pages \| RubyGems.org \| Ruby 社区 Gem 托管](https://rubygems.org/gems/github-pages)
* [git教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
* [git教程笔记](https://wsxq2.55555.io/blog/2018/04/02/Git教程笔记)
* [http://jekyllthemes.org/](http://jekyllthemes.org/)
* [https://github.com/cnfeat/blog.io][other_template_1]
* [jekyll/jekyll: Jekyll is a blog-aware static site generator in Ruby](https://github.com/jekyll/jekyll)
* [ruby - jekyll debug or print all variables - Stack Overflow](https://stackoverflow.com/questions/34048313/jekyll-debug-or-print-all-variables)
* [博客搭建历程 \| Huoty's Blog](http://blog.konghy.cn/2015/05/06/process-blog-build/)
* [安装ruby](https://www.ruby-lang.org/zh_cn/documentation/installation/)
* [官方教程](https://pages.github.com/)
* [插件 - Jekyll • 简单静态博客网站生成器](http://jekyllcn.com/docs/plugins/)
* [欢迎 - Jekyll • 简单静态博客网站生成器](http://jekyllcn.com/docs/home/)
* [用Jekyll搭建的Github Pages个人博客](http://louisly.com/2016/04/used-jekyll-to-create-my-github-blog/)
* [目录结构 - Jekyll • 简单静态博客网站生成器](http://jekyllcn.com/docs/structure/)
<!-- link end -->
