'use strict';

angular.module('officeTestApp', [
    'ui.router',
    'ngResource',
    'ngSanitize',
    'ngMessages'
  ]
)

    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
      $stateProvider.state('home', {
        url: '/',
        templateUrl: 'index.html'
      });

      $stateProvider.state('willRefresh', {
        url: '/will-refresh',
        controller: 'WillRefreshCtrl as WillRefreshCtrl'
      });

      $stateProvider.state('refreshed', {
        url: '/refreshed',
        templateUrl: 'officehome.html',
        controller: 'RefreshedCtrl as RefreshedCtrl'
      });

      $urlRouterProvider.otherwise('/');
    })

    .controller('AppCtrl', function($scope, currentUser) {

    })

    .controller('WillRefreshCtrl', function(currentUser, $state, alert) {
      alert('Loading', 'Currently Loading', 'Loading information');

    })
