import { useState } from 'react';

type Investment = { id: string; label: string; cost: number; annualSaving: number; desc: string };

const INVESTMENTS: Investment[] = [
  { id: 'thermo', label: '📱 Smart Thermostat', cost: 250, annualSaving: 216, desc: 'Learns DFW schedules, remote control, utility rebates available' },
  { id: 'tune', label: '🔧 Annual Tune-Up', cost: 150, annualSaving: 180, desc: 'Keeps efficiency at peak — often required for warranty' },
  { id: 'duct', label: '🌬️ Duct Sealing & Insulation', cost: 1800, annualSaving: 520, desc: 'DFW homes avg 25% conditioned air lost in attic-routed ducts' },
  { id: 'filter', label: '🫧 MERV 13 Filter Upgrade', cost: 60, annualSaving: 96, desc: 'Better filtration reduces coil buildup and efficiency loss' },
  { id: 'dehumid', label: '💧 Whole-Home Dehumidifier', cost: 1900, annualSaving: 340, desc: 'DFW humidity makes 75° feel like 82° — huge comfort + savings' },
  { id: 'system', label: '🔄 New SEER 18+ System', cost: 9500, annualSaving: 1400, desc: 'Replace 10+ yr old system — biggest single ROI in DFW heat' },
  { id: 'attic', label: '🏠 Attic Insulation (R-38)', cost: 2400, annualSaving: 480, desc: 'DFW attics hit 150°F — proper insulation is critical' },
  { id: 'uv', label: '☀️ UV Air Purifier', cost: 600, annualSaving: 80, desc: 'Extends coil life, reduces mold in DFW humid conditions' },
];

export default function DFWHVACROIMatrix() {
  const [selected, setSelected] = useState<Set<string>>(new Set(['thermo', 'duct']));
  const [annualBill, setAnnualBill] = useState(3200);

  function toggle(id: string) {
    setSelected(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  }

  const chosen = INVESTMENTS.filter(i => selected.has(i.id));
  const totalCost = chosen.reduce((s, i) => s + i.cost, 0);
  const totalSaving = chosen.reduce((s, i) => s + i.annualSaving, 0);
  const payback = totalCost > 0 && totalSaving > 0 ? (totalCost / totalSaving).toFixed(1) : '—';
  const roi5yr = totalCost > 0 ? Math.round(((totalSaving * 5 - totalCost) / totalCost) * 100) : 0;

  const sorted = [...INVESTMENTS].sort((a, b) => (b.annualSaving / b.cost) - (a.annualSaving / a.cost));

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <h1 style={{ color: '#F5E642', fontSize: '1.6rem', marginBottom: '0.25rem' }}>📊 DFW HVAC Upgrade ROI Matrix</h1>
      <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>Compare ROI of DFW HVAC investments. Select upgrades to see combined payback and 5-year return.</p>
      <label style={{ color: '#F5E642′ }}>Your Annual HVAC Bill: ${annualBill.toLocaleString()}
        <input type="range" min={800} max={8000} step={100} value={annualBill} onChange={e => setAnnualBill(+e.target.value)}
          style={{ display: 'block', width: '100%', maxWidth: 560, marginTop: 4, accentColor: '#F5E642′ }} />
      </label>
      <div style={{ display: 'grid', gap: '0.6rem', maxWidth: 560, marginTop: '1rem' }}>
        {sorted.map(inv => {
          const roi = ((inv.annualSaving / inv.cost) * 100).toFixed(0);
          const pb = (inv.cost / inv.annualSaving).toFixed(1);
          const isOn = selected.has(inv.id);
          return (
            <div key={inv.id} onClick={() => toggle(inv.id)}
              style={{ background: isOn ? '#1e3a5f' : '#1e2d45', border: isOn ? '2px solid #F5E642′ : '2px solid #2d4a6e', borderRadius: 8, padding: '0.75rem 1rem', cursor: ’pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: isOn ? '#F5E642′ : '#e2e8f0' }}>{inv.label}</span>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.85rem' }}>{roi}% annual ROI</span>
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.25rem' }}>{inv.desc}</div>
              <div style={{ display: 'flex', gap: '1.2rem', marginTop: '0.4rem', fontSize: '0.8rem', color: '#64748b' }}>
                <span>Cost: ${inv.cost.toLocaleString()}</span>
                <span>Save: ${inv.annualSaving}/yr</span>
                <span>Payback: {pb} yrs</span>
              </div>
            </div>
          );
        })}
      </div>
      {chosen.length > 0 && (
        <div style={{ marginTop: '1.25rem', background: '#1e2d45', borderRadius: 10, padding: '1.25rem', maxWidth: 560 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>Combined Plan Summary ({chosen.length} upgrades)</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div style={{ background: '#0A1628', borderRadius: 6, padding: '0.75rem', textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Total Investment</div>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.4rem' }}>${totalCost.toLocaleString()}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 6, padding: '0.75rem', textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Annual Savings</div>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.4rem' }}>${totalSaving.toLocaleString()}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 6, padding: '0.75rem', textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Payback Period</div>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.4rem' }}>{payback} yrs</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 6, padding: '0.75rem', textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>5-Year Net ROI</div>
              <div style={{ color: roi5yr >= 0 ? '#4ade80′ : '#f87171', fontWeight: 800, fontSize: '1.4rem' }}>{roi5yr}%</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
