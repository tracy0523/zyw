/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50524
Source Host           : localhost:3306
Source Database       : ycushare

Target Server Type    : MYSQL
Target Server Version : 50524
File Encoding         : 65001

Date: 2017-04-13 22:18:39
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `category`
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` char(50) NOT NULL COMMENT '种类id\n            ',
  `product_id` char(50) DEFAULT NULL COMMENT '共享物品id',
  `type` int(2) DEFAULT NULL COMMENT '共享物品类型',
  PRIMARY KEY (`id`),
  KEY `FK_Reference_2` (`product_id`),
  CONSTRAINT `FK_Reference_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('6001', '1', '1');

-- ----------------------------
-- Table structure for `comment`
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` char(50) NOT NULL COMMENT '评论id',
  `product_id` char(50) DEFAULT NULL COMMENT '共享物品id',
  `evaluate` varchar(200) DEFAULT NULL COMMENT '评论',
  PRIMARY KEY (`id`),
  KEY `FK_Reference_3` (`product_id`),
  CONSTRAINT `FK_Reference_3` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT=' ';

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('5001', '1', 'fafasfasdfas');
INSERT INTO `comment` VALUES ('5002', '1', '哈哈哈哈');

-- ----------------------------
-- Table structure for `product`
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` char(50) NOT NULL COMMENT '共享物品id',
  `user_id` char(50) DEFAULT NULL COMMENT '用户id',
  `name` char(50) DEFAULT NULL COMMENT '共享物品名',
  `info` varchar(200) DEFAULT NULL COMMENT '共享物品信息',
  `status` int(2) DEFAULT NULL COMMENT '物品状态(0:未共享，1:已共享)',
  `img` char(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Reference_1` (`user_id`),
  CONSTRAINT `FK_Reference_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='\r\n';

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES ('1', '0469b6d8-50b6-4d32-a926-c5afc70aed7d', 'aaa', '123456', '0', '1.jpg');

-- ----------------------------
-- Table structure for `resource`
-- ----------------------------
DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource` (
  `id` char(50) NOT NULL COMMENT '资源id',
  `role_id` char(50) DEFAULT NULL COMMENT '角色id\n            ',
  `path` char(50) DEFAULT NULL COMMENT '资源路径',
  PRIMARY KEY (`id`),
  KEY `FK_Reference_5` (`role_id`),
  CONSTRAINT `FK_Reference_5` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT=' ';

-- ----------------------------
-- Records of resource
-- ----------------------------
INSERT INTO `resource` VALUES ('3001', '2001', '/account/info');
INSERT INTO `resource` VALUES ('3002', '2001', '/account/list');

-- ----------------------------
-- Table structure for `role`
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` char(50) NOT NULL COMMENT '角色id',
  `user_id` char(50) DEFAULT NULL COMMENT '用户id',
  `type` char(50) DEFAULT NULL COMMENT '角色类型（管理员：ROLE_ADMIN,用户：ROLE_USER）',
  PRIMARY KEY (`id`),
  KEY `FK_Reference_4` (`user_id`),
  CONSTRAINT `FK_Reference_4` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('2001', '0469b6d8-50b6-4d32-a926-c5afc70aed7d', 'ROLE_USER');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` char(50) NOT NULL COMMENT '用户id',
  `name` char(50) DEFAULT NULL COMMENT '用户姓名',
  `pwd` char(50) DEFAULT NULL COMMENT '用户密码',
  `account` char(50) DEFAULT NULL COMMENT '用户账号',
  `phone` char(50) DEFAULT NULL COMMENT '手机号',
  `status` int(2) DEFAULT NULL COMMENT '状态(0:正常，1:停用)',
  `type` int(2) DEFAULT NULL COMMENT '用户类型（0:普通用户，1:管理员）',
  `email` char(50) DEFAULT NULL COMMENT '邮箱',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('0469b6d8-50b6-4d32-a926-c5afc70aed7d', 'zyw', 'f379eaf3c831b04de153469d1bec345e', 'manager', '18146746393', '0', '0', 'zhuya_wei@163.com');
INSERT INTO `user` VALUES ('dac35c2e-f645-4ed7-b0f9-130c60704a42', 'syt', '96e79218965eb72c92a549dd5a330112', 'syt', '18146746393', '0', '0', '734296325@qq.com');
