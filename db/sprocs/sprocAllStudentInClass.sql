DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAllStudentInClass`(in classId_v int)
BEGIN
DECLARE perVar int DEFAULT null;
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
    eLeapData.studentTable
WHERE
    studentTable.classId = classId_v;
SELECT 'success' AS 'status';
COMMIT;
END$$
DELIMITER ;
