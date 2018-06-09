DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocUpdateCom`(
in address_v varchar(45),
in communityId_v int,
in communityName_v varchar(45),
in contactEmail_v varchar(45),
in PicURL_v varchar(1000))
BEGIN
	DECLARE errno INT;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
		SELECT errno AS MYSQL_ERROR;
		ROLLBACK;
	END;
START TRANSACTION;
SELECT 'success' AS 'status';
UPDATE `eLeapData`.`communityTable` 
SET 
    `communityId` = communityId_v,
    `communityName` = communityName_v,
    `address` = address_v,
    `contactEmail` = contactEmail_v,
    `PicURL` = PicURL_v
WHERE
    `communityId` = communityId_v;
SELECT 
    *
FROM
    communityTable
WHERE
    communityTable.communityId = communityId_v;
commit;
END$$
DELIMITER ;
