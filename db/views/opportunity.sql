CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `eLeapisit`@`%` 
    SQL SECURITY DEFINER
VIEW `opportunity` AS
    SELECT 
        `opp`.`opportunityId` AS `opportunityId`,
        `opp`.`agencyCommitment` AS `agencyCommitment`,
        `opp`.`applicationDueDate` AS `applicationDueDate`,
        (`opp`.`totalSeats` - COUNT(`fill`.`personId`)) AS `availableSeats`,
        `opp`.`className` AS `className`,
        `opp`.`classType` AS `classType`,
        `opp`.`classYear` AS `classYear`,
        `opp`.`courseSummary` AS `courseSummary`,
        `opp`.`createDate` AS `createDate`,
        `opp`.`deliverables` AS `deliverables`,
        `opp`.`description` AS `description`,
        `opp`.`donation` AS `donation`,
        `opp`.`duration` AS `duration`,
        `opp`.`endDateTime` AS `endDateTime`,
        `opp`.`estimatedClassSize` AS `estimatedClassSize`,
        `opp`.`examples` AS `examples`,
        `opp`.`hoursRequired` AS `hoursRequired`,
        `opp`.`isClass` AS `isClass`,
        `opp`.`isPaid` AS `isPaid`,
        `opp`.`isRequiredForClass` AS `isRequiredForClass`,
        `opp`.`isServiceLearning` AS `isServiceLearning`,
        `opp`.`isTeams` AS `isTeams`,
        `opp`.`isVirtual` AS `isVirtual`,
        `opp`.`lastModified` AS `lastModified`,
        `opp`.`latitude` AS `latitude`,
        `opp`.`location` AS `location`,
        `opp`.`longitude` AS `longitude`,
        `opp`.`minimumPersonsRequired` AS `minimumPersonsRequired`,
        `opp`.`notAllowed` AS `notAllowed`,
        `opp`.`notes` AS `notes`,
        `opp`.`numberOfTeams` AS `numberOfTeams`,
        `opp`.`onBoarding` AS `onBoarding`,
        `opp`.`opportunityType` AS `opportunityType`,
        `opp`.`ownerId` AS `ownerId`,
        `opp`.`pay` AS `payAmount`,
        `per`.`personName` AS `ownerName`,
        `opp`.`preferedAgencyType` AS `preferedAgencyType`,
        `opp`.`preferedServiceWorkType` AS `preferedServiceWorkType`,
        `opp`.`recurrence` AS `recurrence`,
        `opp`.`requirements` AS `requirements`,
        `opp`.`startDateTime` AS `startDateTime`,
        `opp`.`status` AS `status`,
        `opp`.`supportDescription` AS `supportDescription`,
        `opp`.`supportPreference` AS `supportPreference`,
        `opp`.`teamSize` AS `teamSize`,
        `opp`.`term` AS `term`,
        `opp`.`timePeriodStartDate` AS `timePeriodStartDate`,
        `opp`.`timePeriodEndDate` AS `timePeriodEndDate`,
        `opp`.`title` AS `title`,
        `opp`.`totalSeats` AS `totalSeats`
    FROM
        ((`opportunityTable` `opp`
        JOIN `personTable` `per` ON ((`opp`.`ownerId` = `per`.`personId`)))
        LEFT JOIN `filledSeatTable` `fill` ON ((`fill`.`opportunityId` = `opp`.`opportunityId`)))
    GROUP BY `opp`.`opportunityId`;
