var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: '3307',
    password: "1234",
    database: "bread"
});

con.connect(function(err) {
    if (err) throw err;
    var sql = "SELECT * FROM bread";
    con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    });
});