import { useState } from 'react';

const locations = [
  { id: 'attic', label: '🏠 Attic', pros: ['Most common in DFW', 'Keeps unit out of living space', 'Easy roof access for exhaust'], cons: ['Extreme heat (140°F+ in summer)', 'Refrigerant lines need extra insulation', 'Harder to service', 'Condensate drain critical'], tip: 'Insulate all refrigerant lines with Armaflex or equivalent. Inspect annually before summer.' },
  { id: 'closet', label: '🚪 Interior Closet', pros: ['Accessible for service', 'Climate-controlled space', 'Consistent temps year-round'], cons: ['Takes up living space', 'Noise can be issue', 'Condensate pan required'], tip: 'Install a secondary drain pan with float switch. DFW humidity causes significant condensate.' },
  { id: 'garage', label: '🚗 Garage', pros: ['Out of living area', 'Accessible', 'Large space'], cons: ['IRC code: must be sealed from garage', 'CO/fumes contamination risk', 'Heat exposure in DFW summers', 'Requires sealed return air'], tip: 'DFW code requires sealed enclosure separating air handler from garage air. Carbon monoxide risk if not done correctly.' },
  { id: 'mechanical', label: '⚙️ Mechanical Room', pros: ['Best for service access', 'Protected environment', 'Proper clearances possible', 'Ideal for DFW climate'], cons: ['Requires dedicated space', 'Less common in DFW tract homes'], tip: 'Gold standard installation. If building new or remodeling, advocate for a mechanical room.' },
];

export default function DFWHVACAirHandlerLocation2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const loc = locations.find(l => l.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.6rem', margin: '0.5rem 0' }}>DFW Air Handler Location Guide 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Where your air handler lives determines maintenance, efficiency, and risk in DFW's climate</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {locations.map(l => (
            <button key={l.id} onClick={() => setSelected(l.id === selected ? null : l.id)}
              style={{ background: selected === l.id ? '#1e3a5f' : '#0f2233', border: `2px solid ${selected === l.id ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: '1rem', color: '#fff', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ fontSize: '1.4rem' }}>{l.label}</div>
            </button>
          ))}
        </div>

        {loc && (
          <div style={{ background: '#0f2233', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f' }}>
            <h2 style={{ color: '#F5E642', margin: '0 0 1rem' }}>{loc.label}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <div style={{ color: '#4ade80', fontWeight: 700, marginBottom: '0.5rem' }}>✅ Pros</div>
                {loc.pros.map((p, i) => <div key={i} style={{ color: '#94a3b8', marginBottom: '0.3rem', fontSize: '0.9rem' }}>• {p}</div>)}
              </div>
              <div>
                <div style={{ color: '#f87171', fontWeight: 700, marginBottom: '0.5rem' }}>⚠️ Cons</div>
                {loc.cons.map((c, i) => <div key={i} style={{ color: '#94a3b8', marginBottom: '0.3rem', fontSize: '0.9rem' }}>• {c}</div>)}
              </div>
            </div>
            <div style={{ background: '#1e3a5f', borderRadius: 8, padding: '1rem', borderLeft: '3px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.3rem' }}>🔧 DFW Pro Tip</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{loc.tip}</div>
            </div>
          </div>
        )}

        <div style={{ background: '#0f2233', borderRadius: 12, padding: '1.5rem', marginTop: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', margin: '0 0 1rem' }}>📋 Annual DFW Maintenance Checklist</h3>
          {['March: Change filter before cooling season starts', 'March: Inspect condensate drain line and pan', 'March: Check refrigerant line insulation (attic installs critical)', 'October: Change filter before heating season', 'October: Inspect blower wheel and motor', 'Any time: Check for unusual noises or vibration'].map((item, i) => (
            <div key={i} style={{ color: '#94a3b8', padding: '0.4rem 0', borderBottom: '1px solid #1e3a5f', fontSize: '0.9rem' }}>☐ {item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
