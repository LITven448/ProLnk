/**
 * Seed 500 realistic DFW demo partners across all service categories.
 * Run: node scripts/seed-dfw-partners.mjs
 */
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const DB_URL = process.env.DATABASE_URL;
if (!DB_URL) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

// ─── DFW cities with lat/lng ──────────────────────────────────────────────────
const DFW_CITIES = [
  { city: "Dallas", state: "TX", lat: 32.7767, lng: -96.7970 },
  { city: "Fort Worth", state: "TX", lat: 32.7555, lng: -97.3308 },
  { city: "Frisco", state: "TX", lat: 33.1507, lng: -96.8236 },
  { city: "Plano", state: "TX", lat: 33.0198, lng: -96.6989 },
  { city: "McKinney", state: "TX", lat: 33.1972, lng: -96.6397 },
  { city: "Allen", state: "TX", lat: 33.1032, lng: -96.6706 },
  { city: "Prosper", state: "TX", lat: 33.2365, lng: -96.8009 },
  { city: "Celina", state: "TX", lat: 33.3237, lng: -96.7853 },
  { city: "Southlake", state: "TX", lat: 32.9412, lng: -97.1342 },
  { city: "Colleyville", state: "TX", lat: 32.8887, lng: -97.1503 },
  { city: "Grapevine", state: "TX", lat: 32.9343, lng: -97.0781 },
  { city: "Flower Mound", state: "TX", lat: 33.0146, lng: -97.0969 },
  { city: "Lewisville", state: "TX", lat: 33.0462, lng: -96.9942 },
  { city: "Carrollton", state: "TX", lat: 32.9537, lng: -96.8903 },
  { city: "Irving", state: "TX", lat: 32.8140, lng: -96.9489 },
  { city: "Arlington", state: "TX", lat: 32.7357, lng: -97.1081 },
  { city: "Mansfield", state: "TX", lat: 32.5632, lng: -97.1417 },
  { city: "Keller", state: "TX", lat: 32.9343, lng: -97.2294 },
  { city: "Rockwall", state: "TX", lat: 32.9290, lng: -96.4597 },
  { city: "Garland", state: "TX", lat: 32.9126, lng: -96.6389 },
  { city: "Richardson", state: "TX", lat: 32.9483, lng: -96.7299 },
  { city: "Denton", state: "TX", lat: 33.2148, lng: -97.1331 },
  { city: "Wylie", state: "TX", lat: 33.0151, lng: -96.5388 },
  { city: "Sachse", state: "TX", lat: 32.9762, lng: -96.5897 },
  { city: "Murphy", state: "TX", lat: 33.0151, lng: -96.6114 },
];

// ─── Service categories ───────────────────────────────────────────────────────
const SERVICE_CATEGORIES = [
  { type: "Lawn Care", count: 45, avgFee: 0.12 },
  { type: "Landscaping", count: 30, avgFee: 0.12 },
  { type: "Pest Control", count: 30, avgFee: 0.12 },
  { type: "Pool Service", count: 25, avgFee: 0.12 },
  { type: "Fence & Gate", count: 25, avgFee: 0.12 },
  { type: "Pressure Washing", count: 25, avgFee: 0.12 },
  { type: "Window Cleaning", count: 20, avgFee: 0.12 },
  { type: "Handyman", count: 30, avgFee: 0.12 },
  { type: "Roofing", count: 20, avgFee: 0.10 },
  { type: "HVAC", count: 20, avgFee: 0.10 },
  { type: "Plumbing", count: 20, avgFee: 0.10 },
  { type: "Electrical", count: 15, avgFee: 0.10 },
  { type: "Painting", count: 20, avgFee: 0.12 },
  { type: "Tree Service", count: 15, avgFee: 0.12 },
  { type: "Gutter Cleaning", count: 15, avgFee: 0.12 },
  { type: "Concrete", count: 15, avgFee: 0.10 },
  { type: "Garage Epoxy", count: 10, avgFee: 0.12 },
  { type: "Artificial Turf", count: 10, avgFee: 0.12 },
  { type: "Irrigation", count: 15, avgFee: 0.12 },
  { type: "Security", count: 10, avgFee: 0.10 },
  { type: "Water Filtration", count: 10, avgFee: 0.10 },
  { type: "Remodeling", count: 10, avgFee: 0.10 },
  { type: "Cleaning", count: 15, avgFee: 0.12 },
  { type: "Junk Removal", count: 10, avgFee: 0.12 },
  { type: "Moving", count: 10, avgFee: 0.10 },
];

// ─── Business name generators ─────────────────────────────────────────────────
const BUSINESS_SUFFIXES = {
  "Lawn Care": ["Lawn Care", "Lawn & Landscape", "Turf Management", "Lawn Services", "Grass Masters", "Green Lawn Co"],
  "Landscaping": ["Landscaping", "Landscape Design", "Outdoor Living", "Garden Design", "Landscape Solutions"],
  "Pest Control": ["Pest Control", "Exterminating", "Bug Busters", "Pest Solutions", "Pest Management"],
  "Pool Service": ["Pool Service", "Pool Care", "Pool & Spa", "Aqua Care", "Pool Pros"],
  "Fence & Gate": ["Fence Co", "Fencing", "Fence & Gate", "Iron Works", "Fence Masters"],
  "Pressure Washing": ["Pressure Washing", "Power Wash", "Exterior Cleaning", "Wash Pros", "Clean Exterior"],
  "Window Cleaning": ["Window Cleaning", "Window Wash", "Clear View", "Window Pros", "Glass Cleaning"],
  "Handyman": ["Handyman", "Home Repair", "Fix-It Services", "Home Solutions", "Repair Pros"],
  "Roofing": ["Roofing", "Roof Repair", "Roofing Solutions", "Roof Masters", "Storm Roofing"],
  "HVAC": ["HVAC", "Air & Heat", "Cooling & Heating", "Climate Control", "HVAC Solutions"],
  "Plumbing": ["Plumbing", "Plumbing Services", "Pipe Pros", "Plumbing Solutions", "Drain Masters"],
  "Electrical": ["Electric", "Electrical", "Wiring Solutions", "Power Pros", "Electrical Services"],
  "Painting": ["Painting", "Paint Co", "Painting Solutions", "Color Masters", "Interior & Exterior Painting"],
  "Tree Service": ["Tree Service", "Tree Care", "Arborist", "Tree Removal", "Tree Masters"],
  "Gutter Cleaning": ["Gutter Cleaning", "Gutter Guard", "Gutter Solutions", "Rain Gutter Pros"],
  "Concrete": ["Concrete", "Concrete Solutions", "Flatwork", "Concrete Pros", "Paving Solutions"],
  "Garage Epoxy": ["Garage Epoxy", "Garage Floors", "Epoxy Coatings", "Floor Coatings"],
  "Artificial Turf": ["Artificial Turf", "Synthetic Grass", "Turf Solutions", "Green Turf"],
  "Irrigation": ["Irrigation", "Sprinkler Systems", "Irrigation Solutions", "Water Management"],
  "Security": ["Security", "Home Security", "Alarm Systems", "Smart Security"],
  "Water Filtration": ["Water Filtration", "Water Softener", "Pure Water", "Water Solutions"],
  "Remodeling": ["Remodeling", "Home Renovation", "Construction", "Build & Remodel"],
  "Cleaning": ["Cleaning", "Maid Service", "House Cleaning", "Clean Team", "Spotless Cleaning"],
  "Junk Removal": ["Junk Removal", "Haul Away", "Junk Pros", "Debris Removal"],
  "Moving": ["Moving", "Movers", "Moving Solutions", "Relocation Services"],
};

const FIRST_NAMES = ["James", "Michael", "Robert", "David", "John", "William", "Richard", "Thomas", "Charles", "Christopher",
  "Daniel", "Matthew", "Anthony", "Mark", "Donald", "Steven", "Paul", "Andrew", "Joshua", "Kenneth",
  "Jennifer", "Maria", "Susan", "Karen", "Lisa", "Nancy", "Betty", "Margaret", "Sandra", "Ashley",
  "Dorothy", "Kimberly", "Emily", "Donna", "Michelle", "Carol", "Amanda", "Melissa", "Deborah", "Stephanie"];

const LAST_NAMES = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
  "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
  "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
  "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores"];

const CITY_PREFIXES = ["DFW", "Lone Star", "Texas", "Metroplex", "North Texas", "Sunbelt", "Lone Star State", "Texan", "Prairie", "Trinity"];

function randItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randFloat(min, max) { return Math.random() * (max - min) + min; }

function generateBusinessName(serviceType) {
  const suffixes = BUSINESS_SUFFIXES[serviceType] || [serviceType + " Services"];
  const style = Math.random();
  if (style < 0.35) {
    // "LastName serviceType"
    return `${randItem(LAST_NAMES)} ${randItem(suffixes)}`;
  } else if (style < 0.65) {
    // "CityPrefix serviceType"
    return `${randItem(CITY_PREFIXES)} ${randItem(suffixes)}`;
  } else {
    // "FirstName LastName serviceType"
    return `${randItem(FIRST_NAMES)} ${randItem(LAST_NAMES)} ${randItem(suffixes)}`;
  }
}

function generateEmail(businessName, city) {
  const clean = businessName.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 15);
  const domains = ["gmail.com", "yahoo.com", "outlook.com", "icloud.com", "hotmail.com"];
  return `${clean}${randInt(1, 999)}@${randItem(domains)}`;
}

function generatePhone() {
  const areaCodes = ["214", "972", "469", "817", "682", "940", "903"];
  return `(${randItem(areaCodes)}) ${randInt(200, 999)}-${randInt(1000, 9999)}`;
}

function jitter(coord, maxDelta = 0.15) {
  return coord + (Math.random() - 0.5) * maxDelta * 2;
}

// ─── Build partner rows ───────────────────────────────────────────────────────
const partners = [];
let id = 1;

for (const category of SERVICE_CATEGORIES) {
  for (let i = 0; i < category.count; i++) {
    const cityData = randItem(DFW_CITIES);
    const firstName = randItem(FIRST_NAMES);
    const lastName = randItem(LAST_NAMES);
    const businessName = generateBusinessName(category.type);
    const contactName = `${firstName} ${lastName}`;
    const contactEmail = generateEmail(businessName, cityData.city);
    const serviceArea = `${cityData.city}, ${cityData.state}`;
    const lat = jitter(cityData.lat, 0.12);
    const lng = jitter(cityData.lng, 0.12);
    const radius = randInt(10, 30);
    const referralCount = randInt(0, 45);
    const jobsLogged = randInt(0, 200);
    const oppsGenerated = randInt(0, 60);
    const commEarned = (referralCount * randFloat(80, 350)).toFixed(2);
    const commPaid = (parseFloat(commEarned) * randFloat(0.5, 0.9)).toFixed(2);
    const tier = referralCount > 30 ? "gold" : referralCount > 15 ? "silver" : "bronze";
    const status = Math.random() < 0.92 ? "approved" : Math.random() < 0.5 ? "pending" : "rejected";
    const platformFeeRate = (category.avgFee + randFloat(-0.02, 0.02)).toFixed(4);
    const referralCommRate = (0.05 + randFloat(-0.01, 0.01)).toFixed(4);
    const isFounding = id === 1; // first one is founding
    const trialStatus = Math.random() < 0.6 ? "active" : Math.random() < 0.5 ? "trial" : "expired";
    const subscriptionPlan = Math.random() < 0.5 ? "local" : Math.random() < 0.5 ? "regional" : "metro";

    partners.push({
      businessName,
      businessType: category.type,
      serviceArea,
      serviceAreaLat: lat.toFixed(6),
      serviceAreaLng: lng.toFixed(6),
      serviceRadiusMiles: radius,
      contactName,
      contactEmail,
      contactPhone: generatePhone(),
      website: Math.random() < 0.4 ? `https://www.${businessName.toLowerCase().replace(/[^a-z0-9]/g, "")}.com` : null,
      description: `Professional ${category.type.toLowerCase()} services in ${cityData.city} and surrounding areas. Licensed, insured, and highly rated.`,
      status,
      tier,
      platformFeeRate,
      referralCommissionRate: referralCommRate,
      isFoundingPartner: isFounding ? 1 : 0,
      referralCount,
      leadsCount: Math.floor(referralCount * 1.4),
      jobsLogged,
      opportunitiesGenerated: oppsGenerated,
      totalCommissionEarned: commEarned,
      totalCommissionPaid: commPaid,
      stripeConnectStatus: Math.random() < 0.3 ? "active" : "not_connected",
      trialStatus,
      subscriptionPlan,
    });
    id++;
  }
}

// ─── Insert into DB ───────────────────────────────────────────────────────────
async function main() {
  const conn = await mysql.createConnection(DB_URL);
  console.log(`Seeding ${partners.length} partners...`);

  // Check existing count
  const [rows] = await conn.execute("SELECT COUNT(*) as cnt FROM partners");
  const existing = rows[0].cnt;
  if (existing > 5) {
    console.log(`Already have ${existing} partners — skipping seed to avoid duplicates.`);
    await conn.end();
    return;
  }

  let inserted = 0;
  for (const p of partners) {
    try {
      await conn.execute(
        `INSERT INTO partners 
          (businessName, businessType, serviceArea, serviceAreaLat, serviceAreaLng, serviceRadiusMiles,
           contactName, contactEmail, contactPhone, website, description, status, tier,
           platformFeeRate, referralCommissionRate, isFoundingPartner,
           referralCount, leadsCount, jobsLogged, opportunitiesGenerated,
           totalCommissionEarned, totalCommissionPaid,
           stripeConnectStatus, trialStatus, subscriptionPlan,
           appliedAt, approvedAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                 NOW() - INTERVAL FLOOR(RAND()*365) DAY,
                 NOW() - INTERVAL FLOOR(RAND()*300) DAY,
                 NOW())`,
        [
          p.businessName, p.businessType, p.serviceArea, p.serviceAreaLat, p.serviceAreaLng, p.serviceRadiusMiles,
          p.contactName, p.contactEmail, p.contactPhone, p.website, p.description, p.status, p.tier,
          p.platformFeeRate, p.referralCommissionRate, p.isFoundingPartner,
          p.referralCount, p.leadsCount, p.jobsLogged, p.opportunitiesGenerated,
          p.totalCommissionEarned, p.totalCommissionPaid,
          p.stripeConnectStatus, p.trialStatus, p.subscriptionPlan,
        ]
      );
      inserted++;
    } catch (e) {
      console.error(`Failed to insert ${p.businessName}:`, e.message);
    }
  }

  console.log(`✅ Inserted ${inserted}/${partners.length} partners`);
  await conn.end();
}

main().catch(console.error);
