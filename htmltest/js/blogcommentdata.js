//动态生成评论区内容用的

var x_commentNum=6;//评论数
var x_homepages=['http://www.baidu.com','http://www.baidu.com','http://www.baidu.com','http://www.baidu.com','http://www.baidu.com','http://www.baidu.com'];//用户主页
var x_photos=['img/0001.jpg','img/0002.jpg','img/head.jpg','img/0001.jpg','img/0002.jpg','img/head.jpg'];//用户头像
var x_names=['aaa','bbb','ccc','ddd','eee','fff'];//用户名
var x_comments=['aaaaaaaaa','ssssssss','dddddd','qqq','www','ahkjcbkhjcvkjhqvjhbcljhblshjbajbclaksjblckjblasdkjsbckjblakjshldkjbclkjblqiublqiuwbcliuwbl'];//评论正文.注意尖括号、引号必须转义


$('.editdiv.s-fc0.ztag.f-trans')[0].innerHTML='';
var x_in='';
for (var i=0;i<x_commentNum;i++)
{
	x_in+='<li class="s-bd2 s-bg2"><div class="bcmtlsta clearfix"><div class="bcmtlstb">'+
	'<a href="'+x_homepages[i]+	'" target="_top">'+
	'<img class="itag" src="'+x_photos[i]+'" width=64px height=64px>'+
	'</a></div><div class="bcmtlstc"><div class="bcmtlstd clearfix"><div class="bcmtlste clearfix"><div class="bcmtlstg">'+
	'<div class="bcmtlsti"><div class="bcmtlstj"><a class="s-fc2 itag bcmtlstk" href="'+x_homepages[i]+'" target="_top">'+
	x_names[i]+'</a><span class="bcmtlstf s-fc4">：</span><span class="bcmtlstf s-fc4 itag">'+
	x_comments[i]+'</span></div></div></div></div></div></div></div></li>';
}

$('.clearfix.ztag')[0].innerHTML=x_in;

var x_commentHeight=document.body.scrollHeight;