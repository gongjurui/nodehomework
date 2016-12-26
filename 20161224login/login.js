var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var querystring = require('querystring');
//注册
app.set('view engine', 'ejs');
//模板的存放目录的绝对路径
app.set('views', path.resolve('views'));
app.use(bodyParser.urlencoded({extended: true}));


var users = [];
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('content-type', 'text/html;charset=utf8');
    next()
});

app.get('/signup', function (req, res) {
    res.render('signup.ejs', {users: users});
});
app.post('/signup', function (req, res) {
    console.log(req.body);
    var obj = querystring.parse(req.body);
    users.push(obj);
    res.redirect('/signin');
});
//登录
app.get('/signin', function (req, res) {
    res.render('signin.ejs', {users: users});
});
app.post('/signin', function (req, res) {
    console.log(req.body);
    var obj = querystring.parse(req.body);
    users.forEach(function (item) {
        if (item.name == obj.name && item.password == obj.password) {
            res.redirect('/welcome');
        }
    })
});
//欢迎页

app.get('/welcome', function (req, res) {
    res.render('welcome', {});
});
app.listen(8080);