<template>
    <div class="container">
        <span class="mytooltip" title="个性样式个性样式个性样式个性样式个性样式" >
            格式样式:
        </span>
        <!-- 我是Home -->
        <ul>
            <li @click="goToBook">图书</li>
            <li @click="goToFood">美食</li>
        </ul>
        <el-button @click="goToBook" plain>图书</el-button>
        <el-button @click="goToFood" plain>美食</el-button>
        <el-button @click="loading" plain>loading</el-button>
        <el-button @click="toast" plain>toast</el-button>
        <el-button @click="dialog" plain>dialog</el-button>
        <el-button @click="getPoint" plain>获取经纬度</el-button>
        <el-button @click="goqr" plain>二维码页面</el-button>
        <el-button @click="gomapUse" plain>通过地图获取经纬度</el-button>
        <el-button @click="gohospitalList" plain>地图医院列表</el-button>
        <div>
            <h3>计数器</h3>
            <!-- mapState 第一种使用 -->
            <p>测试的数字:{{ countPlusLocalState }}</p>
            <p>当前数字是:{{ nnum }}</p>
            <!-- mapState第二种使用 -->
            <!-- <p>当前数字是:{{ num }}</p> -->

            <!-- mapGetters的第一种使用 -->
            <!-- <p>转换后的数字是:{{ numAdd1 }}</p> -->
            <!-- mapGetters的第二种使用 -->
            <p>转换后的数字是:{{snumAdd1}}</p>
            <!-- ...mapMutation第一种使用 -->
            <!-- <el-button type="primary" @click="numIncrement(1)" plain
                >点我加1</el-button
            > -->
            <!-- ...mapMutation第二种使用 -->
            <el-button type="primary" @click="snumIncrement(1)" plain
                >点我加1</el-button
            >
            <el-button type="primary" @click="numIncrementAsync" plain
                >加我400毫秒后加3</el-button
            >
        </div>
        <div>
            <el-button type="primary" @click="setStorage" plain
                >本地储存数据</el-button
            >
        </div>
        <div>
            <el-button type="primary" @click="getAddressList" plain
                >请求接口数据</el-button
            >
        </div>
        <div>
            <div v-for="(item, index) in addressList" :key="index">
                {{ item.title }}
            </div>
        </div>
        <div>
            <el-button type="primary" @click="getMockData" plain
                >获取mock数据</el-button
            >
        </div>
        <div>
            <el-button type="primary" @click="login" plain>登录</el-button>
        </div>
        <div class="flex">
            <div>1</div>
            <div>2</div>
        </div>
        <div>
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')"
                        >立即创建</el-button
                    >
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-button type="text" @click="showDateChooseFlag = true"
            >点击打开 Dialog</el-button
        >
        <DateDialog
            :value="showDateChooseFlag"
            @closeDateChooseDialog="closeDateChooseDialog"
        ></DateDialog>

        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item
                label="活动时间"
                prop="date1"
                :rules="{
                    type: 'date',
                    message: '请选择时间',
                    trigger: 'change',
                    required: true,
                }"
            >
                <el-col :span="11">
                    <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="form.date1"
                        style="width: 100%"
                        :picker-options="pickerOptions1"
                    ></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="form.date2"
                        style="width: 100%"
                        :picker-options="pickerOptions2"
                    ></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')"
                    >立即创建</el-button
                >
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>

        <h2 @click="handleClick">vue中key的作用是什么</h2>
        <div>
            key是给每一个vnode唯一的id，通过key可以使diff算法更快速，更准确；
            在进行diff算法的时候，首先会进行新旧节点的首尾交叉对比，如果匹配不到，会拿新节点的key于旧节点进行比较，进而找到旧节点
        </div>

        <h2>
            new Vue实例中，data是一个对象，在vue组件中，data为什么是一个函数
        </h2>
        <div>
            因为组件是复用的，在js中对象是引用关系，如果组件的data是一个对象，那么子组件中的属性值会相互污染，产生副作用。
        </div>

        <input type="number" v-model.number.trim="input1" />

        <el-form
            :model="dynamicValidateForm"
            ref="dynamicValidateForm"
            label-width="100px"
            class="demo-dynamic"
        >
            <!-- <el-form-item
                prop="email"
                label="邮箱"
                :rules="[
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' },
                ]"
            >
                <el-input v-model="dynamicValidateForm.email"></el-input>
            </el-form-item> -->
            <el-form-item
                v-for="(domain, index) in dynamicValidateForm.domains"
                :key="domain.key"
            >
                <el-form-item>
                    <el-select v-model="domain.selectV" placeholder="请选择" @change="changeSec1 => changeSec2(index)">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    :label="'value' + index"
                    :prop="'domains.' + index + '.value'"
                    :rules="custormRules"
                >
                    {{ 'domains.' + index + '.value' }}
                    <el-input v-model.number="domain.value"></el-input>
                    <el-button @click.prevent="removeDomain(domain)"
                        >删除</el-button
                    >
                </el-form-item>

                <!-- <el-form-item :label="'date1' + index" :prop="'domains.' + index + '.date1'" :rules="custormRulesDate" style="margin-top: 10px;">
                    {{'domains.' + index + '.date1'}}
                    <el-input v-model.number="domain.date1"></el-input>
                    <el-button @click.prevent="removeDomain(domain)">删除</el-button>
                </el-form-item> -->
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="submitForm1('dynamicValidateForm')"
                    >提交</el-button
                >
                <el-button @click="addDomain">新增域名</el-button>
                <el-button @click="resetForm1('dynamicValidateForm')"
                    >重置</el-button
                >
            </el-form-item>
        </el-form>

        <div v-if="URLTxt">
            <vue-qr :text="URLTxt" :size="400"></vue-qr>
        </div>
        <br>
        <el-button @click="resetForm11">处理数据</el-button>
        <br>
        <el-input type="text" v-model="txturl"></el-input>
        <br>
        <el-button @click="jiagongURL()">生成链接</el-button>
        <br>
        <span id="copy_value">{{URLTxt}}</span>
        <br>
        <el-button @click="copy()">复制URL</el-button>
        <br>

        <el-input type="text" v-model="paramsURL"></el-input>
        <br>
        <el-button @click="changeParams()">转换参数</el-button>
        <br>
        <span id="copy_para">{{copyParamsURL}}</span>
        <br>
        <el-button @click="copyPara()">复制URL</el-button>
        经期：16号
        味道：甜的
        身高：159 
        体重：139
        父母电话：13532990134  18317820136
        父母身份证：410225197202252633（50）  410225197305012640（49）
    </div>
</template>

<script>
import vueQr from 'vue-qr';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import storage from '../utils/storage.js';
import requestsTest from '@requests/requestsTest.js';
import DateDialog from '../components/common/TestDialog.vue';
import base_64 from '../../common/utils/base_64.js';
import mytooltip from '../utils/mytooltip.js';
export default {
    mixins: [mytooltip],
    components: {
        DateDialog,
        vueQr
    },
    data() {
        var checkAge = (rule, value, callback) => {
            let index = rule.field.split('.')[1];
            let selectV = this.dynamicValidateForm.domains[index].selectV;
            if (selectV == 5) {
                callback();
                return;
            }
            if (!value) {
                return callback(new Error('年龄不能为空'));
            }
            if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'));
            } else {
                if (Number(value) < 18) {
                    callback(new Error('必须年满18岁'));
                } else {
                    callback();
                }
            }
        };
        var checkDate = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('年龄不能为空-111'));
            }
            if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值-111'));
            } else {
                if (Number(value) < 18) {
                    callback(new Error('必须年满18岁-111'));
                } else {
                    callback();
                }
            }
        };
        return {
            options: [
                {
                    value: '1',
                    label: '黄金糕'
                }, {
                    value: '2',
                    label: '双皮奶'
                }, {
                    value: '3',
                    label: '蚵仔煎'
                }, {
                    value: '4',
                    label: '龙须面'
                }, {
                    value: '5',
                    label: '北京烤鸭'
                }
            ],
            txturl: '',
            URLTxt: '',
            paramsURL: '',
            paramsOBJ: {},
            copyParamsURL: '',
            addressList: [],
            ruleForm: {
                name: ''
            },
            rules: {
                name: { validator: this.checkName, trigger: 'blur' }
            },
            showDateChooseFlag: false,
            form: {
                date1: '',
                date2: ''
            },
            pickerOptions1: {
                // disabledDate(time) {
                //     return time.getTime() > Date.now();
                // }
                disabledDate: time => {
                    if (this.form.date2) {
                        return (
                            (new Date(this.form.date2).getTime() < time.getTime()) || (time.getTime() > Date.now())
                        );
                    } else {
                        return time.getTime() > Date.now();
                    }
                }
            },
            pickerOptions2: {
                disabledDate: time => {
                    if (this.form.date1) {
                        return (
                            (new Date(this.form.date1).getTime() > time.getTime()) || (time.getTime() > Date.now())
                        );
                    } else {
                        return time.getTime() > Date.now();
                    }
                }
            },
            input1: 0,
            custormRules: {
                validator: checkAge,
                trigger: 'blur'
            },
            custormRulesDate: {
                validator: checkDate,
                trigger: 'blur'
            },
            dynamicValidateForm: {
                domains: [
                    {
                        value: '',
                        date1: '',
                        selectV: '',
                    },
                    {
                        value: '',
                        date1: '',
                        selectV: '',
                    }
                ],
                email: ''
            },
            testForm: {
                i: 3,
                a: '',
                b: null,
                c: {
                    d: 1,
                    e: 3,
                    g: '',
                    h: null
                },
                ddd: {
                    eee: ''
                },
                arr: [
                    {
                        x: 1,
                        y: '',
                    },
                    { 
                        xx: '',
                        yy: null
                    }
                ],
                arr1: [
                    { xxx: '' }
                ]
            },
            allArr: [
                1,2,3,4,5,6,7,8,9,10,11
            ]
        };
    },
    created() {
        // 获取store中的state的值
        console.log(this.$store.state.book.num, '获取store中的state的值');
        // 获取store中的getters的值
        console.log(this.$store.getters['book/numAdd1'], '获取store中的getters的值');
        this.init();
        let len = Math.ceil(this.allArr.length / 5);
        let arr = [];
        for (let i=0;i<len;i++) {
            arr.push(this.allArr.slice((i*5), (i+1)*5));
        }
        console.log(arr, 'arr');
    },
    computed: {
        // mapState第一种使用
        ...mapState('book', {
            // 箭头函数
            // nnum: state => state.num,
            // 传字符串参数 'num' 等同于 `state => state.num`
            nnum: 'num',
             // 为了能够使用 `this` 获取局部状态，必须使用常规函数
            countPlusLocalState (state) {
                return state.num + 10;
            }
        }),
        // mapState第二种使用
        // ...mapState('book', ['num']),

        // mapGetters第一种使用
        // ...mapGetters('book', ['numAdd1']),
        // mapGetters第二种使用
        ...mapGetters('book', {
            snumAdd1: 'numAdd1'
        })
    },
    methods: {
        goqr() {
            this.$router.push({ path: 'qr' });
        },
        gomapUse() {
            this.$router.push({ path: 'mapUse' });
        },
        gohospitalList() {
            this.$router.push({ path: 'hospitalList' });
        },
        async getPoint() {
            // 第一种方法（不是很推荐，因为要引用第三方地图的sdk并且需要在特定域名下才可以使用）
            try {
                await this.getPoint1();
            } catch (error) {
                console.log('jdk不支持在此域名下使用或者其他错误');
            }

            // 第二种方法（利用HTML5新特性去获取经纬度）
            if (navigator.geolocation) {
                var that = this;
                navigator.geolocation.getCurrentPosition(function (position) {
                    let latitude = position.coords.latitude;
                    let longitude = position.coords.longitude;
                    console.log('成功了: ' + latitude, longitude);
                }, function (e) {
                    console.log(e, 'eeeeeeeee');
                    that.$toast('报错了');
                }, { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true });
            } else {
                this.$toast('该机器不支持定位');
            }

        },
        getPoint1() {
            return new Promise((res, rej) => {
                 let geolocation = new BMap.Geolocation();
                //调用定位，根据定位的坐标匹配医院距离
                geolocation.getCurrentPosition(function (r) {
                    if (this.getStatus() == window.BMAP_STATUS_SUCCESS) {
                        var pt = r.point;
                        console.log(pt, '成功获取经纬度');
                        res();
                    } else {
                        console.log('获取经纬度失败');
                        rej();
                    }
                }, {enableHighAccuracy: true});
            });
        },
        // mapMutations第一种使用
        // ...mapMutations('book', ['numIncrement']),
        // ...mapMutation第二种使用
        ...mapMutations('book', {
            snumIncrement: 'numIncrement'
        }),
        ...mapActions('book', ['numIncrementAsync']),
        changeSec2(index) {
            this.$refs.dynamicValidateForm.validateField('domains.' + index + '.value',);
        },
        init() {
            console.log('start');
            const initData = [1, 2, 3];
            const promiseAll = [];
            let revertData = [];
            initData.forEach(item => {
                promiseAll.push(new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve('revert' + item);
                    }, 1000);
                }));
            });
            Promise.all(promiseAll).then((result) => {
                revertData = [...result];
                console.log([...result], 1234, revertData);
                console.log('end');
            }).catch((error) => {
                console.log(error);
            });
        },
        changeParams() {
            let url = this.paramsURL.split('connectionVideo/')[1];
            if (!url) return;
            this.copyParamsURL = base_64().decode(url);
            console.log(base_64().decode(url));
        },
        copyPara() {
            let target = null;
            target = document.querySelector('#copy_para');
            try {
                let range = document.createRange();
                range.selectNode(target);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                document.execCommand('copy');
                window.getSelection().removeAllRanges();
                this.$message({ message: '复制成功', type: 'success'});
            } catch (e) {
                this.$message({ message: '复制失败', type: 'error'});
            }
        },
        jiagongURL() {
            // 第一钟
            this.URLTxt = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc9e994d92836e727&redirect_uri=${encodeURIComponent(this.txturl.replace('jinganH5', 'jinganH5-re'))}&response_type=code&scope=snsapi_userinfo&state=310106000000#wechat_redirect`;
            this.$nextTick(() => {
                this.copy();
            });
            // 第二种
            // this.URLTxt = '';
            // let queryStr = this.txturl.split('connectionVideo/')[1];
            // let txturl = this.txturl.split('from=weixin')[0] + 'from=weixin&sourceFrom=99&queryStr=' + queryStr + '#!/homeBlank';
            // this.$nextTick(() => {
            //     this.URLTxt = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc9e994d92836e727&redirect_uri=${encodeURIComponent(txturl.replace('jinganH5', 'jinganH5-re'))}&response_type=code&scope=snsapi_userinfo&state=310106000000#wechat_redirect`;
            //     this.copy();
            // });
        },
        copy() {
            let target = null;
            target = document.querySelector('#copy_value');
            try {
                let range = document.createRange();
                range.selectNode(target);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                document.execCommand('copy');
                window.getSelection().removeAllRanges();
                this.$message({ message: '复制成功', type: 'success'});
            } catch (e) {
                this.$message({ message: '复制失败', type: 'error'});
            }
        },
        handleClick() {
            console.log(111);
        },
        goToFood() {
            this.$router.push('/food');
        },
        goToBook() {
            this.$router.push('/book');
        },
        loading() {
            this.$loading(true);
            setTimeout(() => {
                this.$loading(false);
            }, 3000);
        },
        toast() {
            this.$toast('请先登录');
        },
        dialog() {
            this.$dialog({
                show: true,
                dialogTitle: 'Dialog', // 标题
                dialogStr: '您确定要注销此账户吗？',
                okBtnStr: '确定',
                cancelBtnStr: '取消',
                okFn: () => {
                    console.log('点击了确定');
                },
                cancelFn: () => {
                    console.log('点击了取消');
                }
            });
        },
        setStorage() {
            storage.setRequestHeader({ name: 'deep-hug', age: '21' });
            setTimeout(() => {
                console.log(storage.getRequestHeader());
            }, 500);
        },
        getAddressList() {
            requestsTest
                .getAddressList({ page: 1, tab: 'good', limit: 20 })
                .then(res => {
                    if (res && res.data && res.data.length) {
                        console.log(res, '得到的列表');
                        this.addressList = res.data;
                    }
                });
        },
        getMockData() {
            requestsTest.getMockData({ id: 1 }).then(res => {
                console.log(res, 'mock数据');
            });
        },
        login() {
            requestsTest
                .login({ account: 'sfy1', password: 'sfy12345' })
                .then(res => {
                    console.log('登录成功------proxy（代理）成功');
                });
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        async checkName(rule, value, callback) {
            if (!value) return callback(new Error('不能为空'));

            if (value != 111) {
                let res = await 1;
                console.log(res);
                return callback(new Error('不允许提交'));
            }
            callback();
        },
        closeDateChooseDialog() {
            this.showDateChooseFlag = false;
        },
        onSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    console.log('submit');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        submitForm1() {
            this.$refs['dynamicValidateForm'].validate(valid => {
                    if (valid) {
                        alert(11);
                    } else {

                    }
                });
            // return new Promise((res, rej) => {
            //     this.$refs['dynamicValidateForm'].validate(valid => {
            //         if (valid) {
            //             res(11);
            //         } else {
            //             rej();
            //         }
            //     });
            // });
        },
        async resetForm1(formName) {
            // this.$refs[formName].resetFields();

            // this.submitForm1().then(res => {
            //     console.log(res);
            // }).catch(err => {
            //     console.log(err);
            // });

            try {
                let result = await this.submitForm1();
                console.log(result);
            } catch {
                console.log('代码catch了');
            }
        },
        removeDomain(item) {
            var index = this.dynamicValidateForm.domains.indexOf(item);
            if (index !== -1) {
                this.dynamicValidateForm.domains.splice(index, 1);
            }
        },
        addDomain() {
            this.dynamicValidateForm.domains.push({
                value: '',
                key: Date.now()
            });
        },
        resetForm11() {
            let obj = this.deepClone(this.testForm);
            if (obj && typeof obj === 'object') {
                for (var key in obj) {
                    if (obj[key] && obj[key].length && Object.prototype.toString.call(obj[key]) === '[object Array]') {
                        obj[key].forEach((item, index) => {
                            if (obj && typeof item === 'object') {
                                for (var itemkey in item) {
                                    if (item[itemkey] === '' || item[itemkey] === null) {
                                        delete item[itemkey];
                                    }
                                }
                                if (JSON.stringify(item) === '{}') {
                                    obj[key].splice(index, 1);
                                }
                            }
                        });
                        if (JSON.stringify(obj[key])  === '[]') {
                            delete obj[key];
                        }
                    }
                    if (obj[key] && Object.prototype.toString.call(obj[key]) === '[object Object]') {
                        for (var objkey in obj[key]) {
                            if (obj[key][objkey] === '' || obj[key][objkey] === null) {
                                delete obj[key][objkey];
                            }
                        }
                        if (JSON.stringify(obj[key]) === '{}') {
                            delete obj[key];
                        }
                    }
                    if (obj[key] === '' || obj[key]=== null) {
                        delete obj[key];
                    }
                }
            }
            console.log(JSON.stringify(this.testForm));
            console.log(JSON.stringify(obj));
            return obj;
        },
        //使用递归的方式实现数组、对象的深拷贝
        deepClone(obj) {
            //判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，对象的话进行对象拷贝
            var objClone = Array.isArray(obj) ? [] : {};
            //进行深拷贝的不能为空，并且是对象或者是
            if (obj && typeof obj === 'object') {
                for (var key in obj) {
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
        }
    }
};
</script>

<style lang="scss" scoped>
.container input::-webkit-outer-spin-button,
.container input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
.container input[type='number'] {
    -moz-appearance: textfield;
}
</style>
