-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 09, 2020 at 08:46 PM
-- Server version: 10.3.15-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `writetool`
--

-- --------------------------------------------------------

--
-- Table structure for table `story`
--

CREATE TABLE `story` (
  `id` int(15) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `guid` varchar(100) DEFAULT NULL,
  `userId` int(10) NOT NULL,
  `updated` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `story`
--

INSERT INTO `story` (`id`, `name`, `description`, `guid`, `userId`, `updated`) VALUES
(1, 'Test 2', NULL, 'b9a3fba2-054e-409b-9f0e-094c5bb42e7d', 22, NULL),
(3, '1414', NULL, 'e1af10b6-4fac-4220-85e4-4aef9cc4a31b', 22, NULL),
(4, 'test1231', NULL, '9bf09b53-08cc-4ffb-a4f4-eab805a2f392', 22, NULL),
(5, '5453345', NULL, '4f080c9b-7c98-4475-96a0-c2eaab5c56e5', 22, NULL),
(6, 'New Story224', NULL, 'b1e9bfdb-4f6a-4811-8888-a2dee169f39a', 22, '2020-02-07 01:04:57');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `photoUrl` varchar(250) DEFAULT NULL,
  `authToken` varchar(500) DEFAULT NULL,
  `facebook_id` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `photoUrl`, `authToken`, `facebook_id`) VALUES
(22, 'Sim Danny', 'simionescudani07@gmail.com', 'https://graph.facebook.com/10216113288767381/picture?type=normal', 'EAAG5rNFrMlgBAOTjoZBZCd3tpcW925ZC6yOcqFVayAxJsUTlbdu3RmL7e8HYrCeGjT5FtmMMDBSurrVsTe0pyvISiDtiQHnPy2UZBZAS0f4xJLFMUkFpSy7M9lAe1PjFx2wRwfzWWWIGVnltmjqAAYSRTo4ZCfeBABaj4GhExc1goUU0Q6TqQTgnz8BOAWbwUZCDumjzg0jXgZDZD', '10216113288767381');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `story`
--
ALTER TABLE `story`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `story`
--
ALTER TABLE `story`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
