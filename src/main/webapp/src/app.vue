<template>
    <div class="app-container">
        <nav class="navgetion">
            <div class='title'>
                <div class="text">{{ appName }}</div>
                <div class="subtext">{{ $formatDate(sysdate,'yyyy年MM月dd日 hh时mm分ss') }}</div>
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
                            <chart :options="waterLevel" class="chart-main" ref="waterLevelChart" auto-resize style="width: 100%;height: 100%;"/>
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
                            <chart :options="optionLine" class="chart-main" ref="timeconsChart" auto-resize style="width: 100%;height: 100%;"/>
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
                            <chart :options="optionLine" class="chart-main" ref="tpsChart" auto-resize style="width: 100%;height: 100%;"/>
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
                            <nav ref="todayNumber" class="today-number">1111</nav>
                        </div>
                    </nav>
                    <nav class="tatf">
                        <div>
                            <nav id="tpsPie">
                                <chart :options="pie" class="chart-main" ref="tpsPie" auto-resize style="width: 100%;height: 100%;"/>
                            </nav>
                        </div>
                        <div>
                            <nav id="avgPie">
                                <chart :options="pie" class="chart-main" ref="avgPie" auto-resize style="width: 100%;height: 100%;"/>
                            </nav>
                        </div>
                        <div>
                            <nav id="tpPie">
                                <chart :options="pie" class="chart-main" ref="tpPie" auto-resize style="width: 100%;height: 100%;"/>
                            </nav>
                        </div>
                        <div>
                            <nav id="failPie">
                                <chart :options="pie" class="chart-main" ref="failPie" auto-resize style="width: 100%;height: 100%;"/>
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
                        <div  class='chartDiv' id="healthChart">
                            <chart :options="optionLine" class="chart-main" ref="healthChart" auto-resize style="width: 100%;height: 100%;"/>
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
                        <div  class='chartDiv'></div>
                        <span class='corner-icon-b'></span>
                    </div>
                </div>
                <div class="column-div">
                    <span class="chart-title">
                        <span class="icon"></span>成功失败率
                    </span>
                    <div>
                        <span class='corner-icon-t'></span>
                        <div  class='chartDiv' id="succrateChart">
                            <chart :options="optionBar" class="chart-main" ref="healthChart" auto-resize style="width: 100%;height: 100%;"/>
                        </div>
                        <span class='corner-icon-b'></span>
                    </div>
                </div>
            </nav>
        </nav>
    </div>
</template>

<script>
    import appLess from './static/appdas.less';
    import appJs from './static/appdas.js';
    export default appJs;
</script>