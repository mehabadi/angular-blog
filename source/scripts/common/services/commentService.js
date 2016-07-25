define(['app'], function (app)
{
    'use strict';

    var _injectParams = ['$http', '$resource', '$q'];

    var _service = function ($http, $resource, $q)
    {
        var _serviceBase = 'https://jsonplaceholder.typicode.com/comments';

        var _getAllComments = function ()
        {
            var deferred = $q.defer();

            $http.jsonp(_serviceBase + 'comments?callback=JSON_CALLBACK')
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

        var _getCommentByPostId = function (postId)
        {
            var deferred = $q.defer();

            var request = {
                method: "GET",
                url: _serviceBase,
                params: { postId: postId }
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
            getAllComments: _getAllComments,
            getCommentByPostId: _getCommentByPostId
        };
    };

    _service.$inject = _injectParams;
    app.factory('commentService', _service);
});