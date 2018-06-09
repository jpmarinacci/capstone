DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocJoinOpp`(in oppId int, in userId int)
BEGIN
 DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS 'invalid';
    ROLLBACK;
    END;
START TRANSACTION;
INSERT INTO eLeapData.filledSeatTable
(opportunityId,
personId)
VALUES
(oppId,
userId);
commit;
SELECT 
    *
FROM
    eLeapData.filledSeatTable
WHERE
    eLeapData.filledSeatTable.personId = userId;
commit;
END$$
DELIMITER ;
