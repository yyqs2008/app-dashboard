import {numberAnimate,fireworks,drawNavgetion,drawShape,windowResize,drawEcharts} from './components'
import {waterLevel,health,tpsAvgTpFail,timeCons,tps,succrate,topo} from '../service/serverApi.js';

const dEcharts = drawEcharts();
export default {
    data() {
        return {
            isOpenFireworks:false,
            toDayTotal:"100,000,000",
            appName: "App应用2.0-查询服务",
            sysdate: new Date(),

            waterLevel_O:dEcharts.liquidFill(),
            timeCons_O:dEcharts.line(),
            tps_O:dEcharts.line(),

            health_O:dEcharts.radar(),
            alarm_O:dEcharts.pieBar(),
            succrate_O:dEcharts.bar(),

            tpsPie_O:dEcharts.pie("TPS",30000,1),
            avgPie_O:dEcharts.pie("AVG",5000,2),
            tpPie_O:dEcharts.pie("TP99",5000,2),
            failPie_O:dEcharts.pie("FAIL",100,3)
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
        waterLevelLoad(){
            waterLevel().then((response)=>{
                let chart = this.$refs.waterLevel_C;
                chart.options._value = response.data;
            });
        },
        healthLoad(){
            health().then((response)=>{
                let chart = this.$refs.health_C;
                chart.options._value = response.data;
            });
        },
        tpsAvgTpFailLoad(){
            tpsAvgTpFail().then((response)=>{
                let tpsChart = this.$refs.tpsPie_C;
                tpsChart.options._value = response.data.tps;

                let avgChart = this.$refs.avgPie_C;
                avgChart.options._value = response.data.avg;

                let tpChart = this.$refs.tpPie_C;
                tpChart.options._value = response.data.tp;

                let failChart = this.$refs.failPie_C;
                failChart.options._value = response.data.fail;
            });
        },
        timeConsLoad(){
            let _this = this;
            let run = (batchDuration=4000, st)=>{
                setTimeout(function(){
                    timeCons({legends:['邮件营','联盟广','视频广','直接访','搜索引'],duration:4, startTime:st}).then((response)=>{
                        let result = response.data;
                        let chart = _this.$refs.timeCons_C;
                        run(4000, chart.options._value(result,4));
                    });
                },batchDuration);
            }
            run(1);
        },
        tpsConsLoad(){
            let _this = this;
            let run = (batchDuration=4000, st)=>{
                setTimeout(function(){
                    tps({legends:['邮件营','联盟广','视频广'],duration:4, startTime:st}).then((response)=>{
                        let result = response.data;
                        let chart = _this.$refs.tps_C;
                        run(4000, chart.options._value(result));
                    });
                },batchDuration);
            }
            run(1);
        },
        succrateLoad(){
            let _this = this;
            let run = (batchDuration=4000, st)=>{
                setTimeout(function(){
                    succrate({legends:['邮件营','联盟广','视频广'],duration:4, startTime:st}).then((response)=>{
                        let result = response.data;
                        let chart = _this.$refs.succrate_C;
                        run(4000, chart.options._value(result,0,4));
                    });
                },batchDuration);
            }
            run(1);
        },
        topoLoad(){
            let shape = drawShape("#svgCanvas");
            let run = (batchDuration=4000)=>{
                setTimeout(function(){
                    topo().then((response)=>{
                        let result = response.data;
                        if(result["in"]){
                            result.in.forEach(el=>{
                                shape.InShape(el.id, el.name, el.title, el.tps, el.tp);
                            });
                        }
                        if(result["out"]) {
                            result.out.forEach(el => {
                                shape.OutShape(el.id, el.name, el.title, el.tps, el.tp);
                            })
                        }
                        if(result["db"]) {
                            let el = result.db;
                            shape.DBServer(el.title, el.tps, el.tp);
                        }
                        if(result["cache"]) {
                            let el = result.cache;
                            shape.CacheServer(el.title, el.tps, el.tp);
                        }
                        if(result["log"]) {
                            let el = result.log;
                            shape.CentreCircle(el.tps, el.title);
                        }
                        run(4000);
                    });
                },batchDuration);
            }
            run(1);
        },

        dataLoad(){
            let _this = this;
            _this.timeConsLoad();
            _this.tpsConsLoad();
            _this.succrateLoad();
            _this.topoLoad();
            let run = (batchDuration=4000)=>{
                setTimeout(function(){
                    _this.waterLevelLoad();
                    _this.healthLoad();
                    _this.tpsAvgTpFailLoad();
                    run(4000);
                },batchDuration);
            }
            run(1);
        }
    },
    mounted() {
        let _this = this;
        //导航
        let nav = drawNavgetion("#svgroot").navgetion();

        //调用关系拓扑图
        //let shape = drawShape("#svgCanvas");
        // shape.CentreCircle(12345,"log4j");
        // shape.InShape(1,"小金库APP","应用名：小金库APP",100,101);
        // shape.InShape(2,"小金库APP","应用名：小金库APP",100,101);
        // shape.InShape(3,"小金库APP","应用名：小金库APP",100,101);
        // shape.OutShape(4,"小金库APP","应用名：小金库APP",100,101);
        // shape.OutShape(5,"小金库APP","应用名：小金库APP",100,101);
        // shape.OutShape(6,"小金库APP","应用名：小金库APP",100,101);
        // shape.DBServer("db",44,222);
        // shape.CacheServer("cass",44,222);

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

        //图表宽高自适应
        windowResize(this,nav);

        //数据请求加载
        this.dataLoad();
    }
}