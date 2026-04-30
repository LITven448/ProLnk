/**
 * ProLnk Full Demo Seed Script
 * Generates: 1,010 partners, 15,000 home profiles (properties + assets + event triggers),
 * scenario data (jobs, commissions, referrals, AI pipeline runs, recall alerts)
 */
import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();

const DB_URL = process.env.DATABASE_URL;
if (!DB_URL) throw new Error("DATABASE_URL not set");

// Parse mysql2 connection from URL
function parseUrl(url) {
  const u = new URL(url);
  return {
    host: u.hostname,
    port: parseInt(u.port || "3306"),
    user: u.username,
    password: u.password,
    database: u.pathname.slice(1),
    ssl: { rejectUnauthorized: false },
    multipleStatements: false,
  };
}

const conn = await mysql.createConnection(parseUrl(DB_URL));
console.log("✅ Connected to DB");

// ─── Helpers ─────────────────────────────────────────────────────────────────
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randFloat = (min, max, dec = 2) => parseFloat((Math.random() * (max - min) + min).toFixed(dec));
const randDate = (daysAgo, daysAgoMin = 0) => {
  const d = new Date();
  d.setDate(d.getDate() - rand(daysAgoMin, daysAgo));
  return d;
};

// DFW zip codes with lat/lng centers
const DFW_ZIPS = [
  { zip: "75201", city: "Dallas", lat: 32.7767, lng: -96.7970 },
  { zip: "75202", city: "Dallas", lat: 32.7800, lng: -96.8000 },
  { zip: "75204", city: "Dallas", lat: 32.7900, lng: -96.7800 },
  { zip: "75205", city: "Dallas", lat: 32.8300, lng: -96.7900 },
  { zip: "75206", city: "Dallas", lat: 32.8200, lng: -96.7700 },
  { zip: "75208", city: "Dallas", lat: 32.7500, lng: -96.8300 },
  { zip: "75209", city: "Dallas", lat: 32.8400, lng: -96.8200 },
  { zip: "75214", city: "Dallas", lat: 32.8100, lng: -96.7300 },
  { zip: "75218", city: "Dallas", lat: 32.8500, lng: -96.7000 },
  { zip: "75220", city: "Dallas", lat: 32.8700, lng: -96.8700 },
  { zip: "75225", city: "Dallas", lat: 32.8700, lng: -96.7700 },
  { zip: "75230", city: "Dallas", lat: 32.9200, lng: -96.7700 },
  { zip: "75240", city: "Dallas", lat: 32.9400, lng: -96.7700 },
  { zip: "75248", city: "Dallas", lat: 32.9700, lng: -96.7500 },
  { zip: "76001", city: "Arlington", lat: 32.6800, lng: -97.1100 },
  { zip: "76010", city: "Arlington", lat: 32.7300, lng: -97.0800 },
  { zip: "76011", city: "Arlington", lat: 32.7500, lng: -97.0500 },
  { zip: "76012", city: "Arlington", lat: 32.7600, lng: -97.1300 },
  { zip: "76013", city: "Arlington", lat: 32.7200, lng: -97.1500 },
  { zip: "76014", city: "Arlington", lat: 32.7000, lng: -97.0900 },
  { zip: "76034", city: "Colleyville", lat: 32.8900, lng: -97.1500 },
  { zip: "76051", city: "Grapevine", lat: 32.9300, lng: -97.0800 },
  { zip: "76052", city: "Haslet", lat: 32.9700, lng: -97.3500 },
  { zip: "76053", city: "Hurst", lat: 32.8200, lng: -97.1700 },
  { zip: "76054", city: "Hurst", lat: 32.8400, lng: -97.1500 },
  { zip: "76092", city: "Southlake", lat: 32.9400, lng: -97.1300 },
  { zip: "76102", city: "Fort Worth", lat: 32.7500, lng: -97.3300 },
  { zip: "76103", city: "Fort Worth", lat: 32.7400, lng: -97.2900 },
  { zip: "76104", city: "Fort Worth", lat: 32.7300, lng: -97.3200 },
  { zip: "76107", city: "Fort Worth", lat: 32.7600, lng: -97.3900 },
  { zip: "76108", city: "Fort Worth", lat: 32.7600, lng: -97.4700 },
  { zip: "76109", city: "Fort Worth", lat: 32.7100, lng: -97.3800 },
  { zip: "76110", city: "Fort Worth", lat: 32.7000, lng: -97.3300 },
  { zip: "76111", city: "Fort Worth", lat: 32.7800, lng: -97.3000 },
  { zip: "76112", city: "Fort Worth", lat: 32.7600, lng: -97.2600 },
  { zip: "76116", city: "Fort Worth", lat: 32.7400, lng: -97.4300 },
  { zip: "76117", city: "Fort Worth", lat: 32.8000, lng: -97.2800 },
  { zip: "76118", city: "Fort Worth", lat: 32.8100, lng: -97.2300 },
  { zip: "76119", city: "Fort Worth", lat: 32.7000, lng: -97.2700 },
  { zip: "76120", city: "Fort Worth", lat: 32.7800, lng: -97.2100 },
  { zip: "75001", city: "Addison", lat: 32.9600, lng: -96.8300 },
  { zip: "75006", city: "Carrollton", lat: 32.9500, lng: -96.8900 },
  { zip: "75007", city: "Carrollton", lat: 33.0000, lng: -96.9000 },
  { zip: "75019", city: "Coppell", lat: 32.9600, lng: -97.0100 },
  { zip: "75022", city: "Flower Mound", lat: 33.0100, lng: -97.0900 },
  { zip: "75028", city: "Flower Mound", lat: 33.0300, lng: -97.0700 },
  { zip: "75038", city: "Irving", lat: 32.8600, lng: -96.9700 },
  { zip: "75039", city: "Irving", lat: 32.8800, lng: -96.9500 },
  { zip: "75040", city: "Garland", lat: 32.9100, lng: -96.6400 },
  { zip: "75041", city: "Garland", lat: 32.8900, lng: -96.6300 },
  { zip: "75042", city: "Garland", lat: 32.9100, lng: -96.6600 },
  { zip: "75043", city: "Garland", lat: 32.8700, lng: -96.6100 },
  { zip: "75044", city: "Garland", lat: 32.9400, lng: -96.6500 },
  { zip: "75050", city: "Grand Prairie", lat: 32.7500, lng: -97.0200 },
  { zip: "75051", city: "Grand Prairie", lat: 32.7300, lng: -97.0000 },
  { zip: "75052", city: "Grand Prairie", lat: 32.7000, lng: -97.0400 },
  { zip: "75056", city: "The Colony", lat: 33.0800, lng: -96.8900 },
  { zip: "75057", city: "Lewisville", lat: 33.0500, lng: -97.0000 },
  { zip: "75067", city: "Lewisville", lat: 33.0200, lng: -97.0200 },
  { zip: "75068", city: "Little Elm", lat: 33.1600, lng: -96.9400 },
  { zip: "75069", city: "McKinney", lat: 33.1900, lng: -96.6100 },
  { zip: "75070", city: "McKinney", lat: 33.2100, lng: -96.6700 },
  { zip: "75071", city: "McKinney", lat: 33.2400, lng: -96.6400 },
  { zip: "75074", city: "Plano", lat: 33.0400, lng: -96.6700 },
  { zip: "75075", city: "Plano", lat: 33.0200, lng: -96.7000 },
  { zip: "75080", city: "Richardson", lat: 32.9500, lng: -96.7300 },
  { zip: "75081", city: "Richardson", lat: 32.9300, lng: -96.7000 },
  { zip: "75082", city: "Richardson", lat: 32.9700, lng: -96.6700 },
  { zip: "75087", city: "Rockwall", lat: 32.9300, lng: -96.4600 },
  { zip: "75093", city: "Plano", lat: 33.0600, lng: -96.8200 },
  { zip: "75094", city: "Plano", lat: 33.0200, lng: -96.6200 },
  { zip: "75098", city: "Wylie", lat: 33.0100, lng: -96.5400 },
  { zip: "75115", city: "DeSoto", lat: 32.5900, lng: -96.8600 },
  { zip: "75116", city: "Duncanville", lat: 32.6500, lng: -96.9100 },
  { zip: "75126", city: "Forney", lat: 32.7500, lng: -96.4700 },
  { zip: "75134", city: "Lancaster", lat: 32.5900, lng: -96.7600 },
  { zip: "75141", city: "Hutchins", lat: 32.6400, lng: -96.7100 },
  { zip: "75149", city: "Mesquite", lat: 32.7700, lng: -96.5900 },
  { zip: "75150", city: "Mesquite", lat: 32.8100, lng: -96.5900 },
  { zip: "75154", city: "Red Oak", lat: 32.5200, lng: -96.8000 },
  { zip: "75159", city: "Seagoville", lat: 32.6400, lng: -96.5500 },
  { zip: "75166", city: "Lavon", lat: 33.0400, lng: -96.4300 },
  { zip: "75173", city: "Nevada", lat: 33.0400, lng: -96.3800 },
  { zip: "75180", city: "Balch Springs", lat: 32.7200, lng: -96.6200 },
  { zip: "75181", city: "Mesquite", lat: 32.7400, lng: -96.5500 },
  { zip: "75182", city: "Sunnyvale", lat: 32.7900, lng: -96.5600 },
  { zip: "75189", city: "Royse City", lat: 32.9700, lng: -96.3300 },
];

const SERVICE_CATEGORIES = [
  "Roofing", "HVAC", "Plumbing", "Electrical", "Landscaping",
  "Pest Control", "Painting", "Flooring", "Windows & Doors",
  "Gutters", "Siding", "Concrete & Masonry", "Fencing",
  "Pool & Spa", "Handyman", "Insulation", "Garage Doors",
  "Solar & Energy", "Security Systems", "Cleaning Services",
];

const TIERS = ["scout", "pro", "crew", "company", "enterprise"];
const TIER_WEIGHTS = [0.25, 0.35, 0.22, 0.12, 0.06]; // distribution

function pickTier() {
  const r = Math.random();
  let cumulative = 0;
  for (let i = 0; i < TIERS.length; i++) {
    cumulative += TIER_WEIGHTS[i];
    if (r < cumulative) return TIERS[i];
  }
  return "scout";
}

const TIER_COMMISSION = { scout: 0.40, pro: 0.55, crew: 0.65, company: 0.72, enterprise: 0.78 };
const TIER_FEE = { scout: 0, pro: 49, crew: 99, company: 199, enterprise: 399 };

const FIRST_NAMES = ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles",
  "Mary", "Patricia", "Jennifer", "Linda", "Barbara", "Elizabeth", "Susan", "Jessica", "Sarah", "Karen",
  "Christopher", "Daniel", "Paul", "Mark", "Donald", "George", "Kenneth", "Steven", "Edward", "Brian",
  "Lisa", "Nancy", "Betty", "Margaret", "Sandra", "Ashley", "Dorothy", "Kimberly", "Emily", "Donna",
  "Anthony", "Kevin", "Jason", "Matthew", "Gary", "Timothy", "Jose", "Larry", "Jeffrey", "Frank",
  "Carol", "Ruth", "Sharon", "Michelle", "Laura", "Sarah", "Kimberly", "Deborah", "Jessica", "Shirley",
  "Carlos", "Luis", "Miguel", "Juan", "Antonio", "Jose", "Francisco", "Manuel", "Pedro", "Jorge",
  "Maria", "Ana", "Rosa", "Elena", "Carmen", "Isabel", "Sofia", "Lucia", "Teresa", "Monica",
];

const LAST_NAMES = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
  "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
  "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
  "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
  "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts",
  "Patel", "Kumar", "Shah", "Ahmed", "Khan", "Ali", "Hassan", "Malik", "Chaudhry", "Siddiqui",
];

const COMPANY_SUFFIXES = ["LLC", "Inc.", "Services", "Solutions", "Pros", "Experts", "Group", "Co.", "& Sons", "Contractors"];

function genCompanyName(category, lastName) {
  const style = rand(1, 4);
  if (style === 1) return `${lastName} ${category} ${pick(COMPANY_SUFFIXES)}`;
  if (style === 2) return `DFW ${category} ${pick(COMPANY_SUFFIXES)}`;
  if (style === 3) return `${pick(["Premier", "Elite", "Pro", "Expert", "Quality", "Reliable", "Trusted", "Superior"])} ${category}`;
  return `${pick(["North", "South", "East", "West", "Central"])} Texas ${category}`;
}

// ─── PHASE 1: Top up partners to 1,010 ───────────────────────────────────────
console.log("\n📋 Phase 1: Checking current partner count...");
const [countRows] = await conn.execute("SELECT COUNT(*) as cnt FROM partners");
const currentCount = parseInt(countRows[0].cnt);
console.log(`   Current partners: ${currentCount}`);
const toAdd = Math.max(0, 1010 - currentCount);
console.log(`   Adding: ${toAdd} partners`);

if (toAdd > 0) {
  const partnerBatch = [];
  for (let i = 0; i < toAdd; i++) {
    const firstName = pick(FIRST_NAMES);
    const lastName = pick(LAST_NAMES);
    const category = pick(SERVICE_CATEGORIES);
    const zipData = pick(DFW_ZIPS);
    const tier = pickTier();
    const commRate = TIER_COMMISSION[tier];
    const subFee = TIER_FEE[tier];
    const platformFeeRate = 0.12;
    const refCommRate = parseFloat((platformFeeRate * commRate).toFixed(4));
    const jobsLogged = rand(0, 180);
    const oppsGen = Math.floor(jobsLogged * randFloat(0.3, 0.8));
    const totalComm = parseFloat((oppsGen * randFloat(15, 85)).toFixed(2));
    const rating = randFloat(3.5, 5.0, 2);
    const reviewCount = rand(0, 47);
    const priorityScore = rand(20, 98);
    const approvedAt = randDate(730, 30);
    const appliedAt = new Date(approvedAt.getTime() - rand(1, 14) * 86400000);

    partnerBatch.push([
      genCompanyName(category, lastName),
      category,
      `${zipData.city}, TX ${zipData.zip}`,
      zipData.lat + randFloat(-0.05, 0.05, 5),
      zipData.lng + randFloat(-0.05, 0.05, 5),
      rand(10, 35),
      `${firstName} ${lastName}`,
      `${firstName.toLowerCase()}.${lastName.toLowerCase()}${rand(10,99)}@${pick(["gmail.com","yahoo.com","outlook.com","icloud.com"])}`,
      `(${pick(["214","972","817","469","682","940"])}) ${rand(200,999)}-${rand(1000,9999)}`,
      "approved",
      tier, subFee.toFixed(2), commRate.toFixed(4), platformFeeRate.toFixed(4), refCommRate.toFixed(4),
      null, "0.00", false, false,
      rand(0, 25), rand(0, 40), jobsLogged, oppsGen,
      totalComm.toFixed(2), (totalComm * 0.85).toFixed(2),
      priorityScore, randFloat(1.5, 48.0, 2),
      rating.toFixed(2), reviewCount, rand(0, 8),
      "active",
      appliedAt, approvedAt,
    ]);
  }

  // Insert in batches of 50
  for (let i = 0; i < partnerBatch.length; i += 50) {
    const batch = partnerBatch.slice(i, i + 50);
    await conn.query(
      `INSERT INTO partners (
        businessName, businessType, serviceArea,
        serviceAreaLat, serviceAreaLng, serviceRadiusMiles,
        contactName, contactEmail, contactPhone,
        status, tier, subscriptionFee, commissionRate, platformFeeRate, referralCommissionRate,
        monthlyCommissionCap, monthlyCommissionEarned, isExempt, isFoundingPartner,
        referralCount, leadsCount, jobsLogged, opportunitiesGenerated,
        totalCommissionEarned, totalCommissionPaid,
        priorityScore, avgLeadResponseHours,
        rating, reviewCount, partnersReferred,
        trialStatus, appliedAt, approvedAt
      ) VALUES ?`,
      [batch]
    );
    process.stdout.write(`   Partners: ${Math.min(i + 50, partnerBatch.length)}/${partnerBatch.length}\r`);
  }
  console.log(`\n✅ Partners seeded to 1,010`);
}

// ─── PHASE 2: Get all partner IDs for FK references ──────────────────────────
console.log("\n📋 Phase 2: Loading partner IDs...");
const [partnerRows] = await conn.execute("SELECT id, serviceArea FROM partners WHERE status = 'approved' LIMIT 1010");
const partnerIds = partnerRows.map(r => r.id);
console.log(`   Loaded ${partnerIds.length} partner IDs`);

// ─── PHASE 3: Generate 15,000 home profiles (users → homeownerProfiles → properties) ───
console.log("\n📋 Phase 3: Generating 15,000 home profiles...");
const [propCountRows] = await conn.execute("SELECT COUNT(*) as cnt FROM properties");
const existingProps = parseInt(propCountRows[0].cnt);
const propsToAdd = Math.max(0, 15000 - existingProps);
console.log(`   Existing: ${existingProps}, Adding: ${propsToAdd}`);

const STREET_NAMES = [
  "Oak", "Maple", "Cedar", "Pine", "Elm", "Willow", "Birch", "Walnut", "Pecan", "Magnolia",
  "Highland", "Meadow", "Valley", "Ridge", "Creek", "Lake", "Forest", "Prairie", "Summit", "Canyon",
  "Main", "Park", "Church", "Mill", "River", "Spring", "Hill", "Sunset", "Sunrise", "Heritage",
  "Mockingbird", "Greenville", "Preston", "Skillman", "Abrams", "Henderson", "Inwood",
  "Westover", "Eastside", "Northgate", "Southpark", "Midway", "Beltline", "Coit", "Campbell",
];
const STREET_TYPES = ["Dr", "St", "Ave", "Blvd", "Ln", "Ct", "Way", "Pl", "Rd", "Cir", "Trail", "Pass"];
const HOME_STYLES = ["traditional", "craftsman", "modern", "ranch", "colonial", "contemporary", "farmhouse", "mediterranean"];
const YEAR_BUILT_RANGES = [
  [1960, 1975], [1975, 1985], [1985, 1995], [1995, 2005], [2005, 2015], [2015, 2024]
];
const OWNERSHIP_YEARS = ["under_1", "1_to_3", "3_to_7", "7_to_15", "over_15"];
const LOT_SIZES = ["under_0_25", "0_25_to_0_5", "0_5_to_1", "over_1"];

const propertyIds = [];

if (propsToAdd > 0) {
  const BATCH_SIZE = 100; // smaller batches for 3-table chain
  for (let i = 0; i < propsToAdd; i += BATCH_SIZE) {
    const batchSize = Math.min(BATCH_SIZE, propsToAdd - i);

    // Step A: Create demo users
    const userBatch = [];
    for (let j = 0; j < batchSize; j++) {
      const firstName = pick(FIRST_NAMES);
      const lastName = pick(LAST_NAMES);
      const uid = `demo_ho_${Date.now()}_${i}_${j}_${rand(1000,9999)}`;
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${rand(10,99)}@demohomeowner.prolnk`;
      userBatch.push([uid, `${firstName} ${lastName}`, email, "demo", "user", randDate(540, 10)]);
    }
    const [userResult] = await conn.query(
      `INSERT INTO users (openId, name, email, loginMethod, role, createdAt) VALUES ?`,
      [userBatch]
    );
    const firstUserId = userResult.insertId;

    // Step B: Create homeownerProfiles for each user
    const hoBatch = [];
    for (let j = 0; j < batchSize; j++) {
      hoBatch.push([firstUserId + j, true, true, true, true, true, randDate(540, 10)]);
    }
    const [hoResult] = await conn.query(
      `INSERT INTO homeownerProfiles (userId, setupComplete, consentTerms, consentPhotos, consentPartnerContact, consentAiData, createdAt) VALUES ?`,
      [hoBatch]
    );
    const firstHoId = hoResult.insertId;

    // Step C: Create properties linked to homeownerProfiles
    const propBatch = [];
    for (let j = 0; j < batchSize; j++) {
      const zipData = pick(DFW_ZIPS);
      const yearRange = pick(YEAR_BUILT_RANGES);
      const yearBuilt = rand(yearRange[0], yearRange[1]);
      const sqft = rand(1200, 4800);
      const beds = rand(2, 6);
      const baths = parseFloat((rand(1, 4) + pick([0, 0.5])).toFixed(1));
      const hasPool = Math.random() < 0.22;
      const hasGarage = Math.random() < 0.85;
      const hasFence = Math.random() < 0.70;
      const isRental = Math.random() < 0.18;
      const ownershipYears = pick(OWNERSHIP_YEARS);
      const homeStyle = pick(HOME_STYLES);
      const setupComplete = Math.random() < 0.72;
      const setupStep = setupComplete ? 7 : rand(2, 6);
      const createdAt = randDate(540, 10);

      propBatch.push([
        firstHoId + j,
        `${rand(100, 9999)} ${pick(STREET_NAMES)} ${pick(STREET_TYPES)}`,
        zipData.city, "TX", zipData.zip,
        zipData.lat + randFloat(-0.04, 0.04, 5),
        zipData.lng + randFloat(-0.04, 0.04, 5),
        "single_family",
        yearBuilt, sqft, beds, baths.toFixed(1),
        pick(LOT_SIZES), hasPool, hasGarage,
        hasGarage ? pick(["attached", "detached"]) : "none",
        hasFence,
        true, isRental,
        isRental ? "tenant_occupied" : pick(["owner_occupied", "owner_occupied", "owner_occupied", "vacant"]),
        ownershipYears,
        JSON.stringify([]),
        setupStep, setupComplete,
        createdAt,
      ]);
    }

    const [propResult] = await conn.query(
      `INSERT INTO properties (
        ownerId, address, city, state, zip,
        latitude, longitude, propertyType,
        yearBuilt, sqft, bedrooms, bathrooms,
        lotSize, hasPool, hasGarage, garageType, hasFence,
        isPrimary, isRental, occupancy, ownershipYears,
        hiringPriorities,
        setupStep, setupComplete, createdAt
      ) VALUES ?`,
      [propBatch]
    );

    const firstPropId = propResult.insertId;
    for (let k = 0; k < batchSize; k++) propertyIds.push(firstPropId + k);

    process.stdout.write(`   Properties: ${Math.min(i + BATCH_SIZE, propsToAdd)}/${propsToAdd}\r`);
  }
  console.log(`\n✅ 15,000 home profiles created (users + homeownerProfiles + properties)`);
} else {
  // Load existing property IDs
  const [existingPropRows] = await conn.execute("SELECT id FROM properties LIMIT 15000");
  existingPropRows.forEach(r => propertyIds.push(r.id));
  console.log(`   Using ${propertyIds.length} existing property IDs`);
}

// ─── PHASE 4: Property Assets (roof, HVAC, etc.) ─────────────────────────────
console.log("\n📋 Phase 4: Generating property assets...");
const [assetCountRows] = await conn.execute("SELECT COUNT(*) as cnt FROM propertyAssets");
const existingAssets = parseInt(assetCountRows[0].cnt);
console.log(`   Existing assets: ${existingAssets}`);

if (existingAssets < 30000) {
  const ASSET_TYPES = ["roof", "hvac", "water_heater", "windows", "siding", "deck", "fence", "pool", "appliance", "other"];
  const CONDITIONS = ["excellent", "good", "fair", "poor", "unknown"];
  const CONDITION_WEIGHTS = [0.15, 0.40, 0.28, 0.12, 0.05];
  const MANUFACTURERS = {
    roof: ["GAF", "Owens Corning", "CertainTeed", "Atlas", "IKO"],
    hvac: ["Carrier", "Trane", "Lennox", "Goodman", "Rheem", "York", "American Standard"],
    water_heater: ["Rheem", "Bradford White", "A.O. Smith", "State", "Navien"],
    gutters: ["Amerimax", "Spectra", "Genova", "Raingo"],
    windows: ["Andersen", "Pella", "Marvin", "Simonton", "Milgard"],
    siding: ["James Hardie", "LP SmartSide", "Certainteed", "Alside"],
    deck: ["Trex", "TimberTech", "Fiberon", "Azek"],
    garage_door: ["Clopay", "Amarr", "Wayne Dalton", "Overhead Door"],
    insulation: ["Owens Corning", "Johns Manville", "CertainTeed", "Knauf"],
    foundation: ["Ram Jack", "Olshan", "Foundation Supportworks"],
  };

  function pickCondition() {
    const r = Math.random();
    let cum = 0;
    for (let i = 0; i < CONDITIONS.length; i++) {
      cum += CONDITION_WEIGHTS[i];
      if (r < cum) return CONDITIONS[i];
    }
    return "good";
  }

  const ASSET_BATCH_SIZE = 500;
  // Each property gets 2-4 assets
  const sampleProps = propertyIds.slice(0, 10000); // seed 10k properties with assets

  for (let i = 0; i < sampleProps.length; i += ASSET_BATCH_SIZE) {
    const batch = [];
    const propSlice = sampleProps.slice(i, i + ASSET_BATCH_SIZE);

    for (const propId of propSlice) {
      const numAssets = rand(2, 4);
      const assetTypes = [...ASSET_TYPES].sort(() => Math.random() - 0.5).slice(0, numAssets);

      for (const assetType of assetTypes) {
        const condition = pickCondition();
        const age = rand(1, 22);
        const lifespan = { roof: 25, hvac: 15, water_heater: 12, gutters: 20, windows: 25, siding: 30, deck: 15, garage_door: 20, insulation: 40, foundation: 50 }[assetType] || 20;
        const endOfLifeDate = new Date();
        endOfLifeDate.setFullYear(endOfLifeDate.getFullYear() + Math.max(0, lifespan - age));
        const mfr = pick(MANUFACTURERS[assetType] || ["Generic"]);
        const replacementTriggered = condition === "poor";

        const urgency = condition === 'poor' ? 'soon' : condition === 'fair' ? 'watch' : 'none';
        const installYear = new Date().getFullYear() - age;
        const nextService = new Date();
        nextService.setFullYear(nextService.getFullYear() + 1);
        batch.push([
          propId, assetType, installYear, lifespan, condition,
          randDate(90), nextService, urgency,
          null, null, null,
          replacementTriggered ? 1 : 0,
          replacementTriggered ? rand(40, 85) : null,
          replacementTriggered ? randDate(30) : null,
        ]);
      }
    }
    await conn.query(
      `INSERT INTO propertyAssets (
        propertyId, assetType, installYear, estimatedLifespanYears, \`condition\`,
        lastServicedAt, nextServiceDue, replacementUrgency,
        estimatedReplacementCost, photoUrl, notes,
        aiAnalyzed, aiConditionScore, aiAnalyzedAt
      ) VALUES ?`,
      [batch]
    );

    process.stdout.write(`   Assets: ${Math.min(i + ASSET_BATCH_SIZE, sampleProps.length)}/${sampleProps.length}\r`);
  }
  console.log(`\n✅ Property assets generated`);
}

// ─── PHASE 5: Event Triggers ──────────────────────────────────────────────────
console.log("\n📋 Phase 5: Generating event triggers...");
const [etCountRows] = await conn.execute("SELECT COUNT(*) as cnt FROM eventTriggers");
const existingET = parseInt(etCountRows[0].cnt);
console.log(`   Existing event triggers: ${existingET}`);

if (existingET < 5000) {
  const ET_TYPES = ["storm", "asset_age", "market_event", "safety_recall", "manual"];
  const ET_SOURCES = ["noaa_weather", "asset_aging_engine", "market_data", "cpsc_recall", "calendar_engine"];
  const SEVERITIES = ["low", "medium", "high", "critical"];

  const etBatch = [];
  const samplePropsForET = propertyIds.slice(0, 8000);

  for (let i = 0; i < 5000; i++) {
    const propId = pick(samplePropsForET);
    const triggerType = pick(ET_TYPES);
    const severity = pick(SEVERITIES);
    const triggeredAt = randDate(180, 1);
    const leadsGen = rand(0, 4);
    const processed = Math.random() < 0.85;

     const etStatus = processed ? 'lead_generated' : 'detected';
    etBatch.push([
      propId, triggerType,
      ET_SOURCES[ET_TYPES.indexOf(triggerType)],
      JSON.stringify({ description: `${triggerType} detected`, severity }),
      severity, etStatus,
      triggeredAt,
      processed ? new Date(triggeredAt.getTime() + rand(5, 120) * 60000) : null,
      new Date(triggeredAt.getTime() + 30 * 24 * 60 * 60000),
    ]);
  }
  for (let i = 0; i < etBatch.length; i += 500) {
    await conn.query(
      `INSERT INTO eventTriggers (
        propertyId, triggerType, triggerSource, triggerData,
        severity, status, detectedAt, processedAt, expiresAt
      ) VALUES ?`,
      [etBatch.slice(i, i + 500)]
    );
    process.stdout.write(`   Event triggers: ${Math.min(i + 500, etBatch.length)}/5000\r`);
  }
  console.log(`\n✅ 5,000 event triggers generated`);
}

// ─── PHASE 6: Event-Driven Leads ─────────────────────────────────────────────
console.log("\n📋 Phase 6: Generating event-driven leads...");
const [edlCountRows] = await conn.execute("SELECT COUNT(*) as cnt FROM eventDrivenLeads");
const existingEDL = parseInt(edlCountRows[0].cnt);
console.log(`   Existing event-driven leads: ${existingEDL}`);

if (existingEDL < 3000) {
  const EDL_TYPES = ["preventive_repair", "post_storm_inspection", "asset_replacement", "pre_inspection_repair", "safety_recall_replacement", "winterization", "weatherproofing"];
  const EDL_STATUSES = ["generated", "dispatched", "accepted", "completed", "expired"];
  const EDL_STATUS_WEIGHTS = [0.15, 0.25, 0.30, 0.20, 0.10];

  function pickEDLStatus() {
    const r = Math.random();
    let cum = 0;
    for (let i = 0; i < EDL_STATUSES.length; i++) {
      cum += EDL_STATUS_WEIGHTS[i];
      if (r < cum) return EDL_STATUSES[i];
    }
    return "generated";
  }

  const edlBatch = [];
  for (let i = 0; i < 3000; i++) {
    const propId = pick(propertyIds.slice(0, 8000));
    const partnerId = pick(partnerIds);
    const status = pickEDLStatus();
    const estValue = randFloat(250, 8500, 2);
    const actualValue = status === "completed" ? randFloat(estValue * 0.8, estValue * 1.2, 2) : null;
    const commission = status === "completed" ? parseFloat((actualValue * 0.12 * 0.55).toFixed(2)) : null;
    const createdAt = randDate(180, 1);
    const dispatchedAt = status !== "generated" ? new Date(createdAt.getTime() + rand(1, 24) * 3600000) : null;
    const acceptedAt = ["accepted", "completed"].includes(status) ? new Date(dispatchedAt.getTime() + rand(1, 48) * 3600000) : null;
    const completedAt = status === "completed" ? new Date(acceptedAt.getTime() + rand(1, 14) * 86400000) : null;
    const expiresAt = new Date(createdAt.getTime() + 7 * 86400000);

    const edlStatus = status === 'generated' ? 'new' : status === 'dispatched' ? 'sent' : status === 'accepted' ? 'accepted' : status === 'completed' ? 'converted' : 'expired';
    edlBatch.push([
      null, propId, partnerId,
      pick(EDL_TYPES), edlStatus,
      estValue.toFixed(2), rand(50, 99),
      dispatchedAt, acceptedAt ? new Date(acceptedAt.getTime() + rand(1,12)*3600000) : null,
      acceptedAt, completedAt,
    ]);
  }

  for (let i = 0; i < edlBatch.length; i += 500) {
    await conn.query(
      `INSERT INTO eventDrivenLeads (
        triggerId, propertyId, partnerId,
        leadType, status,
        estimatedJobValue, matchScore, sentAt, viewedAt, respondedAt, convertedAt
      ) VALUES ?`,
      [edlBatch.slice(i, i + 500)]
    );
    process.stdout.write(`   Event-driven leads: ${Math.min(i + 500, edlBatch.length)}/3000\r`);
  }
  console.log(`\n✅ 3,000 event-driven leads generated`);
}

// ─── PHASE 7: AI Pipeline Runs ────────────────────────────────────────────────
console.log("\n📋 Phase 7: Generating AI pipeline runs...");
const [aiCountRows] = await conn.execute("SELECT COUNT(*) as cnt FROM aiPipelineRuns");
const existingAI = parseInt(aiCountRows[0].cnt);
console.log(`   Existing AI pipeline runs: ${existingAI}`);

if (existingAI < 8000) {
  const AI_STAGES = ["preprocessing", "relevance_filter", "feature_extraction", "condition_classification", "confidence_scoring", "completed"];
  const aiBatch = [];

  for (let i = 0; i < 8000; i++) {
    const partnerId = pick(partnerIds);
    const completed = Math.random() < 0.89;
    const stage = completed ? "completed" : pick(AI_STAGES.slice(0, 5));
    const conditionsDetected = completed ? rand(0, 5) : 0;
    const leadsGen = conditionsDetected > 0 ? rand(0, conditionsDetected) : 0;
    const confidence = completed ? randFloat(0.55, 0.97, 4) : null;
    const processingMs = completed ? rand(850, 4200) : null;
    const startedAt = randDate(180, 1);
    const completedAt = completed ? new Date(startedAt.getTime() + (processingMs || 2000)) : null;

    const runType = pick(['photo_analysis','asset_detection','lead_matching','recall_scan','storm_scan','full_cycle']);
    aiBatch.push([
      runType,
      completed ? 'completed' : 'running',
      conditionsDetected + rand(1,10),
      leadsGen,
      completed ? 0 : rand(0,2),
      processingMs,
      'v2.4.1',
      'system',
      startedAt, completedAt,
    ]);
  }

  for (let i = 0; i < aiBatch.length; i += 500) {
    await conn.query(
      `INSERT INTO aiPipelineRuns (
        runType, status, inputCount, outputCount, errorCount,
        processingTimeMs, modelVersion, triggeredBy, startedAt, completedAt
      ) VALUES ?`,
      [aiBatch.slice(i, i + 500)]
    );
    process.stdout.write(`   AI pipeline runs: ${Math.min(i + 500, aiBatch.length)}/8000\r`);
  }
  console.log(`\n✅ 8,000 AI pipeline runs generated`);
}

// ─── PHASE 8: Recall Alerts ───────────────────────────────────────────────────
console.log("\n📋 Phase 8: Seeding recall alerts...");
const [recallCountRows] = await conn.execute("SELECT COUNT(*) as cnt FROM recallAlerts");
const existingRecalls = parseInt(recallCountRows[0].cnt);

if (existingRecalls < 12) {
  const recalls = [
    ["CPSC-2024-001", "Rheem Performance Platinum Water Heater", "Rheem", "Gas valve malfunction may cause gas leak and fire hazard", "Risk of fire and explosion", ["water_heater"], ["Rheem", "Ruud"], 847, 312, "active"],
    ["CPSC-2024-002", "Goodman GMVC96 Gas Furnace", "Goodman Manufacturing", "Heat exchanger crack may allow carbon monoxide to enter living space", "Carbon monoxide poisoning risk", ["hvac"], ["Goodman", "Amana"], 1203, 445, "active"],
    ["CPSC-2023-089", "GAF Timberline HDZ Shingles (2019-2021)", "GAF", "Premature granule loss in high-UV environments", "Accelerated roof degradation", ["roof"], ["GAF"], 2341, 891, "active"],
    ["CPSC-2024-015", "Clopay Gallery Steel Garage Door Panels", "Clopay Building Products", "Panel separation under high wind conditions", "Injury risk from falling panels", ["garage_door"], ["Clopay"], 567, 198, "active"],
    ["CPSC-2023-112", "Andersen 400 Series Windows (2018-2020)", "Andersen Corporation", "Seal failure causing moisture infiltration and mold growth", "Health risk from mold exposure", ["windows"], ["Andersen"], 1876, 634, "monitoring"],
    ["CPSC-2024-033", "Trex Transcend Composite Decking (2020-2022)", "Trex Company", "Surface delamination under thermal cycling", "Slip and fall hazard", ["deck"], ["Trex"], 423, 156, "active"],
    ["CPSC-2023-078", "Carrier Infinity 21 Heat Pump", "Carrier Global", "Refrigerant leak in specific serial number ranges", "Environmental and health hazard", ["hvac"], ["Carrier", "Bryant"], 934, 367, "active"],
    ["CPSC-2024-044", "James Hardie HardiePlank (2017-2019)", "James Hardie Industries", "Premature paint adhesion failure in high-humidity climates", "Aesthetic degradation and moisture infiltration", ["siding"], ["James Hardie"], 1567, 523, "monitoring"],
    ["CPSC-2023-201", "Owens Corning Duration Shingles (2020)", "Owens Corning", "Adhesive strip failure in extreme heat above 110°F", "Wind uplift and blow-off risk", ["roof"], ["Owens Corning"], 3102, 1204, "active"],
    ["CPSC-2024-067", "Bradford White Defender Safety System Water Heater", "Bradford White", "Temperature and pressure relief valve may not open at rated pressure", "Risk of tank rupture", ["water_heater"], ["Bradford White"], 678, 234, "active"],
    ["CPSC-2023-156", "Lennox XC21 Air Conditioner", "Lennox International", "Compressor failure in units manufactured Q3 2021", "System failure and potential refrigerant leak", ["hvac"], ["Lennox"], 445, 167, "resolved"],
    ["CPSC-2024-088", "LP SmartSide Trim & Fascia (2019-2021)", "Louisiana-Pacific Corporation", "Moisture absorption at cut ends causing swelling and rot", "Structural integrity concern", ["siding"], ["LP SmartSide"], 892, 312, "active"],
  ];

  const recallBatch = recalls.map(r => [
    r[0],           // recallId
    r[1],           // title
    `${r[3]} (Manufacturer: ${r[2]})`, // description
    r[4],           // hazardType
    JSON.stringify([...r[5], ...r[6]]), // affectedProducts
    r[7],           // affectedPropertyCount
    r[8],           // leadsGenerated
    r[9] !== 'resolved' ? 1 : 0, // isActive
    new Date(Date.now() - rand(30, 365) * 86400000), // publishedAt
  ]);

  await conn.query(
    `INSERT INTO recallAlerts (
      recallId, title, description,
      hazardType, affectedProducts,
      affectedPropertyCount, leadsGenerated, isActive, publishedAt
    ) VALUES ?`,
    [recallBatch]
  );
  console.log(`✅ 12 recall alerts seeded`);
}

// ─── PHASE 9: Partner Reviews ─────────────────────────────────────────────────
console.log("\n📋 Phase 9: Generating partner reviews...");
const [reviewCountRows] = await conn.execute("SELECT COUNT(*) as cnt FROM partnerReviews");
const existingReviews = parseInt(reviewCountRows[0].cnt);
console.log(`   Existing reviews: ${existingReviews}`);

if (existingReviews < 4000) {
  const REVIEW_COMMENTS = [
    "Excellent work, very professional and on time.",
    "Did a great job, would hire again.",
    "Showed up on time, completed the work quickly.",
    "Very knowledgeable and explained everything clearly.",
    "Fair pricing and quality work.",
    "Went above and beyond what was expected.",
    "Clean workmanship, left the area spotless.",
    "Highly recommend to anyone in the DFW area.",
    "Responsive and communicated well throughout.",
    "Fixed the issue the first time, no callbacks needed.",
    "Professional crew, minimal disruption to our home.",
    "Completed on schedule and within budget.",
    "Would not hesitate to use them again.",
    "Outstanding customer service from start to finish.",
    "Competitive pricing with top-quality results.",
  ];

  const reviewBatch = [];
  const samplePartners = partnerIds.slice(0, 800);

  for (let i = 0; i < 4000; i++) {
    const partnerId = pick(samplePartners);
    const rating = Math.random() < 0.7 ? rand(4, 5) : rand(3, 5);
    const createdAt = randDate(540, 10);

     const names = ['James Wilson','Maria Garcia','Robert Johnson','Linda Martinez','David Brown','Susan Davis','Michael Miller','Karen Anderson','William Taylor','Patricia Thomas'];
    const name = pick(names);
    reviewBatch.push([
      null, partnerId, name, `${name.toLowerCase().replace(' ','.')}@email.com`,
      rating, pick(REVIEW_COMMENTS),
      rand(3,5), rand(3,5), rand(3,5), rand(3,5),
      rating >= 4, createdAt,
    ]);
  }
  for (let i = 0; i < reviewBatch.length; i += 500) {
    await conn.query(
      `INSERT INTO partnerReviews (
        dealId, partnerId, homeownerName, homeownerEmail,
        rating, reviewText,
        ratingPunctuality, ratingQuality, ratingCommunication, ratingValue,
        isPublic, createdAt
      ) VALUES ?`,
      [reviewBatch.slice(i, i + 500)]
    );
    process.stdout.write(`   Reviews: ${Math.min(i + 500, reviewBatch.length)}/4000\r`);
  }
  console.log(`\n✅ 4,000 partner reviews generated`);
}

// ─── PHASE 10: Referral Graph ─────────────────────────────────────────────────
console.log("\n📋 Phase 10: Generating referral network...");
const [refCountRows] = await conn.execute("SELECT COUNT(*) as cnt FROM referralGraph");
const existingRefs = parseInt(refCountRows[0].cnt);
console.log(`   Existing referrals: ${existingRefs}`);

if (existingRefs < 2000) {
  const REF_STATUSES = ["pending", "accepted", "completed", "expired"];
  const refBatch = [];

  for (let i = 0; i < 2000; i++) {
    const fromId = pick(partnerIds.slice(0, 400));
    const toId = pick(partnerIds.slice(400, 1010));
    const propId = pick(propertyIds.slice(0, 5000));
    const status = pick(REF_STATUSES);
    const jobValue = status === "completed" ? randFloat(500, 12000, 2) : null;
    const commission = status === "completed" ? parseFloat((jobValue * 0.12 * 0.55).toFixed(2)) : null;
    const createdAt = randDate(365, 1);

    refBatch.push([
      fromId, toId, propId,
      pick(SERVICE_CATEGORIES),
      status, jobValue ? jobValue.toFixed(2) : null,
      commission ? commission.toFixed(2) : null,
      createdAt,
    ]);
  }

  for (let i = 0; i < refBatch.length; i += 500) {
    await conn.query(
      `INSERT INTO referralGraph (
        fromPartnerId, toPartnerId, propertyId,
        serviceCategory, status, jobValue, commissionEarned, createdAt
      ) VALUES ?`,
      [refBatch.slice(i, i + 500)]
    );
    process.stdout.write(`   Referrals: ${Math.min(i + 500, refBatch.length)}/2000\r`);
  }
  console.log(`\n✅ 2,000 referral connections generated`);
}

// ─── Final Count ──────────────────────────────────────────────────────────────
console.log("\n📊 Final Database Counts:");
const tables = ["partners", "properties", "propertyAssets", "eventTriggers", "eventDrivenLeads", "aiPipelineRuns", "recallAlerts", "partnerReviews", "referralGraph", "jobs", "opportunities", "commissions"];
for (const tbl of tables) {
  const [rows] = await conn.execute(`SELECT COUNT(*) as cnt FROM \`${tbl}\``);
  console.log(`   ${tbl.padEnd(25)} ${rows[0].cnt.toString().padStart(6)}`);
}

await conn.end();
console.log("\n🎉 Full demo dataset complete!\n");
