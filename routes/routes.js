// var subjects = require('./models/SubjectViews');
var express = require('express');
var config = require(__dirname + '/../config.js');
var auth = require(__dirname + '/../data/auth.js');
var overview = require(__dirname + '/../data/overview.js');
var tc = require(__dirname + '/../data/tc.js');
var router;
var async = require('async');

var getTime = function() {
  return new Date();
}

router = express.Router();

router.get('/refresh',  function (req, res, next) {
  var authData;
  var overviewData;
  var tcData;

  auth.getAccountsAttempted(function(err, accounts) {
    if (err) {
      throw err;

      return;
    }

    authData = { data: accounts; };
  });

  overview.getToBeBilled(function(err, accounts) {
    if (err) {
      throw err;

      return;
    }

    overviewData = { data: accounts; };
  });

  tc.getBillPlans(function(err, accounts) {
    if (err) {
      throw err;

      return;
    }

    tcData = { data: accounts; };
  });

  res.
});

module.exports.router = router;
// module.exports = function(app) {
//   // app.get('/api/data', function(req, res) {
//   //
//   // })
//   app.get('*', function(req, res) {
//     res.sendfile('./public/officehome.html');
//   });
// }
