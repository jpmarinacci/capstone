DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddCom`(
in address_v varchar(45),
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
INSERT INTO `eLeapData`.`communityTable`
(
`address`,
`communityName`,
`contactEmail`,
`PicURL`)
VALUES
(address_v,
communityName_v,
contactEmail_v,
PicURL_v);
SELECT 
    *
FROM
    eLeapData.communityTable
WHERE
    communityTable.commmunityId = LAST_INSERT_ID(); 
commit;
END$$
DELIMITER ;
