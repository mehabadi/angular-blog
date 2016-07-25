define(['app'],
    function (app)
    {
        'use strict';

        app.directive('title', function ()
        {
            return {
                restrict: 'A',
                require: '^greeting',
                template: '<h1>Hello World</h1>',
                replace: true
            };
        });

    }
);
