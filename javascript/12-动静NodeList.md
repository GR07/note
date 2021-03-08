# 动态 NodeList / 静态 NodeList


## getElementsByTagName() 获取的是动态的 NodeList

```js
let body = document.getElementsByTagName('body')[0];
let liveNodeList = document.getElementsByTagName('p');
console.log(liveNodeList, liveNodeList.length);
// 添加 p 元素后 liveNodeList 也同步更新了
let p = document.createElement('p');
p.innerText = 'test';
body.appendChild(p);
console.log(liveNodeList, liveNodeList.length);
```


## querySelectorAll() 获取的集合是静态的 NodeList

```js
let body = document.getElementsByTagName('body')[0];
let staticNodeList = document.querySelectorAll('p');
console.log(staticNodeList, staticNodeList.length);
// 添加 p 元素后 staticNodeList 不变
let p = document.createElement('p');
p.innerText = 'test';
body.appendChild(p);
console.log(staticNodeList, staticNodeList.length);
// 再次使用querySelectorAll获取p元素集合
staticNodeList = document.querySelectorAll('p');
console.log(staticNodeList, staticNodeList.length);
```


# 区别

document.getElement 比 querySelectorAll() 性能更优，

因为动态的 NodeList 拿到元素的引用，

而静态的 NodeList 需要一开始就获取所有的元素信息，要保存大量的信息自然速度会慢。
