
  // 无论什么 es5 es6  js 中 构造函数 就是 类 

  /**
   * 常用3种继承： 
   * 
   * 1.原型继承
   * 
   * 2.对象冒充继承
   * 
   * 3.原型链 + 构造函数的组合继承
   */



  /**
   * 对象冒充继承：子类只可以继承父类构造函数里面的方法和属性 
   * 缺点：没办法继承父类原型链上的属性和方法 
   */

  function Too (name, age) {
    this.name = name;
    this.age = age;
  }
  Too.prototype.work = function () {
    console.log('工作')
  }
  var a = new Too('张三', 20);

  function Yoo () {
    Too.call(this)
  }
  var b = new Yoo();

  b.work() // 执行失败方法undefined（对象冒充继承没办法继承父类原型链上的属性和方法）



  /**
   * 原型继承：子类可以继承父类构造函数里面的方法和属性，也可以继承父类原型上的方法和属性。
   * 缺点：不能给父类传参。
   */

  function Per (name, age) {
    this.name = name;
    this.age = age;
  }
  Per.prototype.work = function () {
    console.log('工作')
  }

  function Ber (name, age) {}
  Ber.prototype = new Per();

  var d = new Ber('李四', 30) // 这里的传参无效（原型继承不可以给父类传参）

  

  /**
   * 综合以上两种都不完美，就出现了原型链 + 构造函数的组合继承方式。
   * 对象冒充继承： 解决原型继承不能传参问题 
   * 原型继承：解决对象冒充继承不能继承原型链上的方法和属性 
   */

  function Moo (name, age) {
    this.name = name;
    this.age = age;
  }
  Moo.prototype.work = function () {
    console.log('工作')
  }
  var e = new Moo('张三', 20);

  function Noo (name, age) {
    Moo.call(this, name, age) // 对象冒充继承： 解决原型继承不能传参问题
  }
  // 或者 = Moo.prototype; 都可以
  Noo.prototype = new Moo(); // 原型继承：解决对象冒充继承不能继承原型链上的方法和属性

  var f = new Noo('李四', 30)







  /**
   * 原型链：
   * 
   * new 出来的实例.__proto__  指向=> 构造函数.prototype  
   * 
   * 构造函数.prototype.constructor 指向=> 构造函数
   * 
   * 
   * 当访问一个实例属性时：
   * 
   * 先找实例自身属性，如果没有 去找实例.__proto__指向的 构造函数.prototype，再没有去找  构造函数.prototype.__proto__ 也就是 Object.prototype，再没有去找  Object.prototype.__proto__  最终得到 null 
   * 
   */





   /**
    * 实现 new：
    * 
    * 思路：
    * 
    * 1.首先是创建一个对象
    * 
    * 2.改变这个对象的 this 指针
    * 
    * 3.改变对象的__proto__  指向  构造函数的prototype
    */


    function myNew(func, ...argument) {
      const obj = {}

      func.call(obj, ...argument)

      obj.__proto__ = func.prototype

      return obj
    }

    // 使用
    function Puppy(age) {
      this.puppyAge = age;
    }
    
    Puppy.prototype.say = function() {
      console.log("汪汪汪");
    }
    
    const myPuppy3 = myNew(Puppy, 2);
    
    console.log(myPuppy3.puppyAge);  // 2
    console.log(myPuppy3.say());     // 汪汪汪



    /**
     * 实现 instanceof:
     * 
     * 思路：
     * 
     * 这个方法 返回布尔值 检查对象是否属于某个类的实例
     * 
     * 那么只要判断 对象的.__proto__.__proto__.proto__ 属性 是否有一环 等于 构造函数的.prototype
     * 
     */


     function myIns(obj, Func) {

       // 类型判断
       if (!obj || !Func || !obj.__proto__ || !Func.prototype) {
         return false
       }

       // 为了原型链查找        
       let curObj = obj
      
       // 遍历原型链 __proto__ === prototype
       while(curObj) {
         if (curObj.__proto__ === Func.prototype) {
           return true
         }
         // 找下一级层
         curObj = curObj.__proto__
       }

       return false
     }

      // 使用
      function Parent() {}
      function Child() {}

      Child.prototype.__proto__ = Parent.prototype;

      const obj = new Child();
      console.log(myInstanceof(obj, Child) );   // true
      console.log(myInstanceof(obj, Parent) );   // true
      console.log(myInstanceof({}, Parent) );   // false




      /**
       * 总结：
       * 
       * 1.JS中的函数可以作为函数使用，也可以作为类使用。
       * 
       * 2.为了让函数具有类的功能，函数都具有prototype属性。
       * 
       * 3.实例对象的__proto__指向了类的prototype。
       * 
       * 4.prototype 是函数的属性，不是对象的。
       * 
       * 5.对象拥有的是__proto__，是用来查找prototype的。
       * 
       * 6.prototype.constructor指向的是构造函数，也就是类函数本身。改变这个指针并不能改变构造函数。
       * 
       * 7.对象本身并没有constructor属性，你访问到的是原型链上的prototype.constructor。
       * 
       * 8.函数本身也是对象，也具有__proto__，他指向的是JS内置对象Function的原型Function.prototype。所以你才能调用func.call,func.apply这些方法，你调用的其实是Function.prototype.call和Function.prototype.apply。
       * 
       * 9.prototype本身也是对象，所以他也有__proto__，指向了他父级的prototype。
       * 
       * 10.__proto__和prototype的这种链式指向构成了JS的原型链。原型链的最终指向是Object。Object上面原型链是null，即Object.__proto__ === null。
       * 
       */


