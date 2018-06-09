CREATE TABLE `filledSeatTable` (
    `opportunityId` INT(11) NOT NULL,
    `personId` INT(11) NOT NULL,
    PRIMARY KEY (`opportunityId` , `personId`),
    KEY `PersonId_idx` (`personId`),
    CONSTRAINT `OppId` FOREIGN KEY (`opportunityId`)
        REFERENCES `opportunityTable` (`opportunityId`)
        ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `PersonId` FOREIGN KEY (`personId`)
        REFERENCES `personTable` (`personId`)
        ON DELETE NO ACTION ON UPDATE NO ACTION
)  ENGINE=INNODB DEFAULT CHARSET=LATIN1;
