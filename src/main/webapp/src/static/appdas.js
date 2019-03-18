import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js'
import echarts from 'echarts'

/**
 *  数字滚动插件
 */
const numberAnimate = function(setting) {
    let defaults = {
        speed : 1000,//动画速度
        num : "", //初始化值
        iniAnimate : true, //是否要初始化动画效果
        symbol : '',//默认的分割符号，千，万，千万
        dot : 0 //保留几位小数点
    }
    //如果setting为空，就取default的值
    setting = Object.assign(defaults,setting);

    //如果未设置初始化值。提示出错
    if(setting.num == ""){
        alert("must set a num!");
        return;
    }
    let nHtml = '<nav><div class="mt-number-animate-dom" data-num="{{num}}">\
		            <span class="mt-number-animate-span">0</span>\
		            <span class="mt-number-animate-span">1</span>\
		            <span class="mt-number-animate-span">2</span>\
		            <span class="mt-number-animate-span">3</span>\
		            <span class="mt-number-animate-span">4</span>\
		            <span class="mt-number-animate-span">5</span>\
		            <span class="mt-number-animate-span">6</span>\
		            <span class="mt-number-animate-span">7</span>\
		            <span class="mt-number-animate-span">8</span>\
		            <span class="mt-number-animate-span">9</span>\
		            <span class="mt-number-animate-span">.</span>\
		          </div></nav>';

    //数字处理
    let numToArr = function(num){
        num = parseFloat(num).toFixed(setting.dot);
        if(typeof(num) == 'number'){
            var arrStr = num.toString().split("");
        }else{
            var arrStr = num.split("");
        }
        return arrStr;
    }

    //设置DOM symbol:分割符号
    let setNumDom = function(arrStr){
        var shtml = '<div class="mt-number-animate">';
        for(var i=0,len=arrStr.length; i<len; i++){
            if(i != 0 && (len-i)%3 == 0 && setting.symbol != "" && arrStr[i]!="."){
                shtml += '<div class="mt-number-animate-dot">'+setting.symbol+'</div>'+nHtml.replace("{{num}}",arrStr[i]);
            }else{
                shtml += nHtml.replace("{{num}}",arrStr[i]);
            }
        }
        shtml += '</div>';
        return shtml;
    }

    //执行动画
    let runAnimate = function($parent){
        $parent.querySelectorAll(".mt-number-animate-dom").forEach(elem=>{
            let num = elem.getAttribute("data-num");
            num = (num=="."?10:num);
            let spanHei = elem.offsetHeight/11; //11为元素个数
            let thisTop = -num*spanHei+"px";
            if(thisTop != elem.style.top){
                if(setting.iniAnimate){
                    let translateY = `translateY(${thisTop})`,transition = `transition:${setting.speed/1000}s`;
                    let transform  = `transform:${translateY};${transition};`;
                         transform +=`-ms-transform:${translateY};-ms-${transition};`;  // IE 9
                         transform +=`-moz-transform:${translateY};-moz-${transition};`;  // Firefox
                         transform +=`-webkit-transform:${translateY};-webkit-${transition};`;  // Safari 和 Chrome
                         transform +=`-o-transform:${translateY};-o-${transition};`;  // open
                    elem.style = transform;
                }else{
                    setting.iniAnimate = true;
                    elem.style.top = thisTop;
                }
            }
        })
    }

    //初始化
    let init = function($parent){
        $parent.innerHTML = setNumDom(numToArr(setting.num));
        runAnimate($parent);
    }

    //重置参数
    this.resetData = function(num){
        let newArr = numToArr(num);
        let $dom = this.querySelectorAll(".mt-number-animate-dom");
        if($dom.length < newArr.length){
            this.innerHTML = setNumDom(numToArr(setting.num));
        }else{
            $dom.forEach((elem,index)=>{
                elem.setAttribute("data-num",newArr[index]);
            });
        }
        runAnimate(this);
    }
    init(this);
    return this;
}

/**
 * 烟花效果动画
 */
function fireworks(){
    var canvas = document.getElementById("fireworks");
    var ocas = document.createElement("canvas");
    var octx = ocas.getContext("2d");
    var ctx = canvas.getContext("2d");
    ocas.width = canvas.width = window.innerWidth;
    ocas.height = canvas.height = window.innerHeight;
    var bigbooms = [];

    var raf = window.requestAnimationFrame ||window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
    var lastTime, shapCounter=30, animateFrame=null;

    //区间随机数
    function getRandom(a , b){
        return Math.random()*(b-a)+a;
    };

    //加载动画
    function initAnimate(){
        cancelAnimate();
        drawBg();
        lastTime = new Date();
        animate();
    };

    //清除动画
    function cancelAnimate(){
        //清空画布(由于canvas每当高度或宽度被重设时，画布内容就会被清空)
        ocas.width = canvas.width = window.innerWidth;
        ocas.height = canvas.height = window.innerHeight;
        bigbooms=[];
        window.cancelAnimationFrame(animateFrame);
    };

    //开始动画
    function startAnimate(){
        animate();
    };

    //停止动画
    function stopAnimate(){
        window.cancelAnimationFrame(animateFrame);
    };

    //动画
    function animate(){
        ctx.save();
        ctx.fillStyle = "rgba(0,5,24,0.1)";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.restore();

        var newTime = new Date();
        if(newTime-lastTime>500+(window.innerHeight-767)/2){
            var random = ++shapCounter%40==0?false:true;
            var x = getRandom(canvas.width/5 , canvas.width*4/5);
            var y = getRandom(50 , 200);
            if(random){
                var bigboom = new Boom(getRandom(canvas.width/3,canvas.width*2/3) ,2,"#FFF" , {x:x , y:y});
                bigbooms.push(bigboom)
            }
            else {
                var bigboom = new Boom(getRandom(canvas.width/3,canvas.width*2/3) ,2,"#FFF" , {x:canvas.width/2 , y:200} , document.querySelectorAll(".shape")[parseInt(getRandom(0, document.querySelectorAll(".shape").length))]);
                bigbooms.push(bigboom)
            }
            lastTime = newTime;
            if(bigbooms.length>150){
                bigbooms = [];
            }
            console.log(bigbooms);
        };

        /*
         Array.prototype.myForeach_1 = function(callback){
             for(var i=0;i<this.length;i++){
                if(this[i]!==null) callback.apply(this[i] , [i])
             }
         };
        stars.myForeach_1(function(){
            this.paint();
        });
        bigbooms.myForeach_1(function(index){
            var that = this;
            if(!this.dead){
                this._move();
                this._drawLight();
            }
            else{
                this.booms.myForeach_1(function(index){
                    if(!this.dead) {
                        this.moveTo(index);
                    }
                    else if(index === that.booms.length-1){
                        bigbooms[bigbooms.indexOf(that)] = null;
                    }
                })
            }
        });*/

        for(var i=0;i<stars.length;i++){
            if(stars[i]!==null){
                stars[i].paint();
            }
        }
        for(var i=0;i<bigbooms.length;i++){
            var that=bigbooms[i];
            if(that!==null){
                if(!that.dead){
                    that._move();
                    that._drawLight();
                }else{
                    for(var j=0;j<that.booms.length;j++){
                        var thatBoom = that.booms[j];
                        if(thatBoom!==null){
                            if(!thatBoom.dead) {
                                thatBoom.moveTo(j);
                            }else if(j === that.booms.length-1){
                                bigbooms[bigbooms.indexOf(that)] = null;
                            }
                        }
                    }
                }
            }
        }

        animateFrame = raf(animate);
    };

    //
    var Boom = function(x,r,c,boomArea,shape){
        this.booms = [];
        this.x = x;
        this.y = (canvas.height+r);
        this.r = r;
        this.c = c;
        this.shape = shape || false;
        this.boomArea = boomArea;
        this.theta = 0;
        this.dead = false;
        this.ba = parseInt(getRandom(80 , 200));
    };
    Boom.prototype = {
        _paint:function(){
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
            ctx.fillStyle = this.c;
            ctx.fill();
            ctx.restore();
        },
        _move:function(){
            var dx = this.boomArea.x - this.x , dy = this.boomArea.y - this.y;
            this.x = this.x+dx*0.01;
            this.y = this.y+dy*0.01;

            if(Math.abs(dx)<=this.ba && Math.abs(dy)<=this.ba){
                if(this.shape){
                    this._shapBoom();
                }
                else this._boom();
                this.dead = true;
            }
            else {
                this._paint();
            }
        },
        _drawLight:function(){
            ctx.save();
            ctx.fillStyle = "rgba(255,228,150,0.3)";
            ctx.beginPath();
            ctx.arc(this.x , this.y , this.r+3*Math.random()+1 , 0 , 2*Math.PI);
            ctx.fill();
            ctx.restore();
        },
        _boom:function(){
            var fragNum = getRandom(30 , 200);
            var style = getRandom(0,10)>=5? 1 : 2;
            var color;
            if(style===1){
                color = {
                    a:parseInt(getRandom(128,255)),
                    b:parseInt(getRandom(128,255)),
                    c:parseInt(getRandom(128,255))
                }
            }
            var fanwei = parseInt(getRandom(300, 400));
            for(var i=0;i<fragNum;i++){
                if(style===2){
                    color = {
                        a:parseInt(getRandom(128,255)),
                        b:parseInt(getRandom(128,255)),
                        c:parseInt(getRandom(128,255))
                    }
                }
                var a = getRandom(-Math.PI, Math.PI);
                var x = getRandom(0, fanwei) * Math.cos(a) + this.x;
                var y = getRandom(0, fanwei) * Math.sin(a) + this.y;
                var radius = getRandom(0 , 2)
                var frag = new Frag(this.x , this.y , radius , color , x , y );
                this.booms.push(frag);
            }
        },
        _shapBoom:function(){
            var that = this;
            putValue(ocas , octx , this.shape , 5, function(dots){
                var dx = canvas.width/2-that.x;
                var dy = canvas.height/2-that.y;
                for(var i=0;i<dots.length;i++){
                    let color = {a:dots[i].a,b:dots[i].b,c:dots[i].c}
                    var x = dots[i].x;
                    var y = dots[i].y;
                    var radius = 1;
                    var frag = new Frag(that.x , that.y , radius , color , x-dx , y-dy);
                    that.booms.push(frag);
                }
            })
        }
    };

    //爆炸字体显示效果
    function putValue(canvas , context , ele , dr , callback){
        context.clearRect(0,0,canvas.width,canvas.height);
        var img = new Image();
        if(ele.innerHTML.indexOf("img")>=0){
            img.src = ele.getElementsByTagName("img")[0].src;
            imgload(img , function(){
                context.drawImage(img , canvas.width/2 - img.width/2 , canvas.height/2 - img.width/2);
                let dots = getimgData(canvas , context , dr);
                callback(dots);
            })
        }
        else {
            var text = ele.innerHTML;
            context.save();
            var fontSize =200;
            context.font = fontSize+"px 宋体 bold";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillStyle = "rgba("+parseInt(getRandom(128,255))+","+parseInt(getRandom(128,255))+","+parseInt(getRandom(128,255))+" , 1)";
            context.fillText(text , canvas.width/2 , canvas.height/2);
            context.restore();
            let dots = getimgData(canvas , context , dr);
            callback(dots);
        }
    };

    function imgload(img , callback){
        if(img.complete){
            callback.call(img);
        }
        else {
            img.onload = function(){
                callback.call(this);
            }
        }
    };

    function getimgData(canvas , context , dr){
        var imgData = context.getImageData(0,0,canvas.width , canvas.height);
        context.clearRect(0,0,canvas.width , canvas.height);
        var dots = [];
        for(var x=0;x<imgData.width;x+=dr){
            for(var y=0;y<imgData.height;y+=dr){
                var i = (y*imgData.width + x)*4;
                if(imgData.data[i+3] > 128){
                    var dot = {x:x , y:y , a:imgData.data[i] , b:imgData.data[i+1] , c:imgData.data[i+2]};
                    dots.push(dot);
                }
            }
        }
        return dots;
    };


    //绘制背景100颗星星效果
    var maxRadius=1 , stars=[];
    function drawBg(){
        for(var i=0;i<100;i++){
            var r = Math.random()*maxRadius;
            var x = Math.random()*canvas.width;
            var y = Math.random()*2*canvas.height - canvas.height;
            var star = new Star(x , y , r);
            stars.push(star);
            star.paint()
        }
    };
    var Star = function(x,y,r){
        this.x = x;this.y=y;this.r=r;
    };
    Star.prototype = {
        paint:function(){
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x , this.y , this.r , 0 , 2*Math.PI);
            ctx.fillStyle = "rgba(255,255,255,"+this.r+")";
            ctx.fill();
            ctx.restore();
        }
    };

    //爆炸效果
    var Frag = function(centerX , centerY , radius , color ,tx , ty){
        this.tx = tx;
        this.ty = ty;
        this.x = centerX;
        this.y = centerY;
        this.dead = false;
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
        this.color = color;
    };
    Frag.prototype = {
        paint:function(){
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x , this.y , this.radius , 0 , 2*Math.PI);
            ctx.fillStyle = "rgba("+this.color.a+","+this.color.b+","+this.color.c+",1)";
            ctx.fill()
            ctx.restore();
        },
        moveTo:function(index){
            this.ty = this.ty+0.3;
            var dx = this.tx - this.x , dy = this.ty - this.y;
            this.x = Math.abs(dx)<0.1 ? this.tx : (this.x+dx*0.1);
            this.y = Math.abs(dy)<0.1 ? this.ty : (this.y+dy*0.1);
            if(dx===0 && Math.abs(dy)<=80){
                this.dead = true;
            }
            this.paint();
        }
    };

    return {
        init:initAnimate,
        cancel:cancelAnimate,
        start:startAnimate,
        stop:stopAnimate
    };
};

/**
 * SVG绘制导航抬头
 */
const drawNavgetion = function(svgId){
    const SVG = Snap(svgId);
    let instance = {path:null};
    instance.navgetion = ()=>{
        let [documentWidth,documentHeight,bottomBorder]=[document.body.clientWidth, 40, 200];
        let shapeShadow = SVG.filter(Snap.filter.shadow(0, 2, 5,"#000000",.6));
        let lgrad= SVG.gradient("l(0, 0, 1, 0)rgba(77,135,250,0)-rgba(77,135,250,.3)-rgba(77,135,250,0)");
        instance.path = SVG.path("M 0 0 H "+documentWidth+" V "+documentHeight+" h -"+((documentWidth)/2-(bottomBorder/2+60))+" q -15 0 -30 15 t -30 15  h -"+bottomBorder+" q -15 0 -30 -15 t -30 -15 H 0 Z").attr({
            fill: lgrad,
            filter: shapeShadow,
            stroke: lgrad,
            strokeWidth: 2.5
        });
        return instance;
    }
    instance.resize = ()=>{
        let [documentWidth,documentHeight,bottomBorder]=[document.body.clientWidth, 40, 200];
        instance.path.attr({
            d:"M 0 0 H "+documentWidth+" V "+documentHeight+" h -"+((documentWidth)/2-(bottomBorder/2+60))+" q -15 0 -30 15 t -30 15  h -"+bottomBorder+" q -15 0 -30 -15 t -30 -15 H 0 Z"
        });
    }
    return instance;
}

/**
 * SVG绘制调用关系拓扑图
 */
const drawShape = function(svgId){
    const SVG = Snap(svgId);
    let instance = {}

    let shapeFactory = {
        _marker:SVG.group(
            SVG.circle(5, 5, 3).attr({fill:"rgba(255,255,255,.2)"}),
            SVG.circle(5, 5, 1.2).attr({fill:"rgba(170,255,255,1)"})
        ).marker(0, 0, 8, 8, 5, 5),

        centre:function(number='-',title){
            let stage1 = function(){
                let _c1 = SVG.circle(0, 0, 45).attr({
                    fill: "url(#radial-1)",
                    stroke: "rgba(77,175,240,1)",
                    strokeWidth: 2
                });
                let _path = SVG.path("M 0 65 A 65 65 0 0 1 -45.9619 45.9619 L -38.8909 38.8909 A 55 55 0 0 1 0 -55 L 0 -65 A 65 65 0 0 1 45.9619 -45.9619 L 38.8909 -38.8909 A 55 55 0 0 1  0 55 L 0 65").attr({
                    fill: "url(#radial-1)",
                    stroke: "rgba(77,175,240,.5)",
                    strokeWidth: 1.5
                });
                return SVG.group(_c1,_path).transform(new Snap.Matrix().rotate(-22, 0, 0));
            };
            let stage2 = function(){
                let _c1 = SVG.circle(0, 0, 70).attr({
                    stroke: "rgba(77,175,240,1)",
                    strokeWidth: 1
                });
                let _path = SVG.path(
                    "M 0 -70 A 70 70 0 0 1 35.0000 -60.6218  " +
                    "M 60.6218 -35.0000 A 70 70 0 0 1 70 0  " +
                    "M 60.6218,35.0000 A 70 70 0 0 1 35 60.6218 " +
                    "M 0 70 A 70 70 0 0 1 -35 60.6218  " +
                    "M -60.6218 35.0000 A 70 70 0 0 1 -70 0  " +
                    "M -60.6218 -35.0000 A 70 70 0 0 1 -35.0000 -60.6218").attr({
                    filter: "url('#box-shadow3')",
                    strokeWidth: 2.5,
                    id:"circle-2"
                });
                return SVG.group(_c1,_path).attr({
                    fill: "none",
                    stroke: "rgba(170,255,255,1)"
                })
            };
            let stage3 = function(){
                let _path = SVG.path(
                    "M 0 -100 A 100 100 0 0 1 70.7107 -70.7107  L 56.5685,-56.5685  A 80 80 0 0 0 0 -80 Z " +
                    "M 70.7107 -70.7107 A 100 100 0 0 1 100 -0   L 80.0000,-0.0000 A 80 80 0 0 0  56.5685,-56.5685 Z " +
                    "M 100 -0 A 100 100 0 0 1 70.7107 70.7107    L 56.5685,56.5685  A 80 80 0 0 0 80.0000,-0.0000 Z " +
                    "M 70.7107 70.7107 A 100 100 0 0 1 0,100     L 0.0000,80 A 80 80 0 0 0 56.5685,56.5685 Z " +
                    "M 0,100 A 100 100 0 0 1 -70.7107 70.7107    L -56.5685,56.5685  A 80 80 0 0 0 0 80 Z " +
                    "M -70.7107 70.7107 A 100 100 0 0 1 -100,0   L -80.0000,0  A 80 80 0 0 0 -56.5685,56.5685 Z " +
                    "M -100 0 A 100 100 0 0 1 -70.7107 -70.7107  L -56.5685,-56.5685   A 80 80 0 0 0 -80.0000,0 Z" +
                    "M -70.7107 -70.7107 A 100 100 0 0 1 0 -100  L  0.0000,-80.0000  A 80 80 0 0 0  -56.5685,-56.5685 Z ").attr({
                });
                return SVG.group(_path).attr({
                    fill: "rgba(0,0,0,0.2)",
                    filter: "url('#box-shadow2')",
                    stroke: "rgba(77,175,240,.5)",
                    strokeWidth: 1
                })
            };
            let stage4 = function(){
                let _text1 = SVG.text(0,-20,"LOG").attr({
                    fontSize: 14
                });
                let _text2 = SVG.text(0,8,number).attr({
                    fill: "rgba(77,200,255,1)",
                    fontSize: 20,
                });
                let _text3 = SVG.text(0,35,"次/秒").attr({
                    fontSize: 12
                });
                let _title = SVG.el("title",{});
                _title.node.textContent = title;
                return SVG.group(_text1,_text2,_text3,_title).attr({
                    fill: "white",
                    textAnchor: "middle",
                    filter: "url('#text-shadow')"
                });
            }
            return SVG.group(stage1(),stage2(),stage3(),stage4())
        },
        polygon:function(x=0,y=0,text='-',title){
            let stage1 = function(){
                return SVG.polygon(0,43.3,25,0, 75,0, 100,43.3, 75,86.6, 25,86.6).attr({
                    stroke: x>0 ? "rgba(240,180,30,1)":"rgba(100,100,255,1)",
                    strokeWidth: 2,
                    style:"transform: translate(5.5px,5px) scale(0.888);",
                    fill: "none",
                    filter: "url('#box-shadow3')"
                })
            };
            let stage2 = function(){
                let _path = SVG.path("M 35 0 h -10 L 20 8 M 65 0 h 10 L 80 8 M 65 86.6 h 10 L 80 79 M 35 86.6 h-10 L 21 79 M 1,43.3 h -2 M 99 43.3 h 2 M -5 33.3 l -5 10 l 5 10 M 105 53.3 l 5 -10 l -5 -10 ").attr({
                    stroke: "rgba(105,208,235,1)",
                    strokeWidth: 2,
                    strokeLinecap:"round",
                    fill: "none",
                    filter: "url('#box-shadow3')"
                });
                let _polygon1 = SVG.polygon(0,43.3,25,0, 75,0, 100,43.3, 75,86.6, 25,86.6).attr({
                    stroke: "rgba(77,175,240,.8)",
                    strokeWidth: 1,
                    strokeDasharray: 3,
                    fill: "none"
                });
                let _polygon2 = _polygon1.clone().attr({
                    stroke: "rgba(77,175,240,1)",
                    fill: " url(#radial-2)",
                    style:"transform: translate(10px,8.5px) scale(0.8)"
                });
                return SVG.group(_path,_polygon1,_polygon2).attr({
                    filter: "url('#box-shadow2')"
                })
            };
            let stage3 = function(){
                let _text = SVG.text(50,50,text).attr({
                    fill: "white",
                    fontWeight: "bold",
                    fontSize: 14,
                    textAnchor: "middle",
                    filter: "url('#text-shadow')"
                });
                let _title = SVG.el("title",{});
                _title.node.textContent = title;
                return SVG.group(_text,_title)
            }
            return SVG.group(stage1(),stage2(),stage3()).transform(new Snap.Matrix().scale(1.3).translate(x, y));
        },
        line:function(lineId ,tps='-',tp='-'){
            let _line = (rotate,strPath,retrorse=0)=>{
                let _path = SVG.path(strPath).attr({
                    fill: "none",
                    stroke: "rgba(77,175,240,.5)",
                    strokeWidth: 3,
                    strokeLinecap:"round",
                    markerEnd:shapeFactory._marker
                });
                let textParam = {
                    fill: "white",
                    fontWeight: "bold",
                    fontSize: 13,
                    textAnchor: "middle",
                    textpath:_path
                };
                let _text1,_text2;
                if(retrorse==1){
                    _path.attr({markerEnd:null,markerStart:shapeFactory._marker,stroke:"rgba(240,180,30,.5)"});
                    _text1 = SVG.text(62,0,[tps," :TPS"]);
                    _text2 = SVG.text(62,0,[tp," :TP99"])
                }else{
                    _text1 = SVG.text(80,0,["TPS: ",tps])
                    _text2 = SVG.text(80,0,["TP99: ",tp])
                }
                _text1.attr(textParam).transform(new Snap.Matrix().translate(0, -8))
                _text2.attr(textParam).transform(new Snap.Matrix().translate(0, 20))
                _text1.selectAll("tspan")[retrorse].attr({fill: "rgba(77,200,255,1)"});
                _text2.selectAll("tspan")[retrorse].attr({fill: "rgba(240,180,30,1)"});
                // //循环动画
                // let _c3 = SVG.circle(5, 5, 3).attr({
                //     fill:"rgba(255,255,255,1)"
                // });
                // let len = _path.getTotalLength();  // 获取path的长度
                // function loop(){
                //     Snap.animate(0, len, (val)=>{
                //         let movePoint = _path.getPointAtLength( val );
                //         _c3.attr({ cx: movePoint.x, cy: movePoint.y });
                //     }, 2500, mina.easeinout,()=>{loop()});
                // };
                // loop();
                return SVG.group(_path,_text1,_text2).transform(new Snap.Matrix().rotate(rotate, 0, 0));
            };
            let lineMap = new Map();
            switch (lineId) {
                case 1: lineMap.set(lineId,_line(67.5,"M-213 32 L -200 0 H -92"));break;
                case 2: lineMap.set(lineId,_line(22.5,"M-230 12 L -200 0 H -92"));break;
                case 3: lineMap.set(lineId,_line(-22.5,"M-230 -12 L -200 0 H -92"));break;
                case 4: lineMap.set(lineId,_line(-67.5,"M-213 -32 L -200 0 H -92"));break;
                case -1: lineMap.set(lineId,_line(-67.5,"M 92 0 L 200 0 L 213 32",1));break;
                case -2: lineMap.set(lineId,_line(-22.5,"M 92 0 L 200 0 L 230 12",1));break;
                case -3: lineMap.set(lineId,_line(22.5,"M 92 0 L 200 0 L 230 -12",1));break;
                case -4: lineMap.set(lineId,_line(67.5,"M 92 0 L 200 0 L 213 -32",1));break;
            }
            return lineMap.get(lineId);
        },
        server:function(x=0,y=0,text='-',title){
            let stage1 = function() {
                let _p1 = SVG.path("m 0 0 h 150 v 240 h -150 z").attr({
                    fill: "url(#radial-1)",
                    stroke: "rgba(77,175,240,1)",
                    strokeWidth: 3
                });
                let _p2 = SVG.path("m 50 -30 h 150 v 240 h -150 z").attr({
                    fill:"rgba(77, 175, 240, 0.1)"
                });
                let _p3 = SVG.path("M 0 0 l 50 -30 M 150 0 l 50 -30 M 150 240 l 50 -30").attr({
                    stroke: "rgba(77,175,240,1)",
                    strokeWidth: 3,
                    strokeDasharray: 6
                });
                let _p4 = SVG.path("m 15 15 h 80 v 15 h -80 z m 0 30 h 80 v 15 h -80 z").attr({
                    fill: "none",
                    stroke: "rgba(77,175,240,.5)",
                    strokeWidth: 3,
                });
                let _p5 = SVG.path("M -20 -30 v -20 h 20 M 210 -30 v -20 h -20 M 210 250 v 20 h -20 M -20 250 v 20 h 20").attr({
                    fill: "none",
                    stroke: "rgba(105,208,235,1)",
                    strokeWidth: 5,
                    filter: "url('#box-shadow3')"
                });
                return SVG.group(_p1,_p2,_p3,_p4,_p5).transform(new Snap.Matrix().scale(0.4));
            }
            let stage2 = function(){
                let _text = SVG.text(30,60,text).attr({
                    fill: "white",
                    fontWeight: "bold",
                    fontSize: 16,
                    textAnchor: "middle",
                    filter: "url('#text-shadow')"
                });
                let _title = SVG.el("title",{});
                _title.node.textContent = title;
                return SVG.group(_text,_title)
            }
            return SVG.group(stage1(),stage2()).transform(new Snap.Matrix().translate(x, y));
        },
        legend:function(){
            let leg1 = SVG.path("M -500 -270 h 65").attr({
                markerEnd:this._marker
            });
            let leg2 = SVG.path("M 440 -270 h 65").attr({
                stroke:"rgba(240,180,30,.5)",
                markerStart:this._marker
            });
            let _text1 = SVG.text(20,0,"输入").attr({
                stroke: "rgba(77,175,240,.2)",
                textpath:leg1
            }).transform(new Snap.Matrix().translate(0, -6));
            let _text2 = SVG.text(20,0,"输出").attr({
                stroke: "rgba(240,180,30,.2)",
                textpath:leg2
            }).transform(new Snap.Matrix().translate(0, -6));
            return SVG.group(leg1,leg2,_text1,_text2).attr({
                fill: "white",
                stroke: "rgba(77,175,240,.5)",
                strokeWidth: 3,
                fontSize: 14
            })
        }
    };
    shapeFactory.legend();

    instance.CentreCircle =(text,title)=>{
        shapeFactory.centre(text,title);
        return instance;
    };
    instance.InShape = (index, text, title, tps, tp)=>{
        if(index<=3){
            let axis = [[-203,-186],[-285,-103],[-285,16]][index-1];
            shapeFactory.polygon(axis[0],axis[1],text, title);
            shapeFactory.line(index,tps, tp);
        }
        return instance;
    };
    instance.OutShape = (index, text, title, tps, tp)=>{
        if(index<=3){
            let axis = [[103,-186],[185,-103],[185,16]][index-1];
            shapeFactory.polygon(axis[0],axis[1],text, title);
            shapeFactory.line(index*-1,tps, tp);
        }
        return instance;
    };
    instance.DBServer =(title, tps, tp)=>{
        shapeFactory.server(-205, 180, "DB", title);
        shapeFactory.line(4,tps, tp);
        return instance;
    }
    instance.CacheServer =(title, tps, tp)=>{
        shapeFactory.server(125, 180, "Cache", title);
        shapeFactory.line(-4, tps, tp);
        return instance;
    }

    return instance;
}

/**
 * 监听浏览器窗口大小变动，调用各图表的宽高自适应
 */
const windowResize = function($v,nav){
    window.addEventListener("resize", () => {
        [nav,
            $v.$refs.waterLevel_C, $v.$refs.timeCons_C, $v.$refs.tps_C,
            $v.$refs.tpsPie_C, $v.$refs.avgPie_C, $v.$refs.tpPie_C, $v.$refs.failPie_C,
            $v.$refs.health_C,$v.$refs.alarm_C,$v.$refs.succrate_C
        ].forEach(el=> el.resize());
    });
}

/**
 * Echarts图表绘制
 */
const drawEcharts = function(){
    let optionBase = {
        backgroundColor: 'transparent',
        color: ['rgba(77,175,240,1)','rgba(70,250,225,1)','#f0b41e','rgba(182,151,204,1)',"rgba(249,38,114,1)"],
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            top:30,
            bottom:35,
            left: 60,
            right: 60
        },
        legend: {
            top:5,
            right:5,
            itemWidth:14,
            itemHeight:6,
            orient:'vertical',
            textStyle: {
                fontSize:12,
                color: 'rgba(77,175,240,1)',
                textShadowColor: 'rgba(0,250,255,.6)',
                textShadowBlur:5
            },
            tooltip: {
                show: true
            },
            formatter: function (name) {
                return echarts.format.truncateText(name, 48, '12px Microsoft Yahei', '…');
            },
            data:[]
        },
        xAxis: [{
            axisTick: {
                show:true,
                lineStyle: {
                    color: 'rgba(170,255,255, 0.51)',
                    shadowColor: 'rgba(0,250,255,1)',
                    shadowBlur:5
                }
            },
            axisLine: {
                show:false,
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: 'rgb(165,235,250)',
                    textShadowColor: 'rgba(0,250,255,1)',
                    textShadowBlur:5
                }
            },
            data: []
        }],
        yAxis: [
            {
                axisTick: {
                    show:true,
                    lineStyle: {
                        color: 'rgba(170,255,255, 0.51)',
                        shadowColor: 'rgba(0,250,255,1)',
                        shadowBlur:5
                    }
                },
                axisLine: {
                    show:false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: 'rgb(165,235,250)',
                        textShadowColor: 'rgba(0,250,255,1)',
                        textShadowBlur:10
                    },
                    formatter:function(val) {
                        if(true){
                            if(val / 3600000 >= 1){
                                return (val / 3600000).toFixed(1) + '时';
                            } else if(val / 60000 >= 1){
                                return (val / 60000).toFixed(1) + '分';
                            } else if(val / 1000 >= 1){
                                return (val / 1000).toFixed(1) + 's';
                            } else{
                                return val +'ms';
                            }
                        }else{
                            if(val > 0){
                                if(val / 100000000 >= 1){
                                    return (val / 100000000).toFixed(0) + '亿';
                                } else if(val / 10000 >= 1){
                                    return  (val / 10000).toFixed(0) + '万';
                                }else if(val / 1000 >= 1){
                                    return  (val / 1000).toFixed(0) + '千';
                                }
                            }
                        }
                        return val;
                    }
                }
            },
            {
                axisTick: {
                    show:true,
                    lineStyle: {
                        color: 'rgba(170,255,255, 0.51)',
                        shadowColor: 'rgba(0,250,255,1)',
                        shadowBlur:5
                    }
                },
                axisLine: {
                    show:false,
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: 'rgb(165,235,250)',
                        textShadowColor: 'rgba(0,250,255,1)',
                        textShadowBlur:10
                    },
                    formatter:function(val) {
                        return val+"%";
                    }
                }
            }
        ],
        series: []
    };

    let instance = {}

    instance.liquidFill = function(){
        let option = {
            series: [{
                type: 'liquidFill',
                radius: '75%',
                data: [{
                    value: 0,
                    period: 1500,
                    amplitude: 5,
                    waveLength: '100%'
                }],
                itemStyle: {
                    shadowBlur: 25,
                    shadowColor: 'rgba(0,0,0,1)',
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(77,175,240,.4)'
                        }, {
                            offset: 1,
                            color: 'rgba(77,175,240,.1)'
                        }]
                    )
                },
                outline: {
                    borderDistance: 2,
                    itemStyle: {
                        borderWidth: 6,
                        borderColor: 'rgba(77,135,240,.7)',
                        shadowBlur: 25,
                        shadowColor: 'rgba(0,0,0,1)'
                    }
                },
                label: {
                    color:"rgba(77,175,240,.8)",
                },
                backgroundStyle: {
                    color: 'transparent'
                }
            }]
        };
        option.series[0].data[0].value = 0.6;
        return option;
    };

    instance.line = function(){
        let option = Object.assign({},optionBase);
        option.legend.data = ['邮件营','联盟广','视频广','直接访','搜索引'];
        option.xAxis[0].data = ['周一','周二','周三','周四','周五','周六','周日'];
        option.series =
        [
            {
                name:'邮件营',
                type:'line',
                stack: '总量',
                data:[120, 132, 101, 134, 90, 230, 210],smooth: true
            },
            {
                name:'联盟广',
                type:'line',
                stack: '总量',
                data:[220, 182, 191, 234, 290, 330, 310],smooth: true
            },
            {
                name:'视频广',
                type:'line',
                stack: '总量',
                data:[150, 232, 201, 154, 190, 330, 410],smooth: true
            },
            {
                name:'直接访',
                type:'line',
                stack: '总量',
                data:[320, 332, 301, 334, 390, 330, 320],smooth: true
            },
            {
                name:'搜索引',
                type:'line',
                stack: '总量',
                data:[820, 932, 901, 934, 1290, 1330, 1320],smooth: true
            }
        ];
        return option;
    };

    instance.bar = function(){
        let option = Object.assign({}, optionBase);
        Object.assign(option.legend,{right:'auto',orient:'horizontal'});
        option.legend.data = ['邮件营','联盟广','视频广','直接访','搜索引'];
        option.xAxis[0].data = ['周一','周二','周三','周四','周五','周六','周日'];
        option.series =
        [
            {
                name:'邮件营',
                type:'bar',
                stack: '总量1',
                data:[120, 132, 101, 134, 90, 230, 210],
                itemStyle: {
                    normal: {
                        color: option.color[1]
                    }
                }
            },
            {
                name:'联盟广',
                type:'bar',
                stack: '总量1',
                data:[220, 182, 191, 234, 290, 330, 310],
                itemStyle: {
                    normal: {
                        color: option.color[4]
                    }
                }
            },
            {
                name:'视频广',
                type:'line',
                yAxisIndex: 1,
                smooth: true,
                data:[50, 32, 21, 14, 90, 30, 10],
                itemStyle: {
                    normal: {
                        color: option.color[2]
                    }
                }
            },
        ]
        return option;
    };

    instance.pie = function(){
        let option = {
            title: {
                x: '48%',
                y: '39%',
                text: '-',
                subtext:'-',
                textAlign: "center",
                textStyle: {
                    color: "#fff",
                    fontSize:'90%',
                    textShadowColor: 'rgba(0,250,255,1)',
                    textShadowBlur:10
                },
                subtextStyle: {
                    fontWeight: 'bold',
                    fontSize: "78%",
                    color: '#3ea1ff'
                }
            },
            series: [{
                name: ' ',
                type: 'pie',
                radius: ['50%', '70%'],
                "avoidLabelOverlap": false,
                startAngle: 225,
                color: [new echarts.graphic.LinearGradient(0, 0, 0, 1,[{
                    offset: 0,
                    color: 'rgba(170,255,255,.6)'
                },{
                    offset: 1,
                    color: '#00a2ff'
                }]), "transparent"],
                hoverAnimation: false,
                legendHoverLink: false,
                itemStyle: {
                    normal: {
                        borderColor: "transparent",
                        borderWidth: 20,
                        shadowColor: 'rgba(77,175,255,.6)',
                        shadowBlur:8
                    }
                },
                z: 10,
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [{
                    value: 0,
                    name:" "
                }, {
                    value: 25,
                    name:"  "
                }]
            }, {
                name: '',
                type: 'pie',
                radius: ['50%', '70%'],
                color: ["rgba(18,218,240,.1)", "transparent"],
                startAngle: 225,
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [{
                    value: 75,
                    name:"   "
                }, {
                    value: 25,
                    name:"    "
                }]
            }]
        };

        let value=44;
        option.series[0].data[0].value = value;
        option.series[0].data[1].value = 100 - value;
        option.title.text="TPS";
        option.title.subtext="10.6W";
        return option;
    };

    instance.radar = function(){
        let option = {
            tooltip:{},
            title: {
                text: '100%',
                x: 'center',
                y: '47%',
                textStyle: {
                    fontWeight: 'bold',
                    color: "#fff",
                    fontSize:'250%',
                    textShadowColor: 'rgba(0,250,255,1)',
                    textShadowBlur:10
                }
            },
            radar: {
                center: ['50%', '55%'],
                splitNumber: 5,
                shape: 'circle',
                name: {
                    textStyle: {
                        color: 'rgba(77,175,240,1)',
                        textShadowColor: 'rgba(0,0,0,.6)',
                        textShadowBlur:10
                    },
                },
                splitLine: {
                    lineStyle: {
                        width: 3,
                        color: "rgba(30,70,135,.8)",
                        shadowColor: 'rgba(0,0,0,1)',
                        shadowBlur: 10
                    }
                },
                splitArea: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        type: 'dashed',
                        width: 1.5,
                        color: "rgba(77,175,240,.5)",
                        shadowColor: 'rgba(0,0,0,1)',
                        shadowBlur: 10
                    }
                },
                indicator: []
            },
            series: [{
                type: 'radar',
                symbolSize: 5,
                symbol: "emptyCircle",
                showSymbol: true,
                lineStyle: {
                    normal: {
                        width: 2,
                        shadowColor: 'rgba(0,250,255,1)',
                        shadowBlur: 2
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgba(77,175,240,.5)',
                        shadowColor: 'rgba(0,250,255,1)',
                        shadowBlur: 5
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: .8,
                        shadowBlur: 5,
                        shadowColor: 'rgba(0,0,0,.2)',
                        shadowOffsetX: 0,
                        shadowOffsetY: 10
                    }
                },
                data: []
            }]
        }
        option.title.text="99%";
        option.radar.indicator = [
            { name: '销售', max: 6500},
            { name: '管理', max: 16000},
            { name: '信息技术', max: 30000},
            { name: '客服', max: 38000},
            { name: '研发', max: 52000}
        ];
        option.series[0].data=[{
            value : [4300, 10000, 28000, 35000, 50000],
            name : '分配'
        }];
        return option;
    };

    instance.pieBar = function(){
        let option = {
            title:[
                {
                    text:"告警规则TOP7",
                    x: '9%',
                    y: '3%',
                    textStyle: {
                        fontSize:12,
                        color: 'rgba(77,175,240,1)',
                        textShadowColor: 'rgba(0,250,255,.6)',
                        textShadowBlur:5
                    },
                },
                {
                    text:"告警分类占比",
                    x: '75%',
                    y: '3%',
                    textStyle: {
                        fontSize:12,
                        color: 'rgba(77,175,240,1)',
                        textShadowColor: 'rgba(0,250,255,.6)',
                        textShadowBlur:5
                    },
                }
            ],
            grid: {
                top:'40',
                bottom:'10',
                right:'32%',
                left: '20%'
            },
            tooltip: {
                formatter: '{b} ({c})'
            },
            xAxis: [{
                    gridIndex: 0,
                    axisTick: {show:false},
                    axisLabel: {show:false},
                    splitLine: {show:false},
                    axisLine: {show:false }
            }],
            yAxis: [{
                    gridIndex: 0,
                    interval:0,
                    axisTick: {
                        show:true,
                        lineStyle: {
                            color: 'rgba(170,255,255, 0.51)',
                            shadowColor: 'rgba(0,250,255,1)',
                            shadowBlur:5
                        }
                    },
                    axisLine: {
                        show:true,
                        lineStyle: {
                            color: 'rgba(170,255,255, 0.51)',
                            shadowColor: 'rgba(0,250,255,1)',
                            shadowBlur:5
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'rgb(165,235,250)',
                            textShadowColor: 'rgba(0,250,255,1)',
                            textShadowBlur:10
                        },
                        formatter: function (value, index) {
                            if(value.substr(0,2)=="应用"){
                                value = value.substr(2);
                            }
                            return echarts.format.truncateText(value, 80, '10px Microsoft Yahei', '…');
                        }
                    },
                    data:[]
            }],
            series: [
                {
                    name: '告警分类占比',
                    z:2,
                    type: 'pie',
                    radius: ['20%', '30%'],
                    center: ['82%', '70%'],
                    color:['rgba(170,255,255,0.8)','rgba(134,200,243,0.8)','rgba(78,168,236,0.8)','rgba(59,145,208,0.8)','rgba(165,235,250,0.8)'],
                    avoidLabelOverlap: false,
                    labelLine:{normal:{length:3,length2:3,show:true}},
                    itemStyle: {
                        normal: {
                            label:{show: true} ,
                            shadowBlur: 5,
                            shadowColor: 'rgba(0, 0, 0, .2)'
                        }
                    },
                    data:[]
                },{
                    name: '告警规则TOP7',
                    z:1,
                    type: 'bar',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    barWidth:'50%',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                                offset: 0,
                                color: 'rgba(170,255,255,1)'
                            }, {
                                offset: .8,
                                color: 'rgba(77,175,240,1)'
                            }], false),
                            shadowColor: 'rgba(77,175,240,.8)',
                            shadowBlur:5
                        }
                    },
                    label:{
                        normal:{
                            show:true,
                            position:"right",
                            textStyle:{
                                color:"#9EA7C4"
                            }
                        }
                    },
                    data:[]
                }
            ]
        };
        option.yAxis[0].data = ["其他","调用异常","日志异常","性能异常","服务器异常"];
        option.series[0].data= [{value:335, name:'SMS'},{value:310, name:'EMAIL'}];
        option.series[1].data= [56,134,356,456,556];
        return option;
    };
    return instance;
}



export default {
    data() {
        return {
            isOpenFireworks:false,
            toDayTotal:"100,000,000",
            appName: "小金库2.0-查询服务",
            sysdate: new Date(),

            waterLevel_O:drawEcharts().liquidFill(),
            timeCons_O:drawEcharts().line(),
            tps_O:drawEcharts().line(),

            health_O:drawEcharts().radar(),
            alarm_O:drawEcharts().pieBar(),
            succrate_O:drawEcharts().bar(),

            tpsPie_O:drawEcharts().pie(),
            avgPie_O:drawEcharts().pie(),
            tpPie_O:drawEcharts().pie(),
            failPie_O:drawEcharts().pie()
        }
    },
    watch:{
        isOpenFireworks:function(newVal,oldVal){
            let fir = this.fireworksSingle;
            if(newVal){
                fir.start();
            }else{
                fir.stop();
            }
        }
    },
    computed:{
        fireworksSingle:function(){
            let fir = new fireworks();
            fir.init();
            fir.stop();
            return fir;
        }
    },
    methods: {
    },
    mounted() {
        let _this = this;
        //导航
        let nav = drawNavgetion("#svgroot").navgetion();

        //调用关系拓扑图
        let shape = drawShape("#svgCanvas");
        shape.CentreCircle(12345,"log4j");
        shape.InShape(1,"小金库APP","应用名：小金库APP",100,101);
        shape.InShape(2,"小金库APP","应用名：小金库APP",100,101);
        shape.InShape(3,"小金库APP","应用名：小金库APP",100,101);
        shape.OutShape(1,"小金库APP","应用名：小金库APP",100,101);
        shape.OutShape(2,"小金库APP","应用名：小金库APP",100,101);
        shape.OutShape(3,"小金库APP","应用名：小金库APP",100,101);
        shape.DBServer("db",44,222);
        shape.CacheServer("cass",44,222);

        //今日访问量
        _this.toDayTotal = 15343242;
        let todayNumber = this.$refs.todayNumber;
        todayNumber.number = _this.toDayTotal + 100000000000;
        todayNumber.animate = numberAnimate;
        todayNumber.animate({num:todayNumber.number, speed:2000, symbol:","});
        setInterval(function(){
            let num = 1433;
            todayNumber.number += num;
            _this.toDayTotal += num;
            todayNumber.resetData(todayNumber.number);
        },2000);


        windowResize(this,nav);
    }
}