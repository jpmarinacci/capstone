DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAllStudent`(in studentId int)
BEGIN
SELECT * FROM eLeapData.studentTable WHERE studentTable.personId = studentId;
SELECT 'success' as 'status';
END$$
DELIMITER ;
