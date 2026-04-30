/**
 * ProLnk Demo Data Seed Script — Large Scale
 * Seeds 150 DFW partners, 500 jobs, 820 opportunities, $200K+ commissions
 * Run: node seed-demo.mjs
 */
import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

const DB_URL = process.env.DATABASE_URL;
if (!DB_URL) throw new Error("DATABASE_URL not set");

const url = new URL(DB_URL.replace("mysql://", "http://"));
const conn = await mysql.createConnection({
  host: url.hostname,
  port: parseInt(url.port) || 3306,
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1),
  ssl: { rejectUnauthorized: false },
});
console.log("✅ Connected to database");

// ─── Helpers ──────────────────────────────────────────────────────────────────
function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randFloat(min, max, dec = 2) { return parseFloat((Math.random() * (max - min) + min).toFixed(dec)); }
function randGeo(lat, lng, r = 0.12) {
  return { lat: lat + (Math.random() - 0.5) * r * 2, lng: lng + (Math.random() - 0.5) * r * 2 };
}
function weightedRand(items) {
  const total = items.reduce((s, i) => s + i.w, 0);
  let r = Math.random() * total;
  for (const item of items) { r -= item.w; if (r <= 0) return item.v; }
  return items[items.length - 1].v;
}
function daysAgo(n) { const d = new Date(); d.setDate(d.getDate() - n); return d; }

// ─── Reference Data ───────────────────────────────────────────────────────────
const CITIES = [
  { city: "Dallas", lat: 32.7767, lng: -96.7970, zip: "75201" },
  { city: "Fort Worth", lat: 32.7555, lng: -97.3308, zip: "76102" },
  { city: "Plano", lat: 33.0198, lng: -96.6989, zip: "75023" },
  { city: "Arlington", lat: 32.7357, lng: -97.1081, zip: "76010" },
  { city: "Frisco", lat: 33.1507, lng: -96.8236, zip: "75034" },
  { city: "McKinney", lat: 33.1972, lng: -96.6397, zip: "75069" },
  { city: "Irving", lat: 32.8140, lng: -96.9489, zip: "75038" },
  { city: "Garland", lat: 32.9126, lng: -96.6389, zip: "75040" },
  { city: "Grand Prairie", lat: 32.7460, lng: -97.0197, zip: "75050" },
  { city: "Mesquite", lat: 32.7668, lng: -96.5992, zip: "75149" },
  { city: "Carrollton", lat: 32.9537, lng: -96.8903, zip: "75006" },
  { city: "Denton", lat: 33.2148, lng: -97.1331, zip: "76201" },
  { city: "Lewisville", lat: 33.0462, lng: -96.9942, zip: "75029" },
  { city: "Richardson", lat: 32.9483, lng: -96.7299, zip: "75080" },
  { city: "Allen", lat: 33.1032, lng: -96.6705, zip: "75002" },
  { city: "Southlake", lat: 32.9401, lng: -97.1336, zip: "76092" },
  { city: "Flower Mound", lat: 33.0146, lng: -97.0969, zip: "75028" },
  { city: "Grapevine", lat: 32.9343, lng: -97.0781, zip: "76051" },
  { city: "Euless", lat: 32.8371, lng: -97.0819, zip: "76039" },
  { city: "Keller", lat: 32.9343, lng: -97.2289, zip: "76248" },
];

const SERVICES = [
  { type: "HVAC", category: "hvac" },
  { type: "Plumbing", category: "plumbing" },
  { type: "Roofing", category: "roofing" },
  { type: "Electrical", category: "electrical" },
  { type: "Landscaping", category: "landscaping" },
  { type: "Painting", category: "painting" },
  { type: "Flooring", category: "flooring" },
  { type: "Windows & Doors", category: "windows_doors" },
  { type: "Pool & Spa", category: "pool_spa" },
  { type: "Pest Control", category: "pest_control" },
  { type: "Fencing", category: "fencing" },
  { type: "Concrete & Masonry", category: "concrete" },
  { type: "Gutters", category: "gutters" },
  { type: "Insulation", category: "insulation" },
  { type: "Garage Doors", category: "garage_doors" },
];

const TIERS = [
  { v: "scout", w: 35 }, { v: "pro", w: 30 }, { v: "crew", w: 20 },
  { v: "company", w: 12 }, { v: "enterprise", w: 3 },
];

const FIRST = ["James","Michael","Robert","David","William","Richard","Joseph","Thomas","Charles","Christopher","Daniel","Matthew","Anthony","Mark","Donald","Steven","Paul","Andrew","Joshua","Kenneth","Kevin","Brian","George","Timothy","Ronald","Edward","Jason","Jeffrey","Ryan","Jacob","Gary","Nicholas","Eric","Jonathan","Stephen","Larry","Justin","Scott","Brandon","Benjamin","Samuel","Raymond","Gregory","Frank","Alexander","Patrick","Jack","Dennis","Jerry","Tyler","Aaron","Jose","Henry","Adam","Douglas","Nathan","Peter","Zachary","Kyle","Walter","Harold","Jeremy","Ethan","Carl","Keith","Roger","Gerald","Christian","Terry","Sean","Arthur","Austin","Noah","Lawrence","Jesse","Joe","Bryan","Billy","Jordan","Albert","Dylan","Bruce","Willie","Gabriel","Alan","Juan","Logan","Wayne","Ralph","Roy","Eugene","Randy","Vincent","Russell","Louis","Philip","Bobby","Johnny","Bradley","Maria","Jennifer","Lisa","Sandra","Patricia","Barbara","Elizabeth","Susan","Jessica","Sarah","Karen","Nancy","Margaret","Betty","Dorothy","Lisa","Helen","Sharon","Donna","Carol"];

const LAST = ["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez","Hernandez","Lopez","Gonzalez","Wilson","Anderson","Thomas","Taylor","Moore","Jackson","Martin","Lee","Perez","Thompson","White","Harris","Sanchez","Clark","Ramirez","Lewis","Robinson","Walker","Young","Allen","King","Wright","Scott","Torres","Nguyen","Hill","Flores","Green","Adams","Nelson","Baker","Hall","Rivera","Campbell","Mitchell","Carter","Roberts","Turner","Phillips","Evans","Collins","Stewart","Morris","Morgan","Reed","Cook","Bell","Murphy","Bailey","Cooper","Richardson","Cox","Howard","Ward","Peterson","Gray","Ruiz","James","Watson","Brooks","Kelly","Sanders","Price","Bennett","Wood","Barnes","Ross","Henderson","Coleman","Jenkins","Perry","Powell","Long","Patterson","Hughes","Washington","Butler","Simmons","Foster","Gonzales","Bryant","Alexander","Russell","Griffin","Diaz","Hayes","Myers","Ford","Hamilton","Graham","Sullivan","Wallace","Woods","Cole","West","Jordan","Owens","Reynolds","Fisher","Ellis","Harrison","Gibson","McDonald","Cruz","Marshall","Ortiz","Gomez","Murray","Freeman","Wells","Webb","Simpson","Stevens","Tucker","Porter","Hunter","Hicks","Crawford","Henry","Boyd","Mason","Morales","Kennedy","Warren","Dixon","Ramos","Reyes","Burns","Gordon","Shaw","Holmes","Rice","Robertson","Henderson"];

const SUFFIXES = ["Services","Solutions","Pros","Experts","Team","Group","LLC","Co.","& Sons","Contractors","Home Services","Property Services","Specialists","Works","Plus"];

const STREET_NAMES = ["Oak","Elm","Maple","Cedar","Pine","Main","First","Second","Park","Lake","Sunset","Highland","Valley","Ridge","Spring","Forest","Meadow","River","Creek","Hill","Stone","Willow","Birch","Ash","Walnut","Pecan","Magnolia","Mockingbird","Preston","Legacy","Coit","Josey","Midway","Belt Line","Frankford","Campbell","Arapaho","Spring Valley","Keller Springs","Marsh"];

const STREET_TYPES = ["St","Ave","Blvd","Dr","Ln","Way","Ct","Rd","Pkwy","Cir","Pl","Trail"];

const OPP_TYPES = [
  { type: "HVAC Replacement", category: "hvac", min: 3500, max: 12000, rate: 0.12 },
  { type: "Water Heater Replacement", category: "plumbing", min: 800, max: 2500, rate: 0.12 },
  { type: "Roof Repair", category: "roofing", min: 1200, max: 18000, rate: 0.10 },
  { type: "Electrical Panel Upgrade", category: "electrical", min: 2000, max: 6000, rate: 0.12 },
  { type: "Lawn Renovation", category: "landscaping", min: 500, max: 4000, rate: 0.15 },
  { type: "Interior Paint Job", category: "painting", min: 800, max: 5000, rate: 0.15 },
  { type: "Hardwood Floor Refinish", category: "flooring", min: 1200, max: 4500, rate: 0.12 },
  { type: "Window Replacement", category: "windows_doors", min: 3000, max: 15000, rate: 0.10 },
  { type: "Pool Resurfacing", category: "pool_spa", min: 4000, max: 12000, rate: 0.12 },
  { type: "Termite Treatment", category: "pest_control", min: 600, max: 2500, rate: 0.15 },
  { type: "Fence Replacement", category: "fencing", min: 1500, max: 8000, rate: 0.15 },
  { type: "Driveway Replacement", category: "concrete", min: 3000, max: 10000, rate: 0.12 },
  { type: "Gutter Replacement", category: "gutters", min: 800, max: 3000, rate: 0.15 },
  { type: "Attic Insulation", category: "insulation", min: 1200, max: 4000, rate: 0.12 },
  { type: "Garage Door Replacement", category: "garage_doors", min: 800, max: 3500, rate: 0.15 },
  { type: "Broken Mailbox Replacement", category: "handyman", min: 150, max: 600, rate: 0.15 },
  { type: "Cracked Sidewalk Repair", category: "concrete", min: 400, max: 2000, rate: 0.12 },
  { type: "Deck Repair & Staining", category: "painting", min: 800, max: 4000, rate: 0.15 },
  { type: "Sprinkler System Repair", category: "landscaping", min: 300, max: 1500, rate: 0.15 },
  { type: "Storm Drain Cleaning", category: "plumbing", min: 200, max: 800, rate: 0.12 },
];

const OPP_DESCS = [
  "AI detected visible wear and damage — high confidence based on multiple photo angles.",
  "Moderate confidence — recommend on-site assessment to confirm scope.",
  "Strong signal from photo analysis. Customer confirmed interest during visit.",
  "AI flagged this as urgent — safety concern identified in photo.",
  "Routine maintenance opportunity detected. Low urgency but high conversion likelihood.",
  "Storm damage indicators present. Insurance claim may apply.",
  "End-of-life equipment detected. Replacement likely within 12 months.",
  "Aesthetic improvement opportunity — high homeowner interest based on property profile.",
];

const OPP_STATUSES = [
  { v: "converted", w: 22 }, { v: "accepted", w: 18 }, { v: "sent", w: 22 },
  { v: "pending", w: 18 }, { v: "declined", w: 12 }, { v: "expired", w: 8 },
];

const ADMIN_STATUSES = [
  { v: "approved", w: 65 }, { v: "pending_review", w: 28 }, { v: "rejected", w: 7 },
];

// ─── Step 1: Clear existing demo data ────────────────────────────────────────
console.log("🗑️  Clearing existing demo data...");
await conn.execute("SET FOREIGN_KEY_CHECKS = 0");
await conn.execute("DELETE FROM commissions WHERE opportunityId IS NOT NULL");
await conn.execute("DELETE FROM opportunities WHERE id > 0");
await conn.execute("DELETE FROM jobs WHERE id > 0");
await conn.execute("DELETE FROM partners WHERE userId IS NULL");
await conn.execute("SET FOREIGN_KEY_CHECKS = 1");
console.log("✅ Cleared");

// ─── Step 2: Seed 150 Partners ────────────────────────────────────────────────
console.log("👷 Seeding 150 DFW partners...");
const partnerIds = [];

for (let i = 0; i < 150; i++) {
  const fn = rand(FIRST);
  const ln = rand(LAST);
  const svc = rand(SERVICES);
  const city = rand(CITIES);
  const tier = weightedRand(TIERS);
  const geo = randGeo(city.lat, city.lng);
  const companyName = `${ln} ${svc.type} ${rand(SUFFIXES)}`;
  const email = `${fn.toLowerCase()}${i}@${svc.category}pro${randInt(1,99)}.com`;
  const phone = `${rand(["214","972","469","817","940"])}${randInt(100,999)}${randInt(1000,9999)}`;
  const daysActive = randInt(14, 400);
  const jobsLogged = randInt(3, 140);
  const oppsGenerated = Math.floor(jobsLogged * randFloat(1.5, 4.0));
  const totalEarned = randFloat(400, 48000, 2);
  const rating = randFloat(3.7, 5.0, 2);
  const reviewCount = randInt(1, 95);
  const pps = randInt(15, 105);

  const [result] = await conn.execute(
    `INSERT INTO partners (
      businessName, businessType, serviceArea, contactName, contactEmail, contactPhone,
      serviceAreaLat, serviceAreaLng, serviceRadiusMiles,
      status, tier, subscriptionPlan, trialStatus,
      jobsLogged, opportunitiesGenerated, referralCount, partnersReferred,
      totalCommissionEarned, totalCommissionPaid,
      rating, reviewCount, priorityScore, avgLeadResponseHours,
      platformFeeRate, referralCommissionRate, commissionRate,
      stripeConnectStatus, isFoundingPartner, isExempt,
      appliedAt, approvedAt, updatedAt,
      notificationPrefs
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      companyName, svc.type,
      JSON.stringify([city.city]),
      `${fn} ${ln}`, email, phone,
      geo.lat.toFixed(6), geo.lng.toFixed(6), randInt(10, 35),
      "approved",
      tier, // subscriptionPlan same enum as tier
      tier, "active",
      jobsLogged, oppsGenerated, randInt(0, 28), randInt(0, 10),
      totalEarned.toFixed(2), (totalEarned * 0.65).toFixed(2),
      rating.toFixed(2), reviewCount, pps,
      randFloat(0.5, 9.0, 2),
      "0.1200", "0.0480", "0.4000",
      "not_connected", 0, 0,
      daysAgo(daysActive + 7), daysAgo(daysActive), new Date(),
      JSON.stringify({ newLead: true, commissionPaid: true, emailEnabled: true, smsEnabled: true }),
    ]
  );
  partnerIds.push(result.insertId);
}
console.log(`✅ Seeded ${partnerIds.length} partners`);

// ─── Step 3: Seed 500 Jobs ────────────────────────────────────────────────────
console.log("🔧 Seeding 500 jobs...");
const jobIds = [];
const JOB_TYPES = [
  "HVAC inspection", "Plumbing leak check", "Roof inspection", "Electrical panel audit",
  "Lawn care visit", "Interior painting", "Flooring assessment", "Window replacement consult",
  "Pool maintenance", "Pest inspection", "Fence repair", "Driveway crack assessment",
  "Gutter cleaning", "Attic insulation check", "Garage door service",
  "Handyman repair", "Pressure washing", "Deck staining", "Sprinkler repair", "General inspection",
];
const JOB_STATUSES = [
  { v: "opportunities_sent", w: 55 }, { v: "analyzed", w: 25 }, { v: "logged", w: 20 },
];

for (let i = 0; i < 500; i++) {
  const partnerId = rand(partnerIds);
  const city = rand(CITIES);
  const geo = randGeo(city.lat, city.lng);
  const daysBack = randInt(1, 200);
  const status = weightedRand(JOB_STATUSES);
  const jobType = rand(JOB_TYPES);
  const addr = `${randInt(100, 9999)} ${rand(STREET_NAMES)} ${rand(STREET_TYPES)}`;

  const [result] = await conn.execute(
    `INSERT INTO jobs (
      partnerId, serviceAddress, serviceAddressLat, serviceAddressLng,
      serviceType, notes, photoUrls, aiAnalysisStatus, status, createdAt, updatedAt
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
    [
      partnerId,
      `${addr}, ${city.city}, TX ${city.zip}`,
      geo.lat.toFixed(6), geo.lng.toFixed(6),
      jobType,
      `${jobType} at residential property. ${rand(["Customer reported minor issues.", "Routine maintenance visit.", "Customer reported urgent concern.", "Follow-up inspection.", "Seasonal service call."])}`,
      JSON.stringify([]),
      status === "logged" ? "pending" : "complete",
      status,
      daysAgo(daysBack), daysAgo(daysBack),
    ]
  );
  jobIds.push(result.insertId);
}
console.log(`✅ Seeded ${jobIds.length} jobs`);

// ─── Step 4: Seed 820 Opportunities ──────────────────────────────────────────
console.log("💡 Seeding 820 opportunities...");
const opportunityIds = [];

for (let i = 0; i < 820; i++) {
  const jobId = rand(jobIds);
  const sourcePartnerId = rand(partnerIds);
  const receivingPartnerId = rand(partnerIds);
  const opp = rand(OPP_TYPES);
  const status = weightedRand(OPP_STATUSES);
  const adminStatus = weightedRand(ADMIN_STATUSES);
  const confidence = randFloat(0.52, 0.98, 3);
  const estVal = randFloat(opp.min, opp.max, 2);
  const actualVal = status === "converted" ? randFloat(estVal * 0.75, estVal * 1.25, 2) : null;
  const platformFee = actualVal ? (actualVal * opp.rate).toFixed(2) : null;
  const referralComm = actualVal ? (actualVal * opp.rate * 0.4).toFixed(2) : null;
  const proLinkNet = actualVal && platformFee && referralComm
    ? (parseFloat(platformFee) - parseFloat(referralComm)).toFixed(2) : null;
  const daysBack = randInt(1, 200);
  const sentAt = ["sent","accepted","declined","converted","expired"].includes(status) ? daysAgo(daysBack) : null;
  const acceptedAt = ["accepted","converted"].includes(status) ? daysAgo(daysBack - 1) : null;
  const closedAt = status === "converted" ? daysAgo(Math.max(1, daysBack - randInt(2, 10))) : null;
  const adminReviewedAt = adminStatus !== "pending_review" ? daysAgo(daysBack + 1) : null;

  const [result] = await conn.execute(
    `INSERT INTO opportunities (
      jobId, sourcePartnerId, receivingPartnerId,
      opportunityType, opportunityCategory, description,
      aiConfidence, adminReviewStatus, adminReviewedAt,
      status, estimatedJobValue, actualJobValue,
      platformFeeAmount, referralCommissionAmount, proLinkNetAmount,
      jobClosedAt, sentAt, acceptedAt, createdAt, updatedAt
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      jobId, sourcePartnerId, receivingPartnerId,
      opp.type, opp.category,
      `${opp.type}: ${rand(OPP_DESCS)}`,
      confidence.toFixed(3),
      adminStatus, adminReviewedAt,
      status, estVal.toFixed(2),
      actualVal ? actualVal.toFixed(2) : null,
      platformFee, referralComm, proLinkNet,
      closedAt, sentAt, acceptedAt,
      daysAgo(daysBack + 2), daysAgo(daysBack + 2),
    ]
  );
  opportunityIds.push(result.insertId);
}
console.log(`✅ Seeded ${opportunityIds.length} opportunities`);

// ─── Step 5: Seed Commission Records ─────────────────────────────────────────
console.log("💰 Seeding commission records...");
let commCount = 0;
let commTotal = 0;

const [convertedOpps] = await conn.execute(
  `SELECT id, sourcePartnerId, receivingPartnerId, actualJobValue,
          platformFeeAmount, referralCommissionAmount, proLinkNetAmount, jobClosedAt
   FROM opportunities WHERE status = 'converted' AND actualJobValue IS NOT NULL`
);

for (const opp of convertedOpps) {
  const paid = Math.random() > 0.28;
  const paidAt = paid ? daysAgo(randInt(1, 45)) : null;

  if (opp.platformFeeAmount && parseFloat(opp.platformFeeAmount) > 0) {
    await conn.execute(
      `INSERT INTO commissions (partnerId, opportunityId, payingPartnerId, receivingPartnerId, commissionType, amount, jobValue, feeRate, description, paid, paidAt, createdAt, updatedAt)
       VALUES (?,?,?,NULL,'platform_fee',?,?,'0.1200',?,?,?,?,?)`,
      [opp.receivingPartnerId, opp.id, opp.receivingPartnerId, opp.platformFeeAmount, opp.actualJobValue,
       "Platform fee (12% of job value)", paid, paidAt, opp.jobClosedAt, opp.jobClosedAt]
    );
    commCount++;
    commTotal += parseFloat(opp.platformFeeAmount);
  }

  if (opp.referralCommissionAmount && parseFloat(opp.referralCommissionAmount) > 0
      && opp.sourcePartnerId !== opp.receivingPartnerId) {
    await conn.execute(
      `INSERT INTO commissions (partnerId, opportunityId, payingPartnerId, receivingPartnerId, commissionType, amount, jobValue, feeRate, description, paid, paidAt, createdAt, updatedAt)
       VALUES (?,?,?,?,'referral_commission',?,?,'0.0480',?,?,?,?,?)`,
      [opp.sourcePartnerId, opp.id, opp.receivingPartnerId, opp.sourcePartnerId,
       opp.referralCommissionAmount, opp.actualJobValue,
       "Referral commission (4.8% to referring partner)", paid, paidAt, opp.jobClosedAt, opp.jobClosedAt]
    );
    commCount++;
    commTotal += parseFloat(opp.referralCommissionAmount);
  }
}
console.log(`✅ Seeded ${commCount} commission records ($${commTotal.toFixed(2)} total)`);

// ─── Step 6: Summary ─────────────────────────────────────────────────────────
const [[{ pc }]] = await conn.execute("SELECT COUNT(*) as pc FROM partners");
const [[{ jc }]] = await conn.execute("SELECT COUNT(*) as jc FROM jobs");
const [[{ oc }]] = await conn.execute("SELECT COUNT(*) as oc FROM opportunities");
const [[{ cc }]] = await conn.execute("SELECT COUNT(*) as cc FROM commissions");
const [[{ tv }]] = await conn.execute("SELECT COALESCE(SUM(amount),0) as tv FROM commissions");

console.log("\n🎉 Demo data seed complete!");
console.log(`   Partners:      ${pc}`);
console.log(`   Jobs:          ${jc}`);
console.log(`   Opportunities: ${oc}`);
console.log(`   Commissions:   ${cc} ($${parseFloat(tv).toFixed(2)} total)`);

await conn.end();
