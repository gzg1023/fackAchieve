
// 保存传入的Vue实例
export let _Vue = null
import Link from "./components/Link";
import View from "./components/View";
export default function install(Vue) {
    _Vue = Vue
    _Vue.mixin({
        beforeCreate() {
            // 跟实例
            if (this.$options.router) {
                this._routerRoot = this
                this._router = this.$options.router
                this._router.init(this)
                _Vue.util.defineReactive(this, '_route', this._router.history.current)
            } else /* 组件*/ {
                this._routerRoot = this.$parent && this.$parent._routerRoot
            }
        }
    })
    _Vue.component(View.name,View)
    _Vue.component(Link.name,Link)
    Object.defineProperty(Vue.prototype, '$router', {
        get () { return this._routerRoot._router }
      })

    Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
    })
}