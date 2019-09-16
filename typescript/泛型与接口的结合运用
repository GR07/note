/**
 * 实现的功能：定义一个操作不同数据库的库，Mysql、Mssql。
 *
 * 1.接口：对方法和类进行约束。
 *
 * 2.泛型：使用泛型达到对方法和类的复用。
 *
 * 3.注意：如果类要实现泛型接口，那这个类必须是泛型类。
 */


// 定义接口
interface DBI<T> {
  add(info: T): boolean;
  update(info: T, id: number): boolean;
  delete(id: number): boolean;
  get(id: number): any[];
}

// 定义一个操作mysql数据库的类。  如果类要实现泛型接口，那这个类必须是泛型类。
class Mysql<T> implements DBI<T> {
  constructor () {
    console.log('建立数据库连接');
  }
  add(info: T): boolean {
    console.log('添加操作')
    return true;
  }
  update(info: T, id: number): boolean {
    console.log('修改操作')
    return true;
  }
  delete(id: number): boolean {
    console.log('删除操作')
    return true;
  }
  get(id: number): any[] {
    const list = [
      {
        title: 'xxx',
        desc: 'xxx'
      },
      {
        title: 'xxx',
        desc: 'xxx'
      }
    ];
    return list;
  }
}
// 定义一个操作Mssql数据库的类。  如果类要实现泛型接口，那这个类必须是泛型类。
class Mssql<T> implements DBI<T> {
  constructor () {
    console.log('建立数据库连接');
  }
  add(info: T): boolean {
    console.log('添加操作')
    return true;
  }
  update(info: T, id: number): boolean {
    console.log('修改操作')
    return true;
  }
  delete(id: number): boolean {
    console.log('删除操作')
    return true;
  }
  get(id: number): any[] {
    const list = [
      {
        title: 'xxx',
        desc: 'xxx'
      },
      {
        title: 'xxx',
        desc: 'xxx'
      }
    ];
    return list;
  }
}


// 使用 Mysql类
class User {
  username: string | undefined;
  password: string | undefined;
}
const u = new User();
u.username = 'zhangsan';
u.password = '123';

const mysql = new Mysql<User>();
mysql.add(u);


// 使用 Mssql类
class User2 {
  username: string | undefined;
  password: string | undefined;
}
const u2 = new User();
u.username = 'zhangsan';
u.password = '123';

const mssql = new Mysql<User2>();
mssql.add(u2);