import { useState } from 'react';

const SYMPTOMS = ['Makes noise','Warm inside','Ice maker broken','Leaking water','Runs constantly','Door seal damaged'];

export default function DFWRefrigeratorGuide2026() {
  const [age, setAge] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState('');

  function toggle(s: string) {
    setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  }

  function decide() {
    const a = parseInt(age) || 0;
    const score = selected.length;
    if (a > 15 || (a > 10 && score >= 2)) setResult('🔴 Replace — repair cost likely exceeds value. Look for ENERGY STAR models with Oncor rebates up to $75.');
    else if (a > 7 && score >= 3) setResult('🟡 Get an estimate — if repair > $400, replacing is smarter.');
    else setResult('🟢 Repair — unit still has life. Schedule a DFW appliance tech.');
  }

  const types = [
    { icon: '🚪', name: 'French Door', note: 'Most popular in DFW; wide fridge section ideal for families' },
    { icon: '↔️', name: 'Side-by-Side', note: 'Narrow shelves; easier reach in galley kitchens' },
    { icon: '🧊', name: 'Bottom Freezer', note: 'Energy efficient; less bending for fridge items' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>🏠 DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Refrigerator Guide — Dallas / Fort Worth</h1>
        <p style={{ color: '#a0b0c8', marginBottom: 28 }}>Average lifespan 13–17 years. DFW hard water accelerates ice maker wear.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 28 }}>
          {types.map(t => (
            <div key={t.name} style={{ background: '#13223a', borderRadius: 10, padding: '16px 12px', borderTop: '3px solid #F5E642' }}>
              <div style={{ fontSize: 28 }}>{t.icon}</div>
              <div style={{ fontWeight: 700, margin: '8px 0 4px' }}>{t.name}</div>
              <div style={{ color: '#a0b0c8', fontSize: 12 }}>{t.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#13223a', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>💡 DFW Hard Water Facts</div>
          <ul style={{ color: '#a0b0c8', fontSize: 13, paddingLeft: 18, lineHeight: 1.8 }}>
            <li>DFW water averages 15–25 grains/gallon hardness</li>
            <li>Ice maker filters need replacement every 6 months (vs 12 elsewhere)</li>
            <li>Water line connection requires a licensed plumber in TX</li>
            <li>Oncor ENERGY STAR rebates: up to $75 on qualifying models</li>
          </ul>
        </div>

        <div style={{ background: '#13223a', borderRadius: 12, padding: 20, marginBottom: 8 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 14 }}>🔧 Repair vs Replace Calculator</div>
          <label style={{ fontSize: 13, color: '#a0b0c8' }}>Fridge age (years)</label>
          <input value={age} onChange={e => setAge(e.target.value)} type="number" placeholder="e.g. 11"
            style={{ display: 'block', width: '100%', background: '#0A1628', border: '1px solid #2a3a54', borderRadius: 8, color: '#fff', padding: '10px 12px', marginTop: 6, marginBottom: 14, fontSize: 14, boxSizing: 'border-box' }} />
          <div style={{ fontSize: 13, color: '#a0b0c8', marginBottom: 8 }}>Current symptoms (select all that apply)</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {SYMPTOMS.map(s => (
              <button key={s} onClick={() => toggle(s)}
                style={{ background: selected.includes(s) ? '#F5E642' : '#0A1628', color: selected.includes(s) ? '#0A1628' : '#fff', border: '1px solid #2a3a54', borderRadius: 20, padding: '6px 14px', fontSize: 12, cursor: 'pointer' }}>{s}</button>
            ))}
          </div>
          <button onClick={decide} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, border: 'none', borderRadius: 8, padding: '12px 24px', cursor: 'pointer', fontSize: 15 }}>Get My Recommendation</button>
          {result && <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 14, fontSize: 14, lineHeight: 1.6 }}>{result}</div>}
        </div>

        <div style={{ color: '#a0b0c8', fontSize: 11, marginTop: 20, textAlign: 'center' }}>ProLnk connects you with licensed DFW appliance pros · prolnk.io</div>
      </div>
    </div>
  );
}