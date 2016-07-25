define([], function ()
{
    'use strict';

    var app = angular.module('app', ['ngRoute', 'ngMaterial', 'routeResolverService', 'Routes', 'ngResource', 'ngSanitize']);
    
    //app.config(['$sceDelegateProvider', function($sceDelegateProvider) {
    //    $sceDelegateProvider.resourceUrlWhitelist(['self', /^https?:\/\/(cdn\.)?localhost/]);
    //}])


    app.config(
        [
            '$httpProvider',
            '$routeProvider',
            'routeResolverProvider',
            '$controllerProvider',
            '$compileProvider',
            '$filterProvider',
            '$provide',
            '$locationProvider',
            'routeConfigProvider',

            function ($httpProvider, $routeProvider, routeResolverProvider, $controllerProvider,
                      $compileProvider, $filterProvider, $provide, $locationProvider, routeConfigProvider)
            {
                app.register =
                {
                    controller: $controllerProvider.register,
                    //directive: $compileProvider.directive,
                    filter: $filterProvider.register,
                    //factory: $provide.factory,
                    //service: $provide.service
                };
                app.directive = $compileProvider.directive;
                app.factory = $provide.factory;
                app.service = $provide.service;

                //$locationProvider.html5Mode({
                //    enabled: true,
                //    requireBase: false
                //});

                $httpProvider.defaults.headers.common = {};
                $httpProvider.defaults.headers.post = {};
                $httpProvider.defaults.headers.put = {};
                $httpProvider.defaults.headers.patch = {};

                //set controllers folder
                routeResolverProvider.routeConfig.setRootDirectory('/scripts/pages');


                //Define routes - controllers and views will be loaded dynamically
                var routeProvider = routeResolverProvider.route;
                var routeConfig = routeConfigProvider.routes;
                
                if (routeConfig.routes !== undefined)
                {
                    angular.forEach(routeConfig.routes, function (route, path)
                    {
                        $routeProvider.when(path, routeProvider.resolve(route.alias, route.dependencies, route.controllerAs, route.secure));
                    });
                };

                if (routeConfig.defaultRoutePath !== undefined)
                {
                    $routeProvider.otherwise({ redirectTo: routeConfig.defaultRoutePath });
                }
            }
        ]);
    return app;
});