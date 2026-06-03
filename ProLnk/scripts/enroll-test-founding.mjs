import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "mysql://3WV8GtPKfZxaGP8.root:rSBWEK1mFOtftyG8@gateway01.us-east-1.prod.aws.tidbcloud.com:4000/prolnk";

const TEST_EMAIL = "founding.test@prolnk.xyz";
const MONTH = new Date().toISOString().slice(0, 7); // YYYY-MM

const makeOpenId = (email) => `partner_${email.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;

const url = DATABASE_URL.replace(/\?.*$/, "");
const conn = await mysql.createConnection({ uri: url, ssl: { rejectUnauthorized: false } });

async function nextId(table) {
  const [r] = await conn.execute(`SELECT COALESCE(MAX(id),0)+1 AS n FROM \`${table}\``);
  return Number(r[0].n);
}
async function userIdFor(email) {
  const [r] = await conn.execute("SELECT id FROM users WHERE openId = ? LIMIT 1", [makeOpenId(email)]);
  return r[0]?.id ?? null;
}

async function ensureDownlinePartner(email, businessName, trade, jobsThisMonth, uplineUserId) {
  // user
  let uid = await userIdFor(email);
  if (!uid) {
    uid = await nextId("users");
    await conn.execute(
      `INSERT INTO users (id, openId, name, email, loginMethod, lastSignedIn) VALUES (?,?,?,?, 'partner_password', NOW())`,
      [uid, makeOpenId(email), businessName, email]
    );
  }
  // partner
  const [pExists] = await conn.execute("SELECT id FROM partners WHERE contactEmail = ? LIMIT 1", [email]);
  if (!pExists.length) {
    const pid = await nextId("partners");
    const hash = await bcrypt.hash("DownlineTest2026!", 10);
    await conn.execute(
      `INSERT INTO partners (id, userId, businessName, businessType, contactName, contactEmail,
        serviceArea, serviceZipCodes, maxZipCodes, passwordHash, status, tier,
        commissionRate, platformFeeRate, referralCommissionRate, weeklyLeadCap, appliedAt, updatedAt)
       VALUES (?,?,?,?,?,?, 'DFW', ?, 5, ?, 'active', 'scout', 0.4000, 0.1200, 0.0480, 5, NOW(), NOW())`,
      [pid, uid, businessName, trade, businessName, email, JSON.stringify(["75201"]), hash]
    );
  }
  // network profile
  const [npExists] = await conn.execute("SELECT id FROM pro_network_profile WHERE user_id = ? LIMIT 1", [String(uid)]);
  if (!npExists.length) {
    const npid = await nextId("pro_network_profile");
    const code = `DN${String(uid).slice(-6)}`;
    await conn.execute(
      `INSERT INTO pro_network_profile (id, user_id, network_level, referred_by_user_id, referral_code,
        subscription_active, jobs_completed_this_month, total_network_income_earned, pending_payout_amount, created_at, updated_at)
       VALUES (?,?, 2, ?, ?, 1, ?, '0.00', '0.00', NOW(), NOW())`,
      [npid, String(uid), String(uplineUserId), code, jobsThisMonth]
    );
  }
  // upline chain (downline -> test user, level 1)
  const [ucExists] = await conn.execute(
    "SELECT id FROM pro_upline_chain WHERE pro_user_id = ? AND upline_user_id = ? LIMIT 1",
    [String(uid), String(uplineUserId)]
  );
  if (!ucExists.length) {
    const ucid = await nextId("pro_upline_chain");
    await conn.execute(
      `INSERT INTO pro_upline_chain (id, pro_user_id, upline_user_id, levels_above, upline_network_level, created_at)
       VALUES (?,?,?, 1, 1, NOW())`,
      [ucid, String(uid), String(uplineUserId)]
    );
  }
  return uid;
}

async function ensurePayout(recipientUserId, sourceUserId, type, rate, amount, status) {
  const [exists] = await conn.execute(
    "SELECT id FROM commission_payout WHERE recipient_user_id = ? AND payout_type = ? AND payout_month = ? LIMIT 1",
    [String(recipientUserId), type, MONTH]
  );
  if (exists.length) return;
  const id = await nextId("commission_payout");
  await conn.execute(
    `INSERT INTO commission_payout (id, job_commission_event_id, recipient_user_id, source_pro_user_id,
      payout_type, rate_applied, amount, status, payout_month, paid_at, created_at)
     VALUES (?, 0, ?, ?, ?, ?, ?, ?, ?, ${status === "paid" ? "NOW()" : "NULL"}, NOW())`,
    [id, String(recipientUserId), String(sourceUserId), type, rate, amount, status, MONTH]
  );
}

try {
  const testUserId = await userIdFor(TEST_EMAIL);
  if (!testUserId) throw new Error(`Test user ${TEST_EMAIL} not found — run seed-test-partner.mjs first.`);

  // 1) Founding network profile for the test user
  const [npExists] = await conn.execute("SELECT id FROM pro_network_profile WHERE user_id = ? LIMIT 1", [String(testUserId)]);
  if (!npExists.length) {
    const npid = await nextId("pro_network_profile");
    await conn.execute(
      `INSERT INTO pro_network_profile (id, user_id, network_level, referral_code, subscription_active,
        jobs_completed_this_month, total_network_income_earned, pending_payout_amount, agreement_signed_at, created_at, updated_at)
       VALUES (?,?, 1, 'FOUND001', 1, 3, '1840.50', '420.00', NOW(), NOW(), NOW())`,
      [npid, String(testUserId)]
    );
    console.log("✅ Created founding-network profile for test user (code FOUND001)");
  } else {
    console.log("ℹ️  Test user already has a network profile");
  }

  // 2) Two direct referrals (downline)
  const d1 = await ensureDownlinePartner("downline1.test@prolnk.xyz", "North Dallas HVAC", "HVAC", 4, testUserId);
  const d2 = await ensureDownlinePartner("downline2.test@prolnk.xyz", "Lone Star Electric", "Electrical", 2, testUserId);
  console.log(`✅ Ensured 2 direct referrals (userIds ${d1}, ${d2})`);

  // 3) Sample payouts for the test user (this month)
  await ensurePayout(testUserId, d1, "network_l1", 0.07, 245.0, "paid");
  await ensurePayout(testUserId, d2, "network_l2", 0.04, 88.0, "pending");
  await ensurePayout(testUserId, testUserId, "home_origination", 0.05, 132.5, "pending");
  await ensurePayout(testUserId, d1, "subscription_l1", 0.12, 17.88, "paid");
  console.log("✅ Ensured sample payouts (network_l1, network_l2, home_origination, subscription_l1)");

  console.log("\n──────── FOUNDING NETWORK TEST ────────");
  console.log("URL:      https://prolnk.xyz/partner-login");
  console.log(`Email:    ${TEST_EMAIL}`);
  console.log("Password: FoundingTest2026!");
  console.log("Then open the 'Founding Network' tab in the sidebar.");
  console.log("───────────────────────────────────────");
} catch (e) {
  console.error("❌ Enroll failed:", e.message);
  process.exitCode = 1;
} finally {
  await conn.end();
}
