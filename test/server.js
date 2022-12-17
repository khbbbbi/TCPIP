
var express = require('express')
var app = express()
// const path = require('path')
const bodyParser = require('body-parser')

const port = 4000

//session
const session = require('express-session');
const FileStore = require('session-file-store')(session)
app.use(session({
    secret: '~~~',	// 원하는 문자 입력
    resave: true,
    saveUninitialized: true,
    store:new FileStore(),
}))

app.set('view engine','ejs');
app.engine('ejs', require('ejs').__express);
const ejs = require('ejs') //추가

app.use(express.static('views'));   //이미지 파일 불러올수 있도록 하는것 

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static('public'));

const mysql = require('mysql');
const { response } = require('express')
const db = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: '1234',
    database: 'potato',
    multipleStatements: true
});

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//디비 연결 성공하면 콘솔에 Connected
db.connect(function(err) {
    if (err) throw err;
    console.log('Connected');
});

//노드 실행하면 나오는 화면 : 로그인
app.get('/', function (req, res) {
    res.render('Login');
})
app.post('/', function (req, res) {
    res.render('Login');
})

//로그인
app.post('/logined', function(request, response) {
    var custid = request.body.custid;
    var custpw = request.body.custpw;
    
    if (custid && custpw) {
        db.query('SELECT * FROM customer WHERE custid = ? AND custpw = ?', [custid, custpw], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.custid = custid;
                request.session.save(err => {
                    if (err) throw err;
                    response.redirect('/main');
                   // response.render('Mainpage');
                });
                // response.redirect('/main');
                // response.end();
            } else {              
                response.send('<script type="text/javascript">alert("회원 정보가 일치하지 않습니다."); document.location.href="/";</script>');    
            }   
        });
    } else {        
        response.send('<script type="text/javascript">alert("username과 password를 입력하세요!"); document.location.href="/login";</script>');    
        response.end();
    }
});

// 로그아웃
app.get('/logout', function(request, response) {
    request.session.loggedin = false;
    response.send('<script type="text/javascript">alert("성공적으로 로그아웃 되었습니다."); document.location.href="/";</script>');    
    response.end();
});

//회원 탈퇴하기
app.get('/deleteinfo/:custid',(req,res)=>{
    const custid = req.session.custid
    const sql = "DELETE FROM customer WHERE custid = ?";
    db.query(sql ,[custid],function(err,result,fields){
        if (err) throw err;
        console.log(result)
        res.send('<script type="text/javascript">alert("성공적으로 탈퇴 되었습니다."); document.location.href="/";</script>');  
    })
});

//회원가입페이지로 이동
app.get('/gosignup', function(request, response){
    response.render('Signup');
});
app.post('/gosignup', function(request, response){
    response.render('Signup');
});

//회원가입 insert
app.post('/signup', function(request, response){
    const sql = "INSERT INTO customer SET ?"
    db.query(sql,request.body,function(err, result, fields){
        if(err) throw err;
        response.send('<script type="text/javascript">alert("성공적으로 회원가입 되었습니다."); history.go(-2);</script>');
    })
});

//아이디 중복확인
app.post('/idcopycheck', function(request, response){
    var custid = request.body.custid;
    if (custid) {
        db.query('SELECT * FROM customer WHERE custid = ?', [custid], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                response.send('<script type="text/javascript">alert("이미 사용 중인 아이디입니다."); document.location.href="/gosignup"; </script>');    
            }else{
                response.send('<script type="text/javascript">alert("사용 가능한 아이디입니다."); history.back();</script>');
            }
        });
    } 
});

 //메인화면 내정보
app.get('/main', function(request,response){
    console.log(`${request.session.custid}`);
    //const user = `${request.session.custid}`;
    const custid = request.session.custid
    const sql1 = "select * from customer where custid = ?;";
    const sql2 = "select * from studyroom where custid = ? limit 2;";
    const sql3 = "select * from studyroom limit 5;";
    db.query(sql1 + sql2 + sql3, [custid,custid], function(err, result, fields){
        if(err) throw err;
    //   var sql1_result = results[0];	//sql1 의 결과값
    //   var sql2_result = results[1];	//sql2 의 결과값

        response.render('Mainpage',{myinfo: result[0],mroom: result[1],msroom: result[2]});
        //response.render('Mainpage',{mroom: result[1]});
    });
});


// 게시판 select : Mainpage에서 메뉴바 스터디그룹을 누르면 /GesipanDB가 호출 > 전달할 디비 정보들을 적고 
// res.render로 views폴더에 있는 Gesipan.ejs에 값을 전달하며 페이지 이동
app.get('/Gesipan', function(req,res){
    const custid = req.session.custid
    const sql1 = "select * from  customer where custid = ?;";
    const sql2 = "select * from studyroom";
    db.query(sql1 + sql2, [custid] , function(err, result, fields){
        if(err) throw err;
        res.render('Gesipan', {myinfo: result[0], writing: result[1]});
    });
});
app.post('/Gesipan', function(req,res){
    const custid = req.session.custid
    const sql1 = "select * from  customer where custid = ?;";
    const sql2 = "select * from studyroom";
    db.query(sql1 + sql2, [custid] , function(err, result, fields){
        if(err) throw err;
        res.render('Gesipan', {myinfo: result[0], writing: result[1]});
    });
});

// 위에께 있으면 굳이 이게 필요 없음.
// app.get('/Gesipan', function(req,res){
//     res.sendFile(__dirname + '/Gesipan.html');
// })


// Gesipan.ejs에서 받아온 값 : 방 들어가기 누르면 rooid받아와서 room.ejs에 roomtitle전달
app.get('/goroom/:roomid', (req,res) => {
    const custid = req.session.custid
    const sql1 = "select * from  customer where custid = ?;";
    const sql2 = "select * from studyroom where roomid = ?";
    db.query(sql1+sql2,[custid, req.params.roomid],function (err, result, fields){
        if(err) throw err;
        res.render('room',{myinfo: result[0], room : result[1]});
    });
});

//내가 만든방에서 삭제
app.get('/deleteroom/:roomid', (req,res) => {
    const sql2 = "delete from studyroom where roomid = ?";
    db.query(sql2,[req.params.roomid],function (err, result, fields){
        if(err) throw err;
        res.send('<script type="text/javascript">alert("성공적으로 삭제 되었습니다."); document.location.href="/myroom";</script>');
    });
});

//방만들기 페이지로 이동
app.get('/Create', function (req, res) {
    const custid = req.session.custid
    const sql = "select * from  customer where custid = ?;";
    db.query(sql,[custid],function (err, result, fields){
        if(err) throw err;
        res.render('createroom',{myinfo: result});
    });
});

//방만들기 페이지로 이동
app.post('/Create', function (req, res) {
    const custid = req.session.custid
    const sql = "select * from  customer where custid = ?;";
    db.query(sql,[custid],function (err, result, fields){
        if(err) throw err;
        res.render('createroom',{myinfo: result});
    });
});

//createroom -> gesipan : 방 생성
app.post('/gocreate', (req, res) => {
    const sql = "INSERT INTO studyroom SET ?"
    db.query(sql,req.body,function(err, result, fields){
        if(err) throw err;
        res.redirect('/Gesipan')
    });
});


//내가 만든 방 페이지로 값넘김
app.get('/myroom', function(req,res){
    const custid = req.session.custid
    const sql1 = "select * from  customer where custid = ?;";
    const sql2 = "select * from  studyroom where custid = ?;";
    db.query(sql1 + sql2, [custid, custid],function(err, result, fields){
        if(err) throw err;
        res.render('Myroom', {myinfo: result[0],myroom: result[1]});
    });
});


//여기부터 소켓
var http = require('http');
var server = http.Server(app);
 
var socket = require('socket.io');
var io = socket(server);
 
var socketList = [];

io.on('connection', function(socket) {
    socketList.push(socket);
    console.log('User Join');
 
    socket.on('SEND', function(msg) {
        console.log(msg);
        socketList.forEach(function(item, i) {
            console.log(item.id);
            if (item != socket) {
                item.emit('SEND', msg);
            }
        });
    });
 
    socket.on('disconnect', function() {
        socketList.splice(socketList.indexOf(socket), 1);
    });
});

server.listen(port, function(){
    console.log('Server On!')
});