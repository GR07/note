TypeScript是微软出的编程语言

TypeScript 是 JavaScript 的超集，最终会被编译成 JavaScript

他们之间就像 less sass stylus 和 css 之间的关系一样，最终被编译成css

支持：可以运行在node deno 任何支持es3+的js引擎中，在ts中也可以写js向下兼容

作用：TypeScript主要作用是在 js 的基础上增加类型检查，提高代码健壮性，后期容易维护。


使用：

1.全局安装 npm install -g typescript
2.新建一个后缀 .ts 文件
3.运行 tsc 文件名.ts 即可

```JavaScript
// hello.ts
// 这里可以写js代码
function log(msg) {
    console.log(`hello${msg}`)
}
log('ts')
```
tsc hello.ts

运行后目录下会生成一个同名js文件，内容就是ts代码编译后的js


类型注解：
```JavaScript
// hello.ts
function log(msg: string) {
    console.log(`hello${msg}`)
}
log('ts') // 没问题
log(123) // tsc 运行后 会在命令行报错 虽然也会转换成js　但是结果是不可预测的
```

接口：
```JavaScript
interface Box {
    name: string,
    size: Number,
    desc: string 
}
function logBox(box: Box) {
    console.log(`箱子名称:${box.name}, 箱子大小:${box.size}, 箱子描述:${box.desc}`)
}
let paperBox = {
    name: '纸箱',
    size: 100,
    desc: '我是一个纸箱'
}
logBox(paperBox)
```


类型：

```javaScript
// 字符串
let myName1: string = 'Tom'; // ok
let myName2: string = 5; // 报错
let myName2: string = false; // 报错


// 数字
let decLiteral: number = 6;


// 布尔
let isDone: boolean = false;
let isDone: boolean = true;


// Any 允许被赋值为任意类型。当你不知道是什么类型的时候就给它赋 any
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7;


// void 表示没有任何类型。 常用于函数没有返回值。
function alertSr(): void {
  alert('hello ts');
}
// void 只能将它赋值为 undefined 和 null。
let unusable: void = undefined;


// null、undefined 是所有数据类型的子类型，也就是赋值给所有的类型都可以。
// 比如初始化变量，只知道类型不知道具体值的时候。
let str: string = null
let str1: string = undefined


// never 代表从不会出现的值到达不了终点，比如没有返回值的函数
function error(msg: string): never {
    throw new Error(msg);
}


// Object：表示除 number string boolean symbol 之外的类型
// 可以理解为范围类型的限制
let obj1: object = {name: 'gg', age: 18} // ok
let obj2: object = [1, 2, 3] // ok
let obj3: object = 123 // 报错
let obj4: object = 'abc' // 报错
```

数组：

数组的项中不允许出现其他的类型，数组一些方法的参数也会限制。

定义数组类型 3 种：
```javascript
// 第一种
let a: number[] = [1, 1, 2, 3, 5];
a.push(8); // 只能 push 指定类型

// 第二种 也叫数组泛型
let b: Array<number> = [1, 1, 2, 3, 5];

// 第三种 利用 any
let c: any[] = ['guor', 18, { website: 'http://home.com' }];
```

元组：

元组类型 是 数组的升级版

元组允许每一项类型不必相同，但数量和类型必须已知
```javascript
// 里面的数据类型和数量必须是确定的不然报错。
let abc: [string, number, number] = ['guor', 25, 34];

// 只能赋值或访问一个已知索引的元素。
let guor: [string, number, number];
guor[0] = 'guor';
guor[2] = 18;
guor[0].slice(1);
guor[1].toFixed(2);

// 直接对元组初始化 或者 赋值 时，必须提供所有类型项
let guor: [string, number];
guor = ['guor', 25];

// 如果添加越界的元素时，会被限制为联合类型。
let guor: [string, number];
guor = ['guor', 25];
guor.push(18) // ok
guor.push(false) // 报错
```


枚举：
对js标准数据类型的补充，它的存在就是为了 把数字转换为具有语义的单词。
```javascript
// 比如：支付状态：Paystate: 1（成功）2（未支付）3（取消）用枚举表示
enum Paystate {ok, err, no}


// 可以手动赋值 1、2、3，如果没有手动赋值，就从0开始递增1，类似数组索引
// 赋值类型必须 number、string
enum Paystate {ok = 1, err = 2, no = 3};

// 上面tsc编译成js
var Paystate;
(function (Paystate) {
    Paystate[Paystate["ok"] = 1] = "ok";
    Paystate[Paystate["err"] = 2] = "err";
    Paystate[Paystate["no"] = 3] = "no";
})(Paystate || (Paystate = {}));


// 同理也可以拿到它的字符
let payString: string = Paystate[2] // 'err'


// 常数枚举：常数枚举与普通枚举的区别是，它会在编译阶段会被删除。
const enum Directions {
  Up,
  Down,
  Left,
  Right
}
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
console.log(directions) // [0, 1, 2, 3]

```


类型断言：
类型断言有两种写法：“尖括号”语法、as语法。
跳过ts的类型检查，告诉程序 我比你清楚 变量或函数 返回的 是什么类型。
```javascript
let someValue: any = "这是字符串";
let strLength: number = (someValue as string).length;
// let strLength: number = (<string>someValue).length;

// 举个例子
let abc: any = 'asdzxc'; // ok
let abc: any = 123; // err
let str: string = abc.substr(0, 2)

// 如果使用类型断言
let str: string = (abc as string).substr(0, 2) // ok
let str: string = (abc as number).substr(0, 2) // err
```