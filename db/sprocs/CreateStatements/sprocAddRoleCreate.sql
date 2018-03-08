DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddRole`(in RoleName_v varchar(45),in RoleDescription_v varchar(45))
BEGIN
INSERT INTO roleTable(
	roleName,
    RoleDescription
)
values(
RoleName_v,
RoleDescription_v
);
SELECT * from dbo.roleTable Where dbo.roleTable.RoleID =( SELECT LAST_INSERT_ID());
END$$
DELIMITER ;
