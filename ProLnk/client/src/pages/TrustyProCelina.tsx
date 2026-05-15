// SEO Metadata
// title: Celina TX: The Fastest Growing ZIP in America Needs Smarter Home Care | TrustyPro
// description: Celina TX grew 400% since 2018. New construction, expansive soil, and variable water quality create real risks. Free AI Home Health Score for Celina homeowners.
// keywords: Celina TX home inspection, Celina new construction issues, Celina home health score, TrustyPro Celina, well water Celina TX, Celina foundation risk
// og:title: Celina TX: The Fastest Growing ZIP in America Needs Smarter Home Care
// og:description: 400% population growth means brand-new homes on new infrastructure. Expansive soil, variable water quality, and new-development risks need smarter monitoring.
// canonical: https://trustypro.io/celina

import React, { useState } from "react";

const INDIGO = "#4F46E5";
const AMBER = "#F59E0B";

const pros = [
  { name: "Jason Whitfield", trade: "Foundation & Expansive Soil", rating: 4.9, reviews: 47, response: "Same day", img: "JW" },
  { name: "Rosa Gutierrez", trade: "Water Quality & Well Systems", rating: 4.8, reviews: 73, response: "Under 4 hrs", img: "RG" },
  { name: "Evan Brooks", trade: "New Construction Inspection", rating: 5.0, reviews: 38, response: "Under 24 hrs", img: "EB" },
];

const testimonials = [
  { name: "Samantha L.", city: "Celina, TX (Light Farms)", text: "We moved from Austin in 2021 and had no idea our subdivision uses a private water system with different mineral content than city water. Rosa tested our water and installed a whole-home filter. Night and day difference." },
  { name: "Greg O.", city: "Celina, TX (Wilson Creek)", text: "The soil here moves more than I expected for a new house. TrustyPro flagged settlement cracks forming near our garage — still under structural warranty. Jason documented everything for our builder claim." },
  { name: "Heather M.", city: "Celina, TX (Mustang Lakes)", text: "I thought maintenance was just lawn care. The AI score showed my tankless water heater needed a descaling flush after just 2 years because of the mineral content in our area. Simple fix, huge lifespan extension." },
];

const faqs = [
  { q: "Why does Celina have foundation risk if the homes are new?", a: "Celina's rapid expansion placed thousands of homes on land that was recently agricultural — with expansive clay and sandy loam soils that weren't compacted to residential standards in all areas. New slabs can show settlement movement within the first 2-5 years depending on the subdivision, lot position, and drainage design." },
  { q: "What's different about water quality in Celina?", a: "Unlike established DFW cities with stable municipal water infrastructure, Celina's subdivisions use a mix of city water, private MUD district water, and in some outer areas, well systems. Mineral content, hardness, and treatment levels vary significantly between communities — sometimes street by street. Your health score includes a water source lookup for your address." },
  { q: "What maintenance schedule should a new Celina home follow?", a: "Year 1: HVAC filter, water heater flush, irrigation check, foundation photo baseline. Year 2: Electrical connections check, roof nail pops, caulking inspection. Year 3: Water heater anode rod, exterior paint check, garage door hardware. TrustyPro tracks this for you and sends reminders based on your home's specific systems." },
  { q: "Is TrustyPro available in all Celina communities?", a: "Yes. We cover all Celina neighborhoods including Light Farms, Wilson Creek, Mustang Lakes, Cambridge Crossing, and the rural areas along Celina Rd and CR 88. Enter your address and we'll have your score ready in under 3 minutes." },
];

export default function TrustyProCelina() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", color: "#1F2937", backgroundColor: "#F9FAFB", minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ backgroundColor: "#1E1B4B", color: "white", padding: "80px 24px 64px", textAlign: "center" }}>
        <div style={{ display: "inline-block", backgroundColor: AMBER, color: "#1F2937", borderRadius: "9999px", padding: "4px 16px", fontSize: "13px", fontWeight: 700, marginBottom: "20px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Celina, TX — AI Home Intelligence
        </div>
        <h1 style={{ fontSize: "clamp(26px, 4.5vw, 48px)", fontWeight: 800, lineHeight: 1.1, maxWidth: "820px", margin: "0 auto 20px" }}>
          Celina TX: The Fastest Growing ZIP in America Needs Smarter Home Care
        </h1>
        <p style={{ fontSize: "18px", opacity: 0.85, maxWidth: "620px", margin: "0 auto 36px", lineHeight: 1.6 }}>
          Celina grew 400% since 2018. New homes on new infrastructure with expansive soil and
          variable water quality create risks that most residents don't see coming.
        </p>
        <a href="/waitlist/homeowner" style={{ display: "inline-block", backgroundColor: AMBER, color: "#1F2937", fontWeight: 800, fontSize: "18px", padding: "16px 40px", borderRadius: "12px", textDecoration: "none", boxShadow: "0 4px 20px rgba(245,158,11,0.4)" }}>
          Get My Free Health Score →
        </a>
      </div>

      {/* Stat Bar */}
      <div style={{ backgroundColor: INDIGO, color: "white", padding: "32px 24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "40px", maxWidth: "900px", margin: "0 auto" }}>
          {[
            { stat: "400%", label: "Population Growth Since 2018" },
            { stat: "~3 yrs", label: "Avg Home Age" },
            { stat: "Mixed", label: "Water Sources by Subdivision" },
            { stat: "High", label: "Expansive Soil Risk" },
          ].map((s) => (
            <div key={s.stat} style={{ textAlign: "center", minWidth: "140px" }}>
              <div style={{ fontSize: "36px", fontWeight: 800 }}>{s.stat}</div>
              <div style={{ fontSize: "13px", opacity: 0.8, marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Context Section */}
      <div style={{ padding: "72px 24px", maxWidth: "900px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 800, textAlign: "center", marginBottom: "12px" }}>What Makes Celina Homes Different</h2>
        <p style={{ textAlign: "center", color: "#6B7280", marginBottom: "48px" }}>Rapid growth brings real infrastructure challenges</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "center" }}>
          {[
            { icon: "🌱", title: "New Development Infrastructure", desc: "Roads, utilities, and drainage are still being installed city-wide. Some areas have water pressure variability, incomplete storm drainage, and grading issues that affect individual lots.", color: "#ECFDF5" },
            { icon: "💧", title: "Variable Water Quality", desc: "Celina uses a mix of municipal, MUD district, and private well water depending on your subdivision. Mineral content and hardness can vary 2-3x between nearby communities — directly impacting your appliances.", color: "#EEF2FF" },
            { icon: "🏗️", title: "Expansive Soil Movement", desc: "Former farmland clay soils move significantly in Celina's first wet/dry cycles. New slabs built quickly during the 2019-2023 boom may show early settlement that needs monitoring.", color: "#FEF3C7" },
          ].map((r) => (
            <div key={r.title} style={{ flex: "1 1 240px", maxWidth: "280px", backgroundColor: r.color, borderRadius: "16px", padding: "28px 24px" }}>
              <div style={{ fontSize: "36px", marginBottom: "12px" }}>{r.icon}</div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "10px" }}>{r.title}</h3>
              <p style={{ fontSize: "14px", color: "#374151", lineHeight: 1.6 }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div style={{ backgroundColor: "white", padding: "72px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 800, textAlign: "center", marginBottom: "48px" }}>How It Works</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "32px", justifyContent: "center" }}>
            {[
              { step: "1", title: "Enter Your Address", desc: "We identify your water source, soil type, builder, subdivision, and permit history — unique to your exact Celina address." },
              { step: "2", title: "AI Scores Your Home", desc: "We assess 40+ risk factors and build a maintenance schedule based on your home's specific age, systems, and local conditions." },
              { step: "3", title: "Get Matched to Local Pros", desc: "Vetted Celina-area pros who understand the specific communities, builders, and soil conditions in this market." },
            ].map((step) => (
              <div key={step.step} style={{ flex: "1 1 240px", maxWidth: "280px", textAlign: "center" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: INDIGO, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: 800, margin: "0 auto 16px" }}>{step.step}</div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>{step.title}</h3>
                <p style={{ fontSize: "15px", color: "#6B7280", lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Local Pros */}
      <div style={{ padding: "72px 24px", maxWidth: "900px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 800, textAlign: "center", marginBottom: "8px" }}>Top-Rated Celina Pros</h2>
        <p style={{ textAlign: "center", color: "#6B7280", marginBottom: "48px" }}>Specialists who know Celina's communities, soil, and water systems</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "center" }}>
          {pros.map((p) => (
            <div key={p.name} style={{ flex: "1 1 240px", maxWidth: "280px", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "28px 24px", backgroundColor: "white" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: INDIGO, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "18px", marginBottom: "16px" }}>{p.img}</div>
              <div style={{ fontWeight: 700, fontSize: "17px" }}>{p.name}</div>
              <div style={{ color: "#6B7280", fontSize: "14px", marginBottom: "12px" }}>{p.trade}</div>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <span style={{ backgroundColor: "#EEF2FF", color: INDIGO, borderRadius: "8px", padding: "4px 10px", fontSize: "13px", fontWeight: 600 }}>★ {p.rating} ({p.reviews})</span>
                <span style={{ backgroundColor: "#FEF3C7", color: "#92400E", borderRadius: "8px", padding: "4px 10px", fontSize: "13px", fontWeight: 600 }}>{p.response}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ backgroundColor: "white", padding: "72px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 800, textAlign: "center", marginBottom: "48px" }}>Celina Homeowners Share Their Experience</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "center" }}>
            {testimonials.map((t) => (
              <div key={t.name} style={{ flex: "1 1 260px", maxWidth: "290px", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "28px 24px" }}>
                <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#374151", marginBottom: "20px", fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ fontWeight: 700, fontSize: "14px" }}>{t.name}</div>
                <div style={{ color: "#6B7280", fontSize: "13px" }}>{t.city}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ padding: "72px 24px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 800, textAlign: "center", marginBottom: "48px" }}>Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: "1px solid #E5E7EB", paddingBottom: "20px", marginBottom: "20px" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", fontSize: "16px", fontWeight: 700, color: "#111827", padding: "4px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {faq.q}
                <span style={{ color: INDIGO, fontSize: "20px", marginLeft: "12px" }}>{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <p style={{ marginTop: "12px", fontSize: "15px", color: "#6B7280", lineHeight: 1.7 }}>{faq.a}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Footer */}
      <div style={{ backgroundColor: "#1E1B4B", color: "white", padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "36px", fontWeight: 800, marginBottom: "16px" }}>Celina Is Growing Fast. Your Home Maintenance Should Keep Up.</h2>
        <p style={{ fontSize: "18px", opacity: 0.8, maxWidth: "520px", margin: "0 auto 36px" }}>Free AI health score. Built for the specific risks of new Celina homes.</p>
        <a href="/waitlist/homeowner" style={{ display: "inline-block", backgroundColor: AMBER, color: "#1F2937", fontWeight: 800, fontSize: "18px", padding: "16px 40px", borderRadius: "12px", textDecoration: "none" }}>
          Join the Waitlist — It's Free →
        </a>
      </div>
    </div>
  );
}
