define(['app'], function (app)
{
    'use strict';

    var _injectParams = ['$http', '$q'];

    var _service = function ($http, $q)
    {               
        var _getEvent = function (eventId)
        {
            var deferred = $q.defer();

            $http({ method: 'GET', url: '/app/data/event/:id.json', id: '@id' })
                .success(function (data, status, headers, config)
                {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config)
                {
                    deferred.reject(status);
                });

            return deferred.promise;
        };

        var _getAllEvents = function ()
        {
            var deferred = $q.defer();

            $http({ method: 'GET', url: '/data/event/999.json' })
                .success(function (data, status, headers, config)
                {                    
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config)
                {                    
                    deferred.reject(status);
                });

            return deferred.promise;
        };


        return {           
            getAllEvents: _getAllEvents,
            getEvent: _getEvent,
            content: _contents
        };
    }

    _service.$inject = _injectParams;

    app.factory('EventService', _service);
});