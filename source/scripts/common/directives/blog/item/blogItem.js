define(['app', 'text!./template.html'],
    function (app, template)
    {
        'use strict';

        var _injectParams = [];

        var _directive = function ()
        {
            var _controller = ['$scope', function controller($scope)
            {
            }];

            return {
                restrict: 'E',
                replace: true,
                template: template,
                controller: _controller,
                scope: {
                    post: '='
                }
            };
        };

        _directive.$inject = _injectParams;
        app.directive('blogItem', [_directive]);
    });