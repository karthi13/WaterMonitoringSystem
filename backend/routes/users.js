var express = require('express');
var cors = require('cors')
var jwt = require('jsonwebtoken');

var database = require('../database/database');
var users = express.Router();
let SECRET_KEY = process.env.SECRET_KEY;
var token;
users.use(cors());

users.post('/register', function (req, res) {
    var today = new Date();
    var appData = {
        "error": 1,
        "data": ""
    };
    var userData = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "email": req.body.email,
        "password": req.body.password,
        "created": today
    };
    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            connection.query('INSERT INTO users SET ?', userData, function (err, rows, fields) {
                if (!err) {
                    appData.error = 0;
                    appData["data"] = "User Registered Successfully!";
                    res.status(201).json(appData);
                } else {
                    appData["data"] = "Error Occured!";
                    res.status(400).json(appData);
                }
            });
            connection.release();
        }
    });
});

users.post('/login', function (req, res) {
    var appData = {};
    var email = req.body.email;
    var password = req.body.password;
    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            connection.query('SELECT * FROM users WHERE email = ?', [email], function (err, rows, fields) {
                if (err) {
                    appData.error = 1;
                    appData["data"] = "Error Occured!";
                    res.status(400).json(appData);
                } else {
                    if (rows.length > 0) {
                        if (rows[0].password == password) {
                            console.log("ROW DATA = ", rows[0]);
                            token = jwt.sign(JSON.parse(JSON.stringify(rows[0])), "Breeze", {
                                expiresIn: 5000
                            });
                            appData.error = 0;
                            appData.isAuthenticated = true;
                            appData["token"] = token;
                            res.status(200).json(appData);
                        } else {
                            appData.error = 1;
                            appData["data"] = "Email and Password do not match";
                            res.status(204).json(appData);
                        }
                    } else {
                        appData.error = 1;
                        appData["data"] = "Email does not exist!";
                        res.status(204).json(appData);
                    }
                }
            });
            connection.release();
        }
    });
});

// users.use(function (req, res, next) {
//     var token = req.body.token || req.headers['token'];
//     var appData = {};
//     if (token) {
//         jwt.verify(token, process.env.SECRET_KEY, function (err) {
//             if (err) {
//                 appData['error'] = 1;
//                 appData['data'] = 'Token is invalid';
//                 res.status(500).json(appData);
//             } else {
//                 next();
//             }
//         });
//     } else {
//         appData['error'] = 1;
//         appData['data'] = 'Please send a token';
//         res.status(403).json(appData);
//     }
// });

users.get('/getUsers', function (req, res) {
    var token = req.body.token || req.headers['token'];
    var appData = {};
    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            connection.query('SELECT * FROM users', function (err, rows, fields) {
                if (!err) {
                    appData["error"] = 0;
                    appData["data"] = rows;
                    res.status(200).json(appData);
                } else {
                    appData["data"] = "No data found";
                    res.status(204).json(appData);
                }
            });
            connection.release();
        }
    });
});
module.exports = users;

