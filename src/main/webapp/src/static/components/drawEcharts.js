import echarts from "echarts";

/**
 * Echarts图表绘制
 */
export function drawEcharts(){
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