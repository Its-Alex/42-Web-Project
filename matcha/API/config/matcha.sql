-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Host: 163.172.166.42
-- Generation Time: Sep 20, 2017 at 05:15 PM
-- Server version: 10.0.30-MariaDB-0+deb8u2
-- PHP Version: 7.0.20-1~dotdeb+8.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `matcha`
--
CREATE DATABASE IF NOT EXISTS `matcha` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `matcha`;

-- --------------------------------------------------------

--
-- Table structure for table `blocks`
--

DROP TABLE IF EXISTS `blocks`;
CREATE TABLE IF NOT EXISTS `blocks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `performUser` char(36) NOT NULL,
  `concernUser` char(36) NOT NULL,
  `date` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `blocks`
--

INSERT INTO `blocks` (`id`, `performUser`, `concernUser`, `date`) VALUES
(1, '06b6888e-a710-43ce-8fcb-a8be577d469a', '7fc440e0-a3a5-48b7-a60a-7423026c130c', 1505925522533);

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

DROP TABLE IF EXISTS `chats`;
CREATE TABLE IF NOT EXISTS `chats` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `sender` char(36) NOT NULL,
  `receiver` char(36) NOT NULL,
  `text` longtext NOT NULL,
  `date` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`id`, `sender`, `receiver`, `text`, `date`) VALUES
(1, 'a0fe8694-0498-4079-991a-04e8f78f0c54', '7fc440e0-a3a5-48b7-a60a-7423026c130c', 'Salut !', 1505925222610),
(2, 'a0fe8694-0498-4079-991a-04e8f78f0c54', '7fc440e0-a3a5-48b7-a60a-7423026c130c', 'Ca va ?', 1505925226119);

-- --------------------------------------------------------

--
-- Table structure for table `fakes`
--

DROP TABLE IF EXISTS `fakes`;
CREATE TABLE IF NOT EXISTS `fakes` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `performUser` char(36) NOT NULL,
  `concernUser` char(36) NOT NULL,
  `date` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fakes`
--

INSERT INTO `fakes` (`id`, `performUser`, `concernUser`, `date`) VALUES
(1, '06b6888e-a710-43ce-8fcb-a8be577d469a', '7fc440e0-a3a5-48b7-a60a-7423026c130c', 1505925520679);

-- --------------------------------------------------------

--
-- Table structure for table `forgetPwds`
--

DROP TABLE IF EXISTS `forgetPwds`;
CREATE TABLE IF NOT EXISTS `forgetPwds` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` char(36) NOT NULL,
  `hash` char(128) NOT NULL,
  `date` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `performUser` char(36) NOT NULL,
  `concernUser` char(36) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `performUser`, `concernUser`) VALUES
(1, '7fc440e0-a3a5-48b7-a60a-7423026c130c', 'a0fe8694-0498-4079-991a-04e8f78f0c54'),
(2, 'a0fe8694-0498-4079-991a-04e8f78f0c54', '7fc440e0-a3a5-48b7-a60a-7423026c130c'),
(3, '06b6888e-a710-43ce-8fcb-a8be577d469a', 'a0fe8694-0498-4079-991a-04e8f78f0c54');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `performUser` char(36) NOT NULL,
  `concernUser` char(36) NOT NULL,
  `notification` varchar(300) NOT NULL,
  `seen` tinyint(1) NOT NULL DEFAULT '0',
  `date` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `performUser`, `concernUser`, `notification`, `seen`, `date`) VALUES
(1, '7fc440e0-a3a5-48b7-a60a-7423026c130c', 'a0fe8694-0498-4079-991a-04e8f78f0c54', 'view', 1, 1505925195481),
(2, '7fc440e0-a3a5-48b7-a60a-7423026c130c', 'a0fe8694-0498-4079-991a-04e8f78f0c54', 'like', 1, 1505925196545),
(3, 'a0fe8694-0498-4079-991a-04e8f78f0c54', '7fc440e0-a3a5-48b7-a60a-7423026c130c', 'view', 0, 1505925215115),
(4, 'a0fe8694-0498-4079-991a-04e8f78f0c54', '7fc440e0-a3a5-48b7-a60a-7423026c130c', 'likeback', 0, 1505925216152),
(5, '06b6888e-a710-43ce-8fcb-a8be577d469a', '7fc440e0-a3a5-48b7-a60a-7423026c130c', 'view', 0, 1505925516509),
(6, '06b6888e-a710-43ce-8fcb-a8be577d469a', 'a0fe8694-0498-4079-991a-04e8f78f0c54', 'view', 0, 1505925528289),
(7, '06b6888e-a710-43ce-8fcb-a8be577d469a', 'a0fe8694-0498-4079-991a-04e8f78f0c54', 'like', 0, 1505925529717),
(8, 'aed2853b-00e7-4ac3-be94-6e1ae9658a66', '4fe6e610-c755-4afc-acdb-f5e2807a280a', 'view', 0, 1505927543142);

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
CREATE TABLE IF NOT EXISTS `profiles` (
  `userId` char(36) NOT NULL,
  `firstName` varchar(36) NOT NULL,
  `lastName` varchar(36) NOT NULL,
  `birthday` char(10) NOT NULL,
  `bio` text NOT NULL,
  `genre` char(1) NOT NULL,
  `type` char(1) NOT NULL,
  `popularity` int(11) NOT NULL,
  `tags` text NOT NULL,
  `location` text,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `lastConnect` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `profiles`
--

INSERT INTO `profiles` (`userId`, `firstName`, `lastName`, `birthday`, `bio`, `genre`, `type`, `popularity`, `tags`, `location`, `lat`, `lng`, `lastConnect`) VALUES
('06b6888e-a710-43ce-8fcb-a8be577d469a', 'Paul', 'Marchand', '1950-03-08', 'Hey', 'M', 'B', 50, '#foot #sport', '17e Arrondissement, 75017 Paris, France', 48.891985999999996, 2.319287, 1505926557353),
('4fe6e610-c755-4afc-acdb-f5e2807a280a', 'Eren', 'Ozdek', '1993-12-09', 'I\'m gay', 'M', 'M', 50, '#gay #joie', 'Alsace, France', 48.3181795, 7.441624099999999, 1505927424872),
('7fc440e0-a3a5-48b7-a60a-7423026c130c', 'Alexandre', 'MARRE', '1997-03-08', 'Salut ! :)', 'M', 'B', 46, '#series ## #code', '17e Arrondissement, 75017 Paris, France', 48.891985999999996, 2.319287, 1505927679658),
('a0fe8694-0498-4079-991a-04e8f78f0c54', 'Pauline', 'Tada', '1965-12-02', 'Saaaaalut !', 'F', 'M', 52, '#meet', '17e Arrondissement, 75017 Paris, France', 48.891985999999996, 2.319287, 1505925243440),
('aed2853b-00e7-4ac3-be94-6e1ae9658a66', 'Adrien', 'Guémy', '1979-08-15', '100% macho', 'M', 'M', 50, '#biere #camionneur', '17e Arrondissement, 75017 Paris, France', 48.891985999999996, 2.319287, 1505927661265);

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
CREATE TABLE IF NOT EXISTS `tokens` (
  `user` char(36) NOT NULL,
  `token` char(128) NOT NULL,
  `date` bigint(20) NOT NULL,
  PRIMARY KEY (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`user`, `token`, `date`) VALUES
('4fe6e610-c755-4afc-acdb-f5e2807a280a', '2f2ZkGICLG1rrkE3YZufdA594xUbinwce8MrTUpd3qY6f4bY6kNupoHLqNAlULqfyhjXTgPyYryVUfZ0QgF5OBtzIG8mbsSTIRbSsC4o2MUqtQG2gwyN6Mk1YBo1nEPt', 1505927329695),
('4fe6e610-c755-4afc-acdb-f5e2807a280a', '4gwX504diSNmJKT3eZfyWgh1vYpcKOz9hXc9qMtJXtTIH3mpGqQTpWqd7OcMdyF6YBfy4ohjhzsox2tab1wXusL8YUKGfZkpDVH2lir89nTIHQTIOo3U2Fqn3aeyfXfK', 1505927266906),
('06b6888e-a710-43ce-8fcb-a8be577d469a', '4yCtpr0KmJK9XmkieoYN4JHOzVOcM7Sd8Y6ZQoq28zXYmIPzrUZgrJx5Rzp5OTYELdPtU5aQIQvHww182njEauANcUWpe7ivSpAMRz9lVsENPWhQTKhZxHkuTMmJc5Po', 1505925267490),
('7fc440e0-a3a5-48b7-a60a-7423026c130c', 'EFlQu5XdqrvOy2Ebopnj3z3cnZjyJLxOe0h9WYuVImScaMKTNiflkJSSOjiZfUlbvpBWd7mMWBi0E9G3TPKhXsKC8zhu3aUyWY163Ivtqtr9NP4klLVgXMxPFdyEeQmv', 1505925172378),
('7fc440e0-a3a5-48b7-a60a-7423026c130c', 'fnG7j8pKAgMDzc0jlyIPm3safHnUigNLURhxl47lGGuIcv7IoNMuPBwKuNjQiXoHAn9MLqAT4HCG6UzqiHYM1cWEcUctaIj3XjpkZ44NKxyKyMBSpjGLzIUyic1kFCtg', 1505924876694),
('a0fe8694-0498-4079-991a-04e8f78f0c54', 'QlSoVHexW5c184irpKwh9n5xxRL7zlkpqIv3eU6Nebr8BIfAwkNISuXEsrlcQFijD1SCzKuu7QanxAFKcZyRDuatPlNdzRyLaDNL37iyu4Ub7Vp7ngLwU66I2lqEP7SR', 1505925018172),
('06b6888e-a710-43ce-8fcb-a8be577d469a', 'qnPyfzadHNTOwdP7BK5v50eqtjzzugHyB7ick2UrOSSDHstYk5x1fwhU15bU5638ETqTQMwZyRZX5jFeQN2IAPCSF0r09eTLxkCip3mZjbnqLFwgpMcZQGWnjDv6D45U', 1505925304504),
('aed2853b-00e7-4ac3-be94-6e1ae9658a66', 'sOsHR8ESQTwnMA4du9gjbEScUQNRPVW3PhQMtfpter9QCHlzPDM8dv018a8WHGNWdDfpXHkveLDL38v9w0Z7dHptlp3kpULcerA10s4MsPicY0d1auf3AycE52exEJ4B', 1505927061121),
('a0fe8694-0498-4079-991a-04e8f78f0c54', 'Tkvy7b7Ws0ccXhEBFKsNK9uBmRACD48oeOUX1rzfntBEJiFGWBAbIPNSqFy7cXeqC8hB83d87S5lWu9cygvty9KJvGnpTnO2AdaYOf206FGCwssrrwbUalpk8nNEXuYP', 1505925077163),
('7fc440e0-a3a5-48b7-a60a-7423026c130c', 'v9e9RVJRGoCzkFw8Qz3nekIWRFJ55Z4CW6dVQUo5hi1oNV1VaO7UGfUX9RrKcFIBVb5vvk0CSPfDwqYnT6ejuQiSACNuNczpmUJzJo8fljRiCZVWZ3C5OBIvPneDS7x1', 1505926047612),
('a0fe8694-0498-4079-991a-04e8f78f0c54', 'VEvNEtwrDiDOiXU15nWlEk69xYSolXc2y7xkxOcycBtDkCDY7e3AdpD8HnsjFs1caNPH8EKsW2vu5IWY9HjKCfhaG2EvAqTOcyGJZKc1OKLYiYoKqVslbDRftJbUxdPH', 1505925211619),
('aed2853b-00e7-4ac3-be94-6e1ae9658a66', 'WYAPx89p135K48JUvU9TBfNlGA7zG6G8V6BXaQgtoxfvh5uJrsG51Ah5J6iWMQEWTxW0AixwNpoF7cwrXe4FPoH3J3vFL2K6fxDgkZ1J49ZzwR6v7vq4TRMf3H4QBhOM', 1505927465686);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` char(36) NOT NULL,
  `name` char(36) NOT NULL,
  `mail` varchar(254) NOT NULL,
  `password` char(60) NOT NULL,
  `role` enum('USER','ADMIN') NOT NULL DEFAULT 'USER',
  `date` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mail` (`mail`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `mail`, `password`, `role`, `date`) VALUES
('06b6888e-a710-43ce-8fcb-a8be577d469a', 'Pauldu06', 'paul06@gmail.com', '$2a$10$aQN5mvev6bJXDobNftniUevUFQMONz7RdbzSiKEIraJA7BXpP25Zm', 'USER', 1505925267479),
('4fe6e610-c755-4afc-acdb-f5e2807a280a', 'ezodek', 'eozdek@student.42.fr', '$2a$10$CDKIDLc8pLFc8y5ND8wDyeM23UgYRpx4C6/IZfRIDDKqXn76.8Rz.', 'USER', 1505927266896),
('7fc440e0-a3a5-48b7-a60a-7423026c130c', 'Foo', 'foo@test.com', '$2a$10$kPzJIt62BN/M8857zACkf.LPC1FEpqQnn2gxYniwBhzUV7FqzrC.S', 'USER', 1505924876679),
('a0fe8694-0498-4079-991a-04e8f78f0c54', 'Pauline06', 'pauline@test.fr', '$2a$10$kt6TEqo8UwQCDNwbKS3V6eMeX9F4uT0AuKrN517T0ZXqyFvPwCgA.', 'USER', 1505925018154),
('aed2853b-00e7-4ac3-be94-6e1ae9658a66', 'aguemydu69', 'aguemy@gmail.com', '$2a$10$J4Nbg4erIdduL66ADAc4we7noK9jL6CWNlDgJG19XfBEfq7XSEUte', 'USER', 1505927061103);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
