DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocFindPersonName`(in UserName varchar(45))
BEGIN
SELECT * FROM eLeapData.personTable
WHERE eLeapData.personTable.PersonName = UserName;
END$$
DELIMITER ;
