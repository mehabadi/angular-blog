define(['app'], function (app)
{
    'use strict';

    var _injectParams = ['$scope'];

    var _controller = 
		['$scope', '$rootScope', 'postService',
		function ($scope, $rootScope, postService)
		{
			$rootScope.pageTitle = "Blog | Angular Blog";
			$rootScope.currentPage = "blog";

			$scope.maxItem = 2;
			//var blog = this;
			
			var data = postService.getAllPosts();

			data.then(function (data)
			{
				$scope.posts = data;
			}, function (status)
			{
				console.log(status);
			});

			$scope.loadMore = function() {
				$scope.maxItem = $scope.maxItem + 2
			};
		}];

    _controller.$inject = _injectParams;

    app.register.controller('blogController', _controller);

});