const daily = [
    {
        path: '/qr',
        component: () => import(/* webpackChunkName: "daily" */'../pages/daily/Qr.vue'),
        meta: {
            title: '二维码'
        }
    },
    {
        path: '/mapUse',
        component: () => import(/* webpackChunkName: "daily" */'../pages/daily/MapUse.vue'),
        meta: {
            title: '通过地图获取经纬度'
        }
    },
    {
        path: '/hospitalList',
        component: () => import(/* webpackChunkName: "daily" */'../pages/daily/HospitalList.vue'),
        meta: {
            title: '地图医院列表'
        }
    },
];
export default daily;