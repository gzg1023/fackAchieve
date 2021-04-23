/**
 * ES6语法构建队数据结构
 */
class Queue{
    constructor() {
        this._queue = [];
      }
      // 查询队顶元素
      top() {
        return this._queue[0];
      }
      // 元素出队
      pop() {
        this._queue.shift();
      }
      // 元素入队
      push(item) {
        this._queue.push(item);
      }
      // 查询队尾元素
      peek() {
        return this._queue[this._queue.length - 1];   
      }
      // 查询队元素总数
      length() {
        return this._queue.length;
      }
      // 清空队
      clear() {
        this._queue = [];
      }
      // 队是否为空
      isEmpty() {
        return this._queue.length === 0;
      }
      // 获取当前队
      getStack() {
        return this._queue;
      }
      // 获取队无符号间隔的字符串
      getString() {
        let str = "";
        this._queue.map((item) => (str += item));
        return str;
      }
      reverseStack() {
        return this._queue.reverse();
      }
      // 获取队无符号间隔的反向字符串
      getReverseString() {
        let str = "";
        this._queue.map((item) => (str += item));
        return str.split('').reverse().join('')
      }
      print(){
          console.log(this._queue)
      }
}
module.exports = Queue