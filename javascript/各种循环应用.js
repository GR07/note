
/**
 * for in
 * 使用 for in 循环遍历对象的属性时，原型链上的所有属性都将被访问
 */
function Pro(name, age) {
  this.name = name;
  this.age = age;
}
Pro.prototype.hobby = "羽毛球";
Pro.prototype.qq = "123";
var pro1 = new Pro("wan", 24);
console.log(pro1);
for (var p in pro1) {
  console.log(p); //会打印所有属性，包含原型链上的
}

// 如果要只遍历对象自身的属性呢 hasOwnProperty
for (var p in pro1) {
  if (pro1.hasOwnProperty(p)) {
    console.log(p); //这样，打印的属性就只包含对象自己的了
  }
}


// 比如在 vue 中 重置数据
function createData() {
  const sellerId = this.$route.query.sellerId || "";
  return {
    regionProps: {
      expandTrigger: "hover",
      checkStrictly: true
    },
    loading: false,
    total: 0,
    params: {
      sellerId,
      searchKey: ""
    },
    list: []
  };
}
export default {
  data() {
    return createData.call(this);
  }
}

const restObj = createData.call(this);
for (let key in restObj) {
  this[key] = restObj[key];
}
// or Object.keys(restObj) 也可以
Object.keys(restObj).forEach(key => {
  this[key] = restObj[key];
});


