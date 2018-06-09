CREATE TABLE `roleTable` (
    `roleId` INT(11) NOT NULL,
    `roleName` VARCHAR(45) DEFAULT NULL,
    `roleDescription` VARCHAR(45) DEFAULT NULL,
    `verificationCode` VARCHAR(45) DEFAULT NULL,
    PRIMARY KEY (`roleId`)
)  ENGINE=INNODB DEFAULT CHARSET=LATIN1;
