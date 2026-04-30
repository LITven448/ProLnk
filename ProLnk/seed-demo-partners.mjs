/**
 * ProLink DFW Demo Partner Seed Script
 * Seeds 50 realistic DFW-area partners with leads, referrals, and commissions
 * Run: node seed-demo-partners.mjs
 */

import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();

const DB_URL = process.env.DATABASE_URL;
if (!DB_URL) throw new Error("DATABASE_URL not set");

// Parse MySQL URL
function parseMysqlUrl(url) {
  const u = new URL(url);
  return {
    host: u.hostname,
    port: parseInt(u.port || "3306"),
    user: u.username,
    password: u.password,
    database: u.pathname.slice(1),
    ssl: { rejectUnauthorized: false },
  };
}

const conn = await mysql.createConnection(parseMysqlUrl(DB_URL));

// ─── 50 DFW Partners ──────────────────────────────────────────────────────────
const PARTNERS = [
  // Lawn & Landscaping (10)
  { businessName: "Green Thumb Lawn Care", businessType: "Lawn Care", serviceArea: "Plano, TX", lat: 33.0198, lng: -96.6989, tier: "gold", referralCount: 47, leadsCount: 31, jobsLogged: 89, totalCommissionEarned: "1842.50", totalCommissionPaid: "620.00", contactName: "Marcus Webb", contactEmail: "marcus@greenthumbdfw.com", contactPhone: "214-555-0101", website: "greenthumbdfw.com" },
  { businessName: "Lone Star Landscaping", businessType: "Landscaping", serviceArea: "Frisco, TX", lat: 33.1507, lng: -96.8236, tier: "gold", referralCount: 38, leadsCount: 22, jobsLogged: 71, totalCommissionEarned: "1540.00", totalCommissionPaid: "480.00", contactName: "Jake Morales", contactEmail: "jake@lonestarlandscaping.com", contactPhone: "972-555-0102", website: "lonestarlandscaping.com" },
  { businessName: "DFW Turf Masters", businessType: "Lawn Care", serviceArea: "Allen, TX", lat: 33.1032, lng: -96.6706, tier: "silver", referralCount: 22, leadsCount: 18, jobsLogged: 44, totalCommissionEarned: "820.00", totalCommissionPaid: "310.00", contactName: "Derrick Holt", contactEmail: "derrick@dfwturfmasters.com", contactPhone: "972-555-0103" },
  { businessName: "Prestige Outdoor Living", businessType: "Landscaping", serviceArea: "McKinney, TX", lat: 33.1972, lng: -96.6397, tier: "gold", referralCount: 41, leadsCount: 28, jobsLogged: 66, totalCommissionEarned: "1680.00", totalCommissionPaid: "540.00", contactName: "Tina Reyes", contactEmail: "tina@prestigeoutdoor.com", contactPhone: "214-555-0104" },
  { businessName: "Emerald Lawn Solutions", businessType: "Lawn Care", serviceArea: "Garland, TX", lat: 32.9126, lng: -96.6389, tier: "silver", referralCount: 19, leadsCount: 14, jobsLogged: 38, totalCommissionEarned: "640.00", totalCommissionPaid: "220.00", contactName: "Carlos Vega", contactEmail: "carlos@emeraldlawn.com", contactPhone: "972-555-0105" },
  { businessName: "North Texas Irrigation", businessType: "Irrigation", serviceArea: "Lewisville, TX", lat: 33.0462, lng: -96.9942, tier: "bronze", referralCount: 8, leadsCount: 11, jobsLogged: 22, totalCommissionEarned: "280.00", totalCommissionPaid: "90.00", contactName: "Steve Nguyen", contactEmail: "steve@ntxirrigation.com", contactPhone: "972-555-0106" },
  { businessName: "Backyard Bliss Design", businessType: "Landscape Design", serviceArea: "Southlake, TX", lat: 32.9415, lng: -97.1336, tier: "gold", referralCount: 33, leadsCount: 19, jobsLogged: 55, totalCommissionEarned: "1320.00", totalCommissionPaid: "420.00", contactName: "Amanda Foster", contactEmail: "amanda@backyardbliss.com", contactPhone: "817-555-0107" },
  { businessName: "Collin County Lawn Pros", businessType: "Lawn Care", serviceArea: "Wylie, TX", lat: 33.0151, lng: -96.5388, tier: "bronze", referralCount: 6, leadsCount: 9, jobsLogged: 18, totalCommissionEarned: "180.00", totalCommissionPaid: "60.00", contactName: "Brian Simmons", contactEmail: "brian@collincountylawn.com", contactPhone: "972-555-0108" },
  { businessName: "Texas Sod & Seed", businessType: "Lawn Care", serviceArea: "Denton, TX", lat: 33.2148, lng: -97.1331, tier: "silver", referralCount: 17, leadsCount: 13, jobsLogged: 31, totalCommissionEarned: "560.00", totalCommissionPaid: "180.00", contactName: "Mike Garrison", contactEmail: "mike@texassod.com", contactPhone: "940-555-0109" },
  { businessName: "Arbor Day Tree Service", businessType: "Tree Service", serviceArea: "Irving, TX", lat: 32.8140, lng: -96.9489, tier: "silver", referralCount: 24, leadsCount: 16, jobsLogged: 42, totalCommissionEarned: "980.00", totalCommissionPaid: "320.00", contactName: "Larry Owens", contactEmail: "larry@arbordaytree.com", contactPhone: "972-555-0110" },

  // HVAC & Plumbing (10)
  { businessName: "Arctic Air HVAC", businessType: "HVAC", serviceArea: "Plano, TX", lat: 33.0298, lng: -96.7089, tier: "gold", referralCount: 52, leadsCount: 41, jobsLogged: 98, totalCommissionEarned: "2840.00", totalCommissionPaid: "920.00", contactName: "Phil Hartman", contactEmail: "phil@arcticairhvac.com", contactPhone: "214-555-0111", website: "arcticairhvac.com" },
  { businessName: "Metroplex Mechanical", businessType: "HVAC", serviceArea: "Dallas, TX", lat: 32.7767, lng: -96.7970, tier: "gold", referralCount: 44, leadsCount: 35, jobsLogged: 82, totalCommissionEarned: "2240.00", totalCommissionPaid: "740.00", contactName: "Sandra Kim", contactEmail: "sandra@metroplexmech.com", contactPhone: "214-555-0112" },
  { businessName: "Flow Right Plumbing", businessType: "Plumbing", serviceArea: "Frisco, TX", lat: 33.1607, lng: -96.8136, tier: "silver", referralCount: 28, leadsCount: 22, jobsLogged: 54, totalCommissionEarned: "1120.00", totalCommissionPaid: "380.00", contactName: "Tony Russo", contactEmail: "tony@flowrightplumbing.com", contactPhone: "972-555-0113" },
  { businessName: "DFW Comfort Systems", businessType: "HVAC", serviceArea: "Richardson, TX", lat: 32.9483, lng: -96.7299, tier: "silver", referralCount: 21, leadsCount: 17, jobsLogged: 40, totalCommissionEarned: "840.00", totalCommissionPaid: "280.00", contactName: "Greg Powell", contactEmail: "greg@dfwcomfort.com", contactPhone: "972-555-0114" },
  { businessName: "Rapid Response Plumbing", businessType: "Plumbing", serviceArea: "Garland, TX", lat: 32.9226, lng: -96.6489, tier: "bronze", referralCount: 9, leadsCount: 12, jobsLogged: 24, totalCommissionEarned: "320.00", totalCommissionPaid: "100.00", contactName: "Ray Castillo", contactEmail: "ray@rapidresponseplumbing.com", contactPhone: "972-555-0115" },
  { businessName: "Premier Air Solutions", businessType: "HVAC", serviceArea: "McKinney, TX", lat: 33.2072, lng: -96.6497, tier: "gold", referralCount: 39, leadsCount: 29, jobsLogged: 70, totalCommissionEarned: "1960.00", totalCommissionPaid: "640.00", contactName: "Diana Chen", contactEmail: "diana@premierairsolutions.com", contactPhone: "214-555-0116" },
  { businessName: "Lone Star Plumbing Co", businessType: "Plumbing", serviceArea: "Allen, TX", lat: 33.1132, lng: -96.6806, tier: "silver", referralCount: 16, leadsCount: 14, jobsLogged: 32, totalCommissionEarned: "640.00", totalCommissionPaid: "210.00", contactName: "Kevin Walsh", contactEmail: "kevin@lonestarplumbing.com", contactPhone: "972-555-0117" },
  { businessName: "Collin HVAC Experts", businessType: "HVAC", serviceArea: "Wylie, TX", lat: 33.0251, lng: -96.5488, tier: "bronze", referralCount: 7, leadsCount: 10, jobsLogged: 19, totalCommissionEarned: "220.00", totalCommissionPaid: "70.00", contactName: "Nathan Brooks", contactEmail: "nathan@collinhvac.com", contactPhone: "972-555-0118" },
  { businessName: "Pipe Masters DFW", businessType: "Plumbing", serviceArea: "Lewisville, TX", lat: 33.0562, lng: -96.9842, tier: "silver", referralCount: 20, leadsCount: 15, jobsLogged: 37, totalCommissionEarned: "760.00", totalCommissionPaid: "250.00", contactName: "Hector Flores", contactEmail: "hector@pipemastersdfw.com", contactPhone: "972-555-0119" },
  { businessName: "North Texas Heating & Air", businessType: "HVAC", serviceArea: "Denton, TX", lat: 33.2248, lng: -97.1231, tier: "silver", referralCount: 18, leadsCount: 13, jobsLogged: 33, totalCommissionEarned: "680.00", totalCommissionPaid: "220.00", contactName: "Pam Whitfield", contactEmail: "pam@ntxheating.com", contactPhone: "940-555-0120" },

  // Pest Control & Pool (8)
  { businessName: "Bug Busters DFW", businessType: "Pest Control", serviceArea: "Plano, TX", lat: 33.0098, lng: -96.7189, tier: "gold", referralCount: 36, leadsCount: 28, jobsLogged: 64, totalCommissionEarned: "1440.00", totalCommissionPaid: "480.00", contactName: "Dennis Larson", contactEmail: "dennis@bugbustersdfw.com", contactPhone: "214-555-0121" },
  { businessName: "Termite Terminators", businessType: "Pest Control", serviceArea: "Dallas, TX", lat: 32.7867, lng: -96.7870, tier: "silver", referralCount: 23, leadsCount: 18, jobsLogged: 45, totalCommissionEarned: "920.00", totalCommissionPaid: "300.00", contactName: "Carla Mendez", contactEmail: "carla@termiteterminators.com", contactPhone: "214-555-0122" },
  { businessName: "Crystal Clear Pools", businessType: "Pool Service", serviceArea: "Frisco, TX", lat: 33.1707, lng: -96.8036, tier: "gold", referralCount: 42, leadsCount: 31, jobsLogged: 76, totalCommissionEarned: "1680.00", totalCommissionPaid: "560.00", contactName: "Jason Park", contactEmail: "jason@crystalclearpools.com", contactPhone: "972-555-0123" },
  { businessName: "Blue Wave Pool Care", businessType: "Pool Service", serviceArea: "Allen, TX", lat: 33.1232, lng: -96.6606, tier: "silver", referralCount: 25, leadsCount: 19, jobsLogged: 48, totalCommissionEarned: "1000.00", totalCommissionPaid: "330.00", contactName: "Rachel Turner", contactEmail: "rachel@bluewavepool.com", contactPhone: "972-555-0124" },
  { businessName: "Mosquito Shield DFW", businessType: "Pest Control", serviceArea: "McKinney, TX", lat: 33.1872, lng: -96.6597, tier: "bronze", referralCount: 10, leadsCount: 13, jobsLogged: 26, totalCommissionEarned: "340.00", totalCommissionPaid: "110.00", contactName: "Tom Garrett", contactEmail: "tom@mosquitoshielddfw.com", contactPhone: "214-555-0125" },
  { businessName: "Aqua Tech Pool Service", businessType: "Pool Service", serviceArea: "Southlake, TX", lat: 32.9515, lng: -97.1236, tier: "gold", referralCount: 35, leadsCount: 26, jobsLogged: 60, totalCommissionEarned: "1400.00", totalCommissionPaid: "460.00", contactName: "Wendy Hoffman", contactEmail: "wendy@aquatechpool.com", contactPhone: "817-555-0126" },
  { businessName: "Critter Control North TX", businessType: "Pest Control", serviceArea: "Lewisville, TX", lat: 33.0362, lng: -97.0042, tier: "silver", referralCount: 14, leadsCount: 11, jobsLogged: 28, totalCommissionEarned: "520.00", totalCommissionPaid: "170.00", contactName: "Ed Thornton", contactEmail: "ed@crittercontroltx.com", contactPhone: "972-555-0127" },
  { businessName: "DFW Pool Builders", businessType: "Pool Construction", serviceArea: "Prosper, TX", lat: 33.2362, lng: -96.8000, tier: "gold", referralCount: 29, leadsCount: 21, jobsLogged: 52, totalCommissionEarned: "2800.00", totalCommissionPaid: "900.00", contactName: "Mark Sullivan", contactEmail: "mark@dfwpoolbuilders.com", contactPhone: "972-555-0128" },

  // Cleaning & Restoration (7)
  { businessName: "Spotless Home Cleaning", businessType: "House Cleaning", serviceArea: "Plano, TX", lat: 33.0398, lng: -96.6889, tier: "silver", referralCount: 26, leadsCount: 20, jobsLogged: 50, totalCommissionEarned: "780.00", totalCommissionPaid: "260.00", contactName: "Maria Santos", contactEmail: "maria@spotlesshome.com", contactPhone: "214-555-0129" },
  { businessName: "Pristine Pressure Washing", businessType: "Pressure Washing", serviceArea: "Frisco, TX", lat: 33.1407, lng: -96.8336, tier: "silver", referralCount: 20, leadsCount: 16, jobsLogged: 38, totalCommissionEarned: "640.00", totalCommissionPaid: "210.00", contactName: "James Okafor", contactEmail: "james@pristinepressure.com", contactPhone: "972-555-0130" },
  { businessName: "DFW Mold Remediation", businessType: "Mold Remediation", serviceArea: "Dallas, TX", lat: 32.7967, lng: -96.7770, tier: "gold", referralCount: 31, leadsCount: 24, jobsLogged: 57, totalCommissionEarned: "2480.00", totalCommissionPaid: "800.00", contactName: "Lisa Chambers", contactEmail: "lisa@dfwmold.com", contactPhone: "214-555-0131" },
  { businessName: "Restore Pro Water Damage", businessType: "Water Damage Restoration", serviceArea: "Richardson, TX", lat: 32.9583, lng: -96.7199, tier: "gold", referralCount: 28, leadsCount: 22, jobsLogged: 51, totalCommissionEarned: "2240.00", totalCommissionPaid: "720.00", contactName: "Chris Nguyen", contactEmail: "chris@restoreprowater.com", contactPhone: "972-555-0132" },
  { businessName: "Shine Window Cleaning", businessType: "Window Cleaning", serviceArea: "Allen, TX", lat: 33.1332, lng: -96.6706, tier: "bronze", referralCount: 8, leadsCount: 11, jobsLogged: 21, totalCommissionEarned: "240.00", totalCommissionPaid: "80.00", contactName: "Paul Whitmore", contactEmail: "paul@shinewindows.com", contactPhone: "972-555-0133" },
  { businessName: "Gutter Guard DFW", businessType: "Gutter Cleaning", serviceArea: "Garland, TX", lat: 32.9026, lng: -96.6589, tier: "bronze", referralCount: 6, leadsCount: 9, jobsLogged: 17, totalCommissionEarned: "160.00", totalCommissionPaid: "50.00", contactName: "Donna Pearce", contactEmail: "donna@gutterguarddfw.com", contactPhone: "972-555-0134" },
  { businessName: "Fresh Start Carpet Care", businessType: "Carpet Cleaning", serviceArea: "Lewisville, TX", lat: 33.0662, lng: -96.9742, tier: "silver", referralCount: 15, leadsCount: 12, jobsLogged: 29, totalCommissionEarned: "480.00", totalCommissionPaid: "160.00", contactName: "Angela Moore", contactEmail: "angela@freshstartcarpet.com", contactPhone: "972-555-0135" },

  // Pet Services (5)
  { businessName: "Scoop Duke DFW", businessType: "Pet Waste Removal", serviceArea: "Dallas, TX", lat: 32.7767, lng: -96.7970, tier: "silver", referralCount: 14, leadsCount: 9, jobsLogged: 28, totalCommissionEarned: "420.00", totalCommissionPaid: "140.00", contactName: "Andrew Duke", contactEmail: "andrew@scoopduke.com", contactPhone: "214-555-0001", website: "scoopduke.com", isFoundingPartner: true },
  { businessName: "Waggin Tails Dog Walking", businessType: "Dog Walking", serviceArea: "Plano, TX", lat: 33.0498, lng: -96.6789, tier: "bronze", referralCount: 5, leadsCount: 8, jobsLogged: 14, totalCommissionEarned: "120.00", totalCommissionPaid: "40.00", contactName: "Brittany Cole", contactEmail: "brittany@waggintails.com", contactPhone: "214-555-0136" },
  { businessName: "DFW Mobile Vet", businessType: "Veterinary Services", serviceArea: "Frisco, TX", lat: 33.1807, lng: -96.8136, tier: "silver", referralCount: 13, leadsCount: 10, jobsLogged: 25, totalCommissionEarned: "520.00", totalCommissionPaid: "170.00", contactName: "Dr. Sarah Lin", contactEmail: "sarah@dfwmobilevet.com", contactPhone: "972-555-0137" },
  { businessName: "Pampered Paws Grooming", businessType: "Pet Grooming", serviceArea: "McKinney, TX", lat: 33.1772, lng: -96.6597, tier: "bronze", referralCount: 4, leadsCount: 7, jobsLogged: 12, totalCommissionEarned: "100.00", totalCommissionPaid: "30.00", contactName: "Kelly Marsh", contactEmail: "kelly@pamperedpaws.com", contactPhone: "214-555-0138" },
  { businessName: "Happy Hound Pet Sitting", businessType: "Pet Sitting", serviceArea: "Allen, TX", lat: 33.1032, lng: -96.6906, tier: "bronze", referralCount: 3, leadsCount: 6, jobsLogged: 10, totalCommissionEarned: "80.00", totalCommissionPaid: "25.00", contactName: "Megan Tran", contactEmail: "megan@happyhoundpet.com", contactPhone: "972-555-0139" },

  // Electrical & Specialty (10)
  { businessName: "Volt Masters Electric", businessType: "Electrical", serviceArea: "Dallas, TX", lat: 32.7667, lng: -96.8070, tier: "gold", referralCount: 45, leadsCount: 34, jobsLogged: 80, totalCommissionEarned: "2200.00", totalCommissionPaid: "720.00", contactName: "Frank Delgado", contactEmail: "frank@voltmasters.com", contactPhone: "214-555-0140" },
  { businessName: "Bright Side Electrical", businessType: "Electrical", serviceArea: "Plano, TX", lat: 33.0198, lng: -96.7089, tier: "silver", referralCount: 22, leadsCount: 17, jobsLogged: 42, totalCommissionEarned: "880.00", totalCommissionPaid: "290.00", contactName: "Victor Pham", contactEmail: "victor@brightside-electric.com", contactPhone: "214-555-0141" },
  { businessName: "Handyman Heroes DFW", businessType: "Handyman", serviceArea: "Frisco, TX", lat: 33.1507, lng: -96.8336, tier: "silver", referralCount: 24, leadsCount: 19, jobsLogged: 46, totalCommissionEarned: "720.00", totalCommissionPaid: "240.00", contactName: "Bob Carpenter", contactEmail: "bob@handymanheroesdfw.com", contactPhone: "972-555-0142" },
  { businessName: "Texas Roofing Pros", businessType: "Roofing", serviceArea: "McKinney, TX", lat: 33.1972, lng: -96.6297, tier: "gold", referralCount: 37, leadsCount: 27, jobsLogged: 65, totalCommissionEarned: "3200.00", totalCommissionPaid: "1040.00", contactName: "Gary Nichols", contactEmail: "gary@texasroofingpros.com", contactPhone: "214-555-0143" },
  { businessName: "Smart Home Solutions", businessType: "Smart Home / Security", serviceArea: "Southlake, TX", lat: 32.9315, lng: -97.1436, tier: "silver", referralCount: 19, leadsCount: 15, jobsLogged: 36, totalCommissionEarned: "760.00", totalCommissionPaid: "250.00", contactName: "Alex Rivera", contactEmail: "alex@smarthomesolutions.com", contactPhone: "817-555-0144" },
  { businessName: "DFW Painting Pros", businessType: "Painting", serviceArea: "Richardson, TX", lat: 32.9483, lng: -96.7399, tier: "silver", referralCount: 21, leadsCount: 16, jobsLogged: 40, totalCommissionEarned: "840.00", totalCommissionPaid: "280.00", contactName: "Roberto Salinas", contactEmail: "roberto@dfwpaintingpros.com", contactPhone: "972-555-0145" },
  { businessName: "Fence Masters TX", businessType: "Fencing", serviceArea: "Garland, TX", lat: 32.9126, lng: -96.6489, tier: "bronze", referralCount: 9, leadsCount: 12, jobsLogged: 23, totalCommissionEarned: "360.00", totalCommissionPaid: "120.00", contactName: "Jim Bauer", contactEmail: "jim@fencemastertx.com", contactPhone: "972-555-0146" },
  { businessName: "Lone Star Concrete", businessType: "Concrete & Flatwork", serviceArea: "Denton, TX", lat: 33.2148, lng: -97.1231, tier: "bronze", referralCount: 7, leadsCount: 10, jobsLogged: 20, totalCommissionEarned: "280.00", totalCommissionPaid: "90.00", contactName: "Travis Holden", contactEmail: "travis@lonestarconcrete.com", contactPhone: "940-555-0147" },
  { businessName: "Collin County Flooring", businessType: "Flooring", serviceArea: "Wylie, TX", lat: 33.0151, lng: -96.5488, tier: "bronze", referralCount: 5, leadsCount: 8, jobsLogged: 15, totalCommissionEarned: "200.00", totalCommissionPaid: "65.00", contactName: "Nina Kowalski", contactEmail: "nina@collincountyflooring.com", contactPhone: "972-555-0148" },
  { businessName: "DFW Garage Door Experts", businessType: "Garage Door Service", serviceArea: "Lewisville, TX", lat: 33.0462, lng: -96.9942, tier: "silver", referralCount: 16, leadsCount: 13, jobsLogged: 30, totalCommissionEarned: "560.00", totalCommissionPaid: "185.00", contactName: "Scott Hensley", contactEmail: "scott@dfwgaragedoor.com", contactPhone: "972-555-0149" },
];

// ─── Seed Logic ───────────────────────────────────────────────────────────────

console.log("🌱 Starting DFW partner seed...");

// Check existing partners count
const [existingRows] = await conn.execute("SELECT COUNT(*) as cnt FROM partners");
const existingCount = existingRows[0].cnt;
console.log(`📊 Existing partners: ${existingCount}`);

let insertedCount = 0;
let skippedCount = 0;
const partnerIds = [];

for (const p of PARTNERS) {
  // Check if partner already exists by email
  const [existing] = await conn.execute(
    "SELECT id FROM partners WHERE contactEmail = ?",
    [p.contactEmail]
  );

  if (existing.length > 0) {
    console.log(`⏭  Skipping ${p.businessName} (already exists, id=${existing[0].id})`);
    partnerIds.push(existing[0].id);
    skippedCount++;
    continue;
  }

  // Insert partner
  const approvedAt = new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000); // 0-180 days ago
  const appliedAt = new Date(approvedAt.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000);

  const [result] = await conn.execute(
    `INSERT INTO partners (
      businessName, businessType, serviceArea, serviceAreaLat, serviceAreaLng,
      serviceRadiusMiles, contactName, contactEmail, contactPhone, website,
      status, tier, platformFeeRate, referralCommissionRate, isFoundingPartner,
      referralCount, leadsCount, jobsLogged, opportunitiesGenerated,
      totalCommissionEarned, totalCommissionPaid,
      appliedAt, approvedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'approved', ?, 0.1200, 0.0500, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      p.businessName, p.businessType, p.serviceArea,
      p.lat, p.lng, 15,
      p.contactName, p.contactEmail, p.contactPhone || null, p.website || null,
      p.tier, p.isFoundingPartner ? 1 : 0,
      p.referralCount, p.leadsCount, p.jobsLogged,
      Math.floor(p.referralCount * 0.6),
      p.totalCommissionEarned, p.totalCommissionPaid,
      appliedAt, approvedAt,
    ]
  );

  const partnerId = result.insertId;
  partnerIds.push(partnerId);
  insertedCount++;
  console.log(`✅ Inserted ${p.businessName} (id=${partnerId}, tier=${p.tier})`);
}

console.log(`\n📋 Partners: ${insertedCount} inserted, ${skippedCount} skipped`);

// ─── Seed Opportunities (leads) between partners ──────────────────────────────
console.log("\n🎯 Seeding opportunities (leads)...");

const OPPORTUNITY_TYPES = [
  { type: "overgrown_lawn", category: "Lawn Care", desc: "Lawn appears overgrown and unmaintained — neighbor may need lawn service", value: 180 },
  { type: "hvac_unit_age", category: "HVAC", desc: "Outdoor HVAC unit shows rust and age — likely due for service or replacement", value: 4200 },
  { type: "pool_algae", category: "Pool Service", desc: "Pool water appears green with algae — needs chemical treatment", value: 350 },
  { type: "roof_damage", category: "Roofing", desc: "Missing shingles visible on adjacent property roof", value: 8500 },
  { type: "fence_damage", category: "Fencing", desc: "Wooden fence panels leaning or broken", value: 1800 },
  { type: "pest_signs", category: "Pest Control", desc: "Visible ant trails and wasp nests near foundation", value: 280 },
  { type: "gutter_overflow", category: "Gutter Cleaning", desc: "Gutters overflowing with debris — likely clogged", value: 220 },
  { type: "concrete_crack", category: "Concrete & Flatwork", desc: "Driveway shows significant cracking and heaving", value: 3200 },
  { type: "window_seal_failure", category: "Window Cleaning", desc: "Window seals appear foggy — condensation between panes", value: 1400 },
  { type: "irrigation_dry_spots", category: "Irrigation", desc: "Dry brown patches suggest broken irrigation heads", value: 380 },
  { type: "paint_peeling", category: "Painting", desc: "Exterior paint peeling on trim and fascia boards", value: 2800 },
  { type: "garage_door_dent", category: "Garage Door Service", desc: "Garage door panel visibly dented and misaligned", value: 650 },
];

const STATUSES = ["sent", "accepted", "converted", "declined", "expired"];
const STATUS_WEIGHTS = [0.25, 0.30, 0.25, 0.10, 0.10];

function weightedStatus() {
  const r = Math.random();
  let cumulative = 0;
  for (let i = 0; i < STATUSES.length; i++) {
    cumulative += STATUS_WEIGHTS[i];
    if (r < cumulative) return STATUSES[i];
  }
  return "sent";
}

// Create ~80 opportunities between random partner pairs
let oppCount = 0;
const opportunityIds = [];

for (let i = 0; i < 80; i++) {
  const sourceIdx = Math.floor(Math.random() * partnerIds.length);
  let receivingIdx = Math.floor(Math.random() * partnerIds.length);
  while (receivingIdx === sourceIdx) receivingIdx = Math.floor(Math.random() * partnerIds.length);

  const sourceId = partnerIds[sourceIdx];
  const receivingId = partnerIds[receivingIdx];
  const oppType = OPPORTUNITY_TYPES[Math.floor(Math.random() * OPPORTUNITY_TYPES.length)];
  const status = weightedStatus();
  const confidence = (0.65 + Math.random() * 0.30).toFixed(3);
  const estimatedValue = oppType.value * (0.8 + Math.random() * 0.4);
  const actualValue = status === "converted" ? estimatedValue * (0.85 + Math.random() * 0.3) : null;
  const createdAt = new Date(Date.now() - Math.random() * 120 * 24 * 60 * 60 * 1000);
  const sentAt = new Date(createdAt.getTime() + 2 * 60 * 60 * 1000);
  const acceptedAt = ["accepted", "converted"].includes(status) ? new Date(sentAt.getTime() + Math.random() * 48 * 60 * 60 * 1000) : null;
  const jobClosedAt = status === "converted" ? new Date(acceptedAt.getTime() + Math.random() * 14 * 24 * 60 * 60 * 1000) : null;

  const platformFee = actualValue ? actualValue * 0.12 : null;
  const referralComm = actualValue ? actualValue * 0.05 : null;
  const proLinkNet = platformFee && referralComm ? platformFee - referralComm : null;

  // We need a job record first (simplified — use a fake job)
  const [jobResult] = await conn.execute(
    `INSERT INTO jobs (partnerId, serviceAddress, serviceType, status, aiAnalysisStatus, createdAt)
     VALUES (?, ?, ?, 'analyzed', 'complete', ?)`,
    [sourceId, `${1000 + Math.floor(Math.random() * 9000)} Main St, Dallas, TX`, oppType.category, createdAt]
  );
  const jobId = jobResult.insertId;

  const [oppResult] = await conn.execute(
    `INSERT INTO opportunities (
      jobId, sourcePartnerId, receivingPartnerId,
      opportunityType, opportunityCategory, description,
      aiConfidence, status,
      estimatedJobValue, actualJobValue, platformFeeAmount, referralCommissionAmount, proLinkNetAmount,
      sentAt, acceptedAt, jobClosedAt, createdAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      jobId, sourceId, receivingId,
      oppType.type, oppType.category, oppType.desc,
      confidence, status,
      estimatedValue.toFixed(2),
      actualValue ? actualValue.toFixed(2) : null,
      platformFee ? platformFee.toFixed(2) : null,
      referralComm ? referralComm.toFixed(2) : null,
      proLinkNet ? proLinkNet.toFixed(2) : null,
      sentAt, acceptedAt, jobClosedAt, createdAt,
    ]
  );
  opportunityIds.push(oppResult.insertId);
  oppCount++;
}

console.log(`✅ Seeded ${oppCount} opportunities`);

// ─── Seed Commission Records ──────────────────────────────────────────────────
console.log("\n💰 Seeding commission records...");

// Get converted opportunities
const [convertedOpps] = await conn.execute(
  `SELECT id, sourcePartnerId, receivingPartnerId, actualJobValue, platformFeeAmount, referralCommissionAmount, proLinkNetAmount, jobClosedAt
   FROM opportunities WHERE status = 'converted' AND actualJobValue IS NOT NULL AND jobClosedAt IS NOT NULL`
);

let commCount = 0;
for (const opp of convertedOpps) {
  // Skip if amounts are null
  if (!opp.platformFeeAmount || !opp.referralCommissionAmount) continue;
  const paid = Math.random() > 0.3; // 70% paid
  const paidAt = paid ? new Date(new Date(opp.jobClosedAt).getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000) : null;

  // Platform fee (receiving partner pays ProLink)
  await conn.execute(
    `INSERT INTO commissions (opportunityId, partnerId, payingPartnerId, receivingPartnerId, commissionType, amount, jobValue, feeRate, description, paid, paidAt, createdAt)
     VALUES (?, ?, ?, 0, 'platform_fee', ?, ?, 0.1200, ?, ?, ?, ?)`,
    [opp.id, opp.receivingPartnerId, opp.receivingPartnerId, opp.platformFeeAmount, opp.actualJobValue,
     `Platform fee for job referral`, paid, paidAt, opp.jobClosedAt]
  );

  // Referral commission (ProLink pays source partner)
  await conn.execute(
    `INSERT INTO commissions (opportunityId, partnerId, payingPartnerId, receivingPartnerId, commissionType, amount, jobValue, feeRate, description, paid, paidAt, createdAt)
     VALUES (?, ?, 0, ?, 'referral_commission', ?, ?, 0.0500, ?, ?, ?, ?)`,
    [opp.id, opp.sourcePartnerId, opp.sourcePartnerId, opp.referralCommissionAmount, opp.actualJobValue,
     `Referral commission earned`, paid, paidAt, opp.jobClosedAt]
  );

  commCount += 2;
}

console.log(`✅ Seeded ${commCount} commission records`);

// ─── Summary ──────────────────────────────────────────────────────────────────
const [totalPartners] = await conn.execute("SELECT COUNT(*) as cnt FROM partners WHERE status = 'approved'");
const [totalOpps] = await conn.execute("SELECT COUNT(*) as cnt FROM opportunities");
const [totalComms] = await conn.execute("SELECT COUNT(*) as cnt FROM commissions");
const [totalRevenue] = await conn.execute("SELECT SUM(amount) as total FROM commissions WHERE commissionType = 'platform_fee' AND paid = 1");

console.log("\n🎉 Seed complete!");
console.log(`   Active partners: ${totalPartners[0].cnt}`);
console.log(`   Opportunities:   ${totalOpps[0].cnt}`);
console.log(`   Commission records: ${totalComms[0].cnt}`);
console.log(`   Platform revenue (paid): $${parseFloat(totalRevenue[0].total || 0).toFixed(2)}`);

await conn.end();
