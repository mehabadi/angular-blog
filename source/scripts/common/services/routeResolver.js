define(['require'], function (require)
{
    'use strict';

    var routeResolver = function ()
    {
        this.$get = function ()
        {
            return this;
        };

        this.routeConfig = function ()
        {
            var _rootDir = '/scripts';            

            var _setRootDirectory = function (rootDirectory)
            {
                _rootDir = rootDirectory;
            };

            var _getRootDirectory = function ()
            {
                return _rootDir;
            };

            return {                
                setRootDirectory: _setRootDirectory,
                getRootDirectory: _getRootDirectory
            }
        }();

        this.route = function (routeConfig)
        {
            var _resolve = function (baseName, dependencies, controllerAs, secure)
            {				
                var _appPath = routeConfig.getRootDirectory();
                var routeDef = {};

                baseName = baseName.toLowerCase();

                var folderName = '/' + baseName + '/';

                if (controllerAs) routeDef.controllerAs = controllerAs;
                routeDef.templateUrl = _appPath + folderName + 'view.html';                
                routeDef.controller = baseName + 'Controller';
                routeDef.secure = (secure) ? secure : false;
                routeDef.resolve =
                    {
                        load: ['$q', '$rootScope', function ($q, $rootScope)
                        {
                            var _dependencies = [];
                            if (dependencies)
                            {
                                angular.forEach(dependencies, function (dependency)
                                {
                                    _dependencies.push(_appPath + '/' + dependency + '.js');
                                });
                            }
                            _dependencies.push(_appPath + folderName + 'package.js');
                            _dependencies.push(_appPath + folderName + baseName + 'Controller.js');
                            return _resolveDependencies($q, $rootScope, _dependencies);
                        }]
                    }

                return routeDef;
            },
            _resolveDependencies = function ($q, $rootScope, dependencies)
            {
                var deferred = $q.defer();

                require(dependencies, function ()
                {
                    $rootScope.$apply(function ()
                    {
                        deferred.resolve();
                    });
                });

                return deferred.promise;
            };

            return {
                resolve: _resolve
            }
        }(this.routeConfig);
    };

    var servicesApp = angular.module('routeResolverService', []);

    //Must be a provider since it will be injected into module.config()    
    servicesApp.provider('routeResolver', routeResolver);
});