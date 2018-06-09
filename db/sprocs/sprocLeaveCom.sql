DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocLeaveCom`(in comId int, in userId int)
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
  
DELETE FROM eLeapData.communityPersonTable 
WHERE
    communityId = comId
    AND personId = userId;
SELECT 
    *
FROM
    dbo.communityPersonTable;
commit;

END$$
DELIMITER ;
