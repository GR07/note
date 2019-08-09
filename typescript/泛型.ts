/**
 * 泛型：指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型。
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