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

router.post('/submitItem', function (req, res, next) {
    var receivedJSON = req.body.Sending;
    console.log(receivedJSON);

    switch (receivedJSON.whattoadd) {
        case "personSelect":
            console.log('person...');
            GOODTOGO = false;
            addPerson(receivedJSON);
            res.json(receivedJSON);

            break;
        case "-":
            console.log('- this is not good');
            res.error('did not work son.');
            break;
        default:
            console.log('default');
            res.json(receivedJSON);
            break;
    }
});

function addPerson(receivedJSON) {
    console.log('addperon')
    var fName = receivedJSON.fname || "-";
    var lName = receivedJSON.lname || "-";
    var mName = receivedJSON.mname || "-";
    var city = receivedJSON.city || "-";
    var state = receivedJSON.state || "-";
    var phone = receivedJSON.phone || "-";
    var address = receivedJSON.address || "-";
    var zip = receivedJSON.zip || "-";

    var dbinsert = "INSERT INTO person (fName,lName,mName,city,state,address,zip,phone) VALUES ( '" + fName + "', '" + lName + "', '" + mName + "', '" + city + "', '" + state + "', '" + address + "', '" + zip + "', '" + phone + "'); ";

    db_con.query(dbinsert, function (err, result, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            var personID = result.insertId;
            console.log(personID);

            switch (receivedJSON.whatpersontoadd) {
                case "customerSelect":
                    addCustomer(receivedJSON, personID);
                    break;
                case "employeeSelect":
                    addEmployee(receivedJSON, personID);
                    break;
                default:
                    console.log('default');
                    break;
            }
        }
    });

    return true;
}

function addCustomer(receivedJSON, personID) {
    var newsletter = receivedJSON.newsletter || "0";
    var classes = receivedJSON.classes || "-";
    console.log(classes);

    var dbinsert = "INSERT INTO customer (classes, news_letter,vertical_feet_skied,lifts_ridden,days_at_resort,personID) VALUES('" + classes + "', " + newsletter + ", " + 0 + ", " + 0 + ", " + 0 + ", " + personID + ")";
    console.log(dbinsert);

    db_con.query(dbinsert, function (err, result, fields) {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log(result);
            GOODTOGO = true;
            return;
        }
    });
}

function addEmployee(receivedJSON, personID) {
    var wage = receivedJSON.wage || 0;
    var years_employed = receivedJSON.yearsemployed || 0;
    var is_managed_by = 1 || 0;

    if (receivedJSON.paymentType == "Hourly") {
        hourly = 1;
        salary = 0;
    } else {
        hourly = 0;
        salary = 1;
    }

    var dbinsert = "INSERT INTO employee (wage,years_employed,salary,hourly, is_managed_by, personID) VALUES('" + wage + "', " + years_employed + ", " + salary + ", " + hourly + ", '" + is_managed_by + "'," + personID + ")";


    db_con.query(dbinsert, function (err, result, fields) {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log(result);
            var empID = result.insertId;

            switch (receivedJSON.typeofemp) {
                case "dbadminSelect":
                    var dbinsert = "INSERT INTO dbadmin VALUES (" + empID + ")";
                    break;
                case "skipatrolSelect":
                    var dbinsert = "INSERT INTO ski_patrol(toboggan_trained,avalanche_trained, employeeID,peakID) VALUES (" + receivedJSON.togogganTrained + "," + receivedJSON.avalancheTrained + "," + empID + "," + 1 + ")";
                    break;
                case "instructorSelect":
                    var classes = receivedJSON.instructorclasses || "-";
                    console.log(classes)

                    var dbinsert = "INSERT INTO instructor(classes,employeeID) VALUES ('" + classes + "'," + empID + ")";
                    break;
                case "facilitiesSelect":
                    var dbinsert = "INSERT INTO facilities(trained,employeeID) VALUES (" + receivedJSON.facilitiesTrained + "," + empID + ")";
                    break;
                default:
                    console.log('default');
                    break;
            }

            db_con.query(dbinsert, function (err, result, fields) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result)
                }
            });


            return;
        }
    });



    /* var dbinsert = "INSERT INTO customer (classes, news_letter,vertical_feet_skied,lifts_ridden,days_at_resort,personID) VALUES('" + classes + "', " + newsletter + ", " + 0 + ", " + 0 + ", " + 0 + ", " + personID + ")";

     db_con.query(dbinsert, function (err, result, fields) {
         if (err) {
             console.log(err);
             return;
         } else {
             console.log(result);
             return;
         }
     });*/
}


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
            query = "SELECT ID_number as 'ID Number', fname AS 'First Name',lname as 'Last Name',mname as 'Middle Name', photo FROM person INNER JOIN employee ON person.personID=employee.personID INNER JOIN credential_card ON credential_card.employeeID=employee.employeeID;";
            break;
        case 'customer':
            query = "SELECT fname as 'First Name',lname as 'Last Name',mname as 'Middle Name',city,state,address,zip,phone,classes, news_letter as 'News Letter',vertical_feet_skied as 'Vertical Feet Skied',lifts_ridden 'Lifts Ridden',days_at_resort as 'Days at Resort' FROM person INNER JOIN customer ON person.personID=customer.personID;";
            break;
        case 'credit_card_info':
            query = "SELECT fname as 'First Name', mname as'Middle Name', lname as'Last Name', card_number as'Card Number', verified FROM person INNER JOIN customer ON person.personID=customer.personID INNER JOIN credit_card_info ON customer.customerID=credit_card_info.customerID;";
            break;
        case 'day_pass':
            query = "SELECT fname as 'First Name', mname as 'Middle Name', lname as 'Last Name', the_date as 'The Date' FROM person INNER JOIN customer ON person.personID=customer.personID INNER JOIN day_pass ON customer.customerID=day_pass.customerID;";
            break;
        case 'lift':
            query = "SELECT lift.name, lift.vertical_feet,lift.open_status, peak.name as 'Peak' FROM lift, peak WHERE lift.peakid=peak.peakid;"
            break;
        case 'run':
            query = "SELECT run.name, run.length, run.snow_depth, run.open_status, run.difficulty, lift.name as 'Lift Access' FROM run, lift WHERE run.liftid = lift.liftid;"
            break;
        case 'terrain_park':
            query = "SELECT terrain_park.name, terrain_park.features, terrain_park.open_status, terrain_park.liftid FROM terrain_park INNER JOIN lift ON lift.liftID=terrain_park.liftID;"
            break;
        case 'terrain_park':
            query = "SELECT terrain_park.name, terrain_park.features, terrain_park.open_status, lift.name as 'Lift Access' FROM terrain_park, lift WHERE lift.liftid=terrain_park.liftid;"
            break;
        case 'mogul_track':
            query = "SELECT mogul_track.flags_placed, mogul_track.mogul_depth, lift.name as 'Lift Access' FROM mogul_track, lift where lift.liftid=mogul_track.liftid;"
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
