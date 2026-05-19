import { useState } from 'react';

interface Stat { label: string; value: string; note: string; }
interface Pro { name: string; trade: string; specialty: string; rating: string; }
interface Testimonial { quote: string; name: string; area: string; }
interface FAQ { q: string; a: string; }

const stats: Stat[] = [
  { label: "Unit Type", value: "70% Condo/TH", note: "High-rise, mid-rise, and townhome dominant" },
  { label: "Avg HOA Fee", value: "$400–$900/mo", note: "Midtown Uptown corridor average" },
  { label: "Construction Vibration", value: "Ongoing 2024–2027″, note: "Major DART & building projects active" },
];

const pros: Pro[] = [
  { name: "Carlos M.", trade: "Condo HVAC", specialty: "High-rise PTAC units, split systems, urban heat island cooling", rating: "4.96″ },
  { name: "Tanya B.", trade: "Interior Water Damage", specialty: "Condo-to-condo leak documentation, insurance coordination", rating: "4.93″ },
  { name: "Ryan L.", trade: "Electrical", specialty: "Old Knox-Henderson infrastructure, panel upgrades in vintage buildings", rating: "4.90″ },
];

const testimonials: Testimonial[] = [
  { quote: "Our Uptown condo had a leak from the unit above. TrustyPro matched us with someone who knew exactly how to document everything for the HOA dispute.", name: "Alexis K.", area: "Uptown" },
  { quote: "State-Thomas lofts are gorgeous but the HVAC systems are non-standard. The pro they sent had worked in five other units in our building.", name: "Marcus J.", area: "State-Thomas" },
  { quote: "Knox-Henderson townhomes have electrical panels that were grandfathered in. Found a licensed electrician same day who didn't try to oversell me.", name: "Natalie T.", area: "Knox-Henderson" },
];

const faqs: FAQ[] = [
  { q: "Do TrustyPro pros work in high-rise condos?", a: "Yes. Urban core pros are experienced with HOA coordination, building management approvals, freight elevator scheduling, and the unique mechanical systems found in mid-rise and high-rise buildings." },
  { q: "Who is responsible when a condo has water damage from another unit?", a: "Liability depends on HOA master policy vs. unit owner policy. TrustyPro pros can document the damage origin — critical for insurance claims and HOA dispute resolution." },
  { q: "Does construction vibration really cause structural issues?", a: "Active construction in the Midtown corridor (DART expansion, high-rise development) can cause micro-settling in older adjacent structures. Annual inspection of plaster, drywall, and tile grout is advisable." },
  { q: "Can I get pro quotes for work that needs HOA approval?", a: "Yes. Our pros can provide quotes and assist with HOA paperwork requirements before work begins, so you're not paying for work that later gets rejected." },
];

export default function TrustyProMidtown() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0A1628 0%, #1a1040 100%)", padding: "80px 24px 60px", textAlign: "center" }}>
        <div style={{ fontSize: "14px", color: "#a78bfa", fontWeight: 600, letterSpacing: "2px", marginBottom: "16px" }}>MIDTOWN DALLAS TX</div>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, margin: "0 0 20px", lineHeight: 1.15 }}>
          Midtown Dallas TX: Uptown to Knox-Henderson — Urban Living, Urban Challenges
        </h1>
        <p style={{ fontSize: "18px", color: "#94a3b8″, maxWidth: "640px", margin: "0 auto 40px" }}>
          High-density condos and townhomes have HOA rules, shared walls, and aging infrastructure that demand specialists — not handymen.
        </p>
        <a href="/waitlist/homeowner" style={{ background: "#a78bfa", color: "#0A1628″, padding: "16px 36px", borderRadius: "8px", fontWeight: 700, fontSize: "16px", textDecoration: "none", display: "inline-block" }}>
          Get Matched with an Urban Pro ↗
        </a>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "24px", padding: "48px 24px", maxWidth: "900px", margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
        {stats.map((s) => (
          <div key={s.label} style={{ background: "#111d35″, borderRadius: "12px", padding: "28px 32px", flex: "1 1 240px", textAlign: "center", border: "1px solid #2d1f5e" }}>
            <div style={{ fontSize: "28px", fontWeight: 800, color: "#a78bfa" }}>{s.value}</div>
            <div style={{ fontSize: "13px", color: "#94a3b8″, marginTop: "6px" }}>{s.label}</div>
            <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>{s.note}</div>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px 60px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: 700, textAlign: "center", marginBottom: "40px" }}>How It Works</h2>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { step: "1″, icon: "🏙️", title: "Describe Your Unit", desc: "Tell us your building type, floor, HOA requirements, and the issue." },
            { step: "2″, icon: "🤖", title: "Smart Matching", desc: "AI matches you with pros who have condo and urban building experience." },
            { step: "3″, icon: "📋", title: "HOA-Ready Quotes", desc: "Quotes formatted to satisfy HOA documentation requirements." },
          ].map((item) => (
            <div key={item.step} style={{ background: "#111d35″, borderRadius: "12px", padding: "28px", flex: "1 1 200px", border: "1px solid #2d1f5e", textAlign: "center" }}>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>{item.icon}</div>
              <div style={{ fontSize: "12px", color: "#a78bfa", fontWeight: 700, marginBottom: "6px" }}>STEP {item.step}</div>
              <div style={{ fontWeight: 700, marginBottom: "8px" }}>{item.title}</div>
              <div style={{ fontSize: "14px", color: "#94a3b8″ }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Pros */}
      <div style={{ background: "#0d1f38″, padding: "60px 24px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 700, textAlign: "center", marginBottom: "40px" }}>Featured Midtown Pros</h2>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
            {pros.map((p) => (
              <div key={p.name} style={{ background: "#111d35″, borderRadius: "12px", padding: "28px", flex: "1 1 240px", border: "1px solid #2d1f5e" }}>
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>⭐ {p.rating}</div>
                <div style={{ fontWeight: 700, fontSize: "18px" }}>{p.name}</div>
                <div style={{ color: "#a78bfa", fontSize: "13px", marginTop: "4px" }}>{p.trade}</div>
                <div style={{ color: "#94a3b8″, fontSize: "13px", marginTop: "8px" }}>{p.specialty}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "60px 24px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: 700, textAlign: "center", marginBottom: "40px" }}>Midtown Resident Stories</h2>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
          {testimonials.map((t) => (
            <div key={t.name} style={{ background: "#111d35″, borderRadius: "12px", padding: "28px", flex: "1 1 240px", border: "1px solid #2d1f5e" }}>
              <div style={{ fontSize: "20px", marginBottom: "12px" }}>💬</div>
              <p style={{ color: "#cbd5e1″, fontSize: "14px", lineHeight: 1.6, marginBottom: "16px" }}>"{t.quote}"</p>
              <div style={{ fontWeight: 700, fontSize: "14px" }}>{t.name}</div>
              <div style={{ color: "#a78bfa", fontSize: "12px" }}>{t.area}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background: "#0d1f38″, padding: "60px 24px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 700, textAlign: "center", marginBottom: "40px" }}>Frequently Asked Questions</h2>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderBottom: "1px solid #2d1f5e", padding: "20px 0″ }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ background: "none", border: "none", color: "#fff", fontSize: "16px", fontWeight: 600, cursor: "pointer", textAlign: "left", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {f.q} <span style={{ color: "#a78bfa" }}>{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <p style={{ color: "#94a3b8″, fontSize: "14px", lineHeight: 1.6, marginTop: "12px", marginBottom: 0 }}>{f.a}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", padding: "80px 24px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "16px" }}>Urban Living Needs Urban-Experienced Pros</h2>
        <p style={{ color: "#94a3b8″, fontSize: "16px", marginBottom: "32px" }}>Join the Midtown residents getting work done right — on schedule, HOA-approved.</p>
        <a href="/waitlist/homeowner" style={{ background: "#a78bfa", color: "#0A1628″, padding: "18px 48px", borderRadius: "8px", fontWeight: 700, fontSize: "18px", textDecoration: "none", display: "inline-block" }}>
          Join the Waitlist — It's Free
        </a>
      </div>
    </div>
  );
}
