var express = require('express');
var router = express.Router();
var moment = require('moment');
var Content = require('../model/Content_model')
var User = require('../model/User_model');
/* GET home page. */
router.get('/', function(req, res, next) {
  Content.find((function(err,content){
    res.render('index',{
      content:content,
      moment:moment
    })
  }))
});

module.exports = router;
