DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocFilledSeatCount`(in oppid int, out count int)
BEGIN
SELECT COUNT(*) FROM eLeapData.filledSeatTable
WHERE eLeapData.opportunityTable.OpportunityID = oppid;
END$$
DELIMITER ;
