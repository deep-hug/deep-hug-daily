<template>
    <div class="hospital-list">
        <get-location :hospital-list="hospitalList" :position="position" @get-location="getLocation"></get-location>
        <ul class="hos-list">
            <li
                class="hos-list-item flex"
                v-for="item in hospitalList"
                @click="clickHospitalItem(item)"
                :key="item.hospitalId"
            >
                <div class="img-box">
                    <img :src="item.hospitalPicture" alt="" />
                </div>
                <div class="flex-1">
                    <p class="item-name margin-top10">
                        {{ item.hospitalName }}
                    </p>
                    <p class="margin-top15 item-addr flex-pb">
                        <span>{{ item.hospitalAddress }}</span>
                        <span
                            >距您
                            <span class="item-distance">{{ item.distance ? item.distance : '未知' }}</span>
                            KM</span
                        >
                    </p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import getLocation from '../../components/common/getLocation.vue';
import requestsTest from '../../requests/requestsTest.js';
export default {
    data() {
        return {
            hospitalList: [],
            position: '',
        };
    },
    components: {
        getLocation,
    },
    mounted() {
        this.queryHospitalList();
    },
    methods: {
        queryHospitalList() {
            requestsTest.getPresignhosBylevel('01').then((res) => {
                console.log(res, 'res');
                if (res && res.length) {
                    this.hospitalList = res;
                }
            });
        },
        clickHospitalItem(item) {
            this.$router.go(-1);
        },
        // 获取当前定位 排序医院
        getLocation(BMap, res) {
            let map = new BMap.Map(''); //创建地址解析器的实例
            this.hospitalList.forEach((item) => {
                let point = new BMap.Point(item.coordinateX, item.coordinateY);
                //转换为千米
                let distance = (map.getDistance(res.point, point) / 1000).toFixed(1);
                this.$set(item, 'distance', distance);
            });
            //倒序排序
            this.hospitalList.sort(function(a, b) {
                return a.distance * 1 - b.distance * 1;
            });
            // this.position = this.hospitalList[0];
            this.position = res.point;
        },
    },
};
</script>
<style lang="scss" scoped>
.hospital-list {
    height: 100%;
    overflow: auto;
    position: relative;
    #allmap {
        height: 2.5rem;
    }
    .hos-list {
        position: absolute;
        top: 2.5rem;
        bottom: 0;
        background-color: #fff;
        width: 100%;
        overflow: auto;
        .hos-list-item {
            padding: 0.1rem 0;
            margin: 0 0.15rem;
            border-bottom: 1px solid #eee;
            overflow: hidden;
            .item-name {
                font-size: 0.15rem;
                line-height: 0.16rem;
            }
            .item-addr {
                font-size: 0.13rem;
                align-items: center;
            }
            .item-distance {
                font-size: 0.15rem;
                color: #f56363;
            }
        }
        .img-box {
            width: 0.8rem;
            height: 0.8rem;
            border: 4px solid #bbb;
            border-radius: 50%;
            margin-right: 0.15rem;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
}
</style>
