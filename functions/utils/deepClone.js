
/**
 * @description 深拷贝一个函数
 * 1. 先判断类型如果是基本类型直接返回
 * 2. 通过WeakMap结构 解决循环引用的问题
 * 3. 通过dp函数递归 如果是对象类型，递归拷贝交换通过key交换值
 * 4. 返回新对象
*/

function deepClone(source) {
    if (typeof source !== 'object') {
        return source
    }
    let objMap = new WeakMap();
    function dp(){
        if(objMap.has(source)){
            return objMap.get(source)
        }
       
        let target = Array.isArray(source) ? [] : {}; // 判断对象是不是数组
        objMap.set(source,target)
        for (let key in source) {
            // 如果是对象就递归遍历每个key或者
            if (typeof source[key] === 'object' && source[key] != null) {
                target[key] = dp(source[key]);
            } else {
                // 如果是普通对象直接赋值
                target[key] = source[key];
            }
        }
        return target;
    }
    return dp(source);
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
    ],

}


let obj2 = {}

let obj3 = {}

obj2 = obj1

obj3 = deepClone(obj1)

obj1.a = 100; // 测试引用修改

obj1.obj1 = obj1 // 测试循环引用

console.log(obj1, obj2, obj3)