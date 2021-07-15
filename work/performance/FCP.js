/**
 * First Contentful Paint
 * 首屏时间计算
 */
class FCP {
    static details = []
    static ignoreEleList = ['script', 'style', 'link', 'br']
    constructor() {
    }
    static isEleInArray(target, arr) {
        if (!target || target === document.documentElement) {
            return false;
        }
        else if (arr.indexOf(target) !== -1) {
            return true;
        }
        else {
            return this.isEleInArray(target.parentElement, arr);
        }
    }
    static isInFirstScreen(target) {
        if (!target || !target.getBoundingClientRect)
            return false;
        var rect = target.getBoundingClientRect(), screenHeight = window.innerHeight, screenWidth = window.innerWidth;
        return rect.left >= 0
            && rect.left < screenWidth
            && rect.top >= 0
            && rect.top < screenHeight;
    }

    static getFCP() {
        return new Promise((resolve, reject) => {
            // 5s之内先收集所有的dom变化，并以key（时间戳）、value（dom list）的结构存起来。
            var observeDom = new MutationObserver((mutations) => {
                if (!mutations || !mutations.forEach)
                    return;
                var detail = {
                    time: performance.now(),
                    roots: []
                };
                mutations.forEach((mutation) => {
                    if (!mutation || !mutation.addedNodes || !mutation.addedNodes.forEach)
                        return;
                    mutation.addedNodes.forEach((ele) => {
                        if (ele.nodeType === 1 && this.ignoreEleList.indexOf(ele.nodeName.toLocaleLowerCase()) === -1) {
                            if (!this.isEleInArray(ele, detail.roots)) {
                                detail.roots.push(ele);
                            }
                        }
                    });
                });
                if (detail.roots.length) {
                    this.details.push(detail);
                }
            });
            observeDom.observe(document, {
                childList: true,
                subtree: true
            });
            setTimeout(() => {
                observeDom.disconnect();
                resolve(this.details);
            }, 5000);
        }).then((details) => {
            // 分析上面收集到的数据，返回最终的结果
            var result;
            details.forEach((detail) => {
                for (var i = 0; i < detail.roots.length; i++) {
                    if (this.isInFirstScreen(detail.roots[i])) {
                        result = detail.time;
                        break;
                    }
                }
            });
            // 遍历当前请求的图片中，如果有开始请求时间在首屏dom渲染期间的，则表明该图片是首屏渲染中的一部分，
            // 所以dom渲染时间和图片返回时间中大的为首屏渲染时间
            window.performance.getEntriesByType('resource').forEach(function (resource) {
                if (resource.initiatorType === 'img' && (resource.fetchStart < result || resource.startTime < result) && resource.responseEnd > result) {
                    result = resource.responseEnd;
                }
            });
            return result;
        });
    }
}


/**
 * FCP.getFCP().then(fst => {
        console.log('首屏时间' + fst + 'ms')
    })
 */