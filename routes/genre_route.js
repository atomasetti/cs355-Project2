var express = require('express');
var router = express.Router();
var genreDal = require('../model/genre_dal');

router.get('/all', function(req, res)
{
    genreDal.GetAll(function (err, result)
    {
//        console.log(result);
        if (err)
            throw err;
        res.render('displayAllGenres.ejs', {rs: result});
    });
});

router.get('/new', function(req, res) {
    res.render('genre_insert_form.ejs', {rs: res});
  //  res.render('genre/genre_insert_form');
});

router.get('/genre_insert', function(req, res){
    genreDal.Insert(req.query.genre_name, function(err, result){
        var response = {};
        if(err) {
            response.message = err.message;
        }
        else {
            response.message = 'Success!';
        }
        res.json(response);
    });
});

router.get('/delete', function(req, res){
    console.log(req.query);
    genreDal.GetByID(req.query.genre_id, function(err, result) {
        if(err){
            res.send("Error: " + err);
        }
        else if(result.length != 0) {
            genreDal.DeleteById(req.query.genre_id, function (err) {
                res.send(result[0].genreName + ' Successfully Deleted');
            });
        }
        else {
            res.send('Genre does not exist in the database.');
        }
    });
});

module.exports = router;