<template>
    <div class="container">
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
        <div>
            <h3>计数器</h3>
            <p>当前数字是:{{ num }}</p>
            <p>转换后的数字是:{{ numAdd1 }}</p>
            <el-button type="primary" @click="numIncrement(1)" plain>点我加1</el-button>
            <el-button type="primary" @click="numIncrementAsync" plain>加我400毫秒后加3</el-button>
        </div>
        <div>
            <el-button type="primary" @click="setStorage" plain>本地储存数据</el-button>
        </div>
        <div>
            <el-button type="primary" @click="getAddressList" plain>请求接口数据</el-button>
        </div>
        <div>
            <div v-for="(item, index) in addressList" :key="index">
                {{ item.title }}
            </div>
        </div>
        <div>
            <el-button type="primary" @click="getMockData" plain>获取mock数据</el-button>
        </div>
        <div>
            <el-button type="primary" @click="login" plain>登录</el-button>
        </div>
        <div class="flex">
            <div>1</div>
            <div>2</div>
        </div>
        <div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-button type="text" @click="showDateChooseFlag = true">点击打开 Dialog</el-button>
        <DateDialog :value="showDateChooseFlag" @closeDateChooseDialog="closeDateChooseDialog"></DateDialog>

        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item
                label="活动时间"
                prop="date1"
                :rules="{ type: 'date', message: '请选择时间', trigger: 'change', required: true }"
            >
                <el-col :span="11">
                    <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="form.date1"
                        style="width: 100%;"
                        :picker-options="pickerOptions1"
                    ></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="form.date2"
                        style="width: 100%;"
                        :picker-options="pickerOptions2"
                    ></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>

        <h2 @click="handleClick">vue中key的作用是什么</h2>
        <div>
            key是给每一个vnode唯一的id，通过key可以使diff算法更快速，更准确；
            在进行diff算法的时候，首先会进行新旧节点的首尾交叉对比，如果匹配不到，会拿新节点的key于旧节点进行比较，进而找到旧节点
        </div>

        <h2>new Vue实例中，data是一个对象，在vue组件中，data为什么是一个函数</h2>
        <div>
            因为组件是复用的，在js中对象是引用关系，如果组件的data是一个对象，那么子组件中的属性值会相互污染，产生副作用。
        </div>

        <input type="number" v-model.number.trim="input1" />

        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
            <el-form-item
                prop="email"
                label="邮箱"
                :rules="[
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' },
                ]"
            >
                <el-input v-model="dynamicValidateForm.email"></el-input>
            </el-form-item>
            <el-form-item
                v-for="(domain, index) in dynamicValidateForm.domains"
                :key="domain.key"
            >

                <el-form-item :label="'value' + index" :prop="'domains.' + index + '.value' " :rules="custormRules">
                    {{'domains.' + index + '.value'}}
                    <el-input v-model.number="domain.value"></el-input>
                    <el-button @click.prevent="removeDomain(domain)">删除</el-button>
                </el-form-item>

                <el-form-item :label="'date1' + index" :prop="'domains.' + index + '.date1'" :rules="custormRulesDate" style="margin-top: 10px;">
                    {{'domains.' + index + '.date1'}}
                    <el-input v-model.number="domain.date1"></el-input>
                    <el-button @click.prevent="removeDomain(domain)">删除</el-button>
                </el-form-item>

            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm1('dynamicValidateForm')">提交</el-button>
                <el-button @click="addDomain">新增域名</el-button>
                <el-button @click="resetForm1('dynamicValidateForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import storage from '../utils/storage.js';
import requestsTest from '@requests/requestsTest.js';
import DateDialog from '../components/common/TestDialog.vue';
export default {
    components: {
        DateDialog,
    },
    data() {
        var checkAge = (rule, value, callback) => {
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
        var checkDate =  (rule, value, callback) => {
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
            addressList: [],
            ruleForm: {
                name: '',
            },
            rules: {
                name: { validator: this.checkName, trigger: 'blur' },
            },
            showDateChooseFlag: false,
            form: {
                date1: '',
                date2: '',
            },
            pickerOptions1: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            },
            pickerOptions2: {
                disabledDate: (time) => {
                    if (this.form.date1) {
                        return new Date(this.form.date1).getTime() > time.getTime();
                    }
                },
            },
            input1: 0,
            custormRules: {
                validator: checkAge,
                trigger: 'blur',
            },
            custormRulesDate: {
                validator: checkDate,
                trigger: 'blur',
            },
            dynamicValidateForm: {
                domains: [
                    {
                        value: '',
                        date1: '',
                    },
                    {
                        value: '',
                        date1: '',
                    },
                ],
                email: '',
            },
        };
    },
    created() {},
    computed: {
        ...mapState('book', ['num']),
        ...mapGetters('book', ['numAdd1']),
    },
    methods: {
        ...mapMutations('book', ['numIncrement']),
        ...mapActions('book', ['numIncrementAsync']),
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
                },
            });
        },
        setStorage() {
            storage.setRequestHeader({ name: 'deep-hug', age: '21' });
            setTimeout(() => {
                console.log(storage.getRequestHeader());
            }, 500);
        },
        getAddressList() {
            requestsTest.getAddressList({ page: 1, tab: 'good', limit: 20 }).then((res) => {
                if (res && res.data && res.data.length) {
                    console.log(res, '得到的列表');
                    this.addressList = res.data;
                }
            });
        },
        getMockData() {
            requestsTest.getMockData().then((res) => {
                console.log(res, 'mock数据');
            });
        },
        login() {
            requestsTest.login({ account: 'sfy1', password: 'sfy12345' }).then((res) => {
                console.log('登录成功------proxy（代理）成功');
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
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
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // alert('submit!');
                    console.log(111);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        submitForm1(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // alert('submit!');
                    console.log('通过了');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm1(formName) {
            this.$refs[formName].resetFields();
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
                key: Date.now(),
            });
        },
    },
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
