DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAllOpp`()
BEGIN
/*Select * from eLeapData.opportunityTable;*/
SELECT * FROM eLeapData.opportunity;
END$$
DELIMITER ;
