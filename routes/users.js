var express = require('express');
var router = express.Router();
var userDal = require('../model/user_dal')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/create', function(req, res, next) {
  res.render('userFormCreate.ejs');
});

router.get('/save', function(req, res, next) {
  console.log("username equals: " + req.query.username);
  console.log("first equals: " + req.query.first);
  console.log("the last submitted was: " + req.query.last);
  //res.send("Successfully received the request.");
  userDal.Insert(req.query, function(err, result){
    if (err) {
      res.send(err);
    }
    else {
      res.send("Successfully saved the user.");
    }
  });
});

module.exports = router;
