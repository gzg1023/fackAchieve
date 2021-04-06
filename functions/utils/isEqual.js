
/**
 * @description 判断两个数据是否相等(广义)
 * 1. 先处理基本类型 包括String,Number,Null,undefined,NaN,Boolean 不考虑Symbol
 * 2. 引用类型分情况处理 包括Object和Array 不考虑Function类型
 * 如果是基本类型，那么判断值是否为全等，认为NaN和NaN相等
 * 如果是数组，那么判断每个子项是否相同，子项包括 不同类型
 * 如果是对象，
 *      如果是空对象认为相等，
 *      如果对象里面的key和value相等(广义的值相等，内存地址不一样)且原型相同，那么认为是相等的
 *      如果是循环引用的对象，那么两个变量同时引用的对象相等，认为相等
*/


let obj1 = {}

let obj2 = {}


console.log(Object.is(obj1,obj2))