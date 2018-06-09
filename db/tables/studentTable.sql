CREATE TABLE `studentTable` (
    `classId` INT(11) NOT NULL,
    `personId` INT(11) DEFAULT NULL,
    `email` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`classId` , `email`)
)  ENGINE=INNODB DEFAULT CHARSET=LATIN1;
