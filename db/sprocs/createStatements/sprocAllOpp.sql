DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAllOpp`()
BEGIN
Select * from eLeapData.opportunityTable;
END$$
DELIMITER ;
