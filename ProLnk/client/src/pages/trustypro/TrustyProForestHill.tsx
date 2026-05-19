import { useState } from 'react';

interface Stat { label: string; value: string; note: string; }
interface Pro { name: string; trade: string; specialty: string; rating: string; }
interface Testimonial { quote: string; name: string; area: string; }
interface FAQ { q: string; a: string; }

const stats: Stat[] = [
  { label: "Avg Home Value", value: "$220K", note: "Affordable DFW entry point" },
  { label: "Housing Era", value: "1970s–1990s", note: "Mature stock with predictable maintenance needs" },
  { label: "Air Quality", value: "Monitor Advised", note: "Adjacent to Fort Worth industrial corridor" },
];

const pros: Pro[] = [
  { name: "Robert G.", trade: "Roofing & Insulation", specialty: "1970s–1990s roof replacement, attic air sealing, energy efficiency", rating: "4.94" },
  { name: "Sandra P.", trade: "Plumbing", specialty: "Galvanized pipe replacement, water heater upgrades, slab leaks", rating: "4.91" },
  { name: "Kevin A.", trade: "HVAC & Air Quality", specialty: "Air filtration upgrades, duct sealing, industrial proximity air quality", rating: "4.88" },
];

const testimonials: Testimonial[] = [
  { quote: "Our Forest Hill home still had galvanized pipes from 1978. TrustyPro matched us with a plumber who did a full re-pipe in three days. No mess, no surprises.", name: "Gloria W.", area: "Forest Hill" },
  { quote: "We live near the industrial section toward Kennedale. The HVAC pro they sent installed a whole-home air filtration system — first time we've had clean air readings indoors.", name: "Michael B.", area: "Forest Hill" },
  { quote: "Roof was 25 years old and failing. Got three quotes in 36 hours, all from Tarrant County licensed roofers. Chose the middle quote and had a new roof in four days.", name: "Cheryl D.", area: "Forest Hill" },
];

const faqs: FAQ[] = [
  { q: "What maintenance issues are most common in Forest Hill homes?", a: "Homes built between 1970 and 1990 typically face: aging galvanized plumbing (often 40–50 years old and corroding), original HVAC systems near or past end of life, 20–25 year roofs approaching replacement, and single-pane windows with poor energy performance. Prioritizing these by urgency avoids emergency repairs." },
  { q: "Does proximity to Fort Worth industrial areas affect my home?", a: "Yes. Homes in the Kennedale-adjacent eastern side of Forest Hill are nearest to light industrial and manufacturing operations. HVAC air filtration, annual duct cleaning, and monitoring particulate levels indoors is advisable. Our matched HVAC pros specialize in industrial-adjacent residential air quality." },
  { q: "Is Forest Hill served by Tarrant County licensed pros?", a: "Yes. Forest Hill is in Tarrant County. All TrustyPro pros serving Forest Hill hold valid Tarrant County and Texas state licenses where required by trade." },
  { q: "Are there affordable options or is this just for high-end homes?", a: "TrustyPro serves all price points. Forest Hill homeowners consistently get transparent, itemized quotes — and pros in this market understand that affordable doesn't mean cutting corners on safety or code compliance." },
];

export default function TrustyProForestHill() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0A1628 0%, #1f1a0a 100%)", padding: "80px 24px 60px", textAlign: "center" }}>
        <div style={{ fontSize: "14px", color: "#fbbf24", fontWeight: 600, letterSpacing: "2px", marginBottom: "16px" }}>FOREST HILL TX — TARRANT COUNTY</div>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, margin: "0 0 20px", lineHeight: 1.15 }}>
          Forest Hill TX: Fort Worth Adjacent Living
        </h1>
        <p style={{ fontSize: "18px", color: "#94a3b8", maxWidth: "640px", margin: "0 auto 40px" }}>
          1970s–1990s homes with predictable maintenance needs deserve honest, licensed Tarrant County pros — not franchise operators from 45 minutes away.
        </p>
        <a href="/waitlist/homeowner" style={{ background: "#fbbf24", color: "#0A1628", padding: "16px 36px", borderRadius: "8px", fontWeight: 700, fontSize: "16px", textDecoration: "none", display: "inline-block" }}>
          Get Matched with a Tarrant County Pro ↗
        </a>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "24px", padding: "48px 24px", maxWidth: "900px", margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
        {stats.map((s) => (
          <div key={s.label} style={{ background: "#111d35", borderRadius: "12px", padding: "28px 32px", flex: "1 1 240px", textAlign: "center", border: "1px solid #3a2e0a" }}>
            <div style={{ fontSize: "28px", fontWeight: 800, color: "#fbbf24" }}>{s.value}</div>
            <div style={{ fontSize: "13px", color: "#94a3b8", marginTop: "6px" }}>{s.label}</div>
            <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>{s.note}</div>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px 60px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: 700, textAlign: "center", marginBottom: "40px" }}>How It Works</h2>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { step: "1", icon: "📝", title: "Describe the Job", desc: "Plumbing, roof, HVAC, electrical — tell us what your home needs." },
            { step: "2", icon: "🔎", title: "Tarrant County Match", desc: "We find licensed pros based in or regularly serving Forest Hill." },
            { step: "3", icon: "🤝", title: "Transparent Quote", desc: "Itemized quote — no hidden fees, no bait-and-switch pricing." },
          ].map((item) => (
            <div key={item.step} style={{ background: "#111d35", borderRadius: "12px", padding: "28px", flex: "1 1 200px", border: "1px solid #3a2e0a", textAlign: "center" }}>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>{item.icon}</div>
              <div style={{ fontSize: "12px", color: "#fbbf24", fontWeight: 700, marginBottom: "6px" }}>STEP {item.step}</div>
              <div style={{ fontWeight: 700, marginBottom: "8px" }}>{item.title}</div>
              <div style={{ fontSize: "14px", color: "#94a3b8" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Pros */}
      <div style={{ background: "#0d1f38", padding: "60px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 700, textAlign: "center", marginBottom: "40px" }}>Featured Forest Hill Pros</h2>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
            {pros.map((p) => (
              <div key={p.name} style={{ background: "#111d35", borderRadius: "12px", padding: "28px", flex: "1 1 240px", border: "1px solid #3a2e0a" }}>
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>⭐ {p.rating}</div>
                <div style={{ fontWeight: 700, fontSize: "18px" }}>{p.name}</div>
                <div style={{ color: "#fbbf24", fontSize: "13px", marginTop: "4px" }}>{p.trade}</div>
                <div style={{ color: "#94a3b8", fontSize: "13px", marginTop: "8px" }}>{p.specialty}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "60px 24px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: 700, textAlign: "center", marginBottom: "40px" }}>Forest Hill Homeowner Stories</h2>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
          {testimonials.map((t) => (
            <div key={t.name} style={{ background: "#111d35", borderRadius: "12px", padding: "28px", flex: "1 1 240px", border: "1px solid #3a2e0a" }}>
              <div style={{ fontSize: "20px", marginBottom: "12px" }}>💬</div>
              <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: 1.6, marginBottom: "16px" }}>"{t.quote}"</p>
              <div style={{ fontWeight: 700, fontSize: "14px" }}>{t.name}</div>
              <div style={{ color: "#fbbf24", fontSize: "12px" }}>{t.area}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background: "#0d1f38", padding: "60px 24px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 700, textAlign: "center", marginBottom: "40px" }}>Frequently Asked Questions</h2>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderBottom: "1px solid #3a2e0a", padding: "20px 0" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ background: "none", border: "none", color: "#fff", fontSize: "16px", fontWeight: 600, cursor: "pointer", textAlign: "left", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {f.q} <span style={{ color: "#fbbf24" }}>{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.6, marginTop: "12px", marginBottom: 0 }}>{f.a}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "80px 24px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "16px" }}>Every Forest Hill Home Deserves a Pro Who Shows Up</h2>
        <p style={{ color: "#94a3b8", fontSize: "16px", marginBottom: "32px" }}>Join the waitlist — get matched with Tarrant County's most reliable licensed pros.</p>
        <a href="/waitlist/homeowner" style={{ background: "#fbbf24", color: "#0A1628", padding: "18px 48px", borderRadius: "8px", fontWeight: 700, fontSize: "18px", textDecoration: "none", display: "inline-block" }}>
          Join the Waitlist — It's Free
        </a>
      </div>
    </div>
  );
}
