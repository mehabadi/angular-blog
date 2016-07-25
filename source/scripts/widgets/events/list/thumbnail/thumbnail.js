define(['app', 'text!./view.html'],
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
                    event: "=myEvent"
                }
            };
        };

        _directive.$inject = _injectParams;
        app.directive('eventThumbnail', [_directive]);
    });