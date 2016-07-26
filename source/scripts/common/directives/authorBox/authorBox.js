define(['app', 'text!./template.html'],
    function (app, template)
    {
        'use strict';

        var _injectParams = [];

        var _directive = function ()
        {
            var _controller =
                ['$scope', 'userService',
                function controller($scope, userService)
                {
                    if($scope.userId){
                        //get author information
                        var data = userService.getUserById($scope.userId);
                        data.then(function (data)
                        {
                            $scope.user = data;
                        }, function (status)
                        {
                            console.log(status);
                        });
                    }
                }];

            return {
                restrict: 'E',
                replace: true,
                template: template,
                controller: _controller,
                scope:{
                    userId : '='
                }
            };
        };

        _directive.$inject = _injectParams;
        app.directive('authorBox', [_directive]);
    });