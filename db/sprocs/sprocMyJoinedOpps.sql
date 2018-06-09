DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocMyJoinedOpps`(in personId_v int)
BEGIN
    DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS MYSQL_ERROR;
    ROLLBACK;
    END;
	START TRANSACTION;
SELECT 'success' AS 'status';
SELECT 
    *
FROM
    eLeapData.filledSeatTable fill
        JOIN
    eLeapData.opportunity opp ON fill.opportunityId = opp.opportunityId
WHERE
    fill.personId = personId_v;
commit;
END$$
DELIMITER ;
