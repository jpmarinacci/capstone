DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddPer`(
in password_v varchar(80),
in email_v varchar(45),
in personName_v varchar(45),
in phone_v varchar(45),
in picURL_v varchar(1000),
in roleId_v int
)
BEGIN
	DECLARE personIdValue int;

    DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS CanNotInsert;
    ROLLBACK;
    END;
	START TRANSACTION;
  
	INSERT INTO eLeapData.personTable
	(
	roleId,
	personName,
	email,
	phone,
    credential,
    picURL)
	VALUES
	(
	roleId_v,
	personName_v,
	email_v,
	phone_v,
    password_v,
    picURL_v
	);
SELECT 'success' AS 'status';
SELECT 
    *
FROM
    eLeapData.personTable
WHERE
    eLeapData.personTable.personId = LAST_INSERT_ID();
    
    /*checking for existing email in students table*/
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
