


const toUpper = s => s.toUpperCase() 
const toLower = s => s.toLowerCase()
const reverse = arr => arr.reverse() 
const first = arr => arr[0]
  // 从右到左运行
function fackComposeRight (...callback) {
    return function (value){
        return callback.reverse().reduce((item,fn)=>{
            return fn(item)
        },value)
    }
}
  // 从左到右运行
function fackComposeLeft (...callback) {
    return function (value){
        return callback.reduce((item,fn)=>{
            return fn(item)
        },value)
    }
}
const f = fackComposeRight(toUpper, first, reverse) 
const f2 = fackComposeLeft(first, toLower) 

console.log(f(['oNe', 'tWo', 'thRee']))

console.log(f2(['oNe', 'tWo', 'thRee']))
