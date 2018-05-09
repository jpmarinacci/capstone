DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddPer`(
in roleId_v int,
in personName_v varchar(45),
in email_v varchar(45),
in phone_v varchar(45),
in themeId_v int,
in picId_v int
)
BEGIN
    DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
    SELECT errno AS MYSQL_ERROR;
    ROLLBACK;
    END;
	START TRANSACTION;
	INSERT INTO eLeapData.personTable
	(
	roleId,
	personName,
	email,
	phone,
	themeId,
	picId)
	VALUES
	(
	roleId_v,
	personName_v,
	email_v,
	phone_v,
	themeId_v,
	picId_v
	);
SELECT * FROM eLeapData.personTable where eLeapData.personTable.personId = last_insert_id();

END$$
DELIMITER ;
