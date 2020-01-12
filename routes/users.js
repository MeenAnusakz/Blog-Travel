var express = require('express');
var router = express.Router();
var User = require('../model/User_model');
var passport = require('passport');
var LocalStrategy = require('passport-local');
const { check, validationResult } = require('express-validator');
/* GET users listing. */
router.get('/signin', function (req, res, next) {
  res.render('users/SignIn.ejs');
});
router.get('/signup', (req, res, next) => {
  res.render('users/SignUp.ejs');
  
})
router.post('/signup', [
  check('username', 'กรุณาป้อนชื่อผู้ใช้').not().isEmpty().trim(),
  check('password', 'กรุณาป้อนรหัสผ่าน 8-20ตัวอักษร').isLength({ min: 8, max: 20 }),
  check('email', 'กรุณาป้อนอีเมล').isEmail().isLowercase().trim(),
  check('firstname', 'กรุณาป้อนชื่อ').not().isEmpty(),
  check('lastname', 'กรุณาป้อนนามสกุล').not().isEmpty(),
], (req, res, next) => {
  var result = validationResult(req);
  var errors = result.errors;
  if (!result.isEmpty()) {
    res.render('users/SignUp', {
      errors: errors
    })
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname
    })
   User.addUser(newUser,function(err,user){
     if(err) throw err;
   })
   res.location('/users/signin');
   res.redirect('/users/signin');
  }
})

router.post('/signin',passport.authenticate('local',{
  failureRedirect:'/users/signin'
}),(req,res,next)=>{
  res.redirect('/profile')
})
router.get('/signout',(req,res)=>{
    req.logout();
    res.redirect('/users/signin');
})



passport.serializeUser(function(user, done) {
  done(null, user.id);
});
 
passport.deserializeUser(function(id, done) {
  User.findUserByID(id,function(err,user){
    done(err,user)
  })
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findUserByName(username,function(err,user){
      if(err) { return done(err) }
      if(!user) {return done(null,false)}
      User.comparepassword(password,user.password,function(err,isMatch){
        if(err) { return done(err) }
        console.log(isMatch);
        
        if(isMatch){
          return done(null,user);
        }else{
          return done(null,false);
        }
      })
    })
  }
));

module.exports = router;
