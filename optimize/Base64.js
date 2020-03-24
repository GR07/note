import Base64 from 'js-base64'


Base64.encode('china is so nb'); // 编码
"Y2hpbmEgaXMgc28gbmI="

Base64.decode("Y2hpbmEgaXMgc28gbmI="); // 解码
'china is so nb'