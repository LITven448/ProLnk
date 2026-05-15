import { useState } from 'react';

const stats = [
  { label: "Avg Home Age", value: "40 yrs", sub: "1960s–1990s stock" },
  { label: "Galvanized Plumbing Rate", value: "High", sub: "Pre-2000 builds at risk" },
  { label: "Foundation Movement", value: "Common", sub: "Expansive clay activity" },
];

const steps = [
  { n: "01", title: "Tell Us What's Wrong", body: "Low water pressure, rust-colored water, sticking doors, uneven floors — Duncanville homes have predictable failure patterns. Describe yours." },
  { n: "02", title: "Match to an Experienced Pro", body: "TrustyPro surfaces Duncanville pros familiar with galvanized pipe systems, aging panels, and 40-year-old foundation behavior." },
  { n: "03", title: "Get It Fixed With Documentation", body: "Track every job, store photos and receipts, and build a home history record that adds resale value." },
];

const pros = [
  { name: "Anthony Ruiz", trade: "Plumbing & Repiping", yrs: 21, reviews: 138, tag: "Galvanized Specialist" },
  { name: "Brenda Okafor", trade: "Foundation & Structural", yrs: 13, reviews: 89, tag: "Duncanville Expert" },
  { name: "Dale Whitmore", trade: "Electrical Panels & Wiring", yrs: 17, reviews: 103, tag: "Old-Stock Electrician" },
];

const testimonials = [
  { quote: "Anthony replaced our entire galvanized system in four days. Water pressure went from a trickle to actual pressure. We had no idea how bad it had gotten.", name: "Patricia H.", area: "Meadowbrook" },
  { quote: "Brenda found movement on one corner of our foundation that was causing the upstairs bedroom door to stick. Fixed before it cracked the brick exterior.", name: "Kevin L.", area: "Westmoreland Hills" },
  { quote: "Dale replaced our old Federal Pacific panel — the one the home inspector flagged when we bought the house. Should have done it sooner. Now we're insurable.", name: "Yvonne T.", area: "Valley View" },
];

const faqs = [
  { q: "Why is galvanized plumbing such a big deal in Duncanville?", a: "Homes built before 1980 commonly used galvanized steel pipe. After 40+ years, the interior corrodes, reducing water pressure, releasing rust particles, and eventually failing entirely. Full repipes are the standard fix — partial replacements just shift the failure point. Duncanville has a high concentration of pre-1980 homes, making this one of the most common major repairs in the area." },
  { q: "What electrical panels are most dangerous in 1970s–1980s Duncanville homes?", a: "Federal Pacific Electric (Stab-Lok) and Zinsco panels were common in this era and are now known fire hazards. Breakers in both systems can fail to trip during overload conditions. Many insurance companies will not write or renew policies on homes with these panels. If you don't know what panel you have, find out." },
  { q: "Is foundation movement in Duncanville fixable?", a: "In most cases, yes. The standard fix for clay-soil foundation movement is pressed steel or concrete piers installed under the affected corners. This stabilizes the structure and prevents further settling. Early detection matters — cracks under 1/4 inch are typically cosmetic, but wider or diagonal cracks at window corners signal structural movement that needs professional evaluation." },
  { q: "My Duncanville home is 40+ years old. Where do I start?", a: "Plumbing, electrical, and foundation are the three high-priority systems in this housing stock. HVAC systems that original to a 1970s–1980s build should also be evaluated. TrustyPro can connect you with pros who assess in priority order — no one benefits from you fixing the bathroom tile while a galvanized pipe fails behind the wall." },
];

export default function TrustyProDuncanville() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#f9fafb", color: "#111827", minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "72px 24px 64px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#EEF2FF", color: "#4F46E5", fontSize: 13, fontWeight: 600, padding: "4px 14px", borderRadius: 99, marginBottom: 20 }}>Duncanville, TX</div>
        <h1 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, maxWidth: 780, margin: "0 auto 20px", lineHeight: 1.2 }}>
          Duncanville TX: Southwest Dallas County — Your Home Has History
        </h1>
        <p style={{ fontSize: 18, color: "#6b7280", maxWidth: 640, margin: "0 auto 36px", lineHeight: 1.6 }}>
          With an average home age of 40 years, Duncanville's 1960s–1990s housing stock carries predictable failure points — galvanized plumbing, aging electrical, and foundation movement from expansive clay. Know what you're dealing with.
        </p>
        <a href="/waitlist/homeowner" style={{ display: "inline-block", background: "#F59E0B", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 32px", borderRadius: 10, textDecoration: "none" }}>
          Get Matched to a Duncanville Pro →
        </a>
      </div>

      {/* City Stats */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "28px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#4F46E5" }}>{s.value}</div>
              <div style={{ fontWeight: 700, marginTop: 6, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "56px 24px 0" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>How TrustyPro Works</h2>
        <p style={{ color: "#6b7280", marginBottom: 36 }}>For homes with history, you need pros with experience.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {steps.map((s) => (
            <div key={s.n} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "28px 24px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#4F46E5", marginBottom: 10 }}>Step {s.n}</div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{s.title}</div>
              <div style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.6 }}>{s.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pro Cards */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "56px 24px 0" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Featured Duncanville Pros</h2>
        <p style={{ color: "#6b7280", marginBottom: 36 }}>Experienced with the systems in older Southwest Dallas County homes.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {pros.map((p) => (
            <div key={p.name} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "28px 24px" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "#4F46E5", marginBottom: 16 }}>
                {p.name[0]}
              </div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{p.name}</div>
              <div style={{ color: "#6b7280", fontSize: 13, marginBottom: 8 }}>{p.trade}</div>
              <div style={{ display: "inline-block", background: "#FEF3C7", color: "#92400E", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 99, marginBottom: 12 }}>{p.tag}</div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>{p.yrs} yrs experience · {p.reviews} reviews</div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "56px 24px 0" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>What Duncanville Homeowners Say</h2>
        <p style={{ color: "#6b7280", marginBottom: 36 }}>Results from neighbors who acted before it got worse.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {testimonials.map((t) => (
            <div key={t.name} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "28px 24px" }}>
              <div style={{ fontSize: 28, color: "#4F46E5", marginBottom: 12 }}>"</div>
              <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{t.quote}</p>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{t.name}</div>
              <div style={{ color: "#9ca3af", fontSize: 12 }}>{t.area}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "56px 24px 0" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 36 }}>Duncanville Home FAQ</h2>
        {faqs.map((f, i) => (
          <div key={i} style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: 20, marginBottom: 20 }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}
            >
              <span style={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>{f.q}</span>
              <span style={{ color: "#4F46E5", fontSize: 20, flexShrink: 0 }}>{open === i ? "−" : "+"}</span>
            </button>
            {open === i && <p style={{ marginTop: 12, color: "#6b7280", fontSize: 14, lineHeight: 1.7 }}>{f.a}</p>}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ background: "#4F46E5", marginTop: 72, padding: "64px 24px", textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Old Home, Real Risks — Fix Them Right</h2>
        <p style={{ color: "#c7d2fe", fontSize: 16, marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
          A 40-year-old Duncanville home has systems that were never meant to last this long. Find a pro who's seen it before — and fixed it.
        </p>
        <a href="/waitlist/homeowner" style={{ display: "inline-block", background: "#F59E0B", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 36px", borderRadius: 10, textDecoration: "none" }}>
          Connect With a Duncanville Pro →
        </a>
      </div>

    </div>
  );
}
