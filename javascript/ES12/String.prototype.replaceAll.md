# replaceAll

- 满足条件的都会被替换

- 原始字符串保持不变

```js
'aabbcc'.replaceAll('b', '.') // 'aa..cc'

'aabbcc'.replaceAll(/b/g, '.') // "aa..cc"
```