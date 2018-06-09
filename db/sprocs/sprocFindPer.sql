DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocFindPer`(in email_v varchar(45))
BEGIN

select if(exists(
select * from eLeapData.personTable
where personTable.email = email_v),'valid','invalid') as loginStatus;
SELECT 
    *
FROM
    eLeapData.personTable
WHERE
    personTable.email = email_v;
END$$
DELIMITER ;
