# Rluy

一款极其轻量级的究极形态状态管理封装库，基于 Redux + Redux-saga

# Rluy 概念

Rluy 中有几个概念大家必须了解，否则你会觉得没头没脑

### 目录规范

制定目录规范的原因是：
- 规定开发人员必须按照规范来写，代码未写，规范先行，极其有利于降低沟通成本
- 实现自动加载机制，自动加载page(页面)、model

```bash
#目录示范 
src
|
|-index.js #启动页
|-router.js #router.js路由
|-page # 目录名字必须是page为了实现自动加载
|   |-login # 会被加载为Component['login']
|      |-index.js
|   
|   |-admin # 会被加载为Component['admin']
|      |-index.js
|
|-model # 目录名字必须是model
|   |-login.js
|   |-admin.js

```

### App启动
```js
//index.js
import { App } from 'rluy'

App.router(require('./router'))//router文件引入

App.onError(e => {
    //全局错误
    console.log('发生错误', e)
})

//第一个参数：挂载的 DOM元素
//第二个参数：是否开启debug模式
App.run(document.getElementById('root'),true)
```
简单的三行代码，就已经完成了 App 启动，无需再写一堆 Redux, Connect，createStore 等，比 DVA 更进一步的是，我们的 Router 和 Model 是根据文件自动加载的。

### router

router 即是路由，在 Rluy 中，router 是一个函数，require 后，插入 ```App.router()``` 中

```js
//router.js
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

export default component => {
    return (
        <Router>
            <div>
                <Route path="/login" component={component['login']} />
                <Route path="/admin" component={component['admin']} />
            </div>
        </Router>
    )
}
```
在router中，你需要导出一个函数，这个函数包含一个参数 component ，这是一个自动加载进来的对象，以 key-value 形式存储了 page 中的每个页面.



### model

抄袭自 DVA ，其实我以前把它叫做 Container (容器)。Model 作为一个状态管理中心，管理了包括 effects (副作用)、state (初始化状态)、reducer (拆分的局部状态)，熟悉 DVA 的同学一定不陌生。

```javascript
//admin.js
export default {
    state: {
        count: 0
    },
    reducer: {
        mapCount(state, { payload }) {
            return { ...state, count: payload }
        }
    },
    effects: {
        *Increase({ fork, take, select, call, put, race, takeEvery, takeLatest }, { payload }) {
            yield put({ type: 'mapCount', payload })
        }
    }
}
```

这个 model 是自动加载的，无需用户手动添加，其命名空间，会以 model的文件名作为 key 拆分在 redux 中。

```js
//    page/admin.js

const RluyComponent = (props)=>{

    return <div>{props.count}</div>
}

const mapState = (state) =>{
    return {
        ...state.admin
    }
}

export default connect(mapState)(RluyComponent)
```
通过这样，就能够将 model/admin.js 下的状态插入到页面中

### 自动加载机制

要使用自动加载机制，我们必须得和 webpack 配合，在任意一个 webpack.config.js 中，引入 Rluy 的配置

```js
 module: {
    rules: [
      {
        test: /rluyconfig/,
        use: [
          {
            loader: require.resolve('rluy/RluyLoader.js')
          }
        ]
      }]
 }

```

***值得注意的是，这个配置必须在 babel-loader之前应用，否则不会生效***



# LICENSE

@MIT
