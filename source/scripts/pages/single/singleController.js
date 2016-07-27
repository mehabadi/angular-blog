define(['app'], function (app)
{
    'use strict';

    var _injectParams = ['$scope'];

    var _controller = 
		['$scope', '$rootScope', 'postService', 'commentService', '$routeParams', 'pubSub',
		function ($scope, $rootScope, postService, commentService, $routeParams, pubSub)
		{
			$rootScope.pageTitle = "Blog";
			$rootScope.currentPage = "single";
			$scope.user;

			//get post details
			var post = postService.getPostById($routeParams.id);
			post.then(function (data)
			{
				$scope.post = data;
				$rootScope.pageTitle = data.title + ' | Blog';
			}, function (status)
			{
				console.log(status);
			});

			//get post's comments
			var getComments = function(){
				var data = commentService.getCommentsByPostId($routeParams.id);
				data.then(function (data)
				{
					$scope.comments = data;
				}, function (status)
				{
					console.log(status);
				});
			}

			getComments();

			pubSub.subscribe('retriveComments', getComments);


		}];

    _controller.$inject = _injectParams;

    app.register.controller('singleController', _controller);

});