<template>
    <div>
        <p>App.vue</p>
        <hr />
        // 这里我们可以看到，app.vue向下一集的child1组件传递了5个参数，分别是name / age / job / sayHi / title
        <child1 :name="name" :age="age" :job="job" :say-Hi="say" title="App.vue的title"></child1>
    </div>
</template>
<script>
const child1 = () => import('./child1.vue');
export default {
    name: 'app',
    components: { child1 },
    data() {
        return {
            name: 'Echo',
            age: '18',
            job: 'FE',
            say: 'this is Hi~',
        };
    },
};
</script>
