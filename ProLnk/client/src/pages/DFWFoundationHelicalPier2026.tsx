import { useState } from 'react';

const situations = [
  { label: "Deck or Porch Addition", pier: "Helical", reason: "Lightweight structure, limited excavation needed, installs in tight spaces." },
  { label: "Addition on Expansive Clay", pier: "Helical", reason: "Helical piers screw past clay layers without hydraulic pressure limitations." },
  { label: "Main Foundation Settling", pier: "Push Pier", reason: "Push piers reach load-bearing strata quickly and cost less per pier for heavy loads." },
  { label: "Limited Access (fence/AC units)", pier: "Helical", reason: "Helical pier equipment fits through a 36-inch gate — push pier rigs often cannot." },
  { label: "Large Slab Foundation", pier: "Push Pier", reason: "For heavy slab sections, push piers are faster to install and more cost-effective." },
];

export default function DFWFoundationHelicalPier2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ color: "#F5E642″, fontSize: 13, marginBottom: 8 }}>DFW FOUNDATION GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Helical Pier Foundation Guide</h1>
        <p style={{ color: "#94a3b8″, marginBottom: 28 }}>When helical piers are the right choice for DFW foundation repair — and when they are not.</p>

        <div style={{ background: "#F5E642″, color: "#0A1628", borderRadius: 10, padding: "16px 20px", marginBottom: 24, fontWeight: 700 }}>
          🌀 Helical piers screw into the ground like a giant bolt — no hydraulic pushing required.
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Helical vs Push Pier Comparison</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          <div style={{ background: "#1e293b", borderRadius: 8, padding: 16 }}>
            <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: 8 }}>🔩 Helical Piers</div>
            {["$600–$900 per pier", "Works in tight spaces", "Great for light loads", "Penetrates expansive clay", "No hydraulic pressure"].map(i => (
              <div key={i} style={{ color: "#94a3b8″, fontSize: 14, marginBottom: 4 }}>✓ {i}</div>
            ))}
          </div>
          <div style={{ background: "#1e293b", borderRadius: 8, padding: 16 }}>
            <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: 8 }}>⬇️ Push Piers</div>
            {["$400–$600 per pier", "Needs open access", "Great for heavy slabs", "Hydraulic pressure driven", "Faster for large jobs"].map(i => (
              <div key={i} style={{ color: "#94a3b8″, fontSize: 14, marginBottom: 4 }}>✓ {i}</div>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>DFW-Specific Factors</h2>
        <div style={{ display: "grid", gap: 10, marginBottom: 24 }}>
          {[
            { icon: "🧱", label: "Expansive Black Clay", val: "Shrinks and swells with moisture — helical piers screw through it without refusal" },
            { icon: "🏠", label: "Pier and Beam Homes", val: "Many pre-1970 DFW homes — helical piers add support under beam pockets" },
            { icon: "🌿", label: "Established Landscaping", val: "Helical installation disturbs only a 12-inch area vs. larger push pier excavation" },
          ].map((item) => (
            <div key={item.label} style={{ background: "#1e293b", borderRadius: 8, padding: "12px 16px", display: "flex", gap: 12 }}>
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 600 }}>{item.label}</div>
                <div style={{ color: "#94a3b8″, fontSize: 14 }}>{item.val}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🔍 What Is Your Situation?</h2>
        <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
          {situations.map((s, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{ background: selected === i ? "#F5E642″ : "#1e293b", color: selected === i ? "#0A1628" : "#fff", border: "none", borderRadius: 8, padding: "12px 16px", textAlign: "left", cursor: "pointer", fontWeight: 600, fontSize: 15 }}>
              {s.label}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: "#1e293b", borderRadius: 10, padding: 20, borderLeft: "4px solid #F5E642″, marginBottom: 24 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Recommendation: {situations[selected].pier} Piers</div>
            <div style={{ color: "#94a3b8″, fontSize: 14 }}>{situations[selected].reason}</div>
          </div>
        )}

        <div style={{ background: "#1e293b", borderRadius: 10, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>🏠 Get a Free DFW Foundation Inspection</div>
          <div style={{ color: "#94a3b8″, fontSize: 14, marginBottom: 12 }}>ProLnk matches you with licensed DFW foundation contractors who specify the right pier type for your situation.</div>
          <button style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>Get My Free Inspection →</button>
        </div>
      </div>
    </div>
  );
}
