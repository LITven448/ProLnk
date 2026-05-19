import { useState } from 'react';

const FOUNDATION_MAP: Record<string, string> = {
  'inner-loop': 'Pier-and-beam extension common — expansive DFW clay requires engineered piers (15–20 ft depth)',
  'suburban': 'Monolithic slab extension — requires geotechnical report in most areas',
  'far-suburbs': 'Slab or stem wall — varies by soil conditions; engineer report recommended',
};

const COST_MAP: Record<string, Record<string, string>> = {
  'small': { 'under-150k': '$80,000 – $110,000', '150k-250k': '$90,000 – $130,000', 'over-250k': '$110,000 – $160,000′ },
  'medium': { 'under-150k': '$110,000 – $150,000', '150k-250k': '$130,000 – $180,000', 'over-250k': '$150,000 – $220,000′ },
  'large': { 'under-150k': '$150,000 – $200,000', '150k-250k': '$180,000 – $250,000', 'over-250k': '$200,000 – $300,000+' },
};

const PERMIT_TIMELINE: Record<string, string> = {
  'dallas': '3–5 weeks (Dallas Building Inspection)',
  'fort-worth': '2–4 weeks (Fort Worth Development)',
  'plano': '2–3 weeks (Plano Inspections)',
  'frisco': '3–4 weeks (Frisco Building)',
  'mckinney': '2–3 weeks (McKinney Development Services)',
  'arlington': '3–5 weeks (Arlington Development Services)',
};

export default function DFWMasterSuiteAdditionGuide() {
  const [lotSpace, setLotSpace] = useState('');
  const [budget, setBudget] = useState('');
  const [city, setCity] = useState('');
  const [result, setResult] = useState<null | { cost: string; foundation: string; permit: string; feasibility: string }>(null);

  function calculate() {
    if (!lotSpace || !budget || !city) return;
    const cost = COST_MAP[lotSpace]?.[budget] ?? 'Consult a DFW general contractor';
    const foundation = FOUNDATION_MAP[city] ?? 'Geotechnical assessment recommended';
    const permit = PERMIT_TIMELINE[city] ?? '3–5 weeks (varies by city)';
    const feasibility = lotSpace === 'small'
      ? '⚠️ Tight lot — verify setbacks with city before proceeding'
      : '✅ Feasible — confirm rear/side setbacks with your city';
    setResult({ cost, foundation, permit, feasibility });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Master Suite Addition in DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>
          The master suite addition is the most-requested major project in DFW. Combining a primary bedroom with an ensuite bath creates significant value — but DFW's clay soil makes foundation work critical.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📐 Typical Scope</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              ['Bedroom addition', '300–500 sq ft', 'Primary sleeping area with closet'],
              ['Ensuite bath', '80–150 sq ft', 'Dual vanity, walk-in shower, soaking tub'],
              ['Walk-in closet', '60–100 sq ft', 'His/hers or single large format'],
              ['Foundation extension', 'Varies', 'DFW clay requires engineered solution'],
            ].map(([item, size, note]) => (
              <div key={item} style={{ background: '#0A1628', borderRadius: 8, padding: 14, display: 'grid', gridTemplateColumns: '1fr 80px', gap: 8 }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{item}</div>
                  <div style={{ color: '#94A3B8', fontSize: 13 }}>{note}</div>
                </div>
                <div style={{ color: '#F5E642', fontWeight: 600, textAlign: 'right' }}>{size}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🌱 DFW Clay Foundation Reality</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7 }}>
            DFW's expansive black clay soil is the #1 cost driver for additions. Slabs can heave and crack without proper preparation. Most addition contractors require a geotechnical soil report ($500–1,200) before final pricing. Budget an extra $8,000–20,000 for foundation work beyond basic slab.
          </p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🧮 Feasibility Estimator</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              ['Available lot space', lotSpace, setLotSpace, [['', 'Select space'], ['small', 'Small (tight lot, <15ft to setback)'], ['medium', 'Medium (15–30ft available)'], ['large', 'Large (30ft+ available)']]],
              ['Project budget', budget, setBudget, [['', 'Select budget'], ['under-150k', 'Under $150,000'], ['150k-250k', '$150,000 – $250,000'], ['over-250k', 'Over $250,000']]],
              ['DFW city / area', city, setCity, [['', 'Select city'], ['dallas', 'Dallas'], ['fort-worth', 'Fort Worth'], ['plano', 'Plano'], ['frisco', 'Frisco'], ['mckinney', 'McKinney'], ['arlington', 'Arlington']]],
            ].map(([label, val, setter, opts]: any) => (
              <div key={label}>
                <label style={{ display: 'block', marginBottom: 8, color: '#94A3B8′ }}>{label}</label>
                <select value={val} onChange={e => setter(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 15 }}>
                  {opts.map(([v, l]: string[]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
            ))}
            <button onClick={calculate}
              style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, padding: '14px 0', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
              Get Estimate →
            </button>
          </div>
          {result && (
            <div style={{ marginTop: 20, display: 'grid', gap: 12 }}>
              {[['✅ Feasibility', result.feasibility], ['💰 Estimated Cost', result.cost], ['🌱 Foundation Type', result.foundation], ['📋 Permit Timeline', result.permit]].map(([label, val]) => (
                <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                  <div style={{ color: '#94A3B8', fontSize: 13 }}>{label}</div>
                  <div style={{ fontWeight: 600, marginTop: 4 }}>{val}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 18 }}>Get 3 DFW addition contractor quotes</div>
          <div style={{ color: '#0A1628', fontSize: 14, marginTop: 6 }}>ProLnk matches you with vetted DFW general contractors — free</div>
        </div>
      </div>
    </div>
  );
}
