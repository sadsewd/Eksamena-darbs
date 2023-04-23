-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema veikalsdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema veikalsdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `veikalsdb` DEFAULT CHARACTER SET utf8 ;
USE `veikalsdb` ;

-- -----------------------------------------------------
-- Table `veikalsdb`.`Lietotaji`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `veikalsdb`.`Lietotaji` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `lietotajvards` VARCHAR(60) NOT NULL,
  `parole` VARCHAR(60) NOT NULL,
  `epasta_adrese` VARCHAR(80) NULL,
  `talr_nr` VARCHAR(12) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `veikalsdb`.`informacija`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `veikalsdb`.`informacija` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `adrese` VARCHAR(150) NULL,
  `pilseta` VARCHAR(45) NULL,
  `zip_kods` VARCHAR(7) NULL,
  `vards` VARCHAR(45) NULL,
  `uzvards` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `veikalsdb`.`Lietotaja_informacija`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `veikalsdb`.`Lietotaja_informacija` (
  `Lietotaji_id` INT NOT NULL,
  `informacija_id` INT NOT NULL,
  PRIMARY KEY (`Lietotaji_id`, `informacija_id`),
  INDEX `fk_Lietotaji_has_informacija_informacija1_idx` (`informacija_id` ASC) ,
  INDEX `fk_Lietotaji_has_informacija_Lietotaji_idx` (`Lietotaji_id` ASC) ,
  CONSTRAINT `fk_Lietotaji_has_informacija_Lietotaji`
    FOREIGN KEY (`Lietotaji_id`)
    REFERENCES `veikalsdb`.`Lietotaji` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Lietotaji_has_informacija_informacija1`
    FOREIGN KEY (`informacija_id`)
    REFERENCES `veikalsdb`.`informacija` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `veikalsdb`.`Kategorijas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `veikalsdb`.`Kategorijas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nosaukums` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `veikalsdb`.`Produkti`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `veikalsdb`.`Produkti` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nosaukums` VARCHAR(45) NOT NULL,
  `apraksts` LONGTEXT NOT NULL,
  `attels` VARCHAR(100) NOT NULL,
  `Kategorijas_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Kategorijas_id`),
  INDEX `fk_Produkti_Kategorijas1_idx` (`Kategorijas_id` ASC) ,
  CONSTRAINT `fk_Produkti_Kategorijas1`
    FOREIGN KEY (`Kategorijas_id`)
    REFERENCES `veikalsdb`.`Kategorijas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `veikalsdb`.`Variacijas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `veikalsdb`.`Variacijas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nosaukums` VARCHAR(45) NOT NULL,
  `Kategorijas_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Kategorijas_id`),
  INDEX `fk_Variacijas_Kategorijas1_idx` (`Kategorijas_id` ASC) ,
  CONSTRAINT `fk_Variacijas_Kategorijas1`
    FOREIGN KEY (`Kategorijas_id`)
    REFERENCES `veikalsdb`.`Kategorijas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `veikalsdb`.`Variacijas_dati`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `veikalsdb`.`Variacijas_dati` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `vertiba` VARCHAR(45) NOT NULL,
  `Variacijas_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Variacijas_id`),
  INDEX `fk_Variacijas_dati_Variacijas1_idx` (`Variacijas_id` ASC) ,
  CONSTRAINT `fk_Variacijas_dati_Variacijas1`
    FOREIGN KEY (`Variacijas_id`)
    REFERENCES `veikalsdb`.`Variacijas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `veikalsdb`.`Produkta_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `veikalsdb`.`Produkta_info` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Produkti_id` INT NOT NULL,
  `daudzums_noliktava` INT NOT NULL,
  `cena` VARCHAR(10) NOT NULL,
  `attels` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`, `Produkti_id`),
  INDEX `fk_Produkta_info_Produkti1_idx` (`Produkti_id` ASC) ,
  CONSTRAINT `fk_Produkta_info_Produkti1`
    FOREIGN KEY (`Produkti_id`)
    REFERENCES `veikalsdb`.`Produkti` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `veikalsdb`.`Produkta_info_has_Variacijas_dati`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `veikalsdb`.`Produkta_info_has_Variacijas_dati` (
  `Produkta_info_id` INT NOT NULL,
  `Variacijas_dati_id` INT NOT NULL,
  PRIMARY KEY (`Produkta_info_id`, `Variacijas_dati_id`),
  INDEX `fk_Produkta_info_has_Variacijas_dati_Variacijas_dati1_idx` (`Variacijas_dati_id` ASC) ,
  INDEX `fk_Produkta_info_has_Variacijas_dati_Produkta_info1_idx` (`Produkta_info_id` ASC) ,
  CONSTRAINT `fk_Produkta_info_has_Variacijas_dati_Produkta_info1`
    FOREIGN KEY (`Produkta_info_id`)
    REFERENCES `veikalsdb`.`Produkta_info` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Produkta_info_has_Variacijas_dati_Variacijas_dati1`
    FOREIGN KEY (`Variacijas_dati_id`)
    REFERENCES `veikalsdb`.`Variacijas_dati` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `veikalsdb`.`Grozs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `veikalsdb`.`Grozs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Lietotaji_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Lietotaji_id`),
  INDEX `fk_Grozs_Lietotaji1_idx` (`Lietotaji_id` ASC) ,
  CONSTRAINT `fk_Grozs_Lietotaji1`
    FOREIGN KEY (`Lietotaji_id`)
    REFERENCES `veikalsdb`.`Lietotaji` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `veikalsdb`.`Groza_produkts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `veikalsdb`.`Groza_produkts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `daudzums` INT NOT NULL DEFAULT 1,
  `Grozs_id` INT NOT NULL,
  `Produkta_info_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Grozs_id`, `Produkta_info_id`),
  INDEX `fk_Groza_produkts_Grozs1_idx` (`Grozs_id` ASC) ,
  INDEX `fk_Groza_produkts_Produkta_info1_idx` (`Produkta_info_id` ASC) ,
  CONSTRAINT `fk_Groza_produkts_Grozs1`
    FOREIGN KEY (`Grozs_id`)
    REFERENCES `veikalsdb`.`Grozs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Groza_produkts_Produkta_info1`
    FOREIGN KEY (`Produkta_info_id`)
    REFERENCES `veikalsdb`.`Produkta_info` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `veikalsdb`.`Pasutijuma_pakalpojums`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `veikalsdb`.`Pasutijuma_pakalpojums` (
  `id` INT NOT NULL,
  `Pakalpojuma_sniedzejs` ENUM("Omniva", "Latvijas Pasts", "DPD pakomats", "DPD piegade") NOT NULL,
  `Cena` VARCHAR(5) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `veikalsdb`.`Pasutijuma_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `veikalsdb`.`Pasutijuma_status` (
  `id` INT NOT NULL,
  `status` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `veikalsdb`.`Pasutijumi`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `veikalsdb`.`Pasutijumi` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `kopsumma` VARCHAR(45) NOT NULL,
  `pasutijuma_datums` VARCHAR(45) NOT NULL,
  `Lietotaji_id` INT NOT NULL,
  `Pasutijuma_pakalpojums_id` INT NOT NULL,
  `Pasutijuma_status_id` INT NOT NULL,
  `informacija_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Lietotaji_id`, `Pasutijuma_pakalpojums_id`, `Pasutijuma_status_id`, `informacija_id`),
  INDEX `fk_Pasutijumi_Lietotaji1_idx` (`Lietotaji_id` ASC) ,
  INDEX `fk_Pasutijumi_Pasutijuma_pakalpojums1_idx` (`Pasutijuma_pakalpojums_id` ASC) ,
  INDEX `fk_Pasutijumi_Pasutijuma_status1_idx` (`Pasutijuma_status_id` ASC) ,
  INDEX `fk_Pasutijumi_informacija1_idx` (`informacija_id` ASC) ,
  CONSTRAINT `fk_Pasutijumi_Lietotaji1`
    FOREIGN KEY (`Lietotaji_id`)
    REFERENCES `veikalsdb`.`Lietotaji` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Pasutijumi_Pasutijuma_pakalpojums1`
    FOREIGN KEY (`Pasutijuma_pakalpojums_id`)
    REFERENCES `veikalsdb`.`Pasutijuma_pakalpojums` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Pasutijumi_Pasutijuma_status1`
    FOREIGN KEY (`Pasutijuma_status_id`)
    REFERENCES `veikalsdb`.`Pasutijuma_status` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Pasutijumi_informacija1`
    FOREIGN KEY (`informacija_id`)
    REFERENCES `veikalsdb`.`informacija` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `veikalsdb`.`Administracija`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `veikalsdb`.`Administracija` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `lietotajvards` VARCHAR(60) NOT NULL,
  `parole` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
