// 创建一个cookie，在整个网站有效:
Cookies.set('name', 'value');

// 创建一个从现在起7天过期的cookie，在整个网站有效:
Cookies.set('name', 'value', { expires: 7 });

// 创建一个7天过期的cookie，对当前页面的路径有效:
Cookies.set('name', 'value', { expires: 7, path: '' });


// cookie的特点

// 1.只能使用字符串

// 2 单条存储有大小限制 4KB

// 3 数量限制(一般浏览器，限制大概在50条左右)

// 4 读取有域名限制 不可跨域读取，只能由来自 写入cookie的 同一域名 的网页可进行读取。

// 5 时效限制 每个cookie都有时效，最短的有效期是，会话级别：就是当浏览器关闭，那么cookie立即销毁
