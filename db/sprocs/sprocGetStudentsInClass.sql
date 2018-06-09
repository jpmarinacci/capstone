DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocGetStudentsInClass`(in classId_v int)
BEGIN
SELECT 'success' as 'status';
SELECT 
    *
FROM
    studentTable
WHERE
    studentTable.classId = classId_v;
END$$
DELIMITER ;
