import { useState } from 'react';

const ageMatrix = [
  {
    label: "1960s Home",
    priorities: [
      { item: "🚿 Replace original galvanized pipes — corroded internally", urgency: "🔴 Urgent" },
      { item: "⚡ Full panel replacement — original 100A fuse boxes", urgency: "🔴 Urgent" },
      { item: "🪟 Window re-sealing — airport noise + air infiltration", urgency: "🟠 High" },
    ],
  },
  {
    label: "1970s Home",
    priorities: [
      { item: "🚿 Camera sewer lines — cast iron drain collapse risk", urgency: "🔴 Urgent" },
      { item: "⚡ GFCI + AFCI breaker upgrades throughout", urgency: "🟠 High" },
      { item: "🌡️ HVAC full replacement — original ducting inefficient", urgency: "🟠 High" },
    ],
  },
  {
    label: "1980s Home",
    priorities: [
      { item: "🌡️ HVAC replacement — systems now 35–45 yrs old", urgency: "🔴 Urgent" },
      { item: "🏠 Roof inspection — T-lock shingles no longer manufactured", urgency: "🟠 High" },
      { item: "🪟 Window seal replacement — airport noise infiltration", urgency: "🟡 Medium" },
    ],
  },
  {
    label: "1990s+ Home",
    priorities: [
      { item: "🌡️ HVAC tune-up + filter upgrade", urgency: "🟡 Medium" },
      { item: "🏠 Roof mid-life inspection", urgency: "🟡 Medium" },
      { item: "🔍 Foundation crack survey — first 30 yrs critical", urgency: "🟡 Medium" },
    ],
  },
];

export default function HurstEulessBedfordHomeownerGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: "#F5E642″, letterSpacing: 2, textTransform: "uppercase" }}>
          ProLnk City Guide · HEB Area TX
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 8px" }}>
          ✈️ HEB Homeowner Guide 2026
        </h1>
        <p style={{ color: "#9BA8C0″, marginBottom: 32, lineHeight: 1.6 }}>
          Hurst, Euless, and Bedford sit in DFW Airport&apos;s shadow — mid-century homes with original plumbing, aging electrical, and flight-path noise issues that make window sealing a real maintenance priority. Know exactly where to invest by home age.
        </p>

        <div style={{ background: "#111E35″, borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: "#F5E642″ }}>⚠️ HEB-Specific Risks</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { icon: "✈️", label: "Airport Noise", desc: "Flight path means window sealing is a real ROI investment" },
              { icon: "🚿", label: "Original Plumbing", desc: "1960s–1980s homes often have original galvanized or cast iron" },
              { icon: "⚡", label: "Old Panels", desc: "Pre-1990 panels may be undersized or unsafe brand" },
              { icon: "🌡️", label: "HVAC Age", desc: "HEB homes skew older — many HVAC units past service life" },
            ].map((r) => (
              <div key={r.label} style={{ background: "#0A1628″, borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 22 }}>{r.icon}</div>
                <div style={{ fontWeight: 700, marginTop: 6 }}>{r.label}</div>
                <div style={{ fontSize: 13, color: "#9BA8C0″, marginTop: 4 }}>{r.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#111E35″, borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: "#F5E642″ }}>🏠 Select Home Age → HEB Maintenance Priority</h2>
          <p style={{ color: "#9BA8C0″, fontSize: 13, marginBottom: 16 }}>HEB homes vary widely by decade — find your critical priorities now.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
            {ageMatrix.map((a, i) => (
              <button key={a.label} onClick={() => setSelected(i)} style={{ background: selected === i ? "#F5E642″ : "#0A1628", color: selected === i ? "#0A1628" : "#fff", border: "1px solid #F5E642", borderRadius: 8, padding: "10px 18px", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
                {a.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ background: "#0A1628″, borderRadius: 10, padding: 20 }}>
              <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: 14 }}>{ageMatrix[selected].label} — Top Priorities</div>
              {ageMatrix[selected].priorities.map((p) => (
                <div key={p.item} style={{ background: "#111E35″, borderRadius: 8, padding: 12, marginBottom: 10 }}>
                  <div style={{ fontSize: 14, marginBottom: 4 }}>{p.item}</div>
                  <div style={{ fontSize: 12, color: "#9BA8C0″ }}>Urgency: {p.urgency}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: "#F5E642″, color: "#0A1628", borderRadius: 12, padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>HEB Homes Need HEB Experts</div>
          <div style={{ fontSize: 14, marginBottom: 16 }}>ProLnk matches you with contractors who specialize in mid-century DFW homes — fast, verified, and fair-priced.</div>
          <a href="/homeowner-signup" style={{ background: "#0A1628″, color: "#F5E642", padding: "12px 28px", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: 15 }}>
            Get Free Quotes →
          </a>
        </div>
      </div>
    </div>
  );
}