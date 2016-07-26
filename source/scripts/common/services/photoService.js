define(['app'], function (app)
{
    'use strict';

    var _injectParams = ['$http', '$q', 'CacheFactory'];

    var _service = function ($http, $q, CacheFactory)
    {
        var _self = this;

        var _serviceBase = 'https://jsonplaceholder.typicode.com/photos';

        if (!CacheFactory.get('photoCache')) {
            CacheFactory.createCache('photoCache', {
                deleteOnExpire: 'aggressive',
                recycleFreq: 60000
            });
        }

        var _photoCache = CacheFactory.get('photoCache');

        _self.getAllPhotos = function ()
        {
            var deferred = $q.defer();
            $http.get(_serviceBase, {cache: _photoCache})
            .success(function (data, status, headers, config)
            {
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config)
            {
                deferred.reject(status);
            });

            return deferred.promise;
        }

         _self.getAlbumThumb = function(albumId){
            var data = _photoCache.get(_serviceBase);
            var found = null;
            $.each(angular.fromJson(data[1]), function(i, item) {
                if (item.albumId == albumId) {
                    found = item;
                    // for breaking the loop
                    return false;
                }
            });
            return (found ? found.thumbnailUrl : "http://placehold.it/150/FFFFFF");
        }

         _self.getPhotoById = function (photoId)
        {
            var deferred = $q.defer();

            $http.get(_serviceBase + '/' + photoId, {cache: _photoCache})
                .success(function (data, status, headers, config)
                {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config)
                {
                    deferred.reject(status);
                });

            return deferred.promise;
        }

        /** Initialize **/
        _self.getAllPhotos();

        return {
            getAllPhotos: _self.getAllPhotos,
            getPhotoById:  _self.getPhotoById,
            getAlbumThumb:  _self.getAlbumThumb
        };
    };

    _service.$inject = _injectParams;
    app.factory('photoService', _service);
});