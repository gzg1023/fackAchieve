<p align="center">
  <a href="https://github.com/gzg1023/fackAchieve">
    <img src="https://img.shields.io/badge/手写-ES6-pink.svg">
  </a>
  <a href="https://github.com/gzg1023/fackAchieve">
    <img src="https://img.shields.io/badge/手写-Promise-blue.svg" ">
  </a>
  <a href="https://github.com/gzg1023/fackAchieve">
    <img src="https://img.shields.io/badge/模拟-lodash-green.svg" ">
  </a>
  <a href="https://github.com/gzg1023/fackAchieve">
    <img src="https://img.shields.io/badge/js-数据结构-blue.svg" >
  </a>
</p>

# fackAchieve

手写 es6 函数，Promise 特性，lodash 库的函数实现,模拟 vue,React 等前端框架的实现和原理的理解。

## functions 文件夹

手动实现各种函数，包括不限于 ES6 等函数的方法

### 内容对应表

#### Array

| 方法名称(name) | 位置(position)                                             | 作用(effect) |
| :------------- | :--------------------------------------------------------- | :----------: |
| forEach        | [functions/Array/forEach.js](functions/Array/forEach.js)   |      --      |
| every          | [functions/Array/every.js](functions/Array/every.js)       |      --      |
| some           | [functions/Array/some.js](functions/Array/some.js)         |      --      |
| filter         | [functions/Array/filter.js](functions/Array/filter.js)     |      --      |
| find           | [functions/Array/find.js](functions/Array/find.js)         |      --      |
| reduce         | [functions/Array/reduce.js](functions/Array/reduce.js)     |      --      |
| map            | [functions/Array/map.js](functions/Array/map.js)           |      --      |
| flat           | [functions/Array/flat.js](functions/Array/flat.js)         |      --      |
| includes       | [functions/Array/includes.js](functions/Array/includes.js) |      --      |

#### Object

| 方法名称(name) | 位置(position)                                                         |    作用(effect)    |
| :------------- | :--------------------------------------------------------------------- | :----------------: |
| assign         | [functions/Object/assign.js](functions/Object/assign.js)               |         --         |
| reverseAssign  | [functions/Object/reverseAssign.js](functions/Object/reverseAssign.js) |    逆向 assign     |
| orderAssign    | [functions/Object/orderAssign.js](functions/Object/orderAssign.js)     | 逆向 reverseAssign |

#### utils

| 方法名称(name) | 位置(position)                                                 | 作用(effect)  |
| :------------- | :------------------------------------------------------------- | :-----------: |
| memoize        | [functions/utils/memoize.js](functions/utils/memoize.js)       |   缓存结果    |
| curry          | [functions/utils/curry.js](functions/utils/curry.js)           |    柯里化     |
| compose        | [functions/utils/compose.js](functions/utils/compose.js)       |   合并函数    |
| getType        | [functions/utils/getType.js](functions/utils/getType.js)       |   判断类型    |
| isEqual        | [functions/utils/isEqual.js](functions/utils/isEqual.js)       |  判断值相等   |
| deepClone      | [functions/utils/deepClone.js](functions/utils/deepClone.js)   |    深拷贝     |
| getUrlData     | [functions/utils/getUrlData.js](functions/utils/getUrlData.js) | 获取 url 参数 |
| debounce       | [functions/utils/debounce.js](functions/utils/debounce.js)     |   函数防抖    |
| throttle       | [functions/utils/throttle.js](functions/utils/throttle.js)     |   函数节流    |

## feature 文件夹

手动实现各种 ES6 新特性

| 方法名称(name) | 位置(position)                                                   |         描述(desc)         |
| :------------- | :--------------------------------------------------------------- | :------------------------: |
| MyPromise      | [feature/attribute/MyPromise.js](feature/attribute/MyPromise.js) |    符合 A+规范的 Promise 实现     |
| call           | [feature/method/call.js](feature/method/call.js)                 |       手写 call 函数       |
| apply          | [feature/method/apply.js](feature/method/apply.js)               |      手写 apply 函数       |
| bind          | [feature/method/bind.js](feature/method/bind.js)               |      手写 bind 函数       |
| new            | [feature/method/new.js](feature/method/new.js)                   |        new 构造方法        |
| instanceof     | [feature/method/instanceof.js](feature/method/instanceof.js)     |      instanceof 方法       |

## framework 文件夹

模拟 vue,React 等前端框架，了解原理

| 方法名称(name) | 位置(position)                        | 描述(desc) |
| :------------- | :------------------------------------ | :--------: |
| vue            | [framework/vue/mini-vue](framework/vue/mini-vue/vue.js) |  mini vue  |
| vue-router      | [framework/vue/mini-vue-router](framework/vue/mini-vue-router/index.js) |  mini vue-router  |
| react          | [framework/react](framework/react)    | mini react |

## dataStructure 文件夹

手动实现各种数据结构

| 结构名称(name) | 位置(position)                                               | 描述(desc) |
| :------------- | :----------------------------------------------------------- | :--------: |
| Stack          | [dataStructure/Stack/index.js](dataStructure/Stack/index.js) |   栈结构   |
| Queue          | [dataStructure/Queue/index.js](dataStructure/Queue/index.js) |  队列结构  |
