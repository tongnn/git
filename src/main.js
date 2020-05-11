import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import $ from 'jquery';
import './login.js'
import './ui.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/font-awesome.min.css'
import axios from 'axios'
import VueResource from 'vue-resource'
import htmlToPdf from 'utils/htmlToPdf'
Vue.use(htmlToPdf)
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.config.productionTip = false;
//设置bus 来进行组件传值
window.bus = new Vue()

var vm = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    render: h => h(App),
    components: { App }
})
