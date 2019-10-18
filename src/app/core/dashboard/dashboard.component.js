(function () {
    'use strict';

    console.info('Inside dashboard.component.js');
    angular.module('core').component('appDashboard', {
        templateUrl: 'src/app/core/dashboard/dashboard.component.html',
        controller: AppDashboardController,
        controllerAs: '$ctrl'
    });

    AppDashboardController.$inject = ['$cookies', '$log', '$location', 'SessionService'];
    function AppDashboardController($cookies, $log, $location, SessionService) {
        $log.info('Inside AppDashboardController....');
        var $ctrl = this;
        $ctrl.title = 'Cloud Connect';
        $ctrl.loggedInUser = null;
        $ctrl.$onInit = function () {
            $log.info('AppDashboardController::$onInit()....');
            SessionService.getLoggedInUserDetails().then(function (data) {
                $ctrl.loggedInUser = data;
            });
        };

        $ctrl.signout = function () {
            $log.info('AppDashboardController::signout()....');
            $ctrl.loggedInUser = null;
            SessionService.endSession();
            $location.path('/sign-in');
        };
    }
})();
