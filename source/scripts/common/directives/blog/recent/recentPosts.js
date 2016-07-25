define(['app', 'text!./template.html'],
    function (app, template)
    {
        'use strict';

        var _injectParams = [];

        var _directive = function ()
        {
            var _controller =
                ['$scope', 'postService',
                    function controller($scope, postService)
            {
                var data = postService.getAllPosts();

                data.then(function (data)
                {
                    $scope.posts = data;
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
        app.directive('recentPosts', [_directive]);
    });