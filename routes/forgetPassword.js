var express = require('express');
var fs = require('fs');
var router = express.Router();
var connectionProvider = require('./mySqlConnectionProvider.js');
var nodemailer = require('nodemailer');
var app = express();

var forgot = require('password-reset')({
    uri: 'http://localhost:8080/password_reset',
    from: 'password-robot@localhost',
    host: 'localhost', port: 25,
    secure: true, // use SSL
    auth: {
        user: 'poonam25.modani@gmail.com',
        pass: 'poonam!modani'
    }
});
app.use(forgot.middleware);

router.post('/', function (req, res) {
    var email = req.body.email;
    var reset = forgot(email, function (err) {
        if (err) res.end('Error sending message: ' + err)
        else res.end('Check your inbox for a password reset message.')
    });

    reset.on('request', function (req_, res_) {
        req_.session.reset = { email: email, id: reset.id };
        fs.createReadStream('login.html').pipe(res_);
    });
});

router.post('/reset', function (req, res) {
    if (!req.session.reset) return res.end('reset token not set');

    var password = req.body.password;
    var confirm = req.body.confirm;
    if (password !== confirm) return res.end('passwords do not match');

    // update the user db here 

    forgot.expire(req.session.reset.id);
    delete req.session.reset;
    res.end('password reset');
});
module.exports = router;

/*

router.post('/', function (req, res) {

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'poonam25.modani@gmail.com',
            pass: 'poonam!modani' // Your password
        }
    });

    var text = 'Hello you are registered for payroll application';
    var mailOptions = {
        from: 'poonam25.modani@gmail.com', // sender address
        to: 'prachi96modani@gmail.com', // list of receivers
        subject: 'Email Example', // Subject line
        text: text //, // plaintext body
        // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };

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
        var query = connection.query("insert into user_payroll set ?", dataUserName, function (err, rows, fields) {
            if (err)
                console.log("Error inserting : %s ", err);
        });

        connection.query("SELECT * FROM user_payroll where user_name='" + input.email + "'", function (err, rows, fields) {
            rows.forEach(function (row) {

                console.log("Row");
                console.log(row);
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1; //January is 0!
                var yyyy = today.getFullYear();
                today = yyyy + '-' + mm + '-' + dd;

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
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                                //res.json({ yo: 'error' });
                            } else {
                                console.log('Message sent: ' + info.response);
                                //res.json({ yo: info.response });
                            };
                        });
                        res.render('login'/*, {users:users});
                    }
                });
            });


        });

    }
});

module.exports = router;
*/