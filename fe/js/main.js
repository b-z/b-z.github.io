/**************************************************下面设置一些初值***************************************************/
var p; //图片新闻的json对象
var now = (window.localStorage.now == undefined ? (window.localStorage.now = 0) : window.localStorage.now); //当前图片位置
var settime = true; //表示当前已经设置计时器
var timer; //计时器
var datasrc = "data/news.json"; //json文件路径
var t = 3500; //设置时间间隔
/**************************************************加载图片新闻信息***************************************************/
$('body')[0].innerHTML = '';
q = $.getJSON(datasrc, function (data) {
    p = data;
    printJSON(p);
    addInfo(p);
    addImg(p);
    timer = setInterval(function () {
        moveright();
    }, t);
    for (var i = 0; i < now; i++) //使用localStorage，把图片翻到合适位置
    {
        $('.pic' + i).fadeOut(0);
    }
});
/**************************************************打印获取到的json信息***************************************************/
function printJSON(p) //打印JSON信息
    {
        var viewJSON =
            '<div id="view" style="' +
            'box-shadow: 2px 2px 14px #dddddd;' +
            'border-radius: 0px;' +
            'margin-left:20px;' +
            'padding:10px;' +
            'border-left:2px solid #3F3;' +
            'font-family: \'Arial\',\'华文细黑\';' +
            'background:#eee;' +
            'opacity:0.7;' +
            'color:#666;' +
            'width:634px;' +
            'float:left;' +
            '">' +
            '<h3><b>JSONdata:</b></h3>';
        for (var i in p) {
            viewJSON += '　　' + i + ':　';
            if (typeof p[i] == 'object')
                for (var j in p[i]) {
                    viewJSON += '<br>　　　　' + (+j + 1) + ':　';
                    for (var k in p[i][j]) {
                        viewJSON += '<br>　　　　　　　' + k;
                        viewJSON += k == 'url' || k == 'details' ? (':　<a href="' + p[i][j][k] + '">' + p[i][j][k] + '</a>') : (':　' + p[i][j][k]);
                    }
                } else viewJSON += p[i];
            viewJSON += '<br>';
        }
        viewJSON += '</div>';
        $('body').prepend(viewJSON);
    }
    /****************************************************把图像放上去*************************************************/

function addImg(p) {
        var imgArea = '<div id="imgArea" style="' + //这是图像的区域
            'box-shadow: 2px 2px 14px #dddddd;' +
            'border-radius: 7px;' +
            'border:1px solid #eee;' +
            'overflow:hidden;' +
            'width:654px;' +
            'height:420px;' +
            'margin-left:20px;' +
            'margin-top:20px;' +
            'position:absolute;' +
            '">';
        for (var i = p.num - 1; i >= 0; i--) //逐张添加图像
        {
            imgArea += '<div style="' +
                'position:absolute;' +
                'height:420px;' +
                '"><img id="pic" class="pic' + i + '" src="' +
                p.images[i].url +
                '" width=654px height=420px></div>';
        }
        imgArea += '</div>';
        imgArea += //两个箭头按钮
            '<div id="left-arrow" class="arrow" style="position:absolute;top:191px;left:29px;height:100px;background:#eee;opacity:0;border-bottom-right-radius: 7px;border-top-right-radius: 7px;"><img id="left-arrow" class="arrow" src="img/arrow-left.png"></div>' +
            '<div id="right-arrow" class="arrow" style="position:absolute;top:191px;left:652px;height:100px;background:#eee;opacity:0;border-bottom-left-radius: 7px;border-top-left-radius: 7px;"><img id="right-arrow" class="arrow" src="img/arrow-right.png"></div>';
        $('body').prepend(imgArea);
    }
    /***************************************************添加图片上的新闻**************************************************/

function addInfo(p) {
        var info = '<div id="infoArea" class="info" style="' + //新闻区域
            'box-shadow: 2px 2px 10px #dddddd;' +
            'overflow:hidden;' +
            'background:#eee;' +
            'position:absolute;' +
            'width:447px;' +
            'height:130px;' +
            'left:223px;' +
            'margin-top:297px;' +
            'opacity:0;' +
            '">';
        for (var i = 0; i < p.num; i++) //逐条添加新闻
        {
            info += '<div class="info" id="info' +
                i +
                '" style="' +
                'margin-top:17px;' +
                'margin-left:5px;' +
                'margin-right:5px;' +
                'position:absolute;' +
                'color:#666;' +
                'height:140px;' +
                'font-family: \'华文细黑\';' +
                '-webkit-transform: translateY(' +
                0 +
                'px);"' +
                '">' +

                '<div class="info" style="height:24px;"><b class="info">' +
                p.images[i].title +
                '</b></div><div class="info" style="height:110px;"><p class="info">　　' +
                p.images[i].contents +
                '</p></div>' +
                '</div>';
        }
        info += '</div>';
        info += '<div style="height:460px"></div>';
        $('body').prepend(info);
        for (var i = 0; i < 6; i++) //隐藏其他新闻
            if (i != now) $('#info' + i).fadeOut(0);
    }
    /***************************************************图片、新闻翻页**************************************************/

function moveleft() {
    $('#info' + now).fadeOut('slow');
    if (now > 0) {
        $('.pic' + (now - 1)).fadeIn('slow');
        now--;
        window.localStorage.now--;
    } else {
        now = 5;
        window.localStorage.now = 5;
        for (i = 0; i < 5; i++) {
            $('.pic' + i).fadeOut('slow');
        }
    }
    $('#info' + now).fadeIn('slow');
}

function moveright() {
        $('#info' + now).fadeOut('slow');
        if (now < 5) {
            $('.pic' + now).fadeOut('slow');
            now++;
            window.localStorage.now++;
        } else {
            now = 0;
            window.localStorage.now = 0;
            for (i = 0; i < 5; i++) {
                $('.pic' + i).fadeIn('slow');
            }
        }
        $('#info' + now).fadeIn('slow');
    }
    /***************************************************事件监听**************************************************/
document.addEventListener('click', function (c) {
    if ((c.target).className == 'arrow') {
        if ((c.target).id == 'left-arrow') {
            moveleft();
        } else {
            moveright();
        }
    }
    if (c.target.className == 'info' || c.target.id == 'pic') {
        window.open(p.images[now].details);
    }
    if (c.target.id == 'rbutton') {
        if (page < 2) {
            comment(++page);
            window.localStorage.page++;
        } else {
            alert('已经是最后一页了(´・ω・｀)');
        }
    }
    if (c.target.id == 'lbutton') {
        if (page > 0) {
            comment(--page);
            window.localStorage.page--;
        } else {
            alert('已经是第一页了(-_-;)');
        }
    }

});
document.addEventListener('mouseover', function (d) {
    if (settime && (d.target.className == 'info' || d.target.className == 'arrow' || d.target.id == 'pic')) {
        settime = false;
        clearInterval(timer);
    }
    if (!settime && (d.target.className != 'info' && d.target.className != 'arrow' && d.target.id != 'pic')) {
        settime = true;
        timer = setInterval(function () {
            moveright();
        }, t);
    }
});

function infoAppear() {
    $('#infoArea').fadeTo('fast', 0.8);
}

function infoDisappear() {
    $('#infoArea').fadeTo('fast', 0);
}

function min(a, b) {
    return a < b ? a : b;
}

function max(a, b) {
    return a > b ? a : b;
}

function dis(x1, y1, x2, y2) {
    return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
}
var appear = false;
document.addEventListener('mousemove', function (e) //控制两个箭头显示、隐藏
    {
        var x = e.x;
        var y = e.y;
        var d1 = dis(x, y, 30, 240);
        var d2 = dis(x, y, 684, 240);
        $('#right-arrow').css('opacity', max(0, (100000 - d2) / 150000));
        $('#left-arrow').css('opacity', max(0, (100000 - d1) / 150000));
        if (x > 20 && x < 674 && y > 20 && y < 440 && !appear) {
            infoAppear();
            appear = true;
        }
        if (!(x > 20 && x < 674 && y > 20 && y < 440) && appear) {
            infoDisappear();
            appear = false;
        }
    });

/**************************************下面是评论部分*******************************************/
var page = (window.localStorage.page == undefined ? (window.localStorage.page = 0) : window.localStorage.page);

$('body').prepend('<div id="commentArea" style="' +
    'left:700px;' +
    'width:500px;' +
    'box-shadow: 2px 2px 14px #dddddd;' +
    'border-radius: 0px;' +
    'border-left:2px solid #3F3;' +
    'font-family: \'Arial\',\'华文细黑\';' +
    'background:#eee;' +
    'color:#666;' +
    'position:absolute;' +
    'top:10px;' +
    'margin-top:20px;' +
    'opacity:0.7;' +
    '"><h3><b>Comments</b></h3><hr align="center"><div id=comment></div></div>');

var s;
var z = 1;

function comment(u) //u:number
    {
        $.getJSON('data/comment' + u + '.json', function (data) {
            s = data;
            addComment(s);
            $('#lbutton').remove();
            $('#rbutton').remove();
            $('#page').remove();
            $('body').append('<img id="lbutton" src="img/arrow-left1.png" style=' +
                'position:absolute;' +
                'left:1050px;top:45px;' +
                '></img><img id="rbutton" src="img/arrow-right1.png" style=' +
                'position:absolute;' +
                'left:1100px;top:45px;' +
                '></img><div id="page" style="font-size:30px;font-family: \'Arial\',\'华文细黑\';position:absolute;left:980px;top:42px;">' + (+page + 1) + '/3' + '</div>');
        });
    }

function addComment(s) {
    $('#comment')[0].innerHTML = '';
    var c = '';
    for (var i = 0; i < 15; i++) {
        c += '<div>' +
            '<b style="color:#050;float:left;">　' + (+i + 1) + '楼:&nbsp;</b>' +
            '<b style="float:left;"><a style="color:#' + Math.floor(Math.random() * 10) + '' + Math.floor(Math.random() * 10) + '' + Math.floor(Math.random() * 10) + '" href="http://qianjun1993.github.io">花花</a></b>' +
            '<b style="color:#050;float:left;">&nbsp;说</b>' +
            '<p align="right" style="font-size:12px;">2014/07/10 星期四 22:02　</p>' +
            '<p style="font-size:18px;">　　' + randomComment(s) +
            '</p><hr></div>';
    }
    $('#comment')[0].innerHTML = c;
}

function randomComment(s) //生成随机评论
    {
        var r = [];
        for (var i = 0; i < 4; i++) {
            r.push(Math.floor(Math.random() * s.num[i]));
        }
        return s.subject[r[0]] + s['predicate'][r[1]] + s['object'][r[2]] + s.kaomoji[r[3]];
    }

comment(page);

$('body').attr('background', 'img/125.jpg');
$('body').css('background-size', '100%');
$('body').css('background-attachment', 'fixed');
