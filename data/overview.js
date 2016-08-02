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

// function getOrderInformation(cb) {
//   var results = {
//     "ordersReceived": "",
//     "ordersActivated": "",
//     "ordersPending": "",
//     "ordersWError": ""
//   };
//
//   var queries = "";
//   fs.readFile(__dirname + '/../queries/queries.json', 'utf8', function(err, data) {
//     if (err) {
//       throw err;
//     }
//
//     queries = JSON.parse(data);
//   });

  //
  // oracledb.getConnection(
  //   config.database,
  //   function(err, connection) {
  //       if (err) {
  //         cb(err);
  //
  //         return;
  //       }
  //
  //       var methods = [
  //         // Number of Orders Received to date
  //         function(cb) {
  //           connection.execute(
  //             queries.ordersReceivedToDate,
  //             {},
  //             {
  //               outFormat: oracledb.ARRAY
  //             },
  //             function(err, ordersReceivedNum) {
  //               if (err) {
  //                 connection.release(function(err) {
  //                   if (err) {
  //                     console.error(err.message);
  //                   }
  //                 });
  //
  //                 cb(err);
  //
  //                 return;
  //               }
  //               console.log("Number of Orders Received: success");
  //               results.ordersReceived = ordersReceivedNum[0];
  //               cb(null);
  //             }
  //           );
  //         },
  //           // Number of Orders Activated to date
  //             function(cb) {
  //               connection.execute(
  //                 queries.ordersActivatedToDate,
  //                 {},
  //                 {
  //                   outFormat: oracledb.ARRAY
  //                 },
  //                 function(err, ordersActivatedNum) {
  //                   if (err) {
  //                     connection.release(function(err) {
  //                       if (err) {
  //                         console.error(err.message);
  //                       }
  //                     });
  //
  //                     cb(err);
  //
  //                     return;
  //                   }
  //
  //                   console.log("Orders Activated: success");
  //                   results.ordersActivated = ordersActivatedNum[0];
  //                   cb(null);
  //                 }
  //               );
  //             },
  //             // Number of Orders Pending to date
  //             function(cb) {
  //               connection.execute(
  //                 queries.ordersPendingToDate,
  //                 {},
  //                 {
  //                   outFormat: oracledb.ARRAY
  //                 },
  //                 function(err, ordersPendingNum) {
  //                   if (err) {
  //                     connection.release(function(err) {
  //                       if (err) {
  //                         console.error(err.message);
  //                       }
  //                     });
  //
  //                     cb(err);
  //
  //                     return;
  //                   }
  //                   console.log("Number of Orders Pending: success");
  //                   results.ordersPending = ordersPendingNum[0];
  //                   cb(null);
  //                 }
  //               );
  //             }
  //         ];
  //
 //        async.series([
 //          // Number of Orders Received to Date
 //          function(cb) {
 //            connection.execute(
 //              queries.ordersReceivedToDate,
 //              {},
 //              {
 //                outFormat: oracledb.ARRAY
 //              },
 //              function(err, ordersReceivedNum) {
 //                if (err) {
 //                  connection.release(function(err) {
 //                    if (err) {
 //                      console.error(err.message);
 //                    }
 //                  });
 //
 //                  cb(err);
 //
 //                  return;
 //                }
 //                console.log("Number of Orders Received: success");
 //                console.log("Orders Received: " + ordersReceivedNum.toString());
 //                results.ordersReceived = ordersReceivedNum;
 //                cb(null, results);
 //              }
 //            );
 //          },
 //            // Number of Orders Activated to date
 //              function(cb) {
 //                connection.execute(
 //                  queries.ordersActivatedToDate,
 //                  {},
 //                  {
 //                    outFormat: oracledb.ARRAY
 //                  },
 //                  function(err, ordersActivatedNum) {
 //                    if (err) {
 //                      connection.release(function(err) {
 //                        if (err) {
 //                          console.error(err.message);
 //                        }
 //                      });
 //
 //                      cb(err);
 //
 //                      return;
 //                    }
 //
 //                    console.log("Orders Activated: success");
 //                    console.log("Orders Activated:" + ordersActivatedNum.toString());
 //                    results.ordersActivated = ordersActivatedNum;
 //                    cb(null, results);
 //                  }
 //                );
 //              },
 //              // Number of Orders Pending to date
 //              function(cb) {
 //                connection.execute(
 //                  queries.ordersPendingToDate,
 //                  {},
 //                  {
 //                    outFormat: oracledb.ARRAY
 //                  },
 //                  function(err, ordersPendingNum) {
 //                    if (err) {
 //                      connection.release(function(err) {
 //                        if (err) {
 //                          console.error(err.message);
 //                        }
 //                      });
 //
 //                      cb(err);
 //
 //                      return;
 //                    }
 //                    console.log("Number of Orders Pending: success");
 //                    console.log("Orders Pending: " + ordersPendingNum.toString());
 //                    results.ordersPending = ordersPendingNum;
 //                    cb(null);
 //                  }
 //                );
 //              },
 //          // Number of Orders with Errors to date
 //          function(cb) {
 //            connection.execute(
 //              queries.ordersWErrorToDate,
 //              {},
 //              {
 //                outFormat: oracledb.ARRAY
 //              },
 //              function(err, ordersWErrorNum) {
 //                if (err) {
 //                  connection.release(function(err) {
 //                    if (err) {
 //                      console.error(err.message);
 //                    }
 //                  });
 //
 //                  cb(err);
 //
 //                  return;
 //                }
 //
 //                results.ordersWError = ordersWErrorNum;
 //                console.log("Number of Orders with Error: success");
 //                cb(null, results);
 //                console.log("Results: " + results);
 //
 //                connection.release(function(err) {
 //                  if (err) {
 //                    console.error(err.message);
 //                  }
 //                  console.log("connection released");
 //                });
 //              }
 //            );
 //          }
 //        ]);
 //    }
 // );
//
//   var sequence = Futures.sequence();
//
//   sequence
//     .then(function())
//
//    cb(null, results);
// }

function getOrderInformation(cb) {
  var results = {
    "ordersReceived": "",
    "ordersActivated":"",
    "ordersPending":"",
    "ordersWError":""
  };

  var queries = "";
  fs.readFile(__dirname + '/../queries/queries.json', 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    queries = JSON.parse(data);

    oracledb.getConnection({
      user  : config.database.user,
      password : config.database.password,
      connectString : config.database.connectString
    })
      .then(function(connection) {
        console.log(queries.ordersReceivedToDate);
        return connection.execute(
          queries.ordersReceivedToDate,
          []
        )
          .then(function(result) {
            results.ordersReceived = result.rows[0][0];
            connection.execute(
              queries.ordersActivatedToDate,
              []
            )
              .then(function(result) {
                results.ordersActivated = result.rows[0][0];
                connection.execute(
                  queries.ordersPendingToDate,
                  []
                )
                  .then(function(result) {
                    results.ordersPending = result.rows[0][0];
                    connection.execute(
                        queries.ordersWErrorToDate,
                        []
                      )
                        .then(function(result) {
                          results.ordersWError = result.rows[0][0];
                          console.log("orders received: " + results.ordersReceived);
                          console.log("orders activated: " + results.ordersActivated);
                          console.log("orders pending: " + results.ordersPending);
                          console.log("orders with error: " + results.ordersWError);
                          cb(null, results);
                          return connection.close();
                        })
                        .catch(function(err) {
                          return connection.close();
                        });
                  })
                  .catch(function(err) {
                    cb(err);
                    return connection.close();
                  });
              })
              .catch(function(err) {
                cb(err);
                return connection.close();
              });
          })
          .catch(function(err) {
            cb(err);
            return connection.close();
          });
      })
      .catch(function(err) {
        cb(err);
      });
  });
}


module.exports.getOrderInformation = getOrderInformation;

function getSubscriptionInformation(cb) {
  var results = {
    "cancelled": "",
    "optedOut": "",
    "optedIn":""
  };

  var queries = "";
  fs.readFile(__dirname + '/../queries/queries.json', 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    queries = JSON.parse(data);

    oracledb.getConnection({
      user          : config.database.user,
      password      : config.database.password,
      connectString : config.database.connectString
    })
      .then(function(connection) {
        return connection.execute(
          queries.subscriptionsCancelled,
          []
        )
          .then(function(result) {
            results.cancelled = result.rows[0][0];
            connection.execute(
              queries.subscriptionsOptOut,
              []
            )
              .then(function(result) {
                results.optedOut = result.rows[0][0];
                connection.execute(
                  queries.subscriptionsOptIn,
                  []
                )
                  .then(function(result) {
                    results.optedIn = result.rows[0][0];
                    cb(null, results);
                    return connection.close();
                  })
                  .catch(function(err) {
                    cb(err);
                    return connection.close();
                  });
              })
              .catch(function(err) {
                cb(err);
                return connection.close();
              });
          })
          .catch(function(err) {
            cb(err);
            return connection.close();
          });
      })
      .catch(function(err) {
        cb(err);
        return connection.close();
      });
  });

  // oracledb.getConnection(
  //   config.database,
  //   function(err, connection) {
  //       if (err) {
  //         cb(err);
  //
  //         return;
  //       }
  //
  //       var methods = [
  //         // Number of Subscriptions Cancelled to date
  //         function(cb) {
  //           connection.execute(
  //             "",
  //             {},
  //             {
  //               outFormat: oracledb.ARRAY
  //             },
  //             function (err, cancelledNum) {
  //               if (err) {
  //                 cb(err);
  //
  //                 return;
  //               }
  //
  //               results.cancelled = cancelledNum;
  //             }
  //           );
  //         },
  //         // Number of Subscriptions Opted Out to date
  //         function(cb) {
  //           connection.execute(
  //             "",
  //             {},
  //             {
  //               outFormat: oracledb.ARRAY
  //             },
  //             function(err, optedOutNum) {
  //               if (err) {
  //                 cb(err);
  //
  //                 return;
  //               }
  //
  //               results.optedOut = optedOutNum;
  //             }
  //           );
  //         },
  //         // Number of Subscriptions opted in to date
  //         function(cb) {
  //           connection.execute(
  //             "",
  //             {},
  //             {
  //               outFormat: oracledb.ARRAY
  //             },
  //             function(err, optedInNum) {
  //               if (err) {
  //                 cb(err);
  //
  //                 return;
  //               }
  //
  //               results.optedIn = optedInNum;
  //             }
  //           );
  //         }
  //       ];
  //
  //       async.series([
  //           getQueries(cb),
  //           async.parallel(methods),
  //           function(err) {
  //             connection.release(function (err) {
  //               if (err) {
  //                 console.log(err.message);
  //               }
  //             });
  //
  //             if (err) {
  //               cb(err);
  //
  //               return;
  //             }
  //
  //             cb(null, results);
  //           }
  //       ]);
  //     }
  // );
}

module.exports.getSubscriptionInformation = getSubscriptionInformation;

function getInvoiceInformation(cb) {
  var results = {
    "brSent": "",
    "brReceived": "",
    "cmDmSent": "",
    "cmDmReceived": ""
  };

  var queries = "";
  fs.readFile(__dirname + '/../queries/queries.json', 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    queries = JSON.parse(data);

    oracledb.getConnection({
      user          : config.database.user,
      password      : config.database.password,
      connectString : config.database.connectString
    })
      .then(function(connection) {
        return connection.execute(
          queries.invoiceBrSent,[]
        )
          .then(function(result) {
            results.brSent = result.rows[0][0];
            connection.execute(
              queries.invoiceBrReceived, []
            )
              .then(function(result) {
                results.brReceived = result.rows[0][0];
                connection.execute(
                  queries.invoiceCmDmSent, []
                )
                  .then(function(result) {
                    results.cmDmSent = result.rows[0][0];
                    connection.execute(
                      queries.invoiceCmDmReceived, []
                    )
                      .then(function(result) {
                        results.cmDmReceived = result.rows[0][0];
                        cb(null, results);
                        return connection.close();
                      })
                      .catch(function(err) {
                        cb(err);
                        return connection.close();
                      });
                  })
                  .catch(function(err) {
                    cb(err);
                    return connection.close();
                  });
              })
              .catch(function(err) {
                cb(err);
                return connection.close();
              });
          })
          .catch(function(err) {
            cb(err);
            return connection.close();
          });
      })
      .catch(function(err) {
        cb(err);
      });
  });
  //
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
  //       function (cb) {
  //         connection.execute(
  //           "",
  //           {},
  //           {
  //             outFormat: oracledb.ARRAY
  //           },
  //           function (err, brSentNum) {
  //             if (err) {
  //               cb(err);
  //
  //               return;
  //             }
  //
  //             results.brSent = brSentNum;
  //           }
  //         );
  //       },
  //       function (cb) {
  //          connection.execute(
  //            "",
  //            {},
  //            {
  //              outFormat: oracledb.ARRAY
  //            },
  //            function(err, brReceived) {
  //              if (err) {
  //                cb(err);
  //
  //                return;
  //              }
  //
  //              results.brReceived = brReceived;
  //            }
  //          );
  //       },
  //       function (cb) {
  //         connection.execute(
  //           "",
  //           {},
  //           {
  //             outFormat:oracledb.NUMBER
  //           },
  //           function (err, cmSentNum) {
  //             if (err) {
  //               cb(err);
  //
  //               return;
  //             }
  //
  //             results.cmSent = cmSentNum;
  //           }
  //         );
  //       },
  //       function (cb) {
  //         connection.execute(
  //           "",
  //           {},
  //           {
  //             outFormat: oracledb.ARRAY
  //           },
  //           function (err, cmReceivedNum) {
  //             if (err) {
  //               cb(err);
  //
  //               return;
  //             }
  //
  //             results.cmReceived = cmReceivedNum;
  //           }
  //         );
  //       },
  //       function (cb) {
  //         connection.execute(
  //           "",
  //           {},
  //           {
  //             outFormat: oracledb.ARRAY
  //           },
  //           function (err, dmSentNum) {
  //             if (err) {
  //               cb(err);
  //
  //               return;
  //             }
  //
  //             results.dmSent = dmSentNum;
  //           }
  //         );
  //       },
  //       function (cb) {
  //         connection.execute(
  //           "",
  //           {},
  //           {
  //             outFormat: oracledb.ARRAY
  //           },
  //           function (err, dmReceivedNum) {
  //             if (err) {
  //               cb(err);
  //
  //               return;
  //             }
  //
  //             results.dmReceived = dmReceivedNum;
  //           }
  //         );
  //       }
  //     ];
  //
  //     async.series([
  //       getQueries(cb),
  //       async.parallel(methods),
  //       function(err) {
  //         connection.release(function (err) {
  //           if (err) {
  //             console.log(err.message);
  //           }
  //         });
  //
  //         if (err) {
  //           cb(err);
  //
  //           return;
  //         }
  //
  //         cb(null, results);
  //       }
  //     ]);
  //   }
  // );
}

module.exports.getInvoiceInformation = getInvoiceInformation;

function getRenewalInformation(cb) {
  var results = {
    "sent": "",
    "received":""
  };

  var queries = "";
  fs.readFile(__dirname + '/../queries/queries.json', 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    queries = JSON.parse(data);

    oracledb.getConnection({
      user          : config.database.user,
      password      : config.database.password,
      connectString : config.database.connectString
    })
      .then(function(connection) {
        return connection.execute(
          queries.renewalRequestTotal,
          []
        )
          .then(function(result) {
            results.sent = result.rows[0][0];
            connection.execute(
              queries.renewalResponsesReceived,
              []
            )
              .then(function(result) {
                results.received = result.rows[0][0];
                cb(null, results);
                return connection.close();
              })
              .catch(function(err) {
                cb(err);
                return connection.close();
              });
          })
          .catch(function(err) {
            cb(err);
            return connection.close();
          });
      })
      .catch(function(err) {
        cb(err);
      });
  });

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
  //       function (cb) {
  //         connection.execute(
  //           "",
  //           {},
  //           {
  //             outFormat: oracledb.ARRAY
  //           },
  //           function (err, sentNum) {
  //             if (err) {
  //               cb(err);
  //
  //               return;
  //             }
  //
  //             results.sent = sentNum;
  //           }
  //         );
  //       },
  //       function (cb) {
  //         connection.execute(
  //           "",
  //           {},
  //           {
  //             outFormat: oracledb.ARRAY
  //           },
  //           function (err, receivedNum) {
  //             if (err) {
  //               cb(err);
  //
  //               return;
  //             }
  //
  //             results.received = receivedNum;
  //           }
  //         );
  //       }
  //     ];
  //
  //     async.series([
  //       getQueries(cb),
  //       async.parallel(methods),
  //       function(err) {
  //         connection.release(function (err) {
  //           if (err) {
  //             console.log(err.message);
  //           }
  //         });
  //
  //         if (err) {
  //           cb(err);
  //
  //           return;
  //         }
  //
  //         cb(null, results);
  //       }
  //     ]);
  //   }
  // );
}

module.exports.getRenewalInformation = getRenewalInformation;

function getRevenueInformation(cb) {
  var results = {
    "totalBilled":"",
    "totalCollected":"",
    "paymentsDeclined":"",
    "paymentsWithError":"",
    "paymentsWithComFailure":""
  };

  var queries = "";
  fs.readFile(__dirname + '/../queries/queries.json', 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    queries = JSON.parse(data);
    oracledb.getConnection({
      user          : config.database.user,
      password      : config.database.password,
      connectString : config.database.connectString
    })
      .then(function(connection) {
        return connection.execute(
          queries.revenueBilledToDate,
          []
        )
          .then(function(result) {
            results.totalBilled = result.rows[0][0];
            connection.execute(
              queries.revenueCollectedToDate,
              []
            )
              .then(function(result) {
                results.totalCollected = result.rows[0][0];
                connection.execute(
                  queries.revenueDeclinedToDate,
                  []
                )
                  .then(function(result) {
                    results.paymentsDeclined = result.rows[0][0];
                    connection.execute(
                      queries.revenueWithErrorToDate,
                      []
                    )
                      .then(function(result) {
                        results.paymentsWithError = result.rows[0][0];
                        connection.execute(
                          queries.revenueWithComFailureToDate,
                          []
                        )
                          .then(function(result) {
                            results.paymentsWithComFailure = result.rows[0][0];
                            cb(null, results);
                            return connection.close();
                          })
                          .catch(function(err) {
                            cb(err);
                            return connection.close();
                          });
                      })
                      .catch(function(err) {
                        cb(err);
                        return connection.close();
                      });
                  })
                  .catch(function(err) {
                    cb(err);
                    return connection.close();
                  });
              })
              .catch(function(err) {
                cb(err);
                return connection.close();
              });
          })
          .catch(function(err) {
            cb(err);
            return connection.close();
          });
      })
      .catch(function(err) {
        cb(err);
      });
  });

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
  //       function (cb) {
  //         connection.execute(
  //           "",
  //           {},
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
  //       function (cb) {
  //         connection.execute(
  //           "",
  //           {},
  //           {
  //             outFormat: oracledb.ARRAY
  //           },
  //           function (err, totalCollectedNum) {
  //             if (err) {
  //               cb(err);
  //
  //               return;
  //             }
  //
  //             results.totalCollected = totalCollectedNum;
  //           }
  //         );
  //       },
  //       function (cb) {
  //         connection.execute(
  //           "",
  //           {},
  //           {
  //             outFormat: oracledb.ARRAY
  //           },
  //           function (err, paymentsFailedNum) {
  //             if (err) {
  //               cb(err);
  //
  //               return;
  //             }
  //
  //             results.paymentsFailed = paymentsFailedNum;
  //           }
  //         );
  //       },
  //       function (cb) {
  //         connection.execute(
  //           "",
  //           {},
  //           {
  //             outFormat: oracledb.ARRAY
  //           },
  //           function (err, paymentsWithErrorNum) {
  //             if (err) {
  //               cb(err);
  //
  //               return;
  //             }
  //
  //             results.paymentsWithError = paymentsWithErrorNum;
  //           }
  //         );
  //       },
  //       function (cb) {
  //         connection.execute(
  //           "",
  //           {},
  //           {
  //             outFormat: oracledb.ARRAY
  //           },
  //           function (err, paymentsWithComFailureNum) {
  //             if (err) {
  //               cb(err);
  //
  //               return;
  //             }
  //
  //             results.paymentsWithComFailure = paymentsWithComFailureNum;
  //           }
  //         );
  //       }
  //     ];
  //
  //     async.series([
  //       getQueries(cb),
  //       async.parallel(methods),
  //       function(err) {
  //         connection.release(function (err) {
  //           if (err) {
  //             console.log(err.message);
  //           }
  //         });
  //
  //         if (err) {
  //           cb(err);
  //
  //           return;
  //         }
  //
  //         cb(null, results);
  //       }
  //     ]);
  //   }
  // );
}

module.exports.getRevenueInformation = getRevenueInformation;

function getTcInformationOv(cb) {
  var results = {
    "tcRequestTotal":"",
    "tcSuccessStatus":"",
    "tcRejectedStatus":'',
    "tcHoldStatus":""
  };

  var queries = "";
  fs.readFile(__dirname + '/../queries/queries.json', 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    queries = JSON.parse(data);

    oracledb.getConnection({
      user          : config.database.user,
      password      : config.database.password,
      connectString : config.database.connectString
    })
      .then(function(connection) {
        return connection.execute(
          queries.tcRequestTotal,
          []
        )
          .then(function(result) {
            results.tcRequestTotal = result.rows[0][0];
            connection.execute(
              queries.tcSuccessResponse,
              []
            )
              .then(function(result) {
              results.tcSuccessStatus = result.rows[0][0];
              connection.execute(
                queries.tcHoldResponse,
                []
              )
                .then(function(result) {
                  results.tcHoldStatus = result.rows[0][0];
                  connection.execute(
                    queries.tcRejectedResponse,
                    []
                  )
                    .then(function(result) {
                      results.tcRejectedStatus = result.rows[0][0];
                      cb(null, results);
                      return connection.close();
                    })
                    .catch(function(err) {
                      cb(err);
                      return connection.close();
                    });
                })
                .catch(function(err) {
                  cb(err);
                  return connection.close();
                });
            })
            .catch(function(err) {
              cb(err);
              return connection.close();
            });
          })
          .catch(function(err) {
            cb(err);
            return connection.close();
          });
      })
      .catch(function(err) {
        cb(err);
      });
  });

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
  //           function(err, successStatusNum) {
  //             if (err) {
  //               cb(err);
  //
  //               return;
  //             }
  //
  //             results.tcSuccessStatus = successStatusNum;
  //           }
  //         );
  //       },
  //       function(cb) {
  //         connection.execute(
  //           '',
  //           {},
  //           {
  //             outFormat: oracledb.ARRAY
  //           },
  //           function(err, rejectedStatusNum) {
  //             if (err) {
  //               cb(err);
  //
  //               return;
  //             }
  //
  //             results.tcRejectedStatus = rejectedStatusNum;
  //           }
  //         );
  //       },
  //       function(cb) {
  //         connection.execute(
  //           '',
  //           {},
  //           {
  //             outFormat: oracledb.ARRAY
  //           },
  //           function(err, waitingStatusNum) {
  //             if (err) {
  //               cb(err);
  //
  //               return;
  //             }
  //
  //             results.tcWaitingStatus = waitingStatusNum;
  //           }
  //         );
  //       }
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

module.exports.getTcInformationOv = getTcInformationOv;
