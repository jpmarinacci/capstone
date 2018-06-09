DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocUpdateOpp`(
in agencyCommitment_v varchar(2000),
in applicationDueDate_v datetime(6),
in classId_v int,
in createDate_v datetime(6),
in deliverables_v varchar(45),
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
in oppId_v int,
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
in title_v varchar(2000),
in totalSeats_v	int)
BEGIN

	DECLARE errno INT;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
		SELECT errno AS MYSQL_ERROR;
		ROLLBACK;
	END;
START TRANSACTION;

UPDATE eLeapData.opportunityTable 
SET 
    agencyCommitment = agencyCommitment_v,
    applicationDueDate = applicationDueDate_v,
    classId = classId_v,
    createDate = createDate_v,
    deliverables = deliverables_v,
    description = description_v,
    donation = donation_v,
    duration = duration_v,
    endDateTime = endDateTime_v,
    examples = examples_v,
    hoursRequired = hoursRequired_v,
    isClass = isClass_v,
    isRequiredForClass = isRequiredForClass_v,
    isPaid = isPaid_v,
    isServiceLearning = isServiceLearning_v,
    isTeams = isTeams_v,
    isVirtual = isVirtual_v,
    lastModified = lastModified_v,
    latitude = latitude_v,
    location = location_v,
    longitude = longitude_v,
    minimumPersonsRequired = minimumPersonsRequired_v,
    notAllowed = notAllowed_v,
    notes = notes_v,
    numberOfTeams = numberOfTeams_v,
    onBoarding = onBoarding_v,
    opportunityType = opportunityType_v,
    ownerId = ownerId_v,
    pay = pay_v,
    preferredAgencyType = preferredAgencyType_v,
    preferredServiceWorkType = preferredServiceWorkType_v,
    recurrence = recurrence_v,
    requirements = requirements_v,
    startDateTime = startDateTime_v,
    `status` = status_v,
    supportDescription = supportDescription_v,
    supportPreference = supportPreference_v,
    teamSize = teamSize_v,
    timePeriodEndDate = timePeriodEndDate_v,
    timePeriodStartDate = timePeriodStartDate_v,
    title = title_v,
    totalSeats = totalSeats_v
WHERE
    opportunityId = oppId_v;
    
SELECT 'success' AS 'status';
SELECT 
    (totalSeats - COUNT(filledSeatTable.personId)) AS 'availableSeats',
    opportunityTable.*
FROM
    eLeapData.opportunityTable
        JOIN
    filledSeatTable ON ((filledSeatTable.opportunityId = opportunityTable.opportunityId))
WHERE
    eLeapData.opportunityTable.opportunityId = oppId_v;

COMMIT;
END$$
DELIMITER ;
