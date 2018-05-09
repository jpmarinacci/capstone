DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocJoinOpp`(in oppId int, in userId int)
BEGIN
INSERT INTO eLeapData.filledSeatTable
(oppertunityId,
personId)
VALUES
(oppId,
userId);
SELECT * from dbo.filledSeatTable
WHERE oppertunityId = oppId AND personId = userId;
END$$
DELIMITER ;
