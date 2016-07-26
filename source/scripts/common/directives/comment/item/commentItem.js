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
                scope: {
                    comment: '='
                }
            };
        };

        _directive.$inject = _injectParams;
        app.directive('commentItem', [_directive]);
    });