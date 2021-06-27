import History from "./base"

export default class hashHistory extends History{
    constructor(router){
        super(router)
        // 修正浏览器地址栏。改为/#/
        this.ensureSlash()
    }
    

    ensureSlash(){
        if(location.hash){
            return
        }else{
            location.hash = '/'
        }
    }
    // 返回当前路由地址,去除#符号
    getCurrentLocation(){
        return location.hash.substr(1)
    }

    // 设置hash监听
    setUpListener(){
        window.addEventListener('hashchange',() =>{
            this.transitionTo(this.getCurrentLocation())
        })
    }
}