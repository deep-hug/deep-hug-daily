<template>
    <div
        class="list-view"
        :style="{
            height: `${height}px`,
        }"
        @scroll="handleScroll"
    >
        <div
            class="list-view-phantom"
            :style="{
                height: contentHeight,
            }"
        ></div>
        <ul ref="content" class="list-view-content">
            <li
                class="list-view-item norem"
                :style="{
                    height: itemHeight + 'px',
                }"
                v-for="(item, index) in visibleData"
                :key="index"
            >
                {{ item }}
            </li>
        </ul>
    </div>
</template>
<script>
import { debounce, throttle } from './shoppingCart/util';
export default {
    name: 'ListView',
    props: {
        data: {
            type: Array,
            default: function() {
                const list = [];
                for (let i = 0; i < 1000; i++) {
                    list.push('列表' + i);
                }
                return list;
            },
        },
        height: {
            type: Number,
            default: 400 * window.REM_MULTIPLE,
        },
        itemHeight: {
            type: Number,
            default: 30 * window.REM_MULTIPLE,
        },
    },
    computed: {
        contentHeight() {
            return this.data.length * this.itemHeight + 'px';
        },
    },
    mounted() {
        this.updateVisibleData();


        // 如果跳转下一个页面，要将其 scrollTop 记录下来，以便于返回页面使用
        // let scrollTopValue = 2000;
        // this.updateVisibleData(scrollTopValue);
        // document.querySelector('.list-view').scrollTop=scrollTopValue; // 将 scrollTop 赋值到最外层盒子
    },
    data() {
        return {
            visibleData: [],
        };
    },
    methods: {
        // updateVisibleData(scrollTop) {
        //     scrollTop = scrollTop || 0;
        //     const visibleCount = Math.ceil(this.$el.clientHeight / this.itemHeight);
        //     const start = Math.floor(scrollTop / this.itemHeight);
        //     const end = start + visibleCount;
        //     this.visibleData = this.data.slice(start, end);
        //     this.$refs.content.style.webkitTransform = `translate3d(0, ${start * this.itemHeight}px, 0)`;
        // },
        updateVisibleData(scrollTop) {
            console.log(scrollTop, 'scrollTop');
            scrollTop = scrollTop || 0;
            const visibleCount = Math.ceil(this.$el.clientHeight / this.itemHeight); // 取得可见区域的可见列表项数量
            const start = Math.floor(scrollTop / this.itemHeight); // 取得可见区域的起始数据索引
            const end = start + visibleCount; // 取得可见区域的结束数据索引
            this.visibleData = this.data.slice(start, end); // 计算出可见区域对应的数据，让 Vue.js 更新
            this.$refs.content.style.webkitTransform = `translate3d(0, ${start * this.itemHeight}px, 0)`; // 把可见区域的 top 设置为起始元素在整个列表中的位置（使用 transform 是为了更好的性能）
        },
        handleScroll: debounce(
            function(ovl) {
                const scrollTop = this.$el.scrollTop;
                this.updateVisibleData(scrollTop);
            },
            1000,
            false
        ),
    },
};
</script>
<style lang="scss" scoped>
.list-view {
    overflow: auto;
    position: relative;
    border: 1px solid #aaa;
    width: 200px;
    margin-top: 100px;
    margin-left: 100px;
    font-size: 16px;

    .list-view-phantom {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        z-index: -1;
    }
    .list-view-content {
        left: 0;
        right: 0;
        top: 0;
        position: absolute;
    }
    .list-view-item.norem {
        color: #666;
        line-height: 30px;
        box-sizing: border-box;
    }
}
</style>
