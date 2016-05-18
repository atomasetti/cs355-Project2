var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM RollerCoaster;',
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


exports.GetByID = function(park_id, callback) {
    console.log(park_id);
    var query = 'SELECT * FROM park_info_view WHERE AmusementParkID= ' + park_id;
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

/* NOTE: Just like functions in other languages the parameters sent to a function do not need to have the same names
 as the function definition. In this case, I'm sending the "req" parameter from the router to exports.Insert(),
 but exports.Insert() has defined this input parameter as "account_info"

 the callback parameter is an anonymous function passed like a parameter, that will be run later on within
 this function.
 */
exports.Insert = function(park_info, callback) {



    console.log(park_info);

    var dynamic_query = 'INSERT INTO AmusementPark (Name) VALUES (' +
        '\'' + park_info.AmusementParkName + '\'' +
        ');'
    /*+
     'INSERT INTO LocationsP (City, State, Country) VALUES (' +
     '\'' + park_info.City + '\',' +
     '\'' + park_info.State + '\',' +
     '\'' + park_info.Country + '\'' +
     ');';
     */
    console.log("test");
    console.log(dynamic_query);

    connection.query(dynamic_query,

        function (err, result) {

            // if the err parameter isn't null or 0, then it will run the code within the if statement
            if(err) {
                /* this section of code prints out the error to the console and then runs the function that was
                 passed to exports.Insert().
                 */
                console.log(err);
                callback(true);
                return;
            }


            callback(false, result);
        }
    );
    /*
     var location_query = 'INSERT INTO LocationsP (City, State, Country) VALUES (' +
     '\'' + park_info.City + '\',' +
     '\'' + park_info.State + '\',' +
     '\'' + park_info.Country + '\'' +
     ');';

     console.log("test");
     console.log(location_query);

     connection.query(location_query,

     function (err, result) {

     if(err) {

     console.log(err);
     callback(true);
     return;
     }

     callback(false, result);
     }
     );
     */
}



exports.Insert2 = function(park_info, callback)
{

    console.log(park_info);

    var dynamic_query = 'INSERT INTO park_info_view (ParkName, City, State, Country) VALUES (' +
        '\'' + park_info.AmusementParkName + '\'' +
        '\'' + park_info.City + '\',' +
        '\'' + park_info.State + '\',' +
        '\'' + park_info.Country + '\'' +
        ');';

    console.log("test");
    console.log(dynamic_query);

    connection.query(dynamic_query,

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

var DeleteMovieGenres = function(movie_id, callback) {
    var genre_qry = 'DELETE FROM GenreLookup WHERE movieID = ?';
    connection.query(genre_qry, movie_id, function (err, result) {
        callback(err, result);
    });
};

var AddMovieGenres = function(movie_id, genre_ids, callback) {
    if (genre_ids != null) {
        var genre_qry_values = [];

        if (genre_ids instanceof Array) {
            for (var i = 0; i < genre_ids.length; i++) {
                genre_qry_values.push([movie_id, genre_ids[i]]);
            }
        }
        else {
            genre_qry_values.push([movie_id, genre_ids]);
        }

        var genre_qry = 'INSERT INTO GenreLookup (movieID, genreID) VALUES ?';
        connection.query(genre_qry, [genre_qry_values], function (err) {
            callback(err);
        });
    }
};

exports.Update = function(park_id, location_id, ParkName, city, state, country, callback) {
    console.log(park_id, location_id, ParkName, city, state, country);
    var values1 = [ParkName, park_id];
    var values2 = [city, state, country, location_id];

    connection.query('UPDATE AmusementPark SET Name = ? WHERE AmusementParkID = ?', values1,
        function(err, result){
            if(err) {
                console.log(this.sql);
                callback(err, null);
            }
        });

    connection.query('UPDATE LocationsP SET City = ?, State = ?, Country = ? WHERE LocationID = ?', values2,
        function(err, result){
            if(err) {
                console.log(this.sql);
                callback(err, null);
            }
        });

}

var Delete = function(park_id, callback) {
//function Delete(movie_id, callback) {
    var qry = 'DELETE FROM AmusementPark WHERE AmusementParkID = ?';
    connection.query(qry, [park_id],
        function (err) {
            callback(err);
        });
}

exports.DeleteById = Delete;