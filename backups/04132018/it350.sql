-- MySQL dump 10.13  Distrib 5.7.21, for Linux (x86_64)
--
-- Host: localhost    Database: it350
-- ------------------------------------------------------
-- Server version	5.7.21-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `credential_card`
--

DROP TABLE IF EXISTS `credential_card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `credential_card` (
  `ID_Number` int(11) NOT NULL AUTO_INCREMENT,
  `photo` varchar(255) DEFAULT NULL,
  `employeeID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_Number`),
  KEY `employeeID` (`employeeID`),
  CONSTRAINT `credential_card_ibfk_1` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`employeeID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credential_card`
--

LOCK TABLES `credential_card` WRITE;
/*!40000 ALTER TABLE `credential_card` DISABLE KEYS */;
INSERT INTO `credential_card` VALUES (1,'https://media3.giphy.com/media/M7gtacN7aPNsc/giphy.gif',2),(2,'https://78.media.tumblr.com/7a42319b9ccee50e88fef11209661431/tumblr_p1fvy0JbwP1wzvt9qo1_500.gif',1);
/*!40000 ALTER TABLE `credential_card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credit_card_info`
--

DROP TABLE IF EXISTS `credit_card_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `credit_card_info` (
  `card_number` varchar(255) DEFAULT NULL,
  `verified` int(1) DEFAULT NULL,
  `customerID` int(11) DEFAULT NULL,
  KEY `customerID` (`customerID`),
  CONSTRAINT `credit_card_info_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `customer` (`customerID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credit_card_info`
--

LOCK TABLES `credit_card_info` WRITE;
/*!40000 ALTER TABLE `credit_card_info` DISABLE KEYS */;
INSERT INTO `credit_card_info` VALUES ('42424242424242',0,1);
/*!40000 ALTER TABLE `credit_card_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `customerID` int(11) NOT NULL AUTO_INCREMENT,
  `classes` varchar(255) DEFAULT NULL,
  `news_letter` varchar(255) DEFAULT NULL,
  `vertical_feet_skied` int(11) DEFAULT NULL,
  `lifts_ridden` int(11) DEFAULT NULL,
  `days_at_resort` int(11) DEFAULT NULL,
  `personID` int(11) DEFAULT NULL,
  PRIMARY KEY (`customerID`),
  KEY `personID` (`personID`),
  CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`personID`) REFERENCES `person` (`personID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Advanced Skiing','1',45000,34,6,4);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `day_pass`
--

DROP TABLE IF EXISTS `day_pass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `day_pass` (
  `pass_ID` int(11) NOT NULL AUTO_INCREMENT,
  `the_date` varchar(255) DEFAULT NULL,
  `customerID` int(11) DEFAULT NULL,
  PRIMARY KEY (`pass_ID`),
  KEY `customerID` (`customerID`),
  CONSTRAINT `day_pass_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `customer` (`customerID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `day_pass`
--

LOCK TABLES `day_pass` WRITE;
/*!40000 ALTER TABLE `day_pass` DISABLE KEYS */;
INSERT INTO `day_pass` VALUES (1,'March 1',1);
/*!40000 ALTER TABLE `day_pass` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER daypassTotal BEFORE INSERT ON day_pass FOR EACH ROW SET @sum = @sum + 150 */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `dbadmin`
--

DROP TABLE IF EXISTS `dbadmin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dbadmin` (
  `employeeID` int(11) DEFAULT NULL,
  KEY `employeeID` (`employeeID`),
  CONSTRAINT `dbadmin_ibfk_1` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`employeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dbadmin`
--

LOCK TABLES `dbadmin` WRITE;
/*!40000 ALTER TABLE `dbadmin` DISABLE KEYS */;
INSERT INTO `dbadmin` VALUES (3);
/*!40000 ALTER TABLE `dbadmin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee` (
  `employeeID` int(11) NOT NULL AUTO_INCREMENT,
  `wage` varchar(255) DEFAULT NULL,
  `years_employed` int(100) DEFAULT NULL,
  `salary` int(1) DEFAULT NULL,
  `hourly` int(1) DEFAULT NULL,
  `is_managed_by` int(11) DEFAULT NULL,
  `personID` int(11) DEFAULT NULL,
  PRIMARY KEY (`employeeID`),
  KEY `personID` (`personID`),
  KEY `is_managed_by` (`is_managed_by`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`personID`) REFERENCES `person` (`personID`),
  CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`is_managed_by`) REFERENCES `employee` (`employeeID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'30000',2,0,1,2,1),(2,'80000',5,1,0,1,2),(3,'180000',15,1,0,1,3),(4,'30000',2,0,1,NULL,5);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facilities`
--

DROP TABLE IF EXISTS `facilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `facilities` (
  `trained` int(1) DEFAULT NULL,
  `employeeID` int(11) DEFAULT NULL,
  KEY `employeeID` (`employeeID`),
  CONSTRAINT `facilities_ibfk_1` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`employeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facilities`
--

LOCK TABLES `facilities` WRITE;
/*!40000 ALTER TABLE `facilities` DISABLE KEYS */;
INSERT INTO `facilities` VALUES (1,1);
/*!40000 ALTER TABLE `facilities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instructor`
--

DROP TABLE IF EXISTS `instructor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `instructor` (
  `classes` varchar(255) DEFAULT NULL,
  `employeeID` int(11) DEFAULT NULL,
  KEY `employeeID` (`employeeID`),
  CONSTRAINT `instructor_ibfk_1` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`employeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructor`
--

LOCK TABLES `instructor` WRITE;
/*!40000 ALTER TABLE `instructor` DISABLE KEYS */;
INSERT INTO `instructor` VALUES ('Moguls, Getting Big Air, Ski Zumba',1),('Getting Big Air, Ski Zumba',2);
/*!40000 ALTER TABLE `instructor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lift`
--

DROP TABLE IF EXISTS `lift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lift` (
  `liftID` int(11) NOT NULL AUTO_INCREMENT,
  `open_status` int(1) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `vertical_feet` int(11) DEFAULT NULL,
  `peakID` int(11) DEFAULT NULL,
  PRIMARY KEY (`liftID`),
  KEY `peakID` (`peakID`),
  CONSTRAINT `lift_ibfk_1` FOREIGN KEY (`peakID`) REFERENCES `peak` (`peakID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lift`
--

LOCK TABLES `lift` WRITE;
/*!40000 ALTER TABLE `lift` DISABLE KEYS */;
INSERT INTO `lift` VALUES (1,0,'Payday',4000,2),(2,1,'Old Faithful',4400,1),(3,0,'Dionysus',4400,2);
/*!40000 ALTER TABLE `lift` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mogul_track`
--

DROP TABLE IF EXISTS `mogul_track`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mogul_track` (
  `name` varchar(255) DEFAULT NULL,
  `flags_placed` int(1) DEFAULT NULL,
  `mogul_depth` int(50) DEFAULT NULL,
  `liftID` int(11) DEFAULT NULL,
  KEY `liftID` (`liftID`),
  CONSTRAINT `mogul_track_ibfk_1` FOREIGN KEY (`liftID`) REFERENCES `lift` (`liftID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mogul_track`
--

LOCK TABLES `mogul_track` WRITE;
/*!40000 ALTER TABLE `mogul_track` DISABLE KEYS */;
INSERT INTO `mogul_track` VALUES ('Big ONE',1,3,1);
/*!40000 ALTER TABLE `mogul_track` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `peak`
--

DROP TABLE IF EXISTS `peak`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `peak` (
  `peakID` int(11) NOT NULL AUTO_INCREMENT,
  `elevation` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`peakID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `peak`
--

LOCK TABLES `peak` WRITE;
/*!40000 ALTER TABLE `peak` DISABLE KEYS */;
INSERT INTO `peak` VALUES (1,4000,'Mt Krumpet'),(2,8100,'Mt Doom');
/*!40000 ALTER TABLE `peak` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `person` (
  `personID` int(11) NOT NULL AUTO_INCREMENT,
  `fName` varchar(255) DEFAULT NULL,
  `lName` varchar(255) DEFAULT NULL,
  `mName` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`personID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES (1,'Nate','Kelley','Michael','Provo','UT','312 N 500 E','84095','385-321-9273'),(2,'Kate','Nelley','J','Provo','CA','312 N 500 E','8888','999-321-9273'),(3,'Jack','Nelley','J','SoJO','CA','555 N 500 E','7777','111-321-9273'),(4,'Joe','Punchclock','','Coolsville','CO','444 N 500 E','22222','111-321-3321'),(5,'Joe','x','Crabs','Mapleton','UT','567 N 500 E','84606','385-321-9273');
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `quickPass`
--

DROP TABLE IF EXISTS `quickPass`;
/*!50001 DROP VIEW IF EXISTS `quickPass`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `quickPass` AS SELECT 
 1 AS `First Name`,
 1 AS `Middle Name`,
 1 AS `Last Name`,
 1 AS `The Date`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `run`
--

DROP TABLE IF EXISTS `run`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `run` (
  `open_status` int(1) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `length` int(11) DEFAULT NULL,
  `snow_depth` int(11) DEFAULT NULL,
  `difficulty` varchar(255) DEFAULT NULL,
  `liftID` int(11) DEFAULT NULL,
  KEY `liftID` (`liftID`),
  CONSTRAINT `run_ibfk_1` FOREIGN KEY (`liftID`) REFERENCES `lift` (`liftID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `run`
--

LOCK TABLES `run` WRITE;
/*!40000 ALTER TABLE `run` DISABLE KEYS */;
INSERT INTO `run` VALUES (1,'Homerun',2400,14,'Black Diamond',1),(1,'Rerun',1400,24,'Green Circle',2);
/*!40000 ALTER TABLE `run` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ski_patrol`
--

DROP TABLE IF EXISTS `ski_patrol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ski_patrol` (
  `toboggan_trained` int(1) DEFAULT NULL,
  `avalanche_trained` int(1) DEFAULT NULL,
  `employeeID` int(11) DEFAULT NULL,
  `peakID` int(11) DEFAULT NULL,
  KEY `employeeID` (`employeeID`),
  KEY `peakID` (`peakID`),
  CONSTRAINT `ski_patrol_ibfk_1` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`employeeID`),
  CONSTRAINT `ski_patrol_ibfk_2` FOREIGN KEY (`peakID`) REFERENCES `peak` (`peakID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ski_patrol`
--

LOCK TABLES `ski_patrol` WRITE;
/*!40000 ALTER TABLE `ski_patrol` DISABLE KEYS */;
INSERT INTO `ski_patrol` VALUES (1,1,2,1);
/*!40000 ALTER TABLE `ski_patrol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `terrain_park`
--

DROP TABLE IF EXISTS `terrain_park`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `terrain_park` (
  `name` varchar(255) DEFAULT NULL,
  `features` varchar(40000) DEFAULT NULL,
  `open_status` int(1) DEFAULT NULL,
  `liftID` int(11) DEFAULT NULL,
  KEY `liftID` (`liftID`),
  CONSTRAINT `terrain_park_ibfk_1` FOREIGN KEY (`liftID`) REFERENCES `lift` (`liftID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `terrain_park`
--

LOCK TABLES `terrain_park` WRITE;
/*!40000 ALTER TABLE `terrain_park` DISABLE KEYS */;
INSERT INTO `terrain_park` VALUES ('Rerun','1 Big Jump, 3 small kickers, 2 box rails',1,2);
/*!40000 ALTER TABLE `terrain_park` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `quickPass`
--

/*!50001 DROP VIEW IF EXISTS `quickPass`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `quickPass` AS select `person`.`fName` AS `First Name`,`person`.`mName` AS `Middle Name`,`person`.`lName` AS `Last Name`,`day_pass`.`the_date` AS `The Date` from ((`person` join `customer` on((`person`.`personID` = `customer`.`personID`))) join `day_pass` on((`customer`.`customerID` = `day_pass`.`customerID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-13 13:26:34
