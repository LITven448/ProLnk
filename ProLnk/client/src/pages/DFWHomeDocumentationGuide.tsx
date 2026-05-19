import { useState } from 'react';

const DOC_CATEGORIES = {
  legal: {
    label: "Legal & Ownership",
    icon: "📜",
    docs: ["Deed of Trust", "Title Insurance Policy", "Survey/Plat Map", "HOA Documents & CC&Rs", "Easement Agreements"],
  },
  permits: {
    label: "Permits & Inspections",
    icon: "🏛️",
    docs: ["Original Building Permit", "Certificate of Occupancy", "Inspection Reports", "Addition/Remodel Permits", "Pool/Fence Permits"],
  },
  warranties: {
    label: "Warranties & Manuals",
    icon: "🛡️",
    docs: ["Builder Warranty", "Appliance Warranties", "HVAC Warranty", "Roof Warranty", "Window/Door Warranties"],
  },
  insurance: {
    label: "Insurance",
    icon: "🔒",
    docs: ["Homeowners Insurance Policy", "Flood Insurance (if applicable)", "Wind/Hail Rider", "Claims History", "Home Inventory List"],
  },
  improvements: {
    label: "Improvement Records",
    icon: "🔨",
    docs: ["Contractor Invoices", "Material Receipts", "Before/After Photos", "Lien Waivers", "Permit Closeout Docs"],
  },
  financial: {
    label: "Financial",
    icon: "💰",
    docs: ["Mortgage Statements", "Property Tax Records", "HOA Fee Receipts", "Closing Disclosure", "Appraisal Reports"],
  },
};

const HOME_TYPES = ["Single Family", "Townhome", "Condo", "New Construction", "Historic Home"];
const YEARS_OWNED = ["Less than 1 year", "1–5 years", "5–10 years", "10+ years"];

function getPriority(homeType: string, yearsOwned: string) {
  const urgent: string[] = [];
  const important: string[] = [];
  if (homeType === "New Construction") urgent.push("Builder Warranty", "Certificate of Occupancy", "All Permits");
  if (homeType === "Historic Home") urgent.push("Original Building Permit", "Historic Designation Docs");
  if (yearsOwned === "Less than 1 year") urgent.push("Closing Disclosure", "Title Insurance Policy", "Deed of Trust");
  if (yearsOwned === "10+ years") important.push("Remodel Permits", "Contractor Invoices", "Insurance Claims History");
  important.push("Current Insurance Policy", "Property Tax Records", "HOA Documents");
  return { urgent, important };
}

export default function DFWHomeDocumentationGuide() {
  const [homeType, setHomeType] = useState("");
  const [yearsOwned, setYearsOwned] = useState("");
  const [showChecklist, setShowChecklist] = useState(false);

  const priorities = homeType && yearsOwned ? getPriority(homeType, yearsOwned) : null;

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#E8EDF5", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <span style={{ background: "#F5E642″, color: "#0A1628", padding: "0.25rem 0.75rem", borderRadius: 4, fontSize: 12, fontWeight: 700 }}>DFW HOMEOWNER GUIDE</span>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginTop: "1rem", marginBottom: "0.5rem" }}>📁 Home Documentation Guide</h1>
          <p style={{ color: "#9BAAC5″, fontSize: 16 }}>Texas homeowners who keep organized records sell faster, recover more from claims, and avoid costly disputes. Here is what to keep and where to keep it.</p>
        </div>

        <div style={{ background: "#111E35″, border: "1px solid #F5E642", borderRadius: 10, padding: "1.5rem", marginBottom: "2rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: 18, marginBottom: "1rem" }}>⚡ Why Texas Permit History Matters at Sale</h2>
          <p style={{ color: "#CBD5E8″, lineHeight: 1.7 }}>Texas buyers and their agents routinely request full permit history. Unpermitted work can kill a deal, require costly retroactive permitting, or reduce your sale price by 5–15%. DFW municipalities (Dallas, Frisco, McKinney, Plano) all maintain online permit lookup — but records older than 10 years may be incomplete. Keep your own copies.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {Object.values(DOC_CATEGORIES).map((cat) => (
            <div key={cat.label} style={{ background: "#111E35″, borderRadius: 8, padding: "1.25rem", border: "1px solid #1E3A5F" }}>
              <div style={{ fontSize: 24, marginBottom: "0.5rem" }}>{cat.icon}</div>
              <h3 style={{ color: "#F5E642″, fontSize: 15, marginBottom: "0.75rem" }}>{cat.label}</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {cat.docs.map((d) => <li key={d} style={{ color: "#9BAAC5″, fontSize: 13, padding: "0.2rem 0" }}>• {d}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ background: "#111E35″, borderRadius: 10, padding: "1.5rem", marginBottom: "2rem", border: "1px solid #1E3A5F" }}>
          <h2 style={{ fontSize: 20, marginBottom: "1.25rem" }}>🎯 Get Your Personalized Checklist</h2>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <select value={homeType} onChange={(e) => { setHomeType(e.target.value); setShowChecklist(false); }} style={{ background: "#0A1628″, color: "#E8EDF5", border: "1px solid #2A4A7F", borderRadius: 6, padding: "0.5rem 1rem", fontSize: 14, flex: 1, minWidth: 180 }}>
              <option value="">Select Home Type</option>
              {HOME_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <select value={yearsOwned} onChange={(e) => { setYearsOwned(e.target.value); setShowChecklist(false); }} style={{ background: "#0A1628″, color: "#E8EDF5", border: "1px solid #2A4A7F", borderRadius: 6, padding: "0.5rem 1rem", fontSize: 14, flex: 1, minWidth: 180 }}>
              <option value="">Years Owned</option>
              {YEARS_OWNED.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            <button onClick={() => setShowChecklist(true)} disabled={!homeType || !yearsOwned} style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 6, padding: "0.5rem 1.5rem", fontWeight: 700, fontSize: 14, cursor: homeType && yearsOwned ? "pointer" : "not-allowed", opacity: homeType && yearsOwned ? 1 : 0.5 }}>Generate Checklist</button>
          </div>
          {showChecklist && priorities && (
            <div>
              {priorities.urgent.length > 0 && (
                <div style={{ background: "#1A0A00″, border: "1px solid #F5A623", borderRadius: 8, padding: "1rem", marginBottom: "1rem" }}>
                  <h3 style={{ color: "#F5A623″, marginBottom: "0.5rem" }}>🔴 Gather Immediately</h3>
                  {priorities.urgent.map((d) => <div key={d} style={{ color: "#CBD5E8″, fontSize: 14, padding: "0.25rem 0" }}>• {d}</div>)}
                </div>
              )}
              <div style={{ background: "#0A1E10″, border: "1px solid #2ECC71", borderRadius: 8, padding: "1rem" }}>
                <h3 style={{ color: "#2ECC71″, marginBottom: "0.5rem" }}>🟡 Important to Have</h3>
                {priorities.important.map((d) => <div key={d} style={{ color: "#CBD5E8″, fontSize: 14, padding: "0.25rem 0" }}>• {d}</div>)}
              </div>
              <div style={{ marginTop: "1rem", padding: "0.75rem", background: "#111E35″, borderRadius: 6, color: "#9BAAC5", fontSize: 13 }}>
                💡 <strong style={{ color: "#F5E642″ }}>Storage tip:</strong> Keep originals in a fireproof safe. Scan everything to a cloud folder labeled by category. Share access with your spouse or trusted family member.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

