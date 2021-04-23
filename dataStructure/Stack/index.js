/**
 * ES6语法构建栈数据结构
 */
class Stack {
  constructor() {
    this._stack = [];
  }
  // 查询栈顶元素
  top() {
    return this._stack[this._stack.length - 1];
  }
  // 元素出栈
  pop() {
    this._stack.pop();
  }
  // 元素入栈
  push(item) {
    this._stack.push(item);
  }
  // 查询栈底元素
  peek() {
    return this._stack[0];
  }
  // 查询栈元素总数
  length() {
    return this._stack.length;
  }
  // 清空栈
  clear() {
    this._stack = [];
  }
  // 是否为空
  isEmpty() {
    return this._stack.length === 0;
  }
  // 获取当前栈
  getStack() {
    return this._stack;
  }
  // 获取栈无符号间隔的字符串
  getString() {
    let str = "";
    this._stack.map((item) => (str += item));
    return str;
  }
  reverseStack() {
    return this._stack.reverse();
  }
  // 获取栈无符号间隔的反向字符串
  getReverseString() {
    let str = "";
    this._stack.map((item) => (str += item));
    return str.split("").reverse().join("");
  }
  print() {
    console.log(this._stack);
  }
}

module.exports = Stack;
