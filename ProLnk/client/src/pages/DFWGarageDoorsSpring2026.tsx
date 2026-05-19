import { useState } from 'react';

const ageGroups = [
  { id: 'new', label: '🆕 Under 5 Years', checks: ['Balance test: disconnect spring, lift manually — should stay at 3ft', 'Lubricate rollers and hinges with silicone spray', 'Test auto-reverse: place 2x4 in path, door must reverse', 'Check weather stripping seal at bottom and sides'] },
  { id: 'mid', label: '🔄 5–10 Years', checks: ['Inspect cables for fraying near drum and bottom bracket', 'Check spring tension — uneven lift means spring wear', 'Smart garage opener upgrade for EV charge scheduling', 'Hail damage assessment on door panels after each storm'] },
  { id: 'old', label: '⚠️ 10–20 Years', checks: ['Replace springs proactively — average life is 10,000 cycles', 'Inspect bottom seal — cracked rubber lets water and pests in', 'Evaluate Class 4 hail-rated door if panels are dented', 'Full safety sensor realignment and force adjustment'] },
  { id: 'replace', label: '🔴 20+ Years', checks: ['Class 4 hail-rated door replacement (DFW insurance discount)', 'Insulated steel door adds R-value to attached garage', 'Smart opener with battery backup for power outages', 'New weather stripping package on all sides and top'] },
];

export default function DFWGarageDoorsSpring2026() {
  const [selected, setSelected] = useState('new');
  const item = ageGroups.find(g => g.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME GUIDE — SPRING 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>Garage Door Spring Checklist</h1>
        <p style={{ color: '#94a3b8', marginBottom: 8 }}>Garage doors are DFW's most hail-vulnerable surface. Springs fail 2x more often in temperature-swing climates.</p>
        <div style={{ background: '#1a1a0a', border: '1px solid #F5E642', borderRadius: 10, padding: '0.75rem 1.2rem', marginBottom: 24, color: '#fef08a', fontSize: 14 }}>
          ⚡ Smart openers now integrate with EV chargers — schedule off-peak charging automatically when door closes.
        </div>

        <div style={{ marginBottom: 16, fontWeight: 700, color: '#94a3b8', fontSize: 14 }}>Select your door age:</div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
          {ageGroups.map(g => (
            <button key={g.id} onClick={() => setSelected(g.id)} style={{ background: selected === g.id ? '#F5E642' : '#0F2040', color: selected === g.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '0.6rem 1.2rem', cursor: 'pointer', fontWeight: 700, fontSize: 14, transition: 'all 0.2s' }}>
              {g.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 14, padding: '1.5rem', marginBottom: 20 }}>
          <h2 style={{ fontWeight: 800, marginBottom: 16, color: '#F5E642' }}>{item.label} — Spring Checklist</h2>
          {item.checks.map((c, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 26, height: 26, background: '#F5E642', color: '#0A1628', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
              <span style={{ fontSize: 15, paddingTop: 4 }}>{c}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1rem 1.5rem' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🏆 Hail Rating Guide</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>Class 4 (highest) doors withstand 2-inch hail at 88mph. DFW insurers offer 5–15% premium discounts for Class 4 roofing and doors.</div>
        </div>
      </div>
    </div>
  );
}