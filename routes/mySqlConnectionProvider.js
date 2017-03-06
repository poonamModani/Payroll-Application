var mySql = require('mysql');
var mySqlConnectionString = require('./mySqlConnectionString.js');
console.log("In provider"); 
var mySqlConnectionProvider = {

    getSqlConnection: function () {
        console.log("In provider");
        var connection = mySql.createConnection(mySqlConnectionString.mySqlConnectionString.connectionString);
        connection.connect(function (error) {
            if (error) {
                console.log("In error");
                throw error;
            }
            console.log("Connection is successful");
        });

        return connection;
    }
};

exports.mySqlConnectionProvider = mySqlConnectionProvider;