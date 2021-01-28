/**
 * @description 逆向分配对象
 * 编写思路
 * 同reverseAssign，作用是只覆盖源对象存在的属性，没有的属性不处理
*/

function orderAssign(target, ...source) {
    for (let index = 0; index < source.length; index++) {
        const element = source[index];
        for (const key in element) {
            if (Object.hasOwnProperty.call(element, key)) {
                if (target[key]) {
                    target[key] = element[key]
                }
            }
        }
    }
    return target
}

Object.prototype.orderAssign = orderAssign


const target = { a: 1, b: 2, c: 8 };
const source = { a: 4, b: 5 };
const source2 = { d: 6, e: 7 };


const returnedTarget = Object.orderAssign(target, source, source2);


console.log(returnedTarget);
