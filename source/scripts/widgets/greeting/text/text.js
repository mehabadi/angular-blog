define(['app'],
    function (app)
    {
        'use strict';

        app.directive('text', function () {
            return {
                restrict: 'A',
                require: '^greeting',
                template: '<p>Lorem ipsune is a text that you can replace for your text places.</p>',
                replace: true
            };
        });

    }
);
