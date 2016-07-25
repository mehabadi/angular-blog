define(['app', 'text!./template.html'],
    function (app, template)
    {
        'use strict';

        var _injectParams = [];

        var _directive = function ()
        {
            var _controller =
                ['$scope','commentService','postService',
                function controller($scope, commentService, postService)
                {
                    var data = commentService.getAllComments();
                    data.then(function (data)
                    {
                        $scope.comments = data;
                    }, function (status)
                    {
                        console.log(status);
                    });
                }];

            return {
                restrict: 'E',
                replace: true,
                template: template,
                controller: _controller,
            };
        };

        _directive.$inject = _injectParams;
        app.directive('recentComments', [_directive]);
    });