// 面向对象三大特性：封装、继承、多态

// 封装：把属性和方法都封装在一起

// 继承：子类对象可以有父类的方法和属性

// 多态：不同实例调用，返回不同结果

/**
 * 本质上还是通过构造函数创建对象
 */
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
var animal = new Animal('dog', 'white');// 实例化Animal
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
    super('cat', 'white');
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



/**
 * 类声明和函数声明的区别和特点
 * 
 * 1、函数声明可以被提升，类声明不能提升。
 * 
 * 2、类声明中的代码自动强行运行在严格模式下。
 * 
 * 3、类中的所有方法都是不可枚举的，而自定义类型中，可以通过Object.defineProperty()手工指定不可枚举属性。
 * 
 * 4、每个类都有一个[[constructor]]的方法。
 * 
 * 5、只能使用new来调用类的构造函数。
 * 
 * 6、不能在类中修改类名。
 */


/**
 * 静态属性
 * 
 * 方法名或属性名前面加上static关键字，
 * 
 * static修饰的方法不能在实例中访问，只能在类中直接访问。
 */


/**
 * 静态成员继承
 * 
 * 静态成员继承只能通过派生类访问，不能通过派生类的实例访问
 */
class Component {
  constructor([a, b] = props) {
    this.a = a
    this.b = b
  }
  static printSum([a, b] = props) {
    return a + b
  }
}
class T extends Component {
  constructor(props) {
    super(props)
  }
}
console.log(T.printSum([2, 3])) // 5

/**
 * 类方法遮蔽
 *
 * 子类中的方法会覆盖重写重写父类的方法。
 */


/**
 * 内建对象的继承
 * 
 * 就是继承 js的内建对象 比如继承数组
 */

class MyArray extends Array { }
let colors = new MyArray()
colors[0] = "1"
console.log(colors) // [1]



/**
 * new.target
 * 
 * new.target通常表示当前的构造函数名。
 * 
 * 通常我们使用new.target来阻止直接实例化基类
 */

class A {
  constructor() {
    //如果当前的new.target为A类，就抛出异常
    if (new.target === A) {
      throw new Error("error haha")
    }
  }
}
let a = new A()
console.log(a) // error haha