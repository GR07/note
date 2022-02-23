# Symbol.prototype.description

Symbol 的描述只被存储在内部的 Description ，没有直接对外暴露，我们只有调用 Symbol 的 toString() 时才可以读取这个属性：

```js
const name = Symbol('es')
console.log(name.toString()) // Symbol(es)
console.log(name) // Symbol(es)
console.log(name === 'Symbol(es)') // false
console.log(name.toString() === 'Symbol(es)') // true
```


现在可以通过 description 方法获取 Symbol 的描述:

```js
const name = Symbol('es')
console.log(name.description) // es
name.description = "es2" // 只读属性 并不能修改描述符
console.log(name.description === 'es') // true
// 如果没有描述符 输入undefined
const s2 = Symbol()
console.log(s2.description) // undefined

```
