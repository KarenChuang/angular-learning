routeApp.controller('RouteListCtrl',function($scope){

});
routeApp.controller('RouteDetailCtrl',function($scope,$routeParams){
	$scope.id = $routeParams.id;
});