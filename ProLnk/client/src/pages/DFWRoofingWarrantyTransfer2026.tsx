import { useState } from 'react';

export default function DFWRoofingWarrantyTransfer2026() {
  const [scenario, setScenario] = useState("");

  const scenarios = [
    { id: "selling", label: "Selling DFW home with newer roof", guide: "Initiate warranty transfer before closing — most manufacturers require notification within 30-60 days of sale. GAF: transfer within 60 days, $200 fee for Smart Choice warranty. Owens Corning: transfer at no cost within 30 days for Duration series. Gather original permit, contractor invoice, and shingle purchase receipt." },
    { id: "buying", label: "Buying DFW home, want warranty", guide: "Ask for original roofing contract, permit copy, and manufacturer warranty certificate. Call the manufacturer directly to verify warranty is active and transferable. Confirm workmanship warranty (contractor-issued) separately — these rarely transfer to new owners." },
    { id: "gaf", label: "Transferring GAF warranty", guide: "GAF offers two transferable warranty types: 1) Standard warranty transfers once for $200 via GAF.com within 60 days of closing. 2) Golden Pledge (contractor-installed) — contact original contractor for transfer documentation. Verify the shingle line first, as some entry-level products have limited transferability." },
    { id: "oc", label: "Transferring Owens Corning warranty", guide: "Owens Corning Duration and TruDefinition series warranties transfer automatically with proof of home sale — no fee required. Submit transfer via owenscorning.com warranty portal within 30 days of closing. System Plus and Preferred warranty upgrades are also transferable." },
  ];

  const documents = [
    { doc: "Original roofing contract", why: "Shows scope, materials, and contractor" },
    { doc: "Building permit or permit number", why: "Proves work was permitted and inspected" },
    { doc: "Shingle manufacturer warranty certificate", why: "Required for manufacturer transfer request" },
    { doc: "Workmanship warranty (contractor issued)", why: "Separate from manufacturer — usually non-transferable" },
    { doc: "Shingle purchase receipt or invoice", why: "Manufacturer may require proof of product purchase" },
    { doc: "Closing statement at time of transfer", why: "Proves date of sale for timing compliance" },
  ];

  const timelines = [
    { brand: "GAF", window: "60 days", fee: "$200", notes: "Fee varies by warranty tier" },
    { brand: "Owens Corning", window: "30 days", fee: "No fee", notes: "Duration series and above" },
    { brand: "CertainTeed", window: "60 days", fee: "$50-150", notes: "SureStart Plus warranty" },
    { brand: "Atlas", window: "30 days", fee: "No fee", notes: "Pinnacle and Pristine series" },
  ];

  const sel = scenarios.find(s => s.id === scenario);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>📜</div>
          <h1 style={{ color: "#F5E642", fontSize: 26, fontWeight: 800, margin: "8px 0 4px" }}>
            DFW Roofing Warranty Transfer Guide 2026
          </h1>
          <p style={{ color: "#94A3B8", fontSize: 14 }}>
            Transferring roof warranties at DFW home sales — timelines, fees, and requirements
          </p>
        </div>

        <div style={{ background: "#1E293B", borderRadius: 12, padding: 24, marginBottom: 24, border: "1px solid #F5E642" }}>
          <h2 style={{ color: "#F5E642", fontSize: 16, marginBottom: 16 }}>DFW Sale Situation - Warranty Transfer Guide</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
            {scenarios.map(s => (
              <button key={s.id} onClick={() => setScenario(s.id === scenario ? "" : s.id)}
                style={{ background: scenario === s.id ? "#F5E642" : "#0A1628", color: scenario === s.id ? "#0A1628" : "#fff",
                  border: "1px solid #F5E642", borderRadius: 8, padding: "10px 12px", cursor: "pointer", fontSize: 13, textAlign: "left" }}>
                {s.label}
              </button>
            ))}
          </div>
          {sel ? (
            <div style={{ background: "#0A1628", borderRadius: 8, padding: 16, border: "1px solid #4ADE80" }}>
              <div style={{ color: "#4ADE80", fontWeight: 700, marginBottom: 8 }}>Action Guide:</div>
              <div style={{ color: "#CBD5E1", fontSize: 14, lineHeight: 1.6 }}>{sel.guide}</div>
            </div>
          ) : (
            <div style={{ color: "#475569", fontSize: 13, textAlign: "center" }}>Select your situation above</div>
          )}
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 16, marginBottom: 12 }}>Transfer Windows by Brand</h2>
          <div style={{ background: "#1E293B", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 2fr", background: "#0A1628", padding: "10px 14px" }}>
              {["Brand", "Window", "Fee", "Notes"].map(h => (
                <div key={h} style={{ color: "#F5E642", fontSize: 12, fontWeight: 700 }}>{h}</div>
              ))}
            </div>
            {timelines.map((t, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 2fr", padding: "10px 14px", borderTop: "1px solid #0A1628" }}>
                <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{t.brand}</div>
                <div style={{ color: "#F5E642", fontSize: 13 }}>{t.window}</div>
                <div style={{ color: "#4ADE80", fontSize: 13 }}>{t.fee}</div>
                <div style={{ color: "#94A3B8", fontSize: 12 }}>{t.notes}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642", fontSize: 16, marginBottom: 12 }}>Required Documents</h2>
          {documents.map((d, i) => (
            <div key={i} style={{ background: "#1E293B", borderRadius: 8, padding: 12, marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ color: "#fff", fontSize: 13 }}>📄 {d.doc}</div>
              <div style={{ color: "#94A3B8", fontSize: 12, maxWidth: 220, textAlign: "right" }}>{d.why}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#1E293B", borderRadius: 12, padding: 20, border: "1px solid #EF4444" }}>
          <h2 style={{ color: "#EF4444", fontSize: 15, marginBottom: 12 }}>What Never Transfers</h2>
          {[
            "Workmanship warranty (contractor-issued) — almost never transferable to new owner",
            "Premium warranty upgrades on entry-level shingle lines",
            "Warranties on work done without a permit — unpermitted work has no transferable warranty",
            "Verbal warranties from contractors — only written warranties can transfer",
          ].map((w, i) => (
            <div key={i} style={{ color: "#CBD5E1", fontSize: 13, marginBottom: 6, display: "flex", gap: 8 }}>
              <span style={{ color: "#EF4444" }}>X</span>{w}
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 24, color: "#475569", fontSize: 12 }}>
          ProLnk Roofing Warranty Transfer Guide 2026 | Verify requirements directly with manufacturer
        </div>
      </div>
    </div>
  );
}
