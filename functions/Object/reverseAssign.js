/**
 * @description 逆向分配对象
 * 编写思路
 * 同assign，作用是不覆盖源对象有的属性。只存没有的属性
*/

function reverseAssign(target, ...source) {
    for (let index = 0; index < source.length; index++) {
        const element = source[index];
        for (const key in element) {
            if (Object.hasOwnProperty.call(element, key)) {
                if (!target[key]) {
                    target[key] = element[key]
                }
            }
        }
    }
    return target
}

Object.prototype.reverseAssign = reverseAssign


const target = { a: 1, b: 2, c: 8 };
const source = { a: 4, b: 5 };
const source2 = { d: 6, e: 7 };

const returnedTarget = Object.reverseAssign(target, source, source2);

console.log(returnedTarget);
