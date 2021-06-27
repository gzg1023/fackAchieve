import createRoute from "../util/route";
export default class History {
    constructor(router) {
        this.router = router
        // 当前路由对象。通过match创建的对象
        this.current = createRoute(null, '/')
        this.callback = null
    }

    /**
     * 路由跳转函数
     * @param {*} path 要跳转的路径
     * @param {*} onComplete 回调函数
     */
    transitionTo(path, onComplete) {
        this.current = this.router.matcher.match(path)
        this.callback && this.callback(this.current)
        onComplete && onComplete()
    }


    listen(callback){
        this.callback = callback
    }
}