class Point {
  // public readonly x: string 创建初始化 x,y。
  constructor(public readonly x: string, public readonly y: string) {
    this.x = x;
    this.y = y;
  }

  toString(nb: number = 0) {
    return `${this.x}123${this.y}${nb}`;
  }
}
// 继承
class B extends Point {
  constructor(x: string, y: string) {
    super(x, y);
  }
}