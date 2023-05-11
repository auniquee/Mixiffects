-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Värd: 127.0.0.1
-- Tid vid skapande: 11 maj 2023 kl 12:09
-- Serverversion: 10.4.21-MariaDB
-- PHP-version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `mixiffects`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `sounds`
--

CREATE TABLE `sounds` (
  `id` int(11) NOT NULL,
  `name` varchar(63) NOT NULL,
  `description` varchar(255) NOT NULL,
  `user` varchar(31) NOT NULL,
  `location` varchar(127) NOT NULL,
  `tags` varchar(255) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumpning av Data i tabell `sounds`
--

INSERT INTO `sounds` (`id`, `name`, `description`, `user`, `location`, `tags`, `date`) VALUES
(29, 'dsadsa', 'dsadsa', 'guest', '/uploads/user/1683791408490.wav.wav', 'dsa,dsa,dsa,dsa', '2023-05-11 09:50:31'),
(30, 'creeepy', 'dssda', 'guest', '/uploads/user/1683791464714.wav.wav', 'dsfalnfdsa,fdsoijfasd', '2023-05-11 10:35:10');

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `sounds`
--
ALTER TABLE `sounds`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `sounds`
--
ALTER TABLE `sounds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
