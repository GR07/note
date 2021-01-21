## 我们已经有了 HTTP 协议，为什么还需要另一个协议？它能带来什么好处？

因为 HTTP 协议有一个缺陷：通信只能由客户端发起。


## 场景

我们想获取今天的天气，只能是客户端向服务器发出请求，服务器返回查询结果。

HTTP 协议做不到服务器主动向客户端推送信息。


不然只能使用"轮询"：每隔一段时候，就发出一个请求，查询服务器有没有新的信息。最典型的场景就是聊天室。

轮询的效率低，非常浪费资源（因为必须不停连接，或者 HTTP 连接始终打开）


## 特点

它的最大特点就是，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话。


（1）建立在 TCP 协议之上，服务器端的实现比较容易。

（2）与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。

（3）数据格式比较轻量，性能开销小，通信高效。

（4）可以发送文本，也可以发送二进制数据。

（5）没有同源限制，客户端可以与任意服务器通信。

（6）协议标识符是ws（如果加密，则为wss），服务器网址就是 URL。



## 客户端的用法

```js
// 创建实例 （执行语句之后，客户端就会与服务器进行连接）
const ws = new WebSocket("wss://echo.websocket.org");


// 连接成功后的回调函数
ws.onopen = function(evt) { 
  console.log("Connection open ..."); 
  ws.send("Hello WebSockets!");
};

// 收到服务器数据后的回调函数
ws.onmessage = function(evt) {
  console.log( "Received Message: " + evt.data);
  ws.close();
};

// 连接关闭后的回调函数
ws.onclose = function(evt) {
  console.log("Connection closed.");
};   

```

## 连接状态 webSocket.readyState

readyState属性返回实例对象的当前状态，共有四种。

CONNECTING：值为0，表示正在连接。

OPEN：值为1，表示连接成功，可以通信了。

CLOSING：值为2，表示连接正在关闭。

CLOSED：值为3，表示连接已经关闭，或者打开连接失败。

```js
switch (ws.readyState) {
  case WebSocket.CONNECTING:
    // do something
    break;
  case WebSocket.OPEN:
    // do something
    break;
  case WebSocket.CLOSING:
    // do something
    break;
  case WebSocket.CLOSED:
    // do something
    break;
  default:
    // this never happens
    break;
}
```


## 向服务器发送数据 webSocket.send()

```js
// 发送文本
ws.send('your message');

// 发送 Blob 对象。
const file = document.querySelector('input[type="file"]').files[0];
ws.send(file);

// 发送 ArrayBuffer 对象
const img = canvas_context.getImageData(0, 0, 400, 320);
const binary = new Uint8Array(img.data.length);
for (let i = 0; i < img.data.length; i++) {
  binary[i] = img.data[i];
}
ws.send(binary.buffer);
```


## 判断发送是否结束 webSocket.bufferedAmount

```js
// 表示还有多少字节的二进制数据没有发送出去
const data = new ArrayBuffer(10000000);
socket.send(data);

if (socket.bufferedAmount === 0) {
  // 发送完毕
} else {
  // 发送还没结束
}
```


## 报错时的回调 webSocket.onerror

```js
socket.onerror = function(event) {
  // handle error event
};

socket.addEventListener("error", function(event) {
  // handle error event
});
```


## 服务端实现

常用的 Node 实现有以下三种。

µWebSockets
Socket.IO
WebSocket-Node