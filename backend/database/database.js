var mysql = require('mysql');


var connection = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'node_test',
    port: 3306,
    debug: false,
    multipleStatements: true
});

module.exports.connection = connection;

