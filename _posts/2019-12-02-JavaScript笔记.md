---
tags: [JavaScript, 编程语言]
last_modified_time: 2019-12-02 10:20:38 +0800
---



<p id="markdown-toc"></p>
<!-- vim-markdown-toc GFM -->

* [遇到过的问题](#遇到过的问题)
  * [jQuery动态设置样式？](#jquery动态设置样式)
  * [判断客户端是 PC 端还是移动端？](#判断客户端是-pc-端还是移动端)
* [链接](#链接)

<!-- vim-markdown-toc -->

## 遇到过的问题
### jQuery动态设置样式？
> ```
> <div style="background-color:#ffffff;padding-left:10px;">测试jQuery动态获取padding-left</div>
> ```
> 
> 1. 用css()方法返回元素的样式属性
>    
>    ```
>    $("div").css("padding-left"));
>    ```
>    
> 2. 用css()设置样式
> 
>    ```
>    $("div").css("color","yellow");
>    ```
> 
> 3. 设置多个样式
> 
>    ```
>    $("div").css({"background-color":"yellow","font-size":"200%"});
>    var css = {
>        background-color: '#EEE',
>        height: '500px',
>        margin: '10px',
>        padding: '2px 5px'
>    };
>    $("div").css(css);
>    ```
> 
> ——引用自[jQuery动态设置样式（style、css） - xiaoyuncc的博客 - CSDN博客](https://blog.csdn.net/xiaoyuncc/article/details/70854925)

### 判断客户端是 PC 端还是移动端？
主要通过`UserAgent`来判断：
```
function IsPC(){  
     var userAgentInfo = navigator.userAgent;
     var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
     var flag = true;  
     for (var v = 0; v < Agents.length; v++) {  
         if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
     }  
     return flag;  
}
```


## 链接
下面总结了本文中使用的所有链接：

<!-- link start -->

<!-- link end -->
