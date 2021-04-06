
/**
 * @description 获取url的参数
 * 参数 可能是在index.html后面也可能是在路由#的后面
*/

function getUrlData(){
    let url = window.location.search ? 
    window.location.search.substr(1).split('&') : 
    window.location.hash.substr(window.location.hash.indexOf('?')+1).split('&') 
    let urlObj = {}
    for(let keys in url){
        let urlItem = url[keys].split('=')
        urlObj[urlItem[0]] = decodeURI(urlItem[1])
    }
 return urlObj
}

// 获取参数对象
getUrlData()

