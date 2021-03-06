/**
 * flat()方法可以数组降维，返回一个新数组。
 * 
 * 还可以利用flat()方法的特性来去除数组的空项
 * 
 */

// 默认降维一级
const arr1 = [1, 2, [3, 4]];
arr1.flat(); 
// [1, 2, 3, 4]

const arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]

// 指定降维级别
const arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]


//使用 Infinity 作为深度，展开任意深度的嵌套数组
arr3.flat(Infinity); 
// [1, 2, 3, 4, 5, 6]



// 还可以利用flat()方法的特性来去除数组的空项
var arr4 = [1, 2, , 4, 5];
arr4.flat();
// [1, 2, 4, 5]





/**
 * flatMap()方法 相当于先执行 map()，然后对返回值执行flat()。返回一个新数组。
 * 
 * flatMap()只能展开一层数组。
 */


// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
[2, 3, 4].flatMap((x) => [x, x * 2]) // [2, 4, 3, 6, 4, 8]


const arr1 = [1, 2, 3, 4];

arr1.map(x => [x * 2]); 
// [[2], [4], [6], [8]]

arr1.flatMap(x => [x * 2]);
// [2, 4, 6, 8]

