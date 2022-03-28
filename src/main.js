// 1、创建vue根实例
// 2、挂载App组件
import Vue from 'vue';
import App from './App.vue';
import '../common/static/css/public.scss';
import '@assets/style/reset.css';
import router from './router/index.js';
// 引入Eleent-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入自定义组件
import dialog from './utils/dialog.js';
// 引入vuex
import store from './store';
import 'babel-polyfill';
import { BAIDU_MAP_AK } from './utils/constant.js';
import VueBaiduMap from 'vue-baidu-map';
Vue.use(VueBaiduMap, {
    ak: BAIDU_MAP_AK
});
Vue.use(ElementUI);
Vue.use(dialog);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    template: '<App/>',
    components: {
        App
    }
});

// 访问移动端H5页面的时候打开

const attachFastClick = require('fastclick');
/**
 * rem 设备适配
 */
 (function() {
    attachFastClick.attach(document.body);
    var countRem = function() {
        const documentElement = document.documentElement;
        const width = documentElement.clientWidth;
        const remMultiple = width / 360;
        window.REM_MULTIPLE = remMultiple;
        let fontSize = 100 * remMultiple;
        documentElement.style.fontSize = `${fontSize}px`;

    };
    countRem();
    window.addEventListener('resize', () => {
        countRem();
    });
})();