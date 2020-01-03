
// Symbol是JavaScript的原始数据类型，一个全新的数据类型，和对象、数字、字符串等完全不一样，它必须通过Symbol()创建。

// 以前对象的key 只能是字符串类型 现在可以是Symbol类型




// 使用Symbol
const name1 = Symbol('sym1'); // Symbol(sym1)



// 所有使用可计算属性名的地方，都能使用Symbol类型。比如在对象中的key。
const name = Symbol('name');
const obj = {
  [name]: "haha"
}
console.log(obj[name]) // haha