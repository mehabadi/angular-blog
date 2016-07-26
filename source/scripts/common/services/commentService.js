define(['app'], function (app)
{
    'use strict';

    var _injectParams = ['$http', '$q', 'CacheFactory'];

    var _service = function ($http, $q, CacheFactory)
    {
        var _self = this;

        var _serviceBase = 'https://jsonplaceholder.typicode.com/comments';

        if (!CacheFactory.get('commentCache')) {
            CacheFactory.createCache('commentCache', {
                deleteOnExpire: 'aggressive',
                recycleFreq: 60000
            });
        }

        var _commentCache = CacheFactory.get('commentCache');

        _self.getAllComments = function ()
        {
            var deferred = $q.defer();

            $http.get(_serviceBase, {cache: _commentCache})
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
            getAllComments: _self.getAllComments,
            getCommentByPostId: _self.getCommentByPostId
        };
    };

    _service.$inject = _injectParams;
    app.factory('commentService', _service);
});