DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocGetClassByOwnId`(in ownerId_v int)
BEGIN
 DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS 'invalid';
    ROLLBACK;
    END;
START TRANSACTION;
SELECT 
    *
FROM
    collegeClassTable
WHERE
    collegeClassTable.ownerId_v;
Commit;
END$$
DELIMITER ;
