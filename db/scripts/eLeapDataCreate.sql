use eLeapData;
CREATE TABLE `achivementTable` (
  `AchivementID` int(11) NOT NULL,
  `AchivementName` varchar(45) DEFAULT NULL,
  `AchivementDescription` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`AchivementID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `applicationStateTable` (
  `ThemeID` int(11) NOT NULL AUTO_INCREMENT,
  `ThemeData` varchar(45) DEFAULT NULL,
  `ThemeDecription` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ThemeID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

CREATE TABLE `collegeClassTable` (
  `ClassID` int(11) NOT NULL,
  `ClassName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ClassID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `communityTable` (
  `CommunityID` int(11) NOT NULL,
  `CommunityName` varchar(45) DEFAULT NULL,
  `Address` varchar(45) DEFAULT NULL,
  `ContactEmail` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`CommunityID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `logTable` (
  `LogID` int(11) NOT NULL,
  `LogDetails` varchar(45) DEFAULT NULL,
  `LogDate` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`LogID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `picsTable` (
  `PicID` int(11) NOT NULL AUTO_INCREMENT,
  `PicURL` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`PicID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

CREATE TABLE `roleTable` (
  `RoleID` int(11) NOT NULL AUTO_INCREMENT,
  `RoleName` varchar(45) DEFAULT NULL,
  `RoleDescription` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`RoleID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

CREATE TABLE `personTable` (
  `PersonID` int(11) NOT NULL AUTO_INCREMENT,
  `RoleID` int(11) DEFAULT NULL,
  `PersonName` varchar(45) DEFAULT NULL,
  `Email` varchar(45) DEFAULT NULL,
  `Phone` varchar(45) DEFAULT NULL,
  `ThemeID` int(11) DEFAULT NULL,
  `PicID` int(11) DEFAULT NULL,
  PRIMARY KEY (`PersonID`),
  KEY `RoleID_idx` (`RoleID`),
  KEY `ThemeID_idx` (`ThemeID`),
  KEY `PicsID_idx` (`PicID`),
  CONSTRAINT `PicsID` FOREIGN KEY (`PicID`) REFERENCES `picsTable` (`PicID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `RoleID` FOREIGN KEY (`RoleID`) REFERENCES `roleTable` (`RoleID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ThemeID` FOREIGN KEY (`ThemeID`) REFERENCES `applicationStateTable` (`ThemeID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

CREATE TABLE `opportunityTable` (
  `OpportunityID` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(45) DEFAULT 'Default Title',
  `Description` varchar(45) DEFAULT 'Default Title Description',
  `StartDate` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `EndDate` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `CreateDate` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `ClassID` int(11) DEFAULT '490',
  `TotalSeats` int(11) DEFAULT '0',
  `OwnerID` int(11) DEFAULT NULL,
  `StatusID` varchar(45) DEFAULT 'Inactive',
  `Notes` varchar(45) DEFAULT 'this is notes',
  `Pay` smallint(6) DEFAULT '0',
  `Donation` smallint(6) DEFAULT '0',
  `IsPaid` binary(2) DEFAULT '0\0',
  `IsServiceLearining` binary(2) DEFAULT '0\0',
  `IsRecurrent` binary(2) DEFAULT '0\0',
  `IsVirtual` binary(2) DEFAULT '0\0',
  `Duration` binary(2) DEFAULT '0\0',
  `TimePeriodStart` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `TimePeriodEnd` datetime(6) DEFAULT CURRENT_TIMESTAMP(6),
  `Location` varchar(45) DEFAULT NULL,
  `Longitude` varchar(45) DEFAULT NULL,
  `Latitude` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`OpportunityID`),
  KEY `ClassID` (`ClassID`),
  KEY `OwnerID_idx` (`OwnerID`),
  CONSTRAINT `ClassID` FOREIGN KEY (`ClassID`) REFERENCES `collegeClassTable` (`ClassID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `OwnerID` FOREIGN KEY (`OwnerID`) REFERENCES `personTable` (`PersonID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

CREATE TABLE `filledSeatTable` (
  `OppertunityID` int(11) NOT NULL DEFAULT '0',
  `PersonID` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`OppertunityID`,`PersonID`),
  KEY `PersonID_idx` (`PersonID`),
  CONSTRAINT `OppertuntiyID` FOREIGN KEY (`OppertunityID`) REFERENCES `opportunityTable` (`OpportunityID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `PersonID` FOREIGN KEY (`PersonID`) REFERENCES `personTable` (`PersonID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `sysdiagrams` (
  `name` varchar(160) NOT NULL,
  `principal_id` int(11) NOT NULL,
  `diagram_id` int(11) NOT NULL AUTO_INCREMENT,
  `version` int(11) DEFAULT NULL,
  `definition` longblob,
  PRIMARY KEY (`diagram_id`),
  UNIQUE KEY `UK_principal_name` (`principal_id`,`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddClass`(in ClassID_v int,in ClassName_v varchar(45))
BEGIN
INSERT INTO eLeapData.collegeClassTable
(ClassID,
ClassName)
VALUES
(ClassID_v,
ClassName_v);
SELECT * from eLeapData.collegeClassTable Where eLeapData.collegeClassTable.ClassID =( SELECT LAST_INSERT_ID());
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddOpp`(
in Title_v varchar(45),
in Description_v varchar(45),
in StartDate_v datetime, 
in EndDate_v datetime,
in CreateDate_v datetime,
in ClassID_v int,
in TotalSeats_v int,
in OwnerID_v int,
in StatusID_v int,
in Notes_v varchar(45),
in Pay_v smallint,
in Donation_v smallint, 
in IsPaid_v binary,
in IsServiceLearining_v binary,
in IsRecurrent_v binary,
in IsVirtual_v binary,
in Duration_v int,
in TimePeriodStart_v datetime,
in TimePeriodEnd_v datetime,
in Location_v varchar(45),
in Longitude_v varchar(45),
in Latitude_v varchar(45)
)
BEGIN
declare lastid int;
INSERT INTO eLeapData.opportunityTable
(Title,
Description,
StartDate,
EndDate,
CreateDate,
ClassID,
TotalSeats,
OwnerID,
StatusID,
Notes,
Pay,
Donation,
IsPaid,
IsServiceLearining,
IsRecurrent,
IsVirtual,
Duration,
TimePeriodStart,
TimePeriodEnd,
Location,
Longitude,
Latitude)
VALUES
(Title_v,
Description_v,
StartDate_v,
EndDate_v,
CreateDate_v,
ClassID_v,
TotalSeats_v,
OwnerID_v,
StatusID_v,
Notes_v,
Pay_v,
Donation_v,
IsPaid_v,
IsServiceLearining_v,
IsRecurrent_v,
IsVirtual_v,
Duration_v,
TimePeriodStart_v,
TimePeriodEnd_v,
Location_v,
Longitude_v,
Latitude_v);
SELECT * from eLeapData.opportunityTable Where eLeapData.opportunityTable.OpportunityID =LAST_INSERT_ID();
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddPer`(
in RoleID_v int,
in PersonName_v varchar(45),
in Email_v varchar(45),
in Phone_v varchar(45),
in ThemeID_v int,
in PicID_v int
)
BEGIN
INSERT INTO eLeapData.personTable
(
RoleID,
PersonName,
Email,
Phone,
ThemeID,
PicID)
VALUES
(
RoleID_v,
PersonName_v,
Email_v,
Phone_v,
ThemeID_v,
PicID_v
);
SELECT * FROM eLeapData.personTable where eLeapData.personTable.PersonID = last_insert_id();
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddPics`(in PicURL_v varchar(45))
BEGIN
INSERT INTO eLeapData.picsTable
(
PicURL
)
VALUES
(
PicURL_v
);
SELECT * from eLeapData.picsTable Where eLeapData.picsTable.PicID =LAST_INSERT_ID();
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddRole`(in RoleName_v varchar(45),in RoleDescription_v varchar(45))
BEGIN
INSERT INTO roleTable(
	roleName,
    RoleDescription
)
values(
RoleName_v,
RoleDescription_v
);
SELECT * from eLeapData.roleTable Where eLeapData.roleTable.RoleID =LAST_INSERT_ID();
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddState`(in ThemeData_v varchar(45),in ThemeDecription_v varchar(45))
BEGIN
INSERT INTO `eLeapData`.`applicationStateTable`
(
`ThemeData`,
`ThemeDecription`)
VALUES
(ThemeData_v,
ThemeDecription_v);

END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAllClass`()
BEGIN
SELECT *
FROM `eLeapData`.`collegeClassTable`;

END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAllOpp`()
BEGIN
Select * from eLeapData.opportunityTable;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAllPer`()
BEGIN
Select * from eLeapData.personTable;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAllPics`()
BEGIN
SELECT * FROM `eLeapData`.`picsTable`;

END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAllRole`()
BEGIN
select * from eLeapData.roleTable;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAllState`()
BEGIN
SELECT * FROM `eLeapData`.`applicationStateTable`;

END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocFilledSeatCount`(in oppid int, out count int)
BEGIN
SELECT COUNT(*) FROM eLeapData.filledSeatTable
WHERE eLeapData.opportunityTable.OpportunityID = oppid;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocFindPer`(in UserName varchar(45))
BEGIN
SELECT * FROM eLeapData.personTable
WHERE eLeapData.personTable.PersonName = UserName;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocFindPersonName`(in UserName varchar(45))
BEGIN
SELECT * FROM eLeapData.personTable
WHERE eLeapData.personTable.PersonName = UserName;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocRoleFind`(in roleName varchar(45))
BEGIN
select * from eLeapData.roleTable
where eLeapData.roleTable.RoleName = roleName;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `statusproc`()
BEGIN
select oppertunitytable.status from eLeapData.opportunitytable
where oppertuntiytable.status = @value;
END$$
DELIMITER ;
