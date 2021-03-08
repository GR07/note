# location 对象

location.href-- 返回或设置当前文档的URL

location.search -- 返回URL中的查询字符串部分
例如 http://www.dreamdu.com/dreamdu.php?id=5&name=dreamdu 返回包括(?)后面的内容?id=5&name=dreamdu

location.hash -- 返回URL#后面的内容，如果没有#，返回空 

location.host -- 返回URL中的域名部分，例如www.dreamdu.com 

location.hostname -- 返回URL中的主域名部分，例如dreamdu.com

location.pathname -- 返回URL的域名后的部分。例如 http://www.dreamdu.com/xhtml/ 返回/xhtml/

location.port -- 返回URL中的端口部分。例如 http://www.dreamdu.com:8080/xhtml/ 返回8080

location.protocol -- 返回URL中的协议部分。例如 http://www.dreamdu.com:8080/xhtml/ 返回(//)前面的内容http:

location.origin -- 返回'?'前边的URL

location.assign(url) -- 设置当前文档的URL。就相当于一个链接，跳转到指定的url，当前页面会转为新页面内容，可以点击后退返回上一个页面。

location.replace(url) -- 设置当前文档 URL 替换当前文档，并且在history对象的地址列表中移除这个URL，所以没有后退返回上一页的。（重定向）

location.reload() -- 重载当前页面 等于 点击浏览器刷新 如果传 true 等于 摁住shift + 刷新 （无论文档修改日期都会绕过缓存）


