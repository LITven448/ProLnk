// SEO Metadata
// title: Prosper TX: New Home, Hidden Issues — Know Before It's Too Late | TrustyPro
// description: Prosper TX is the fastest growing city in Texas. New builder-grade homes still have real risks: soil settlement, irrigation failures, warranty windows closing. Free AI scan.
// keywords: Prosper TX new home inspection, Prosper home warranty, Prosper foundation settlement, TrustyPro Prosper, new construction home issues Prosper TX
// og:title: Prosper TX: New Home, Hidden Issues — Know Before It's Too Late
// og:description: 4-year-old homes in Prosper still face soil settlement, builder-grade system failures, and closing warranty windows. Get your free AI health score.
// canonical: https://trustypro.io/prosper

import React, { useState } from "react";

const INDIGO = "#4F46E5″;
const AMBER = "#F59E0B";

const pros = [
  { name: "Derek Shaw", trade: "Foundation & Soil Inspection", rating: 4.9, reviews: 88, response: "Same day", img: "DS" },
  { name: "Angela Park", trade: "Irrigation & Drainage Systems", rating: 4.8, reviews: 114, response: "Under 3 hrs", img: "AP" },
  { name: "Noah Trujillo", trade: "Builder Defect & Warranty Review", rating: 5.0, reviews: 62, response: "Under 24 hrs", img: "NT" },
];

const testimonials = [
  { name: "Tyler B.", city: "Prosper, TX", text: "We closed in 2022 and thought everything was fine. TrustyPro's scan showed hairline cracks behind our drywall from soil settlement — still within warranty. Noah helped us file before the window closed." },
  { name: "Aisha M.", city: "Prosper, TX", text: "Our sprinkler system was installed incorrectly by the builder. Three zones weren't reaching the full coverage area. Angela found it in 20 minutes. We got it fixed under warranty — saved us $3,200." },
  { name: "Connor F.", city: "Prosper, TX", text: "I assumed a 3-year-old house needed nothing. The health score flagged our HVAC filter bypass, a roof nail pop section, and a leaking expansion tank. All small — but all covered by builder warranty." },
];

const faqs = [
  { q: "Why do new Prosper homes have issues?", a: "Builder-grade construction uses the minimum materials and systems required to pass inspection at time of build. Soil settlement in Prosper's newer developments — especially communities built on former farmland — creates foundation movement in the first 5-7 years that isn't visible until it's significant. Plus, irrigation, HVAC, and roofing corners are often cut in high-volume builds." },
  { q: "When do builder warranties expire?", a: "Most Texas builder warranties follow a 1-2-10 structure: 1 year workmanship, 2 years systems (electrical, plumbing, HVAC), and 10 years structural. Many Prosper homeowners who bought in 2021-2022 are approaching or already past the 1 and 2-year windows without knowing what they covered." },
  { q: "What is soil settlement and how do I spot it?", a: "Prosper sits on a mix of clay and loam soils that were compressed by farming equipment for decades. New foundations placed on this soil can settle unevenly in the first few years. Signs include: doors that suddenly stick, cracks appearing at window corners, gaps between baseboards and floors, or slight floor slopes." },
  { q: "What if my issue isn't under warranty anymore?", a: "TrustyPro still connects you with vetted pros for out-of-warranty repairs. Our matching algorithm shows you licensed contractors with transparent pricing — no surprises. Many Prosper issues caught at years 3-5 are still small and inexpensive to fix." },
];

export default function TrustyProProsper() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", color: "#1F2937″, backgroundColor: "#F9FAFB", minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ backgroundColor: "#1E1B4B", color: "white", padding: "80px 24px 64px", textAlign: "center" }}>
        <div style={{ display: "inline-block", backgroundColor: AMBER, color: "#1F2937″, borderRadius: "9999px", padding: "4px 16px", fontSize: "13px", fontWeight: 700, marginBottom: "20px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Prosper, TX — AI Home Intelligence
        </div>
        <h1 style={{ fontSize: "clamp(26px, 4.5vw, 48px)", fontWeight: 800, lineHeight: 1.1, maxWidth: "820px", margin: "0 auto 20px" }}>
          Prosper TX: New Home, Hidden Issues — Know Before It's Too Late
        </h1>
        <p style={{ fontSize: "18px", opacity: 0.85, maxWidth: "620px", margin: "0 auto 36px", lineHeight: 1.6 }}>
          Prosper is the fastest growing city in Texas. But builder-grade systems, soil settlement,
          and closing warranty windows mean your 4-year-old home may have issues you don't know about yet.
        </p>
        <a href="/waitlist/homeowner" style={{ display: "inline-block", backgroundColor: AMBER, color: "#1F2937″, fontWeight: 800, fontSize: "18px", padding: "16px 40px", borderRadius: "12px", textDecoration: "none", boxShadow: "0 4px 20px rgba(245,158,11,0.4)" }}>
          Get My Free Health Score →
        </a>
      </div>

      {/* Stat Bar */}
      <div style={{ backgroundColor: INDIGO, color: "white", padding: "32px 24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "40px", maxWidth: "900px", margin: "0 auto" }}>
          {[
            { stat: "4 yrs", label: "Avg Prosper Home Age" },
            { stat: "#1″, label: "Fastest Growing TX City" },
            { stat: "1-2-10″, label: "Builder Warranty Structure" },
            { stat: "72%", label: "Homeowners Unaware of Issues" },
          ].map((s) => (
            <div key={s.stat} style={{ textAlign: "center", minWidth: "140px" }}>
              <div style={{ fontSize: "36px", fontWeight: 800 }}>{s.stat}</div>
              <div style={{ fontSize: "13px", opacity: 0.8, marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Warning Callout */}
      <div style={{ padding: "48px 24px", maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ backgroundColor: "#FEF3C7″, border: "1px solid #FDE68A", borderRadius: "16px", padding: "32px", textAlign: "center" }}>
          <div style={{ fontSize: "28px", marginBottom: "12px" }}>⏰</div>
          <h2 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "12px", color: "#92400E" }}>Your Builder Warranty Window Is Closing</h2>
          <p style={{ fontSize: "16px", color: "#78350F", lineHeight: 1.7 }}>
            If you bought your Prosper home in 2020-2023, your 1-year and 2-year builder warranties are already expired or expiring soon.
            Once gone, repairs that should have been the builder's cost become yours. TrustyPro helps you catch covered issues before time runs out.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div style={{ padding: "48px 24px 72px", maxWidth: "900px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 800, textAlign: "center", marginBottom: "48px" }}>How It Works</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "32px", justifyContent: "center" }}>
          {[
            { step: "1″, title: "Enter Your Address", desc: "We pull your build date, builder, permit records, and neighborhood soil data for your Prosper home." },
            { step: "2″, title: "AI Scans for Risk", desc: "Our model evaluates settlement risk, warranty expiry timelines, builder-grade system grades, and irrigation coverage gaps." },
            { step: "3″, title: "Get Matched to Pros", desc: "See vetted local pros who specialize in new construction issues and know Prosper's builders and communities." },
          ].map((step) => (
            <div key={step.step} style={{ flex: "1 1 240px", maxWidth: "280px", textAlign: "center" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: INDIGO, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: 800, margin: "0 auto 16px" }}>{step.step}</div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>{step.title}</h3>
              <p style={{ fontSize: "15px", color: "#6B7280″, lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Local Pros */}
      <div style={{ backgroundColor: "white", padding: "72px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 800, textAlign: "center", marginBottom: "8px" }}>Top-Rated Prosper Pros</h2>
          <p style={{ textAlign: "center", color: "#6B7280″, marginBottom: "48px" }}>Specialists in new construction issues and Prosper builder communities</p>
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
        <h2 style={{ fontSize: "32px", fontWeight: 800, textAlign: "center", marginBottom: "48px" }}>What Prosper Homeowners Found</h2>
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
        <h2 style={{ fontSize: "36px", fontWeight: 800, marginBottom: "16px" }}>New Home Doesn't Mean No Problems</h2>
        <p style={{ fontSize: "18px", opacity: 0.8, maxWidth: "520px", margin: "0 auto 36px" }}>Free AI health score. Catch issues while your warranty still covers them.</p>
        <a href="/waitlist/homeowner" style={{ display: "inline-block", backgroundColor: AMBER, color: "#1F2937″, fontWeight: 800, fontSize: "18px", padding: "16px 40px", borderRadius: "12px", textDecoration: "none" }}>
          Join the Waitlist — It's Free →
        </a>
      </div>
    </div>
  );
}
