var oracledb = require('oracledb');

module.exports = function(query, callback) {
  oracledb.getConnection(
  {
    user          : "username",
    password      : "password",
    connectString : "localhost/8000"
  },
  function(err, connection) {
    if (err) return callback(err, connection);

    connection.execute(query, function(err, result) {
      if (err) return callback(err, result);

      callback(null, result);
      
      return result;
    });
  }
)}
