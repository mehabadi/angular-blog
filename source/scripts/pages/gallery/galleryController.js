define(['app'], function (app)
{
    'use strict';

    var _injectParams = ['$scope'];

    var _controller = 
		['$scope', '$rootScope', 'photoService', 'albumService',
		function ($scope, $rootScope, photoService, albumService)
		{
			$rootScope.pageTitle = "Gallery | Angular Blog";
			$rootScope.currentPage = "gallery";

			$scope.maxItem = 8;

			var albums = albumService.getAllAlbums();

			albums.then(function (data)
			{
				$scope.albums = data;
			}, function (status)
			{
				console.log(status);
			});

			$scope.loadMore = function() {
				$scope.maxItem = $scope.maxItem + 4
			};
		}];

    _controller.$inject = _injectParams;

    app.register.controller('galleryController', _controller);

});