import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "mysql://3WV8GtPKfZxaGP8.root:rSBWEK1mFOtftyG8@gateway01.us-east-1.prod.aws.tidbcloud.com:4000/prolnk";

const TEST = {
  businessName: "Test Founding Pro",
  businessType: "Plumbing",
  contactName: "Test Founder",
  contactEmail: "founding.test@prolnk.xyz",
  contactPhone: "214-555-0123",
  password: "FoundingTest2026!",
  serviceArea: "DFW",
  serviceZipCodes: ["75201"],
};

function makeOpenId(email) {
  return `partner_${email.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
}

const url = DATABASE_URL.replace(/\?.*$/, "");
const conn = await mysql.createConnection({ uri: url, ssl: { rejectUnauthorized: false } });

try {
  const [existing] = await conn.execute(
    "SELECT id FROM partners WHERE contactEmail = ? LIMIT 1",
    [TEST.contactEmail]
  );
  if (existing.length) {
    console.log(`ℹ️  Partner already exists (id=${existing[0].id}) for ${TEST.contactEmail}. Resetting password.`);
    const passwordHash = await bcrypt.hash(TEST.password, 10);
    await conn.execute("UPDATE partners SET passwordHash = ? WHERE contactEmail = ?", [
      passwordHash,
      TEST.contactEmail,
    ]);
    console.log("✅ Password reset.");
  } else {
    const passwordHash = await bcrypt.hash(TEST.password, 10);
    const openId = makeOpenId(TEST.contactEmail);

    // users.id has no AUTO_INCREMENT in this schema — assign explicitly.
    const [existingUser] = await conn.execute("SELECT id FROM users WHERE openId = ? LIMIT 1", [openId]);
    let userId;
    if (existingUser.length) {
      userId = existingUser[0].id;
    } else {
      const [maxRows] = await conn.execute("SELECT COALESCE(MAX(id),0)+1 AS nextId FROM users");
      userId = Number(maxRows[0].nextId);
      await conn.execute(
        `INSERT INTO users (id, openId, name, email, loginMethod, lastSignedIn)
         VALUES (?, ?, ?, ?, 'partner_password', NOW())`,
        [userId, openId, TEST.contactName, TEST.contactEmail]
      );
    }

    const [maxPartner] = await conn.execute("SELECT COALESCE(MAX(id),0)+1 AS nextId FROM partners");
    const partnerId = Number(maxPartner[0].nextId);
    await conn.execute(
      `INSERT INTO partners (
        id, userId, businessName, businessType, contactName, contactEmail, contactPhone,
        serviceArea, serviceZipCodes, maxZipCodes, passwordHash,
        status, tier, commissionRate, platformFeeRate, referralCommissionRate,
        weeklyLeadCap, appliedAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 5, ?, 'active', 'scout', 0.4000, 0.1200, 0.0480, 5, NOW(), NOW())`,
      [
        partnerId,
        userId,
        TEST.businessName,
        TEST.businessType,
        TEST.contactName,
        TEST.contactEmail,
        TEST.contactPhone,
        TEST.serviceArea,
        JSON.stringify(TEST.serviceZipCodes),
        passwordHash,
      ]
    );
    console.log(`✅ Created test partner (id=${partnerId}, userId=${userId}) ${TEST.contactEmail}`);
  }

  console.log("\n──────── TEST LOGIN ────────");
  console.log("URL:      https://prolnk.xyz/partner-login");
  console.log(`Email:    ${TEST.contactEmail}`);
  console.log(`Password: ${TEST.password}`);
  console.log("────────────────────────────");
} catch (e) {
  console.error("❌ Seed failed:", e.message);
  process.exitCode = 1;
} finally {
  await conn.end();
}
