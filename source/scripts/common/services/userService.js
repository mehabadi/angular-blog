define(['app'], function (app)
{
    'use strict';

    var _injectParams = ['$http', '$q'];

    var _service = function ($http, $q)
    {
        var _headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        var _serviceBase = 'https://jsonplaceholder.typicode.com/users';

        var _getAllUsers = function ()
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

        var _getUserById = function (userId)
        {
            var deferred = $q.defer();

            var request = {
                method: "GET",
                url: _serviceBase + '/' + userId,
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

        var _getUserPosts = function (userId)
        {
            var deferred = $q.defer();

            var request = {
                method: "GET",
                url: _serviceBase + '/' + userId + '/posts',
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
            getAllUsers: _getAllUsers,
            getUserById: _getUserById,
            getUserPosts: _getUserPosts
        };
    };

    _service.$inject = _injectParams;
    app.factory('userService', _service);
});