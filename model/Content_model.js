var mongoose = require('mongoose');
var url = 'mongodb://localhost/Travel';

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

var ContentSchema = mongoose.Schema({
    title :{
        type:String
    },
    content:{
        type:String
    },
    author:{
        type:String
    },
    image:{
        type:String
    },
    date:{
        type:Date
    }
})

var Content = module.exports = mongoose.model('content_db',ContentSchema);

module.exports.addContent = function(content,callback){
    content.save(callback);
}