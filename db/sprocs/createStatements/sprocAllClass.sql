DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAllClass`()
BEGIN
SELECT *
FROM `eLeapData`.`collegeClassTable`;

END$$
DELIMITER ;
