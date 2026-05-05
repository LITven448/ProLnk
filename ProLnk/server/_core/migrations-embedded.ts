// Auto-generated migration SQL embedded in code for production builds

export const MIGRATION_0000 = String.raw`
CREATE TABLE IF NOT EXISTS \`acceptanceSignals\` (
	\`id\` int NOT NULL,
	\`opportunityId\` int NOT NULL,
	\`propertyProfileId\` int,
	\`tradeCategory\` varchar(100) NOT NULL,
	\`offerAmount\` decimal(10,2),
	\`standardMarketPrice\` decimal(10,2),
	\`discountPct\` decimal(5,2),
	\`outcome\` text NOT NULL,
	\`timeToRespondHours\` decimal(8,2),
	\`deliveryChannel\` text,
	\`deliveryHourOfDay\` int,
	\`deliveryDayOfWeek\` int,
	\`deliveryMonth\` int,
	\`deliverySeason\` text,
	\`propertyZip\` varchar(20),
	\`propertyCity\` varchar(100),
	\`propertyState\` varchar(50),
	\`isFirstOffer\` boolean DEFAULT true,
	\`priorOfferCount\` int DEFAULT 0,
	\`recordedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`acceptanceSignals_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`achAuthorizations\` (
	\`id\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`jobPaymentId\` int,
	\`dealId\` int,
	\`stripeCustomerId\` varchar(255),
	\`stripePaymentMethodId\` varchar(255),
	\`stripeMandateId\` varchar(255),
	\`bankName\` varchar(200),
	\`bankLast4\` varchar(4),
	\`bankRoutingNumber\` varchar(9),
	\`accountType\` varchar(255) DEFAULT 'checking',
	\`authorizationType\` varchar(255) NOT NULL DEFAULT 'single_job',
	\`maxPullAmount\` decimal(10,2),
	\`authorizationText\` text NOT NULL,
	\`signedAt\` timestamp,
	\`signerName\` varchar(255),
	\`signerIpAddress\` varchar(45),
	\`signerUserAgent\` text,
	\`status\` varchar(255) NOT NULL DEFAULT 'pending_signature',
	\`expiresAt\` timestamp,
	\`revokedAt\` timestamp,
	\`revokedReason\` text,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`achAuthorizations_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`activityLog\` (
	\`id\` int NOT NULL,
	\`eventType\` varchar(64) NOT NULL,
	\`actorId\` int,
	\`actorName\` varchar(128),
	\`actorRole\` varchar(255) NOT NULL DEFAULT 'system',
	\`entityType\` varchar(64),
	\`entityId\` int,
	\`entityName\` varchar(255),
	\`description\` text NOT NULL,
	\`metadata\` json,
	\`ipAddress\` varchar(64),
	\`createdAt\` timestamp DEFAULT (now()),
	CONSTRAINT \`activityLog_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`adminAuditLog\` (
	\`id\` int NOT NULL,
	\`adminUserId\` int NOT NULL,
	\`action\` varchar(100) NOT NULL,
	\`targetType\` varchar(50),
	\`targetId\` int,
	\`detail\` text,
	\`ipAddress\` varchar(64),
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`adminAuditLog_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`agentHomeownerReferrals\` (
	\`id\` int NOT NULL,
	\`agentId\` int NOT NULL,
	\`homeownerName\` varchar(200) NOT NULL,
	\`homeownerEmail\` varchar(300),
	\`homeownerPhone\` varchar(30),
	\`propertyAddress\` varchar(500),
	\`referralDirection\` text NOT NULL,
	\`saleStatus\` varchar(255) NOT NULL DEFAULT 'active',
	\`salePrice\` decimal(12,2),
	\`agentCommissionAmount\` decimal(12,2),
	\`proLnkReferralFee\` decimal(12,2),
	\`saleClosedAt\` timestamp,
	\`referralFeePaidAt\` timestamp,
	\`homeownerUserId\` int,
	\`perpetualCommissionActive\` boolean NOT NULL DEFAULT true,
	\`totalPerpetualEarned\` decimal(12,2) NOT NULL DEFAULT '0.00',
	\`notes\` text,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`agentHomeownerReferrals_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`agentPerpetualCommissions\` (
	\`id\` int NOT NULL,
	\`agentId\` int NOT NULL,
	\`referralId\` int NOT NULL,
	\`opportunityId\` int,
	\`proLnkCommissionAmount\` decimal(10,2) NOT NULL,
	\`agentEarnedAmount\` decimal(10,2) NOT NULL,
	\`paid\` boolean NOT NULL DEFAULT false,
	\`paidAt\` timestamp,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`agentPerpetualCommissions_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`agentProperties\` (
	\`id\` int NOT NULL,
	\`agentUserId\` int NOT NULL,
	\`address\` varchar(500) NOT NULL,
	\`city\` varchar(100),
	\`state\` varchar(10),
	\`zipCode\` varchar(10),
	\`mlsNumber\` varchar(50),
	\`listPrice\` int,
	\`status\` varchar(255) NOT NULL DEFAULT 'active',
	\`propertyType\` varchar(50),
	\`bedrooms\` int,
	\`bathrooms\` varchar(10),
	\`squareFootage\` int,
	\`yearBuilt\` int,
	\`notes\` text,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`agentProperties_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`aiPipelineRuns\` (
	\`id\` int NOT NULL,
	\`photoId\` int,
	\`jobId\` int,
	\`partnerId\` int,
	\`stage\` varchar(255) NOT NULL DEFAULT ('preprocessing'),
	\`preprocessResult\` json,
	\`relevanceResult\` json,
	\`featureResult\` json,
	\`classificationResult\` json,
	\`confidenceResult\` json,
	\`conditionsDetected\` int NOT NULL DEFAULT 0,
	\`leadsGenerated\` int NOT NULL DEFAULT 0,
	\`highestConfidence\` decimal(5,4),
	\`totalProcessingMs\` int,
	\`status\` varchar(255) NOT NULL DEFAULT 'running',
	\`errorMessage\` text,
	\`startedAt\` timestamp NOT NULL DEFAULT (now()),
	\`completedAt\` timestamp,
	CONSTRAINT \`aiPipelineRuns_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`aiTrainingDataset\` (
	\`id\` int NOT NULL,
	\`jobId\` int,
	\`opportunityId\` int,
	\`beforePhotoUrl\` text,
	\`afterPhotoUrl\` text,
	\`detectionType\` varchar(100) NOT NULL,
	\`detectionCategory\` varchar(100) NOT NULL,
	\`aiConfidenceScore\` decimal(4,3),
	\`validationOutcome\` varchar(255) DEFAULT ('pending'),
	\`propertyType\` varchar(50),
	\`propertyZip\` varchar(20),
	\`propertyState\` varchar(50),
	\`capturedMonth\` int,
	\`capturedSeason\` text,
	\`modelVersion\` varchar(50) DEFAULT 'v1',
	\`approvedForTraining\` boolean DEFAULT false,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`aiTrainingDataset_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`broadcasts\` (
	\`id\` int NOT NULL,
	\`subject\` varchar(255) NOT NULL,
	\`message\` text NOT NULL,
	\`sentBy\` int,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`broadcasts_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`circumventionFlags\` (
	\`id\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`homeownerId\` int,
	\`opportunityId\` int,
	\`signalType\` varchar(50) NOT NULL,
	\`severity\` varchar(20) NOT NULL DEFAULT 'warning',
	\`details\` text NOT NULL,
	\`status\` varchar(20) NOT NULL DEFAULT 'open',
	\`resolvedAt\` timestamp,
	\`resolvedBy\` int,
	\`resolutionNote\` text,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`circumventionFlags_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`commercialWaitlist\` (
	\`id\` int NOT NULL,
	\`businessName\` varchar(255) NOT NULL,
	\`contactName\` varchar(255) NOT NULL,
	\`contactEmail\` varchar(255) NOT NULL,
	\`contactPhone\` varchar(30),
	\`businessType\` varchar(100) NOT NULL,
	\`portfolioSize\` varchar(100) NOT NULL,
	\`serviceArea\` varchar(255),
	\`yearsInBusiness\` varchar(20),
	\`currentSoftware\` varchar(255),
	\`establishedJobsPerMonth\` varchar(20),
	\`notes\` text,
	\`status\` varchar(30) DEFAULT 'pending',
	\`reviewedAt\` bigint,
	\`invitedAt\` bigint,
	\`createdAt\` bigint NOT NULL,
	CONSTRAINT \`commercialWaitlist_id\` PRIMARY KEY(\`id\`),
	CONSTRAINT \`commercialWaitlist_contactEmail_unique\` UNIQUE(\`contactEmail\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`commission_payout\` (
	\`id\` int NOT NULL,
	\`job_commission_event_id\` int NOT NULL,
	\`recipient_user_id\` varchar(255) NOT NULL,
	\`source_pro_user_id\` varchar(255) NOT NULL,
	\`payout_type\` varchar(30) NOT NULL,
	\`rate_applied\` decimal(5,4) NOT NULL,
	\`amount\` decimal(10,2) NOT NULL,
	\`status\` varchar(20) NOT NULL DEFAULT 'pending',
	\`payout_month\` varchar(7) NOT NULL,
	\`paid_at\` timestamp,
	\`created_at\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`commission_payout_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`commissions\` (
	\`id\` int NOT NULL,
	\`opportunityId\` int,
	\`payingPartnerId\` int,
	\`receivingPartnerId\` int,
	\`commissionType\` text NOT NULL,
	\`amount\` decimal(10,2) NOT NULL,
	\`jobValue\` decimal(10,2),
	\`feeRate\` decimal(5,4),
	\`description\` varchar(500),
	\`paid\` boolean NOT NULL DEFAULT false,
	\`paidAt\` timestamp,
	\`disputeStatus\` varchar(255) NOT NULL DEFAULT ('none'),
	\`disputeReason\` varchar(1000),
	\`disputeOpenedAt\` timestamp,
	\`disputeResolvedAt\` timestamp,
	\`disputeResolvedBy\` int,
	\`disputeResolutionNote\` varchar(1000),
	\`disputeEvidenceUrls\` text,
	\`disputeAiAssessment\` varchar(200),
	\`disputeAiConfidence\` decimal(4,2),
	\`disputeAiReasoning\` varchar(500),
	\`disputeAppealedAt\` timestamp,
	\`disputeAppealReason\` varchar(1000),
	\`disputeAppealStatus\` varchar(255) NOT NULL DEFAULT ('none'),
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`commissions_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`complianceEvents\` (
	\`id\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`eventType\` text NOT NULL,
	\`reason\` varchar(500) NOT NULL,
	\`adminUserId\` int,
	\`adminName\` varchar(255),
	\`resolutionNote\` text,
	\`resolvedAt\` timestamp,
	\`metadata\` json,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`complianceEvents_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`contentItems\` (
	\`id\` int NOT NULL,
	\`contentType\` text NOT NULL,
	\`title\` varchar(255) NOT NULL,
	\`body\` text,
	\`url\` varchar(1024),
	\`category\` varchar(100),
	\`tags\` json DEFAULT ('[]'),
	\`isPublished\` boolean NOT NULL DEFAULT false,
	\`publishedAt\` timestamp,
	\`sortOrder\` int NOT NULL DEFAULT 0,
	\`createdBy\` int,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`contentItems_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`customerDeals\` (
	\`id\` int NOT NULL,
	\`token\` varchar(64) NOT NULL,
	\`opportunityId\` int NOT NULL,
	\`referringPartnerId\` int NOT NULL,
	\`receivingPartnerId\` int,
	\`homeownerName\` varchar(255),
	\`homeownerEmail\` varchar(320),
	\`homeownerPhone\` varchar(30),
	\`homeownerAddress\` text,
	\`homeownerCity\` varchar(100),
	\`homeownerZip\` varchar(20),
	\`issueType\` varchar(100) NOT NULL,
	\`issueCategory\` varchar(100) NOT NULL,
	\`issueDescription\` text NOT NULL,
	\`issueDescriptionShort\` varchar(100),
	\`photoUrl\` varchar(1000),
	\`photoUrls\` json DEFAULT ('[]'),
	\`signatureData\` text,
	\`signedAt\` int,
	\`signerName\` varchar(255),
	\`aiConfidence\` int,
	\`estimatedValueLow\` decimal(10,2),
	\`estimatedValueHigh\` decimal(10,2),
	\`homeownerMessageSnippet\` text,
	\`status\` varchar(255) NOT NULL DEFAULT 'draft',
	\`scheduledAt\` timestamp,
	\`scheduleConfirmedAt\` timestamp,
	\`calBookingId\` varchar(255),
	\`expiresAt\` timestamp,
	\`viewCount\` int NOT NULL DEFAULT 0,
	\`firstViewedAt\` timestamp,
	\`lastViewedAt\` timestamp,
	\`emailSentAt\` timestamp,
	\`smsSentAt\` timestamp,
	\`emailOpenedAt\` timestamp,
	\`actualJobValue\` decimal(10,2),
	\`jobClosedAt\` timestamp,
	\`homeownerConfirmedAt\` timestamp,
	\`homeownerConfirmRating\` int,
	\`homeownerConfirmNote\` text,
	\`aiFixImageUrl\` text,
	\`aiFixGeneratedAt\` timestamp,
	\`aiFixPrompt\` text,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`customerDeals_id\` PRIMARY KEY(\`id\`),
	CONSTRAINT \`customerDeals_token_unique\` UNIQUE(\`token\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`dataExportRequests\` (
	\`id\` int NOT NULL,
	\`homeownerId\` int NOT NULL,
	\`status\` varchar(255) NOT NULL DEFAULT 'pending',
	\`requestedAt\` int NOT NULL,
	\`processedAt\` int,
	\`exportUrl\` varchar(1024),
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`dataExportRequests_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`eventDrivenLeads\` (
	\`id\` int NOT NULL,
	\`triggerId\` int,
	\`propertyId\` int,
	\`partnerId\` int,
	\`leadType\` text NOT NULL,
	\`context\` json,
	\`status\` varchar(255) NOT NULL DEFAULT 'generated',
	\`estimatedJobValue\` decimal(10,2),
	\`actualJobValue\` decimal(10,2),
	\`commissionEarned\` decimal(10,2),
	\`priority\` int NOT NULL DEFAULT 3,
	\`dispatchedAt\` timestamp,
	\`acceptedAt\` timestamp,
	\`completedAt\` timestamp,
	\`expiresAt\` timestamp,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`eventDrivenLeads_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`eventTriggers\` (
	\`id\` int NOT NULL,
	\`type\` text NOT NULL,
	\`sourceData\` json,
	\`title\` varchar(512) NOT NULL,
	\`description\` text,
	\`region\` varchar(255),
	\`zipCodes\` json,
	\`latitude\` decimal(10,6),
	\`longitude\` decimal(10,6),
	\`radiusMiles\` int,
	\`severity\` int NOT NULL DEFAULT 3,
	\`status\` varchar(255) NOT NULL DEFAULT 'active',
	\`propertiesMatched\` int NOT NULL DEFAULT 0,
	\`leadsGenerated\` int NOT NULL DEFAULT 0,
	\`estimatedRevenue\` decimal(10,2) NOT NULL DEFAULT '0.00',
	\`eventDate\` timestamp,
	\`firedAt\` timestamp NOT NULL DEFAULT (now()),
	\`completedAt\` timestamp,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`eventTriggers_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`exchangeBids\` (
	\`id\` int NOT NULL,
	\`jobId\` int NOT NULL,
	\`biddingPartnerId\` int NOT NULL,
	\`bidAmount\` decimal(10,2) NOT NULL,
	\`message\` text,
	\`status\` varchar(255) NOT NULL DEFAULT 'pending',
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`exchangeBids_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`exchangeJobs\` (
	\`id\` int NOT NULL,
	\`postedByPartnerId\` int NOT NULL,
	\`title\` varchar(255) NOT NULL,
	\`description\` text NOT NULL,
	\`jobType\` varchar(255) NOT NULL DEFAULT ('residential'),
	\`tradeCategory\` varchar(100) NOT NULL,
	\`location\` varchar(255) NOT NULL,
	\`totalValue\` decimal(10,2) NOT NULL,
	\`brokerMargin\` decimal(5,2) NOT NULL DEFAULT '10.00',
	\`deadline\` timestamp,
	\`status\` varchar(255) NOT NULL DEFAULT 'open',
	\`scopeItems\` text,
	\`clientName\` varchar(255),
	\`isCommercial\` boolean DEFAULT false,
	\`bidsCount\` int NOT NULL DEFAULT 0,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`exchangeJobs_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`featuredAdvertisers\` (
	\`id\` int NOT NULL,
	\`businessName\` varchar(200) NOT NULL,
	\`contactName\` varchar(200),
	\`contactEmail\` varchar(200),
	\`contactPhone\` varchar(50),
	\`category\` varchar(100) NOT NULL,
	\`zipCodes\` varchar(255) NOT NULL DEFAULT ('[]'),
	\`monthlyFee\` decimal(10,2) NOT NULL DEFAULT '0',
	\`status\` varchar(255) NOT NULL DEFAULT 'pending',
	\`bannerTitle\` varchar(200),
	\`bannerSubtitle\` varchar(500),
	\`bannerCtaText\` varchar(100) DEFAULT 'Learn More',
	\`bannerCtaUrl\` varchar(500),
	\`bannerLogoUrl\` varchar(500),
	\`showOnDashboard\` boolean NOT NULL DEFAULT true,
	\`showOnScanResults\` boolean NOT NULL DEFAULT true,
	\`showInEmails\` boolean NOT NULL DEFAULT false,
	\`impressions\` int NOT NULL DEFAULT 0,
	\`clicks\` int NOT NULL DEFAULT 0,
	\`startDate\` date,
	\`endDate\` date,
	\`partnerId\` int,
	\`notes\` text,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`featuredAdvertisers_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`fieldJobLog\` (
	\`id\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`jobTitle\` varchar(255) NOT NULL,
	\`clientName\` varchar(255),
	\`address\` varchar(500),
	\`serviceCategory\` varchar(100),
	\`scheduledAt\` timestamp,
	\`completedAt\` timestamp,
	\`jobValue\` decimal(10,2),
	\`commissionAmount\` decimal(10,2),
	\`status\` varchar(255) NOT NULL DEFAULT 'scheduled',
	\`notes\` text,
	\`source\` varchar(255) NOT NULL DEFAULT ('manual'),
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`fieldJobLog_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`forumLikes\` (
	\`id\` int NOT NULL,
	\`postId\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`createdAt\` timestamp NOT NULL,
	CONSTRAINT \`forumLikes_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`forumPosts\` (
	\`id\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`category\` varchar(50) NOT NULL DEFAULT 'general',
	\`title\` varchar(255) NOT NULL,
	\`body\` text NOT NULL,
	\`likes\` int NOT NULL DEFAULT 0,
	\`pinned\` boolean NOT NULL DEFAULT false,
	\`createdAt\` timestamp NOT NULL,
	\`updatedAt\` timestamp NOT NULL,
	CONSTRAINT \`forumPosts_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`forumReplies\` (
	\`id\` int NOT NULL,
	\`postId\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`body\` text NOT NULL,
	\`createdAt\` timestamp NOT NULL,
	CONSTRAINT \`forumReplies_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`fsmJobRecords\` (
	\`id\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`integrationId\` int NOT NULL,
	\`externalJobId\` varchar(255) NOT NULL,
	\`source\` varchar(50) NOT NULL,
	\`serviceAddress\` varchar(500) NOT NULL,
	\`serviceAddressNormalized\` varchar(500) NOT NULL,
	\`city\` varchar(100),
	\`state\` varchar(50),
	\`zipCode\` varchar(10),
	\`jobTitle\` varchar(255),
	\`tradeCategory\` varchar(100),
	\`description\` text,
	\`completedAt\` timestamp,
	\`photoUrls\` json DEFAULT ('[]'),
	\`photoCount\` int DEFAULT 0,
	\`importStatus\` varchar(255) NOT NULL DEFAULT ('pending'),
	\`claimedByHomeownerId\` int,
	\`claimedAt\` timestamp,
	\`rawData\` json,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`fsmJobRecords_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`fsmSyncJobs\` (
	\`id\` int NOT NULL,
	\`integrationId\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`status\` varchar(255) NOT NULL DEFAULT 'queued',
	\`jobsFound\` int DEFAULT 0,
	\`jobsImported\` int DEFAULT 0,
	\`jobsSkipped\` int DEFAULT 0,
	\`errorMessage\` text,
	\`startedAt\` timestamp,
	\`completedAt\` timestamp,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`fsmSyncJobs_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`fsmWebhookEvents\` (
	\`id\` int NOT NULL,
	\`source\` text NOT NULL,
	\`eventType\` varchar(100) NOT NULL,
	\`externalJobId\` varchar(255),
	\`leadSourceTag\` varchar(100),
	\`matchedPartnerId\` int,
	\`matchedOpportunityId\` int,
	\`jobValue\` decimal(10,2),
	\`status\` varchar(255) NOT NULL DEFAULT 'received',
	\`errorMessage\` text,
	\`rawPayload\` json,
	\`processedAt\` timestamp,
	\`receivedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`fsmWebhookEvents_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`funnelEvents\` (
	\`id\` int NOT NULL,
	\`opportunityId\` int NOT NULL,
	\`propertyProfileId\` int,
	\`partnerId\` int,
	\`eventType\` text NOT NULL,
	\`channel\` text,
	\`offerAmount\` decimal(10,2),
	\`discountPct\` decimal(5,2),
	\`secondsFromPreviousEvent\` int,
	\`deviceType\` varchar(50),
	\`metadata\` text,
	\`occurredAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`funnelEvents_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`geographicDensity\` (
	\`id\` int NOT NULL,
	\`zip\` varchar(20) NOT NULL,
	\`city\` varchar(100),
	\`state\` varchar(50),
	\`latitude\` decimal(10,7),
	\`longitude\` decimal(10,7),
	\`snapshotDate\` timestamp NOT NULL,
	\`totalActivePartners\` int DEFAULT 0,
	\`totalTradesCovered\` int DEFAULT 0,
	\`tradeBreakdown\` json DEFAULT ('{}'),
	\`totalJobsLogged\` int DEFAULT 0,
	\`totalOpportunitiesDetected\` int DEFAULT 0,
	\`totalOffersAccepted\` int DEFAULT 0,
	\`coverageGapScore\` int DEFAULT 0,
	\`unmetDemandTrades\` json DEFAULT ('[]'),
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`geographicDensity_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`growthProjections\` (
	\`id\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`currentMonthlyRevenue\` decimal(12,2) NOT NULL,
	\`targetGrowthPct\` decimal(5,2) NOT NULL,
	\`projectedRevenue12m\` decimal(12,2) NOT NULL,
	\`referralGoal\` int NOT NULL DEFAULT 0,
	\`notes\` text,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`growthProjections_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`home_documentation\` (
	\`id\` int NOT NULL,
	\`pro_user_id\` varchar(255) NOT NULL,
	\`address_hash\` varchar(64) NOT NULL,
	\`full_address\` text NOT NULL,
	\`is_first_documentation\` boolean NOT NULL DEFAULT true,
	\`origination_credit_earned\` boolean NOT NULL DEFAULT false,
	\`origination_credit_amount\` decimal(5,2) NOT NULL DEFAULT '0.00',
	\`documented_at\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`home_documentation_id\` PRIMARY KEY(\`id\`),
	CONSTRAINT \`home_doc_address_idx\` UNIQUE(\`address_hash\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`homeHealthVaultEntries\` (
	\`id\` int NOT NULL,
	\`serviceAddress\` varchar(500) NOT NULL,
	\`component\` varchar(200) NOT NULL,
	\`condition\` varchar(255) NOT NULL DEFAULT ('unknown'),
	\`notes\` text,
	\`estimatedAge\` int,
	\`photoUrl\` varchar(1000),
	\`source\` varchar(100),
	\`updatedAt\` bigint NOT NULL,
	CONSTRAINT \`homeHealthVaultEntries_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`homeMaintenanceItems\` (
	\`id\` int NOT NULL,
	\`name\` varchar(200) NOT NULL,
	\`category\` varchar(100) NOT NULL,
	\`defaultIntervalDays\` int,
	\`description\` text,
	\`importance\` varchar(255) NOT NULL DEFAULT ('medium'),
	\`isActive\` boolean NOT NULL DEFAULT true,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`homeMaintenanceItems_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`homeMaintenanceLogs\` (
	\`id\` int NOT NULL,
	\`propertyId\` int NOT NULL,
	\`systemHealthId\` int,
	\`systemType\` varchar(100) NOT NULL,
	\`serviceType\` text NOT NULL,
	\`serviceDescription\` text NOT NULL,
	\`servicedBy\` varchar(255),
	\`servicedByPartnerId\` int,
	\`cost\` decimal(10,2),
	\`serviceWarrantyMonths\` int,
	\`serviceWarrantyExpiresAt\` timestamp,
	\`receiptUrl\` text,
	\`photoUrls\` json DEFAULT ('[]'),
	\`invoiceNumber\` varchar(100),
	\`servicedAt\` timestamp NOT NULL,
	\`notes\` text,
	\`conditionAfter\` text,
	\`resetMaintenanceClock\` boolean NOT NULL DEFAULT true,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`homeMaintenanceLogs_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`homeMaintenanceRecords\` (
	\`id\` int NOT NULL,
	\`propertyId\` int NOT NULL,
	\`maintenanceItemId\` int,
	\`itemName\` varchar(200) NOT NULL,
	\`performedAt\` timestamp,
	\`performedBy\` varchar(200),
	\`cost\` int,
	\`notes\` text,
	\`photoUrls\` json,
	\`nextDueAt\` timestamp,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`homeMaintenanceRecords_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`homePassportTransfers\` (
	\`id\` int NOT NULL,
	\`propertyId\` int NOT NULL,
	\`previousOwnerId\` int,
	\`previousOwnerName\` varchar(255),
	\`previousOwnerEmail\` varchar(320),
	\`newOwnerEmail\` varchar(320),
	\`newOwnerName\` varchar(255),
	\`newOwnerId\` int,
	\`transferToken\` varchar(64) NOT NULL,
	\`passportSnapshot\` json,
	\`status\` varchar(255) NOT NULL DEFAULT 'pending',
	\`saleDate\` timestamp,
	\`salePrice\` decimal(12,2),
	\`pdfUrl\` text,
	\`expiresAt\` timestamp NOT NULL,
	\`claimedAt\` timestamp,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`homePassportTransfers_id\` PRIMARY KEY(\`id\`),
	CONSTRAINT \`homePassportTransfers_transferToken_unique\` UNIQUE(\`transferToken\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`homeSystemHealth\` (
	\`id\` int NOT NULL,
	\`propertyId\` int NOT NULL,
	\`systemType\` text NOT NULL,
	\`systemLabel\` varchar(255),
	\`installYear\` int,
	\`installMonth\` int,
	\`manufacturer\` varchar(255),
	\`modelNumber\` varchar(255),
	\`serialNumber\` varchar(255),
	\`warrantyExpiresYear\` int,
	\`expectedLifespanYears\` int,
	\`estimatedEndOfLifeYear\` int,
	\`condition\` varchar(255) NOT NULL DEFAULT ('unknown'),
	\`conditionNotes\` text,
	\`healthScore\` int NOT NULL DEFAULT 100,
	\`aiAssessedAt\` timestamp,
	\`aiConditionNotes\` text,
	\`maintenanceIntervalMonths\` int,
	\`lastServicedAt\` timestamp,
	\`nextServiceDueAt\` timestamp,
	\`estimatedReplacementCostLow\` decimal(10,2),
	\`estimatedReplacementCostHigh\` decimal(10,2),
	\`photoUrls\` json DEFAULT ('[]'),
	\`notes\` text,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`homeSystemHealth_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`homeSystemRecords\` (
	\`id\` int NOT NULL,
	\`propertyId\` int NOT NULL,
	\`systemType\` varchar(100) NOT NULL,
	\`brand\` varchar(100),
	\`model\` varchar(100),
	\`installedAt\` timestamp,
	\`expectedLifespanYears\` int,
	\`warrantyExpiresAt\` timestamp,
	\`lastServicedAt\` timestamp,
	\`condition\` varchar(255) NOT NULL DEFAULT ('good'),
	\`notes\` text,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`homeSystemRecords_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`homeWaitlist\` (
	\`id\` int NOT NULL,
	\`firstName\` varchar(100) NOT NULL,
	\`lastName\` varchar(100) NOT NULL,
	\`email\` varchar(320) NOT NULL,
	\`phone\` varchar(30),
	\`address\` varchar(500) NOT NULL,
	\`city\` varchar(100) NOT NULL,
	\`state\` varchar(50) NOT NULL,
	\`zipCode\` varchar(10) NOT NULL,
	\`homeType\` text NOT NULL,
	\`yearBuilt\` int,
	\`squareFootage\` int,
	\`lotSizeSqFt\` int,
	\`bedrooms\` int,
	\`bathrooms\` varchar(10),
	\`stories\` int,
	\`garageSpaces\` int,
	\`hasPool\` boolean DEFAULT false,
	\`hasBasement\` boolean DEFAULT false,
	\`hasAttic\` boolean DEFAULT false,
	\`ownershipStatus\` varchar(255) DEFAULT ('own'),
	\`ownershipType\` varchar(255) DEFAULT ('primary_residence'),
	\`isRental\` boolean DEFAULT false,
	\`companyName\` varchar(255),
	\`companyEin\` varchar(20),
	\`propertyManagerName\` varchar(255),
	\`propertyManagerPhone\` varchar(30),
	\`yearsOwned\` int,
	\`overallCondition\` text,
	\`recentImprovements\` json,
	\`desiredProjects\` json NOT NULL,
	\`projectTimeline\` varchar(255) DEFAULT ('just_exploring'),
	\`estimatedBudget\` varchar(50),
	\`homeSystems\` json,
	\`homeStyle\` varchar(100),
	\`exteriorColor\` varchar(100),
	\`primaryPainPoint\` varchar(255),
	\`hearAboutUs\` varchar(255),
	\`additionalNotes\` text,
	\`consentEmail\` boolean NOT NULL DEFAULT false,
	\`consentSms\` boolean NOT NULL DEFAULT false,
	\`consentPush\` boolean NOT NULL DEFAULT false,
	\`consentMarketing\` boolean NOT NULL DEFAULT false,
	\`consentTerms\` boolean NOT NULL DEFAULT false,
	\`consentDataUse\` boolean NOT NULL DEFAULT false,
	\`preferredContact\` varchar(20),
	\`status\` varchar(255) NOT NULL DEFAULT 'pending',
	\`approvedAt\` timestamp,
	\`approvedBy\` int,
	\`invitedAt\` timestamp,
	\`adminNotes\` text,
	\`source\` varchar(100) DEFAULT 'trustypro-waitlist',
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`homeWaitlist_id\` PRIMARY KEY(\`id\`),
	CONSTRAINT \`homeWaitlist_email_unique\` UNIQUE(\`email\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`homeowner360Profiles\` (
	\`id\` int NOT NULL,
	\`userId\` int NOT NULL,
	\`householdSize\` text,
	\`hasChildren\` boolean NOT NULL DEFAULT false,
	\`childrenAges\` json DEFAULT ('[]'),
	\`lifestyleType\` text,
	\`hobbies\` json DEFAULT ('[]'),
	\`entertainsFrequently\` boolean NOT NULL DEFAULT false,
	\`workFromHome\` boolean NOT NULL DEFAULT false,
	\`budgetComfort\` varchar(255) DEFAULT ('value_seeker'),
	\`typicalProjectBudget\` text,
	\`financesBigProjects\` boolean NOT NULL DEFAULT false,
	\`hasHomeWarranty\` boolean NOT NULL DEFAULT false,
	\`hasHomeInsurance\` boolean NOT NULL DEFAULT true,
	\`insuranceProvider\` varchar(100),
	\`hasMortgage\` boolean NOT NULL DEFAULT true,
	\`decisionMaker\` varchar(255) DEFAULT ('solo'),
	\`decisionSpeed\` varchar(255) DEFAULT ('within_week'),
	\`hiringCriteria\` json DEFAULT ('[]'),
	\`requiresBackground\` boolean NOT NULL DEFAULT false,
	\`communicationStyle\` varchar(255) DEFAULT ('text_first'),
	\`bestTimeToContact\` varchar(255) DEFAULT ('anytime'),
	\`responseExpectation\` varchar(255) DEFAULT ('same_day'),
	\`prefersVideoConsult\` boolean NOT NULL DEFAULT false,
	\`planningToSell\` boolean NOT NULL DEFAULT false,
	\`sellTimeframe\` varchar(255) DEFAULT ('not_planning'),
	\`primaryHomeGoal\` text,
	\`topProjectCategories\` json DEFAULT ('[]'),
	\`dreamProjects\` text,
	\`referralMotivation\` varchar(255) DEFAULT ('credits'),
	\`hasReferredBefore\` boolean NOT NULL DEFAULT false,
	\`socialMediaActive\` boolean NOT NULL DEFAULT false,
	\`wouldLeaveReview\` boolean NOT NULL DEFAULT true,
	\`npsScore\` int,
	\`satisfactionNotes\` text,
	\`completenessScore\` int NOT NULL DEFAULT 0,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`homeowner360Profiles_id\` PRIMARY KEY(\`id\`),
	CONSTRAINT \`homeowner360Profiles_userId_unique\` UNIQUE(\`userId\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`homeownerCheckins\` (
	\`id\` int NOT NULL,
	\`opportunityId\` int NOT NULL,
	\`confirmedCompletion\` boolean NOT NULL DEFAULT false,
	\`notes\` text,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`checkinToken\` varchar(64),
	\`scheduledSendAt\` timestamp,
	\`checkinEmailSentAt\` timestamp,
	\`homeownerEmail\` varchar(320),
	\`homeownerName\` varchar(255),
	\`partnerName\` varchar(255),
	\`serviceAddress\` varchar(500),
	CONSTRAINT \`homeownerCheckins_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`homeownerFavorites\` (
	\`id\` int NOT NULL,
	\`homeownerProfileId\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`notes\` text,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`homeownerFavorites_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`homeownerLeads\` (
	\`id\` int NOT NULL,
	\`homeownerName\` varchar(255),
	\`homeownerEmail\` varchar(255),
	\`homeownerPhone\` varchar(50),
	\`address\` text NOT NULL,
	\`city\` varchar(100),
	\`state\` varchar(50) DEFAULT 'TX',
	\`zipCode\` varchar(20),
	\`photoUrls\` json,
	\`aiAnalysis\` json,
	\`detectedServices\` json,
	\`matchedPartnerId\` int,
	\`opportunityId\` int,
	\`source\` varchar(50) NOT NULL DEFAULT 'trustypro',
	\`fullCommission\` boolean NOT NULL DEFAULT true,
	\`status\` varchar(255) NOT NULL DEFAULT 'new',
	\`notes\` text,
	\`createdAt\` timestamp DEFAULT (now()),
	\`updatedAt\` timestamp DEFAULT (now()),
	CONSTRAINT \`homeownerLeads_id\` PRIMARY KEY(\`id\`),
	CONSTRAINT \`homeownerLeads_homeownerEmail_unique\` UNIQUE(\`homeownerEmail\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`homeownerNotifications\` (
	\`id\` int NOT NULL,
	\`userId\` int NOT NULL,
	\`type\` varchar(255) NOT NULL DEFAULT ('system'),
	\`title\` varchar(255) NOT NULL,
	\`message\` text NOT NULL,
	\`actionUrl\` varchar(512),
	\`isRead\` boolean NOT NULL DEFAULT false,
	\`metadata\` json,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`homeownerNotifications_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`homeownerPaymentMethods\` (
	\`id\` int NOT NULL,
	\`homeownerId\` int NOT NULL,
	\`stripeCustomerId\` varchar(255) NOT NULL,
	\`stripePaymentMethodId\` varchar(255) NOT NULL,
	\`cardBrand\` varchar(20),
	\`cardLast4\` varchar(4),
	\`cardExpMonth\` int,
	\`cardExpYear\` int,
	\`isAch\` boolean NOT NULL DEFAULT false,
	\`achBankName\` varchar(200),
	\`achLast4\` varchar(4),
	\`isDefault\` boolean NOT NULL DEFAULT true,
	\`isActive\` boolean NOT NULL DEFAULT true,
	\`consentText\` text,
	\`consentSignedAt\` timestamp,
	\`consentIpAddress\` varchar(45),
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`homeownerPaymentMethods_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`homeownerProfiles\` (
	\`id\` int NOT NULL,
	\`userId\` int NOT NULL,
	\`displayName\` varchar(255),
	\`phone\` varchar(30),
	\`bio\` text,
	\`photoUrl\` text,
	\`setupComplete\` boolean NOT NULL DEFAULT false,
	\`contactPreference\` varchar(255) DEFAULT ('email'),
	\`openToRecommendations\` boolean NOT NULL DEFAULT true,
	\`consentTerms\` boolean NOT NULL DEFAULT false,
	\`consentPhotos\` boolean NOT NULL DEFAULT false,
	\`consentPartnerContact\` boolean NOT NULL DEFAULT false,
	\`consentAiData\` boolean NOT NULL DEFAULT false,
	\`creditBalance\` decimal(10,2) NOT NULL DEFAULT '0.00',
	\`referralCount\` int NOT NULL DEFAULT 0,
	\`referralCode\` varchar(50),
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`homeownerProfiles_id\` PRIMARY KEY(\`id\`),
	CONSTRAINT \`homeownerProfiles_userId_unique\` UNIQUE(\`userId\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`homeownerReviews\` (
	\`id\` int NOT NULL,
	\`dealId\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`homeownerEmail\` varchar(320),
	\`homeownerName\` varchar(255),
	\`rating\` int NOT NULL,
	\`reviewText\` text,
	\`ratingReliability\` int,
	\`ratingCommunication\` int,
	\`ratingPayment\` int,
	\`isPublic\` boolean NOT NULL DEFAULT true,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`homeownerReviews_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`homeownerScanHistory\` (
	\`id\` int NOT NULL,
	\`homeownerProfileId\` int,
	\`homeownerEmail\` varchar(320),
	\`roomLabel\` varchar(100),
	\`photoUrls\` json,
	\`analysisJson\` json,
	\`overallCondition\` varchar(50),
	\`issueCount\` int DEFAULT 0,
	\`upgradeCount\` int DEFAULT 0,
	\`photoQualityFlag\` varchar(50),
	\`createdAt\` timestamp DEFAULT (now()),
	\`propertyId\` int,
	CONSTRAINT \`homeownerScanHistory_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`homeownerScanOffers\` (
	\`id\` int NOT NULL,
	\`homeownerProfileId\` int,
	\`homeownerEmail\` varchar(320),
	\`roomLabel\` varchar(100),
	\`issueType\` varchar(100) NOT NULL,
	\`issueCategory\` varchar(100) NOT NULL,
	\`issueDescription\` text NOT NULL,
	\`severity\` varchar(255) NOT NULL DEFAULT ('medium'),
	\`estimatedCostLow\` decimal(10,2),
	\`estimatedCostHigh\` decimal(10,2),
	\`photoUrl\` text,
	\`status\` varchar(255) NOT NULL DEFAULT 'new',
	\`source\` varchar(50) DEFAULT 'ai_scan',
	\`createdAt\` timestamp DEFAULT (now()),
	\`updatedAt\` timestamp DEFAULT (now()),
	\`offerTrack\` varchar(50) DEFAULT 'repair',
	\`transformationImageUrl\` text,
	\`isInsuranceClaim\` boolean DEFAULT false,
	\`transformationPrompt\` text,
	\`propertyId\` int,
	CONSTRAINT \`homeownerScanOffers_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`industryRates\` (
	\`id\` int NOT NULL,
	\`industryName\` varchar(100) NOT NULL,
	\`platformFeeRate\` decimal(5,4) NOT NULL DEFAULT '0.1200',
	\`referralCommissionRate\` decimal(5,4) NOT NULL DEFAULT '0.0500',
	\`notes\` text,
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`industryRates_id\` PRIMARY KEY(\`id\`),
	CONSTRAINT \`industryRates_industryName_unique\` UNIQUE(\`industryName\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`industryRatesData\` (
	\`id\` int NOT NULL,
	\`serviceCategory\` varchar(100) NOT NULL,
	\`jobType\` varchar(255) NOT NULL,
	\`region\` varchar(100) NOT NULL DEFAULT 'national',
	\`lowEstimate\` decimal(10,2) NOT NULL,
	\`highEstimate\` decimal(10,2) NOT NULL,
	\`avgEstimate\` decimal(10,2) NOT NULL,
	\`unit\` varchar(50) NOT NULL DEFAULT 'per job',
	\`lastUpdated\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`industryRatesData_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`insuranceClaims\` (
	\`id\` int NOT NULL,
	\`opportunityId\` int NOT NULL,
	\`homeownerProfileId\` int,
	\`partnerId\` int,
	\`claimType\` varchar(100) NOT NULL,
	\`description\` text NOT NULL,
	\`damageDate\` timestamp,
	\`insuranceCompany\` varchar(200),
	\`policyNumber\` varchar(100),
	\`claimNumber\` varchar(100),
	\`estimatedDamage\` decimal(10,2),
	\`approvedAmount\` decimal(10,2),
	\`deductible\` decimal(10,2),
	\`status\` varchar(255) NOT NULL DEFAULT 'flagged',
	\`jobValue\` decimal(10,2),
	\`platformFeeAmount\` decimal(10,2),
	\`commissionPaid\` boolean NOT NULL DEFAULT false,
	\`commissionPaidAt\` timestamp,
	\`lastReminderSentAt\` timestamp,
	\`reminderCount\` int NOT NULL DEFAULT 0,
	\`notes\` text,
	\`aiDetected\` boolean NOT NULL DEFAULT false,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`insuranceClaims_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`job_commission_event\` (
	\`id\` int NOT NULL,
	\`pro_user_id\` varchar(255) NOT NULL,
	\`job_id\` varchar(255) NOT NULL,
	\`job_value\` decimal(10,2) NOT NULL,
	\`job_completed_at\` timestamp NOT NULL,
	\`homeowner_confirmed\` boolean NOT NULL DEFAULT false,
	\`homeowner_confirmed_at\` timestamp,
	\`platform_fee_gross\` decimal(10,2) NOT NULL,
	\`platform_fee_net\` decimal(10,2) NOT NULL,
	\`status\` varchar(20) NOT NULL DEFAULT 'pending',
	\`created_at\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`job_commission_event_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`jobPayments\` (
	\`id\` int NOT NULL,
	\`dealId\` int NOT NULL,
	\`homeownerId\` int,
	\`referringPartnerId\` int NOT NULL,
	\`receivingPartnerId\` int,
	\`totalJobValue\` decimal(10,2) NOT NULL,
	\`platformFeeRate\` decimal(5,4) NOT NULL DEFAULT '0.1000',
	\`platformFeeAmount\` decimal(10,2) NOT NULL,
	\`referringPartnerCommission\` decimal(10,2),
	\`receivingPartnerPayout\` decimal(10,2),
	\`paymentMethod\` varchar(255) NOT NULL DEFAULT ('card_on_file'),
	\`isInsuranceJob\` boolean NOT NULL DEFAULT false,
	\`insurancePolicyNumber\` varchar(100),
	\`insuranceCarrier\` varchar(200),
	\`insuranceAdjusterName\` varchar(200),
	\`insuranceAdjusterEmail\` varchar(320),
	\`insuranceClaimNumber\` varchar(100),
	\`insuranceApprovedAmount\` decimal(10,2),
	\`insuranceAdjusterReportUrl\` varchar(1000),
	\`stripePaymentIntentId\` varchar(255),
	\`stripeSetupIntentId\` varchar(255),
	\`stripeCustomerId\` varchar(255),
	\`stripeTransferId\` varchar(255),
	\`stripeAchMandateId\` varchar(255),
	\`status\` varchar(255) NOT NULL DEFAULT 'pending',
	\`depositAmount\` decimal(10,2),
	\`depositChargedAt\` timestamp,
	\`depositStripeIntentId\` varchar(255),
	\`balanceAmount\` decimal(10,2),
	\`balanceChargedAt\` timestamp,
	\`balanceStripeIntentId\` varchar(255),
	\`commissionPullAmount\` decimal(10,2),
	\`commissionPullChargedAt\` timestamp,
	\`commissionPullStripeIntentId\` varchar(255),
	\`disputeReason\` text,
	\`disputeOpenedAt\` timestamp,
	\`disputeResolvedAt\` timestamp,
	\`disputeResolution\` varchar(500),
	\`triggeredByCheckinId\` int,
	\`notes\` text,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`jobPayments_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`jobs\` (
	\`id\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`loggedByUserId\` int,
	\`customerName\` varchar(255),
	\`customerEmail\` varchar(320),
	\`customerPhone\` varchar(30),
	\`serviceAddress\` varchar(500) NOT NULL,
	\`serviceAddressLat\` decimal(10,6),
	\`serviceAddressLng\` decimal(10,6),
	\`serviceType\` varchar(100),
	\`notes\` text,
	\`photoUrls\` json DEFAULT ('[]'),
	\`aiAnalysisStatus\` varchar(255) NOT NULL DEFAULT ('pending'),
	\`aiAnalysisResult\` json DEFAULT ('null'),
	\`status\` varchar(255) NOT NULL DEFAULT 'logged',
	\`completedAt\` timestamp,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`jobs_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`marketingEmailLog\` (
	\`id\` int NOT NULL,
	\`userId\` int NOT NULL,
	\`campaignKey\` varchar(128) NOT NULL,
	\`sentAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`marketingEmailLog_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`messages\` (
	\`id\` int NOT NULL,
	\`thread_id\` varchar(64) NOT NULL,
	\`sender_type\` varchar(255) NOT NULL DEFAULT ('homeowner'),
	\`sender_user_id\` int NOT NULL,
	\`recipient_user_id\` int NOT NULL,
	\`homeowner_email\` varchar(255),
	\`partner_id\` int,
	\`body\` text NOT NULL,
	\`is_read\` boolean NOT NULL DEFAULT false,
	\`created_at\` bigint NOT NULL,
	CONSTRAINT \`messages_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`networkingEventRegistrations\` (
	\`id\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`eventName\` varchar(255) NOT NULL,
	\`eventDate\` timestamp NOT NULL,
	\`location\` varchar(255),
	\`status\` varchar(255) NOT NULL DEFAULT 'registered',
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`networkingEventRegistrations_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`npsSurveys\` (
	\`id\` int NOT NULL,
	\`token\` varchar(64) NOT NULL,
	\`jobId\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`homeownerEmail\` varchar(255),
	\`homeownerName\` varchar(255),
	\`score\` int,
	\`category\` varchar(32),
	\`comment\` text,
	\`followUpOk\` boolean DEFAULT false,
	\`completedAt\` timestamp,
	\`expiresAt\` timestamp NOT NULL,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`npsSurveys_id\` PRIMARY KEY(\`id\`),
	CONSTRAINT \`npsSurveys_token_unique\` UNIQUE(\`token\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`opportunities\` (
	\`id\` int NOT NULL,
	\`jobId\` int NOT NULL,
	\`sourcePartnerId\` int NOT NULL,
	\`receivingPartnerId\` int,
	\`opportunityType\` varchar(100) NOT NULL,
	\`opportunityCategory\` varchar(100) NOT NULL,
	\`description\` text NOT NULL,
	\`aiConfidence\` decimal(4,3),
	\`photoUrl\` varchar(1000),
	\`adminReviewStatus\` varchar(255) NOT NULL DEFAULT ('pending_review'),
	\`adminReviewedAt\` timestamp,
	\`adminReviewedBy\` int,
	\`status\` varchar(255) NOT NULL DEFAULT 'pending',
	\`leadExpiresAt\` timestamp,
	\`routingQueue\` text,
	\`routingPosition\` int NOT NULL DEFAULT 0,
	\`estimatedJobValue\` decimal(10,2),
	\`actualJobValue\` decimal(10,2),
	\`platformFeeAmount\` decimal(10,2),
	\`referralCommissionAmount\` decimal(10,2),
	\`proLinkNetAmount\` decimal(10,2),
	\`jobClosedAt\` timestamp,
	\`sentAt\` timestamp,
	\`acceptedAt\` timestamp,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`opportunities_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`partner360Profiles\` (
	\`id\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`yearsInBusiness\` text,
	\`teamSize\` text,
	\`annualRevenue\` text,
	\`businessStructure\` text,
	\`hasEmployees\` boolean NOT NULL DEFAULT false,
	\`hasSubcontractors\` boolean NOT NULL DEFAULT false,
	\`isLicensed\` boolean NOT NULL DEFAULT false,
	\`isInsured\` boolean NOT NULL DEFAULT false,
	\`isBonded\` boolean NOT NULL DEFAULT false,
	\`currentCrm\` varchar(100),
	\`currentSchedulingTool\` varchar(100),
	\`currentInvoicingTool\` varchar(100),
	\`usesQuickbooks\` boolean NOT NULL DEFAULT false,
	\`techComfortLevel\` varchar(255) DEFAULT ('medium'),
	\`primaryGoal\` text,
	\`secondaryGoals\` json DEFAULT ('[]'),
	\`revenueGoal12mo\` text,
	\`openToHiring\` boolean NOT NULL DEFAULT false,
	\`openToFranchise\` boolean NOT NULL DEFAULT false,
	\`openToAcquisition\` boolean NOT NULL DEFAULT false,
	\`communicationStyle\` varchar(255) DEFAULT ('text_first'),
	\`bestTimeToContact\` varchar(255) DEFAULT ('anytime'),
	\`preferredLeadType\` varchar(255) DEFAULT ('residential'),
	\`avgJobSize\` text,
	\`biggestChallenge\` text,
	\`referralMotivation\` text,
	\`willingToReferCompetitors\` boolean NOT NULL DEFAULT false,
	\`hasExistingReferralNetwork\` boolean NOT NULL DEFAULT false,
	\`estimatedMonthlyJobs\` int DEFAULT 0,
	\`googleBusinessUrl\` varchar(500),
	\`yelpUrl\` varchar(500),
	\`facebookUrl\` varchar(500),
	\`instagramUrl\` varchar(500),
	\`totalOnlineReviews\` int DEFAULT 0,
	\`avgOnlineRating\` decimal(3,2),
	\`completenessScore\` int NOT NULL DEFAULT 0,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`partner360Profiles_id\` PRIMARY KEY(\`id\`),
	CONSTRAINT \`partner360Profiles_partnerId_unique\` UNIQUE(\`partnerId\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`partnerAlerts\` (
	\`id\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`alertType\` varchar(100) NOT NULL,
	\`title\` varchar(255) NOT NULL,
	\`body\` text NOT NULL,
	\`severity\` varchar(255) NOT NULL DEFAULT ('info'),
	\`isRead\` boolean NOT NULL DEFAULT false,
	\`isDismissed\` boolean NOT NULL DEFAULT false,
	\`metadata\` json,
	\`createdAt\` timestamp DEFAULT (now()),
	CONSTRAINT \`partnerAlerts_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`partnerAvailability\` (
	\`id\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`dayOfWeek\` int NOT NULL,
	\`startHour\` int NOT NULL,
	\`endHour\` int NOT NULL,
	\`isAvailable\` boolean NOT NULL DEFAULT true,
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`partnerAvailability_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`partnerGalleryProjects\` (
	\`id\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`title\` varchar(255) NOT NULL,
	\`description\` text,
	\`category\` varchar(100),
	\`beforeImageUrl\` text,
	\`afterImageUrl\` text,
	\`completedAt\` timestamp,
	\`createdAt\` timestamp NOT NULL,
	CONSTRAINT \`partnerGalleryProjects_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`partnerIntegrations\` (
	\`id\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`source\` varchar(50) NOT NULL,
	\`accessToken\` text,
	\`refreshToken\` text,
	\`tokenExpiresAt\` timestamp,
	\`externalAccountId\` varchar(255),
	\`externalAccountName\` varchar(255),
	\`webhookId\` varchar(255),
	\`status\` varchar(20) NOT NULL DEFAULT 'active',
	\`lastSyncAt\` timestamp,
	\`errorMessage\` text,
	\`metadata\` text,
	\`connectedAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`partnerIntegrations_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`partnerJobPreferences\` (
	\`id\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`serviceCategories\` json NOT NULL DEFAULT ('[]'),
	\`maxJobDistance\` int NOT NULL DEFAULT 25,
	\`minJobValue\` decimal(10,2) NOT NULL DEFAULT '0',
	\`maxJobValue\` decimal(10,2),
	\`preferredDays\` json NOT NULL DEFAULT ('[]'),
	\`acceptsEmergency\` boolean NOT NULL DEFAULT false,
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`partnerJobPreferences_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`partnerNotifications\` (
	\`id\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`type\` varchar(255) NOT NULL DEFAULT ('system'),
	\`title\` varchar(255) NOT NULL,
	\`message\` text NOT NULL,
	\`actionUrl\` varchar(512),
	\`isRead\` boolean NOT NULL DEFAULT false,
	\`metadata\` json,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`partnerNotifications_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`partnerOnboardingChecklist\` (
	\`id\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`profileComplete\` boolean NOT NULL DEFAULT false,
	\`payoutConnected\` boolean NOT NULL DEFAULT false,
	\`firstReferralSent\` boolean NOT NULL DEFAULT false,
	\`trainingComplete\` boolean NOT NULL DEFAULT false,
	\`agreementSigned\` boolean NOT NULL DEFAULT false,
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`partnerOnboardingChecklist_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`partnerPerformanceScores\` (
	\`id\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`totalLeadsReceived\` int NOT NULL DEFAULT 0,
	\`totalLeadsAccepted\` int NOT NULL DEFAULT 0,
	\`totalLeadsDeclined\` int NOT NULL DEFAULT 0,
	\`totalLeadsClosed\` int NOT NULL DEFAULT 0,
	\`leadAcceptanceRate\` decimal(5,4) DEFAULT '0',
	\`leadCloseRate\` decimal(5,4) DEFAULT '0',
	\`avgResponseTimeHours\` decimal(8,2),
	\`avgJobValue\` decimal(10,2),
	\`totalJobValueClosed\` decimal(12,2) DEFAULT '0',
	\`totalCommissionsEarned\` decimal(12,2) DEFAULT '0',
	\`totalCommissionsPaid\` decimal(12,2) DEFAULT '0',
	\`totalReferralsSent\` int NOT NULL DEFAULT 0,
	\`totalReferralsConverted\` int NOT NULL DEFAULT 0,
	\`referralConversionRate\` decimal(5,4) DEFAULT '0',
	\`healthScore\` int DEFAULT 50,
	\`churnRisk\` varchar(255) DEFAULT ('low'),
	\`lastJobLoggedAt\` timestamp,
	\`lastLeadAcceptedAt\` timestamp,
	\`calculatedAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`partnerPerformanceScores_id\` PRIMARY KEY(\`id\`),
	CONSTRAINT \`partnerPerformanceScores_partnerId_unique\` UNIQUE(\`partnerId\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`partnerReviews\` (
	\`id\` int NOT NULL,
	\`dealId\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`homeownerName\` varchar(255),
	\`homeownerEmail\` varchar(320),
	\`rating\` int NOT NULL,
	\`reviewText\` text,
	\`ratingPunctuality\` int,
	\`ratingQuality\` int,
	\`ratingCommunication\` int,
	\`ratingValue\` int,
	\`googleReviewRequested\` boolean NOT NULL DEFAULT false,
	\`googleReviewRequestedAt\` timestamp,
	\`yelpReviewRequested\` boolean NOT NULL DEFAULT false,
	\`isPublic\` boolean NOT NULL DEFAULT true,
	\`flagged\` boolean NOT NULL DEFAULT false,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`partnerReviews_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`partnerVerifications\` (
	\`id\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`licenseVerified\` boolean NOT NULL DEFAULT false,
	\`licenseNumber\` varchar(100),
	\`licenseState\` varchar(10),
	\`licenseExpiresAt\` bigint,
	\`licenseDocUrl\` text,
	\`licenseVerifiedAt\` bigint,
	\`licenseVerifiedBy\` int,
	\`licenseNotes\` text,
	\`insuranceVerified\` boolean NOT NULL DEFAULT false,
	\`insuranceCarrier\` varchar(200),
	\`insurancePolicyNumber\` varchar(100),
	\`insuranceExpiresAt\` bigint,
	\`insuranceDocUrl\` text,
	\`insuranceVerifiedAt\` bigint,
	\`insuranceVerifiedBy\` int,
	\`insuranceNotes\` text,
	\`backgroundCheckVerified\` boolean NOT NULL DEFAULT false,
	\`backgroundCheckProvider\` varchar(100),
	\`backgroundCheckDate\` bigint,
	\`backgroundCheckDocUrl\` text,
	\`backgroundCheckVerifiedAt\` bigint,
	\`backgroundCheckVerifiedBy\` int,
	\`backgroundCheckNotes\` text,
	\`businessRegistrationVerified\` boolean NOT NULL DEFAULT false,
	\`businessRegistrationDocUrl\` text,
	\`businessRegistrationVerifiedAt\` bigint,
	\`businessRegistrationVerifiedBy\` int,
	\`businessRegistrationNotes\` text,
	\`referencesVerified\` boolean NOT NULL DEFAULT false,
	\`referencesCount\` int DEFAULT 0,
	\`referencesNotes\` text,
	\`referencesVerifiedAt\` bigint,
	\`referencesVerifiedBy\` int,
	\`portfolioVerified\` boolean NOT NULL DEFAULT false,
	\`portfolioUrl\` text,
	\`portfolioNotes\` text,
	\`portfolioVerifiedAt\` bigint,
	\`portfolioVerifiedBy\` int,
	\`identityVerified\` boolean NOT NULL DEFAULT false,
	\`identityDocType\` varchar(50),
	\`identityDocUrl\` text,
	\`identityVerifiedAt\` bigint,
	\`identityVerifiedBy\` int,
	\`identityNotes\` text,
	\`trustScore\` int NOT NULL DEFAULT 0,
	\`badgeLevel\` varchar(255) NOT NULL DEFAULT ('none'),
	\`overallStatus\` varchar(255) NOT NULL DEFAULT ('unverified'),
	\`createdAt\` bigint NOT NULL DEFAULT 0,
	\`updatedAt\` bigint NOT NULL DEFAULT 0,
	CONSTRAINT \`partnerVerifications_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`partners\` (
	\`id\` int NOT NULL,
	\`userId\` int,
	\`businessName\` varchar(255) NOT NULL,
	\`businessType\` varchar(100) NOT NULL,
	\`serviceArea\` varchar(255) NOT NULL,
	\`serviceAreaLat\` decimal(10,6),
	\`serviceAreaLng\` decimal(10,6),
	\`serviceRadiusMiles\` int DEFAULT 15,
	\`serviceZipCodes\` json DEFAULT ('[]'),
	\`maxZipCodes\` int NOT NULL DEFAULT 5,
	\`contactName\` varchar(255) NOT NULL,
	\`contactEmail\` varchar(320) NOT NULL,
	\`contactPhone\` varchar(30),
	\`website\` varchar(500),
	\`description\` text,
	\`status\` varchar(255) NOT NULL DEFAULT 'pending',
	\`tier\` varchar(255) NOT NULL DEFAULT ('scout'),
	\`subscriptionFee\` decimal(8,2) NOT NULL DEFAULT '0.00',
	\`commissionRate\` decimal(5,4) NOT NULL DEFAULT '0.4000',
	\`platformFeeRate\` decimal(5,4) NOT NULL DEFAULT '0.1200',
	\`referralCommissionRate\` decimal(5,4) NOT NULL DEFAULT '0.0480',
	\`monthlyCommissionCap\` decimal(10,2),
	\`monthlyCommissionEarned\` decimal(10,2) NOT NULL DEFAULT '0.00',
	\`isExempt\` boolean NOT NULL DEFAULT false,
	\`isFoundingPartner\` boolean NOT NULL DEFAULT false,
	\`weeklyLeadCap\` int NOT NULL DEFAULT 5,
	\`weeklyLeadsReceived\` int NOT NULL DEFAULT 0,
	\`weeklyLeadsResetAt\` timestamp,
	\`referralCount\` int NOT NULL DEFAULT 0,
	\`leadsCount\` int NOT NULL DEFAULT 0,
	\`jobsLogged\` int NOT NULL DEFAULT 0,
	\`opportunitiesGenerated\` int NOT NULL DEFAULT 0,
	\`totalCommissionEarned\` decimal(10,2) NOT NULL DEFAULT '0.00',
	\`totalCommissionPaid\` decimal(10,2) NOT NULL DEFAULT '0.00',
	\`stripeConnectAccountId\` varchar(255),
	\`stripeConnectStatus\` varchar(255) NOT NULL DEFAULT ('not_connected'),
	\`bankAccountLast4\` varchar(4),
	\`payoutReadyAt\` timestamp,
	\`trialStatus\` varchar(255) NOT NULL DEFAULT ('trial'),
	\`trialStartedAt\` timestamp,
	\`trialEndsAt\` timestamp,
	\`subscriptionPlan\` text,
	\`priorityScore\` int NOT NULL DEFAULT 0,
	\`avgLeadResponseHours\` decimal(6,2) NOT NULL DEFAULT '24.00',
	\`rating\` decimal(3,2) NOT NULL DEFAULT '0.00',
	\`reviewCount\` int NOT NULL DEFAULT 0,
	\`partnersReferred\` int NOT NULL DEFAULT 0,
	\`referredByPartnerId\` int,
	\`notificationPrefs\` json,
	\`strikeCount\` int NOT NULL DEFAULT 0,
	\`lastStrikeAt\` timestamp,
	\`lastStrikeReason\` varchar(500),
	\`suspendedAt\` timestamp,
	\`suspensionReason\` varchar(500),
	\`coiUrl\` varchar(1000),
	\`coiExpiresAt\` timestamp,
	\`coiVerifiedAt\` timestamp,
	\`licenseNumber\` varchar(100),
	\`licenseUrl\` varchar(1000),
	\`licenseExpiresAt\` timestamp,
	\`licenseVerifiedAt\` timestamp,
	\`backgroundCheckVerifiedAt\` timestamp,
	\`googleReviewUrl\` varchar(1000),
	\`dataExportRequestedAt\` timestamp,
	\`dataDeleteRequestedAt\` timestamp,
	\`lastActiveAt\` timestamp,
	\`referralStreakMonths\` int NOT NULL DEFAULT 0,
	\`streakUpdatedAt\` timestamp,
	\`achievementBadges\` json DEFAULT ('[]'),
	\`achievementsUpdatedAt\` timestamp,
	\`appliedAt\` timestamp NOT NULL DEFAULT (now()),
	\`approvedAt\` timestamp,
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`partners_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`paymentMilestones\` (
	\`id\` int NOT NULL,
	\`jobPaymentId\` int NOT NULL,
	\`dealId\` int NOT NULL,
	\`milestoneType\` text NOT NULL,
	\`milestoneLabel\` varchar(100) NOT NULL,
	\`percentageOfTotal\` decimal(5,4) NOT NULL,
	\`amountCents\` int NOT NULL,
	\`triggerEvent\` text NOT NULL,
	\`status\` varchar(255) NOT NULL DEFAULT 'scheduled',
	\`scheduledFor\` timestamp,
	\`triggeredAt\` timestamp,
	\`completedAt\` timestamp,
	\`stripeIntentId\` varchar(255),
	\`failureReason\` text,
	\`retryCount\` int NOT NULL DEFAULT 0,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`paymentMilestones_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`payoutRequests\` (
	\`id\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`requestedAmount\` decimal(10,2) NOT NULL,
	\`status\` varchar(255) NOT NULL DEFAULT 'pending',
	\`note\` text,
	\`adminNote\` text,
	\`reviewedByAdminId\` int,
	\`reviewedAt\` timestamp,
	\`paidAt\` timestamp,
	\`stripeTransferId\` varchar(255),
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`payoutRequests_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`photoIngestionBatches\` (
	\`id\` int NOT NULL,
	\`source\` varchar(100) NOT NULL,
	\`totalPhotos\` int NOT NULL,
	\`processedPhotos\` int DEFAULT 0,
	\`offersGenerated\` int DEFAULT 0,
	\`homeHealthUpdates\` int DEFAULT 0,
	\`totalCost\` decimal(10,6),
	\`costSavings\` decimal(10,6),
	\`status\` varchar(255) NOT NULL DEFAULT 'queued',
	\`createdBy\` int,
	\`createdAt\` bigint NOT NULL,
	\`updatedAt\` bigint NOT NULL,
	CONSTRAINT \`photoIngestionBatches_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`photoIntakeQueue\` (
	\`id\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`integrationId\` int,
	\`source\` varchar(50) NOT NULL,
	\`photoUrl\` text NOT NULL,
	\`thumbnailUrl\` text,
	\`photoHash\` varchar(64),
	\`externalJobId\` varchar(255),
	\`externalJobName\` varchar(500),
	\`serviceAddress\` text,
	\`serviceCity\` varchar(100),
	\`serviceZip\` varchar(20),
	\`latitude\` decimal(10,7),
	\`longitude\` decimal(10,7),
	\`status\` varchar(20) NOT NULL DEFAULT 'pending',
	\`jobId\` int,
	\`aiResult\` text,
	\`processedAt\` timestamp,
	\`errorMessage\` text,
	\`capturedAt\` timestamp,
	\`receivedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`photoIntakeQueue_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`photoQueueItems\` (
	\`id\` int NOT NULL,
	\`photoUrl\` varchar(1000) NOT NULL,
	\`serviceAddress\` varchar(500) NOT NULL,
	\`source\` varchar(255) NOT NULL DEFAULT ('field_app'),
	\`ingestionMode\` varchar(255) NOT NULL DEFAULT ('live'),
	\`photoAgeMonths\` int,
	\`partnerId\` int,
	\`jobId\` int,
	\`batchId\` int,
	\`status\` varchar(255) NOT NULL DEFAULT 'pending',
	\`tier1Passed\` boolean,
	\`tier2Passed\` boolean,
	\`tier3Ran\` boolean,
	\`finalConfidence\` decimal(4,3),
	\`offerGenerated\` boolean DEFAULT false,
	\`processingCost\` decimal(8,6),
	\`staleDataFlags\` text,
	\`analysisResult\` text,
	\`createdAt\` bigint NOT NULL,
	\`updatedAt\` bigint NOT NULL,
	CONSTRAINT \`photoQueueItems_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`proAgreements\` (
	\`id\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`templateVersion\` varchar(20) NOT NULL DEFAULT 'v1.0',
	\`tierAtSigning\` text NOT NULL,
	\`commissionRateAtSigning\` decimal(5,4) NOT NULL,
	\`effectiveDate\` timestamp NOT NULL,
	\`status\` varchar(255) NOT NULL DEFAULT 'pending',
	\`signedAt\` timestamp,
	\`signerName\` varchar(255),
	\`signatureData\` text,
	\`ipAddress\` varchar(64),
	\`pdfS3Key\` varchar(500),
	\`pdfUrl\` text,
	\`sentAt\` timestamp,
	\`sentVia\` text,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`proAgreements_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`pro_network_profile\` (
	\`id\` int NOT NULL,
	\`user_id\` varchar(255) NOT NULL,
	\`network_level\` int NOT NULL DEFAULT 4,
	\`referred_by_user_id\` varchar(255),
	\`referral_code\` varchar(10) NOT NULL,
	\`subscription_active\` boolean NOT NULL DEFAULT false,
	\`last_job_completed_at\` timestamp,
	\`jobs_completed_this_month\` int NOT NULL DEFAULT 0,
	\`total_network_income_earned\` decimal(12,2) NOT NULL DEFAULT '0.00',
	\`pending_payout_amount\` decimal(12,2) NOT NULL DEFAULT '0.00',
	\`starter_kit_shipped\` boolean NOT NULL DEFAULT false,
	\`starter_kit_shipped_at\` timestamp,
	\`business_mailing_address\` text,
	\`agreement_signed_at\` timestamp,
	\`agreement_version\` varchar(20),
	\`created_at\` timestamp NOT NULL DEFAULT (now()),
	\`updated_at\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`pro_network_profile_id\` PRIMARY KEY(\`id\`),
	CONSTRAINT \`pro_network_profile_user_id_unique\` UNIQUE(\`user_id\`),
	CONSTRAINT \`pro_network_profile_referral_code_unique\` UNIQUE(\`referral_code\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`pro_upline_chain\` (
	\`id\` int NOT NULL,
	\`pro_user_id\` varchar(255) NOT NULL,
	\`upline_user_id\` varchar(255) NOT NULL,
	\`levels_above\` int NOT NULL,
	\`upline_network_level\` int NOT NULL,
	\`created_at\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`pro_upline_chain_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`proWaitlist\` (
	\`id\` int NOT NULL,
	\`firstName\` varchar(100) NOT NULL,
	\`lastName\` varchar(100) NOT NULL,
	\`email\` varchar(320) NOT NULL,
	\`phone\` varchar(30) NOT NULL,
	\`businessName\` varchar(255) NOT NULL,
	\`businessType\` varchar(100) NOT NULL,
	\`yearsInBusiness\` int NOT NULL,
	\`employeeCount\` varchar(50) NOT NULL,
	\`estimatedJobsPerMonth\` int NOT NULL,
	\`avgJobValue\` varchar(50) NOT NULL,
	\`trades\` json NOT NULL,
	\`primaryCity\` varchar(100) NOT NULL,
	\`primaryState\` varchar(50) NOT NULL,
	\`serviceZipCodes\` text NOT NULL,
	\`serviceRadiusMiles\` int NOT NULL DEFAULT 25,
	\`currentSoftware\` json NOT NULL,
	\`otherSoftware\` varchar(255),
	\`referralsGivenPerMonth\` varchar(50) NOT NULL,
	\`referralsReceivedPerMonth\` varchar(50) NOT NULL,
	\`currentReferralMethod\` varchar(255),
	\`primaryGoal\` varchar(100) NOT NULL,
	\`hearAboutUs\` varchar(255),
	\`additionalNotes\` text,
	\`customTradeDescription\` varchar(500),
	\`licenseFileUrl\` varchar(1000),
	\`licenseFileName\` varchar(255),
	\`smsOptIn\` boolean DEFAULT false,
	\`status\` varchar(255) NOT NULL DEFAULT 'pending',
	\`approvedAt\` timestamp,
	\`approvedBy\` int,
	\`invitedAt\` timestamp,
	\`adminNotes\` text,
	\`source\` varchar(100) DEFAULT 'prolnk-waitlist',
	\`referredBy\` varchar(100),
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`proWaitlist_id\` PRIMARY KEY(\`id\`),
	CONSTRAINT \`proWaitlist_email_unique\` UNIQUE(\`email\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`processedStripeEvents\` (
	\`id\` int NOT NULL,
	\`eventId\` varchar(255) NOT NULL,
	\`eventType\` varchar(100) NOT NULL,
	\`processedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`processedStripeEvents_id\` PRIMARY KEY(\`id\`),
	CONSTRAINT \`processedStripeEvents_eventId_unique\` UNIQUE(\`eventId\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`projectBids\` (
	\`id\` int NOT NULL,
	\`jobId\` int NOT NULL,
	\`submittingPartnerId\` int NOT NULL,
	\`propertyAddress\` varchar(500) NOT NULL,
	\`propertyZip\` varchar(20),
	\`propertyCity\` varchar(100),
	\`propertyState\` varchar(50),
	\`projectTitle\` varchar(200) NOT NULL,
	\`projectDescription\` text NOT NULL,
	\`homeownerName\` varchar(255),
	\`homeownerEmail\` varchar(320),
	\`homeownerPhone\` varchar(30),
	\`lineItems\` json NOT NULL,
	\`photoUrls\` json DEFAULT ('[]'),
	\`totalEstimatedValue\` decimal(12,2) NOT NULL,
	\`targetStartDate\` varchar(50),
	\`confidence\` decimal(4,3) DEFAULT '0.850',
	\`status\` varchar(255) NOT NULL DEFAULT 'pending_review',
	\`approvedAt\` timestamp,
	\`approvedBy\` int,
	\`rejectedAt\` timestamp,
	\`rejectedBy\` int,
	\`rejectionReason\` varchar(500),
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`projectBids_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`properties\` (
	\`id\` int NOT NULL,
	\`ownerId\` int NOT NULL,
	\`nickname\` varchar(100),
	\`address\` varchar(500) NOT NULL,
	\`city\` varchar(100),
	\`state\` varchar(50),
	\`zip\` varchar(20),
	\`latitude\` decimal(10,7),
	\`longitude\` decimal(10,7),
	\`propertyType\` varchar(255) DEFAULT ('single_family'),
	\`yearBuilt\` int,
	\`sqft\` int,
	\`bedrooms\` int,
	\`bathrooms\` decimal(3,1),
	\`lotSize\` text,
	\`hasPool\` boolean NOT NULL DEFAULT false,
	\`hasGarage\` boolean NOT NULL DEFAULT false,
	\`garageType\` varchar(255) DEFAULT ('none'),
	\`hasFence\` boolean NOT NULL DEFAULT false,
	\`fenceType\` varchar(255) DEFAULT ('none'),
	\`hasSpa\` boolean NOT NULL DEFAULT false,
	\`hasOutdoorKitchen\` boolean NOT NULL DEFAULT false,
	\`hasDeck\` boolean NOT NULL DEFAULT false,
	\`hasPatio\` boolean NOT NULL DEFAULT false,
	\`hasBasement\` boolean NOT NULL DEFAULT false,
	\`hasAttic\` boolean NOT NULL DEFAULT false,
	\`hasSolarPanels\` boolean NOT NULL DEFAULT false,
	\`hasGenerator\` boolean NOT NULL DEFAULT false,
	\`hasSmartHome\` boolean NOT NULL DEFAULT false,
	\`hasIrrigationSystem\` boolean NOT NULL DEFAULT false,
	\`hasSecuritySystem\` boolean NOT NULL DEFAULT false,
	\`hasEvCharger\` boolean NOT NULL DEFAULT false,
	\`hasWaterSoftener\` boolean NOT NULL DEFAULT false,
	\`hasOutdoorLighting\` boolean NOT NULL DEFAULT false,
	\`drivewaySurface\` varchar(255) DEFAULT ('none'),
	\`garageSpaces\` int DEFAULT 0,
	\`storiesCount\` text,
	\`flooringTypes\` json DEFAULT ('[]'),
	\`kitchenCountertop\` varchar(255) DEFAULT ('unknown'),
	\`primaryBathType\` varchar(255) DEFAULT ('unknown'),
	\`fireplaceType\` varchar(255) DEFAULT ('none'),
	\`fireplaceCount\` int DEFAULT 0,
	\`ceilingHeight\` varchar(255) DEFAULT ('standard_8ft'),
	\`windowType\` varchar(255) DEFAULT ('unknown'),
	\`applianceBrands\` json DEFAULT ('{}'),
	\`lawnSize\` text,
	\`hasGardenBeds\` boolean NOT NULL DEFAULT false,
	\`treeCount\` varchar(255) DEFAULT ('none'),
	\`hasPets\` boolean NOT NULL DEFAULT false,
	\`dogCount\` int DEFAULT 0,
	\`dogBreedSize\` varchar(255) DEFAULT ('none'),
	\`catCount\` int DEFAULT 0,
	\`otherPets\` varchar(255),
	\`petServiceNeeds\` json DEFAULT ('[]'),
	\`isPrimary\` boolean NOT NULL DEFAULT true,
	\`isRental\` boolean NOT NULL DEFAULT false,
	\`occupancy\` varchar(255) DEFAULT ('owner_occupied'),
	\`ownershipYears\` text,
	\`homeSystems\` json DEFAULT ('[]'),
	\`systemAges\` json DEFAULT ('{}'),
	\`hiringPriorities\` json DEFAULT ('[]'),
	\`stylePreferences\` json DEFAULT ('{}'),
	\`inspirationPhotoUrls\` json DEFAULT ('[]'),
	\`aiMockupUrl\` varchar(1024),
	\`aiMockupStatus\` varchar(255) DEFAULT ('pending'),
	\`aiMockupGeneratedAt\` timestamp,
	\`aiMockupSourcePhotoUrl\` varchar(1024),
	\`setupStep\` int NOT NULL DEFAULT 1,
	\`setupComplete\` boolean NOT NULL DEFAULT false,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`properties_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`propertyAssets\` (
	\`id\` int NOT NULL,
	\`propertyId\` int,
	\`photoId\` int,
	\`jobId\` int,
	\`assetType\` text NOT NULL,
	\`condition\` varchar(255) NOT NULL DEFAULT ('good'),
	\`confidenceScore\` decimal(5,4),
	\`estimatedAge\` int,
	\`estimatedLifespan\` int,
	\`estimatedEndOfLife\` timestamp,
	\`manufacturer\` varchar(255),
	\`modelNumber\` varchar(255),
	\`replacementLeadTriggered\` boolean NOT NULL DEFAULT false,
	\`lastAssessedAt\` timestamp NOT NULL DEFAULT (now()),
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`propertyAssets_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`propertyDocuments\` (
	\`id\` int NOT NULL,
	\`propertyId\` int NOT NULL,
	\`documentType\` varchar(100) NOT NULL,
	\`title\` varchar(255) NOT NULL,
	\`fileUrl\` text NOT NULL,
	\`fileKey\` varchar(500),
	\`mimeType\` varchar(100),
	\`fileSize\` int,
	\`uploadedByUserId\` int,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`propertyDocuments_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`propertyImprovements\` (
	\`id\` int NOT NULL,
	\`propertyId\` int NOT NULL,
	\`category\` varchar(100) NOT NULL,
	\`completedYear\` int,
	\`hasWarranty\` boolean NOT NULL DEFAULT false,
	\`notes\` text,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`propertyImprovements_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`propertyPhotos\` (
	\`id\` int NOT NULL,
	\`propertyId\` int NOT NULL,
	\`uploadedByUserId\` int,
	\`s3Key\` varchar(500) NOT NULL,
	\`url\` text NOT NULL,
	\`thumbnailUrl\` text,
	\`roomLabel\` varchar(100),
	\`caption\` text,
	\`aiScanned\` boolean NOT NULL DEFAULT false,
	\`aiSignals\` json DEFAULT ('[]'),
	\`aiScannedAt\` timestamp,
	\`hasPetSignal\` boolean NOT NULL DEFAULT false,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`propertyPhotos_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`propertyProfiles\` (
	\`id\` int NOT NULL,
	\`address\` text NOT NULL,
	\`city\` varchar(100),
	\`state\` varchar(50),
	\`zip\` varchar(20),
	\`latitude\` decimal(10,7),
	\`longitude\` decimal(10,7),
	\`homeownerName\` varchar(255),
	\`homeownerPhone\` varchar(30),
	\`homeownerEmail\` varchar(255),
	\`totalJobsLogged\` int NOT NULL DEFAULT 0,
	\`totalOpportunitiesDetected\` int NOT NULL DEFAULT 0,
	\`totalOffersAccepted\` int NOT NULL DEFAULT 0,
	\`totalOffersDeclined\` int NOT NULL DEFAULT 0,
	\`totalRevenueGenerated\` decimal(12,2) DEFAULT '0.00',
	\`tradesServiced\` json DEFAULT ('[]'),
	\`detectionHistory\` json DEFAULT ('[]'),
	\`avgAcceptedDiscountPct\` decimal(5,2),
	\`lastServicedAt\` timestamp,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`propertyProfiles_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`propertyTimeline\` (
	\`id\` int NOT NULL,
	\`propertyId\` int NOT NULL,
	\`eventType\` varchar(100) NOT NULL,
	\`title\` varchar(255) NOT NULL,
	\`description\` text,
	\`eventDate\` timestamp,
	\`metadata\` json,
	\`createdByUserId\` int,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`propertyTimeline_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`propertyWishes\` (
	\`id\` int NOT NULL,
	\`propertyId\` int NOT NULL,
	\`category\` varchar(100) NOT NULL,
	\`budgetRange\` text,
	\`urgency\` text,
	\`preferredTimeline\` varchar(100),
	\`notes\` text,
	\`leadCreated\` boolean NOT NULL DEFAULT false,
	\`leadCreatedAt\` timestamp,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`propertyWishes_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`proposals\` (
	\`id\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`clientName\` varchar(255) NOT NULL,
	\`clientEmail\` varchar(320),
	\`clientPhone\` varchar(30),
	\`title\` varchar(255) NOT NULL,
	\`description\` text,
	\`lineItems\` json NOT NULL DEFAULT ('[]'),
	\`totalAmount\` decimal(10,2) NOT NULL DEFAULT '0',
	\`status\` varchar(255) NOT NULL DEFAULT 'draft',
	\`sentAt\` timestamp,
	\`viewedAt\` timestamp,
	\`respondedAt\` timestamp,
	\`expiresAt\` timestamp,
	\`notes\` text,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`proposals_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`quickQuoteRequests\` (
	\`id\` int NOT NULL,
	\`homeownerUserId\` int,
	\`homeownerName\` varchar(255) NOT NULL,
	\`homeownerEmail\` varchar(320) NOT NULL,
	\`homeownerPhone\` varchar(30),
	\`propertyAddress\` varchar(500) NOT NULL,
	\`propertyZipCode\` varchar(10) NOT NULL,
	\`serviceCategory\` varchar(100) NOT NULL,
	\`serviceDescription\` text NOT NULL,
	\`urgency\` varchar(255) NOT NULL DEFAULT ('flexible'),
	\`isWeatherRelated\` boolean NOT NULL DEFAULT false,
	\`weatherEventType\` varchar(100),
	\`photoUrls\` json DEFAULT ('[]'),
	\`targetPartnerId\` int,
	\`broadcastToZip\` boolean NOT NULL DEFAULT false,
	\`status\` varchar(255) NOT NULL DEFAULT 'pending',
	\`quotedAmount\` decimal(10,2),
	\`partnerResponse\` text,
	\`respondedAt\` timestamp,
	\`expiresAt\` timestamp,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`quickQuoteRequests_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`quotes\` (
	\`id\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`clientName\` varchar(255) NOT NULL,
	\`clientEmail\` varchar(320),
	\`serviceCategory\` varchar(100),
	\`description\` text,
	\`estimatedAmount\` decimal(10,2) NOT NULL DEFAULT '0',
	\`status\` varchar(255) NOT NULL DEFAULT 'draft',
	\`sentAt\` timestamp,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`quotes_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`realEstateAgents\` (
	\`id\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`licenseNumber\` varchar(100),
	\`brokerageName\` varchar(200),
	\`mlsId\` varchar(100),
	\`serviceZipCodes\` text,
	\`averageHomeSalePrice\` decimal(12,2),
	\`proLnkReferralRate\` decimal(5,4) NOT NULL DEFAULT '0.1000',
	\`homeownerRecruitRate\` decimal(5,4) NOT NULL DEFAULT '0.2500',
	\`totalReferralsSent\` int NOT NULL DEFAULT 0,
	\`totalSalesCompleted\` int NOT NULL DEFAULT 0,
	\`totalEarned\` decimal(12,2) NOT NULL DEFAULT '0.00',
	\`totalOwed\` decimal(12,2) NOT NULL DEFAULT '0.00',
	\`agreementSignedAt\` timestamp,
	\`agreementSignedBy\` varchar(200),
	\`agreementVersion\` varchar(20),
	\`referralCode\` varchar(50),
	\`contactName\` varchar(200),
	\`contactEmail\` varchar(255),
	\`businessName\` varchar(200),
	\`userId\` int,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`realEstateAgents_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`recallAlerts\` (
	\`id\` int NOT NULL,
	\`recallNumber\` varchar(100) NOT NULL,
	\`productName\` varchar(512) NOT NULL,
	\`manufacturer\` varchar(255) NOT NULL,
	\`description\` text,
	\`hazardDescription\` text,
	\`assetTypes\` json,
	\`manufacturerPatterns\` json,
	\`affectedProperties\` int NOT NULL DEFAULT 0,
	\`leadsGenerated\` int NOT NULL DEFAULT 0,
	\`status\` varchar(255) NOT NULL DEFAULT 'active',
	\`publishedDate\` timestamp,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`recallAlerts_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`referralClicks\` (
	\`id\` int NOT NULL,
	\`referrerId\` int NOT NULL,
	\`referralCode\` varchar(100) NOT NULL,
	\`clickedAt\` timestamp DEFAULT (now()),
	\`convertedAt\` timestamp,
	\`convertedPartnerId\` int,
	\`ipAddress\` varchar(45),
	\`userAgent\` text,
	CONSTRAINT \`referralClicks_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`referralGraph\` (
	\`id\` int NOT NULL,
	\`sourcePartnerId\` int NOT NULL,
	\`receivingPartnerId\` int NOT NULL,
	\`sourceTrade\` varchar(100),
	\`receivingTrade\` varchar(100),
	\`city\` varchar(100),
	\`zip\` varchar(20),
	\`totalReferrals\` int NOT NULL DEFAULT 0,
	\`totalConverted\` int NOT NULL DEFAULT 0,
	\`totalJobValue\` decimal(12,2) DEFAULT '0',
	\`totalCommissionPaid\` decimal(12,2) DEFAULT '0',
	\`conversionRate\` decimal(5,4) DEFAULT '0',
	\`avgDaysToClose\` decimal(6,2),
	\`relationshipStrength\` int DEFAULT 0,
	\`firstReferralAt\` timestamp,
	\`lastReferralAt\` timestamp,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`referralGraph_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`referrals\` (
	\`id\` int NOT NULL,
	\`fromPartnerId\` int NOT NULL,
	\`toPartnerId\` int,
	\`customerName\` varchar(255),
	\`customerEmail\` varchar(320),
	\`customerPhone\` varchar(30),
	\`serviceType\` varchar(100),
	\`notes\` text,
	\`status\` varchar(255) NOT NULL DEFAULT 'pending',
	\`commissionAmount\` decimal(10,2) DEFAULT '0.00',
	\`commissionPaid\` boolean NOT NULL DEFAULT false,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`referrals_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`reviewRequests\` (
	\`id\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`jobId\` int,
	\`token\` varchar(64) NOT NULL,
	\`homeownerName\` varchar(255),
	\`homeownerEmail\` varchar(255),
	\`homeownerPhone\` varchar(50),
	\`serviceAddress\` varchar(512),
	\`status\` varchar(255) NOT NULL DEFAULT 'pending',
	\`submittedAt\` timestamp,
	\`expiresAt\` timestamp,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`reviewRequests_id\` PRIMARY KEY(\`id\`),
	CONSTRAINT \`reviewRequests_token_unique\` UNIQUE(\`token\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`reviewResponses\` (
	\`id\` int NOT NULL,
	\`reviewId\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`body\` text NOT NULL,
	\`isPublic\` boolean NOT NULL DEFAULT true,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`reviewResponses_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`roomMakeoverSessions\` (
	\`id\` int NOT NULL,
	\`homeownerUserId\` int,
	\`guestEmail\` varchar(320),
	\`guestName\` varchar(255),
	\`roomType\` varchar(100) NOT NULL,
	\`photoUrls\` json DEFAULT ('[]'),
	\`styleAnswers\` json DEFAULT ('{}'),
	\`aiPrompt\` text,
	\`generatedImageUrl\` varchar(1000),
	\`generationStatus\` varchar(255) NOT NULL DEFAULT ('pending'),
	\`generationError\` text,
	\`savedToHomeProfile\` boolean NOT NULL DEFAULT false,
	\`detectedOpportunities\` json DEFAULT ('[]'),
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`roomMakeoverSessions_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`seasonalPrepItems\` (
	\`id\` int NOT NULL,
	\`season\` text NOT NULL,
	\`title\` varchar(255) NOT NULL,
	\`description\` text,
	\`priority\` varchar(255) NOT NULL DEFAULT ('medium'),
	\`estimatedCost\` varchar(100),
	\`diyDifficulty\` varchar(255) NOT NULL DEFAULT ('moderate'),
	\`sortOrder\` int NOT NULL DEFAULT 0,
	\`isActive\` boolean NOT NULL DEFAULT true,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`seasonalPrepItems_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`serviceRequests\` (
	\`id\` int NOT NULL,
	\`homeownerProfileId\` int NOT NULL,
	\`propertyId\` int,
	\`serviceCategory\` varchar(100) NOT NULL,
	\`description\` text,
	\`urgency\` varchar(255) NOT NULL DEFAULT ('normal'),
	\`budget\` varchar(50),
	\`preferredDate\` timestamp,
	\`photoUrls\` json,
	\`status\` varchar(255) NOT NULL DEFAULT 'open',
	\`matchedPartnerId\` int,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`serviceRequests_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`skillEnrollments\` (
	\`id\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`skillId\` varchar(100) NOT NULL,
	\`skillName\` varchar(255) NOT NULL,
	\`price\` decimal(10,2) NOT NULL DEFAULT '0',
	\`status\` varchar(255) NOT NULL DEFAULT 'active',
	\`expiresAt\` timestamp,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`skillEnrollments_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`stormAlerts\` (
	\`id\` int NOT NULL,
	\`propertyId\` int,
	\`zipCode\` varchar(10) NOT NULL,
	\`alertType\` varchar(100) NOT NULL,
	\`headline\` varchar(500) NOT NULL,
	\`severity\` varchar(255) NOT NULL DEFAULT ('moderate'),
	\`description\` text,
	\`startsAt\` timestamp,
	\`endsAt\` timestamp,
	\`source\` varchar(100),
	\`notificationSent\` boolean NOT NULL DEFAULT false,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`stormAlerts_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`stormEvents\` (
	\`id\` int NOT NULL,
	\`eventId\` varchar(255) NOT NULL,
	\`eventType\` varchar(100) NOT NULL,
	\`headline\` text,
	\`description\` text,
	\`severity\` varchar(50),
	\`urgency\` varchar(50),
	\`affectedAreas\` json DEFAULT ('[]'),
	\`status\` varchar(255) NOT NULL DEFAULT 'active',
	\`onsetAt\` timestamp,
	\`expiresAt\` timestamp,
	\`propertiesAffected\` int NOT NULL DEFAULT 0,
	\`leadsGenerated\` int NOT NULL DEFAULT 0,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`stormEvents_id\` PRIMARY KEY(\`id\`),
	CONSTRAINT \`stormEvents_eventId_unique\` UNIQUE(\`eventId\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`stormLeads\` (
	\`id\` int NOT NULL,
	\`stormEventId\` int NOT NULL,
	\`propertyId\` int,
	\`tradeCategory\` varchar(100) NOT NULL,
	\`address\` varchar(500),
	\`city\` varchar(100),
	\`state\` varchar(10),
	\`zip\` varchar(20),
	\`status\` varchar(255) NOT NULL DEFAULT 'pending',
	\`priority\` varchar(255) NOT NULL DEFAULT ('normal'),
	\`dispatchedToPartnerId\` int,
	\`dispatchedAt\` timestamp,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`stormLeads_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`stripeConnectOnboarding\` (
	\`id\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`stripeAccountId\` varchar(255),
	\`onboardingUrl\` text,
	\`onboardingExpiresAt\` timestamp,
	\`status\` varchar(255) NOT NULL DEFAULT 'not_started',
	\`chargesEnabled\` boolean NOT NULL DEFAULT false,
	\`payoutsEnabled\` boolean NOT NULL DEFAULT false,
	\`detailsSubmitted\` boolean NOT NULL DEFAULT false,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`stripeConnectOnboarding_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`systemSettings\` (
	\`id\` int NOT NULL,
	\`key\` varchar(100) NOT NULL,
	\`value\` text NOT NULL,
	\`description\` varchar(500),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`systemSettings_id\` PRIMARY KEY(\`id\`),
	CONSTRAINT \`systemSettings_key_unique\` UNIQUE(\`key\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`taxEstimates\` (
	\`id\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`year\` int NOT NULL,
	\`grossRevenue\` decimal(12,2) NOT NULL,
	\`deductions\` decimal(12,2) NOT NULL DEFAULT '0',
	\`estimatedTax\` decimal(12,2) NOT NULL,
	\`effectiveRate\` decimal(5,2) NOT NULL,
	\`notes\` text,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`taxEstimates_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`trainingEnrollments\` (
	\`id\` int NOT NULL,
	\`partnerId\` int NOT NULL,
	\`courseId\` varchar(100) NOT NULL,
	\`courseName\` varchar(255) NOT NULL,
	\`status\` varchar(255) NOT NULL DEFAULT 'enrolled',
	\`progress\` int NOT NULL DEFAULT 0,
	\`completedAt\` timestamp,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`trainingEnrollments_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`userPasswords\` (
	\`id\` int NOT NULL,
	\`openId\` varchar(64) NOT NULL,
	\`passwordHash\` varchar(256) NOT NULL,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`userPasswords_id\` PRIMARY KEY(\`id\`),
	CONSTRAINT \`userPasswords_openId_unique\` UNIQUE(\`openId\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`users\` (
	\`id\` int NOT NULL,
	\`openId\` varchar(64) NOT NULL,
	\`name\` text,
	\`email\` varchar(320),
	\`loginMethod\` varchar(64),
	\`role\` varchar(255) NOT NULL DEFAULT ('user'),
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	\`lastSignedIn\` timestamp NOT NULL DEFAULT (now()),
	\`stripeCustomerId\` varchar(255),
	CONSTRAINT \`users_id\` PRIMARY KEY(\`id\`),
	CONSTRAINT \`users_openId_unique\` UNIQUE(\`openId\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`vaultImportConsents\` (
	\`id\` int NOT NULL,
	\`homeownerProfileId\` int NOT NULL,
	\`propertyId\` int,
	\`fsmJobRecordId\` int NOT NULL,
	\`decision\` text NOT NULL,
	\`decidedAt\` timestamp NOT NULL DEFAULT (now()),
	\`vaultEntryId\` int,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`vaultImportConsents_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`webhookDeliveryLog\` (
	\`id\` int NOT NULL,
	\`subscriptionId\` int NOT NULL,
	\`eventName\` varchar(100) NOT NULL,
	\`payload\` json,
	\`statusCode\` int,
	\`responseBody\` text,
	\`success\` boolean NOT NULL DEFAULT false,
	\`durationMs\` int,
	\`firedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`webhookDeliveryLog_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS \`webhookSubscriptions\` (
	\`id\` int NOT NULL,
	\`name\` varchar(255) NOT NULL,
	\`url\` text NOT NULL,
	\`secret\` varchar(255),
	\`events\` json DEFAULT ('[]'),
	\`isActive\` boolean NOT NULL DEFAULT true,
	\`totalFired\` int NOT NULL DEFAULT 0,
	\`totalSucceeded\` int NOT NULL DEFAULT 0,
	\`totalFailed\` int NOT NULL DEFAULT 0,
	\`lastFiredAt\` timestamp,
	\`lastStatus\` int,
	\`createdBy\` int,
	\`createdAt\` timestamp NOT NULL DEFAULT (now()),
	\`updatedAt\` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT \`webhookSubscriptions_id\` PRIMARY KEY(\`id\`)
);
--> statement-breakpoint
ALTER TABLE \`acceptanceSignals\` ADD CONSTRAINT \`acceptanceSignals_opportunityId_opportunities_id_fk\` FOREIGN KEY (\`opportunityId\`) REFERENCES \`opportunities\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`acceptanceSignals\` ADD CONSTRAINT \`acceptanceSignals_propertyProfileId_propertyProfiles_id_fk\` FOREIGN KEY (\`propertyProfileId\`) REFERENCES \`propertyProfiles\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`achAuthorizations\` ADD CONSTRAINT \`achAuthorizations_jobPaymentId_jobPayments_id_fk\` FOREIGN KEY (\`jobPaymentId\`) REFERENCES \`jobPayments\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`achAuthorizations\` ADD CONSTRAINT \`achAuthorizations_dealId_customerDeals_id_fk\` FOREIGN KEY (\`dealId\`) REFERENCES \`customerDeals\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`adminAuditLog\` ADD CONSTRAINT \`adminAuditLog_adminUserId_users_id_fk\` FOREIGN KEY (\`adminUserId\`) REFERENCES \`users\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`aiPipelineRuns\` ADD CONSTRAINT \`aiPipelineRuns_photoId_propertyPhotos_id_fk\` FOREIGN KEY (\`photoId\`) REFERENCES \`propertyPhotos\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`aiPipelineRuns\` ADD CONSTRAINT \`aiPipelineRuns_jobId_jobs_id_fk\` FOREIGN KEY (\`jobId\`) REFERENCES \`jobs\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`aiPipelineRuns\` ADD CONSTRAINT \`aiPipelineRuns_partnerId_partners_id_fk\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`aiTrainingDataset\` ADD CONSTRAINT \`aiTrainingDataset_jobId_jobs_id_fk\` FOREIGN KEY (\`jobId\`) REFERENCES \`jobs\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`aiTrainingDataset\` ADD CONSTRAINT \`aiTrainingDataset_opportunityId_opportunities_id_fk\` FOREIGN KEY (\`opportunityId\`) REFERENCES \`opportunities\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`broadcasts\` ADD CONSTRAINT \`broadcasts_sentBy_users_id_fk\` FOREIGN KEY (\`sentBy\`) REFERENCES \`users\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`commissions\` ADD CONSTRAINT \`commissions_opportunityId_opportunities_id_fk\` FOREIGN KEY (\`opportunityId\`) REFERENCES \`opportunities\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`commissions\` ADD CONSTRAINT \`commissions_payingPartnerId_partners_id_fk\` FOREIGN KEY (\`payingPartnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`commissions\` ADD CONSTRAINT \`commissions_receivingPartnerId_partners_id_fk\` FOREIGN KEY (\`receivingPartnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`complianceEvents\` ADD CONSTRAINT \`complianceEvents_partnerId_partners_id_fk\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`complianceEvents\` ADD CONSTRAINT \`complianceEvents_adminUserId_users_id_fk\` FOREIGN KEY (\`adminUserId\`) REFERENCES \`users\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`contentItems\` ADD CONSTRAINT \`contentItems_createdBy_users_id_fk\` FOREIGN KEY (\`createdBy\`) REFERENCES \`users\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`customerDeals\` ADD CONSTRAINT \`customerDeals_opportunityId_opportunities_id_fk\` FOREIGN KEY (\`opportunityId\`) REFERENCES \`opportunities\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`customerDeals\` ADD CONSTRAINT \`customerDeals_referringPartnerId_partners_id_fk\` FOREIGN KEY (\`referringPartnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`customerDeals\` ADD CONSTRAINT \`customerDeals_receivingPartnerId_partners_id_fk\` FOREIGN KEY (\`receivingPartnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`dataExportRequests\` ADD CONSTRAINT \`dataExportRequests_homeownerId_users_id_fk\` FOREIGN KEY (\`homeownerId\`) REFERENCES \`users\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`eventDrivenLeads\` ADD CONSTRAINT \`eventDrivenLeads_triggerId_eventTriggers_id_fk\` FOREIGN KEY (\`triggerId\`) REFERENCES \`eventTriggers\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`eventDrivenLeads\` ADD CONSTRAINT \`eventDrivenLeads_propertyId_properties_id_fk\` FOREIGN KEY (\`propertyId\`) REFERENCES \`properties\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`eventDrivenLeads\` ADD CONSTRAINT \`eventDrivenLeads_partnerId_partners_id_fk\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`exchangeBids\` ADD CONSTRAINT \`exchangeBids_jobId_exchangeJobs_id_fk\` FOREIGN KEY (\`jobId\`) REFERENCES \`exchangeJobs\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`exchangeBids\` ADD CONSTRAINT \`exchangeBids_biddingPartnerId_partners_id_fk\` FOREIGN KEY (\`biddingPartnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`exchangeJobs\` ADD CONSTRAINT \`exchangeJobs_postedByPartnerId_partners_id_fk\` FOREIGN KEY (\`postedByPartnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`fieldJobLog\` ADD CONSTRAINT \`fieldJobLog_partnerId_partners_id_fk\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`fsmJobRecords\` ADD CONSTRAINT \`fsmJobRecords_partnerId_partners_id_fk\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`fsmJobRecords\` ADD CONSTRAINT \`fsmJobRecords_integrationId_partnerIntegrations_id_fk\` FOREIGN KEY (\`integrationId\`) REFERENCES \`partnerIntegrations\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`fsmSyncJobs\` ADD CONSTRAINT \`fsmSyncJobs_integrationId_partnerIntegrations_id_fk\` FOREIGN KEY (\`integrationId\`) REFERENCES \`partnerIntegrations\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`fsmWebhookEvents\` ADD CONSTRAINT \`fsmWebhookEvents_matchedPartnerId_partners_id_fk\` FOREIGN KEY (\`matchedPartnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`fsmWebhookEvents\` ADD CONSTRAINT \`fsmWebhookEvents_matchedOpportunityId_opportunities_id_fk\` FOREIGN KEY (\`matchedOpportunityId\`) REFERENCES \`opportunities\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`funnelEvents\` ADD CONSTRAINT \`funnelEvents_opportunityId_opportunities_id_fk\` FOREIGN KEY (\`opportunityId\`) REFERENCES \`opportunities\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`funnelEvents\` ADD CONSTRAINT \`funnelEvents_propertyProfileId_propertyProfiles_id_fk\` FOREIGN KEY (\`propertyProfileId\`) REFERENCES \`propertyProfiles\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`funnelEvents\` ADD CONSTRAINT \`funnelEvents_partnerId_partners_id_fk\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`growthProjections\` ADD CONSTRAINT \`growthProjections_partnerId_partners_id_fk\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`homeMaintenanceLogs\` ADD CONSTRAINT \`homeMaintenanceLogs_propertyId_properties_id_fk\` FOREIGN KEY (\`propertyId\`) REFERENCES \`properties\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`homeMaintenanceLogs\` ADD CONSTRAINT \`homeMaintenanceLogs_systemHealthId_homeSystemHealth_id_fk\` FOREIGN KEY (\`systemHealthId\`) REFERENCES \`homeSystemHealth\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`homeMaintenanceLogs\` ADD CONSTRAINT \`homeMaintenanceLogs_servicedByPartnerId_partners_id_fk\` FOREIGN KEY (\`servicedByPartnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`homePassportTransfers\` ADD CONSTRAINT \`homePassportTransfers_propertyId_properties_id_fk\` FOREIGN KEY (\`propertyId\`) REFERENCES \`properties\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`homePassportTransfers\` ADD CONSTRAINT \`homePassportTransfers_previousOwnerId_homeownerProfiles_id_fk\` FOREIGN KEY (\`previousOwnerId\`) REFERENCES \`homeownerProfiles\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`homePassportTransfers\` ADD CONSTRAINT \`homePassportTransfers_newOwnerId_homeownerProfiles_id_fk\` FOREIGN KEY (\`newOwnerId\`) REFERENCES \`homeownerProfiles\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`homeSystemHealth\` ADD CONSTRAINT \`homeSystemHealth_propertyId_properties_id_fk\` FOREIGN KEY (\`propertyId\`) REFERENCES \`properties\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`homeWaitlist\` ADD CONSTRAINT \`homeWaitlist_approvedBy_users_id_fk\` FOREIGN KEY (\`approvedBy\`) REFERENCES \`users\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`homeowner360Profiles\` ADD CONSTRAINT \`homeowner360Profiles_userId_users_id_fk\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`homeownerFavorites\` ADD CONSTRAINT \`homeownerFavorites_homeownerProfileId_homeownerProfiles_id_fk\` FOREIGN KEY (\`homeownerProfileId\`) REFERENCES \`homeownerProfiles\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`homeownerFavorites\` ADD CONSTRAINT \`homeownerFavorites_partnerId_partners_id_fk\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`homeownerNotifications\` ADD CONSTRAINT \`homeownerNotifications_userId_users_id_fk\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`homeownerProfiles\` ADD CONSTRAINT \`homeownerProfiles_userId_users_id_fk\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`homeownerReviews\` ADD CONSTRAINT \`homeownerReviews_dealId_customerDeals_id_fk\` FOREIGN KEY (\`dealId\`) REFERENCES \`customerDeals\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`homeownerReviews\` ADD CONSTRAINT \`homeownerReviews_partnerId_partners_id_fk\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`jobPayments\` ADD CONSTRAINT \`jobPayments_dealId_customerDeals_id_fk\` FOREIGN KEY (\`dealId\`) REFERENCES \`customerDeals\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`jobs\` ADD CONSTRAINT \`jobs_partnerId_partners_id_fk\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`jobs\` ADD CONSTRAINT \`jobs_loggedByUserId_users_id_fk\` FOREIGN KEY (\`loggedByUserId\`) REFERENCES \`users\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`networkingEventRegistrations\` ADD CONSTRAINT \`networkingEventRegistrations_partnerId_partners_id_fk\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`opportunities\` ADD CONSTRAINT \`opportunities_jobId_jobs_id_fk\` FOREIGN KEY (\`jobId\`) REFERENCES \`jobs\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`opportunities\` ADD CONSTRAINT \`opportunities_sourcePartnerId_partners_id_fk\` FOREIGN KEY (\`sourcePartnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`opportunities\` ADD CONSTRAINT \`opportunities_receivingPartnerId_partners_id_fk\` FOREIGN KEY (\`receivingPartnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`partner360Profiles\` ADD CONSTRAINT \`partner360Profiles_partnerId_partners_id_fk\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`partnerAvailability\` ADD CONSTRAINT \`partnerAvailability_partnerId_partners_id_fk\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`partnerIntegrations\` ADD CONSTRAINT \`partnerIntegrations_partnerId_partners_id_fk\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`partnerJobPreferences\` ADD CONSTRAINT \`partnerJobPreferences_partnerId_partners_id_fk\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`partnerNotifications\` ADD CONSTRAINT \`partnerNotifications_partnerId_partners_id_fk\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`partnerOnboardingChecklist\` ADD CONSTRAINT \`partnerOnboardingChecklist_partnerId_partners_id_fk\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`partnerPerformanceScores\` ADD CONSTRAINT \`partnerPerformanceScores_partnerId_partners_id_fk\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`partnerReviews\` ADD CONSTRAINT \`partnerReviews_dealId_customerDeals_id_fk\` FOREIGN KEY (\`dealId\`) REFERENCES \`customerDeals\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`partnerReviews\` ADD CONSTRAINT \`partnerReviews_partnerId_partners_id_fk\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`partners\` ADD CONSTRAINT \`partners_userId_users_id_fk\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`paymentMilestones\` ADD CONSTRAINT \`paymentMilestones_jobPaymentId_jobPayments_id_fk\` FOREIGN KEY (\`jobPaymentId\`) REFERENCES \`jobPayments\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`paymentMilestones\` ADD CONSTRAINT \`paymentMilestones_dealId_customerDeals_id_fk\` FOREIGN KEY (\`dealId\`) REFERENCES \`customerDeals\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`payoutRequests\` ADD CONSTRAINT \`payoutRequests_partnerId_partners_id_fk\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`photoIntakeQueue\` ADD CONSTRAINT \`photoIntakeQueue_partnerId_partners_id_fk\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`photoIntakeQueue\` ADD CONSTRAINT \`photoIntakeQueue_integrationId_partnerIntegrations_id_fk\` FOREIGN KEY (\`integrationId\`) REFERENCES \`partnerIntegrations\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`photoIntakeQueue\` ADD CONSTRAINT \`photoIntakeQueue_jobId_jobs_id_fk\` FOREIGN KEY (\`jobId\`) REFERENCES \`jobs\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`proAgreements\` ADD CONSTRAINT \`proAgreements_partnerId_partners_id_fk\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`proWaitlist\` ADD CONSTRAINT \`proWaitlist_approvedBy_users_id_fk\` FOREIGN KEY (\`approvedBy\`) REFERENCES \`users\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`projectBids\` ADD CONSTRAINT \`projectBids_jobId_jobs_id_fk\` FOREIGN KEY (\`jobId\`) REFERENCES \`jobs\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`projectBids\` ADD CONSTRAINT \`projectBids_submittingPartnerId_partners_id_fk\` FOREIGN KEY (\`submittingPartnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`properties\` ADD CONSTRAINT \`properties_ownerId_homeownerProfiles_id_fk\` FOREIGN KEY (\`ownerId\`) REFERENCES \`homeownerProfiles\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`propertyAssets\` ADD CONSTRAINT \`propertyAssets_propertyId_properties_id_fk\` FOREIGN KEY (\`propertyId\`) REFERENCES \`properties\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`propertyAssets\` ADD CONSTRAINT \`propertyAssets_photoId_propertyPhotos_id_fk\` FOREIGN KEY (\`photoId\`) REFERENCES \`propertyPhotos\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`propertyAssets\` ADD CONSTRAINT \`propertyAssets_jobId_jobs_id_fk\` FOREIGN KEY (\`jobId\`) REFERENCES \`jobs\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`propertyImprovements\` ADD CONSTRAINT \`propertyImprovements_propertyId_properties_id_fk\` FOREIGN KEY (\`propertyId\`) REFERENCES \`properties\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`propertyPhotos\` ADD CONSTRAINT \`propertyPhotos_propertyId_properties_id_fk\` FOREIGN KEY (\`propertyId\`) REFERENCES \`properties\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`propertyPhotos\` ADD CONSTRAINT \`propertyPhotos_uploadedByUserId_users_id_fk\` FOREIGN KEY (\`uploadedByUserId\`) REFERENCES \`users\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`propertyWishes\` ADD CONSTRAINT \`propertyWishes_propertyId_properties_id_fk\` FOREIGN KEY (\`propertyId\`) REFERENCES \`properties\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`proposals\` ADD CONSTRAINT \`proposals_partnerId_partners_id_fk\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`quickQuoteRequests\` ADD CONSTRAINT \`quickQuoteRequests_homeownerUserId_users_id_fk\` FOREIGN KEY (\`homeownerUserId\`) REFERENCES \`users\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`quickQuoteRequests\` ADD CONSTRAINT \`quickQuoteRequests_targetPartnerId_partners_id_fk\` FOREIGN KEY (\`targetPartnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`quotes\` ADD CONSTRAINT \`quotes_partnerId_partners_id_fk\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`referralGraph\` ADD CONSTRAINT \`referralGraph_sourcePartnerId_partners_id_fk\` FOREIGN KEY (\`sourcePartnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`referralGraph\` ADD CONSTRAINT \`referralGraph_receivingPartnerId_partners_id_fk\` FOREIGN KEY (\`receivingPartnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`reviewRequests\` ADD CONSTRAINT \`reviewRequests_partnerId_partners_id_fk\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`reviewRequests\` ADD CONSTRAINT \`reviewRequests_jobId_jobs_id_fk\` FOREIGN KEY (\`jobId\`) REFERENCES \`jobs\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`roomMakeoverSessions\` ADD CONSTRAINT \`roomMakeoverSessions_homeownerUserId_users_id_fk\` FOREIGN KEY (\`homeownerUserId\`) REFERENCES \`users\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`skillEnrollments\` ADD CONSTRAINT \`skillEnrollments_partnerId_partners_id_fk\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`stormLeads\` ADD CONSTRAINT \`stormLeads_stormEventId_stormEvents_id_fk\` FOREIGN KEY (\`stormEventId\`) REFERENCES \`stormEvents\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`stormLeads\` ADD CONSTRAINT \`stormLeads_propertyId_properties_id_fk\` FOREIGN KEY (\`propertyId\`) REFERENCES \`properties\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`stormLeads\` ADD CONSTRAINT \`stormLeads_dispatchedToPartnerId_partners_id_fk\` FOREIGN KEY (\`dispatchedToPartnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`taxEstimates\` ADD CONSTRAINT \`taxEstimates_partnerId_partners_id_fk\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`trainingEnrollments\` ADD CONSTRAINT \`trainingEnrollments_partnerId_partners_id_fk\` FOREIGN KEY (\`partnerId\`) REFERENCES \`partners\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`userPasswords\` ADD CONSTRAINT \`userPasswords_openId_users_openId_fk\` FOREIGN KEY (\`openId\`) REFERENCES \`users\`(\`openId\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`vaultImportConsents\` ADD CONSTRAINT \`vaultImportConsents_fsmJobRecordId_fsmJobRecords_id_fk\` FOREIGN KEY (\`fsmJobRecordId\`) REFERENCES \`fsmJobRecords\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`webhookDeliveryLog\` ADD CONSTRAINT \`webhookDeliveryLog_subscriptionId_webhookSubscriptions_id_fk\` FOREIGN KEY (\`subscriptionId\`) REFERENCES \`webhookSubscriptions\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE \`webhookSubscriptions\` ADD CONSTRAINT \`webhookSubscriptions_createdBy_users_id_fk\` FOREIGN KEY (\`createdBy\`) REFERENCES \`users\`(\`id\`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX \`payout_recipient_idx\` ON \`commission_payout\` (\`recipient_user_id\`);--> statement-breakpoint
CREATE INDEX \`payout_month_idx\` ON \`commission_payout\` (\`payout_month\`);--> statement-breakpoint
CREATE INDEX \`payout_status_idx\` ON \`commission_payout\` (\`status\`);--> statement-breakpoint
CREATE INDEX \`home_doc_pro_idx\` ON \`home_documentation\` (\`pro_user_id\`);--> statement-breakpoint
CREATE INDEX \`commission_event_pro_idx\` ON \`job_commission_event\` (\`pro_user_id\`);--> statement-breakpoint
CREATE INDEX \`commission_event_status_idx\` ON \`job_commission_event\` (\`status\`);--> statement-breakpoint
CREATE INDEX \`pro_upline_pro_idx\` ON \`pro_upline_chain\` (\`pro_user_id\`);--> statement-breakpoint
CREATE INDEX \`pro_upline_upline_idx\` ON \`pro_upline_chain\` (\`upline_user_id\`);
`;

export const MIGRATION_0001 = String.raw`
ALTER TABLE \`achAuthorizations\` MODIFY COLUMN \`accountType\` varchar(255) DEFAULT 'checking';--> statement-breakpoint
ALTER TABLE \`achAuthorizations\` MODIFY COLUMN \`authorizationType\` varchar(255) NOT NULL DEFAULT 'single_job';--> statement-breakpoint
ALTER TABLE \`achAuthorizations\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'pending_signature';--> statement-breakpoint
ALTER TABLE \`activityLog\` MODIFY COLUMN \`actorRole\` varchar(255) NOT NULL DEFAULT 'system';--> statement-breakpoint
ALTER TABLE \`agentHomeownerReferrals\` MODIFY COLUMN \`saleStatus\` varchar(255) NOT NULL DEFAULT 'active';--> statement-breakpoint
ALTER TABLE \`agentProperties\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'active';--> statement-breakpoint
ALTER TABLE \`aiPipelineRuns\` MODIFY COLUMN \`stage\` varchar(255) NOT NULL DEFAULT 'preprocessing';--> statement-breakpoint
ALTER TABLE \`aiPipelineRuns\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'running';--> statement-breakpoint
ALTER TABLE \`aiTrainingDataset\` MODIFY COLUMN \`validationOutcome\` varchar(255) DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE \`commissions\` MODIFY COLUMN \`disputeStatus\` varchar(255) NOT NULL DEFAULT 'none';--> statement-breakpoint
ALTER TABLE \`commissions\` MODIFY COLUMN \`disputeAppealStatus\` varchar(255) NOT NULL DEFAULT 'none';--> statement-breakpoint
ALTER TABLE \`customerDeals\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'draft';--> statement-breakpoint
ALTER TABLE \`dataExportRequests\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE \`eventDrivenLeads\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'generated';--> statement-breakpoint
ALTER TABLE \`eventTriggers\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'active';--> statement-breakpoint
ALTER TABLE \`exchangeBids\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE \`exchangeJobs\` MODIFY COLUMN \`jobType\` varchar(255) NOT NULL DEFAULT 'residential';--> statement-breakpoint
ALTER TABLE \`exchangeJobs\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'open';--> statement-breakpoint
ALTER TABLE \`featuredAdvertisers\` MODIFY COLUMN \`zipCodes\` varchar(255) NOT NULL DEFAULT '[]';--> statement-breakpoint
ALTER TABLE \`featuredAdvertisers\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE \`fieldJobLog\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'scheduled';--> statement-breakpoint
ALTER TABLE \`fieldJobLog\` MODIFY COLUMN \`source\` varchar(255) NOT NULL DEFAULT 'manual';--> statement-breakpoint
ALTER TABLE \`fsmJobRecords\` MODIFY COLUMN \`importStatus\` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE \`fsmSyncJobs\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'queued';--> statement-breakpoint
ALTER TABLE \`fsmWebhookEvents\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'received';--> statement-breakpoint
ALTER TABLE \`homeHealthVaultEntries\` MODIFY COLUMN \`condition\` varchar(255) NOT NULL DEFAULT 'unknown';--> statement-breakpoint
ALTER TABLE \`homeMaintenanceItems\` MODIFY COLUMN \`importance\` varchar(255) NOT NULL DEFAULT 'medium';--> statement-breakpoint
ALTER TABLE \`homePassportTransfers\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE \`homeSystemHealth\` MODIFY COLUMN \`condition\` varchar(255) NOT NULL DEFAULT 'unknown';--> statement-breakpoint
ALTER TABLE \`homeSystemRecords\` MODIFY COLUMN \`condition\` varchar(255) NOT NULL DEFAULT 'good';--> statement-breakpoint
ALTER TABLE \`homeWaitlist\` MODIFY COLUMN \`ownershipStatus\` varchar(255) DEFAULT 'own';--> statement-breakpoint
ALTER TABLE \`homeWaitlist\` MODIFY COLUMN \`ownershipType\` varchar(255) DEFAULT 'primary_residence';--> statement-breakpoint
ALTER TABLE \`homeWaitlist\` MODIFY COLUMN \`projectTimeline\` varchar(255) DEFAULT 'just_exploring';--> statement-breakpoint
ALTER TABLE \`homeWaitlist\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE \`homeowner360Profiles\` MODIFY COLUMN \`budgetComfort\` varchar(255) DEFAULT 'value_seeker';--> statement-breakpoint
ALTER TABLE \`homeowner360Profiles\` MODIFY COLUMN \`decisionMaker\` varchar(255) DEFAULT 'solo';--> statement-breakpoint
ALTER TABLE \`homeowner360Profiles\` MODIFY COLUMN \`decisionSpeed\` varchar(255) DEFAULT 'within_week';--> statement-breakpoint
ALTER TABLE \`homeowner360Profiles\` MODIFY COLUMN \`communicationStyle\` varchar(255) DEFAULT 'text_first';--> statement-breakpoint
ALTER TABLE \`homeowner360Profiles\` MODIFY COLUMN \`bestTimeToContact\` varchar(255) DEFAULT 'anytime';--> statement-breakpoint
ALTER TABLE \`homeowner360Profiles\` MODIFY COLUMN \`responseExpectation\` varchar(255) DEFAULT 'same_day';--> statement-breakpoint
ALTER TABLE \`homeowner360Profiles\` MODIFY COLUMN \`sellTimeframe\` varchar(255) DEFAULT 'not_planning';--> statement-breakpoint
ALTER TABLE \`homeowner360Profiles\` MODIFY COLUMN \`referralMotivation\` varchar(255) DEFAULT 'credits';--> statement-breakpoint
ALTER TABLE \`homeownerLeads\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'new';--> statement-breakpoint
ALTER TABLE \`homeownerNotifications\` MODIFY COLUMN \`type\` varchar(255) NOT NULL DEFAULT 'system';--> statement-breakpoint
ALTER TABLE \`homeownerProfiles\` MODIFY COLUMN \`contactPreference\` varchar(255) DEFAULT 'email';--> statement-breakpoint
ALTER TABLE \`homeownerScanOffers\` MODIFY COLUMN \`severity\` varchar(255) NOT NULL DEFAULT 'medium';--> statement-breakpoint
ALTER TABLE \`homeownerScanOffers\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'new';--> statement-breakpoint
ALTER TABLE \`insuranceClaims\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'flagged';--> statement-breakpoint
ALTER TABLE \`jobPayments\` MODIFY COLUMN \`paymentMethod\` varchar(255) NOT NULL DEFAULT 'card_on_file';--> statement-breakpoint
ALTER TABLE \`jobPayments\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE \`jobs\` MODIFY COLUMN \`aiAnalysisStatus\` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE \`jobs\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'logged';--> statement-breakpoint
ALTER TABLE \`messages\` MODIFY COLUMN \`sender_type\` varchar(255) NOT NULL DEFAULT 'homeowner';--> statement-breakpoint
ALTER TABLE \`networkingEventRegistrations\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'registered';--> statement-breakpoint
ALTER TABLE \`opportunities\` MODIFY COLUMN \`adminReviewStatus\` varchar(255) NOT NULL DEFAULT 'pending_review';--> statement-breakpoint
ALTER TABLE \`opportunities\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE \`partner360Profiles\` MODIFY COLUMN \`techComfortLevel\` varchar(255) DEFAULT 'medium';--> statement-breakpoint
ALTER TABLE \`partner360Profiles\` MODIFY COLUMN \`communicationStyle\` varchar(255) DEFAULT 'text_first';--> statement-breakpoint
ALTER TABLE \`partner360Profiles\` MODIFY COLUMN \`bestTimeToContact\` varchar(255) DEFAULT 'anytime';--> statement-breakpoint
ALTER TABLE \`partner360Profiles\` MODIFY COLUMN \`preferredLeadType\` varchar(255) DEFAULT 'residential';--> statement-breakpoint
ALTER TABLE \`partnerAlerts\` MODIFY COLUMN \`severity\` varchar(255) NOT NULL DEFAULT 'info';--> statement-breakpoint
ALTER TABLE \`partnerNotifications\` MODIFY COLUMN \`type\` varchar(255) NOT NULL DEFAULT 'system';--> statement-breakpoint
ALTER TABLE \`partnerPerformanceScores\` MODIFY COLUMN \`churnRisk\` varchar(255) DEFAULT 'low';--> statement-breakpoint
ALTER TABLE \`partnerVerifications\` MODIFY COLUMN \`badgeLevel\` varchar(255) NOT NULL DEFAULT 'none';--> statement-breakpoint
ALTER TABLE \`partnerVerifications\` MODIFY COLUMN \`overallStatus\` varchar(255) NOT NULL DEFAULT 'unverified';--> statement-breakpoint
ALTER TABLE \`partners\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE \`partners\` MODIFY COLUMN \`tier\` varchar(255) NOT NULL DEFAULT 'scout';--> statement-breakpoint
ALTER TABLE \`partners\` MODIFY COLUMN \`stripeConnectStatus\` varchar(255) NOT NULL DEFAULT 'not_connected';--> statement-breakpoint
ALTER TABLE \`partners\` MODIFY COLUMN \`trialStatus\` varchar(255) NOT NULL DEFAULT 'trial';--> statement-breakpoint
ALTER TABLE \`paymentMilestones\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'scheduled';--> statement-breakpoint
ALTER TABLE \`payoutRequests\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE \`photoIngestionBatches\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'queued';--> statement-breakpoint
ALTER TABLE \`photoQueueItems\` MODIFY COLUMN \`source\` varchar(255) NOT NULL DEFAULT 'field_app';--> statement-breakpoint
ALTER TABLE \`photoQueueItems\` MODIFY COLUMN \`ingestionMode\` varchar(255) NOT NULL DEFAULT 'live';--> statement-breakpoint
ALTER TABLE \`photoQueueItems\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE \`proAgreements\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE \`proWaitlist\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE \`projectBids\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'pending_review';--> statement-breakpoint
ALTER TABLE \`properties\` MODIFY COLUMN \`propertyType\` varchar(255) DEFAULT 'single_family';--> statement-breakpoint
ALTER TABLE \`properties\` MODIFY COLUMN \`garageType\` varchar(255) DEFAULT 'none';--> statement-breakpoint
ALTER TABLE \`properties\` MODIFY COLUMN \`fenceType\` varchar(255) DEFAULT 'none';--> statement-breakpoint
ALTER TABLE \`properties\` MODIFY COLUMN \`drivewaySurface\` varchar(255) DEFAULT 'none';--> statement-breakpoint
ALTER TABLE \`properties\` MODIFY COLUMN \`kitchenCountertop\` varchar(255) DEFAULT 'unknown';--> statement-breakpoint
ALTER TABLE \`properties\` MODIFY COLUMN \`primaryBathType\` varchar(255) DEFAULT 'unknown';--> statement-breakpoint
ALTER TABLE \`properties\` MODIFY COLUMN \`fireplaceType\` varchar(255) DEFAULT 'none';--> statement-breakpoint
ALTER TABLE \`properties\` MODIFY COLUMN \`ceilingHeight\` varchar(255) DEFAULT 'standard_8ft';--> statement-breakpoint
ALTER TABLE \`properties\` MODIFY COLUMN \`windowType\` varchar(255) DEFAULT 'unknown';--> statement-breakpoint
ALTER TABLE \`properties\` MODIFY COLUMN \`treeCount\` varchar(255) DEFAULT 'none';--> statement-breakpoint
ALTER TABLE \`properties\` MODIFY COLUMN \`dogBreedSize\` varchar(255) DEFAULT 'none';--> statement-breakpoint
ALTER TABLE \`properties\` MODIFY COLUMN \`occupancy\` varchar(255) DEFAULT 'owner_occupied';--> statement-breakpoint
ALTER TABLE \`properties\` MODIFY COLUMN \`aiMockupStatus\` varchar(255) DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE \`propertyAssets\` MODIFY COLUMN \`condition\` varchar(255) NOT NULL DEFAULT 'good';--> statement-breakpoint
ALTER TABLE \`proposals\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'draft';--> statement-breakpoint
ALTER TABLE \`quickQuoteRequests\` MODIFY COLUMN \`urgency\` varchar(255) NOT NULL DEFAULT 'flexible';--> statement-breakpoint
ALTER TABLE \`quickQuoteRequests\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE \`quotes\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'draft';--> statement-breakpoint
ALTER TABLE \`recallAlerts\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'active';--> statement-breakpoint
ALTER TABLE \`referrals\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE \`reviewRequests\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE \`roomMakeoverSessions\` MODIFY COLUMN \`generationStatus\` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE \`seasonalPrepItems\` MODIFY COLUMN \`priority\` varchar(255) NOT NULL DEFAULT 'medium';--> statement-breakpoint
ALTER TABLE \`seasonalPrepItems\` MODIFY COLUMN \`diyDifficulty\` varchar(255) NOT NULL DEFAULT 'moderate';--> statement-breakpoint
ALTER TABLE \`serviceRequests\` MODIFY COLUMN \`urgency\` varchar(255) NOT NULL DEFAULT 'normal';--> statement-breakpoint
ALTER TABLE \`serviceRequests\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'open';--> statement-breakpoint
ALTER TABLE \`skillEnrollments\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'active';--> statement-breakpoint
ALTER TABLE \`stormAlerts\` MODIFY COLUMN \`severity\` varchar(255) NOT NULL DEFAULT 'moderate';--> statement-breakpoint
ALTER TABLE \`stormEvents\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'active';--> statement-breakpoint
ALTER TABLE \`stormLeads\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE \`stormLeads\` MODIFY COLUMN \`priority\` varchar(255) NOT NULL DEFAULT 'normal';--> statement-breakpoint
ALTER TABLE \`stripeConnectOnboarding\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'not_started';--> statement-breakpoint
ALTER TABLE \`trainingEnrollments\` MODIFY COLUMN \`status\` varchar(255) NOT NULL DEFAULT 'enrolled';--> statement-breakpoint
ALTER TABLE \`users\` MODIFY COLUMN \`role\` varchar(255) NOT NULL DEFAULT 'user';
`;
