title: 2015-10-14 笔记
---
###### bingqing.zhong

## 01.angular内置指令

#### 01.ng-属性指令

* ng-href/ng-src 
 * 通过这个方式来绑定超链接和图片中的url地址，和使用ng-bind的方式类似，当使用一个插入的url地址时，如果这个地址未生效，就会使超链接点击到一个错误的页面，对于图片而言，使用ng-src会告诉浏览器，如果图片url地址未生效就不要加载图片了。

* ng-selected/ng-checked/ng-disabled/ng-readonly
 * 这些指令属性 都是`ng-xx="exp"`,这类指令都属于布尔类型的指令， 通过绑定某个表达式来判断是否被选中、选择、可读或禁用。 

#### 02. 在ng-controller中子作用域的问题

首先，$scope对象会通过原型继承它父类$scope的属性和方法，包括$rootScope。
例如，在一个控制器中再定义一个子控制器。

```bash
<div ng-controller="parenCtrl">

	{{Model.someValue}}
	<button ng-click="changeFromParent()">changeParent</button>

	<div ng-controller="childCtrl">
		{{Model.someValue}}
		<button ng-click="changeFromChild()">changeChild</button>
	</div>

</div>

myApp.controller("parenCtrl",function($scope){
	$scope.Model = {
		someValue : "papa-value" 
	};
	$scope.changeFromParent = function(){
		$scope.Model.someValue = "change from parent!";
	}
});
myApp.controller("childCtrl",function($scope){
	$scope.changeFromChild = function(){
		$scope.Model.someValue = "change from child!";
	}
});

```


通过对象的形式，这时候如果子控制器修改的是对该Model的属性，采用的是引用复制，所以修改子scope中的属性的时候，父scope多值也会被修改。
而如果只是采用 ` $scope.someValue = "papa-value"; ` 的形式，如果修改子scope的值，父scope中是不会有变化的，因为这只是通过字符串复制的形式，而非引用，所以不会改变父级作用域中的值。

#### 03- 常用的ng指令

* ng-view/ng-include/ng-repeat/ng-controller/ng-if 使用这几个指令的时候，都会创建自己的作用域scope。
* ng-bind/ng-cloak 都有为避免页面出现angular特殊表达式的用法，ng-bind就是替换双花括号表达式的用法，而ng-cloak则是可以隐藏该指令的元素内部的全部内容，直到路由调用到该页面。（cloak：斗篷，就是有隐藏住东西的意思）。

* ##### ng-options
 * (老大，你今天问到的怎么select下怎么接受对象数据作为option指的就是这个指令吧)
 * ng-options可以接受一个表达式，用来为select标签生成option选项的,表达式可以接受两种类型的数据源，分别是数组和对象。
 
 
<b>数组</b>：
 
html: user 作为users数组的一个个体，user.name是指将这个个体的name属性输出到option
 
```bash
<div ng-controller="userCtrl">
	<select ng-model="user" ng-options="user.name for user in users">
		<option value="">choose user</option>
	</select>
	choosed user :{{user.name}}
</div>
```
js:定义了一个数组

```bash
angular.module("myapp",[])
.controller('userCtrl',function($scope){
	$scope.users = [
		{name:'wang'},
		{name:'zhao'},
		{name:'zhong'},
		{name:'he'}
	];
});
```

 <b>对象</b>：
 以对象作为数据源传入到option中,就是通过(key,value)这样的形式来获取到对象的数据，例如有这样一个对象：
 
 ```bash
 obj = {
 	name:'wang',
 	age:20,
 	gender:'male'
 };
 ```
 
###  然后就看不懂了，，那个Comprehesion expression是怎么使用的？？
 





## 02.angular 自定义指令

#### 概念理解:

angular的指令就是指在DOM中运行的函数，指令就是用来扩展这个元素的功能的东西。
定义指令的是通过`directive()`这个方法。

Augular在执行的时候，就是通过注册了directive()上指令名字，在解析DOM元素、属性、注释还有css类名的时候，如果使用了这个被注册的名字的话，就会在对应的位置引用这个指令。

## 03.Filter

#### 01.内置过滤器

用于格式化输出一些数据。

* 学习了angular内置的一些过滤器，例如格式化输出货币[currency](https://docs.angularjs.org/api/ng/filter/currency)、日期[date](https://docs.angularjs.org/api/ng/filter/date)。
* 还有一个就叫[filter](https://docs.angularjs.org/api/ng/filter/filter)的过滤器，可以从给定的数组中根据过滤要求（参数）输出新的数组。
* 以及number,用来将将数字格式化成文本格式（默认会将小数点后保留三位）:

 * ```bash
{{ 333222.12345 | number }}
```

 * 输出 ： 333，222.123

* orderBy 用于对指定数组进行排序
* limitTo 用于对传入的数组或字符串进行截取

#### 02.自定义过滤器

可以将自定义的过滤器放入一个module中，通过return回来一个带有对传入数据判断的函数。然后在html用｜来使用自定义的过滤器。

```bash
myapp.filter('filterName',function(){
		return function(input){
			if(input) {
				return input[0].toUpperCase()+input.slice(1);
			}
		}	
	})
```

## 04.promise 保留
promise.all([],[]).then(choose)

promise.when([])
掌握控制权？？

benifit :
避免使用嵌套。

* promise.resolve(1)
	.then(xxx)
	.then(xxx)
	.done();  
	
* 使用catch.／／？？
* 想throw内容，应该包在settimeout中
