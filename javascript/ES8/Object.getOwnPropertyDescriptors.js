/**
 * Object.getOwnPropertyDescriptors()函数用来获取一个对象的所有自身属性的描述符，如果没有任何自身属性，则返回空对象。
 */
const obj2 = {
	name: 'Jine',
	get age() { return '18' }
};
Object.getOwnPropertyDescriptors(obj2)
// {
//   age: {
//     configurable: true,
//     enumerable: true,
//     get: function age(){}, //the getter function
//     set: undefined
//   },
//   name: {
//     configurable: true,
//     enumerable: true,
//		value:"Jine",
//		writable:true
//   }
// }
