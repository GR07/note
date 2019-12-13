
class Animal {
  // 构造函数，实例化的时候将会被调用，如果不指定，那么会有一个不带参数的默认构造函数.
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
  // toString 是原型对象上的属性
  toString() {
    console.log(`${this.name} 和 ${this.color}`);
  }
}
var animal = new Animal('dog','white');// 实例化Animal
animal.toString();
// hasOwnProperty() 是否是自身的属性
console.log(animal.hasOwnProperty('name')); //true
console.log(animal.hasOwnProperty('toString')); // false
console.log(animal.__proto__.hasOwnProperty('toString')); // true

// 继承 Animal 类
class Cat extends Animal {
  constructor(action) {
    this.action = action;
    // 子类必须要在 constructor 中指定super 函数，否则在新建实例的时候会报错.
    // 如果没有置顶 consructor, 则默认添加带super函数的constructor
    super('cat','white');
  }
  toString() {
    console.log(super.toString()); // 调用父类的 toString 方法
  }
}
var cat = new Cat('catch')
cat.toString(); // Cat 类的 toString
cat.action; // catch
cat.name; // cat
cat.color; // white