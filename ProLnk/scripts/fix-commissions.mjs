import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const db = await mysql.createConnection(process.env.DATABASE_URL);

// Check what columns currently exist in commissions
const [cols] = await db.query("SHOW COLUMNS FROM commissions");
const existingCols = cols.map(c => c.Field);
console.log("Existing commissions columns:", existingCols);

// Full target schema for commissions
const requiredCols = [
  { name: "payingPartnerId", sql: "ALTER TABLE commissions ADD COLUMN payingPartnerId INT NULL" },
  { name: "receivingPartnerId", sql: "ALTER TABLE commissions ADD COLUMN receivingPartnerId INT NULL" },
  { name: "commissionType", sql: "ALTER TABLE commissions ADD COLUMN commissionType ENUM('platform_fee','referral_commission') NOT NULL DEFAULT 'platform_fee'" },
  { name: "jobValue", sql: "ALTER TABLE commissions ADD COLUMN jobValue DECIMAL(10,2) NULL" },
  { name: "feeRate", sql: "ALTER TABLE commissions ADD COLUMN feeRate DECIMAL(5,4) NULL" },
  { name: "opportunityId", sql: "ALTER TABLE commissions ADD COLUMN opportunityId INT NULL" },
];

for (const col of requiredCols) {
  if (!existingCols.includes(col.name)) {
    try {
      await db.query(col.sql);
      console.log(`✅ Added column: ${col.name}`);
    } catch (err) {
      console.error(`❌ Failed to add ${col.name}:`, err.message);
    }
  } else {
    console.log(`⏭  Column already exists: ${col.name}`);
  }
}

// Also check jobs table
const [jobCols] = await db.query("SHOW COLUMNS FROM jobs");
const existingJobCols = jobCols.map(c => c.Field);
console.log("\nExisting jobs columns:", existingJobCols);

const requiredJobCols = [
  { name: "partnerId", sql: "ALTER TABLE jobs ADD COLUMN partnerId INT NOT NULL DEFAULT 0" },
  { name: "customerName", sql: "ALTER TABLE jobs ADD COLUMN customerName VARCHAR(255) NULL" },
  { name: "customerAddress", sql: "ALTER TABLE jobs ADD COLUMN customerAddress TEXT NULL" },
  { name: "serviceType", sql: "ALTER TABLE jobs ADD COLUMN serviceType VARCHAR(255) NULL" },
  { name: "jobValue", sql: "ALTER TABLE jobs ADD COLUMN jobValue DECIMAL(10,2) NULL" },
  { name: "photoUrls", sql: "ALTER TABLE jobs ADD COLUMN photoUrls JSON NULL" },
  { name: "notes", sql: "ALTER TABLE jobs ADD COLUMN notes TEXT NULL" },
  { name: "status", sql: "ALTER TABLE jobs ADD COLUMN status ENUM('pending','analyzed','opportunities_sent','completed') NOT NULL DEFAULT 'pending'" },
  { name: "aiAnalysisResult", sql: "ALTER TABLE jobs ADD COLUMN aiAnalysisResult JSON NULL" },
  { name: "createdAt", sql: "ALTER TABLE jobs ADD COLUMN createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP" },
  { name: "updatedAt", sql: "ALTER TABLE jobs ADD COLUMN updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP" },
];

for (const col of requiredJobCols) {
  if (!existingJobCols.includes(col.name)) {
    try {
      await db.query(col.sql);
      console.log(`✅ Added jobs column: ${col.name}`);
    } catch (err) {
      console.error(`❌ Failed to add jobs.${col.name}:`, err.message);
    }
  } else {
    console.log(`⏭  Jobs column already exists: ${col.name}`);
  }
}

// Check opportunities table
const [oppCols] = await db.query("SHOW COLUMNS FROM opportunities");
const existingOppCols = oppCols.map(c => c.Field);
console.log("\nExisting opportunities columns:", existingOppCols);

const requiredOppCols = [
  { name: "jobId", sql: "ALTER TABLE opportunities ADD COLUMN jobId INT NOT NULL DEFAULT 0" },
  { name: "referringPartnerId", sql: "ALTER TABLE opportunities ADD COLUMN referringPartnerId INT NOT NULL DEFAULT 0" },
  { name: "receivingPartnerId", sql: "ALTER TABLE opportunities ADD COLUMN receivingPartnerId INT NULL" },
  { name: "serviceType", sql: "ALTER TABLE opportunities ADD COLUMN serviceType VARCHAR(255) NOT NULL DEFAULT ''" },
  { name: "description", sql: "ALTER TABLE opportunities ADD COLUMN description TEXT NULL" },
  { name: "confidenceScore", sql: "ALTER TABLE opportunities ADD COLUMN confidenceScore INT NULL" },
  { name: "estimatedValue", sql: "ALTER TABLE opportunities ADD COLUMN estimatedValue DECIMAL(10,2) NULL" },
  { name: "status", sql: "ALTER TABLE opportunities ADD COLUMN status ENUM('pending','sent','accepted','declined','completed','expired') NOT NULL DEFAULT 'pending'" },
  { name: "photoUrl", sql: "ALTER TABLE opportunities ADD COLUMN photoUrl TEXT NULL" },
  { name: "createdAt", sql: "ALTER TABLE opportunities ADD COLUMN createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP" },
  { name: "updatedAt", sql: "ALTER TABLE opportunities ADD COLUMN updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP" },
];

for (const col of requiredOppCols) {
  if (!existingOppCols.includes(col.name)) {
    try {
      await db.query(col.sql);
      console.log(`✅ Added opportunities column: ${col.name}`);
    } catch (err) {
      console.error(`❌ Failed to add opportunities.${col.name}:`, err.message);
    }
  } else {
    console.log(`⏭  Opportunities column already exists: ${col.name}`);
  }
}

// Check partners table for new columns
const [partnerCols] = await db.query("SHOW COLUMNS FROM partners");
const existingPartnerCols = partnerCols.map(c => c.Field);
console.log("\nExisting partners columns:", existingPartnerCols);

const requiredPartnerCols = [
  { name: "userId", sql: "ALTER TABLE partners ADD COLUMN userId INT NULL" },
  { name: "latitude", sql: "ALTER TABLE partners ADD COLUMN latitude DECIMAL(10,7) NULL" },
  { name: "longitude", sql: "ALTER TABLE partners ADD COLUMN longitude DECIMAL(10,7) NULL" },
  { name: "commissionRate", sql: "ALTER TABLE partners ADD COLUMN commissionRate DECIMAL(5,4) NULL" },
  { name: "referralCommissionRate", sql: "ALTER TABLE partners ADD COLUMN referralCommissionRate DECIMAL(5,4) NULL" },
  { name: "totalJobsLogged", sql: "ALTER TABLE partners ADD COLUMN totalJobsLogged INT NOT NULL DEFAULT 0" },
  { name: "totalOpportunitiesSent", sql: "ALTER TABLE partners ADD COLUMN totalOpportunitiesSent INT NOT NULL DEFAULT 0" },
  { name: "totalOpportunitiesReceived", sql: "ALTER TABLE partners ADD COLUMN totalOpportunitiesReceived INT NOT NULL DEFAULT 0" },
  { name: "totalCommissionsEarned", sql: "ALTER TABLE partners ADD COLUMN totalCommissionsEarned DECIMAL(10,2) NOT NULL DEFAULT 0" },
  { name: "totalCommissionsPaid", sql: "ALTER TABLE partners ADD COLUMN totalCommissionsPaid DECIMAL(10,2) NOT NULL DEFAULT 0" },
];

for (const col of requiredPartnerCols) {
  if (!existingPartnerCols.includes(col.name)) {
    try {
      await db.query(col.sql);
      console.log(`✅ Added partners column: ${col.name}`);
    } catch (err) {
      console.error(`❌ Failed to add partners.${col.name}:`, err.message);
    }
  } else {
    console.log(`⏭  Partners column already exists: ${col.name}`);
  }
}

await db.end();
console.log("\n✅ Schema fix complete!");
