CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `eLeapisit`@`%` 
    SQL SECURITY DEFINER
VIEW `eLeapData`.`opportunity` AS
    SELECT 
        `opp`.`opportunityId` AS `opportunityId`,
        `opp`.`agencyCommitment` AS `agencyCommitment`,
        `opp`.`applicationDueDate` AS `applicationDueDate`,
        (`opp`.`totalSeats` - COUNT(`fill`.`personId`)) AS `availableSeats`,
        `cla`.`classId` AS `classId`,
        `cla`.`className` AS `className`,
        `cla`.`classType` AS `classType`,
        `cla`.`year` AS `classYear`,
        `cla`.`courseSummary` AS `courseSummary`,
        `opp`.`createDate` AS `createDate`,
        `opp`.`deliverables` AS `deliverables`,
        `opp`.`description` AS `description`,
        `opp`.`donation` AS `donation`,
        `opp`.`duration` AS `duration`,
        `opp`.`endDateTime` AS `endDateTime`,
        `cla`.`estimatedClassSize` AS `estimatedClassSize`,
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
        `opp`.`preferredAgencyType` AS `preferredAgencyType`,
        `opp`.`preferredServiceWorkType` AS `preferredServiceWorkType`,
        `opp`.`recurrence` AS `recurrence`,
        `opp`.`requirements` AS `requirements`,
        `cla`.`section` AS `section`,
        `opp`.`startDateTime` AS `startDateTime`,
        `opp`.`status` AS `status`,
        `opp`.`supportDescription` AS `supportDescription`,
        `opp`.`supportPreference` AS `supportPreference`,
        `opp`.`teamSize` AS `teamSize`,
        `cla`.`term` AS `term`,
        `opp`.`timePeriodStartDate` AS `timePeriodStartDate`,
        `opp`.`timePeriodEndDate` AS `timePeriodEndDate`,
        `opp`.`title` AS `title`,
        `opp`.`totalSeats` AS `totalSeats`
    FROM
        (((`eLeapData`.`opportunityTable` `opp`
        JOIN `eLeapData`.`personTable` `per` ON ((`opp`.`ownerId` = `per`.`personId`)))
        LEFT JOIN `eLeapData`.`collegeClassTable` `cla` ON ((`opp`.`classId` = `cla`.`classId`)))
        LEFT JOIN `eLeapData`.`filledSeatTable` `fill` ON ((`fill`.`opportunityId` = `opp`.`opportunityId`)))
    GROUP BY `opp`.`opportunityId`;
