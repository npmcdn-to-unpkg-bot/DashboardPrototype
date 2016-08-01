var oracledb = require('oracledb');
var config = require(__dirname + '/../config.js');
var queries;
var async = require('async');
var fs = require('fs');

function getTcInformation(cb) {
  var results = {
    'billPlansSent':"",
    'tcSuccessStatus':"",
    'tcRejectedStatus':"",
    'tcWaitingStatus':"",
    'tcRejectedResponse':""
  };
  // 
  // oracledb.getConnection(
  //   config.database,
  //   function(err, connection) {
  //     if (err) {
  //       cb(err);
  //
  //       return;
  //     }
  //
  //     var methods = [
  //       function(cb) {
  //         connection.execute(
  //           '',
  //           {},
  //           {
  //             outFormat: oracledb.ARRAY
  //           },
  //           function(err, billPlansSentNum) {
  //             if (err) {
  //               cb(err);
  //
  //               return;
  //             }
  //
  //             results.billPlansSent = billPlansSentNum;
  //           }
  //         );
  //       },
  //         function(cb) {
  //           connection.execute(
  //             '',
  //             {},
  //             {
  //               outFormat: oracledb.ARRAY
  //             },
  //             function(err, tcSuccessStatusNum) {
  //               if (err) {
  //                 cb(err);
  //
  //                 return;
  //               }
  //
  //               results.tcSuccessStatus = tcSuccessStatusNum;
  //             }
  //           );
  //         },
  //
  //         function(cb) {
  //           connection.execute(
  //             '',
  //             {},
  //             {
  //               outFormat: oracledb.ARRAY
  //             },
  //             function(err, tcRejectedStatusNum) {
  //               if (err) {
  //                 cb(err);
  //
  //                 return;
  //               }
  //
  //               results.tcRejectedStatus = tcRejectedStatusNum;
  //             }
  //           );
  //         },
  //
  //         function(cb) {
  //           connection.execute(
  //             '',
  //             {},
  //             {
  //               outFormat: oracledb.ARRAY
  //             },
  //             function(err, tcWaitingStatusNum) {
  //               if (err) {
  //                 cb(err);
  //
  //                 return;
  //               }
  //
  //               results.tcRejectedStatus = tcRejectedStatusNum;
  //             }
  //           );
  //         },
  //
  //         function(cb) {
  //           connection.execute(
  //             '',
  //             {},
  //             {
  //               outFormat: oracledb.ARRAY
  //             },
  //             function(err, tcRejectedResponseNum) {
  //               if (err) {
  //                 cb(err);
  //
  //                 return;
  //               }
  //
  //               results.tcRejectedResponse = tcRejectedResponseNum;
  //             }
  //           );
  //         }
  //     ];
  //
  //     async.series([
  //       getQueries(cb),
  //       async.parallel(methods),
  //       function(cb) {
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
  //     ]);
  //   }
  // );
}

module.exports.getTcInformation = getTcInformation;
