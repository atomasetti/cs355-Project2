var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM Genre;',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
}


exports.Insert = function(genre_name, callback) {
    var qry = "INSERT INTO Genre (genreName) VALUES (?)";
    connection.query(qry, genre_name, function(err, result){
        callback(err, result);
    });
}