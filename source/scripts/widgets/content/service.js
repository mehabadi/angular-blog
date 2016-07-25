define(['app'], function (app)
{
    'use strict';

    var _injectParams = ['$http', '$resource', '$q'];

    var _service = function ($http, $resource, $q)
    {
        var _headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        var _serviceBase = 'http://192.168.12.11:8081/api/Contents';//'http://localhost:46575/api/Contents/';

        var _isInit = false;

        var _isReady = function ()
        {
            return _isInit;
        }

        var _getAllContents = function ()
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

        var _getContentById = function (contentId)
        {
            var deferred = $q.defer();

            //$http({
            //    method: 'JSONP',
            //    url: _serviceBase + '?callback=JSON_CALLBACK',
            //    params: { id: contentId }
            //})
            //.success(function (data, status, headers, config)
            //{
            //    deferred.resolve(data);
            //})
            //.error(function (data, status, headers, config)
            //{
            //    deferred.reject(status);
            //});
            var request = {
                method: "GET",
                url: _serviceBase + '?callback=JSON_CALLBACK',
                params: { id: contentId }
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

        var _insert = function (content)
        {
            var deferred = $q.defer();

            var request = {
                method: "POST",
                url: _serviceBase,
                // data: { 'id': '1', 'name': 'ííí', 'family': 'family1' }//user
                // data: JSON.stringify(user),
                //headers: {
                //    'Content-Type': 'application/json'//undefined
                //}

            };

            $http(request)//.post(_serviceBase, content)
                //({

                //    method: "POST",
                //    //headers: _headers,
                //    //headers: { 'Content-Type': 'application/json' },
                //    headers: {
                //                    'Content-Type': 'application/json; charset=utf-8',
                //                    //'Access-Control-Allow-Origin': 'localhost',//'*',
                //                    'Access-Control-Allow-Methods': 'POST, GET, PUT',                        
                //                    'Accept': 'application/json',
                //                },
                //    transformRequest: angular.identity,
                //    url: _serviceBase,
                //    data: content
                //})
                .then(function (results)
                {                    
                    content.id = results.data.id;
                    deferred.resolve(results.data);
                }, function (status)
                {
                    deferred.reject(status);
                });

            return deferred.promise;
        }

        return {
            getAllContents: _getAllContents,
            getContentById: _getContentById,
            insert: _insert
        };
    };

    _service.$inject = _injectParams;
    app.factory('contentService', _service);
});