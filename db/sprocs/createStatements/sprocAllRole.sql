DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAllRole`()
BEGIN
select * from eLeapData.roleTable;
END$$
DELIMITER ;
