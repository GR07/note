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