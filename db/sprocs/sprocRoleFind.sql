DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocRoleFind`(in roleName varchar(45))
BEGIN
select * from eLeapData.roleTable
where eLeapData.roleTable.roleName = roleName;
END$$
DELIMITER ;
