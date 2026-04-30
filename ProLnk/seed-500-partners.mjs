import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();

const DB_URL = process.env.DATABASE_URL;
if (!DB_URL) throw new Error("DATABASE_URL not set");

// ─── Data pools ────────────────────────────────────────────────────────────────

const DFW_CITIES = [
  "Frisco", "Plano", "McKinney", "Allen", "Prosper", "Celina", "Little Elm",
  "The Colony", "Lewisville", "Flower Mound", "Southlake", "Keller", "Colleyville",
  "Grapevine", "Bedford", "Euless", "Hurst", "Arlington", "Grand Prairie",
  "Irving", "Coppell", "Carrollton", "Farmers Branch", "Addison", "Richardson",
  "Garland", "Rowlett", "Sachse", "Wylie", "Murphy", "Rockwall", "Heath",
  "Forney", "Mesquite", "Balch Springs", "Duncanville", "DeSoto", "Cedar Hill",
  "Mansfield", "Burleson", "Midlothian", "Waxahachie", "Denton", "Corinth",
  "Highland Village", "Argyle", "Northlake", "Justin", "Roanoke", "Trophy Club"
];

const CATEGORIES = [
  { cat: "Lawn Care", names: ["Green Thumb Lawn", "Premier Turf", "Lone Star Lawn", "DFW Lawn Pros", "Texas Turf Masters", "Emerald Lawn Care", "Precision Mowing", "Elite Grounds", "Bluegrass Lawn", "Patriot Lawn Services"] },
  { cat: "HVAC", names: ["Arctic Air HVAC", "Comfort Zone AC", "Texas Cool HVAC", "Premier Climate", "Lone Star Heating", "DFW Air Experts", "ProTemp HVAC", "Total Comfort Systems", "Apex Air Solutions", "Reliable HVAC Co"] },
  { cat: "Plumbing", names: ["Flow Right Plumbing", "Texas Pipe Pros", "DFW Plumbing Masters", "Precision Plumbing", "Lone Star Plumbers", "Clear Flow Plumbing", "ProPipe Solutions", "Elite Plumbing Co", "Rapid Response Plumbing", "Cornerstone Plumbing"] },
  { cat: "Pest Control", names: ["Shield Pest Control", "Texas Bug Busters", "DFW Extermination", "Premier Pest Solutions", "Lone Star Pest", "ProGuard Pest Control", "Apex Pest Services", "Total Pest Defense", "Guardian Pest Co", "Precision Pest Control"] },
  { cat: "Pool Service", names: ["Crystal Clear Pools", "Texas Pool Pros", "DFW Pool Masters", "Premier Pool Care", "Lone Star Pool Service", "Aqua Blue Pools", "ProPool Solutions", "Elite Pool Co", "Splash Zone Pools", "Perfect Pools DFW"] },
  { cat: "Cleaning", names: ["Spotless Cleaning Co", "Texas Clean Team", "DFW Maids", "Premier Cleaning", "Lone Star Cleaners", "ProClean Services", "Apex Cleaning Co", "Total Clean DFW", "Shine Bright Cleaning", "Elite Maid Service"] },
  { cat: "Roofing", names: ["Summit Roofing", "Texas Roof Pros", "DFW Roofing Masters", "Premier Roof Solutions", "Lone Star Roofing", "ProRoof DFW", "Apex Roofing Co", "Total Roof Systems", "Guardian Roofing", "Precision Roof Care"] },
  { cat: "Electrical", names: ["Bright Spark Electric", "Texas Electrical Pros", "DFW Electric Masters", "Premier Electric", "Lone Star Electric", "ProWire Solutions", "Apex Electrical Co", "Total Electric DFW", "Power Up Electric", "Elite Electrical Services"] },
  { cat: "Fence & Gate", names: ["Solid Fence Co", "Texas Fence Masters", "DFW Fencing Pros", "Premier Fence Solutions", "Lone Star Fencing", "ProFence DFW", "Apex Fence & Gate", "Total Fence Systems", "Guardian Fence Co", "Precision Fencing"] },
  { cat: "Painting", names: ["Fresh Coat Painting", "Texas Paint Pros", "DFW Painting Masters", "Premier Paint Solutions", "Lone Star Painters", "ProPaint DFW", "Apex Painting Co", "Total Paint Systems", "Brushstroke Painting", "Elite Paint Services"] },
  { cat: "Landscaping", names: ["Terrain Masters", "Texas Landscape Pros", "DFW Landscaping Co", "Premier Landscape Design", "Lone Star Landscaping", "ProScape DFW", "Apex Landscape", "Total Grounds Care", "Green Scene Landscaping", "Elite Landscape Solutions"] },
  { cat: "Handyman", names: ["Fix It Right Handyman", "Texas Handyman Pros", "DFW Fix-It Masters", "Premier Handyman", "Lone Star Repairs", "ProFix Solutions", "Apex Handyman Co", "Total Home Repairs", "Reliable Handyman DFW", "Elite Home Services"] },
  { cat: "Pressure Washing", names: ["Power Wash Pros", "Texas Pressure Washing", "DFW Wash Masters", "Premier Pressure Wash", "Lone Star Washing", "ProWash DFW", "Apex Pressure Wash", "Total Clean Exterior", "Blast Clean Services", "Elite Wash Co"] },
  { cat: "Window Cleaning", names: ["Crystal View Windows", "Texas Window Pros", "DFW Window Masters", "Premier Window Care", "Lone Star Window Cleaning", "ProGlass DFW", "Apex Window Co", "Total Window Services", "Clear Pane Cleaning", "Elite Window Solutions"] },
  { cat: "Irrigation", names: ["Rain Right Irrigation", "Texas Sprinkler Pros", "DFW Irrigation Masters", "Premier Irrigation", "Lone Star Sprinklers", "ProIrrigate DFW", "Apex Irrigation Co", "Total Sprinkler Systems", "Flow Zone Irrigation", "Elite Irrigation Services"] },
  { cat: "Tree Service", names: ["Arbor Care Experts", "Texas Tree Pros", "DFW Tree Masters", "Premier Tree Service", "Lone Star Arborists", "ProTree DFW", "Apex Tree Co", "Total Tree Care", "Green Giant Tree Service", "Elite Arborist Co"] },
  { cat: "Gutter Service", names: ["Clean Flow Gutters", "Texas Gutter Pros", "DFW Gutter Masters", "Premier Gutter Care", "Lone Star Gutters", "ProGutter DFW", "Apex Gutter Co", "Total Gutter Systems", "Rain Guard Gutters", "Elite Gutter Services"] },
  { cat: "Concrete & Masonry", names: ["Solid Foundation Co", "Texas Concrete Pros", "DFW Masonry Masters", "Premier Concrete", "Lone Star Masonry", "ProConcrete DFW", "Apex Masonry Co", "Total Concrete Systems", "Stone & Mortar DFW", "Elite Concrete Services"] },
  { cat: "Flooring", names: ["Floor Masters DFW", "Texas Flooring Pros", "DFW Floor Co", "Premier Flooring", "Lone Star Floors", "ProFloor DFW", "Apex Flooring Co", "Total Floor Systems", "Hardwood Heaven DFW", "Elite Flooring Solutions"] },
  { cat: "Pet Waste Removal", names: ["Scoop Duke DFW", "Texas Pet Waste Pros", "DFW Poop Scoop", "Premier Pet Cleanup", "Lone Star Scoopers", "ProScoop DFW", "Apex Pet Waste Co", "Total Yard Cleanup", "Clean Paws DFW", "Elite Pet Waste Services"] },
  { cat: "Garage Door", names: ["Lift Right Garage Doors", "Texas Garage Door Pros", "DFW Door Masters", "Premier Garage Doors", "Lone Star Garage", "ProDoor DFW", "Apex Garage Door Co", "Total Door Systems", "Smooth Lift Doors", "Elite Garage Solutions"] },
  { cat: "Security Systems", names: ["Shield Security DFW", "Texas Security Pros", "DFW Security Masters", "Premier Security", "Lone Star Security", "ProSecure DFW", "Apex Security Co", "Total Security Systems", "Guardian Security DFW", "Elite Security Solutions"] },
  { cat: "Appliance Repair", names: ["Fix Fast Appliance", "Texas Appliance Pros", "DFW Appliance Masters", "Premier Appliance Repair", "Lone Star Appliances", "ProFix Appliance DFW", "Apex Appliance Co", "Total Appliance Care", "Reliable Appliance DFW", "Elite Appliance Services"] },
  { cat: "Drainage", names: ["Flow Master Drainage", "Texas Drainage Pros", "DFW Drainage Masters", "Premier Drainage Solutions", "Lone Star Drainage", "ProDrain DFW", "Apex Drainage Co", "Total Drainage Systems", "Clear Path Drainage", "Elite Drainage Services"] },
  { cat: "Insulation", names: ["Thermal Shield Insulation", "Texas Insulation Pros", "DFW Insulation Masters", "Premier Insulation", "Lone Star Insulation", "ProInsulate DFW", "Apex Insulation Co", "Total Insulation Systems", "Energy Guard DFW", "Elite Insulation Services"] },
];

const TIERS = ["bronze", "silver", "gold"];
const STATUSES = ["approved", "approved", "approved", "approved", "pending"];
const PHONES = () => `(${214 + Math.floor(Math.random() * 3)}) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`;

function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randomDate(daysBack) {
  const d = new Date();
  d.setDate(d.getDate() - randomInt(0, daysBack));
  return d.toISOString().slice(0, 19).replace('T', ' ');
}

// Build 500 partner records
function buildPartners() {
  const partners = [];
  let idx = 0;
  for (const { cat, names } of CATEGORIES) {
    for (const name of names) {
      const city = randomFrom(DFW_CITIES);
      const tier = randomFrom(TIERS);
      const status = randomFrom(STATUSES);
      const referralCount = randomInt(0, 80);
      const commissionRate = tier === "gold" ? 0.12 : tier === "silver" ? 0.08 : 0.05;
      const referralCommissionRate = tier === "gold" ? 0.15 : tier === "silver" ? 0.12 : 0.10;
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + idx;
      partners.push({
        businessName: name,
        ownerName: `Owner ${idx + 1}`,
        email: `partner${idx + 1}@${slug.slice(0, 20)}.com`,
        phone: PHONES(),
        serviceCategory: cat,
        serviceArea: city,
        city,
        state: "TX",
        zipCode: String(75000 + randomInt(1, 299)),
        tier,
        status,
        referralCount,
        commissionRate,
        referralCommissionRate,
        website: `https://www.${slug.slice(0, 30)}.com`,
        description: `${name} provides professional ${cat.toLowerCase()} services across ${city} and surrounding DFW communities.`,
        yearsInBusiness: randomInt(1, 22),
        employeeCount: randomInt(1, 45),
        monthlyJobVolume: randomInt(5, 150),
        avgJobValue: randomInt(150, 4500),
        createdAt: randomDate(730),
        approvedAt: status === "active" ? randomDate(600) : null,
      });
      idx++;
      if (idx >= 500) break;
    }
    if (idx >= 500) break;
  }
  return partners;
}

async function main() {
  const conn = await mysql.createConnection(DB_URL);
  console.log("Connected to DB");

  // Check how many partners already exist
  const [existing] = await conn.execute("SELECT COUNT(*) as cnt FROM partners");
  const existingCount = existing[0].cnt;
  console.log(`Existing partners: ${existingCount}`);

  const partners = buildPartners();
  let inserted = 0;
  let skipped = 0;

  for (const p of partners) {
    try {
      await conn.execute(
        `INSERT INTO partners 
          (businessName, contactName, contactEmail, contactPhone, businessType, serviceArea,
           tier, status, referralCount, commissionRate, referralCommissionRate, website, description,
           appliedAt, approvedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          p.businessName, p.ownerName, p.email, p.phone, p.serviceCategory, `${p.city}, TX`,
          p.tier, p.status, p.referralCount,
          p.commissionRate, p.referralCommissionRate, p.website, p.description,
          p.createdAt, p.approvedAt
        ]
      );
      inserted++;
    } catch (e) {
      if (e.code === "ER_DUP_ENTRY") { skipped++; continue; }
      console.error("Error inserting", p.businessName, e.message);
    }
  }

  console.log(`✅ Inserted ${inserted} partners, skipped ${skipped} duplicates`);

  // Final count
  const [final] = await conn.execute("SELECT COUNT(*) as cnt FROM partners");
  console.log(`Total partners in DB: ${final[0].cnt}`);

  await conn.end();
}

main().catch(console.error);
