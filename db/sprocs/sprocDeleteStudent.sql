DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocDeleteStudent`(in classId_v int, in email_v varchar(45))
BEGIN
 DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS 'invalid';
    ROLLBACK;
    END;
START TRANSACTION;
DELETE FROM eLeapData.studentTable 
WHERE
    (studentTable.classId = classId_v
    AND LOWER(studentTable.email) = LOWER(email_v));
/*select * from eLeapData.studentTable;*/
SELECT 'success' AS 'status';
commit;
END$$
DELIMITER ;
