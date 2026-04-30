-- ProLnk Full Platform Migration
-- Run after 0003_v6_engine_tables.sql
-- Creates all new tables for: Briefcase, Pro Pass, Scout, Bid Board,
-- Facility Access, Waitlist Flow, FSM Integrations, and Auth

-- ─── Auth ──────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS userPasswords (
  id INT AUTO_INCREMENT PRIMARY KEY,
  openId VARCHAR(64) NOT NULL UNIQUE,
  passwordHash VARCHAR(256) NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  INDEX idx_openId (openId)
);

CREATE TABLE IF NOT EXISTS passwordResetTokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  token VARCHAR(128) NOT NULL UNIQUE,
  expiresAt TIMESTAMP NOT NULL,
  usedAt TIMESTAMP,
  createdAt TIMESTAMP DEFAULT NOW(),
  INDEX idx_token (token),
  INDEX idx_userId (userId)
);

-- ─── SMS Consent (TCPA) ────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS smsConsentRecords (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  phone VARCHAR(30) NOT NULL,
  consentType ENUM('marketing','transactional') NOT NULL,
  consentText TEXT NOT NULL,
  ipAddress VARCHAR(45),
  sourceUrl VARCHAR(500),
  consentMethod ENUM('checkbox','verbal','form') NOT NULL DEFAULT 'checkbox',
  signedAt TIMESTAMP NOT NULL,
  optedOutAt TIMESTAMP,
  createdAt TIMESTAMP DEFAULT NOW(),
  INDEX idx_phone (phone),
  INDEX idx_opted_out (phone, optedOutAt)
);

-- ─── Project Bids (GC Assessor Commission Flow) ────────────────────────────────

CREATE TABLE IF NOT EXISTS projectBids (
  id INT AUTO_INCREMENT PRIMARY KEY,
  jobId INT NOT NULL,
  submittingPartnerId INT NOT NULL,
  propertyAddress VARCHAR(500) NOT NULL,
  propertyZip VARCHAR(20),
  propertyCity VARCHAR(100),
  propertyState VARCHAR(50),
  projectTitle VARCHAR(200) NOT NULL,
  projectDescription TEXT NOT NULL,
  homeownerName VARCHAR(255),
  homeownerEmail VARCHAR(320),
  homeownerPhone VARCHAR(30),
  lineItems JSON NOT NULL,
  photoUrls JSON,
  totalEstimatedValue DECIMAL(12,2) NOT NULL,
  targetStartDate VARCHAR(50),
  confidence DECIMAL(4,3) DEFAULT 0.850,
  status ENUM('pending_review','approved','dispatched','partially_completed','completed','rejected') DEFAULT 'pending_review',
  approvedAt TIMESTAMP,
  approvedBy INT,
  rejectedAt TIMESTAMP,
  rejectedBy INT,
  rejectionReason VARCHAR(500),
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  INDEX idx_submitter (submittingPartnerId),
  INDEX idx_status (status),
  INDEX idx_zip (propertyZip)
);

-- ─── Company Briefcase (Company-Level Credentialing) ───────────────────────────

CREATE TABLE IF NOT EXISTS companyBriefcases (
  id INT AUTO_INCREMENT PRIMARY KEY,
  partnerId INT NOT NULL UNIQUE,
  briefcaseSlug VARCHAR(100) UNIQUE, -- URL slug for public verification page
  briefcaseScore INT DEFAULT 0,
  status ENUM('draft','pending_review','active','restricted','suspended') DEFAULT 'draft',
  -- Document status flags
  businessLicenseStatus ENUM('missing','pending','verified','expired') DEFAULT 'missing',
  llcRegistrationStatus ENUM('missing','pending','verified','expired') DEFAULT 'missing',
  einStatus ENUM('missing','pending','verified') DEFAULT 'missing',
  generalLiabilityStatus ENUM('missing','pending','verified','expired') DEFAULT 'missing',
  workersCompStatus ENUM('missing','pending','verified','expired','exempt') DEFAULT 'missing',
  commercialAutoStatus ENUM('missing','pending','verified','expired','not_applicable') DEFAULT 'not_applicable',
  bondingStatus ENUM('missing','pending','verified','expired','not_required') DEFAULT 'not_required',
  w9Status ENUM('missing','pending','verified') DEFAULT 'missing',
  contractorLicenseStatus ENUM('missing','pending','verified','expired') DEFAULT 'missing',
  -- Coverage amounts
  generalLiabilityAmount DECIMAL(12,2),
  workersCompAmount DECIMAL(12,2),
  bondingAmount DECIMAL(12,2),
  -- Expiry dates (auto-monitored)
  generalLiabilityExpiresAt DATE,
  workersCompExpiresAt DATE,
  contractorLicenseExpiresAt DATE,
  businessLicenseExpiresAt DATE,
  bondingExpiresAt DATE,
  -- Quarterly review
  lastReviewedAt TIMESTAMP,
  nextReviewDueAt TIMESTAMP,
  -- Clearance levels
  clearanceLevels JSON, -- ['residential','commercial','school','healthcare','government']
  -- Admin
  adminNotes TEXT,
  approvedBy INT,
  approvedAt TIMESTAMP,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  INDEX idx_partner (partnerId),
  INDEX idx_status (status),
  INDEX idx_slug (briefcaseSlug)
);

CREATE TABLE IF NOT EXISTS briefcaseDocuments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  briefcaseId INT NOT NULL,
  documentType ENUM(
    'business_license','llc_registration','ein','general_liability','workers_comp',
    'commercial_auto','bonding','w9','contractor_license','osha_certification',
    'manufacturer_cert','trade_association','other'
  ) NOT NULL,
  documentTitle VARCHAR(255),
  fileUrl VARCHAR(1000) NOT NULL,
  fileName VARCHAR(255),
  -- Extracted via OCR
  issuer VARCHAR(255),
  policyNumber VARCHAR(100),
  coverageAmount DECIMAL(12,2),
  effectiveDate DATE,
  expiryDate DATE,
  -- Verification
  verificationStatus ENUM('pending','verified','rejected') DEFAULT 'pending',
  verifiedAt TIMESTAMP,
  verifiedBy INT,
  rejectionReason VARCHAR(500),
  ocrExtractedData JSON,
  notes TEXT,
  uploadedAt TIMESTAMP DEFAULT NOW(),
  INDEX idx_briefcase (briefcaseId),
  INDEX idx_type (documentType),
  INDEX idx_expiry (expiryDate)
);

-- ─── Partner Employees ─────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS partnerEmployees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  partnerId INT NOT NULL,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(320),
  phone VARCHAR(30),
  role VARCHAR(100),
  employmentType ENUM('employee','contractor','owner') DEFAULT 'employee',
  isActive BOOLEAN DEFAULT TRUE,
  hiredAt DATE,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  INDEX idx_partner (partnerId),
  INDEX idx_active (partnerId, isActive)
);

-- ─── Pro Pass (Individual-Level Credentials) ───────────────────────────────────

CREATE TABLE IF NOT EXISTS proPassCards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  partnerId INT NOT NULL,
  employeeId INT,
  passCode VARCHAR(64) UNIQUE NOT NULL, -- QR code identifier
  -- Personal info
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(320),
  phone VARCHAR(30),
  photoUrl VARCHAR(1000),
  role VARCHAR(100),
  -- Pass status
  passScore INT DEFAULT 0,
  status ENUM('draft','pending','active','suspended','expired') DEFAULT 'draft',
  -- Background check (Checkr)
  checkrCandidateId VARCHAR(100),
  checkrReportId VARCHAR(100),
  backgroundCheckStatus ENUM('not_submitted','pending','clear','consider','suspended') DEFAULT 'not_submitted',
  backgroundCheckDate DATE,
  backgroundCheckExpiresAt DATE,
  -- Identity verification
  govIdType VARCHAR(50),
  govIdVerifiedAt TIMESTAMP,
  -- Licenses
  contractorLicenseNumber VARCHAR(100),
  contractorLicenseState VARCHAR(10),
  contractorLicenseType VARCHAR(100),
  contractorLicenseExpiresAt DATE,
  contractorLicenseVerifiedAt TIMESTAMP,
  -- Certifications
  osha10Certified BOOLEAN DEFAULT FALSE,
  osha10CertDate DATE,
  osha30Certified BOOLEAN DEFAULT FALSE,
  osha30CertDate DATE,
  epa608CertType VARCHAR(50),
  epa608CertDate DATE,
  electricalLicenseLevel VARCHAR(50),
  plumbingLicenseLevel VARCHAR(50),
  otherCertifications JSON,
  -- Skills
  primaryTrade VARCHAR(100),
  secondaryTrades JSON,
  experienceYears INT,
  specialties JSON,
  -- Clearance
  clearanceLevel ENUM('residential','commercial','school','healthcare','government') DEFAULT 'residential',
  facilityTypes JSON,
  -- HR docs
  i9Verified BOOLEAN DEFAULT FALSE,
  w9FileUrl VARCHAR(1000),
  -- Emergency contact
  emergencyContactName VARCHAR(255),
  emergencyContactPhone VARCHAR(30),
  emergencyContactRelation VARCHAR(50),
  -- Quarterly review
  lastReviewedAt TIMESTAMP,
  nextReviewDueAt TIMESTAMP,
  -- Continuous monitoring
  monitoringActive BOOLEAN DEFAULT FALSE,
  monitoringEnrolledAt TIMESTAMP,
  lastMonitoringCheckAt TIMESTAMP,
  -- Admin
  adminNotes TEXT,
  approvedBy INT,
  approvedAt TIMESTAMP,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  INDEX idx_partner (partnerId),
  INDEX idx_employee (employeeId),
  INDEX idx_pass_code (passCode),
  INDEX idx_status (status),
  INDEX idx_checkr (checkrCandidateId)
);

-- ─── Facility Accounts (Schools, Hospitals, HOAs, Commercial) ─────────────────

CREATE TABLE IF NOT EXISTS facilityAccounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  facilityName VARCHAR(255) NOT NULL,
  facilityType ENUM('school','hospital','hoa','commercial','government','residential_complex','other') NOT NULL,
  contactName VARCHAR(255),
  contactEmail VARCHAR(320) NOT NULL,
  contactPhone VARCHAR(30),
  address VARCHAR(500),
  city VARCHAR(100),
  state VARCHAR(50),
  zip VARCHAR(20),
  website VARCHAR(500),
  facilityCount INT DEFAULT 1, -- number of buildings/campuses
  status ENUM('pending','active','suspended') DEFAULT 'pending',
  -- Subscription
  subscriptionTier ENUM('basic','premium','enterprise') DEFAULT 'basic',
  subscriptionFee DECIMAL(8,2) DEFAULT 199.00,
  stripeCustomerId VARCHAR(255),
  subscriptionId VARCHAR(255),
  -- Notes
  adminNotes TEXT,
  approvedAt TIMESTAMP,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  INDEX idx_type (facilityType),
  INDEX idx_status (status),
  INDEX idx_zip (zip)
);

CREATE TABLE IF NOT EXISTS facilityRequirements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  facilityId INT NOT NULL,
  -- Insurance requirements
  minGeneralLiability DECIMAL(12,2) DEFAULT 1000000,
  requiresWorkersComp BOOLEAN DEFAULT TRUE,
  requiresCommercialAuto BOOLEAN DEFAULT FALSE,
  requiresBonding BOOLEAN DEFAULT FALSE,
  minBondingAmount DECIMAL(12,2),
  -- Individual requirements
  requiresBackgroundCheck BOOLEAN DEFAULT TRUE,
  maxBackgroundCheckAgeDays INT DEFAULT 730,
  requiresOsha BOOLEAN DEFAULT FALSE,
  requiredClearanceLevel ENUM('residential','commercial','school','healthcare','government') DEFAULT 'commercial',
  -- Custom requirements (JSON for flexibility)
  customRequirements JSON,
  notes TEXT,
  updatedAt TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  UNIQUE INDEX idx_facility (facilityId)
);

CREATE TABLE IF NOT EXISTS facilityApprovals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  facilityId INT NOT NULL,
  briefcaseId INT NOT NULL,
  -- Approval status
  status ENUM('pending','approved','rejected','expired') DEFAULT 'pending',
  approvedAt TIMESTAMP,
  approvedBy INT,
  rejectedAt TIMESTAMP,
  rejectionReason VARCHAR(500),
  expiresAt TIMESTAMP, -- approvals expire annually
  -- Which requirements were checked
  requirementsCheckedAt TIMESTAMP,
  requirementsMet JSON,
  requirementsFailed JSON,
  notes TEXT,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  UNIQUE INDEX idx_facility_briefcase (facilityId, briefcaseId),
  INDEX idx_facility (facilityId),
  INDEX idx_briefcase (briefcaseId),
  INDEX idx_status (status)
);

-- ─── Scout Assessments ─────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS scoutAssessments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  scoutPartnerId INT NOT NULL,
  propertyAddress VARCHAR(500) NOT NULL,
  propertyZip VARCHAR(20),
  propertyCity VARCHAR(100),
  propertyState VARCHAR(50),
  propertyLat DECIMAL(10,7),
  propertyLng DECIMAL(10,7),
  -- Homeowner info
  homeownerName VARCHAR(255),
  homeownerEmail VARCHAR(320),
  homeownerPhone VARCHAR(30),
  homeownerConsent BOOLEAN DEFAULT FALSE,
  homeownerConsentAt TIMESTAMP,
  -- Property details
  propertyType ENUM('single_family','condo','townhome','multifamily','commercial','other') DEFAULT 'single_family',
  yearBuilt INT,
  squareFootage INT,
  bedrooms INT,
  bathrooms DECIMAL(4,1),
  stories INT,
  lotSizeSqFt INT,
  -- Assessment
  assessmentType ENUM('residential','commercial','multifamily') DEFAULT 'residential',
  status ENUM('in_progress','zones_complete','report_generated','report_shared','archived') DEFAULT 'in_progress',
  homeHealthScore INT, -- 0-100
  totalFindingsCount INT DEFAULT 0,
  criticalFindingsCount INT DEFAULT 0,
  totalEstimatedRepairCost DECIMAL(12,2),
  -- LiDAR / Matterport
  matterportScanUrl VARCHAR(1000),
  lidarDataUrl VARCHAR(1000),
  floorPlanUrl VARCHAR(1000),
  -- Report
  reportGeneratedAt TIMESTAMP,
  reportUrl VARCHAR(1000),
  reportSharedAt TIMESTAMP,
  reportSharedWith VARCHAR(500), -- email(s) it was sent to
  -- Scout earnings
  assessmentFeeCharged DECIMAL(8,2),
  assessmentFeePaidAt TIMESTAMP,
  originationCommissionPotential DECIMAL(10,2), -- estimated if all jobs close
  -- AI summary
  aiExecutiveSummary TEXT,
  aiRecommendations JSON,
  -- Timestamps
  startedAt TIMESTAMP DEFAULT NOW(),
  completedAt TIMESTAMP,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  INDEX idx_scout (scoutPartnerId),
  INDEX idx_status (status),
  INDEX idx_zip (propertyZip),
  INDEX idx_address (propertyAddress(100))
);

CREATE TABLE IF NOT EXISTS assessmentZones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  assessmentId INT NOT NULL,
  zoneNumber INT NOT NULL, -- 1-12
  zoneName ENUM(
    'roof_gutters','exterior_siding_foundation','windows_doors',
    'hvac','electrical','plumbing','appliances','interior_rooms',
    'attic','crawlspace_basement','garage','exterior_property'
  ) NOT NULL,
  status ENUM('pending','in_progress','complete','skipped') DEFAULT 'pending',
  -- Overall zone condition
  overallCondition ENUM('good','fair','poor','critical','not_applicable') DEFAULT 'not_applicable',
  -- Photo count
  photoCount INT DEFAULT 0,
  -- AI summary for this zone
  aiSummary TEXT,
  notes TEXT,
  completedAt TIMESTAMP,
  INDEX idx_assessment (assessmentId),
  UNIQUE INDEX idx_assessment_zone (assessmentId, zoneNumber)
);

CREATE TABLE IF NOT EXISTS assessmentFindings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  assessmentId INT NOT NULL,
  zoneId INT NOT NULL,
  -- What was found
  componentName VARCHAR(255) NOT NULL, -- e.g. "Main electrical panel"
  componentType VARCHAR(100), -- e.g. "electrical_panel"
  condition ENUM('good','fair','poor','critical','unknown') DEFAULT 'unknown',
  urgency ENUM('safety_hazard','code_violation','immediate','routine','deferred','cosmetic') DEFAULT 'routine',
  -- Details
  description TEXT,
  photoUrls JSON,
  -- Age and specs
  estimatedAge INT, -- years
  manufacturerLabel VARCHAR(255),
  serialNumber VARCHAR(100),
  modelNumber VARCHAR(100),
  -- Cost estimate
  estimatedRepairCost DECIMAL(10,2),
  estimatedReplacementCost DECIMAL(10,2),
  recommendedAction TEXT,
  -- Trade needed
  tradeType VARCHAR(100),
  -- AI data
  aiConfidence DECIMAL(4,3),
  aiAnalysisResult JSON,
  -- Commission tracking
  opportunityId INT, -- link to opportunity created from this finding
  createdAt TIMESTAMP DEFAULT NOW(),
  INDEX idx_assessment (assessmentId),
  INDEX idx_zone (zoneId),
  INDEX idx_urgency (urgency),
  INDEX idx_trade (tradeType)
);

CREATE TABLE IF NOT EXISTS assessmentReports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  assessmentId INT NOT NULL UNIQUE,
  -- Scores
  homeHealthScore INT NOT NULL,
  roofScore INT,
  hvacScore INT,
  electricalScore INT,
  plumbingScore INT,
  exteriorScore INT,
  interiorScore INT,
  -- Summary
  executiveSummary TEXT,
  keyFindings JSON,
  prioritizedActionItems JSON,
  -- Financial
  totalEstimatedCost DECIMAL(12,2),
  immediateActionCost DECIMAL(12,2),
  routineMaintenanceCost DECIMAL(12,2),
  deferredImprovementCost DECIMAL(12,2),
  -- AI content
  homeownerMessage TEXT,
  marketingHighlights TEXT,
  -- Files
  reportPdfUrl VARCHAR(1000),
  reportHtmlUrl VARCHAR(1000),
  -- Generation
  generatedAt TIMESTAMP DEFAULT NOW(),
  generatedBy ENUM('ai','manual') DEFAULT 'ai',
  modelUsed VARCHAR(100),
  INDEX idx_assessment (assessmentId)
);

-- ─── Bid Board ─────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS bidBoardProjects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  assessmentId INT, -- linked if from Scout assessment
  projectBidId INT, -- linked if from GC bid submission
  submittingPartnerId INT NOT NULL,
  -- Project details
  projectTitle VARCHAR(200) NOT NULL,
  projectDescription TEXT NOT NULL,
  propertyAddress VARCHAR(500) NOT NULL,
  propertyZip VARCHAR(20),
  propertyCity VARCHAR(100),
  propertyState VARCHAR(50),
  propertyType ENUM('residential','commercial','multifamily','school','healthcare','other') DEFAULT 'residential',
  -- Scope
  tradesNeeded JSON, -- array of trade types
  lineItems JSON, -- detailed breakdown
  totalEstimatedValue DECIMAL(12,2),
  photoUrls JSON,
  reportUrl VARCHAR(1000),
  -- Timeline
  targetStartDate DATE,
  targetCompletionDate DATE,
  -- Bidding
  status ENUM('draft','open','in_review','awarded','in_progress','complete','cancelled') DEFAULT 'draft',
  biddingDeadline TIMESTAMP,
  bidsReceived INT DEFAULT 0,
  -- Structure
  projectStructure ENUM('gc_managed','separate_trades','homeowner_managed') DEFAULT 'separate_trades',
  -- Award
  awardedAt TIMESTAMP,
  awardedToBidId INT,
  -- Scout commission tracking
  scoutCommissionRate DECIMAL(5,4) DEFAULT 0.0480,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  INDEX idx_submitter (submittingPartnerId),
  INDEX idx_status (status),
  INDEX idx_zip (propertyZip),
  INDEX idx_assessment (assessmentId)
);

CREATE TABLE IF NOT EXISTS bidSubmissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  projectId INT NOT NULL,
  biddingPartnerId INT NOT NULL,
  -- Bid details
  bidAmount DECIMAL(12,2) NOT NULL,
  laborCost DECIMAL(12,2),
  materialsCost DECIMAL(12,2),
  timelineWeeks INT,
  startDateProposed DATE,
  -- Scope they're bidding on
  tradeCoverage JSON, -- which trades they cover
  lineItemsCovered JSON, -- specific line items
  gcIncluded BOOLEAN DEFAULT FALSE, -- are they GCing the whole project?
  -- Bid content
  bidDescription TEXT,
  proposalUrl VARCHAR(1000),
  referencesJson JSON,
  -- Status
  status ENUM('submitted','shortlisted','awarded','rejected','withdrawn') DEFAULT 'submitted',
  submittedAt TIMESTAMP DEFAULT NOW(),
  awardedAt TIMESTAMP,
  rejectedAt TIMESTAMP,
  rejectionReason VARCHAR(500),
  -- Withdraw
  withdrawnAt TIMESTAMP,
  withdrawReason VARCHAR(500),
  INDEX idx_project (projectId),
  INDEX idx_partner (biddingPartnerId),
  INDEX idx_status (status),
  UNIQUE INDEX idx_project_partner (projectId, biddingPartnerId)
);

CREATE TABLE IF NOT EXISTS projectContracts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  projectId INT NOT NULL,
  bidId INT NOT NULL,
  submittingPartnerId INT NOT NULL, -- Scout/assessor who created the project
  winningPartnerId INT NOT NULL, -- who won the bid
  contractStatus ENUM('draft','sent','signed','active','complete','disputed','cancelled') DEFAULT 'draft',
  -- Financial
  contractAmount DECIMAL(12,2) NOT NULL,
  platformFeeRate DECIMAL(5,4) DEFAULT 0.1200,
  platformFeeAmount DECIMAL(10,2),
  scoutCommissionAmount DECIMAL(10,2),
  -- Documents
  contractDocUrl VARCHAR(1000),
  signedContractUrl VARCHAR(1000),
  -- Signing
  sentAt TIMESTAMP,
  signedByPartnerAt TIMESTAMP,
  signedByClientAt TIMESTAMP,
  -- Timeline
  projectStartDate DATE,
  projectEndDate DATE,
  -- Completion
  completedAt TIMESTAMP,
  finalAmount DECIMAL(12,2),
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  INDEX idx_project (projectId),
  INDEX idx_bid (bidId),
  INDEX idx_winner (winningPartnerId)
);

-- ─── Postcard Queue (Lob.com Integration) ─────────────────────────────────────

CREATE TABLE IF NOT EXISTS postcardQueue (
  id INT AUTO_INCREMENT PRIMARY KEY,
  -- Source
  sourceType ENUM('fsm_job','storm_event','manual') NOT NULL,
  sourceId INT, -- jobId, stormEventId, etc.
  -- Address
  street VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(50) NOT NULL,
  zip VARCHAR(20) NOT NULL,
  recipientName VARCHAR(255),
  -- Campaign
  campaignType ENUM('partner_intro','storm_outreach','seasonal','general') DEFAULT 'partner_intro',
  campaignMessage TEXT,
  qrCodeUrl VARCHAR(500), -- QR linking to trustypro.io?ref=postcard&zip=...
  -- Status
  status ENUM('queued','sent','delivered','failed','skipped') DEFAULT 'queued',
  skippedReason VARCHAR(255),
  lobMailingId VARCHAR(100),
  sentAt TIMESTAMP,
  estimatedDeliveryAt TIMESTAMP,
  deliveredAt TIMESTAMP,
  -- Tracking
  qrScanned BOOLEAN DEFAULT FALSE,
  qrScannedAt TIMESTAMP,
  convertedToSignup BOOLEAN DEFAULT FALSE,
  -- Cost
  costCents INT,
  createdAt TIMESTAMP DEFAULT NOW(),
  INDEX idx_status (status),
  INDEX idx_zip (zip),
  INDEX idx_source (sourceType, sourceId)
);

-- ─── Waitlist Emails (AI-Generated Progress Updates) ──────────────────────────

CREATE TABLE IF NOT EXISTS waitlistEmailCampaigns (
  id INT AUTO_INCREMENT PRIMARY KEY,
  campaignType ENUM('pro_waitlist','homeowner_waitlist') NOT NULL,
  subject VARCHAR(255) NOT NULL,
  aiGeneratedBody TEXT NOT NULL,
  recipientCount INT DEFAULT 0,
  sentCount INT DEFAULT 0,
  failedCount INT DEFAULT 0,
  openRate DECIMAL(5,2),
  -- Platform stats at time of send
  proWaitlistCount INT,
  homeWaitlistCount INT,
  featuresHighlighted JSON,
  scheduledAt TIMESTAMP,
  sentAt TIMESTAMP,
  createdAt TIMESTAMP DEFAULT NOW(),
  INDEX idx_type (campaignType),
  INDEX idx_sent (sentAt)
);

CREATE TABLE IF NOT EXISTS waitlistEmailLog (
  id INT AUTO_INCREMENT PRIMARY KEY,
  campaignId INT NOT NULL,
  recipientEmail VARCHAR(320) NOT NULL,
  recipientName VARCHAR(255),
  status ENUM('queued','sent','delivered','opened','bounced','failed') DEFAULT 'queued',
  resendMessageId VARCHAR(100),
  sentAt TIMESTAMP,
  openedAt TIMESTAMP,
  createdAt TIMESTAMP DEFAULT NOW(),
  INDEX idx_campaign (campaignId),
  INDEX idx_email (recipientEmail)
);

-- ─── Continuous Background Check Monitoring ───────────────────────────────────

CREATE TABLE IF NOT EXISTS continuousMonitoring (
  id INT AUTO_INCREMENT PRIMARY KEY,
  proPassId INT NOT NULL UNIQUE,
  partnerId INT NOT NULL,
  -- Checkr
  checkrCandidateId VARCHAR(100),
  checkrSubscriptionId VARCHAR(100),
  monitoringStatus ENUM('active','paused','cancelled') DEFAULT 'active',
  -- Alerts
  lastAlertType VARCHAR(100),
  lastAlertDate DATE,
  lastAlertDetails TEXT,
  totalAlerts INT DEFAULT 0,
  -- Review
  lastCheckedAt TIMESTAMP,
  nextCheckAt TIMESTAMP,
  enrolledAt TIMESTAMP DEFAULT NOW(),
  cancelledAt TIMESTAMP,
  INDEX idx_pass (proPassId),
  INDEX idx_partner (partnerId),
  INDEX idx_checkr (checkrCandidateId)
);

-- ─── Column additions to existing tables ──────────────────────────────────────

-- Add photoType to photoIntakeQueue
ALTER TABLE photoIntakeQueue
  ADD COLUMN IF NOT EXISTS photoType ENUM('before','after','during','inspection','unknown') DEFAULT 'unknown' AFTER photoUrl;

-- Add Briefcase link to partners
ALTER TABLE partners
  ADD COLUMN IF NOT EXISTS briefcaseId INT AFTER isFoundingPartner,
  ADD COLUMN IF NOT EXISTS checkrCandidateId VARCHAR(100) AFTER briefcaseId,
  ADD COLUMN IF NOT EXISTS w9CompletedAt TIMESTAMP AFTER checkrCandidateId,
  ADD COLUMN IF NOT EXISTS w9FileUrl VARCHAR(1000) AFTER w9CompletedAt,
  ADD COLUMN IF NOT EXISTS scoutCertifiedAt TIMESTAMP AFTER w9FileUrl,
  ADD COLUMN IF NOT EXISTS scoutCertificationLevel ENUM('basic','advanced','commercial') AFTER scoutCertifiedAt,
  ADD COLUMN IF NOT EXISTS isScout BOOLEAN DEFAULT FALSE AFTER scoutCertificationLevel;

-- Add unique constraint on commissions to prevent double-counting
ALTER TABLE commissions
  ADD UNIQUE INDEX IF NOT EXISTS idx_opp_type_unique (opportunityId, commissionType);

-- Add assessmentId to jobs
ALTER TABLE jobs
  ADD COLUMN IF NOT EXISTS assessmentId INT AFTER partnerId;

-- Add facilityId to opportunities
ALTER TABLE opportunities
  ADD COLUMN IF NOT EXISTS facilityId INT AFTER sourcePartnerId;

-- ─── Application Scoring ───────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS applicationScores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  partnerId INT NOT NULL UNIQUE,
  totalScore INT DEFAULT 0,
  -- Component scores
  tradeGapScore INT DEFAULT 0, -- does DFW need this trade?
  yearsExperienceScore INT DEFAULT 0,
  employeeCountScore INT DEFAULT 0,
  fsmToolScore INT DEFAULT 0, -- has CompanyCam/Jobber/etc?
  licenseScore INT DEFAULT 0,
  insuranceScore INT DEFAULT 0,
  serviceAreaScore INT DEFAULT 0,
  referralScore INT DEFAULT 0, -- referred by existing partner?
  -- Status
  approvalThreshold INT DEFAULT 60,
  autoApproved BOOLEAN DEFAULT FALSE,
  feedbackSent BOOLEAN DEFAULT FALSE,
  feedbackItems JSON,
  scoredAt TIMESTAMP DEFAULT NOW(),
  INDEX idx_partner (partnerId),
  INDEX idx_score (totalScore)
);

-- ─── Notification Log ──────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS notificationLog (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tier ENUM('ai_handled','dashboard','email') NOT NULL,
  title VARCHAR(500) NOT NULL,
  content TEXT,
  category VARCHAR(100),
  isRead BOOLEAN DEFAULT FALSE,
  readAt TIMESTAMP,
  emailSent BOOLEAN DEFAULT FALSE,
  emailSentAt TIMESTAMP,
  createdAt TIMESTAMP DEFAULT NOW(),
  INDEX idx_tier (tier),
  INDEX idx_read (isRead),
  INDEX idx_created (createdAt)
);
