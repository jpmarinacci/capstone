CREATE TABLE `communityPersonTable` (
  `communityId` int(11) NOT NULL,
  `personId` int(11) NOT NULL,
  PRIMARY KEY (`communityId`,`personId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
