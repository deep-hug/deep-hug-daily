/*
 * @Author: DeepHug
 * @Descripttion: vue双向数据绑定
 * @Date: 2022-02-23 15:48:13
 * @LastEditors: DeepHug
 * @LastEditTime: 2022-02-23 17:39:36
 */
class Vue {
    constructor(options) {
        this.$data = options.data;


        // 调用数据劫持的方法
        Observe(this.$data);

        // 属性代理
        Object.keys(this.$data).forEach(key => {
            console.log(key);
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get() {
                    console.log(this.$data[key], key);
                    return this.$data[key];
                },
                set(newValue) {
                    this.$data[key] = newValue;
                }
            });
        });


        // 调用模板编译的函数
        Compile(options.el, this);
    }

    
}

/**
 * @desc: 定义一个数据劫持的方法
 * @param {*}
 * @return {*}
 */
function Observe(obj) {
    // 这是递归的终止条件
    if (!obj || typeof obj !== 'object') return;
    const dep = new Dep();


    // 通过 Object.defineProperty(obj) 获取到当前 obj 上的每一个属性
    Object.keys(obj).forEach((key) => {
        // 当前被循环的 key 所对应属性值
        let value = obj[key];
        // 把 value 子节点，进行递归
        Observe(value);
        // 需要为当前的 key 所对应的属性，添加 getter 和 setter
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                console.log(`有人获取了 ${key} 的值`);
                // 只要执行了下面这一行，那么刚才 new 的 watcher 实例
                // 就被放到了 dep.subs 这个数组中了
                Dep.target && dep.addSub(Dep.target);
                return value;
            },
            set(newValue) {
                value = newValue;
                Observe(value);
                dep.notify();
            }
        });
    });
}


/**
 * @desc: 对 HTML 结构进行模板编译的方法
 * @param {*}
 * @return {*}
 */
function Compile(el, vm) {
    // 获取 el 对应的 DOM 元素
    vm.$el = document.querySelector(el);

    // 创建文档碎片，提高 DOM 操作的性能
    const fragment = document.createDocumentFragment();


    while (childNode = vm.$el.firstChild) {
        fragment.appendChild(childNode);
    }


    // 进行模板编译
    replace(fragment);


    vm.$el.appendChild(fragment);

    /**
     * @desc: 负责对 DOM 模板进行编译的方法
     * @param {*}
     * @return {*}
     */    
    function replace(node) {
        // 定义匹配插值表达式的正则
        const regMustache = /\{\{\s*(\S+)\s*\}\}/;

        // 证明当前的 node 节点是一个文本子节点，需要进行正则的替换
        if (node.nodeType === 3) {
            // 注意：文本子节点，也是一个 DOM 对象，如果要获取文本子节点的字符串内容，需要调用 textContent 属性获取
            const text = node.textContent;
            // 进行字符串的正则匹配与提取
            const execResult = regMustache.exec(text);
            console.log(execResult, 'execResult');
            if (execResult) {
                const value = execResult[1].split('.').reduce((newObj, k) => newObj[k], vm);
                node.textContent = text.replace(regMustache, value);
                // 在这个时候，创建 watcher 类的实例
                new Watcher(vm, execResult[1], newValue => {
                    node.textContent = text.replace(regMustache, newValue);
                });
            }
            // 终止递归的条件
            return;
        }

        // 判断当前的 node 节点是否为 input 输入框
        if (node.nodeType === 1 && node.tagName.toUpperCase() === 'INPUT') {
            // 得到当前元素的所有属性节点
            const attrs = Array.from(node.attributes);
            const findResult = attrs.find(x => x.name === 'v-model');
            if (findResult) {
                // 获取到当前的 v-model 属性的值   v-model="name"    v-model="info.a"
                const expStr = findResult.value;
                const value = expStr.split('.').reduce((newObj, k) => newObj[k], vm);
                node.value = value;

                // 创建 watcher 实例
                new Watcher(vm, expStr, (newValue) => {
                    node.value = newValue;
                });

                // 监听文本框的 input 输入事件，拿到文本框最新的值，把最新的值，更新到 vm 上即可
                node.addEventListener('input', (e) => {
                    const keyArr = expStr.split('.');
                    const obj = keyArr.slice(0, keyArr.length - 1).reduce((newObj, k) => newObj[k], vm);
                    obj[keyArr[keyArr.length - 1]] = e.target.value;
                });
            }
        }

        // 证明不是文本节点，可能是一个 DOM 元素，需要进行递归处理
        node.childNodes.forEach(child => replace(child));
    }
}

// 依赖收集的类 / 收集 watcher 订阅者的类
class Dep {
    constructor() {
        // 今后，所有的 watcher 都要存到这个数组中
        this.subs = [];
    }

    // 向 subs 数组中，添加 watcher 的方法
    addSub(watcher) {
        this.subs.push(watcher);
    }

    // 负责通知每个 watcher 的方法
    notify() {
        this.subs.forEach(watcher => watcher.update());
    }
}


// 订阅者的类
class Watcher {
    // cb 回调函数中，记录着当前 watcher 如何更新自己的文本内容
    // 但是，只知道如何更新自己还不行，还必须拿到最新的数据
    // 因此，还需要 new Watcher 期间，把 vm 也传递进来（因为 vm 中保存着最新的数据）
    // 除此之外，还需要知道，在 vm 身上众多的数据中，那个数据，才是当前自己所需要的数据，
    // 因此，必须在 new Watcher 期间，指定 Watcher 对应的数据的名字
    constructor(vm, key, cb) {
        this.vm = vm;
        this.key = key;


        // ↓↓↓↓↓↓ 下面三行代码，负责把创建的 watcher 实例存到 Dep 实例的 subs 数组中 ↓↓↓↓↓↓
        this.cb = cb;
        Dep.target = this;
        key.split('.').reduce((newObj, k) => newObj[k], vm);
        Dep.target = null;
    }


    // watcher 的实例，需要有 update 函数，从而让发布者能够通知我们进行更新！
    update() {
        const value = this.key.split('.').reduce((newObj, k) => newObj[k], this.vm);
        this.cb(value);
    }
}