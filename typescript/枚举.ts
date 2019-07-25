/**
 * 枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。
 * 成员默认会被赋值为从 0 开始递增的数字 类似数组索引。
 * 递增步长始终为 1
 * 如果重复则后面覆盖前面
 */
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};



/**
 * 手动赋值
 */
enum Days {a = 7, b = 1, c, d, e, f, g};

console.log(Days["a"] === 7); // true
console.log(Days["b"] === 1); // true
console.log(Days["c"] === 2); // true
console.log(Days["g"] === 6); // true



/**
 * 计算所得项
 */
// 计算所得项后面的必须是手动赋值的项，否则就会因为无法获得初始值而报错：
enum Color {Red, Green, Blue = "blue".length};



/**
 * 常数枚举：常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。
 */
const enum Directions {
  Up,
  Down,
  Left,
  Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];



/**
 * 外部枚举：只会用于编译时的检查，编译结果中会被删除。
 * 外部枚举与声明语句一样，常出现在声明文件中。
 */
declare const enum a {
  Up,
  Down,
  Left,
  Right
}

let abc = [a.Up, a.Down, a.Left, a.Right];