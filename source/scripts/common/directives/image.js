define(['app'],
    function (app)
    {
        'use strict';

        var _injectParams = [];

        var _directive = function ()
        {
            var _controller = ['$scope', function controller($scope)
                {
					if(!$scope.src){
																				
						var url = "http://placehold.it/" + $scope.width + "x" + $scope.height + "/";
						var letters = '0123456789ABCDEF'.split('');
						var color = '';
						for (var i = 0; i < 6; i++ ) {
							color += letters[Math.floor(Math.random() * 16)];
						}
						$scope.src = url + color;													
					}	
					return $scope.src;					
                }];

            return {
                restrict: 'E',
                replace: true,
                template: '<img ng-src="{{src}}" width="{{width}}" height="{{height}}" class="{{class}}" alt="{{alt}}" />',
				controller: _controller,		
				scope: {
					src: '@',
					width: '@w',
					height: '@h',
                    class: '@',
                    alt: '@'
				}                		
            };
        };

        _directive.$inject = _injectParams;
        app.directive('postImage', [_directive]);
    });