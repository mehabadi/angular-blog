define(['app'],
    function (app)
    {
        'use strict';

        var _injectParams = [];

        var _directive = function ()
        {
            var _controller =
                ['$scope','md5',
                function controller($scope, md5)
                {
                    $scope.src = 'http://www.gravatar.com/avatar/' + md5.createHash($scope.email);
                }];

            return {
                restrict: 'E',
                replace: true,
                template: '<img ng-src="{{src}}" class="{{class}}" />',
                controller: _controller,
                scope: {
                    email: '@',
                    class: '@',
                }
            };
        };

        _directive.$inject = _injectParams;
        app.directive('gravatar', [_directive]);
    });