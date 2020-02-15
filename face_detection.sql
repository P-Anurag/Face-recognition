-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 15, 2020 at 01:28 PM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `face_detection`
--

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE IF NOT EXISTS `login` (
`ID` bigint(20) unsigned NOT NULL,
  `HASH` varchar(100) NOT NULL,
  `EMAIL` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`ID`, `HASH`, `EMAIL`) VALUES
(1, '$2a$10$A06UzDYCcS6p15TPU6oJRe2ed2XcN0c.0nfNcrBx0CR57Z4leZe5i', 'sanky@gmail.com'),
(8, '$2a$10$.6vwee0pe4N5CnmVk33GXO2wO65bSXQJ6LdYW4Ec4AAqx1CCjfGEe', 'sky@gmail.com'),
(15, '$2a$10$JLDbtdvd8ZPW9kQKm1bs2e7Tb3SBZhi5OsfnVHryaRnnnbWr73hPe', 'edy@gmail.com'),
(16, '$2a$10$/.9uq6znaCiEV956N1EBvO9ALEhmMoyTEqeLO5Ibd24agXYCJj/cq', 'brandy@gmail.com'),
(17, '$2a$10$XKLKNIn6/WPljgWlAF0sDuH3kh6bPXgnqxS4ULUObQE6h/gMcWJd2', 'yolanda@gmail.com'),
(18, '$2a$10$5b1V/JG4PWDV7kO2QySYSuoNa14S6hlKWTipnuOj0aDkW0fjkvf76', 'vasanth@gmaik.com'),
(19, '$2a$10$OEKPCrScm1D./22HdYNaSeBSfNmZzu5e4MlUQ0PveUWdf1XMsM.oy', 'neethu@gmail.com'),
(20, '$2a$10$a8cOg.i3X5K7qprU0hiV6u.jCx05OO2X09mY1w4oF0q2r2JLL3wam', 'hela');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`ID` bigint(20) unsigned NOT NULL,
  `NAME` varchar(100) DEFAULT NULL,
  `EMAIL` varchar(100) NOT NULL,
  `ENTRIES` bigint(20) DEFAULT '0',
  `JOINED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `NAME`, `EMAIL`, `ENTRIES`, `JOINED`) VALUES
(16, 'sanky', 'sanky@gmail.com', 0, '2020-02-14 19:14:52'),
(17, 'sky', 'sky@gmail.com', 0, '2020-02-15 03:21:37'),
(23, 'edy', 'edy@gmail.com', 15, '2020-02-15 11:35:54'),
(24, 'brandy', 'brandy@gmail.com', 0, '2020-02-15 05:21:40'),
(25, 'Yolanda', 'yolanda@gmail.com', 0, '2020-02-15 09:57:01'),
(26, 'qwert', 'vasanth@gmaik.com', 4, '2020-02-15 11:52:28'),
(27, 'nikshiptha', 'neethu@gmail.com', 3, '2020-02-15 12:06:25'),
(28, 'hela', 'hela', 0, '2020-02-15 12:14:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `login`
--
ALTER TABLE `login`
 ADD PRIMARY KEY (`ID`), ADD UNIQUE KEY `ID` (`ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`ID`), ADD UNIQUE KEY `ID` (`ID`), ADD UNIQUE KEY `EMAIL` (`EMAIL`), ADD UNIQUE KEY `EMAIL_2` (`EMAIL`), ADD UNIQUE KEY `EMAIL_3` (`EMAIL`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
MODIFY `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=29;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
