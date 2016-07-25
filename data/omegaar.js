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

function getOmegaArInformation(cb) {
  var results = {
    "billsSent":"",
    "responsesReturned":"",
    "accountsWFailure":""
  };

  oracledb.getConnection(
    config.database,
    function (err, connection) {
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
              function (err, billsSentNum) {
                if (err) {
                  cb(err);

                  return;
                }

                results.billsSent = billsSentNum;
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
              function (err, responsesReturnedNum) {
                if (err) {
                  cb(err);

                  return;
                }

                results.responsesReturned = responsesReturnedNum;
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
              function (err, accountsWFailureNum) {
                if (err) {
                  cb(err);

                  return;
                }

                results.accountsWFailure = accountsWFailureNum;
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

module.exports.getOmegaArInformation = getOmegaArInformation;
