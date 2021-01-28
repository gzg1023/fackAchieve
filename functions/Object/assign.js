/**
 * @description 分配对象
 * 编写思路
 * 1. 接受一个tatget对象和多个sources对象
 * 2. 将所有可枚举属性的值从一个或多个源对象分配到目标对象
 * 3. 返回目标对象。
*/

function fackAssign(target, ...source) {
    for (let index = 0; index < source.length; index++) {
        const element = source[index];
        for (const key in element) {
            if (Object.hasOwnProperty.call(element, key)) {
                target[key] = element[key]
            }
        }
    }
    return target
}

Object.prototype.fackAssign = fackAssign

const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };
const source2 = { d: 6, e: 7 };


const returnedTarget = Object.assign(target, source, source2);

const returnedTarget2 = Object.fackAssign(target, source, source2);

console.log(target);

console.log(returnedTarget);

console.log(returnedTarget2);
