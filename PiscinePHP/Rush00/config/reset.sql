-- phpMyAdmin SQL Dump
-- version 4.6.0
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 09, 2017 at 03:15 PM
-- Server version: 5.7.11
-- PHP Version: 7.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rush00`
--
CREATE DATABASE IF NOT EXISTS `rush00` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `rush00`;

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `img` varchar(4096) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `description` varchar(512) NOT NULL,
  `categorie` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `name`, `img`, `price`, `description`, `categorie`) VALUES
(1, 'Jambon', 'https://www.concept-epices.fr/I-Grande-2124-jambon-blanc-artisanal.net.jpg', 2, 'Le jambon c\'est bon !', '4');
INSERT INTO `articles` (`id`, `name`, `img`, `price`, `description`, `categorie`) VALUES
(2, 'Cookies (x9)', 'https://mesdemarches.fontenay-sous-bois.fr/media/uploads/2015/09/30/illustration_cookies.jpg', 1, 'Utile pour le dev web', '4');
INSERT INTO `articles` (`id`, `name`, `img`, `price`, `description`, `categorie`) VALUES
(3, 'Ipod', 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQYrG_CVymOOWl3vQg_9J3ImHb3iSxdpjDxVsg3hRE5D1GnNi97', 2147483646, 'C\'est inutile et cher, mais tout le monde en veut', '02');
INSERT INTO `articles` (`id`, `name`, `img`, `price`, `description`, `categorie`) VALUES
(4, 'Camping car', 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRFlBZqXqMU5stk0rVDRmFDslwWtWfpEXzhZP0ZLyWTvfjrM_kX', 2, 'Petit camping car en bois, pas pique des hannetons', '13');
INSERT INTO `articles` (`id`, `name`, `img`, `price`, `description`, `categorie`) VALUES
(5, 'Enceinte portable', 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSGtz41eqyC5LEk-JQ-Q9JbkQmbBt6Cwu1gizL9yY2cHSxnDB2Nbw', 66, 'Bon son mais pas tres pratique..', '0');
INSERT INTO `articles` (`id`, `name`, `img`, `price`, `description`, `categorie`) VALUES
(6, 'Petite voiture', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRifOgrQGCUXWn0swYeRRIBxp3GuLgq30kePkOZIk7RrRL6Yhl1HQ', 3, 'Jouet pour enfant', '2');
INSERT INTO `articles` (`id`, `name`, `img`, `price`, `description`, `categorie`) VALUES
(7, 'Statue de la liberte', 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTyzYv3iRL_9UyIY6DVMaR4ZFNL1Gfm8miPEvLVAmYa1h7Sq_Ym', 20, 'Aux us, c\'est cool, mais chez toi c\'est mieux !', '3');
INSERT INTO `articles` (`id`, `name`, `img`, `price`, `description`, `categorie`) VALUES
(8, 'Pampata', 'https://avatars1.githubusercontent.com/u/6391363?v=3&s=460', 10, 'Pampata tout neuf, dans son emballage d\'origine. Livre avec un zaz.', '24');
INSERT INTO `articles` (`id`, `name`, `img`, `price`, `description`, `categorie`) VALUES
(9, 'Lune', 'http://www.magicobus.fr/sciences/images/lune.gif', 99, 'Lune, version officielle. Sympa pour les soirees romantiques.', '03');
INSERT INTO `articles` (`id`, `name`, `img`, `price`, `description`, `categorie`) VALUES
(10, 'Poudre blanche', 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR6O6ufZKySKks62xlxKLeTPw7zuIHRTU3fnpvKP6JaHWWKtwwB', 70, 'DECONSEILLE AUX ENFANTS /!\\', '35');
INSERT INTO `articles` (`id`, `name`, `img`, `price`, `description`, `categorie`) VALUES
(11, 'Enfant', 'https://ligue-enseignement.be/assets/emotions-enfant-730x353.jpg', 690, 'Jeune enfant, parfait pour le travail a la chaine.', '02');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `name` varchar(32) NOT NULL,
  `passwd` char(128) NOT NULL,
  `mail` varchar(32) NOT NULL,
  `role` enum('USER','MODERATOR','ADMIN') NOT NULL DEFAULT 'USER',
  `cart` varchar(4096) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `passwd`, `mail`, `role`, `cart`, `date`) VALUES
('08a92dcb-a6ba-4a76-9344-72e092b6c138', 'Alex', '6db27af2a0c2580c3c29446f9b5f728814c6558e8b63aaf2b2b90fb8a11e74c11e22450201f3c4359eb13e38b507b717aa3477faae62eabbcd3ba31ffa55dc00', 'alex@gmail.com', 'ADMIN', NULL, '2017-04-09 11:18:54');
INSERT INTO `users` (`id`, `name`, `passwd`, `mail`, `role`, `cart`, `date`) VALUES
('f55f9377-4542-4ad9-b262-fd366aedae00', 'Alex', 'dd62e20fc37f32dc360c183bd9ad8a732fdd13fec9b045a0b018ad266afc71f2f58fe2a3bf168b374589fafb671b09beb206f416254267c2ba006352fa0b85ab', 'malexand@student.42.fr', 'ADMIN', NULL, '2017-04-08 11:45:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
