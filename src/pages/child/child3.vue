<template>
    <div class="child3">
        <p>child3.vue</p>
        <p>job: {{ job }}</p>
        <p>title: {{ title }}</p>
        <p>childCom3: {{ $attrs }}</p>
        <p @click="startUpRocket">child3</p>
    </div>
</template>
<script>
export default {
    inheritAttrs: true,
    props: {
        job: String,
        title: String,
    },
    methods: {
        startUpRocket() {
            this.$emit('upRocket');
            console.log('startUpRocket');
        },
    },
};
</script>
