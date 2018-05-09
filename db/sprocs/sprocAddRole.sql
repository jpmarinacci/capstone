DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddRole`(in RoleID_v int,in RoleName_v varchar(45),in RoleDescription_v varchar(45))
BEGIN
INSERT INTO roleTable(
	RoleID,
	roleName,
    RoleDescription
)
values(
RoleID_v,
RoleName_v,
RoleDescription_v
);
SELECT * from eLeapData.roleTable Where eLeapData.roleTable.RoleID =LAST_INSERT_ID();
END$$
DELIMITER ;
