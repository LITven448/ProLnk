import { useState } from 'react';

const methods = [
  { id: 'epoxy', label: 'Structural crack, no movement', method: 'Epoxy Injection', desc: 'Best for stable, structural cracks. Epoxy bonds stronger than concrete, fully fills the crack, and restores structural integrity. Typical DFW cost: $300–$800 per crack.' },
  { id: 'poly', label: 'Active crack with movement', method: 'Polyurethane Injection', desc: 'Flexible foam expands to fill moving cracks. Allows natural movement without re-cracking. Ideal for DFW clay soils that shift seasonally. Cost: $200–$600 per crack.' },
  { id: 'hydraulic', label: 'Water intrusion through crack', method: 'Hydraulic Cement (temporary)', desc: 'Fast-setting, expands to stop active water. Exterior application only for DFW drainage issues. Considered a temporary fix — address root drainage cause. Cost: $150–$400.' },
  { id: 'carbon', label: 'Bowing or leaning wall', method: 'Carbon Fiber Straps', desc: 'Stabilizes bowing foundation walls without excavation. DFW expansive clay can push walls inward after drought/rain cycles. Straps anchor wall to slab. Cost: $1,500–$3,000 per strap.' },
  { id: 'piers', label: 'Settlement / sinking foundation', method: 'Foundation Piers (push or helical)', desc: 'For DFW settlement caused by clay shrinkage. Push piers driven to bedrock support the foundation. Helical piers work in soft soils near creek beds. Cost: $1,200–$2,500 per pier.' },
];

export default function DFWFoundationCrackRepairMethods2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const match = methods.find(m => m.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK DFW · 2026 GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>Foundation Crack Repair Methods</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>DFW's expansive clay soil makes foundation cracking one of the most common homeowner issues in North Texas. Choosing the right method is critical.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
          {[
            { icon: '🏗️', label: 'Epoxy', value: 'Structural' },
            { icon: '🔵', label: 'Polyurethane', value: 'Flexible' },
            { icon: '🪝', label: 'Carbon Fiber', value: 'Bowing Walls' },
          ].map(s => (
            <div key={s.label} style={{ backgroundColor: '#0F2040', borderRadius: 12, padding: '16px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 16, fontWeight: 800 }}>{s.value}</div>
              <div style={{ color: '#94A3B8', fontSize: 12 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>🌍 Why DFW Cracks Are Different</h2>
          <p style={{ color: '#94A3B8', lineHeight: 1.7 }}>DFW sits on some of the most expansive clay soil in the US. Wet seasons cause soil to swell; droughts cause extreme shrinkage. This creates repeating foundation movement that most other markets never experience. Method selection must account for whether the crack is active or stable.</p>
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Select Your Crack Situation</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {methods.map(m => (
              <button key={m.id} onClick={() => setSelected(m.id)}
                style={{ background: selected === m.id ? '#F5E642' : '#1A2F50', color: selected === m.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: 14 }}>
                {m.label}
              </button>
            ))}
          </div>
          {match && (
            <div style={{ marginTop: 20, backgroundColor: '#162040', borderLeft: '4px solid #F5E642', padding: 16, borderRadius: 8 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>Recommended: {match.method}</div>
              <div style={{ color: '#CBD5E1', lineHeight: 1.7 }}>{match.desc}</div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16 }}>📍 Connect With a DFW Foundation Pro</div>
          <div style={{ color: '#0A1628', fontSize: 14, marginTop: 4 }}>ProLnk matches you with licensed foundation specialists who understand DFW clay soil behavior.</div>
        </div>
      </div>
    </div>
  );
}
