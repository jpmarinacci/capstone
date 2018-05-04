DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAllState`()
BEGIN
SELECT * FROM `eLeapData`.`applicationStateTable`;

END$$
DELIMITER ;
