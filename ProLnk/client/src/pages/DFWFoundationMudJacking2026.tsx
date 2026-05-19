import { useState } from 'react';

export default function DFWFoundationMudJacking2026() {
  const [concreteType, setConcreteType] = useState('');
  const [voidSize, setVoidSize] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState('');

  const getRecommendation = () => {
    if (!concreteType || !voidSize || !budget) { setResult('Please answer all questions.'); return; }
    if (voidSize === 'large') { setResult('🟡 POLYURETHANE FOAM: Large voids need foam — it expands to fill irregular spaces that slurry can\’t reach efficiently. In DFW clay soil, foam also bonds better long-term and weighs far less, reducing future settlement risk.'); return; }
    if (budget === 'low' && concreteType !== 'pool') { setResult('🟢 MUDJACKING: For smaller voids on standard concrete (driveways, patios, sidewalks) with budget constraints, mudjacking delivers solid results at $3–$8/sqft vs foam at $5–$25/sqft. Ask for a 2-year workmanship warranty.'); return; }
    if (concreteType === 'pool' || budget === 'high') { setResult('🟢 POLYURETHANE FOAM: Lightweight foam is ideal for pool decks (no extra weight stress on pool shell) and premium applications where longevity matters. In DFW clay, foam outperforms mudjacking 5–7 years out.'); return; }
    setResult('🟡 GET BOTH QUOTES: Your situation could go either way. Get quotes for both methods — mudjacking ($3–$8/sqft) and polyurethane foam ($5–$25/sqft). The price difference often makes foam the better long-term value in DFW clay.');
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#F5E642', fontSize: '14px', fontWeight: '600' }}>🏗️ DFW FOUNDATION GUIDE 2026</div>
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px', lineHeight: '1.2' }}>Mudjacking vs. Polyurethane Foam in DFW</h1>
        <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '32px' }}>DFW's expansive clay soil makes sunken concrete common — and the lifting method you choose matters more here than anywhere else.</p>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>⚖️ Method Comparison</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #F5E642' }}>
                  {['Factor','Mudjacking','Polyurethane Foam'].map(h => <th key={h} style={{ textAlign: 'left', padding: '10px 12px', color: '#F5E642' }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {[['Cost','$3–$8 per sqft','$5–$25 per sqft'],['Material Weight','Heavy (cement slurry)','Lightweight (expands 2x)'],['Cure Time','24–72 hours','15–30 minutes'],['Void Fill','Solid areas only','Expands into gaps'],['DFW Clay Performance','Good short-term','Better long-term'],['Hole Size','1.5–2 inch holes','5/8 inch holes'],['Lifespan','5–10 years','10–15 years']].map(([f, m, p]) => (
                  <tr key={f} style={{ borderBottom: '1px solid #334155' }}>
                    <td style={{ padding: '10px 12px', color: '#94a3b8' }}>{f}</td>
                    <td style={{ padding: '10px 12px', color: '#cbd5e1' }}>{m}</td>
                    <td style={{ padding: '10px 12px', color: '#cbd5e1' }}>{p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>🧱 Why DFW Clay Matters</h2>
          {[['🌧️ Wet Season Expansion','Clay expands significantly with moisture, then contracts in drought — this cycle re-voids under mudjacking faster'],['🔆 DFW Drought Cycles','Prolonged drought shrinks clay dramatically, reopening voids beneath mudjacked slabs in 3–5 years'],['⚡ Foam Bonds to Clay','Polyurethane foam chemically bonds to surrounding soil, resisting the shrink/swell cycle better than cement slurry'],['📍 Depth of Settlement','DFW clay voids often go 12–18 inches deep — foam expansion reaches areas slurry injection misses']].map(([title, desc]) => (
            <div key={title} style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '14px', marginBottom: '10px' }}>
              <div style={{ fontWeight: '700', marginBottom: '6px', fontSize: '15px' }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: '13px' }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>🧮 Which Method for My Situation?</h2>
          {[['What type of concrete is sunken?', concreteType, setConcreteType, [['driveway','Driveway'],['patio','Patio or walkway'],['pool','Pool deck'],['sidewalk','Sidewalk or steps']]],['How large are the voids under the slab?', voidSize, setVoidSize, [['small','Small — slight unevenness, under 2 inches'],['medium','Medium — visible gap, 2–4 inches'],['large','Large — significant drop, 4+ inches']]],['What is your budget priority?', budget, setBudget, [['low','Lower upfront cost'],['high','Best long-term result']]]].map(([label, val, setter, options]) => (
            <div key={label} style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '14px', marginBottom: '6px' }}>{label}</label>
              <select value={val} onChange={e => setter(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '14px' }}>
                <option value="">Select an option</option>
                {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
          ))}
          <button onClick={getRecommendation}
            style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '12px 24px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', width: '100%' }}>
            Get My Recommendation →
          </button>
          {result && <div style={{ marginTop: '16px', backgroundColor: '#0A1628', borderRadius: '8px', padding: '16px', color: '#cbd5e1', fontSize: '15px', lineHeight: '1.6' }}>{result}</div>}
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#F5E642', fontWeight: '700', marginBottom: '8px' }}>🏠 ProLnk Tip</div>
          <div style={{ color: '#94a3b8', fontSize: '14px' }}>ProLnk connects DFW homeowners with vetted concrete lifting specialists who know local clay conditions. Get 3 quotes and compare method + warranty — not just price.</div>
        </div>
      </div>
    </div>
  );
}