/**
 * 首先entries()的作用是返回一个对象自身可枚举属性的键值对数组
 * 
 * fromEntries() 是 entries() 的反转 通过键值对数组 返回一个新对象
 */



// 将 Array 转化为 Object:
const arr = [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ];
const obj = Object.fromEntries(arr);
console.log(obj); // { 0: "a", 1: "b", 2: "c" }



 
// 将 Map 转化为 Object:
const map = new Map([ ['foo', 'bar'], ['baz', 42] ]);
const obj = Object.fromEntries(map);
console.log(obj); // { foo: "bar", baz: 42 }
