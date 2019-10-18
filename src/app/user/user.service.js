(function () {
    'use strict';

    angular.module('user').factory('UserService', UserService);

    UserService.$inject = ['$http', '$log', '$q', 'API_USER_URL'];

    /**
     * @function UserService
     * @description
     * This is a AngularJS factory that returns a service object. Use this service
     * to check availability of username, email and retrieve details about the
     * logged in user.
     * 
     * @param {any} $http - The core AngularJS service that facilitates communication with remote HTTP servers
     * @param {any} $log - The core AngularJS service for logging
     * @param {any} $q - The core AngularJS service that helps us run functions asynchronously
     * @param {string} API_USER_URL - The server's URL for user resource
     */
    function UserService($http, $log, $q, API_USER_URL) {
        var service = {
            getLoggedInUserDetails: getLoggedInUserDetails,
            checkUsernameAvailability: checkUsernameAvailability,
            checkEmailAvailability: checkEmailAvailability
        };

        return service;

        /**
         * @function getLoggedInUserDetails
         * @description
         * Use this service method to retrieve logged in user details from the server.
         */
        function getLoggedInUserDetails() {
            return $http.get(`${API_USER_URL}/loggedInUser`).then(handleSuccess, handleError);
        }

        /**
         * @function checkUsernameAvailability
         * @description
         * Use this service method to check availability of username.
         * 
         * @param {string} username - The username to check
         */
        function checkUsernameAvailability(username) {
            return $http.get(`${API_USER_URL}/check-username?username=${username}`).then(handleSuccess, handleError);
        }

        /**
         * @function checkEmailAvailability
         * @description
         * Use this service method to check availability of email.
         * 
         * @param {string} email - The email to verify
         */
        function checkEmailAvailability(email) {
            return $http.get(`${API_USER_URL}/check-email?email=${email}`).then(handleSuccess, handleError);
        }

        /**
         * @function handleSuccess
         * @description
         * This local function handles success response from the server.
         * 
         * @param {any} response - The HTTP Response object
         */
        function handleSuccess(response) {
            $log.info(response);
            var deferred = $q.defer();
            deferred.resolve(response.data);
            return deferred.promise;
        }

        /**
         * @function handleError
         * @description
         * This local function handles error response from the server.
         * 
         * @param {any} reason - The HTTP Response object
         */
        function handleError(reason) {
            $log.error(reason);
            var deferred = $q.defer();
            deferred.reject(reason);
            return deferred.promise;
        }
    }
})();