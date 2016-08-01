// var subjects = require('./models/SubjectViews');
var express = require('express');
var config = require(__dirname + '/../config.js');
var auth = require(__dirname + '/../data/auth.js');
var async = require('async');
var overview = require(__dirname + '/../data/overview.js');
var tc = require(__dirname + '/../data/tc.js');
var history = require(__dirname + "/../data/history.js");
var omegaAr = require(__dirname + "/../data/omegaar.js");
var test = require(__dirname + "/../data/test.js");
var newOverview = require(__dirname + "/../data/newOverview.js");

var router;

var getTime = function() {
  return new Date();
}

router = express.Router();

// router.get('/refresh',  function (req, res, next) {
//   var authData;
//   var overviewData;
//   var tcData;
//
//   auth.getAccountsAttempted(function(err, accounts) {
//     if (err) {
//       throw err;
//
//       return;
//     }
//
//     authData = { data: accounts };
//   });
//
//   overview.getToBeBilled(function(err, accounts) {
//     if (err) {
//       throw err;
//
//       return;
//     }
//
//     overviewData = { data: accounts };
//   });
//
//   tc.getBillPlans(function(err, accounts) {
//     if (err) {
//       throw err;
//
//       return;
//     }
//
//     tcData = { data: accounts };
//   });
//
//   // res.
// });
//
// router.get('/overview', function(req, res, next) {
//   overview.getToBeBilled(function(err, accounts) {
//     if(err) {
//       throw err;
//
//       return;
//     }
//
//     res.status(200).send(accounts);
//   });
// });

router.get('/test', function(req, res, next) {
  console.log('router reached');
  newOverview.getOrderInformation(function(err, data) {
    if (err) {
      next(err);
      console.log('Not working at router level');

      return;
    }
    console.log('Success at router.js level');
    res.status(200).json(data);
  });
});

router.get('/update/overview', function(req, res, next) {
  var data = {
    "orderInformation": {},
    'subscriptionInformation': {},
    'invoiceInformation': {},
    'renewalInformation': {},
    'revenueInformation': {},
    'tcInformation': {}
  };

  overview.getOrderInformation(function(err, results) {
    if (err) {
      console.log("Error on Order Info retrieval");
      console.error(err);
      throw err;

      return;
    }

    data.orderInformation = results;
    overview.getSubscriptionInformation(function(err, results) {
      if (err) {
        console.log("Error on Subscription Info Retrieval");
        console.error(err);

        throw err;

        return;
      }

      data.subscriptionInformation = results;
      overview.getInvoiceInformation(function(err, results) {
        if (err) {
          console.log("Error on Invoice Info Retrieval");
          console.error(err);

          throw err;

          return;
        }

        data.invoiceInformation = results;
        overview.getRenewalInformation(function(err, results) {
          if (err) {
            console.log("Error on Renewal Info Retrieval");
            console.error(err);

            throw err;

            return;
          }

          data.renewalInformation = results;
          overview.getRevenueInformation(function(err, results) {
            if (err) {
              console.log("Error on Revenue Info Retrieval");
              console.error(err);

              throw err;

              return;
            }

            data.revenueInformation = results;
            overview.getTcInformationOv(function(err, results) {
              if (err) {
                throw err;

                return;
              }

              data.tcInformation = results;

              res.status(200).json({'overview': data})
            });
          });
        });
      });
    });
  });
  // async.series([
  //     async.parallel([
  //     overview.getOrderInformation(function(err, results) {
  //       if (err) {
  //         throw err;
  //
  //         return;
  //       }
  //
  //       data.orderInformation = results;
  //     }),
  //     overview.getSubscriptionInformation(function(err, results) {
  //       if (err) {
  //         throw err;
  //
  //         return;
  //       }
  //
  //       data.subscriptionInformation = results;
  //     }),
  //     overview.getInvoiceInformation(function(err, results) {
  //       if (err) {
  //         throw err;
  //
  //         return;
  //       }
  //
  //       data.invoiceInformation = results;
  //     }),
  //     overview.getRenewalInformation(function(err, results) {
  //       if (err) {
  //         throw err;
  //
  //         return;
  //       }
  //
  //       data.renewalInformation = results;
  //     }),
  //     overview.getRevenueInformation(function(err, results) {
  //       if (err) {
  //         throw err;
  //
  //         return;
  //       }
  //
  //       data.revenueInformation = results;
  //     }),
  //     overview.getTcInformationOv(function(err, results) {
  //       if (err) {
  //         throw err;
  //
  //         return;
  //       }
  //
  //       data.tcInformation = results;
  //     })
  //   ]),
  //
  //   res.status(200).json({'overview': data})
  // ])
});

router.get('/update/tc', function(req, res, next) {
  tc.getTcInformation(function(err, data) {
    if (err) {
      throw err;

      return;
    }

    res.status(200).json({'tc': data});
  });
});

router.get('/update/auth', function(req, res, next) {
  auth.getAuthInformation(function(err, data) {
    if (err) {
      throw err;

      return;
    }

    res.status(200).json({'auth': data});
  });
});

router.get('/update/omegaAr', function(req, res, next) {
  omegaAr.getOmegaArInformation(function(err, data) {
    if (err) {
      throw err;

      return;
    }

    res.status(200).json({'omegaAr':data});
  });
});

router.get('/update/history/:startDate/:endDate', function (req, res, next) {
  var startDate = req.params.startDate;
  var endDate = req.params.endDate;

  history.getHistoryInformation(startDate, endDate, function(err, data) {
    if (err) {
      next(err);

      return;
    }

    res.status(200).json({'history' : data});
  });
});

module.exports.router = router;
