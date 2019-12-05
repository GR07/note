/**
 * 抽象类: 我理解为 有 a、b、c 这三个类，抽象类就是这三个类的基类。
 * （例如：大佬搭好了框架了标注了一个eat方法，说你们这些人在写页面的时候每个页面中都要有eat方法）
 * 
 * 特性：
 * 
 * 1.抽象类是不允许被实例化（它的存在是为了给子类提供基础方法）
 * 
 * 2.抽象类中的抽象方法必须被子类实现（可以不写具体实现）
 * 
 */

// 使用关键字 abstract
// 抽象方法必须在抽象类中

// 抽象类（基类）
abstract class Abc {
  name: string;
  constructor (name: string) {
    this.name = name;
  }
  // 抽象方法
  abstract eat ():any;
  // 普通方法
  sleep(): void {
    console.log(`123`)
  }
}
// 子类
class Def extends Abc {
  constructor (name: any) {
    super(name)
  }
  // 子类中必须实现 抽象类中的eat（抽象方法）
  eat () { 
    console.log(this.name);
  }
}
// 实例化子类 基于抽象类的规则（Abc），
// 子类中的普通方法就不可以调用了
var aaa: Abc = new Def('食物')

aaa.eat(); // 子类实例化后 调用抽象方法

aaa.sleep(); // 子类实例化后 调用抽象类中的普通方法
