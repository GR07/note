
// 不常用到 记个笔记理解即可

/**
 * 类与接口一起用：目的是对类的一部分抽象，把不同类之间的一些共有的特性提取成接口。
 */



/**
 * 类实现接口（implements）：实现接口的时候必须有接口中的属性和方法。
 */
// 接口
interface Alarm {
  alert();
}
// 类
class Door {
  name: string;
  constructor (name: string) {
    this.name = name;
  }
}
// SecurityDoor继承Door类, 最后使用 Alarm 接口
class SecurityDoor extends Door implements Alarm {
  constructor (name: string) {
    super(name)
  };
  alert() {// 要实现接口就必须有 接口Alarm里面的 alert()方法
    console.log('SecurityDoor alert');
  }
}

class Dog implements Alarm {
  name: string;
  constructor (name: string) {
    this.name = name;
  }
  alert() {// 必须有 Alarm接口 里面的 alert()方法
    console.log('Car alert');
  }
}



/**
 * 类同时使用多个接口
 */

interface Alarm {
  alert();
}

interface Light {
  lightOn();
  lightOff();
}

class Car implements Alarm, Light {
  alert() {
    console.log('Car alert');
  }
  lightOn() {
    console.log('Car light on');
  }
  lightOff() {
    console.log('Car light off');
  }
}



/**
 * 接口继承接口
 */

interface Alarm {
  alert();
}
// 使用 extends 使 LightableAlarm 继承 Alarm。
interface LightableAlarm extends Alarm {
  lightOn();
  lightOff();
}

// 类使用继承后的接口
class Bar implements LightableAlarm {
  name: string;
  constructor (name: string) {
    this.name = name;
  };
  alert() { // 必须实现
    console.log('Car alert');
  }
  lightOn() { // 必须实现
    console.log('Car light on');
  }
  lightOff() { // 必须实现
    console.log('Car light off');
  }
}
const people = new Bar('李四')




/**
 * 接口继承类
 */

class Point {
  x: number;
  y: number;
}

interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};