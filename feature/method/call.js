/** 
 * 编写思路
 * 1.确定函数的作用域
 * 2.存储执行函数的执行结果
 * 3.删除零时函数并返回
*/

const fackCall = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('当前调用call方法的不是函数！')
  }
  // 定义一个私有标识符
  const flag = Symbol('function')
  // 确定返回函数的作用域， 默认是window,区分node和浏览器环境
  const callback = context || (typeof window !== 'undefined' ? window : globalThis)
  // 把要执行函数的函数体 复制到临时的函数中
  callback[flag] = this
  // 保存返回的结果
  const result = callback[flag](...args)
  // 删除临时变量
  delete callback[flag]
  // 返回结果
  return result
}


Function.prototype.fackCall = fackCall

function Product(name, price) {
  this.name = name;
  this.price = price;
}
function Food(name, price) {
  // Product(name, price) 没有this会找不到
  // Product.call(this, name, price);
  Product.fackCall(this, name, price);
}

console.log(new Food('张三', 5).name);
console.log(new Food('张三', 5).price);
