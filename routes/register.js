var express = require('express');
var router = express.Router();
var connectionProvider = require('./mySqlConnectionProvider.js');

router.post('/', function (req, res) {

    console.log("In register");
    var input = JSON.parse(JSON.stringify(req.body));
    console.log("Input:::");
    console.log(input);  

    var connection = connectionProvider.mySqlConnectionProvider.getSqlConnection();
    var dataUserName = {
        user_name: input.email,
        password: input.password
    };

    if (connection) {
        var query = connection.query("insert into user_payroll set ?",dataUserName, function (err, rows, fields) {
            if (err)
                console.log("Error inserting : %s ", err);
        });
        
        connection.query("SELECT * FROM user_payroll where user_name='"+input.email+"'", function (err, rows, fields) {
            rows.forEach(function (row) {
                
                console.log("Row");
                console.log(row);

                var dataUserDetails = {
                    user_id: row.user_id,
                    company_name: input.companyName,
                    full_name: input.fullname,
                    phone: input.phone,
                    industry: input.industry,
                    company_size: input.companySize,
                    country: input.country,
                    created_date: today,
                    status: "Inactive"
                };
                var query1 = connection.query("insert into user_details set?", dataUserDetails, function (err, rows, fields) {
                    if (err) {
                        console.log("Error inserting : %s ", err);
                    } else {
                        res.render('login'/*, {users:users}*/);
                    }
                });
            });
            
            
        });

    }
});

module.exports = router;