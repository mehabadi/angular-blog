define(['app'], function (app)
{
    'use strict';

    var _injectParams = ['$http', '$resource', '$q'];

    var _service = function ($http, $resource, $q)
    {
        var _serviceBase = 'https://jsonplaceholder.typicode.com/posts';

        var _getAllPosts = function ()
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

        var _getPostById = function (postId)
        {
            var deferred = $q.defer();

            var request = {
                method: "GET",
                url: _serviceBase + '/' + postId,
                //params: { id: postId }
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
            getAllPosts: _getAllPosts,
            getPostById: _getPostById
        };
    };

    _service.$inject = _injectParams;
    app.factory('postService', _service);
});