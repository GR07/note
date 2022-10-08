#### 技术选型

##### SheetJS 出品的 js-xlsx 是一款只需要纯 js 即可读取和导出 excel 的工具库。

##### 官网：https://sheetjs.com/

##### github：https://github.com/SheetJS/sheetjs

##### star：20.9k / used by：39.9k



#### 兼容性

- ##### IE8+

- ##### Chrome26+



#### 优势

- ##### 使用较为简单 / 支持编辑复制 / 视图还原性较高

- ##### 不需安装第三方插件原生 js 实现的工具库

- ##### 社区较为可靠 star：20.9k / used by：39.9k

#### 劣势

- ##### 文件400kb



#### 使用（核心部分）

##### 1.引入 xlsx.core.min.js 文件

##### 2.通过 XLSX.read(data, {type: type}) 方法进行转换，返回一个叫 WorkBook 的对象

```javascript
// data 是 通过线上拿到的文件
let data = new Uint8Array(res.data);
let workbook = XLSX.read(data, { type: 'array' });
```

##### 3.通过 XLSX 的工具函数格式转换，常用两种格式

```javascript
// to_html() 生成 html 可以直接插入 dom
let csv = XLSX.utils.sheet_to_html(worksheet);
// to_csv() 转为字符串 需再使用遍历生成 table 再插入 dom
let csv = XLSX.utils.sheet_to_csv(worksheet); 
```

##### 备注：

##### 转 csv 会忽略格式、单元格合并等信息，所以复杂表格可能不适用。

##### 转 html 会保留单元格合并，但是生成的是 html 代码



#### 完整代码

```vue
<template>
  <div class="container">
    <button @click="loadRemoteFile">预览线上xlsx文件</button>
    <div id="result" contenteditable></div>
  </div>
</template>
<script type="text/javascript" src="./js/downloadjs/xlsx.core.min.js"></script>
<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return { };
  },
  methods: {
    loadRemoteFile() {
      let url = "https://wg.cloud.ininin.com/7b5d8a1dc85d0b537b26235f40970854.xlsx";
      this.readWorkbookFromRemoteFile(url, (workbook) => this.readWorkbook(workbook));
    },
    readWorkbookFromRemoteFile(url, callback) {
      axios.get(url, { responseType: "arraybuffer" }).then((res) => {
        console.log(res)
        let data = new Uint8Array(res.data);
        let workbook = XLSX.read(data, { type: 'array' });
        if (callback) callback(workbook);
      })
      .catch((err) => {
        this.err = err;
      });
    },
    // 读取第一张sheet的内容字符串，转为table插入页码
    readWorkbook(workbook) {
      let sheetNames = workbook.SheetNames; // 工作表名称集合
      let worksheet = workbook.Sheets[sheetNames[0]]; // 只读取第一张sheet
      let csv = XLSX.utils.sheet_to_csv(worksheet); // 如果 to_html 则可以直接插入 dom
      console.log(csv)
      document.getElementById('result').innerHTML = this.csv2table(csv);
    },
    // 将csv转换成table表格
    csv2table(csv) {
      let html = '<table>';
      let rows = csv.split('\n');
      rows.pop(); // 去掉最后一行没用的
      rows.forEach((row, idx) => {
        let columns = row.split(',');
        columns.unshift(idx + 1); // 添加行索引
        if(idx == 0) { // 添加列索引
          html += '<tr>';
          for(let i = 0; i < columns.length; i ++) {
            html += '<th>' + (i == 0 ? '' : String.fromCharCode(65 + i - 1)) + '</th>';
          }
          html += '</tr>';
        }
        html += '<tr>';
        columns.forEach((column) => {
          html += '<td>'+column+'</td>';
        });
        html += '</tr>';
      });
      html += '</table>';
      return html;
    }
  }
};
</script>
<style type="text/css">
.container {
  width: 1400px;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
  min-height: 100vh;
  text-align: left;
}
table {
    border-collapse: collapse;
}
th, td {
    border: solid 1px #6D6D6D;
    padding: 5px 10px;
}
</style>

```

