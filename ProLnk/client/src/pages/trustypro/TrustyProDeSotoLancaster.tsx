import { useState } from 'react';

interface Stat { label: string; value: string; note: string; }
interface Pro { name: string; trade: string; specialty: string; rating: string; }
interface Testimonial { quote: string; name: string; city: string; }
interface FAQ { q: string; a: string; }

const stats: Stat[] = [
  { label: "Avg Home Value", value: "$250K–$320K", note: "Strong value vs. north DFW equivalents" },
  { label: "Population Growth", value: "+18% (2015–24)", note: "Southwest Dallas growth corridor" },
  { label: "Clay Soil Prevalence", value: "High", note: "Expansive clay causes foundation movement" },
];

const pros: Pro[] = [
  { name: "DeShawn P.", trade: "Foundation & Drainage", specialty: "Clay soil pier repair, French drain installation", rating: "4.95" },
  { name: "Maria C.", trade: "HVAC & Weatherization", specialty: "High-efficiency system upgrades, attic air sealing", rating: "4.92" },
  { name: "Troy W.", trade: "Roofing & Gutters", specialty: "Deferred maintenance catch-up, storm damage assessment", rating: "4.89" },
];

const testimonials: Testimonial[] = [
  { quote: "I was quoted $22K for foundation work by one company. TrustyPro matched me with three vetted pros — the best quote was $11,400. Same repair, half the price.", name: "Keisha R.", city: "DeSoto" },
  { quote: "My Lancaster home had deferred HVAC work for years. The pro they matched me with prioritized what needed to happen now vs. what could wait. No upselling.", name: "Antonio M.", city: "Lancaster" },
  { quote: "Clay soil had cracked my driveway and affected drainage toward the house. Got a drainage specialist who knew exactly what the southwest DFW soil does.", name: "Brenda T.", city: "DeSoto" },
];

const faqs: FAQ[] = [
  { q: "Why is clay soil such a big deal in DeSoto and Lancaster?", a: "Expansive clay in the southwest DFW corridor swells when wet and shrinks when dry — sometimes moving several inches seasonally. This foundation movement cracks slabs, breaks plumbing, and damages driveways. Pros with local clay soil experience know the difference between normal seasonal movement and structural damage requiring repair." },
  { q: "Are there good value-focused pros who won't oversell?", a: "Yes. TrustyPro screens for pros who provide itemized quotes with clear explanation of priority vs. optional work. Value-focused homeowners in DeSoto and Lancaster consistently rate transparency as the top pro quality." },
  { q: "How does deferred maintenance affect quotes?", a: "Homes with deferred maintenance often receive inflated quotes because some pros pad estimates for uncertainty. TrustyPro pros provide scope-specific quotes — you only pay for what's documented." },
  { q: "Do you cover both DeSoto and Lancaster?", a: "Yes. Our southwest Dallas coverage includes DeSoto, Lancaster, Duncanville, Cedar Hill, and the surrounding Tarrant County border communities. One waitlist request covers the full corridor." },
];

export default function TrustyProDeSotoLancaster() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0A1628 0%, #1a2f1a 100%)", padding: "80px 24px 60px", textAlign: "center" }}>
        <div style={{ fontSize: "14px", color: "#34d399", fontWeight: 600, letterSpacing: "2px", marginBottom: "16px" }}>DESOTO & LANCASTER TX</div>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, margin: "0 0 20px", lineHeight: 1.15 }}>
          DeSoto & Lancaster TX: Southwest Dallas Growth Corridor
        </h1>
        <p style={{ fontSize: "18px", color: "#94a3b8", maxWidth: "640px", margin: "0 auto 40px" }}>
          Rapidly growing, value-focused communities with clay soil challenges and deferred maintenance that needs experienced local pros — not discount operators.
        </p>
        <a href="/waitlist/homeowner" style={{ background: "#34d399", color: "#0A1628", padding: "16px 36px", borderRadius: "8px", fontWeight: 700, fontSize: "16px", textDecoration: "none", display: "inline-block" }}>
          Get Matched with a Local Pro ↗
        </a>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "24px", padding: "48px 24px", maxWidth: "900px", margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
        {stats.map((s) => (
          <div key={s.label} style={{ background: "#111d35", borderRadius: "12px", padding: "28px 32px", flex: "1 1 240px", textAlign: "center", border: "1px solid #1a3a2a" }}>
            <div style={{ fontSize: "28px", fontWeight: 800, color: "#34d399" }}>{s.value}</div>
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
            { step: "1", icon: "🏡", title: "Share Your Situation", desc: "Tell us what's going on — foundation, HVAC, roof, drainage, or general maintenance." },
            { step: "2", icon: "📍", title: "Local Match", desc: "We find pros with documented DeSoto/Lancaster project history." },
            { step: "3", icon: "💰", title: "Fair Quotes", desc: "Itemized, transparent quotes from vetted, value-focused pros." },
          ].map((item) => (
            <div key={item.step} style={{ background: "#111d35", borderRadius: "12px", padding: "28px", flex: "1 1 200px", border: "1px solid #1a3a2a", textAlign: "center" }}>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>{item.icon}</div>
              <div style={{ fontSize: "12px", color: "#34d399", fontWeight: 700, marginBottom: "6px" }}>STEP {item.step}</div>
              <div style={{ fontWeight: 700, marginBottom: "8px" }}>{item.title}</div>
              <div style={{ fontSize: "14px", color: "#94a3b8" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Pros */}
      <div style={{ background: "#0d1f38", padding: "60px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 700, textAlign: "center", marginBottom: "40px" }}>Featured Southwest Dallas Pros</h2>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
            {pros.map((p) => (
              <div key={p.name} style={{ background: "#111d35", borderRadius: "12px", padding: "28px", flex: "1 1 240px", border: "1px solid #1a3a2a" }}>
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>⭐ {p.rating}</div>
                <div style={{ fontWeight: 700, fontSize: "18px" }}>{p.name}</div>
                <div style={{ color: "#34d399", fontSize: "13px", marginTop: "4px" }}>{p.trade}</div>
                <div style={{ color: "#94a3b8", fontSize: "13px", marginTop: "8px" }}>{p.specialty}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "60px 24px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: 700, textAlign: "center", marginBottom: "40px" }}>DeSoto & Lancaster Homeowner Stories</h2>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
          {testimonials.map((t) => (
            <div key={t.name} style={{ background: "#111d35", borderRadius: "12px", padding: "28px", flex: "1 1 240px", border: "1px solid #1a3a2a" }}>
              <div style={{ fontSize: "20px", marginBottom: "12px" }}>💬</div>
              <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: 1.6, marginBottom: "16px" }}>"{t.quote}"</p>
              <div style={{ fontWeight: 700, fontSize: "14px" }}>{t.name}</div>
              <div style={{ color: "#34d399", fontSize: "12px" }}>{t.city}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background: "#0d1f38", padding: "60px 24px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 700, textAlign: "center", marginBottom: "40px" }}>Frequently Asked Questions</h2>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderBottom: "1px solid #1a3a2a", padding: "20px 0" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ background: "none", border: "none", color: "#fff", fontSize: "16px", fontWeight: 600, cursor: "pointer", textAlign: "left", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {f.q} <span style={{ color: "#34d399" }}>{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.6, marginTop: "12px", marginBottom: 0 }}>{f.a}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "80px 24px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "16px" }}>Southwest Dallas Deserves Better Options</h2>
        <p style={{ color: "#94a3b8", fontSize: "16px", marginBottom: "32px" }}>Join DeSoto and Lancaster homeowners getting fair, transparent quotes from vetted local pros.</p>
        <a href="/waitlist/homeowner" style={{ background: "#34d399", color: "#0A1628", padding: "18px 48px", borderRadius: "8px", fontWeight: 700, fontSize: "18px", textDecoration: "none", display: "inline-block" }}>
          Join the Waitlist — It's Free
        </a>
      </div>
    </div>
  );
}
