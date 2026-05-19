import { useState } from 'react';

interface Stat { label: string; value: string; note: string; }
interface Pro { name: string; trade: string; specialty: string; rating: string; }
interface Testimonial { quote: string; name: string; neighborhood: string; }
interface FAQ { q: string; a: string; }

const stats: Stat[] = [
  { label: "Avg Home Value", value: "$550K–$1M", note: "M Streets craftsmen command premium" },
  { label: "Housing Age", value: "70–100 yrs", note: "Lakewood & Casa Linda vintage stock" },
  { label: "Flood Risk Zones", value: "White Rock Creek", note: "FEMA mapped flood plains apply" },
];

const pros: Pro[] = [
  { name: "Marcus T.", trade: "Foundation Specialist", specialty: "Pier & beam restoration, crawl space encapsulation", rating: "4.97" },
  { name: "Elena R.", trade: "Historic Window & Door", specialty: "1930s wood window restoration, weatherization", rating: "4.94" },
  { name: "James K.", trade: "Drainage & Waterproofing", specialty: "White Rock Creek area flood mitigation", rating: "4.91" },
];

const testimonials: Testimonial[] = [
  { quote: "Our M Streets craftsman had original plumbing from 1938. The pro TrustyPro matched us with knew exactly what to do — no guessing, no surprises.", name: "Sarah M.", neighborhood: "M Streets" },
  { quote: "After the spring flooding near White Rock Creek, we had foundation cracking. Got three quotes in 48 hours — all vetted, all familiar with the creek zone.", name: "David L.", neighborhood: "Lakewood" },
  { quote: "Casa Linda homes from the 50s have their quirks. TrustyPro matched us with someone who works exclusively in this corridor. Night and day difference.", name: "Priya S.", neighborhood: "Casa Linda" },
];

const faqs: FAQ[] = [
  { q: "Why do East Dallas homes need specialists?", a: "M Streets craftsmen (1920s–1950s), Lakewood Tudor-revival (1930s–1950s), and Casa Linda ranches (1950s–1960s) each have era-specific plumbing, electrical, and structural details. Generalists unfamiliar with knob-and-tube wiring or balloon framing can create expensive problems." },
  { q: "How does White Rock Creek affect my home?", a: "Properties within a half-mile of White Rock Lake and Creek sit in FEMA-mapped flood zones. Drainage, grading, and foundation work in these zones requires professionals with specific local experience and proper permitting knowledge." },
  { q: "Are TrustyPro pros familiar with Dallas historic districts?", a: "Yes. Many East Dallas neighborhoods have historic overlay districts with specific exterior modification rules. Our matched pros know which work requires Historic Preservation officer approval." },
  { q: "How fast can I get quotes?", a: "Most East Dallas homeowners receive 2–3 matched quotes within 24–48 hours. Emergency services for active leaks or storm damage are prioritized same-day." },
];

export default function TrustyProEastDallas() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0A1628 0%, #0f2a4a 100%)", padding: "80px 24px 60px", textAlign: "center" }}>
        <div style={{ fontSize: "14px", color: "#4ade80", fontWeight: 600, letterSpacing: "2px", marginBottom: "16px" }}>EAST DALLAS TX</div>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, margin: "0 0 20px", lineHeight: 1.15 }}>
          East Dallas TX: M Streets, Lakewood, Casa Linda — Real Character, Real Maintenance
        </h1>
        <p style={{ fontSize: "18px", color: "#94a3b8", maxWidth: "640px", margin: "0 auto 40px" }}>
          Historic neighborhoods with $550K–$1M homes deserve pros who know the difference between a 1938 clay pipe and a modern PVC — and why it matters.
        </p>
        <a href="/waitlist/homeowner" style={{ background: "#4ade80", color: "#0A1628", padding: "16px 36px", borderRadius: "8px", fontWeight: 700, fontSize: "16px", textDecoration: "none", display: "inline-block" }}>
          Get Matched with a Vetted Pro ↗
        </a>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "24px", padding: "48px 24px", maxWidth: "900px", margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
        {stats.map((s) => (
          <div key={s.label} style={{ background: "#111d35", borderRadius: "12px", padding: "28px 32px", flex: "1 1 240px", textAlign: "center", border: "1px solid #1e3a5f" }}>
            <div style={{ fontSize: "32px", fontWeight: 800, color: "#4ade80" }}>{s.value}</div>
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
            { step: "1", icon: "🏠", title: "Describe Your Home", desc: "Tell us your neighborhood, home era, and what needs attention." },
            { step: "2", icon: "🔍", title: "AI Matching", desc: "We surface pros with verified experience in East Dallas historic stock." },
            { step: "3", icon: "✅", title: "Vetted Quotes", desc: "Receive 2–3 quotes from background-checked, licensed specialists." },
          ].map((item) => (
            <div key={item.step} style={{ background: "#111d35", borderRadius: "12px", padding: "28px", flex: "1 1 200px", border: "1px solid #1e3a5f", textAlign: "center" }}>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>{item.icon}</div>
              <div style={{ fontSize: "12px", color: "#4ade80", fontWeight: 700, marginBottom: "6px" }}>STEP {item.step}</div>
              <div style={{ fontWeight: 700, marginBottom: "8px" }}>{item.title}</div>
              <div style={{ fontSize: "14px", color: "#94a3b8" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Pros */}
      <div style={{ background: "#0d1f38", padding: "60px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 700, textAlign: "center", marginBottom: "40px" }}>Featured East Dallas Pros</h2>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
            {pros.map((p) => (
              <div key={p.name} style={{ background: "#111d35", borderRadius: "12px", padding: "28px", flex: "1 1 240px", border: "1px solid #1e3a5f" }}>
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>⭐ {p.rating}</div>
                <div style={{ fontWeight: 700, fontSize: "18px" }}>{p.name}</div>
                <div style={{ color: "#4ade80", fontSize: "13px", marginTop: "4px" }}>{p.trade}</div>
                <div style={{ color: "#94a3b8", fontSize: "13px", marginTop: "8px" }}>{p.specialty}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "60px 24px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: 700, textAlign: "center", marginBottom: "40px" }}>East Dallas Homeowner Stories</h2>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
          {testimonials.map((t) => (
            <div key={t.name} style={{ background: "#111d35", borderRadius: "12px", padding: "28px", flex: "1 1 240px", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "20px", marginBottom: "12px" }}>💬</div>
              <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: 1.6, marginBottom: "16px" }}>"{t.quote}"</p>
              <div style={{ fontWeight: 700, fontSize: "14px" }}>{t.name}</div>
              <div style={{ color: "#4ade80", fontSize: "12px" }}>{t.neighborhood}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background: "#0d1f38", padding: "60px 24px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 700, textAlign: "center", marginBottom: "40px" }}>Frequently Asked Questions</h2>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderBottom: "1px solid #1e3a5f", padding: "20px 0" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ background: "none", border: "none", color: "#fff", fontSize: "16px", fontWeight: 600, cursor: "pointer", textAlign: "left", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {f.q} <span style={{ color: "#4ade80" }}>{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.6, marginTop: "12px", marginBottom: 0 }}>{f.a}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "80px 24px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "16px" }}>Your Historic Home Deserves a Historic Specialist</h2>
        <p style={{ color: "#94a3b8", fontSize: "16px", marginBottom: "32px" }}>Join the East Dallas homeowners getting matched with vetted local pros.</p>
        <a href="/waitlist/homeowner" style={{ background: "#4ade80", color: "#0A1628", padding: "18px 48px", borderRadius: "8px", fontWeight: 700, fontSize: "18px", textDecoration: "none", display: "inline-block" }}>
          Join the Waitlist — It's Free
        </a>
      </div>
    </div>
  );
}
