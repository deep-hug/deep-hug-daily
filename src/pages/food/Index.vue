<template>
    <div>
        我是food
        <ChildFirst ref="childFirstRef"></ChildFirst>
        <el-tabs v-model="activeName" @tab-click="handleClick" :before-leave="beforeLeave">
            <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import ChildFirst from './ChildFirst.vue';
export default {
    components: {
        ChildFirst  
    },
    data() {
        return {
            activeName: 'second',
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        
        beforeLeave(a, b) {
            console.log(a, b, 'b');
            if (b == 'second') {
                return this.$refs.childFirstRef.save();
            }
            if (b == 'first') {
                return new Promise((res, rej) => {
                    setTimeout(() => {
                        rej();
                    }, 100);
                });
            }
        }
    },
};
</script>

<style>

</style>