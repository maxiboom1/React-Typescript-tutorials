-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 26, 2023 at 05:26 PM
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
-- Database: `meeting-scheduler`
--
CREATE DATABASE IF NOT EXISTS `meeting-scheduler` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `meeting-scheduler`;

-- --------------------------------------------------------

--
-- Table structure for table `meetings`
--

CREATE TABLE `meetings` (
  `meetingId` int(11) NOT NULL,
  `teamId` int(11) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `meetingDescription` varchar(200) NOT NULL,
  `meetingRoom` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `meetings`
--

INSERT INTO `meetings` (`meetingId`, `teamId`, `startTime`, `endTime`, `meetingDescription`, `meetingRoom`) VALUES
(1, 2, '2023-03-24 17:00:00', '2023-03-24 18:00:00', 'Discussion about vanilla tastes.', 'Room-1'),
(2, 3, '2023-03-26 16:48:51', '2023-03-26 18:48:51', 'Socket.io- the philosophy behind 2-way communications.', 'Room-2'),
(3, 1, '2023-03-25 17:00:00', '2023-03-25 18:00:00', 'Discussion about new hooks.', 'Room-3'),
(4, 2, '2023-03-29 12:00:00', '2023-03-29 14:30:00', 'Discussion about new JS abilities.', 'Room-3'),
(5, 3, '2023-03-26 09:00:00', '2023-03-26 12:00:00', 'Socket.io- the philosophy behind 2-way communications - meeting 2.', 'Room-2'),
(6, 2, '2023-03-29 14:00:00', '2023-03-29 15:00:00', 'Discussion about vanilla tastes - extra', 'Room-2');

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `teamId` int(11) NOT NULL,
  `teamName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`teamId`, `teamName`) VALUES
(1, 'React team'),
(2, 'Javascript team'),
(3, 'NodeJs team');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `meetings`
--
ALTER TABLE `meetings`
  ADD PRIMARY KEY (`meetingId`),
  ADD KEY `teamId` (`teamId`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`teamId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `meetings`
--
ALTER TABLE `meetings`
  MODIFY `meetingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `teamId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `meetings`
--
ALTER TABLE `meetings`
  ADD CONSTRAINT `meetings_ibfk_1` FOREIGN KEY (`teamId`) REFERENCES `teams` (`teamId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
