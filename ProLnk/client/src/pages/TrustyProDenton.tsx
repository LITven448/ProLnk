import { useState } from "react";

const pros = [
  { name: "Marcus T.", trade: "Foundation & Structural", rating: 4.9, jobs: 312, badge: "Historic Specialist" },
  { name: "Rosa L.", trade: "Plumbing & Water Treatment", rating: 4.8, jobs: 289, badge: "Hard Water Expert" },
  { name: "Derek W.", trade: "Electrical & HVAC", rating: 4.9, jobs: 441, badge: "Rental Property Pro" },
];

const testimonials = [
  { text: "My 1952 bungalow needed a pro who understood old-growth lumber and knob-and-tube wiring. TrustyPro matched me the same day.", author: "Patricia H., Old Town Denton" },
  { text: "Managing 6 UNT rental units is a full-time job. The AI inspection photos catch issues before tenants even notice.", author: "James K., Landlord, Denton TX" },
  { text: "Hard water had been destroying my appliances for years. The matched plumber installed a whole-house softener and saved my water heater.", author: "Sylvia M., North Denton" },
];

const faqs = [
  { q: "Why do historic Denton homes need specialized pros?", a: "Homes built before 1960 often have original cast-iron pipes, knob-and-tube electrical, and balloon-frame construction — all require trade professionals with specific knowledge of these systems." },
  { q: "How does hard water affect my home?", a: "Denton's Trinity aquifer water averages 340 PPM hardness, which corrodes fixtures, reduces water heater efficiency by up to 30%, and voids many appliance warranties within 5 years." },
  { q: "I rent out a house near UNT. Can TrustyPro help?", a: "Yes. We have a dedicated landlord dashboard for multi-property tracking, and our pros are experienced with rental-grade inspections and tenant-ready repairs." },
  { q: "How fast can I get a pro?", a: "Most Denton homeowners are matched within 4 hours. For urgent issues, our emergency dispatch connects you in under 60 minutes." },
];

export default function TrustyProDenton() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: "#fff", color: "#111″ }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg,#4F46E5 0%,#3730A3 100%)", color: "#fff", padding: "72px 24px 64px", textAlign: "center" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <span style={{ background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "4px 14px", fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>DENTON, TX</span>
          <h1 style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 800, margin: "20px 0 18px", lineHeight: 1.15 }}>
            Denton TX Homeowners: Your Historic Home Needs Modern Intelligence
          </h1>
          <p style={{ fontSize: 18, opacity: 0.88, maxWidth: 620, margin: "0 auto 32px" }}>
            From pre-1960 bungalows in Old Town to landlord portfolios near UNT and TWU — TrustyPro's AI matches you with pros who know Denton’s unique home health challenges.
          </p>
          <a href="/waitlist/homeowner" style={{ background: "#F59E0B", color: "#111″, fontWeight: 700, padding: "16px 36px", borderRadius: 8, textDecoration: "none", fontSize: 16, display: "inline-block" }}>
            Join Waitlist — Free
          </a>
        </div>
      </section>

      {/* Local Context Stats */}
      <section style={{ background: "#F5F3FF", padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 24, textAlign: "center" }}>
          {[
            { stat: "~40%", label: "Homes built before 1960″ },
            { stat: "340 PPM", label: "Trinity aquifer hardness" },
            { stat: "12,000+", label: "UNT/TWU rental units" },
            { stat: "4 hrs", label: "Avg match time" },
          ].map((item) => (
            <div key={item.stat} style={{ background: "#fff", borderRadius: 12, padding: "24px 16px", boxShadow: "0 1px 6px rgba(0,0,0,0.07)" }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#4F46E5″ }}>{item.stat}</div>
              <div style={{ fontSize: 13, color: "#6B7280″, marginTop: 6 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: "64px 24px", maxWidth: 860, margin: "0 auto" }}>
        <h2 style={{ fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 40 }}>How TrustyPro Works in Denton</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 28 }}>
          {[
            { step: "1″, title: "Describe Your Home", desc: "Tell us your home's age, trade needed, and any known issues — historic systems, hard water damage, rental condition." },
            { step: "2″, title: "AI Matches Your Pro", desc: "Our algorithm filters for pros with Denton-specific experience — historic restoration, water treatment, landlord work." },
            { step: "3″, title: "Photo Intelligence Included", desc: "Your pro submits a Home Health photo report after every visit, building your property's permanent health record." },
          ].map((s) => (
            <div key={s.step} style={{ background: "#F5F3FF", borderRadius: 14, padding: "28px 24px" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#4F46E5″, color: "#fff", fontWeight: 800, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>{s.step}</div>
              <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{s.title}</h3>
              <p style={{ color: "#4B5563″, fontSize: 14, lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pro Cards */}
      <section style={{ background: "#FAFAF9″, padding: "64px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 36 }}>Denton-Area TrustyPros</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24 }}>
            {pros.map((p) => (
              <div key={p.name} style={{ background: "#fff", borderRadius: 14, padding: "28px 24px", boxShadow: "0 2px 10px rgba(0,0,0,0.07)" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#4F46E5″, color: "#fff", fontWeight: 800, fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>{p.name[0]}</div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{p.name}</div>
                <div style={{ color: "#6B7280″, fontSize: 13, margin: "4px 0 10px" }}>{p.trade}</div>
                <span style={{ background: "#EEF2FF", color: "#4F46E5″, fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>{p.badge}</span>
                <div style={{ marginTop: 12, fontSize: 13, color: "#374151″ }}>⭐ {p.rating} · {p.jobs} jobs completed</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "64px 24px", maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 36 }}>Denton Homeowners Love TrustyPro</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24 }}>
          {testimonials.map((t) => (
            <div key={t.author} style={{ background: "#F5F3FF", borderRadius: 14, padding: "28px 24px" }}>
              <p style={{ fontStyle: "italic", color: "#374151″, lineHeight: 1.6, marginBottom: 16 }}>"{t.text}"</p>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#4F46E5″ }}>— {t.author}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#F5F3FF", padding: "64px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontSize: 30, fontWeight: 700, textAlign: "center", marginBottom: 36 }}>Denton Homeowner FAQ</h2>
          {faqs.map((f, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 12, marginBottom: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", textAlign: "left", padding: "18px 20px", background: "none", border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {f.q}<span style={{ color: "#4F46E5″ }}>{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <div style={{ padding: "0 20px 18px", color: "#4B5563″, fontSize: 14, lineHeight: 1.7 }}>{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#4F46E5″, color: "#fff", padding: "72px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16 }}>Protect Your Denton Home Today</h2>
        <p style={{ fontSize: 17, opacity: 0.88, marginBottom: 32, maxWidth: 520, margin: "0 auto 32px" }}>Join the waitlist now — free forever for early Denton homeowners.</p>
        <a href="/waitlist/homeowner" style={{ background: "#F59E0B", color: "#111″, fontWeight: 700, padding: "16px 40px", borderRadius: 8, textDecoration: "none", fontSize: 17, display: "inline-block" }}>
          Join the Waitlist
        </a>
      </section>
    </div>
  );
}
