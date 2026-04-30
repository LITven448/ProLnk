import mysql from "mysql2/promise";
const conn = await mysql.createConnection(process.env.DATABASE_URL);
const [rows] = await conn.query("SHOW TABLES");
const tables = rows.map((r) => Object.values(r)[0]);
console.log("All tables:", tables.join(", "));
console.log("\nForum/Gallery related:", tables.filter(t => /forum|gallery|post|project/i.test(t)).join(", ") || "none");
await conn.end();
