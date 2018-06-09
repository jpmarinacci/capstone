CREATE TABLE `collegeClassTable` (
  `classId` int(11) NOT NULL AUTO_INCREMENT,
  `className` varchar(2000) NOT NULL,
  `courseSummary` varchar(2000) DEFAULT NULL,
  `classType` varchar(2000) DEFAULT NULL,
  `estimatedClassSize` int(11) DEFAULT NULL,
  `ownerId` int(11) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `section` varchar(2000) DEFAULT NULL,
  `term` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`classId`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;
