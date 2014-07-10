var p;
var now=0;
var settime=true;
var timer;
var datasrc="data/news.json"; 
var t=3500;//设置时间间隔
$('body')[0].innerHTML='';
q=$.getJSON(datasrc, function(data){ 
p=data;
printJSON(p);
addInfo(p);
addImg(p);
timer=setInterval(function(){moveright();},t);
}); 
//p:获取来的json对象
//q:get到的信息
function printJSON(p)//打印JSON信息
{
	var viewJSON=
		'<div id="view" style="'+
		'box-shadow: 5px 5px 14px #888888;'+
		'border-radius: 0px;'+
		'margin-left:20px;'+
		'padding:10px;'+
		'border-left:2px solid #3F3;'+
		'font-family: \'Arial\',\'华文细黑\';'+
		'background:#eee;'+
		'color:#666;'+
		'width:634px;'+
		'float:left;'+
		'">'+
		'<h3><b>JSONdata:</b></h3>';
	for (var i in p)
	{
		viewJSON+='　　'+i+':　';
		if (typeof p[i]=='object')
		for (var j in p[i])
		{
			viewJSON+='<br>　　　　'+(+j+1)+':　';
			for (var k in p[i][j])
			{
				viewJSON+='<br>　　　　　　　'+k;
				viewJSON+=k=='url'||k=='details'?(':　<a href="'+p[i][j][k]+'">'+p[i][j][k]+'</a>'):(':　'+p[i][j][k]);
			}
		}
		else viewJSON+=p[i];
		viewJSON+='<br>';
	}
	viewJSON+='</div>';
	$('body').prepend(viewJSON);
}
function addImg(p)
{
	var imgArea='<div id="imgArea" style="'+
		'box-shadow: 5px 5px 14px #888888;'+
		'border-radius: 7px;'+
	//	'border-bottom-left-radius: 9px;'+
		'border:1px solid #eee;'+
		'overflow:hidden;'+
		'width:654px;'+
		'height:420px;'+
		'margin-left:20px;'+
		'margin-top:20px;'+
		'position:fixed;'+
		//'float:left;'+
		'">';
	for (var i=p.num-1;i>=0;i--)
	{
		imgArea+='<div style="'+
		'position:absolute;'+
		'height:420px;'+
	//	'opacity:0;'+
		//'float:left;'+
		//'-webkit-transform: translateX('+
		//0+//400*(+i)+
		//'px);"'+
		'"><img id="pic" class="pic'+i+'" src="'+
		p.images[i].url+
		'" width=654px height=420px></div>';
	}
	imgArea+='</div>';
	imgArea+=
	'<div id="left-arrow" class="arrow" style="position:fixed;top:191px;left:29px;height:100px;background:#eee;opacity:0;border-bottom-right-radius: 7px;border-top-right-radius: 7px;"><img id="left-arrow" class="arrow" src="img/arrow-left.png"></div>'+
	'<div id="right-arrow" class="arrow" style="position:fixed;top:191px;left:652px;height:100px;background:#eee;opacity:0;border-bottom-left-radius: 7px;border-top-left-radius: 7px;"><img id="right-arrow" class="arrow" src="img/arrow-right.png"></div>';
	$('body').prepend(imgArea);
}
function addInfo(p)
{
	var info='<div id="infoArea" class="info" style="'+
		'box-shadow: 5px 5px 14px #888888;'+
		//'border-top-right-radius: 9px;'+
	//	'border-bottom-right-radius: 5px;'+
		'overflow:hidden;'+
		'background:#eee;'+
		'position:fixed;'+
		'width:447px;'+
		'height:130px;'+
		'left:223px;'+
		'margin-top:297px;'+
		'opacity:0;'+
	'">';
	for (var i=0;i<p.num;i++)
	{
		info+='<div class="info" id="info'+
		i+
		'" style="'+
		'margin-top:17px;'+
		'margin-left:5px;'+
		'margin-right:5px;'+
		'position:absolute;'+
		'color:#666;'+
		//(i?'visibility:hidden;':'visibility:visible;')+
		'height:140px;'+
		'font-family: \'华文细黑\';'+
		'-webkit-transform: translateY('+
		0+//400*(+i)+
		'px);"'+
		'">'+
		
		'<div class="info" style="height:24px;"><b class="info">'+
		p.images[i].title+
		'</b></div><div class="info" style="height:110px;"><p class="info">　　'+
		p.images[i].contents+
		'</p></div>'+
		'</div>';
	}
	info+='</div>';
	info+='<div style="height:460px"></div>';
	$('body').prepend(info);
	for (var i=1;i<6;i++)
		$('#info'+i).fadeOut(0);
}
/*
@-webkit-keyframes awareru
{
from {opacity: 0;}
to {opacity: 1;}
}
@-webkit-keyframes kieru
{
from {opacity: 1;}
to {opacity: 0;}
}
*/
function moveleft()
{
	console.log(now);
	$('#info'+now).fadeOut('slow');
	if (now>0)
	{
		$('.pic'+(now-1)).fadeIn('slow');
		now--;
	}
	else
	{
		now=5;
		for (i=0;i<5;i++) 
		{
			$('.pic'+i).fadeOut('slow');
		}
	}
	$('#info'+now).fadeIn('slow');
}
function moveright()
{
	//console.log(now);
	$('#info'+now).fadeOut('slow');
	if (now<5)
	{
		$('.pic'+now).fadeOut('slow');
		now++;
	}
	else
	{
		now=0;
		for (i=0;i<5;i++) 
		{
			$('.pic'+i).fadeIn('slow');
		}
	}
	$('#info'+now).fadeIn('slow');
}
document.addEventListener('click',function(c)
{
	//console.log(c);
	if ((c.target).className=='arrow')
	{
		if ((c.target).id=='left-arrow')
		{
			moveleft();
		}
		else 
		{
			moveright();
		}
	}
	if (c.target.className=='info'||c.target.id=='pic')
	{
		window.open(p.images[now].details);
	}
});
document.addEventListener('mouseover',function(d)
{	
	if (settime&&(d.target.className=='info'||d.target.className=='arrow'||d.target.id=='pic'))
	{
		settime=false;
		clearInterval(timer);
	}
	if (!settime&&(d.target.className!='info'&&d.target.className!='arrow'&&d.target.id!='pic'))
	{
		settime=true;
		timer=setInterval(function(){moveright();},t);
	}
	if (d.target.className=='info'||d.target.className=='arrow'||d.target.id=='pic')
	{
		infoAppear();
	//	$('#infoArea').css('opacity',0.8);
	}
	else
	{
		infoDisappear();
	//	$('#infoArea').css('opacity',0.4);
	}
});
function infoAppear()
{
	$('#infoArea').fadeTo('fast',0.8);
}
function infoDisappear()
{
	$('#infoArea').fadeTo('fast',0);
}
function min(a,b){return a<b?a:b;}
function max(a,b){return a>b?a:b;}
function dis(x1,y1,x2,y2){return (x1-x2)*(x1-x2)+(y1-y2)*(y1-y2);}

document.addEventListener('mousemove',function(e)
{	
	var x=e.x;
	var y=e.y;
	var d1=dis(x,y,30,240);
	var d2=dis(x,y,684,240);
	$('#right-arrow').css('opacity',max(0,(100000-d2)/150000));
	$('#left-arrow').css('opacity',max(0,(100000-d1)/150000));
});

/**************************************上面是图片部分，下面是评论部分*******************************************/

$('body').prepend('<div id="commentArea" style="'+
'left:700px;'+
'width:500px;'+
'box-shadow: 5px 5px 14px #888888;'+
'border-radius: 0px;'+
'border-left:2px solid #3F3;'+
'font-family: \'Arial\',\'华文细黑\';'+
'background:#eee;'+
'color:#666;'+
'position:absolute;'+		
'top:10px;'+
'margin-top:20px'+
'"><h3><b>Comments</b></h3><hr align="center"><div id=comment></div></div>');

var s;
function comment(u)//u:number
{
	$.getJSON('data/comment'+u+'.json', function(data){ 
	s=data;
	addComment(s);
});
}

function addComment(s)
{
	console.log(s);
	$('#comment')[0].innerHTML='';
	var c='';
	for (var i=0;i<30;i++)
	{
		c+='<div>'+
		'<b style="color:#050">'+(+i+1)+'楼: 花花 说</b>'+
		'<span align="right" style="font-size:12px;">　　　　　2014/07/10 星期四 22:02</span>'+
		'<p style="font-size:18px;">　　'+randomComment(s)+
		'</p><hr></div>';
	}
	$('#comment')[0].innerHTML=c;
}

function randomComment(s)
{
	var r=[];
	for (var i=0;i<4;i++)
	{
		r.push(Math.floor(Math.random()*s.num[i]));
	}
	return s.subject[r[0]]+s['predicate'][r[1]]+s['object'][r[2]]+s.kaomoji[r[3]];
}

comment(1);