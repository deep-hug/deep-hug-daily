const el = [
    {
        path: '/el/eltable_prient',
        component: () => import(/* webpackChunkName: "el" */'../pages/el/eltable_prient.vue'),
        meta: {
            title: ''
        }
    },
    {
        path: '/el/table3',
        component: () => import(/* webpackChunkName: "el" */'../pages/el/table3.vue'),
        meta: {
            title: ''
        }
    },
];
export default el;