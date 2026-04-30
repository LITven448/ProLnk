/**
 * Home Passport PDF Generator
 * Generates a professional multi-page PDF for a property's Home Passport.
 * Includes: property overview, system history, service records, QR code for transfer.
 *
 * Usage:
 *   const { buffer, filename } = await generateHomePassportPdf(propertyId, transferToken);
 *   const { url } = await storagePut(`passports/${propertyId}-${Date.now()}.pdf`, buffer, "application/pdf");
 */

import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import { getDb } from "../db";
import { sql } from "drizzle-orm";

const BRAND_DARK = "#0A1628";
const BRAND_GOLD = "#D4AF37";
const BRAND_BLUE = "#1E40AF";
const GRAY_LIGHT = "#F8FAFC";
const GRAY_MID = "#94A3B8";
const TEXT_BODY = "#334155";

export interface PassportPdfResult {
  buffer: Buffer;
  filename: string;
  pageCount: number;
}

export async function generateHomePassportPdf(
  propertyId: number,
  transferToken?: string | null,
  origin?: string
): Promise<PassportPdfResult> {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");

  // ── Fetch property data ──────────────────────────────────────────────────────
  const propRows = await (db as any).execute(
    sql`SELECT p.*, hp.firstName, hp.lastName, hp.email
        FROM properties p
        LEFT JOIN homeownerProfiles hp ON hp.id = p.ownerId
        WHERE p.id = ${propertyId} LIMIT 1`
  );
  const prop = (propRows.rows || propRows)[0];
  if (!prop) throw new Error(`Property #${propertyId} not found`);

  // ── Fetch service history ────────────────────────────────────────────────────
  const jobRows = await (db as any).execute(
    sql`SELECT j.*, p.businessName as partnerName, p.businessType
        FROM jobs j
        LEFT JOIN partners p ON p.id = j.partnerId
        WHERE j.serviceAddress LIKE ${`%${prop.address ?? ""}%`}
        ORDER BY j.createdAt DESC LIMIT 50`
  );
  const jobs = (jobRows.rows || jobRows) as any[];

  // ── Fetch improvements ───────────────────────────────────────────────────────
  const improvRows = await (db as any).execute(
    sql`SELECT * FROM propertyImprovements WHERE propertyId = ${propertyId} ORDER BY completedYear DESC`
  );
  const improvements = (improvRows.rows || improvRows) as any[];

  // ── Generate QR code ─────────────────────────────────────────────────────────
  let qrDataUrl: string | null = null;
  if (transferToken) {
    const transferUrl = `${origin ?? "https://prolnk.io"}/passport/claim/${transferToken}`;
    qrDataUrl = await QRCode.toDataURL(transferUrl, { width: 200, margin: 1 });
  }

  // ── Build PDF ────────────────────────────────────────────────────────────────
  const doc = new PDFDocument({ size: "LETTER", margin: 50, info: {
    Title: `Home Passport — ${prop.address ?? "Property"}`,
    Author: "ProLnk / TrustyPro",
    Subject: "Property Service History & Systems Record",
  }});

  const chunks: Buffer[] = [];
  doc.on("data", (chunk: Buffer) => chunks.push(chunk));

  // ── Page 1: Cover ────────────────────────────────────────────────────────────
  // Header bar
  doc.rect(0, 0, doc.page.width, 80).fill(BRAND_DARK);
  doc.fillColor("white").fontSize(22).font("Helvetica-Bold")
    .text("HOME PASSPORT", 50, 25, { align: "left" });
  doc.fillColor(BRAND_GOLD).fontSize(11).font("Helvetica")
    .text("Powered by ProLnk & TrustyPro", 50, 52);

  // Property address
  doc.fillColor(BRAND_DARK).fontSize(20).font("Helvetica-Bold")
    .text(prop.address ?? "Property Address", 50, 110);
  doc.fillColor(GRAY_MID).fontSize(12).font("Helvetica")
    .text(`${prop.city ?? ""}, ${prop.state ?? ""} ${prop.zip ?? ""}`.trim(), 50, 135);

  // Owner info
  if (prop.firstName) {
    doc.fillColor(TEXT_BODY).fontSize(11).font("Helvetica")
      .text(`Owner: ${prop.firstName} ${prop.lastName ?? ""}`, 50, 160);
  }

  // Property details grid
  const details = [
    ["Property Type", prop.propertyType ?? "Single Family"],
    ["Year Built", prop.yearBuilt ?? "—"],
    ["Square Footage", prop.sqft ? `${Number(prop.sqft).toLocaleString()} sq ft` : "—"],
    ["Bedrooms", prop.bedrooms ?? "—"],
    ["Bathrooms", prop.bathrooms ?? "—"],
    ["Lot Size", prop.lotSize ? `${Number(prop.lotSize).toLocaleString()} sq ft` : "—"],
    ["Has Pool", prop.hasPool ? "Yes" : "No"],
    ["Has Garage", prop.hasGarage ? "Yes" : "No"],
  ];

  let y = 195;
  doc.rect(50, y - 8, doc.page.width - 100, 14).fill(BRAND_DARK);
  doc.fillColor("white").fontSize(9).font("Helvetica-Bold")
    .text("PROPERTY DETAILS", 55, y - 5);
  y += 15;

  const colW = (doc.page.width - 100) / 2;
  details.forEach((d, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 50 + col * colW;
    const ry = y + row * 22;
    if (row % 2 === 0) doc.rect(x, ry - 3, colW, 22).fill(GRAY_LIGHT);
    doc.fillColor(GRAY_MID).fontSize(8).font("Helvetica").text(String(d[0]), x + 5, ry + 1);
    doc.fillColor(BRAND_DARK).fontSize(10).font("Helvetica-Bold").text(String(d[1]), x + 5, ry + 10);
  });

  y += Math.ceil(details.length / 2) * 22 + 20;

  // Systems checklist
  const systems = [
    ["HVAC", prop.hasHvac], ["Plumbing", prop.hasPlumbing], ["Electrical", prop.hasElectrical],
    ["Roof", prop.hasRoof], ["Irrigation", prop.hasIrrigationSystem], ["Solar", prop.hasSolarPanels],
    ["Smart Home", prop.hasSmartHome], ["Security", prop.hasSecuritySystem],
  ].filter(s => s[1]);

  if (systems.length > 0) {
    doc.rect(50, y - 8, doc.page.width - 100, 14).fill(BRAND_BLUE);
    doc.fillColor("white").fontSize(9).font("Helvetica-Bold").text("SYSTEMS ON RECORD", 55, y - 5);
    y += 15;
    systems.forEach((s, i) => {
      const col = i % 4;
      const row = Math.floor(i / 4);
      const x = 50 + col * ((doc.page.width - 100) / 4);
      doc.fillColor(BRAND_DARK).fontSize(10).font("Helvetica")
        .text(`✓ ${s[0]}`, x, y + row * 18);
    });
    y += Math.ceil(systems.length / 4) * 18 + 20;
  }

  // QR code for transfer
  if (qrDataUrl) {
    const qrBuffer = Buffer.from(qrDataUrl.split(",")[1], "base64");
    doc.addPage();
    doc.rect(0, 0, doc.page.width, 80).fill(BRAND_DARK);
    doc.fillColor("white").fontSize(18).font("Helvetica-Bold").text("TRANSFER QR CODE", 50, 28);
    doc.fillColor(GRAY_MID).fontSize(11).font("Helvetica")
      .text("Scan to claim this Home Passport at your new address", 50, 52);
    doc.image(qrBuffer, (doc.page.width - 200) / 2, 110, { width: 200 });
    doc.fillColor(TEXT_BODY).fontSize(10).font("Helvetica")
      .text("This QR code is valid for 30 days. The new owner can scan it to inherit the full property service history.", 50, 330, { align: "center", width: doc.page.width - 100 });
  }

  // ── Page 2+: Service History ─────────────────────────────────────────────────
  if (jobs.length > 0) {
    doc.addPage();
    doc.rect(0, 0, doc.page.width, 80).fill(BRAND_DARK);
    doc.fillColor("white").fontSize(18).font("Helvetica-Bold").text("SERVICE HISTORY", 50, 28);
    doc.fillColor(GRAY_MID).fontSize(11).font("Helvetica")
      .text(`${jobs.length} service record${jobs.length !== 1 ? "s" : ""} on file`, 50, 52);

    let sy = 100;
    jobs.slice(0, 20).forEach((job: any, i: number) => {
      if (sy > doc.page.height - 100) { doc.addPage(); sy = 50; }
      if (i % 2 === 0) doc.rect(50, sy - 4, doc.page.width - 100, 52).fill(GRAY_LIGHT);
      const date = job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "—";
      doc.fillColor(BRAND_DARK).fontSize(11).font("Helvetica-Bold")
        .text(`${job.serviceType ?? "Home Service"} — ${job.partnerName ?? "Service Pro"}`, 55, sy);
      doc.fillColor(GRAY_MID).fontSize(9).font("Helvetica")
        .text(`${date} · ${job.businessType ?? ""}`, 55, sy + 14);
      if (job.notes) {
        doc.fillColor(TEXT_BODY).fontSize(9).font("Helvetica")
          .text(String(job.notes).slice(0, 120), 55, sy + 26, { width: doc.page.width - 120 });
      }
      sy += 58;
    });
  }

  // ── Page: Improvements ───────────────────────────────────────────────────────
  if (improvements.length > 0) {
    doc.addPage();
    doc.rect(0, 0, doc.page.width, 80).fill(BRAND_DARK);
    doc.fillColor("white").fontSize(18).font("Helvetica-Bold").text("IMPROVEMENTS & UPGRADES", 50, 28);
    doc.fillColor(GRAY_MID).fontSize(11).font("Helvetica")
      .text(`${improvements.length} improvement${improvements.length !== 1 ? "s" : ""} recorded`, 50, 52);

    let iy = 100;
    improvements.forEach((imp: any, i: number) => {
      if (iy > doc.page.height - 80) { doc.addPage(); iy = 50; }
      if (i % 2 === 0) doc.rect(50, iy - 4, doc.page.width - 100, 42).fill(GRAY_LIGHT);
      doc.fillColor(BRAND_DARK).fontSize(11).font("Helvetica-Bold")
        .text(imp.category ?? "Improvement", 55, iy);
      doc.fillColor(GRAY_MID).fontSize(9).font("Helvetica")
        .text(`${imp.completedYear ?? "Year unknown"} · ${imp.hasWarranty ? "Has Warranty" : "No Warranty"}`, 55, iy + 14);
      if (imp.notes) {
        doc.fillColor(TEXT_BODY).fontSize(9).font("Helvetica")
          .text(String(imp.notes).slice(0, 100), 55, iy + 26, { width: doc.page.width - 120 });
      }
      iy += 48;
    });
  }

  // ── Footer on all pages ───────────────────────────────────────────────────────
  const pageCount = (doc as any)._pageBuffer?.length ?? 1;
  doc.end();

  return new Promise((resolve, reject) => {
    doc.on("end", () => {
      const buffer = Buffer.concat(chunks);
      const filename = `home-passport-${propertyId}-${Date.now()}.pdf`;
      resolve({ buffer, filename, pageCount });
    });
    doc.on("error", reject);
  });
}
