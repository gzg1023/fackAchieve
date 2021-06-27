
import install from './install'
import createMacher from './create-macher';
import HTML5History from "./history/html5";
import HashHistory from "./history/hash";
export default class VueRouter {
    constructor(options) {
        this._routes = options.routes || []
        this.matcher = createMacher(this._routes)
        let mode = options.mode || 'hash'
        this.mode = mode
        this.push = this.push
        switch (mode) {
            case 'history':
                this.history = new HTML5History(this, options.base)
                break;
            case 'hash':
                this.history = new HashHistory(this, options.base, this.feedback)
                break;
            default:
                throw new Error('type Error: mode is not a goog value')
        }
    }

    init(app) {
        const history = this.history

        history.listen((current)=>{
            app._route = current
        })

        history.transitionTo(
            history.getCurrentLocation(),
            () => {
                history.setUpListener()
            }
        )
    }

    push(path) {
        if (this.mode === 'hash') {
            location.hash = '/' + path
        } else {
            location.pathname = path
        }
    }
}
VueRouter.install = install