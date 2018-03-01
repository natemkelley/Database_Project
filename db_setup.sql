CREATE TABLE person(
    personID Integer PRIMARY KEY AUTOINCREMENT,
    fName VARCHAR(255),
    lName VARCHAR(255),
    mName VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(50),
    address VARCHAR(100),
    zip VARCHAR(10),
    phone VARCHAR(50)
);

INSERT INTO person (fName,lName,mName,city,state,address,zip,phone)
VALUES ( 'Nate', 'Kelley', 'Michael', 'Provo', 'UT', '312 N 500 E', '84095', '385-321-9273');

CREATE TABLE employee(
    employeeID Integer PRIMARY KEY AUTOINCREMENT,
    wage VARCHAR(255),
    years_employed INT(100),
    salary INT(1),
    hourly INT(1),
    personID VARCHAR(255),
    FOREIGN KEY(personID) REFERENCES person(personID)
);

INSERT INTO employee (wage,years_employed,salary,hourly, personID)
VALUES ( '30,000', '2', '0', '1', 1);

CREATE TABLE dbadmin(
    adminID Integer PRIMARY KEY AUTOINCREMENT,
    personID VARCHAR(255),
    FOREIGN KEY(personID) REFERENCES person(personID)
);

CREATE TABLE manager(
    managerID Integer PRIMARY KEY AUTOINCREMENT,
    employeeID VARCHAR(255),
    FOREIGN KEY(employeeID) REFERENCES employee(employeeID)
);

CREATE TABLE instructor(
    employeeID VARCHAR(255),
    managerID VARCHAR(255),
    FOREIGN KEY(managerID) REFERENCES manager(managerID),
    FOREIGN KEY(employeeID) REFERENCES employee(employeeID)
);

INSERT INTO instructor
VALUES ( 1, 2);

