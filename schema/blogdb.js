var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    fullname: String,
    email: String,
    phone: String,
    password: String,
    isactive: Number,
    registereddate: String
});
var User = mongoose.model('User', userSchema);

module.exports = User