var express = require('express');
var router = express.Router();
var request = require('request')
var fs = require('fs');
const https = require('https');

//IT350 Specific
var mysql = require('mysql');
var PythonShell = require('python-shell');
var db_con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Chegagg1o",
    database: "it350"
});
db_con.connect();

/* GET home page. */
router.get('/admin', function (req, res, next) {
    console.log(req.query.user);

    if (req.query.user != "authenticated") {
        res.sendFile('index2.html', {
            root: 'public'
        });
    } else {
        res.sendFile('admin.html', {
            root: 'public'
        });
    }
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
        }
    });
});
router.get('/getEmployees', function (req, res, next) {
    var query = "SELECT employee.employeeID, CONCAT(person.fName,' ',person.lName) as empName FROM employee, person WHERE person.personID = employee.personID;";

    db_con.query(query, function (err, result, fields) {
        if (err) {
            response.status(400).send('Error in database operation' + query);
            //throw err;
        } else {
            res.json(result);
        }
    });
});
router.get('/getManagers', function (req, res, next) {
    var query = "SELECT DISTINCT E1.personID, CONCAT(person.fName,' ',person.lName) AS 'mname', E1.employeeID FROM employee E1, employee E2, person WHERE E1.employeeID = E2.is_managed_by AND E1.personID = person.personID;";

    db_con.query(query, function (err, result, fields) {
        if (err) {
            response.status(400).send('Error in database operation' + query);
            //throw err;
        } else {
            res.json(result);
        }
    });
});
router.get('/getCustomers', function (req, res, next) {
    var query = "SELECT customer.customerID, person.personID, CONCAT(person.fName,' ',person.lName) AS custName FROM customer,person WHERE customer.personID = person.personID;";

    db_con.query(query, function (err, result, fields) {
        if (err) {
            response.status(400).send('Error in database operation' + query);
            //throw err;
        } else {
            res.json(result);
        }
    });
});
router.post('/submitItem', function (req, res, next) {
    var receivedJSON = req.body.Sending;

    switch (receivedJSON.whattoadd) {
        case "personSelect":
            addPerson(receivedJSON);
            res.json({
                success: 200
            });
            break;
        case "-":
            res.error('did not work son.');
            break;
        default:
            addDefault(receivedJSON);
            res.json(receivedJSON);
            break;
    }
});
router.post('/updateManager', function (req, res, next) {
    var receivedJSON = req.body.Sending;
    var mantoemp = receivedJSON.mantoemp || 1;
    var emptoman = receivedJSON.emptoman || 1;


    var dbquery = "UPDATE employee SET is_managed_by = " + mantoemp + " WHERE employeeID = " + emptoman + ";";

    db_con.query(dbquery, function (err, result, fields) {
        if (err) {
            res.error(err);
        } else {
            res.send({
                success: "IT WORKED!"
            });
        }
    });
});

router.get('/mysqlStatus', function (req, res, next) {
    console.log('mysqlStatus');
    if (fs.existsSync('./routes/python/mysqlStatus.py')) {
        PythonShell.run('./routes/python/mysqlStatus.py', function (err, results) {
            var sendback = JSON.parse(results)
            res.status(sendback.status).send(sendback.error);
        });
    }
})


function addDefault(receivedJSON) {
    switch (receivedJSON.whattoadd) {
        case "peakSelect":
            var peakName = receivedJSON.peakName || "-";
            var elevation = receivedJSON.elevation || 0;
            var elevationINT = parseInt(elevation);
            var dbinsert = "INSERT INTO peak (elevation, name) VALUES (" + elevationINT + ",'" + peakName + "');"
            break;
        case "liftSelect":
            var liftName = receivedJSON.liftName || "-";
            var verticalFeet = receivedJSON.verticalFeet || 0;

            var dbinsert = "INSERT INTO lift (open_status, name,vertical_feet,peakID) VALUES (" + 0 + ",'" + liftName + "'," + verticalFeet + "," + 1 + ");"

            break;
        case "creditcardSelect":
            var ccnumber = receivedJSON.ccnumber || 42424242424242;
            var customerID = receivedJSON.customerlist || 1;
            var dbinsert = "INSERT INTO credit_card_info (card_number, verified, customerID) VALUES ('" + ccnumber + "'," + 0 + "," + customerID + ");"

            break;
        case "daypassSelect":
            the_date = receivedJSON.date || "-";
            var customerID = receivedJSON.thecustomers || 1;

            var dbinsert = "INSERT INTO day_pass (the_date, customerID) VALUES ('" + the_date + "'," + customerID + ");";

            break;
        case "runSelect":
            var runName = receivedJSON.runName || "-";
            var length = receivedJSON.runLength || 0;
            var snowDepth = receivedJSON.snowDepth || 0;
            var difficulty = receivedJSON.difficulty || "-";

            var dbinsert = "INSERT INTO run (open_status, name,length, snow_depth, difficulty, liftID) VALUES (" + 0 + ", '" + runName + "'," + length + "," + snowDepth + ",'" + difficulty + "'," + 1 + ");";

            break;
        case "terrainparkSelect":
            var name = receivedJSON.terrainparkName || "-";
            var features = receivedJSON.features || "-";
            var dbinsert = "INSERT INTO terrain_park  (name,features,open_status,liftID) VALUES ('" + name + "'," + features + "," + 0 + "," + 1 + ");";
            break;
        case "mogulrunSelect":
            var flagsplaced = receivedJSON.flagsplaced || 0;
            var name = receivedJSON.mogulName || "-";
            var mogulDepth = receivedJSON.mogulDepth || 0;
            var dbinsert = "INSERT INTO mogul_track  (name, flags_placed,mogul_depth,liftID) VALUES ('" + name + "'," + flagsplaced + "," + mogulDepth + "," + 1 + ");";

            break;
        default:
            break;
    }

    db_con.query(dbinsert, function (err, result, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}

function addPerson(receivedJSON) {
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
            var personID = result.insertId;

            switch (receivedJSON.whatpersontoadd) {
                case "customerSelect":
                    addCustomer(receivedJSON, personID);
                    break;
                case "employeeSelect":
                    addEmployee(receivedJSON, personID);
                    break;
                default:
                    break;
            }
        }
    });

    return true;
}

function addCustomer(receivedJSON, personID) {
    var newsletter = receivedJSON.newsletter || "0";
    var classes = receivedJSON.classes || "-";

    var dbinsert = "INSERT INTO customer (classes, news_letter,vertical_feet_skied,lifts_ridden,days_at_resort,personID) VALUES('" + classes + "', " + newsletter + ", " + 0 + ", " + 0 + ", " + 0 + ", " + personID + ")";

    db_con.query(dbinsert, function (err, result, fields) {
        if (err) {
            console.log(err);
            return;
        } else {
            GOODTOGO = true;
            return;
        }
    });
}

function addEmployee(receivedJSON, personID) {
    var wage = receivedJSON.wage || 0;
    var years_employed = receivedJSON.yearsemployed || 0;
    var is_managed_by = receivedJSON.themanagers || 1;

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

}

function compilequery(query) {

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
            query = "SELECT * from quickPass;";
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
            query = "SELECT mogul_track.name,mogul_track.flags_placed, mogul_track.mogul_depth, lift.name as 'Lift Access' FROM mogul_track, lift where lift.liftid=mogul_track.liftid;"
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
        }
    });
});


module.exports = router;
