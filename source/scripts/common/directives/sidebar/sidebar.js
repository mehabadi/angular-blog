define(['app', 'text!./template.html'],
    function (app, template)
    {
        'use strict';

        var _injectParams = [];

        var _directive = function ()
        {
            var _controller =
                ['$scope','$rootScope', function controller($scope, $rootScope)
                {
                    ///$rootScope.search = $scope.search;
                }];

            return {
                restrict: 'E',
                replace: true,
                template: template,
                controller: _controller,
                scope: {
                    search: '=',
                    showSearch: '=',
                    showPosts: '=',
                    showComments: '=',
                    showPhotos: '=',
                }
            };
        };

        _directive.$inject = _injectParams;
        app.directive('sidebar', [_directive]);
    });