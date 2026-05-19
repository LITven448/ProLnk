import { useState } from 'react';

const options = [
  { age: '0-5 years', condition: 'Good', icon: '✅', items: ['Install zinc strips at ridge — algae control for 5+ years', 'Apply UV-reflective elastomeric coating — reduces heat absorption 15%', 'Soft-wash cleaning annually with low-pressure rinse'] },
  { age: '6-10 years', condition: 'Fair', icon: '🔧', items: ['Seal exposed nail heads and minor cracks with roofing caulk', 'Ensure attic ventilation ratio 1:150 for DFW heat management', 'Clear gutters every fall — DFW rare snow/ice dam prevention'] },
  { age: '11-15 years', condition: 'Showing wear', icon: '⚠️', items: ['Professional inspection — identify granule loss zones', 'Spot-replace damaged or cupped shingles before next DFW hail season', 'Recoat with reflective sealant to extend life 3-5 more years'] },
  { age: '16+ years', condition: 'Aging', icon: '🚨', items: ['Budget for replacement within 2-3 years', 'Focus on leak prevention: valleys, flashing, penetrations', 'Document condition for insurance claim if hail hits'] },
];

export default function DFWShingleLifeExtender2026() {
  const [age, setAge] = useState('');
  const [condition, setCondition] = useState('');
  const [result, setResult] = useState<typeof options[0] | null>(null);

  const ages = ['0-5 years', '6-10 years', '11-15 years', '16+ years'];
  const conditions = ['Good', 'Fair', 'Showing wear', 'Aging'];

  const getOptions = () => {
    const match = options.find(o => o.age === age && o.condition === condition);
    setResult(match || options[1]);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🛡️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Shingle Life Extension Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Proven strategies to maximize your DFW roof lifespan in Texas climate.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🌞 DFW Shingle Killers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '☀️', label: 'UV Radiation', val: 'Granule loss accelerates in DFW sun' },
              { icon: '🌧️', label: 'Hail Cycles', val: 'DFW averages 5+ hail events/year' },
              { icon: '🌿', label: 'Algae/Moss', val: 'Humidity enables growth, zinc prevents' },
              { icon: '🌬️', label: 'Wind Lift', val: '70+ mph gusts unseal shingle edges' },
            ].map(f => (
              <div key={f.label} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{f.icon}</div>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 13 }}>{f.label}</div>
                <div style={{ color: '#e2e8f0', fontSize: 12 }}>{f.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Get Life Extension Plan</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Roof Age</label>
            <select value={age} onChange={e => setAge(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 14 }}>
              <option value="">Select roof age...</option>
              {ages.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Current Condition</label>
            <select value={condition} onChange={e => setCondition(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 14 }}>
              <option value="">Select condition...</option>
              {conditions.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button onClick={getOptions} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Get Extension Plan →</button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{result.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Recommended Actions</div>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {result.items.map(item => <li key={item} style={{ color: '#e2e8f0', fontSize: 14, marginBottom: 8, lineHeight: 1.5 }}>{item}</li>)}
              </ul>
            </div>
          )}
        </div>
        <div style={{ textAlign: 'center', color: '#475569', fontSize: 12 }}>ProLnk DFW Roofing Intelligence • 2026</div>
      </div>
    </div>
  );
}