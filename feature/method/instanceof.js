
/** 
 * @description 编写思路
 * 1. 不支持运算符重载，通过函数穿参数解决
 * 2. 判断对象A是否在对象B的原型链上
 * 3. 如果不存在就一直查询，一直到顶层
 * 3. 返回一个布尔值
*/
function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
}

const auto = new Car('Honda', 'Accord', 1998);


function fackInstanceof(detectObject, souceObject) {
    let leftObj = Object.getPrototypeOf(detectObject) // 相当于detectObject.__proto__
    let rightObj = souceObject.prototype // 获取源对象原型
    // 循环获取detectObject对象的原型
    while (true) {
        // 如果是null直接返回（第一次或者原型链顶）
        if (Object.is(leftObj, null)) return false
        // 如果第一次相等直接返回
        if (Object.is(leftObj, rightObj)) return true
        // 不相等，继续向上找
        leftObj = Object.getPrototypeOf(leftObj)
    }
}

console.log(auto instanceof Car);

console.log(auto instanceof Object);

console.log(fackInstanceof(auto, Car));

console.log(fackInstanceof(auto, Object));