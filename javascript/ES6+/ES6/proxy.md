# Proxy

Proxy 这个词的原意是代理，表示由它来“代理”某些操作，可以译为“代理器”。

可以理解成，在目标对象之前架设一层“拦截”，对该对象访问的时候，都必须先通过这层拦截进行过滤和改写。



# 语法

ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。

# 两个参数

## target

表示所要拦截的目标对象

## handler

也是一个对象，用来定制拦截行为。

```js
var proxy = new Proxy(target, handler);
```



Proxy 对象的所有用法，都是下面这种形式，不同的只是 handler 参数的写法。

```js
var obj = new Proxy({}, {
  get: function (target, propKey, receiver) {
    console.log(`getting ${propKey}!`);
    return Reflect.get(target, propKey, receiver);
  },
  set: function (target, propKey, value, receiver) {
    console.log(`setting ${propKey}!`);
    return Reflect.set(target, propKey, value, receiver);
  }
});
```



# 不设置拦截

如果handler没有设置任何拦截，那就等同于直接操作原对象。

```js
// 没有任何拦截效果
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';
target.a // "b"
```



/**
 * 代理 Proxy
 * 
 * 注意这个 Proxy 和 webpack配置跨域的proxy 不是同一个东西。
 * 
 * 可以理解成拦截某个东西，然后执行某个函数操作，再返回函数操作的结果。
 */
