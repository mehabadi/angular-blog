define(['app'], function (app)
{
    'use strict';

    var _injectParams = ['$scope'];

    var _controller = 
		['$scope', '$rootScope', '$routeParams', 'userService',
		function ($scope, $rootScope, $routeParams, userService)
		{
			$rootScope.pageTitle = "Users Posts | Angular Blog";
			$rootScope.currentPage = "blog";

			$scope.maxItem = 2;
			//var blog = this;
			
			var data = userService.getUserPosts($routeParams.id);

			data.then(function (data)
			{				
				$scope.posts = data;
			}, function (status)
			{
				console.log(status);
			});
			
		}];

    _controller.$inject = _injectParams;

    app.register.controller('userController', _controller);

});