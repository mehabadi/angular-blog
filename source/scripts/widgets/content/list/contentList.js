define(['app', 'text!./view.html', 'text!../view/view.html', 'text!../update/view.html'],
    function (app, template, viewTemplate, updateTemplate)
    {
        'use strict';

        var _injectParams = [];

        var _directive = function ()
        {
            var _controller =
                ['$scope', 'contentService', '$rootScope', '$mdDialog',
                function controller($scope, contentService, $rootScope, $mdDialog)
                {

                    var data = contentService.getAllContents();

                    data.then(function (data)
                    {
                        $scope.contents = data;
                    }, function (status)
                    {
                        console.log(status);
                    });

                    $scope.showContent = function (id, event)
                    {                                                
                        $mdDialog.show({
                            controller: ['$scope', 'contentId', function ($scope, contentId)
                            {                                
                                $scope.contentId = contentId;
                                $scope.closeDialog = function ()
                                {
                                    $mdDialog.hide();
                                };
                            }],                                                                       
                            template: viewTemplate,

                            targetEvent: event,
                            clickOutsideToClose: false,
                            locals: {
                                contentId: id,
                            },                                                        
                        });
                    };

                    $scope.updateContent = function (id, event)
                    {
                        $mdDialog.show({
                            controller: ['$scope', 'contentId', function ($scope, contentId)
                            {
                                $scope.contentId = contentId;
                                $scope.closeDialog = function (form)
                                {                                    
                                    if (!form || !form.$dirty)
                                    {
                                        $mdDialog.hide();
                                    } else
                                    {
                                        
                                        var r = confirm("'در فرم تغییراتی صورت گرفته که هنوز ذخیره نشده اند، آیا مطمئن هستید تغییرات را لازم ندارید؟");
                                        if (r == true)
                                        {
                                            $mdDialog.hide();
                                        } else
                                        {
                                            //
                                        }
                                       
                                    }

                                };

                                function routeChange(event, newUrl, oldUrl)
                                {
                                    //Navigate to newUrl if the form isn't dirty
                                    if (!vm.editForm || !vm.editForm.$dirty) return;

                                    var modalOptions = {
                                        closeButtonText: 'Cancel',
                                        actionButtonText: 'Ignore Changes',
                                        headerText: 'Unsaved Changes',
                                        bodyText: 'You have unsaved changes. Leave the page?'
                                    };

                                    modalService.showModal({}, modalOptions).then(function (result)
                                    {
                                        if (result === 'ok')
                                        {
                                            onRouteChangeOff(); //Stop listening for location changes
                                            $location.path($location.url(newUrl).hash()); //Go to page they're interested in
                                        }
                                    });

                                    //prevent navigation by default since we'll handle it
                                    //once the user selects a dialog option
                                    event.preventDefault();
                                    return;
                                }
                            }],
                            template: updateTemplate,
                            targetEvent: event,
                            clickOutsideToClose: false,
                            locals: {
                                contentId: id,
                            },
                        });
                    };

                    //------------------
                    $scope.mainGridOptions = {
                        dataSource: {
                            type: "odata",
                            transport: {
                                read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
                            },
                            pageSize: 5,
                            serverPaging: true,
                            serverSorting: true
                        },
                        sortable: true,
                        pageable: true,
                        dataBound: function ()
                        {
                            this.expandRow(this.tbody.find("tr.k-master-row").first());
                        },
                        columns: [{
                            field: "FirstName",
                            title: "First Name",
                            width: "120px"
                        }, {
                            field: "LastName",
                            title: "Last Name",
                            width: "120px"
                        }, {
                            field: "Country",
                            width: "120px"
                        }, {
                            field: "City",
                            width: "120px"
                        }, {
                            field: "Title"
                        }]
                    };

                    $scope.detailGridOptions = function (dataItem)
                    {
                        return {
                            dataSource: {
                                type: "odata",
                                transport: {
                                    read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                                },
                                serverPaging: true,
                                serverSorting: true,
                                serverFiltering: true,
                                pageSize: 5,
                                filter: { field: "EmployeeID", operator: "eq", value: dataItem.EmployeeID }
                            },
                            scrollable: false,
                            sortable: true,
                            pageable: true,
                            columns: [
                            { field: "OrderID", title: "ID", width: "56px" },
                            { field: "ShipCountry", title: "Ship Country", width: "110px" },
                            { field: "ShipAddress", title: "Ship Address" },
                            { field: "ShipName", title: "Ship Name", width: "190px" }
                            ]
                        };
                    };

                    var sood = function ()
                    {
                        var total = 0;

                        for (var i = 1; i < 25 ; i++)
                        {
                            var tmp = Math.pow((1 + (18 / 1200)), i);
                            total += (tmp * 313000);
                        }
                        return total;

                    }
                    $scope.sood = sood;


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