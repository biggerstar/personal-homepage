<style>
li,p,a{
 font-weight: bold;
}
</style>


### 简介

原本的浏览器不支持直接查看和操作历史记录栈， 而该模块实现了当前window的浏览器记录栈的映射管理控制与功能拓展。

### 注意
模块被故意设置为仅支持当前window产生的历史记录管理，
如果有iframe也要管理，可以重新使用createHistoryManager创建一个用于专门管理iframe产生的历史记录

### 安装

使用 npm:

```shell
$ npm install history-stack-manager
```

使用 yarn:

```shell
$ yarn add history-stack-manager
```

使用 pnpm:

```shell
$ pnpm add history-stack-manager
```

---

### 快速上手

导入创建函数

```javascript
import {createHistoryManager} from 'history-stack-manager';
```

创建一个history管理器

```javascript
const history = createHistoryManager()
// 你也可以指定一个即将被接管window对象,比如iframe的window
// const history = createHistoryManager(window)
console.log(history)
```

Type类型定义

```javascript
export type HistoryOptions = {
  /** 该管理器历史记录类型标识 */
  type: '__HISTORY_DATA__' | string
  /** 非必要，浏览器的历史原因，传入空字符串就行了 */
  title: string
  /** 要持久化记录的state */
  state: any
  /** 要添加记录的对应url */
  url: string
  /** 要添加记录的滚动位置  */
  scrollY: number
  /** 当前记录的唯一id  */
  id: number
}
```

## Event API

### Support New Window Event

**HistoryEvent**

- url  `string; 当前页面地址`
- state `string; 当前state `
- title `string; 标题`
- manager `HistoryManagerImpl  虚拟管理器，同History API`

使用方式:

```javascript
// 监听window.history.pushState操作
window.addEventListener("historyPushState",()=>{})
// 监听window.history.replaceState操作
window.addEventListener("historyReplaceState",()=>{})
```

### Virtual History Manager Event API

**back event**
使用方式:

```javascript
// 监听浏览器后退
historyManaget.$on('back',(state)=>{})
```

**forward event**
使用方式:

```javascript
// 监听浏览器前进
historyManaget.$on('forward',(state)=>{})
```

**popstate event**
使用方式:

```javascript
//同浏览器popstate事件触发条件基本一致
historyManaget.$on('popstate',(state)=>{})
```

### History API

**back**

- desc  `后退`
- type `Function`
- args `empty`
- return `void`
  返回上一个页面，和原本浏览器内置管理器操作无任何差别

```javascript
history.back()   // 后退
```

**forward**

- desc  `前进`
- type `Function`
- args `empty`
- return `void`
  前往下一个页面，和原本浏览器内置管理器操作无任何差别

```javascript
history.forward()   // 前进
```

**go**

- desc  `前往当前页指定偏移记录`
- type `Function`
- args `[offset: number]`
- return `void`
  前往相对当前页指定偏移历史记录位置，和原本浏览器内置管理器操作无任何差别

```javascript
history.go(-1)  // 相当于history.back()
```

**pushState**

- desc  `添加一条历史记录`
- type `Function`
- args `[state: any, title:string, url:string]`
- return `void`
  针对浏览器内置管理器替换记录，和原本浏览器内置管理器操作无任何差别

```javascript
history.pushState({state:'data'},'','url')
```

**replaceState**

- desc  `替换一条历史记录`
- type `Function`
- args `[state: any, title:string, url:string]`
- return `void`
  针对浏览器内置管理器添加记录，和原本浏览器内置管理器操作无任何差别

```javascript
history.replaceState({state:'data'},'','url')
```

---

**length**

- desc  `当前内置管理器真实历史记录的条数`
- type `number`

**scrollRestoration**

- desc  `是否保持上次滚动位置`
- type `'auto' | 'manual'`

**state**

- desc  `pushState 或 replaceState 添加进的state`
- type `any`

**stack**

- desc  `映射当前window历史记录的后的栈数组`
- type `Array<HistoryOptions>`

**point**

- desc  `当前页面在历史记录中的游标位置，最低0，最高49，和stack数组的最大值有关，默认支持记录50条 `
- type `number`

**len**

- desc  `当前虚拟管理器记录的历史记录条数`
- type `number`

**history**

- desc  `当前虚拟管理器正在操控的历史记录`
- type `HistoryOptions`

**$on**

- desc  `事件监听`
- type `Function`

```javascript
const cb = (state)=>{}
historyManager.$on('back',cb)
```

**$off**

- desc  `事件关闭`
- type `Function`

```javascript
historyManager.$off('back',cb)
```

**$emit**

- desc  `手动发射事件`
- type `Function`

```javascript
historyManager.$emit('back',{a:123}})
```

**$clear**

- desc  `清除所有事件`
- type `Function`

```javascript
historyManager.$clear()
```

---

#### 高级操作函数(不建议在不了解的情况在使用，正常基本不会用到)

**replace**

- desc  `手动替换一条虚拟管理器的历史记录`
- type `Function`
- args `[history:HistoryOptions]`
- return `void`
  针对虚拟管理器替换记录，对内置管理器毫无影响，会破坏虚拟映射，不建议在不了解的情况使用

```javascript
const item = history.createHistory({state:'data'},'','url')
history.replace(item)
```

**push**

- desc  `手动添加一条虚拟管理器的历史记录`
- type `Function`
- args `[history:HistoryOptions]`
- return `void`
  针对虚拟管理器添加记录，对内置管理器毫无影响，会破坏虚拟映射，，不建议在不了解的情况使用

```javascript
const item = history.createHistory({state:'data'},'','url')
history.push(item)
```

**index**

- desc  `直接跳转到id值对应历史记录`
- type `Function`
- args `[id:number]`
- return `void`
  直接跳转到id值对应历史记录，目的主要时修改id，不建议在不了解的情况使用

```javascript
const item = history.stack[10]
history.index(item.id)
```

**createHistory**

- desc  `创建一个虚拟管理器专用的历史记录`
- type `Function`
- args `[state: any, title:string, url:string]`
- return `void`
  创建一个虚拟管理器专用的历史记录，该history可以通过push函数或者replace函数加入虚拟管理器

```javascript
const item = history.createHistory({state:'data'},'','url')
history.push(item)
```

---

### 解释：

1. 内置管理器: 平常使用的`window.history`对象
2. 虚拟管理器: 该模块创建的`history`对象，模块可以直接当成离线的内置管理器使用，
   同时提供了拓展，支持记录当前`window`页面产生的所有历史记录，提供`stack`属性作为映射
   支持监听浏览器的前进后退操作

### 原理：

简称: 可识别记录 => 可被该虚拟管理器识别的history
<br/>`实现了监听记录当前window中所有产生的历史记录`，支持`映射`历史记录栈和浏览器的`后退`和`前进`事件
<br/>1.在首次进入页面的时候记录并替换成可识别记录
<br/>2.通过监听`popstate`，在此基础上的所有的记录操作符合浏览器内置规则，在事件回调里面通过规则判断是否前往了新的url
<br/>如果有则在合适时候将其state替换成可识别记录，并在每次历史记录操作的时候同步到`sessionStorage`中(详见syncHistory文件)
<br/>3.通过拦截`pushState`和`replaceState`的window.history操作，因为该操作不会触发`popstate`需要单独处理，拦截后也在合适时机替换成可识别记录


