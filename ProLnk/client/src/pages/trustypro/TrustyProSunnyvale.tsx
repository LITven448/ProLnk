import { useState } from 'react';

const stats = [
  { label: "Avg Home Value", value: "$580K", sub: "Luxury rural estate enclave" },
  { label: "Lot Sizes", value: "1+ Acre", sub: "Large lot irrigation common" },
  { label: "Septic Systems", value: "Widespread", sub: "Not on municipal sewer" },
];

const steps = [
  { n: "01", title: "Describe Your Issue", body: "Septic concern, well water quality, large lot irrigation, or estate home maintenance — specifics help us match you to the right specialist." },
  { n: "02", title: "Get Matched to Vetted Pros", body: "TrustyPro surfaces Sunnyvale-area pros experienced with rural infrastructure, septic systems, large lot irrigation, and luxury home maintenance." },
  { n: "03", title: "Work Gets Done Right", body: "Book, communicate, and track your job in one place. Leave a review when it's done." },
];

const pros = [
  { name: "Nathaniel Cruz", trade: "Septic & Drain Field Systems", yrs: 20, reviews: 134, tag: "Rural Infrastructure Expert" },
  { name: "Heather Simmons", trade: "Well Water & Water Quality", yrs: 14, reviews: 89, tag: "Sunnyvale Specialist" },
  { name: "Patrick Yuen", trade: "Large Lot Irrigation & Landscaping", yrs: 11, reviews: 72, tag: "Estate Property Pro" },
];

const testimonials = [
  { quote: "Our septic system was 12 years old and showing early drain field saturation. Nathaniel caught it before we had a sewage backup. His pump-and-inspect saved us a full replacement.", name: "Victoria L.", area: "Sunnyvale Estates" },
  { quote: "We had sulfur odor in our well water. Heather tested, identified iron bacteria, and installed a UV filtration system. We finally have clean water from every tap.", name: "David M.", area: "Heritage Ranch" },
  { quote: "Managing irrigation on two acres manually was costing us $400/month in overwatering. Patrick installed a smart zone system and we cut that to $140.", name: "Rachel B.", area: "Sunnyvale East" },
];

const faqs = [
  { q: "What do septic homeowners in Sunnyvale need to know?", a: "Most Sunnyvale properties are not connected to municipal sewer — they operate on septic systems. These require pumping every 3 to 5 years depending on household size, annual inspection of the drain field for saturation or root intrusion, and careful management of what goes into the system. A failing drain field is a $15,000 to $40,000 replacement; a regular pump-out is $400." },
  { q: "Is well water safe in Sunnyvale?", a: "It depends on the well and the year it was drilled. Older wells in East Dallas County can have elevated iron, manganese, or bacterial content. Annual testing is the standard practice. Common treatments include sediment filtration, iron filtration, and UV sterilization for bacteria. Whole-house filtration for a Sunnyvale well home is typically $2,000 to $6,000 installed." },
  { q: "What does large lot irrigation management look like for 1+ acre properties?", a: "Large lots in Sunnyvale typically require 8 to 16 irrigation zones, a backflow preventer, a smart controller with soil-moisture sensing, and seasonal winterization. Without a smart system, most homeowners dramatically overwater and underpay attention to zone failures. A well-designed smart irrigation system for a one-acre property typically pays back in 12 to 18 months through water savings." },
  { q: "My home was built between 2010 and 2024. Is maintenance already relevant?", a: "Yes. Even newer Sunnyvale homes have rural infrastructure that requires active management from day one. Septic systems need service from first occupation. Well water quality can change year to year. Irrigation systems installed by builders often have zone coverage gaps and outdated controllers. Starting a maintenance cadence early prevents compounding problems." },
];

export default function TrustyProSunnyvale() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#f9fafb", color: "#111827", minHeight: "100vh" }}>

      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "72px 24px 64px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#EEF2FF", color: "#4F46E5", fontSize: 13, fontWeight: 600, padding: "4px 14px", borderRadius: 99, marginBottom: 20 }}>Sunnyvale, TX</div>
        <h1 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, maxWidth: 780, margin: "0 auto 20px", lineHeight: 1.2 }}>
          Sunnyvale TX: Enclave of Privacy East of Dallas — Luxury Rural Living
        </h1>
        <p style={{ fontSize: 18, color: "#6b7280", maxWidth: 640, margin: "0 auto 36px", lineHeight: 1.6 }}>
          One-acre lots, septic systems, well water, horse properties, and 2010 to 2024 estate homes create a maintenance profile unlike any other Dallas suburb. Find pros who understand rural infrastructure.
        </p>
        <a href="/waitlist/homeowner" style={{ display: "inline-block", background: "#F59E0B", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 32px", borderRadius: 10, textDecoration: "none" }}>
          Get Matched to a Sunnyvale Pro
        </a>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "28px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#4F46E5" }}>{s.value}</div>
              <div style={{ fontWeight: 700, marginTop: 6, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "56px 24px 0" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>How TrustyPro Works</h2>
        <p style={{ color: "#6b7280", marginBottom: 36 }}>Three steps, zero hassle, one platform.</p>
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

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "56px 24px 0" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Featured Sunnyvale Pros</h2>
        <p style={{ color: "#6b7280", marginBottom: 36 }}>Vetted, licensed, and reviewed by local homeowners.</p>
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

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "56px 24px 0" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>What Sunnyvale Homeowners Say</h2>
        <p style={{ color: "#6b7280", marginBottom: 36 }}>Real results from real neighbors.</p>
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

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "56px 24px 0" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 36 }}>Sunnyvale Home FAQ</h2>
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

      <div style={{ background: "#4F46E5", marginTop: 72, padding: "64px 24px", textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Ready to Fix It Right?</h2>
        <p style={{ color: "#c7d2fe", fontSize: 16, marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
          Sunnyvale rural infrastructure needs a different kind of pro. Find someone who knows septic, well water, and estate-scale maintenance.
        </p>
        <a href="/waitlist/homeowner" style={{ display: "inline-block", background: "#F59E0B", color: "#fff", fontWeight: 700, fontSize: 16, padding: "14px 36px", borderRadius: 10, textDecoration: "none" }}>
          Connect With a Sunnyvale Pro
        </a>
      </div>

    </div>
  );
}
