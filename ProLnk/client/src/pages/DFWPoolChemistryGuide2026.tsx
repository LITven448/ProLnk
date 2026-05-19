import { useState } from 'react';

export default function DFWPoolChemistryGuide2026() {
  const [ph, setPh] = useState('');
  const [alk, setAlk] = useState('');
  const [ch, setCh] = useState('');
  const [cya, setCya] = useState('');
  const [poolType, setPoolType] = useState('');
  const [recs, setRecs] = useState<string[]>([]);

  const analyze = () => {
    const results: string[] = [];
    const phVal = parseFloat(ph);
    const alkVal = parseFloat(alk);
    const chVal = parseFloat(ch);
    const cyaVal = parseFloat(cya);

    if (phVal < 7.4) results.push('⬆️ pH LOW: Add sodium carbonate (soda ash) — 6 oz per 10k gal raises pH ~0.2');
    else if (phVal > 7.6) results.push('⬇️ pH HIGH: Add muriatic acid or dry acid — DFW tap water tends to push pH high');
    else results.push('✅ pH: Perfect range (7.4–7.6)');

    if (alkVal < 80) results.push('⬆️ ALKALINITY LOW: Add sodium bicarbonate — 1.5 lbs per 10k gal raises ~10 ppm');
    else if (alkVal > 120) results.push('⬇️ ALKALINITY HIGH: Add muriatic acid carefully — aerate after to raise pH back up');
    else results.push('✅ Alkalinity: In range (80–120 ppm)');

    if (chVal < 200) results.push('⬆️ CALCIUM LOW: Add calcium chloride — DFW water is hard but pool surfaces need 200+ ppm');
    else if (chVal > 400) results.push('⬇️ CALCIUM HIGH: Partial drain and refill — DFW hard water (300+ ppm) can push calcium dangerously high');
    else results.push('✅ Calcium Hardness: In range (200–400 ppm)');

    if (cyaVal < 30) results.push('⬆️ CYA LOW: Add cyanuric acid — DFW sun degrades chlorine fast without stabilizer');
    else if (cyaVal > 80) results.push('⬇️ CYA HIGH: Partial drain/refill needed — high CYA weakens chlorine effectiveness (chlorine lock)');
    else results.push('✅ CYA/Stabilizer: In range (30–80 ppm)');

    if (poolType === 'salt') results.push('🧂 SALT POOL: Target salt level 3000–3500 ppm. Test monthly — DFW heat accelerates salt cell deposits');

    setRecs(results);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🧪</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Pool Chemistry Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Hard water (300+ ppm) + intense sun = DFW pools need frequent testing</p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 18 }}>📊 DFW Target Ranges</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {[['pH','7.4 – 7.6','Most critical — affects everything'],['Alkalinity','80 – 120 ppm','Buffer for pH swings'],['Calcium Hardness','200 – 400 ppm','DFW tap is already ~300 ppm'],['Cyanuric Acid','30 – 80 ppm','Protects chlorine from DFW UV'],['Free Chlorine','2 – 4 ppm','Higher in summer heat'],['Salt (if applicable)','3000 – 3500 ppm','Test cell monthly in DFW heat']].map(([name, range, note]) => (
              <div key={name} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{name}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>{range}</div>
                <div style={{ color: '#e2e8f0', fontSize: 11 }}>{note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 18 }}>🔬 Enter Your Test Results</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            {[['pH (e.g. 7.8)', ph, setPh],['Alkalinity ppm (e.g. 90)', alk, setAlk],['Calcium Hardness ppm (e.g. 350)', ch, setCh],['CYA ppm (e.g. 50)', cya, setCya]].map(([label, val, setter]) => (
              <div key={label as string}>
                <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>{label as string}</label>
                <input type='number' value={val as string} onChange={e => (setter as (v: string) => void)(e.target.value)} placeholder='0′ style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 6, padding: '8px 12px', boxSizing: ’border-box' }} />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Pool Type</label>
            <select value={poolType} onChange={e => setPoolType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #F5E642', borderRadius: 6, padding: '8px 12px' }}>
              <option value=''>Select type</option>
              <option value='chlorine'>Chlorine Pool</option>
              <option value='salt'>Salt Water Pool</option>
            </select>
          </div>
          <button onClick={analyze} disabled={!ph || !alk || !ch || !cya} style={{ background: ph && alk && ch && cya ? '#F5E642′ : '#334155', color: '#0A1628', fontWeight: 700, border: ’none', borderRadius: 8, padding: '12px 28px', cursor: ph && alk && ch && cya ? 'pointer' : 'not-allowed' }}>
            Analyze My Water →
          </button>
        </div>

        {recs.length > 0 && (
          <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 18 }}>💊 Adjustment Recommendations</h2>
            {recs.map((r, i) => (
              <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid #0A1628', fontSize: 14 }}>{r}</div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', color: '#475569', fontSize: 13, marginTop: 24 }}>
          ProLnk connects DFW homeowners with licensed pool pros • prolnk.io
        </div>
      </div>
    </div>
  );
}
