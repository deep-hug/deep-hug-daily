<template>
    <div class="child1">
        <p>child1.vue</p>
        <p>name: {{ name }}</p>
        <p>childCom1的$attrs: {{ $attrs }}</p>
        <p>可以看到，$attrs这个对象集合中的值 = 所有传值过来的参数 - props中显示定义的参数</p>
        <hr />
        <child2 v-bind="$attrs" v-on:upRocket="reciveRocket"></child2>
    </div>
</template>
<script>
const child2 = () => import('./child2.vue');
export default {
    components: {
        child2,
    },
    // 这个inheritAttrs默认值为true，不定义这个参数值就是true，可手动设置为false
    // inheritAttrs的意义在用，可以在从父组件获得参数的子组件根节点上，将所有的$attrs以dom属性的方式显示
    inheritAttrs: true, // 可以关闭自动挂载到组件根元素上的没有在props声明的属性
    props: {
        name: String, // name作为props属性绑定
    },
    created() {
        // 这里的$attrs就是所有从父组件传递过来的所有参数 然后 除去props中显式定义的参数后剩下的所有参数！！！
        console.log(this.$attrs); //  输出{age: "18", job: "FE", say-Hi: "this is Hi~", title: "App.vue的title"}
    },
    methods: {
        reciveRocket() {
            console.log('reciveRocket success');
        },
    },
};
</script>
