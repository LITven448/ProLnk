import { useState } from 'react';

const categories = ["Costs & Pricing", "Matching Process", "Pro Verification", "Guarantees", "Account & Data"];

const faqs: Record<string, { q: string; a: string }[]> = {
  "Costs & Pricing": [
    { q: "Is ProLnk free for homeowners?", a: "Yes — 100% free. Homeowners never pay a fee to use ProLnk. Pros pay a subscription and per-match fee so you never see a bill." },
    { q: "Are there hidden fees or markups?", a: "No hidden fees. You receive transparent quotes directly from pros. ProLnk does not add any markup to the quotes you receive." },
    { q: "How does pricing work?", a: "Each matched pro sends you a detailed quote before any work begins. You compare, choose, and pay the pro directly. No surprises." },
  ],
  "Matching Process": [
    { q: "How long until I get matched?", a: "Most homeowners are matched the same day — often within hours of submitting a request. Urgent jobs can be matched in under 30 minutes." },
    { q: "How does ProLnk choose which pros to send me?", a: "Our algorithm matches on proximity, trade specialty, availability, and pro performance score. You get the top 3 fits for your job." },
    { q: "Can I request a specific pro?", a: "Yes. If you have worked with a pro before, you can request them directly through your homeowner dashboard." },
  ],
  "Pro Verification": [
    { q: "Are all pros licensed?", a: "Yes — every pro on ProLnk passes license verification, insurance confirmation, and background check before activation." },
    { q: "What happens if a pro's license lapses?", a: "Pros are monitored continuously. A lapsed license triggers an immediate account suspension until they provide updated credentials." },
  ],
  "Guarantees": [
    { q: "What if I'm unhappy with the work?", a: "ProLnk offers a satisfaction guarantee. If the work does not meet the agreed scope, we mediate and — if needed — rematch you at no extra charge." },
    { q: "What if a pro damages my property?", a: "All pros carry liability insurance. ProLnk will connect you with the pro's insurer and support the claim process." },
  ],
  "Account & Data": [
    { q: "Is my home data private?", a: "Absolutely. Your address and service history are only visible to pros you are actively matched with. We never sell your data." },
    { q: "Can I delete my account?", a: "Yes — request deletion any time from account settings. All personal data is removed within 30 days per CCPA requirements." },
  ],
};

export default function ProLnkFAQHomeowners() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#fff", fontFamily: "system-ui, sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏠</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#F5E642″, marginBottom: 8 }}>Homeowner FAQ</h1>
          <p style={{ color: "#94A3B8″, fontSize: 16 }}>Everything homeowners need to know about ProLnk</p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32, justifyContent: "center" }}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
              style={{ padding: "8px 18px", borderRadius: 20, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13,
                background: activeCategory === cat ? "#F5E642″ : "#1E2D45", color: activeCategory === cat ? "#0A1628" : "#94A3B8" }}>
              {cat}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {(faqs[activeCategory] || []).map((item, i) => (
            <div key={i} style={{ background: "#1E2D45″, borderRadius: 12, overflow: "hidden" }}>
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{ width: "100%", padding: "18px 20px", background: "none", border: "none", cursor: "pointer",
                  display: "flex", justifyContent: "space-between", alignItems: "center", color: "#fff", fontSize: 15, fontWeight: 600 }}>
                <span style={{ textAlign: "left" }}>❓ {item.q}</span>
                <span style={{ color: "#F5E642″, fontSize: 20 }}>{openIndex === i ? "▲" : "▼"}</span>
              </button>
              {openIndex === i && (
                <div style={{ padding: "0 20px 18px", color: "#94A3B8″, fontSize: 14, lineHeight: 1.7, borderTop: "1px solid #2D3F5A" }}>
                  ✅ {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48, textAlign: "center", background: "#1E2D45″, borderRadius: 16, padding: 28 }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>💬</div>
          <p style={{ color: "#94A3B8″, marginBottom: 16 }}>Still have questions?</p>
          <button style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}