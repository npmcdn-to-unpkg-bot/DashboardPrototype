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

function getAuthInformation(cb) {
  var results = {
    'accountsAttempted':"",
    'authApproved':"",
    'authHardDeclined':"",
    'authSoftDeclined':"",
    'authTechnicalError':"",
    'authHardDeclineResponse':"",
    'authSoftDeclineResponse':""
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
            function(err, accountsAttemptedNum) {
              results.accountsAttempted = accountsAttemptedNum;
            }
          );
        },
        function(cb) {
          connection.execute(
            "",
            {},
            {
              outFormat: oracledb.NUMBER
            },
            function(err, authApprovedNum) {
              results.authApproved = authApprovedNum;
            }
          );
        },
        function(cb) {
          connection.execute(
            "",
            {},
            {
              outFormat: oracledb.NUMBER
            },
            function(err, authHardDeclinedNum) {
              results.authHardDeclined = authHardDeclinedNum;
            }
          );
        },
        function(cb) {
          connection.execute(
            "",
            {},
            {
              outFormat: oracledb.NUMBER
            },
            function(err, authSoftDeclinedNum) {
              results.authSoftDeclined = authSoftDeclinedNum;
            }
          );
        },
        function(cb) {
          connection.execute(
            "",
            {},
            {
              outFormat: oracledb.NUMBER
            },
            function(err, authTechnicalErrorNum) {
              results.authTechnicalError = authTechnicalErrorNum;
            }
          );
        },
        function(cb) {
          connection.execute(
            "",
            {},
            {
              outFormat: oracledb.NUMBER
            },
            function(err, authHardDeclineResponseNum) {
              results.authHardDeclineResponse = authHardDeclineResponseNum;
            }
          );
        },
        function(cb) {
          connection.execute(
            "",
            {},
            {
              outFormat: oracledb.NUMBER
            },
            function(err, authSoftDeclineResponseNum) {
              results.authSoftDeclineResponse = authSoftDeclineResponseNum;
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

module.exports.getAuthInformation = getAuthInformation;
