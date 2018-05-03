DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAllPer`()
BEGIN
Select * from eLeapData.personTable;
END$$
DELIMITER ;
