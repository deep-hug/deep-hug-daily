<template>
    <div class="map-use-page">
        <baidu-map class="map" @ready="getLocation"> </baidu-map>
        <div>
            lat: {{lat}}
        </div>
        <div>
            lng: {{lng}}
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            lat: '',
            lng: '',
        };
    },
    methods: {
        // 获取当前定位 排序医院
        getLocation({ BMap }) {
            let that = this;
            let geolocation = new BMap.Geolocation(); //调用定位，根据定位的坐标匹配医院距离
            geolocation.getCurrentPosition(
                function(r) {
                    if (this.getStatus() == window.BMAP_STATUS_SUCCESS) {
                        var pt = r.point;
                        console.log(pt, '成功获取经纬度');
                        that.lat = pt.lat;
                        that.lng = pt.lng;
                    } else {
                        console.log('获取经纬度失败');
                    }
                },
                { enableHighAccuracy: true }
            );
        },
    },
};
</script>

<style lang="scss" scoped></style>
