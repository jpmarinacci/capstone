DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocMyOwnOpps`(in ownerId_v int)
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
    eLeapData.opportunity
WHERE
    opportunity.ownerId = ownerId_v;
    commit;
    END$$
DELIMITER ;
