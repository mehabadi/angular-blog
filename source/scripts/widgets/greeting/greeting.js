define(['app'], function (app)
{
    'use strict';

    var _injectParams = [];

    var _directive = function ()
    {
        var _link = function (scope, element, attrs, controller)
        {
            //console.log('greeting directive is running...');            
        }

        var _controller = ['$scope', function controller($scope)
        {
            console.log("greeting directive controller is running..."),
            $scope.sayHello = function ()
            {
                alert("salaaaammmmm greeting")
            }
        }];

        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: '<div>Hello</div>',
            link: _link,
            controller: _controller
        };
    };

    _directive.$inject = _injectParams;
    app.directive('greeting', [_directive]);
});
