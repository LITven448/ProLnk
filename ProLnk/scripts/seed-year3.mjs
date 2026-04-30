/**
 * ProLink Year 3 Data Seed Script
 * Seeds realistic DFW data: 150+ partners, 500+ jobs, 800+ opportunities, commissions
 */
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const DB_URL = process.env.DATABASE_URL;
if (!DB_URL) { console.error('DATABASE_URL not set'); process.exit(1); }

// ─── DFW Partner Data ───────────────────────────────────────────────────────

const DFW_AREAS = [
  { city: 'Frisco', lat: 33.1507, lng: -96.8236, zip: '75034' },
  { city: 'Frisco', lat: 33.1584, lng: -96.7994, zip: '75035' },
  { city: 'Plano', lat: 33.0198, lng: -96.6989, zip: '75024' },
  { city: 'Plano', lat: 33.0137, lng: -96.7498, zip: '75025' },
  { city: 'Plano', lat: 33.0451, lng: -96.7015, zip: '75023' },
  { city: 'McKinney', lat: 33.1972, lng: -96.6398, zip: '75070' },
  { city: 'McKinney', lat: 33.2148, lng: -96.6753, zip: '75071' },
  { city: 'Allen', lat: 33.1032, lng: -96.6706, zip: '75013' },
  { city: 'Allen', lat: 33.0943, lng: -96.6384, zip: '75002' },
  { city: 'Prosper', lat: 33.2362, lng: -96.8005, zip: '75078' },
  { city: 'Celina', lat: 33.3237, lng: -96.7851, zip: '75009' },
  { city: 'Little Elm', lat: 33.1626, lng: -96.9375, zip: '75068' },
  { city: 'The Colony', lat: 33.0870, lng: -96.8886, zip: '75056' },
  { city: 'Lewisville', lat: 33.0462, lng: -96.9942, zip: '75067' },
  { city: 'Flower Mound', lat: 33.0146, lng: -97.0969, zip: '75028' },
  { city: 'Southlake', lat: 32.9404, lng: -97.1333, zip: '76092' },
  { city: 'Colleyville', lat: 32.8882, lng: -97.1503, zip: '76034' },
  { city: 'Keller', lat: 32.9343, lng: -97.2294, zip: '76248' },
  { city: 'Grapevine', lat: 32.9343, lng: -97.0781, zip: '76051' },
  { city: 'Coppell', lat: 32.9543, lng: -97.0150, zip: '75019' },
  { city: 'Irving', lat: 32.8140, lng: -96.9489, zip: '75038' },
  { city: 'Carrollton', lat: 32.9537, lng: -96.8903, zip: '75010' },
  { city: 'Richardson', lat: 32.9483, lng: -96.7299, zip: '75080' },
  { city: 'Garland', lat: 32.9126, lng: -96.6389, zip: '75040' },
  { city: 'Rockwall', lat: 32.9290, lng: -96.4597, zip: '75032' },
  { city: 'Wylie', lat: 33.0151, lng: -96.5388, zip: '75098' },
  { city: 'Mansfield', lat: 32.5632, lng: -97.1417, zip: '76063' },
  { city: 'Arlington', lat: 32.7357, lng: -97.1081, zip: '76001' },
  { city: 'Denton', lat: 33.2148, lng: -97.1331, zip: '76201' },
  { city: 'Argyle', lat: 33.1218, lng: -97.1803, zip: '76226' },
];

const PARTNER_TEMPLATES = [
  // Lawn & Landscape (25 partners)
  { type: 'Lawn Care & Mowing', names: ['Green Thumb Lawn Care', 'DFW Lawn Masters', 'Precision Mowing Co', 'Lone Star Lawn Services', 'Premier Turf Management', 'Emerald Lawn Care', 'Texas Green Lawn', 'ProCut Lawn Services', 'Frisco Lawn Pros', 'McKinney Mowing Co'] },
  { type: 'Landscaping & Design', names: ['Artisan Landscapes DFW', 'Signature Outdoor Design', 'Nature\'s Edge Landscaping', 'Elite Landscape Solutions', 'Texas Outdoor Living'] },
  { type: 'Irrigation & Sprinklers', names: ['AquaRight Irrigation', 'DFW Sprinkler Pros', 'Precision Irrigation Systems', 'WaterSmart DFW', 'Texas Irrigation Experts'] },
  // Tree Services (12 partners)
  { type: 'Tree Trimming & Removal', names: ['Canopy Tree Service', 'DFW Tree Experts', 'Lone Star Tree Care', 'Premier Arborist DFW', 'Texas Tree Masters'] },
  { type: 'Stump Grinding', names: ['Stump Out DFW', 'Clean Slate Stump Removal', 'Texas Stump Grinders'] },
  // Fencing (10 partners)
  { type: 'Fence Installation & Repair', names: ['Fortress Fence DFW', 'Premier Fence Solutions', 'Texas Fence Masters', 'DFW Fence Pros', 'Lone Star Fencing', 'Iron Gate Fence Co', 'Cedar Creek Fencing', 'Boundary Line Fence', 'All-Star Fence DFW', 'Secure Fence Solutions'] },
  // Exterior Home (15 partners)
  { type: 'Exterior Painting', names: ['ColorWave Painting DFW', 'Premier Coat Painters', 'Texas Brush Masters', 'Flawless Finish Painting', 'DFW Pro Painters'] },
  { type: 'Pressure Washing', names: ['BlastOff Power Washing', 'Sparkle Clean DFW', 'HydroBlast Services', 'Crystal Clear Washing', 'Texas Power Wash Pros'] },
  { type: 'Gutter Services', names: ['GutterGuard DFW', 'Clean Flow Gutters', 'Premier Gutter Solutions', 'Texas Gutter Experts', 'All-Clear Gutters'] },
  // Roofing (8 partners)
  { type: 'Roofing', names: ['Apex Roofing DFW', 'Storm Shield Roofing', 'Premier Roof Solutions', 'Texas Top Roofing', 'Reliable Roofing Co', 'DFW Roof Masters', 'Guardian Roofing', 'Summit Roofing DFW'] },
  // Pool (10 partners)
  { type: 'Pool Cleaning & Maintenance', names: ['AquaBlue Pool Service', 'Crystal Waters Pool Care', 'DFW Pool Pros', 'Premier Pool Service', 'Texas Pool Masters', 'Blue Lagoon Pool Care', 'Splash Zone Pool Service', 'Clear View Pool Maintenance', 'Aqua Perfect DFW', 'Poolside Pros'] },
  // Pest Control (8 partners)
  { type: 'Pest Control', names: ['Shield Pest Solutions', 'Texas Bug Busters', 'Premier Pest Control DFW', 'Terminator Pest Services', 'BugFree DFW', 'Eco Guard Pest Control', 'Fortress Pest Solutions', 'DFW Pest Pros'] },
  // HVAC (8 partners)
  { type: 'HVAC Services', names: ['AirPro HVAC DFW', 'Cool Breeze HVAC', 'Premier Air Solutions', 'Texas Climate Control', 'Comfort Zone HVAC', 'Arctic Air DFW', 'TempRight HVAC', 'DFW Air Masters'] },
  // Plumbing (8 partners)
  { type: 'Plumbing', names: ['FlowRight Plumbing DFW', 'Premier Plumbing Solutions', 'Texas Pipe Masters', 'DFW Plumbing Pros', 'Leak Stop Plumbing', 'AquaFix Plumbing', 'Reliable Plumbing DFW', 'Clear Flow Plumbing'] },
  // Handyman (8 partners)
  { type: 'Handyman Services', names: ['FixIt Pro DFW', 'All Hands Handyman', 'Premier Home Repairs', 'Texas Fix-All Services', 'Reliable Handyman DFW', 'HomeFix Pros', 'Master Handyman DFW', 'Ace Home Services'] },
  // Concrete & Hardscape (6 partners)
  { type: 'Concrete & Hardscape', names: ['StoneCraft DFW', 'Premier Concrete Solutions', 'Texas Hardscape Pros', 'Solid Ground DFW', 'Artisan Concrete Works', 'DFW Paving Masters'] },
  // Window & Door (6 partners)
  { type: 'Window Cleaning', names: ['Crystal Clear Windows DFW', 'Shine Bright Window Service', 'Premier Window Cleaning', 'ClearView Window Pros', 'Spotless Windows DFW', 'Texas Window Masters'] },
  // Home Remodeling (5 partners)
  { type: 'Kitchen & Bath Remodeling', names: ['Premier Remodel DFW', 'Texas Home Transformations', 'Elite Kitchen & Bath', 'Craftsman Remodeling DFW', 'Signature Home Renovations'] },
  // Outdoor Living (5 partners)
  { type: 'Deck & Patio Construction', names: ['OutdoorCraft DFW', 'Premier Deck Solutions', 'Texas Patio Builders', 'Backyard Paradise DFW', 'Artisan Outdoor Living'] },
  // Artificial Turf (5 partners)
  { type: 'Artificial Turf Installation', names: ['TurfPro DFW', 'EverGreen Turf Solutions', 'Texas Synthetic Grass', 'Premier Turf DFW', 'GreenScape Artificial Turf'] },
  // Pet Waste (Scoop Duke + 2 others)
  { type: 'Pet Waste Removal', names: ['Scoop Duke', 'DFW Pet Waste Pros', 'Clean Yard Pet Services'] },
  // Security (4 partners)
  { type: 'Home Security Systems', names: ['SecureHome DFW', 'Guardian Security Solutions', 'Premier Security DFW', 'Texas Home Security'] },
  // Water Treatment (3 partners)
  { type: 'Water Treatment & Filtration', names: ['PureWater DFW', 'Texas Water Solutions', 'ClearFlow Water Treatment'] },
  // Electrical (4 partners)
  { type: 'Electrical Services', names: ['PowerRight Electric DFW', 'Premier Electrical Solutions', 'Texas Wiring Pros', 'Bright Spark Electric'] },
  // Painting Interior (4 partners)
  { type: 'Interior Painting', names: ['Interior Artistry DFW', 'Premier Interior Painters', 'Texas Color Pros', 'Flawless Interior Painting'] },
];

const FIRST_NAMES = ['James', 'Michael', 'Robert', 'David', 'John', 'William', 'Richard', 'Thomas', 'Charles', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua', 'Kenneth', 'Kevin', 'Brian', 'George', 'Timothy', 'Ronald', 'Edward', 'Jason', 'Jeffrey', 'Ryan', 'Jacob', 'Gary', 'Nicholas', 'Eric', 'Jonathan', 'Stephen', 'Larry', 'Justin', 'Scott', 'Brandon', 'Benjamin', 'Samuel'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores'];

const OPPORTUNITY_TYPES = [
  { type: 'Overgrown Lawn', category: 'Lawn Care & Mowing', minVal: 150, maxVal: 400, confidence: [72, 95] },
  { type: 'Dead Tree Limbs', category: 'Tree Trimming & Removal', minVal: 250, maxVal: 800, confidence: [68, 92] },
  { type: 'Broken Fence Panel', category: 'Fence Installation & Repair', minVal: 200, maxVal: 600, confidence: [85, 98] },
  { type: 'Damaged Gate', category: 'Fence Installation & Repair', minVal: 150, maxVal: 450, confidence: [88, 99] },
  { type: 'Peeling Exterior Paint', category: 'Exterior Painting', minVal: 1500, maxVal: 6000, confidence: [70, 90] },
  { type: 'Clogged Gutters', category: 'Gutter Services', minVal: 150, maxVal: 400, confidence: [82, 97] },
  { type: 'Missing Shingles', category: 'Roofing', minVal: 500, maxVal: 4500, confidence: [75, 95] },
  { type: 'Green Pool Water', category: 'Pool Cleaning & Maintenance', minVal: 200, maxVal: 600, confidence: [90, 99] },
  { type: 'Cracked Driveway', category: 'Concrete & Hardscape', minVal: 500, maxVal: 3000, confidence: [78, 94] },
  { type: 'Dirty Windows', category: 'Window Cleaning', minVal: 150, maxVal: 400, confidence: [85, 98] },
  { type: 'Irrigation Head Damage', category: 'Irrigation & Sprinklers', minVal: 75, maxVal: 350, confidence: [80, 96] },
  { type: 'Standing Water / Poor Drainage', category: 'Irrigation & Sprinklers', minVal: 300, maxVal: 1200, confidence: [72, 90] },
  { type: 'Artificial Turf Opportunity', category: 'Artificial Turf Installation', minVal: 5000, maxVal: 18000, confidence: [65, 85] },
  { type: 'Pest Evidence', category: 'Pest Control', minVal: 150, maxVal: 500, confidence: [75, 95] },
  { type: 'Deck Damage', category: 'Deck & Patio Construction', minVal: 1500, maxVal: 8000, confidence: [70, 92] },
  { type: 'Cracked Window', category: 'Window Cleaning', minVal: 200, maxVal: 800, confidence: [90, 99] },
  { type: 'HVAC Unit Damage', category: 'HVAC Services', minVal: 300, maxVal: 2500, confidence: [68, 88] },
  { type: 'Pressure Washing Needed', category: 'Pressure Washing', minVal: 200, maxVal: 600, confidence: [82, 97] },
  { type: 'Stump Removal', category: 'Stump Grinding', minVal: 150, maxVal: 500, confidence: [88, 99] },
  { type: 'Outdoor Lighting Damage', category: 'Electrical Services', minVal: 200, maxVal: 800, confidence: [75, 92] },
  { type: 'Full Kitchen Remodel', category: 'Kitchen & Bath Remodeling', minVal: 8000, maxVal: 35000, confidence: [65, 82] },
  { type: 'Bathroom Renovation', category: 'Kitchen & Bath Remodeling', minVal: 5000, maxVal: 20000, confidence: [68, 88] },
  { type: 'New Roof Installation', category: 'Roofing', minVal: 8000, maxVal: 22000, confidence: [80, 96] },
  { type: 'HVAC System Replacement', category: 'HVAC Services', minVal: 5000, maxVal: 15000, confidence: [72, 90] },
  { type: 'Driveway Replacement', category: 'Concrete & Hardscape', minVal: 4000, maxVal: 12000, confidence: [75, 92] },
];

const STATUSES = ['completed', 'completed', 'completed', 'completed', 'completed', 'completed', 'accepted', 'accepted', 'declined', 'pending'];
const PARTNER_STATUSES = ['approved', 'approved', 'approved', 'approved', 'approved', 'approved', 'approved', 'approved', 'approved', 'silver', 'gold'];

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randFloat(min, max) { return parseFloat((Math.random() * (max - min) + min).toFixed(4)); }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randDate(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - rand(0, daysAgo));
  d.setHours(rand(7, 18), rand(0, 59), rand(0, 59));
  return d;
}

async function seed() {
  const conn = await mysql.createConnection(DB_URL);
  console.log('Connected to database');

  // ── Clear existing seed data ──────────────────────────────────────────────
  console.log('Clearing existing data...');
  await conn.execute('SET FOREIGN_KEY_CHECKS = 0');
  await conn.execute('TRUNCATE TABLE commissions');
  await conn.execute('TRUNCATE TABLE opportunities');
  await conn.execute('TRUNCATE TABLE jobs');
  await conn.execute('TRUNCATE TABLE broadcasts');
  // Only delete non-user partners (keep any real user accounts)
  await conn.execute("DELETE FROM partners WHERE contactEmail LIKE '%prolink-seed%'");
  await conn.execute('SET FOREIGN_KEY_CHECKS = 1');
  console.log('Cleared existing seed data');

  // ── Build partner list ────────────────────────────────────────────────────
  const partners = [];
  let partnerIndex = 0;

  for (const template of PARTNER_TEMPLATES) {
    for (const businessName of template.names) {
      const area = pick(DFW_AREAS);
      const firstName = pick(FIRST_NAMES);
      const lastName = pick(LAST_NAMES);
      const isScoopDuke = businessName === 'Scoop Duke';
      const referralCount = isScoopDuke ? 47 : rand(0, 38);
      const tier = referralCount >= 35 ? 'enterprise' : referralCount >= 25 ? 'company' : referralCount >= 10 ? 'crew' : referralCount >= 3 ? 'pro' : 'scout';
      const jobsLogged = isScoopDuke ? 312 : rand(5, 180);
      const opportunitiesGenerated = Math.floor(jobsLogged * randFloat(0.4, 0.85));
      const joinedDaysAgo = isScoopDuke ? 1080 : rand(30, 900);
      const createdAt = randDate(joinedDaysAgo);

      partners.push({
        businessName,
        businessType: template.type,
        ownerName: `${firstName} ${lastName}`,
        email: `${businessName.toLowerCase().replace(/[^a-z0-9]/g, '.')}.prolink-seed@example.com`,
        phone: `(${rand(214,972)}) ${rand(200,999)}-${rand(1000,9999)}`,
        serviceArea: area.city,
        serviceAreaLat: area.lat + randFloat(-0.02, 0.02),
        serviceAreaLng: area.lng + randFloat(-0.02, 0.02),
        serviceRadiusMiles: rand(5, 20),
        zipCode: area.zip,
        status: 'approved',
        tier,
        platformFeeRate: randFloat(0.08, 0.14),
        referralCommissionRate: randFloat(0.04, 0.06),
        jobsLogged,
        opportunitiesGenerated,
        referralCount,
        createdAt,
        updatedAt: createdAt,
      });
      partnerIndex++;
    }
  }

  // ── Insert partners ───────────────────────────────────────────────────────
  console.log(`Inserting ${partners.length} partners...`);
  const partnerIds = [];
  for (const p of partners) {
    const [result] = await conn.execute(
      `INSERT INTO partners (businessName, businessType, contactName, contactEmail, contactPhone, serviceArea, serviceAreaLat, serviceAreaLng, serviceRadiusMiles, status, tier, platformFeeRate, referralCommissionRate, jobsLogged, opportunitiesGenerated, referralCount, appliedAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)`,
      [p.businessName, p.businessType, p.ownerName, p.email, p.phone, p.serviceArea,
       p.serviceAreaLat, p.serviceAreaLng, p.serviceRadiusMiles,
       p.status, p.tier, p.platformFeeRate, p.referralCommissionRate,
       p.jobsLogged, p.opportunitiesGenerated, p.referralCount, p.createdAt, p.updatedAt]
    );
    partnerIds.push(result.insertId);
  }
  console.log(`Inserted ${partnerIds.length} partners`);

  // ── Insert jobs ───────────────────────────────────────────────────────────
  console.log('Inserting jobs...');
  const jobIds = [];
  const jobCount = 520;

  const SERVICE_ADDRESSES = [
    '4521 Ridgewood Dr, Frisco, TX 75034', '8823 Maple Creek Ln, Plano, TX 75024',
    '2210 Stonegate Blvd, McKinney, TX 75070', '6634 Heritage Oak Dr, Allen, TX 75013',
    '1145 Meadow Glen Ct, Prosper, TX 75078', '9902 Lakeside Dr, Frisco, TX 75035',
    '3317 Willow Bend Rd, Plano, TX 75025', '7741 Creekwood Ct, McKinney, TX 75071',
    '5528 Sunridge Dr, Allen, TX 75002', '4413 Clearwater Ln, Little Elm, TX 75068',
    '8819 Timber Ridge Dr, The Colony, TX 75056', '2234 Foxwood Ct, Lewisville, TX 75067',
    '6647 Windmill Dr, Flower Mound, TX 75028', '1123 Oakwood Ln, Southlake, TX 76092',
    '9934 Brookside Ct, Colleyville, TX 76034', '3345 Ridgecrest Dr, Keller, TX 76248',
    '7756 Vineyard Ln, Grapevine, TX 76051', '5512 Parkway Blvd, Coppell, TX 75019',
    '4478 Valley View Dr, Irving, TX 75038', '8823 Greenway Ct, Carrollton, TX 75010',
    '2289 Lakewood Dr, Richardson, TX 75080', '6634 Meadowbrook Ln, Garland, TX 75040',
    '1145 Lakeview Dr, Rockwall, TX 75032', '9901 Creekside Ct, Wylie, TX 75098',
    '3312 Heritage Blvd, Mansfield, TX 76063', '7767 Sunset Ridge Dr, Arlington, TX 76001',
    '5523 Oak Grove Ln, Denton, TX 76201', '4489 Hillcrest Dr, Argyle, TX 76226',
    '8834 Pecan Grove Ct, Celina, TX 75009', '2245 Stonehaven Dr, Frisco, TX 75034',
    '6656 Whispering Pines, Plano, TX 75024', '1167 Creekwood Dr, McKinney, TX 75070',
    '9912 Bluebell Ct, Allen, TX 75013', '3378 Sycamore Ln, Prosper, TX 75078',
    '7789 Magnolia Dr, Frisco, TX 75035', '5534 Elm Creek Rd, Plano, TX 75025',
    '4445 Rosewood Ct, McKinney, TX 75071', '8856 Birchwood Dr, Allen, TX 75002',
    '2267 Cottonwood Ln, Little Elm, TX 75068', '6678 Willowbrook Dr, The Colony, TX 75056',
  ];

  for (let i = 0; i < jobCount; i++) {
    const partnerId = pick(partnerIds);
    const partnerData = partners[partnerIds.indexOf(partnerId)];
    const jobDate = randDate(900);
    const status = i < jobCount * 0.85 ? 'opportunities_sent' : i < jobCount * 0.95 ? 'analyzed' : 'logged';
    const aiStatus = status === 'logged' ? 'pending' : 'complete';
    const address = pick(SERVICE_ADDRESSES);
    const [result] = await conn.execute(
      `INSERT INTO jobs (partnerId, customerName, serviceAddress, serviceType, photoUrls, aiAnalysisStatus, status, notes, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        partnerId,
        `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`,
        address,
        partnerData?.businessType || 'General Service',
        JSON.stringify([
          `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800`,
          `https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800`,
        ]),
        aiStatus,
        status,
        'Job completed successfully. Photos uploaded for AI analysis.',
        jobDate,
        jobDate,
      ]
    );
    jobIds.push(result.insertId);
  }
  console.log(`Inserted ${jobIds.length} jobs`);

  // ── Insert opportunities ──────────────────────────────────────────────────
  console.log('Inserting opportunities...');
  const oppIds = [];
  const oppCount = 1500;

  for (let i = 0; i < oppCount; i++) {
    const jobId = pick(jobIds);
    const sourcePartnerId = pick(partnerIds);
    const oppType = pick(OPPORTUNITY_TYPES);

    // Find a receiving partner that matches the opportunity category
    const matchingPartners = partners.filter(p => p.businessType === oppType.category);
    const receivingPartnerIndex = matchingPartners.length > 0
      ? partners.indexOf(pick(matchingPartners))
      : rand(0, partnerIds.length - 1);
    const receivingPartnerId = partnerIds[receivingPartnerIndex] || pick(partnerIds);

    const confidencePct = rand(oppType.confidence[0], oppType.confidence[1]);
    const confidence = parseFloat((confidencePct / 100).toFixed(3)); // decimal(4,3) 0.000-1.000
    const estimatedValue = rand(oppType.minVal, oppType.maxVal);
    // Map to valid enum: pending, sent, accepted, declined, converted, expired
    const rawStatus = pick(STATUSES);
    const statusMap = { 'accepted': 'accepted', 'completed': 'converted', 'declined': 'declined', 'pending': 'pending' };
    const status = statusMap[rawStatus] || 'sent';
    const actualValue = status === 'converted' ? estimatedValue * randFloat(0.85, 1.25) : null;
    const createdAt = randDate(870);

    const platformFeeRate = randFloat(0.10, 0.15);
    const referralCommissionRate = 0.05;
    const platformFeeAmount = actualValue ? actualValue * platformFeeRate : null;
    const referralCommissionAmount = platformFeeAmount ? platformFeeAmount * referralCommissionRate : null;
    const proLinkNetAmount = platformFeeAmount && referralCommissionAmount
      ? platformFeeAmount - referralCommissionAmount : null;

    const [result] = await conn.execute(
      `INSERT INTO opportunities (jobId, sourcePartnerId, receivingPartnerId, opportunityType, opportunityCategory, description, aiConfidence, estimatedJobValue, actualJobValue, status, platformFeeAmount, referralCommissionAmount, proLinkNetAmount, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        jobId, sourcePartnerId, receivingPartnerId,
        oppType.type, oppType.category,
        `AI detected ${oppType.type.toLowerCase()} requiring attention. Confidence: ${confidence}%. Estimated value: $${estimatedValue.toLocaleString()}.`,
        confidence, estimatedValue, actualValue, status,
        platformFeeAmount, referralCommissionAmount, proLinkNetAmount,
        createdAt, createdAt,
      ]
    );
    oppIds.push(result.insertId);

    // Create commission records for converted opportunities
    if (status === 'converted' && platformFeeAmount) {
      const isPlatformPaid = rand(0, 1) === 1;
      const isReferralPaid = rand(0, 1) === 1;
      // Platform fee: receiving partner pays ProLink
      await conn.execute(
        `INSERT INTO commissions (partnerId, opportunityId, payingPartnerId, receivingPartnerId, commissionType, amount, jobValue, feeRate, paid, paidAt, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, 'platform_fee', ?, ?, ?, ?, ?, ?, ?)`,
        [receivingPartnerId, result.insertId, receivingPartnerId, receivingPartnerId,
         platformFeeAmount, actualValue, platformFeeRate,
         isPlatformPaid, isPlatformPaid ? createdAt : null, createdAt, createdAt]
      );
      // Referral commission: ProLink pays source partner
      await conn.execute(
        `INSERT INTO commissions (partnerId, opportunityId, payingPartnerId, receivingPartnerId, commissionType, amount, jobValue, feeRate, paid, paidAt, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, 'referral_commission', ?, ?, ?, ?, ?, ?, ?)`,
        [sourcePartnerId, result.insertId, receivingPartnerId, sourcePartnerId,
         referralCommissionAmount, actualValue, referralCommissionRate,
         isReferralPaid, isReferralPaid ? createdAt : null, createdAt, createdAt]
      );
    }
  }
  console.log(`Inserted ${oppIds.length} opportunities`);

  // ── Insert broadcast messages ─────────────────────────────────────────────
  console.log('Inserting broadcast messages...');
  const broadcasts = [
    { title: '🎉 Welcome to ProLink DFW — Year 3 Milestone!', message: 'We\'ve officially crossed 150 active partners in the DFW network. Together we\'ve generated over 820 AI-detected opportunities and $200K+ in commission revenue. Thank you for being part of something special. The best is yet to come.', targetTier: 'all', daysAgo: 5 },
    { title: '💰 Q1 Commission Payouts Processed', message: 'All Q1 commission payments have been processed and sent to your registered payment method. Gold tier partners averaged $1,847 in referral commissions this quarter. Silver tier averaged $623. Bronze tier averaged $187. Keep logging jobs to move up!', targetTier: 'all', daysAgo: 18 },
    { title: '🏆 Gold Tier Partners: Exclusive Opportunity', message: 'As a Gold tier partner, you now have first right of refusal on all high-value opportunities ($2,500+) in your service area. This means you\'ll see premium leads before they\'re offered to Silver and Bronze partners. Check your dashboard for new opportunities.', targetTier: 'gold', daysAgo: 32 },
    { title: '📸 AI Detection Update: 8 New Opportunity Types Added', message: 'We\'ve expanded our AI detection engine to identify 8 new opportunity types: outdoor kitchen damage, pergola repair, landscape lighting issues, driveway sealing needs, chimney inspection triggers, attic ventilation problems, crawl space moisture, and solar panel cleaning. More detections = more commissions for everyone.', targetTier: 'all', daysAgo: 45 },
    { title: '🗺️ Austin & San Antonio Expansion — Partner Referral Bonus', message: 'ProLink is expanding to Austin and San Antonio in Q3. If you refer a business in either market that joins the network, you\'ll receive a $250 referral bonus when they complete their first 5 jobs. Share your referral link from your dashboard.', targetTier: 'all', daysAgo: 67 },
    { title: '⚡ New Feature: Instant Opportunity Notifications', message: 'You can now receive instant push notifications when a new opportunity is routed to your business. Enable notifications in your dashboard settings. Partners who respond within 2 hours have a 73% higher acceptance rate and earn 40% more in commissions.', targetTier: 'all', daysAgo: 89 },
    { title: '📊 Network Performance Report — February 2026', message: 'February highlights: 847 jobs logged, 1,203 opportunities detected, $34,200 in platform revenue generated. Top performing category: Fence & Gate repair (127 opportunities). Fastest growing category: Artificial Turf (up 340% YoY). Average opportunity value: $487.', targetTier: 'all', daysAgo: 112 },
    { title: '🤝 Silver & Gold Partners: Co-Marketing Program Launch', message: 'Starting next month, ProLink will feature Silver and Gold tier partners in our monthly homeowner newsletter (8,400 subscribers), social media spotlights, and targeted digital ads in your service area. No additional cost — this is included in your membership. Update your profile with a logo and photos to be featured.', targetTier: 'silver', daysAgo: 134 },
  ];

  for (const b of broadcasts) {
    const sentAt = randDate(b.daysAgo);
    await conn.execute(
      `INSERT INTO broadcasts (subject, message, createdAt) VALUES (?, ?, ?)`,
      [b.title, b.message, sentAt]
    );
  }
  console.log(`Inserted ${broadcasts.length} broadcast messages`);

  // ── Final counts ──────────────────────────────────────────────────────────
  const [[{ partnerCount }]] = await conn.execute('SELECT COUNT(*) as partnerCount FROM partners');
  const [[{ jobCount2 }]] = await conn.execute('SELECT COUNT(*) as jobCount2 FROM jobs');
  const [[{ oppCount2 }]] = await conn.execute('SELECT COUNT(*) as oppCount2 FROM opportunities');
  const [[{ commCount }]] = await conn.execute('SELECT COUNT(*) as commCount FROM commissions');
  const [[{ totalRevenue }]] = await conn.execute("SELECT COALESCE(SUM(amount), 0) as totalRevenue FROM commissions WHERE commissionType = 'platform_fee'");
  const [[{ broadcastCount }]] = await conn.execute('SELECT COUNT(*) as broadcastCount FROM broadcasts');

  console.log('\n✅ Seed complete!');
  console.log(`   Partners:     ${partnerCount}`);
  console.log(`   Jobs:         ${jobCount2}`);
  console.log(`   Opportunities: ${oppCount2}`);
  console.log(`   Commissions:  ${commCount}`);
  console.log(`   Total Revenue: $${parseFloat(totalRevenue).toLocaleString('en-US', { minimumFractionDigits: 2 })}`);
  console.log(`   Broadcasts:   ${broadcastCount}`);

  await conn.end();
}

seed().catch(err => { console.error('Seed failed:', err); process.exit(1); });
