import { useState } from 'react';

export default function DFWMediaRoomGuide2026() {
  const [budget, setBudget] = useState(10000);
  const [roomSize, setRoomSize] = useState('medium');

  const getConfig = (b: number, size: string) => {
    const base = size === 'small' ? '12x12 room (144 sq ft)' : size === 'medium' ? '14x18 room (252 sq ft)' : '16x22+ room (350+ sq ft)';
    if (b < 8000) return {
      display: '65-75 inch 4K TV', sound: '2.1 soundbar ($400-$800)', seating: 'Sectional sofa',
      circuit: 'Dedicated 20-amp circuit for AV equipment', insulation: 'Basic door sweep + acoustic panels',
      lighting: 'Dimmer switch + blackout shades', note: `Entry-level theater feel in ${base}`
    };
    if (b < 18000) return {
      display: '85-100 inch 4K TV or entry projector', sound: '5.1 surround system ($1,200-$2,500)', seating: 'Power recliner seating (4-6 seats)',
      circuit: 'Dedicated 20-amp circuit + subwoofer outlet', insulation: 'Mass loaded vinyl + acoustic panels ($1,200)',
      lighting: 'Smart dimmer + LED bias lighting', note: `True theater experience in ${base}`
    };
    return {
      display: 'Laser projector + 120 inch screen', sound: '7.1 or Atmos system ($3,000-$8,000)', seating: 'Tiered platform + theater recliners (6-10 seats)',
      circuit: 'Dedicated sub-panel for AV room', insulation: 'Full room sound treatment ($2,000-$4,000)',
      lighting: 'Lutron smart lighting + aisle LEDs', note: `Cinema-grade room in ${base}`
    };
  };

  const cfg = getConfig(budget, roomSize);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600 }}>🏠 PROLNK DFW GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Media Room / Home Theater Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Build a home theater in DFW — from budget setups to cinema-grade rooms. Cost: $5,000-$25,000+</p>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📐 Room Size</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[{ id: 'small', label: '🔲 Small (under 150 sq ft)' }, { id: 'medium', label: '▪️ Medium (150-300 sq ft)' }, { id: 'large', label: '⬛ Large (300+ sq ft)' }].map((opt) => (
              <button key={opt.id} onClick={() => setRoomSize(opt.id)}
                style={{ padding: '8px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 12,
                  background: roomSize === opt.id ? '#F5E642′ : '#0f172a', color: roomSize === opt.id ? '#0A1628' : '#fff' }}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 4 }}>💰 Budget</h2>
          <input type="range" min={3000} max={30000} step={1000} value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            style={{ width: '100%', marginBottom: 8, accentColor: '#F5E642′ }} />
          <div style={{ textAlign: 'center', color: '#F5E642', fontWeight: 700, fontSize: 20, marginBottom: 16 }}>${budget.toLocaleString()}</div>
          <div style={{ background: '#0f172a', borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 12 }}>📝 {cfg.note}</div>
            {[
              { label: '📺 Display', val: cfg.display },
              { label: '🔊 Sound', val: cfg.sound },
              { label: '🪑 Seating', val: cfg.seating },
              { label: '⚡ Electrical', val: cfg.circuit },
              { label: '🔇 Insulation', val: cfg.insulation },
              { label: '💡 Lighting', val: cfg.lighting },
            ].map((row) => (
              <div key={row.label} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 13 }}>
                <span style={{ color: '#F5E642', fontWeight: 600, minWidth: 120 }}>{row.label}:</span>
                <span style={{ color: '#cbd5e1′ }}>{row.val}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⚡ DFW Electrical Requirements</h2>
          {[
            'Dedicated circuit required for AV equipment — shared circuits cause interference and tripped breakers.',
            'Large subwoofers benefit from their own outlet on a separate circuit.',
            'DFW electricians: $75-$125/hr. Dedicated circuit add: $300-$600.',
            'Permit required for new circuit runs in Dallas, Fort Worth, Plano, Frisco.',
            'HVAC check: media rooms generate heat from equipment — ensure adequate airflow.',
          ].map((tip) => (
            <div key={tip} style={{ fontSize: 13, color: '#cbd5e1', marginBottom: 8, paddingLeft: 12, borderLeft: '2px solid #F5E642′ }}>{tip}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
