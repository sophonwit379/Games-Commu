-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 19, 2023 at 05:36 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `game_commu`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `cid` int(10) NOT NULL,
  `uid` int(10) NOT NULL,
  `pid` int(10) DEFAULT NULL,
  `rid` int(10) DEFAULT NULL,
  `detail` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `gid` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `year` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`gid`, `name`, `year`) VALUES
(1, 'League of Legends', '2009'),
(2, 'Arknights (Global)', '2020'),
(4, 'Cyberpunk 2077', '2020'),
(5, 'Grand Theft Auto V', '2015'),
(6, 'Monster Hunter: World', '2018'),
(7, 'Spotted wood sandpiper', '2010'),
(8, 'Jaguar', '1964'),
(9, 'Crab, sally lightfoot', '2005'),
(10, 'Red-legged pademelon', '1991'),
(11, 'Harbor seal', '1986'),
(12, 'Black-throated butcher bird', '2005'),
(13, 'Waterbuck, defassa', '1998'),
(14, 'Shrew, mandras tree', '2007'),
(15, 'Gonolek, burchell\'s', '1992'),
(16, 'Hartebeest, red', '2009'),
(17, 'Suricate', '1984'),
(18, 'North American river otter', '1997'),
(19, 'Red-knobbed coot', '2004'),
(20, 'African red-eyed bulbul', '2009'),
(21, 'Malleefowl', '1997'),
(22, 'Armadillo, nine-banded', '1987'),
(34, 'game', '2014'),
(35, 'test1', '2023'),
(36, 'test1', '1111');

-- --------------------------------------------------------

--
-- Table structure for table `games_of_users`
--

CREATE TABLE `games_of_users` (
  `guid` int(10) NOT NULL,
  `uid` int(10) NOT NULL,
  `gid` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `games_of_users`
--

INSERT INTO `games_of_users` (`guid`, `uid`, `gid`) VALUES
(1, 1, 2),
(5, 1, 1),
(6, 9, 5),
(7, 9, 4),
(8, 9, 6),
(10, 10, 5),
(33, 10, 1),
(35, 16, 5),
(36, 16, 4),
(37, 17, 4),
(38, 17, 6),
(55, 22, 10),
(56, 22, 11),
(65, 10, 4),
(67, 10, 2),
(69, 10, 6),
(70, 23, 1),
(71, 23, 2),
(72, 23, 4),
(73, 23, 5),
(74, 23, 6),
(76, 24, 2),
(77, 24, 4),
(78, 24, 5);

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `iid` int(10) NOT NULL,
  `path` varchar(255) NOT NULL,
  `uid` int(10) DEFAULT NULL,
  `gid` int(10) DEFAULT NULL,
  `pid` int(10) DEFAULT NULL,
  `cid` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`iid`, `path`, `uid`, `gid`, `pid`, `cid`) VALUES
(1, 'a3aa1b58-bd87-43f4-8c6b-fc1f1daa6ed6.jpg', NULL, NULL, 1, NULL),
(2, 'ef1b5bda-291f-4a9c-b431-c57dd7091163.jpg', NULL, NULL, 1, NULL),
(3, '3509ffc9-52b6-49b4-882b-c6325e77798f.png', NULL, NULL, 1, NULL),
(4, '7f5e157f-04c8-4449-8fe4-93dda8a5808b.png', NULL, NULL, 1, NULL),
(6, '8733e1c3-f985-43ed-b176-4aafe853ab12.jpg', NULL, NULL, 14, NULL),
(15, '25cf3959-8bcd-4932-87c9-683c5a0308ac.jpg', NULL, NULL, 24, NULL),
(39, '967924b8-9693-45e2-a813-6ce17b23579e.png', 10, NULL, NULL, NULL),
(43, 'cc1fe227-87e6-4a54-b562-1f85ab4ba67c.png', 23, NULL, NULL, NULL),
(46, '52ee4d93-bce0-43aa-9119-c7b971057b33.jpg', NULL, NULL, 109, NULL),
(47, 'e6d7d239-6ae0-4ed2-b3a6-f9d632c360ea.JPG', NULL, NULL, 109, NULL),
(48, 'af626040-ee87-4ba0-a0f5-96204a158eaa.jpg', NULL, NULL, 110, NULL),
(49, 'f6a99794-d5f1-4a00-8f02-e907c3b2850a.JPG', NULL, NULL, 113, NULL),
(50, 'cae9645d-e4cc-49cf-bff1-985713763109.jpg', NULL, 34, NULL, NULL),
(56, '0facd7bc-5cd4-4e37-858d-8d2484e21b13.png', 24, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `liked`
--

CREATE TABLE `liked` (
  `lid` int(10) NOT NULL,
  `uid` int(10) NOT NULL,
  `pid` int(10) DEFAULT NULL,
  `cid` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `liked`
--

INSERT INTO `liked` (`lid`, `uid`, `pid`, `cid`) VALUES
(42, 23, 14, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `pid` int(10) NOT NULL,
  `uid` int(10) NOT NULL,
  `gid` int(10) NOT NULL,
  `detail` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`pid`, `uid`, `gid`, `detail`, `date`) VALUES
(109, 23, 5, 'BEST GAME EVER', '2023-10-18 15:52:49'),
(110, 23, 5, 'BEST MODS', '2023-10-18 15:53:23'),
(111, 10, 5, 'VERY GOOD', '2023-10-18 15:54:20'),
(112, 10, 5, 'SUPER FUN', '2023-10-18 15:54:29'),
(113, 10, 5, 'BEAUTIFUL', '2023-10-18 15:56:03'),
(114, 10, 5, 'HAHAHA', '2023-10-18 15:56:13');

-- --------------------------------------------------------

--
-- Table structure for table `reported_posts`
--

CREATE TABLE `reported_posts` (
  `rpid` int(10) NOT NULL,
  `pid` int(10) NOT NULL,
  `uid` int(10) NOT NULL,
  `reason` text NOT NULL,
  `status` varchar(30) NOT NULL DEFAULT 'Waiting for process'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reported_posts`
--

INSERT INTO `reported_posts` (`rpid`, `pid`, `uid`, `reason`, `status`) VALUES
(1, 1, 2, 'Useless.', 'Waiting for process'),
(2, 1, 1, 'test', 'Waiting for process'),
(8, 14, 10, 'Fake', 'Waiting for process'),
(9, 110, 10, 'report', 'Waiting for process'),
(10, 114, 24, 'ไม่เหมาะสม', 'Waiting for process');

-- --------------------------------------------------------

--
-- Table structure for table `requested_games`
--

CREATE TABLE `requested_games` (
  `rgid` int(10) NOT NULL,
  `uid` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `year` varchar(4) DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'Waiting for approval'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `requested_games`
--

INSERT INTO `requested_games` (`rgid`, `uid`, `name`, `year`, `status`) VALUES
(1, 2, 'test1', '1111', 'Approved'),
(2, 2, 'test3', '1111', 'Waiting for approval'),
(3, 10, 'boomzboss321', '4578', 'Waiting for approval'),
(4, 10, 'GGGGGGGGG', '4578', 'Waiting for approval'),
(5, 24, 'game', '2013', 'Waiting for approval');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uid` int(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(30) NOT NULL,
  `username` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `roll` varchar(10) NOT NULL DEFAULT 'User',
  `status` varchar(10) NOT NULL DEFAULT 'Normal',
  `last_login` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `create_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `email`, `password`, `username`, `name`, `surname`, `roll`, `status`, `last_login`, `create_at`) VALUES
(1, 'proqppq123@gmail.com', '6Eb88c@5', 'CloudyTLC', 'บวรวัชร', 'ทองอยู่', 'User', 'Normal', '2023-10-13 07:17:13', '2023-07-23 09:02:18'),
(2, 'proqppq111@gmail.com', '6eb88cc5', 'Cloud', 'เมฆาคราม', 'เมฆาวงศ์', 'User', 'Normal', '2023-10-13 08:31:33', '2023-07-23 09:05:27'),
(3, 'testtest', 'test', 'Testadsgva', 'test', 'test', 'Uesr', 'Normal', '2023-10-07 09:18:06', '2023-10-06 03:19:51'),
(4, 'admin@gmail.com', 'admin', 'admin', 'admin', 'admin', 'Admin', 'Normal', '2023-10-19 06:58:46', '2023-10-06 08:43:43'),
(7, 'admin@gmail.co', 'test', 'Testadsgva', 'test', 'test', 'User', 'Normal', NULL, '2023-10-06 09:32:06'),
(9, 'Namelessz555@windowslive.com', 'Namelessz555', 'Namelessz555', 'Namelessz555', 'Namelessz555', 'User', 'Normal', '2023-10-14 08:36:33', '2023-10-13 16:53:06'),
(10, 'boomzboss123@gmail.com', 'boomzboss123', 'Namelessz', 'Namelessz', 'Namelessz', 'User', 'Normal', '2023-10-19 07:21:29', '2023-10-13 17:44:28'),
(16, 'wqweeqw@gmail.com', 'wqweeqw547', 'wqweeqw547', 'wqweeqw547', 'wqweeqw547', 'User', 'Normal', '2023-10-14 08:36:38', '2023-10-14 07:22:46'),
(17, 'boomzboss321@gmail.com', 'boomzboss321', 'boomzboss321', 'boomzboss321', 'boomzboss321', 'User', 'Normal', '2023-10-14 08:36:42', '2023-10-14 08:06:30'),
(22, 'boomzboss777@gmail.com', 'boomzboss777', 'boomzboss777', 'boomzboss777', 'boomzboss777', 'User', 'Normal', '2023-10-14 09:25:54', '2023-10-14 09:25:54'),
(23, 'sophonvid555@windowslive.com', 'sophonvid555', 'sophonvid555', 'sophonvid555', 'sophonvid555', 'User', 'Normal', '2023-10-18 15:50:30', '2023-10-17 14:12:18'),
(24, 'sophonvidptt123@windowslive.com', 'sophonvidptt123', 'sophonvidptt', 'sophonvidptt', 'sophonvidptt', 'User', 'Normal', '2023-10-19 07:34:10', '2023-10-19 07:34:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`cid`),
  ADD KEY `uid` (`uid`),
  ADD KEY `pid` (`pid`),
  ADD KEY `rid` (`rid`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`gid`);

--
-- Indexes for table `games_of_users`
--
ALTER TABLE `games_of_users`
  ADD PRIMARY KEY (`guid`),
  ADD KEY `uid` (`uid`),
  ADD KEY `gid` (`gid`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`iid`),
  ADD KEY `uid` (`uid`),
  ADD KEY `gid` (`gid`),
  ADD KEY `pid` (`pid`),
  ADD KEY `cid` (`cid`);

--
-- Indexes for table `liked`
--
ALTER TABLE `liked`
  ADD PRIMARY KEY (`lid`),
  ADD KEY `uid` (`uid`),
  ADD KEY `pid` (`pid`),
  ADD KEY `cid` (`cid`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`pid`),
  ADD KEY `uid` (`uid`),
  ADD KEY `gid` (`gid`);

--
-- Indexes for table `reported_posts`
--
ALTER TABLE `reported_posts`
  ADD PRIMARY KEY (`rpid`),
  ADD KEY `pid` (`pid`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `requested_games`
--
ALTER TABLE `requested_games`
  ADD PRIMARY KEY (`rgid`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `cid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `gid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `games_of_users`
--
ALTER TABLE `games_of_users`
  MODIFY `guid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `iid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `liked`
--
ALTER TABLE `liked`
  MODIFY `lid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `pid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT for table `reported_posts`
--
ALTER TABLE `reported_posts`
  MODIFY `rpid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `requested_games`
--
ALTER TABLE `requested_games`
  MODIFY `rgid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `uid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`pid`) REFERENCES `posts` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_4` FOREIGN KEY (`rid`) REFERENCES `comments` (`cid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `games_of_users`
--
ALTER TABLE `games_of_users`
  ADD CONSTRAINT `games_of_users_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `games_of_users_ibfk_2` FOREIGN KEY (`gid`) REFERENCES `games` (`gid`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `images_ibfk_2` FOREIGN KEY (`gid`) REFERENCES `games` (`gid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `images_ibfk_3` FOREIGN KEY (`pid`) REFERENCES `posts` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `images_ibfk_4` FOREIGN KEY (`cid`) REFERENCES `comments` (`cid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `liked`
--
ALTER TABLE `liked`
  ADD CONSTRAINT `liked_ibfk_2` FOREIGN KEY (`pid`) REFERENCES `posts` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `liked_ibfk_3` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `liked_ibfk_4` FOREIGN KEY (`cid`) REFERENCES `comments` (`cid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`gid`) REFERENCES `games` (`gid`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `reported_posts`
--
ALTER TABLE `reported_posts`
  ADD CONSTRAINT `reported_posts_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `posts` (`pid`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `reported_posts_ibfk_2` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `requested_games`
--
ALTER TABLE `requested_games`
  ADD CONSTRAINT `requested_games_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
