define(['app'], function (app)
{
    'use strict';

    var _injectParams = ['$http', '$q', 'CacheFactory'];

    var _service = function ($http, $q, CacheFactory)
    {
        var _self = this;

        var _serviceBase = 'https://jsonplaceholder.typicode.com/users';

        if (!CacheFactory.get('userCache')) {
            CacheFactory.createCache('userCache', {
                deleteOnExpire: 'aggressive',
                recycleFreq: 60000
            });
        }

        var _userCache = CacheFactory.get('userCache');

        _self.getAllUsers = function ()
        {
            var deferred = $q.defer();

            $http.get(_serviceBase, {cache: _userCache})
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

        _self.getUserById = function (userId)
        {
            var deferred = $q.defer();

            $http.get(_serviceBase + '/' + userId, {cache: _userCache})
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

        _self.getUserPosts = function (userId)
        {
            var deferred = $q.defer();

            $http.get(_serviceBase + '/' + userId + '/posts', {cache: _userCache})
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
            getAllUsers: _self.getAllUsers,
            getUserById: _self.getUserById,
            getUserPosts: _self.getUserPosts
        };
    };

    _service.$inject = _injectParams;
    app.factory('userService', _service);
});