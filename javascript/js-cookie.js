// 创建一个cookie，在整个网站有效:
Cookies.set('name', 'value');

// 创建一个从现在起7天过期的cookie，在整个网站有效:
Cookies.set('name', 'value', { expires: 7 });

// 创建一个7天过期的cookie，对当前页面的路径有效:
Cookies.set('name', 'value', { expires: 7, path: '' });