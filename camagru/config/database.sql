-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 31, 2017 at 11:51 AM
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post` varchar(36) NOT NULL,
  `author` varchar(36) NOT NULL,
  `content` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `post`, `author`, `content`, `date`) VALUES
(15, 'cc68bf49-3e07-4be8-b45f-d34731955010', '74463654-1ffe-47de-93ba-77b5c5ce5fef', 'Hummm! :)', '2017-05-31 11:30:36');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(36) NOT NULL,
  `username` varchar(32) NOT NULL,
  `post` varchar(36) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `user`, `username`, `post`) VALUES
(13, '4f9d111a-3f4f-482f-8bfd-da8f917cdbd1', 'Jimi', 'cc68bf49-3e07-4be8-b45f-d34731955010'),
(14, '4f9d111a-3f4f-482f-8bfd-da8f917cdbd1', 'Jimi', 'a909313b-64c4-4329-ad5f-4e0608a0745f'),
(15, '4f9d111a-3f4f-482f-8bfd-da8f917cdbd1', 'Jimi', 'c5742bbb-3f1f-452b-bf03-2ab141ab2dbe'),
(16, '74463654-1ffe-47de-93ba-77b5c5ce5fef', 'Valentin', 'cc68bf49-3e07-4be8-b45f-d34731955010'),
(17, '74463654-1ffe-47de-93ba-77b5c5ce5fef', 'Valentin', 'af4c6f0a-8ff3-48d3-a02b-22b5a1ea068a'),
(18, '74463654-1ffe-47de-93ba-77b5c5ce5fef', 'Valentin', 'b5b13d86-084a-4676-a4d3-a01781199ae7');

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

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `author`, `link`, `date`) VALUES
('2aca7f34-9ce0-47d2-b0b4-bd486c35260e', '74463654-1ffe-47de-93ba-77b5c5ce5fef', './public/assets/pictures/a80f7087-8674-4f7f-8363-fdf3c3092ef6.png', '2017-05-31 11:23:27'),
('8664ed26-c23d-4369-99d4-75e5e0ed439e', '4f9d111a-3f4f-482f-8bfd-da8f917cdbd1', './public/assets/pictures/38b2b341-7e29-40a6-92ea-d3a08ac39329.png', '2017-05-31 11:28:46'),
('a909313b-64c4-4329-ad5f-4e0608a0745f', 'd3d3c5b2-1a11-4ef5-8129-5a164517ca80', './public/assets/pictures/5d4582d4-df24-42ac-9c16-fdfcf68962eb.png', '2017-05-31 11:13:08'),
('af4c6f0a-8ff3-48d3-a02b-22b5a1ea068a', '4f9d111a-3f4f-482f-8bfd-da8f917cdbd1', './public/assets/pictures/f021add6-f948-49d0-96a4-2f6a27cb643a.png', '2017-05-31 11:28:50'),
('b5b13d86-084a-4676-a4d3-a01781199ae7', 'd3d3c5b2-1a11-4ef5-8129-5a164517ca80', './public/assets/pictures/5d76c791-c9f1-4cb5-b24e-19cea0ca4351.png', '2017-05-31 11:18:11'),
('c5742bbb-3f1f-452b-bf03-2ab141ab2dbe', 'd3d3c5b2-1a11-4ef5-8129-5a164517ca80', './public/assets/pictures/780339d9-1279-453c-a6a6-676a95c2df33.png', '2017-05-31 11:18:19'),
('cc68bf49-3e07-4be8-b45f-d34731955010', '74463654-1ffe-47de-93ba-77b5c5ce5fef', './public/assets/pictures/e4e89d6b-d0cd-440e-b1d0-d469e47f7ed1.png', '2017-05-31 11:23:22');

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
('4f9d111a-3f4f-482f-8bfd-da8f917cdbd1', 'Jimi', '6e2f7b95bc9b8a27cbbd44ac3f0ee925c20f87b2e41fdd7bec58356450fac7e9baaa99685eadee85c4a1fca759035cfd4197509f5374acceb14dffac5ca0b5b8', 'fake2@fake.com', 'USER', 'REGISTERED', '2017-05-31 11:24:59'),
('74463654-1ffe-47de-93ba-77b5c5ce5fef', 'Valentin', '343f90c85d700bedd44041c844e418cc37c1597ed12f208e916af82c727dce8fc9e9c8784ee3cce69bdc94e9d4d3fe47243fd000c345a542d4bd35a1f3f4fc97', 'fake1@fake.com', 'USER', 'REGISTERED', '2017-05-31 11:20:07'),
('b1610b90-690d-4288-961f-2263101f5835', 'Admin', '6ffe683f16617fc3dfb4739422287184e90ee7716fb81f1c67ff35c2d52826ab7fb38895d3d0c43a922aafdb741b234f369fdae3d49c1b18fb124904ed454ba4', 'admin@admin.com', 'ADMIN', 'REGISTERED', '2017-05-30 12:49:19'),
('d3d3c5b2-1a11-4ef5-8129-5a164517ca80', 'Alex', 'ab0b3436acc894141bafd287d5e8218df9aa1ae08e70478508821fece696edd583c8ba9b61475bd2c13aac385a91f1b0a6c8ea46bd106248de36e5a76e5980ec', 'fake@fake.com', 'USER', 'REGISTERED', '2017-05-30 16:26:51');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
