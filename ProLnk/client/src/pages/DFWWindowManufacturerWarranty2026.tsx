import { useState } from 'react';

type Issue = "Fogged glass" | "Failed seal" | "Drafts / air leaks" | "Hardware failure" | "Frame damage";

const brands: Record<string, { glass: string; frame: string; transferable: string; notes: string }> = {
  "Andersen": { glass: "20-year insulated glass", frame: "10-year frame and finish", transferable: "Transferable to one subsequent owner", notes: "Register within 30 days of purchase for full coverage. Excludes condensation between panes as a warranty event in some product lines." },
  "Pella": { glass: "10-year glass", frame: "10-year limited", transferable: "Non-transferable on most lines", notes: "Lifestyle Series has longer coverage. Installation warranty is separate — verify with installing contractor." },
  "Harvey": { glass: "Lifetime glass", frame: "Lifetime frame (transferable)", transferable: "Fully transferable — strong for resale", notes: "Harvey is a Northeast brand growing in DFW. Excellent glass warranty. Verify local dealer support in DFW before purchase." },
  "Marvin": { glass: "20-year glass", frame: "Limited Lifetime frame", transferable: "Transferable once for a fee", notes: "Premium brand — higher cost but best warranty depth. Most common warranty void: contractor-installed with non-Marvin-certified crew." },
  "Milgard": { glass: "Lifetime glass", frame: "Lifetime limited", transferable: "Non-transferable", notes: "Popular in Southwest. Full Lifetime Warranty includes glass, frame, and hardware for original owner. Strong value for DFW builders." },
};

const issueGuide: Record<Issue, { claim: string; covered: boolean; tip: string }> = {
  "Fogged glass": { claim: "File glass seal warranty claim with manufacturer", covered: true, tip: "Most common claim — nearly always covered. Take photos showing condensation between panes." },
  "Failed seal": { claim: "Same as fogged glass — file directly with manufacturer", covered: true, tip: "Often caught early only during annual inspection. Document with a flashlight test." },
  "Drafts / air leaks": { claim: "File installation warranty claim with contractor first", covered: false, tip: "Usually an installation defect, not a product defect. Contractor warranty (typically 1yr) applies." },
  "Hardware failure": { claim: "Contact manufacturer for hardware replacement", covered: true, tip: "Locks, hinges, operators — usually covered. Have model number and purchase date ready." },
  "Frame damage": { claim: "Typically NOT covered — file homeowner insurance claim", covered: false, tip: "Physical damage from impact or weather is excluded. Document thoroughly for insurance claim." },
};

export default function DFWWindowManufacturerWarranty2026() {
  const [brand, setBrand] = useState("Andersen");
  const [issue, setIssue] = useState<Issue>("Fogged glass");

  const info = brands[brand];
  const guide = issueGuide[issue];

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ marginBottom: 8, color: "#F5E642″, fontSize: 13 }}>🪟 ProLnk Home Health Vault</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Window Warranty Guide 2026</h1>
        <p style={{ color: "#94a3b8″, marginBottom: 32, lineHeight: 1.6 }}>
          Fogged glass between panes is the most common window warranty claim in DFW. Here is what your brand covers, what voids it, and how to get it fixed.
        </p>

        <div style={{ backgroundColor: "#111f38″, borderRadius: 12, padding: 24, marginBottom: 24, border: "1px solid #1e3a5f" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: "#F5E642″ }}>🔍 Warranty by Brand</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
            {Object.keys(brands).map((b) => (
              <button key={b} onClick={() => setBrand(b)}
                style={{ padding: "8px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13,
                  backgroundColor: brand === b ? "#F5E642″ : "#1e3a5f", color: brand === b ? "#0A1628" : "#fff" }}>
                {b}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div style={{ backgroundColor: "#0A1628″, borderRadius: 8, padding: 14 }}>
              <div style={{ color: "#F5E642″, fontSize: 12, marginBottom: 4 }}>GLASS WARRANTY</div>
              <div style={{ fontWeight: 700 }}>{info.glass}</div>
            </div>
            <div style={{ backgroundColor: "#0A1628″, borderRadius: 8, padding: 14 }}>
              <div style={{ color: "#F5E642″, fontSize: 12, marginBottom: 4 }}>FRAME WARRANTY</div>
              <div style={{ fontWeight: 700 }}>{info.frame}</div>
            </div>
            <div style={{ backgroundColor: "#0A1628″, borderRadius: 8, padding: 14 }}>
              <div style={{ color: "#F5E642″, fontSize: 12, marginBottom: 4 }}>TRANSFERABLE</div>
              <div style={{ fontWeight: 700 }}>{info.transferable}</div>
            </div>
            <div style={{ backgroundColor: "#0A1628″, borderRadius: 8, padding: 14 }}>
              <div style={{ color: "#F5E642″, fontSize: 12, marginBottom: 4 }}>IMPORTANT NOTE</div>
              <div style={{ color: "#94a3b8″, fontSize: 13 }}>{info.notes}</div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: "#111f38″, borderRadius: 12, padding: 24, marginBottom: 24, border: "1px solid #1e3a5f" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: "#F5E642″ }}>🛠️ Issue → Warranty Claim Guide</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
            {(Object.keys(issueGuide) as Issue[]).map((i) => (
              <button key={i} onClick={() => setIssue(i)}
                style={{ padding: "8px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 12,
                  backgroundColor: issue === i ? "#F5E642″ : "#1e3a5f", color: issue === i ? "#0A1628" : "#fff" }}>
                {i}
              </button>
            ))}
          </div>
          <div style={{ backgroundColor: guide.covered ? "#0f2d1a" : "#2d0f0f", borderRadius: 10, padding: 20, border: `1px solid ${guide.covered ? "#4ade80" : "#f87171"}` }}>
            <div style={{ fontWeight: 700, color: guide.covered ? "#4ade80″ : "#f87171", marginBottom: 10, fontSize: 15 }}>
              {guide.covered ? "✅ Typically Covered by Manufacturer Warranty" : "❌ Usually NOT Covered by Manufacturer Warranty"}
            </div>
            <div style={{ color: "#cbd5e1″, fontSize: 14, marginBottom: 8 }}>📋 Action: <strong>{guide.claim}</strong></div>
            <div style={{ color: "#94a3b8″, fontSize: 13, fontStyle: "italic" }}>💡 {guide.tip}</div>
          </div>
        </div>

        <div style={{ backgroundColor: "#111f38″, borderRadius: 12, padding: 24, marginBottom: 24, border: "1px solid #1e3a5f" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: "#F5E642″ }}>🚫 Top Warranty Voids</h2>
          {["Improper installation by non-certified contractor (most common void)", "Painting or staining frames with incompatible products", "Using abrasive cleaners on glass or frames", "Hurricane film applied without manufacturer approval", "Modifying frame dimensions after install"].map((v) => (
            <div key={v} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <span style={{ color: "#f87171″ }}>🚫</span>
              <span style={{ color: "#cbd5e1″, fontSize: 14 }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#F5E642″, borderRadius: 12, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 20, marginBottom: 8 }}>🪟</div>
          <div style={{ fontWeight: 700, color: "#0A1628″, marginBottom: 4 }}>Document Window Brand and Age in ProLnk Vault</div>
          <div style={{ color: "#1e3a5f", fontSize: 13 }}>Store window serial numbers, installation dates, and warranty documents — critical for resale and insurance claims.</div>
        </div>
      </div>
    </div>
  );
}
