-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 04, 2023 at 12:39 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `react_platform_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `comment_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `comment_content` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `name`, `email`, `subject`, `message`) VALUES
(1, 'mohammad', 'admin@gmail.com', 'mmm', 'xxx'),
(2, 'mohammad', 'mohammadalnuqeiti@gmail.com', 'sss', 'sss');

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE `friends` (
  `id` int(20) NOT NULL,
  `user_id` int(20) NOT NULL,
  `friend_id` int(20) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `friends`
--

INSERT INTO `friends` (`id`, `user_id`, `friend_id`, `status`) VALUES
(110, 2, 1, 'accepted'),
(111, 2, 5, 'accepted'),
(112, 2, 7, 'accepted'),
(113, 2, 4, 'accepted'),
(114, 4, 2, 'accepted'),
(116, 4, 6, 'accepted'),
(117, 4, 9, 'accepted'),
(118, 3, 6, 'accepted'),
(119, 3, 8, 'accepted'),
(120, 3, 5, 'accepted'),
(121, 3, 7, 'accepted'),
(122, 3, 1, 'accepted'),
(123, 9, 4, 'accepted'),
(124, 9, 5, 'accepted'),
(125, 9, 2, 'accepted'),
(126, 9, 1, 'accepted'),
(127, 9, 6, 'accepted'),
(128, 9, 8, 'accepted'),
(129, 9, 7, 'accepted'),
(130, 1, 2, 'accepted'),
(131, 1, 3, 'accepted'),
(133, 1, 9, 'accepted'),
(135, 1, 5, 'accepted'),
(137, 6, 3, 'accepted'),
(138, 6, 4, 'accepted'),
(139, 6, 9, 'accepted'),
(140, 6, 5, 'accepted'),
(141, 6, 7, 'accepted'),
(142, 6, 8, 'accepted'),
(143, 8, 3, 'accepted'),
(144, 8, 6, 'accepted'),
(145, 8, 9, 'accepted'),
(146, 8, 7, 'accepted'),
(147, 8, 5, 'accepted'),
(148, 8, 4, 'pending'),
(149, 8, 1, 'accepted'),
(150, 5, 1, 'accepted'),
(151, 5, 2, 'accepted'),
(152, 5, 3, 'accepted'),
(153, 5, 6, 'accepted'),
(154, 5, 8, 'accepted'),
(155, 5, 9, 'accepted'),
(156, 1, 8, 'accepted'),
(157, 7, 2, 'accepted'),
(158, 7, 3, 'accepted'),
(159, 7, 6, 'accepted'),
(160, 7, 8, 'accepted'),
(161, 7, 9, 'accepted'),
(162, 2, 9, 'accepted'),
(164, 4, 1, 'accepted'),
(166, 1, 4, 'accepted');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `group_id` int(50) NOT NULL,
  `group_name` varchar(255) NOT NULL,
  `group_description` text DEFAULT NULL,
  `group_image` varchar(255) NOT NULL,
  `user_id` int(50) NOT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`group_id`, `group_name`, `group_description`, `group_image`, `user_id`, `status`) VALUES
(27, 'Doctor\'s Life', 'The mission of Doctor`s Life to educate medical students, graduate students, and postdoctoral fellows in accordance with the highest professional standards.', 'Doctor\'s Life.png', 1, NULL),
(28, 'Restaurants Reviews', 'We can discuss all the things that is related to Restaurants and Cafes etc. like food qualityâ€¦T\'S ALL ABOUT FOODIES.', 'Restaurants Reviews.png', 2, NULL),
(29, 'Ask USA', 'This group aims to answer all questions about specific norms, locations, stores, and other knowledge about the United States.', 'Ask USA.png', 1, NULL),
(30, 'Beauty', 'This group is created for beauticians to promote their services and for clients looking for new beauticians.', 'Beauty.png', 2, NULL),
(31, 'Best Destinations to Travel', 'This group was created to share the best travel experiences around the world', 'Best Destinations to Travel.png', 3, NULL),
(32, 'Jobs In Jordan', 'A group for publishing jobs from companies that advertise directly in Jordan and aims to reach the largest number of unemployed and employ them', 'Jobs In Jordan.png', 4, NULL),
(33, 'Jordan Tourism & Places ðŸ‡¯ðŸ‡´', 'Tour Packages and Day Trips in Jordan to help Tourist to find the best deals or information before they book their trip to Jordan', 'Jordan Tourism & Places ðŸ‡¯ðŸ‡´.png', 3, NULL),
(34, 'Palestine News ', 'A group specialized in all the news of the cities of Palestine and what is happening there.', 'Palestine News.png', 5, NULL),
(35, 'Learn Web Development', 'The group specializes in programmers and web developers in particular and teaches them what it takes to create their own websites', 'Learn Web Development.png', 5, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(100) NOT NULL,
  `user_id` int(50) NOT NULL,
  `post_id` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `user_id`, `post_id`) VALUES
(79, 9, 120),
(80, 9, 118),
(81, 9, 117),
(82, 9, 115),
(83, 9, 113),
(84, 9, 111),
(85, 9, 110),
(86, 1, 120),
(87, 1, 118),
(88, 1, 117),
(89, 1, 115),
(90, 1, 111),
(91, 1, 122),
(92, 1, 123),
(93, 6, 110),
(95, 2, 125),
(96, 2, 115);

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `members_id` int(11) NOT NULL,
  `user_id` int(50) NOT NULL,
  `group_id` int(50) NOT NULL,
  `is_admin` int(11) NOT NULL DEFAULT 0,
  `status` varchar(50) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`members_id`, `user_id`, `group_id`, `is_admin`, `status`) VALUES
(56, 2, 34, 0, 'pending'),
(57, 2, 29, 0, 'accepted'),
(59, 1, 33, 0, 'pending'),
(60, 1, 32, 0, 'accepted'),
(61, 1, 28, 0, 'accepted'),
(62, 1, 31, 0, 'pending'),
(63, 3, 27, 0, 'accepted'),
(64, 3, 28, 0, 'pending'),
(65, 3, 32, 0, 'accepted'),
(66, 3, 30, 0, 'pending'),
(67, 3, 34, 0, 'pending'),
(68, 3, 35, 0, 'pending'),
(69, 6, 29, 0, 'accepted'),
(71, 6, 27, 0, 'accepted'),
(73, 6, 31, 0, 'pending'),
(74, 6, 32, 0, 'accepted'),
(75, 6, 35, 0, 'pending'),
(76, 6, 34, 0, 'pending'),
(77, 6, 33, 0, 'pending'),
(78, 4, 27, 0, 'accepted'),
(79, 4, 28, 0, 'pending'),
(80, 4, 29, 0, 'accepted'),
(81, 4, 33, 0, 'accepted'),
(82, 4, 31, 0, 'accepted'),
(83, 4, 30, 0, 'accepted'),
(84, 9, 27, 0, 'accepted'),
(85, 9, 28, 0, 'pending'),
(86, 9, 29, 0, 'accepted'),
(87, 9, 32, 0, 'pending'),
(88, 9, 31, 0, 'pending'),
(89, 9, 30, 0, 'accepted'),
(91, 9, 34, 0, 'pending'),
(92, 9, 35, 0, 'pending'),
(93, 7, 27, 0, 'accepted'),
(94, 7, 28, 0, 'pending'),
(96, 7, 32, 0, 'pending'),
(97, 7, 31, 0, 'pending'),
(98, 7, 30, 0, 'accepted'),
(99, 8, 31, 0, 'pending'),
(100, 8, 32, 0, 'accepted'),
(101, 8, 29, 0, 'pending'),
(102, 8, 28, 0, 'pending'),
(103, 8, 27, 0, 'accepted'),
(104, 8, 30, 0, 'pending'),
(105, 6, 28, 0, 'accepted'),
(106, 7, 29, 0, 'accepted'),
(108, 5, 31, 0, 'accepted'),
(109, 9, 33, 0, 'accepted'),
(110, 1, 34, 0, 'accepted');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` int(50) NOT NULL,
  `user_id` int(50) NOT NULL,
  `content` longtext NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `group_id` int(100) NOT NULL DEFAULT 0,
  `post_image` varchar(255) DEFAULT 'a'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `user_id`, `content`, `created_at`, `group_id`, `post_image`) VALUES
(110, 1, 'A vegetative state occurs when the cerebrum (the part of the brain that controls thinking and behavior) stops functioning.', '2023-03-02 00:10:44', 27, 'Doctor.jpg'),
(111, 6, 'Have you ever tried our special menu - BEEF BONE LAKSA??? A popular favourite among our Japanese customers because of its unique taste.. definitely a must try   TRULY AUTHENTIC, ONLY AT NUR MALAYSIA AMMAN ', '2023-03-02 00:14:40', 28, 'res.jpg'),
(113, 7, 'I want to inquire about studying and the cost of living in the United States?', '2023-03-02 00:16:31', 29, 'usa.jpg'),
(115, 2, 'Choose your favorite product from our store:', '2023-03-02 00:17:10', 30, 'cosmetics.jpg'),
(117, 5, 'Beautiful Barbados', '2023-03-02 00:19:04', 31, 'travel.jpg'),
(118, 4, 'WE ARE HIRING  1- Professional INTERIOR DESIGNER With the following requirements: - Good software command (3DSMAX - AutoCAD - Photoshop). - Great Visualization skills. - Work location: amman', '2023-03-02 00:19:53', 32, 'job.jpg'),
(120, 9, 'Enjoy a trip with us in Wadi Rum', '2023-03-02 00:20:57', 33, 'jordan rum.jpg'),
(122, 1, 'Khalil City Bazaar ', '2023-03-02 00:22:32', 34, 'Palestine.jpg'),
(123, 1, 'DREAM TEAM â¤ï¸', '2023-03-02 00:25:44', 0, 'WhatsApp Image 2022-12-29 at 11.56.37 AM.jpeg'),
(125, 2, 'Gym lovers start from here â¤ï¸', '2023-03-02 10:14:18', 37, 'gym.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `phone` varchar(14) NOT NULL,
  `image` varchar(255) DEFAULT 'icon.png',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `image`, `created_at`) VALUES
(1, 'mohammad', 'mohammad@gmail.com', 'asdfghjkl', '0790369522', 'mohammad.jpg', '2023-02-22 21:00:00'),
(2, 'haneen', 'haneen@gmail.com', 'asdfghjkl', '0790369501', 'haneen.jpeg', '2023-02-22 21:00:00'),
(3, 'oday', 'oday@gmail.com', 'asdfghjkl', '0790369501', 'oday.jpeg', '2023-02-22 21:00:00'),
(4, 'walaa', 'walaa@gmail.com', 'asdfghjkl', '0797621548', 'walaa.jpeg', '2023-02-23 21:00:00'),
(5, 'noor', 'noor@gmail.com', 'asdfghjkl', '0790369501', 'noor.jpeg', '2023-02-24 21:00:00'),
(6, 'ahmed', 'ahmed@gmail.com', 'asdfghjkl', '0790369999', 'ahmed.jpg', '2023-02-24 21:00:00'),
(7, 'abed', 'abed@gmail.com', 'asdfghjkl', '0797621548', 'abed.jfif', '2023-02-26 21:00:00'),
(8, 'amro', 'amro@gamil.com', 'asdfghjkl', '1234567897', 'amro.jfif', '2023-02-28 21:00:00'),
(9, 'asem', 'asem@gmail.com', 'asdfghjkl', '0795463251', 'asem.jfif', '2023-03-01 20:50:21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`group_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`members_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `group_id` (`group_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `friends`
--
ALTER TABLE `friends`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=167;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `group_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `members_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=174;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `friends`
--
ALTER TABLE `friends`
  ADD CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `members`
--
ALTER TABLE `members`
  ADD CONSTRAINT `members_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `members_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
