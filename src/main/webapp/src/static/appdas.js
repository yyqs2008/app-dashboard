import {numberAnimate,fireworks,drawNavgetion,drawShape,windowResize,drawEcharts} from './components'

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
        isOpenFireworks:function(newVal){
            let fir = this.fireworksSingle;
            newVal ? fir.start() : fir.stop();
        }
    },
    computed:{
        fireworksSingle:function(){
            let fir = new fireworks("fireworks");
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