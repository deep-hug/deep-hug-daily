<template>
    <section>
        <baidu-map class="map" :zoom="15" @ready="getLocation" :position="defaultPosition" :center="defaultPosition">
            <div v-if="hospitalList.length">
                <bm-marker
                    v-for="marker in hospitalList"
                    :key="marker.id"
                    :position="{ lng: marker.coordinateX, lat: marker.coordinateY }"
                    :dragging="true"
                    :icon="{ url: defaultImg, size: { width: 19, height: 35 } }"
                >
                    <bm-label
                        :content="marker.hospitalName"
                        :labelStyle="bmLabelStyle"
                        :offset="{ width: -85, height: 40 }"
                    />
                </bm-marker>
            </div>
        </baidu-map>
    </section>
</template>
<script>
export default {
    props: ['hospitalList', 'position'],
    data() {
        return {
            defaultImg: require('../../assets/images/mark_baidu.nohash.png'),
            defaultPosition: { lng: 121.48, lat: 31.4 },
            bmLabelStyle: {
                border: '1px solid #ccc',
                color: '#666',
                padding: '0.05rem',
                borderRadius: '0.05rem',
            },
            a: 123,
        };
    },
    watch: {
        position: {
            handler(newValue, oldValue) {
                console.log(newValue, 111, oldValue);
                if (newValue && newValue.lng) {
                    console.log(123456789);
                    this.defaultPosition.lng = newValue.lng;
                    this.defaultPosition.lat = newValue.lat;
                }
            },
            deep: true,
            immediate: true
        },
    },
    methods: {
        // 获取当前定位 排序医院
        getLocation({ BMap }) {
            // console.log(this.position);
            let geocoder = new BMap.Geolocation(); //创建地址解析器的实例
            geocoder.getCurrentPosition(
                (res) => {
                    this.$emit('get-location', BMap, res);
                },
                (err) => {
                    this.$emit('get-location', BMap, 'err');
                }
            );
        },
        // //定位成功
        // handleMarkerClick(item) {
        //     this.position = item;
        // }
    },
};
</script>
<style lang="less" scoped>
.map {
    height: 2.5rem;
}
</style>
