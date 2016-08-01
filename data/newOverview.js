var oracledb = require('oracledb');
var fs = require('fs');
var config = require(__dirname + '/../config.js');

function getOrderInformation(cb) {
  var results = {
    "tcRequestTotal": "",
    "tcSuccessResponse":"",
    "tcHoldResponse":"",
    "tcRejectedResponse":""
  };

  var queries = "";
  fs.readFile(__dirname + '/../queries/queries.json', 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    queries = JSON.parse(data);
  });

  oracledb.getConnection({
    user  : config.database.user,
    password : config.database.password,
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
              results.tcSuccessResponse = result.rows;
              connection.execute(
                queries.tcHoldResponse,
                []
              )
                .then(function(result) {
                  results.tcHoldResponse = result.rows;
                  connection.execute(
                      queries.tcRejectedResponse,
                      []
                    )
                      .then(function(result) {
                        results.tcRejectedResponse = result.rows;
                        cb(null, results);
                        return connection.close();
                      })
                      .catch(function(err) {
                        console.error(err);
                        return connection.close();
                      });
                })
                .catch(function(err) {
                  console.error(err);
                  return connection.close();
                });
            })
            .catch(function(err) {
              console.error(err);
              return connection.close();
            });
        })
        .catch(function(err) {
          console.error(err);
          return connection.close();
        });
    })
    // .then(function(connection) {
    //   return connection.execute(
    //     queries.ordersActivatedToDate,
    //     {},
    //     {
    //       outFormat: oracledb.ARRAY
    //     }
    //   )
    //     .then(function(result) {
    //       results.ordersActivated = result;
    //     })
    //     .catch(function(err) {
    //       console.error(err);
    //       return connection.close();
    //     });
    // })
    // .then(function(connection) {
    //   return connection.execute(
    //     queries.ordersPendingToDate,
    //     {},
    //     {
    //       outFormat: oracledb.ARRAY
    //     }
    //   )
    //     .then(function(result) {
    //       results.ordersPending = result;
    //     })
    //     .catch(function(err) {
    //       console.error(err);
    //       return connection.close();
    //     });
    // })
    // .then(function(connection) {
    //   return connection.execute(
    //     queries.ordersWErrorToDate,
    //     {},
    //     {
    //       outFormat: oracledb.ARRAY
    //     }
    //   )
    //     .then(function(result) {
    //       results.ordersWError = result;
    //       cb(null, results);
    //       return connection.close();
    //     })
    //     .catch(function(err) {
    //       console.error(err);
    //       return connection.close();
    //     })
    // })
    .catch(function(err) {
      console.error(err);
    });
}

module.exports.getOrderInformation = getOrderInformation;
