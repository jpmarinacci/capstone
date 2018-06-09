DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocUpdateClass`(in classId_v int,in className_v varchar(2000),in classType_v varchar(2000),
in courseSummary_v varchar(2000), in estimatedClassSize_v int, 
in ownerId_v int, in section_v varchar(45), in term_v varchar(45), in year_v int)
BEGIN
DECLARE errno INT;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
		SELECT errno AS MYSQL_ERROR;
		ROLLBACK;
	END;
START TRANSACTION;
UPDATE `eLeapData`.`collegeClassTable` 
SET 
    `classId` = classId_v,
    `className` = className_v,
    `classType` = classType_v,
    `courseSummary` = courseSummary_v,
    `estimatedClassSize` = estimatedClassSize_v,
    `ownerId` = ownerId_v,
    `section` = section_v,
    `term` = term_v,
    `year` = year_v
WHERE
    `classId` = classId_v;
SELECT 'success' AS 'status';
SELECT 
    *
FROM
    eLeapData.collegeClassTable
WHERE
    collegeClassTable.classId = classId_v;
commit;
END$$
DELIMITER ;
