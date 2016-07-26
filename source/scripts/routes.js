
define([], function ()
{
    'use strict';

    var routeConfig = function ()
    {
        this.$get = function ()
        {
            return this;
        };

        this.routes = {
            defaultRoutePath: '/',
            routes:
            {
				'/gallery': {
                    alias: 'gallery',
                    dependencies: [],
                    controllerAs: 'gallery',
                    //secure: false
                },
                '/gallery/album/:id': {
                    alias: 'album',
                    dependencies: [],
                    controllerAs: 'album',
                    //secure: false
                },
                '/blog': {
                    alias: 'blog',
                    dependencies: [],
                    controllerAs: 'blog',
                    //secure: false
                },
                '/blog/single/:id': {
                    alias: 'single',
                    dependencies: [],
                    controllerAs: 'single',
                    //secure: false
                },
                '/user/:id': {
                    alias: 'user',
                    dependencies: [],
                    controllerAs: 'user',
                    //secure: false
                },
                '/': {
                    alias: 'blog',
                    dependencies: [],
                    controllerAs: 'blog',
                    //secure: false
                },
                //'/:module': {
                //    alias: 'home',
                //    controller: 'home',
                //    templateUrl: '/scripts/pages/home/view.html',
                //    dependencies: [],
                //    controllerAs: 'home',
                //    //secure: false
                //},
                //'/:module/:action/:id': {
                //    alias: 'home',
                //    dependencies: [],
                //    controllerAs: 'home',
                //    //secure: false
                //},

            },

        };
    }

    var routeService = angular.module('Routes', []);

    routeService.provider('routeConfig', routeConfig);

});