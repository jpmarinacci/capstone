DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocGetPer`(in Id_v varchar(45))
BEGIN
select if(exists(
select * from eLeapData.personTable
where LOWER(personTable.email) = LOWER(email_v) and personTable.credential = password_v),'Success','Failed') as loginStatus;

SELECT 
    *
FROM
    eLeapData.personTable
WHERE
    LOWER(personTable.email) = LOWER(email_v)
        AND personTable.credential = password_v;
END$$
DELIMITER ;
