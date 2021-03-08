# 是否存在

```js
// 是否存在子节点
node.hasChildNodes()

// 是否存在指定的属性，返回布尔值
document.getElementsByTagName("BUTTON")[0].hasAttribute("onclick");

// 是否存在属性，返回布尔值
node.hasAttributes()

// elem 是否匹配指定的css选择器
elem.matches(css)         

// 用来查找匹配给定的CSS选择器的最近的祖先     
elem.closest(css)          

// elemB 是否包含elemA，返回布尔值
elemA.contains(elemB)         
```


# 获取属性

```js
// 获取指定属性的值
getAttribute("target")

// 指定节点的属性集合，可用 .length 遍历
document.getElementsByTagName("BUTTON")[0].attributes;
```


# 获取 dom

```js
document.getElementById()

document.getElementsByClassName()

document.getElementsByTagName()

document.getElementsByName()

// 指定 CSS 选择器的第一个元素。 如果没有找到，返回 null。
document.querySelector()     

document.querySelectorAll()

// 指向元素的父元素
dom.parentElement  

// 指向元素的前一个兄弟元素
dom.previousElementSibling  

// 指向元素的下一个兄弟元素
dom.nextElementSibling  

// 父元素的第一个子元素
dom.firstElementChild  

// 父元素的最后一个子元素
dom.lastElementChild  

// 所有子元素的集合（类数组）
dom.children  

// 所有子元素的集合（类数组） 注意：不但包括元素 还包括 文本节点
dom.childNodes  

```


# 插入 / 设置 操作

```js
// 方法可在已有的子节点前插入一个新的子节点。
insertBefore()          

// 方法可向节点的子节点列表的末尾添加新的子节点。
appendChild()           

// 方法可从子节点列表中删除某个节点。
removeChild()           

// 方法可将某个子节点替换为另一个。
replaceChild()          

// 方法创建或改变某个新属性。
setAttribute("type","button")          

// 方法删除指定的属性
removeAttribute("style")               
```


# innerHTML / outerHTML 区别

innerHTML 获取全部内容, 不包括自身Html标签 
outerHTML 获取全部内容, 包括自身Html标签


# DOM 节点类型
```js
// 返回节点类型 1 ~ 12
nodeType

// 返回节点的名称
nodeName

// 返回或设置当前节点的值，格式为字符串
nodeValue
```