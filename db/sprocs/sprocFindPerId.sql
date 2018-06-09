DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocFindPerId`(in personId_v varchar(45))
BEGIN

select if(exists(
select * from eLeapData.personTable
where personTable.personId = personId_v),'success','invalid') as `status`;
SELECT 
    *
FROM
    eLeapData.personTable
WHERE
    personTable.personId = personId_v;
END$$
DELIMITER ;
