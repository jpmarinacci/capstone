CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocFindPerId`(in personId_v varchar(45))
BEGIN

select if(exists(
select * from eLeapData.personTable
where personTable.personId = personId_v),'success','invalid') as `status`;
select * from eLeapData.personTable
where personTable.personId = personId_v;
END