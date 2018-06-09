DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocGetOppId`(in oppid_v int, in personId_v int)
BEGIN

DECLARE joinedCount int DEFAULT 0;
DECLARE personJoined tinyInt DEFAULT 0;


SET joinedCount = (SELECT COUNT(filledSeatTable.opportunityId) FROM eLeapData.filledSeatTable
	WHERE filledSeatTable.opportunityId = oppid_v GROUP BY eLeapData.filledSeatTable.opportunityId);
IF(joinedCount IS NULL || joinedCount = 0) THEN
	/* none joined */
	SELECT 'success' AS 'status';
	SELECT 
    *, 0 AS 'availableSeats'
FROM
    eLeapData.opportunity
WHERE
    opportunity.opportunityId = oppid_v;
    
SELECT 0 AS 'personJoined';
ELSE
	SELECT 'success' AS 'status';
    /* calculated available seats*/
	SELECT 
    *,
    opportunity.totalSeats - COUNT(filledSeatTable.opportunityId) AS 'availableSeats'
FROM
    eLeapData.opportunity
        LEFT OUTER JOIN
    eLeapData.filledSeatTable ON opportunity.opportunityId = filledSeatTable.opportunityId
WHERE
    EXISTS( SELECT 
            *
        FROM
            filledSeatTable
        WHERE
            filledSeatTable.opportunityId = oppid_v)
        AND opportunity.opportunityId = oppid_v
GROUP BY filledSeatTable.opportunityId;
    
    /* is personId_v joined */
	SELECT 
    COUNT(filledSeatTable.opportunityId) AS 'personJoined'
FROM
    eLeapData.filledSeatTable
WHERE
    filledSeatTable.opportunityId = oppid_v
        AND filledSeatTable.personId = personId_v;
    
END IF;

END$$
DELIMITER ;
