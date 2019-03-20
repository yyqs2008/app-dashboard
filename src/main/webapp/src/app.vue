<template>
    <div class="app-container">
        <label style="position: absolute;right:0px;top:10px;font-size: 12px;opacity: 0.6;z-index: 3">
            烟花效果:<input type="checkbox" v-model="isOpenFireworks"/>
        </label>
        <div class="bg_fireworks" :open="isOpenFireworks">
            <canvas id='fireworks'></canvas>
            <div style="display:none">
                <div class="shape">{{ $formatNumber(toDayTotal) }}</div>
            </div>
        </div>

        <div class="app-swap">
            <nav class="navgetion">
                <div class='title'>
                    <div class="text">{{ appName }}</div>
                    <div class="subtext">{{ $formatDate(sysdate,'yyyy年MM月dd日 hh时mm分ss秒') }}</div>
                </div>
                <svg id="svgroot" width="100%" height="80px"></svg>
            </nav>
            <nav class="chart_cont">
                <nav class="left_nav">
                    <div class="column-div">
                        <span class="chart-title">
                            <span class="icon"></span>容量水位图
                        </span>
                        <div>
                            <span class='corner-icon-t'></span>
                            <div class='chartDiv'>
                            <!--<div class='chartDiv' empty>-->
                                <chart :options="waterLevel_O" ref="waterLevel_C" class="chart-main" auto-resize/>
                            </div>
                            <span class='corner-icon-b'></span>
                        </div>
                    </div>
                    <div class="column-div">
                        <span class="chart-title">
                            <span class="icon"></span>性能图表
                        </span>
                        <div>
                            <div class="chartDivTool">
                                <span data="6">avg</span>
                                <span data="8">tp90</span>
                                <span data="9" selection>tp99</span>
                            </div>
                            <span class='corner-icon-t'></span>
                            <div  class='chartDiv'>
                                <chart :options="timeCons_O"  ref="timeCons_C" class="chart-main" auto-resize/>
                            </div>
                            <span class='corner-icon-b'></span>
                        </div>
                    </div>
                    <div class="column-div">
                        <span class="chart-title">
                            <span class="icon"></span>TPS调用量
                        </span>
                        <div>
                            <span class='corner-icon-t'></span>
                            <div  class='chartDiv'>
                                <chart :options="tps_O" ref="tps_C" class="chart-main" auto-resize/>
                            </div>
                            <span class='corner-icon-b'></span>
                        </div>
                    </div>
                </nav>
                <nav class='center_nav'>
                    <div class="column-div" style="flex:0.5;display:flex;flex-flow:column;">
                        <nav class="today-nav">
                            <div class="today-div">
                                <nav class='today-title'>
                                    <div>
                                        <span class='icon' style="">⏲</span>
                                        <span>今日访问量</span>
                                    </div>
                                    <div class="number">
                                        方法数：<span class="method">82939</span>
                                        实例数：<span class="entity">15285</span>
                                    </div>
                                </nav>
                                <nav ref="todayNumber" class="today-number"></nav>
                            </div>
                        </nav>
                        <nav class="tatf">
                            <div>
                                <nav id="tpsPie">
                                    <chart :options="tpsPie_O" ref="tpsPie_C" class="chart-main" auto-resize/>
                                </nav>
                            </div>
                            <div>
                                <nav id="avgPie">
                                    <chart :options="avgPie_O" ref="avgPie_C" class="chart-main" auto-resize/>
                                </nav>
                            </div>
                            <div>
                                <nav id="tpPie">
                                    <chart :options="tpPie_O" ref="tpPie_C" class="chart-main" auto-resize/>
                                </nav>
                            </div>
                            <div>
                                <nav id="failPie">
                                    <chart :options="failPie_O" ref="failPie_C" class="chart-main" auto-resize/>
                                </nav>
                            </div>
                        </nav>
                    </div>
                    <div class="column-div">
                        <span class="chart-title">
                            <span class="icon"></span>调用关系拓扑图
                        </span>
                        <div>
                            <span class='corner-icon-t'></span>
                            <div  class='chartDiv' id="svgDiv">
                                <svg id="svgCanvas" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMinYMid meet" viewBox="-500,-140,1000,300">
                                    <defs>
                                        <radialGradient id="radial-1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                            <stop offset="60%" style="stop-color:rgb(10,10,10);stop-opacity:0;"></stop>
                                            <stop offset="100%" style="stop-color:rgb(10,10,10);stop-opacity:0.2;"></stop>
                                        </radialGradient>

                                        <radialGradient id="radial-2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                            <stop offset="40%" style="stop-color:rgb(10,10,10);stop-opacity:0;"></stop>
                                            <stop offset="100%" style="stop-color:rgb(10,10,10);stop-opacity:0.06;"></stop>
                                        </radialGradient>

                                        <filter id="box-shadow2">
                                            <feGaussianBlur in="SourceAlpha" stdDeviation="6"></feGaussianBlur>
                                            <feOffset dx="0" dy="0" result="offset"></feOffset>
                                            <feMerge>
                                                <feMergeNode in="offset"></feMergeNode>
                                                <feMergeNode in="SourceGraphic"></feMergeNode>
                                            </feMerge>
                                        </filter>

                                        <filter id="box-shadow3">
                                            <feColorMatrix type="matrix" result="color" values="
                                            0 0 0 0 0
                                            0 0 0 0.1 0
                                            0 0 0 0.8 0
                                            0 0 0 1 0">
                                            </feColorMatrix>
                                            <feGaussianBlur in="color" stdDeviation="2" result="blur"></feGaussianBlur>
                                            <feOffset in="blur" dx="0" dy="0" result="offsetblur"></feOffset>
                                            <feMerge>
                                                <feMergeNode in="bg"></feMergeNode>
                                                <feMergeNode in="offsetblur"></feMergeNode>
                                                <feMergeNode in="SourceGraphic"></feMergeNode>
                                            </feMerge>
                                        </filter>

                                        <filter id="text-shadow">
                                            <feColorMatrix type="matrix" result="color" values="
                                            0 0 0 0 0
                                            0 0 0 0.9 0
                                            0 0 0 0.9 0
                                            0 0 0 1 0">
                                            </feColorMatrix>
                                            <feGaussianBlur in="color" stdDeviation="1" result="blur"></feGaussianBlur>
                                            <feOffset in="blur" dx="0" dy="0" result="offsetblur"></feOffset>
                                            <feMerge>
                                                <feMergeNode in="bg"></feMergeNode>
                                                <feMergeNode in="offsetblur"></feMergeNode>
                                                <feMergeNode in="SourceGraphic"></feMergeNode>
                                            </feMerge>
                                        </filter>
                                    </defs>
                                </svg>
                            </div>
                            <span class='corner-icon-b'></span>
                        </div>
                    </div>
                </nav>
                <nav class='right_nav'>
                    <div class="column-div">
                        <span class="chart-title">
                            <span class="icon"></span>应用健康度
                        </span>
                        <div>
                            <span class='corner-icon-t'></span>
                            <div  class='chartDiv'>
                                <chart :options="health_O" ref="health_C" class="chart-main" auto-resize  />
                            </div>
                            <span class='corner-icon-b'></span>
                        </div>
                    </div>
                    <div class="column-div">
                        <span class="chart-title">
                            <span class="icon"></span>告警数图表
                        </span>
                        <div>
                            <div class="chartDivTool" id="chartDivTool">
                                <i>近</i>
                                <span data="0.5">0.5</span>
                                <span data="2">2</span>
                                <span data="6" selection>6</span>
                                <span data="24">24</span>
                                <i>小时</i>
                            </div>
                            <span class='corner-icon-t'></span>
                            <div class='chartDiv'>
                                <chart :options="alarm_O" ref="alarm_C" class="chart-main" auto-resize  />
                            </div>
                            <span class='corner-icon-b'></span>
                        </div>
                    </div>
                    <div class="column-div">
                        <span class="chart-title">
                            <span class="icon"></span>成功失败率
                        </span>
                        <div>
                            <span class='corner-icon-t'></span>
                            <div  class='chartDiv'>
                                <chart :options="succrate_O" ref="succrate_C" class="chart-main" auto-resize  />
                            </div>
                            <span class='corner-icon-b'></span>
                        </div>
                    </div>
                </nav>
            </nav>
        </div>
    </div>
</template>

<script>
    import appLess from './static/appdas.less';
    import appJs from './static/appdas.js';
    export default appJs;
</script>