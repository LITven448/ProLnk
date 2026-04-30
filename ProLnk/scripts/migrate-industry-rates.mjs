import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { readFileSync } from "fs";

// Load env
dotenv.config();

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

const conn = await mysql.createConnection(url);

try {
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS \`industryRates\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`industryName\` VARCHAR(100) NOT NULL UNIQUE,
      \`platformFeeRate\` DECIMAL(5,4) NOT NULL DEFAULT 0.1200,
      \`referralCommissionRate\` DECIMAL(5,4) NOT NULL DEFAULT 0.0500,
      \`notes\` TEXT,
      \`updatedAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
  console.log("✅ industryRates table created (or already exists)");

  // Seed default industry rates based on Brain Trust recommendations
  const defaults = [
    ["Lawn Care", "0.1000", "0.0500", "High volume, low margin — 10% platform fee"],
    ["Landscaping", "0.0900", "0.0500", "Medium jobs, good margin"],
    ["Pest Control", "0.1200", "0.0500", "Recurring revenue model"],
    ["Pool Service", "0.1200", "0.0500", "High-value recurring"],
    ["Pool Cleaning", "0.1000", "0.0500", "Standard pool maintenance"],
    ["Pressure Washing", "0.1200", "0.0500", "High margin, quick jobs"],
    ["Window Cleaning", "0.1200", "0.0500", "High margin"],
    ["Handyman", "0.1000", "0.0500", "Variable job sizes"],
    ["Fence & Gate", "0.1000", "0.0500", "Mid-size jobs"],
    ["Painting", "0.0800", "0.0400", "Large jobs — capped at 8%"],
    ["Remodeling", "0.0800", "0.0400", "Large jobs — capped at 8%"],
    ["Roofing", "0.0700", "0.0350", "Very large jobs — capped at 7%"],
    ["HVAC", "0.0800", "0.0400", "Large jobs"],
    ["Plumbing", "0.0900", "0.0450", "Emergency + planned"],
    ["Electrical", "0.0900", "0.0450", "Licensed trade"],
    ["Tree Service", "0.1000", "0.0500", "Hazardous work premium"],
    ["Gutter Cleaning", "0.1200", "0.0500", "Quick, high-margin"],
    ["Irrigation", "0.1000", "0.0500", "Seasonal"],
    ["Artificial Turf", "0.0800", "0.0400", "Large install jobs"],
    ["Water Filtration", "0.1000", "0.0500", "High-value installs"],
    ["Security", "0.0900", "0.0450", "Recurring monitoring"],
    ["Smart Home", "0.0900", "0.0450", "Tech installs"],
    ["Concrete", "0.0800", "0.0400", "Large pours"],
    ["Garage Epoxy", "0.1000", "0.0500", "Mid-size specialty"],
    ["Dog Walking", "0.1200", "0.0500", "Recurring, low ticket"],
    ["Pet Waste Removal", "0.0000", "0.0500", "Founding partner — Scoop Duke exempt"],
    ["Veterinary", "0.1000", "0.0500", "Referral only"],
    ["Dog Grooming", "0.1200", "0.0500", "Recurring"],
  ];

  for (const [name, fee, referral, notes] of defaults) {
    await conn.execute(
      `INSERT INTO \`industryRates\` (industryName, platformFeeRate, referralCommissionRate, notes)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE notes = VALUES(notes)`,
      [name, fee, referral, notes]
    );
  }
  console.log(`✅ Seeded ${defaults.length} industry rate defaults`);
} catch (err) {
  console.error("Migration error:", err);
} finally {
  await conn.end();
}
