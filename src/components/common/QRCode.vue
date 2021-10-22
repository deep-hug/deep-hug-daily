<template>
    <div class="qr-code-page" v-if="qrTxt" @click.self="cancelQR">
        <div class="qr-box flex flex-ac flex-pc">
            <qrcode-vue ref="qrcode" id="qrcode" className="qrcode" :size="size" :value="qrTxt" level="H"></qrcode-vue>
        </div> 
    </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';
export default {
    components: {
        QrcodeVue,
    },
    props: {
        value: String
    },
    data () {
        return {
            qrTxt: '',
            qrcode: '',
            size: 355.55*this.getFS()
        };
    },
    created () {
        
    },
    watch: {
        value: {
            handler: function (val, oldVal) {
                this.qrTxt = val;
            },
            immediate: true
        }
    },
    methods: {
        getFS() {
            const documentElement = document.documentElement;
            const width = documentElement.clientWidth;
            const remMultiple = width / 640;
            console.log(400 * remMultiple, 'remMultiple');
            return remMultiple;
        },
        cancelQR() {
            this.$refs.qrcode.innerHTML = '';
            this.$emit('input', '');
        },
    }
};
</script>

<style lang="scss" scoped>
.qr-code-page {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,.33);
    top: 0;
    left: 0;
    .qr-box {
        position: absolute;
        width: 230px;
        height: 230px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        #qrcode, .qrcode {
            height: 200px;
            width: 200px;
        }
    }
}
</style>
