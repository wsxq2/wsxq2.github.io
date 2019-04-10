---
layout: page
title: "Archive"
description: "简单的事情重复做，重复的事情用心做"
header-img: "img/orange.jpg"
---

<p>Windows 平台按 <code>Ctrl + F</code> 打开快捷搜索；Mac 平台按 <code>command + F</code> 打开快捷搜索</p>

<ul class="listing">
{% for post in site.posts %}
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
