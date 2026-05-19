import { useState } from 'react';

const stats = [
  { label: "Avg Home Value", value: "$390K", sub: "2005–2020 construction" },
  { label: "Lake Proximity", value: "High", sub: "Ray Hubbard humidity zone" },
  { label: "Tornado Risk", value: "Elevated", sub: "Eastern corridor approach" },
];

const steps = [
  { n: "01″, title: "Describe Your Issue", body: "Moisture intrusion, foundation shift, storm damage — be specific so we match you to the right trade." },
  { n: "02″, title: "Get Matched to Vetted Pros", body: "TrustyPro surfaces Sachse-area pros who understand clay soil from the lake basin, tornado corridor prep, and newer construction pitfalls." },
  { n: "03″, title: "Work Gets Done Right", body: "Book, message, and track your job in one place. Leave a review when it's done." },
];

const pros = [
  { name: "Derek Hamill", trade: "Foundation & Drainage", yrs: 11, reviews: 74, tag: "Lake Basin Clay Expert" },
  { name: "Priya Nair", trade: "Roofing & Storm Damage", yrs: 8, reviews: 58, tag: "Tornado Corridor Pro" },
  { name: "Glen Vasquez", trade: "HVAC & Humidity Control", yrs: 16, reviews: 103, tag: "Sachse Native" },
];

const testimonials = [
  { quote: "After last spring's storms, Derek found drainage issues behind our fence line that were pushing water toward our slab. Fixed in two days.", name: "Karla T.", area: "Woodbridge Estates" },
  { quote: "Priya re-inspected our roof after the April tornado warnings. She found three cracked ridge caps nobody else noticed. Great eye.", name: "Brent H.", area: "Sachse Meadows" },
  { quote: "Glen replaced our HVAC with a humidity-rated system designed for lake-adjacent homes. Our electric bill dropped 18% first month.", name: "Yolanda S.", area: "Harbor Point" },
];

const faqs = [
  { q: "Why does lake proximity matter for home maintenance in Sachse?", a: "Homes within two to three miles of Lake Ray Hubbard experience ambient humidity that is significantly higher than inland suburbs year-round. This accelerates wood rot, mold growth behind siding, and HVAC strain. Moisture-resistant materials and annual inspections are not optional — they're baseline." },
  { q: "How does clay soil from the lake basin affect foundations?", a: "Lake basin clay expands dramatically when wet and shrinks when dry. Sachse's proximity to the eastern shore means soil moisture swings with seasonal rainfall and lake levels. This causes foundation movement more pronounced than in sandy-soil suburbs farther west. Pier-and-beam and slab foundations both respond to it." },
  { q: "Is Sachse really in the tornado corridor?", a: "Yes. Eastern Collin County and western Rockwall County — which includes Sachse — sits on the eastern approach path for severe storm systems tracking northeast through DFW. The 2019 and 2022 tornado outbreaks both produced damage in this zone. Storm-proofing your roof, reinforcing garage doors, and maintaining a safe room are practical investments here." },
  { q: "My home was built in 2010–2020. Do I still need inspections?", a: "Yes. Homes from that era are now 5–15 years old — the range when first-generation HVAC units, water heaters, and roof underlayment start showing wear. Lake-adjacent humidity accelerates this timeline. A proactive inspection now costs a fraction of an emergency replacement." },
];

export default function TrustyProSachse() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#f9fafb", color: "#111827″, minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "72px 24px 64px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#EEF2FF", color: "#4F46E5″, fontSize: 13, fontWeight: 600, padding: "4px 14px", borderRadius: 99, marginBottom: 20 }}>Sachse, TX</div>
        <h1 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, maxWidth: 780, margin: "0 auto 20px", lineHeight: 1.2 }}>
          Sachse TX: Lake Ray Hubbard Eastern Shore — Hidden Home Challenges
        </h1>
        <p style={{ fontSize: 18, color: "#6b7280″, maxWidth: 640, margin: "0 auto 36px", lineHeight: 1.6 }}>
          East of Garland on Lake Ray Hubbard, Sachse's 2005–2020 housing stock faces lake-driven humidity, clay-basin soil movement, and tornado corridor risk most pros underestimate. Find one who doesn’t.
        </p>
        <a href="/waitlist/homeowner" style={{ display: "inline-block", background: "#F59E0B", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 32px", borderRadius: 10, textDecoration: "none" }}>
          Get Matched to a Sachse Pro →
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
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Featured Sachse Pros</h2>
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
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>What Sachse Homeowners Say</h2>
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
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 36 }}>Sachse Home FAQ</h2>
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
          Sachse homes have specific challenges. Find a pro who understands your lake soil, your storm risk, and your home.
        </p>
        <a href="/waitlist/homeowner" style={{ display: "inline-block", background: "#F59E0B", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 36px", borderRadius: 10, textDecoration: "none" }}>
          Connect With a Sachse Pro →
        </a>
      </div>

    </div>
  );
}
