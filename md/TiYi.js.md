<style>
li,p,a{
 font-weight: bold;
}
tr,th,td{
  border: gray solid 1px;
  text-align: center;
  padding: 0 10px;
}
</style>


TiYi目标是建立是一款基于纯 iframe 的渐进式微前端框架，具备功能强大，原生隔离，使用灵活，加载速度快等优点。

框架正在建设中...

### 当前进度:

| 包名                | 集成方式 | 进度       | 功能介绍                                                      |
|-------------------|------|----------|-----------------------------------------------------------|
| tiyi-code         | 内置   | 已完成      | 太乙核心,用于多个微应用运行支持                                          |
| tiyi-core-yang    | 内置   | 已完成      | 太乙•阳支持,为iframe进行多方面的增强                                    |
| tiyi-core-yin     | 插件   | 已完成      | 太乙•阴支持,完全的js隔离，子应用无法获取父应用的任何数据                            |
| tiyi-share        | 插件   | 已完成      | 资源共享中心，用于微应用数据和加载的资源共享,例如有多个微应用使用同一版本vue或react，只需要加载一次就行了 |
| tiyi-core-history | 内置   | 开发中（60%） | 太乙历史记录支持，用于支持微应用正常前进后退和保持页面状态                             |
| tiyi-router       | 插件   | 开发中（0%）  | 太乙路由支持,借鉴express.js路由方式,用于在不同的路由下加载不同的插件和逻辑               |

### 特性

功能强大
- 支持应用数据共享
- 支持多应用共存
- 支持广播通信和父子定向通信
- 支持生命周期钩子
- 支持插件系统
- 支持 vite 框架
- 支持子应用嵌套(TODO)
- 支持子应用状态保持(TODO)

使用灵活
- 根据不同的路由实现不同功能
- 模拟浏览器行为,通过子应用`goto`函数平替浏览器地址栏加载资源

数据共享
- 多微应用加载同一远程资源只会加载一次
- 数据可以在多应用间共享

原生隔离
- `css`和`js`都运行在 iframe 中实现更严格的原生隔离
- 通过代理拦截运行js代码，实现子应用完全隔离于父应用，获取不到任何父应用数据

## 使用示例

### 基本使用

```ts
import {createMicroApp, TIYI} from 'tiyi'

const app = createMicroApp()
app.mount('#ti-app')

// 1. 加载远程资源
app.goto("https://localhost:11000/page#test1")  // 前往某个地址
settimeout(()=>{
   console.log(app.url)
   app.goto("#test2")  // 模拟浏览器地址栏，比如修改hash只会跳转hash并触发 hashchange 和 popstate事件
})

// 2. 手动加载文本或HTML
app.html('我是一段文本')
app.html('<h1>我是一段HTML文本<h1>')
app.html(()=> <h1>我是一段函数返回的HTML文本<h1>})
app.html(async ()=> <h1>我是一段异步函数返回的HTML文本<h1>})
```

### 使用插件

```ts
// 做到完全的js沙箱隔离
import {createCoreYin} from 'tiyi'

app.use(createCoreYin())   // mount前添加插件
```

### 使用太乙•阴(硬隔离)

```ts
// 做到完全的js沙箱隔离
import {createCoreYin} from 'tiyi'

app.use(createCoreYin())   // mount前添加插件
```

### 使用广播

```ts
app1.broadcast.$emit('customEvnentName',{data:'xxx'})

app2.broadcast.$on('customEvnentName',（data）=>{})
```

### 使用bus父子通信

```ts
import {getMicroApp} from 'tiyi'
const app = getMicroApp('name')

app.bus.$emit('customEvnentName',{data:'xxx'})
app.bus.$on('customEvnentName',（data）=>{})
```

### 全局API

```ts
import {
  getAppCaches，
  getAppCache，
  setAppCache，
  getMicroApps，
  getMicroApp，
} from 'tiyi'
```

## 插件钩子

### 主应用

```ts
interface TiYiPlugin {
    /** 插件优先级，支持负数 */
    priority: number

    /** 连接到微应用的时候触发 */
    onMicroAppConnect?(event: TiEventTargetType<TiYiApp, MicroApp>): void

    /** 微应用销毁的时候触发  */
    onMicroAppDestroy?(event: TiEventTargetType<TiYiApp, MicroApp>): void

    /** 浏览器前进的时候触发  */
    onMicroAppForward?(event: TiEventTargetType<TiYiApp, MicroApp>): void

    /** 浏览器后退的时候触发  */
    onMicroAppBack?(event: TiEventTargetType<TiYiApp, MicroApp>): void
  }
```

### 子应用

```ts
interface MicroAppPlugin {
    /** 插件优先级，支持负数 */
    priority: number

    /** iframe元素加载到网页节点之前运行，此时框架还未操作dom，运行时机在mount操作后该事件立马被触发  */
    onInstall?(event?: TiEventTargetType<MicroApp>): void;

    /** iframe元素成功加载到网页节点之后运行，此时已经能获取到iframe元素和iframe中的window  */
    onInstalled?(event?: TiEventTargetType<MicroApp>): void;

    /** 监听app.goto 函数运行和其前往的新地址，如果要修改到新地址可以在回调函数中修改app.url就行,
     *  此时能获取到子应用的window，但是不能获得最新document(之前的文档已被销毁)
     *  */
    onGoto?(event?: TiEventTargetType<MicroApp, string>): void;

    /**
     * 监听app.html 函数运行和其前往的新地址，能获取到子应用的window，但是不能获得最新document
     *  */
    onHtml?(event?: TiEventTargetType<MicroApp, string>): void;

    /** 子应用的连接事件，运行app.html 或者app.goto函数后在连接到子应用window中的时候触发，能获取到最新的window或者document  */
    onConnect?(event?: TiEventTargetType<MicroApp>): void;

    /** 加载文本或者html到子应用中  */
    onLoadHTML?(event?: TiEventTargetType<MicroApp, string>): void;

    /** 设置url，支持短路径加载，比如 /aa/bb 或者 #hash 直接改变锚点，
     * 该函数遵循location.href一致的规则，部分条件下会触发popstate和hashchange事件
     * 主要逻辑是:
     * 1.url没hash前往该地址(和goto效果一致)；
     * 2.url有hash则且当前url和之前一样只改变hash和跳转对应锚点
     * */
    onNodeScheduler?(event?: TiEventTargetType<MicroApp, NodeProcessorForProcessOption>): void;

    onLoad?(event?: TiEventTargetType<MicroApp>): void;

    /** TODO */
    obBeforeDestroy?(event?: TiEventTargetType<MicroApp>): void;

    onDestroyed?(event?: TiEventTargetType<MicroApp>): void;

    /** 子应用调用history.pushState触发  */
    onPushState?(event?: TiEventTargetType<MicroApp, TiHistoryOption>): void;

    /** 子应用调用history.replaceState触发  */
    onReplaceState?(event?: TiEventTargetType<MicroApp, TiHistoryOption>): void;
  }
```

<br/>

### 当前框架建设中，未来继续完善框架功能和更多文档，敬请期待......
