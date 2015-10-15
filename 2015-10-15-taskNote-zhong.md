title: 2015-10-15 笔记
---

###### bingqing.zhong

### 01.Form表单验证

首先，angular中提供的表单验证能够及时反馈纠正用户的输入。虽然服务器端的验证仍是非常重要的部分，但是作为客户端的及时验证同样能很大地改善用户体验。

#### a.绑定到表单和控件状态

* 关于form的一个概念：每个form都是FormCotroller的实例。

* 每个form都有一些属性（$touched/$error...）和方法($setValidity()/$setDirty()...[FormCotroller文档](https://docs.angularjs.org/api/ng/type/form.FormController))。

* 每个form实例都可以对应到使用name属性的对应到那个相应的作用域中。可以通过这个特性，完成这样的功能：
 * 通过$touched这个属性，用于自定义的显示错误消息提示。
 * 通过$submmited属性，用于在提交表单时候显示自定义错误提示。
 * 通过$error属性（这是个obj），它的value值可以用来指明对什么类型都输入进行验证
 ` ng-show="form.userName.$error.minlength" ` [其他value](https://docs.angularjs.org/api/ng/type/form.FormController)


##### novalidate:用于忽略浏览器原生对表单的验证。

#### b.CSS Classes
ng-valid / ng-dirty / ng-touched...在css样式中添加上这样的样式，可以用来修改各种不同验证情况时候的表单样式，例如不合法的输入框设置为红色等等。

用法：(当类名为cssForm的表单中的input标签当被获得焦点并且输入无效的时候，input框设为红色)

```bash
.cssForm input.ng-invalid.ng-touched {
	border:1px solid #f00;
}
```

#### c.ng-model-options指令

通过[ngModelOptions指令](https://docs.angularjs.org/api/ng/directive/ngModelOptions)可以控制view和model同步的时间，例如input失去焦点之后再同步，或者延时1000ms之后同步等等。

* updateOn 用来指定同步ng-model的时间，例如说当input失去焦点的时候在去更新。 
` ng-model-options="{ updateOn:'blur'}" `
* debounce 用来延迟model的更新，例如当我们在搜索框中输入的时候，不希望用户每输入一个按键就立即更新模型，而是输入一段有意义的文字完成之后再自动更新，我们就可以设置停止输入1000ms之后再进行更新 `ng-model-options="{debounce:1000}"`

### Router－－？

`python -m SimpleHTTPServer` 用于本地打开一个小型server

 通过$route这个服务的提供者$routeProvider来声明路由，实现页面中合理的视图之间的跳转。总之就是来实现页面跳转的，可以将不同的页面处理放在定义在路由中。
 
 首先可以创建一个module,在这个模块中，可以通过config函数定义路由。使用when和otherwise方法来创建路由。其中when方法有两个参数，第一个是path路径，第二个是配置的对象，用来指明当进入了第一个路由的时候，可以做些什么，比如这里是`controller:'RouteListCtrl`，就是指当进入`list.html`页面的时候,这个控制器会和创建的这个路由关联在一起。
 
```bash
var routeApp = angular.module('routeApp',['ngRoute']);
routeApp.config(['$routeProvider',function($routeProvider){
		$routeProvider
			.when('/list',{
				templateUrl:'/views/route/list.html',
				controller:'RouteListCtrl'
			})
			.when('/list/:id',{
				templateUrl:'/views/route/detail.html',
				controller:'RouteDetailCtrl'
			})
			.otherwise({
				redirectTo:'/list'
			});
	}]);
```
 
 


### Service
提供一种让应用在整个生命周期保持数据的方法，能够在不同的控制器之间沟通，能够保持数据的一致。

通俗地去理解，就是有一些重复的代码段，需要总是被使用的功能，我们可以将这些功能提取出来，封装在service服务中，通过service暴露出来的接口，来使用这些功能。

service的特性：
1. 单例
2. 由$injector负责实例化
3. 如果需要使用通过依赖注入使用。


有5种方法来创建服务：

1. factory()
2. service()
3. constant()
4. value()
5. provider()

service/provider/factory都是provider，怎么理解，
