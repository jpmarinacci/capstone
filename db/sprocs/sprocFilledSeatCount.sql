DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocFilledSeatCount`(in oppid_v int,out count_v int)
BEGIN
SELECT COUNT(filledSeatTable.opportunityId) into count_v FROM eLeapData.opportunity JOIN eLeapData.filledSeatTable on (opportunity.opportunityId = filledSeatTable.opportunityId)
WHERE eLeapData.filledSeatTable.opportunityId = oppid_v;
END$$
DELIMITER ;
