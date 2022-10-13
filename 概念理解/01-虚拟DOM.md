# DOM 是什么

DOM 是浏览器中的概念，用 JS 对象表示页面上的元素，并提供了操作 DOM 对象的 API。

# 虚拟 DOM 是什么

写框架的人手动用 JS 对象模拟页面上的 DOM 和嵌套，用对象的属性来描述节点属性，虚拟DOM对象的节点与真实DOM的属性一一照应。


# 存在的目的

更高效的更新 DOM


# 更新原理

更新的时候经过 diff 算法对比浏览器中新旧两颗 虚拟DOM 树，标记需要更新的部分，再更新视图，减少了 dom 操作，提高了性能。

当你在一次操作时，需要更新10个 DOM 节点，浏览器没这么智能，收到第一个更新 DOM 请求后，并不知道后续还有9次更新操作，因此会马上执行流程，最终执行10次流程。

而通过 VNode，虚拟 DOM 不会立即操作 DOM，而是将这10次更新的 diff 内容保存到一个js对象中，最终将这个js对象一次性更新到 DOM 树。




# 创建一个虚拟 DOM

最少包含标签名 (tag)、属性 (attrs) 和子元素对象 (children) 三个属性，不同框架对这三个属性的名命可能会有差别。

```js
// <div title="a">哈哈<p index="b">我是p标签</p></div>
const div = {
    tagName: 'div',
    attrs: {
        title: 'a',
    },
    childrens: [
        '哈哈',
        {
            tagName: 'p',
            attrs: {
                index: 'b'
            },
            childrens: [
                '我是p标签'
            ]
        }
    ]
}
```