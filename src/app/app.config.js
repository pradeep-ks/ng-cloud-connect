(function () {
    'use strict';

    function config($httpProvider) {
        $httpProvider.interceptors.push('JwtInterceptor');
    }
    config.$inject = ['$httpProvider'];
    angular.module('cloudApp').config(config);
})();
