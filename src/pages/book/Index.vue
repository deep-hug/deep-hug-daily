<template>
    <div>
        <!-- 我是book -->
        <ul>
            <li v-for="(item, index) in bookList" :key="index" @click="goToBookDetail(item)">
                {{ item }}
            </li>
        </ul>
        <ul>
            <li v-for="(item, index) in bookPrice" :key="index" @click="goToBookPrice(item)">{{ item }}</li>
        </ul>
        <MoreCom v-for="(item, index) in moreNum" :key="index" :num="item"></MoreCom>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="主键" label="主键" > </el-table-column>
            <el-table-column prop="类型" label="类型" > </el-table-column>
            <el-table-column label="stat_date">
                <el-table-column prop="statdate.BianGengQian" label="变更前" > </el-table-column>
                <el-table-column prop="statdate.BianGengHou" label="变更后" > </el-table-column>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import MoreCom from './MoreCom.vue';
// #引入汉字转拼音插件文件
import vPinyin from '../../utils/vue-py';
let salesmanName = '张三';
// #调用汉字转拼音方法
let namePinyin = vPinyin.chineseToPinYin(salesmanName);
console.log(namePinyin, 'namePinyin');
export default {
    components: {
        MoreCom,
    },
    data() {
        return {
            bookList: ['西游记', '红楼梦', '水浒传', '三国演义', '钢铁是怎样炼成的', '啦啦啦啦啦'],
            bookPrice: [10, 20, 30, 40],
            moreNum: [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }, { num: 5 }],
            tableData: []
        };
    },
    mounted() {
        let that = this;
        let aggDetails = [
            {
                主键: '1001',
                类型: '新增',
                stat_date: {
                    变更前: '20211008',
                    变更后: '20211008',
                },
            },
            {
                主键: '1002',
                类型: '新增',
                stat_date: {
                    变更前: '20211008',
                    变更后: '20211008',
                },
            },
        ];
        this.tableData = aggDetails;
        // initData(aggDetails);

        /**
         * @desc:
         * @param {*} arr
         * @return {*}
         */
        function initData(arr) {
            arr.forEach((item) => {
                diGui(item);
            });
            console.log(arr, '处理后的数据');
            that.tableData = arr;
        }
        /**
         * @desc:
         * @param {*}
         * @return {*}
         */
        function diGui(item) {
            if (!item || typeof item !== 'object') return;
            Object.keys(item).forEach((child) => {
                let key = vPinyin.chineseToPinYin(child);
                item[key] = item[child];
                diGui(item[child]);
            });
        }
        this.$nextTick(() => {
            setTimeout(() => {
                this.moreNum = [
                    { num: 10 },
                    { num: 20 },
                    { num: 30 },
                    { num: 40 },
                    { num: 50 },
                ];
            }, 1000);
        });
    },
    methods: {
        goToBookDetail(item) {
            this.$router.push({ path: '/bookDetail', query: { item } });
        },
        goToBookPrice(item) {
            this.$router.push({ path: '/price', query: { price: item } });
        },
    },
};
</script>

<style lang="scss" scoped></style>
