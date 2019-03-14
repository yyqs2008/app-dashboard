import Vue from 'vue'
import App from './app.vue'
import {formatDate} from './utils/formatDate';

Vue.prototype.$formatDate = formatDate;

new Vue({
    el: "#app",
    render:h=>h(App)
});
