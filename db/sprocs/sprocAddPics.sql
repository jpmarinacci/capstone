DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddPics`(in picURL_v varchar(45))
BEGIN
	INSERT INTO eLeapData.picsTable(picURL)
	VALUES(picURL_v);
	SELECT * FROM eLeapData.picsTable
	WHERE eLeapData.picsTable.picID = LAST_INSERT_ID();
END$$
DELIMITER ;
