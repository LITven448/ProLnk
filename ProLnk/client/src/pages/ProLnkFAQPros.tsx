import { useState } from 'react';

const categories = ["Costs & Fees", "Getting Paid", "Service Area", "Matching Algorithm", "Account Management"];

const faqs: Record<string, { q: string; a: string }[]> = {
  "Costs & Fees": [
    { q: "How much does ProLnk cost?", a: "Charter membership is $149/month — locked for life. You get unlimited lead access, network income eligibility, and full platform tools." },
    { q: "Are there per-lead fees on top of the subscription?", a: "No per-lead fees for Charter members. Your $149/mo covers all matched leads within your service area and specialty." },
    { q: "Can I cancel anytime?", a: "Yes. Cancel anytime from your dashboard. Your Charter rate is locked only while the subscription is active — re-subscribing after cancellation is at the current rate." },
  ],
  "Getting Paid": [
    { q: "When do I get paid after a job?", a: "Funds are released within 48 hours of job completion confirmation. Payment goes to your connected bank account via Stripe." },
    { q: "How does the 4-level network income pay out?", a: "Network overrides are calculated monthly and paid on the 1st of the following month. All 4 levels aggregate into a single payout." },
    { q: "What forms do I need for taxes?", a: "If you earn over $20K/year through ProLnk, you will receive a 1099-NEC by January 31. Earnings are tracked in your dashboard year-round." },
  ],
  "Service Area": [
    { q: "Who sets my geographic coverage?", a: "You do. Set your service radius (in miles) from your home base during onboarding. Update it anytime in your profile settings." },
    { q: "Can I serve multiple cities or states?", a: "Yes. You can define up to 3 service zones. Each zone has its own radius and trade specialty settings." },
  ],
  "Matching Algorithm": [
    { q: "How does the match algorithm work?", a: "ProLnk matches on 4 factors: proximity to job site, trade specialty match, your current availability, and your performance score (ratings + completion rate)." },
    { q: "How do I improve my match score?", a: "Complete jobs on time, collect homeowner reviews, keep your license and insurance current, and respond to leads within 2 hours for the best score." },
  ],
  "Account Management": [
    { q: "How do I verify my license and insurance?", a: "Upload your license number and insurance certificate in onboarding. ProLnk verifies within 24 hours. You appear as Verified once approved." },
    { q: "What happens if I miss a lead?", a: "Missed leads are reassigned to the next matched pro. Three consecutive misses in 30 days may temporarily lower your priority in the algorithm." },
  ],
};

export default function ProLnkFAQPros() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔧</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#F5E642", marginBottom: 8 }}>Pro FAQ</h1>
          <p style={{ color: "#94A3B8", fontSize: 16 }}>Everything service professionals need to know about ProLnk</p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32, justifyContent: "center" }}>
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
                <span style={{ textAlign: "left" }}>❓ {item.q}</span>
                <span style={{ color: "#F5E642", fontSize: 20 }}>{openIndex === i ? "▲" : "▼"}</span>
              </button>
              {openIndex === i && (
                <div style={{ padding: "0 20px 18px", color: "#94A3B8", fontSize: 14, lineHeight: 1.7, borderTop: "1px solid #2D3F5A" }}>
                  ✅ {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48, background: "#1E2D45", borderRadius: 16, padding: 28, display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ fontSize: 40 }}>💰</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 700, color: "#F5E642", marginBottom: 4 }}>Charter Membership — $149/mo locked forever</p>
            <p style={{ color: "#94A3B8", fontSize: 13 }}>Join before waitlist closes at 500 Charter members</p>
          </div>
          <button style={{ background: "#F5E642", color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 700, cursor: "pointer" }}>
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
}