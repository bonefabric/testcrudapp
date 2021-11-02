DROP DATABASE IF EXISTS crudgo;

CREATE DATABASE crudgo;

USE crudgo;

CREATE TABLE `datacenter`
(
    `id`      INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `dc`      VARCHAR(255) NOT NULL,
    `login`   VARCHAR(255) NOT NULL UNIQUE,
    `pass`    VARCHAR(255) NOT NULL,
    `comment` VARCHAR(255)
) DEFAULT CHARSET = utf8;

CREATE TABLE `net`
(
    `id`      INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `dc_id`   INT(11) UNSIGNED NOT NULL,
    `net`     VARCHAR(255)     NOT NULL,
    `mask`    VARCHAR(255)     NOT NULL,
    `gateway` VARCHAR(255)     NOT NULL,
    `comment` VARCHAR(255),

    CONSTRAINT `fk_net_dc` FOREIGN KEY (`dc_id`) REFERENCES `datacenter` (`id`)

) DEFAULT CHARSET = utf8;

CREATE TABLE `ip`
(
    `id`     INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `ip`     VARCHAR(255)     NOT NULL UNIQUE,
    `net_id` INT(11) UNSIGNED NOT NULL,

    CONSTRAINT `fk_ip_net` FOREIGN KEY (`net_id`) REFERENCES `net` (`id`)

) DEFAULT CHARSET = utf8;

CREATE TABLE `esxi`
(
    `id`      INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `dc_id`   INT(11) UNSIGNED NOT NULL,
    `esxname` VARCHAR(255)     NOT NULL,
    `ip_id`   INT(11) UNSIGNED NOT NULL,
    `info`    VARCHAR(255),
    `net_id`  INT(11) UNSIGNED NOT NULL,

    CONSTRAINT `fk_esxi_dc` FOREIGN KEY (`dc_id`) REFERENCES `datacenter` (`id`),
    CONSTRAINT `fk_esxi_ip` FOREIGN KEY (`ip_id`) REFERENCES `ip` (`id`),
    CONSTRAINT `fk_esxi_net` FOREIGN KEY (`net_id`) REFERENCES `net` (`id`)

) DEFAULT CHARSET = utf8;

CREATE TABLE `vm`
(
    `id`     INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `esx_id` INT(11) UNSIGNED NOT NULL,
    `ip_id`  INT(11) UNSIGNED NOT NULL,
    `net_id` INT(11) UNSIGNED NOT NULL,
    `attr`   VARCHAR(255),
    `vmname` VARCHAR(255)     NOT NULL,

    CONSTRAINT `fk_vm_esx` FOREIGN KEY (`esx_id`) REFERENCES `esxi` (`id`),
    CONSTRAINT `fk_vm_ip` FOREIGN KEY (`ip_id`) REFERENCES `ip` (`id`),
    CONSTRAINT `fk_vm_net` FOREIGN KEY (`net_id`) REFERENCES `net` (`id`)

) DEFAULT CHARSET = utf8;