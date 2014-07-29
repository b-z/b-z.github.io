//此js用于根据传进来的数据修改article页面内容，要放在该页面的最后

var z_userHomePage='http://www.baidu.com';
var z_userFace='img/user_face.jpg';
var z_username='林笨笨';
var z_day=12;
var z_month=34;
var z_imgLink='img/0001.jpg';
var z_txtContent='<p>agdjasg<b>djgas<s>jdg</s>jasg</b>djah</p>';
var z_numOfComments=123;
var z_commentLink='article_comment.html';//评论的iframe的链接
//var z_commentHeight=300;//评论区高度
var z_havePrev=true;//是/否有上一篇/下一篇博客
var z_haveNext=true;
var z_prevPage='http://www.baidu.com';//上下页的链接
var z_nextPage='http://www.lofter.com';

$('.userNameArea')[0].innerHTML='<a href="'+z_userHomePage+'">'+z_username+"</a>";
$('.faceBox')[0].innerHTML='<a href="'+z_userHomePage+'"><img class="facePic" src="'+z_userFace+'"></a>';
$('.daySide')[0].innerHTML='<a>'+z_day+'</a>';
$('.monthSide')[0].innerHTML='<a>'+z_month+'</a>';
$('.imgContent')[0].innerHTML='<img src="'+z_imgLink+'" width=500px>';
$('.txtContent')[0].innerHTML=z_txtContent;
$('.nctitle')[0].innerHTML='评论('+z_numOfComments+')';
$('#comment_frame').attr('src',z_commentLink);
//$('#comment_frame').attr('height',z_commentHeight);
$('.page')[0].children[0].className=z_havePrev?'prev active':'prev disable';
$('.page')[0].children[1].className=z_haveNext?'next active':'next disable';
$('.prev.active')[0].innerHTML='<a href="'+z_prevPage+'" id="__prev_permalink__">'+$('.prev.active')[0].innerHTML+'</a>';
$('.next.active')[0].innerHTML='<a href="'+z_nextPage+'" id="__next_permalink__">'+$('.next.active')[0].innerHTML+'</a>';

//$(window.parent.document).find("#comment_frame").load(
document.getElementById("comment_frame").height=document.getElementById("comment_frame").contentDocument.body.scrollHeight;
/*
var ifm= document.getElementById("comment_frame");
var subWeb = document.frames ? document.frames["comment_frame"].document :ifm.contentDocument;
if(ifm != null && subWeb != null) {
	ifm.height = subWeb.body.scrollHeight;
}*/