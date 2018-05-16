DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddPer`(
in email_v varchar(45),
in password_v varchar(45),
in personName_v varchar(45),
in phone_v varchar(45),
in roleId_v int
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
    `password`)
	VALUES
	(
	roleId_v,
	personName_v,
	email_v,
	phone_v,
    password_v
	);
    COMMIT;
SELECT * FROM eLeapData.personTable where eLeapData.personTable.personId = last_insert_id();

END$$
DELIMITER ;
