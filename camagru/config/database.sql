--
--  Database name : `camagru`
--

-- ------------------------------------------

--
-- Table comments
--

CREATE TABLE IF NOT EXISTS `comments` (
	`id` varchar(32) NOT NULL,
	`post` varchar(32) NOT NULL,
	`author` varchar(32) NOT NULL,
	`content` text NOT NULL,
	`date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table posts
--

CREATE TABLE IF NOT EXISTS `posts` (
	`id` varchar(32) NOT NULL,
	`author` varchar(32) NOT NULL,
	`link` text NOT NULL,
	`date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
--  Table users
--

CREATE TABLE IF NOT EXISTS `users` (
	`id` varchar(32) NOT NULL,
	`password` char(128) NOT NULL,
	`mail` varchar(32) NOT NULL,
	`role` enum('USER','ADMIN',"MODERATOR") NOT NULL DEFAULT 'USER',
	`state` enum('NEED_VALID','FORGET_PASSWD','REGISTERED','DELETED') NOT NULL DEFAULT 'NEED_VALID',
	`date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Define PRIMARY KEY for * table
--

ALTER TABLE `comments`
ADD PRIMARY KEY (`id`);

ALTER TABLE `posts`
ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
 ADD PRIMARY KEY (`id`);