CREATE TABLE IF NOT EXISTS `eventTriggers` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `propertyId` int,
  `triggerType` enum('storm','asset_age','market_event','safety_recall','manual') NOT NULL,
  `triggerSource` varchar(255),
  `triggerData` json,
  `severity` enum('low','medium','high','critical') DEFAULT 'medium',
  `status` enum('detected','processing','lead_generated','no_match','expired') DEFAULT 'detected',
  `detectedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `processedAt` timestamp,
  `expiresAt` timestamp,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`propertyId`) REFERENCES `properties`(`id`) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS `propertyAssets` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `propertyId` int NOT NULL,
  `assetType` enum('roof','hvac','water_heater','windows','siding','deck','fence','pool','appliance','other') NOT NULL,
  `installYear` int,
  `estimatedLifespanYears` int DEFAULT 20,
  `condition` enum('excellent','good','fair','poor','unknown') DEFAULT 'unknown',
  `lastServicedAt` timestamp,
  `nextServiceDue` timestamp,
  `replacementUrgency` enum('none','watch','soon','urgent') DEFAULT 'none',
  `estimatedReplacementCost` decimal(10,2),
  `photoUrl` text,
  `notes` text,
  `aiAnalyzed` tinyint(1) NOT NULL DEFAULT 0,
  `aiConditionScore` int,
  `aiAnalyzedAt` timestamp,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`propertyId`) REFERENCES `properties`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `eventDrivenLeads` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `triggerId` int,
  `propertyId` int,
  `partnerId` int,
  `leadType` varchar(100),
  `status` enum('new','sent','viewed','accepted','rejected','converted','expired') DEFAULT 'new',
  `matchScore` int DEFAULT 0,
  `estimatedJobValue` decimal(10,2),
  `sentAt` timestamp,
  `viewedAt` timestamp,
  `respondedAt` timestamp,
  `convertedAt` timestamp,
  `notes` text,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`triggerId`) REFERENCES `eventTriggers`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`propertyId`) REFERENCES `properties`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`partnerId`) REFERENCES `partners`(`id`) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS `recallAlerts` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `recallId` varchar(100) NOT NULL UNIQUE,
  `source` enum('cpsc','manufacturer','nhtsa','epa','other') DEFAULT 'cpsc',
  `title` varchar(500) NOT NULL,
  `description` text,
  `affectedProducts` json,
  `hazardType` varchar(255),
  `severity` enum('low','medium','high','critical') DEFAULT 'medium',
  `publishedAt` timestamp,
  `expiresAt` timestamp,
  `affectedPropertyCount` int DEFAULT 0,
  `leadsGenerated` int DEFAULT 0,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `aiPipelineRuns` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `runType` enum('photo_analysis','asset_detection','lead_matching','recall_scan','storm_scan','full_cycle') NOT NULL,
  `status` enum('queued','running','completed','failed','partial') DEFAULT 'queued',
  `inputCount` int DEFAULT 0,
  `outputCount` int DEFAULT 0,
  `errorCount` int DEFAULT 0,
  `processingTimeMs` int,
  `modelVersion` varchar(100),
  `triggeredBy` varchar(100),
  `metadata` json,
  `startedAt` timestamp,
  `completedAt` timestamp,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
