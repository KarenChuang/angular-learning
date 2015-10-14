title: 2015-10-13 笔记
---

###### 钟冰清

### ng-bind
{% raw %}  
用来替代{{ }}表达式。  
{% endraw %}  
```bash
<p ng-bind="exp"></p>
```
等同于

```bash
{{exp}}
```
##### 理解：
{% raw %}
一般使用ng-bind来替换{{exp}},因为在浏览器加载过程瞬间，如果angular没有启动会在页面中看到{{exp}}这样的带双花括号的表达式。而使用ng-bind仅仅是写在html标签中的，不会出现什么影响页面效果的显示。
{% endraw %}


### Dependency Injection 依赖注入

##### 概念理解：

通过参数的形式传递需要的依赖，例如一个控制器依赖一个$scope范围，或者说将$scope注入到一个控制器中。
也就是说，通过参数的形式，标注了某个模块在使用的时候需要依赖什么服务或者什么别的组件。当实例化这个模块的时候，angular的注入器$injector会自动去根据依赖去引用所需要的组件。

依赖注入的机制可以避免模块之间的过强的依赖，需要使用什么就注入什么就好了。

##### 举例：

!()[/img/anNote01.png]


### Module 模块

angular中的模块化，

```bash
angular.module("moduleName",[]);// []中表示该模块依赖于的模块
```
angular中的的模块实际上就是一个容器，也就是说讲这一些能够实现一个功能的东西放在一个模块中。一个应用中可以包含多个模块，每个模块完成特定的功能。
推荐的模块划分是将：controller、directive、service、router、filter分别放在一个模块里，然后由一个总的模块作为应用的入口点，这个模块去依赖其他所有的模块（刚刚划分的那些）。

##### Module Loading & Dependencies ［保留］
1.config

2.run


### MVVM模型理解

* Model
 *  数据层
 *  angular中的service封装和处理的逻辑属于这一层

 
* View
 * 可视化的UI界面 
 * 例如angular中的directive的template模版？
 * 不操作作业务逻辑

 
* View model
 * view层的抽象，负责view和model之间的信息传递（转化？）
 * ng-bind这样的ng指令就属于viewModel层做的事情
 * 同一个view model可以被多个view复用
 * $scope作用域的功能相当于view model层的业务

 待补充。。。






