/**
 * seed-exchange.mjs
 * Seeds 8 realistic DFW exchange job postings using the admin partner account.
 * Run: node seed-exchange.mjs
 */
import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();

const DB_URL = process.env.DATABASE_URL;
if (!DB_URL) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

// Parse mysql2 connection string
function parseUrl(url) {
  const u = new URL(url);
  return {
    host: u.hostname,
    port: parseInt(u.port || "3306"),
    user: u.username,
    password: u.password,
    database: u.pathname.replace("/", ""),
    ssl: { rejectUnauthorized: false },
  };
}

const SEED_JOBS = [
  {
    title: "Full HVAC System Replacement — 3,200 sq ft Home",
    description: "Homeowner needs complete HVAC system replacement including new 5-ton Carrier unit, all ductwork inspection/sealing, and smart thermostat installation. Home is in Frisco. Prefer partner with Carrier certification.",
    jobType: "residential",
    tradeCategory: "HVAC",
    location: "Frisco, TX 75034",
    totalValue: "8500.00",
    brokerMargin: "10.00",
    clientName: "Sarah M.",
    isCommercial: false,
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    scopeItems: JSON.stringify(["Remove old unit", "Install 5-ton Carrier XC21", "Duct inspection & sealing", "Nest thermostat install", "City permit & inspection"]),
  },
  {
    title: "Kitchen & 2 Bath Full Remodel — Plano Townhome",
    description: "Complete kitchen remodel (new cabinets, countertops, backsplash, sink/faucet) plus 2 full bathroom remodels. Homeowner has materials selected. Need licensed general contractor with plumbing sub.",
    jobType: "residential",
    tradeCategory: "Remodeling",
    location: "Plano, TX 75025",
    totalValue: "42000.00",
    brokerMargin: "8.00",
    clientName: "The Johnson Family",
    isCommercial: false,
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    scopeItems: JSON.stringify(["Demo existing kitchen", "Install new cabinets (pre-ordered)", "Quartz countertops", "Tile backsplash", "2 full bath remodels", "Plumbing rough-in"]),
  },
  {
    title: "Commercial Roof Replacement — 8,000 sq ft Strip Mall",
    description: "Strip mall in Allen needs full TPO roof replacement. Current roof is 18 years old with multiple active leaks. 3 units occupied. Need licensed commercial roofing contractor with TPO experience.",
    jobType: "commercial",
    tradeCategory: "Roofing",
    location: "Allen, TX 75013",
    totalValue: "67000.00",
    brokerMargin: "9.00",
    clientName: "Allen Commerce LLC",
    isCommercial: true,
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    scopeItems: JSON.stringify(["Remove existing BUR roof", "Install 60-mil TPO membrane", "New insulation R-25", "Flashing & penetration sealing", "10-year warranty"]),
  },
  {
    title: "Electrical Panel Upgrade + EV Charger Install",
    description: "Homeowner in McKinney needs 200A panel upgrade from 100A, plus installation of Level 2 EV charger (Tesla Wall Connector) in garage. Must be licensed electrician.",
    jobType: "residential",
    tradeCategory: "Electrical",
    location: "McKinney, TX 75070",
    totalValue: "4200.00",
    brokerMargin: "10.00",
    clientName: "David R.",
    isCommercial: false,
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    scopeItems: JSON.stringify(["Remove 100A panel", "Install 200A Square D panel", "Update breakers", "Install 50A circuit for EV", "Tesla Wall Connector install", "City permit"]),
  },
  {
    title: "Foundation Repair — Pier & Beam Leveling",
    description: "Home in Garland has significant foundation movement. Engineering report shows 11 piers needed. Homeowner has engineering report in hand. Need licensed foundation repair company.",
    jobType: "residential",
    tradeCategory: "Foundation",
    location: "Garland, TX 75040",
    totalValue: "14500.00",
    brokerMargin: "8.00",
    clientName: "Maria T.",
    isCommercial: false,
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    scopeItems: JSON.stringify(["Install 11 steel piers", "Lift & level structure", "Interior pier access", "Transferable lifetime warranty", "Post-repair inspection"]),
  },
  {
    title: "Whole-Home Water Filtration + Softener System",
    description: "New construction home in Prosper needs whole-home water filtration system installed. Homeowner wants RO under sink + whole-home softener. Plumbing rough-in already done.",
    jobType: "residential",
    tradeCategory: "Plumbing",
    location: "Prosper, TX 75078",
    totalValue: "3800.00",
    brokerMargin: "12.00",
    clientName: "The Williams Family",
    isCommercial: false,
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    scopeItems: JSON.stringify(["Whole-home water softener install", "RO system under kitchen sink", "Connect to existing rough-in", "Water quality test before/after"]),
  },
  {
    title: "Office Buildout — 2,400 sq ft Dental Practice",
    description: "Dental practice in Richardson needs full commercial buildout: framing, drywall, plumbing for 6 operatories, electrical for dental equipment, flooring, and paint. Tenant improvement project.",
    jobType: "commercial",
    tradeCategory: "Commercial Construction",
    location: "Richardson, TX 75080",
    totalValue: "185000.00",
    brokerMargin: "7.00",
    clientName: "Bright Smiles Dental",
    isCommercial: true,
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    scopeItems: JSON.stringify(["Framing & drywall", "6 operatory plumbing rough-in", "Dental equipment electrical", "LVT flooring throughout", "Paint & finishes", "City commercial permit"]),
  },
  {
    title: "Fence Replacement — 280 Linear Feet Cedar",
    description: "Homeowner in Lewisville needs full fence replacement. 280 LF of 6ft cedar privacy fence. Old fence is down from recent storm. HOA approved cedar with cap rail. Urgent — no fence currently.",
    jobType: "residential",
    tradeCategory: "Fencing",
    location: "Lewisville, TX 75067",
    totalValue: "9200.00",
    brokerMargin: "10.00",
    clientName: "Robert K.",
    isCommercial: false,
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    scopeItems: JSON.stringify(["Remove old fence debris", "Install 280 LF 6ft cedar", "Cedar cap rail", "2 walk gates + 1 double drive gate", "Post concrete footings"]),
  },
];

async function main() {
  const conn = await mysql.createConnection(parseUrl(DB_URL));
  
  // Get the first approved partner to use as the poster (or create a system partner)
  const [partners] = await conn.execute(
    "SELECT id FROM partners WHERE status = 'approved' LIMIT 1"
  );
  
  if (!partners || partners.length === 0) {
    console.log("No approved partner found. Creating a system/demo partner entry...");
    // Use partner id 1 as fallback — the admin will have one
    const [allPartners] = await conn.execute("SELECT id FROM partners LIMIT 1");
    if (!allPartners || allPartners.length === 0) {
      console.error("No partners in DB at all. Please approve at least one partner first.");
      await conn.end();
      process.exit(1);
    }
  }
  
  const [rows] = await conn.execute("SELECT id FROM partners LIMIT 1");
  const partnerId = rows[0]?.id;
  
  if (!partnerId) {
    console.error("Could not find a partner ID to use for seeding.");
    await conn.end();
    process.exit(1);
  }
  
  console.log(`Using partner ID ${partnerId} for seed jobs...`);
  
  // Check if already seeded
  const [existing] = await conn.execute(
    "SELECT COUNT(*) as cnt FROM exchangeJobs WHERE postedByPartnerId = ?",
    [partnerId]
  );
  
  if (existing[0]?.cnt > 0) {
    console.log(`Exchange already has ${existing[0].cnt} jobs for this partner. Skipping seed.`);
    await conn.end();
    return;
  }
  
  for (const job of SEED_JOBS) {
    await conn.execute(
      `INSERT INTO exchangeJobs 
        (postedByPartnerId, title, description, jobType, tradeCategory, location, totalValue, brokerMargin, deadline, status, scopeItems, clientName, isCommercial)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'open', ?, ?, ?)`,
      [
        partnerId,
        job.title,
        job.description,
        job.jobType,
        job.tradeCategory,
        job.location,
        job.totalValue,
        job.brokerMargin,
        job.deadline,
        job.scopeItems,
        job.clientName,
        job.isCommercial ? 1 : 0,
      ]
    );
    console.log(`✓ Seeded: ${job.title}`);
  }
  
  console.log(`\n✅ Seeded ${SEED_JOBS.length} exchange jobs successfully.`);
  await conn.end();
}

main().catch(err => {
  console.error("Seed failed:", err);
  process.exit(1);
});
