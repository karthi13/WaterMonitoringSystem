var mysql = require('mysql');
let config = require('../database/config');

var connection = mysql.createPool(config.config);

module.exports.connection = connection;

