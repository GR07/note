/**
 * 泛型：指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型。
 * 解决：类、接口、方法的复用性，以及对不特定数据类型的支持。
 */





/**
 * 用any可以达到传入不特定类型输出不特定类型，但是也等于放弃了类型检查。
 */
function f(value: any):any {
  return value;
}




/**
 * 使用泛型：期望的是   输出的类型 = 传入的类型
 */
function d<T>(value: T):T {
  return value;
}
d<number>(123);
d<string>('abs');





/**
 * 复杂点的
 */
// 指定输出的数组的每一项的 类型 都是 输入value的类型
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
// 调用的时候，指定它具体的类型为 string 也可以省略 让类型推论自动推算。
createArray<string>(3, 'x'); // ['x', 'x', 'x']





/**
 * 多个类型参数
 */
// 输出时候 调换项的同时 调换类型
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}

swap([7, 'seven']); // ['seven', 7]





/**
 * 泛型类
 */
class MinClass<T> {
  public list:T[] = [];
  add(value: T): void {
    this.list.push(value);
  }
  min(): T {
    let minNum = this.list[0];
    for (let i = 0; i < this.list.length; i++) {
      if (minNum > this.list[i]) {
        minNum = this.list[i];
      }
    }
    return minNum;
  }
}
const m = new MinClass<number>() // 实例化时指定类的T类型是 number
m.add(1);
m.add(2);
m.add(3);




/**
 * 类作为参数，约束传入数据类型
 * 缺点：如果传入参数类型不一致时候，就要修改 user: User
 */
class Mysq {
  add (user: User): boolean {
    console.log(user);
    return true;
  }
}
class User {
  use: string | undefined;
  pas: string | undefined;
}
const u = new User();
u.use = 'zhangsan';
u.pas = '123';
const db = new Mysq();
db.add(u);

// class User {
//   use: string | undefined;
//   pas: string | undefined;
// }
// const u = new User();
// u.use = 'zhangsan';
// u.pas = '123';

// 以上也可以写成

// class User {
//   use: string | undefined;
//   pas: string | undefined;
//    constructor (params: {use: string | undefined, pas: string | undefined}) {
//      this.use = params.use;
//      this.pas = params.pas;
//    }
// }
// const u = new User({use: 'zhangsan', pas: '123'});




/**
 * 升级版 类作为参数 使用泛型
 */
class Mysq2<T> {
  add (user: T): boolean {
    console.log(user);
    return true;
  }
}
class User2 {
  use: string | undefined;
  pas: string | undefined;
}
const u2 = new User2();
u2.use = 'zhangsan'; // 也可以在创建类的时候在 constructor 中定义 (上面有示例)
u2.pas = '123'; // 也可以在创建类的时候在 constructor 中定义 (上面有示例)
const db2 = new Mysq2<User2>();
db2.add(u2);



/**
 * 泛型接口
 */
// 定义
interface ConfigFn {
  <T>(value: T): T;
}
// 使用
const getData: ConfigFn = <T>(value: T): T{
  return value;
}
getData<string>('张三');