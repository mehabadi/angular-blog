define(['app', 'text!./template.html'],
    function (app, template)
    {
        'use strict';

        var _injectParams = [];

        var _directive = function ()
        {
            var _controller =
                ['$scope', 'photoService',
                    function controller($scope, photoService)
            {
                var data = photoService.getAllPhotos();

                data.then(function (data)
                {
                    $scope.photos = data;
                }, function (status)
                {
                    console.log(status);
                });
            }];

            return {
                restrict: 'E',
                replace: true,
                template: template,
                controller: _controller,
            };
        };

        _directive.$inject = _injectParams;
        app.directive('recentPhotos', [_directive]);
    });