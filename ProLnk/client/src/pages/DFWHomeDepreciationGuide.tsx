import { useState } from 'react';

const RISK_FACTORS: Record<string, { weight: number; desc: string }> = {
  'Deferred maintenance (5+ years)': { weight: 25, desc: 'Roof, HVAC, foundation issues compounding' },
  'Older roof (15+ years)': { weight: 15, desc: 'DFW hail risk accelerates roof deterioration' },
  'No foundation inspection in 5 years': { weight: 20, desc: 'DFW clay soil causes significant foundation movement' },
  'Neighborhood declining (rising vacancies)': { weight: 20, desc: 'Vacancy rate drives comps down' },
  'Single major employer in area': { weight: 10, desc: 'Economic concentration risk' },
  'No HVAC update in 12+ years': { weight: 10, desc: 'DFW extreme heat makes HVAC critical to buyers' },
};

const PROTECTIONS = [
  { icon: '🏗️', title: 'Annual Home Inspection', desc: 'Catch foundation, roof, and plumbing early — DFW’s clay soil is particularly aggressive.' },
  { icon: '🌡️', title: 'HVAC Maintenance Plan', desc: 'DFW summers push HVAC hard. Annual contracts with Oncor-approved contractors.' },
  { icon: '💧', title: 'Moisture & Foundation Control', desc: 'Soaker hose systems prevent clay soil shrinkage that cracks slab foundations.' },
  { icon: '📈', title: 'Strategic Improvements', desc: 'Kitchen, bath, and curb appeal upgrades that match submarket buyer expectations.' },
  { icon: '🔒', title: 'HOA Engagement', desc: 'Active HOA participation protects neighborhood standards and comps.' },
];

export default function DFWHomeDepreciationGuide() {
  const [selected, setSelected] = useState<string[]>([]);
  const [marketType, setMarketType] = useState('suburban');
  const [result, setResult] = useState<null | any>(null);

  function toggleFactor(f: string) {
    setSelected(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  }

  function assess() {
    const rawScore = selected.reduce((sum, f) => sum + (RISK_FACTORS[f]?.weight || 0), 0);
    const marketAdj = marketType === 'urban' ? -5 : marketType === 'suburban' ? 0 : 5;
    const score = Math.min(100, rawScore + marketAdj);
    const level = score >= 50 ? 'High' : score >= 25 ? 'Moderate' : 'Low';
    const color = score >= 50 ? '#DC2626′ : score >= 25 ? '#D97706' : '#16A34A';
    setResult({ score, level, color });
  }

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', marginBottom: 28 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>📉</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '0 0 8px' }}>DFW Home Depreciation Guide</h1>
          <p style={{ color: '#CBD5E1', fontSize: 15, margin: 0 }}>What causes DFW home values to decline — and how to protect your investment against it.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 20, marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 16, fontWeight: 700, marginTop: 0 }}>📚 DFW-Specific Depreciation Causes</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              { icon: '🏚️', title: 'Deferred Maintenance', desc: 'The #1 depreciation driver. In DFW\’s heat, unmaintained roofs and HVAC deteriorate fast.' },
              { icon: '🌍', title: 'Foundation Issues', desc: 'DFW clay soil expands and contracts, cracking slabs. A red flag for buyers and inspectors.' },
              { icon: '📉', title: 'Neighborhood Decline', desc: 'Rising vacancy, absentee ownership, and commercial blight pull all comps down.' },
              { icon: '🏭', title: 'Economic Shifts', desc: '2008 showed how employer exits create ghost-town streets — even in DFW pockets.' },
            ].map(c => (
              <div key={c.title} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: '1px solid #F1F5F9′ }}>
                <span style={{ fontSize: 20 }}>{c.icon}</span>
                <div><div style={{ fontWeight: 600, fontSize: 13, color: '#0A1628′ }}>{c.title}</div><div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>{c.desc}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 17, fontWeight: 700, marginTop: 0 }}>🧮 Depreciation Risk Assessment</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: '#64748B', fontWeight: 600, display: 'block', marginBottom: 6 }}>Market Type</label>
            <select value={marketType} onChange={e => setMarketType(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14 }}>
              <option value="urban">Urban Core (Dallas/Fort Worth inner loop)</option>
              <option value="suburban">Suburban (Frisco, Plano, McKinney, Arlington)</option>
              <option value="rural">Outer Suburbs / Rural (Decatur, Waxahachie)</option>
            </select>
          </div>
          <div style={{ marginBottom: 6, fontSize: 13, color: '#64748B', fontWeight: 600 }}>Select risk factors that apply to your home:</div>
          <div style={{ display: 'grid', gap: 8 }}>
            {Object.entries(RISK_FACTORS).map(([label, { weight, desc }]) => (
              <label key={label} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: 12, borderRadius: 8, border: `2px solid ${selected.includes(label) ? '#F5E642' : '#E2E8F0'}`, cursor: 'pointer', background: selected.includes(label) ? '#FFFBEB' : '#fff' }}>
                <input type="checkbox" checked={selected.includes(label)} onChange={() => toggleFactor(label)} style={{ marginTop: 2 }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: '#0A1628′ }}>{label} <span style={{ color: '#94A3B8', fontWeight: 400 }}>({weight} pts)</span></div>
                  <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{desc}</div>
                </div>
              </label>
            ))}
          </div>
          <button onClick={assess} style={{ marginTop: 18, background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer', width: '100%' }}>Assess My Risk →</button>
        </div>

        {result && (
          <div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', marginBottom: 16, textAlign: 'center', borderTop: `4px solid ${result.color}` }}>
              <div style={{ fontWeight: 800, fontSize: 36, color: result.color }}>{result.score}/100</div>
              <div style={{ fontWeight: 700, fontSize: 18, color: '#0A1628', marginTop: 4 }}>{result.level} Depreciation Risk</div>
              <div style={{ fontSize: 13, color: '#64748B', marginTop: 8 }}>
                {result.level === 'High' ? 'Take action now — deferred issues compound quickly in DFW\’s climate. Start with foundation and roof.' :
                  result.level === 'Moderate' ? 'You\’re in manageable territory. Prioritize the highest-weight factors you selected.' :
                  'Strong position. Maintain the current care routine to preserve your DFW appreciation advantage.'}
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
              <h3 style={{ color: '#0A1628', fontSize: 15, fontWeight: 700, marginTop: 0 }}>🛡️ Protective Actions</h3>
              <div style={{ display: 'grid', gap: 10 }}>
                {PROTECTIONS.map(p => (
                  <div key={p.title} style={{ display: 'flex', gap: 10 }}>
                    <span style={{ fontSize: 20 }}>{p.icon}</span>
                    <div><div style={{ fontWeight: 600, fontSize: 13, color: '#0A1628′ }}>{p.title}</div><div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>{p.desc}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
