CREATE TABLE `communityTable` (
  `communityId` int(11) NOT NULL AUTO_INCREMENT,
  `communityName` varchar(45) NOT NULL,
  `address` varchar(45) DEFAULT NULL,
  `contactEmail` varchar(45) DEFAULT NULL,
  `PicURL` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`communityId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
