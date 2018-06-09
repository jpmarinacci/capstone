DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocDeleteClass`(in classId_v int)
BEGIN
 DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS 'invalid';
    ROLLBACK;
    END;
START TRANSACTION;
SELECT 'success' AS 'status';
DELETE FROM eLeapData.studentTable 
WHERE
    (studentTable.classId = classId_v);
DELETE FROM `eLeapData`.`collegeClassTable` 
WHERE
    collegeClassTable.classId = classId_v;

commit;
END$$
DELIMITER ;
