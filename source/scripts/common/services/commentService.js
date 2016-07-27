define(['app'], function (app)
{
    'use strict';

    var _injectParams = ['$http', '$q', 'CacheFactory'];

    var _service = function ($http, $q, CacheFactory)
    {
        var _self = this;

        var _serviceBase = 'https://jsonplaceholder.typicode.com';

        var _newComment = {};

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

            $http.get(_serviceBase + '/comments', {cache: _commentCache})
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

            $http.get(_serviceBase + '/posts/' + postId + '/comments', {cache: _commentCache})
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

        var _setNewComment = function(newItem){
            _newComment.postId = newItem.postId;
            _newComment.name = newItem.name;
            _newComment.email = newItem.email;
            _newComment.body = newItem.body;
        };

        _self.addComment = function(newComment)
        {
            _setNewComment(newComment);
            var deferred = $q.defer();

            $http.post(_serviceBase + '/comments', _newComment)
                .then(function (result) {
                    //success
                    _newComment.id = result.data.id;

                    //merge with existing list of comments
                    var cachedData = _commentCache.get(_serviceBase + '/posts/' + _newComment.postId + '/comments');
                    var newCache = {};
                    if(cachedData[1]){
                        newCache = angular.fromJson(cachedData[1])
                    }
                    newCache.push(_newComment);
                    cachedData[1] = angular.toJson(newCache);
                    _commentCache.put(_serviceBase + '/posts/' + _newComment.postId + '/comments',  cachedData);
                    deferred.resolve(true);
                }, function () {
                    //error
                    deferred.reject();
                });

            return deferred.promise;
        }

        return {
            getAllComments: _self.getAllComments,
            getCommentsByPostId: _self.getCommentsByPostId,
            addComment: _self.addComment
        };
    };

    _service.$inject = _injectParams;
    app.factory('commentService', _service);
});