import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);

// Create jobs table
await conn.query(`
  CREATE TABLE IF NOT EXISTS jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    partnerId INT NOT NULL,
    loggedByUserId INT NULL,
    customerName VARCHAR(255) NULL,
    customerEmail VARCHAR(320) NULL,
    customerPhone VARCHAR(30) NULL,
    serviceAddress VARCHAR(500) NOT NULL,
    serviceAddressLat DECIMAL(10,6) NULL,
    serviceAddressLng DECIMAL(10,6) NULL,
    serviceType VARCHAR(100) NULL,
    notes TEXT NULL,
    photoUrls JSON DEFAULT (JSON_ARRAY()),
    aiAnalysisStatus ENUM('pending','processing','complete','failed') DEFAULT 'pending' NOT NULL,
    aiAnalysisResult JSON NULL,
    status ENUM('logged','analyzed','opportunities_sent') DEFAULT 'logged' NOT NULL,
    completedAt TIMESTAMP NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
  )
`);
console.log("✅ jobs table ready");

// Create opportunities table
await conn.query(`
  CREATE TABLE IF NOT EXISTS opportunities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jobId INT NOT NULL,
    sourcePartnerId INT NOT NULL,
    receivingPartnerId INT NULL,
    opportunityType VARCHAR(100) NOT NULL,
    opportunityCategory VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    aiConfidence DECIMAL(4,3) NULL,
    photoUrl VARCHAR(1000) NULL,
    status ENUM('pending','sent','accepted','declined','converted','expired') DEFAULT 'pending' NOT NULL,
    estimatedJobValue DECIMAL(10,2) NULL,
    actualJobValue DECIMAL(10,2) NULL,
    platformFeeAmount DECIMAL(10,2) NULL,
    referralCommissionAmount DECIMAL(10,2) NULL,
    proLinkNetAmount DECIMAL(10,2) NULL,
    jobClosedAt TIMESTAMP NULL,
    sentAt TIMESTAMP NULL,
    acceptedAt TIMESTAMP NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
  )
`);
console.log("✅ opportunities table ready");

// Create commissions table
await conn.query(`
  CREATE TABLE IF NOT EXISTS commissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    opportunityId INT NULL,
    payingPartnerId INT NOT NULL,
    receivingPartnerId INT NULL,
    commissionType ENUM('platform_fee','referral_commission','prolink_net') NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    jobValue DECIMAL(10,2) NULL,
    feeRate DECIMAL(5,4) NULL,
    description VARCHAR(500) NULL,
    paid BOOLEAN DEFAULT FALSE NOT NULL,
    paidAt TIMESTAMP NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
  )
`);
console.log("✅ commissions table ready");

// Create broadcasts table
await conn.query(`
  CREATE TABLE IF NOT EXISTS broadcasts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    sentBy INT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
  )
`);
console.log("✅ broadcasts table ready");

// Verify industryRates table (already created by previous script)
await conn.query(`
  CREATE TABLE IF NOT EXISTS industryRates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    industryName VARCHAR(100) NOT NULL UNIQUE,
    platformFeeRate DECIMAL(5,4) DEFAULT 0.1200 NOT NULL,
    referralCommissionRate DECIMAL(5,4) DEFAULT 0.0500 NOT NULL,
    notes TEXT NULL,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
  )
`);
console.log("✅ industryRates table ready");

// Show all tables
const [tables] = await conn.query("SHOW TABLES");
console.log("\n📋 All tables in database:");
tables.forEach(t => console.log(" -", Object.values(t)[0]));

await conn.end();
console.log("\n✅ All tables created successfully");
