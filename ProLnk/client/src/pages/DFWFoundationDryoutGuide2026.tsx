import { useState } from 'react';

const severities = [
  { id: 'mild', label: 'Mild — small gap at door', guide: 'Start soaker hose 12–18 inches from foundation perimeter. Run 30 min/day for 2 weeks, then monitor. DFW clay needs slow rehydration — do not flood.' },
  { id: 'moderate', label: 'Moderate — cracks forming', guide: 'Run soaker hose 45 min/day. Inspect cracks weekly — mark with pencil to track movement. Expect 3–6 weeks to reach equilibrium. Call foundation pro if cracks exceed 1/4 inch.' },
  { id: 'severe', label: 'Severe — doors stuck/floors uneven', guide: 'Emergency protocol: soaker hose 60 min/day but never allow ponding. Call structural engineer immediately — active settlement may need piers. Document all cracks with photos and dates.' },
  { id: 'unsure', label: 'Not sure how bad', guide: 'Walk perimeter and check for soil gap between foundation and soil (should be zero). Check interior doors — sticking is early sign. Check slab-to-brick gap at exterior. Take photos and call ProLnk for a foundation pro assessment.' },
];

export default function DFWFoundationDryoutGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const match = severities.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 ProLnk DFW Foundation Series</div>
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>DFW Foundation Soil Dryout Emergency Guide 2026</h1>
        <p style={{ color: '#a0aec0', marginBottom: 24 }}>What to do when DFW clay soil dries out severely — immediate action steps to protect your slab foundation.</p>

        <div style={{ background: '#112240', borderRadius: 10, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⚠️ The DFW Clay Shrinkage Problem</h2>
          <p style={{ color: '#cbd5e0', lineHeight: 1.6, marginBottom: 10 }}>Dallas-Fort Worth sits on expansive Blackland Prairie clay. In drought, this clay shrinks dramatically — pulling away from foundations and allowing slabs to drop unevenly. Hot, dry summers make this a recurring emergency for DFW homeowners.</p>
          <ul style={{ color: '#cbd5e0', lineHeight: 1.8, paddingLeft: 20 }}>
            <li>⏰ Start watering the perimeter today — every week of delay = more movement</li>
            <li>💧 Soaker hose 12–18 inches from foundation edge — not right against it</li>
            <li>🚫 Never water so fast water ponds — slow rehydration only</li>
            <li>📅 Equilibrium takes weeks, not days — be consistent</li>
          </ul>
        </div>

        <div style={{ background: '#112240', borderRadius: 10, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📋 Daily Monitoring Protocol</h2>
          <p style={{ color: '#cbd5e0', lineHeight: 1.6 }}>Mark interior door tops with a pencil line. Check exterior cracks daily — use a quarter to measure width. If any crack exceeds 1/4 inch or doors become impossible to close, stop DIY watering and call a structural engineer. Slow, steady improvement is the goal.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 10, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔧 Interactive: Dryout Severity → Emergency Watering Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            {severities.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)}
                style={{ background: selected === s.id ? '#F5E642′ : '#1a3a5c', color: selected === s.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '12px 10px', cursor: 'pointer', fontWeight: 600, fontSize: 13, textAlign: 'left' }}>
                {s.label}
              </button>
            ))}
          </div>
          {match && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642′ }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Emergency Watering Guide:</p>
              <p style={{ color: '#cbd5e0', lineHeight: 1.7 }}>{match.guide}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Get a DFW Foundation Expert</p>
          <p style={{ color: '#0A1628', fontSize: 13 }}>ProLnk connects DFW homeowners with vetted foundation specialists. Free quotes, no pressure.</p>
          <button style={{ marginTop: 12, background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '10px 28px', fontWeight: 700, cursor: 'pointer' }}>Get Free Quotes</button>
        </div>
      </div>
    </div>
  );
}