<template>
    <div>
        <!-- 我是book -->
        <ul>
            <li v-for="(item, index) in bookList" :key="index" @click="goToBookDetail(item)">
                {{item}}
            </li>
        </ul>
        <ul>
            <li v-for="(item, index) in bookPrice" :key="index" @click="goToBookPrice(item)">{{item}}</li>
        </ul>
        <MoreCom v-for="(item, index) in moreNum" :key="index" :num="item"></MoreCom>
    </div>
</template>

<script>
import MoreCom from './MoreCom.vue';
export default {
    components: {
        MoreCom
    },
    data () {
        return {
            bookList: ['西游记', '红楼梦', '水浒传', '三国演义', '钢铁是怎样炼成的', '啦啦啦啦啦'],
            bookPrice: [10,20,30,40],
            moreNum: [
                { num: 1 },
                { num: 2 },
                { num: 3 },
                { num: 4 },
                { num: 5 },
            ]
        };
    },
    mounted () {
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
            this.$router.push({path: '/bookDetail', query: {item}});
        },
        goToBookPrice(item) {
            this.$router.push({path: '/price', query: {price: item}});
        }
    }
};
</script>

<style lang="scss" scoped>

</style>