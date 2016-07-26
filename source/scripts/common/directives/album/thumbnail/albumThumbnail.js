define(['app', 'text!./template.html'],
    function (app, template)
    {
        'use strict';

        var _injectParams = [];

        var _directive = function ()
        {
            var _controller =
                ['$scope','photoService',
                function controller($scope, photoService)
                {
                    if($scope.album){
                        $scope.album.image = photoService.getAlbumThumb($scope.album.id);
                    }
                }];

            return {
                restrict: 'E',
                replace: true,
                template: template,
                controller: _controller,
                scope:{
                    album: '='
                }
            };
        };

        _directive.$inject = _injectParams;
        app.directive('albumThumbnail', [_directive]);
    });