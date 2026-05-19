import { useState } from 'react';

interface DocItem {
  label: string;
  checked: boolean;
  note: string;
}

interface DocCategory {
  id: string;
  label: string;
  icon: string;
  items: DocItem[];
}

const initialCategories: DocCategory[] = [
  {
    id: "purchase",
    label: "Purchase Documents",
    icon: "🏠",
    items: [
      { label: "Warranty Deed", checked: false, note: "Filed with county clerk — get certified copy" },
      { label: "HUD-1 / Closing Disclosure", checked: false, note: "Documents your purchase price and all closing costs" },
      { label: "Title Insurance Policy", checked: false, note: "Owner's policy protects against prior ownership claims" },
      { label: "Survey Plat", checked: false, note: "Critical for DFW: defines lot boundaries for foundation disputes" },
    ],
  },
  {
    id: "mortgage",
    label: "Mortgage Documents",
    icon: "🏦",
    items: [
      { label: "Promissory Note", checked: false, note: "Your personal loan obligation" },
      { label: "Deed of Trust", checked: false, note: "Lender's security interest in your property" },
      { label: "PMI Paperwork", checked: false, note: "If applicable — track when equity reaches 20% to cancel" },
      { label: "Annual Mortgage Statements", checked: false, note: "Keep 7 years for tax purposes" },
    ],
  },
  {
    id: "insurance",
    label: "Insurance",
    icon: "🛡️",
    items: [
      { label: "Current Homeowner's Policy", checked: false, note: "Full policy document, not just the summary" },
      { label: "Declarations Page", checked: false, note: "Coverage limits, deductibles, named insureds" },
      { label: "Claim History (CLUE Report)", checked: false, note: "Free annually — affects future insurability" },
      { label: "Flood Insurance Policy (if applicable)", checked: false, note: "Separate from homeowner's — required in FEMA zones" },
    ],
  },
  {
    id: "warranties",
    label: "Warranties",
    icon: "📋",
    items: [
      { label: "Appliance Warranties & Manuals", checked: false, note: "HVAC, water heater, refrigerator, washer/dryer" },
      { label: "Builder's Warranty", checked: false, note: "New construction: 1yr workmanship, 2yr systems, 10yr structural" },
      { label: "Contractor Warranties", checked: false, note: "Any work with a written warranty — keep with project scope" },
      { label: "Roof Warranty", checked: false, note: "Manufacturer warranty (20–50yr) + contractor workmanship (1–5yr)" },
    ],
  },
  {
    id: "permits",
    label: "Permits & Certificates",
    icon: "📄",
    items: [
      { label: "All Pulled Permits", checked: false, note: "Required for any structural, electrical, plumbing, mechanical work" },
      { label: "Certificate of Occupancy", checked: false, note: "Original and any updated COs after additions" },
      { label: "Energy Efficiency Certificates", checked: false, note: "If applicable — may affect tax credits" },
    ],
  },
  {
    id: "hoa",
    label: "HOA Documents",
    icon: "🏘️",
    items: [
      { label: "CC&Rs (Covenants, Conditions & Restrictions)", checked: false, note: "Rules governing what you can do with your property" },
      { label: "HOA Rules & Regulations", checked: false, note: "Often more restrictive than CC&Rs" },
      { label: "Meeting Minutes (Last 3 Years)", checked: false, note: "Reveals pending special assessments and litigation" },
      { label: "Payment History / Assessment Records", checked: false, note: "Proof of good standing — required at sale" },
    ],
  },
  {
    id: "maintenance",
    label: "Maintenance Records",
    icon: "🔧",
    items: [
      { label: "HVAC Service History", checked: false, note: "Annual tune-up records extend equipment life and warranty" },
      { label: "Pest Control History", checked: false, note: "DFW: termite bonds are transferable — keep all records" },
      { label: "Major Repair Invoices", checked: false, note: "Foundation, roof, plumbing — capital improvements affect taxes" },
      { label: "Contractor Contact History", checked: false, note: "Who did what — invaluable when issues recur" },
    ],
  },
  {
    id: "tax",
    label: "Property Tax",
    icon: "💰",
    items: [
      { label: "Annual Property Tax Statements", checked: false, note: "Keep 7 years" },
      { label: "Homestead Exemption Filing", checked: false, note: "Texas: file by April 30 of first year of ownership — saves 15–20%" },
      { label: "Over-65 / Disability Exemption", checked: false, note: "If applicable — freeze school district taxes" },
      { label: "Appraisal Protest Records", checked: false, note: "If you've protested — keep all evidence used" },
    ],
  },
];

type AllItems = { catId: string; itemIdx: number; checked: boolean };

export default function HomeDocumentVault() {
  const [cats, setCats] = useState<DocCategory[]>(initialCategories);
  const [openCat, setOpenCat] = useState<string | null>(null);

  const toggleItem = (catId: string, itemIdx: number) => {
    setCats((prev) =>
      prev.map((c) =>
        c.id !== catId ? c : {
          ...c,
          items: c.items.map((item, i) => i !== itemIdx ? item : { ...item, checked: !item.checked }),
        }
      )
    );
  };

  const totalItems = cats.reduce((sum, c) => sum + c.items.length, 0);
  const checkedItems = cats.reduce((sum, c) => sum + c.items.filter((i) => i.checked).length, 0);
  const pct = Math.round((checkedItems / totalItems) * 100);

  const catProgress = (cat: DocCategory) => {
    const done = cat.items.filter((i) => i.checked).length;
    return { done, total: cat.items.length };
  };

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0A1628 0%, #0f2a1a 100%)", padding: "72px 24px 56px", textAlign: "center" }}>
        <div style={{ fontSize: "14px", color: "#4ade80″, fontWeight: 600, letterSpacing: "2px", marginBottom: "14px" }}>HOME DOCUMENT GUIDE</div>
        <h1 style={{ fontSize: "clamp(26px, 4.5vw, 44px)", fontWeight: 800, margin: "0 0 18px", lineHeight: 1.15 }}>
          Home Document Vault Checklist — Every Document You Need to Own Your Home
        </h1>
        <p style={{ fontSize: "17px", color: "#94a3b8″, maxWidth: "600px", margin: "0 auto" }}>
          Most homeowners have fewer than 40% of the documents they'll need at sale, during a dispute, or in a claim. Check yours now.
        </p>
      </div>

      {/* Progress Bar */}
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "40px 24px 0″ }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <span style={{ fontWeight: 700, fontSize: "16px" }}>Your Document Vault</span>
          <span style={{ color: "#4ade80″, fontWeight: 700, fontSize: "18px" }}>{pct}% Complete</span>
        </div>
        <div style={{ background: "#111d35″, borderRadius: "999px", height: "12px", overflow: "hidden" }}>
          <div style={{ background: "linear-gradient(90deg, #4ade80, #22c55e)", width: `${pct}%`, height: "100%", borderRadius: "999px", transition: "width 0.4s" }} />
        </div>
        <div style={{ color: "#64748b", fontSize: "13px", marginTop: "8px" }}>{checkedItems} of {totalItems} documents accounted for</div>
      </div>

      {/* Checklist Categories */}
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 24px" }}>
        {cats.map((cat) => {
          const { done, total } = catProgress(cat);
          const isOpen = openCat === cat.id;
          return (
            <div key={cat.id} style={{ background: "#111d35″, borderRadius: "12px", border: "1px solid #1e3a5f", marginBottom: "16px", overflow: "hidden" }}>
              <button
                onClick={() => setOpenCat(isOpen ? null : cat.id)}
                style={{ width: "100%", background: "none", border: "none", padding: "20px 24px", display: "flex", alignItems: "center", gap: "14px", cursor: "pointer", textAlign: "left", color: "#fff" }}>
                <span style={{ fontSize: "22px" }}>{cat.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: "16px" }}>{cat.label}</div>
                  <div style={{ color: done === total ? "#4ade80″ : "#64748b", fontSize: "12px", marginTop: "3px" }}>
                    {done}/{total} documented {done === total ? "✓" : ""}
                  </div>
                </div>
                <div style={{ width: "48px", height: "6px", background: "#0d1f38″, borderRadius: "999px", overflow: "hidden" }}>
                  <div style={{ background: "#4ade80″, width: `${(done / total) * 100}%`, height: "100%", borderRadius: "999px" }} />
                </div>
                <span style={{ color: "#4ade80″, fontSize: "18px", marginLeft: "8px" }}>{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div style={{ borderTop: "1px solid #1e3a5f" }}>
                  {cat.items.map((item, idx) => (
                    <label key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "16px 24px", borderBottom: idx < cat.items.length - 1 ? "1px solid #0d1f38″ : "none", cursor: "pointer" }}>
                      <input type="checkbox" checked={item.checked} onChange={() => toggleItem(cat.id, idx)}
                        style={{ marginTop: "3px", width: "16px", height: "16px", accentColor: "#4ade80″, cursor: "pointer", flexShrink: 0 }} />
                      <div>
                        <div style={{ fontWeight: item.checked ? 400 : 600, color: item.checked ? "#64748b" : "#fff", textDecoration: item.checked ? "line-through" : "none", fontSize: "15px" }}>{item.label}</div>
                        <div style={{ color: "#64748b", fontSize: "12px", marginTop: "3px" }}>{item.note}</div>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* DFW-Specific Docs */}
      <div style={{ background: "#0d1f38″, padding: "56px 24px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "24px" }}>📍 DFW-Specific Documents to Keep</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { title: "Survey Plat", why: "Foundation disputes are common in North Texas clay soil areas. When two neighbors disagree about whether a fence, retaining wall, or structure encroaches, the survey plat is the legal document that resolves it. Without one, you're paying for a new survey ($400–800)." },
              { title: "Inspection Reports (Pre-Purchase)", why: "During a sale, buyers can request repairs based on inspection findings. Your pre-purchase inspection report documents the home's condition at closing — protecting you from claims that pre-existing issues are your responsibility." },
              { title: "Contractor Invoices for Capital Improvements", why: "Under IRS rules, documented capital improvements (roof, HVAC, foundation, additions) increase your home's cost basis and reduce taxable gain at sale. In high-appreciation DFW markets, this can save thousands in capital gains taxes." },
            ].map((item) => (
              <div key={item.title} style={{ background: "#111d35″, borderRadius: "10px", padding: "20px 24px", border: "1px solid #1e3a5f" }}>
                <div style={{ fontWeight: 700, color: "#4ade80″, marginBottom: "8px" }}>📌 {item.title}</div>
                <p style={{ color: "#94a3b8″, fontSize: "14px", lineHeight: 1.6, margin: 0 }}>{item.why}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Where to Store */}
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "56px 24px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "24px" }}>🗂️ Where to Store Your Documents</h2>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {[
            { icon: "🔒", title: "Physical Fireproof Safe", desc: "For originals: deed, mortgage note, insurance policies, passports. Min UL Class 350 rating — protects paper up to 1,700°F exterior fire." },
            { icon: "☁️", title: "Cloud Scan Backup", desc: "Scan every document to PDF. Store in encrypted cloud (iCloud, Google Drive, or Dropbox with 2FA). One folder per category. Share access with spouse." },
            { icon: "🏛️", title: "ProLnk Document Vault", desc: "The Home Health Vault stores your home documents alongside service records, inspection photos, and contractor history — all in one searchable place that transfers at sale." },
          ].map((opt) => (
            <div key={opt.title} style={{ background: "#111d35″, borderRadius: "12px", padding: "24px", flex: "1 1 200px", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "28px", marginBottom: "12px" }}>{opt.icon}</div>
              <div style={{ fontWeight: 700, fontSize: "16px", marginBottom: "8px" }}>{opt.title}</div>
              <p style={{ color: "#94a3b8″, fontSize: "13px", lineHeight: 1.6, margin: 0 }}>{opt.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "#0d1f38″, textAlign: "center", padding: "64px 24px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "14px" }}>Store Everything in the ProLnk Document Vault</h2>
        <p style={{ color: "#94a3b8″, fontSize: "16px", marginBottom: "28px" }}>One secure place for every document, service record, and photo your home generates — organized and searchable forever.</p>
        <a href="/trustypro/book" style={{ background: "#4ade80″, color: "#0A1628", padding: "16px 40px", borderRadius: "8px", fontWeight: 700, fontSize: "16px", textDecoration: "none", display: "inline-block" }}>
          Get a Professional Assessment ↗
        </a>
      </div>
    </div>
  );
}
