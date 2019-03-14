import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js'


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
 * SVG绘制导航抬头
 */
const drawNavgetion = function(svgId){
    let instance = {};
    instance.navgetion = ()=>{
        let [documentWidth,documentHeight,bottomBorder]=[document.body.clientWidth, 40, 200];
        const SVG = Snap(svgId);
        let shapeShadow = SVG.filter(Snap.filter.shadow(0, 2, 5,"#000000",.6));
        let lgrad= SVG.gradient("l(0, 0, 1, 0)rgba(77,135,250,0)-rgba(77,135,250,.3)-rgba(77,135,250,0)");
        let _path = SVG.path("M 0 0 H "+documentWidth+" V "+documentHeight+" h -"+((documentWidth)/2-(bottomBorder/2+60))+" q -15 0 -30 15 t -30 15  h -"+bottomBorder+" q -15 0 -30 -15 t -30 -15 H 0 Z").attr({
            fill: lgrad,
            filter: shapeShadow,
            stroke: lgrad,
            strokeWidth: 2.5
        });
        window.onresize = function(){
            //instance.navgetion();
        }
    }
    return instance;
}
/**
 * SVG绘制调用关系拓扑图
 * @param svgId
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
                    fontSize: 16,
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

export default {
    data() {
        return {
            appName: "小金库2.0-查询服务",
            sysdate: new Date(),
        }
    },
    methods: {
        drawSvgShape() {

        }
    },
    mounted() {
        drawNavgetion("#svgroot").navgetion();


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


        let nums2 = 100015343242;
        let todayNumber = this.$refs.todayNumber;
        todayNumber.animate = numberAnimate;
        todayNumber.animate({num:nums2, speed:2000, symbol:","});
        setInterval(function(){
            nums2+= 1433;
            todayNumber.resetData(nums2);
        },2000);

    }
}