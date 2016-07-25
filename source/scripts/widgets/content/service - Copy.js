define(['app'], function (app)
{
    'use strict';

    var _injectParams = ['$http', '$q'];

    var _service = function ($http, $q)
    {
        var _isInit = false;

        var _isReady = function ()
        {
            return _isInit;
        }

        var _getAllContents = function ()
        {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: '/data/content/all.json'
            })
                .success(function (data, status, headers, config)
                {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config)
                {
                    deferred.reject(status);
                });

            //$http.get('/data/content/all.json')
            //    .then(function (result)
            //    {
            //        angular.copy(result.data, _contents);
            //        _isInit = true;
            //        deferred.resolve();
            //        //success
            //    }, function ()
            //    {
            //        //error
            //        deferred.reject();
            //    });

            return deferred.promise;
        }

        var _getContentById = function ()
        {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: '/data/content/1.json',//'/data/content/:id.json',
                id: '@id'
            })
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
            getAllContents: _getAllContents,
            getContentById: _getContentById
        };
    };

    _service.$inject = _injectParams;
    app.factory('contentService', _service);
});