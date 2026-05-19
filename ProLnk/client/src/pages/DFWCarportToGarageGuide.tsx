import { useState } from 'react';

const FEASIBILITY_MAP: Record<string, Record<string, string>> = {
  'single': {
    'adequate': '✅ Good candidate — full conversion feasible. Standard scope.',
    'thin': '⚠️ Marginal — thin slab may need reinforcement or replacement. Get slab assessment first ($200–400).',
    'none': '❌ No slab — new foundation pour required. Adds $4,000–8,000 to project.',
  },
  'double': {
    'adequate': '✅ Strong candidate — double-wide conversions add significant resale value in DFW.',
    'thin': '⚠️ Slab assessment required — large thin slabs are a common issue in 1970s DFW homes.',
    'none': '⚠️ High cost — large new foundation pour. Get full estimate before committing.',
  },
  'tandem': {
    'adequate': '⚠️ Non-standard — tandem layouts require custom design. May not meet modern code widths.',
    'thin': '⚠️ Complex — slab + layout issues. Consult contractor.',
    'none': '❌ Rarely cost-effective — foundation + non-standard layout adds complexity.',
  },
};

const COST_MAP: Record<string, Record<string, string>> = {
  'single': { 'adequate': '$12,000 – $22,000', 'thin': '$16,000 – $28,000', 'none': '$20,000 – $32,000' },
  'double': { 'adequate': '$18,000 – $32,000', 'thin': '$24,000 – $40,000', 'none': '$28,000 – $45,000' },
  'tandem': { 'adequate': '$15,000 – $28,000', 'thin': '$20,000 – $34,000', 'none': '$24,000 – $38,000' },
};

const RESALE_VALUE: Record<string, string> = {
  'dallas': '+$12,000 – $22,000 in DFW urban core',
  'fort-worth': '+$10,000 – $18,000 in Fort Worth market',
  'suburban': '+$15,000 – $28,000 in DFW suburban markets',
  'premium': '+$20,000 – $40,000 in premium DFW neighborhoods',
};

export default function DFWCarportToGarageGuide() {
  const [carportSize, setCarportSize] = useState('');
  const [foundation, setFoundation] = useState('');
  const [location, setLocation] = useState('');
  const [result, setResult] = useState<null | { feasibility: string; cost: string; scope: string; resale: string }>(null);

  function calculate() {
    if (!carportSize || !foundation || !location) return;
    const feasibility = FEASIBILITY_MAP[carportSize]?.[foundation] ?? 'Consult licensed contractor';
    const cost = COST_MAP[carportSize]?.[foundation] ?? 'Get contractor estimate';
    const resale = RESALE_VALUE[location] ?? '+$10,000 – $20,000 estimated';
    const scopeMap: Record<string, string> = {
      'adequate': 'Three walls + overhead door + electrical + finish. Slab ready to use.',
      'thin': 'Slab evaluation → potential overlay or full replace → walls + door + electrical.',
      'none': 'New concrete foundation → cure time (28 days) → walls + door + electrical + finish.',
    };
    setResult({ feasibility, cost, scope: scopeMap[foundation], resale });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Carport to Garage Conversion in DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>
          Thousands of DFW homes built in the 1960s–1980s have carports. Converting to an enclosed garage is one of the most popular and ROI-positive projects in the DFW market.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🏗️ Standard Conversion Scope</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              ['Foundation assessment', '$200–400', 'Slab thickness and condition check'],
              ['Three walls construction', '$4,000–9,000', 'Framed, insulated, drywalled exterior walls'],
              ['Overhead garage door', '$1,200–3,500', 'Single or double with opener'],
              ['Electrical rough-in', '$800–1,800', 'Outlets, lights, door opener circuit'],
              ['Permit and inspection', '$300–800', 'Building + electrical permits'],
              ['Finish work', '$1,500–4,000', 'Drywall, paint, trim, weatherstripping'],
            ].map(([item, cost, note]) => (
              <div key={item} style={{ background: '#0A1628', borderRadius: 8, padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{item}</div>
                  <div style={{ color: '#94A3B8', fontSize: 13 }}>{note}</div>
                </div>
                <div style={{ color: '#F5E642', fontWeight: 700, whiteSpace: 'nowrap' }}>{cost}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📋 DFW Permit Requirements</h2>
          <ul style={{ color: '#CBD5E1', lineHeight: 2, paddingLeft: 20 }}>
            <li>Building permit required in all DFW municipalities</li>
            <li>Electrical permit for all new circuits</li>
            <li>Must meet current energy code (insulated walls, weatherstripping)</li>
            <li>Garage door must meet wind load requirements (DFW is Exposure C)</li>
            <li>Processing: 1–3 weeks depending on city</li>
            <li>HOA approval may also be required — check first</li>
          </ul>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🧮 Feasibility & ROI Estimator</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              ['Carport size', carportSize, setCarportSize, [['', 'Select size'], ['single', 'Single (1 car)'], ['double', 'Double (2 car)'], ['tandem', 'Tandem (front to back)']]],
              ['Existing foundation', foundation, setFoundation, [['', 'Select foundation'], ['adequate', 'Good slab (4"+ thick, good condition)'], ['thin', 'Thin or cracked slab'], ['none', 'No slab / gravel / dirt']]],
              ['DFW location', location, setLocation, [['', 'Select area'], ['dallas', 'Dallas urban core'], ['fort-worth', 'Fort Worth'], ['suburban', 'DFW suburban (Plano, Irving, Garland)'], ['premium', 'Premium area (Southlake, Frisco, McKinney)']]],
            ].map(([label, val, setter, opts]: any) => (
              <div key={label}>
                <label style={{ display: 'block', marginBottom: 8, color: '#94A3B8' }}>{label}</label>
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
              {[['✅ Feasibility', result.feasibility], ['🔧 Project Scope', result.scope], ['💰 Estimated Cost', result.cost], ['📈 DFW Resale Value Add', result.resale]].map(([label, val]) => (
                <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                  <div style={{ color: '#94A3B8', fontSize: 13 }}>{label}</div>
                  <div style={{ fontWeight: 600, marginTop: 4 }}>{val}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 18 }}>Get 3 quotes from DFW garage conversion contractors</div>
          <div style={{ color: '#0A1628', fontSize: 14, marginTop: 6 }}>ProLnk matches you with vetted DFW contractors — free, no obligation</div>
        </div>
      </div>
    </div>
  );
}
