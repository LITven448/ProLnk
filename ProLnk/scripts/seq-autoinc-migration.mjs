import mysql from "mysql2/promise";
const url="mysql://3WV8GtPKfZxaGP8.root:rSBWEK1mFOtftyG8@gateway01.us-east-1.prod.aws.tidbcloud.com:4000/prolnk".replace(/\?.*$/,"");
const c=await mysql.createConnection({uri:url,ssl:{rejectUnauthorized:false}});
// All non-auto-inc INT id tables with a key
const [cols]=await c.execute(`
  SELECT TABLE_NAME FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA='prolnk' AND COLUMN_NAME='id'
    AND EXTRA NOT LIKE '%auto_increment%' AND DATA_TYPE IN ('int','bigint') AND COLUMN_KEY<>''`);
const tables = cols.map(r=>r.TABLE_NAME);
console.log(`Applying sequence-default to ${tables.length} tables...`);
let ok=0, fail=0; const failed=[];
for (const T of tables) {
  try {
    const [mx]=await c.execute(`SELECT COALESCE(MAX(id),0) m FROM \`${T}\``);
    const start=Number(mx[0].m)+1;
    await c.execute(`DROP SEQUENCE IF EXISTS \`seq_${T}\``);
    await c.execute(`CREATE SEQUENCE \`seq_${T}\` START WITH ${start} NOCACHE`);
    await c.execute(`ALTER TABLE \`${T}\` ALTER COLUMN \`id\` SET DEFAULT (NEXTVAL(\`seq_${T}\`))`);
    ok++;
  } catch(e){ fail++; failed.push(`${T}: ${e.code||e.message}`); }
}
console.log(`DONE. ok=${ok} fail=${fail}`);
if (failed.length) { console.log("FAILED tables:"); failed.forEach(f=>console.log("  "+f)); }
await c.end();
