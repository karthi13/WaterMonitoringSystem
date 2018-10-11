CREATE SCHEMA `water_reporter` ;
CREATE TABLE `water_reporter`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `status` TINYINT(2) NOT NULL,
  `first_ name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` BINARY(60) NOT NULL,
  `phone_num` VARCHAR(12) NOT NULL,
  `locality_id` INT NOT NULL,
  `user_role_id` INT NOT NULL,
  `created_time` TIMESTAMP(6) NOT NULL,
  `updated_time` TIMESTAMP(6) NOT NULL,
  PRIMARY KEY (`user_id`));
CREATE TABLE `water_reporter`.`locality` (
  `locality_id` INT NOT NULL,
  `house_num` VARCHAR(255) NOT NULL,
  `street` VARCHAR(255) NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  `postcode` VARCHAR(10) NOT NULL,
  `municipality_id` INT NOT NULL,
  `created_time` TIMESTAMP(6) NOT NULL,
  PRIMARY KEY (`locality_id`));

CREATE TABLE `water_reporter`.`user_water_measurements` (
  `user_water_measurement_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `locality_id` INT NOT NULL,
  `user_water_usage` DECIMAL(12) NOT NULL,
  `created_time` TIMESTAMP(6) NOT NULL,
  PRIMARY KEY (`user_water_measurement_id`));
CREATE TABLE `water_reporter`.`invoice` (
  `payment_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `amount` DECIMAL(18) NOT NULL,
  `bill_paid_flag` TINYINT(2) NOT NULL,
  `created_time` TIMESTAMP(6) NOT NULL,
  PRIMARY KEY (`payment_id`));

CREATE TABLE `water_reporter`.`roles` (
  `role_id` INT NOT NULL,
  `role` VARCHAR(255) NULL,
  `role_description` VARCHAR(255) NULL,
  PRIMARY KEY (`role_id`));
CREATE TABLE `water_reporter`.`user_roles` (
  `user_role_id` INT NOT NULL,
  `user_id` VARCHAR(45) NOT NULL,
  `role_id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_role_id`));
CREATE TABLE `water_reporter`.`lake_water_measurements` (
  `lake_water_measurement_id` INT NOT NULL,
  `water_available` DECIMAL(18) NOT NULL,
  `water_let_out` DECIMAL(18) NOT NULL,
  `water_income` DECIMAL(18) NOT NULL,
  `tank_id` INT NOT NULL,
  `created_time` TIMESTAMP(6) NOT NULL,
  PRIMARY KEY (`lake_water_measurement_id`));
CREATE TABLE `water_reporter`.`tank_water_measurements` (
  `tank_water_measurement_id` INT NOT NULL,
  `tank_id` INT NOT NULL,
  `water_income` DECIMAL(18) NOT NULL,
  `water_outlet` DECIMAL(18) NOT NULL,
  `created_at` TIMESTAMP(6) NOT NULL,
  PRIMARY KEY (`tank_water_measurement_id`));
CREATE TABLE `water_reporter`.`tank` (
  `tank_id` INT NOT NULL,
  `address_id` INT NOT NULL,
  `locality_id` INT NOT NULL,
  `status` TINYINT(2) NOT NULL,
  PRIMARY KEY (`tank_id`));

CREATE TABLE `water_reporter`.`municipalities` (
  `municipality_id` INT NOT NULL,
  `municipality_name` VARCHAR(255) NOT NULL,
  `municipality_code` VARCHAR(255) NOT NULL,
  `created_time` TIMESTAMP(6) NOT NULL,
  `created_by` INT NOT NULL,
  PRIMARY KEY (`municipality_id`));

CREATE TABLE `water_reporter`.`extra_water_consumption` (
  `extra_water_comsumption_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `water_consumed` DECIMAL(18) NOT NULL,
  `created_time` TIMESTAMP(6) NOT NULL,
  PRIMARY KEY (`extra_water_comsumption_id`));

/*******************************************************************************/
/******** Added Database Created the tables ***********************************/ 