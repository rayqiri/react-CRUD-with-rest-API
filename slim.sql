-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 01, 2016 at 11:02 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 7.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `slim`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_api_reg`
--

CREATE TABLE `tbl_api_reg` (
  `id_api_reg` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `api_key` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_api_reg`
--

INSERT INTO `tbl_api_reg` (`id_api_reg`, `email`, `api_key`) VALUES
(2, 'rayqiri@gmail.com', 'ee0fc2e57edf3773f34493a7547209e5');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_customer`
--

CREATE TABLE `tbl_customer` (
  `id_customer` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `alamat` text NOT NULL,
  `telepon` varchar(50) NOT NULL,
  `tempat_lahir` varchar(50) NOT NULL,
  `tgl_lahir` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_customer`
--

INSERT INTO `tbl_customer` (`id_customer`, `nama`, `alamat`, `telepon`, `tempat_lahir`, `tgl_lahir`) VALUES
(1, 'Agung Rifqi Hidayat', 'Prambatan Lor', '085740251212', 'kudus', '11 mei 1993'),
(2, 'Rayqiri', 'Akihabara', '085740661942', 'jepang', '11 mei 1993'),
(3, 'Ojan', 'Muria', '087543212121', 'kudus', '11 mei 1992'),
(4, 'Tjhris', 'Tanjung', '087543212121', 'kudus', '17 Januari 1993'),
(5, 'Hiko', 'Lampung', '085740771942', 'kudus', '11 mei 1992');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_api_reg`
--
ALTER TABLE `tbl_api_reg`
  ADD PRIMARY KEY (`id_api_reg`);

--
-- Indexes for table `tbl_customer`
--
ALTER TABLE `tbl_customer`
  ADD PRIMARY KEY (`id_customer`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_api_reg`
--
ALTER TABLE `tbl_api_reg`
  MODIFY `id_api_reg` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tbl_customer`
--
ALTER TABLE `tbl_customer`
  MODIFY `id_customer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
