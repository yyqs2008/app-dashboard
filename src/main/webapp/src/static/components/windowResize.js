/**
 * 监听浏览器窗口大小变动，调用各图表的宽高自适应
 * @param $vue
 * @param nav
 */
export function windowResize($vue,nav){
    window.addEventListener("resize", () => {
        [nav,
            $vue.$refs.waterLevel_C, $vue.$refs.timeCons_C, $vue.$refs.tps_C,
            $vue.$refs.tpsPie_C, $vue.$refs.avgPie_C, $vue.$refs.tpPie_C, $vue.$refs.failPie_C,
            $vue.$refs.health_C,$vue.$refs.alarm_C,$vue.$refs.succrate_C
        ].forEach(el=> el.resize());
    });
}