-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: crudmobile
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbcategorias`
--

DROP TABLE IF EXISTS `tbcategorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbcategorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigoCategoria` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbcategorias`
--

LOCK TABLES `tbcategorias` WRITE;
/*!40000 ALTER TABLE `tbcategorias` DISABLE KEYS */;
INSERT INTO `tbcategorias` VALUES (5,'2','Bebidas'),(6,'3','Pizza'),(8,'1','Alimentos'),(9,'67','Doces');
/*!40000 ALTER TABLE `tbcategorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbprodutos`
--

DROP TABLE IF EXISTS `tbprodutos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbprodutos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigoProduto` varchar(200) NOT NULL,
  `descricaoProduto` varchar(255) NOT NULL,
  `precoProduto` double NOT NULL,
  `categoria` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigoProduto_UNIQUE` (`codigoProduto`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbprodutos`
--

LOCK TABLES `tbprodutos` WRITE;
/*!40000 ALTER TABLE `tbprodutos` DISABLE KEYS */;
INSERT INTO `tbprodutos` VALUES (31,'5yy','4yt',65.85,'Pizza'),(32,'Tft','Gju',586.65,'Alimentos'),(33,'Tu','Ei',55.55,'Bebidas');
/*!40000 ALTER TABLE `tbprodutos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbusuarios`
--

DROP TABLE IF EXISTS `tbusuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbusuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `nome` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbusuarios`
--

LOCK TABLES `tbusuarios` WRITE;
/*!40000 ALTER TABLE `tbusuarios` DISABLE KEYS */;
INSERT INTO `tbusuarios` VALUES (1,'admin','admin','administrador'),(2,'T','T','Tiago'),(3,'T','T','Tiago');
/*!40000 ALTER TABLE `tbusuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbvendas`
--

DROP TABLE IF EXISTS `tbvendas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbvendas` (
  `codigoVenda` int NOT NULL AUTO_INCREMENT,
  `dataVenda` datetime DEFAULT NULL,
  PRIMARY KEY (`codigoVenda`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbvendas`
--

LOCK TABLES `tbvendas` WRITE;
/*!40000 ALTER TABLE `tbvendas` DISABLE KEYS */;
INSERT INTO `tbvendas` VALUES (2,'2023-10-29 21:37:14'),(3,'2023-10-29 21:39:12'),(4,'2023-10-29 21:41:41'),(5,'2023-10-29 21:44:04'),(6,'2023-10-29 21:48:52'),(7,'2023-10-29 21:49:13'),(8,'2023-10-29 21:50:35'),(9,'2023-10-29 21:50:54'),(10,'2023-10-29 21:53:17'),(11,'2023-10-29 21:53:52'),(12,'2023-10-29 21:58:36'),(13,'2023-10-29 21:58:59'),(14,'2023-10-29 21:59:22');
/*!40000 ALTER TABLE `tbvendas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbvendasprodutos`
--

DROP TABLE IF EXISTS `tbvendasprodutos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbvendasprodutos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigoVenda` int DEFAULT NULL,
  `codigoProduto` varchar(255) DEFAULT NULL,
  `quantidade` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `codigoVenda` (`codigoVenda`),
  KEY `codigoProduto` (`codigoProduto`),
  CONSTRAINT `tbvendasprodutos_ibfk_1` FOREIGN KEY (`codigoVenda`) REFERENCES `tbvendas` (`codigoVenda`),
  CONSTRAINT `tbvendasprodutos_ibfk_2` FOREIGN KEY (`codigoProduto`) REFERENCES `tbprodutos` (`codigoProduto`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbvendasprodutos`
--

LOCK TABLES `tbvendasprodutos` WRITE;
/*!40000 ALTER TABLE `tbvendasprodutos` DISABLE KEYS */;
INSERT INTO `tbvendasprodutos` VALUES (1,NULL,NULL,NULL),(2,NULL,NULL,NULL),(3,12,'5yy',1),(4,13,'5yy',2),(5,13,'Tft',1),(6,14,'5yy',5),(7,14,'Tft',5);
/*!40000 ALTER TABLE `tbvendasprodutos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-30 14:21:20
