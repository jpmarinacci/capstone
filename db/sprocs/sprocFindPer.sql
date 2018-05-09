DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocFindPer`(in email varchar(45))
BEGIN
SELECT * FROM eLeapData.personTable
WHERE eLeapData.personTable.email = email;
END$$
DELIMITER ;
