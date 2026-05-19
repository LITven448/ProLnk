import { useState } from 'react';

const categories = ["Is This MLM?", "How It Pays", "Network Depth", "Calculator", "Eligibility"];

const faqs: Record<string, { q: string; a: string }[]> = {
  "Is This MLM?": [
    { q: "Is ProLnk a multi-level marketing scheme?", a: "No. ProLnk is a licensed service marketplace. Network income is an override on real service revenue — homeowners pay for actual jobs done by licensed pros. There is no buying inventory, no downline recruitment requirement, and no pyramid structure." },
    { q: "Do I have to recruit other pros to earn?", a: "No. Stream 1 (direct commission) requires zero recruiting. Network overrides in Streams 2-5 are optional upside on top of your core job income." },
    { q: "Is network income legal?", a: "Yes. ProLnk operates under standard contractor referral and revenue-share law. Network overrides are paid on verified completed-job revenue, not on recruitment fees." },
  ],
  "How It Pays": [
    { q: "When does network income pay out?", a: "Network overrides are calculated monthly and deposited on the 1st of the following month alongside your regular job earnings." },
    { q: "What is Stream 2 — Pro Override?", a: "When pros you personally recruited complete jobs, you earn 7% of the platform fee on each job. Their recruits generate 4%, their recruits 2%, and 4 levels deep generates 1%." },
    { q: "What is Stream 3 — Subscription Override?", a: "When a pro you referred joins ProLnk at $149/mo, you earn 12% of their monthly subscription ($17.88/mo) for as long as they remain active." },
  ],
  "Network Depth": [
    { q: "How deep does the network go?", a: "4 levels. Level 1 (direct recruits): 7% job override + 12% subscription. Level 2: 4% + 6%. Level 3: 2% + 3%. Level 4: 1% + 1.5%." },
    { q: "Is there a cap on network earnings?", a: "No cap on network income. Earnings scale with the real revenue produced by pros in your network." },
    { q: "What is Stream 5 — Home Origination?", a: "When you help a homeowner enroll their home in the Home Health Vault, you earn 1.5% of all platform fees generated from that home — permanently." },
  ],
  "Calculator": [
    { q: "What does a typical Charter Pro earn from network income?", a: "An active Charter Pro with 20 direct recruits (each doing $5K/mo in jobs) earns: 20 × $5,000 × 7% = $7,000/mo in Stream 2 job overrides, plus 20 × $149 × 12% = $357.60/mo in Stream 3 subscription overrides. Total: ~$7,357/mo in passive income on top of direct job earnings." },
    { q: "What happens as my network grows?", a: "If each of your 20 recruits each recruits 10 pros, your Level 2 network = 200 pros. At $5K/mo average job volume: 200 × $5,000 × 4% = $40,000/mo additional passive income." },
  ],
  "Eligibility": [
    { q: "Who is eligible for network income?", a: "All active Charter, Founding, and standard Pro members. You must maintain an active $149/mo subscription to receive network override payouts." },
    { q: "How do I track my network earnings?", a: "Your dashboard has a Network Income tab showing real-time overrides by stream, by level, and by individual recruited pro." },
  ],
};

export default function ProLnkFAQNetworkIncome() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>💸</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#F5E642", marginBottom: 8 }}>Network Income FAQ</h1>
          <p style={{ color: "#94A3B8", fontSize: 16 }}>How ProLnk's 5-stream income system actually works</p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32, justifyContent: "center" }}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
              style={{ padding: "8px 18px", borderRadius: 20, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13,
                background: activeCategory === cat ? "#F5E642" : "#1E2D45", color: activeCategory === cat ? "#0A1628" : "#94A3B8" }}>
              {cat}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {(faqs[activeCategory] || []).map((item, i) => (
            <div key={i} style={{ background: "#1E2D45", borderRadius: 12, overflow: "hidden" }}>
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{ width: "100%", padding: "18px 20px", background: "none", border: "none", cursor: "pointer",
                  display: "flex", justifyContent: "space-between", alignItems: "center", color: "#fff", fontSize: 15, fontWeight: 600 }}>
                <span style={{ textAlign: "left" }}>💡 {item.q}</span>
                <span style={{ color: "#F5E642", fontSize: 20 }}>{openIndex === i ? "▲" : "▼"}</span>
              </button>
              {openIndex === i && (
                <div style={{ padding: "0 20px 18px", color: "#94A3B8", fontSize: 14, lineHeight: 1.7, borderTop: "1px solid #2D3F5A" }}>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48, background: "#1E2D45", borderRadius: 16, padding: 28 }}>
          <p style={{ color: "#F5E642", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>📊 5 Income Streams at a Glance</p>
          {["Stream 1: Direct Commission — 72% of job match fee", "Stream 2: Pro Job Override — 7/4/2/1% (4 levels)", "Stream 3: Subscription Override — 12/6/3/1.5% (4 levels)", "Stream 4: Homeowner Override — per qualified lead you source", "Stream 5: Origination Rights — 1.5% of home revenue, permanent"].map((s, i) => (
            <div key={i} style={{ color: "#94A3B8", fontSize: 13, padding: "6px 0", borderBottom: "1px solid #2D3F5A" }}>✅ {s}</div>
          ))}
        </div>
      </div>
    </div>
  );
}