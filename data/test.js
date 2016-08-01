var oracledb = require('oracledb');
var fs = require('fs');
var config = require(__dirname + '/../config.js');

function getQueries(cb) {
  fs.readFile(__dirname + '/../queries/queries.json', 'utf8', function (err, data) {
    if (err) {
      throw err;
    }

    queries = JSON.parse(data);
  });
}

function testGet(cb) {
  var queries = "";
  var num = 0;
  fs.readFile(__dirname + '/../queries/queries.json', 'utf8', function (err, data) {
    if (err) {
      throw err;
    }

    queries = JSON.parse(data);
  });

  console.log("Queries object: " + queries.ordersReceivedToDate);
  oracledb.getConnection(
    config.database,
    function(err, connection) {
      if (err) {
        cb(err);

        return;
      }

      connection.execute(
        queries.ordersReceivedToDate,
        {},
        {
          outFormat: oracledb.ARRAY
        },
        function(err, ordersReceivedNum) {
          if (err) {
            connection.release(function(err) {
              if (err) {
                console.error(err.message);
              }
            });

            cb(err);
            console.log("error with connection");

            return;
          }

          num = ordersReceivedNum;
          console.log("connection executed successfully");
          console.log('num value: ' + num[0]);

          cb(null, num);

          connection.release(function(err) {
            if (err) {
              console.error(err.message);
            }
          });
        }
      );
    }
  );
}

module.exports.testGet = testGet;
