CREATE DATABASE `eLeapData` /*!40100 DEFAULT CHARACTER SET latin1 */;
/*this is the Create statements for the table*/
USE `eLeapData`;
CREATE TABLE `achievementTable` (
    `achievementID` INT(11) NOT NULL AUTO_INCREMENT,
    `achievementName` VARCHAR(45) DEFAULT NULL,
    `achievementDescription` VARCHAR(45) DEFAULT NULL,
    PRIMARY KEY (`achievementID`)
)  ENGINE=INNODB DEFAULT CHARSET=LATIN1;

CREATE TABLE `applicationStateTable` (
    `themeId` INT(11) NOT NULL AUTO_INCREMENT,
    `themeData` VARCHAR(45) DEFAULT NULL,
    `themeDecription` VARCHAR(45) DEFAULT NULL,
    PRIMARY KEY (`themeId`)
)  ENGINE=INNODB DEFAULT CHARSET=LATIN1;

CREATE TABLE `collegeClassTable` (
    `classId` INT(11) NOT NULL AUTO_INCREMENT,
    `className` VARCHAR(2000) NOT NULL,
    `courseSummary` VARCHAR(2000) DEFAULT NULL,
    `classType` VARCHAR(2000) DEFAULT NULL,
    `estimatedClassSize` INT(11) DEFAULT NULL,
    `ownerId` INT(11) DEFAULT NULL,
    `year` INT(11) DEFAULT NULL,
    `section` VARCHAR(2000) DEFAULT NULL,
    `term` VARCHAR(2000) DEFAULT NULL,
    PRIMARY KEY (`classId`)
)  ENGINE=INNODB AUTO_INCREMENT=44 DEFAULT CHARSET=LATIN1;

CREATE TABLE `communityPersonTable` (
    `communityId` INT(11) NOT NULL,
    `personId` INT(11) NOT NULL,
    PRIMARY KEY (`communityId` , `personId`)
)  ENGINE=INNODB DEFAULT CHARSET=LATIN1;

CREATE TABLE `communityTable` (
    `communityId` INT(11) NOT NULL AUTO_INCREMENT,
    `communityName` VARCHAR(45) NOT NULL,
    `address` VARCHAR(45) DEFAULT NULL,
    `contactEmail` VARCHAR(45) DEFAULT NULL,
    `PicURL` VARCHAR(1000) DEFAULT NULL,
    PRIMARY KEY (`communityId`)
)  ENGINE=INNODB DEFAULT CHARSET=LATIN1;

CREATE TABLE `filledSeatTable` (
    `opportunityId` INT(11) NOT NULL,
    `personId` INT(11) NOT NULL,
    PRIMARY KEY (`opportunityId` , `personId`),
    KEY `PersonId_idx` (`personId`),
    CONSTRAINT `OppId` FOREIGN KEY (`opportunityId`)
        REFERENCES `opportunityTable` (`opportunityId`)
        ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `PersonId` FOREIGN KEY (`personId`)
        REFERENCES `personTable` (`personId`)
        ON DELETE NO ACTION ON UPDATE NO ACTION
)  ENGINE=INNODB DEFAULT CHARSET=LATIN1;

CREATE TABLE `logTable` (
    `logID` INT(11) NOT NULL,
    `logDetails` VARCHAR(45) DEFAULT NULL,
    `logDate` DATETIME(6) DEFAULT NULL,
    PRIMARY KEY (`logID`)
)  ENGINE=INNODB DEFAULT CHARSET=LATIN1;

CREATE TABLE `opportunityTable` (
    `opportunityId` INT(11) NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL DEFAULT 'Default Title',
    `description` VARCHAR(2000) DEFAULT 'Default Description',
    `startDateTime` DATETIME(6) DEFAULT CURRENT_TIMESTAMP (6),
    `endDateTime` DATETIME(6) DEFAULT CURRENT_TIMESTAMP (6),
    `createDate` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP (6),
    `className` VARCHAR(2000) DEFAULT '0',
    `totalSeats` INT(11) DEFAULT NULL,
    `ownerId` INT(11) NOT NULL DEFAULT '3',
    `status` VARCHAR(2000) DEFAULT 'Pending',
    `notes` VARCHAR(2000) DEFAULT NULL,
    `pay` INT(11) DEFAULT '0',
    `donation` INT(11) DEFAULT NULL,
    `isPaid` TINYINT(1) UNSIGNED ZEROFILL DEFAULT '0',
    `isServiceLearning` TINYINT(1) UNSIGNED ZEROFILL DEFAULT '0',
    `recurrence` VARCHAR(2000) DEFAULT NULL,
    `isVirtual` TINYINT(1) UNSIGNED ZEROFILL DEFAULT '0',
    `duration` INT(11) DEFAULT '0',
    `timePeriodStartDate` DATETIME(6) DEFAULT NULL,
    `timePeriodEndDate` DATETIME(6) DEFAULT NULL,
    `location` VARCHAR(2000) DEFAULT NULL,
    `longitude` VARCHAR(2000) DEFAULT NULL,
    `latitude` VARCHAR(2000) DEFAULT NULL,
    `isClass` TINYINT(1) UNSIGNED ZEROFILL DEFAULT '0',
    `applicationDueDate` DATETIME(6) DEFAULT NULL,
    `isRequiredForClass` TINYINT(1) UNSIGNED ZEROFILL DEFAULT '0',
    `opportunityType` VARCHAR(2000) DEFAULT NULL,
    `supportPreference` VARCHAR(2000) DEFAULT NULL,
    `onBoarding` VARCHAR(2000) DEFAULT NULL,
    `minimumPersonsRequired` INT(11) DEFAULT '0',
    `isTeams` TINYINT(1) UNSIGNED ZEROFILL DEFAULT '0',
    `teamSize` INT(11) DEFAULT '0',
    `hoursRequired` INT(11) DEFAULT '0',
    `preferredServiceWorkType` VARCHAR(2000) DEFAULT NULL,
    `preferredAgencyType` VARCHAR(2000) DEFAULT NULL,
    `numberOfTeams` INT(11) DEFAULT '0',
    `examples` VARCHAR(2000) DEFAULT NULL,
    `deliverables` VARCHAR(2000) DEFAULT NULL,
    `agencyCommitment` VARCHAR(2000) DEFAULT NULL,
    `notAllowed` VARCHAR(2000) DEFAULT NULL,
    `requirements` VARCHAR(2000) DEFAULT NULL,
    `supportDescription` VARCHAR(2000) DEFAULT NULL,
    `lastModified` DATETIME DEFAULT NULL,
    `classId` INT(11) DEFAULT NULL,
    PRIMARY KEY (`opportunityId`),
    UNIQUE KEY `opportunityId_UNIQUE` (`opportunityId`)
)  ENGINE=INNODB AUTO_INCREMENT=158 DEFAULT CHARSET=LATIN1;

CREATE TABLE `personTable` (
    `personId` INT(11) NOT NULL AUTO_INCREMENT,
    `roleId` INT(11) NOT NULL DEFAULT '1',
    `personName` VARCHAR(45) DEFAULT NULL,
    `email` VARCHAR(45) NOT NULL,
    `phone` VARCHAR(45) DEFAULT NULL,
    `themeId` INT(11) DEFAULT NULL,
    `picURL` VARCHAR(1000) DEFAULT NULL,
    `credential` VARCHAR(80) DEFAULT NULL,
    PRIMARY KEY (`personId`),
    UNIQUE KEY `personId_UNIQUE` (`personId`),
    UNIQUE KEY `Email_UNIQUE` (`email`),
    KEY `picId_idx` (`picURL` (767)),
    KEY `roleId_idx` (`roleId`)
)  ENGINE=INNODB AUTO_INCREMENT=147 DEFAULT CHARSET=LATIN1;

CREATE TABLE `picsTable` (
    `picId` INT(11) NOT NULL,
    `picURL` VARCHAR(45) DEFAULT NULL,
    PRIMARY KEY (`picId`)
)  ENGINE=INNODB DEFAULT CHARSET=LATIN1;

CREATE TABLE `roleTable` (
    `roleId` INT(11) NOT NULL,
    `roleName` VARCHAR(45) DEFAULT NULL,
    `roleDescription` VARCHAR(45) DEFAULT NULL,
    `verificationCode` VARCHAR(45) DEFAULT NULL,
    PRIMARY KEY (`roleId`)
)  ENGINE=INNODB DEFAULT CHARSET=LATIN1;

CREATE TABLE `studentTable` (
    `classId` INT(11) NOT NULL,
    `personId` INT(11) DEFAULT NULL,
    `email` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`classId` , `email`)
)  ENGINE=INNODB DEFAULT CHARSET=LATIN1;

CREATE TABLE `sysdiagrams` (
    `name` VARCHAR(160) NOT NULL,
    `principal_id` INT(11) NOT NULL,
    `diagram_id` INT(11) NOT NULL AUTO_INCREMENT,
    `version` INT(11) DEFAULT NULL,
    `definition` LONGBLOB,
    PRIMARY KEY (`diagram_id`),
    UNIQUE KEY `UK_principal_name` (`principal_id` , `name`)
)  ENGINE=INNODB DEFAULT CHARSET=LATIN1;
/*this is the view create statments*/
CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `eLeapisit`@`%` 
    SQL SECURITY DEFINER
VIEW `community` AS
    SELECT 
        `com`.`communityId` AS `communityId`,
        `com`.`communityName` AS `communityName`,
        `com`.`address` AS `address`,
        `com`.`contactEmail` AS `contactEmail`,
        `com`.`PicURL` AS `PicURL`,
        COUNT(`per`.`personId`) AS `peopleInCommunity`
    FROM
        (`communityTable` `com`
        LEFT JOIN `communityPersonTable` `per` ON ((`per`.`communityId` = `com`.`communityId`)))
    GROUP BY `com`.`communityId`;

CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `eLeapisit`@`%` 
    SQL SECURITY DEFINER
VIEW `opportunity` AS
    SELECT 
        `opp`.`opportunityId` AS `opportunityId`,
        `opp`.`agencyCommitment` AS `agencyCommitment`,
        `opp`.`applicationDueDate` AS `applicationDueDate`,
        (`opp`.`totalSeats` - COUNT(`fill`.`personId`)) AS `availableSeats`,
        `cla`.`classId` AS `classId`,
        `cla`.`className` AS `className`,
        `cla`.`classType` AS `classType`,
        `cla`.`year` AS `classYear`,
        `cla`.`courseSummary` AS `courseSummary`,
        `opp`.`createDate` AS `createDate`,
        `opp`.`deliverables` AS `deliverables`,
        `opp`.`description` AS `description`,
        `opp`.`donation` AS `donation`,
        `opp`.`duration` AS `duration`,
        `opp`.`endDateTime` AS `endDateTime`,
        `cla`.`estimatedClassSize` AS `estimatedClassSize`,
        `opp`.`examples` AS `examples`,
        `opp`.`hoursRequired` AS `hoursRequired`,
        `opp`.`isClass` AS `isClass`,
        `opp`.`isPaid` AS `isPaid`,
        `opp`.`isRequiredForClass` AS `isRequiredForClass`,
        `opp`.`isServiceLearning` AS `isServiceLearning`,
        `opp`.`isTeams` AS `isTeams`,
        `opp`.`isVirtual` AS `isVirtual`,
        `opp`.`lastModified` AS `lastModified`,
        `opp`.`latitude` AS `latitude`,
        `opp`.`location` AS `location`,
        `opp`.`longitude` AS `longitude`,
        `opp`.`minimumPersonsRequired` AS `minimumPersonsRequired`,
        `opp`.`notAllowed` AS `notAllowed`,
        `opp`.`notes` AS `notes`,
        `opp`.`numberOfTeams` AS `numberOfTeams`,
        `opp`.`onBoarding` AS `onBoarding`,
        `opp`.`opportunityType` AS `opportunityType`,
        `opp`.`ownerId` AS `ownerId`,
        `opp`.`pay` AS `payAmount`,
        `per`.`personName` AS `ownerName`,
        `opp`.`preferredAgencyType` AS `preferredAgencyType`,
        `opp`.`preferredServiceWorkType` AS `preferredServiceWorkType`,
        `opp`.`recurrence` AS `recurrence`,
        `opp`.`requirements` AS `requirements`,
        `cla`.`section` AS `section`,
        `opp`.`startDateTime` AS `startDateTime`,
        `opp`.`status` AS `status`,
        `opp`.`supportDescription` AS `supportDescription`,
        `opp`.`supportPreference` AS `supportPreference`,
        `opp`.`teamSize` AS `teamSize`,
        `cla`.`term` AS `term`,
        `opp`.`timePeriodStartDate` AS `timePeriodStartDate`,
        `opp`.`timePeriodEndDate` AS `timePeriodEndDate`,
        `opp`.`title` AS `title`,
        `opp`.`totalSeats` AS `totalSeats`
    FROM
        (((`opportunityTable` `opp`
        JOIN `personTable` `per` ON ((`opp`.`ownerId` = `per`.`personId`)))
        LEFT JOIN `collegeClassTable` `cla` ON ((`opp`.`classId` = `cla`.`classId`)))
        LEFT JOIN `filledSeatTable` `fill` ON ((`fill`.`opportunityId` = `opp`.`opportunityId`)))
    GROUP BY `opp`.`opportunityId`;
/*these are the stored procedure*/
DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddClass`(in className_v varchar(2000),
in courseSummary_v varchar(2000), in classType_v varchar(2000), in estimatedClassSize_v int, 
in ownerId_v int, in section_v varchar(2000), in term_v varchar(2000), in year_v int)
BEGIN
 DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS 'invalid';
    ROLLBACK;
    END;
START TRANSACTION;
INSERT INTO `eLeapData`.`collegeClassTable`(
`className`,
`courseSummary`,
`classType`,
`estimatedClassSize`,
`ownerId`,
`section`,
`term`,
`year`)
VALUES
(className_v,
courseSummary_v,
classType_v,
estimatedClassSize_v,
ownerId_v,
section_v,
term_v,
year_v);

SELECT 'success' AS 'status';
SELECT 
    *
FROM
    eLeapData.collegeClassTable
WHERE
    eLeapData.collegeClassTable.classId = (SELECT LAST_INSERT_ID());

COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddCom`(
in address_v varchar(45),
in communityName_v varchar(45),
in contactEmail_v varchar(45),
in PicURL_v varchar(1000))
BEGIN
    DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
    SELECT errno AS MYSQL_ERROR;
    ROLLBACK;
    END;
	START TRANSACTION;
    select 'success' as 'status';
INSERT INTO `eLeapData`.`communityTable`
(
`address`,
`communityName`,
`contactEmail`,
`PicURL`)
VALUES
(address_v,
communityName_v,
contactEmail_v,
PicURL_v);
SELECT * from eLeapData.communityTable where communityTable.commmunityId = LAST_INSERT_ID(); 
commit;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddOpp`(
in agencyCommitment_v varchar(2000),
in applicationDueDate_v datetime(6),
in classId_v int,
in createDate_v datetime(6),
in deliverables_v varchar(2000),
in description_v varchar(2000),
in donation_v int, 
in duration_v int,
in endDateTime_v datetime(6),
in examples_v varchar(2000),
in hoursRequired_v int,
in isClass_v tinyint(1),
in isRequiredForClass_v tinyint(1),
in isPaid_v tinyint(1),
in isServiceLearning_v tinyint(1),
in isTeams_v tinyint(1),
in isVirtual_v tinyint(1),
in lastModified_v datetime(6),
in latitude_v varchar(2000),
in location_v varchar(2000),
in longitude_v varchar(2000),
in minimumPersonsRequired_v int,
in notAllowed_v varchar(2000),
in notes_v varchar(2000),
in numberOfTeams_v int,
in onBoarding_v varchar(2000),
in opportunityType_v varchar(2000),
in ownerId_v int,
in pay_v int,
in preferredAgencyType_v varchar(2000),
in preferredServiceWorkType_v varchar(2000),
in recurrence_v varchar(2000),
in requirements_v varchar(2000),
in startDateTime_v datetime(6),
in status_v varchar(2000),
in supportDescription_v varchar(2000),
in supportPreference_v varchar(2000),
in teamSize_v int,
in timePeriodEndDate_v datetime(6),
in timePeriodStartDate_v datetime(6),
in title_v varchar(200),
in totalSeats_v int
)
BEGIN

DECLARE errno INT;
DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS MYSQL_ERROR;
ROLLBACK;
END;
START TRANSACTION;
SELECT 'success' AS 'status';
INSERT INTO eLeapData.opportunityTable(
    title,
	description,
	startDateTime,
	endDateTime,
    classId,
	createDate,
	totalSeats,
	ownerId,
	`status`,
	notes,
	pay,
	donation,
	isPaid,
	isServiceLearning,
	recurrence,
	isVirtual,
	duration,
	timePeriodStartDate,
	timePeriodEndDate,
	location,
	longitude,
	latitude,
	isClass,
	applicationDueDate,
	isRequiredForClass,
	opportunityType,
	supportPreference,
	onBoarding,
	minimumPersonsRequired,
	isTeams,
	teamSize,
	hoursRequired,
	preferredServiceWorkType,
	preferredAgencyType,
	numberOfTeams,
	examples,
	deliverables,
	agencyCommitment,
	notAllowed,
	requirements,
	supportDescription,
    lastModified)
	values
	(title_v,
	description_v,
	startDateTime_v,
	endDateTime_v,
    classId_v,
	createDate_v,
	totalSeats_v,
	ownerId_v,
	status_v,
	notes_v,
	pay_v,
	donation_v,
	isPaid_v,
	isServiceLearning_v,
	recurrence_v,
	isVirtual_v,
	duration_v,
	timePeriodStartDate_v,
	timePeriodEndDate_v,
	location_v,
	longitude_v,
	latitude_v,
    isClass_v,
	applicationDueDate_v,
	isRequiredForClass_v,
	opportunityType_v,
	supportPreference_v,
	onBoarding_v,
	minimumPersonsRequired_v,
	isTeams_v,
	teamSize_v,
	hoursRequired_v,
	preferredServiceWorkType_v,
	preferredAgencyType_v,
	numberOfTeams_v,
	examples_v,
	deliverables_v,
	agencyCommitment_v,
	notAllowed_v,
	requirements_v,
	supportDescription_v,
    lastModified_v
    );

SELECT 
    totalSeats AS 'availableSeats',
    opportunityTable.*,
    collegeClassTable.*
FROM
    eLeapData.opportunityTable
        LEFT JOIN
    eLeapData.collegeClassTable ON opportunityTable.classId = collegeClassTable.classId
WHERE
    eLeapData.opportunityTable.opportunityId = LAST_INSERT_ID(); 
    
   COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddPer`(
in password_v varchar(80),
in email_v varchar(45),
in personName_v varchar(45),
in phone_v varchar(45),
in picURL_v varchar(1000),
in roleId_v int
)
BEGIN
	DECLARE personIdValue int;

    DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS CanNotInsert;
    ROLLBACK;
    END;
	START TRANSACTION;
  
	INSERT INTO eLeapData.personTable
	(
	roleId,
	personName,
	email,
	phone,
    credential,
    picURL)
	VALUES
	(
	roleId_v,
	personName_v,
	email_v,
	phone_v,
    password_v,
    picURL_v
	);
SELECT 'success' AS 'status';
SELECT 
    *
FROM
    eLeapData.personTable
WHERE
    eLeapData.personTable.personId = LAST_INSERT_ID();
    
    /*checking for existing email in students table*/
SET personIdValue = (SELECT personId FROM eLeapData.personTable
WHERE LOWER(eLeapData.personTable.email) = LOWER(email_v));
IF (personIdValue > 0) THEN
	UPDATE `eLeapData`.`studentTable`
	SET
	`personId` = personIdValue,
	`email` = email_v
	WHERE  `email` = email_v;
end IF;
COMMIT;

END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddPics`(in picURL_v varchar(45))
BEGIN
DECLARE errno INT;
DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS MYSQL_ERROR;
ROLLBACK;
END;
START TRANSACTION;
INSERT INTO eLeapData.picsTable
(
picURL
)
VALUES
(
picURL_v
);
SELECT * from eLeapData.picsTable Where eLeapData.picsTable.picID =LAST_INSERT_ID();
commit;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddRole`(in verificationCode_v varchar(45),in RoleID_v int,in RoleName_v varchar(45),in RoleDescription_v varchar(45))
BEGIN
DECLARE errno INT;
DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS MYSQL_ERROR;
ROLLBACK;
END;
START TRANSACTION;
INSERT INTO roleTable(
	RoleID,
	roleName,
    RoleDescription,
    varificationCode
)
values(
RoleID_v,
RoleName_v,
RoleDescription_v,
verificationCode
);
SELECT * from eLeapData.roleTable Where eLeapData.roleTable.RoleID =LAST_INSERT_ID();
COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddState`(in ThemeData_v varchar(45),in ThemeDecription_v varchar(45))
BEGIN
DECLARE errno INT;
DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS MYSQL_ERROR;
ROLLBACK;
END;
START TRANSACTION;
INSERT INTO `eLeapData`.`applicationStateTable`
(
`ThemeData`,
`ThemeDecription`)
VALUES
(ThemeData_v,
ThemeDecription_v);
COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddStudent`(in classId_v int, in email_v varchar(45))
BEGIN
DECLARE perId int DEFAULT null;
 DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS 'invalid';
    ROLLBACK;
    END;
START TRANSACTION;

SET perId = (SELECT personId FROM personTable WHERE LOWER(personTable.email) = LOWER(email_v));

IF (!perId)THEN SET perId = null;
end if;

INSERT INTO `eLeapData`.`studentTable`
(`classId`,
`personId`,
`email`)
VALUES
(classId_v,
perId,
email_v);
SELECT 'success' AS 'status';
SELECT 
    *
FROM
    eLeapData.studentTable
WHERE
    studentTable.classId = classId_v
        AND studentTable.email = email_v;
commit;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAllClass`()
BEGIN
DECLARE errno INT;
DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS MYSQL_ERROR;
ROLLBACK;
END;
START TRANSACTION;
SELECT *
FROM `eLeapData`.`collegeClassTable`;
COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAllCom`()
BEGIN
DECLARE errno INT;
DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS MYSQL_ERROR;
ROLLBACK;
END;
START TRANSACTION;
SELECT `communityPersonTable`.`communityId`,
    `communityPersonTable`.`personId`
FROM `eLeapData`.`communityPersonTable`;
COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAllJoinClass`(in studentId_v int)
BEGIN
DECLARE perVar int DEFAULT null;
 DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS 'invalid';
    ROLLBACK;
    END;
START TRANSACTION;

SELECT 'success' AS 'status';
SELECT 
    collegeClassTable.*,studentTable.*,personTable.personName AS 'ownerName'
FROM
    eLeapData.collegeClassTable
	LEFT JOIN
    eLeapData.studentTable ON collegeClassTable.classId = studentTable.classId
    LEFT join 
    eLeapData.personTable ON collegeClassTable.ownerId = personTable.personId
WHERE
    studentTable.personId = studentId_v;
COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAllOpp`()
BEGIN
DECLARE errno INT;
DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS MYSQL_ERROR;
ROLLBACK;
END;
START TRANSACTION;

/*Select * from eLeapData.opportunityTable;*/
SELECT * FROM eLeapData.opportunity;
SELECT 'success' AS 'status';
COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAllOwnClass`(in ownerId_v int)
BEGIN

DECLARE errno INT;
DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS MYSQL_ERROR;
ROLLBACK;
END;
START TRANSACTION;
SELECT * FROM `eLeapData`.`collegeClassTable` WHERE ownerId = ownerId_v; 
SELECT 'success' AS 'status';
COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAllPer`()
BEGIN
DECLARE errno INT;
DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS MYSQL_ERROR;
ROLLBACK;
END;
START TRANSACTION;
Select * from eLeapData.personTable;
SELECT 'success' AS 'status';
COMMIT;
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
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAllStudent`(in studentId int)
BEGIN
DECLARE errno INT;
DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS MYSQL_ERROR;
ROLLBACK;
END;
START TRANSACTION;
SELECT * FROM eLeapData.studentTable WHERE studentTable.personId = studentId;
SELECT 'success' as 'status';
COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAllStudentInClass`(in classId_v int)
BEGIN
DECLARE perVar int DEFAULT null;
 DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS 'invalid';
    ROLLBACK;
    END;
START TRANSACTION;

SELECT * FROM eLeapData.studentTable where studentTable.classId = classId_v;
SELECT 'success'AS'status';
COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocDeleteClass`(in classId_v int)
BEGIN
 DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS 'invalid';
    ROLLBACK;
    END;
START TRANSACTION;
SELECT 'success' as 'status';
DELETE from eLeapData.studentTable
where (studentTable.classId = classId_v);
DELETE FROM `eLeapData`.`collegeClassTable`
WHERE collegeClassTable.classId = classId_v;

commit;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocDeleteCom`(in communityId_v int)
BEGIN
DECLARE errno INT;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
		SELECT errno AS MYSQL_ERROR;
		ROLLBACK;
	END;
START TRANSACTION;
select 'success' as 'status';
DELETE FROM `eLeapData`.`communityTable`
WHERE communityId_v;

commit;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocDeleteOpp`(in oppId int)
BEGIN
	DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
    SELECT errno AS MYSQL_ERROR;
    ROLLBACK;
    END;
	START TRANSACTION;
DELETE FROM eLeapData.filledSeatTable
WHERE filledSeatTable.opportunityId = oppId;
DELETE FROM eLeapData.opportunityTable
WHERE opportunityTable.opportunityId = oppId;

SELECT 'Success' AS 'valid';
commit;

END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocDeletePer`(in personId_v int)
BEGIN
 DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS 'invalid';
    ROLLBACK;
    END;
START TRANSACTION;

DELETE FROM eLeapData.personTable 
WHERE
    personTable.personId = personId_v;
SELECT 'success' AS 'status';
COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocDeleteStudent`(in classId_v int, in email_v varchar(45))
BEGIN
 DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS 'invalid';
    ROLLBACK;
    END;
START TRANSACTION;
DELETE from eLeapData.studentTable
where (studentTable.classId = classId_v and LOWER(studentTable.email) = LOWER(email_v));
/*select * from eLeapData.studentTable;*/
SELECT 'success' as 'status';
commit;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocFilledSeatCount`(in oppid_v int,out count_v int)
BEGIN
	DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS MYSQL_ERROR;
    ROLLBACK;
    END;
	START TRANSACTION;
SELECT 
    COUNT(filledSeatTable.opportunityId)
INTO count_v FROM
    eLeapData.opportunity
        JOIN
    eLeapData.filledSeatTable ON (opportunity.opportunityId = filledSeatTable.opportunityId)
WHERE
    eLeapData.filledSeatTable.opportunityId = oppid_v;
SELECT 'success' AS 'status';
COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocFindPer`(in email_v varchar(45))
BEGIN
	DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS MYSQL_ERROR;
    ROLLBACK;
    END;
	START TRANSACTION;
SELECT 
    IF(EXISTS( SELECT 
                *
            FROM
                eLeapData.personTable
            WHERE
                personTable.email = email_v),
        'valid',
        'invalid') AS loginStatus;
SELECT 
    *
FROM
    eLeapData.personTable
WHERE
    personTable.email = email_v;
COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocFindPerId`(in personId_v varchar(45))
BEGIN
	DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS MYSQL_ERROR;
    ROLLBACK;
    END;
	START TRANSACTION;
SELECT 
    IF(EXISTS( SELECT 
                *
            FROM
                eLeapData.personTable
            WHERE
                personTable.personId = personId_v),
        'success',
        'invalid') AS `status`;
SELECT 
    *
FROM
    eLeapData.personTable
WHERE
    personTable.personId = personId_v;
COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocFindPersonName`(in UserName varchar(45))
BEGIN
	DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS MYSQL_ERROR;
    ROLLBACK;
    END;
	START TRANSACTION;
SELECT 
    *
FROM
    eLeapData.personTable
WHERE
    eLeapData.personTable.PersonName = UserName;
COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocGetClassByOwnId`(in ownerId_v int)
BEGIN
 DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS 'invalid';
    ROLLBACK;
    END;
START TRANSACTION;
SELECT 
    *
FROM
    collegeClassTable
WHERE
    collegeClassTable.ownerId_v;
Commit;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocGetOppId`(in oppid_v int, in personId_v int)
BEGIN


DECLARE joinedCount int DEFAULT 0;
DECLARE personJoined tinyInt DEFAULT 0;
	DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS MYSQL_ERROR;
    ROLLBACK;
    END;
	START TRANSACTION;

SET joinedCount = (SELECT COUNT(filledSeatTable.opportunityId) FROM eLeapData.filledSeatTable
	WHERE filledSeatTable.opportunityId = oppid_v GROUP BY eLeapData.filledSeatTable.opportunityId);
IF(joinedCount IS NULL || joinedCount = 0) THEN
	/* none joined */
	SELECT 'success' AS 'status';
	SELECT 
    *, 0 AS 'availableSeats'
FROM
    eLeapData.opportunity
WHERE
    opportunity.opportunityId = oppid_v;
    
SELECT 0 AS 'personJoined';
ELSE
	SELECT 'success' AS 'status';
    /* calculated available seats*/
	SELECT 
    *,
    opportunity.totalSeats - COUNT(filledSeatTable.opportunityId) AS 'availableSeats'
FROM
    eLeapData.opportunity
        LEFT OUTER JOIN
    eLeapData.filledSeatTable ON opportunity.opportunityId = filledSeatTable.opportunityId
WHERE
    EXISTS( SELECT 
            *
        FROM
            filledSeatTable
        WHERE
            filledSeatTable.opportunityId = oppid_v)
        AND opportunity.opportunityId = oppid_v
GROUP BY filledSeatTable.opportunityId;
    
    /* is personId_v joined */
	SELECT 
    COUNT(filledSeatTable.opportunityId) AS 'personJoined'
FROM
    eLeapData.filledSeatTable
WHERE
    filledSeatTable.opportunityId = oppid_v
        AND filledSeatTable.personId = personId_v;
    
END IF;
COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocGetPer`(in Id_v varchar(45))
BEGIN
	DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS MYSQL_ERROR;
    ROLLBACK;
    END;
	START TRANSACTION;
SELECT 
    IF(EXISTS( SELECT 
                *
            FROM
                eLeapData.personTable
            WHERE
                LOWER(personTable.email) = LOWER(email_v)
                    AND personTable.credential = password_v),
        'Success',
        'Failed') AS loginStatus;

SELECT 
    *
FROM
    eLeapData.personTable
WHERE
    LOWER(personTable.email) = LOWER(email_v)
        AND personTable.credential = password_v;
COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocGetStudentsInClass`(in classId_v int)
BEGIN
	DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
    SELECT errno AS MYSQL_ERROR;
    ROLLBACK;
    END;
	START TRANSACTION;
SELECT 'success' as 'status';
SELECT * FROM studentTable WHERE studentTable.classId = classId_v;
COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocJoinCom`(in communityId_v INT,in personId_v INT)
BEGIN
 DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS 'invalid';
    ROLLBACK;
    END;
START TRANSACTION;
INSERT INTO `eLeapData`.`communityPersonTable`
(`communityId`,
`personId`)
VALUES
(communityId_v,personId_v);
SELECT 
    *
FROM
    eLeapData.communityPersonTable
WHERE
    communityPersonTable.personId = personId_v;
commit;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocJoinOpp`(in oppId int, in userId int)
BEGIN
 DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS 'invalid';
    ROLLBACK;
    END;
START TRANSACTION;
INSERT INTO eLeapData.filledSeatTable
(opportunityId,
personId)
VALUES
(oppId,
userId);
commit;
SELECT 
    *
FROM
    eLeapData.filledSeatTable
WHERE
    eLeapData.filledSeatTable.personId = userId;
commit;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocLeaveCom`(in comId int, in userId int)
BEGIN
    DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS MYSQL_ERROR;
    ROLLBACK;
    END;
	START TRANSACTION;
SELECT 'success' AS 'status';
  
DELETE FROM eLeapData.communityPersonTable 
WHERE
    communityId = comId
    AND personId = userId;
SELECT 
    *
FROM
    dbo.communityPersonTable;
commit;

END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocLeaveOpp`(in oppId int, in userId int)
BEGIN
    DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS MYSQL_ERROR;
    ROLLBACK;
    END;
	START TRANSACTION;
SELECT 'success' AS 'status';
  
DELETE FROM eLeapData.filledSeatTable 
WHERE
    opportunityId = oppId
    AND personId = userId;
SELECT 
    *
FROM
    eLeapData.filledSeatTable;
commit;

END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocMyJoinedCom`(in personId_v int)
BEGIN
    DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS MYSQL_ERROR;
    ROLLBACK;
    END;
	START TRANSACTION;
SELECT 
    *
FROM
    eLeapData.communityPersonTable per
        JOIN
    eLeapData.community com ON com.communityId = per.communityId
WHERE
    per.personId = personId_v;
commit;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocMyJoinedOpps`(in personId_v int)
BEGIN
    DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS MYSQL_ERROR;
    ROLLBACK;
    END;
	START TRANSACTION;
SELECT 'success' AS 'status';
SELECT 
    *
FROM
    eLeapData.filledSeatTable fill
        JOIN
    eLeapData.opportunity opp ON fill.opportunityId = opp.opportunityId
WHERE
    fill.personId = personId_v;
commit;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocMyOwnOpps`(in ownerId_v int)
BEGIN
    DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS MYSQL_ERROR;
    ROLLBACK;
    END;
	START TRANSACTION;
SELECT 'success' AS 'status';
	SELECT 
    *
FROM
    eLeapData.opportunity
WHERE
    opportunity.ownerId = ownerId_v;
    commit;
    END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocUpdateClass`(in classId_v int,in className_v varchar(2000),in classType_v varchar(2000),
in courseSummary_v varchar(2000), in estimatedClassSize_v int, 
in ownerId_v int, in section_v varchar(45), in term_v varchar(45), in year_v int)
BEGIN
DECLARE errno INT;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
		SELECT errno AS MYSQL_ERROR;
		ROLLBACK;
	END;
START TRANSACTION;
UPDATE `eLeapData`.`collegeClassTable` 
SET 
    `classId` = classId_v,
    `className` = className_v,
    `classType` = classType_v,
    `courseSummary` = courseSummary_v,
    `estimatedClassSize` = estimatedClassSize_v,
    `ownerId` = ownerId_v,
    `section` = section_v,
    `term` = term_v,
    `year` = year_v
WHERE
    `classId` = classId_v;
SELECT 'success' AS 'status';
SELECT 
    *
FROM
    eLeapData.collegeClassTable
WHERE
    collegeClassTable.classId = classId_v;
commit;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocUpdateCom`(
in address_v varchar(45),
in communityId_v int,
in communityName_v varchar(45),
in contactEmail_v varchar(45),
in PicURL_v varchar(1000))
BEGIN
	DECLARE errno INT;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
		SELECT errno AS MYSQL_ERROR;
		ROLLBACK;
	END;
START TRANSACTION;
SELECT 'success' AS 'status';
UPDATE `eLeapData`.`communityTable` 
SET 
    `communityId` = communityId_v,
    `communityName` = communityName_v,
    `address` = address_v,
    `contactEmail` = contactEmail_v,
    `PicURL` = PicURL_v
WHERE
    `communityId` = communityId_v;
SELECT 
    *
FROM
    communityTable
WHERE
    communityTable.communityId = communityId_v;
commit;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocUpdateOpp`(
in agencyCommitment_v varchar(2000),
in applicationDueDate_v datetime(6),
in classId_v int,
in createDate_v datetime(6),
in deliverables_v varchar(45),
in description_v varchar(2000),
in donation_v int,
in duration_v int,
in endDateTime_v datetime(6),
in examples_v varchar(2000),
in hoursRequired_v int,
in isClass_v tinyint(1),
in isRequiredForClass_v tinyint(1),
in isPaid_v tinyint(1),
in isServiceLearning_v tinyint(1),
in isTeams_v tinyint(1),
in isVirtual_v tinyint(1),
in lastModified_v datetime(6),
in latitude_v varchar(2000),
in location_v varchar(2000),
in longitude_v varchar(2000),
in minimumPersonsRequired_v int,
in notAllowed_v varchar(2000),
in notes_v varchar(2000),
in numberOfTeams_v int,
in onBoarding_v varchar(2000),
in oppId_v int,
in opportunityType_v varchar(2000),
in ownerId_v int,
in pay_v int,
in preferredAgencyType_v varchar(2000),
in preferredServiceWorkType_v varchar(2000),
in recurrence_v varchar(2000),
in requirements_v varchar(2000),
in startDateTime_v datetime(6),
in status_v varchar(2000),
in supportDescription_v varchar(2000),
in supportPreference_v varchar(2000),
in teamSize_v int,
in timePeriodEndDate_v datetime(6),
in timePeriodStartDate_v datetime(6),
in title_v varchar(2000),
in totalSeats_v	int)
BEGIN

	DECLARE errno INT;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
		SELECT errno AS MYSQL_ERROR;
		ROLLBACK;
	END;
START TRANSACTION;

UPDATE eLeapData.opportunityTable 
SET 
    agencyCommitment = agencyCommitment_v,
    applicationDueDate = applicationDueDate_v,
    classId = classId_v,
    createDate = createDate_v,
    deliverables = deliverables_v,
    description = description_v,
    donation = donation_v,
    duration = duration_v,
    endDateTime = endDateTime_v,
    examples = examples_v,
    hoursRequired = hoursRequired_v,
    isClass = isClass_v,
    isRequiredForClass = isRequiredForClass_v,
    isPaid = isPaid_v,
    isServiceLearning = isServiceLearning_v,
    isTeams = isTeams_v,
    isVirtual = isVirtual_v,
    lastModified = lastModified_v,
    latitude = latitude_v,
    location = location_v,
    longitude = longitude_v,
    minimumPersonsRequired = minimumPersonsRequired_v,
    notAllowed = notAllowed_v,
    notes = notes_v,
    numberOfTeams = numberOfTeams_v,
    onBoarding = onBoarding_v,
    opportunityType = opportunityType_v,
    ownerId = ownerId_v,
    pay = pay_v,
    preferredAgencyType = preferredAgencyType_v,
    preferredServiceWorkType = preferredServiceWorkType_v,
    recurrence = recurrence_v,
    requirements = requirements_v,
    startDateTime = startDateTime_v,
    `status` = status_v,
    supportDescription = supportDescription_v,
    supportPreference = supportPreference_v,
    teamSize = teamSize_v,
    timePeriodEndDate = timePeriodEndDate_v,
    timePeriodStartDate = timePeriodStartDate_v,
    title = title_v,
    totalSeats = totalSeats_v
WHERE
    opportunityId = oppId_v;
    
SELECT 'success' AS 'status';
SELECT 
    (totalSeats - COUNT(filledSeatTable.personId)) AS 'availableSeats',
    opportunityTable.*
FROM
    eLeapData.opportunityTable
        JOIN
    filledSeatTable ON ((filledSeatTable.opportunityId = opportunityTable.opportunityId))
WHERE
    eLeapData.opportunityTable.opportunityId = oppId_v;

COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocUpdatePer`(in credential_v varchar(80), in email_v varchar(45),
in personId_v int, in personName_v varchar(45), in phone_v varchar(45), in picURL_v varchar(1000), in roleId_v int, in themeId_v int)
BEGIN

	DECLARE personIdValue int;

	DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS 'invalid';
    ROLLBACK;
    END;
    start transaction;
    
UPDATE `eLeapData`.`personTable` 
SET 
    `personId` = personId_v,
    `roleId` = roleId_v,
    `personName` = personName_v,
    `email` = email_v,
    `phone` = phone_v,
    `themeId` = themeId_v,
    `picURL` = picURL_v,
    `credential` = credential_v
WHERE
    `personId` = personId_v;
SELECT 
    *
FROM
    eLeapData.personTable
WHERE
    eLeapData.personTable.personId = personId_v;
/*checking for adding to class*/
SET personIdValue = (SELECT personId FROM eLeapData.personTable
WHERE LOWER(eLeapData.personTable.email) = LOWER(email_v));
IF (personIdValue > 0) THEN
	UPDATE `eLeapData`.`studentTable`
	SET
	`personId` = personIdValue,
	`email` = email_v
	WHERE  `email` = email_v;
end IF;
    COMMIT;
END$$
DELIMITER ;
