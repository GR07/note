let obj = {
  a: 'a',
  b: 'b',
  guor: {
    g: 'g',
    u: {
      r: 'r'
    }
  }
}

function defineReactive (data, key, val) {
  Object.defineProperty(data, key, {
    get () {
      return val
    },
    set (newVal) {
      if (newVal === val) {
        return
      }
      val = newVal
    }
  })
}

function toRawType (val) {
  return Object.prototype.toString.call(val).slice(8, -1)
}

function recursion (data) {
  Object.keys(data).forEach((key) => {
    if (toRawType(data[key]) === 'Object') {
      recursion(data[key])
    } else {
      defineReactive(data, key, data[key])
    }
  })
}

recursion(obj)

console.log(obj.a);
console.log(obj.b);
console.log(obj.guor.g);
console.log(obj.guor.u.r);
console.log(obj);

obj.guor.u.r = 888

console.log(obj.guor.u.r);