/**
 * ES6 中的类
 */
class Aes6 {
  constructor(name) { // 实例化类的时候，直接触发 constructor
    this.name = name;
  }
  sayHi() {
    return `My name is ${this.name}`;
  }
}

let es6 = new Aes6('Jack');
console.log(es6.sayHi()); // My name is Jack



/**
 * ES6 中类的继承：必须使用 extends 和 super 关键字
 * 
 * super(name)：表示调用父类的 constructor(name),
 * 
 * super(name): name 就是给父类constructor() 传递的参数
 */
class Cat extends Aes6 {
  constructor(name) {
    super(name); // 表示：调用父类的 constructor(name)
  }
  sayHi() {
    // super 就是父类
    return 'Meow, ' + super.sayHi() + this.name; // super.sayHi(): 调用父类的 sayHi()  this.name: 父类的name
  }
}

let c = new Cat('Tom'); // Tom
console.log(c.sayHi()); // Meow, My name is Tom



/**
 * ES7 中的类
 * 可以把构造函数中的 this.xx = xx 简化为 直接在类里面定义 xx = xx
 */
class An {
  name = 'Jack';
  constructor() {
    // ...
  }
}

let b = new An();
console.log(b.name); // Jack



/**
 * 静态属性 / 静态方法
 * 它们不需要实例化，而是直接通过类来调用。
 * 注意：静态方法内 不能访问类中的属性，但是可以访问静态属性
 */
class Animal {
  static num = 42;
  str = 'aaaaa';

  constructor() {
    // ...
  }
  static isAnimal(a) {
    return a instanceof Animal;
  }
  static abc(a) {
    return this.str; // str undefined
  }
}




/**
 * TypeScript 中类的用法 增加了4种修饰符
 *
 *
 * 在类的基础上增加 三种访问修饰符：
 *
 * public 属性或方法是公有的，实例化后可以被实例访问。
 * 
 * private 属性或方法是私有的，不能在声明它的类的外部访问，也不能被子类继承。
 * 
 * protected 虽然是私有的但是可以在子类中访问。
 * 
 * readonly 只读属性，必须在声明时或构造函数里初始化。
 */

// 也增加了简洁写法
class Person {
  constructor(public str: string) {}
}
// 上面等于下面写法
class Person {
  public str: string
  constructor(str: string) {
    this.str = str
  }
}

// 增加存取器 get set      作用：可以在访问或改变属性时 拦截做一些事情。

// 注意：如果类里面只写了 get 没写 set ，那么这个属性就是只读属性（readonly）。
// demo
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



/**
 * 多态：父类定义一个方法不实现，让子类去实现，每个子类都有不同的表现
 */




/**
 * 抽象类: 我理解为多态的延伸
 *
 * 1.抽象类是不允许被实例化（它的存在是为了给子类提供基础方法）
 * 2.抽象类中的抽象方法必须被子类实现（可以不写具体实现）
 * （例如：大佬搭好了框架了标注了一个eat方法，说你们这些人在写页面的时候每个页面中都要有这个方法）
 */
// 使用关键字 abstract
// 抽象方法必须在抽象类中
abstract class Abc {
  name: string;
  constructor (name: string) {
    this.name = name;
  }
  abstract eat ():any;
}
class Def extends Abc {
  constructor (name: any) {
    super(name)
  }
  eat () { // 子类中必须实现 抽象类中的eat（抽象方法）
    console.log(this.name);
  }
}
var aaa = new Def('食物')
aaa.eat();






/**
 * 类的类型:
 *
 * 给类加上 TypeScript 的类型很简单，与接口类似:
 */
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