DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocJoinCom`(in communityId_v INT,in personId_v INT)
BEGIN
 DECLARE errno INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS 'invalid';
    ROLLBACK;
    END;
START TRANSACTION;
INSERT INTO `eLeapData`.`communityPersonTable`
(`communityId`,
`personId`)
VALUES
(communityId_v,personId_v);
SELECT 
    *
FROM
    eLeapData.communityPersonTable
WHERE
    communityPersonTable.personId = personId_v;
commit;
END$$
DELIMITER ;
