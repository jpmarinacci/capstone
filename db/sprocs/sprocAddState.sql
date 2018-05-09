DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddState`(in ThemeData_v varchar(45),in ThemeDecription_v varchar(45))
BEGIN
INSERT INTO `eLeapData`.`applicationStateTable`
(
`ThemeData`,
`ThemeDecription`)
VALUES
(ThemeData_v,
ThemeDecription_v);

END$$
DELIMITER ;
