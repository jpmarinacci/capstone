CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `eLeapisit`@`%` 
    SQL SECURITY DEFINER
VIEW `eLeapData`.`community` AS
    SELECT 
        `com`.`communityId` AS `communityId`,
        `com`.`communityName` AS `communityName`,
        `com`.`address` AS `address`,
        `com`.`contactEmail` AS `contactEmail`,
        `com`.`PicURL` AS `PicURL`,
        COUNT(`per`.`personId`) AS `peopleInCommunity`
    FROM
        (`eLeapData`.`communityTable` `com`
        LEFT JOIN `eLeapData`.`communityPersonTable` `per` ON ((`per`.`communityId` = `com`.`communityId`)))
    GROUP BY `com`.`communityId`;
