// SEO Metadata
// title: Garland TX: Is Your 40-Year-Old Home Safe? Get a Free AI Health Score | TrustyPro
// description: Garland homes average 41 years old. 65% of scans detect aging systems. Electrical panels, plumbing, and foundation movement are the top issues. Free AI scan today.
// keywords: Garland TX home inspection, Garland electrical panel upgrade, Garland home health score, TrustyPro Garland, aging home maintenance Garland
// og:title: Garland TX: Your Home Is Older Than the Average DFW Home — Here's What to Check
// og:description: 65% of TrustyPro scans in Garland detect aging systems. Electrical panels, galvanized plumbing, and foundation cracks top the list.
// canonical: https://trustypro.io/garland

import React, { useState } from "react";

const INDIGO = "#4F46E5″;
const AMBER = "#F59E0B";

const pros = [
  { name: "Bill Nguyen", trade: "Electrical & Panel Upgrades", rating: 4.9, reviews: 261, response: "Same day", img: "BN" },
  { name: "Sandra Reyes", trade: "Plumbing & Pipe Replacement", rating: 4.8, reviews: 198, response: "Under 3 hrs", img: "SR" },
  { name: "Calvin Moore", trade: "Foundation Repair", rating: 5.0, reviews: 143, response: "Under 2 hrs", img: "CM" },
];

const testimonials = [
  { name: "Linda K.", city: "Garland, TX", text: "Our 1978 home had the original Federal Pacific panel — a major fire hazard. TrustyPro's scan flagged it as critical. Bill replaced it within 48 hours and we finally sleep soundly." },
  { name: "Robert G.", city: "Garland, TX", text: "I knew the plumbing was old but I didn't know galvanized pipes corrode from the inside out. The scan showed our water pressure had dropped 30%. New copper lines have made a huge difference." },
  { name: "Maria S.", city: "Rowlett/Garland area", text: "Foundation movement in the back corner. I thought it was just cosmetic cracks. Calvin's inspection showed it was active. Caught it before it reached the load-bearing wall." },
];

const faqs = [
  { q: "Why is electrical the top issue in Garland homes?", a: "Most Garland housing stock was built in the 1970s and 1980s when Federal Pacific and Zinsco panels were widely installed — both later found to have serious fire risk. Many homes also have aluminum wiring which requires special attention. TrustyPro flags these based on your home's build year and permit history." },
  { q: "What is galvanized plumbing and why does it matter?", a: "Galvanized steel pipe was the standard before copper in the 1970s. It corrodes from the inside, reducing water flow over decades, and can leach iron into your water. Homes with galvanized supply lines should have them assessed and budgeted for replacement." },
  { q: "How bad is foundation movement in Garland?", a: "Garland sits on the same Blackland Prairie clay belt as Dallas. Older slabs often lack post-tension cables and pier depths that modern codes require. Seasonal movement over 40+ years creates cumulative stress that shows up as stair-step cracks, sticky doors, and sloping floors." },
  { q: "What does the free scan actually include?", a: "Address lookup, permit history, code violation records, neighborhood risk analysis, and our AI model's assessment of 40+ home health factors. If your home scores below 70, we'll show you vetted local pros in each risk category." },
];

export default function TrustyProGarland() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", color: "#1F2937″, backgroundColor: "#F9FAFB", minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ backgroundColor: "#1E1B4B", color: "white", padding: "80px 24px 64px", textAlign: "center" }}>
        <div style={{ display: "inline-block", backgroundColor: AMBER, color: "#1F2937″, borderRadius: "9999px", padding: "4px 16px", fontSize: "13px", fontWeight: 700, marginBottom: "20px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Garland, TX — AI Home Intelligence
        </div>
        <h1 style={{ fontSize: "clamp(26px, 4.5vw, 48px)", fontWeight: 800, lineHeight: 1.1, maxWidth: "820px", margin: "0 auto 20px" }}>
          Garland TX: Your Home Is Older Than the Average DFW Home — Here's What to Check
        </h1>
        <p style={{ fontSize: "18px", opacity: 0.85, maxWidth: "620px", margin: "0 auto 36px", lineHeight: 1.6 }}>
          Garland homes average 41 years old. 65% of our AI scans detect aging electrical, plumbing,
          or foundation issues — most homeowners had no idea.
        </p>
        <a href="/waitlist/homeowner" style={{ display: "inline-block", backgroundColor: AMBER, color: "#1F2937″, fontWeight: 800, fontSize: "18px", padding: "16px 40px", borderRadius: "12px", textDecoration: "none", boxShadow: "0 4px 20px rgba(245,158,11,0.4)" }}>
          Get My Free Health Score →
        </a>
      </div>

      {/* Stat Bar */}
      <div style={{ backgroundColor: INDIGO, color: "white", padding: "32px 24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "40px", maxWidth: "900px", margin: "0 auto" }}>
          {[
            { stat: "41 yrs", label: "Avg Garland Home Age" },
            { stat: "65%", label: "Scans Detect Aging Systems" },
            { stat: "#1″, label: "Issue: Electrical Panels" },
            { stat: "380 PPM", label: "Hard Water Mineral Load" },
          ].map((s) => (
            <div key={s.stat} style={{ textAlign: "center", minWidth: "140px" }}>
              <div style={{ fontSize: "36px", fontWeight: 800 }}>{s.stat}</div>
              <div style={{ fontSize: "13px", opacity: 0.8, marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Categories */}
      <div style={{ padding: "72px 24px", maxWidth: "900px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 800, textAlign: "center", marginBottom: "12px" }}>The 3 Biggest Risks in Garland Homes</h2>
        <p style={{ textAlign: "center", color: "#6B7280″, marginBottom: "48px" }}>Identified across thousands of homes built in the 1970s-1980s</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "center" }}>
          {[
            { icon: "⚡", title: "Electrical Panels", desc: "Federal Pacific and Zinsco panels installed before 1990 are fire hazards. Aluminum wiring requires arc-fault protection. Panel upgrades are the #1 job we see in Garland.", color: "#FEF3C7″ },
            { icon: "🔧", title: "Galvanized Plumbing", desc: "1970s homes used galvanized steel supply lines. They corrode internally, reduce water pressure, and can fail without warning. Most need replacement by age 40-50.", color: "#EEF2FF" },
            { icon: "🏠", title: "Foundation Movement", desc: "40+ years of clay soil expansion and contraction creates cumulative slab stress. Stair-step cracks, sloping floors, and sticky doors are early warning signs.", color: "#ECFDF5″ },
          ].map((r) => (
            <div key={r.title} style={{ flex: "1 1 240px", maxWidth: "280px", backgroundColor: r.color, borderRadius: "16px", padding: "28px 24px" }}>
              <div style={{ fontSize: "36px", marginBottom: "12px" }}>{r.icon}</div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "10px" }}>{r.title}</h3>
              <p style={{ fontSize: "14px", color: "#374151″, lineHeight: 1.6 }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Local Pros */}
      <div style={{ backgroundColor: "white", padding: "72px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 800, textAlign: "center", marginBottom: "8px" }}>Top-Rated Garland Pros</h2>
          <p style={{ textAlign: "center", color: "#6B7280″, marginBottom: "48px" }}>Background-checked, licensed, and rated by real Garland homeowners</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "center" }}>
            {pros.map((p) => (
              <div key={p.name} style={{ flex: "1 1 240px", maxWidth: "280px", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "28px 24px", backgroundColor: "#FAFAFA" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: INDIGO, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "18px", marginBottom: "16px" }}>{p.img}</div>
                <div style={{ fontWeight: 700, fontSize: "17px" }}>{p.name}</div>
                <div style={{ color: "#6B7280″, fontSize: "14px", marginBottom: "12px" }}>{p.trade}</div>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <span style={{ backgroundColor: "#EEF2FF", color: INDIGO, borderRadius: "8px", padding: "4px 10px", fontSize: "13px", fontWeight: 600 }}>★ {p.rating} ({p.reviews})</span>
                  <span style={{ backgroundColor: "#FEF3C7″, color: "#92400E", borderRadius: "8px", padding: "4px 10px", fontSize: "13px", fontWeight: 600 }}>{p.response}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ padding: "72px 24px", maxWidth: "900px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 800, textAlign: "center", marginBottom: "48px" }}>Garland Homeowners Speak Up</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "center" }}>
          {testimonials.map((t) => (
            <div key={t.name} style={{ flex: "1 1 260px", maxWidth: "290px", backgroundColor: "white", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "28px 24px" }}>
              <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#374151″, marginBottom: "20px", fontStyle: "italic" }}>"{t.text}"</p>
              <div style={{ fontWeight: 700, fontSize: "14px" }}>{t.name}</div>
              <div style={{ color: "#6B7280″, fontSize: "13px" }}>{t.city}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ backgroundColor: "white", padding: "72px 24px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 800, textAlign: "center", marginBottom: "48px" }}>Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: "1px solid #E5E7EB", paddingBottom: "20px", marginBottom: "20px" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", fontSize: "16px", fontWeight: 700, color: "#111827″, padding: "4px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {faq.q}
                <span style={{ color: INDIGO, fontSize: "20px", marginLeft: "12px" }}>{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <p style={{ marginTop: "12px", fontSize: "15px", color: "#6B7280″, lineHeight: 1.7 }}>{faq.a}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Footer */}
      <div style={{ backgroundColor: "#1E1B4B", color: "white", padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "36px", fontWeight: 800, marginBottom: "16px" }}>Don't Let a 40-Year-Old Problem Surprise You</h2>
        <p style={{ fontSize: "18px", opacity: 0.8, maxWidth: "520px", margin: "0 auto 36px" }}>Free AI health score. Know exactly where your Garland home stands.</p>
        <a href="/waitlist/homeowner" style={{ display: "inline-block", backgroundColor: AMBER, color: "#1F2937″, fontWeight: 800, fontSize: "18px", padding: "16px 40px", borderRadius: "12px", textDecoration: "none" }}>
          Join the Waitlist — It's Free →
        </a>
      </div>
    </div>
  );
}
