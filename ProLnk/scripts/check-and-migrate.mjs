import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);

// Check partners table columns
const [cols] = await conn.query("SHOW COLUMNS FROM partners");
const colNames = cols.map(c => c.Field);
console.log("Partners columns:", colNames.join(", "));

// Check for missing columns and add them
const needed = [
  { name: "serviceAreaLat", sql: "ADD COLUMN serviceAreaLat DECIMAL(10,6) NULL" },
  { name: "serviceAreaLng", sql: "ADD COLUMN serviceAreaLng DECIMAL(10,6) NULL" },
  { name: "serviceRadiusMiles", sql: "ADD COLUMN serviceRadiusMiles INT DEFAULT 15" },
  { name: "isFoundingPartner", sql: "ADD COLUMN isFoundingPartner BOOLEAN DEFAULT FALSE NOT NULL" },
  { name: "leadsCount", sql: "ADD COLUMN leadsCount INT DEFAULT 0 NOT NULL" },
  { name: "jobsLogged", sql: "ADD COLUMN jobsLogged INT DEFAULT 0 NOT NULL" },
  { name: "opportunitiesGenerated", sql: "ADD COLUMN opportunitiesGenerated INT DEFAULT 0 NOT NULL" },
  { name: "totalCommissionEarned", sql: "ADD COLUMN totalCommissionEarned DECIMAL(10,2) DEFAULT 0.00 NOT NULL" },
  { name: "totalCommissionPaid", sql: "ADD COLUMN totalCommissionPaid DECIMAL(10,2) DEFAULT 0.00 NOT NULL" },
  { name: "platformFeeRate", sql: "ADD COLUMN platformFeeRate DECIMAL(5,4) DEFAULT 0.1200 NOT NULL" },
  { name: "referralCommissionRate", sql: "ADD COLUMN referralCommissionRate DECIMAL(5,4) DEFAULT 0.0500 NOT NULL" },
  { name: "approvedAt", sql: "ADD COLUMN approvedAt TIMESTAMP NULL" },
];

for (const col of needed) {
  if (!colNames.includes(col.name)) {
    console.log(`Adding missing column: ${col.name}`);
    await conn.query(`ALTER TABLE partners ${col.sql}`);
    console.log(`✅ Added ${col.name}`);
  }
}

// Check jobs table
try {
  const [jobCols] = await conn.query("SHOW COLUMNS FROM jobs");
  const jobColNames = jobCols.map(c => c.Field);
  console.log("\nJobs columns:", jobColNames.join(", "));
  
  const jobNeeded = [
    { name: "serviceAddressLat", sql: "ADD COLUMN serviceAddressLat DECIMAL(10,6) NULL" },
    { name: "serviceAddressLng", sql: "ADD COLUMN serviceAddressLng DECIMAL(10,6) NULL" },
    { name: "customerEmail", sql: "ADD COLUMN customerEmail VARCHAR(320) NULL" },
    { name: "customerPhone", sql: "ADD COLUMN customerPhone VARCHAR(30) NULL" },
    { name: "aiAnalysisResult", sql: "ADD COLUMN aiAnalysisResult JSON NULL" },
    { name: "completedAt", sql: "ADD COLUMN completedAt TIMESTAMP NULL" },
    { name: "loggedByUserId", sql: "ADD COLUMN loggedByUserId INT NULL" },
  ];
  
  for (const col of jobNeeded) {
    if (!jobColNames.includes(col.name)) {
      console.log(`Adding missing jobs column: ${col.name}`);
      await conn.query(`ALTER TABLE jobs ${col.sql}`);
      console.log(`✅ Added jobs.${col.name}`);
    }
  }
} catch (e) {
  console.log("Jobs table issue:", e.message);
}

// Check opportunities table
try {
  const [oppCols] = await conn.query("SHOW COLUMNS FROM opportunities");
  const oppColNames = oppCols.map(c => c.Field);
  console.log("\nOpportunities columns:", oppColNames.join(", "));
  
  const oppNeeded = [
    { name: "aiConfidence", sql: "ADD COLUMN aiConfidence DECIMAL(4,3) NULL" },
    { name: "photoUrl", sql: "ADD COLUMN photoUrl VARCHAR(1000) NULL" },
    { name: "estimatedJobValue", sql: "ADD COLUMN estimatedJobValue DECIMAL(10,2) NULL" },
    { name: "actualJobValue", sql: "ADD COLUMN actualJobValue DECIMAL(10,2) NULL" },
    { name: "platformFeeAmount", sql: "ADD COLUMN platformFeeAmount DECIMAL(10,2) NULL" },
    { name: "referralCommissionAmount", sql: "ADD COLUMN referralCommissionAmount DECIMAL(10,2) NULL" },
    { name: "proLinkNetAmount", sql: "ADD COLUMN proLinkNetAmount DECIMAL(10,2) NULL" },
    { name: "jobClosedAt", sql: "ADD COLUMN jobClosedAt TIMESTAMP NULL" },
    { name: "sentAt", sql: "ADD COLUMN sentAt TIMESTAMP NULL" },
    { name: "acceptedAt", sql: "ADD COLUMN acceptedAt TIMESTAMP NULL" },
    { name: "receivingPartnerId", sql: "ADD COLUMN receivingPartnerId INT NULL" },
  ];
  
  for (const col of oppNeeded) {
    if (!oppColNames.includes(col.name)) {
      console.log(`Adding missing opportunities column: ${col.name}`);
      await conn.query(`ALTER TABLE opportunities ${col.sql}`);
      console.log(`✅ Added opportunities.${col.name}`);
    }
  }
} catch (e) {
  console.log("Opportunities table issue:", e.message);
}

await conn.end();
console.log("\n✅ Migration check complete");
