// qs是一个npm仓库所管理的包,可通过npm install qs命令进行安装.



qs.parse() // 将URL解析成对象的形式

const Qs = require('qs');
let url = 'method=qu&pro=85&appToken=dba0';
Qs.parse(url);
console.log(Qs.parse(url));
// 打印如下
{
    method: 'qu',
    pro: '85',
    appToken: 'dba0'
}



qs.stringify() // 将对象 序列化成 URL 的形式，以 & 进行拼接

let obj = {
    method: 'qu',
    pro: '85',
    appToken: 'dba0'
}

Qs.stringify(obj);
console.log(Qs.stringify(obj));
// 打印如下
'method=qu&pro=85&appToken=dba0'