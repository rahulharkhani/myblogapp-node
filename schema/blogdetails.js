var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
    title: String,
    description: String,
    image: String,
    createddate: String
});
var Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog