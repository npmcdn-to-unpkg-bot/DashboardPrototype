var oracledb = require('oracledb');
var config = require(__dirname + '/../config.js');

function getBillPlans(cb) {
  oracledb.getConnection(
    config.database,
    function(err, connection) {
      if(err) {
        cb(err);

        return;
      }

      connection.execute(
        '',
        {},
        {
          outFormat: oracledb.OBJECT
        },
        function(err, results) {
          if(err) {
            connection.release(function(err) {
              if(err) {
                console.error(err.message);
              }
            });

            cb(err);

            return;
          }

          cb(null, results.rows);

          connection.release(function(err) {
            if(err) {
              console.error(err.message);
            }
          });
        }
      );
    }
  );
}

module.exports.getBillPlans = getBillPlans;
