/**
 * JSON.stringify 的威力
 */



 /**
  * 特性：
  * 
  * 1.传参为对象时，遇到 function / undefined / symbol 会被跳过。
  * 
  * 2.传参为数组时，遇到 function / undefined / symbol 会转换为 null。
  * 
  * 3.传参为单个值时，遇到 function / undefined / symbol 会转换为 undefined。
  * 
  * 4.传参为对象时，如果其中一个属性为toJSON() 函数，该函数返回什么值，序列化结果就是什么值，并且忽略其他属性的值。
  * 
  * 5.对象中存在 fn / undefined / symbol 属性因为会被跳过，所以跟在后面的属性位置会变。
  * 
  * 6.遇到 new Date对象，会被正常序列化为字符串 JSON.stringify({ now: new Date() }) 这是因为，new Data 内部有 toJSON()方法。
  * 
  * 7.NaN 和 Infinity 格式的数值及 null 都会被当做 null
  * 
  * 8.在深拷贝时，如果存在循环引用，会抛出错误
  */



    // 处理数据属性转换 把_id 改成 id，把updated_at 改成updatedAt，把 created_at 改成 createdAt。
    const todayILearn = {
        _id: 1,
        content: '今天学习 JSON.stringify()，我很开心！',
        created_at: 'Mon Nov 25 2019 14:03:55 GMT+0800 (中国标准时间)',
        updated_at: 'Mon Nov 25 2019 16:03:55 GMT+0800 (中国标准时间)'
    }

    const todayILearn = {
        id: 1,
        content: '今天学习 JSON.stringify()，我很开心！',
        createdAt: 'Mon Nov 25 2019 14:03:55 GMT+0800 (中国标准时间)',
        updatedAt: 'Mon Nov 25 2019 16:03:55 GMT+0800 (中国标准时间)'
    }

    // 方案一：遍历 一次遍历+多声明一个变量
    const todayILearnTemp = {};
    for (const [key, value] of Object.entries(todayILearn)) {
        if (key === "_id") todayILearnTemp["id"] = value;
        else if (key === "created_at") todayILearnTemp["createdAt"] = value;
        else if (key === "updatedAt") todayILearnTemp["updatedAt"] = value;
        else todayILearnTemp[key] = value;
    }
    console.log(todayILearnTemp);

    // 方案二：delete 删除
    todayILearn.id = todayILearn._id;
    todayILearn.createdAt = todayILearn.created_at;
    todayILearn.updatedAt = todayILearn.updated_at;
    delete todayILearn._id;
    delete todayILearn.created_at;
    delete todayILearn.updated_at;
    console.log(todayILearn);

    // 方案三：JSON + replace
    const mapObj = {
        _id: "id",
        created_at: "createdAt",
        updated_at: "updatedAt"
    };
    JSON.parse(JSON.stringify(todayILearn).replace(/_id|created_at|updated_at/gi, matched => mapObj[matched]))

    // {
    // id: 1,
    //  content: '今天学习 JSON.stringify()，我很开心！',
    //  createdAt: 'Mon Nov 25 2019 14:03:55 GMT+0800 (中国标准时间)',
    //  updatedAt: 'Mon Nov 25 2019 16:03:55 GMT+0800 (中国标准时间)'
    // }




  // 1.传参为对象时，遇到 function / undefined / symbol 会被跳过。
  let a = JSON.stringify({
      func: function () {},
      ud: undefined,
      syb: symbol("asd")
  })
  console.log(a) // {}


  // 2.传参为数组时，遇到 function / undefined / symbol 会转换为 null。
  let b = JSON.stringify([function () {}, undefined, symbol("asd")])
  console.log(b) // [null, null, null]


  // 3.传参为单个值时，遇到 function / undefined / symbol 会转换为 undefined。
  let func = JSON.stringify(function () {})
  let unde = JSON.stringify(undefined)
  let symb = JSON.stringify(symbol("asd"))
  console.log(func) // undefined
  console.log(unde) // undefined
  console.log(symbol) // undefined


  // 4.传参为对象时，如果其中一个属性为toJSON() 函数，该函数返回什么值，序列化结果就是什么值，并且忽略其他属性的值。
    var obj = {
        foo: 'foo',
        toJSON: function () {
            return 'bar';
        }
    };
    JSON.stringify(obj);      // '"bar"'
    JSON.stringify({x: obj}); // '{"x":"bar"}'



  // 5.对象中存在 fn / undefined / symbol 属性因为会被跳过，所以跟在后面的属性位置会变。
    


  // 6.遇到 new Data对象，会被正常序列化为字符串 JSON.stringify({ now: new Date() }) 这是因为，new Data 内部有 toJSON()方法。
  let newDate = JSON.stringify({ key: new Date() })
  console.log(newDate) // "{"key":"2020-09-17T11:50:17.484Z"}"



  // 7.NaN 和 Infinity 格式的数值及 null 都会被当做 null
  let nu = JSON.stringify(NaN); // null
  let nu = JSON.stringify(Infinity); // null
  let nu = JSON.stringify(null); // null


  // 8.布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
  let bz = JSON.stringify([new Number(1), new String("true"), new Boolean(true)])
  console.log(bz) // [1, "true", true]


  // 9.在深拷贝时，如果存在循环引用，会抛出错误
  const obj = { name: "guor" }
  const loopObj = { obj }
  // 对象之间形成循环引用，形成闭环
  obj.loopObj = loopObj
  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
  deepClone(obj)


  /**
   * 第二个参数 replacer
   * 
   * 可以是一个函数 或 数组
   * 
   */

   // 如果是函数：可以有两个参数 key val 类似于数组的 map 方法的回调，对每个属性执行一次函数
    const data = {
        a: "aaa",
        b: undefined,
        c: Symbol("dd"),
        fn: function() {
            return true;
        }
    };
    JSON.stringify(data) // { a: "aaa" }

    JSON.stringify(data, (key, val) => {
        if (typeof val === "function") {
            return val.toString()
        }
        if (typeof val === "undefined") {
            return "undefined"
        }
        if (typeof val === "symbol") {
            return val.toString()
        }
        return val
    }) // "{ a: "aaa", b: "undefined", c: Symbol("dd"), fn: "function() { return true }" }"


    // 如果是数组：数组中的项就是对象中指定需要序列化的属性名
    JSON.stringify({ name: 18, age: 'guor'}, ['name']) // "{ name: 18 }"


    /**
     * 第三个参数 space
     * 
     * 数值（加空格，上限为10） / 字符串（加字符串，取其前10个字母）
     * 
     * 只是用来美化格式化后的字符串
     */


 