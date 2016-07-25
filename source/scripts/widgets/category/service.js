define(['app'], function (app)
{
    'use strict';

    var _injectParams = ['$http', '$q'];

    var _service = function ($http, $q)
    {
        var _getAllCategories = function ()
        {
            var deferred = $q.defer();

            $http.jsonp('http://localhost:46575/api/Categories/?callback=JSON_CALLBACK')
                .success(function (data, status, headers, config)
                {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config)
                {
                    deferred.reject(status);
                })

            return deferred.promise;
        };

        return {
            getAllCategories: _getAllCategories
        }
    };

    _service.$inject = _injectParams;
    app.factory('categoryService', _service);
});