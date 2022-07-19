<template>
    <section class="template-area">
        <el-table ref='mytable' :data="tableData" stripe style="width: 100%">
            <el-table-column prop="date" label="日期" width="180"> </el-table-column>
            <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
    </section>
</template>

<script>
export default {
    data() {
        return {
            tableData: [
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
                { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄', },
            ],
        };
    },
    created() {},
    mounted () {
        this.$nextTick(() => {
            let thead =  this.$refs.mytable.$el.querySelector('.el-table__header-wrapper thead');
            let theadNew = thead.cloneNode(true);
            this.$refs.mytable.$el.querySelector('.el-table__body-wrapper table').appendChild(theadNew);
        });
    },
    methods: {},
    components: {},
};
</script>

<style lang="scss" scoped>
.template-area {
    background-color: #fff;
    height: 100%;
    .el-table /deep/ .el-table__body-wrapper table thead {
        display: none;
    }
    @media print {
        .el-table /deep/ .el-table__body-wrapper table thead {
            display: table-header-group;
        }
        .el-table /deep/ .el-table__header-wrapper {
            display: none;
        }
    }
}
</style>
