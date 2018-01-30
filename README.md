#运行方法
1. npm install yarn -g
2. yarn install
3. git submodule init // 初始化子模块
4. git submodule update // 拉取子模块
5. yarn mock // mock服务器
6. yarn start

#更新代码
1. git pull // 更新主工程
2. git submodule update // 更新子模块

#重写升级
1. Layout布局切换成100%布局，固定头部，尾部，这样动画切换路由不会导致fixed定位失效
2. 由于Layout布局的更改，加上Redux，重写了所有组件库，并编写了使用范例
3. 全局使用redux做数据缓存，防止多页面交互返回时丢失数据，如选择地址、选择出行人，查看单品后返回重新加载页面等；看需求使用，没必要时可以当它不存在：依旧使用component state维护组件状态并**不会有任何问题**
4. 移除zepto，强化学习原生DOM操作的习惯，ajax使用axios替换
5. 抽离ajax的提示为全局吐司，避免每次异步请求要处理三层提示:开始、成功、失败
6. ajax结果现在不再拆包，既回调方法会获得包含code在内的数据结构，可以使用es6语法的参数解构来简化data的获取
7. 升级webpack3, 升级react16，升级react router4，升级react-transition动画
8. 拆分mock为单独的服务，便于扩展；同时防止总有人混淆MOCK接口服务、NODE代理服务、API接口服务的关系
9. 使用ExtractText插件抽离全局样式表单独打包，不再耦合进bundle内了；不过异步载入的Bundle依然会打包在相应的脚本中
10. 使用css-loader中的局部命名功能 :local(.class) 来规避多模块打包在一起可能造成样式冲突的问题
11. 按王永建议，引入ESlint，强制要求语法校验，培养标准习惯
12. 不要使用React Router内置的Link组件，替代使用library/BLink，原因：同时兼容query和search模式；支持skipmodel；优化同路由跳转，将来可能的APP升级新开webview处理等
13. 模块依然会分别打包，但是使用异步载入方式，跨模块链接不再需要重载整个页面了；这样例如选择地址、收银台、订单等公共页面可以直接跨模块访问而不再需要单独定制或重载整个页面了

#几点注意
1. 在reducer中为了更多可读性，建议使用Object Spread Operator来替代Object.assign
2. 全局定义的 CF.member CF.project现在被注入到store中，可以通过mapStateToProps映射为组件的props
3. 为了扩展考量，建议所有的Action遵循FSA(Flux Standard Action)规范
4. 暂时为了保持Action的简单性，异步操作仅使用了redux-thunk中间件
5. redux-action、redux-promise、redux-sagas、redux-observable感兴趣的建议学习，思考下未来是否可能整合
