var connectionProvider = require('./mySqlConnectionProvider.js');

var loginDao = {
    getUser: function (username,callback) {
        var connection = connectionProvider.mySqlConnectionProvider.getSqlConnection();
        var users = [];
        var sqlStatement = " SELECT * FROM user_payroll where user_name='"+username+"'";
        if (connection) {
            connection.query(sqlStatement, function (err, rows, fields) {
                rows.forEach(function (row) {
                    users.push(row);
                  });
                callback(users);
            });
        }
       // connectionProvider.mySqlConnectionProvider.closeSqlConnection(connection);
    },
    getAllUsers: function (callback) {
        var connection = connectionProvider.mySqlConnectionProvider.getSqlConnection();
        var users = [];
        var sqlStatement = "select * from user_payroll up inner join user_details ud where up.user_id=ud.user_id";
        if (connection) {
            connection.query(sqlStatement, function (err, rows, fields) {
                rows.forEach(function (row) {
                    users.push(row);
                    console.log("Row");
                    console.log(row);
                });
                callback(users);
            });
        }
        // connectionProvider.mySqlConnectionProvider.closeSqlConnection(connection);
    }
};

exports.loginDao = loginDao;