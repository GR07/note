/**
 * 只读属性 只可以给属性赋值一次。 
 */
interface Read {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}
let d: Read = {
  id: 234,
  name: 'Tom',
  gender: 'male'
};


/**
 * ReadonlyArray<T> 只读数组。只读的数组不可以修改。
*/
let ra: ReadonlyArray<number> = [1, 2, 3]
ra.push(5) // 因为是只读，不可以使用一切方法修改数组