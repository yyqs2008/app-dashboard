import Mock from 'mockjs'

//容量水位
Mock.mock(/(appDashboard\/waterLevel)/,'get',function(options){
    console.log("---mock：waterLevel---",options);
    return Mock.Random.natural(0,100)/100
});

//应用健康度
Mock.mock(/(appDashboard\/health)/,'get',function(options){
    return {
        text:Mock.Random.natural(0,100)+"%",
        data:[Mock.Random.natural(0,6500), Mock.Random.natural(0,16000), Mock.Random.natural(0,30000), Mock.Random.natural(0,38000), Mock.Random.natural(0,52000)]
    }
});

//TPS AVG TP FALL
Mock.mock(/(appDashboard\/tpsAvgTpFail)/,'get',function(options){
    return {
        tps:Mock.Random.natural(0,30000),
        avg:Mock.Random.natural(0,5000),
        tp:Mock.Random.natural(0,5000),
        fail:Mock.Random.natural(0,100)
    }
});

//性能图表 TPS调用量 成功失败率
Mock.mock(/(appDashboard\/timeCons)/,function(options){
    let result = { series: {}, xAxis:[] };
    let {legends,duration,startTime,endTime} = JSON.parse(options.body);
    legends.forEach((legend)=>{
        result.series[legend] = [];
    });

    let nowSecond = Date.now();
    if(!startTime){
        startTime = parseInt(nowSecond/1000) - duration * 150;
    }else{
        startTime += duration;
    }
    if(!endTime){
        endTime = parseInt(nowSecond/1000);
    }
    for(let i=startTime; i<=endTime; i++){
        if(i%duration == 0){
            Object.keys(result.series).forEach(key=>{
                result.series[key].push(parseInt(Math.random()*1024)*1024 +1);
            });
            result.xAxis.push(i);
        }
    }
    return result
});

//TOPO
Mock.mock(/(appDashboard\/topo)/,'get',function(options){
    return {
        in:[
            {id:1,name:"信用服务",title:'应用名:app\n描述:xxx\nTOTAL:1000\nTPS:111\nAVG:122\nTP99:876',tps:Mock.Random.natural(0,100),tp:Mock.Random.natural(0,100)},
            {id:2,name:"消费金融",title:'应用名:xxx',tps:Mock.Random.natural(0,100),tp:Mock.Random.natural(0,100)},
            {id:3,name:"APP会员应用",title:'应用名:xxx',tps:Mock.Random.natural(0,100),tp:Mock.Random.natural(0,100)}
        ],
        out:[
            {id:4,name:"用户信息系统",title:'应用名:app\n描述:xxx\nTOTAL:1000\nTPS:111\nAVG:122\nTP99:876',tps:Mock.Random.natural(0,100),tp:Mock.Random.natural(0,100)},
            {id:5,name:"快捷支储",title:'应用名:xxx',tps:Mock.Random.natural(0,100),tp:Mock.Random.natural(0,100)},
            {id:6,name:"ABCD",title:'应用名:xxx',tps:Mock.Random.natural(0,100),tp:Mock.Random.natural(0,100)}
        ],
        db:{name:"DB",title:'明细:xxx\nMySQL:\n\tTPS:111\n\tAVG:122\n\tTP99:876',tps:Mock.Random.natural(0,100),tp:Mock.Random.natural(0,100)},
        cache:{name:"CACHE",title:'明细:xxx\nRedis:\n\tTPS:111\n\tAVG:122\n\tTP99:876',tps:Mock.Random.natural(0,100),tp:Mock.Random.natural(0,100)},
        log:{name:"CACHE",title:'明细:xxx\nLog4j:\n\tTPS:111\n\tAVG:122\n\tTP99:876',tps:Mock.Random.natural(0,100)}
    }
})