(function () {
    'use strict';

    /**
     * @function JwtService
     * 
     * @description
     * This AngularJS factory provides methods for JSON Web Token (JWT) based
     * authentication and authorization for the application.
     * 
     * @param {object} $cookies - The AngularJS cookies service
     * @param {object} $http - The AngularJS http service for AJAX communication
     * @param {object} $log - The AngularJS logging service
     * @param {object} $timeout - The AngularJS timeout service
     * @param {string} API_AUTH_URL - The authentication api url constant
     */
    function JwtService($cookies, $http, $log, $timeout, API_AUTH_URL) {
        var service = {
            signin: signin,
            signup: signup,
            signout: signout,
            beginSession: beginSession
        };
        return service;

        /**
         * @function signin
         * 
         * @description
         * Use this factory method for authenticating a user using username or
         * email and password.
         * 
         * @param {object} credentials - The user's authentication credentials
         * @param {function} callback - The callback function
         */
        function signin(credentials, callback) {
            $log.info('Attempting to sign in....');
            $timeout(function () {
                $http.post(`${API_AUTH_URL}/signin`, credentials).then(function (response) {
                    $log.info(`Got response: ${JSON.parse(response)}`);
                    if (response.status === 200) {
                        var result = {
                            success: true,
                            data: response.data
                        };
                        callback(result);
                    } else {
                        $log.error('Something went wrong!');
                        $log.error(errResponse);
                    }
                }, function (errResponse) {
                    $log.error(errResponse);
                });
            }, 5000);
        }

        /**
         * @function signup
         * 
         * @description
         * Use this factory method to register a new user with the application.
         * 
         * @param {object} payload - The new user's registration information
         */
        function signup(payload) {
            $log.info('Attempting to sign up....');
            return $http.post(`${API_AUTH_URL}/signup`, payload).then(function (response) {
                $log.info('Registration successful');
                $log.info(response);
                return response.data;
            }, function (errResponse) {
                $log.error('Unable to register! Please try later....');
                $log.error(errResponse);
            });
        }

        /**
         * @function signout
         * @description
         * Use this factory method to end a user's session.
         */
        function signout() {
            $log.info('Ending session....');
            $cookies.remove('accessToken');
        }

        /**
         * @function beginSession
         * @description
         * Use this factory method to start a user's session after successful authentication.
         * 
         * @param {object} tokenInfo - The JWT token of authenticated user
         */
        function beginSession(tokenInfo) {
            $log.info('Starting session....');
            var accessToken = {
                token: tokenInfo.token,
                type: tokenInfo.type
            };
            // Expire token after 3 days
            var expire = new Date();
            expire.setDate(expire.getDate() + 3);
            $cookies.putObject('accessToken', accessToken, { expires: expire });
        }
    }

    /**
     * Specify dependencies of @function JwtService
     */
    JwtService.$inject = ['$cookies', '$http', '$log', '$timeout', 'API_AUTH_URL'];

    /**
     * Register the @function JwtService as a factory with the module.
     */
    angular.module('jwt').factory('JwtService', JwtService);
})();
