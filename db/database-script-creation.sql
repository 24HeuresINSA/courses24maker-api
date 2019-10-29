-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: db_courses24maker_api
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.18.04.1

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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `category_id` varchar(128) NOT NULL,
  `category_label` varchar(45) NOT NULL,
  `category_description` varchar(512) NOT NULL,
  `category_nb_max` int(11) DEFAULT NULL,
  `category_full` int(4) DEFAULT '0',
  `category_type` varchar(15) DEFAULT NULL,
  `category_nb_total` int(11) DEFAULT NULL,
  `category_price_regular` float DEFAULT NULL,
  `category_price_student` float DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('207233ec-4460-46bc-8bd1-676d00f15244','Course à pied SOLO','Course à pied seul',1,0,'CAP',0,20,15,'2019-10-01 17:03:51',NULL),('3589e5b1-435f-494c-b7fd-1430333358ec','Course à vélo SOLO','Course à vélo seul',1,0,'VEL',0,20,15,'2019-10-01 17:03:57',NULL),('43aabaf0-2992-4363-b2fc-38abbbc6ca4f','Triathlon LOISIR','Triathlon à plusieurs (entre 4 et 12 personnes)',12,0,'TRI',0,15,10,'2019-10-09 10:15:04',NULL),('76894bf7-bde3-41ee-b9c2-1a6fbdc4b2b1','Triathlon EQUIPE','Triathlon à plusieurs (entre 2 et 4 personnes)',4,0,'VEL',0,20,15,'2019-10-03 07:51:15',NULL),('7a513cfc-17dd-466f-9184-64c9feb7baae','Triathlon SOLO','Triathlon seul',1,0,'VEL',0,20,15,'2019-10-01 17:04:07',NULL),('834fb8da-2891-427f-81bd-dbe80eeb36bb','Course à vélo EQUIPE','Course à vélo à plusieurs (entre 2 et 4 personnes)',4,0,'VEL',0,15,10,'2019-10-01 16:34:55',NULL),('c062b153-a1b0-478c-ad75-d9b1629c76da','FOLKLO','Viens avec ton vélo folklo ! Le plus beau bolide sera récompensé',12,0,'FOL',0,0,0,'2019-10-21 15:50:41',NULL),('c11ffef4-89e8-4ea7-955f-594cb958233d','Course à vélo LOISIR','Course à vélo à plusieurs (entre 4 et 12 personnes)',12,0,'VEL',0,12,8,'2019-10-27 22:48:54',NULL),('f1a10289-1fba-40ef-a6e4-a061605174b7','Course à pied LOISIR','Course à pied à plusieurs (entre 4 et 12 personnes)',12,0,'CAP',0,12,8,'2019-10-01 17:03:33',NULL),('f64988f7-0132-43b6-92ad-27bd34b9da1b','Course à pied EQUIPE','Course à pied à plusieurs (entre 2 et 4 personnes)',4,0,'CAP',0,15,10,'2019-09-24 08:52:35',NULL);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participant`
--

DROP TABLE IF EXISTS `participant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `participant` (
  `participant_id` varchar(128) NOT NULL,
  `participant_name` varchar(45) NOT NULL,
  `participant_surname` varchar(45) NOT NULL,
  `participant_birthdate` date NOT NULL,
  `participant_student` int(4) DEFAULT '0',
  `participant_medical_certificate` mediumtext,
  `participant_medical_certificate_valid` int(4) DEFAULT '0',
  `participant_medical_certificate_file` varchar(128) DEFAULT NULL,
  `participant_student_certificate` mediumtext,
  `participant_student_certificate_valid` int(4) DEFAULT '0',
  `participant_student_certificate_file` varchar(128) DEFAULT NULL,
  `participant_payment` int(4) DEFAULT '0',
  `participant_tee_shirt_size` varchar(2) DEFAULT NULL,
  `participant_comment` varchar(512) DEFAULT NULL,
  `participant_message` varchar(512) DEFAULT NULL,
  `participant_telephone` varchar(15) DEFAULT NULL,
  `participant_email` varchar(128) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `participant_team_id` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`participant_id`),
  KEY `participant_participant_team_id_foreign_idx` (`participant_team_id`),
  CONSTRAINT `participant_participant_team_id_foreign_idx` FOREIGN KEY (`participant_team_id`) REFERENCES `team` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('1-database_20190708.js'),('2-database_20190708_fk.js'),('3-database_20190709.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team` (
  `team_id` varchar(128) NOT NULL,
  `team_name` varchar(45) DEFAULT NULL,
  `team_password` varchar(512) DEFAULT NULL,
  `team_valid` int(4) DEFAULT '0',
  `team_salt` varchar(512) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `team_manager_id` varchar(128) DEFAULT NULL,
  `team_category_id` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`team_id`),
  KEY `team_team_category_id_foreign_idx` (`team_category_id`),
  KEY `team_team_manager_id_foreign_idx` (`team_manager_id`),
  CONSTRAINT `team_team_category_id_foreign_idx` FOREIGN KEY (`team_category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `team_team_manager_id_foreign_idx` FOREIGN KEY (`team_manager_id`) REFERENCES `participant` (`participant_id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-28 19:34:17
