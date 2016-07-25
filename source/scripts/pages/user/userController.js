define(['app'], function (app)
{
    'use strict';

    var _injectParams = ['$scope'];

    var _controller = 
		{
			$rootScope.currentPage = "blog";

			$scope.maxItem = 2;
			//var blog = this;
			

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
