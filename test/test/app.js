const express = require('express')
const app = express()
const port = 3000

const mysql = require('mysql');
const Connection = require('mysql2/typings/mysql/lib/Connection');

const con = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: '1234',
    database: 'bread',
    stream: true
});

con.connect(function(err){
    if(err) throw err;
    console.log('Connected');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/', function(request, response){
    Connection.query('SELECT * from bread', function(err, rows, fields){
        Connection.end();
        if(!err){
            response.send(rows);
            console.log('The solution is: ' , rows);
        }else
            console.log('Error while performing Query.');
    });
});

app.listen(3000);


// app.get('/list', (req, res) => {
//     var request = new sql.request();
//     request.stream = true;

//     q = 'select * from bread';
//     request.query(q, (err, recordset) => {
//         if(err){
//             return console.log('query error :',err)
//         }
//     });

//     var result = [];
//     request.on('error', function(err){
//         console.log(err);
//     })
//     .on('row', (row) => {
//         result.push(row)
//     })
//     .on
//     ('done', () => {
//         console.log('result :' , result)
//         res.render('list.ejs',{'posts' : result})
//     });
// });
// app.get('/', (request,response) => {
//     const sql = "select * from user"
//     con.query(sql, function (err, result, fields){
//         if(err) throw err;
//         response.send(result)
//     })

// });

// const sql = "INSERT INTO user VALUES ('2','1111','kim','1111')"

// con.query(sql, function(err, result, fields){
//     if(err) throw err;
//     console.log(result)
// })


// app.post('/', (req, res) => res.send(req.body))
