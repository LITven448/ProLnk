import { useState } from 'react';

const categories = ["Data Security", "Who Can See My Data", "Home Sale Transfer", "What We Record", "Deletion & Control"];

const faqs: Record<string, { q: string; a: string }[]> = {
  "Data Security": [
    { q: "Is my home data secure?", a: "Yes. Home Health Vault data is encrypted at rest (AES-256) and in transit (TLS 1.3). We apply HIPAA-equivalent controls because home health data is treated as sensitive personal information." },
    { q: "Where is my data stored?", a: "All Vault data is stored in TiDB Cloud (US region) with automated backups every 6 hours and geographic redundancy across 3 availability zones." },
    { q: "Has ProLnk ever had a data breach?", a: "No. ProLnk launched in 2026 and operates a zero-trust architecture with continuous penetration testing. Any security event would be disclosed within 72 hours per CCPA requirements." },
  ],
  "Who Can See My Data": [
    { q: "Who can see my home data?", a: "Only you — and pros you explicitly authorize for a specific job. Authorization expires automatically when the job is marked complete." },
    { q: "Does ProLnk sell my home data?", a: "Never. ProLnk does not sell, rent, or share homeowner data with advertisers, data brokers, or third parties. Revenue comes exclusively from pro subscriptions and match fees." },
    { q: "Can my landlord or HOA see my Vault?", a: "No. Vault access is controlled entirely by the registered homeowner. Not even ProLnk employees can access your Vault without a logged, auditable support request." },
  ],
  "Home Sale Transfer": [
    { q: "Does my Vault transfer when I sell my home?", a: "Yes — you choose. You can transfer the full Vault to the buyer at closing (adds demonstrable value to the sale) or retain it and create a new Vault entry for your next home." },
    { q: "Does a Vault history increase home value?", a: "Yes. Third-party real estate studies show documented maintenance history reduces buyer risk perception and can add 1-3% to sale price. Buyers can verify work was done by licensed pros." },
  ],
  "What We Record": [
    { q: "What records does the Vault keep?", a: "All ProLnk-completed services (with photos, invoices, and pro license info), homeowner-entered maintenance records, permit history if provided, and HVAC/appliance age data." },
    { q: "Can I add my own records from non-ProLnk work?", a: "Yes. You can manually upload photos, receipts, and notes for any work — from any contractor — to build a complete home history." },
  ],
  "Deletion & Control": [
    { q: "Can I delete my Vault?", a: "Yes — full Vault deletion is available in account settings. All data is permanently removed within 30 days. This action cannot be undone." },
    { q: "Can I export my Vault data?", a: "Yes. Request a full data export in JSON or PDF format. Your export will be ready within 48 hours and emailed to your registered address." },
  ],
};

export default function ProLnkFAQHomeHealthVault() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "system-ui, sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏦</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#F5E642″, marginBottom: 8 }}>Home Health Vault FAQ</h1>
          <p style={{ color: "#94A3B8″, fontSize: 16 }}>Your home's permanent record — secure, private, and valuable</p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32, justifyContent: "center" }}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
              style={{ padding: "8px 18px", borderRadius: 20, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13,
                background: activeCategory === cat ? "#F5E642″ : "#1E2D45", color: activeCategory === cat ? "#0A1628" : "#94A3B8" }}>
              {cat}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {(faqs[activeCategory] || []).map((item, i) => (
            <div key={i} style={{ background: "#1E2D45″, borderRadius: 12, overflow: "hidden" }}>
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{ width: "100%", padding: "18px 20px", background: "none", border: "none", cursor: "pointer",
                  display: "flex", justifyContent: "space-between", alignItems: "center", color: "#fff", fontSize: 15, fontWeight: 600 }}>
                <span style={{ textAlign: "left" }}>🔒 {item.q}</span>
                <span style={{ color: "#F5E642″, fontSize: 20 }}>{openIndex === i ? "▲" : "▼"}</span>
              </button>
              {openIndex === i && (
                <div style={{ padding: "0 20px 18px", color: "#94A3B8″, fontSize: 14, lineHeight: 1.7, borderTop: "1px solid #2D3F5A" }}>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
          {[{ icon: "🔐", label: "AES-256 Encryption" }, { icon: "🚫", label: "Never Sold" }, { icon: "📤", label: "Exportable Anytime" }, { icon: "🏠", label: "Transfers at Sale" }].map((item) => (
            <div key={item.label} style={{ background: "#1E2D45″, borderRadius: 12, padding: 20, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{item.icon}</div>
              <p style={{ color: "#F5E642″, fontWeight: 700, fontSize: 13 }}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}