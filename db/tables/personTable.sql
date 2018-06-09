CREATE TABLE `personTable` (
    `personId` INT(11) NOT NULL AUTO_INCREMENT,
    `roleId` INT(11) NOT NULL DEFAULT '1',
    `personName` VARCHAR(45) DEFAULT NULL,
    `email` VARCHAR(45) NOT NULL,
    `phone` VARCHAR(45) DEFAULT NULL,
    `themeId` INT(11) DEFAULT NULL,
    `picURL` VARCHAR(1000) DEFAULT NULL,
    `credential` VARCHAR(80) DEFAULT NULL,
    PRIMARY KEY (`personId`),
    UNIQUE KEY `personId_UNIQUE` (`personId`),
    UNIQUE KEY `Email_UNIQUE` (`email`),
    KEY `picId_idx` (`picURL` (767)),
    KEY `roleId_idx` (`roleId`)
)  ENGINE=INNODB AUTO_INCREMENT=147 DEFAULT CHARSET=LATIN1;
