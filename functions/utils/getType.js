let arr = BigInt(123);
// 类型供参考
let typeList = {
    '[object String]': 'String',
    '[object Number]': 'Number',
    '[object Array]': 'Array',
    '[object Function]': 'funtion',
    '[object Undefined]': 'Undefined',
    '[object Null]': 'Null',
    '[object Boolean]': 'Boolean',
    '[object Symbol]': 'Symbol',
    '[object Object]': 'Object',
    '[object Set]': 'Set',
    '[object Map]': 'Map',
    '[object WeakMap]': 'WeakMap',
    '[object WeakSet]': 'WeakSet',
    '[object ArrayBuffer]': 'ArrayBuffer',
    '[object BigInt]': 'BigInt'

}

function getType(val) {
    return typeList[Object.prototype.toString.call(val)]
}

console.log(getType(arr))