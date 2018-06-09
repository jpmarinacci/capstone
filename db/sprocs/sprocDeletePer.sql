DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocDeletePer`(in personId_v int)
BEGIN
 DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS 'invalid';
    ROLLBACK;
    END;
START TRANSACTION;

DELETE FROM eLeapData.personTable 
WHERE
    personTable.personId = personId_v;
SELECT 'success' AS 'status';
COMMIT;
END$$
DELIMITER ;
