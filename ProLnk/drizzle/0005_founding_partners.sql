-- ProLnk Founding Partner System
-- Migration 0005: Complete founding partner program tables

-- ─── Founding Partner Status ──────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS foundingPartnerStatus (
  id INT AUTO_INCREMENT PRIMARY KEY,
  partnerId INT NOT NULL UNIQUE,
  enrollmentNumber INT NOT NULL UNIQUE, -- 1-100, their founding number
  enrolledAt TIMESTAMP DEFAULT NOW(),
  -- Requirements tracking
  hasActiveLicense BOOLEAN DEFAULT FALSE,
  hasPassedBackgroundCheck BOOLEAN DEFAULT FALSE,
  hasGeneralLiability BOOLEAN DEFAULT FALSE,
  hasCompletedOnboarding BOOLEAN DEFAULT FALSE,
  homesAdded INT DEFAULT 0,    -- min 15 required
  prosReferred INT DEFAULT 0,  -- min 5 required
  requirementsMet BOOLEAN DEFAULT FALSE,
  requirementsMetAt TIMESTAMP,
  -- Status
  status ENUM('trial', 'active', 'suspended', 'churned') DEFAULT 'trial',
  trialEndsAt TIMESTAMP,    -- 90 days after launch
  activatedAt TIMESTAMP,
  suspendedAt TIMESTAMP,
  -- Locked pricing
  lockedMonthlyRate DECIMAL(8,2) DEFAULT 149.00,
  -- Financial totals
  totalNetworkJobCommissionsEarned DECIMAL(12,2) DEFAULT 0.00,
  totalSubscriptionCommissionsEarned DECIMAL(12,2) DEFAULT 0.00,
  totalOriginationCommissionsEarned DECIMAL(12,2) DEFAULT 0.00,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  INDEX idx_partner (partnerId),
  INDEX idx_enrollment (enrollmentNumber)
);

-- ─── Partner Network Chain ────────────────────────────────────────────────────
-- Records who recruited whom and at what depth from a founding partner

CREATE TABLE IF NOT EXISTS partnerNetworkChain (
  id INT AUTO_INCREMENT PRIMARY KEY,
  foundingPartnerId INT NOT NULL,      -- the founding partner at the top
  memberPartnerId INT NOT NULL,        -- the partner in the chain
  networkLevel INT NOT NULL,           -- 1=direct, 2=their recruit's recruit, etc.
  recruitedByPartnerId INT,           -- the direct recruiter (immediate parent)
  joinedAt TIMESTAMP DEFAULT NOW(),
  isActive BOOLEAN DEFAULT TRUE,
  INDEX idx_founder (foundingPartnerId),
  INDEX idx_member (memberPartnerId),
  INDEX idx_level (foundingPartnerId, networkLevel),
  UNIQUE INDEX idx_founder_member (foundingPartnerId, memberPartnerId)
);

-- ─── Network Job Commissions ──────────────────────────────────────────────────
-- Tracks the per-job network earnings for founding partners

CREATE TABLE IF NOT EXISTS networkJobCommissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  foundingPartnerId INT NOT NULL,      -- who earns
  doingPartnerId INT NOT NULL,         -- who did the job
  opportunityId INT,
  jobPaymentId INT,
  networkLevel INT NOT NULL,           -- at what level the job was done
  jobValue DECIMAL(12,2) NOT NULL,
  platformFeeAmount DECIMAL(10,2) NOT NULL,
  commissionRate DECIMAL(5,4) NOT NULL,  -- 0.07, 0.04, 0.02, or 0.01
  commissionAmount DECIMAL(10,2) NOT NULL,
  paid BOOLEAN DEFAULT FALSE,
  paidAt TIMESTAMP,
  stripeTransferId VARCHAR(255),
  createdAt TIMESTAMP DEFAULT NOW(),
  INDEX idx_founder (foundingPartnerId),
  INDEX idx_doing_partner (doingPartnerId),
  INDEX idx_paid (paid),
  INDEX idx_created (createdAt)
);

-- ─── Subscription Network Commissions ────────────────────────────────────────
-- Tracks per-subscription monthly earnings for founding partners

CREATE TABLE IF NOT EXISTS subscriptionNetworkCommissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  foundingPartnerId INT NOT NULL,
  subscribingPartnerId INT NOT NULL,
  networkLevel INT NOT NULL,           -- 1=12%, 2=6%, 3=3%, 4=1.5%
  subscriptionAmount DECIMAL(8,2) NOT NULL,  -- base subscription only
  commissionRate DECIMAL(5,4) NOT NULL,
  commissionAmount DECIMAL(10,2) NOT NULL,
  billingPeriod VARCHAR(7) NOT NULL,   -- "2026-04" format
  paid BOOLEAN DEFAULT FALSE,
  paidAt TIMESTAMP,
  stripeTransferId VARCHAR(255),
  createdAt TIMESTAMP DEFAULT NOW(),
  INDEX idx_founder (foundingPartnerId),
  INDEX idx_subscriber (subscribingPartnerId),
  INDEX idx_billing (billingPeriod),
  INDEX idx_paid (paid)
);

-- ─── Home Origination Rights ──────────────────────────────────────────────────
-- Permanent address-level ownership. The originator earns 1.5% of
-- platform fee on EVERY job at that address, forever.

CREATE TABLE IF NOT EXISTS homeOriginators (
  id INT AUTO_INCREMENT PRIMARY KEY,
  propertyAddress VARCHAR(500) NOT NULL,
  propertyAddressHash VARCHAR(64) NOT NULL,  -- normalized hash for fast lookup
  propertyZip VARCHAR(20),
  originatingPartnerId INT NOT NULL,
  originationSource ENUM('field_job', 'scan', 'scout_assessment', 'homeowner_signup', 'fsm_import', 'corporate') DEFAULT 'field_job',
  firstDocumentedAt TIMESTAMP DEFAULT NOW(),
  -- Is the property active on TrustyPro?
  trustyProActive BOOLEAN DEFAULT FALSE,
  trustyProActivatedAt TIMESTAMP,
  trustyProHomeownerUserId INT,
  -- Earnings tracking
  totalOriginationEarned DECIMAL(12,2) DEFAULT 0.00,
  lastEarningAt TIMESTAMP,
  isActive BOOLEAN DEFAULT TRUE,       -- false if originator churns/suspended
  notes VARCHAR(500),
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  INDEX idx_address_hash (propertyAddressHash),
  INDEX idx_partner (originatingPartnerId),
  INDEX idx_trustypro (trustyProActive),
  INDEX idx_zip (propertyZip)
);

-- ─── Origination Commission Records ──────────────────────────────────────────

CREATE TABLE IF NOT EXISTS originationCommissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  originatingPartnerId INT NOT NULL,
  homeOriginatorId INT NOT NULL,
  opportunityId INT,
  jobPaymentId INT,
  jobValue DECIMAL(12,2) NOT NULL,
  platformFeeAmount DECIMAL(10,2) NOT NULL,
  commissionRate DECIMAL(5,4) DEFAULT 0.0150,  -- 1.5%
  commissionAmount DECIMAL(10,2) NOT NULL,
  paid BOOLEAN DEFAULT FALSE,
  paidAt TIMESTAMP,
  stripeTransferId VARCHAR(255),
  createdAt TIMESTAMP DEFAULT NOW(),
  INDEX idx_originator (originatingPartnerId),
  INDEX idx_home (homeOriginatorId),
  INDEX idx_paid (paid)
);

-- ─── Founding Partner Milestone Achievements ─────────────────────────────────

CREATE TABLE IF NOT EXISTS foundingPartnerMilestones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  foundingPartnerId INT NOT NULL,
  milestoneType ENUM(
    'first_job', 'first_commission', 'five_homes', 'fifteen_homes',
    'five_referrals', 'first_network_commission', 'first_origination_commission',
    'hundred_dollar_month', 'thousand_dollar_month', 'top_10_network'
  ) NOT NULL,
  achievedAt TIMESTAMP DEFAULT NOW(),
  rewardDescription VARCHAR(500),
  notificationSent BOOLEAN DEFAULT FALSE,
  INDEX idx_partner (foundingPartnerId),
  UNIQUE INDEX idx_partner_milestone (foundingPartnerId, milestoneType)
);

-- ─── Column additions ─────────────────────────────────────────────────────────

-- Mark founding partners on the partners table
ALTER TABLE partners
  ADD COLUMN IF NOT EXISTS foundingPartnerNumber INT AFTER isFoundingPartner,
  ADD COLUMN IF NOT EXISTS networkLevel1CommissionRate DECIMAL(5,4) DEFAULT 0.0700,
  ADD COLUMN IF NOT EXISTS networkLevel2CommissionRate DECIMAL(5,4) DEFAULT 0.0400,
  ADD COLUMN IF NOT EXISTS networkLevel3CommissionRate DECIMAL(5,4) DEFAULT 0.0200,
  ADD COLUMN IF NOT EXISTS networkLevel4CommissionRate DECIMAL(5,4) DEFAULT 0.0100,
  ADD COLUMN IF NOT EXISTS originationCommissionRate DECIMAL(5,4) DEFAULT 0.0150;
