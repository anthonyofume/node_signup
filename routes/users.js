var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
var router = express.Router();

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('We are connected');
});

//create template
var blogSchema = new mongoose.Schema({
  name: String,
  email: String,
  dob: Number,
  phone: Number
});

//declare schema
var Blog = mongoose.model('Blog', blogSchema);

var express = require('express');
var router = express.Router();


router.post('/', function (req, res, next) {
  var blog = new Blog(req.body);
  blog.save(function (err, result) {
    if (err) return console.error(err);
    res.status(201).send(result);
  });
});

/* view all blog entries */
router.get('/', function (req, res, next) {
  Blog.find(function (err, blogs) {
    if (err) return console.error(err);
    res.status(201).send(blogs);
  });
});


module.exports = router;
