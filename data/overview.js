var oracledb = require('oracledb');
var config = require(__dirname + '/../config.js');

function getToBeBilled(cb) {
    oracledb.getConnection(
      config.database,
      function(err, connection) {
          if (err) {
            cb(err);

            return;
          }

          connection.execute(
            // INSERT STATEMENT HERE
            'SELECT * FROM product_t',
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

module.exports.getToBeBilled = getToBeBilled;

function getByServiceType(cb) {
  var rows = getToBeBilled(cb);

  for (var i = 0; i < rows.length; i ++) {

  }
}
