var express = require('express');
var router = express.Router();
var request = require('request')
var fs = require('fs');
const https = require('https');
//IT350 Specific
var mysql = require('mysql');

var db_con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Chegagg1o",
    database: "it350"
});

db_con.connect();


/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile('admin.html', {
        root: 'public'
    });
});

router.get('/getResults', function (req, res, next) {
    var databaseresults = "swag";
    var query = req.query.q.toLowerCase();
    console.log(query);

    db_con.query("SELECT * FROM " + query, function (err, result, fields) {
        if (err) {
            response.status(400).send('Error in database operation' + query);
            //throw err;
        } else {
            res.json(result);
        }
    });
});

router.get('/customSQL', function (req, res, next) {
    var databaseresults = "swag";
    var query = req.query.q.toLowerCase();
    console.log(query);


    db_con.query(query, function (err, result, fields) {
        if (err) {
            res.json(err);
            return;
        } else {
            res.json(result);
        }
    });

});


router.get('/getcity', function (req, res, next) {
    fs.readFile(__dirname + '/cities.dat.txt', function (err, data) {
        if (err) throw err;
        var jsonresults = []

        var cities = data.toString().split("\n");
        console.log("the req is " + req.query.q);
        var searchStr = req.query.q;
        if (searchStr)
            var myRe = new RegExp("^" + req.query.q)
        else
            var myRe = new RegExp("^")

        for (var i = 0; i < cities.length; i++) {
            var result = cities[i].search(myRe);
            if (result != -1) {
                //console.log(cities[i]);

                jsonresults.push({
                    city: cities[i]
                })
            }
        }
        res.status(200).json(jsonresults)
    });
});
router.get('/getword', function (req, res, next) {
    var userinput = req.query.q.toLowerCase();
    var myWord = "https://owlbot.info/api/v1/dictionary/" + userinput;
    console.log("In getword");
    request(myWord).pipe(res);

});

module.exports = router;
