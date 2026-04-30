import mysql from "mysql2/promise";

const conn = await mysql.createConnection(process.env.DATABASE_URL);

const [rows] = await conn.query("SHOW TABLES");
const existing = new Set(rows.map((r) => Object.values(r)[0]));

const needed = [
  "webhookSubscriptions",
  "webhookDeliveryLog",
  "proAgreements",
  "propertyProfiles",
  "partnerPerformanceScores",
  "aiTrainingDataset",
  "geographicDensity",
  "acceptanceSignals",
  "referralGraph",
  "funnelEvents",
];

const missing = needed.filter((t) => !existing.has(t));
console.log("Missing tables:", missing.join(", ") || "none");

const statements = {
  webhookSubscriptions: `
    CREATE TABLE webhookSubscriptions (
      id int AUTO_INCREMENT NOT NULL,
      name varchar(255) NOT NULL,
      url text NOT NULL,
      secret varchar(255),
      events json,
      isActive boolean NOT NULL DEFAULT true,
      totalFired int NOT NULL DEFAULT 0,
      totalSucceeded int NOT NULL DEFAULT 0,
      totalFailed int NOT NULL DEFAULT 0,
      lastFiredAt timestamp NULL,
      lastStatus int,
      createdBy int,
      createdAt timestamp NOT NULL DEFAULT (now()),
      updatedAt timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT webhookSubscriptions_id PRIMARY KEY(id)
    )`,
  webhookDeliveryLog: `
    CREATE TABLE webhookDeliveryLog (
      id int AUTO_INCREMENT NOT NULL,
      subscriptionId int NOT NULL,
      eventName varchar(100) NOT NULL,
      payload json,
      statusCode int,
      responseBody text,
      success boolean NOT NULL DEFAULT false,
      durationMs int,
      firedAt timestamp NOT NULL DEFAULT (now()),
      CONSTRAINT webhookDeliveryLog_id PRIMARY KEY(id)
    )`,
  proAgreements: `
    CREATE TABLE proAgreements (
      id int AUTO_INCREMENT NOT NULL,
      partnerId int NOT NULL,
      templateVersion varchar(20) NOT NULL DEFAULT 'v1.0',
      tierAtSigning enum('scout','pro','crew','company','enterprise') NOT NULL,
      commissionRateAtSigning decimal(5,4) NOT NULL,
      effectiveDate timestamp NOT NULL,
      status enum('pending','sent','signed','expired','voided') NOT NULL DEFAULT 'pending',
      signedAt timestamp NULL,
      signerName varchar(255),
      signatureData text,
      ipAddress varchar(64),
      pdfS3Key varchar(500),
      pdfUrl text,
      sentAt timestamp NULL,
      sentVia enum('email','in_app','manual'),
      createdAt timestamp NOT NULL DEFAULT (now()),
      updatedAt timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT proAgreements_id PRIMARY KEY(id)
    )`,
  propertyProfiles: `
    CREATE TABLE propertyProfiles (
      id int AUTO_INCREMENT NOT NULL,
      address text NOT NULL,
      city varchar(100),
      state varchar(50),
      zip varchar(20),
      latitude decimal(10,7),
      longitude decimal(10,7),
      homeownerName varchar(255),
      homeownerPhone varchar(30),
      homeownerEmail varchar(255),
      totalJobsLogged int NOT NULL DEFAULT 0,
      totalOpportunitiesDetected int NOT NULL DEFAULT 0,
      totalOffersAccepted int NOT NULL DEFAULT 0,
      totalOffersDeclined int NOT NULL DEFAULT 0,
      totalRevenueGenerated decimal(12,2) DEFAULT '0.00',
      tradesServiced json,
      detectionHistory json,
      avgAcceptedDiscountPct decimal(5,2),
      lastServicedAt timestamp NULL,
      createdAt timestamp NOT NULL DEFAULT (now()),
      updatedAt timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT propertyProfiles_id PRIMARY KEY(id)
    )`,
  partnerPerformanceScores: `
    CREATE TABLE partnerPerformanceScores (
      id int AUTO_INCREMENT NOT NULL,
      partnerId int NOT NULL,
      totalLeadsReceived int NOT NULL DEFAULT 0,
      totalLeadsAccepted int NOT NULL DEFAULT 0,
      totalLeadsDeclined int NOT NULL DEFAULT 0,
      totalLeadsClosed int NOT NULL DEFAULT 0,
      leadAcceptanceRate decimal(5,4) NOT NULL DEFAULT '0',
      leadCloseRate decimal(5,4) NOT NULL DEFAULT '0',
      avgResponseTimeHours decimal(8,2),
      avgJobValue decimal(10,2),
      totalJobValueClosed decimal(12,2) NOT NULL DEFAULT '0',
      totalCommissionsEarned decimal(12,2) NOT NULL DEFAULT '0',
      totalCommissionsPaid decimal(12,2) NOT NULL DEFAULT '0',
      totalReferralsSent int NOT NULL DEFAULT 0,
      totalReferralsConverted int NOT NULL DEFAULT 0,
      referralConversionRate decimal(5,4) NOT NULL DEFAULT '0',
      healthScore int DEFAULT 50,
      churnRisk enum('low','medium','high') DEFAULT 'low',
      lastJobLoggedAt timestamp NULL,
      lastLeadAcceptedAt timestamp NULL,
      calculatedAt timestamp NOT NULL DEFAULT (now()),
      updatedAt timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT partnerPerformanceScores_id PRIMARY KEY(id),
      CONSTRAINT partnerPerformanceScores_partnerId_unique UNIQUE(partnerId)
    )`,
  aiTrainingDataset: `
    CREATE TABLE aiTrainingDataset (
      id int AUTO_INCREMENT NOT NULL,
      jobId int,
      opportunityId int,
      beforePhotoUrl text,
      afterPhotoUrl text,
      detectionType varchar(100) NOT NULL,
      detectionCategory varchar(100) NOT NULL,
      aiConfidenceScore decimal(4,3),
      validationOutcome enum('validated','rejected','pending','unknown') DEFAULT 'pending',
      propertyType varchar(50),
      propertyZip varchar(20),
      propertyState varchar(50),
      capturedMonth int,
      capturedSeason enum('spring','summer','fall','winter'),
      modelVersion varchar(50) DEFAULT 'v1',
      approvedForTraining boolean DEFAULT false,
      createdAt timestamp NOT NULL DEFAULT (now()),
      CONSTRAINT aiTrainingDataset_id PRIMARY KEY(id)
    )`,
  geographicDensity: `
    CREATE TABLE geographicDensity (
      id int AUTO_INCREMENT NOT NULL,
      zip varchar(20) NOT NULL,
      city varchar(100),
      state varchar(50),
      latitude decimal(10,7),
      longitude decimal(10,7),
      snapshotDate timestamp NOT NULL,
      totalActivePartners int DEFAULT 0,
      totalTradesCovered int DEFAULT 0,
      tradeBreakdown json,
      totalJobsLogged int DEFAULT 0,
      totalOpportunitiesDetected int DEFAULT 0,
      totalOffersAccepted int DEFAULT 0,
      coverageGapScore int DEFAULT 0,
      unmetDemandTrades json,
      createdAt timestamp NOT NULL DEFAULT (now()),
      CONSTRAINT geographicDensity_id PRIMARY KEY(id)
    )`,
  acceptanceSignals: `
    CREATE TABLE acceptanceSignals (
      id int AUTO_INCREMENT NOT NULL,
      opportunityId int NOT NULL,
      propertyProfileId int,
      tradeCategory varchar(100) NOT NULL,
      offerAmount decimal(10,2),
      standardMarketPrice decimal(10,2),
      discountPct decimal(5,2),
      outcome enum('accepted','declined','ignored','expired') NOT NULL,
      timeToRespondHours decimal(8,2),
      deliveryChannel enum('sms','email','push','in_app'),
      deliveryHourOfDay int,
      deliveryDayOfWeek int,
      deliveryMonth int,
      deliverySeason enum('spring','summer','fall','winter'),
      propertyZip varchar(20),
      propertyCity varchar(100),
      propertyState varchar(50),
      isFirstOffer boolean DEFAULT true,
      priorOfferCount int DEFAULT 0,
      recordedAt timestamp NOT NULL DEFAULT (now()),
      CONSTRAINT acceptanceSignals_id PRIMARY KEY(id)
    )`,
  referralGraph: `
    CREATE TABLE referralGraph (
      id int AUTO_INCREMENT NOT NULL,
      sourcePartnerId int NOT NULL,
      receivingPartnerId int NOT NULL,
      sourceTrade varchar(100),
      receivingTrade varchar(100),
      city varchar(100),
      zip varchar(20),
      totalReferrals int NOT NULL DEFAULT 0,
      totalConverted int NOT NULL DEFAULT 0,
      totalJobValue decimal(12,2) NOT NULL DEFAULT '0',
      totalCommissionPaid decimal(12,2) NOT NULL DEFAULT '0',
      conversionRate decimal(5,4) NOT NULL DEFAULT '0',
      avgDaysToClose decimal(6,2),
      relationshipStrength int DEFAULT 0,
      firstReferralAt timestamp NULL,
      lastReferralAt timestamp NULL,
      createdAt timestamp NOT NULL DEFAULT (now()),
      updatedAt timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT referralGraph_id PRIMARY KEY(id)
    )`,
  funnelEvents: `
    CREATE TABLE funnelEvents (
      id int AUTO_INCREMENT NOT NULL,
      opportunityId int NOT NULL,
      propertyProfileId int,
      partnerId int,
      eventType enum('ai_detected','admin_approved','offer_composed','notification_sent','notification_opened','page_visited','offer_clicked','offer_accepted','offer_declined','job_booked','job_completed','commission_paid') NOT NULL,
      channel enum('sms','email','push','in_app'),
      offerAmount decimal(10,2),
      discountPct decimal(5,2),
      secondsFromPreviousEvent int,
      deviceType varchar(50),
      metadata text,
      occurredAt timestamp NOT NULL DEFAULT (now()),
      CONSTRAINT funnelEvents_id PRIMARY KEY(id)
    )`,
};

for (const table of missing) {
  const sql = statements[table];
  if (!sql) {
    console.log(`⚠️  No SQL defined for ${table}`);
    continue;
  }
  try {
    await conn.query(sql);
    console.log(`✅ Created: ${table}`);
  } catch (e) {
    console.error(`❌ Failed ${table}: ${e.message}`);
  }
}

// Update drizzle migrations table to mark migration as applied
try {
  await conn.query(
    `INSERT IGNORE INTO __drizzle_migrations (hash, created_at) VALUES ('0002_sprint8_waves', ${Date.now()})`
  );
  console.log("✅ Migration record inserted");
} catch (e) {
  console.log("ℹ️  Migration record:", e.message);
}

await conn.end();
console.log("\n✅ Done");
