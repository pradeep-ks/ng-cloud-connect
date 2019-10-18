(function () {
    'use strict';

    function config($routeProvider, $httpProvider) {
        $routeProvider
            .when('/dashboard', {
                template: '<app-dashboard></app-dashboard>'
            }).when('/sign-in', {
                template: '<app-sign-in></app-sign-in>'
            }).when('/sign-up', {
                template: '<app-sign-up></app-sign-up>'
            }).when('/', {
                redirectTo: '/dashboard'
            }).otherwise({
                redirectTo: '/sign-in'
            });
        $httpProvider.interceptors.push('JwtInterceptor');
    }

    config.$inject = ['$routeProvider', '$httpProvider'];
    
    angular.module('cloudApp').config(config);
})();
