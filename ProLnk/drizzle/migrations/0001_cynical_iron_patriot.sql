ALTER TABLE `achAuthorizations` MODIFY COLUMN `accountType` varchar(255) DEFAULT 'checking';--> statement-breakpoint
ALTER TABLE `achAuthorizations` MODIFY COLUMN `authorizationType` varchar(255) NOT NULL DEFAULT 'single_job';--> statement-breakpoint
ALTER TABLE `achAuthorizations` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'pending_signature';--> statement-breakpoint
ALTER TABLE `activityLog` MODIFY COLUMN `actorRole` varchar(255) NOT NULL DEFAULT 'system';--> statement-breakpoint
ALTER TABLE `agentHomeownerReferrals` MODIFY COLUMN `saleStatus` varchar(255) NOT NULL DEFAULT 'active';--> statement-breakpoint
ALTER TABLE `agentProperties` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'active';--> statement-breakpoint
ALTER TABLE `aiPipelineRuns` MODIFY COLUMN `stage` varchar(255) NOT NULL DEFAULT 'preprocessing';--> statement-breakpoint
ALTER TABLE `aiPipelineRuns` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'running';--> statement-breakpoint
ALTER TABLE `aiTrainingDataset` MODIFY COLUMN `validationOutcome` varchar(255) DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `commissions` MODIFY COLUMN `disputeStatus` varchar(255) NOT NULL DEFAULT 'none';--> statement-breakpoint
ALTER TABLE `commissions` MODIFY COLUMN `disputeAppealStatus` varchar(255) NOT NULL DEFAULT 'none';--> statement-breakpoint
ALTER TABLE `customerDeals` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'draft';--> statement-breakpoint
ALTER TABLE `dataExportRequests` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `eventDrivenLeads` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'generated';--> statement-breakpoint
ALTER TABLE `eventTriggers` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'active';--> statement-breakpoint
ALTER TABLE `exchangeBids` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `exchangeJobs` MODIFY COLUMN `jobType` varchar(255) NOT NULL DEFAULT 'residential';--> statement-breakpoint
ALTER TABLE `exchangeJobs` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'open';--> statement-breakpoint
ALTER TABLE `featuredAdvertisers` MODIFY COLUMN `zipCodes` varchar(255) NOT NULL DEFAULT '[]';--> statement-breakpoint
ALTER TABLE `featuredAdvertisers` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `fieldJobLog` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'scheduled';--> statement-breakpoint
ALTER TABLE `fieldJobLog` MODIFY COLUMN `source` varchar(255) NOT NULL DEFAULT 'manual';--> statement-breakpoint
ALTER TABLE `fsmJobRecords` MODIFY COLUMN `importStatus` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `fsmSyncJobs` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'queued';--> statement-breakpoint
ALTER TABLE `fsmWebhookEvents` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'received';--> statement-breakpoint
ALTER TABLE `homeHealthVaultEntries` MODIFY COLUMN `condition` varchar(255) NOT NULL DEFAULT 'unknown';--> statement-breakpoint
ALTER TABLE `homeMaintenanceItems` MODIFY COLUMN `importance` varchar(255) NOT NULL DEFAULT 'medium';--> statement-breakpoint
ALTER TABLE `homePassportTransfers` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `homeSystemHealth` MODIFY COLUMN `condition` varchar(255) NOT NULL DEFAULT 'unknown';--> statement-breakpoint
ALTER TABLE `homeSystemRecords` MODIFY COLUMN `condition` varchar(255) NOT NULL DEFAULT 'good';--> statement-breakpoint
ALTER TABLE `homeWaitlist` MODIFY COLUMN `ownershipStatus` varchar(255) DEFAULT 'own';--> statement-breakpoint
ALTER TABLE `homeWaitlist` MODIFY COLUMN `ownershipType` varchar(255) DEFAULT 'primary_residence';--> statement-breakpoint
ALTER TABLE `homeWaitlist` MODIFY COLUMN `projectTimeline` varchar(255) DEFAULT 'just_exploring';--> statement-breakpoint
ALTER TABLE `homeWaitlist` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `homeowner360Profiles` MODIFY COLUMN `budgetComfort` varchar(255) DEFAULT 'value_seeker';--> statement-breakpoint
ALTER TABLE `homeowner360Profiles` MODIFY COLUMN `decisionMaker` varchar(255) DEFAULT 'solo';--> statement-breakpoint
ALTER TABLE `homeowner360Profiles` MODIFY COLUMN `decisionSpeed` varchar(255) DEFAULT 'within_week';--> statement-breakpoint
ALTER TABLE `homeowner360Profiles` MODIFY COLUMN `communicationStyle` varchar(255) DEFAULT 'text_first';--> statement-breakpoint
ALTER TABLE `homeowner360Profiles` MODIFY COLUMN `bestTimeToContact` varchar(255) DEFAULT 'anytime';--> statement-breakpoint
ALTER TABLE `homeowner360Profiles` MODIFY COLUMN `responseExpectation` varchar(255) DEFAULT 'same_day';--> statement-breakpoint
ALTER TABLE `homeowner360Profiles` MODIFY COLUMN `sellTimeframe` varchar(255) DEFAULT 'not_planning';--> statement-breakpoint
ALTER TABLE `homeowner360Profiles` MODIFY COLUMN `referralMotivation` varchar(255) DEFAULT 'credits';--> statement-breakpoint
ALTER TABLE `homeownerLeads` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'new';--> statement-breakpoint
ALTER TABLE `homeownerNotifications` MODIFY COLUMN `type` varchar(255) NOT NULL DEFAULT 'system';--> statement-breakpoint
ALTER TABLE `homeownerProfiles` MODIFY COLUMN `contactPreference` varchar(255) DEFAULT 'email';--> statement-breakpoint
ALTER TABLE `homeownerScanOffers` MODIFY COLUMN `severity` varchar(255) NOT NULL DEFAULT 'medium';--> statement-breakpoint
ALTER TABLE `homeownerScanOffers` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'new';--> statement-breakpoint
ALTER TABLE `insuranceClaims` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'flagged';--> statement-breakpoint
ALTER TABLE `jobPayments` MODIFY COLUMN `paymentMethod` varchar(255) NOT NULL DEFAULT 'card_on_file';--> statement-breakpoint
ALTER TABLE `jobPayments` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `jobs` MODIFY COLUMN `aiAnalysisStatus` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `jobs` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'logged';--> statement-breakpoint
ALTER TABLE `messages` MODIFY COLUMN `sender_type` varchar(255) NOT NULL DEFAULT 'homeowner';--> statement-breakpoint
ALTER TABLE `networkingEventRegistrations` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'registered';--> statement-breakpoint
ALTER TABLE `opportunities` MODIFY COLUMN `adminReviewStatus` varchar(255) NOT NULL DEFAULT 'pending_review';--> statement-breakpoint
ALTER TABLE `opportunities` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `partner360Profiles` MODIFY COLUMN `techComfortLevel` varchar(255) DEFAULT 'medium';--> statement-breakpoint
ALTER TABLE `partner360Profiles` MODIFY COLUMN `communicationStyle` varchar(255) DEFAULT 'text_first';--> statement-breakpoint
ALTER TABLE `partner360Profiles` MODIFY COLUMN `bestTimeToContact` varchar(255) DEFAULT 'anytime';--> statement-breakpoint
ALTER TABLE `partner360Profiles` MODIFY COLUMN `preferredLeadType` varchar(255) DEFAULT 'residential';--> statement-breakpoint
ALTER TABLE `partnerAlerts` MODIFY COLUMN `severity` varchar(255) NOT NULL DEFAULT 'info';--> statement-breakpoint
ALTER TABLE `partnerNotifications` MODIFY COLUMN `type` varchar(255) NOT NULL DEFAULT 'system';--> statement-breakpoint
ALTER TABLE `partnerPerformanceScores` MODIFY COLUMN `churnRisk` varchar(255) DEFAULT 'low';--> statement-breakpoint
ALTER TABLE `partnerVerifications` MODIFY COLUMN `badgeLevel` varchar(255) NOT NULL DEFAULT 'none';--> statement-breakpoint
ALTER TABLE `partnerVerifications` MODIFY COLUMN `overallStatus` varchar(255) NOT NULL DEFAULT 'unverified';--> statement-breakpoint
ALTER TABLE `partners` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `partners` MODIFY COLUMN `tier` varchar(255) NOT NULL DEFAULT 'scout';--> statement-breakpoint
ALTER TABLE `partners` MODIFY COLUMN `stripeConnectStatus` varchar(255) NOT NULL DEFAULT 'not_connected';--> statement-breakpoint
ALTER TABLE `partners` MODIFY COLUMN `trialStatus` varchar(255) NOT NULL DEFAULT 'trial';--> statement-breakpoint
ALTER TABLE `paymentMilestones` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'scheduled';--> statement-breakpoint
ALTER TABLE `payoutRequests` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `photoIngestionBatches` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'queued';--> statement-breakpoint
ALTER TABLE `photoQueueItems` MODIFY COLUMN `source` varchar(255) NOT NULL DEFAULT 'field_app';--> statement-breakpoint
ALTER TABLE `photoQueueItems` MODIFY COLUMN `ingestionMode` varchar(255) NOT NULL DEFAULT 'live';--> statement-breakpoint
ALTER TABLE `photoQueueItems` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `proAgreements` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `proWaitlist` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `projectBids` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'pending_review';--> statement-breakpoint
ALTER TABLE `properties` MODIFY COLUMN `propertyType` varchar(255) DEFAULT 'single_family';--> statement-breakpoint
ALTER TABLE `properties` MODIFY COLUMN `garageType` varchar(255) DEFAULT 'none';--> statement-breakpoint
ALTER TABLE `properties` MODIFY COLUMN `fenceType` varchar(255) DEFAULT 'none';--> statement-breakpoint
ALTER TABLE `properties` MODIFY COLUMN `drivewaySurface` varchar(255) DEFAULT 'none';--> statement-breakpoint
ALTER TABLE `properties` MODIFY COLUMN `kitchenCountertop` varchar(255) DEFAULT 'unknown';--> statement-breakpoint
ALTER TABLE `properties` MODIFY COLUMN `primaryBathType` varchar(255) DEFAULT 'unknown';--> statement-breakpoint
ALTER TABLE `properties` MODIFY COLUMN `fireplaceType` varchar(255) DEFAULT 'none';--> statement-breakpoint
ALTER TABLE `properties` MODIFY COLUMN `ceilingHeight` varchar(255) DEFAULT 'standard_8ft';--> statement-breakpoint
ALTER TABLE `properties` MODIFY COLUMN `windowType` varchar(255) DEFAULT 'unknown';--> statement-breakpoint
ALTER TABLE `properties` MODIFY COLUMN `treeCount` varchar(255) DEFAULT 'none';--> statement-breakpoint
ALTER TABLE `properties` MODIFY COLUMN `dogBreedSize` varchar(255) DEFAULT 'none';--> statement-breakpoint
ALTER TABLE `properties` MODIFY COLUMN `occupancy` varchar(255) DEFAULT 'owner_occupied';--> statement-breakpoint
ALTER TABLE `properties` MODIFY COLUMN `aiMockupStatus` varchar(255) DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `propertyAssets` MODIFY COLUMN `condition` varchar(255) NOT NULL DEFAULT 'good';--> statement-breakpoint
ALTER TABLE `proposals` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'draft';--> statement-breakpoint
ALTER TABLE `quickQuoteRequests` MODIFY COLUMN `urgency` varchar(255) NOT NULL DEFAULT 'flexible';--> statement-breakpoint
ALTER TABLE `quickQuoteRequests` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `quotes` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'draft';--> statement-breakpoint
ALTER TABLE `recallAlerts` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'active';--> statement-breakpoint
ALTER TABLE `referrals` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `reviewRequests` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `roomMakeoverSessions` MODIFY COLUMN `generationStatus` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `seasonalPrepItems` MODIFY COLUMN `priority` varchar(255) NOT NULL DEFAULT 'medium';--> statement-breakpoint
ALTER TABLE `seasonalPrepItems` MODIFY COLUMN `diyDifficulty` varchar(255) NOT NULL DEFAULT 'moderate';--> statement-breakpoint
ALTER TABLE `serviceRequests` MODIFY COLUMN `urgency` varchar(255) NOT NULL DEFAULT 'normal';--> statement-breakpoint
ALTER TABLE `serviceRequests` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'open';--> statement-breakpoint
ALTER TABLE `skillEnrollments` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'active';--> statement-breakpoint
ALTER TABLE `stormAlerts` MODIFY COLUMN `severity` varchar(255) NOT NULL DEFAULT 'moderate';--> statement-breakpoint
ALTER TABLE `stormEvents` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'active';--> statement-breakpoint
ALTER TABLE `stormLeads` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `stormLeads` MODIFY COLUMN `priority` varchar(255) NOT NULL DEFAULT 'normal';--> statement-breakpoint
ALTER TABLE `stripeConnectOnboarding` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'not_started';--> statement-breakpoint
ALTER TABLE `trainingEnrollments` MODIFY COLUMN `status` varchar(255) NOT NULL DEFAULT 'enrolled';--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` varchar(255) NOT NULL DEFAULT 'user';