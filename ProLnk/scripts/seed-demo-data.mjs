/**
 * ProLnk Demo Data Seeder
 * Seeds 50 DFW partners, 200 jobs, 400 opportunities, commissions, and broadcasts
 * Run: node scripts/seed-demo-data.mjs
 */
import { createConnection } from "mysql2/promise";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../.env") });

const DB_URL = process.env.DATABASE_URL;
if (!DB_URL) throw new Error("DATABASE_URL not set");

// ─── DFW Data ─────────────────────────────────────────────────────────────────
const DFW_ZIPS = ["75201","75204","75205","75206","75209","75214","75218","75220","75225","75230","75231","75240","75243","75244","75248","75252","75287","75001","75006","75007","75010","75019","75022","75024","75025","75034","75035","75038","75039","75040","75041","75042","75043","75044","75048","75050","75051","75052","75054","75056","75057","75060","75061","75062","75063","75065","75067","75068","75069","75070","75071","75074","75075","75080","75081","75082","75083","75087","75088","75089","75093","75094","75098","75099","75104","75115","75116","75119","75120","75125","75126","75132","75134","75135","75137","75138","75141","75142","75143","75146","75147","75148","75149","75150","75154","75155","75157","75158","75159","75160","75161","75163","75164","75165","75166","75167","75168","75169","75172","75173","75180","75181","75182","75185","75187","75189","75201","75202","75203","75204","75205","75206","75207","75208","75209","75210","75211","75212","75214","75215","75216","75217","75218","75219","75220","75221","75222","75223","75224","75225","75226","75227","75228","75229","75230","75231","75232","75233","75234","75235","75236","75237","75238","75240","75241","75243","75244","75245","75246","75247","75248","75249","75250","75251","75252","75253","75254","75260","75261","75262","75263","75264","75265","75266","75267","75270","75275","75277","75283","75284","75285","75287","75301","75303","75312","75313","75315","75320","75326","75336","75339","75342","75346","75353","75354","75355","75356","75357","75358","75359","75360","75363","75364","75367","75368","75370","75371","75372","75373","75374","75376","75378","75379","75380","75381","75382","75386","75387","75388","75389","75390","75391","75392","75393","75394","75395","75396","75397","75398"];

const DFW_CITIES = ["Dallas","Plano","Frisco","McKinney","Allen","Richardson","Garland","Irving","Carrollton","Lewisville","Flower Mound","Southlake","Grapevine","Coppell","Addison","Farmers Branch","Mesquite","Rowlett","Rockwall","Wylie","Sachse","Murphy","Prosper","Celina","Fairview","Lucas","Parker","Forney","Sunnyvale","Balch Springs","Duncanville","DeSoto","Cedar Hill","Lancaster","Mansfield","Arlington","Grand Prairie","Fort Worth","Euless","Bedford","Hurst","Colleyville","Keller","Roanoke","Denton","Corinth","Highland Village","Argyle","Aubrey","Little Elm"];

const TRADE_CATEGORIES = [
  { category: "hvac", label: "HVAC", businesses: ["Air Comfort Solutions","Cool Breeze HVAC","Texas Climate Control","Premier Air Systems","Lone Star HVAC","DFW Heating & Cooling","Comfort Zone HVAC","Elite Air Services"] },
  { category: "plumbing", label: "Plumbing", businesses: ["Flow Masters Plumbing","DFW Pipe Works","Lone Star Plumbing","Clear Flow Solutions","Texas Drain Pros","Precision Plumbing","All-Pro Plumbers","Metro Plumbing Services"] },
  { category: "electrical", label: "Electrical", businesses: ["Bright Spark Electric","DFW Electrical Solutions","Power Pro Electric","Texas Wiring Experts","Volt Masters","Elite Electric DFW","Premier Electrical","Lone Star Electric"] },
  { category: "roofing", label: "Roofing", businesses: ["Apex Roofing DFW","Storm Shield Roofing","Texas Top Roofing","Premier Roof Solutions","Lone Star Roofing","DFW Roof Masters","Elite Roofing Co","Pinnacle Roofing"] },
  { category: "landscaping", label: "Landscaping", businesses: ["Green Thumb Landscaping","DFW Lawn Masters","Texas Turf Pros","Premier Landscapes","Lone Star Lawn Care","Elite Grounds DFW","Nature's Touch Landscaping","Outdoor Living DFW"] },
  { category: "painting", label: "Painting", businesses: ["True Colors Painting","DFW Paint Pros","Texas Brush Masters","Premier Painters","Lone Star Painting","Elite Coat DFW","Precision Painting","Fresh Coat DFW"] },
  { category: "flooring", label: "Flooring", businesses: ["Floor Craft DFW","Texas Tile & Floor","Premier Flooring Solutions","Lone Star Floors","DFW Floor Masters","Elite Flooring Co","Perfect Floors DFW","Step Right Flooring"] },
  { category: "pest_control", label: "Pest Control", businesses: ["Shield Pest Control","DFW Bug Busters","Texas Pest Pros","Premier Pest Solutions","Lone Star Pest","Elite Pest DFW","Guardian Pest Control","Critter Control DFW"] },
  { category: "windows_doors", label: "Windows & Doors", businesses: ["Clear View Windows","DFW Door & Window","Texas Glass Pros","Premier Windows DFW","Lone Star Windows","Elite Glass Solutions","Perfect Pane DFW","Window World DFW"] },
  { category: "general_contractor", label: "General Contractor", businesses: ["Build Right DFW","Texas Remodel Pros","Premier Construction","Lone Star Builders","DFW Build Masters","Elite Contractors","Precision Build DFW","Cornerstone Construction"] },
];

const TIERS = ["scout","scout","scout","scout","pro","pro","pro","crew","crew","company","enterprise"];
const STATUSES = ["approved","approved","approved","approved","approved","approved","approved","approved","approved","pending"];

const FIRST_NAMES = ["James","Michael","Robert","David","John","William","Richard","Joseph","Thomas","Charles","Christopher","Daniel","Matthew","Anthony","Mark","Donald","Steven","Paul","Andrew","Joshua","Kevin","Brian","George","Timothy","Ronald","Edward","Jason","Jeffrey","Ryan","Jacob","Gary","Nicholas","Eric","Jonathan","Stephen","Larry","Justin","Scott","Brandon","Benjamin","Samuel","Raymond","Gregory","Frank","Alexander","Patrick","Jack","Dennis","Jerry","Tyler","Aaron","Jose","Henry","Adam","Douglas","Nathan","Peter","Zachary","Kyle","Walter","Harold","Jeremy","Ethan","Carl","Keith","Roger","Gerald","Christian","Terry","Sean","Arthur","Austin","Noah","Lawrence","Jesse","Joe","Bryan","Billy","Jordan","Albert","Dylan","Bruce","Willie","Gabriel","Alan","Juan","Logan","Wayne","Ralph","Roy","Eugene","Randy","Vincent","Russell","Louis","Philip","Bobby","Johnny","Bradley"];
const LAST_NAMES = ["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez","Hernandez","Lopez","Gonzalez","Wilson","Anderson","Thomas","Taylor","Moore","Jackson","Martin","Lee","Perez","Thompson","White","Harris","Sanchez","Clark","Ramirez","Lewis","Robinson","Walker","Young","Allen","King","Wright","Scott","Torres","Nguyen","Hill","Flores","Green","Adams","Nelson","Baker","Hall","Rivera","Campbell","Mitchell","Carter","Roberts","Gomez","Phillips","Evans","Turner","Diaz","Parker","Cruz","Edwards","Collins","Reyes","Stewart","Morris","Morales","Murphy","Cook","Rogers","Gutierrez","Ortiz","Morgan","Cooper","Peterson","Bailey","Reed","Kelly","Howard","Ramos","Kim","Cox","Ward","Richardson","Watson","Brooks","Chavez","Wood","James","Bennett","Gray","Mendoza","Ruiz","Hughes","Price","Alvarez","Castillo","Sanders","Patel","Myers","Long","Ross","Foster","Jimenez"];

function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randFloat(min, max, decimals = 2) { return parseFloat((Math.random() * (max - min) + min).toFixed(decimals)); }
function randDate(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - randInt(0, daysAgo));
  return d;
}
function randPhone() { return `(${randInt(214,972)}) ${randInt(200,999)}-${randInt(1000,9999)}`; }
function randEmail(name, biz) {
  const slug = name.toLowerCase().replace(/\s+/g, ".") + randInt(1,99);
  const domain = biz.toLowerCase().replace(/[^a-z]/g, "").slice(0,12) + ".com";
  return `${slug}@${domain}`;
}

const OPPORTUNITY_TYPES = [
  { type: "hvac_service", category: "hvac", desc: "HVAC unit showing signs of wear — possible refrigerant leak or failing compressor" },
  { type: "plumbing_repair", category: "plumbing", desc: "Visible pipe corrosion and water staining around fixtures" },
  { type: "electrical_upgrade", category: "electrical", desc: "Outdated panel and exposed wiring detected in utility area" },
  { type: "roof_repair", category: "roofing", desc: "Missing shingles and flashing damage visible from exterior photos" },
  { type: "landscaping_service", category: "landscaping", desc: "Overgrown lawn, dead patches, and drainage issues detected" },
  { type: "painting_service", category: "painting", desc: "Peeling exterior paint and faded trim detected" },
  { type: "flooring_replacement", category: "flooring", desc: "Cracked tile and worn hardwood flooring detected" },
  { type: "pest_inspection", category: "pest_control", desc: "Evidence of pest activity in crawl space and entry points" },
  { type: "window_replacement", category: "windows_doors", desc: "Fogged double-pane windows and damaged weatherstripping detected" },
  { type: "general_repair", category: "general_contractor", desc: "Multiple deferred maintenance items requiring general contractor assessment" },
];

const SERVICE_TYPES = ["HVAC Maintenance","Drain Cleaning","Electrical Inspection","Roof Inspection","Lawn Mowing","Interior Painting","Tile Installation","Pest Inspection","Window Cleaning","Drywall Repair","Gutter Cleaning","Pressure Washing","Fence Repair","Deck Staining","Water Heater Service"];

const BROADCAST_MESSAGES = [
  { subject: "Welcome to the ProLnk Pro Network!", message: "We're thrilled to have you on board. Your first lead could come in any day — make sure your profile is complete and your service area is set correctly." },
  { subject: "New Feature: Lead Source Tagging", message: "Important update: when you receive a ProLnk lead and create the job in your FSM, please set the Lead Source to ProLnk-[YourPartnerID]. This ensures your commission is tracked automatically." },
  { subject: "March Network Stats 🏆", message: "The ProLnk network closed 47 jobs in March totaling $38,400 in job value. Top earner this month: a DFW HVAC company that closed 4 leads for $2,100 in commissions. Keep logging those photos!" },
  { subject: "Tier Upgrade Reminder", message: "Scout tier partners: you're capped at $500/month in commissions. Upgrade to Pro for $29/month and remove the cap entirely. Several partners have already upgraded after hitting the cap in their first 30 days." },
  { subject: "Photo Quality Tips", message: "The AI performs best with clear, well-lit photos taken from 3-5 feet away. Avoid blurry or dark photos. The more detail visible, the more opportunities the AI can detect for you." },
];

async function main() {
  const conn = await createConnection(DB_URL);
  console.log("✅ Connected to database");

  // ─── Check existing data ─────────────────────────────────────────────────────
  const [existingPartners] = await conn.execute("SELECT COUNT(*) as cnt FROM partners");
  const existingCount = existingPartners[0].cnt;
  if (existingCount >= 40) {
    console.log(`⚠️  Database already has ${existingCount} partners. Skipping seed to avoid duplicates.`);
    await conn.end();
    return { skipped: true, reason: `Already has ${existingCount} partners` };
  }

  console.log("🌱 Seeding demo data...");

  // ─── 1. Seed Partners ────────────────────────────────────────────────────────
  const partnerIds = [];
  for (let i = 0; i < 50; i++) {
    const tradeGroup = TRADE_CATEGORIES[i % TRADE_CATEGORIES.length];
    const bizName = tradeGroup.businesses[i % tradeGroup.businesses.length];
    const firstName = rand(FIRST_NAMES);
    const lastName = rand(LAST_NAMES);
    const fullName = `${firstName} ${lastName}`;
    const zip = rand(DFW_ZIPS);
    const city = rand(DFW_CITIES);
    const tier = TIERS[i % TIERS.length];
    const status = STATUSES[i % STATUSES.length];
    const tierConfig = { scout: { fee: 0, rate: 0.40 }, pro: { fee: 29, rate: 0.55 }, crew: { fee: 79, rate: 0.65 }, company: { fee: 149, rate: 0.72 }, enterprise: { fee: 299, rate: 0.78 } };
    const tc = tierConfig[tier];
    const referralCount = randInt(0, 45);
    const jobsLogged = randInt(2, 120);
    const createdAt = randDate(540);

    const approvedAt = status === "approved" ? randDate(500) : null;
    const [result] = await conn.execute(
      `INSERT INTO partners (businessName, businessType, contactName, contactEmail, contactPhone, serviceArea, tier, subscriptionFee, commissionRate, referralCommissionRate, status, referralCount, jobsLogged, opportunitiesGenerated, leadsCount, partnersReferred, appliedAt, approvedAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [bizName, tradeGroup.category, fullName, randEmail(fullName, bizName), randPhone(), `${city}, TX`, tier, tc.fee, tc.rate, 0.05, status, referralCount, jobsLogged, randInt(1, 30), randInt(0, 20), randInt(0, 8), createdAt, approvedAt]
    );
    partnerIds.push(result.insertId);
  }
  console.log(`✅ Seeded ${partnerIds.length} partners`);

  // ─── 2. Seed Jobs ────────────────────────────────────────────────────────────
  const jobIds = [];
  const photoUrls = [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800",
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800",
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800",
    "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
  ];

  for (let i = 0; i < 200; i++) {
    const partnerId = rand(partnerIds);
    const serviceType = rand(SERVICE_TYPES);
    const zip = rand(DFW_ZIPS);
    const city = rand(DFW_CITIES);
    const address = `${randInt(100, 9999)} ${rand(["Oak","Elm","Maple","Cedar","Pine","Birch","Willow","Ash","Walnut","Pecan"])} ${rand(["St","Ave","Blvd","Dr","Ln","Ct","Way","Pl"])}`;
    const jobValue = randFloat(150, 4500);
    const photoUrl = rand(photoUrls);
    const createdAt = randDate(365);

    const fullAddress = `${address}, ${city}, TX ${zip}`;
    const [result] = await conn.execute(
      `INSERT INTO jobs (partnerId, serviceType, serviceAddress, notes, photoUrls, aiAnalysisStatus, status, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [partnerId, serviceType, fullAddress, `Completed ${serviceType.toLowerCase()} service. Customer satisfied.`, JSON.stringify([photoUrl]), "complete", "analyzed", createdAt]
    );
    jobIds.push(result.insertId);
  }
  console.log(`✅ Seeded ${jobIds.length} jobs`);

  // ─── 3. Seed Opportunities ───────────────────────────────────────────────────
  const oppStatuses = ["pending","pending","sent","sent","accepted","accepted","accepted","converted","converted","expired"];
  const oppIds = [];

  for (let i = 0; i < 400; i++) {
    const sourcePartnerId = rand(partnerIds);
    let receivingPartnerId = rand(partnerIds);
    while (receivingPartnerId === sourcePartnerId) receivingPartnerId = rand(partnerIds);
    const jobId = rand(jobIds);
    const oppType = rand(OPPORTUNITY_TYPES);
    const status = oppStatuses[i % oppStatuses.length];
    const confidence = randFloat(0.55, 0.97);
    const estValue = randFloat(300, 6000);
    const createdAt = randDate(300);
    const expiresAt = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000);

    const [result] = await conn.execute(
      `INSERT INTO opportunities (jobId, sourcePartnerId, receivingPartnerId, opportunityType, opportunityCategory, description, aiConfidence, status, estimatedJobValue, leadExpiresAt, adminReviewStatus, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [jobId, sourcePartnerId, receivingPartnerId, oppType.type, oppType.category, oppType.desc, confidence, status, estValue, expiresAt, "approved", createdAt]
    );
    oppIds.push({ id: result.insertId, sourcePartnerId, receivingPartnerId, estValue, status, createdAt });
  }
  console.log(`✅ Seeded ${oppIds.length} opportunities`);

  // ─── 4. Seed Commissions (for converted opportunities) ───────────────────────
  const convertedOpps = oppIds.filter(o => o.status === "converted");
  let commissionsSeeded = 0;
  for (const opp of convertedOpps) {
    const actualValue = randFloat(opp.estValue * 0.7, opp.estValue * 1.3);
    const platformFee = actualValue * 0.12;
    const referralComm = actualValue * 0.05;
    const proLnkNet = platformFee - referralComm;
    const isPaid = Math.random() > 0.3;
    const closedAt = new Date(opp.createdAt.getTime() + randInt(3, 30) * 24 * 60 * 60 * 1000);

    // Insert 3 commission records per converted opportunity (platform_fee, referral_commission, prolink_net)
    await conn.execute(
      `INSERT INTO commissions (opportunityId, payingPartnerId, receivingPartnerId, commissionType, amount, jobValue, feeRate, description, paid, paidAt, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [opp.id, opp.receivingPartnerId, null, "platform_fee", platformFee.toFixed(2), actualValue.toFixed(2), "0.1200", `Platform fee (12%) on $${actualValue.toFixed(2)} job`, isPaid ? 1 : 0, isPaid ? closedAt : null, closedAt]
    );
    await conn.execute(
      `INSERT INTO commissions (opportunityId, payingPartnerId, receivingPartnerId, commissionType, amount, jobValue, feeRate, description, paid, paidAt, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [opp.id, null, opp.sourcePartnerId, "referral_commission", referralComm.toFixed(2), actualValue.toFixed(2), "0.0500", `Referral commission (5%) on $${actualValue.toFixed(2)} job`, isPaid ? 1 : 0, isPaid ? closedAt : null, closedAt]
    );
    await conn.execute(
      `INSERT INTO commissions (opportunityId, payingPartnerId, receivingPartnerId, commissionType, amount, jobValue, feeRate, description, paid, paidAt, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [opp.id, null, null, "prolink_net", proLnkNet.toFixed(2), actualValue.toFixed(2), "0.0700", `ProLnk net (7%) on $${actualValue.toFixed(2)} job`, isPaid ? 1 : 0, isPaid ? closedAt : null, closedAt]
    );
    commissionsSeeded++;
  }
  console.log(`✅ Seeded ${commissionsSeeded} commissions`);

  // ─── 5. Seed Broadcasts ──────────────────────────────────────────────────────
  for (const bcast of BROADCAST_MESSAGES) {
    await conn.execute(
      `INSERT INTO broadcasts (subject, message, sentBy, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW())`,
      [bcast.subject, bcast.message, 1, randDate(180)]
    );
  }
  console.log(`✅ Seeded ${BROADCAST_MESSAGES.length} broadcasts`);

  await conn.end();
  console.log("🎉 Demo data seeding complete!");
  return {
    partners: partnerIds.length,
    jobs: jobIds.length,
    opportunities: oppIds.length,
    commissions: commissionsSeeded,
    broadcasts: BROADCAST_MESSAGES.length,
  };
}

main().then(result => {
  console.log("Result:", result);
  process.exit(0);
}).catch(err => {
  console.error("Seed error:", err.message);
  process.exit(1);
});
