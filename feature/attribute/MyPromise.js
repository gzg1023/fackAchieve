// 用常量定义promise的三种状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
    constructor(execurte) {
        // 针对函数执行器进行异常处理
        try {
            execurte(this.resolve, this.reject)
        } catch (error) {
            this.reject(error)
        }
    }
    // 默认状态是等待
    status = PENDING
    // 成功的回调默认值
    value = undefined
    // 失败的回调默认值
    resaon = undefined
    // 成功的回调,可以多次then，看你存在多个定义为数组
    resolveCallBack = []
    // 失败的回调
    rejecteCallBack = []

    // 成功时候的回调
    resolve = (value) => {
        // 防止状态被修改
        if (this.status !== PENDING) return
        // 先修改状态
        this.status = FULFILLED
        // 然后修改值
        this.value = value
        // 如果纯在异步，则等待函数回调执行
        // this.resolveCallBack && this.resolveCallBack(this.value)
        // 处理多个任务
        while (this.resolveCallBack.length) {
            this.resolveCallBack.shift()()
        }
    }
    // 失败时候的回调
    reject = (resaon) => {
        if (this.status !== PENDING) return
        // 先修改状态
        this.status = REJECTED
        this.resaon = resaon
        // 如果纯在异步，则等待函数回调执行
        // this.rejecteCallBack && this.rejecteCallBack(this.resaon)
        // 处理多个任务
        while (this.rejecteCallBack.length) {
            this.rejecteCallBack.shift()()
        }
    }
    // then方法
    then = (resolveCallBack, rejecteCallBack) => {
        // 如果传递空值，则默认向后传递所以添加一个默认情况
        resolveCallBack = resolveCallBack ? resolveCallBack : value => value;
        // 参数可选
        rejecteCallBack = rejecteCallBack ? rejecteCallBack : reason => { throw reason };
        let p = new MyPromise((resolve, reject) => {
            if (this.status === FULFILLED) {
                console.log('111')
                // 处理不同的返回，如果是正常值直接返回，如果是Promise对象，则返回一个Promise供继续调用
                // 开启一个异步线程，等待p结果的返回。否则程序限制性后返回p的值
                // 针对执行的函数进行异常处理
                setTimeout(() => {
                    try {
                        let x = resolveCallBack(this.value)
                        returnValue(p, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0);
            } else if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = rejecteCallBack(this.resaon)
                        returnValue(p, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0);

            } else {
                // 判断为等待状态的情况，如果存在异步任务,存储成功
                this.resolveCallBack.push(() => {
                    setTimeout(() => {
                        try {
                            let x = resolveCallBack(this.value)
                            returnValue(p, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0);
                })
                // 存储失败的情况
                this.rejecteCallBack.push(() => {
                    setTimeout(() => {
                        try {
                            let x = rejecteCallBack(this.resaon)
                            returnValue(p, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0);
                })
            }
        })
        return p
    }

    // 注册一个非静态的方法,无论成功或者失败finally都会执行
    finally(callback) {
        return this.then((value) => {
            return MyPromise.resolve(callback()).then(() => value)
        }, (resaon) => {
            return MyPromise.resolve(callback()).then(() => { throw resaon })
        })
    }

    // 注册一个非静态的方法,catch收集错误信息
    catch(rejecteCallBack) {
        return this.then(undefined, rejecteCallBack)
    }

    // all静态方法,有一个失败，直接返回失败，结果是按照传入的顺序返回
    static all(array) {
        // 保存回调结果的数组
        let result = [];
        // 累加器，用来判断执行的方法队列是否执行完成
        let count = 0;
        // all 方法也返回一个promise对象
        return new MyPromise((resolve, reject) => {
            function pushResult(key, value) {
                result[key] = value
                count++
                // 如果累加器和执行的任务列表长度相等，则说明已经完成了整个任务
                if (count === array.length) {
                    resolve(result)
                }
            }
            // 循环处理要执行的任务
            for (let index = 0; index < array.length; index++) {
                const element = array[index];
                // 判断返回普通的值，还是Promise对象    
                if (element instanceof MyPromise) {
                    element.then((v) => pushResult(index, v), (resaon) => reject(resaon))
                } else {
                    pushResult(index, array[index])
                }
            }
        })
    }

    // 直接注册resolve方法，表示直接只返回一个成功的结果
    static resolve(value) {
        // 如果是promise对象则直接返回
        if (value instanceof MyPromise) {
            return value
        } else {
            // 如果不是promise对象，则重新创建一个
            return new MyPromise((resolve) => {
                resolve(value)
            })
        }
    }
}

function returnValue(p, x, resolve, reject) {
    // 如果p和x相等，则说明产生了循环引用
    if (p === x) {
        return reject(new TypeError('靓仔，你的代码循环引用了'))
    }
    // 判断x是不是Promise类型
    if (x instanceof MyPromise) {
        x.then(value => resolve(value), resaon => reject(resaon))
    } else {
        resolve(x)
    }

}

module.exports = MyPromise