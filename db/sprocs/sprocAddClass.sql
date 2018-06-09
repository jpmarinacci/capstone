DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddClass`(in className_v varchar(2000),
in courseSummary_v varchar(2000), in classType_v varchar(2000), in estimatedClassSize_v int, 
in ownerId_v int, in section_v varchar(2000), in term_v varchar(2000), in year_v int)
BEGIN
 DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS 'invalid';
    ROLLBACK;
    END;
START TRANSACTION;
INSERT INTO `eLeapData`.`collegeClassTable`(
`className`,
`courseSummary`,
`classType`,
`estimatedClassSize`,
`ownerId`,
`section`,
`term`,
`year`)
VALUES
(className_v,
courseSummary_v,
classType_v,
estimatedClassSize_v,
ownerId_v,
section_v,
term_v,
year_v);

SELECT 'success' AS 'status';
SELECT 
    *
FROM
    eLeapData.collegeClassTable
WHERE
    eLeapData.collegeClassTable.classId = (SELECT LAST_INSERT_ID());

COMMIT;
END$$
DELIMITER ;
