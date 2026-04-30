import { createConnection } from 'mysql2/promise';

const url = process.env.DATABASE_URL || '';
const conn = await createConnection(url);

console.log('Creating payment tables...');

await conn.execute(`
  CREATE TABLE IF NOT EXISTS jobPayments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dealId INT NOT NULL,
    homeownerId INT,
    referringPartnerId INT NOT NULL DEFAULT 0,
    receivingPartnerId INT,
    totalJobValue DECIMAL(10,2) NOT NULL DEFAULT 0,
    platformFeeRate DECIMAL(5,4) NOT NULL DEFAULT 0.1000,
    platformFeeAmount DECIMAL(10,2) NOT NULL DEFAULT 0,
    referringPartnerCommission DECIMAL(10,2),
    receivingPartnerPayout DECIMAL(10,2),
    paymentMethod ENUM('card_on_file','ach_debit','stripe_checkout','manual') NOT NULL DEFAULT 'card_on_file',
    isInsuranceJob BOOLEAN NOT NULL DEFAULT FALSE,
    insurancePolicyNumber VARCHAR(100),
    insuranceCarrier VARCHAR(200),
    insuranceAdjusterName VARCHAR(200),
    insuranceAdjusterEmail VARCHAR(320),
    insuranceClaimNumber VARCHAR(100),
    insuranceApprovedAmount DECIMAL(10,2),
    insuranceAdjusterReportUrl VARCHAR(1000),
    stripePaymentIntentId VARCHAR(255),
    stripeSetupIntentId VARCHAR(255),
    stripeCustomerId VARCHAR(255),
    stripeTransferId VARCHAR(255),
    stripeAchMandateId VARCHAR(255),
    status ENUM('pending','deposit_charged','balance_charged','ach_authorized','ach_pulled','paid_out','disputed','refunded','failed','voided') NOT NULL DEFAULT 'pending',
    depositAmount DECIMAL(10,2),
    depositChargedAt TIMESTAMP NULL,
    depositStripeIntentId VARCHAR(255),
    balanceAmount DECIMAL(10,2),
    balanceChargedAt TIMESTAMP NULL,
    balanceStripeIntentId VARCHAR(255),
    commissionPullAmount DECIMAL(10,2),
    commissionPullChargedAt TIMESTAMP NULL,
    commissionPullStripeIntentId VARCHAR(255),
    disputeReason TEXT,
    disputeOpenedAt TIMESTAMP NULL,
    disputeResolvedAt TIMESTAMP NULL,
    disputeResolution VARCHAR(500),
    triggeredByCheckinId INT,
    notes TEXT,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`);
console.log('✓ jobPayments created');

await conn.execute(`
  CREATE TABLE IF NOT EXISTS paymentMilestones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jobPaymentId INT NOT NULL,
    dealId INT NOT NULL,
    milestoneType ENUM('deposit','mid_job','final_balance','insurance_commission') NOT NULL,
    milestoneLabel VARCHAR(100) NOT NULL,
    percentageOfTotal DECIMAL(5,4) NOT NULL,
    amountCents INT NOT NULL,
    triggerEvent ENUM('job_start_confirmed','mid_job_milestone','homeowner_checkin','admin_manual') NOT NULL,
    status ENUM('scheduled','triggered','processing','completed','failed','skipped') NOT NULL DEFAULT 'scheduled',
    scheduledFor TIMESTAMP NULL,
    triggeredAt TIMESTAMP NULL,
    completedAt TIMESTAMP NULL,
    stripeIntentId VARCHAR(255),
    failureReason TEXT,
    retryCount INT NOT NULL DEFAULT 0,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);
console.log('✓ paymentMilestones created');

await conn.execute(`
  CREATE TABLE IF NOT EXISTS achAuthorizations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    partnerId INT NOT NULL,
    jobPaymentId INT,
    dealId INT,
    stripeCustomerId VARCHAR(255),
    stripePaymentMethodId VARCHAR(255),
    stripeMandateId VARCHAR(255),
    bankName VARCHAR(200),
    bankLast4 VARCHAR(4),
    bankRoutingNumber VARCHAR(9),
    accountType ENUM('checking','savings') DEFAULT 'checking',
    authorizedAt TIMESTAMP NULL,
    authorizedByName VARCHAR(255),
    authorizedByIp VARCHAR(45),
    status ENUM('pending','authorized','revoked','expired') NOT NULL DEFAULT 'pending',
    revokedAt TIMESTAMP NULL,
    revokeReason VARCHAR(500),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`);
console.log('✓ achAuthorizations created');

await conn.end();
console.log('All payment tables created successfully!');
