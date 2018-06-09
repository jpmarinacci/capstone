DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocUpdatePer`(in credential_v varchar(80), in email_v varchar(45),
in personId_v int, in personName_v varchar(45), in phone_v varchar(45), in picURL_v varchar(1000), in roleId_v int, in themeId_v int)
BEGIN

	DECLARE personIdValue int;

	DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
    SELECT errno AS 'invalid';
    ROLLBACK;
    END;
    start transaction;
    
UPDATE `eLeapData`.`personTable` 
SET 
    `personId` = personId_v,
    `roleId` = roleId_v,
    `personName` = personName_v,
    `email` = email_v,
    `phone` = phone_v,
    `themeId` = themeId_v,
    `picURL` = picURL_v,
    `credential` = credential_v
WHERE
    `personId` = personId_v;
SELECT 
    *
FROM
    eLeapData.personTable
WHERE
    eLeapData.personTable.personId = personId_v;
/*checking for adding to class*/
SET personIdValue = (SELECT personId FROM eLeapData.personTable
WHERE LOWER(eLeapData.personTable.email) = LOWER(email_v));
IF (personIdValue > 0) THEN
	UPDATE `eLeapData`.`studentTable`
	SET
	`personId` = personIdValue,
	`email` = email_v
	WHERE  `email` = email_v;
end IF;
    COMMIT;
END$$
DELIMITER ;
