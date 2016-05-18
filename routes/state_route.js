var express = require('express');
var router = express.Router();
var stateDal = require('../model/state_dal');


router.get('/all', function(req, res) {
    stateDal.GetAll(function (err, result) {
//        console.log(result);
            if (err) throw err;
            res.render('displayAllStates.ejs', {rs: result});
        }
    );
});


router.get('/', function (req, res) {
    stateDal.GetByID(req.query.state_id, function (err, result) {
            if (err) throw err;

       //     res.render('displayMovieInfo.ejs', {rs: result, movie_id: req.query.movie_id});
        }
    );
});

module.exports = router;