# Object.fromEntries()

方法 Object.fromEntries() 把键值对列表转换为一个对象，这个方法是和 Object.entries() 相对的。


```js
Object.fromEntries([
    ['foo', 1],
    ['bar', 2]
])
// {foo: 1, bar: 2}
```

# 案例

- Object转换操作

```js
const obj = {
    name: 'jimmy',
    age: 18
}
const entries = Object.entries(obj)
console.log(entries)
// [Array(2), Array(2)]

// ES10
const fromEntries = Object.fromEntries(entries)
console.log(fromEntries)
// {name: "jimmy", age: 18}
```


- Map 转 Object

```js
const map = new Map()
map.set('name', 'jimmy')
map.set('age', 18)
console.log(map) // {'name' => 'jimmy', 'age' => 18}

const obj = Object.fromEntries(map)
console.log(obj)
// {name: "jimmy", age: 18}
```


- 过滤

```js
// course 表示所有课程，想请求课程分数大于80的课程组成的对象：
const course = {
    math: 80,
    english: 85,
    chinese: 90
}
const res = Object.entries(course).filter(([key, val]) => val > 80)
console.log(res) // [ [ 'english', 85 ], [ 'chinese', 90 ] ]
console.log(Object.fromEntries(res)) // { english: 85, chinese: 90 }
```


- url的search参数转换

```js
// let url = "https://www.baidu.com?name=jimmy&age=18&height=1.88"

// queryString 为 window.location.search
const queryString = "?name=jimmy&age=18&height=1.88";
const queryParams = new URLSearchParams(queryString);
const paramObj = Object.fromEntries(queryParams);
console.log(paramObj); // { name: 'jimmy', age: '18', height: '1.88' }
```