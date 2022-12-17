var express = require('express');
var router = express.Router();

var template = require('./template.js');
var db = require('./db');

router.get('/login', function(request, response){
    res.send('<h1>등록됨</h1>');
});