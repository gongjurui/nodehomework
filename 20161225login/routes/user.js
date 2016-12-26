var express = require('express');
var router = express.Router();
// 保存所有的用户
var users = [];
var session = {username: []}
//注册
router.get('/signup', function (req, res) {
    res.render('signup', {
        title: '用户注册',
        error:req.session.error,
    });
});

router.post('/signup', function (req, res) {
    var user = req.body;
    users.push(user);
    //res.redirect('/user/signin');
    if (!req.session.username) {
        session.username.push(user.username);
        req.session.username = user.username;
        req.session.error='';
        console.log(11);

        console.log(session);

        res.redirect('/user/signin');
    } else {
        var username = req.body.username;
        console.log(22);
        console.log(session);
        session.username.forEach(function (item) {
            if (item == username) {
                req.session.error='用户名重复';
                console.log(33)

                console.log(session)

                res.redirect('/user/signup');
            }else{
                session.username.push(username);
                console.log(44)
                req.session.error='';
                console.log(session)

                res.redirect('/user/signin');

            }
        });
    }
});
//登录
router.get('/signin', function (req, res) {
    res.render('signin', {title: '用户登录',error:req.session.error});
});
router.post('/signin', function (req, res) {
    var user = req.body;
    var existUser = users.find(function (item) {
        return user.username == item.username && user.password == item.password;
    });
    if (existUser) {
        req.session.user = existUser;
        req.session.error = '';
        res.redirect('/user/welcome');
    } else {
        req.session.error = '输入正确的账号密码';
        res.redirect('/user/signin');
    }


});
//欢迎页
router.get('/welcome', function (req, res) {
    res.render('welcome', {title: '欢迎页',username:req.session.user.username});
});
module.exports = router;