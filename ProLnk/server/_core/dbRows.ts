/**
 * Normalizers for raw mysql2 results returned by drizzle's `db.execute(sql\`...\`)`.
 *
 * drizzle-mysql2 `db.execute()` returns the mysql2 tuple `[rowsArray, fields]` —
 * there is NO `.rows` property. So `(x.rows ?? x)[0]` returns the ROWS ARRAY (not a
 * row), and `(x.rows ?? x).map(...)` iterates over `[rows, fields]`. Use these helpers.
 *
 * NOTE: only for RAW `db.execute()` results. Drizzle query-builder calls
 * (`db.select()/insert()/update()`) already return clean arrays — don't wrap those.
 */

/** Returns the rows array from any db.execute() shape (mysql2 tuple, {rows}, or array). */
export function asRows(res: any): any[] {
  if (!res) return [];
  if (Array.isArray(res.rows)) return res.rows;
  if (Array.isArray(res) && Array.isArray(res[0])) return res[0]; // mysql2 [rows, fields]
  if (Array.isArray(res)) return res;
  return [];
}

/** Returns the first row (or undefined) from any db.execute() shape. */
export function firstRow(res: any): any | undefined {
  return asRows(res)[0];
}

/** Returns the mysql2 ResultSetHeader for INSERT/UPDATE (carries insertId/affectedRows). */
export function resultHeader(res: any): any {
  if (Array.isArray(res)) return res[0] ?? {};
  return res ?? {};
}

/** Returns insertId from a raw db.execute() INSERT result. */
export function insertIdOf(res: any): number | undefined {
  return resultHeader(res)?.insertId;
}
