---
layout: post
tags: [GitHub Pages,TODO]
categories: blog
---

* aa
{:toc #markdown-toc}

**注意**: 

1. 平台： Kali Linux (Debian Linux)
2. 本文适合对象：对Git有一定了解，对GitHub Pages几乎完全不了解的**有强烈愿望**（因为需要非常耐心）搭建独立博客的人

GitHub 简介: 
>GitHub is a **code hosting platform** for **version control and collaboration(合作)**. It lets you and others work together on projects from **anywhere**.

为学习Git你可能需要[Git教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)

GitHub Pages 简介:
>GitHub Pages is a **static site hosting service** designed to host your **personal, organization, or project pages** directly from a **GitHub repository**.

## 概述

TODO

## GitHub Pages 最基本独立博客搭建
请移步[官方教程](https://pages.github.com/)

**注意**：
1. GitHubPages有两种：*User or organization sit*和*Project site*，前者可用于个人博客，后者用于项目说明
2. git client有两种： *Terminal*和*GitHub Desktop*，前者常见于Linux，后者常见于Windows
3. 你可能想要学习[Git命令](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)

官方教程很重要，它会让你有个初步认识。看完后**最基本的独立博客**就算搭建好了。

## GitHub Pages 使用模板
你应该已经发现了，最基本的博客非常难看，所以为让它更好看，我们将使用别人做的模板。

### 简介
GitHub Pages为了提供对HTML内容的支持，选择了`Jekyll`作为模板系统，`Jekyll`是一个强大的静态模板系统，作为个人博客使用，基本上可以满足要求，也能保持管理的方便。

`Jekyll`是一种简单的、适用于博客的、静态网站生成引擎。它使用一个模板目录作为网站布局的基础框架，支持`Markdown`、`Textile`等标记语言的解析，提供了模板、变量、插件等功能，最终生成一个完整的静态`Web`站点。说白了就是，只要按照Jekyll的规范和结构，不用写html，就可以生成网站。

### 基本结构

Jekyll的核心其实就是一个文本的转换引擎，用你最喜欢的标记语言写文档，可以是Markdown、Textile或者HTML等等，再通过layout将文档拼装起来，根据你设置的URL规则来展现，这些都是通过严格的配置文件来定义，最终的产出就是web页面。

<pre>
.
├── _config.yml
├── _drafts
|   ├── begin-with-the-crazy-ideas.textile
|   └── on-simplicity-in-technology.markdown
├── _includes
|   ├── footer.html
|   └── header.html
├── _layouts
|   ├── default.html
|   └── post.html
├── _posts
|   ├── 2007-10-29-why-every-programmer-should-play-nethack.textile
|   └── 2009-04-26-barcamp-boston-4-roundup.textile
├── _site
├── .jekyll-metadata
└── index.html //也可以用index.md代替
</pre>

<table>
<thead>
<tr>
<th>文件/目录</th>
<th style="text-align:center">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>_config.yml</td>
<td style="text-align:center">保存配置数据。很多配置选项都可以直接在命令行中进行设置，但是如果你把那些配置写在这儿，你就不用非要去记住那些命令了。</td>
</tr>
<tr>
<td>_drafts</td>
<td style="text-align:center">drafts（草稿）是未发布的文章。这些文件的格式中都没有 title.MARKUP 数据。学习如何 使用草稿.</td>
</tr>
<tr>
<td>_includes</td>
<td style="text-align:center">你可以加载这些包含部分到你的布局或者文章中以方便重用。可以用这个标签  " include file.ext" 来把文件 _includes/file.ext 包含进来。</td>
</tr>
<tr>
<td>_layouts</td>
<td style="text-align:center">layouts（布局）是包裹在文章外部的模板。布局可以在 YAML 头信息中根据不同文章进行选择。 这将在下一个部分进行介绍。标签  "content" 可以将content插入页面中。</td>
</tr>
<tr>
<td>_posts</td>
<td style="text-align:center"><strong>这里放的就是你的文章了</strong>。文件格式很重要，必须要符合: "YEAR-MONTH-DAY-title.MARKUP"。 永久链接 可以在文章中自己定制，但是数据和标记语言都是根据文件名来确定的。</td>
</tr>
<tr>
<td>_data</td>
<td style="text-align:center">格式化好的网站数据应放在这里。jekyll 的引擎会自动加载在该目录下所有的 yaml 文件（后缀是 .yml, .yaml, .json 或者 .csv ）。这些文件可以经由 ｀site.data｀ 访问。如果有一个 "members.yml" 文件在该目录下，你就可以通过 "site.data.members" 获取该文件的内容。</td>
</tr>
<tr>
<td>_site</td>
<td style="text-align:center">一旦 Jekyll 完成转换，就会将生成的页面放在这里（默认）。最好将这个目录放进你的 ".gitignore" 文件中。</td>
</tr>
<tr>
<td>.jekyll-metadata</td>
<td style="text-align:center">该文件帮助 Jekyll 跟踪哪些文件从上次建立站点开始到现在没有被修改，哪些文件需要在下一次站点建立时重新生成。该文件不会被包含在生成的站点中。将它加入到你的 ".gitignore" 文件可能是一个好注意。</td>
</tr>
<tr>
<td>HTML, Markdown, Textile files</td>
<td style="text-align:center">如果这些文件中包含 YAML 头信息 部分，Jekyll 就会自动将它们进行转换。当然，其他的如 .html, .markdown, .md, 或者 .textile 等在你的站点根目录下或者不是以上提到的目录中的文件也会被转换。</td>
</tr>
</tbody>
<div></div></table>

### 使用步骤

以下步骤讲解如何使用别人的模版：

1. **Fork** 一个模版到你的github，比如: [https://github.com/cnfeat/blog.io][other_template_1], **注意**认真看它的README.md文件
2. 在你的github中将其重命名为`username.github.io`(**注意用你的用户名替换`username`**。如果已经有了该名字的**repository**, 将其名字改为其它名字)。现在再打开`https://username.github.io`, 就会发现其模版的效果了
3. 为方便修改及完成后续步骤将其克隆到本地: `git clone git@github.com:username/username.github.io.git`, 此处用的是**SSH**的克隆方法([How to Clone with SSH](/blog/2017/04/02/Git教程笔记/#clone-with-ssh)), 也可以使用**HTTPS**方式：`git clone https://github.com/username/username.github.io.git`

以下步骤搭建本地Jekyll环境：

1. [安装ruby](https://www.ruby-lang.org/zh_cn/documentation/installation/)(Debian: `# apt install ruby-full`)
2. 安装bundle: `gem install bundle`
3. 进入之前克隆到本地的`username.github.io`目录：`cd username.github.io`
4. 创建`Gemfile`文件, 往其中加入以下内容：

		source 'http://gems.ruby-china.com/'
		gem 'github-pages'

   可以直接使用如下代码：
   
       echo '
       source 'http://gems.ruby-china.com/'
       gem 'github-pages'
       ' >Gemfile
   
5. 安装和github一样的Jekyll环境：`bundle install`。该命令会根据当前目录下的Gemfile，安装所需要的所有软件(使其和github环境一致), 这样可以方便本地调试博客目录以确保它正确，然后直接提交正确的目录到github

   这一步可能出现以下错误：
   ```
   zlib is missing; necessary for building libxml2
   ```
   此时安装`zlib1g-dev`软件包即可：
   ```
   apt install zlib1g-dev
   ```

6. （可选）更新本地Jekyll环境（使其和github一致）：`bundle update`
7. 启动环境：`bundle exec jekyll serve`
8. 在浏览器输入`http://127.0.0.1:4000/`，即可看见和`https://username.github.io`一样的内容

现在你便可以在你的`Linux Terminal`中修改(根据模版的`README.md`修改)和在浏览器中调试(查看效果)你的博客目录了, 确保无误后便可以使用如下命令提交到`github`：
	
	git add -A
	git commit -m 'comment'
	git push

其它可能用到的命令：

    gem source -r https://rubygems.org/ (移除镜像)
    gem source -a http://gems.ruby-china.com/ (添加新镜像)
    gem source

### 参考链接
#### 官方
1. [Jekyll中文指导手册](http://jekyllcn.com/)
4. [Github Pages Basics中文版(极客学院翻译)](http://wiki.jikexueyuan.com/project/github-pages-basics/)
2. [Github Pages Basics](https://help.github.com/categories/github-pages-basics/)
3. [Customizing Github Pages](https://help.github.com/categories/customizing-github-pages/)

#### 其它
1. [用Jekyll搭建的Github Pages个人博客](https://www.jianshu.com/p/88c9e72978b4)
2. [一步步在GitHub上创建博客主页-最新版](http://www.pchou.info/ssgithubPage/2014-07-04-build-github-blog-page-08.html)
3. [利用GitHubPages+jekyll+Markdown搭建个人博客](https://juejin.im/post/5a266dfc51882578da0dba52)

### Github Pages 模版
#### 官方
1. [http://jekyllthemes.org/](http://jekyllthemes.org/)
2. [https://github.com/wsxq2/wsxq2.github.io/settings/pages/themes?utf8=%E2%9C%93&source=master](https://github.com/wsxq2/wsxq2.github.io/settings/pages/themes?utf8=%E2%9C%93&source=master)

#### 其它 
2. [https://github.com/cnfeat/blog.io][other_template_1]
1. [https://github.com/onevcat/vno-jekyll][other_template_2]

[other_template_1]: https://github.com/cnfeat/blog.io
[other_template_2]: https://github.com/onevcat/vno-jekyll
