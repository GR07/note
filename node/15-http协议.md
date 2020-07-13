理论：

HTTP协议是基于 TCP / IP 通信协议来传递数据（HTML、js、css文件、图片文件、查询结果）


HTTP：

#### 请求request：

客户端发送一个HTTP请求的格式：
##### 这一行称为请求行： get-请求方法；/-请求的路径；HTTP-协议版本
GET / HTTP/1.1          

##### 下面都是请求头的字段：key: value 的形式
Host: www.mi.com
Connection: keep-alive
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Sec-Fetch-Site: cross-site
Sec-Fetch-Mode: navigate
Sec-Fetch-User: ?1
Sec-Fetch-Dest: document
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
Cookie: xmuuid=XMGUEST-E0A725C0-C062-11EA-B749-BFDAB25D23E0; XM_agreement=0; pageid=81190ccc4d52f577;

##### 如果是POST请求，最下面会有请求体，例如：
username=guor&password=123123


1.服务器收到请求后会先读取user-agent判断请求方是否浏览器（作用反爬虫）

2.分析请求头的内容（比如是否登录了），再决定返回不同的内容。


#### 响应response：

##### 这一行称为状态行
HTTP/1.1 200 OK

##### 下面是响应头
Date: Tue, 07 Jul 2020 15:02:45 GMT
Content-Type: text/html; charset=UTF-8
Transfer-Encoding: chunked
Connection: keep-alive
Expires: Tue, 07 Jul 2020 15:03:13 GMT
Cache-Control: max-age=120
X-Cacheable: MI-WWW-Cacheable
Server: MIFE/3.0
X-Frame-Options: SAMEORIGIN
Content-Encoding: gzip
Age: 92
X-Cache: HIT from cache.51cdn.com
X-Via: 1.1 xz246:4 (Cdn Cache Server V2.0), 1.1 PS-000-01Iu023:4 (Cdn Cache Server V2.0)
X-Ws-Request-Id: 5f048e95_PS-000-01Iu023_12769-13393

##### 最下面是响应正文
比如一个html文档



#### HTTP请求方法：

GET:

HEAD: 如果只是用于告诉服务器用户的操作便于记录用户的信息，并不返回数据的时候，用HEAD。

