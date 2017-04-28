#### 1.为什么使用React还需要使用别的框架来搭配？
React的核心是使用组件定义界面的表现，是一个View层的前端库，那么在使用React的时候我们通常还需要一套机制去管理组件与组件之间，组件与数据模型之间的通信。

#### 2.为什么使用Redux？
随着 JavaScript 单页应用开发日趋复杂，**JavaScript 需要管理比任何时候都要多的 state （状态）**。 这些 state 可能包括服务器响应、缓存数据、本地生成尚未持久化到服务器的数据，也包括 UI 状态，如激活的路由，被选中的标签，是否显示加载动效或者分页器等等。
Redux就是来帮你解决这些问题的,使用Redux来方便的管理你的state。

#### 3.什么情况下需要使用Redux?
如果你的UI层非常简单，没有很多互动，Redux 就是不必要的，用了反而增加复杂性。
Redux 的适用场景：**多交互**、**多数据源**。

#### 4.Redux三大原则

###### (1):单一数据源
**整个应用的 state被储存在一棵 object tree 中，并且这个 object tree只存在于唯一一个store中。**
这让同构应用开发变得非常容易。来自服务端的 state 可以在无需编写更多代码的情况下被序列化并注入到客户端中。由于是单一的 state tree ，调试也变得非常容易。在开发中，你可以把应用的 state 保存在本地，从而加快开发速度。此外，受益于单一的 state tree ，以前难以实现的如“撤销/重做”这类功能也变得轻而易举。

###### (2):State 是只读的
**惟一改变 state 的方法就是触发action，action 是一个用于描述已发生事件的普通对象。**
这样确保了视图和网络请求都不能直接修改 state，相反它们只能表达想要修改的意图。

###### (3):使用纯函数来执行修改
**为了描述 action 如何改变 state tree ，你需要编写reducers**
Reducer 只是一些纯函数，它接收先前的 state 和 action，并返回新的 state。刚开始你可以只有一个 reducer，随着应用变大，你可以把它拆成多个小的 reducers，分别独立地操作 state tree 的不同部分，因为 reducer 只是函数，你可以控制它们被调用的顺序，传入附加数据，甚至编写可复用的 reducer 来处理一些通用任务，如分页器。
****

#### 5.图解React+Redux工作流程

![](http://upload-images.jianshu.io/upload_images/2701853-53d24d86b2507534.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
首先，用户发出** Action**,
```
store.dispatch(action);
```
然后**Store** 自动调用 **Reducer**，并且传入两个参数：当前 **State** 和收到的 **Action**。 **Reducer** 会返回新的 **State** ,最后重新渲染**View**。
```
let nextState = todoApp(previousState, action);
```
****
##### 下面让我们来开始创建React+Redux应用
[github](https://github.com/ToNiQian/redux-example)
[demo](http://toniqian.com/redux-example/example/)
[redux中文文档](http://cn.redux.js.org/?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)

###### 目录结构图
![](http://upload-images.jianshu.io/upload_images/2701853-e92bb4ea2aeae466.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

****

github上面获取源码之后,安装所需要的插件
```
npm install
```

提取开发环境公共js,如react, react-dom
```
npm run vendor
```

运行开发环境
```
npm run start
```
提取生产环境公共js,如react, react-dom
```
npm run prod-vendor
```

运行生产环境,生成dist
```
npm run prod
```


#### 一、创建Action
State 的变化，会导致 View 的变化。
但是，**用户接触不到 State，只能接触到 View**。
所以，State 的变化必须是 View 导致的。
**Action 就是 View 发出的通知**，表示 State 应该要发生变化了。
Action 是一个对象。其中的type属性是**必须**的，表示 Action 的名称

Action向Store派发指令，action 函数会返回一个带有 type 属性的 Javascript Plain Object，store将会根据不同的action.type来执行相应的方法。

它是 store 数据的**唯一**来源。
一般来说你会通过**store.dispatch() **将 action 传到 store。

**Action 创建函数** 就是生成 action 的方法。
View 要发送多少种消息，就会有多少种 Action。
如果都手写，会很麻烦。
可以定义一个函数来生成 Action，这个函数就叫**Action 创建函数**。

*注:**“action”** 和** “action 创建函数”** 这两个概念很容易混在一起，使用时最好注意区分。*
```
/************改变state状态的行为我们记录为action*********************/

/*
 * action 类型
 */

export const ADD_TODO = 'ADD_TODO';//添加列表
export const COMPLETE_TODO = 'COMPLETE_TODO';//列表完成
export const DEL_TODO = 'DEL_TODO';//删除列表
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';//过滤列表

/*
 * 过滤列表的几个属性
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',//显示全部
  SHOW_COMPLETED: 'SHOW_COMPLETED',//显示完成的
  SHOW_ACTIVE: 'SHOW_ACTIVE'//显示未完成的
};

/*
 * action 创建函数
 */

/**
 * 添加列表行为
 * @param {[type]} text [description]
 */
export function addTodo(text) {
  return { type: ADD_TODO, text }
}

/**
 * 完成列表行为
 * @param {[type]} text [description]
 */
export function completeTodo(index) {
  return { type: COMPLETE_TODO, index }
}

/**
 * 删除列表行为
 * @param {[type]} text [description]
 */
export function delTodo(index) {
  return { type: DEL_TODO, index }
}

/**
 * 过滤列表行为
 * @param {[type]} text [description]
 */
export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}
```
***
#### 二、创建reducer
Store 收到 Action 以后，必须给出一个**新的 State**，这样 View 才会发生变化。这种 State 的计算过程就叫做 **Reducer**。
**Reducer** 是一个函数，它接受 Action 和当前 State 作为参数，**返回一个新的 State**。
Redux有且只有一个State状态树，为了避免这个状态树变得越来越复杂，Redux通过 **Reducers**来负责管理整个应用的State树，而Reducers可以被分成一个个**Reducer**。
Action只是描述了**有事情发生了**这一事实，并没有指明应用如何更新 state。而这正是 Reducer 要做的事情。
***
Reducer 函数负责生成 State。
由于整个应用只有**一个 State** 对象，包含所有数据，对于大型应用来说，这个 State 必然十分庞大，导致 Reducer 函数也十分庞大。

Redux 提供了一个**combineReducers**方法，用于 Reducer 的**拆分**。
你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。
```
/**
 * 合并2个reducer
 * @type {[type]}
 */
const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp
```
***
**注:
1.定义reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。
2.不用直接去修改state,而是返回新的对象,时刻谨记永远不要在克隆 state 前修改它
3.每个 reducer 只负责管理全局 state 中它负责的一部分。
每个 reducer 的 state 参数都不同，分别对应它管理的那部分 state 数据
4.在 default情况下返回旧的 state。遇到未知的 action 时，一定要返回旧的 state**
***
```
import { combineReducers } from 'redux'
/**引入action类型**/
import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER,DEL_TODO,VisibilityFilters } from '../actions'
const { SHOW_ALL } = VisibilityFilters

/******定义reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。*******/
/******不用直接去修改state,而是返回新的对象,时刻谨记永远不要在克隆 state 前修改它。*******/
/***********...扩展运算符相当于克隆一个新的对象出来**************/
/************注意每个 reducer 只负责管理全局 state 中它负责的一部分。
每个 reducer 的 state 参数都不同，分别对应它管理的那部分 state 数据。******/

/**
 * 定义过滤方法
 * 默认都返回状态自身 过滤条件默认为show all
 * @param  {[type]} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    break;
    default:
      return state;
    break;
  }
}

/**
 * 定义处理列表的方法,包括添加,完成,删除列表
 * 根据action.type去判断不同的行为 默认都返回state自身
 * @param  {Array}  state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
function todos(state = [], action) {
  switch (action.type) {
    /**添加列表 返回自身,加上一个新的对象*/
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    break;
    /**
     * 完成列表 当前需要完成的列表completed属性变为true
     * @type {[type]}
     */
    case COMPLETE_TODO:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          completed: true
        }),
        ...state.slice(action.index + 1)
      ]
    break;
    /**
     * 删除列表
     * @type {[type]}
     */
    case DEL_TODO:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ]
    break;
    default:
      return state
    break;
  }
}

/**
 * 合并2个reducer
 * @type {[type]}
 */
const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp
```
实际应用中，Reducer 函数不用手动调用，**store.dispatch**
方法会触发 Reducer 的自动执行。
为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入createStore方法
```
import { createStore } from 'redux';
const store = createStore(reducer);
```
上面代码中，createStore接受 Reducer 作为参数，生成一个新的 Store。以后每当**store.dispatch**发送过来一个新的 Action，就会**自动调用** Reducer，得到新的 State。
***
#### 三、创建Store
**Store** 就是把action和reducer联系到一起的对象。
**Store** 就是保存数据的地方，你可以把它看成一个容器。
整个应用只能有**一个** Store。
**Store** 有以下职责：
维持应用的 State；
提供 [getState()
](http://cn.redux.js.org/docs/api/Store.html#getState) 方法获取 state；
提供 [dispatch(action)
](http://cn.redux.js.org/docs/api/Store.html#dispatch) 方法更新 state；
通过 [subscribe(listener)
](http://cn.redux.js.org/docs/api/Store.html#subscribe) 注册监听器;
通过 [subscribe(listener)
](http://cn.redux.js.org/docs/api/Store.html#subscribe) 返回的函数注销监听器。
Redux 提供**createStore**这个函数，用来生成 Store。
```
import { createStore } from 'redux';
import todoApp from '../reducers';
import * as actionCreators from '../actions';

/**
 * 创建store
 * @param  {[type]} initialState [description]
 * @return {[type]}              [description]
 */
export default function configureStore(initialState) {
  const store = createStore(todoApp, initialState,
    //redux调试代码
    window.devToolsExtension && window.devToolsExtension({ actionCreators })
  );

  //热加载,及时跟新reducer
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
```
***

#### 四、搭配React
我把React组件理解为**智能组件**和**木偶组件**。
**智能组件**，会通过**react-redux**函数提供的**connect**函数把**state**和**actions**转换为旗下木偶组件所需要的**props**。
**木偶组件**，各司其职，没有什么关于**actions**和**stores**的依赖，拿出项目中也可独立使用，甚至可以和别的**actions**，**stores**进行绑定。

##### 4.1智能组件(containers)
智能组件由木偶组件组成,可以理解为**顶层组件**和**组合组件**。

明智的做法是只在**最顶层组件**（如路由操作）里使用 **Redux**。其余内部组件仅仅是展示性的，所有数据都通过 **props** 传入。
接着，我们想要通过 [react-redux
](http://github.com/reactjs/react-redux) 提供的 **connect()**方法将包装好的组件连接到Redux。
尽量只做一个顶层的组件，或者 route 处理。从技术上来说你可以将应用中的任何一个组件 connect()到 Redux store 中，但尽量避免这么做，因为这个数据流很难追踪。

**任何一个从 connect()包装好的组件都可以得到一个 [dispatch
](http://cn.redux.js.org/docs/api/Store.html#dispatch) 方法作为组件的 props，以及得到全局 state 中所需的任何内容。**

**connect()**的唯一参数是 **selector**。
此方法可以从 Redux store 接收到全局的 state，然后返回组件中需要的 props。
最简单的情况下，可以返回一个初始的 state（例如，返回认证方法），但最好先将其进行转化。
为了使组合 selectors 更有效率，不妨看看 [reselect](https://github.com/faassen/reselect)。

```
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
/** 引入action方法 */
import { addTodo, completeTodo,delTodo,setVisibilityFilter,VisibilityFilters } from '../actions'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import Footer from '../components/Footer'

/*************明智的做法是只在最顶层组件（如路由操作）里使用 Redux。
其余内部组件仅仅是展示性的，所有数据都通过 props 传入。*********/

/**
 * 组合组件
 * 明智的做法是只在最顶层组件（如路由操作）里使用 Redux。
 * 其余内部组件仅仅是展示性的，所有数据都通过 props 传入。
 */
class App extends Component {
  render() {
    // Injected by connect() call:
    const { dispatch, visibleTodos, visibilityFilter } = this.props;
    /**
     * 调用AddTodo 组件 传递onAddClick方法
     * 调用TodoList组件 传递todos集合 onTodoClick方法 onTodoDel方法
     * 调用Footer组件 传递filter属性 onFilterChange方法
     * @param  {[type]} text [description]
     * @return {[type]}      [description]
     */
    return (
      <div>
        <AddTodo
          onAddClick={text =>{
            dispatch(addTodo(text))
          }} />
        <TodoList
          todos={visibleTodos}
          onTodoClick={index =>
            dispatch(completeTodo(index))
          } onTodoDel={index=>
            dispatch(delTodo(index))
          } />
        <Footer
          filter={visibilityFilter}
          onFilterChange={nextFilter =>
            dispatch(setVisibilityFilter(nextFilter))
          } />
      </div>
    )
  }
}

App.propTypes = {
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}

/**
 * 根据filter过滤列表
 * @param  {[type]} todos  [description]
 * @param  {[type]} filter [description]
 * @return {[type]}        [description]
 */
function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed)
  }
}

// 基于全局 state ，哪些是我们想注入的 props ?
// 把state.todos 获取到然后过滤成我们想要的数据,转换成visibleTodos
// 注意：使用 https://github.com/reactjs/reselect 效果更佳
function select(state) {
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(App)
```

##### 4.2木偶组件
以下的这些组件（和它们的 props ）就是从这个设计里来的：
**1.AddTodo:** 输入字段的输入框和按钮。
*onAddClick(text: string):* 当按钮被点击时调用的回调函数。

```
import React, { Component, PropTypes } from 'react'

/**
 * 添加列表组件
 */
export default class AddTodo extends Component {
  render() {
    return (
      <div>
        <input type='text' ref='input' />
        <button onClick={(e) => this.handleClick(e)}>
          Add
        </button>
      </div>
    )
  }
  /**
   * 添加列表事件
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  handleClick(e) {
    const node = this.refs.input;
    const text = node.value.trim();
    //如果添加值为空,则不添加
    if(text===''){
      return false;
    }
    //调用父组件传递过来的添加行为
    this.props.onAddClick(text)
    node.value = ''
  }
}

AddTodo.propTypes = {
  onAddClick: PropTypes.func.isRequired
}
```

**2.TodoList:** 用于显示 todos 列表。
*todos:*  Array以 { text, completed }形式显示的 todo 项数组。
*onTodoClick(index: number):*   当 todo 项被点击时调用的回调函数。
```
import React, { Component, PropTypes } from 'react'
import Todo from './Todo'

/**
 * 列表组件
 */
export default class TodoList extends Component {
  render() {
    return (
      <ul>
        {this.props.todos.map((todo, index) =>
          <Todo {...todo}
                key={index}
                onClick={() => this.props.onTodoClick(index)}
                onDel={()=>this.props.onTodoDel(index)} />
        )}
      </ul>
    )
  }
}

TodoList.propTypes = {
  onTodoClick: PropTypes.func.isRequired,
  onTodoDel: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired).isRequired
}
```

**3.Todo:** 一个 todo 项。
*text: string:* 显示的文本内容。
*completed: boolean* todo 项是否显示删除线。
*onClick():* 当 todo 项被点击时调用的回调函数。
```
import React, { Component, PropTypes } from 'react'

/**
 * 单个列表组件
 */
export default class Todo extends Component {
  render() {
    /**
     * 调用父组件传递过来的完成列表行为 this.props.onClick
     * 调用父组件传递过来的删除列表行为 this.props.onDel
     * @type {Object}
     */
    return (
      <li>
        <span onClick={this.props.onClick}
        style={{
          textDecoration: this.props.completed ? 'line-through' : 'none',
          cursor: this.props.completed ? 'default' : 'pointer'
        }} >
        {this.props.text}
        </span>
        <span style={{color:'blue',marginLeft:'10px' }} onClick={this.props.onDel}>删除</span>
      </li>
    )
  }
}

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired
}
```

**4.Footer:** 一个允许用户改变可见 todo 过滤器的组件。
*filter: string*
当前的过滤器为： 'SHOW_ALL'、 'SHOW_COMPLETED'
或 'SHOW_ACTIVE'。
*onFilterChange(nextFilter: string)：* 当用户选择不同的过滤器时调用的回调函数。
```
import React, { Component, PropTypes } from 'react'

/**
 * 底部过滤列表组件
 */
export default class Footer extends Component {
  /**
   * 渲染过滤条件方法 如果等于过滤条件本身,则不可点击
   * 不等于条件本身,则可以点击触发事件
   * @param  {[type]} filter [description]
   * @param  {[type]} name   [description]
   * @return {[type]}        [description]
   */
  renderFilter(filter, name) {
    if (filter === this.props.filter) {
      return name
    }

    return (
      <a href='#' onClick={e => {
        e.preventDefault()
        /**
         * 调用父组件传递过来的过滤行为
         */
        this.props.onFilterChange(filter)
      }}>
        {name}
      </a>
    )
  }

  render() {
    return (
      <p>
        Show:
        {' '}
        {this.renderFilter('SHOW_ALL', 'All')}
        {', '}
        {this.renderFilter('SHOW_COMPLETED', 'Completed')}
        {', '}
        {this.renderFilter('SHOW_ACTIVE', 'Active')}
      </p>
    )
  }
}

Footer.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
}
```
这些全部都是展示组件。它们不知道数据是从**哪里**来的，或者数据是**怎么**变化的。你传入什么，它们就渲染什么。

***
#### 五、程序入口
1.如何连接到 Redux?
我们需要做出两个变化，将 App组件连接到 Redux 并且让它能够 dispatch actions 以及从 Redux store 读取到 state。
首先，我们需要获取从之前安装好的 [react-redux
](http://github.com/reactjs/react-redux) 提供的 Provider
，并且在渲染之前**将根组件包装进<Provider>
**。
```
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from '../containers/App'
import configureStore from '../store/configureStore';

/**
 * 创建store
 * @type {[type]}
 */
const store = configureStore();
let rootElement = document.getElementById('root')
//我们需要做出两个变化，将 App 组件连接到 Redux
//并且让它能够 dispatch actions 以及从 Redux store 读取到 state。
//在渲染之前将根组件包装进 <Provider>
//这使得我们的 store 能为下面的组件所用
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
```
***
#### 六、[redux-devtools](https://github.com/zalmoxisus/redux-devtools-extension)
首先安装chrome扩展程序Redux DevTools
![](http://upload-images.jianshu.io/upload_images/2701853-2f4f82f9d44c6639.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

调试截图
会把行为记录下来,可以看到state的变化,还可以回退,撤销当前操作的行为

![](http://upload-images.jianshu.io/upload_images/2701853-3a82bf84c579d6e9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](http://upload-images.jianshu.io/upload_images/2701853-62febb733a3b59ee.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![](http://upload-images.jianshu.io/upload_images/2701853-c039d85fd8e8a9f1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```
/**
 * 创建store
 * @param  {[type]} initialState [description]
 * @return {[type]}              [description]
 */
export default function configureStore(initialState) {
  const store = createStore(todoApp, initialState,
    //redux调试代码
    window.devToolsExtension && window.devToolsExtension({ actionCreators })
  );

  //热加载,及时跟新reducer
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
```

#### 总结:
写下这篇文章是希望通过栗子和大家一起去理解React+Redux的程序,
使用了redux去管理react组件的状态,真的很有趣,特别是redux的调试工具,愿大家能够一起愉快的学习。

React相关知识,可以参考前篇文章
[通过案例深入了解React](http://www.jianshu.com/p/b54cf10011bc)