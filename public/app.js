// 'use strict';
(function() {
  angular.module('officeTestApp', [])
      .constant('API_URL', '/api/v1/')

      .controller('TestCtrl', ['$http', 'API_URL', function($http, API_URL) {
          this.data = "";
          var ctrl = this;
          console.log(API_URL + 'test');
          $http.get(API_URL + 'test')
              .then(function success(res) {
                if (res.status != 200) {
                  console.log('API error status: ' + status);
                } else {
                  ctrl.data = res.data;
                  console.log(res.data.length);
                }
              }, function error(res) {
                console.log('Error: ' + res.error);
                alert('fetch failed','Fetch failed', res.error);
              });
        }]);

    var dashboard = angular.module('dashboard', [])
        .constant('API_URL', '/api/v1/');

    dashboard.controller('ProcessController', ['$http', function($http) {
      this.processes =[
        {
          name: 'OSB',
          address: '',
          status: 'loading'
        },
        {
          name: 'Web Server 1',
          address: '',
          status: 'loading'
        },
        {
          name: 'Web Server 2',
          address: '',
          status: 'loading'
        },
        {
          name: 'Batch Server',
          address: '',
          status: 'loading'
        },
        {
          name: 'Notification Server',
          address: '',
          status: 'loading'
        },
        {
          name: 'CM Server 1',
          address: '',
          status: 'loading'
        },
        {
          name: 'CM Server 2',
          address: '',
          status: 'loading'
        },
        {
          name: 'DM Server 1',
          address: '',
          status: 'loading'
        },
        {
          name: 'DM Server 2',
          address: '',
          status: 'loading'
        },
        {
          name: 'DM Server 3',
          address: '',
          status: 'loading'
        },
        {
          name: 'BRM Database',
          address: '',
          status: 'loading'
        }];

      this.isLoading = function(server) {
        if (server.status === 'loading') {
          return true;
        } else {
          return false;
        }
      }

      this.updateStatus = function(server) {
        $http.get(server.address).then(function success() {
          for (var obj in this.processes) {
            if (obj.name === server.name) {
              obj.status = 'success';
            }
          }
        }, function error() {
          console.log('Error connecting to ' + server.name);
          for (var obj in this.processes) {
            if (obj.name === server.name) {
              obj.status = 'error';
            }
          }
        })
      };

      this.fullUpdate = function() {
        for (var server in this.processes) {
          this.updateStatus(server);
        }
      }

      var controller = this;

      angular.element(document).ready(function() {
        controller.fullUpdate();
      });
    }]);
    //
    // dashboard.controller('InitController', ['$http', 'API_URL', function($http, API_URL) {
    //   var ctrl = this;
    //   var data = {};
    //   angular.element(document).ready(function() {
    //     $http.get(API_URL + 'update/')
    //       .then(function success(res) {
    //         ctrl.data = res.data;
    //       }, function error(res) {
    //         alert('danger', 'Refresh Failed', res.error);
    //       });
    //   });
    // }])

    dashboard.controller('DashboardController', ['$http', function($http) {
      // Updates the Refresh Times at the bottom of the cards in a given section
      // If id given is blank then the entire document's refresh times get updated
      this.updateTimes = function(id) {
        var date = new Date();
        var refreshTimes = (id === '' ? document.getElementsByClassName("refresh-time") : document.getElementById(id).getElementsByClassName("refresh-time"));
        for (var i = 0; i < refreshTimes.length; i ++) {
          refreshTimes[i].innerHTML = date.toLocaleDateString() + " " + date.toLocaleTimeString();
        }
      }
    }]);

    dashboard.controller('OverviewController', ['$http', 'API_URL', function ($http, API_URL) {
      this.data = "";
      var ctrl = this;
      this.update = function() {
        $http.get(API_URL + 'update/overview')
            .then(function success(res) {
              console.log(res.data);
              ctrl.data = res.data;
              console.log("data " + ctrl.data.toString());
              console.log(ctrl.data.overview.orderInformation.ordersReceived);
              updateOverview(ctrl.data);
              tcBillStatus(ctrl.data, {'chartId':'ov-tc-status', 'tooltipId':'ov-tc-info', 'tooltipHeadingId':'ov-tc-info-status'});
            }, function error(res) {
              alert('danger', 'Overview Fetch failed', res.error);
            });
      };

      angular.element(document).ready(function() {
        ctrl.update();
      });
    }]);

    dashboard.controller('TradeComplianceController', ['$http', 'API_URL', function ($http, API_URL) {
      this.data = "";
      var ctrl = this;

      this.update = function () {
        $http.get(API_URL + 'update/tc')
            .then(function success(res) {
              ctrl.data = res.data;
              tcBillStatus(ctrl.data, {'chartId': 'tc-bill-status', 'tooltipId':'tc-bill-info', 'tooltipHeadingId':'tc-bill-info-status'});
              ctrl.rejectedNotifNum = ctrl.data.tc.tcRejectedResponse;
              updateTc(ctrl.data);
            }, function error(res) {
              alert('danger', 'TC Fetch Failed', res.error);
            });
      };

      angular.element(document).ready(function() {
        ctrl.update();
      });
    }]);

    dashboard.controller('AuthController', ['$http', 'API_URL', function ($http, API_URL) {
      this.data = "";
      var ctrl = this;

      this.update = function () {
        $http.get(API_URL + 'update/auth')
            .then(function success(res) {
              ctrl.data = res.data;
              authResponse(ctrl.data);
              updateAuth(ctrl.data);
              ctrl.softNotifNum = ctrl.data.auth.authSoftDeclineResponse;
              ctrl.softNotifPercent = ctrl.data.auth.authSoftDeclineResponse / ctrl.data.auth.authSoftDeclined * 100;
              ctrl.hardNotifNum = ctrl.data.auth.authHardDeclineResponse;
              ctrl.hardNotifPercent = ctrl.data.auth.authHardDeclineResponse / ctrl.data.auth.authHardDeclined * 100;
            }, function error(res) {
              alert('danger', 'Auth Fetch Failed', res.error);
            });
      };

      angular.element(document).ready(function() {
        ctrl.update();
      });
    }]);

    dashboard.controller('OmegaArController', ['$http', 'API_URL', function ($http, API_URL) {
      this.data = "";
      var ctrl = this;

      this.update = function () {
        $http.get(API_URL + 'update/omegaar')
            .then(function success(res) {
              ctrl.data = res.data;
              updateOmega(ctrl.data);
            }, function error(res) {
              alert('danger', 'Omega AR Fetch Failed', res.error);
            });
      };

      angular.element(document).ready(function() {
        ctrl.update();
      });
    }]);

    dashboard.controller('HistoryController', ['$http', 'API_URL', function ($http, API_URL) {
      this.data="";
      var ctrl = this;

      this.update = function () {
        var startDate = document.getElementById('startDate').value.toString();
        var endDate = document.getElementById('endDate').value.toString();
        $http.get(API_URL + 'update/history/' + startDate + '/' + endDate)
            .then(function success(res) {
              ctrl.data = res.data;
            }, function error(res) {
              alert('danger', 'History Fetch Failed', res.error);
            });
      };

      angular.element(document).ready(function() {
        ctrl.update();
      });
    }]);
})();
