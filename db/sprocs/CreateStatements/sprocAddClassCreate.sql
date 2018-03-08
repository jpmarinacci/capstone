DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE sprocAddClass(in ClassID_v int,in ClassName_v varchar(45))
BEGIN
INSERT INTO dbo.collegeClassTable
(ClassID,
ClassName)
VALUES
(ClassID_v,
ClassName_v);
SELECT * from dbo.collegeClassTable Where dbo.collegeClassTable.ClassID =( SELECT LAST_INSERT_ID());
END$$
DELIMITER ;
