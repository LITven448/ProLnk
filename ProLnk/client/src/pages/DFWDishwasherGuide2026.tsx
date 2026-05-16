import { useState } from 'react';

const ISSUES = ['Spots on dishes','Interior buildup','Not draining','Door latch broken','Smells bad','Not cleaning well'];

export default function DFWDishwasherGuide2026() {
  const [age, setAge] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState('');

  function toggle(s: string) {
    setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  }

  function decide() {
    const a = parseInt(age) || 0;
    const score = selected.length;
    if (a > 10 || (a > 7 && score >= 3)) setResult('🔴 Replace — DFW hard water has shortened its lifespan. Bosch 500 series handles hard water best.');
    else if (score >= 2) setResult('🟡 Descale first — run a citric acid cycle. If issues persist, get a repair quote.');
    else setResult('🟢 Maintain — monthly descaling with dishwasher cleaner will extend life significantly.');
  }

  const brands = [
    { icon: '🥇', name: 'Bosch', score: '9.5', note: 'Best for DFW hard water; condensation dry; ultra-quiet' },
    { icon: '🥈', name: 'KitchenAid', score: '8.8', note: 'Powerful wash; stainless tub; good for family loads' },
    { icon: '🥉', name: 'LG', score: '8.2', note: 'TrueSteam helps with hard water deposits; wifi control' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>🏠 DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Dishwasher Guide — Dallas / Fort Worth</h1>
        <p style={{ color: '#a0b0c8', marginBottom: 28 }}>Average lifespan 9–12 years. DFW hard water is the #1 enemy of dishwashers.</p>

        <div style={{ background: '#13223a', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>⚠️ DFW Hard Water Reality</div>
          <ul style={{ color: '#a0b0c8', fontSize: 13, paddingLeft: 18, lineHeight: 1.9 }}>
            <li>White spots on dishes = calcium/magnesium from DFW tap water</li>
            <li>Interior clouding & film buildup on racks and spray arms</li>
            <li>Water softener extends dishwasher life by 3–5 years</li>
            <li>Rinse aid is essential in DFW — use it every cycle</li>
            <li>Installation requires a licensed TX plumber for water supply line</li>
          </ul>
        </div>

        <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>🏆 Best Brands for DFW Hard Water</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 28 }}>
          {brands.map(b => (
            <div key={b.name} style={{ background: '#13223a', borderRadius: 10, padding: '16px 12px', borderTop: '3px solid #F5E642' }}>
              <div style={{ fontSize: 26 }}>{b.icon}</div>
              <div style={{ fontWeight: 700, margin: '8px 0 2px' }}>{b.name}</div>
              <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 4 }}>Score: {b.score}/10</div>
              <div style={{ color: '#a0b0c8', fontSize: 11 }}>{b.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#13223a', borderRadius: 12, padding: 20, marginBottom: 8 }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 14 }}>🔧 Repair vs Replace Guide</div>
          <label style={{ fontSize: 13, color: '#a0b0c8' }}>Dishwasher age (years)</label>
          <input value={age} onChange={e => setAge(e.target.value)} type="number" placeholder="e.g. 8"
            style={{ display: 'block', width: '100%', background: '#0A1628', border: '1px solid #2a3a54', borderRadius: 8, color: '#fff', padding: '10px 12px', marginTop: 6, marginBottom: 14, fontSize: 14, boxSizing: 'border-box' }} />
          <div style={{ fontSize: 13, color: '#a0b0c8', marginBottom: 8 }}>Current issues (select all that apply)</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {ISSUES.map(s => (
              <button key={s} onClick={() => toggle(s)}
                style={{ background: selected.includes(s) ? '#F5E642' : '#0A1628', color: selected.includes(s) ? '#0A1628' : '#fff', border: '1px solid #2a3a54', borderRadius: 20, padding: '6px 14px', fontSize: 12, cursor: 'pointer' }}>{s}</button>
            ))}
          </div>
          <button onClick={decide} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, border: 'none', borderRadius: 8, padding: '12px 24px', cursor: 'pointer', fontSize: 15 }}>Get My Recommendation</button>
          {result && <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 14, fontSize: 14, lineHeight: 1.6 }}>{result}</div>}
        </div>

        <div style={{ color: '#a0b0c8', fontSize: 11, marginTop: 20, textAlign: 'center' }}>ProLnk connects you with licensed DFW plumbers for dishwasher install · prolnk.io</div>
      </div>
    </div>
  );
}