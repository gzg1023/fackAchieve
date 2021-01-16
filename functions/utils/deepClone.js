
/**
 * @description 深拷贝一个函数
 * 1. 先判断类型如果是基本类型直接返回
 * 2. 如果是对象类型，递归拷贝交换通过key交换值
 * 3. 返回新对象
*/

function deepClone(source) {
    if (typeof source !== 'object') {
        return source
    }
    let target = Array.isArray(source) ? [] : {}; // 判断对象是不是数组
    for (let key in source) {
        if (typeof source[key] === 'object' && source[key] != null) {
            target[key] = deepClone(source[key]);
        } else {
            target[key] = source[key];
        }
    }
    return target;
}

let obj1 = {
    a: 1,
    b: 2,
    c: {
        age: 18,
        alex: {
            '0': [1, 2, 3],
            '2': [4, 5, 6]
        }
    },
    d: [
        1,
        2,
        3
    ]
}

let obj2 = {}

let obj3 = {}

obj2 = obj1

obj3 = deepClone(obj1)

console.log(obj1, obj2, obj3)