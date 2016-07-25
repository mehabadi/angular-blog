define(['app', 'text!./template.html'],
    function (app, template)
    {
        'use strict';

        var _injectParams = [];

        var _directive = function ()
        {
            var _controller = ['$scope', 'contentService', 'categoryService',
                function controller($scope, contentService, categoryService)
                {
                    $scope.title = "Add new content";
                    var data = categoryService.getAllCategories();
                    ////$scope.isBusy = true;

                    data.then(function (data)
                    {
                        $scope.categories = data;
                    }, function (status)
                    {
                        console.log(status);
                    });

                    $scope.checkInputValidation = function (element)
                    {
                        if(element)
                            return element.$touched && element.$invalid;
                    };

                    function processSuccess(response)
                    {
                        //$scope.editForm.$dirty = false;
                        //vm.updateStatus = true;
                        //vm.title = 'Edit';
                        //vm.buttonText = 'Update';
                        //startTimer();
                        console.log(response);
                    }

                    function processError(response)
                    {
                        console.log(response);
                        //vm.errorMessage = error.message;
                        //startTimer();
                    }

                    $scope.save = function (content, newContentForm)
                    {
                        if ($scope.newContentForm.$valid)
                        {
                            if (!content.id)
                            {
                                contentService.insert(content).then(processSuccess, processError);
                            }
                            else
                            {
                                contentService.update(content).then(processSuccess, processError);
                            }
                        };
                    };

                }];

            return {
                restrict: 'E',
                //replace: true,
                template: template,
                controller: _controller
            };
        };

        _directive.$inject = _injectParams;
        app.directive('contentUpdate', [_directive]);
    });