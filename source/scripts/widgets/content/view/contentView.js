define(['app', 'text!./template.html'],
    function (app, template)
    {
        'use strict';

        var _injectParams = [];

        var _directive = function ()
        {
            var _controller = ['$scope', 'contentService', '$mdDialog',
                function controller($scope, contentService, $mdDialog)
                {

                    var data = contentService.getContentById($scope.id);
                    //$scope.isBusy = true;                   
                    data.then(function (data)
                    {
                        $scope.content = data;                       
                    }, function (status)
                    {
                        console.log(status);
                    })

                }];

            return {
                restrict: 'E',
                replace: true,
                template: template,
                scope: {
                    id: '=contentId',
                    closeDialog: '=closeDialog'
                },
                controller: _controller,
                
            };
        };

        _directive.$inject = _injectParams;
        app.directive('contentView', [_directive]);
    });