import History from "./base"

export default class HTML5History extends History{
    constructor(router){
        super(router)
    }
    

    // 返回当前路由地址,去除#符号
    getCurrentLocation(){
        return location.pathname
    }

    // 设置history监听
    setUpListener(){
        window.addEventListener('popstate',() =>{
            this.transitionTo(this.getCurrentLocation())
        })
    }
}