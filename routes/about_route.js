var express = require('express');
var router = express.Router();

router.get('/', function(req, res)
{
        res.render('About.ejs');

});

module.exports = router;