DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocAddOpp`(
in agencyCommitment_v varchar(2000),
in applicationDueDate_v datetime(6),
in classId_v int,
in createDate_v datetime(6),
in deliverables_v varchar(2000),
in description_v varchar(2000),
in donation_v int, 
in duration_v int,
in endDateTime_v datetime(6),
in examples_v varchar(2000),
in hoursRequired_v int,
in isClass_v tinyint(1),
in isRequiredForClass_v tinyint(1),
in isPaid_v tinyint(1),
in isServiceLearning_v tinyint(1),
in isTeams_v tinyint(1),
in isVirtual_v tinyint(1),
in lastModified_v datetime(6),
in latitude_v varchar(2000),
in location_v varchar(2000),
in longitude_v varchar(2000),
in minimumPersonsRequired_v int,
in notAllowed_v varchar(2000),
in notes_v varchar(2000),
in numberOfTeams_v int,
in onBoarding_v varchar(2000),
in opportunityType_v varchar(2000),
in ownerId_v int,
in pay_v int,
in preferredAgencyType_v varchar(2000),
in preferredServiceWorkType_v varchar(2000),
in recurrence_v varchar(2000),
in requirements_v varchar(2000),
in startDateTime_v datetime(6),
in status_v varchar(2000),
in supportDescription_v varchar(2000),
in supportPreference_v varchar(2000),
in teamSize_v int,
in timePeriodEndDate_v datetime(6),
in timePeriodStartDate_v datetime(6),
in title_v varchar(200),
in totalSeats_v int
)
BEGIN

DECLARE errno INT;
DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
SELECT errno AS MYSQL_ERROR;
ROLLBACK;
END;
START TRANSACTION;
SELECT 'success' AS 'status';
INSERT INTO eLeapData.opportunityTable(
    title,
	description,
	startDateTime,
	endDateTime,
    classId,
	createDate,
	totalSeats,
	ownerId,
	`status`,
	notes,
	pay,
	donation,
	isPaid,
	isServiceLearning,
	recurrence,
	isVirtual,
	duration,
	timePeriodStartDate,
	timePeriodEndDate,
	location,
	longitude,
	latitude,
	isClass,
	applicationDueDate,
	isRequiredForClass,
	opportunityType,
	supportPreference,
	onBoarding,
	minimumPersonsRequired,
	isTeams,
	teamSize,
	hoursRequired,
	preferredServiceWorkType,
	preferredAgencyType,
	numberOfTeams,
	examples,
	deliverables,
	agencyCommitment,
	notAllowed,
	requirements,
	supportDescription,
    lastModified)
	values
	(title_v,
	description_v,
	startDateTime_v,
	endDateTime_v,
    classId_v,
	createDate_v,
	totalSeats_v,
	ownerId_v,
	status_v,
	notes_v,
	pay_v,
	donation_v,
	isPaid_v,
	isServiceLearning_v,
	recurrence_v,
	isVirtual_v,
	duration_v,
	timePeriodStartDate_v,
	timePeriodEndDate_v,
	location_v,
	longitude_v,
	latitude_v,
    isClass_v,
	applicationDueDate_v,
	isRequiredForClass_v,
	opportunityType_v,
	supportPreference_v,
	onBoarding_v,
	minimumPersonsRequired_v,
	isTeams_v,
	teamSize_v,
	hoursRequired_v,
	preferredServiceWorkType_v,
	preferredAgencyType_v,
	numberOfTeams_v,
	examples_v,
	deliverables_v,
	agencyCommitment_v,
	notAllowed_v,
	requirements_v,
	supportDescription_v,
    lastModified_v
    );

SELECT 
    totalSeats AS 'availableSeats',
    opportunityTable.*,
    collegeClassTable.*
FROM
    eLeapData.opportunityTable
        LEFT JOIN
    eLeapData.collegeClassTable ON opportunityTable.classId = collegeClassTable.classId
WHERE
    eLeapData.opportunityTable.opportunityId = LAST_INSERT_ID(); 
    
   COMMIT;
END$$
DELIMITER ;
