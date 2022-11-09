# HTML5 中的 MutationObserver

字面上就可以理解这是用来观察 Node（节点）变化的

下面先介绍前辈 MutationEvent 再说 MutationObserver



# MutationEvent

虽然 MutationEvent 已经被弃用，但是我们还是需要了解它，可能你会为了浏览器兼容性的问题而遇到它

MutationEvent 事件机制是同步的，也就是说每次 DOM 修改就会触发，修改几次就触发几次，严重降低浏览器的运行

MutationEvent总共有7种事件：、DOMNodeInserted、DOMNodeRemoved、DOMSubtreeModified、DOMAttrModified、DOMCharacterDataModified、DOMNodeInsertedIntoDocument、DOMNodeRemovedFromDocument

- 例一

```html
<!-- 每次 DOM 修改就会触发，修改几次就触发几次，严重降低浏览器的运行 -->
<div id='block'></div>
```
```js
var i = 0;
block.addEventListener('DOMNodeInserted', function(e) {
     i ++                                  
});
block.appendChild(docuemnt.createTextNode('1'));
console.log(i) //1
block.appendChild(docuemnt.createTextNode('2'));
console.log(i) //2
block.appendChild(docuemnt.createTextNode('3'));
console.log(i) //3
```

- 例二

```html
<!-- 即使子节点变化，也会观察，如果只想观察 block 节点，就只能增加过滤逻辑 -->
<div id='block'>
  <span id='span'>Text</span>
</div>
```
```js
block.addEventListener('DOMNodeInserted', function(e) {
     console.log('1');  //1
});
span.appendChild(docuemnt.createTextNode('other Text'));
```



# MutationObserver

MutationObserver 的出现就是为了解决 MutationEvent 带来的问题



# MutationObserver 是一个构造器，接受一个 callback 参数，用来处理节点变化的回调函数，返回两个参数

```js
// 参数1 mutations：节点变化记录列表（sequence<MutationRecord>）

// 参数2 observer：构造 MutationObserver 对象

var observe = new MutationObserver(function (mutations, observer) { })
```


# MutationObserver 实例后对象有三个方法

- observe：设置观察目标，接受两个参数，target：观察目标（node节点），options：设置观察的选项（具体参数如下7个）

- disconnect：阻止观察者观察任何改变

- takeRecords：清空记录队列并返回里面的内容


# options 参数有已下 7 个选项

- childList：设置true，表示观察目标子节点的变化，比如添加或者删除目标子节点，不包括修改子节点以及子节点后代的变化

- attributes：设置true，表示观察目标属性的改变

- characterData：设置true，表示观察目标数据的改变

- subtree：设置为true，目标以及目标的后代改变都会观察

- attributeOldValue：如果属性为true或者省略，则相当于设置为true，表示需要记录改变前的目标属性值，设置了

- attributeOldValue可以省略attributes设置

- characterDataOldValue：如果characterData为true或省略，则相当于设置为true,表示需要记录改变之前的目标数据，设置了

- characterDataOldValue可以省略characterData设置

- attributeFilter：如果不是所有的属性改变都需要被观察，并且attributes设置为true或者被忽略，那么设置一个需要观察的属性本地名称（不需要命名空间）的列表




# 是异步的 MutationObserver

- 例一

```html
<!-- callback 回调函数是异步的，只有在全部 DOM 操作完成之后才会调用 callback -->
<div id='target' class='block' name='target'>
    target的第一个子节点
    <p>
       <span>target的后代</span>
    </p>
</div>
```
```js
var target=document.getElementById('target');
var i = 0
var observe = new MutationObserver(function (mutations, observe) {
    i ++   
});
observe.observe(target, { childList: true});
target.appendChild(docuemnt.createTextNode('1'));
target.appendChild(docuemnt.createTextNode('2'));
target.appendChild(docuemnt.createTextNode('3'));
console.log(i)  //1
```


- 例二

```js
// 当只设置 { childList: true } 时，表示观察目标子节点的变化
var observe = new MutationObserver(function (mutations, observe) {
    console.log(mutations);
});

observe.observe(target, { childList: true});
target.appendChild(document.createTextNode('新增Text节点'));   // 增加节点，观察到变化
target.childNodes[0].remove();                                // 删除节点，可以观察到
target.childNodes[0].textContent='改变子节点的后代';           // 不会观察到
```

- 例三：如果想要观察到子节点以及后代的变化需设置 { childList: true, subtree: true }

- 例四：attributes 选项用来观察目标属性的变化，用法类似与childList,目标属性的删除添加以及修改都会被观察到


- 例五

```js
// 选项 attributeFilter，用来筛选要观察的属性，比如你只想观察目标 style 属性的变化
observe.observe(target,{ attributeFilter: ['style'], subtree: true});
target.style='color:red';         // 可以观察到
target.removeAttribute('name');   // 删除name属性，无法观察到 
```

- 例六：disconnect 方法是用来阻止观察的，当你不再想观察目标节点的变化时可以调用 observe.disconnect() 方法来取消观察


- 例七

takeRecords 方法是用来取出记录队列中的记录。

比如你对一个节点的操作你不想马上就做出反应，过段时间在显示改变了节点的内容。

```js
var observe = new MutationObserver(function () { });

observe.observe(target, { childList: true });

target.appendChild(document.createTextNode('新增Text节点'));

// 此时 record 保存了改变记录列表，并且记录队列被清空，因此不会触发 MutationObserver 中的 callback
var record = observe.takeRecords();

target.appendChild(document.createElement('span'));

// 停止对target的观察
observe.disconnect();               
// MutationObserver 中的回调函数只有一个记录，只记录了新增 span 元素

// 之后随时可以对 record 的记录列表进行操作

// 下面是 record记录列表中每一项可操作的属性

// type：如果是属性变化，返回"attributes"，如果是一个CharacterData节点（Text节点、Comment节点）变化，返回"characterData"，节点树变化返回"childList"
// target：返回影响改变的节点
// addedNodes：返回添加的节点列表
// removedNodes：返回删除的节点列表
// previousSibling：返回分别添加或删除的节点的上一个兄弟节点，否则返回null
// nextSibling：返回分别添加或删除的节点的下一个兄弟节点，否则返回null
// attributeName：返回已更改属性的本地名称，否则返回null
// attributeNamespace：返回已更改属性的名称空间，否则返回null
// oldValue：返回值取决于type。对于"attributes"，它是更改之前的属性的值。对于"characterData"，它是改变之前节点的数据。对于"childList"，它是null
```
