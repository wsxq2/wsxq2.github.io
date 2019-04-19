---
layout: page
title: "Tags"
description: "标签"
header-img: "img/semantic.jpg"  
---

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

<script src="/js/jquery.tagcloud.js" type="text/javascript" charset="utf-8"></script> 
<script language="javascript">
$.fn.tagcloud.defaults = {
    size: {start: 15, end: 30, unit: 'px'},
      color: {start: '#cde', end: '#f52'}
};

$(function () {
    $('#tag_cloud a').tagcloud();
});
</script>
