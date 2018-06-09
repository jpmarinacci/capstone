DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAllCom`()
BEGIN
SELECT `communityPersonTable`.`communityId`,
    `communityPersonTable`.`personId`
FROM `eLeapData`.`communityPersonTable`;

END$$
DELIMITER ;
