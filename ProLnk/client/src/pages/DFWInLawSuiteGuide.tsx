import { useState } from 'react';

const suiteTypes = [
  { type: 'Bonus Room Conversion', permitDiff: 'Low', cost: '$15,000-35,000', timeframe: '4-8 weeks', notes: 'No addition required, fastest path, full HVAC already exists' },
  { type: 'Garage Conversion', permitDiff: 'Medium', cost: '$20,000-45,000', timeframe: '6-12 weeks', notes: 'Separate entrance natural, needs insulation + HVAC' },
  { type: 'Addition (attached)', permitDiff: 'High', cost: '$80,000-150,000', timeframe: '4-6 months', notes: 'Full code compliance, HOA approval, foundation work' },
  { type: 'Carriage House / ADU', permitDiff: 'High', cost: '$100,000-200,000', timeframe: '6-9 months', notes: 'Maximum privacy, rental income potential, complex permits' },
];

const adaFeatures = [
  { name: 'Wider doorways (36″ min)', required: true, cost: '$500-2,000/door' },
  { name: 'Roll-in or walk-in shower', required: true, cost: '$3,000-8,000′ },
  { name: 'Grab bars (bath + toilet)', required: true, cost: '$200-500′ },
  { name: 'Zero-threshold entry', required: false, cost: '$500-3,000′ },
  { name: 'Lever door handles', required: false, cost: '$100-300′ },
  { name: 'Kitchenette at accessible height', required: false, cost: '$2,000-6,000′ },
];

export default function DFWInLawSuiteGuide() {
  const [spaceAvail, setSpaceAvail] = useState('bonus');
  const [budget, setBudget] = useState('40000');
  const [needAda, setNeedAda] = useState(false);
  const [needPrivateEntrance, setNeedPrivateEntrance] = useState(true);
  const [result, setResult] = useState<null | { recommendation: string; cost: string; timeline: string; permits: string[]; adaAddCost: string }>(null);

  function calculate() {
    const b = parseInt(budget) || 40000;
    let rec = suiteTypes.find(s => {
      if (spaceAvail === 'bonus') return s.type === 'Bonus Room Conversion';
      if (spaceAvail === 'garage') return s.type === 'Garage Conversion';
      if (spaceAvail === 'addition') return s.type === 'Addition (attached)';
      return s.type === 'Carriage House / ADU';
    }) || suiteTypes[0];
    if (needPrivateEntrance && spaceAvail === 'bonus') rec = suiteTypes[1];
    const permits = ['Residential building permit (all DFW cities)'];
    if (spaceAvail !== 'bonus') permits.push('Electrical permit (new circuits)', 'Plumbing permit (kitchenette/bath)');
    if (spaceAvail === 'addition' || spaceAvail === 'adu') permits.push('HOA architectural approval', 'City ADU approval (Dallas ADU ordinance 2022)');
    const adaCost = needAda ? '$5,500-15,000 additional' : 'N/A';
    setResult({ recommendation: rec.type, cost: rec.cost, timeline: rec.timeframe, permits, adaAddCost: adaCost });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600 }}>🏠 DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>In-Law Suite Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Multigenerational living is surging in DFW — driven by rising costs and cultural norms across the region's diverse population. DFW’s large homes make in-law suites feasible without building new.</p>

        <div style={{ background: '#1e293b', borderRadius: 10, padding: '16px 20px', marginBottom: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ textAlign: 'center' }}><div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>26%</div><div style={{ fontSize: 13, color: '#94a3b8' }}>of DFW households are multigenerational</div></div>
          <div style={{ textAlign: 'center' }}><div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>+15%</div><div style={{ fontSize: 13, color: '#94a3b8' }}>home value increase with quality in-law suite</div></div>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>📋 Suite Type Comparison</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 36 }}>
          {suiteTypes.map(s => (
            <div key={s.type} style={{ background: '#1e293b', borderRadius: 10, padding: '14px 18px', border: '1px solid #334155′ }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontWeight: 700 }}>{s.type}</span>
                <span style={{ color: '#F5E642', fontWeight: 600 }}>{s.cost}</span>
              </div>
              <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#94a3b8', flexWrap: 'wrap' }}>
                <span>⏱️ {s.timeframe}</span>
                <span style={{ color: s.permitDiff === 'Low' ? '#4ade80′ : s.permitDiff === ’Medium' ? '#fbbf24′ : '#f87171' }}>Permits: {s.permitDiff}</span>
              </div>
              <div style={{ fontSize: 13, color: '#64748b', marginTop: 6 }}>{s.notes}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>♿ ADA Accessibility Features</h2>
        <div style={{ display: 'grid', gap: 8, marginBottom: 36 }}>
          {adaFeatures.map(f => (
            <div key={f.name} style={{ background: '#1e293b', borderRadius: 8, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #334155′ }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span>{f.required ? '⚠️' : '✅'}</span>
                <span style={{ fontSize: 14 }}>{f.name}</span>
                {f.required && <span style={{ fontSize: 11, background: '#7c3aed', padding: '2px 6px', borderRadius: 4 }}>Recommended</span>}
              </div>
              <span style={{ color: '#F5E642', fontSize: 13 }}>{f.cost}</span>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🧮 Suite Planner</h2>
        <div style={{ background: '#1e293b', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: '#94a3b8′ }}>Available Space</label>
              <select value={spaceAvail} onChange={e => setSpaceAvail(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15 }}>
                <option value="bonus">Bonus Room</option>
                <option value="garage">Garage</option>
                <option value="addition">New Addition</option>
                <option value="adu">Carriage House / ADU</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: '#94a3b8′ }}>Budget</label>
              <input type="number" value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14 }}>
              <input type="checkbox" checked={needAda} onChange={e => setNeedAda(e.target.checked)} style={{ accentColor: '#F5E642', width: 18, height: 18 }} />
              ADA accessibility needed
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14 }}>
              <input type="checkbox" checked={needPrivateEntrance} onChange={e => setNeedPrivateEntrance(e.target.checked)} style={{ accentColor: '#F5E642', width: 18, height: 18 }} />
              Private entrance required
            </label>
          </div>
          <button onClick={calculate} style={{ width: '100%', padding: '12px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            Get My In-Law Suite Plan →
          </button>
        </div>

        {result && (
          <div style={{ background: '#1e293b', borderRadius: 12, padding: '24px', border: '1px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16, fontWeight: 700 }}>🏡 Your In-Law Suite Plan</h3>
            <div style={{ display: 'grid', gap: 10, marginBottom: 16 }}>
              <div><strong>Recommended Type:</strong> {result.recommendation}</div>
              <div><strong>💰 Estimated Cost:</strong> <span style={{ color: '#F5E642′ }}>{result.cost}</span></div>
              <div><strong>⏱️ Timeline:</strong> {result.timeline}</div>
              {needAda && <div><strong>♿ ADA Additions:</strong> <span style={{ color: '#fbbf24′ }}>{result.adaAddCost}</span></div>}
            </div>
            <div><strong>📄 Required Permits:</strong><ul style={{ marginTop: 6, paddingLeft: 20 }}>{result.permits.map((p, i) => <li key={i} style={{ color: '#94a3b8', marginBottom: 4 }}>{p}</li>)}</ul></div>
          </div>
        )}
      </div>
    </div>
  );
}
