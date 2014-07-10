var p;
var datasrc="/fe/data/news.json"; 
q=$.getJSON(datasrc, function(data){ 
p=data;
printJSON(p);
addInfo(p);
addImg(p);
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
		'background:#f2f2f2;'+
		'color:#666;'+
		'width:632px;'+
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
		'border:1px solid #F3F3F3;'+
		'overflow:hidden;'+
		'width:654px;'+
		'height:420px;'+
		'margin-left:20px;'+
		'margin-top:20px;'+
		'position:fixed;'+
		//'float:left;'+
		'">';
	for (var i=0;i<p.num;i++)
	{
		imgArea+='<div style="'+
		'height:420px;'+
	//	'opacity:0;'+
		//'float:left;'+
		//'-webkit-transform: translateX('+
		//0+//400*(+i)+
		//'px);"'+
		'"><img id="pic'+i+'" src="'+
		p.images[i].url+
		'" width=654px height=420px></div>';
	}
	imgArea+='</div>';
	imgArea+=
	'<div style="position:fixed;top:191px;left:29px;height:100px;background:#666;opacity:0.8;"></div><img src="img/arrow-left.png"></div>'+
	'<div style="position:fixed;top:191px;left:652px;height:100px;background:#666;opacity:0.8;"><img src="img/arrow-right.png"></div>';
	$('body').prepend(imgArea);
}
function addInfo(p)
{
	var info='<div id="infoArea" style="'+
		'box-shadow: 5px 5px 14px #888888;'+
		//'border-top-right-radius: 9px;'+
	//	'border-bottom-right-radius: 5px;'+
		'overflow:hidden;'+
		'background:#f2f2f2;'+
		'border:1px solid #F3F3F3;'+
		'position:fixed;'+
		'width:447px;'+
		'height:130px;'+
		'left:223px;'+
		'margin-top:297px;'+
		'opacity:0.8;'+
	'">';
	for (var i=0;i<p.num;i++)
	{
		info+='<div style="'+
		'margin-top:17px;'+
		'margin-left:5px;'+
		'margin-right:5px;'+
		'color:#666;'+
		'height:140px;'+
		'font-family: \'华文细黑\';'+
		'-webkit-transform: translateY('+
		0+//400*(+i)+
		'px);"'+
		'">'+
		
		'<div style="height:24px;"><b>'+
		p.images[i].title+
		'</b></div><div style="height:110px;"><p>　　'+
		p.images[i].contents+
		'</p></div>'+
		'</div>';
	}
	info+='</div>';
	info+='<div style="height:460px"></div>';
	$('body').prepend(info);
}
function moveleft()
{
}
function moveright()
{
}

