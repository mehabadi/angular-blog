(function (require)
{
    'use strict';

    require.config({
        baseurl: '/scripts',
        paths: {
            'jquery': '../assets/js/jquery.min',
            'bootstrap': '../assets/js/bootstrap.min',
            'angular': '../assets/js/angular.min',
            'angular-resource': '../assets/js/angular-resource.min',
            'angular-sanitize': '../assets/js/angular-sanitize.min',
            'angular-material': '../assets/js/angular-material.min',
            'angular-route': '../assets/js/angular-route.min',
            'angular-animation': '../assets/js/angular-animate.min',
            'angular-aria': '../assets/js/angular-aria.min',
            'angular-messages': '../assets/js/angular-messages.min',
            'text': '../assets/js/text',
            'domReady': '../assets/js/domReady',            
            'routeResolver': './common/services/routeResolver',
            'routes': 'routes',
            'prettyPhoto': '../assets/js/jquery.prettyPhoto',
            'angular-loading-bar': '../assets/js/loading-bar.min',
            'angular-md5': '../assets/js/angular-md5.min',
        },
        shim: {            
            angular: {
                deps: ['bootstrap'],
                exports: 'angular'
            },
            bootstrap: {
                deps: ['jquery'],
            },
            'angular-sanitize':{
                deps: ['angular'],
                exports: 'angular'
            },
            'angular-resource': {
                deps: ['angular'],
                exports: 'angular'
            },
            'angular-route': {
                deps: ['angular'],
                exports: 'angular'
            },
            'angular-animation': {
                deps: ['angular'],
                exports: 'angular'
            },
            'angular-messages':{
                deps: ['angular'],
                exports: 'angular'
            },
            'angular-aria': {
                deps: ['angular'],
                exports: 'angular'
            },
            'angular-loading-bar': {
                deps: ['angular'],
                exports: 'angular'
            },
            'angular-md5': {
                deps: ['angular'],
                exports: 'angular'
            },
            'angular-material':{
                deps: ['angular', 'angular-route', 'angular-resource', 'angular-animation', 'angular-aria', 'angular-messages', 'angular-sanitize', 'angular-loading-bar', 'angular-md5'],
            },
            'routeResolver': {
                deps: ['angular']
            },
            'routes' : {
                deps: ['angular']
            },
            'prettyPhoto': {
                deps: ['jquery'],
            },
            app: {
                deps: [
                    'jquery',
                    'angular',
                    'angular-material',                     
                    'routeResolver', 
					'routes',
                    'prettyPhoto'
                ]
            }
        },
        deps: ['app']
    });

    require(
        [
            'app',
            'domReady'
        ],
        function (app, document)
        {
            //bootstrapping app
            angular.bootstrap(document, [app.name]);
        }
    );
}(require));