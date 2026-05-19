import { useState } from 'react';

const systems = [
  { id: '14seer', label: '14 SEER (Standard)', efficiency: 'Standard', purchase: 5000, electric15: 38000, maintenance: 4200, repair: 3200, life: 14 },
  { id: '16seer', label: '16 SEER (Mid-Efficiency)', efficiency: 'Mid', purchase: 6200, electric15: 31000, maintenance: 4000, repair: 3000, life: 16 },
  { id: '18seer', label: '18 SEER (High-Efficiency)', efficiency: 'High', purchase: 7500, electric15: 25500, maintenance: 3500, repair: 2500, life: 18 },
  { id: '20seer', label: '20+ SEER (Premium)', efficiency: 'Premium', purchase: 9000, electric15: 21000, maintenance: 3200, repair: 2000, life: 20 },
];

function fmt(n: number) { return '$' + n.toLocaleString(); }

export default function DFWHVACLifetimeCost2026() {
  const [active, setActive] = useState(systems[0].id);
  const sys = systems.find(s => s.id === active)!;
  const total = sys.purchase + sys.electric15 + sys.maintenance + sys.repair;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 14px', borderRadius: 4, fontSize: 12, fontWeight: 700, marginBottom: 16, letterSpacing: 1 }}>DFW HOMEOWNER GUIDE · 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW HVAC Lifetime Cost Analysis 2026</h1>
        <p style={{ color: '#8FA3BF', marginBottom: 32, fontSize: 15 }}>Total cost of HVAC ownership in DFW over 15 years — because the purchase price is the smallest number on this page.</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
          {systems.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)} style={{ background: active === s.id ? '#F5E642′ : '#132238', color: active === s.id ? '#0A1628' : '#E8EDF5', border: ’none', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>
              {s.label}
            </button>
          ))}
        </div>
        <div style={{ background: '#132238', borderRadius: 12, padding: 28, marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20 }}>15-Year Cost Breakdown — {sys.label}</h2>
          {[
            { label: '🏷️ Equipment Purchase', val: sys.purchase, note: 'Installed, DFW average' },
            { label: '⚡ Electricity (15 yrs)', val: sys.electric15, note: 'Based on DFW avg $0.13/kWh, 2,800 cooling hours/yr' },
            { label: '🔧 Maintenance (15 yrs)', val: sys.maintenance, note: 'Annual tune-up + filter changes' },
            { label: '🛠️ Repairs (15 yrs)', val: sys.repair, note: 'Capacitors, contactors, refrigerant, misc' },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #1E3A5F' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{row.label}</div>
                <div style={{ color: '#8FA3BF', fontSize: 12 }}>{row.note}</div>
              </div>
              <div style={{ fontWeight: 800, fontSize: 18 }}>{fmt(row.val)}</div>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0 0′ }}>
            <div style={{ fontWeight: 800, fontSize: 17 }}>💰 Total 15-Year Cost</div>
            <div style={{ fontWeight: 900, fontSize: 26, color: '#F5E642′ }}>{fmt(total)}</div>
          </div>
        </div>
        <div style={{ background: '#132238', borderRadius: 10, padding: 20 }}>
          <div style={{ fontWeight: 800, marginBottom: 8 }}>📊 Key Insight</div>
          <p style={{ color: '#C2D3E8', fontSize: 14, lineHeight: 1.7, margin: 0 }}>In DFW's extreme climate, electricity is 60–70% of lifetime HVAC cost. A $4,000 premium for a 20 SEER system saves ~$17,000 in electricity over 15 years — a 4x return. Always calculate total cost of ownership, not just purchase price.</p>
        </div>
        <div style={{ marginTop: 20, background: '#132238', borderRadius: 10, padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 32 }}>🏠</div>
          <div>
            <div style={{ fontWeight: 800, marginBottom: 4 }}>Get Your DFW HVAC Quote via ProLnk</div>
            <div style={{ color: '#8FA3BF', fontSize: 14 }}>Charter Pros quote the right system size and efficiency for your home — not the highest-margin unit.</div>
          </div>
        </div>
      </div>
    </div>
  );
}