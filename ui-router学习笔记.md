title: ui-route

## date: 2015-10-21

AngularUI Router是一款Angular的路由框架，允许在界面中形成一种state机制。Angular中的$route服务ngRoute是围绕URL路由来设计使用的，而UI-Router是围绕state状态，来进行路由选择。

state有名字，可以被嵌套或者平级使用，用来有效地管理应用的界面。

## State Manager 状态管理器

#### $stateProvider

> A state corresponds to a "place" in the application in terms of the overall UI and navigation.

一个state对应到应用中的某一块区域，比如应用界面中的总体区域或者导航。

> A state describes (via the controller / template / view properties) what the UI looks like and does at that place.

一个state描述了一块区域的视图应该做一些什么，通过实行controller/template/视图属性（？）等等

> States often have things in common, and the primary way of factoring out these commonalities in this model is via the state hierarchy, i.e. parent/child states aka nested states.

state之间有一些共同的东西,可以进行父子级的嵌套。

### 模版什么时候被插入到视图中呢？

当state被激活的时候，一个tempalte就被自动地插入到它父级状态的模版多ui-view的视图中，如果它没有父级状态，那么它会被插入到index.html中。

#### 激活state的三种方式：

1. 调用`$state.go()`方法，这是层级最高的激活方式。
2. 通过点击一个包含`ui-sref`的指令。
3. 导航到一个url,这个url与state相关的。

### Templates

有几种配置state模版的方法：

``` bash
$stateProvider.state('contacts',{
	template:'<h1>kaka</h1>'
})
```

模版内联的方式加载：

``` javascript
$stateProvider.state('contacts',{
	templateUrl:'contacts.html'
})
```

其中，templateUrl还可以是一个函数，使用这个函数来返回一个url，但是需要预设一个参数

``` javascript
$stateProvider.state('contacts',{
	templateUrl:function($stateParams){
		return '/partials/contacts.'+$stateParams.filterBy+'.html';
	}
})
```

或者也可以使用`<ui-view>`来设置一个默认视图

``` html
<body>
	<ui-view>
		<i>some content will load here!</i>
	</ui-view>
</body>
```

### Controllers

可以分配一个controller给一个模版(如果该模版没有被实例化的话，这个controller将不会被定义)。

``` javascript
$stateProvider.state('contacts',{
	template:'<h1>{{title}}</h1>',
	controller:function($scope){
		$scope.title = 'my contacts';
	}
})
```

或者可以把controller定义在模块中：

``` bash
controller:'myCtrl'
```

另外，可以使用controller的语法定义成这样：

``` javascript
$stateProvider.state('contacts', {
  template: '<h1>{{contact.title}}</h1>',
  controller: function(){
    this.title = 'My Contacts';
  },
  controllerAs: 'contact'
})
```

以及

``` javascript
$stateProvider.state('contacts', {
  template: ...,
  controller: 'ContactsCtrl as contact'
})
```

还可以通过controllerProvider去动态地返回一个controller函数和参数

``` javascript
$stateProvider.state('contacts', {
  template: ...,
  controllerProvider: function($stateParams) {
      var ctrlName = $stateParams.type + "Controller";
      return ctrlName;
  }
})
```

Controller可以通过$scope.$on()这个方法来监听state转换这个事件。

> Controllers are instantiated on an as-needed basis, when their corresponding scopes are created, i.e. when the user manually navigates to a state via a URL, $stateProvider will load the correct template into the view, then bind the controller to the template's scope.

当创建了相应的scope的时候，controller就被相应地实例化了。当用户手动低将state导航到指定的URL的时候，$stateProvider会加载正确的template到对应的view上，并且将controller绑定了这个template的scope上。

#### Resolve

> You can use `resolve` to provide your controller with content or data that is custom to the state. `resolve` is an optional map of dependencies which should be injected into the controller.

你可以使用resolve来为你的controller的内容或者数据设置自定义的state，就是可以提供一个可选的依赖注入。

> If any of these dependencies are promises, they will be resolved and converted to a value**before** the controller is instantiated and the $stateChangeSuccess event is fired.

如果这个依赖是promise，那它将会在controller实例化和$stateChangeSuccess事件被触发之前，被解决和转换成一个值（value）。

`resolve` 配置项是一个包换key/value键值对的map对象：

* key - {string} : 这个注入到controller的依赖的名称
* factory - {string|function} : 
  * 如果是string类型的，那就是指这个service的别名。
  * 如果是function类型的，那指的是将这个函数的返回值作为依赖进行注入，如果这个function返回的结果是一个promise，那么这个controller会等到这个函数执行完成了才会被实例化。

##### Examples:

> Each of the objects in `resolve` below must be resolved (via `deferred.resolve()` if they are a promise) before the `controller` is instantiated. Notice how each resolve object is injected as a parameter into the controller.

在controller实例化之前，resolve中的每一个对象都必需被预载入，如果是promise对象的话，那么会通过`deferred.resolve()`。注意每个resolve对象是如何作为一个参数注入到controller中。

``` javascript
$stateProvider.state('myState', {
      resolve:{

         // 例子中是一个function，返回一个value
         // 这不是一个promise对象，结果将会被立即返回
         simpleObj:  function(){
            return {value: 'simple!'};
         },

         // 例子中是一个返回promise对象的函数
         // 这是典型的使用resolve的方式
         // 你可以给函数注入任何想要的服务里来，例如$http
         promiseObj:  function($http){
            // $http 返回一个 promise 对象给URL的data
            return $http({method: 'GET', url: '/someUrl'});
         },

         /* 可以对promise的返回结果使用.then()方法，这个可以是链式的 
			调用，就是典型的使用promise的方法。 */
         promiseObj2:  function($http){
            return $http({method: 'GET', url: '/someUrl'})
               .then (function (data) {
                   return doSomeStuffFirst(data);
               });
         },        
			
         /* 这是指需要使用一个名为translations的服务，这将会在模块中
        	查找该名字的服务然后返回它。注意：这个服务将会返回一个promise */
         translations: "translations",

         // Example showing injection of service into
         // resolve function. Service then returns a
         // promise. Tip: Inject $stateParams to get
         // access to url parameters.
         translations2: function(translations, $stateParams){
             // Assume that getLang is a service method
             // that uses $http to fetch some translations.
             // Also assume our url was "/:lang/home".
             return translations.getLang($stateParams.lang);
         },

         // Example showing returning of custom made promise
         greeting: function($q, $timeout){
             var deferred = $q.defer();
             $timeout(function() {
                 deferred.resolve('Hello!');
             }, 1000);
             return deferred.promise;
         }
      },

      // 控制器会等待全部的注入完成之后才会被实例化
      controller: function($scope, simpleObj, promiseObj, promiseObj2, translations, translations2, greeting){
          $scope.simple = simpleObj.value;

          // 可以保证每一个promise对象都是可以直接使用的。
          $scope.items = promiseObj.data.items;
          $scope.items = promiseObj2.items;

          $scope.title = translations.getLang("english").title;
          $scope.title = translations2.title;

          $scope.greeting = greeting;
      }
   })
```

#### Attach Custom Data to State Objects



#### onEnter and onExit callbacks



### State Change Events



### View Load Events