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


router.post('/', function (req, res) {
  let contact = req.body;
  db.collection('contacts').insert(contact, function (err, result) {
    console.log(err, result);
    res.send("Contact created successfully!");
  });
});

router.get('/:id', function (req, res) {
  let id = req.params.id;
  db.collection('contacts').findOne({ '_id': new BSON.ObjectID(id) }, function (err, contact) {
    res.send(contact);
  });
});

router.get('/', function (req, res) {
  let id = req.params.id;
  db.collection('contacts').findOne({ '_id': new BSON.ObjectID(id) }, function (err, contact) {
    res.send(contact);
  });
});
router.put('/:id', function (req, res) {
  let id = req.params.id;
  let contact = req.body;
  db.collection('contacts').update({ '_id': new BSON.ObjectID(id) }, contact, { safe: true }, function (err, result) {
    if (err) {
      console.log('Error updating contact: ' + err);
      res.send({ 'error': 'An error has occurred' });
    } else {
      console.log('' + result + ' document(s) updated');
      res.send(contact);
    }
  });
});

router.delete('/:id', function (req, res) {
  let id = req.params.id;
  db.collection('contacts').remove({ '_id': new BSON.ObjectID(id) }, contact, { safe: true }, function (err, result) {
    if (err) {
      console.log('Error deleting contact: ' + err);
      res.send({ 'error': 'An error has occurred' });
    } else {
      console.log('' + result + ' Contact deleted.');
      res.send(contact);
    }
  });
})



module.exports = router;