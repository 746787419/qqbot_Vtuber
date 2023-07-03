-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2023-07-03 16:55:41
-- 服务器版本： 5.5.62-log
-- PHP 版本： 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `qqbot`
--

-- --------------------------------------------------------

--
-- 表的结构 `public_talk`
--

CREATE TABLE `public_talk` (
  `id` int(11) NOT NULL,
  `receive` mediumtext COLLATE utf8_bin NOT NULL,
  `send` mediumtext COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `receiver`
--

CREATE TABLE `receiver` (
  `id` int(11) NOT NULL,
  `receiver_id` varchar(20) COLLATE utf8_bin NOT NULL,
  `send_type` varchar(20) COLLATE utf8_bin NOT NULL,
  `permission` varchar(20) COLLATE utf8_bin NOT NULL,
  `type` varchar(20) COLLATE utf8_bin NOT NULL,
  `game_group_number` varchar(20) COLLATE utf8_bin NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `source_talk`
--

CREATE TABLE `source_talk` (
  `id` int(11) NOT NULL,
  `send` varchar(100) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `talk_history`
--

CREATE TABLE `talk_history` (
  `id` int(11) NOT NULL,
  `sender` varchar(50) COLLATE utf8_bin NOT NULL,
  `message` mediumtext COLLATE utf8_bin NOT NULL,
  `time` varchar(50) COLLATE utf8_bin NOT NULL,
  `group_number` varchar(50) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `test1`
--

CREATE TABLE `test1` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `age` varchar(50) COLLATE utf8_bin NOT NULL,
  `sex` varchar(10) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `werewolf_killing`
--

CREATE TABLE `werewolf_killing` (
  `id` int(11) NOT NULL,
  `state` varchar(20) COLLATE utf8_bin NOT NULL DEFAULT 'play',
  `gamer` varchar(500) COLLATE utf8_bin NOT NULL DEFAULT '[]',
  `isready` int(11) NOT NULL,
  `gamestage` int(11) NOT NULL DEFAULT '0',
  `nfg` int(11) NOT NULL DEFAULT '0',
  `wolf_ready_kill` int(11) NOT NULL DEFAULT '-1',
  `wolf_kill` int(11) NOT NULL DEFAULT '-1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `xxy_config`
--

CREATE TABLE `xxy_config` (
  `id` int(11) NOT NULL,
  `v_key` varchar(50) COLLATE utf8_bin NOT NULL,
  `value` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转储表的索引
--

--
-- 表的索引 `public_talk`
--
ALTER TABLE `public_talk`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `receiver`
--
ALTER TABLE `receiver`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `source_talk`
--
ALTER TABLE `source_talk`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `talk_history`
--
ALTER TABLE `talk_history`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `test1`
--
ALTER TABLE `test1`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `werewolf_killing`
--
ALTER TABLE `werewolf_killing`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `xxy_config`
--
ALTER TABLE `xxy_config`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `public_talk`
--
ALTER TABLE `public_talk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `receiver`
--
ALTER TABLE `receiver`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `source_talk`
--
ALTER TABLE `source_talk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `talk_history`
--
ALTER TABLE `talk_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `test1`
--
ALTER TABLE `test1`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
