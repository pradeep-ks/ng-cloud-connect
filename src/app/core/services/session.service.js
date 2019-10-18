(function () {
    'use strict';

    function SessionService($cookies, $log, UserService, JwtService) {
        $log.info('Inside SessionService....');
        var service = {
            endSession: endSession,
            getLoggedInUserDetails: getLoggedInUserDetails,
            isAuthenticated: isAuthenticated,
            isAuthorized: isAuthorized
        };
        return service;

        function getLoggedInUserDetails() {
            $log.info('SessionService::getLoggedInUserDetails....');
            return UserService.getLoggedInUserDetails().then(function (data) {
                $log.info(data);
                $cookies.putObject('loggedInUser', data);
                return data;
            }, function (error) {
                $log.error(error);
            });
        }

        function endSession() {
            $log.info('SessionService::endSession....');
            $cookies.remove('loggedInUser');
            JwtService.signout();
        }

        function isAuthenticated() {
            $log.info('SessionService::isAuthenticated....');
            $log.info($cookies.get('accessToken'));
            return $cookies.get('accessToken') !== undefined;
        }

        function isAuthorized(role) {
            $log.info('SessionService::isAuthorized....');
            var loggedInUser = getLoggedInUserDetails();
            return (isAuthenticated() && (loggedInUser !== null && loggedInUser.role === role));
        }
    }

    SessionService.$inject = ['$cookies', '$log', 'UserService', 'JwtService'];
    angular.module('core').factory('SessionService', SessionService);
})();