DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocMyJoinedCom`(in personId_v int)
BEGIN
    DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS MYSQL_ERROR;
    ROLLBACK;
    END;
	START TRANSACTION;
SELECT 
    *
FROM
    eLeapData.communityPersonTable per
        JOIN
    eLeapData.community com ON com.communityId = per.communityId
WHERE
    per.personId = personId_v;
commit;
END$$
DELIMITER ;
