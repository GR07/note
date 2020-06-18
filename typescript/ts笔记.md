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


// unknown 跟 any 一样可以赋为任意类型，但不可以把 unknown 赋值给其他类型
// unknown 类型只能被赋值给 any 类型和 unknown 类型本身
let value: unknown = '123' // ok
let value: unknown = true // ok

// 编译就会报错 test.ts(3,5): error TS2322: Type 'unknown' is not assignable to type 'string'.
let str: string = value
// 同样也会禁止任何操作 error TS2339: Property 'trim' does not exist on type 'unknown'.
value.trim() // err

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


// never 代表从不会出现的值到达不了终点，比如总是会抛出异常或没有返回值的函数
function error(msg: string): never {
    throw new Error(msg);
}


// type 类型别名 用来给一个类型起个新名字
type EventNames = 'click' | 'scroll' | 'mousemove';
// event 只能取三种字符串中的一种
function handleEvent(event: EventNames) {
  // do something
}


// 举个例子
type Foo = string | number;

function fooType(foo: Foo) {
  if (typeof foo === "string") {
      // do
  } else if (typeof foo === "number") {
      // do
  } else {
    // foo 在这里是 never 
    const check: never = foo;
  }
}


// | 联合类型
let myFavorite: string | number;
myFavorite = 'seven';
myFavorite = 7;


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


函数：
对函数的输入（传值）和输出（返回值）进行约束

```javascript
// ts中的 函数声明
function sum(x: number, y: number): number {
  return x + y;
}
sum(1, 2); // 参数的数量也必须一致

// ts中的 函数表达式
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y;
};

// 箭头函数
let summ = (x: number, y: number): number => {
    return x + y;
}

// 没有返回值：void
function ab(): void {
  console.log(123)
}

// 可选参数： 与接口的可选属性一样，但可选参数位置必须是最后一个参数
function buildName(a: string, b?: string) {
  let yy: string = '';
  yy = `找到了${a}`
  if (b !== void 0) {
      yy += b
  }
  return `${yy}同学`
}

// 参数默认值：
function defaultName(a: string, b: string = 'Cat') {
  // dos
}

// 重载：函数接受不同数量或类型的参数时，作出不同的处理。
// 要优先把精确的定义写在前面。
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}
```


接口：常用于对对象的形状进行描述。
```javascript
// 定义一个接口
interface Person {
  name: string;
  age: number;
}

let dog: Person = {
  name: "dog",
  age: 6,
};

// 可选属性 该属性可以不存在，和可传参数一样。
interface Optional {
  name: string;
  age?: number;
}
let b: Optional = {
  name: 'jim'
};

// 任意属性 除了接口定义的属性外，允许增加任意的属性
interface AtWill {
  name: string;
  [propName: string]: any;
}
let c: AtWill = {
  name: 'Tom',
  gender: 'male'
};

// 只读属性 只可以给属性赋值一次。
interface Read {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}
let d: Read = {
  id: 234,
  name: 'Tom',
  gender: 'male'
};

// 接口 在函数中的应用
interface SearchFunc {
  (a: string, b: string): string;
}
// 使用
let mySearch: SearchFunc = function(a: string, b: string): string {
  return a + b;
};
```


类的类型：
```javascript
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayHi(): string {
    return `My name is ${this.name}`;
  }
}

let a: Animal = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack

// TypeScript 中类的用法 增加了4种修饰符

// public 属性或方法是公有的，实例化后可以被实例访问。

// private 属性或方法是私有的，不能在声明它的类的外部访问，也不能被子类继承。

// protected 虽然是私有的但是可以在子类中访问。

// readonly 只读属性，必须在声明时或构造函数里初始化。


// 增加存取器 get set 作用：可以在访问或改变属性时 拦截做一些事情。

let password = 'github.com/gr07'
class Person2 {
  private _name: string
  constructor(name) {
    this._name = name
  }
  get name() {
    return this._name
  }
  set name(newName) {
    if (password && password === 'github.com/gr07') {
      this._name = newName
    }
  }
}
let p = new Person2('guor')
p.name // guor
p.name = 'sssss'
p.name // sssss
```