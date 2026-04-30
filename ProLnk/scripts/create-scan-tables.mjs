import mysql from "mysql2/promise";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL required");

const conn = await mysql.createConnection(url);

const tables = [
  `CREATE TABLE IF NOT EXISTS \`homeownerLeads\` (
    \`id\` int AUTO_INCREMENT PRIMARY KEY,
    \`homeownerProfileId\` int,
    \`homeownerEmail\` varchar(255),
    \`homeownerName\` varchar(255),
    \`serviceAddress\` varchar(500),
    \`photoUrls\` json,
    \`analysisJson\` json,
    \`roomLabel\` varchar(100),
    \`offersCreated\` int DEFAULT 0,
    \`createdAt\` bigint NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS \`homeownerScanOffers\` (
    \`id\` int AUTO_INCREMENT PRIMARY KEY,
    \`homeownerProfileId\` int,
    \`homeownerEmail\` varchar(255),
    \`leadId\` int,
    \`serviceType\` varchar(200) NOT NULL,
    \`serviceCategory\` varchar(200),
    \`description\` text,
    \`estimatedValue\` int,
    \`confidence\` decimal(4,2),
    \`status\` enum('pending','viewed','accepted','dismissed') DEFAULT 'pending' NOT NULL,
    \`matchedPartnerId\` int,
    \`createdAt\` bigint NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS \`homeownerScanHistory\` (
    \`id\` int AUTO_INCREMENT PRIMARY KEY,
    \`homeownerProfileId\` int,
    \`homeownerEmail\` varchar(255),
    \`roomLabel\` varchar(100),
    \`photoUrls\` json,
    \`analysisJson\` json,
    \`opportunitiesFound\` int DEFAULT 0,
    \`photoQuality\` varchar(50),
    \`createdAt\` bigint NOT NULL
  )`,
  // Add homeownerProfileId to homeHealthVaultEntries if not exists
  `ALTER TABLE \`homeHealthVaultEntries\` ADD COLUMN IF NOT EXISTS \`homeownerProfileId\` int`,
];

for (const sql of tables) {
  try {
    await conn.execute(sql);
    console.log("✓ executed:", sql.slice(0, 60));
  } catch (e) {
    console.warn("⚠ skipped:", e.message?.slice(0, 100));
  }
}

await conn.end();
console.log("Done.");
