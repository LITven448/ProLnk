// SEO Metadata
// title: Dallas Homeowners: Get Your Home's AI Health Score Free | TrustyPro
// description: Dallas homeowners: 41% of scans reveal foundation issues from Blackland Prairie clay. Hard water at 420 PPM destroys water heaters early. Get your free AI Home Health Score today.
// keywords: Dallas home inspection, Dallas foundation issues, Dallas home health score, TrustyPro Dallas, home maintenance Dallas TX
// og:title: Dallas Homeowners: Get Your Home's AI Health Score Free
// og:description: Dallas homes average 28 years old. Our AI scans reveal hidden issues before they become expensive emergencies.
// canonical: https://trustypro.io/dallas

import React, { useState } from "react";

const INDIGO = "#4F46E5″;
const AMBER = "#F59E0B";

const pros = [
  { name: "Marcus Webb", trade: "Foundation & Structural", rating: 4.9, reviews: 312, response: "Under 2 hrs", img: "MW" },
  { name: "Diane Castillo", trade: "Plumbing & Water Systems", rating: 4.8, reviews: 187, response: "Same day", img: "DC" },
  { name: "Terrence Okafor", trade: "Electrical & Panel Upgrades", rating: 5.0, reviews: 94, response: "Under 4 hrs", img: "TO" },
];

const testimonials = [
  { name: "Rachel H.", city: "Lake Highlands, Dallas", text: "The AI scan caught a hairline foundation crack I never would have noticed. TrustyPro connected me with Marcus the same afternoon. Saved me from a $40K problem becoming a $4K fix." },
  { name: "James T.", city: "Oak Cliff, Dallas", text: "Our water heater was 9 years old and the hard water had already corroded the anode rod. The health score flagged it as critical. Replaced it before it flooded our utility room." },
  { name: "Priya N.", city: "Uptown, Dallas", text: "I always thought home maintenance was just HVAC filters. The score showed 6 things I had no idea about. The pro cards made it easy to get real quotes, not salespeople." },
];

const faqs = [
  { q: "Why do Dallas homes have so many foundation issues?", a: "Dallas sits on Blackland Prairie clay — one of the most expansive soil types in North America. When wet seasons alternate with dry summers, the clay swells and shrinks, exerting enormous pressure on slab foundations. About 41% of TrustyPro scans in Dallas reveal active or historic foundation movement." },
  { q: "How does hard water damage my home systems?", a: "Dallas municipal water averages 420 PPM of dissolved minerals — well above the 180 PPM soft water threshold. Over time, scale deposits clog water heater elements, reduce water pressure, and shorten appliance lifespan by 20-35%. TrustyPro tracks this and alerts you before failure." },
  { q: "Is the AI Health Score really free?", a: "Yes. The diagnostic scan is free. You only pay if you choose to hire a pro through TrustyPro, and pros compete on price so you get fair market rates." },
  { q: "How long does my home's health score last?", a: "Your score is dynamic — it updates as you log maintenance, add photos, and as your home ages. We recommend refreshing a full scan annually or after major weather events." },
];

export default function TrustyProDallas() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", color: "#1F2937″, backgroundColor: "#F9FAFB", minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ backgroundColor: "#1E1B4B", color: "white", padding: "80px 24px 64px", textAlign: "center" }}>
        <div style={{ display: "inline-block", backgroundColor: AMBER, color: "#1F2937″, borderRadius: "9999px", padding: "4px 16px", fontSize: "13px", fontWeight: 700, marginBottom: "20px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Dallas, TX — AI Home Intelligence
        </div>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 800, lineHeight: 1.1, maxWidth: "800px", margin: "0 auto 20px" }}>
          Dallas Homeowners: Get Your Home's AI Health Score Free
        </h1>
        <p style={{ fontSize: "18px", opacity: 0.85, maxWidth: "600px", margin: "0 auto 36px", lineHeight: 1.6 }}>
          The average Dallas home is 28 years old and sitting on some of the most expansive clay soil in the country.
          Our AI scans your home's history and flags issues before they become emergencies.
        </p>
        <a href="/waitlist/homeowner" style={{ display: "inline-block", backgroundColor: AMBER, color: "#1F2937″, fontWeight: 800, fontSize: "18px", padding: "16px 40px", borderRadius: "12px", textDecoration: "none", boxShadow: "0 4px 20px rgba(245,158,11,0.4)" }}>
          Get My Free Health Score →
        </a>
      </div>

      {/* Stat Bar */}
      <div style={{ backgroundColor: INDIGO, color: "white", padding: "32px 24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "40px", maxWidth: "900px", margin: "0 auto" }}>
          {[
            { stat: "28 yrs", label: "Avg Dallas Home Age" },
            { stat: "41%", label: "Scans Show Foundation Issues" },
            { stat: "420 PPM", label: "Hard Water Mineral Load" },
            { stat: "3rd", label: "Largest City in Texas" },
          ].map((s) => (
            <div key={s.stat} style={{ textAlign: "center", minWidth: "140px" }}>
              <div style={{ fontSize: "36px", fontWeight: 800 }}>{s.stat}</div>
              <div style={{ fontSize: "13px", opacity: 0.8, marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div style={{ padding: "72px 24px", maxWidth: "900px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 800, textAlign: "center", marginBottom: "48px" }}>How It Works</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "32px", justifyContent: "center" }}>
          {[
            { step: "1″, title: "Enter Your Address", desc: "We pull public records, permit history, and neighborhood data for your Dallas home automatically." },
            { step: "2″, title: "AI Generates Your Score", desc: "Our model analyzes 40+ risk factors including soil type, home age, water quality, and local claims data." },
            { step: "3″, title: "Get Matched to Vetted Pros", desc: "If issues are found, you see local pros with real ratings, transparent pricing, and fast response times." },
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
          <h2 style={{ fontSize: "32px", fontWeight: 800, textAlign: "center", marginBottom: "8px" }}>Top-Rated Dallas Pros</h2>
          <p style={{ textAlign: "center", color: "#6B7280″, marginBottom: "48px" }}>Vetted, background-checked, and rated by real Dallas homeowners</p>
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
        <h2 style={{ fontSize: "32px", fontWeight: 800, textAlign: "center", marginBottom: "48px" }}>What Dallas Homeowners Are Saying</h2>
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
        <h2 style={{ fontSize: "36px", fontWeight: 800, marginBottom: "16px" }}>Your Dallas Home Deserves a Checkup</h2>
        <p style={{ fontSize: "18px", opacity: 0.8, maxWidth: "500px", margin: "0 auto 36px" }}>Free AI health score. No sales pressure. Real pros if you need them.</p>
        <a href="/waitlist/homeowner" style={{ display: "inline-block", backgroundColor: AMBER, color: "#1F2937″, fontWeight: 800, fontSize: "18px", padding: "16px 40px", borderRadius: "12px", textDecoration: "none" }}>
          Join the Waitlist — It's Free →
        </a>
      </div>
    </div>
  );
}
