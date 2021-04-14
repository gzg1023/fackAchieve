/**
 * @desc 函数节流
 * @param func 函数
 * @param delay 延迟执行毫秒数
 * @param mustRunDelay 需要等待的时间
 */
function throttle(fn, delay, mustRunDelay) {
    let timer = null
    let t_start
    return function() {
      const context = this
      const args = arguments
      const t_curr = +new Date()
      clearTimeout(timer)
      if (!t_start) {
        t_start = t_curr
      }
      if (t_curr - t_start >= mustRunDelay) {
        fn.apply(context, args)
        t_start = t_curr
      } else {
        timer = setTimeout(function() {
          fn.apply(context, args)
        }, delay)
      }
    }
  }