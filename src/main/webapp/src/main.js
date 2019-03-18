import Vue from 'vue'
import App from './app.vue'
import {formatDate} from './utils/formatDate'
import ECharts from 'vue-echarts'
import "echarts-liquidfill"
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/radar'

Vue.prototype.$formatDate = formatDate;

// 注册组件后即可使用
//ECharts.registerTheme('dark', {});
Vue.component('chart', ECharts);

new Vue({
    el: "#app",
    render:h=>h(App)
});