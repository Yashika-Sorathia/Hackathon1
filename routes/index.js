var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost:27017/Hackathon';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/register', function(req, res, next) {
  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('doctor').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      res.render('index', {items: resultArray});
    });
  });
});

router.post('/register', function(req, res, next) {
  var item = {
    fname: req.body.fname,
    lname: req.body.lname,
    contactno: req.body.contactno,
    email: req.body.email,
    password: req.body.password,
    cpassword: req.body.cpassword,
    accept: req.body.accept

  };

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    //user-data is name of collection
    db.collection('doctor').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      db.close();
    });
  });

  res.redirect('/');
});

module.exports = router;
