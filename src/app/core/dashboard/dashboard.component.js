(function () {
    'use strict';

    angular.module('core').component('appDashboard', {
        templateUrl: 'src/app/core/dashboard/dashboard.component.html',
        controller: AppDashboardController,
        controllerAs: '$ctrl'
    });

    AppDashboardController.$inject = ['$rootScope'];
    function AppDashboardController($rootScope) {
        var $ctrl = this;

        $ctrl.title = 'Cloud Connect';

        ////////////////

        $ctrl.$onInit = function () { };
        $ctrl.$onChanges = function (changesObj) { };
        $ctrl.$onDestroy = function () { };
    }
})();