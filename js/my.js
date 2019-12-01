function isPC(){
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
    }
    return flag;
}
$(function() {
    $(".backtop-button").hide();
    $(function() {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.backtop-button').fadeIn();
            } else {
                $('.backtop-button').fadeOut();
            }
        });
        $('.backtop-button').click(function() {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });

    if(!isPC()){
        $('header').css("left", "0px");
        $('article').css("left", "0px");
        $('#sidebar-catalog').css("left","-300px");
    }
    let toc=document.querySelector("#markdown-toc+ul");
    let sc=document.getElementById('catalog-content');
    /*判断是否生成了目录(有的文章内容短无目录)*/
    if(toc)
        sc.innerHTML= toc.innerHTML;
    else
        sc.innerHTML= '本文没有目录 -_-';
    $('.catalog-button').click(function() {
        let sc=document.getElementById('sidebar-catalog');
        if (sc.style.left==="-300px") {
            $('#sidebar-catalog').animate({left:"+=300px"},300);
            $('article').animate({left:'+=150px'},300);
            $('header').animate({left:'+=150px'},300);
        } else {
            $('#sidebar-catalog').animate({left:"-=300px"},300);
            $('article').animate({left:'-=150px'},300);
            $('header').animate({left:'-=150px'},300);
        }
    });

    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var imgs = document.getElementsByTagName('img')
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    for (let i = 0, len = imgs.length; i < len; i++) {
        imgs[i].onclick = function(){
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        }
    }
    modalImg.onclick=function() {
        modal.style.display = "none";
    }
});
