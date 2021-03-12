# 实现 new

## 思路：

1. 首先是创建一个对象

2. 改变 this 指针

3. 改变对象的 __proto__ 指向 => 构造函数的 prototype

```js
function myNew(func, ...argument) {

  const obj = {};

  func.call(obj, ...argument);

  obj.__proto__ = func.prototype;

  return obj;
}


// 使用
function Puppy(age) {
  this.puppyAge = age;
}

Puppy.prototype.say = function () {
  console.log("汪汪汪");
};

const myPuppy3 = myNew(Puppy, 2);

console.log(myPuppy3.puppyAge); // 2
console.log(myPuppy3.say()); // 汪汪汪
```



# 实现 Object.create()

1. 创建一个构造函数
2. 构造函数的原型对象指向传入对象
3. 为新对象扩展新属性
4. 返回构造函数的实例

```javascript
Object.myCreate = function (obj, properties)  {
  // 创建一个构造函数
  var F = function ()  {}
  // 继承指定父对象
  F.prototype = obj
  // 给新对象扩展新属性
  if (properties) {
     Object.defineProperties(F, properties)
  }
  return new F()
}

Object.myCreate({}, {a: {value: 1}})     // {a: 1}
```
## new Object() / Object.create() 区别：

1. create() 参数（必传）是对象的原型，可以传 null 就是一个干净的空对象。

2. new Object() 对象的原型指向Object.prototype。





# 实现 instanceof

## 思路：

1. 这个方法 返回布尔值 检查对象是否属于某个类的实例

2. 那么只要判断 对象的.__proto__.__proto__.proto__ 属性 是否其中有一环 等于 构造函数的.prototype


```js
function myIns(obj, Func) {

  // 类型判断
  if (!obj || !Func || !obj.__proto__ || !Func.prototype) {
    return false
  }

  // 为了原型链查找
  let curObj = obj

  // 遍历原型链 __proto__ === prototype
  while(curObj) {
    if (curObj.__proto__ === Func.prototype) {
      return true
    }
    // 找下一级层
    curObj = curObj.__proto__
  }

  return false
}


// 使用
function Parent() {}
function Child() {}

Child.prototype.__proto__ = Parent.prototype;

const obj = new Child();
console.log(myIns(obj, Child) );   // true
console.log(myIns(obj, Parent) );   // true
console.log(myIns({}, Parent) );   // false
```



# 实现 jquery

```js
// 创建构造函数
function Base(element) {
  this.element = document.getElementById(element);
  // 实例方法
  this.css = function (type, value) { 
    this.element.style.type = value;
  }
}

// Base 换个名字 $
function $(element) {
  return new Base(element);
}

// 给 $ 添加静态方法
$.get = function () { }

// 实际就是调用 $ 上面的静态方法
$.get('url', function () { })

// 等同于上面
$('#box')
```



# 封装Ajax

```js
const options = {
    type: 'GET',
    url: 'xxx/xxx',
    data: {k: "guor", v: 18},
    success: (response) => {},
    error: (response) => {},
}

function myAjax(options) {
    if (typeof options !== 'object') return
    const { type = 'GET', url, data, success, error } = options;
    
    const xhr = new XMLHttpRequest();
    if (type === 'GET') {
        xhr.open('GET', `${url}?${data}`, true)
        xhr.send(null)
    }
    if (type === 'POST') {
        xhr.open('POST', url, true)
        xhr.send(data)
    }

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                success && success(xhr.responseText)
            } else {
                error && error(xhr.response)
            }
        }
    }
}
```