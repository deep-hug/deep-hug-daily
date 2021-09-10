<template>
    <div>
        ChildFirst
    </div>
</template>

<script>
import requestsTest from '@requests/requestsTest.js';
export default {
    methods: {
        save() {
            return new Promise((resolve, reject) => {
                requestsTest.getAddressList({ page: 1, tab: 'good', limit: 20 }).then(res => {
                    if (res && res.data && res.data.length) {
                        // console.log(res, '得到的列表');
                        // this.addressList = res.data;

                        // resolve();  // 成功
                        reject();  // 失败
                    }
                }).catch(error => {
                    console.log(error, 'error');
                });
            });
            
            // try {
            //     let poseMes = {

            //     };
            //     this.requesta.save(poseMes).then(res => {
            //         if (res.code == 10) {
            //             return new Promise((res, rej) => {
            //                 setTimeout(() => {
            //                     res();
            //                 }, 1000);
            //             });
            //         } else {
            //             return new Promise((res, rej) => {
            //                 setTimeout(() => {
            //                     rej();
            //                 }, 1000);
            //             });
            //         }
            //     });
            // } catch {
            //     return false;
            // }
        },
    }
};
</script>

<style>

</style>
