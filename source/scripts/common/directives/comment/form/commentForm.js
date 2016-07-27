define(['app', 'text!./template.html'],
    function (app, template)
    {
        'use strict';

        var _injectParams = [];

        var _directive = function ()
        {
            var _controller =
                ['$scope', 'commentService', 'pubSub',
                function controller($scope, commentService, pubSub)
            {
                $scope.commentForm = {};

                $scope.saveComment = function () {

                    if ($scope.commentForm.$valid) {
                        $scope.commentForm.postId = $scope.postId;
                        var data = commentService.addComment($scope.commentForm);
                        data.then(function (data)
                        {
                            pubSub.publish('retriveComments');
                            $scope.message = 'Your Comment saved successfully.';
                        }, function (status)
                        {
                            console.log(status);
                        });
                    }
                    $scope.commentForm = {};
                };
            }];

            return {
                restrict: 'E',
                replace: true,
                template: template,
                controller: _controller,
                scope: {
                    postId: '='
                }
            };
        };

        _directive.$inject = _injectParams;
        app.directive('commentForm', [_directive]);
    });