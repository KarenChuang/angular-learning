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