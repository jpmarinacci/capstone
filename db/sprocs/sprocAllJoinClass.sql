DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAllJoinClass`(in studentId_v int)
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

SELECT 'success' AS 'status';
SELECT 
    collegeClassTable.*,
    studentTable.*,
    personTable.personName AS 'ownerName'
FROM
    eLeapData.collegeClassTable
        LEFT JOIN
    eLeapData.studentTable ON collegeClassTable.classId = studentTable.classId
        LEFT JOIN
    eLeapData.personTable ON collegeClassTable.ownerId = personTable.personId
WHERE
    studentTable.personId = studentId_v;
COMMIT;
END$$
DELIMITER ;
