-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema homework
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema homework
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `homework` DEFAULT CHARACTER SET utf8 ;
USE `homework` ;

-- -----------------------------------------------------
-- Table `homework`.`assignment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `homework`.`assignment` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `description` VARCHAR(300) NULL DEFAULT NULL,
  `email` VARCHAR(300) NOT NULL,
  `copy_email` VARCHAR(300) NULL DEFAULT NULL,
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `profile_id` INT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uq_assignment_name` (`name` ASC) ,
  INDEX `idx_assignment_profile_id` (`profile_id` ASC) ,
  INDEX `idx_assignment_created` (`created` ASC) )
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `homework`.`homework`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `homework`.`homework` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `assignment_id` INT(11) UNSIGNED NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `description` VARCHAR(300) NULL DEFAULT NULL,
  `due` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `submitted` TIMESTAMP NULL,
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `profile_id` INT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uq_homework_name` (`name` ASC) ,
  INDEX `idx_homework_due` (`due` ASC) ,
  INDEX `idx_homework_submitted` (`submitted` ASC) ,
  INDEX `idx_homework_profile_id` (`profile_id` ASC) ,
  INDEX `idx_homework_created` (`created` ASC) ,
  INDEX `fk_homework_assignment1_idx` (`assignment_id` ASC) ,
  CONSTRAINT `fk_homework_assignment1`
    FOREIGN KEY (`assignment_id`)
    REFERENCES `homework`.`assignment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `homework`.`attachment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `homework`.`attachment` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `homework_id` INT(11) UNSIGNED NOT NULL,
  `file_path` TEXT NOT NULL,
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_attachment_created` (`created` ASC) ,
  INDEX `fk_attachment_homework1_idx` (`homework_id` ASC) ,
  CONSTRAINT `fk_attachment_homework1`
    FOREIGN KEY (`homework_id`)
    REFERENCES `homework`.`homework` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `homework`.`email_template`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `homework`.`email_template` (
  `id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `subject` VARCHAR(200) NOT NULL,
  `content` TEXT NULL,
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `profile_id` INT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uq_email_template_name` (`name` ASC) ,
  INDEX `idx_email_template_profile_id` (`profile_id` ASC) ,
  INDEX `idx_email_template_created` (`created` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `homework`.`profile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `homework`.`profile` (
  `id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(300) NOT NULL,
  `description` VARCHAR(300) NULL,
  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uq_profile_name` (`name` ASC) ,
  UNIQUE INDEX `uq_profile_email` (`email` ASC) ,
  INDEX `idx_profile_created` (`created` ASC) )
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
