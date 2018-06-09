DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddStudent`(in classId_v int, in email_v varchar(45))
BEGIN
DECLARE perId int DEFAULT null;
 DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS 'invalid';
    ROLLBACK;
    END;
START TRANSACTION;

SET perId = (SELECT personId FROM personTable WHERE LOWER(personTable.email) = LOWER(email_v));

IF (!perId)THEN SET perId = null;
end if;

INSERT INTO `eLeapData`.`studentTable`
(`classId`,
`personId`,
`email`)
VALUES
(classId_v,
perId,
email_v);
SELECT 'success' AS 'status';
SELECT 
    *
FROM
    eLeapData.studentTable
WHERE
    studentTable.classId = classId_v
        AND studentTable.email = email_v;
commit;
END$$
DELIMITER ;
