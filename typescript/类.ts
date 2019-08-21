/**
 * ES6 中的类
 */
class Animal {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    return `My name is ${this.name}`;
  }
}

let a = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack


/**
 * ES6 中类的继承
 */
class Cat extends Animal {
  constructor(name) {
    super(name); // 调用父类的 constructor(name)
    console.log(this.name);
  }
  sayHi() {
    return 'Meow, ' + super.sayHi(); // 调用父类的 sayHi()
  }
}

let c = new Cat('Tom'); // Tom
console.log(c.sayHi()); // Meow, My name is Tom



/**
 * ES7 中的类
 * 可以把构造函数中的 this.xx = xx 简化为 直接在类里面定义 xx = xx
 */
class Animal {
  name = 'Jack';
  constructor() {
    // ...
  }
}

let a = new Animal();
console.log(a.name); // Jack



/**
 * 静态属性 / 静态方法
 * 它们不需要实例化，而是直接通过类来调用。
 */
class Animal {
  static num = 42;

  constructor() {
    // ...
  }
  static isAnimal(a) {
    return a instanceof Animal;
  }
}



/**
 * TypeScript 中类的用法
 *
 *
 * 在类的基础上增加 三种访问修饰符：
 *
 * public 修饰的属性或方法是公有的，可以在任何地方被访问到
 * private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
 * protected 虽然是私有的但是可以在子类中访问
 */


/**
 * 抽象类:
 *
 * 1.抽象类是不允许被实例化
 * 2.抽象类中的抽象方法必须被子类实现
 */



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