/**
 * 使用接口（Interfaces）来定义对象的类型。
 *
 * 我的理解：新创建的对象必须以接口的规则来定义。
 */



/**
 * a 的形状必须和接口 Person 一致。
 * 属性数量也必须一致
 */
interface Person {
  name: string;
  age: number;
}
let a: Person = {
  name: 'Tom',
  age: 25
};



/**
 * 可选属性 该属性可以不存在
 */
interface Optional {
  name: string;
  age?: number;
}
let b: Optional = {
  name: 'jim'
};



/**
 * 任意属性 接口允许有任意的属性
 * 注意：一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
 */
interface AtWill {
  name: string;
  age?: number;
  [propName: string]: any; // name和age的类型都是any的子集
}
let c: AtWill = {
  name: 'Tom',
  gender: 'male'
};



/**
 * 只读属性 只可以在创建对象的时候给这个属性赋值
 */
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