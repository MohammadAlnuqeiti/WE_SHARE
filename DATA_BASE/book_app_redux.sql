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
-- Database: `book_app_redux`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `auther` varchar(50) NOT NULL,
  `description` longtext NOT NULL,
  `image` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `title`, `auther`, `description`, `image`, `user_id`, `created_at`) VALUES
(11, 'I Don\'t Need Therapy', 'Toni Lodge', 'A hilarious memoir of home truths and whatever the opposite of \'that girl energy\' is, from one half of the hit podcast Toni and Ryan.\r\n\r\nMost of us tell little white lies all the time. Whether it\'s \'I\'m five minutes away\' or \'It must have gone to my spam folder\', most of these fibs are harmless. But what if you realised that you weren\'t just lying about the little things, but the big \'life\' stuff too?\r\n\r\nWhen Toni Lodge sat down to write this memoir, she realised that the lies she was telling herself were hiding some pretty important home truths-about her work, her identity and her mental health. Her dogged pursuit of these truths sent her on a brazen exploration of everything from gastro, fame and Twilight to funerals, the Dalai Lama and Brazilian waxes.\r\n', 'book1.jpg', 1, '2023-03-13 16:30:25'),
(13, 'I\'m Glad My Mom Died', 'Jennette McCurdy', 'A hilarious memoir of home truths and whatever the opposite of \'that girl energy\' is, from one half of the hit podcast Toni and Ryan.\r\n\r\nMost of us tell little white lies all the time. Whether it\'s \'I\'m five minutes away\' or \'It must have gone to my spam folder\', most of these fibs are harmless. But what if you realised that you weren\'t just lying about the little things, but the big \'life\' stuff too?\r\n\r\nWhen Toni Lodge sat down to write this memoir, she realised that the lies she was telling herself were hiding some pretty important home truths-about her work, her identity and her mental health. Her dogged pursuit of these truths sent her on a brazen exploration of everything from gastro, fame and Twilight to funerals, the Dalai Lama and Brazilian waxes.\r\n\r\n', 'Book2.jpg', 1, '2023-03-13 16:36:51'),
(15, 'Verity', 'Colleen Hoover', 'OVER 3 MILLION COPIES SOLD - THE NO.1 BESTSELLER AND TIKTOK SENSATION, FROM THE AUTHOR OF IT ENDS WITH US\r\nAre you ready to stay up all night? Rebecca meets Gone Girl in this shocking, unpredictable thriller with a twist that will leave you reeling . . .\r\n\r\nLowen Ashleigh is a struggling writer on the brink of financial ruin when she accepts the job offer of a lifetime. Jeremy Crawford, husband of bestselling author Verity Crawford, has hired Lowen to complete the remaining books in a successful series his injured wife is unable to finish.\r\n', 'book3.jpg', 2, '2023-03-13 16:40:51'),
(17, 'I\'m a Fan', 'Sheena Patel', '\r\nI\'M A FAN tells the story of an unnamed narrator\'s involvement in a seemingly unequal romantic relationship. With a clear and unforgiving eye, Sheena Patel makes startling connections between power struggles at the heart of human relationships to those in the wider world, offering a devastating critique of social media, access and patriarchal systems.', 'Book6.jpg', 3, '2023-03-13 16:43:26'),
(18, 'Things We Never Got Over ', 'Lucy Score', 'Grumpy, small-town barber + hopelessly romantic runaway bride = great big bust ups, all the tension and lots of steamy encounters!\r\n\r\nEscaping her seemingly perfect wedding, Naomi Witt arrives in rough-around-the-edges Knockemout, Virginia, running to the rescue of her estranged twin, Tina.\r\n\r\nToo bad for Naomi her evil twin hasn\'t changed at all. After helping herself to Naomi\'s car and cash, Tina leaves her with something unexpected: the 11-year-old niece she didn\'t know she had. Now she\'s stuck in town with no job, no plan, no home and a whole lot of extra responsibility.\r\n\r\nThere\'s a reason local barber Knox doesn\'t do complications or high-maintenance women, especially not the romantic ones. But since Naomi\'s life imploded right in front of him, the least he can do is help her out of her jam. And just as soon as she stops getting into trouble, he can leave her alone and get back to his peaceful, solitary life.', 'Book7.jpg', 4, '2023-03-13 16:46:46'),
(20, 'Foster', 'Claire Keegan', '** Adapted into the Oscar-nominated film adaptation, An Cailin Ciuin / The Quiet Girl **  From the author of the Booker-shortlisted Small Things Like These, a heartbreaking, haunting story of childhood, loss and love by one of Ireland\'s most acclaimed writers.  \'A real jewel.\' Irish Independent  \'A small miracle.\' Sunday Times  \'A thing of finely honed beauty.\' Guardian', 'Book8.jpg', 4, '2023-03-13 17:39:36');

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
(1, 'ahmed', 'mohammad@gmail.com', 'asdfghjkl', '0790369501', 'mohammad.jpg', '2023-02-22 21:00:00'),
(2, 'haneen', 'haneen@gmail.com', 'asdfghjkl', '0790369501', 'haneen.jpeg', '2023-02-22 21:00:00'),
(3, 'oday', 'oday@gmail.com', 'asdfghjkl', '0790369501', 'mohammad.jpg', '2023-02-22 21:00:00'),
(4, 'walaa', 'walaa@gmail.com', 'asdfghjkl', '0797621548', 'walaa.jpeg', '2023-02-23 21:00:00'),
(5, 'noor', 'noor@gmail.com', 'asdfghjkl', '0790369501', 'noor.jpeg', '2023-02-24 21:00:00'),
(6, 'ahmed', 'ahmed@gmail.com', 'asdfghjkl', '0790369999', 'mohammad.jpg', '2023-02-24 21:00:00'),
(7, 'abed', 'abed@gmail.com', 'asdfghjkl', '0797621548', 'abed.jfif', '2023-02-26 21:00:00'),
(8, 'amro', 'amro@gamil.com', 'asdfghjkl', '1234567897', 'amro.jfif', '2023-02-28 21:00:00'),
(9, 'asem', 'asem@gmail.com', 'asdfghjkl', '0795463251', 'asem.jfif', '2023-03-01 20:50:21'),
(10, 'asadss', 'mohammadalnuqeiti@gmail.com', 'asdfghjkl', '0797621548', 'icon.png', '2023-03-08 21:00:00'),
(11, 'asem ', 'admina@gmail.com', 'asdfghjkl', '0797621548', 'icon.png', '2023-03-08 21:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
