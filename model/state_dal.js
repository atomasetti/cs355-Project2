var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM state;',
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


exports.Insert = function(state_name, callback) {
    var qry = "INSERT INTO state (state_name) VALUES (?)";
    connection.query(qry, state_name, function(err, result){
        callback(err, result);
    });
}

exports.GetByID = function(state_id, callback) {
    console.log(state_id);
    var query = 'SELECT * FROM state WHERE state_id= ' + state_id;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}