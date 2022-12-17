var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: '1234',
    database: 'potato'
});
db.connect();

module.exports = db;