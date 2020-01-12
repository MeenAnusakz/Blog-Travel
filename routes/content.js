var express = require('express');
var router = express.Router();
var User = require('../model/User_model');
var Content = require('../model/Content_model');
var moment = require('moment');
const { check, validationResult } = require('express-validator');

/* GET home page. */
router.get('/add', function (req, res, next) {
    res.render('content/add-content.ejs');
});
router.post('/add', [
    check('title', 'กรุณาป้อนชื่อเรื่อง').not().isEmpty(),
    check('content', 'กรุณาป้อนเนื้อเรื่อง').not().isEmpty(),
    check('author', 'กรุณาป้อนชื่อผู้เขียน').not().isEmpty(),
    check('date', 'กรุณาป้อนวันที่').not().isEmpty(),
    check('image', 'กรูณาใส่รูปภาพ').not().isEmpty()
], (req, res, next) => {
    var result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
        res.render('content/add-content.ejs', {
            errors: errors
        })
    } else {
        var content = new Content({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            image: req.body.image,
            date: req.body.date
        })
        value = [];
        value["content_username"] = req.user.username;
        value["content_title"] = req.body.title;
        value["content_date"] = req.body.date;

        Content.addContent(content, function (err, contet) {
            if (err) throw err;
        })
        User.addcontentUser(value, function (err, user) {
            if (err) throw err;
        })
        res.redirect('/profile');
    }
})

router.get('/views/:id',(req,res,next)=>{
    Content.findById(req.params.id,function(err,content){
      res.render('content/views.ejs',{
          content:content,
          moment:moment
      })
        
    })
})
module.exports = router;