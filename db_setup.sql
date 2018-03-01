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

CREATE TABLE employee(
    employeeID int NOT NULL AUTO_INCREMENT,
    wage VARCHAR(255),
    years_employed INT(100),
    salary INT(1),
    hourly INT(1),
    personID INT,
    PRIMARY KEY (employeeID),
    FOREIGN KEY(personID) REFERENCES person(personID)
);

INSERT INTO employee (wage,years_employed,salary,hourly, personID)
VALUES ( '30,000', '2', '0', '1', 1);

CREATE TABLE dbadmin(
    adminID int NOT NULL AUTO_INCREMENT,
    personID INT,
    PRIMARY KEY (adminID),
    FOREIGN KEY(personID) REFERENCES person(personID)
);

CREATE TABLE manager(
    managerID int NOT NULL AUTO_INCREMENT,
    employeeID INT,
    PRIMARY KEY (managerID),
    FOREIGN KEY(employeeID) REFERENCES employee(employeeID)
);

CREATE TABLE instructor(
    employeeID INT,
    managerID INT,
    FOREIGN KEY(managerID) REFERENCES manager(managerID),
    FOREIGN KEY(employeeID) REFERENCES employee(employeeID)
);

INSERT INTO instructor
VALUES ( 1, 2);

CREATE TABLE ski_patrol(
    toboggan_trained INT(1),
    avalanche_trained INT(1),
    employeeID INT,
    managerID INT,
    peakID INT,
    FOREIGN KEY(managerID) REFERENCES manager(managerID),
    FOREIGN KEY(employeeID) REFERENCES employee(employeeID),
    FOREIGN KEY(peakID) REFERENCES peak(peakID)
);

CREATE TABLE facilities(
    trained INT(1),
    employeeID INT,
    managerID INT,
    FOREIGN KEY(managerID) REFERENCES manager(managerID),
    FOREIGN KEY(employeeID) REFERENCES employee(employeeID)
);

CREATE TABLE credential_card(
    ID_Number int NOT NULL AUTO_INCREMENT,
    photo VARCHAR(255),
    employeeID INT,
    PRIMARY KEY (ID_Number)
    FOREIGN KEY(employeeID) REFERENCES employee(employeeID)
);

CREATE TABLE customer(
    customer_ID int NOT NULL AUTO_INCREMENT,
    classes VARCHAR(255),
    news_letter VARCHAR(255),
    vertical_feet_skied INT(800000),
    lifts_ridden INT(20000),
    days_at_resort INT (365),
    personID INT,
    PRIMARY KEY (customer_ID)
    FOREIGN KEY(personID) REFERENCES person(personID)
);

CREATE TABLE credit_cart_info(
    card_number INT(800000),
    verified INT(1),
    customer_ID INT,
    FOREIGN KEY(customer_ID) REFERENCES customer(customer_ID)
);

CREATE TABLE day_pass(
    pass_ID int NOT NULL AUTO_INCREMENT,
    the_date VARCHAR(255),
    customer_ID INT,
    PRIMARY KEY (pass_ID)
    FOREIGN KEY(customer_ID) REFERENCES customer(customer_ID)
);

CREATE TABLE peak(
    peakID  int NOT NULL AUTO_INCREMENT,
    elevation INT(30000),
    name VARCHAR(255),
    PRIMARY KEY (peakID)
);

CREATE TABLE lift(
    liftID  int NOT NULL AUTO_INCREMENT,
    open_status INT(1),
    name VARCHAR(255),
    vertical_feet INT(10000),
    peakID INT,
    PRIMARY KEY (liftID)
    FOREIGN KEY(peakID) REFERENCES peak(peakID)
);

CREATE TABLE run(
    open_status INT(1),
    name VARCHAR(255),
    length INT(20000),
    snow_depth INT(20000),
    difficulty VARCHAR(255),
    liftID INT,
    FOREIGN KEY(liftID) REFERENCES lift(liftID)
);

CREATE TABLE terrain_park(
    features VARCHAR(40000),
    name varchar(255),
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