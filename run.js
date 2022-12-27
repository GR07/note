let Alert = (function () {
  let instance = null
  function Alert (content) {

    if (this instanceof Alert) {
      if (!instance) {
        instance = this
      }
    } else {
      if (!instance) {
        instance = new Alert(content)
      }
    }

    instance.init(content)
    return instance
  }
  Alert.prototype.init = function (content) {
    this.content = content
  }
  return Alert
})()

let a = Alert('a')
console.log(a);
let b = Alert('b')
console.log(b);


class Product1 {
  product() {
  console.log("生产一线");
  }
  }
  class Product2 {
  product() {
  console.log("生产二线");
  }
  }
  class Factory {
  constructor() {
  this.Product1 = Product1;
  this.Product2 = Product2;
  }
  create(name, callBack) {
  const product = new this[name]();
  product.product();
  return callBack("susess");
  }
  }
  let p = new Factory();
  p.create("Product1", (res) => {
  console.log(res);
  });