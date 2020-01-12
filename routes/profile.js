var express = require('express');
var router = express.Router();
var User = require('../model/User_model')
var moment = require('moment');
var Content = require('../model/Content_model')
/* GET home page. */
router.get('/', function(req, res, next) {
    User.findUserByName(req.user.username,function(err,user){
        res.render('users/profile',{
            user:user,
            moment:moment
        })
    })
  
});

module.exports = router;