DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocDeleteOpp`(in oppId int)
BEGIN
	DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
    SELECT errno AS MYSQL_ERROR;
    ROLLBACK;
    END;
	START TRANSACTION;
DELETE FROM eLeapData.opportunityTable
WHERE opportunityTable.opportunityId = oppId;
DELETE FROM eLeapData.filledSeatTable
WHERE filledSeatTable.opportunityId = oppId;
SELECT "Success" AS 'valid';
commit;

END$$
DELIMITER ;
