DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddRole`(in verificationCode_v varchar(45),in RoleID_v int,in RoleName_v varchar(45),in RoleDescription_v varchar(45))
BEGIN
INSERT INTO roleTable(
	RoleID,
	roleName,
    RoleDescription,
    varificationCode
)
values(
RoleID_v,
RoleName_v,
RoleDescription_v,
verificationCode
);
SELECT 
    *
FROM
    eLeapData.roleTable
WHERE
    eLeapData.roleTable.RoleID = LAST_INSERT_ID();
END$$
DELIMITER ;
