DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAllPics`()
BEGIN
SELECT * FROM `eLeapData`.`picsTable`;

END$$
DELIMITER ;
