<template>
    <div>
        <QRCode v-model="qrTxt"></QRCode>
    </div>
</template>

<script>
import QRCode from '../../components/common/QRCode.vue';
export default {
    components: {
        QRCode
    },
    data () {
        return {
            qrTxt: '123456789'
        };
    }
};
</script>

<style>

</style>
