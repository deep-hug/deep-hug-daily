<template>
    <div>
        {{num.num}}
    </div>
</template>

<script>
export default {
    name: 'MoreCom',
    props: [ 'num' ],
    data () {
        return {
            iVal: 0
        };
    },
    watch: {
        num: {
            handler: function (newVal, oldVal) {
                console.log(newVal, 111111, oldVal);
            },
            deep: true,
            // immediate: true
        },
        iVal: {
            handler: function (newVal, oldVal) {
                console.log(newVal, 222222, oldVal);
            },
            deep: true,
            immediate: true
        }
    }
};
</script>

<style>

</style>
