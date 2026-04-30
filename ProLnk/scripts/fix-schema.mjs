import { createConnection } from 'mysql2/promise';
import { config } from 'dotenv';
config();

const conn = await createConnection(process.env.DATABASE_URL);

async function columnExists(table, column) {
  const [rows] = await conn.query(
    `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    [table, column]
  );
  return rows.length > 0;
}

async function addColumnIfMissing(table, column, definition) {
  if (!(await columnExists(table, column))) {
    console.log(`Adding ${table}.${column}...`);
    await conn.query(`ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${definition}`);
    console.log(`  ✅ Added ${table}.${column}`);
  } else {
    console.log(`  ✓ ${table}.${column} already exists`);
  }
}

console.log('🔧 Fixing schema mismatches...\n');

// Fix commissions table
await addColumnIfMissing('commissions', 'opportunityId', 'INT NULL');
await addColumnIfMissing('commissions', 'payingPartnerId', 'INT NOT NULL DEFAULT 0');
await addColumnIfMissing('commissions', 'receivingPartnerId', 'INT NULL');
await addColumnIfMissing('commissions', 'commissionType', "ENUM('platform_fee','referral_commission','prolink_net') NOT NULL DEFAULT 'platform_fee'");
await addColumnIfMissing('commissions', 'jobValue', 'DECIMAL(10,2) NULL');
await addColumnIfMissing('commissions', 'feeRate', 'DECIMAL(5,4) NULL');
await addColumnIfMissing('commissions', 'updatedAt', 'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP');

// Remove old partnerId column if it exists (replaced by payingPartnerId)
const hasOldPartnerId = await columnExists('commissions', 'partnerId');
const hasNewPayingPartnerId = await columnExists('commissions', 'payingPartnerId');
if (hasOldPartnerId && hasNewPayingPartnerId) {
  // Migrate data from old column to new
  console.log('Migrating partnerId -> payingPartnerId...');
  await conn.query('UPDATE `commissions` SET `payingPartnerId` = `partnerId` WHERE `payingPartnerId` = 0');
  // Don't drop old column yet to avoid breaking old queries - just leave both
  console.log('  ✅ Data migrated');
}

// Remove old referralId column if it exists (replaced by opportunityId)
const hasReferralId = await columnExists('commissions', 'referralId');
if (hasReferralId) {
  console.log('Migrating referralId -> opportunityId...');
  await conn.query('UPDATE `commissions` SET `opportunityId` = `referralId` WHERE `opportunityId` IS NULL AND `referralId` IS NOT NULL');
  console.log('  ✅ Data migrated');
}

// Fix partners table - add any missing columns
await addColumnIfMissing('partners', 'commissionRate', 'DECIMAL(5,4) NOT NULL DEFAULT 0.1200');
await addColumnIfMissing('partners', 'referralCommissionRate', 'DECIMAL(5,4) NOT NULL DEFAULT 0.0500');
await addColumnIfMissing('partners', 'jobsLogged', 'INT NOT NULL DEFAULT 0');
await addColumnIfMissing('partners', 'opportunitiesGenerated', 'INT NOT NULL DEFAULT 0');
await addColumnIfMissing('partners', 'linkedUserId', 'INT NULL');
await addColumnIfMissing('partners', 'tier', "ENUM('bronze','silver','gold') NOT NULL DEFAULT 'bronze'");
await addColumnIfMissing('partners', 'referralCount', 'INT NOT NULL DEFAULT 0');
await addColumnIfMissing('partners', 'leadsCount', 'INT NOT NULL DEFAULT 0');
await addColumnIfMissing('partners', 'totalEarned', 'DECIMAL(10,2) NOT NULL DEFAULT 0.00');
await addColumnIfMissing('partners', 'updatedAt', 'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP');

// Fix jobs table
await addColumnIfMissing('jobs', 'partnerId', 'INT NOT NULL DEFAULT 0');
await addColumnIfMissing('jobs', 'address', 'VARCHAR(500) NULL');
await addColumnIfMissing('jobs', 'serviceType', 'VARCHAR(100) NULL');
await addColumnIfMissing('jobs', 'notes', 'TEXT NULL');
await addColumnIfMissing('jobs', 'photoUrls', 'JSON NULL');
await addColumnIfMissing('jobs', 'aiAnalyzed', 'TINYINT(1) NOT NULL DEFAULT 0');
await addColumnIfMissing('jobs', 'aiOpportunities', 'JSON NULL');
await addColumnIfMissing('jobs', 'status', "ENUM('pending','analyzed','completed') NOT NULL DEFAULT 'pending'");
await addColumnIfMissing('jobs', 'updatedAt', 'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP');

// Fix opportunities table
await addColumnIfMissing('opportunities', 'jobId', 'INT NULL');
await addColumnIfMissing('opportunities', 'sourcePartnerId', 'INT NULL');
await addColumnIfMissing('opportunities', 'receivingPartnerId', 'INT NULL');
await addColumnIfMissing('opportunities', 'opportunityType', 'VARCHAR(100) NULL');
await addColumnIfMissing('opportunities', 'description', 'TEXT NULL');
await addColumnIfMissing('opportunities', 'confidence', 'DECIMAL(3,2) NULL');
await addColumnIfMissing('opportunities', 'estimatedValue', 'DECIMAL(10,2) NULL');
await addColumnIfMissing('opportunities', 'status', "ENUM('pending','accepted','declined','completed','expired') NOT NULL DEFAULT 'pending'");
await addColumnIfMissing('opportunities', 'actualJobValue', 'DECIMAL(10,2) NULL');
await addColumnIfMissing('opportunities', 'updatedAt', 'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP');

console.log('\n✅ Schema fix complete!');
await conn.end();
