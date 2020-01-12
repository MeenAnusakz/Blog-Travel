var mongoose = require('mongoose');
var url = 'mongodb://localhost/Travel';
var bcrypt = require('bcryptjs');

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

var UserSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
        min: 8,
        max: 20
    },
    email: {
        type: String,
        require: true,
        lowercaes: true,
        trim: true
    },
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String, require: true
    },
    Date: {
        type: Date,
        default: Date.now
    },
    Content:[{
        content_title :{
            type:String
        },
        content_date :{
            type:Date
        }
    }]

})

var User = module.exports = mongoose.model('user_db', UserSchema);

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}
module.exports.findUserByID = function (id, callback) {
    User.findById(id, callback);
}
module.exports.findUserByName = function (username, callback) {
    var name = {
        username: username
    }
    User.findOne(name, callback);
}
module.exports.comparepassword = function (password, hash, callback) {
    bcrypt.compare(password, hash, function (err, isMatch) {
        callback(null, isMatch);
    });
}
module.exports.addcontentUser = function(value,callback){
    username=value["content_username"];
    content_title=value["content_title"];
    content_date=value["content_date"];
    var query = {
        username: username
    }
    User.findOneAndUpdate(
      query,{
        $push:{
          "Content":{
            content_title:content_title,
            content_date : content_date
          }
        }
      },{
        safe:true,
        upsert:true
      },callback)
}
