define(['app'], function (app)
{
    'use strict';

    var _injectParams = ['$scope'];

    var _controller = 
		['$scope', '$rootScope', 'postService', 'userService', 'commentService', '$routeParams',
		function ($scope, $rootScope, postService, userService, commentService, $routeParams)
		{
			$rootScope.pageTitle = "Blog";
			$rootScope.currentPage = "blog";
			$scope.user;

			//get post details
			var post = postService.getPostById($routeParams.id);
			post.then(function (data)
			{
				$scope.post = data;
				$rootScope.pageTitle = data.title + ' | Blog';
				$scope.getUserInfo()
			}, function (status)
			{
				console.log(status);
			});

			//get post's comments
			var comments = commentService.getCommentByPostId($routeParams.id);
			comments.then(function (data)
			{
				$scope.comments = data;
			}, function (status)
			{
				console.log(status);
			});

			//get author information
			$scope.getUserInfo =function(){
				var data = userService.getUserById($scope.post.userId);
				data.then(function (data)
				{
					$scope.user = data;
					$scope.user.image = getUserImage($scope.user.email, 100);
				}, function (status)
				{
					console.log(status);
				});
			};

			var getUserImage = function(email, size){
				//return 'http://www.gravatar.com/avatar/' +  md5(email) + '?s=' + size;
				return '/assets/images/avatar.png';
			}
		}];

    _controller.$inject = _injectParams;

    app.register.controller('singleController', _controller);

});