/**
 * 数字滚动插件
 * @param setting
 * @returns {numberAnimate}
 */
export function numberAnimate(setting) {
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