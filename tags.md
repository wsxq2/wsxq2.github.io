---
layout: page
title: "Tags"
description: "标签"
header-img: "img/semantic.jpg"  
---

<style type="text/css">
a.no2 {background-color: Gainsboro; padding: 2px;}
</style>

## 标签列表

---

<div id='tag_cloud'>
{% for tag in site.tags %}
<a href="#{{ tag[0] }}" title="{{ tag[0] }}" rel="{{ tag[1].size }}" class="no2">{{ tag[0] }}</a> &ensp;
{% endfor %}
</div>

---

<ul class="listing">
{% for tag in site.tags %}
<!--  <li class="listing-seperator" id="{{ tag[0] }}">{{ tag[0] }}</li> -->
<h4 id="{{ tag[0] }}"> {{ tag[0] }} </h4>
{% for post in tag[1] %}
  <li class="listing-item">
  <time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time>
  <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
  </li>
{% endfor %}
<br />
{% endfor %}
</ul>

<script src="/media/js/jquery.tagcloud.js" type="text/javascript" charset="utf-8"></script> 
<script language="javascript">
$.fn.tagcloud.defaults = {
    size: {start: 1, end: 1, unit: 'em'},
      color: {start: '#f8e0e6', end: '#ff3333'}
};

$(function () {
    $('#tag_cloud a').tagcloud();
});
</script>
