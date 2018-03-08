DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddClass`(in ClassID_v int,in ClassName_v varchar(45))
BEGIN
INSERT INTO `dbo`.`collegeClassTable`
(`ClassID`,
`ClassName`)
VALUES
(ClassID_v,
ClassName_v);

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
in TimePeriodEnd_v datetime)
BEGIN
INSERT INTO `dbo`.`opportunityTable`
(`Title`,
`Description`,
`StartDate`,
`EndDate`,
`CreateDate`,
`ClassID`,
`TotalSeats`,
`OwnerID`,
`StatusID`,
`Notes`,
`Pay`,
`Donation`,
`IsPaid`,
`IsServiceLearining`,
`IsRecurrent`,
`IsVirtual`,
`Duration`,
`TimePeriodStart`,
`TimePeriodEnd`)
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
TimePeriodEnd_v);

END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddPer`(
in RoleID_v int,
in Username_v varchar(45),
in Email_v varchar(45),
in Phone_v varchar(45),
in ThemeID_v int,
in PicID_v int)
BEGIN
INSERT INTO `dbo`.`personTable`
(
`RoleID`,
`Username`,
`Email`,
`Phone`,
`ThemeID`,
`PicID`)
VALUES
(
RoleID_v,
Username_v,
Email_v,
Phone_v,
ThemeID_v,
PicID_v);
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddPics`(in PicURL_v varchar(45))
BEGIN
INSERT INTO `dbo`.`picsTable`
(
`PicURL`)
VALUES
(
PicURL_v);

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
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddState`(in ThemeData_v varchar(45),in ThemeDecription_v varchar(45))
BEGIN
INSERT INTO `dbo`.`applicationStateTable`
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
FROM `dbo`.`collegeClassTable`;

END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAllOpp`()
BEGIN
Select * from dbo.opportunityTable;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAllPer`()
BEGIN
Select * from dbo.personTable;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAllPics`()
BEGIN
SELECT * FROM `dbo`.`picsTable`;

END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAllRole`()
BEGIN
select * from dbo.roleTable;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAllState`()
BEGIN
SELECT * FROM `dbo`.`applicationStateTable`;

END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocRoleFind`()
BEGIN
select * from dbo.roleTable
where dbo.roleTable.RoleName = @value;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `statusproc`()
BEGIN
select oppertunitytable.status from dbo.opportunitytable
where oppertuntiytable.status = @value;
END$$
DELIMITER ;
