(function () {
    'use strict';

    angular.module('jwt').factory('JwtInterceptor', JwtInterceptor);

    JwtInterceptor.$inject = ['$cookies'];
    function JwtInterceptor($cookies) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if (config.url.startsWith('http://localhost:8080/api')) {
                    const accessToken = $cookies.getObject('accessToken');
                    if (accessToken) {
                        config.headers.authorization = accessToken.type + ' ' + accessToken.token;
                    }
                }
                return config;
            }
        };
    }
})();
