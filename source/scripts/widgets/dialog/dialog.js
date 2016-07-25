define(['app', 'text!./view.html'],
    function (app, template)
    {
        'use strict';

        var _injectParams = ['$compile'];

        var _testHtml = [];

        var _directive = function ($compile)
        {
            var _controller = ['$scope', '$mdDialog', '$mdMedia', '$compile',
            function controller($scope, $mdDialog, $mdMedia, $compile)
                {
                    console.log('dialog is running...');

                    $scope.showDialog = function (event, data)
                    {
                        //show dialog
                        $mdDialog.show({
                            controller: ['$scope', '$mdDialog', 'dialog', '$sce',
                                function ($scope, $mdDialog, scope, $sce)
                                {
                                    var html = $compile($("#dialogContent").html(scope.content).contents())($scope);                                    
                                    scope.content = angular.element(html).html();

                                    $scope.dialog = scope;

                                    $scope.getSnippet = function ()
                                    {
                                        return $sce.trustAsHtml($scope.dialog.content);                                        
                                    }
                                    

                                    //$scope.$apply(function ()
                                    //{
                                    //    $compile($("#dialogContent").html(scope.content).contents())($scope);
                                    //    //$compile($("#dialogContent").html('<content-view content-id="contentId" />').contents())($scope);

                                    //});


                                    $scope.closeDialog = function ()
                                    {
                                        //$mdDialog.cancel();
                                        $mdDialog.hide();
                                    };
                                }],
                            template: template,
                            targetEvent: event,
                            clickOutsideToClose: false,
                            locals: {
                                dialog: data
                            },
                        });

                    };

                }];

            var _link = function (scope, element, attrs, controller)
            {
                scope.$on('showDialog', function (event, data)
                {
                    scope.showDialog(event, data);                    
                });
            }

            return {
                restrict: 'E',
                replace: true,
                template: template,                
                //controller: _controller,
                //link: _link,
                //compile: function (tElem, tAttrs)
                //{
                //    return function (scope, element, attrs, controllers)
                //    {
                //        //controllers.hello = 'hello from controller';
                //        //console.log(controllers);
                //        var template = angular.element(
                //            document.getElementById('template.html')).html(),
                //            compiled = $compile(template)(scope),
                //            obj = {
                //                render: {
                //                    hello: "hello from 'fake' controller"
                //                },
                //                hello: 'hello from other object.'
                //            };

                //        scope.hello = "Hello from scope";
                //        element.replaceWith(compiled);

                //        var result = $interpolate(template)(scope);
                //        templateStore.push(result);

                //        var result = $interpolate(template)(obj);
                //        templateStore.push(result);

                //        //console.log(result);
                //        //console.log(templateStore[0]);

                //        $('#test').append( // append just to test the saved template
                //            templateStore[0]);
                //        $('#test2').append( // append just to test the saved template
                //            templateStore[1]);

                //    };
                //}

            };
        };

        _directive.$inject = _injectParams;
        app.directive('dialog', [_directive]);
    });