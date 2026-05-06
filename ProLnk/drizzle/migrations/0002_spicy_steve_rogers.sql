CREATE TABLE `advertiserImpressionLog` (
	`id` int AUTO_INCREMENT NOT NULL,
	`advertiserId` int NOT NULL,
	`surface` enum('dashboard','scan_results','email','directory') NOT NULL,
	`date` varchar(10) NOT NULL,
	`impressions` int NOT NULL DEFAULT 0,
	`clicks` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `advertiserImpressionLog_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `advertiserWaitlist` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyName` varchar(200) NOT NULL,
	`contactName` varchar(200) NOT NULL,
	`email` varchar(200) NOT NULL,
	`phone` varchar(50),
	`category` varchar(150),
	`budget` varchar(100),
	`message` text,
	`status` enum('pending','contacted','converted','declined') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `advertiserWaitlist_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `affiliateClicks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`productId` int NOT NULL,
	`source` varchar(100) NOT NULL DEFAULT 'ai_diagnostic',
	`sessionId` varchar(128),
	`repairCategory` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `affiliateClicks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `affiliateProducts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`repairCategory` varchar(100) NOT NULL,
	`productName` varchar(500) NOT NULL,
	`brand` varchar(100),
	`amazonUrl` text NOT NULL,
	`affiliateUrl` text,
	`price` decimal(10,2),
	`rating` decimal(3,1),
	`reviewCount` int,
	`imageUrl` text,
	`isPrimary` boolean NOT NULL DEFAULT false,
	`isActive` boolean NOT NULL DEFAULT true,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `affiliateProducts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `agentActivityLog` (
	`id` int AUTO_INCREMENT NOT NULL,
	`agentId` varchar(80) NOT NULL,
	`action` varchar(255) NOT NULL,
	`outcome` enum('success','failure','pending','blocked') NOT NULL DEFAULT 'success',
	`details` text,
	`inputTokens` int DEFAULT 0,
	`outputTokens` int DEFAULT 0,
	`costCents` int DEFAULT 0,
	`durationMs` int DEFAULT 0,
	`relatedEntityType` varchar(60),
	`relatedEntityId` varchar(120),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `agentActivityLog_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `agentDailyMetrics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`agentId` varchar(80) NOT NULL,
	`date` varchar(10) NOT NULL,
	`actionsCompleted` int DEFAULT 0,
	`successCount` int DEFAULT 0,
	`failureCount` int DEFAULT 0,
	`totalInputTokens` int DEFAULT 0,
	`totalOutputTokens` int DEFAULT 0,
	`totalCostCents` int DEFAULT 0,
	`avgResponseMs` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `agentDailyMetrics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `agentEventBus` (
	`id` int AUTO_INCREMENT NOT NULL,
	`eventType` varchar(120) NOT NULL,
	`publisherAgentId` varchar(80) NOT NULL,
	`payload` text,
	`consumedBy` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `agentEventBus_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `agentRegistry` (
	`id` int AUTO_INCREMENT NOT NULL,
	`agentId` varchar(80) NOT NULL,
	`name` varchar(120) NOT NULL,
	`department` varchar(60) NOT NULL,
	`llmTier` enum('budget','reasoning','supreme','vision') NOT NULL DEFAULT 'budget',
	`llmModel` varchar(120) NOT NULL DEFAULT 'GPT-4o Mini',
	`triggerType` enum('event','schedule','on_demand') NOT NULL DEFAULT 'event',
	`triggerDescription` varchar(255),
	`description` text,
	`status` enum('active','idle','error','suspended','disabled') NOT NULL DEFAULT 'active',
	`parentAgentId` varchar(80),
	`monthlyBudgetCents` int DEFAULT 0,
	`currentMonthSpendCents` int DEFAULT 0,
	`totalActionsLifetime` int DEFAULT 0,
	`successRatePercent` decimal(5,2) DEFAULT '100.00',
	`avgResponseMs` int DEFAULT 0,
	`lastActiveAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `agentRegistry_id` PRIMARY KEY(`id`),
	CONSTRAINT `agentRegistry_agentId_unique` UNIQUE(`agentId`)
);
--> statement-breakpoint
CREATE TABLE `agentRunLog` (
	`id` int AUTO_INCREMENT NOT NULL,
	`agentName` varchar(100) NOT NULL,
	`status` enum('running','completed','failed') NOT NULL DEFAULT 'running',
	`itemsProcessed` int DEFAULT 0,
	`errorMessage` text,
	`durationMs` int,
	`startedAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `agentRunLog_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `analytics_events` (
	`id` int NOT NULL,
	`event_type` varchar(50) NOT NULL,
	`source` varchar(50) NOT NULL,
	`email` varchar(320),
	`user_agent` text,
	`ip_address` varchar(64),
	`referred_by` varchar(100),
	`trades_count` int,
	`sms_opt_in` boolean DEFAULT false,
	`has_license` boolean DEFAULT false,
	`duration` int,
	`form_position` int,
	`metadata` json,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `analytics_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `automationRules` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`triggerType` enum('new_signup','referral_milestone','photo_uploaded','analysis_complete','score_below_threshold','storm_detected','maintenance_due','commission_earned','review_received','partner_inactive','homeowner_inactive','property_anniversary','seasonal_change') NOT NULL,
	`conditionJson` text,
	`actionType` enum('send_email','send_sms','send_notification','assign_task','create_lead','update_score','trigger_webhook','notify_admin','schedule_followup','award_points','flag_for_review') NOT NULL,
	`actionConfigJson` text,
	`isActive` boolean DEFAULT true,
	`executionCount` int DEFAULT 0,
	`lastExecutedAt` datetime,
	`createdBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `automationRules_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `diagnosticSessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`homeownerId` int NOT NULL,
	`propertyAddress` varchar(500),
	`messages` json NOT NULL DEFAULT ('[]'),
	`photoUrls` json DEFAULT ('[]'),
	`diagnosis` text,
	`trade` varchar(100),
	`severity` enum('cosmetic','monitor','soon','urgent','emergency'),
	`scope` text,
	`recommendation` enum('diy','parts_only','pro_required','unknown'),
	`quoteMin` decimal(10,2),
	`quoteMax` decimal(10,2),
	`quoteMaterials` decimal(10,2),
	`quoteLabor` decimal(10,2),
	`quoteBreakdown` json,
	`status` enum('in_progress','completed','abandoned') NOT NULL DEFAULT 'in_progress',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `diagnosticSessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `homeHealthVault` (
	`id` int AUTO_INCREMENT NOT NULL,
	`homeWaitlistId` int,
	`userId` int,
	`propertyAddress` varchar(500),
	`overallHealthScore` int,
	`roofScore` int,
	`hvacScore` int,
	`plumbingScore` int,
	`electricalScore` int,
	`exteriorScore` int,
	`interiorScore` int,
	`lastScanDate` timestamp,
	`totalScans` int DEFAULT 0,
	`activeIssues` int DEFAULT 0,
	`resolvedIssues` int DEFAULT 0,
	`estimatedRepairCost` varchar(20),
	`urgentItems` text,
	`attentionItems` text,
	`goodItems` text,
	`maintenanceSchedule` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `homeHealthVault_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `homeProfiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`homeownerId` int NOT NULL,
	`propertyAddress` varchar(500) NOT NULL,
	`zipCode` varchar(10),
	`yearBuilt` int,
	`squareFootage` int,
	`bedrooms` int,
	`bathrooms` decimal(3,1),
	`hvacBrand` varchar(100),
	`hvacModel` varchar(100),
	`hvacYear` int,
	`hvacType` varchar(100),
	`hvacCondition` varchar(20) DEFAULT 'unknown',
	`hvacNotes` text,
	`roofMaterial` varchar(100),
	`roofYear` int,
	`roofCondition` varchar(20) DEFAULT 'unknown',
	`roofNotes` text,
	`waterHeaterBrand` varchar(100),
	`waterHeaterYear` int,
	`waterHeaterType` varchar(50) DEFAULT 'unknown',
	`waterHeaterFuel` varchar(50) DEFAULT 'unknown',
	`electricalPanelBrand` varchar(100),
	`electricalPanelAmps` int,
	`electricalPanelYear` int,
	`electricalCondition` varchar(20) DEFAULT 'unknown',
	`plumbingMaterial` varchar(100),
	`plumbingCondition` varchar(20) DEFAULT 'unknown',
	`flooringTypes` json DEFAULT ('[]'),
	`appliances` json DEFAULT ('[]'),
	`windowType` varchar(100),
	`windowCondition` varchar(20) DEFAULT 'unknown',
	`activeAlerts` json DEFAULT ('[]'),
	`lastScannedAt` timestamp,
	`originatingPartnerId` int,
	`originationOverrideRate` decimal(5,4) DEFAULT '0.0150',
	`originationLockedAt` timestamp,
	`isDraft` boolean NOT NULL DEFAULT false,
	`draftOutreachSentAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `homeProfiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `homeownerDataConsent` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`homeownerProfileId` int,
	`consentPhotoAnalysis` boolean NOT NULL DEFAULT false,
	`consentAnonymizedDataLicensing` boolean NOT NULL DEFAULT false,
	`consentAggregateInsights` boolean NOT NULL DEFAULT false,
	`consentPropertyConditionTracking` boolean NOT NULL DEFAULT false,
	`consentVersion` varchar(20) NOT NULL DEFAULT '1.0',
	`consentedAt` timestamp NOT NULL DEFAULT (now()),
	`ipAddress` varchar(64),
	`userAgent` varchar(512),
	`revokedAt` timestamp,
	`revocationReason` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `homeownerDataConsent_id` PRIMARY KEY(`id`),
	CONSTRAINT `homeownerDataConsent_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `laborRates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`trade` varchar(100) NOT NULL,
	`jobType` varchar(255),
	`zipCluster` varchar(50) NOT NULL DEFAULT 'DFW',
	`rateMin` decimal(10,2) NOT NULL,
	`rateMax` decimal(10,2) NOT NULL,
	`rateMedian` decimal(10,2) NOT NULL,
	`rateUnit` varchar(50) NOT NULL DEFAULT 'per_job',
	`source` varchar(100) NOT NULL DEFAULT 'homeadvisor',
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `laborRates_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `materialsPricing` (
	`id` int AUTO_INCREMENT NOT NULL,
	`item` varchar(255) NOT NULL,
	`category` varchar(100) NOT NULL,
	`unit` varchar(50) NOT NULL,
	`priceMin` decimal(10,2) NOT NULL,
	`priceMax` decimal(10,2) NOT NULL,
	`priceAvg` decimal(10,2) NOT NULL,
	`source` varchar(100) NOT NULL DEFAULT 'home_depot',
	`region` varchar(50) NOT NULL DEFAULT 'DFW',
	`sku` varchar(100),
	`productUrl` text,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `materialsPricing_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mediaLibrary` (
	`id` int AUTO_INCREMENT NOT NULL,
	`uploaderId` int NOT NULL,
	`uploaderType` enum('partner','homeowner','admin','ai') NOT NULL,
	`fileUrl` text NOT NULL,
	`fileKey` text NOT NULL,
	`fileName` varchar(255),
	`mimeType` varchar(100),
	`fileSizeBytes` int,
	`category` enum('job_photo','before_after','profile','property','document','marketing','ai_generated') DEFAULT 'job_photo',
	`tags` text,
	`propertyId` int,
	`jobId` int,
	`sessionId` int,
	`aiAnalyzed` boolean DEFAULT false,
	`aiTags` text,
	`aiDescription` text,
	`isPublic` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `mediaLibrary_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notificationPreferences` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`channel` enum('email','sms','push','in_app') NOT NULL,
	`category` varchar(100) NOT NULL,
	`enabled` boolean DEFAULT true,
	`frequency` enum('instant','daily_digest','weekly_digest','never') DEFAULT 'instant',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `notificationPreferences_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `partnerCheckIns` (
	`id` int AUTO_INCREMENT NOT NULL,
	`partnerId` int NOT NULL,
	`jobId` int,
	`propertyId` int,
	`checkInType` enum('job_start','job_progress','job_complete','site_visit','estimate') NOT NULL,
	`latitude` decimal(10,7),
	`longitude` decimal(10,7),
	`address` text,
	`photoUrl` text,
	`notes` text,
	`verifiedByGeo` boolean DEFAULT false,
	`verifiedByPhoto` boolean DEFAULT false,
	`verifiedByHomeowner` boolean DEFAULT false,
	`homeownerRating` int,
	`homeownerFeedback` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `partnerCheckIns_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `partnerPhotoConsent` (
	`id` int AUTO_INCREMENT NOT NULL,
	`partnerId` int NOT NULL,
	`consentedAt` timestamp NOT NULL DEFAULT (now()),
	`consentVersion` varchar(20) NOT NULL DEFAULT '1.0',
	`ipAddress` varchar(64),
	`userAgent` varchar(512),
	`consentPhotoStorage` boolean NOT NULL DEFAULT true,
	`consentAiAnalysis` boolean NOT NULL DEFAULT true,
	`consentLeadRouting` boolean NOT NULL DEFAULT true,
	`revokedAt` timestamp,
	CONSTRAINT `partnerPhotoConsent_id` PRIMARY KEY(`id`),
	CONSTRAINT `partnerPhotoConsent_partnerId_unique` UNIQUE(`partnerId`)
);
--> statement-breakpoint
CREATE TABLE `partnerSpotlights` (
	`id` int AUTO_INCREMENT NOT NULL,
	`partnerId` int NOT NULL,
	`headline` varchar(255) NOT NULL,
	`story` text,
	`photoUrl` text,
	`videoUrl` text,
	`featuredMetric` varchar(100),
	`featuredMetricValue` varchar(100),
	`category` enum('top_earner','most_referrals','best_rated','fastest_response','community_hero','new_partner') DEFAULT 'top_earner',
	`isActive` boolean DEFAULT true,
	`displayOrder` int DEFAULT 0,
	`startDate` datetime,
	`endDate` datetime,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `partnerSpotlights_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `photoAccessLog` (
	`id` int AUTO_INCREMENT NOT NULL,
	`photoUrl` text NOT NULL,
	`jobId` int,
	`accessedByPartnerId` int,
	`accessedByUserId` int,
	`accessedByRole` enum('partner','admin','system','ai_pipeline') NOT NULL DEFAULT 'partner',
	`accessType` enum('view','download','ai_analysis','upload') NOT NULL DEFAULT 'view',
	`ipAddress` varchar(64),
	`userAgent` varchar(512),
	`accessedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `photoAccessLog_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `photoSessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`homeownerProfileId` int,
	`jobId` int,
	`propertyId` int,
	`sessionType` varchar(20) NOT NULL DEFAULT 'manual',
	`roomArea` varchar(100) NOT NULL,
	`roomAreaCustom` varchar(200),
	`platform` varchar(20) NOT NULL DEFAULT 'trustypro',
	`photoType` varchar(20) NOT NULL DEFAULT 'both',
	`referencePhotoUrl` text,
	`referencePhotoKey` varchar(512),
	`detailPhotoUrls` text,
	`detailPhotoKeys` text,
	`photoCount` int NOT NULL DEFAULT 0,
	`aiGroupingConfidence` int,
	`aiGroupingConfirmed` boolean DEFAULT false,
	`analysisStatus` varchar(30) NOT NULL DEFAULT 'pending',
	`analysisResult` text,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `photoSessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `propertyConditionData` (
	`id` int AUTO_INCREMENT NOT NULL,
	`propertyId` int,
	`scanHistoryId` int,
	`photoId` int,
	`source` enum('partner_job','trustypro_scan','homeowner_upload','field_app') NOT NULL,
	`sourcePartnerId` int,
	`sourceUserId` int,
	`photoUrl` text,
	`photoTimestamp` timestamp,
	`photoLatitude` decimal(10,7),
	`photoLongitude` decimal(10,7),
	`photoExifData` json DEFAULT ('{}'),
	`roomLabel` varchar(100),
	`roomConditionScore` int,
	`roomConditionScores` json DEFAULT ('[]'),
	`systemAgeEstimates` json DEFAULT ('[]'),
	`materialIdentifications` json DEFAULT ('[]'),
	`damageFlags` json DEFAULT ('[]'),
	`applianceInventory` json DEFAULT ('[]'),
	`energyIndicators` json DEFAULT ('[]'),
	`safetyFeatures` json DEFAULT ('[]'),
	`structuralIndicators` json DEFAULT ('[]'),
	`futureValueFields` json DEFAULT ('[]'),
	`hasBeforeAfter` boolean NOT NULL DEFAULT false,
	`renovationType` varchar(100),
	`renovationEstimatedCost` decimal(10,2),
	`overallConditionScore` int,
	`overallConditionLabel` enum('excellent','good','fair','needs_attention','critical'),
	`dataQualityScore` int,
	`fieldsPopulated` int DEFAULT 0,
	`totalPossibleFields` int DEFAULT 17,
	`zipCode` varchar(10),
	`city` varchar(100),
	`state` varchar(10),
	`anonymizedHash` varchar(64),
	`isAnonymizedExport` boolean NOT NULL DEFAULT false,
	`rawAiResponse` json,
	`scannedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `propertyConditionData_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `seasonalMaintenanceTasks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`propertyId` int NOT NULL,
	`userId` int NOT NULL,
	`taskName` varchar(255) NOT NULL,
	`description` text,
	`category` enum('hvac','roof','plumbing','electrical','exterior','interior','landscaping','pest_control','appliance') NOT NULL,
	`season` enum('spring','summer','fall','winter') NOT NULL,
	`dueMonth` int,
	`priority` enum('low','medium','high','urgent') DEFAULT 'medium',
	`status` enum('upcoming','due','overdue','completed','skipped') DEFAULT 'upcoming',
	`completedAt` datetime,
	`completedByPartnerId` int,
	`estimatedCost` decimal(10,2),
	`actualCost` decimal(10,2),
	`reminderSentAt` datetime,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `seasonalMaintenanceTasks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sessionPhotos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` int NOT NULL,
	`photoUrl` text NOT NULL,
	`thumbnailUrl` text,
	`roomType` varchar(100),
	`roomLabel` varchar(200),
	`analysisStatus` varchar(30) NOT NULL DEFAULT 'pending',
	`qualityScore` int,
	`findings` text,
	`segmentationOverlayUrl` text,
	`aiModel` varchar(100),
	`processingTimeMs` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sessionPhotos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `supremeCourtAudit` (
	`id` int AUTO_INCREMENT NOT NULL,
	`requestingAgentId` varchar(80) NOT NULL,
	`actionAttempted` varchar(255) NOT NULL,
	`category` enum('content','spend','partner_action','data_access','pricing','legal') NOT NULL,
	`ruling` enum('approved','blocked','escalated') NOT NULL,
	`reason` text,
	`validatorModel` varchar(80),
	`confidencePercent` decimal(5,2),
	`reviewedBy` varchar(80),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `supremeCourtAudit_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `systemHealthLog` (
	`id` int AUTO_INCREMENT NOT NULL,
	`service` varchar(80) NOT NULL,
	`status` enum('ok','degraded','down') NOT NULL DEFAULT 'ok',
	`responseMs` int,
	`errorMessage` varchar(500),
	`checkedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `systemHealthLog_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `homeWaitlist` ADD `rejectionReason` varchar(500);--> statement-breakpoint
ALTER TABLE `homeWaitlist` ADD `rejectedAt` timestamp;--> statement-breakpoint
ALTER TABLE `homeWaitlist` ADD `activatedAt` timestamp;--> statement-breakpoint
ALTER TABLE `proWaitlist` ADD `rejectionReason` varchar(500);--> statement-breakpoint
ALTER TABLE `proWaitlist` ADD `rejectedAt` timestamp;--> statement-breakpoint
ALTER TABLE `proWaitlist` ADD `activatedAt` timestamp;--> statement-breakpoint
ALTER TABLE `homeHealthVault` ADD CONSTRAINT `homeHealthVault_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `homeProfiles` ADD CONSTRAINT `homeProfiles_originatingPartnerId_partners_id_fk` FOREIGN KEY (`originatingPartnerId`) REFERENCES `partners`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `homeownerDataConsent` ADD CONSTRAINT `homeownerDataConsent_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `homeownerDataConsent` ADD CONSTRAINT `homeownerDataConsent_homeownerProfileId_homeownerProfiles_id_fk` FOREIGN KEY (`homeownerProfileId`) REFERENCES `homeownerProfiles`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `photoSessions` ADD CONSTRAINT `photoSessions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `photoSessions` ADD CONSTRAINT `photoSessions_homeownerProfileId_homeownerProfiles_id_fk` FOREIGN KEY (`homeownerProfileId`) REFERENCES `homeownerProfiles`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `propertyConditionData` ADD CONSTRAINT `propertyConditionData_propertyId_properties_id_fk` FOREIGN KEY (`propertyId`) REFERENCES `properties`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `propertyConditionData` ADD CONSTRAINT `propertyConditionData_scanHistoryId_homeownerScanHistory_id_fk` FOREIGN KEY (`scanHistoryId`) REFERENCES `homeownerScanHistory`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `propertyConditionData` ADD CONSTRAINT `propertyConditionData_photoId_propertyPhotos_id_fk` FOREIGN KEY (`photoId`) REFERENCES `propertyPhotos`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `propertyConditionData` ADD CONSTRAINT `propertyConditionData_sourcePartnerId_partners_id_fk` FOREIGN KEY (`sourcePartnerId`) REFERENCES `partners`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `propertyConditionData` ADD CONSTRAINT `propertyConditionData_sourceUserId_users_id_fk` FOREIGN KEY (`sourceUserId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `sessionPhotos` ADD CONSTRAINT `sessionPhotos_sessionId_photoSessions_id_fk` FOREIGN KEY (`sessionId`) REFERENCES `photoSessions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `analytics_event_type_idx` ON `analytics_events` (`event_type`);--> statement-breakpoint
CREATE INDEX `analytics_source_idx` ON `analytics_events` (`source`);--> statement-breakpoint
CREATE INDEX `analytics_email_idx` ON `analytics_events` (`email`);--> statement-breakpoint
CREATE INDEX `analytics_created_at_idx` ON `analytics_events` (`created_at`);