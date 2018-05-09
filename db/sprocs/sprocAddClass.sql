DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddClass`(in ClassID_v int,in ClassName_v varchar(45))
BEGIN
INSERT INTO eLeapData.collegeClassTable
(ClassID,
ClassName)
VALUES
(ClassID_v,
ClassName_v);
SELECT * from eLeapData.collegeClassTable Where eLeapData.collegeClassTable.ClassID =( SELECT LAST_INSERT_ID());
END$$
DELIMITER ;
