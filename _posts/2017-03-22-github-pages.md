---
layout: post
tags: [jekyll,GitPages]
categories: blog
description: null.
---

----------

# jekyll本地环境搭建

## 简介
GitHub Pages为了提供对HTML内容的支持，选择了Jekyll作为模板系统，Jekyll是一个强大的静态模板系统，作为个人博客使用，基本上可以满足要求，也能保持管理的方便。

Jekyll是一种简单的、适用于博客的、静态网站生成引擎。它使用一个模板目录作为网站布局的基础框架，支持Markdown、Textile等标记语言的解析，提供了模板、变量、插件等功能，最终生成一个完整的静态Web站点。说白了就是，只要安装Jekyll的规范和结构，不用写html，就可以生成网站。

## 基本结构

Jekyll的核心其实就是一个文本的转换引擎，用你最喜欢的标记语言写文档，可以是Markdown、Textile或者HTML等等，再通过layout将文档拼装起来，根据你设置的URL规则来展现，这些都是通过严格的配置文件来定义，最终的产出就是web页面。

    |-- _config.yml
    |-- _includes
    |-- _layouts
    |   |-- default.html
    |    -- post.html
    |-- _posts
    |   |-- 2007-10-29-why-every-programmer-should-play-nethack.textile
    |    -- 2009-04-26-barcamp-boston-4-roundup.textile
    |-- _site
     -- index.html


## 安装步骤

1. 将主题[Vno-Jekyll](https://github.com/onevcat/vno-jekyll)下载到本地: `git clone https://github.com/onevcat/vno-jekyll.git`
2. [安装ruby](https://www.ruby-lang.org/zh_cn/documentation/installation/)(Debian: `# apt install ruby-full`)
3. 打开终端，执行:

```bash
gem install bundle #安装bundle
cd vno-jekyll #进入Git pages目录
echo ' #编辑Gemfile文件
source 'http://gems.ruby-china.org/'
gem 'github-pages'
' >Gemfile
bundle install #命令会根据当前目录下的Gemfile，安装所需要的所有软件(使其和github环境一致)
bundle update #更新环境
bundle exec jekyll serve #启动环境
```

其它可能用到的命令：

    gem source -r https://rubygems.org/ (移除镜像)
    gem source -a http://gems.ruby-china.org/ (添加新镜像)
    gem source

	4. 在浏览器输入`http://127.0.0.1:4000/`，即可看见刚刚从网上下载的**vno-jekyll**主体技术博客了

## 参考链接：
### 官方
1. [Jekyll中文指导手册](http://jekyllcn.com/)
4. [Github Pages Basics中文版(极客学院翻译)](http://wiki.jikexueyuan.com/project/github-pages-basics/)
2. [Github Pages Basics](https://help.github.com/categories/github-pages-basics/)
3. [Customizing Github Pages](https://help.github.com/categories/customizing-github-pages/)

### 其它
1. [用Jekyll搭建的Github Pages个人博客](https://www.jianshu.com/p/88c9e72978b4)
2. [一步步在GitHub上创建博客主页-最新版](http://www.pchou.info/ssgithubPage/2014-07-04-build-github-blog-page-08.html)

## Github Pages 模版
### 官方
1. [http://jekyllthemes.org/](http://jekyllthemes.org/)
2. [https://github.com/wsxq2/wsxq2.github.io/settings/pages/themes?utf8=%E2%9C%93&source=master](https://github.com/wsxq2/wsxq2.github.io/settings/pages/themes?utf8=%E2%9C%93&source=master)

### 其它 
1. [https://github.com/onevcat/vno-jekyll](https://github.com/onevcat/vno-jekyll)
2. [https://github.com/cnfeat/blog.io](https://github.com/cnfeat/blog.io)

