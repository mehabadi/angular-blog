define(['app'], function (app)
{
    'use strict';

    var _injectParams = ['$http', '$q', 'CacheFactory'];

    var _service = function ($http, $q, CacheFactory)
    {
        var _self = this;

        var _serviceBase = 'https://jsonplaceholder.typicode.com/albums';

        if (!CacheFactory.get('albumCache')) {
            CacheFactory.createCache('albumCache', {
                deleteOnExpire: 'aggressive',
                recycleFreq: 60000
            });
        }

        var _albumCache = CacheFactory.get('albumCache');


        _self.getAllAlbums = function ()
        {
            var deferred = $q.defer();

            $http.get(_serviceBase, {cache: _albumCache})
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

        _self.getAlbumById = function (albumId)
        {
            var deferred = $q.defer();

            $http.get(_serviceBase + '/' + albumId , {cache: _albumCache})
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

        _self.getPhotosByAlbumId = function (albumId)
        {
            var deferred = $q.defer();

            $http.get(_serviceBase + '/' + albumId + '/photos', {cache: _albumCache})
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

        return {
            getAllAlbums: _self.getAllAlbums,
            getAlbumById: _self.getAlbumById,
            getPhotosByAlbumId: _self.getPhotosByAlbumId
        };
    };

    _service.$inject = _injectParams;
    app.factory('albumService', _service);
});