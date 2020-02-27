
// https://juejin.im/post/5e055d9ef265da33997a42cc



// session 认证流程: 

// 1.用户第一次请求服务器的时候，服务器根据用户提交的相关信息，创建对应的 Session

// 2.请求返回时将此 Session 的唯一标识信息 SessionID 返回给浏览器

// 3.浏览器接收到服务器返回的 SessionID 信息后，会将此信息存入到 Cookie 中(自动录入前端感觉不到)(同时 Cookie 记录此 SessionID 属于哪个域名)

// 4.当用户第二次访问服务器的时候，请求会自动判断此域名下是否存在 Cookie 信息，
// 如果存在自动将 Cookie 信息也发送给服务端，服务端会从 Cookie 中获取 SessionID，再根据 SessionID 查找对应的 Session 信息，
// 如果没有找到说明用户没有登录或者登录失效，如果找到 Session 证明用户已经登录可执行后面操作。

// 注意到两点：1.sessionID会自动由浏览器带上 2.session是需要存储空间的

// 所谓 Session 认证只是简单的把 User 信息存储到 Session 里，因为 SessionID 的不可预测性，暂且认为是安全的。





// token认证流程

// 1.客户端使用用户名跟密码请求登录

// 2.服务端收到请求，去验证用户名与密码

// 3.验证成功后，服务端会签发一个 token 并把这个 token 发送给客户端

// 4.客户端收到 token 以后，会把它存储起来，比如放在 cookie 里或者 localStorage 里

// 5.客户端每次向服务端请求资源的时候需要带着服务端签发的 token

// 6.服务端收到请求，然后去验证客户端请求里面带着的 token ，如果验证成功，就向客户端返回请求的数据

// 注意: 每一次请求都需要携带 token，需要把 token 放到 HTTP 的 Header 里

// 优势: 基于 token 的用户认证是一种服务端无状态的认证方式，服务端不用存放 token 数据,
// 用解析 token 的计算时间换取 session 的存储空间，从而减轻服务器的压力，减少频繁的查询数据库.

// token 完全由应用管理，所以它可以避开同源策略

// 比如我们后端有这样一个接口：
//  http://localhost/yiiserver/web/index.php/token?client_appid=aaa&client_appkey=bbb 

// 请求成功后端返回的Token：
// {"access-token": "8FEPEWDEUj2cf8n"}





// Cookie 和 Session 的区别

// 安全性： Session 比 Cookie 安全，Session 是存储在服务器端的，Cookie 是存储在客户端的。

// 存取值的类型不同：Cookie 只支持存字符串数据，想要设置其他类型的数据，需要将其转换成字符串，Session 可以存任意数据类型。

// 有效期不同： Cookie 可设置为长时间保持，比如我们经常使用的默认登录功能，Session 一般失效时间较短，客户端关闭（默认情况下）或者 Session 超时都会失效。

// 存储大小不同： 单个 Cookie 保存的数据不能超过 4K，Session 可存储数据远高于 Cookie，但是当访问量过多，会占用过多的服务器资源。





// Token 和 Session 的区别

// Session 是一种记录服务器和客户端会话状态的机制，使服务端有状态化，可以记录会话信息。

// Token 是令牌，访问资源接口（API）时所需要的资源凭证。Token 使服务端无状态化，不会存储会话信息。

// 安全性: Token 安全性比 Session 好.

// 是否存储在服务器: session是需要存储空间的. token不需要

// 是否自动携带: sessionID在cookie里会自动由浏览器带上. token需要代码带上.


