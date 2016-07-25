define(['app', 'text!./view.html', 'text!../view/index.html'],
    function (app, template, viewTemplate)
    {
        'use strict';

        var _injectParams = [];

        var _directive = function ()
        {
            var _controller = ['$scope', 'contentService', '$mdDialog', '$mdMedia',
                function controller($scope, contentService, $mdDialog, $mdMedia)
                {

                    var data = contentService.getAllContents();

                    data.then(function (data)
                    {
                        $scope.contents = data;
                    }, function (status)
                    {
                        console.log(status);
                    });

                    //$scope.closeDialog = function ()
                    //{
                    //    $mdDialog.cancel();
                    //};

                    $scope.showContent = function (id, event)
                    {

                        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;

                        $mdDialog.show({
                            controller: ['$scope', '$mdDialog', 'contentId',
                                function ($scope, $mdDialog, contentId)
                                {
                                    $scope.contentId = contentId;
                                    
                                    $scope.closeDialog = function ()
                                    {
                                        //$mdDialog.cancel();
                                        $mdDialog.hide();
                                    };
                                }],
                            template: viewTemplate,
                            targetEvent: event,
                            clickOutsideToClose: false,
                            locals: {
                                contentId: id
                            },
                        });
                    };
                }];

            return {
                restrict: 'E',
                replace: true,
                template: template,
                controller: _controller
            };
        };

        _directive.$inject = _injectParams;
        app.directive('contentList', [_directive]);
    });