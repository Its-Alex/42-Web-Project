-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 12, 2017 at 12:23 PM
-- Server version: 10.0.30-MariaDB-0+deb8u1
-- PHP Version: 7.0.18-1~dotdeb+8.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `camagru`
--
CREATE DATABASE IF NOT EXISTS `camagru` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `camagru`;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` varchar(36) NOT NULL,
  `post` varchar(32) NOT NULL,
  `author` varchar(32) NOT NULL,
  `content` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author` varchar(36) NOT NULL,
  `post` varchar(36) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` varchar(36) NOT NULL,
  `author` varchar(36) NOT NULL,
  `link` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(36) NOT NULL,
  `name` varchar(32) NOT NULL,
  `passwd` char(128) NOT NULL,
  `mail` varchar(32) NOT NULL,
  `role` enum('USER','ADMIN','MODERATOR') NOT NULL DEFAULT 'USER',
  `state` enum('NEED_VALID','FORGET_PASSWD','REGISTERED','DELETED') NOT NULL DEFAULT 'NEED_VALID',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `passwd`, `mail`, `role`, `state`, `date`) VALUES
('261a8005-2ed3-4e78-bd83-f6a2c618d17d', 'hakHSKqhs', '5003c775814ed78427aa4b675f5a7cdc192004114f77fd0006182382c6a7a4b1403edfa3e9a608ebe585e749cc6961d85c49bf77b9581a1c7a7ed20dac0e8100', 'jean@gmail.com', 'MODERATOR', 'REGISTERED', '2017-05-09 09:16:53'),
('2d7ec594-8b7d-4875-a9a9-2f6baf6fc665', 'Jean', '7fa348fead34af016a767d16c996b0d9288696e49e6bf1929d60d57900d3cbc7c6af747bded3f59cd9a979e46027c874cdc2af36a086eac0cff4eb21c8cf8a3f', 'toto@gmail.com', 'USER', 'REGISTERED', '2017-05-05 23:19:36'),
('3c4d2e49-d963-4512-a5d4-f69161b3b3d1', 'Alex', '303badfe5c103b8ea34894900878183f6eb593388f783f77ccb69624f9dcdb89cc4b6f2f2a1d1ca0d862e1b5cd92664ed9e80164b42dec8bb90fb2c6d501764b', 'marre.alex1@gmail.com', 'USER', 'REGISTERED', '2017-05-06 13:01:10'),
('b30cf420-de2b-45ed-85be-bf926c3a670a', 'Alex', 'efd7153c2ec344eb573fa36260f107e3f5d16f0c351d5d19dd5c9b9c94e5c03620c88d92c970d89c769f55ad51207e403895e199d92ef59a83ce580295ba59b0', 'xskyzie@gmail.com', 'ADMIN', 'REGISTERED', '2017-05-05 21:11:13'),
('f79177f6-c269-4a37-b7d6-07efaef84a1e', 'Alex', '5ed0a7d8a8603db5bc7aed15bbebeedfb67583bb6fb410249bea1a16635b55952a16b66c6926e523e337ef45ac0695bb8aadcb8a08e5bfca7213ee77b55aacea', 'toto1@gmail.com', 'USER', 'REGISTERED', '2017-05-07 21:36:57');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
