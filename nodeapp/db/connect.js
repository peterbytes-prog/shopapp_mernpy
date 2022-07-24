var mongoose = require('mongoose');


// var mongoDB = mongoose.connect('mongodb://mongo:27017/shop', {useNewUrlParser:true});
var mongoDB = mongoose.connect('mongodb://127.0.0.1/shop', {useNewUrlParser:true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, "mongoDB failed to connect"));
db.on('connected', console.error.bind(console, "mongoDB successsful connected"));

module.exports = db;
