---
layout: page
title: "Archive"
description: "简单的事情重复做，重复的事情用心做"
header-img: "img/orange.jpg"
---

**温馨提示**：
1. `TAGS`中含`TODO`的文章在这里找不到，可以在[TAGS](/tags/)页面中找到 
2. Windows 平台按`Ctrl + F`打开快捷搜索；Mac 平台按`command + F`打开快捷搜索

<ul class="listing">
{% for post in site.posts %}
  {% if post.tags contains 'TODO' %}
    {% continue %}
  {% endif %}
  {% capture y %}{{post.date | date:"%Y"}}{% endcapture %}
  {% if year != y %}
    {% assign year = y %}
    <br />
    <li class="listing-seperator">{{ y }}</li>
  {% endif %}
  <li class="listing-item">
    <time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time>
    <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
  </li>
{% endfor %}
</ul>

