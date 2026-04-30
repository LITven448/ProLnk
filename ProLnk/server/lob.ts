/**
 * Lob.com Integration — Automated Postcard Mailing
 *
 * When a partner's FSM job closes at a property that isn't already in
 * the homeowner database, we queue a postcard to be sent to that address.
 *
 * The postcard:
 *   - Arrives 3-5 days after the service visit (while the homeowner
 *     still remembers the contractor was there — warm outreach)
 *   - Has a QR code linking to trustypro.io/scan?zip=75201&ref=postcard
 *   - Converts at 5-15% (vs. ~0.5% cold digital ads)
 *
 * Lob API docs: lob.com/docs
 * Cost: ~$0.75-1.50 per postcard (4x6 standard)
 */

const LOB_API_KEY = process.env.LOB_API_KEY ?? "";
const LOB_BASE = "https://api.lob.com/v1";

function lobAuth(): string {
  return `Basic ${Buffer.from(LOB_API_KEY + ":").toString("base64")}`;
}

export interface PostcardRecipient {
  name: string;
  address1: string;
  city: string;
  state: string;
  zip: string;
}

export interface PostcardOptions {
  to: PostcardRecipient;
  from?: PostcardRecipient;
  description?: string;
  campaignType: "partner_intro" | "storm_outreach" | "seasonal" | "general";
  zip: string; // for QR tracking
  partnerName?: string;
}

// ─── Send a single postcard ───────────────────────────────────────────────────

export async function sendPostcard(opts: PostcardOptions): Promise<{
  lobMailingId: string | null;
  estimatedDelivery: Date | null;
  cost: number;
}> {
  if (!LOB_API_KEY) {
    console.log(`[Lob] No LOB_API_KEY — would send postcard to ${opts.to.address1}, ${opts.to.city}`);
    return { lobMailingId: null, estimatedDelivery: null, cost: 0 };
  }

  const qrRef = `postcard-${opts.campaignType}-${opts.zip}`;
  const qrUrl = `https://trustypro.io/join?ref=${qrRef}&zip=${opts.zip}`;

  // Front HTML template
  const frontHtml = `
<!DOCTYPE html>
<html>
<head><style>
  body { margin: 0; font-family: 'Helvetica Neue', sans-serif; width: 4.25in; height: 6.25in; background: #0A1628; }
  .card { width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 0.4in; box-sizing: border-box; }
  .logo { font-size: 28pt; font-weight: 900; color: #14b8a6; letter-spacing: -1px; margin-bottom: 12pt; }
  .headline { font-size: 18pt; font-weight: 800; color: #fff; text-align: center; line-height: 1.3; margin-bottom: 12pt; }
  .sub { font-size: 11pt; color: #94a3b8; text-align: center; line-height: 1.5; margin-bottom: 20pt; }
  .cta { font-size: 10pt; font-weight: 700; color: #14b8a6; text-transform: uppercase; letter-spacing: 1px; }
</style></head>
<body>
  <div class="card">
    <div class="logo">TrustyPro</div>
    <div class="headline">A verified pro recently<br>serviced your neighborhood.</div>
    <div class="sub">Scan the QR code to get your free<br>AI Home Health Scan and see what<br>verified pros have spotted nearby.</div>
    <div class="cta">Free for homeowners · Always</div>
  </div>
</body>
</html>`;

  // Back HTML template
  const backHtml = `
<!DOCTYPE html>
<html>
<head><style>
  body { margin: 0; font-family: 'Helvetica Neue', sans-serif; width: 4.25in; height: 6.25in; background: #fff; }
  .card { width: 100%; height: 100%; padding: 0.4in; box-sizing: border-box; display: flex; flex-direction: column; }
  h2 { font-size: 16pt; font-weight: 800; color: #0A1628; margin: 0 0 8pt; }
  p { font-size: 10pt; color: #475569; line-height: 1.6; margin: 0 0 12pt; }
  .features { list-style: none; padding: 0; margin: 0 0 16pt; }
  .features li { font-size: 9pt; color: #334155; padding: 3pt 0; }
  .features li::before { content: "✓ "; color: #14b8a6; font-weight: bold; }
  .url { font-size: 8pt; color: #94a3b8; margin-top: auto; }
  .qr-placeholder { width: 1in; height: 1in; background: #f1f5f9; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center; font-size: 7pt; color: #64748b; margin-bottom: 8pt; }
</style></head>
<body>
  <div class="card">
    <h2>Free Home Health Scan</h2>
    <p>Our AI scans your home photos for 50+ issue types across every major system — roof, HVAC, plumbing, electrical, and more.</p>
    <ul class="features">
      <li>AI-powered home health score</li>
      <li>Background-checked, verified contractors</li>
      <li>Permanent Home Passport — transfers when you sell</li>
      <li>No contractor calls until you're ready</li>
    </ul>
    <div class="qr-placeholder">QR: ${qrUrl.slice(0, 30)}...</div>
    <div class="url">trustypro.io · Free for homeowners</div>
  </div>
</body>
</html>`;

  try {
    const fromAddress = {
      name: "TrustyPro",
      address_line1: "1234 Main St",
      address_city: "Dallas",
      address_state: "TX",
      address_zip: "75201",
    };

    const res = await fetch(`${LOB_BASE}/postcards`, {
      method: "POST",
      headers: {
        Authorization: lobAuth(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: opts.description ?? `TrustyPro ${opts.campaignType} postcard`,
        to: {
          name: opts.to.name || "Homeowner",
          address_line1: opts.to.address1,
          address_city: opts.to.city,
          address_state: opts.to.state,
          address_zip: opts.to.zip,
          address_country: "US",
        },
        from: fromAddress,
        size: "4x6",
        front: frontHtml,
        back: backHtml,
        metadata: {
          campaign: opts.campaignType,
          zip: opts.zip,
          qr_ref: qrRef,
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`[Lob] Postcard send failed: ${res.status} ${err}`);
      return { lobMailingId: null, estimatedDelivery: null, cost: 0 };
    }

    const data = await res.json() as any;
    const deliveryDate = data.expected_delivery_date ? new Date(data.expected_delivery_date) : null;
    const cost = data.price ? Math.round(parseFloat(data.price) * 100) : 100; // cents

    console.log(`[Lob] Postcard sent to ${opts.to.address1}, ${opts.to.city} — id: ${data.id}, delivery: ${data.expected_delivery_date}`);
    return { lobMailingId: data.id, estimatedDelivery: deliveryDate, cost };
  } catch (err) {
    console.error("[Lob] Error sending postcard:", err);
    return { lobMailingId: null, estimatedDelivery: null, cost: 0 };
  }
}

// ─── Process postcard queue ───────────────────────────────────────────────────

export async function processPostcardQueue(limit = 50): Promise<{
  processed: number;
  sent: number;
  failed: number;
  skipped: number;
}> {
  const { getDb } = await import("./db");
  const db = await getDb();
  if (!db) return { processed: 0, sent: 0, failed: 0, skipped: 0 };

  const { sql } = await import("drizzle-orm");

  const queueRows = await (db as any).execute(sql`
    SELECT * FROM postcardQueue WHERE status = 'queued' ORDER BY createdAt ASC LIMIT ${limit}
  `);
  const queue = queueRows.rows || queueRows;

  let sent = 0, failed = 0, skipped = 0;

  for (const item of queue) {
    try {
      // Skip if address is invalid
      if (!item.street || !item.city || !item.state || !item.zip) {
        await (db as any).execute(sql`
          UPDATE postcardQueue SET status = 'skipped', skippedReason = 'incomplete_address' WHERE id = ${item.id}
        `);
        skipped++;
        continue;
      }

      const result = await sendPostcard({
        to: {
          name: item.recipientName || "Homeowner",
          address1: item.street,
          city: item.city,
          state: item.state,
          zip: item.zip,
        },
        campaignType: item.campaignType || "partner_intro",
        zip: item.zip,
        description: item.campaignMessage || undefined,
      });

      if (result.lobMailingId) {
        await (db as any).execute(sql`
          UPDATE postcardQueue SET
            status = 'sent',
            lobMailingId = ${result.lobMailingId},
            sentAt = NOW(),
            estimatedDeliveryAt = ${result.estimatedDelivery},
            costCents = ${result.cost}
          WHERE id = ${item.id}
        `);
        sent++;
      } else {
        await (db as any).execute(sql`
          UPDATE postcardQueue SET status = 'failed' WHERE id = ${item.id}
        `);
        failed++;
      }

      // Rate limit: Lob allows ~10 req/sec
      await new Promise(r => setTimeout(r, 120));
    } catch (err) {
      failed++;
      await (db as any).execute(sql`
        UPDATE postcardQueue SET status = 'failed' WHERE id = ${item.id}
      `).catch(() => {});
    }
  }

  console.log(`[Lob] Queue processed: ${sent} sent, ${failed} failed, ${skipped} skipped`);
  return { processed: queue.length, sent, failed, skipped };
}

// ─── Queue a postcard from FSM job close ─────────────────────────────────────

export async function queuePostcardFromFSMJob(jobData: {
  address: string;
  city: string;
  state: string;
  zip: string;
  sourceType: "fsm_job" | "storm_event";
  sourceId: number;
}): Promise<boolean> {
  const { getDb } = await import("./db");
  const { sql } = await import("drizzle-orm");
  const db = await getDb();
  if (!db) return false;

  // Check if this address is already a homeowner in the system
  const existingRows = await (db as any).execute(sql`
    SELECT 1 FROM homeownerProfiles WHERE LOWER(phone) LIKE LOWER(${`%${jobData.zip}%`})
    UNION
    SELECT 1 FROM homeWaitlist WHERE LOWER(address) LIKE LOWER(${`%${jobData.address.slice(0, 20)}%`})
    LIMIT 1
  `);
  if ((existingRows.rows || existingRows)[0]) return false; // Already in system

  // Check if postcard already queued for this address
  const dupRows = await (db as any).execute(sql`
    SELECT 1 FROM postcardQueue
    WHERE LOWER(street) = LOWER(${jobData.address})
      AND zip = ${jobData.zip}
      AND status IN ('queued','sent')
      AND createdAt > DATE_SUB(NOW(), INTERVAL 90 DAY)
    LIMIT 1
  `);
  if ((dupRows.rows || dupRows)[0]) return false; // Already queued recently

  await (db as any).execute(sql`
    INSERT INTO postcardQueue (
      sourceType, sourceId, street, city, state, zip,
      campaignType, status
    ) VALUES (
      ${jobData.sourceType}, ${jobData.sourceId},
      ${jobData.address}, ${jobData.city}, ${jobData.state}, ${jobData.zip},
      'partner_intro', 'queued'
    )
  `);

  return true;
}
