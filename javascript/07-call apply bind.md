# call apply bind 区别

1. 首先都是用于改变this

2. call bind 第二个参数是列表，apply 第二个参数是数组。

3. call apply 调用后会立即执行，返回值是undefined，并且只有当前执行一次this有效。

4. bind 调用后不会立即执行，返回值是一个永久改变this的当前函数。