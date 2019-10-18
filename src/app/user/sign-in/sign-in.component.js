(function () {
    'use strict';

    /**
     * @function SignInController
     * @description
     * This function is the controller for the sign-in component.
     * 
     * @param {any} $location - The core AngularJS service that parses the URL in the browser's address bar and makes the URL available to the application.
     * @param {any} $log - The core AngularJS service for logging
     * @param {any} JwtService - The custom service for JWT based authentication
     */
    function SignInController($location, $log, JwtService) {
        $log.info('Inside SignInController');
        var $ctrl = this;
        $ctrl.credentials = null;
        $ctrl.loading = false;

        $ctrl.onSubmit = function () {
            $log.info('SignInController::onSubmit....');
            $ctrl.loading = true;
            JwtService.signin($ctrl.credentials, function (result) {
                $log.info(result);
                if (result.success) {
                    JwtService.beginSession(result.data);
                    $location.path('/');
                } else {
                    $log.error(result);
                    $ctrl.loading = false;
                }
            });
        };

        $ctrl.$onInit = function () {
            $log.info('SignInController::$onInit....');
            $ctrl.credentials = {
                usernameOrEmail: '',
                password: ''
            };
            $ctrl.loading = false;
        };
    }

    SignInController.$inject = ['$location', '$log', 'JwtService'];
    angular.module('user').component('appSignIn', {
        templateUrl: 'src/app/user/sign-in/sign-in.component.html',
        controller: SignInController,
        controllerAs: '$ctrl'
    });
})();
