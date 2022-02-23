# Object.getOwnPropertyDescriptors() 

方法用来获取一个对象的所有自身属性的描述符。如果没有任何自身属性，则返回空对象。


```js
const obj = {
  name: "jimmy",
  age: 18,
};
const desc = Object.getOwnPropertyDescriptors(obj);
console.log(desc);  
// 打印结果
{
  name: {
    value: 'jimmy',
    writable: true,
    enumerable: true,
    configurable: true
  },
  age: { 
		value: 18, 
		writable: true,
		enumerable: true, 
		configurable: true 
  }
}
```
# 打印结果中的 具体属性

- value表示当前对象的默认值

- writable表示对象属性是否可以修改

- enumerable表示当前这个属性是否可以出现在对象的枚举属性中

- configurable表示当前对象的属性能否用delete删除


# 如何修改

那这些对象的属性我们怎么设置和修改他们呢，我们可以使用es5的 Object.defineProperty()

```js
const obj = {};
Object.defineProperty(obj, "name", {
  value: "jimmy",
  writable: true,
  configurable: true,
  enumerable: true,
});
Object.defineProperty(obj, "age", {
  value: 34,
  writable: true,
  configurable: true,
  enumerable: true,
});
console.log(obj); // { name: 'jimmy', age: 34 }
```

# 修改例子
```js
// 设置 writable: false和configurable: false,为false时，对象的name对象的值不能改变和不能被删除
const obj = {};
Object.defineProperty(obj, "name", {
  value: "jimmy",
  writable: false,
  configurable: false,
  enumerable: true,
});
console.log(obj); // { name: 'jimmy' }
obj.name = "chimmy";
console.log(obj); // { name: 'jimmy' }
delete obj.name
console.log(obj); // { name: 'jimmy' }
```


```js
// 设置enumerable: false时，表示对象的属性不可被枚举，这时打印对象为空，遍历对象的键也为空。
const obj = {};
Object.defineProperty(obj, "name", {
  value: "jimmy",
  writable: true,
  configurable: true,
  enumerable: false,
});
console.log(obj); // { }
for (let key in obj) {
  console.log(key); // ""
}
```