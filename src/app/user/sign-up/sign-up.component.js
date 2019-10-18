(function () {
    'use strict';

    /**
     * @function SignUpController
     * @description
     * This function is the controller for the sign-up component.
     * 
     * @param {any} $location - The core AngularJS service that parses the URL in the browser's address bar and makes the URL available to the application.
     * @param {any} $log - The core AngularJS service for logging
     * @param {any} JwtService - The custom service for JWT based authentication
     */
    function SignUpController($location, $log, JwtService) {
        var $ctrl = this;
        $ctrl.userData = null;
        $ctrl.loading = false;

        $ctrl.onSubmit = function () {
            $log.info('Attempting to register....');
            JwtService.signup($ctrl.userData).then(function (result) {
                $log.info(result);
                alert('Registration successful');
                $location.path('/');
            });
        };

        $ctrl.$onInit = function () {
            $ctrl.userData = {
                username: '',
                password: '',
                email: '',
                fullName: ''
            };
            $ctrl.loading = false;
        };
    }

    SignUpController.$inject = ['$location', '$log', 'JwtService'];

    angular.module('user').component('appSignUp', {
        templateUrl: 'src/app/user/sign-up/sign-up.component.html',
        controller: SignUpController,
        controllerAs: '$ctrl'
    });
})();