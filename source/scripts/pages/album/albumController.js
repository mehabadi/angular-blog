define(['app'], function (app)
{
    'use strict';

    var _injectParams = ['$scope'];

    var _controller = 
		['$scope', '$rootScope', 'albumService', '$routeParams',
		function ($scope, $rootScope, albumService, $routeParams)
		{
			$rootScope.pageTitle = "Album | Gallery";
			$rootScope.currentPage = "gallery";
			$scope.maxItem = 8;

			var albums = albumService.getAlbumById($routeParams.id);

			albums.then(function (data)
			{
				$scope.album = data;
				$rootScope.pageTitle = data.title + ' | Gallery';
			}, function (status)
			{
				console.log(status);
			});

			var photos = albumService.getPhotosByAlbumId($routeParams.id);

			photos.then(function (data)
			{
				$scope.photos = data;
			}, function (status)
			{
				console.log(status);
			});

		}];

    _controller.$inject = _injectParams;

    app.register.controller('albumController', _controller);

});
