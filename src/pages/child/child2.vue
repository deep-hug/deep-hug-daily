<template>
    <div class="child2">
        <p>child2.vue</p>
        <p>age: {{ age }}</p>
        <p>childCom2: {{ $attrs }}</p>
        <hr />
        <child3 v-bind="$attrs" v-on="$listeners"></child3>
    </div>
</template>
<script>
const child3 = () => import('./child3.vue');
export default {
    components: {
        child3,
    },
    // 将inheritAttrs设置为false之后，将关闭自动挂载到组件根元素上的没有在props声明的属性
    inheritAttrs: false,
    props: {
        age: String,
    },
    created() {
        // 同理和上面一样，$attrs这个对象集合中的值 = 所有传值过来的参数 - props中显示定义的参数
        console.log(this.$attrs);
        // this.$emit('child2', 'child2-data');
    },
};
</script>
