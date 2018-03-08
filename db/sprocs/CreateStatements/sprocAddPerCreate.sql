DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddPer`(
in RoleID_v int,
in Username_v varchar(45),
in Email_v varchar(45),
in Phone_v varchar(45),
in ThemeID_v int,
in PicID_v int)
BEGIN
INSERT INTO dbo.personTable
(
RoleID,
Username,
Email,
Phone,
ThemeID,
PicID)
VALUES
(
RoleID_v,
Username_v,
Email_v,
Phone_v,
ThemeID_v,
PicID_v);
SELECT * from dbo.PersonTable Where dbo.PersonTable.PersonID=( SELECT LAST_INSERT_ID());
END$$
DELIMITER ;
