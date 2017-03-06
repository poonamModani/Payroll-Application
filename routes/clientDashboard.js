var express = require('express');
var router = express.Router();
var loginDao = require('./loginDao.js');

router.post('/', function (req, res) {

    var username = req.body.username;
    var password = req.body.password;

    loginDao.loginDao.getUser(username,function (users) {
        console.log(users);
        if (users.length != 0) {
            users.forEach(function (user) {
                if (user.user_name == username && user.password == password) {
                    console.log("Login Successful....correct username password");
                    if (user.user_role == "Client") {
                        res.render('clientDashboard'/*, {users:users}*/);
                    } else {
                        loginDao.loginDao.getAllUsers(function (clientList) {
                            console.log("Client List:::");
                            console.log(clientList);
                            res.render('clientManagement', { clientList: clientList});
                        });
                        
                    }                    
                } else {
                    console.log("Login unsuccessful....correct username incorrect password");
                }
            });
        }
        if (users.length == 0) {
            console.log("Login unsuccessful....incorrect username");
        }
        
        //res.render('clientDashboard'/*, {users:users}*/);
    });
    
});

module.exports = router;