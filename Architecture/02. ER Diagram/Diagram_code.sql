CREATE TABLE `Account` (
  `id` long PRIMARY KEY,
  `fullName` varchar(255),
  `birthdate` date,
  `addressId` long,
  `email` varchar(255) UNIQUE,
  `taxNumber` varchar(255),
  `idNumber` int,
  `createdAt` datetime,
  `balance` long,
  `updatedAt` datetime
);

CREATE TABLE `Address` (
  `id` long PRIMARY KEY,
  `line1` varchar(255),
  `line2` varchar(255),
  `postalCode` varchar(255),
  `city` varchar(255),
  `district` varchar(255),
  `updatedAt` datetime
);

CREATE TABLE `Transfers` (
  `id` long PRIMARY KEY,
  `date` datetime,
  `senderId` long,
  `receiverId` long,
  `amount` long,
  `metadata` json,
  `notes` varchar(255),
  `image` Image,
  `updatedAt` datetime
);

CREATE TABLE `Cards` (
  `id` long PRIMARY KEY,
  `name` varchar(255),
  `expiryDate` date,
  `pinCode` int,
  `onlinePayments` boolean,
  `nfcPayments` boolean,
  `accountId` long,
  `createdAt` datetime
);

CREATE TABLE `DirectDebit` (
  `id` long PRIMARY KEY,
  `active` boolean,
  `amount` long,
  `date` date,
  `receiverId` long,
  `senderId` long,
  `lastDebitId` long,
  `updatedAt` datetime
);

CREATE TABLE `StandingOrder` (
  `id` long PRIMARY KEY,
  `date` date,
  `receiverId` long,
  `amount` long,
  `frequency` enum,
  `senderId` long,
  `updatedAt` datetime
);

CREATE TABLE `TelcoProviders` (
  `id` long PRIMARY KEY,
  `name` varchar(255),
  `updatedAt` datetime
);

ALTER TABLE `Address` ADD FOREIGN KEY (`id`) REFERENCES `Account` (`addressId`);

ALTER TABLE `Transfers` ADD FOREIGN KEY (`senderId`) REFERENCES `Account` (`id`);

ALTER TABLE `Transfers` ADD FOREIGN KEY (`receiverId`) REFERENCES `Account` (`id`);

ALTER TABLE `Cards` ADD FOREIGN KEY (`accountId`) REFERENCES `Account` (`id`);

ALTER TABLE `DirectDebit` ADD FOREIGN KEY (`receiverId`) REFERENCES `Account` (`id`);

ALTER TABLE `DirectDebit` ADD FOREIGN KEY (`senderId`) REFERENCES `Account` (`id`);

ALTER TABLE `DirectDebit` ADD FOREIGN KEY (`lastDebitId`) REFERENCES `Transfers` (`id`);

ALTER TABLE `StandingOrder` ADD FOREIGN KEY (`senderId`) REFERENCES `Account` (`id`);

ALTER TABLE `TelcoProviders` ADD FOREIGN KEY (`id`) REFERENCES `Transfers` (`receiverId`);

ALTER TABLE `TelcoProviders` ADD FOREIGN KEY (`id`) REFERENCES `StandingOrder` (`receiverId`);

ALTER TABLE `DirectDebit` ADD FOREIGN KEY (`receiverId`) REFERENCES `TelcoProviders` (`id`);
