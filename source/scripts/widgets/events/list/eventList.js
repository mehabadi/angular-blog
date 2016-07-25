define(['app', 'text!./view.html'],
    function (app, template)
    {
        'use strict';

        var _injectParams = [];

        var _directive = function ()
        {
            var _link = function (scope, element, attrs, controller)
            {
                console.log('eventList directive is running...');
            }

            var _controller = ['$scope', 'EventService',
                function controller($scope, EventService)
                {
                    var data = EventService.getAllEvents();

                    data.then(function (event)
                    {
                        $scope.events = event;
                    }, function (status)
                    {
                        console.log(status);
                    });
                }];

            return {
                restrict: 'A',
                replace: true,
                template: template,
                link: _link,
                controller: _controller
            };
        };

        _directive.$inject = _injectParams;
        app.directive('eventList', [_directive]);
    });