// 用常量定义promise的三种状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
    constructor(execurte) {
        // 默认状态是等待
        this.status = PENDING
        // 成功的回调默认值
        this.value = undefined
        // 失败的回调默认值
        this.resaon = undefined
        // 成功的回调队列,可以多次then，所以存在多个定义为数组
        this.resolveCallBacks = []
        // 失败的回调
        this.rejecteCallBacks = []
        // 针对执行器进行异常处理
        try {
            execurte(this.resolve, this.reject)
        } catch (error) {
            this.reject(error)
        }
    }

    // 成功时候的回调
    resolve = (value) => {
        queueMicrotask(() => {
            if (this.status === PENDING) {
                this.status = FULFILLED; // 修改状态
                this.value = value;
                this.resolveCallBacks.forEach((fn) => fn(this.value)); // 成功的回调
            }
        })
    }
    // 失败时候的回调
    reject = (resaon) => {
        queueMicrotask(() => {
            if (this.status === PENDING) {
                this.status = REJECTED; // 修改状态
                this.resaon = resaon;
                this.rejecteCallBacks.forEach((fn) => fn(this.resaon)); // 失败的回调
            }
        })
    }
    // then方法
    then = (resolveCallBack, rejecteCallBack) => {
        // 如果传递空值，则默认向后传递所以添加一个默认情况
        resolveCallBack = resolveCallBack ? resolveCallBack : value => value;
        // 参数可选
        rejecteCallBack = rejecteCallBack ? rejecteCallBack : reason => { throw reason };
        let p = new MyPromise((resolve, reject) => {
            // 处理不同的返回，如果是正常值直接返回，如果是Promise对象，则返回一个Promise供继续调用
            // 成功
            if (this.status === FULFILLED) {
                // 开启一个微任务，等待p结果的返回。否则程序限制性后返回p的值
                // 针对执行的函数进行异常处理
                queueMicrotask(() => {
                    try {
                        let callbackValue = resolveCallBack(this.value)
                        this._returnValue(p, callbackValue, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
                // 失败
            } else if (this.status === REJECTED) {
                queueMicrotask(() => {
                    try {
                        let callbackValue = rejecteCallBack(this.resaon)
                        this._returnValue(p, callbackValue, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
                // 等待过程
            } else {
                // 判断为等待状态的情况，存储任务然后后续执行
                // 存储成功的任务
                this.resolveCallBacks.push(() => {
                    queueMicrotask(() => {
                        try {
                            let callbackValue = resolveCallBack(this.value)
                            this._returnValue(p, callbackValue, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
                })
                // 存储失败的情况
                this.rejecteCallBacks.push(() => {
                    queueMicrotask(() => {
                        try {
                            let callbackValue = rejecteCallBack(this.resaon)
                            this._returnValue(p, callbackValue, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
                })
            }
        })
        return p
    }

    // 注册一个非静态的方法,catch收集错误信息
    catch(rejecteCallBack) {
        return this.then(undefined, rejecteCallBack)
    }

    // 注册一个非静态的方法,无论成功或者失败finally都会执行
    finally(callback) {
        return this.then((value) => {
            return MyPromise.resolve(callback()).then(() => value)
        }, (resaon) => {
            return MyPromise.resolve(callback()).then(() => { throw resaon })
        })
    }

    // then可能返回一个普通值，也可能返回一个 Promise,一个内置工具
    /**
     * 
     * @param {*} p 当前在运行的Promise
     * @param {*} callbackValue  返回值（then出来的值）
     * @param {*} resolve 成功回调
     * @param {*} reject  失败回调
     * @returns 
     */
    _returnValue(p, callbackValue, resolve, reject) {
        // 如果p和callbackValue相等，则说明产生了循环引用
        if (p === callbackValue) {
            return reject(new TypeError('靓仔，你的代码循环引用了'))
        }
        // 判断callbackValue是不是Promise类型
        if (callbackValue instanceof MyPromise) {
            callbackValue.then(value => resolve(value), resaon => reject(resaon))
        } else {
            resolve(callbackValue)
        }
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

    // 静态方法，返回错误的Promise
    static reject(resaon) {
        if (resaon instanceof MyPromise) {
            return this.reject('[object Promise]')
        } else {
            // 如果不是promise对象，则重新创建一个
            return new MyPromise((resolve, reject) => {
                reject(resaon)
            })
        }
    }

    // all静态方法,有一个失败，直接返回失败，结果是按照传入的顺序返回
    static all(promises) {
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
                if (count === promises.length) {
                    resolve(result)
                }
            }
            // 循环处理要执行的任务
            promises.forEach((task, index) => {
                if (task instanceof MyPromise) {
                    task.then((v) => pushResult(index, v), (resaon) => reject(resaon))
                } else {
                    pushResult(index, promises[index])
                }
            })
        })
    }


    // 所有 Promises 都完成后（包含成功和失败）
    static allSettled(promises) {
        return new MyPromise((resolve) => {
            let results = []
            let count = 0
            promises.forEach((task, index) => {
                if (task instanceof MyPromise) {
                    task.finally(_ => {
                        count++
                        results[index] = {
                            status: task.status,
                            value: task.value || task.resaon
                        }
                        if (count === promises.length) {
                            resolve(results)
                        }
                    })
                } else {
                    count++
                    results[index] = {
                        status: 'fulfilled',
                        value: task
                    }
                    if (count === promises.length) {
                        resolve(results)
                    }
                }
            })
        })
    }

    // 有一个成功就返回
    static any(promises) {
        return new MyPromise((resolve) => {
            promises.forEach((task) => {
                if (task instanceof MyPromise) {
                    task.then(_ => {
                        resolve(task.value)
                    })
                } else {
                    resolve(task)
                }
            })
        })
    }

    // 有一个改变状态（成功或者失败）就返回
    static race(promises) {
        return new MyPromise((resolve) => {
            promises.forEach((task) => {
                if (task instanceof MyPromise) {
                    task.finally(_ => {
                        resolve(task.value || task.resaon)
                    })
                } else {
                    resolve(task)
                }
            })
        })
    }
}

MyPromise.defer = MyPromise.deferred = function () {
    let testObj = {}
    testObj.promise = new Promise((resolve, reject) => {
        testObj.resolve = resolve
        testObj.reject = reject
    })
    return testObj
}

module.exports = MyPromise