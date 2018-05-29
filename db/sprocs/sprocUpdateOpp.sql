DELIMITER $$
CREATE DEFINER=`eLeapisit`@`%` PROCEDURE `sprocUpdateOpp`(
in agencyCommitment_v varchar(45),
in applicationDueDate_v datetime(6),
in className_v varchar(45),
in classType_v varchar(45),
in classYear_v varchar(45),
in courseSummary_v varchar(2000),
in createDate_v datetime(6),
in deliverables_v varchar(45),
in description_v varchar(2000),
in donation_v int,
in duration_v int,
in endDateTime_v datetime(6),
in estimatedClassSize_v int,
in examples_v varchar(45),
in hoursRequired_v int,
in isClass_v tinyint(1),
in isRequiredForClass_v tinyint(1),
in isPaid_v tinyint(1),
in isServiceLearning_v tinyint(1),
in isTeams_v tinyint(1),
in isVirtual_v tinyint(1),
in latitude_v varchar(45),
in location_v varchar(45),
in longitude_v varchar(45),
in minimumPersonsRequired_v int,
in notAllowed_v varchar(45),
in notes_v varchar(45),
in numberOfTeams_v int,
in onBoarding_v varchar(45),
in oppId_v int,
in opportunityType_v varchar(45),
in ownerId_v int,
in pay_v int,
in preferedAgencyType_v varchar(45),
in preferedServiceWorkType_v varchar(45),
in recurrence_v varchar(45),
in requirements_v varchar(45),
in startDateTime_v datetime(6),
in status_v varchar(45),
in supportDescription_v varchar(45),
in supportPreference_v varchar(45),
in teamSize_v int,
in term_v varchar(45),
in timePeriodEndDate_v datetime(6),
in timePeriodStartDate_v datetime(6),
in title_v varchar(45),
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
    className = className_v,
    classType = classType_v,
    classYear = classYear_v,
    courseSummary = courseSummary_v,
    createDate = createDate_v,
    deliverables = deliverables_v,
    description = description_v,
    donation = donation_v,
    duration = duration_v,
    endDateTime = endDateTime_v,
    estimatedClassSize = estimatedClassSize_v,
    examples = examples_v,
    hoursRequired = hoursRequired_v,
    isClass = isClass_v,
    isRequiredForClass = isRequiredForClass_v,
    isPaid = isPaid_v,
    isServiceLearning = isServiceLearning_v,
    isTeams = isTeams_v,
    isVirtual = isVirtual_v,
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
    preferedAgencyType = preferedAgencyType_v,
    preferedServiceWorkType = preferedServiceWorkType_v,
    recurrence = recurrence_v,
    requirements = requirements_v,
    startDateTime = startDateTime_v,
    `status` = status_v,
    supportDescription = supportDescription_v,
    supportPreference = supportPreference_v,
    teamSize = teamSize_v,
    term = term_v,
    timePeriodEndDate = timePeriodEndDate_v,
    timePeriodStartDate = timePeriodStartDate_v,
    title = title_v,
    totalSeats = totalSeats_v
    WHERE opportunityId = oppId_v;
    
SELECT 'success' AS 'status';
SELECT * FROM eLeapData.opportunityTable WHERE eLeapData.opportunityTable.opportunityId = oppId_v;

    COMMIT;
END$$
DELIMITER ;
