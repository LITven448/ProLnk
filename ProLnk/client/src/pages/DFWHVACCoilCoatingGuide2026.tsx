import { useState } from 'react';

export default function DFWHVACCoilCoatingGuide2026() {
  const [age, setAge] = useState('');
  const [condition, setCondition] = useState('');
  const [result, setResult] = useState('');

  const coatings = [
    { name: 'BlueFin Anti-Corrosion Coating', icon: '🔵', cost: '$300–$600', life: '5–8 years', best: 'DFW humidity + pollution environments, residential coils' },
    { name: 'Phenolic Epoxy Coating', icon: '🟤', cost: '$500–$900', life: '8–12 years', best: 'Commercial-grade coils, heavy industrial air quality areas' },
    { name: 'E-Coat (Electrodeposition)', icon: '⚡', cost: '$400–$750', life: '6–10 years', best: 'Uniform coverage on complex fin geometry' },
  ];

  const assess = () => {
    const a = parseInt(age);
    if (!a || !condition) { setResult('Please enter coil age and condition.'); return; }
    if (a >= 15 || condition === 'severe') {
      setResult('🔴 REPLACE COIL — At this age/condition, replacement costs less long-term than coating. Budget $800–$2,000 for new coil. Request a ProLnk HVAC quote.');
    } else if (a >= 8 || condition === 'moderate') {
      setResult('🟡 COAT NOW — Phenolic epoxy or BlueFin recommended before corrosion worsens. Coating now extends coil life 8–10 years. Act before next DFW summer.');
    } else {
      setResult('🟢 PREVENTIVE COAT — Coil is young. BlueFin coating now prevents future corrosion from DFW humidity. Best ROI window. Cost: $300–$600.');
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '8px 16px', display: 'inline-block', fontWeight: 700, fontSize: 13, marginBottom: 16 }}>
          DFW HVAC GUIDE 2026
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🔵 HVAC Coil Coating Guide — DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          DFW humidity, industrial air pollution, and temperature swings accelerate coil corrosion. Anti-corrosion coatings extend coil life by 5–12 years — but timing matters.
        </p>
        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🛡️ DFW Coating Options</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
          {coatings.map(c => (
            <div key={c.name} style={{ background: '#1E2D45', borderRadius: 10, padding: '16px 20px', borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{c.icon} {c.name}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>💰 {c.cost} &nbsp;|&nbsp; ⏳ Lasts {c.life}</div>
              <div style={{ color: '#cbd5e1', fontSize: 13 }}>✅ Best for: {c.best}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#1a2a40', border: '1px solid #F5E642', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Coat or Replace? DFW Decision Tool</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Coil Age (years)</label>
            <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 9"
              style={{ background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 6, padding: '10px 14px', width: '100%', fontSize: 15 }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Corrosion Condition</label>
            <select value={condition} onChange={e => setCondition(e.target.value)}
              style={{ background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 6, padding: '10px 14px', width: '100%', fontSize: 15 }}>
              <option value="">Select condition...</option>
              <option value="none">None — coil looks clean</option>
              <option value="mild">Mild — slight surface oxidation</option>
              <option value="moderate">Moderate — visible pitting/white powder</option>
              <option value="severe">Severe — holes, leaks, or refrigerant loss</option>
            </select>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Get Recommendation
          </button>
          {result && <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 16, color: '#F5E642', fontWeight: 600, fontSize: 14, lineHeight: 1.6 }}>{result}</div>}
        </div>
        <div style={{ background: '#1E2D45', borderRadius: 10, padding: '16px 20px', color: '#94a3b8', fontSize: 13, lineHeight: 1.7 }}>
          ⚠️ <strong style={{ color: '#F5E642' }}>DFW tip:</strong> Homes near Midlothian cement plant or DFW Airport see 2–3x faster coil corrosion. Inspect coils annually. ProLnk connects you with certified HVAC pros for coating or replacement.
        </div>
      </div>
    </div>
  );
}
