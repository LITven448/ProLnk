/**
 * ProLink 40-Wave Overnight Simulation
 * Simulates 40 weeks of platform activity: jobs, AI detections, referrals, commissions.
 * Uses actual DB schema columns.
 */
import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();

const DB_URL = process.env.DATABASE_URL;
if (!DB_URL) throw new Error("DATABASE_URL not set");

function parseMysqlUrl(url) {
  const u = new URL(url);
  return {
    host: u.hostname, port: parseInt(u.port || "3306"),
    user: u.username, password: u.password,
    database: u.pathname.slice(1), ssl: { rejectUnauthorized: false },
  };
}

const conn = await mysql.createConnection(parseMysqlUrl(DB_URL));
console.log("✅ Connected to DB");

const [partners] = await conn.execute(
  "SELECT id, businessType, serviceArea FROM partners WHERE status = 'approved' LIMIT 500"
);
console.log(`📊 Found ${partners.length} approved partners`);
if (partners.length < 10) { console.log("⚠️  Not enough partners."); process.exit(1); }

const OPP_TYPES = ["fence_staining","pest_control","gutter_cleaning","pressure_washing",
  "window_cleaning","hvac_service","roofing_inspection","tree_trimming","lawn_care",
  "irrigation_repair","painting_exterior","pool_service","plumbing_repair","electrical_check"];
const OPP_CATS = ["Outdoor","Maintenance","HVAC","Plumbing","Roofing","Painting","Landscaping"];
const SERVICE_TYPES = ["Lawn Care","Pest Control","HVAC","Plumbing","Roofing","Painting",
  "Fence","Pressure Washing","Window Cleaning","Gutter Service","Electrical","Handyman",
  "Tree Service","Pool Service","Irrigation"];
const ADDRESSES = [
  "1234 Oak Lane, Frisco TX 75034","5678 Maple Ave, Plano TX 75024",
  "9012 Cedar Blvd, McKinney TX 75070","3456 Pine St, Allen TX 75013",
  "7890 Elm Dr, Prosper TX 75078","2345 Birch Rd, Celina TX 75009",
  "6789 Walnut Way, The Colony TX 75056","1357 Pecan Ct, Lewisville TX 75067",
  "2468 Hickory Ln, Carrollton TX 75006","3579 Willow Creek Dr, Garland TX 75040",
  "4680 Magnolia Blvd, Richardson TX 75080","5791 Cypress Ave, Irving TX 75038",
  "6802 Juniper St, Arlington TX 76001","7913 Redwood Dr, Denton TX 76201",
  "8024 Sycamore Ln, Flower Mound TX 75028","9135 Peach Tree Dr, Southlake TX 76092",
  "1246 Dogwood Ct, Keller TX 76248","2357 Spruce Ave, Grapevine TX 76051",
  "3468 Aspen Way, Coppell TX 75019","4579 Chestnut Blvd, Frisco TX 75035",
];
const CUSTOMER_NAMES = ["James Wilson","Sarah Johnson","Michael Brown","Emily Davis","Robert Martinez",
  "Jennifer Anderson","David Thompson","Lisa Garcia","Christopher Lee","Amanda White",
  "Matthew Harris","Jessica Clark","Daniel Lewis","Ashley Robinson","Andrew Walker"];

function ri(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function rf(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function jobVal(svc) {
  const r = {Roofing:[4000,15000],HVAC:[300,8000],Plumbing:[200,5000],Electrical:[150,3000],
    Painting:[800,6000],Fence:[1500,8000],"Lawn Care":[50,500],"Pest Control":[100,400],
    "Pressure Washing":[150,600],"Window Cleaning":[100,400],"Gutter Service":[150,500],
    Handyman:[100,800],"Tree Service":[300,3000],"Pool Service":[100,600],Irrigation:[200,2000]};
  const [mn,mx] = r[svc] ?? [200,2000];
  return ri(mn,mx);
}
function waveDate(wave, dayOff=0) {
  const d = new Date();
  d.setDate(d.getDate() - (40-wave)*7 - dayOff);
  return d.toISOString().slice(0,19).replace('T',' ');
}

let totJobs=0, totOpps=0, totRef=0, totComm=0, totFunnel=0;

for (let wave=1; wave<=40; wave++) {
  const growthFactor = 1 + (wave/40)*2;
  const actualJobs = Math.round(ri(12,30) * growthFactor);
  process.stdout.write(`\r🌊 Wave ${String(wave).padStart(2,'0')}/40 — ${actualJobs} jobs | Opps: ${totOpps} | Closed: ${totRef}`);

  for (let j=0; j<actualJobs; j++) {
    const partner = rf(partners);
    const svcType = rf(SERVICE_TYPES);
    const addr = rf(ADDRESSES);
    const val = jobVal(svcType);
    const jDate = waveDate(wave, ri(0,6));
    const custName = rf(CUSTOMER_NAMES);
    const custEmail = `${custName.toLowerCase().replace(' ','.')}${ri(1,99)}@gmail.com`;

    // Insert job
    const [jr] = await conn.execute(
      `INSERT INTO jobs (partnerId, customerName, customerEmail, serviceAddress, serviceType,
       jobValue, status, aiAnalysisStatus, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, 'opportunities_sent', 'complete', ?, ?)`,
      [partner.id, custName, custEmail, addr, svcType, val, jDate, jDate]
    );
    const jobId = jr.insertId;
    totJobs++;

    // AI detection: 35-55% detection rate (improves over time)
    const detRate = 0.35 + (wave/40)*0.20;
    if (Math.random() < detRate) {
      const oppType = rf(OPP_TYPES);
      const oppCat = rf(OPP_CATS);
      const conf = ri(65,98);
      const oDate = jDate;
      // Pick a receiving partner with a different business type
      const diffPartners = partners.filter(p => p.id !== partner.id && p.businessType !== partner.businessType);
      const recvPartner = diffPartners.length > 0 ? rf(diffPartners) : rf(partners.filter(p => p.id !== partner.id));
      const estVal = Math.round(val * 0.8);

      const [or] = await conn.execute(
        `INSERT INTO opportunities (jobId, sourcePartnerId, receivingPartnerId, opportunityType,
         opportunityCategory, description, aiConfidence, status, estimatedJobValue, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [jobId, partner.id, recvPartner.id, oppType, oppCat,
         `AI detected ${oppType.replace(/_/g,' ')} opportunity at ${addr}`,
         (conf/100).toFixed(3), conf>80?'sent':'pending', estVal, oDate, oDate]
      );
      const oppId = or.insertId;
      totOpps++;

      // 60% of high-conf opps get sent
      if (conf > 80 && Math.random() < 0.65) {
        const sentDate = waveDate(wave, ri(0,4));
        await conn.execute(`UPDATE opportunities SET status='sent', sentAt=? WHERE id=?`, [sentDate, oppId]);

        // 30-45% acceptance
        const accRate = 0.30 + (wave/40)*0.15;
        if (Math.random() < accRate) {
          const accDate = waveDate(wave, ri(0,3));
          await conn.execute(`UPDATE opportunities SET status='accepted', acceptedAt=? WHERE id=?`, [accDate, oppId]);

          // 70% close
          if (Math.random() < 0.70) {
            const closeDate = waveDate(wave, ri(0,2));
            const closedVal = Math.round(val * ri(70,130)/100);
            const pfRate = closedVal>5000?0.08:closedVal>2000?0.10:0.12;
            const commRate = 0.05; // ProLink earns 5% per referral
            const pfAmt = Math.round(closedVal * pfRate);
            const commAmt = Math.round(closedVal * commRate);
            const proLinkNet = pfAmt - commAmt;

            await conn.execute(
              `UPDATE opportunities SET status='converted', actualJobValue=?, platformFeeAmount=?,
               referralCommissionAmount=?, proLinkNetAmount=?, jobClosedAt=? WHERE id=?`,
              [closedVal, pfAmt, commAmt, proLinkNet, closeDate, oppId]
            );

            // Create referral record
            const [rr] = await conn.execute(
              `INSERT INTO referrals (fromPartnerId, toPartnerId, customerName, customerEmail,
               serviceType, notes, status, commissionAmount, commissionPaid, createdAt, updatedAt)
               VALUES (?, ?, ?, ?, ?, ?, 'converted', ?, 1, ?, ?)`,
              [partner.id, recvPartner.id, custName, custEmail, oppType.replace(/_/g,' '),
               `AI-detected referral from job at ${addr}`, commAmt, closeDate, closeDate]
            );
            const refId = rr.insertId;
            totRef++;

            // Commission: platform fee (partnerId = receiving partner)
            await conn.execute(
              `INSERT INTO commissions (opportunityId, partnerId, payingPartnerId, receivingPartnerId, commissionType,
               amount, jobValue, feeRate, description, paid, paidAt, createdAt, updatedAt)
               VALUES (?, ?, ?, NULL, 'platform_fee', ?, ?, ?, 'ProLink platform fee on closed job', 1, ?, ?, ?)`,
              [oppId, recvPartner.id, recvPartner.id, pfAmt, closedVal, pfRate.toFixed(4), closeDate, closeDate, closeDate]
            );
            // Commission: referral commission to sending partner (5%) — ProLink pays out, payingPartnerId=0 (ProLink)
            await conn.execute(
              `INSERT INTO commissions (opportunityId, partnerId, payingPartnerId, receivingPartnerId, commissionType,
               amount, jobValue, feeRate, description, paid, paidAt, createdAt, updatedAt)
               VALUES (?, ?, 0, ?, 'referral_commission', ?, ?, ?, 'Referral commission to sending partner (5%)', 1, ?, ?, ?)`,
              [oppId, partner.id, partner.id, commAmt, closedVal, commRate.toFixed(4), closeDate, closeDate, closeDate]
            );
            totComm += 2;

            // Update partner stats
            await conn.execute(
              `UPDATE partners SET referralCount=referralCount+1, jobsLogged=jobsLogged+1,
               totalCommissionEarned=totalCommissionEarned+? WHERE id=?`,
              [commAmt, partner.id]
            );
            await conn.execute(
              `UPDATE partners SET leadsCount=leadsCount+1,
               totalCommissionPaid=totalCommissionPaid+? WHERE id=?`,
              [pfAmt, recvPartner.id]
            );
          }
        } else {
          // Declined
          await conn.execute(`UPDATE opportunities SET status='declined' WHERE id=?`, [oppId]);
        }
      }
    }
  }
}

console.log("\n\n✅ 40-Wave Simulation Complete!");
console.log(`   Jobs logged:         ${totJobs.toLocaleString()}`);
console.log(`   AI detections:       ${totOpps.toLocaleString()}`);
console.log(`   Referrals closed:    ${totRef.toLocaleString()}`);
console.log(`   Commission records:  ${totComm.toLocaleString()}`);

await conn.end();
process.exit(0);
