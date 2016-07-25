define(['app'],
    function (app)
    {
        'use strict';

        var _injectParams = [];

        var _directive = function ($window)
        {
            var _link = function (scope, element, attrs)
                {
                    angular.element($window).bind('scroll', function () {
                        if(this.scrollY == this.document.body.scrollHeight - this.document.body.clientHeight){
                            scope.$apply(attrs.scroll);
                        }
                    });
                };

            return {
                restrict: 'A',
                link: _link,
            };
        };

        _directive.$inject = _injectParams;
        app.directive('scroll', ['$window', _directive]);
    });