/**
 * 类与接口一起用：目的是对类的一部分抽象
 */



/**
 * 类实现接口（implements）：把不同类之间的一些共有的特性提取成接口。
 */
// 接口
interface Alarm {
  alert();
}
// 类
class Door {
}
// SecurityDoor 继承 Door 类 最后通过 implements关键字 实现 Alarm 接口
class SecurityDoor extends Door implements Alarm {
  alert() {
    console.log('SecurityDoor alert');
  }
}

class Car implements Alarm {
  alert() {
    console.log('Car alert');
  }
}



/**
 * 实现多个接口
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