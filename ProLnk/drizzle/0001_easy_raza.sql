CREATE TABLE `broadcasts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`subject` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`sentBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `broadcasts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `commissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`partnerId` int NOT NULL,
	`referralId` int,
	`amount` decimal(10,2) NOT NULL,
	`description` varchar(500),
	`paid` boolean NOT NULL DEFAULT false,
	`paidAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `commissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `partners` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`businessName` varchar(255) NOT NULL,
	`businessType` varchar(100) NOT NULL,
	`serviceArea` varchar(255) NOT NULL,
	`contactName` varchar(255) NOT NULL,
	`contactEmail` varchar(320) NOT NULL,
	`contactPhone` varchar(30),
	`website` varchar(500),
	`description` text,
	`status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`tier` enum('bronze','silver','gold') NOT NULL DEFAULT 'bronze',
	`referralCount` int NOT NULL DEFAULT 0,
	`leadsCount` int NOT NULL DEFAULT 0,
	`totalCommissionEarned` decimal(10,2) NOT NULL DEFAULT '0.00',
	`totalCommissionPaid` decimal(10,2) NOT NULL DEFAULT '0.00',
	`appliedAt` timestamp NOT NULL DEFAULT (now()),
	`approvedAt` timestamp,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `partners_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `referrals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fromPartnerId` int NOT NULL,
	`toPartnerId` int,
	`customerName` varchar(255),
	`customerEmail` varchar(320),
	`customerPhone` varchar(30),
	`serviceType` varchar(100),
	`notes` text,
	`status` enum('pending','contacted','converted','lost') NOT NULL DEFAULT 'pending',
	`commissionAmount` decimal(10,2) DEFAULT '0.00',
	`commissionPaid` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `referrals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `broadcasts` ADD CONSTRAINT `broadcasts_sentBy_users_id_fk` FOREIGN KEY (`sentBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `commissions` ADD CONSTRAINT `commissions_partnerId_partners_id_fk` FOREIGN KEY (`partnerId`) REFERENCES `partners`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `commissions` ADD CONSTRAINT `commissions_referralId_referrals_id_fk` FOREIGN KEY (`referralId`) REFERENCES `referrals`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `partners` ADD CONSTRAINT `partners_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `referrals` ADD CONSTRAINT `referrals_fromPartnerId_partners_id_fk` FOREIGN KEY (`fromPartnerId`) REFERENCES `partners`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `referrals` ADD CONSTRAINT `referrals_toPartnerId_partners_id_fk` FOREIGN KEY (`toPartnerId`) REFERENCES `partners`(`id`) ON DELETE no action ON UPDATE no action;