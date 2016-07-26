define(['app', 'text!./template.html'],
    function (app, template)
    {
        'use strict';

        var _injectParams = [];

        var _directive = function ()
        {
            var _controller =
                ['$scope','postService','userService',
                function controller($scope, postService, userService)
            {
                $scope.comments = 0;
                var comments = postService.getCommentsByPostId($scope.postId);
                comments.then(function (data)
                {
                    $scope.comments = data.length;
                }, function (status)
                {
                    console.log(status);
                });

                var data = userService.getUserById($scope.userId);
                data.then(function (data)
                {
                    $scope.user = data;
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
                scope: {
                    userId: '=',
                    postId: '='
                }
            };
        };

        _directive.$inject = _injectParams;
        app.directive('postMeta', [_directive]);
    });