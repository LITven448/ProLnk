-- Migration: Add agent agreement columns and advertiser partnerId
-- Date: 2026-04-29

-- Agent agreement e-sign columns
ALTER TABLE `realEstateAgents`
  ADD COLUMN `agreementSignedAt` TIMESTAMP NULL,
  ADD COLUMN `agreementSignedBy` VARCHAR(200) NULL,
  ADD COLUMN `agreementVersion` VARCHAR(20) NULL,
  ADD COLUMN `referralCode` VARCHAR(50) NULL,
  ADD COLUMN `contactName` VARCHAR(200) NULL,
  ADD COLUMN `contactEmail` VARCHAR(255) NULL,
  ADD COLUMN `businessName` VARCHAR(200) NULL,
  ADD COLUMN `userId` INT NULL;

-- Featured advertiser partner link
ALTER TABLE `featuredAdvertisers`
  ADD COLUMN `partnerId` INT NULL;

-- Index for partner lookup on advertiser campaigns
CREATE INDEX `idx_featuredAdvertisers_partnerId` ON `featuredAdvertisers` (`partnerId`);

-- Index for user lookup on agent profiles
CREATE INDEX `idx_realEstateAgents_userId` ON `realEstateAgents` (`userId`);
