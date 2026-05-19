import { useState } from 'react';

const stats = [
  { label: "Avg Home Value", value: "$220K", sub: "DFW's most affordable" },
  { label: "Avg Home Age", value: "45+ yrs", sub: "1960s–1970s stock" },
  { label: "Deferred Maintenance", value: "High Rate", sub: "Systems near end of life" },
];

const steps = [
  { n: "01″, title: "Describe Your Issue", body: "Old wiring, aging HVAC, plumbing from the 1970s — give us the details so we match you to the right specialist." },
  { n: "02″, title: "Get Matched to Vetted Pros", body: "TrustyPro surfaces Balch Springs-area pros experienced with older home systems, deferred maintenance catch-up, and affordable market realities." },
  { n: "03″, title: "Work Gets Done Right", body: "Book, communicate, and track your job from one dashboard. Review when done." },
];

const pros = [
  { name: "Andre Baptiste", trade: "Electrical & Panel Upgrades", yrs: 22, reviews: 147, tag: "Older Home Specialist" },
  { name: "Rosa Gutierrez", trade: "Plumbing & Pipe Replacement", yrs: 15, reviews: 96, tag: "Balch Springs Veteran" },
  { name: "James Tran", trade: "HVAC & System Modernization", yrs: 18, reviews: 121, tag: "Deferred Maintenance Pro" },
];

const testimonials = [
  { quote: "Our 1968 home still had the original Federal Pacific panel. Andre replaced it and found aluminum wiring we didn't know about. That was a fire waiting to happen.", name: "Gloria M.", area: "Balch Springs Central" },
  { quote: "Rosa replaced galvanized pipes that had been corroding for decades. Water pressure went from a trickle to normal in one day. Should have done it years ago.", name: "Calvin R.", area: "Skyline Estates" },
  { quote: "Our HVAC was a 2003 unit still limping along. James got us a new system with financing that saved us $180/month on our electric bill.", name: "Darlene K.", area: "Southeast Dallas County" },
];

const faqs = [
  { q: "Why is deferred maintenance such a big issue in Balch Springs?", a: "Balch Springs has one of the most affordable housing markets in DFW, which attracts buyers on tight budgets — and means many homes change hands with deferred maintenance intact. Sellers often price below market to avoid repairs; buyers often stretch to purchase and have little left for immediate fixes. The result is an accumulation: aging panels, corroded pipes, failing HVAC units, and original roofing that far exceeds its design life." },
  { q: "What systems are most likely to fail in a 1960s–1970s Balch Springs home?", a: "In rough order of urgency: (1) Electrical panels — Federal Pacific and Zinsco panels from this era are known fire hazards. (2) Wiring — aluminum wiring was common in the late 1960s and is a code and insurance issue. (3) Galvanized plumbing — corrodes from inside out, reducing flow and contaminating water. (4) HVAC — original systems are 50+ years old; any unit over 15 years should be evaluated. (5) Roofing — original flat and low-slope roofs often have chronic leak histories." },
  { q: "Can I get home insurance with known deferred maintenance?", a: "Increasingly, no. Insurers are declining or non-renewing policies on homes with Federal Pacific panels, knob-and-tube or aluminum wiring, active roof leaks, or HVAC units older than 25 years. Getting ahead of these issues is not just about comfort — it's about maintaining insurability." },
  { q: "How does TrustyPro help Balch Springs homeowners specifically?", a: "We match you to pros who work in the affordable market without the premium pricing of luxury-suburb contractors. We verify licensing and insurance, and we prioritize pros with direct experience in older home systems — not just new construction." },
];

export default function TrustyProBalchSprings() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#f9fafb", color: "#111827″, minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "72px 24px 64px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#EEF2FF", color: "#4F46E5″, fontSize: 13, fontWeight: 600, padding: "4px 14px", borderRadius: 99, marginBottom: 20 }}>Balch Springs, TX</div>
        <h1 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, maxWidth: 780, margin: "0 auto 20px", lineHeight: 1.2 }}>
          Balch Springs TX: Southeast Dallas County — Older Homes, Real Needs
        </h1>
        <p style={{ fontSize: 18, color: "#6b7280″, maxWidth: 640, margin: "0 auto 36px", lineHeight: 1.6 }}>
          One of DFW's most affordable markets means 45-year-old housing stock with decades of deferred maintenance. Electrical panels, galvanized pipes, and aging HVAC don’t wait forever. Find a pro who specializes in older homes.
        </p>
        <a href="/waitlist/homeowner" style={{ display: "inline-block", background: "#F59E0B", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 32px", borderRadius: 10, textDecoration: "none" }}>
          Get Matched to a Balch Springs Pro →
        </a>
      </div>

      {/* Stats */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px 0″ }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "28px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#4F46E5″ }}>{s.value}</div>
              <div style={{ fontWeight: 700, marginTop: 6, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 13, color: "#6b7280″ }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "56px 24px 0″ }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>How TrustyPro Works</h2>
        <p style={{ color: "#6b7280″, marginBottom: 36 }}>Three steps, zero hassle, one platform.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {steps.map((s) => (
            <div key={s.n} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "28px 24px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#4F46E5″, marginBottom: 10 }}>Step {s.n}</div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{s.title}</div>
              <div style={{ color: "#6b7280″, fontSize: 14, lineHeight: 1.6 }}>{s.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pro Cards */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "56px 24px 0″ }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Featured Balch Springs Pros</h2>
        <p style={{ color: "#6b7280″, marginBottom: 36 }}>Vetted, licensed, and reviewed by local homeowners.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {pros.map((p) => (
            <div key={p.name} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "28px 24px" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "#4F46E5″, marginBottom: 16 }}>
                {p.name[0]}
              </div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{p.name}</div>
              <div style={{ color: "#6b7280″, fontSize: 13, marginBottom: 8 }}>{p.trade}</div>
              <div style={{ display: "inline-block", background: "#FEF3C7″, color: "#92400E", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 99, marginBottom: 12 }}>{p.tag}</div>
              <div style={{ fontSize: 13, color: "#6b7280″ }}>{p.yrs} yrs experience · {p.reviews} reviews</div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "56px 24px 0″ }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>What Balch Springs Homeowners Say</h2>
        <p style={{ color: "#6b7280″, marginBottom: 36 }}>Real results from real neighbors.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {testimonials.map((t) => (
            <div key={t.name} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "28px 24px" }}>
              <div style={{ fontSize: 28, color: "#4F46E5″, marginBottom: 12 }}>"</div>
              <p style={{ color: "#374151″, fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{t.quote}</p>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{t.name}</div>
              <div style={{ color: "#9ca3af", fontSize: 12 }}>{t.area}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "56px 24px 0″ }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 36 }}>Balch Springs Home FAQ</h2>
        {faqs.map((f, i) => (
          <div key={i} style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: 20, marginBottom: 20 }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}
            >
              <span style={{ fontWeight: 700, fontSize: 15, color: "#111827″ }}>{f.q}</span>
              <span style={{ color: "#4F46E5″, fontSize: 20, flexShrink: 0 }}>{open === i ? "−" : "+"}</span>
            </button>
            {open === i && <p style={{ marginTop: 12, color: "#6b7280″, fontSize: 14, lineHeight: 1.7 }}>{f.a}</p>}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ background: "#4F46E5″, marginTop: 72, padding: "64px 24px", textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Ready to Fix It Right?</h2>
        <p style={{ color: "#c7d2fe", fontSize: 16, marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
          Older homes need specialists, not generalists. Find a pro in Balch Springs who knows what 45-year-old systems look like — and how to bring them forward.
        </p>
        <a href="/waitlist/homeowner" style={{ display: "inline-block", background: "#F59E0B", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 36px", borderRadius: 10, textDecoration: "none" }}>
          Connect With a Balch Springs Pro →
        </a>
      </div>

    </div>
  );
}
