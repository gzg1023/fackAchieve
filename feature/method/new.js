/**
 * 编写思路
 * 1. js不支持运算符重载，所以第一个参数是constructor，剩余的参数是arguments
 * 2. 创建一个新对象，并链接构造函数到运算的对象
 * 3. 绑定对象的this
 * 4. 如果没对象返回this，有对象返回新对象
*/

const fackNew = function (thisArg, ...args) {
    if (typeof thisArg !== 'function') {
        throw new TypeError('当前调用fackNew的不是函数！')
    }
    // 定义一个空对象
    let temoObj = {}
    // 链接该对象（设置该对象的constructor）到另一个对象 ,继承旧对象的原型
    // Object.setPrototypeOf(temoObj, thisArg.prototype);
    temoObj = Object.create(thisArg.prototype); // 推荐这种
    // 设置临时对象的this
    thisArg.apply(temoObj, args)
    // 定义要返回的对象
    let returnObj = temoObj
    // 如果函数没有返回对象，则返回this
    if (typeof thisArg === 'object') {
        returnObj = this
    }
    return returnObj
}

// 精简代码版本
const _new = function (thisArg, ...args) {
    const temoObj = Object.create(thisArg.prototype)
    thisArg.apply(temoObj, args)
    return thisArg === 'object' ? this : temoObj
}



function Car(name, age) {
    this.name = name;
    this.age = age;
}

const car1 = new Car('张三', 1993);

console.log(car1.name);


const car2 = _new(Car, '李四', 1998);

console.log(car2.name);