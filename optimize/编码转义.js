
// encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。

encodeURIComponent("http://www.w3school.com.cn") // http%3A%2F%2Fwww.w3school.com.cn

encodeURIComponent("http://www.w3school.com.cn/p 1/") // http%3A%2F%2Fwww.w3school.com.cn%2Fp%201%2F

encodeURIComponent(",/?:@&=+$#") // %2C%2F%3F%3A%40%26%3D%2B%24%23




// js-base64 编码

import Base64 from 'js-base64'

Base64.encode('china is so nb'); // 编码 "Y2hpbmEgaXMgc28gbmI="

Base64.decode("Y2hpbmEgaXMgc28gbmI="); // 解码 'china is so nb'
