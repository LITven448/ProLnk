import { useState } from 'react';

const homeAges = [
  { id: 'new', label: '🆕 Under 10 Years', priorities: ['Check weatherstripping seal on all exterior doors', 'Caulk around window frames and trim annually', 'Inspect low-E coating — chips reduce efficiency', 'Adjust door thresholds to eliminate daylight gaps'] },
  { id: 'mid', label: '🔄 10–25 Years', priorities: ['Weatherstripping replacement — most lasts 10–15 years', 'Window reglazing if seals are fogged or broken', 'Storm door addition for entry doors (adds R-value)', 'Caulk exterior window perimeter — check for gaps over 1/8 inch'] },
  { id: 'old', label: '⚠️ 25–40 Years', priorities: ['Low-E glass upgrade saves 15% cooling costs in DFW summer', 'Replace single-pane windows (common pre-2000) with double-pane', 'Door frame inspection for rot or warping', 'Full weatherstripping and threshold replacement package'] },
  { id: 'vintage', label: '🏚️ 40+ Years', priorities: ['Full window replacement priority — payback 7–10 years in DFW climate', 'Insulated steel or fiberglass entry doors (original wood swells/shrinks)', 'Interior storm window inserts (lower cost alternative to full replacement)', 'Air sealing audit — older homes lose 30%+ of AC through gaps'] },
];

export default function DFWWindowDoorsMay2026() {
  const [selected, setSelected] = useState('mid');
  const item = homeAges.find(h => h.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME GUIDE — MAY 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>Windows & Doors</h1>
        <p style={{ color: '#94a3b8', marginBottom: 8 }}>In DFW summers, poor window seals can add + per month to your cooling bill. Air sealing is the highest-ROI upgrade.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
          {[['15%', 'Cooling savings', 'Low-E glass upgrade'],['30%', 'Heat loss', 'Through window gaps in older homes'],['7–10yr', 'Payback period', 'Full window replacement in DFW']].map(([stat, label, sub]) => (
            <div key={label} style={{ background: '#0F2040', borderRadius: 10, padding: '0.9rem', textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642' }}>{stat}</div>
              <div style={{ fontSize: 12, fontWeight: 700, marginTop: 2 }}>{label}</div>
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{sub}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 16, fontWeight: 700, color: '#94a3b8', fontSize: 14 }}>Select your home age:</div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
          {homeAges.map(h => (
            <button key={h.id} onClick={() => setSelected(h.id)} style={{ background: selected === h.id ? '#F5E642' : '#0F2040', color: selected === h.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '0.6rem 1.2rem', cursor: 'pointer', fontWeight: 700, fontSize: 14, transition: 'all 0.2s' }}>
              {h.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 14, padding: '1.5rem' }}>
          <h2 style={{ fontWeight: 800, marginBottom: 16, color: '#F5E642' }}>{item.label} — Priorities</h2>
          {item.priorities.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 26, height: 26, background: '#F5E642', color: '#0A1628', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
              <span style={{ fontSize: 15, paddingTop: 4 }}>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}