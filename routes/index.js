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
    var query = req.query.q.toLowerCase();
    if (compilequery(query)) {
        query = compilequery(query);
    } else {
        query = "SELECT * FROM " + query;

    }

    db_con.query(query, function (err, result, fields) {
        if (err) {
            response.status(400).send('Error in database operation' + query);
            //throw err;
        } else {
            res.json(result);
            console.log(result)
        }
    });
});

function compilequery(query) {
    console.log(query);

    switch (query) {
        case 'instructor':
            query = "SELECT  pe.fname as 'First Name', pe.mname as 'Middle Name', pe.lname as 'Last Name', pe.city, pe.state, pe.address, pe.zip, pe.phone, emp_e.hourly, emp_e.salary, emp_e.wage, emp_e.years_employed as 'Years Employed', inst.classes,CONCAT(pm.fname, ' ', pm.lname) as 'Manager Name' FROM person pe, person pm, employee emp_e, employee emp_m, instructor inst WHERE pe.personID=emp_e.personID AND pm.personID=emp_m.personID AND emp_e.employeeID=inst.employeeID AND emp_e.is_managed_by = emp_m.employeeID;";
            break;
        case 'dbadmin':
            query = "SELECT  pe.fname as 'First Name', pe.mname as 'Middle Name', pe.lname as 'Last Name', pe.city, pe.state, pe.address, pe.zip, pe.phone, emp_e.hourly, emp_e.salary, emp_e.wage, emp_e.years_employed as 'Years Employed', CONCAT(pm.fname, ' ', pm.lname) as 'Manager Name' FROM person pe, person pm, employee emp_e, employee emp_m, dbadmin db WHERE pe.personID=emp_e.personID AND pm.personID=emp_m.personID AND emp_e.employeeID=db.employeeID AND emp_e.is_managed_by = emp_m.employeeID;";
            break;
        case 'ski_patrol':
            query = "SELECT  pe.fname as 'First Name', pe.mname as 'Middle Name', pe.lname as 'Last Name', pe.city, pe.state, pe.address, pe.zip, pe.phone, emp_e.hourly, emp_e.salary, emp_e.wage, emp_e.years_employed as 'Years Employed', peak.name as 'Peak Stationed', CONCAT(pm.fname, ' ', pm.lname) as 'Manager Name' FROM person pe, person pm, employee emp_e, employee emp_m, ski_patrol sp, peak WHERE pe.personID=emp_e.personID AND pm.personID=emp_m.personID AND emp_e.employeeID=sp.employeeID AND emp_e.is_managed_by = emp_m.employeeID AND sp.peakID = peak.peakID;";
            break;
        case 'facilities':
            query = "SELECT  pe.fname as 'First Name', pe.mname as 'Middle Name', pe.lname as 'Last Name', pe.city, pe.state, pe.address, pe.zip, pe.phone, emp_e.hourly, emp_e.salary, emp_e.wage, emp_e.years_employed as 'Years Employed', fac.trained,CONCAT(pm.fname, ' ', pm.lname) as 'Manager Name' FROM person pe, person pm, employee emp_e, employee emp_m, facilities fac WHERE pe.personID=emp_e.personID AND pm.personID=emp_m.personID AND emp_e.employeeID=fac.employeeID AND emp_e.is_managed_by = emp_m.employeeID;";
            break;
        case 'credential_card':
            query = "SELECT ID_number,fname,lname,mname, photo FROM person INNER JOIN employee ON person.personID=employee.personID INNER JOIN credential_card ON credential_card.employeeID=employee.employeeID";
            break;
        case 'customer':
            query = "SELECT fname,lname,mname,city,state,address,zip,phone,classes, news_letter,vertical_feet_skied,lifts_ridden,days_at_resort FROM person INNER JOIN customer ON person.personID=customer.personID;";
            break;
        case 'credit_card_info':
            query = "SELECT fname, mname, lname, card_number, verified FROM person INNER JOIN customer ON person.personID=customer.personID INNER JOIN credit_card_info ON customer.customerID=credit_card_info.customerID;";
            break;
        case 'day_pass':
            query = "SELECT fname, mname, lname, the_date FROM person INNER JOIN customer ON person.personID=customer.personID INNER JOIN day_pass ON customer.customerID=day_pass.customerID;";
            break;
        case 'lift':
            query = "SELECT lift.name, lift.vertical_feet,lift.open_status, lift.peakid FROM lift INNER JOIN peak ON peak.peakID = lift.peakID;"
            break;
        case 'run':
            query = "SELECT run.name, run.length, run.snow_depth, run.open_status, run.difficulty, run.liftid FROM run INNER JOIN lift ON lift.liftID=run.liftID;"
            break;
        case 'terrain_park':
            query = "SELECT terrain_park.name, terrain_park.features, terrain_park.open_status, terrain_park.liftid FROM terrain_park INNER JOIN lift ON lift.liftID=terrain_park.liftID;"
            break;
        case 'terrain_park':
            query = "SELECT terrain_park.name, terrain_park.features, terrain_park.open_status, terrain_park.liftid FROM terrain_park INNER JOIN lift ON lift.liftID=terrain_park.liftID;"
            break;
        case 'mogul_track':
            query = "SELECT mogul_track.flags_placed, mogul_track.mogul_depth, mogul_track.liftid FROM mogul_track INNER JOIN lift ON lift.liftID = mogul_track.liftID;"
            break;
        default:
            query = false;
            break;
    }

    return query;
}

router.get('/customSQL', function (req, res, next) {
    var query = req.query.q;
    console.log(query);

    db_con.query(query, function (err, result, fields) {
        if (err) {
            res.json(err);
            return;
        } else {
            res.json(result);
            console.log(fields)
            console.log(result);
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
