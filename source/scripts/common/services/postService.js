define(['app'], function (app)
{
    'use strict';

    var _injectParams = ['$http', '$q', 'CacheFactory'];

    var _service = function ($http, $q, CacheFactory)
    {
        var _self = this;

        var _serviceBase = 'https://jsonplaceholder.typicode.com/posts';

        if (!CacheFactory.get('postCache')) {
            CacheFactory.createCache('postCache', {
                deleteOnExpire: 'aggressive',
                recycleFreq: 60000
            });
        }

        var _postCache = CacheFactory.get('postCache');

        _self.getAllPosts = function ()
        {
            var deferred = $q.defer();

            $http.get(_serviceBase, {cache: _postCache})
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

        _self.getPostById = function (postId)
        {
            var deferred = $q.defer();

            $http.get(_serviceBase + '/' + postId, {cache: _postCache})
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

        _self.getCommentsByPostId = function (postId)
        {
            var deferred = $q.defer();


            $http.get(_serviceBase + '/' + postId + '/comments', {cache: _postCache})
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
            getAllPosts: _self.getAllPosts,
            getPostById: _self.getPostById,
            getCommentsByPostId: _self.getCommentsByPostId
        };
    };

    _service.$inject = _injectParams;
    app.factory('postService', _service);
});