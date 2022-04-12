<template>
    <div class="shop-cart-page">
        <div class="top flex flex-ac flex-pb">
            <h2>购物天堂</h2>
            <div class="btn carts" @mouseover="showCart = true" @mouseleave="showCart = false">购物车
                <div class="user-shops" v-show="showCart">
                    <template v-if="userShops && userShops.length">
                        <div class="u-item mar-bottom flex flex-ac flex-pb" v-for="item in userShops" :key="item.id">
                            <span class="overflowHide text-left">{{item.name}}</span>
                            <div class="flex flex-ac flex-s-0">
                                <span class="mar-right5">{{item.price}}*{{item.inventory}}</span>
                                <div class="btn" @click.stop="delShop(item)">删除</div>
                            </div>
                        </div>
                        <div class="btn w-full go-shop" @click="pay()">购买</div>
                    </template>
                    <div class="no-data" v-else>
                        暂无商品
                    </div>
                </div>
            </div>
        </div>
        <ul class="shops-content flex flex-ac flex-warp">
            <li v-for="item in shops" :key="item.id" class="shop flex flex-col ">
                <div class="picture">
                    <img class="auto-img" src="https://placem.at/places?w=600&h=400" alt="">
                </div>
                <div class="flex flex-pb flex-ac info">
                    <span class="shop-name overflowHide">{{item.name}}</span>
                    <div class="shop-price flex flex-ac ">
                        <span class="price">{{item.price}}</span>
                        <span class="btn add-cart" @click="addCart(item)">加入购物车</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { multiplication, addition } from './util.js';
export default {
    data () {
        return {
            shops: [
                { name: '苹果', price: '10.99', id: '1', inventory: 2 },
                { name: '香蕉', price: '20.99', id: '2', inventory: 5 },
                { name: '菠萝-广西香蕉新鲜包熟包甜香甜可口', price: '30.99', id: '3', inventory: 10 },
                { name: '榴莲', price: '200.00', id: '4', inventory: 4 },
                { name: '橘子', price: '8.88', id: '5', inventory: 100 },
                { name: '芒果', price: '18.88', id: '6', inventory: 10 },
                { name: '葡萄', price: '28.88', id: '7', inventory: 7 },
            ],
            userShops: [

            ],
            showCart: false
        };
    },
    created () {
        // 深拷贝使用
        // let obj1 =  {
        //     a: {
        //         b: 1
        //     },
        //     c: 2,
        //     d: [3,4,5],
        //     e: () => {
        //         console.log(6);
        //     },
        //     f: new Date(),
        //     g: Infinity,
        // };
        // // console.log(this.deepClone(obj1));
        // let obj2 = this.deepClone(obj1);
        // // let obj2 = JSON.parse(JSON.stringify(obj1));
        // console.log(obj2, 'obj2');
        // obj2.e();
        // console.log(obj2.f);
        // console.log(obj2.g);
        // 扁平化数组使用
        // var arr1 = [1,2,[3,[5,6], [7], [9]],10];
        // var arr2 = this.flatten(arr1);
        // console.log(arr2, 'arr2');

        // 宏任务和微任务执行顺序： 同步任务 >= 微任务 >> 宏任务
        setTimeout(() => {
            console.log(2);
        }, 0);
        new Promise((res, rej) => {
            console.log(1);
            for (let index = 0; index < 100; index++) {
                index = 999;
                res();
            }
            console.log(3);
        }).then(res => {
            console.log(5);
        });
        console.log(4);
        // 1 3 4 5 2


        console.log(2);
        new Promise(()=>{
            console.log(4);
        });
        new Promise((resolve,reject)=>{
            resolve();
        }).then(()=>{
            console.log(3);
        });
        console.log(1);
        // 2 4 1 3

        setTimeout(()=>{console.log('宏1');},0);
        new Promise((resolve,reject)=>{}).then(console.log('微'));
        setTimeout(()=>{console.log('宏2');},0);
        // 微 宏1 宏2


        const bar = () => console.log('bar');
        const baz = () => console.log('baz');
        const foo = () => {
            console.log('foo');
            setTimeout(bar, 0);
            new Promise((resolve, reject) =>
                resolve('应该在 baz 之后、bar 之前')
            ).then(resolve => console.log(resolve));
            baz();
        };
        foo();
        // foo baz 应该在 baz 之后、bar 之前 bar


        // eslint-disable-next-line require-jsdoc
        async function a1() {
            console.log('1');
            await a2();
            console.log('2');
        }
        // eslint-disable-next-line require-jsdoc
        async function a2() {
            console.log('3');
        }
        console.log('4');
        setTimeout(() => {
            console.log('5');
        }, 0);
        a1();
        new Promise(res => {
            console.log('6');
            res();
        }).then(() => {
            console.log('7');
        });
        console.log('8');
        // 4 1 3 6 8 2 7 5
    },
    methods: {
        deepClone(obj) {
            let  objClone = Array.isArray(obj) ? [] : {};
            if (obj && typeof obj === 'object') {
                for(let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (obj[key] && typeof obj[key] === 'object') {
                            objClone[key] = this.deepClone(obj[key]);
                        } else {
                            objClone[key] = obj[key];
                        }
                    }
                }
            }
            return objClone;
        },
        flatten(arr) {
            return arr.toString().split(',');
            return arr.join(',').split(',');
            return arr.reduce((res, item) => {
                return res.concat(Array.isArray(item) ? this.flatten(item) : item);
            }, []);
            while (arr.some(item => Array.isArray(item))) {
                arr = [].concat(...arr);
            }
            return arr;
        },
        // 将商品添加到购物车
        addCart(item) {
            // 判断商品是否有库存
            if (item.inventory) {
                const product = this.userShops.find(ele => ele.id === item.id);
                // 如果购物车里面有商品，则添加 库存 
                if (product) {
                    const currentShop = this.userShops.find(ele => ele.id === item.id);
                    currentShop.inventory++;
                } else {
                    // 如果购物车没有商品，则向购物车添加 商品
                    this.userShops.push({ ...item, inventory: 1 });
                }
                item.inventory--;
            } else {
                alert('暂无库存');
            }
        },
        // 删除购物车中的商品
        delShop(item) {
            // 删除购物车的商品之前将其库释放到原商品
            let inventory = item.inventory;
            let shopInfo = this.shops.find(ele => ele.id === item.id);
            shopInfo.inventory = shopInfo.inventory + inventory;
            this.userShops = this.userShops.filter(ele => ele.id !== item.id);
        },
        // 购买
        pay() {
            let amountArr = this.userShops.map(item => {
                return multiplication(item.inventory, item.price);
            });
            let amout = addition(...amountArr);
            alert('商品总价' + amout);
        }
    }
};
</script>

<style lang="scss" scoped>
.shop-cart-page {
    width: 100%;
    .btn {
        height: 20px;
        line-height: 20px;
        text-align: center;
        border: 1px solid #333;
        border-radius: 2px;
    }
    .text-left {
        text-align: left;
    }
    .mar-right5 {
        margin-right: 5px;
    }
    .mar-bottom {
        margin-bottom: 5px;
    }
    .w-full {
        width: 100%;
    }
    .flex-s-0 {
        flex-shrink: 0
    }
    .top {
        .carts {
            width: 60px;
            position: relative;
            .user-shops {
                position: absolute;
                top: 21px;
                right: 0px;
                width: 220px;
                min-height: 200px;
                background: #fff;
                box-sizing: border-box;
                border: 1px solid #999;
                padding: 5px;
                z-index: 1;
                .u-item {
                    &:last-child {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
    .shops-content {
        margin-top: 20px;
        .shop {
            width: 216px;
            padding: 0 8px;
            box-sizing: border-box;
            border: 1px solid #888;
            margin-bottom: 10px;
            margin-right: 8px;
            .picture {
                width: 200px;
                height: 200px;
                background-color: #191919;
                .auto-img{
                    position: relative;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    max-width: 100%;
                    max-height: 100%;
                    cursor: pointer;
                }
            }
            .info {
                margin: 5px 0;
                font-size: 12px;
                // .shop-name {
                //     width: 90px;
                // }
                .add-cart {
                    width: 70px;
                    margin-left: 5px;
                }
            }
        }
    }
}
</style>
