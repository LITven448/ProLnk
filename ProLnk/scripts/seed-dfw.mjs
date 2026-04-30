import { createConnection } from "mysql2/promise";
import { config } from "dotenv";

config({ path: ".env" });

// ─── DFW Zip Codes ────────────────────────────────────────────────────────────
const DFW_ZIPS = [
  "75001","75006","75019","75022","75024","75025","75028","75034","75035",
  "75038","75039","75040","75041","75042","75043","75044","75048","75050",
  "75051","75052","75054","75056","75057","75060","75061","75062","75063",
  "75065","75067","75068","75069","75070","75071","75074","75075","75080",
  "75081","75082","75087","75088","75089","75093","75094","75098","75104",
  "75115","75116","75119","75125","75126","75134","75137","75141","75146",
  "75149","75150","75154","75159","75166","75172","75180","75181","75182",
  "75201","75204","75205","75206","75207","75208","75209","75210","75211",
  "75212","75214","75215","75216","75217","75218","75219","75220","75223",
  "75224","75225","75226","75227","75228","75229","75230","75231","75232",
  "75233","75234","75235","75236","75237","75238","75240","75241","75243",
  "75244","75246","75247","75248","75249","75251","75252",
  "76001","76002","76006","76010","76011","76012","76013","76014","76015",
  "76016","76017","76018","76019","76020","76021","76022","76034","76036",
  "76039","76040","76051","76052","76053","76054","76063","76092","76102",
  "76103","76104","76105","76106","76107","76108","76109","76110","76111",
  "76112","76113","76114","76115","76116","76117","76118","76119","76120",
  "76123","76126","76127","76131","76132","76133","76134","76135","76137",
  "76140","76148","76155","76177","76179","76180","76182","76244","76248",
];

const TRADES = [
  "Roofing","HVAC","Plumbing","Electrical","Landscaping","Pest Control",
  "Painting","Flooring","Windows","Gutters","Foundation Repair","Fencing",
  "Concrete","Tree Service","Pool Service","Appliance Repair","Garage Doors",
  "Insulation","Siding","Waterproofing",
];

const PREFIXES = ["Lone Star","DFW","Texas","Metroplex","Premier","Elite","Pro","Apex","Summit","Legacy","Patriot","Frontier","Lone Oak","Trinity","Maverick","Alamo","Bluebonnet","Longhorn","Sunbelt","Gulf Coast"];
const SUFFIXES = ["Services","Solutions","Pros","Experts","Group","Team","Co","LLC","Works","Specialists"];

const FIRST = ["James","Michael","Robert","David","William","Richard","Joseph","Thomas","Charles","Christopher","Daniel","Matthew","Anthony","Mark","Donald","Steven","Paul","Andrew","Kenneth","Joshua","Kevin","Brian","George","Timothy","Ronald","Edward","Jason","Jeffrey","Ryan","Jacob","Gary","Nicholas","Eric","Jonathan","Stephen","Larry","Justin","Scott","Brandon","Benjamin","Samuel","Raymond","Gregory","Frank","Alexander","Patrick","Jack","Dennis","Jerry","Tyler","Aaron","Jose","Henry","Adam","Douglas","Nathan","Peter","Zachary","Kyle","Walter","Harold","Carl","Arthur","Gerald","Roger","Joe","Terry","Sean","Austin","Christian","Noah","Willie","Ethan","Logan","Carlos","Luis","Miguel","Juan","Pedro","Marco","Diego","Rafael","Sergio","Manuel"];
const LAST = ["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez","Hernandez","Lopez","Gonzalez","Wilson","Anderson","Thomas","Taylor","Moore","Jackson","Martin","Lee","Perez","Thompson","White","Harris","Sanchez","Clark","Ramirez","Lewis","Robinson","Walker","Young","Allen","King","Wright","Scott","Torres","Nguyen","Hill","Flores","Green","Adams","Nelson","Baker","Hall","Rivera","Campbell","Mitchell","Carter","Roberts","Morales","Reyes","Cruz","Ortiz","Gutierrez","Chavez","Ramos","Diaz","Vargas","Castillo"];

const CITIES = ["Dallas","Fort Worth","Plano","Arlington","Garland","Irving","Frisco","McKinney","Grand Prairie","Mesquite","Carrollton","Denton","Lewisville","Allen","Richardson","Flower Mound","North Richland Hills","Rowlett","Wylie","Euless","Grapevine","Hurst","Cedar Hill","Burleson","Mansfield","Coppell","Southlake","Keller","Colleyville","Bedford"];
const STREETS = ["Oak","Elm","Maple","Cedar","Pine","Willow","Main","Park","Lake","Hill","Valley","Ridge","Creek","Meadow","Forest","Spring","River","Prairie","Sunset","Heritage","Bluebonnet","Mockingbird","Preston","Greenville","Skillman","Lemmon","Henderson","Lovers Lane","Inwood","Forest Lane"];
const STREET_TYPES = ["Dr","Ln","Blvd","Ave","St","Rd","Way","Ct","Pl","Cir"];

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randFloat = (min, max, dec = 2) => parseFloat((Math.random() * (max - min) + min).toFixed(dec));
const randBool = (prob = 0.5) => Math.random() < prob;

function makeName() { return `${rand(FIRST)} ${rand(LAST)}`; }
function makeCompany(trade) { return `${rand(PREFIXES)} ${trade} ${rand(SUFFIXES)}`; }
function makeEmail(name, i) {
  const slug = name.toLowerCase().replace(" ", ".").replace(/[^a-z.]/g, "");
  return `${slug}${i}@prolnkdemo.com`;
}
function makePhone() {
  const area = rand(["214","972","469","817","682","940","903","254"]);
  return `(${area}) ${randInt(200,999)}-${randInt(1000,9999)}`;
}
function makeAddress(zip) {
  return `${randInt(100,9999)} ${rand(STREETS)} ${rand(STREET_TYPES)}, ${rand(CITIES)}, TX ${zip}`;
}
function makeTier() {
  const r = Math.random();
  if (r < 0.04) return "enterprise";
  if (r < 0.12) return "company";
  if (r < 0.28) return "crew";
  if (r < 0.55) return "pro";
  return "scout";
}
function makeStatus() {
  const r = Math.random();
  if (r < 0.72) return "approved";
  if (r < 0.88) return "pending";
  return "rejected";
}
function makeCommissionRate(tier) {
  const rates = { scout: 0.40, pro: 0.55, crew: 0.65, company: 0.72, enterprise: 0.78 };
  return rates[tier] ?? 0.40;
}
function makeDate(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d;
}
function makeCoords() {
  // DFW bounding box: lat 32.5-33.2, lng -97.8 to -96.5
  const lat = randFloat(32.5, 33.2, 6);
  const lng = randFloat(-97.8, -96.5, 6);
  return { lat, lng };
}

async function main() {
  const db = await createConnection(process.env.DATABASE_URL);
  console.log("✅ Connected to DB");

  const [existing] = await db.execute("SELECT COUNT(*) as cnt FROM partners");
  const existingCount = Number(existing[0].cnt);
  console.log(`Existing partners: ${existingCount}`);

  if (existingCount >= 400) {
    console.log("Already have enough partners, skipping seed");
    await db.end();
    return;
  }

  const toInsert = 500 - existingCount;
  console.log(`Inserting ${toInsert} new partners...`);
  let inserted = 0;

  for (let i = 0; i < toInsert; i++) {
    const trade = rand(TRADES);
    const name = makeName();
    const company = makeCompany(trade);
    const zip = rand(DFW_ZIPS);
    const tier = makeTier();
    const status = makeStatus();
    const commissionRate = makeCommissionRate(tier);
    const platformFeeRate = 0.12;
    const referralCommissionRate = parseFloat((platformFeeRate * commissionRate).toFixed(4));
    const jobsLogged = randInt(0, 450);
    const referralCount = randInt(0, 120);
    const leadsCount = randInt(0, 300);
    const opportunitiesGenerated = randInt(0, 500);
    const totalCommissionEarned = parseFloat((jobsLogged * randFloat(40, 350)).toFixed(2));
    const totalCommissionPaid = parseFloat((totalCommissionEarned * randFloat(0.6, 0.95)).toFixed(2));
    const rating = randFloat(3.4, 5.0, 2);
    const reviewCount = randInt(0, 120);
    const priorityScore = randInt(10, 105);
    const avgLeadResponseHours = randFloat(0.5, 48, 2);
    const partnersReferred = randInt(0, 25);
    const isFoundingPartner = randBool(0.05);
    const isExempt = isFoundingPartner && randBool(0.3);
    const coords = makeCoords();
    const appliedAt = makeDate(randInt(30, 730));
    const approvedAt = status === "approved" ? makeDate(randInt(1, 29)) : null;
    const subscriptionFee = tier === "scout" ? 0 : tier === "pro" ? 79 : tier === "crew" ? 149 : tier === "company" ? 299 : 599;
    const monthlyCommissionCap = tier === "scout" ? 500 : null;
    const trialStatus = randBool(0.7) ? "active" : randBool(0.5) ? "trial" : "expired";
    const stripeConnectStatus = randBool(0.45) ? "active" : randBool(0.4) ? "not_connected" : randBool(0.5) ? "pending" : "restricted";

    try {
      await db.execute(
        `INSERT INTO partners (
          companyName, tradeName, contactName, contactEmail, contactPhone,
          serviceArea, lat, lng, serviceRadiusMiles, tier, status,
          subscriptionFee, commissionRate, platformFeeRate, referralCommissionRate,
          monthlyCommissionCap, monthlyCommissionEarned,
          isExempt, isFoundingPartner,
          referralCount, leadsCount, jobsLogged, opportunitiesGenerated,
          totalCommissionEarned, totalCommissionPaid,
          stripeConnectStatus, trialStatus,
          priorityScore, avgLeadResponseHours,
          rating, reviewCount, partnersReferred,
          appliedAt, approvedAt
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          company, trade, name, makeEmail(name, i + existingCount), makePhone(),
          makeAddress(zip), coords.lat, coords.lng, randInt(10, 35), tier, status,
          subscriptionFee, commissionRate, platformFeeRate, referralCommissionRate,
          monthlyCommissionCap, 0,
          isExempt ? 1 : 0, isFoundingPartner ? 1 : 0,
          referralCount, leadsCount, jobsLogged, opportunitiesGenerated,
          totalCommissionEarned, totalCommissionPaid,
          stripeConnectStatus, trialStatus,
          priorityScore, avgLeadResponseHours,
          rating, reviewCount, partnersReferred,
          appliedAt, approvedAt,
        ]
      );
      inserted++;
    } catch (e) {
      // skip on constraint errors
      if (!e.message.includes("Duplicate")) {
        console.log(`  Row ${i} error: ${e.message.slice(0, 80)}`);
      }
    }

    if ((i + 1) % 100 === 0) console.log(`  ${i + 1}/${toInsert} processed, ${inserted} inserted`);
  }

  console.log(`\n✅ Seed complete! Inserted ${inserted} partners`);
  const [final] = await db.execute("SELECT COUNT(*) as cnt FROM partners");
  console.log(`Total partners in DB: ${final[0].cnt}`);
  await db.end();
}

main().catch(console.error);
