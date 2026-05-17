import { useState } from 'react';

const scenarios = [
  { id: 'void', label: 'Void under settled slab section', method: 'Polyurethane Foam Injection', detail: 'Expanding polyurethane foam fills voids under sunken slabs within minutes. Used across DFW as a lightweight mudjacking alternative. Foam weighs ~2 lbs/ft³ vs mudjacking slurry at 100+ lbs/ft³ — less added load on already soft clay. Cost: $800–$3,000 depending on area.' },
  { id: 'soft', label: 'Soft soil or creek-adjacent lot', method: 'Compaction Grouting', detail: 'Compaction grouting displaces and densifies weak soils under a foundation. Common near DFW creek beds and flood plains where native soils are loose. Grout is pumped at high pressure to compact surrounding soil. Cost: $5,000–$20,000 depending on depth and volume.' },
  { id: 'mudjack', label: 'Comparing to mudjacking', method: 'Polyurethane vs Mudjacking Comparison', detail: 'Mudjacking uses heavy concrete slurry — adds weight on unstable DFW clay and can fail in 5–10 years. Polyurethane foam is lighter, cures faster (15 min vs 24 hrs), and lasts longer. For DFW clay soils with seasonal movement, polyurethane is generally preferred for long-term stability.' },
  { id: 'piers-vs', label: 'Grouting vs piers — which do I need?', method: 'Diagnosis Guidance', detail: 'Grouting fills voids and stabilizes loose soil but does NOT lift or re-level a settled foundation. If your foundation has dropped more than 1–2 inches, piers are needed first to lift and stabilize, then grouting fills remaining voids. Most DFW contractors use both in severe cases.' },
  { id: 'drainage', label: 'Drainage causing repeated voids', method: 'Address Root Cause First', detail: 'In DFW, foundation voids often re-form if drainage is not corrected. Clay soil erodes under slab when water runs toward the foundation. Any grouting job should be combined with drainage correction — French drains, regrading, or downspout extensions — or voids return in 3–7 years.' },
];

export default function DFWFoundationInjectionGrouting2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const match = scenarios.find(s => s.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK DFW · 2026 GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>Foundation Injection Grouting Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>DFW clay soils create foundation voids during drought cycles. Grouting fills those voids — but timing and method selection are critical.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
          {[
            { icon: '🫧', label: 'Foam Cure Time', value: '15 min' },
            { icon: '⚖️', label: 'Foam Weight', value: '2 lbs/ft³' },
            { icon: '💧', label: 'Root Cause', value: 'Drainage' },
          ].map(s => (
            <div key={s.label} style={{ backgroundColor: '#0F2040', borderRadius: 12, padding: '16px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 800 }}>{s.value}</div>
              <div style={{ color: '#94A3B8', fontSize: 12 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>🌍 DFW Clay and Void Formation</h2>
          <p style={{ color: '#94A3B8', lineHeight: 1.7 }}>When DFW experiences drought (which it does every 3–5 years), expansive clay soil shrinks dramatically. This shrinkage pulls away from the underside of slabs, creating voids. When rain returns, water can channel under the slab through these voids, washing out soil and growing the cavity. Without intervention, void growth leads to settlement and cracking.</p>
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Select Your Void Situation</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {scenarios.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)}
                style={{ background: selected === s.id ? '#F5E642' : '#1A2F50', color: selected === s.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: 14 }}>
                {s.label}
              </button>
            ))}
          </div>
          {match && (
            <div style={{ marginTop: 20, backgroundColor: '#162040', borderLeft: '4px solid #F5E642', padding: 16, borderRadius: 8 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>Recommended: {match.method}</div>
              <div style={{ color: '#CBD5E1', lineHeight: 1.7 }}>{match.detail}</div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16 }}>📍 Find a DFW Foundation Grouting Specialist</div>
          <div style={{ color: '#0A1628', fontSize: 14, marginTop: 4 }}>ProLnk connects DFW homeowners with vetted foundation pros who work with DFW clay soils daily.</div>
        </div>
      </div>
    </div>
  );
}
