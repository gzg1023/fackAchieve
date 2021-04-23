const Queue = require("./index")


let q  = new Queue()
q.push('1')
q.push('2')
q.push('3')
q.push('4')
q.push('5')

q.pop()
q.pop()
console.log(q.getString())
q.print()