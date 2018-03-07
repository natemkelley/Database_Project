DROP DATABASE IF EXISTS it350;

CREATE DATABASE IF NOT EXISTS it350;
USE it350;

CREATE TABLE person(
    personID int NOT NULL AUTO_INCREMENT,
    fName VARCHAR(255),
    lName VARCHAR(255),
    mName VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(50),
    address VARCHAR(100),
    zip VARCHAR(10),
    phone VARCHAR(50),
    PRIMARY KEY (personID)
);

INSERT INTO person (fName,lName,mName,city,state,address,zip,phone)
VALUES ( 'Nate', 'Kelley', 'Michael', 'Provo', 'UT', '312 N 500 E', '84095', '385-321-9273');
INSERT INTO person (fName,lName,mName,city,state,address,zip,phone)
VALUES ( 'Kate', 'Nelley', 'J', 'Provo', 'CA', '312 N 500 E', '8888', '999-321-9273');
INSERT INTO person (fName,lName,mName,city,state,address,zip,phone)
VALUES ( 'Jack', 'Nelley', 'J', 'SoJO', 'CA', '555 N 500 E', '7777', '111-321-9273');
INSERT INTO person (fName,lName,mName,city,state,address,zip,phone)
VALUES ( 'Joe', 'Punchclock', '', 'Coolsville', 'CO', '444 N 500 E', '22222', '111-321-3321');


CREATE TABLE employee(
    employeeID int NOT NULL AUTO_INCREMENT,
    wage VARCHAR(255),
    years_employed INT(100),
    salary INT(1),
    hourly INT(1),
    is_managed_by INT,
    personID INT,
    PRIMARY KEY (employeeID),
    FOREIGN KEY(personID) REFERENCES person(personID)
);

INSERT INTO employee (wage,years_employed,salary,hourly, is_managed_by, personID)
VALUES ( 30000, 2, 0, 1, 1, 1);
INSERT INTO employee (wage,years_employed,salary,hourly, is_managed_by, personID)
VALUES ( 80000, 5, 1, 0, 2, 1);
INSERT INTO employee (wage,years_employed,salary,hourly, is_managed_by, personID)
VALUES ( 180000, 15, 1, 0, 3, 1);

CREATE TABLE dbadmin(
    employeeID INT,
    FOREIGN KEY(employeeID) REFERENCES employee(employeeID)
);

INSERT INTO dbadmin ()
VALUES (2);

CREATE TABLE instructor(
    classes VARCHAR(255),
    employeeID INT,
    FOREIGN KEY(employeeID) REFERENCES employee(employeeID)
);

INSERT INTO instructor
VALUES ("Moguls, Getting Big Air, Ski Zumba",1);
INSERT INTO instructor
VALUES ("Getting Big Air, Ski Zumba",2);

CREATE TABLE peak(
    peakID  int NOT NULL AUTO_INCREMENT,
    elevation INT,
    name VARCHAR(255),
    PRIMARY KEY (peakID)
);

INSERT INTO peak (elevation, name)
VALUES (4000,"Mt Krumpet");
INSERT INTO peak (elevation, name)
VALUES (8100,"Mt Doom");

CREATE TABLE ski_patrol(
    toboggan_trained INT(1),
    avalanche_trained INT(1),
    employeeID INT,
    peakID INT,
    FOREIGN KEY(employeeID) REFERENCES employee(employeeID),
    FOREIGN KEY(peakID) REFERENCES peak(peakID)
);


INSERT INTO ski_patrol (toboggan_trained,avalanche_trained, employeeID,peakID )
VALUES (1, 1, 2, 1);

CREATE TABLE facilities(
    trained INT(1),
    employeeID INT,
    FOREIGN KEY(employeeID) REFERENCES employee(employeeID)
);

INSERT INTO facilities (trained,employeeID )
VALUES (1, 1);

CREATE TABLE credential_card(
    ID_Number int NOT NULL AUTO_INCREMENT,
    photo VARCHAR(255),
    employeeID INT,
    PRIMARY KEY (ID_Number),
    FOREIGN KEY(employeeID) REFERENCES employee(employeeID)
);

INSERT INTO credential_card (photo, employeeID)
VALUES ('https://media3.giphy.com/media/M7gtacN7aPNsc/giphy.gif', 2);
INSERT INTO credential_card (photo, employeeID)
VALUES ('https://78.media.tumblr.com/7a42319b9ccee50e88fef11209661431/tumblr_p1fvy0JbwP1wzvt9qo1_500.gif', 1);

CREATE TABLE customer(
    customerID int NOT NULL AUTO_INCREMENT,
    classes VARCHAR(255),
    news_letter VARCHAR(255),
    vertical_feet_skied INT,
    lifts_ridden INT,
    days_at_resort INT,
    personID INT,
    PRIMARY KEY (customerID),
    FOREIGN KEY(personID) REFERENCES person(personID)
);

INSERT INTO customer (classes, news_letter,vertical_feet_skied,lifts_ridden,days_at_resort,personID)
VALUES ("Advanced Skiing", 1, 45000,34,6,4);


CREATE TABLE credit_card_info(
    card_number varchar(255),
    verified INT(1),
    customerID INT,
    FOREIGN KEY(customerID) REFERENCES customer(customerID)
);

INSERT INTO credit_card_info (card_number, verified, customerID)
VALUES ('42424242424242', 0,1);

CREATE TABLE day_pass(
    pass_ID int NOT NULL AUTO_INCREMENT,
    the_date VARCHAR(255),
    customerID INT,
    PRIMARY KEY (pass_ID),
    FOREIGN KEY(customerID) REFERENCES customer(customerID)
);

INSERT INTO day_pass (the_date, customerID)
VALUES ('Thurs March 12, 2018', 1);

CREATE TABLE lift(
    liftID  int NOT NULL AUTO_INCREMENT,
    open_status INT(1),
    name VARCHAR(255),
    vertical_feet INT,
    peakID INT,
    PRIMARY KEY (liftID),
    FOREIGN KEY(peakID) REFERENCES peak(peakID)
);

INSERT INTO lift (open_status, name,vertical_feet,peakID)
VALUES (0, 'Payday',4000,2);
INSERT INTO lift (open_status, name,vertical_feet,peakID)
VALUES (1, 'Old Faithful',4400,1);
INSERT INTO lift (open_status, name,vertical_feet,peakID)
VALUES (0, 'Dionysus',4400,2);

CREATE TABLE run(
    open_status INT(1),
    name VARCHAR(255),
    length INT,
    snow_depth INT,
    difficulty VARCHAR(255),
    liftID INT,
    FOREIGN KEY(liftID) REFERENCES lift(liftID)
);

CREATE TABLE terrain_park(
    name varchar(255),
    features VARCHAR(40000),
    open_status INT(1),
    liftID INT,
    FOREIGN KEY(liftID) REFERENCES lift(liftID)
);

CREATE TABLE mogul_track(
    flags_placed INT(1),
    mogul_depth INT(50),
    liftID INT,
    FOREIGN KEY(liftID) REFERENCES lift(liftID)
);

#employee
SELECT fname,lname,mname,city,state,address,zip,phone, hourly, salary,wage,years_employed,is_managed_by
FROM person
INNER JOIN employee ON person.personID=employee.personID;

#instructor
SELECT fname,lname,mname,city,state,address,zip,phone, hourly, salary,wage,years_employed,is_managed_by, classes
FROM person
INNER JOIN employee ON person.personID=employee.personID
INNER JOIN instructor ON instructor.employeeID=employee.employeeID;

#ski_patrol updated in actual
SELECT fname,lname,mname,city,state,address,zip,phone,hourly, salary,wage,years_employed,is_managed_by, peakID
FROM person
INNER JOIN employee ON person.personID=employee.personID
INNER JOIN ski_patrol ON ski_patrol.employeeID=employee.employeeID;

#facilities
SELECT fname,lname,mname,city,state,address,zip,phone,hourly, salary,wage,years_employed,is_managed_by, trained
FROM person
INNER JOIN employee ON person.personID=employee.personID
INNER JOIN facilities ON facilities.employeeID=employee.employeeID;

#credential_card
SELECT ID_number, fname,lname,mname, photo
FROM person
INNER JOIN employee ON person.personID=employee.personID
INNER JOIN credential_card ON credential_card.employeeID=employee.employeeID;

#customr
SELECT fname,lname,mname,city,state,address,zip,phone,classes, news_letter,vertical_feet_skied,lifts_ridden,days_at_resort
FROM person
INNER JOIN customer ON person.personID=customer.personID;

#credit_card_info
SELECT fname, mname, lname, card_number, verified
FROM person
INNER JOIN customer ON person.personID=customer.personID
INNER JOIN credit_card_info ON customer.customerID=credit_card_info.customerID;

#day pass
SELECT fname, mname, lname, the_date
FROM person
INNER JOIN customer ON person.personID=customer.personID
INNER JOIN day_pass ON customer.customerID=day_pass.customerID;

#lift
SELECT lift.name, lift.vertical_feet,lift.open_status, peakid
FROM lift
INNER JOIN peak 
ON peak.peakID=lift.peakID;