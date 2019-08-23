/**
 * 枚举（Enum）：
 * 它的存在就是为了 把数字转换为具有语义的单词。
 * 比如：支付状态：pay_state: 1（成功）2（未支付）3（取消），用枚举表示：enum pay_state {ok, err, no}
 *
 * 成员默认会被赋值为从 0 开始递增的数字，递增步长始终为 1，类似数组索引。
 *
 * 如果重复则后面覆盖前面
 */
// 赋值 1、2、3 是手动赋值，如果没有手动赋值，就从0开始递增1。

// 赋值不可以为非 number、string
enum pay_state {ok = 1, err = 2, no = 3};

let abc: pay_state = pay_state.ok;

console.log(abc)  // 1




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

let efg = [a.Up, a.Down, a.Left, a.Right];