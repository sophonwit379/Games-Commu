-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 13, 2023 at 11:00 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

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

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`cid`, `uid`, `pid`, `rid`, `detail`, `date`) VALUES
(1, 2, 1, NULL, 'Agreed!', '2023-07-23 09:07:00'),
(2, 4, 1, NULL, 'test', '2023-10-08 08:39:08'),
(3, 4, 1, NULL, 'test reply', '2023-10-08 08:40:29'),
(5, 2, 1, NULL, 'afehnoaefjphf', '2023-10-13 08:34:20'),
(6, 2, NULL, 1, 'afehnoaefjasfadgsphf', '2023-10-13 08:57:36');

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
(3, '0', '0');

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
(5, 1, 1);

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
(4, '7f5e157f-04c8-4449-8fe4-93dda8a5808b.png', NULL, NULL, 1, NULL);

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
(1, 2, 1, NULL);

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
(1, 1, 2, 'Fix Test', '2023-07-23 09:04:11'),
(2, 1, 1, 'Testadsgva', '2023-10-08 08:24:15'),
(3, 1, 1, 'Test2', '2023-10-08 08:24:25'),
(4, 1, 1, 'Test3', '2023-10-08 08:24:32'),
(5, 1, 1, 'Test4', '2023-10-08 08:24:35'),
(6, 1, 1, 'Test5', '2023-10-08 08:24:38'),
(7, 1, 1, 'Test6', '2023-10-08 08:24:40'),
(8, 1, 1, 'Test6', '2023-10-12 13:15:53'),
(9, 1, 3, 'aefg', '2023-10-12 14:17:52'),
(10, 1, 3, 'aefg', '2023-10-12 14:17:57'),
(11, 4, 2, 'asdgzxcv', '2023-10-12 14:19:18'),
(12, 4, 2, 'asdgzxcv', '2023-10-12 14:19:23');

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
(2, 1, 1, 'test', 'Waiting for process');

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
(1, 2, 'test1', '1111', 'Waiting for approval'),
(2, 2, 'test3', '1111', 'Waiting for approval');

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
(4, 'admin@gmail.com', 'admin', 'admin', 'admin', 'admin', 'Admin', 'Normal', '2023-10-13 06:30:44', '2023-10-06 08:43:43'),
(7, 'admin@gmail.co', 'test', 'Testadsgva', 'test', 'test', 'Uesr', 'Normal', NULL, '2023-10-06 09:32:06');

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
  MODIFY `cid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `gid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `games_of_users`
--
ALTER TABLE `games_of_users`
  MODIFY `guid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `iid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `liked`
--
ALTER TABLE `liked`
  MODIFY `lid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `pid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `reported_posts`
--
ALTER TABLE `reported_posts`
  MODIFY `rpid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `requested_games`
--
ALTER TABLE `requested_games`
  MODIFY `rgid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `uid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
