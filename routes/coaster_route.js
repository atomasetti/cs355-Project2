var express = require('express');
var router = express.Router();
var coasterDal = require('../model/coaster_dal');


router.get('/all', function(req, res)
{
    coasterDal.GetAll(function (err, result)
    {
//        console.log(result);
        if (err)
            throw err;
        res.render('displayAllCoasters.ejs', {rs: result});
    });
});


router.get('/', function (req, res) {
    parkDal.GetByID(req.query.park_id, function (err, result) {
            if (err) throw err;

            res.render('displayParkInfo.ejs', {rs: result, park_id: req.query.park_id});
        }
    );
});


router.get('/create', function(req, res, next) {
    res.render('ParkFormCreate.ejs');

});

router.get('/save', function(req, res, next) {
    console.log("AmusementParkName equals: " + req.query.AmusementParkName);
    console.log("City equals: " + req.query.City);
    console.log("State equals: " + req.query.State);
    console.log("Country equals: " + req.query.Country);


    parkDal.Insert(req.query, function(err, result){
        if (err) {
            res.send(err);
        }
        else {
            res.send("Successfully saved the Park.");
        }
    });

});
// Added for Lab 10

router.get('/edit', function(req, res){
    console.log('/edit park_id:' + req.query.park_id);

    parkDal.GetByID(req.query.park_id, function(err, park_result){
        if(err) {
            console.log(err);
            res.send('error: ' + err);
        }
        else {
            res.render('park_edit_form.ejs', {rs: park_result,  message: req.query.message});
        }
    });
});

// Added for Lab 10

router.post('/update_park', function(req,res){
    console.log(req.body);
    // first update the movie
    parkDal.Update(req.body.park_id, req.body.ParkName, req.body.LocationID, req.body.City, req.body.Sate, req.body.Country, req.body.park_id,
        function(err){
            var message;
            if(err) {
                console.log(err);
                message = 'error: ' + err.message;
            }
            else {
                message = 'success';
            }

        });
});

// Added for Lab 10

router.get('/delete', function(req, res){
    console.log(req.query);
    parkDal.GetByID(req.query.park_id, function(err, result) {
        if(err){
            res.send("Error: " + err);
        }
        else if(result.length != 0) {
            parkDal.DeleteById(req.query.park_id, function (err) {
                res.send(result[0].ParkName + ' Successfully Deleted');
            });
        }
        else {
            res.send('Park does not exist in the database.');
        }
    });
});

module.exports = router;