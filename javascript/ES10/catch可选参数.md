/**
 * ES10 可以把 catch(e) 异常语句中的 变量e 省略掉
 */


# 可选的Catch

- 在 ES10 之前我们都是这样捕获异常的：

```js
try {
    // tryCode
} catch (err) {
    // catchCode
}

```


- 在 ES10 可以省略 err 这个参数：

```js
try {
    console.log('Foobar')
} catch {
    console.error('Bar')
}
```


# 场景

当我们只需要返回 true 或 false，并不关心 catch 的参数

```js
const validJSON = json => {
    try {
        JSON.parse(json)
        return true
    } catch {
        return false
    }
}
```
