DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocDeleteOpp`(in OppID int)
BEGIN
DELETE FROM dbo.opportunityTable
WHERE opportunityTable.OppertunityID = OppID;

END$$
DELIMITER ;
