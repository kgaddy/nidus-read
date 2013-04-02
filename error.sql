/*
 Navicat MySQL Data Transfer

 Source Server         : local
 Source Server Version : 50520
 Source Host           : localhost
 Source Database       : Log

 Target Server Version : 50520
 File Encoding         : utf-8

 Date: 03/14/2013 21:11:42 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `error`
-- ----------------------------
DROP TABLE IF EXISTS `error`;
CREATE TABLE `error` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(100) NOT NULL,
  `msg` varchar(1000) NOT NULL,
  `ipAddress` varchar(200) NOT NULL,
  `refId` int(11) NOT NULL,
  `date` varchar(300) NOT NULL,
  `viewDate` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Records of `error`
-- ----------------------------
BEGIN;
INSERT INTO `error` VALUES ('1', '0', 'The Web Is Down', 'Rested/1988 CFNetwork/596.2.3 Darwin/12.2.1 (x86_64) (MacBookPro9%2C1)', '1', '2013-02-25 20:48:40', null), ('2', 'error', 'The Web Is Down', 'Rested/1988 CFNetwork/596.2.3 Darwin/12.2.1 (x86_64) (MacBookPro9%2C1)', '1', '2013-02-25 20:59:23', null);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
