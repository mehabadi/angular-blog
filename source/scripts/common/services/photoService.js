define(['app'], function (app)
{
    'use strict';

    var _injectParams = ['$http', '$q'];

    var _service = function ($http, $q)
    {
        var _serviceBase = 'https://jsonplaceholder.typicode.com/photos';

        var _getAllPhotos = function ()
        {
            var deferred = $q.defer();

            $http.jsonp(_serviceBase + '?callback=JSON_CALLBACK')
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

        var _getPhotoById = function (photoId)
        {
            var deferred = $q.defer();

            var request = {
                method: "GET",
                url: _serviceBase + '/' + photoId,
            };
            $http(request)
                .then(function (results)
                {                                        
                    deferred.resolve(results.data);
                }, function (status)
                {
                    deferred.reject(status);
                });


            return deferred.promise;
        }

        return {
            getAllPhotos: _getAllPhotos,
            getPhotoById: _getPhotoById
        };
    };

    _service.$inject = _injectParams;
    app.factory('photoService', _service);
});