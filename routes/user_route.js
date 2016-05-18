var express = require('express');
var router = express.Router();
var userDal = require('../model/user_dal');
var stateDal = require('../model/state_dal');

router.get('/all', function(req, res) {
    userDal.GetAll(function (err, result) {
//        console.log(result);
            if (err) throw err;
            res.render('displayAllUsers.ejs', {rs: result});
        }
    );
});


router.get('/', function (req, res) {
    console.log(req.query.user_id);
    if(req.query.user_id == null){
        res.redirect('/user/all')
    }
    else {
        userDal.GetByID(req.query.user_id, function (err, result) {
                if (err) {
                    res.send("Error: " + err);
                    return;
                }
                console.log(result);
                res.render('displayUserInfo.ejs', {rs: result, user_id: req.query.user_id});
            }
        );
    }
});

router.get('/create', function(req, res, next) {
    // res.send('Hello, World!');
    stateDal.GetAll( function(err, result){
        if(err) {
            res.send("Error: " + err);
        }
        else {
            res.render('userFormCreate.ejs', {state: result});
        }
    });
});

router.get('/save', function (req, res, next) {
    console.log("username equals: " + req.query.username);
    console.log("first equals: " + req.query.first);
    console.log("the lastname submitted was: " + req.query.last);
    console.log("email equals: " + req.query.email);
    console.log("password equals: " + req.query.password);
    console.log("state_id equals: " + req.query.state_id);
    userDal.Insert(req.query, function (err, result) {
        if (err) {
            res.send(err);
            res.send("err:P");
        }
        else {
            res.send("Successfully saved the user.");
        }
    });
});

router.post('/insert_user', function(req, res) {
    console.log(req.body);
    userDal.Insert(req.body,
        function(err){
            if(err){
                res.send('Fail!<br />' + err);
            } else {
                res.send('Success!')
            }
        });


});

router.get('/edit', function(req, res){
    console.log('/edit user_id:' + req.query.user_id);

    userDal.GetByIDdelete(req.query.user_id, function(err, user_result){
        if(err) {
            console.log(err);
            res.send('error: ' + err);
        }
        else {
            message = 'success';
            console.log(user_result);
            stateDal.GetAll(function (err, state_result) {
                console.log(state_result);
                res.render('user_edit_form.ejs', {rs: user_result, states: state_result, message: req.query.message});


            });
        }

    });
});

router.post('/update_user', function(req,res){
    console.log(req.body);
    // first update the movie
    userDal.Update(req.body.user_id, req.body.username, req.body.first, req.body.last, req.body.email, req.body.password, req.body.state_id,
        function(err){
            var message;
            if(err) {
                console.log(err);
                message = 'error: ' + err.message;
            }
            else {
                message = 'success';
            }
            // next update the genres
            userDal.GetByID(req.body.user_id, function(err, user_info){
                stateDal.GetAll(function(err, state_result){
                    res.render('user_edit_form.ejs', {rs: user_info, states: state_result });
                });
            });

        });
});

router.get('/delete', function(req, res){
    console.log(req.query);
    userDal.GetByIDdelete(req.query.user_id, function(err, result) {
        if(err){
            res.send("Error: " + err);
        }
        else if(result.length != 0) {
            userDal.DeleteById(req.query.user_id, function (err) {
                res.send(result[0].first + ' Successfully Deleted');
            });
        }
        else {
            res.send('User does not exist in the database.');
        }
    });
});

module.exports = router;