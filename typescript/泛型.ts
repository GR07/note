/**
 * 泛型：就是考虑组件的重用性，不止兼容现在的类型，也要考虑到未来的类型。
 * 
 * 指在定义的时候，不指定具体的类型，而在使用的时候再指定类型。
 * 
 * 解决：类、接口、方法的复用性，以及对不特定数据类型的支持。
 */




/**
 * 用any可以达到传入不特定类型输出不特定类型，但是也等于放弃了类型检查。
 */
function f(value: any):any {
  return value;
}




/**
 * 使用泛型：期望的是   输出的类型 = 传入的类型。
 * 
 * 调用的时候，最好也要指定出具体类型（更规范一些）。
 */

function d<T>(value: T):T {
  return value;
}
d<number>(123);
d<string>('abs');


function c<T>(value: T[]):T[] {
  console.log(value.length)
  return value;
}
c<number>([1, 2, 3]);




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
 * 泛型类：使用泛型的类
 * 
 * 类有两部分：静态部分、实例部分
 * 
 * 泛型只能使用在实例部分
 */
class MinClass<T> {
  zeroValue: T
  add(num: T): T {
    return num
  }
}
const m = new MinClass<number>() // 指定类的T类型是 number
m.add(1) // 只能传入number类型



/**
 * 通过泛型继承接口 来约束传值
 */
interface Len {
  length: number
}
function getNum<T extends Len>(num: T): T {
  console.log(num.length)
  return num
}
getNum('asd') // 传入的值必须有length属性



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