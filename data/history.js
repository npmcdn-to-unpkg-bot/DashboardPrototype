var oracledb = require('oracledb');
var config = require(__dirname + '/../config.js');
var fs = require('fs');
var async = require('async');
var queries;

function getQueries(cb) {
  fs.readFile(__dirname + '/../queries/queries.json', 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    queries = JSON.parse(data);
  });
}

function getHistoryInformation(startDate, endDate, cb) {
  var results = {
    "totalRevenueByMonth":"",
    "activeSubscriptions":"",
    "totalBilled":"",
    "actualRevenue":"",
    "authApprovedHist":"",
    "authHardDeclinedHist":"",
    "authSoftDeclinedHist":"",
    "authTechErrorHist":"",
    "optOutHist":"",
    "tcNotification":"",
    "authNotification":""
  };

  // oracledb.getConnection(
  //   config.database,
  //   function (err, connection) {
  //     if (err) {
  //       cb(err);
  //
  //       return;
  //     }
  //
  //     var methods = [
  //       //Total Revenue per month
  //       function(startDate, endDate, cb) {
  //         connection.execute(
  //           "",
  //           {
  //             start: { val: startDate, type: oracledb.DATE },
  //             end: {val: endDate, type: oracledb.DATE }
  //           },
  //           {
  //             outFormat: oracledb.ARRAY
  //           },
  //           function(err, totalRevenueByMonthNum) {
  //             if (err) {
  //               cb(err);
  //
  //               return;
  //             }
  //
  //             results.totalRevenueByMonth = totalRevenueByMonthNum;
  //           }
  //         );
  //       },
  //       // Active subscriptions
  //       function (startDate, endDate, cb) {
  //         connection.execute(
  //           "",
  //           {
  //             start: { val: startDate, type: oracledb.DATE },
  //             end: { val: endDate, type: oracledb.DATE }
  //           },
  //           {
  //             outFormat: oracledb.ARRAY
  //           },
  //           function(err, activeSubscriptionsNum) {
  //             if (err) {
  //               cb(err);
  //
  //               return;
  //             }
  //
  //             results.activeSubscriptions = activeSubscriptionsNum;
  //           }
  //         );
  //       },
  //       // Total Billed
  //       function (startDate, endDate, cb) {
  //         connection.execute(
  //           "",
  //           {
  //             start: { val: startDate, type: oracledb.DATE },
  //             end: { val: endDate, type: oracledb.DATE }
  //           },
  //           {
  //             outFormat: oracledb.ARRAY
  //           },
  //           function (err, totalBilledNum) {
  //             if (err) {
  //               cb(err);
  //
  //               return;
  //             }
  //
  //             results.totalBilled = totalBilledNum;
  //           }
  //         );
  //       },
  //       // Actual Revenue
  //       function (startDate, endDate, cb) {
  //         connection.execute(
  //           "",
  //           {
  //             start: { val: startDate, type: oracledb.DATE },
  //             end: { val: endDate, type: oracledb.DATE }
  //           },
  //           {
  //             outFormat: oracledb.ARRAY
  //           },
  //           function (err, actualRevenueNum) {
  //             if (err) {
  //               cb(err);
  //
  //               return;
  //             }
  //
  //             results.actualRevenue = actualRevenueNum;
  //           }
  //         );
  //       },
  //       // History of Approved Authorization
  //       function (startDate, endDate, cb) {
  //         connection.execute(
  //           "",
  //           {
  //             start: { val: startDate, type: oracledb.DATE },
  //             end: { val: endDate, type: oracledb.DATE }
  //           },
  //           {
  //             outFormat: oracledb.ARRAY
  //           },
  //           function (err, authApprovedHistNum) {
  //             if (err) {
  //               cb(err);
  //
  //               return;
  //             }
  //
  //             results.authApprovedHist = authApprovedHistNum;
  //           }
  //         );
  //       },
  //       // History of Hard Declined Authorization
  //       function (startDate, endDate, cb) {
  //         connection.execute(
  //           "",
  //           {
  //             start: { val: startDate, type: oracledb.DATE },
  //             end: { val: endDate, type: oracledb.DATE }
  //           },
  //           {
  //             outFormat: oracledb.ARRAY
  //           },
  //           function (err, authHardDeclinedHistNum) {
  //             if (err) {
  //               cb(err);
  //
  //               return;
  //             }
  //
  //             results.authHardDeclinedHist = authHardDeclinedHistNum;
  //           }
  //         );
  //       },
  //       // History of Soft Declined Authorization
  //       function (startDate, endDate, cb) {
  //         connection.execute(
  //           "",
  //           {
  //             start: { val: startDate, type: oracledb.DATE },
  //             end: { val: endDate, type: oracledb.DATE }
  //           },
  //           {
  //             outFormat: oracledb.ARRAY
  //           },
  //           function (err, authSoftDeclinedHistNum) {
  //             if (err) {
  //               cb(err);
  //
  //               return;
  //             }
  //
  //             results.authSoftDeclinedHist = authSoftDeclinedHistNum;
  //           }
  //         );
  //       },
  //       // History of Technical Error Authorization
  //       function (startDate, endDate, cb) {
  //         connection.execute(
  //           "",
  //           {
  //             start: { val: startDate, type: oracledb.DATE },
  //             end: { val: endDate, type: oracledb.DATE }
  //           },
  //           {
  //             outFormat: oracledb.ARRAY
  //           },
  //           function (err, authTechErrorHistNum) {
  //             if (err) {
  //               cb(err);
  //
  //               return;
  //             }
  //
  //             results.authTechErrorHist = authTechErrorHistNum;
  //           }
  //         );
  //       },
  //       // Opt-out History
  //       function (startDate, endDate, cb) {
  //         connection.execute(
  //           "",
  //           {
  //             start: { val: startDate, type: oracledb.DATE },
  //             end: { val: endDate, type: oracledb.DATE }
  //           },
  //           {
  //             outFormat: oracledb.ARRAY
  //           },
  //           function (err, optOutHistNum) {
  //             if (err) {
  //               cb(err);
  //
  //               return;
  //             }
  //
  //             results.optOutHist = optOutHistNum;
  //           }
  //         );
  //       },
  //       // Notifications for Trade Compliance
  //       function (startDate, endDate, cb) {
  //         connection.execute(
  //           "",
  //           {
  //             start: { val: startDate, type: oracledb.DATE },
  //             end: { val: endDate, type: oracledb.DATE }
  //           },
  //           {
  //             outFormat: oracledb.ARRAY
  //           },
  //           function (err, tcNotificationNum) {
  //             if (err) {
  //               cb(err);
  //
  //               return;
  //             }
  //
  //             results.tcNotification = tcNotificationNum;
  //           }
  //         );
  //       },
  //       // Notifications for Authorization
  //       function (startDate, endDate, cb) {
  //         connection.execute(
  //           "",
  //           {
  //             start: { val: startDate, type: oracledb.DATE },
  //             end: { val: endDate, type: oracledb.DATE }
  //           },
  //           {
  //             outFormat: oracledb.ARRAY
  //           },
  //           function (err, authNotificationNum) {
  //             if (err) {
  //               cb(err);
  //
  //               return;
  //             }
  //
  //             results.authNotification = authNotificationNum;
  //           }
  //         )
  //       }
  //     ];
  //
  //     async.series([
  //       getQueries(cb),
  //       async.parallel(methods),
  //       function (err) {
  //         connection.release(function(err) {
  //           if (err) {
  //             console.error(err.message);
  //           }
  //         });
  //
  //         if (err) {
  //           cb(err);
  //         } else {
  //           cb(null, results);
  //         }
  //       }
  //     ]);s
  //   }
  // );
}

module.exports.getHistoryInformation = getHistoryInformation;
