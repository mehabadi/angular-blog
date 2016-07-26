define(['app', 'text!./template.html'],
    function (app, template)
    {
        'use strict';

        var _injectParams = [];

        var _directive = function ()
        {
            return {
                restrict: 'E',
                replace: true,
                template: template,
                scope:{
                    photo: '='
                }
            };
        };

        _directive.$inject = _injectParams;
        app.directive('albumItem', [_directive]);
    });