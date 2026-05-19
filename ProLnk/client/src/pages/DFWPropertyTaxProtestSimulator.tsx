import { useState } from 'react';

const COUNTIES = ['Dallas County', 'Tarrant County', 'Collin County', 'Denton County', 'Rockwall County', 'Ellis County', 'Kaufman County'];
const COUNTY_RATES = { 'Dallas County': 2.18, 'Tarrant County': 2.26, 'Collin County': 1.87, 'Denton County': 1.92, 'Rockwall County': 1.98, 'Ellis County': 1.81, 'Kaufman County': 1.76 };

const STEPS = [
  { title: 'File a Protest', desc: 'Submit Form 50-132 (Notice of Protest) online at your county appraisal district website by May 15.', icon: '📝' },
  { title: 'Gather Evidence', desc: 'Collect recent sold comps within 0.5 miles, photos of property issues, repair estimates, and any appraisal reports.', icon: '🔍' },
  { title: 'Informal Hearing', desc: 'Meet with an appraiser (virtually or in-person). Bring your comps and evidence. Many protests settle here.', icon: '🤝' },
  { title: 'ARB Hearing', desc: 'If no informal agreement, present your case to the Appraisal Review Board. Be concise and evidence-based.', icon: '⚖️' },
  { title: 'Await Decision', desc: 'ARB issues a written order. You can accept, or escalate to district court or binding arbitration.', icon: '📬' },
];

export default function DFWPropertyTaxProtestSimulator() {
  const [appraisedVal, setAppraisedVal] = useState('');
  const [marketVal, setMarketVal] = useState('');
  const [county, setCounty] = useState('Collin County');
  const [numComps, setNumComps] = useState('3');
  const [hasIssues, setHasIssues] = useState(false);
  const [priorProtest, setPriorProtest] = useState(false);
  const [result, setResult] = useState(null);
  const [activeStep, setActiveStep] = useState(null);

  function simulate() {
    const av = parseFloat(appraisedVal.replace(/,/g, ''));
    const mv = parseFloat(marketVal.replace(/,/g, ''));
    if (!av || av < 50000) return;
    const gap = av - (mv || av * 0.92);
    const gapPct = gap / av;
    let likelihood = 45;
    if (gapPct > 0.05) likelihood += 25;
    if (gapPct > 0.10) likelihood += 15;
    if (parseInt(numComps) >= 3) likelihood += 15;
    if (hasIssues) likelihood += 10;
    if (priorProtest) likelihood -= 8;
    likelihood = Math.min(92, Math.max(20, likelihood));
    const reduction = Math.round(Math.min(gap, av * 0.12) / 500) * 500;
    const rate = COUNTY_RATES[county] / 100;
    const taxSavings = Math.round(reduction * rate);
    setResult({ likelihood, reduction, taxSavings, gapPct: (gapPct * 100).toFixed(1) });
  }

  const fmt = n => n.toLocaleString('en-US');

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ background: '#1a3a5c', color: '#fff', borderRadius: 12, padding: '2rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>⚖️</div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700 }}>DFW Property Tax Protest Simulator</h1>
          <p style={{ margin: '0.5rem 0 0', opacity: 0.8, fontSize: 14 }}>Estimate your protest success odds + potential tax savings</p>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '1rem' }}>
          <h3 style={{ margin: '0 0 1rem', color: '#1a3a5c' }}>🏡 Property Values</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[['CAD Appraised Value ($)', appraisedVal, setAppraisedVal, 'e.g. 520000'], ['Your Estimated Market Value ($)', marketVal, setMarketVal, 'e.g. 470000']].map(([label, val, setter, ph]) => (
              <div key={label}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 4 }}>{label}</label>
                <input value={val} onChange={e => setter(e.target.value)} placeholder={ph} style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1.5px solid #ddd', fontSize: 14, boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 4 }}>County</label>
            <select value={county} onChange={e => setCounty(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1.5px solid #ddd', fontSize: 14 }}>
              {COUNTIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '1rem' }}>
          <h3 style={{ margin: '0 0 1rem', color: '#1a3a5c' }}>📊 Evidence Strength</h3>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 4 }}>Number of comparable sold properties (comps) you have</label>
            <select value={numComps} onChange={e => setNumComps(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1.5px solid #ddd', fontSize: 14 }}>
              {['0','1','2','3','4','5+'].map(n => <option key={n}>{n}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[['🔧 Property has documented issues (roof, foundation, etc.)', hasIssues, setHasIssues], ['📋 You have filed a protest before for this property', priorProtest, setPriorProtest]].map(([label, val, setter]) => (
              <label key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>
                <input type='checkbox' checked={val} onChange={e => setter(e.target.checked)} style={{ width: 16, height: 16 }} />
                {label}
              </label>
            ))}
          </div>
        </div>
        <button onClick={simulate} style={{ width: '100%', background: '#1a3a5c', color: '#F5E642', padding: '14px', borderRadius: 10, border: 'none', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginBottom: '1rem' }}>
          ⚖️ Simulate My Protest Outcome
        </button>
        {result && (
          <div style={{ background: '#1a3a5c', borderRadius: 12, padding: '1.5rem', color: '#fff', marginBottom: '1rem' }}>
            <h3 style={{ margin: '0 0 1rem', color: '#F5E642' }}>📊 Protest Simulation Results</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              {[['Success Likelihood', , result.likelihood >= 65 ? '#4ade80' : result.likelihood >= 45 ? '#F5E642' : '#f87171'], ['Likely Reduction', , '#acd'], ['Annual Tax Savings', , '#4ade80']].map(([label, val, color]) => (
                <div key={label} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color }}>{val}</div>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(245,230,66,0.12)', borderRadius: 8, padding: '0.75rem', fontSize: 13 }}>
              📌 Appraised value is <strong style={{ color: '#F5E642' }}>{result.gapPct}%</strong> above your market estimate — {parseFloat(result.gapPct) >= 10 ? 'strong basis for protest' : parseFloat(result.gapPct) >= 5 ? 'reasonable basis for protest' : 'modest gap, build strong comp evidence'}
            </div>
          </div>
        )}
        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h3 style={{ margin: '0 0 1rem', color: '#1a3a5c' }}>📋 DFW Protest Process — Click to Expand</h3>
          {STEPS.map((step, i) => (
            <div key={i} onClick={() => setActiveStep(activeStep === i ? null : i)} style={{ background: activeStep === i ? '#f0f4ff' : '#f8f9fa', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '0.5rem', cursor: 'pointer', border: activeStep === i ? '1.5px solid #1a3a5c' : '1.5px solid transparent' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: 20 }}>{step.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#1a3a5c' }}>Step {i+1}: {step.title}</div>
                  {activeStep === i && <div style={{ fontSize: 13, color: '#555', marginTop: 6 }}>{step.desc}</div>}
                </div>
                <span style={{ color: '#999', fontSize: 12 }}>{activeStep === i ? '▲' : '▼'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
