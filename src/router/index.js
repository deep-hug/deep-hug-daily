import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
// 路由文件自动配置，不需要手动引用
const requireContext = require.context('./', false, /\.js$/);
let moduleRouter = [];
requireContext.keys().forEach(fileName => {
    // 排除本文件
    if (!/index/g.test(fileName)) {
        let list = requireContext(fileName).default;
        moduleRouter.push(...list);
    }
});
let baerArr = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import(/* webpackChunkName: "home" */'../pages/Home.vue'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/audio',
        component: () => import(/* webpackChunkName: "home" */'../pages/audio.vue'),
        meta: {
            title: '录音'
        }
    },
    {
        path: '/shoppingCart',
        component: () => import(/* webpackChunkName: "home" */'../pages/shoppingCart/Index.vue'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/demo',
        component: () => import(/* webpackChunkName: "home" */'../pages/Demo.vue'),
        meta: {
            title: 'demo页面'
        }
    },
    {
        path: '/virtualList',
        component: () => import(/* webpackChunkName: "home" */'../pages/VirtualList.vue'),
        meta: {
            title: '虚拟列表'
        }
    },
    {
        path: '/child',
        component: () => import(/* webpackChunkName: "home" */'../pages/child/child.vue'),
        meta: {
            title: 'child页面'
        }
    },
];
// 路由错误页面配置
let errorList = [
    {
        path: '/errorpage',
        component: () => import(/* webpackChunkName: "errorpage" */'../pages/ErrorPage.vue'),
        meta: {
            title: '缺省页'
        }
    },
    {
        path: '*',
        redirect: '/errorpage'
    }
];
let routes = [
    ...baerArr,
    ...moduleRouter,
    ...errorList,
];
const index = new VueRouter({
    // mode: 'history',  // hash history
    routes
});
// 路由狗子
index.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});
export default index;