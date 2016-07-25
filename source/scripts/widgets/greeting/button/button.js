define(['app', 'text!./view.html'],
    function (app, template)
    {
        'use strict';

        var _injectParams = [];

        var _controller = ['$scope', function controller($scope)
        {
            console.log('button directive controller is running...');
            $scope.text = "Show Hello1";
            $scope.sayHello = function ()
            {
                alert('salaaaammmmm button');
            }
        }];

        var _directive = function ()
        {
            return {
                restrict: 'A',
                require: '^greeting',
                template: template,
                replace: true,
                controller: _controller
            };
        };        

        _directive.$inject = _injectParams;
        app.directive('button', [_directive]);
    }
);
