var oracledb = require('oracledb');
var fs = require('fs');
var config = require(__dirname + '/../config.js');
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

// function getToBeBilled(cb) {
//     oracledb.getConnection(
//       config.database,
//       function(err, connection) {
//           if (err) {
//             cb(err);
//
//             return;
//           }
//
//           connection.execute(
//             // INSERT STATEMENT HERE
//             'SELECT * FROM account_t',
//             {},
//             {
//               outFormat: oracledb.OBJECT
//             },
//             function(err, results) {
//                 if(err) {
//                     connection.release(function(err) {
//                         if(err) {
//                             console.error(err.message);
//                         }
//                     });
//
//                     cb(err);
//
//                     return;
//                 }
//
//                 cb(null, results.rows);
//
//                 connection.release(function(err) {
//                   if(err) {
//                       console.error(err.message);
//                   }
//                 });
//             }
//           );
//       }
//     );
// }
//
// module.exports.getToBeBilled = getToBeBilled;

function getOrderInformation(cb) {
  var results = {
    "ordersReceived": "",
    "ordersActivated": "",
    "ordersPending": "",
    "ordersWError": ""
  };


  var methods = [
    // Number of Orders Received to date
    function(cb) {
      connection.execute(
        queries.ordersReceivedToDate,
        {},
        {
          outFormat: oracledb.NUMBER
        },
        function(err, ordersReceivedNum) {
          if (err) {
            cb(err);

            return;
          }

          results.ordersReceived = ordersReceivedNum;
        }
      );
    },
      // Number of Orders Activated to date
        function(cb) {
          connection.execute(
            queries.ordersActivatedToDate,
            {},
            {
              outFormat: oracledb.NUMBER
            },
            function(err, ordersActivatedNum) {
              if (err) {
                cb(err);

                return;
              }

              results.ordersActivated = ordersActivatedNum;
            }
          );
        },
        // Number of Orders Pending to date
        function(cb) {
          connection.execute(
            queries.ordersPendingToDate,
            {},
            {
              outFormat: oracledb.NUMBER
            },
            function(err, ordersPendingNum) {
              if (err) {
                cb(err);

                return;
              }

              results.ordersPending = ordersPendingNum;
            }
          );
        },
        // Number of Orders with Errors to date
        function(cb) {
          connection.execute(
            queries.ordersWErrorToDate,
            {},
            {
              outFormat: oracledb.NUMBER
            },
            function(err, ordersWErrorNum) {
              if (err) {
                cb(err);

                return;
              }

              results.ordersWError = ordersWErrorNum;
            }
          );
        }
  ];

  oracledb.getConnection(
    config.database,
    function(err, connection) {
        if (err) {
          cb(err);

          return;
        }

        async.series([
          getQueries(cb),
          async.parallel(methods),

          function (err) {
            connection.release(function (err) {
              if (err) {
                console.error(err.message);
              }
            });

            if (err) {
              cb(err);
            } else {
              cb(null, results);
            }
         }
        ]);
    }
 );
}

module.exports.getOrderInformation = getOrderInformation;

function getSubscriptionInformation(cb) {
  var results = {
    "cancelled": "",
    "optedOut": "",
    "optedIn":""
  };

  oracledb.getConnection(
    config.database,
    function(err, connection) {
        if (err) {
          cb(err);

          return;
        }

        var methods = [
          // Number of Subscriptions Cancelled to date
          function(cb) {
            connection.execute(
              "",
              {},
              {
                outFormat: oracledb.NUMBER
              },
              function (err, cancelledNum) {
                if (err) {
                  cb(err);

                  return;
                }

                results.cancelled = cancelledNum;
              }
            );
          },
          // Number of Subscriptions Opted Out to date
          function(cb) {
            connection.execute(
              "",
              {},
              {
                outFormat: oracledb.NUMBER
              },
              function(err, optedOutNum) {
                if (err) {
                  cb(err);

                  return;
                }

                results.optedOut = optedOutNum;
              }
            );
          },
          // Number of Subscriptions opted in to date
          function(cb) {
            connection.execute(
              "",
              {},
              {
                outFormat: oracledb.NUMBER
              },
              function(err, optedInNum) {
                if (err) {
                  cb(err);

                  return;
                }

                results.optedIn = optedInNum;
              }
            );
          }
        ];

        async.series([
            getQueries(cb),
            async.parallel(methods),
            function(err) {
              connection.release(function (err) {
                if (err) {
                  console.log(err.message);
                }
              });

              if (err) {
                cb(err);

                return;
              }

              cb(null, results);
            }
        ]);
      }
  );
}

module.exports.getSubscriptionInformation = getSubscriptionInformation;

function getInvoiceInformation(cb) {
  var results = {
    "brSent": "",
    "brReceived": "",
    "cmSent": "",
    "cmReceived": "",
    "dmSent": "",
    "dmReceived": ""
  };

  oracledb.getConnection(
    config.database,
    function (err, connection) {
      if (err) {
        cb(err);

        return;
      }

      var methods = [
        function (cb) {
          connection.execute(
            "",
            {},
            {
              outFormat: oracledb.NUMBER
            },
            function (err, brSentNum) {
              if (err) {
                cb(err);

                return;
              }

              results.brSent = brSentNum;
            }
          );
        },
        function (cb) {
           connection.execute(
             "",
             {},
             {
               outFormat: oracledb.NUMBER
             },
             function(err, brReceived) {
               if (err) {
                 cb(err);

                 return;
               }

               results.brReceived = brReceived;
             }
           );
        },
        function (cb) {
          connection.execute(
            "",
            {},
            {
              outFormat:oracledb.NUMBER
            },
            function (err, cmSentNum) {
              if (err) {
                cb(err);

                return;
              }

              results.cmSent = cmSentNum;
            }
          );
        },
        function (cb) {
          connection.execute(
            "",
            {},
            {
              outFormat: oracledb.NUMBER
            },
            function (err, cmReceivedNum) {
              if (err) {
                cb(err);

                return;
              }

              results.cmReceived = cmReceivedNum;
            }
          );
        },
        function (cb) {
          connection.execute(
            "",
            {},
            {
              outFormat: oracledb.NUMBER
            },
            function (err, dmSentNum) {
              if (err) {
                cb(err);

                return;
              }

              results.dmSent = dmSentNum;
            }
          );
        },
        function (cb) {
          connection.execute(
            "",
            {},
            {
              outFormat: oracledb.NUMBER
            },
            function (err, dmReceivedNum) {
              if (err) {
                cb(err);

                return;
              }

              results.dmReceived = dmReceivedNum;
            }
          );
        }
      ];

      async.series([
        getQueries(cb),
        async.parallel(methods),
        function(err) {
          connection.release(function (err) {
            if (err) {
              console.log(err.message);
            }
          });

          if (err) {
            cb(err);

            return;
          }

          cb(null, results);
        }
      ]);
    }
  );
}

module.exports.getInvoiceInformation = getInvoiceInformation;

function getRenewalInformation(cb) {
  var results = {
    "sent": "",
    "received":""
  };

  oracledb.getConnection(
    config.database,
    function (err, connection) {
      if (err) {
        cb(err);

        return;
      }

      var methods = [
        function (cb) {
          connection.execute(
            "",
            {},
            {
              outFormat: oracledb.NUMBER
            },
            function (err, sentNum) {
              if (err) {
                cb(err);

                return;
              }

              results.sent = sentNum;
            }
          );
        },
        function (cb) {
          connection.execute(
            "",
            {},
            {
              outFormat: oracledb.NUMBER
            },
            function (err, receivedNum) {
              if (err) {
                cb(err);

                return;
              }

              results.received = receivedNum;
            }
          );
        }
      ];

      async.series([
        getQueries(cb),
        async.parallel(methods),
        function(err) {
          connection.release(function (err) {
            if (err) {
              console.log(err.message);
            }
          });

          if (err) {
            cb(err);

            return;
          }

          cb(null, results);
        }
      ]);
    }
  );
}

module.exports.getRenewalInformation = getRenewalInformation;

function getRevenueInformation(cb) {
  var results = {
    "totalBilled":"",
    "totalCollected":"",
    "paymentsFailed":"",
    "paymentsWithError":"",
    "paymentsWithComFailure":""
  };

  oracledb.getConnection(
    config.database,
    function(err, connection) {
      if (err) {
        cb(err);

        return;
      }

      var methods = [
        function (cb) {
          connection.execute(
            "",
            {},
            {
              outFormat: oracledb.NUMBER
            },
            function (err, totalBilledNum) {
              if (err) {
                cb(err);

                return;
              }

              results.totalBilled = totalBilledNum;
            }
          );
        },
        function (cb) {
          connection.execute(
            "",
            {},
            {
              outFormat: oracledb.NUMBER
            },
            function (err, totalCollectedNum) {
              if (err) {
                cb(err);

                return;
              }

              results.totalCollected = totalCollectedNum;
            }
          );
        },
        function (cb) {
          connection.execute(
            "",
            {},
            {
              outFormat: oracledb.NUMBER
            },
            function (err, paymentsFailedNum) {
              if (err) {
                cb(err);

                return;
              }

              results.paymentsFailed = paymentsFailedNum;
            }
          );
        },
        function (cb) {
          connection.execute(
            "",
            {},
            {
              outFormat: oracledb.NUMBER
            },
            function (err, paymentsWithErrorNum) {
              if (err) {
                cb(err);

                return;
              }

              results.paymentsWithError = paymentsWithErrorNum;
            }
          );
        },
        function (cb) {
          connection.execute(
            "",
            {},
            {
              outFormat: oracledb.NUMBER
            },
            function (err, paymentsWithComFailureNum) {
              if (err) {
                cb(err);

                return;
              }

              results.paymentsWithComFailure = paymentsWithComFailureNum;
            }
          );
        }
      ];

      async.series([
        getQueries(cb),
        async.parallel(methods),
        function(err) {
          connection.release(function (err) {
            if (err) {
              console.log(err.message);
            }
          });

          if (err) {
            cb(err);

            return;
          }

          cb(null, results);
        }
      ]);
    }
  );
}

module.exports.getRevenueInformation = getRevenueInformation;

function getTcInformationOv(cb) {
  var results = {
    "tcSuccessStatus":"",
    "tcRejectedStatus":'',
    "tcWaitingStatus":""
  };

  oracledb.getConnection(
    config.database,
    function(err, connection) {
      if (err) {
        cb(err);

        return;
      }

      var methods = [
        function(cb) {
          connection.execute(
            '',
            {},
            {
              outFormat: oracledb.NUMBER
            },
            function(err, successStatusNum) {
              if (err) {
                cb(err);

                return;
              }

              results.tcSuccessStatus = successStatusNum;
            }
          );
        },
        function(cb) {
          connection.execute(
            '',
            {},
            {
              outFormat: oracledb.NUMBER
            },
            function(err, rejectedStatusNum) {
              if (err) {
                cb(err);

                return;
              }

              results.tcRejectedStatus = rejectedStatusNum;
            }
          );
        },
        function(cb) {
          connection.execute(
            '',
            {},
            {
              outFormat: oracledb.NUMBER
            },
            function(err, waitingStatusNum) {
              if (err) {
                cb(err);

                return;
              }

              results.tcWaitingStatus = waitingStatusNum;
            }
          );
        }
      ];

      async.series([
        getQueries(cb),
        async.parallel(methods),
        function(cb) {
          connection.release(function(err) {
            if (err) {
              console.error(err.message);
            }
          });

          if (err) {
            cb(err);
          } else {
            cb(null, results);
          }
        }
      ]);
    }
  );
}

module.exports.getTcInformationOv = getTcInformationOv;
