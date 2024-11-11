-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: products
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `productquantity`
--

DROP TABLE IF EXISTS `productquantity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productquantity` (
  `id` int NOT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productquantity`
--

LOCK TABLES `productquantity` WRITE;
/*!40000 ALTER TABLE `productquantity` DISABLE KEYS */;
INSERT INTO `productquantity` VALUES (0,10),(1,10),(2,10),(3,10),(4,10),(5,10),(6,10),(7,10),(8,10),(9,10),(10,10),(11,10),(12,10),(13,10),(14,10),(15,10),(16,10),(17,10),(18,10),(19,10),(20,10),(21,10),(22,10),(23,10);
/*!40000 ALTER TABLE `productquantity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `priceCents` int NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Kingdom Hearts 3',7000,'kingdom-hearts-3.jpeg'),(3,'God of War: Ragnarok',7000,'god-of-war-ragnarok.jpg'),(4,'The Sims 3',1500,'the-sims-3.jpg'),(5,'God of War',3000,'god-of-war.jpg'),(6,'Super Mario World',10000,'super-mario-world.png'),(7,'Zelda: Breath Of the Wild',5000,'switch-zelda-breath-of-the-wild.png'),(8,'Grand Theft Auto: 5',4000,'gta-v.png'),(9,'Grand Theft Auto: 4',2000,'gta-iv.jpg'),(10,'Need For Speed: Most Wanted',2000,'need-for-speed-mw.jpg'),(11,'The Witcher 3',2000,'witcher-3.png'),(13,'Assassin\'s Creed: Unity',1500,'assassin\'s-creed-unity.jpeg'),(14,'Assassin\'s Creed: Black Flag',1000,'assassin\'s-creed-bf.png'),(15,'Dark Souls',3000,'dark-souls.jpg'),(16,'Dark Souls 2',4000,'dark-souls-2.jpg'),(17,'Bloodborne',4000,'bloodborne.jpg'),(18,'Elden Ring',7000,'elden-ring.jpg'),(19,'Fallout 4',3500,'fallout-4.jpg'),(20,'Fallout 3',500,'fallout-3.jpg'),(21,'The Elder Scrolls: Skyrim',1500,'skyrim.png'),(22,'The Elder Scrolls: Morrowind',1500,'morrowind.png');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-11  1:58:53
