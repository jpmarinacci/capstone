DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocGetOppId`(in oppid_v int, in personId_v int)
BEGIN

DECLARE joinedCount int DEFAULT 0;

SELECT 'success' AS 'status'; /* Aren - please update this sproc to return this row - thanks*/

SET joinedCount = (SELECT COUNT(filledSeatTable.opportunityId) FROM eLeapData.filledSeatTable
	WHERE filledSeatTable.opportunityId = oppid_v GROUP BY eLeapData.filledSeatTable.opportunityId);
IF(joinedCount IS NULL) THEN
	SELECT * , 0 AS 'availableSeats' FROM eLeapData.opportunityTable 
	WHERE opportunityTable.opportunityId = oppid_v;
ELSE
	SELECT  * , opportunityTable.totalSeats-COUNT(filledSeatTable.opportunityId) AS 'availableSeats' FROM eLeapData.opportunityTable LEFT OUTER JOIN eLeapData.filledSeatTable ON opportunityTable.opportunityId = filledSeatTable.opportunityId
	WHERE EXISTS (SELECT * FROM filledSeatTable WHERE filledSeatTable.opportunityId = oppid_v)  AND opportunityTable.opportunityId = oppid_v
	GROUP BY filledSeatTable.opportunityId;
END IF;

/*SELECT * , opportunity.totalSeats-COUNT(filledSeatTable.opportunityId) AS 'availableSeats' FROM eLeapData.opportunity JOIN eLeapData.filledSeatTable ON opportunity.opportunityId = filledSeatTable.opportunityId
WHERE EXISTS (SELECT * FROM filledSeatTable WHERE filledSeatTable.opportunityId = oppid_v)  AND opportunity.opportunityId = oppid_v
GROUP BY filledSeatTable.opportunityId;
SELECT * ,0 AS 'availableSeats' FROM eLeapData.opportunity JOIN eLeapData.filledSeatTable ON opportunity.opportunityId = filledSeatTable.opportunityId
WHERE ((opportunity.totalSeats-COUNT(filledSeatTable.opportunityId))>1)  AND opportunity.opportunityId = oppid_v
GROUP BY opportunity.opportunityId;*/

END$$
DELIMITER ;
