// let isDone: boolean = false;
// // ES5：var isDone = false;

// let count: number = 10;
// // ES5：var count = 10;

// let name1: string = 'Semliker';
// // ES5：var name1 = 'Semlinker';

// let list1: number[] = [1, 2, 3];
// // ES5：var list1 = [1,2,3];

// let list2: Array<number> = [1, 2, 3]; // Array<number>泛型语法
// // ES5：var list2 = [1,2,3];

// enum Direction {
//     NORTH, //0
//     SOUTH, //1
//     EAST, //2
//     WEST, //3
// }

// enum Direction1 {
//     NORTH = 3, //3
//     SOUTH, //4
//     EAST, //5
//     WEST, //6
// }

// enum Direction2 {
//     NORTH = 'NORTH', //NORTH
//     SOUTH = 'SOUTH', //SOUTH
//     EAST = 'EAST', //EAST
//     WEST = 'WEST', //WEST
// }

// enum Enum1 {
//     A, //0
//     B, //1
//     C = 'C', //'c'
//     D = 'D', //'d'
//     E = 8, //8
//     F, //9
// }

// let value: any;

// value.foo.bar; // OK
// value.trim(); // OK
// value(); // OK
// new value(); // OK
// value[0][1]; // OK

// let value1: unknown;

// value = true; // OK
// value = 42; // OK
// value = 'Hello World'; // OK
// value = []; // OK
// value = {}; // OK
// value = Math.random; // OK
// value = null; // OK
// value = undefined; // OK
// value = new TypeError(); // OK

// let value2: unknown;

// let value3: unknown = value; // OK
// let value4: any = value; // OK
// let value5: boolean = value; // Error
// let value6: number = value; // Error
// let value7: string = value; // Error
// let value8: object = value; // Error
// let value9: any[] = value; // Error
// let value10: Function = value; // Error

// let tupleType: [string, boolean];
// tupleType = ['Semlinker', true];

// // 声明函数返回值为void
// function warnUser(): void {
//     console.log('This is my warning message');
// }

// let u: undefined = undefined;
// let n: null = null;

/* 
    function run():number{
        return 10
    }
    var fun = function():number{
        return 10
    }


    functon fun1(name: string, age?: number): string {
        if (age) {
            return `$(name) -- ${age}`
        } else {
            return `${name} -- 保密`
        }
    }

    // 可选参数，必须配置在参数的最后面。

*/

// ts中实现继承
// class Person {
//     name: string;
//     constructor(name: string) {
//         this.name = name;
//     }
//     run(): string {
//         return this.name
//     }
// }
// class Web extends Person {
//     constructor(name: string) {
//         super(name)
//     }
// }
// let w = new Web('lisi')
// console.log( w.run())

/* 
    联系 ts(es6)中的继承
*/
// class Person {
//     name: string;
//     constructor(name: string) {
//         this.name = name;
//     }
//     run(): void {
//         console.log(this.name + '在工作')
//     }
// }
// class Web extends Person {
//     constructor(name: string) {
//         super(name)
//     }
// }
// let w = new Web('王五')
// console.log(w.name)
// w.run()
/* 
    public 公共类型 类里面，子类和外部都可以访问
    protected 保护类型 类里面，子类可以访问，外部无法访问
    private 私有类型 类里面可以访问，子类和外部均无法访问

    属性不加修饰符 默认是public
*/
// class Person {
//     private name: string;
//     constructor(name: string) {
//         this.name = name;
//     }
//     run(): string {
//         return this.name
//     }
// }
// class Web extends Person {
//     constructor(name: string) {
//         super(name)
//     }
//     work(): string {
//         return this.name
//     }
// }
// let w = new Web('李四');

// console.log(w.run(), w.work(), w.name)// 类里面 子类  类外部


// 静态方法 静态属性

// es5 里面的静态属性和静态方法
// function Person(name) {
//     this.name = name;
//     this.run1 = function () {
        
//     }
// }
// Person.age = '20';//静态属性
// Person.run2 = function () {
    // 静态方法
// }
// let p = new Person('小明')
// p.age;
// Person.age;//静态属性调用
// Person.run2()//静态方法调用

// ts中的静态方法 和 静态属性
// class Person {
//     name: any;
//     static age: any = 20;
//     constructor(name: any) {
//         this.name = name;
//     }
//     run(): void {// 实例方法
//         alert(this.name)
//     }
//     work(): void {
//         alert(this.name + '在工作')
//     }
//     static prient(): void {//静态方法  里面无法直接调用类里面的属性   需要调用类里面的静态属性
//         alert('prient方法' + Person.age)
//     }
// }
// let p = new Person('张三')
// console.log(p.name)
// // p.run()
// // p.work()
// Person.prient()//静态方法
// console.log(Person.age )//静态属性

// 多态： 父类定义一个方法不去实现，让继承它的子类去实现，每一个子类都有不同的表现
// 多态属于继承
// class  Animal {
//     name: any;
//     constructor(name: any) {
//         this.name = name;
//     }
//     eat(): void{// 具体吃什么  不知道， 具体吃什么？继承它的子类去实现，每一个子类都有不同的表现
//         console.log('吃的方法')
//     }
// }
// class Dog extends Animal {
//     constructor(name: any) {
//         super(name)
//     }
//     eta(): void {
//         alert('小狗吃  狗粮')
//     }
// }
// class Cat extends Animal {
//     constructor(name: any) {
//         super(name)
//     }
//     eat(): any {
//         alert('猫咪吃猫粮')
//     }
// }


// typescript 中的抽象类，它是提供其他类继承的基类，不能直接实例化
// 用 abstract 关键字 定义抽象类和抽象方法，抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。
// abstract 抽象方法只能放在抽象类中
// 抽象类和抽象方法用来定义标准。  标准？  ：Animal这个类要求它的子类必须包含eat方法
// 标准：

// abstract class Animal {
//     name: any;
//     constructor(name: any) {
//         this.name = name
//     }
//     abstract eat(): any;// 抽象类的子类必须实现抽象类里面的抽象方法
// }
// // let a = new Animal('aa')// 错误，抽象类不能实例化
// class Dog extends Animal {
//     name: any
//     constructor(name: any) {
//         super(name)
//     }
//     eat(): any {
//         console.log(this.name + '小狗吃东西')
//     }
// }
// let d = new Dog('小狗')
// d.eat()
// class Cat extends Animal {
//     name: any
//     constructor(name: any) {
//         super(name)
//     }
//     eat(): any {
//         console.log(this.name + '小猫吃东西')
//     }
// }
// let c = new Cat('小猫')
// c.eat()

/* 
    5、typescropt 中的接口

    .1 属性类接口
    .2 函数类接口
    .3 可索引接口
    .4 类类型接口
    .5 接口扩展
*/

/* 
    接口的作用：在面向对象变成中，接口是一种规范的定义，它定义了行为和动作的规范，在程序设计里面，接口起到一种限制和规范的作用。接口定义了某一批类所需要遵守的规范，接口不关心这些类的内部状态数据，也不关心这些类里方法的实现细节，它只规定这批类里必须提供某些方法，提供这些方法的类就可以满足实际需要。typescript中的接口类似于java，同时还增加了更灵活的接口类型，包括属性，函数，可索引和类等。
*/

// 5.1 属性类接口    对json的约束

// ts 中定义方法
/* 
function prientLabel(): void {
    console.log('prientLabel')
}
prientLabel()
*/

/* 
    ts中定义方法传入参数
*/

// 传入对象的约束   属性接口
// interface FullName {
//     fName: string;
//     sName: string;
// }

// function getNma(name: FullName) {
//     console.log(name.fName + '--' + name.sName)
// }
// let obj = {// 传入的参数必须包含 fName和sName
//     age: 20,
//     fName: '张',
//     sName: '三'
// }
// getNma(obj)

// 接口 可选属性
// interface FullName {
//     fname: string;
//     sname?: string;
// }
// function getname(name: FullName) {
//     console.log(name, 'name')
// }
// getname({
//     fname: '1',
// })

// 函数类型接口： 对方法传入的参数  以及返回值进行约束

// interface encrypt {
//     (key: string, name: string): string;
// }
// let md5:encrypt = function (key: string, name: string): string {
//     return key + '---' + name
// }
// console.log(md5('name', '张三'))

// 类类型接口： 对类的约束；和抽象类抽象方法有点相似
// interface Animal {
//     name: any;
//     eat(str: any): void;
// }
// class Dog implements Animal {
//     name: any;
//     constructor(name: any) {
//         this.name = name;
//     }
//     eat() {
//         console.log(this.name + '吃狗粮')
//     }
// }
// let d = new Dog('小黑');
// d.eat()
// class Cat implements Animal {
//     name: any;
//     constructor(name: any) {
//         this.name = name;
//     }
//     eat(str: any) {
//         console.log(this.name + '吃' + str)
//     }
// }
// let c = new Cat('小花')
// c.eat('猫粮')

// 接口拓展：接口可以继承接口
// interface Animal {
//     eat(): void;
// }
// interface Person extends Animal {
//     work(): void;
// }
// class Web implements Person {
//     name: any;
//     constructor(name: any) {
//         this.name = name;
//     }
//     eat() {
//         console.log(this.name + '吃东西')
//     }
//     work() {
//         console.log(this.name + '在工作')
//     }
//     run() {
//         console.log(this.name + '在跑步')
//     }
// }
// let w = new Web('张三')
// w.eat();
// w.work();
// w.run();
// console.log(w.name)

// 接口的拓展 另外一个高级的用法
// interface Animal {
//     eat(): void;
// }
// interface Person extends Animal {
//     work(): void;
// }
// class Programmer {
//     name: any;
//     constructor(name: any) {
//         this.name = name;
//     }
//     coding() {
//         console.log(this.name + '在写代码')
//     }
// }
// class Web extends Programmer implements Person {
//     constructor(name: any) {
//         super(name)
//     }
//     eat() {
//         console.log(this.name + '吃东西')
//     }
//     work() {
//         console.log(this.name + '在工作')
//     }
//     run() {
//         console.log(this.name + '在跑步')
//     }
// }
// let w = new Web('李四')
// w.eat();
// w.work();
// w.run();
// w.coding()
// console.log(w.name)

/* 
    6、 typescript中的泛型

        6.1 泛型的定义
        6.2 泛型函数
        6.3 泛型类
        6.4 泛型接口
*/

/* 
    泛型： 软件工程中，我们不仅要创建一致的定义良好的API，同时也要考虑可重用性。组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统为你提供了十分灵活的功能。

    在像C#和java这样的语言中，可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。这样用户就可以用自己的数据类型来使用组件。

    通俗理解：泛型就是解决类  接口 方法的复用性、以及对不特定数据类型的支持。
*/

// 泛型：可以支持不特定的数据类型   要求：传入的参数和返回的参数一致

// T 表示泛型，具体什么类型是调用这个方法的时候决定的

// 泛型函数

// function getData<T>(value: T): T {
//     return value
// }
// getData<number>(1123);
// getData<string>('啦啦啦')

//  类的泛型
// class MinClass<T> {
//     public list: T[] = [];
//     add(num: T) {
//         this.list.push(num)
//     }
//     min(): T {
//         let minNum = this.list[0]
//         for (let i = 0; i < this.list.length; i++) {
//             (minNum>this.list[i]) && (minNum = this.list[i])
//         }
//         return minNum
//     }
// }
// let m = new MinClass<number>()
// m.add(1)
// m.add(-20)
// m.add(20)
// m.add(23)
// console.log(m.min())

// 函数类型接口
// interface ConfigFn{
//     (v1: string, v2: string): string
// }
// let setData: ConfigFn = function (v1: string, v2: string): string {
//     return v1 + v2
// }
// setData('name', '张三')
// setData(123,'zhangsan')//错误的
// 泛型接口
// interface ConfigFn {
//     <T>(v: T): T
// }
// let getData: ConfigFn = function<T>(v: T): T {
//     return v
// }
// getData('张三')
// getData(1234)//错误的
// interface ConfigFn<T> {
//     (v: T): T
// }
// function getData<T>(v: T): T {
//     return v
// }
// let myGetData: ConfigFn<string> = getData
// myGetData('20')
// myGetData(20)//错误的

/* 
    练习
*/
// 函数类型接口
// interface ConfigFn {
//     (v1: any, v2: any): any
// }
// let getData: ConfigFn = function (v1: any, v2: any): any {
//     return v1 + v2
// }
// 泛型接口 - 第一种写法
// interface ConfigFn {
//     <T>(v: T): T
// }
// let getData: ConfigFn = function<T> (v: T): T {
//     return v
// }
// getData<string>('12')
// 泛型接口 - 第二种写法
// interface ConfigFn<T> {
//     (v: T): T
// }
// function getData<T>(v: T): T {
//     return v
// }
// let myGetData: ConfigFn<string> = getData;



/* 
    定义一个 User 类，这个类的作用映射数据库字段
    然后定义一个 MysqlDb 的类，这个类用于操作数据库
    然后把 User 类作为参数传入到 MysqlDb 中
*/

// 把类作为参数来约束传入的数据类型
// class User {
//     username: string | undefined;
//     password: string | undefined;
// }

// class MysqlDb {
//     add(user: User): Boolean {
//         console.log(user, 'user')
//         return true
//     }
// }

// let u = new User();
// u.username = '张三';
// u.password = '123456';

// let Db = new MysqlDb();
// Db.add(u)


// // 操作数据库的泛型类
// class MysqlDb<T> {
//     add(info: T): Boolean {
//         console.log(info, 'info')
//         return true
//     }
//     update(info: T, id: number): Boolean {
//         console.log(info, id)
//         return true
//     }
// }

// // 想给 User 表增加数据
// class User {
//     username: string | undefined;
//     password: string | undefined;
// }

// let u = new User();
// u.username = '张三';
// u.password = '123456';

// let Db = new MysqlDb<User>();
// Db.add(u)

// // 想给 ArticleCate 类 和数据库进行映射
// class ArticleCate {
//     title: string | undefined;
//     desc: string | undefined;
//     status: number | undefined;
//     constructor(params: {
//         title: string | undefined;
//         desc: string | undefined;
//         status?: number | undefined;
//     }) {
//         this.title = params.title;
//         this.desc = params.desc;
//         this.status = params.status;
//     }
// }

// // 增加操作
// // let a = new ArticleCate({
// //     title: '分类',
// //     desc: '111'
// // })

// // let DbA = new MysqlDb<ArticleCate>();
// // DbA.add(a)

// // 更新操作
// let a = new ArticleCate({
//     title: '分类',
//     desc: '111'
// })
// a.status = 0;

// let DbA = new MysqlDb<ArticleCate>();
// DbA.update(a, 20)



/* 
    功能： 定义一个操作数据库的库  支持 Mysql Mssql MongoDb
    要求1： Mysql Mssql MongoDb 功能一样 都有 add update delete get
    注意： 约束统一的规范、以及代码重用
    解决方案： 需要约束规范所以要定义接口，需要代码重用所以用到泛型
        1、 接口： 在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作的规范；
        2、 泛型： 通俗理解： 就是解决 类、接口、方法的复用性
*/

// interface DBI<T> {
//     add(info: T): Boolean;
//     update(info: T, id: number): Boolean;
//     delete(id: number): Boolean;
//     get(id: number): any[];
// }

// // 定义一个操作 Mysql 数据库的类   注意： 要实现泛型接口 这个类也应该是一个泛型

// class MysqlDb<T> implements DBI<T> {
//     add(info: T): Boolean {
//         console.log(info, 'info')
//         return true
//     }
//     update(info: T, id: number): Boolean {
//         throw new Error("Method not implemented.");
//     }
//     delete(id: number): Boolean {
//         throw new Error("Method not implemented.");
//     }
//     get(id: number): any[] {
//         throw new Error("Method not implemented.");
//     }
// }

// // 定义一个 Mssql 数据库的类   注意： 要实现泛型接口 这个类也应该是一个泛型

// class MssqlDb<T> implements DBI<T> {
//     constructor() {
//         console.log('数据库建立链接')
//     }
//     add(info: T): Boolean {
//         console.log(info, 'info')
//         return true
//     }
//     update(info: T, id: number): Boolean {
//         throw new Error("Method not implemented.");
//     }
//     delete(id: number): Boolean {
//         throw new Error("Method not implemented.");
//     }
//     get(id: number): any[] {
//         let list = [
//             {
//                 title: 'xxx',
//                 desc: 'xxxxxx'
//             },
//             {
//                 title: 'xxx',
//                 desc: 'xxxxxx'
//             },
//         ]
//         return list
//     }
// }

// // 操作用户比爱哦   定义一个 User 类和数据表做映射
// // class User {
// //     username: string | undefined;
// //     password: string | undefined;
// // }

// // let u = new User()
// // u.username = '张三111'
// // u.password = '123456'

// // let oMysql = new MysqlDb<User>()
// // oMysql.add(u)


// class User {
//     username: string | undefined;
//     password: string | undefined;
// }

// let u = new User()
// u.username = '张三222'
// u.password = '123456'

// let oMssql = new MssqlDb<User>()
// oMssql.add(u)

// // 获取 User 表 ID = 4 的数据
// let data = oMssql.get(1)
// console.log(data, 'data')
