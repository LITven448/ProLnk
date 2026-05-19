import { useState } from 'react';

type Result = { likelihood: string; color: string; details: string[]; remedies: string[]; disclosure: string };

const results: Record<string, Result> = {
  'pre1985-gray-gray': { likelihood: 'Very High', color: '#ef4444', details: ['Gray flexible pipe with gray plastic fittings is the primary poly-B indicator', 'Pre-1985 DFW homes are within the core poly-B installation window', 'Acetal resin fittings crack and fail — the most common failure point'], remedies: ['Shell Oil class action (Cox v. Shell) settlements largely expired but document everything', 'Check your homeowners insurance — some carriers still offer coverage', 'Full repipe is the only reliable solution — budget ,000–,000 for DFW homes'], disclosure: 'Texas law requires disclosure of known poly-B to buyers. Failure to disclose is grounds for rescission.' },
  'pre1985-gray-copper': { likelihood: 'High', color: '#ef4444', details: ['Gray pipe with copper crimp rings is classic poly-B configuration', 'The pipe itself is the issue even if fittings look metallic', 'Copper crimps do not prevent chlorine degradation of pipe wall'], remedies: ['Full documentation recommended for insurance purposes', 'Repipe priority: bathrooms and kitchen supply lines first', 'Get multiple DFW repipe quotes — prices vary widely'], disclosure: 'Disclose known poly-B presence in all Texas real estate transactions regardless of age.' },
  'pre1985-gray-blue': { likelihood: 'Very High', color: '#ef4444', details: ['Blue acetal fittings are a definitive poly-B marker', 'Blue fittings were used in later poly-B installations to indicate water type', 'This combination has the highest failure rate in DFW inspection data'], remedies: ['Immediate repipe consultation recommended', 'Blue fitting failures often cause sudden catastrophic leaks', 'Document with photos before any insurance or disclosure conversation'], disclosure: 'Full disclosure required. Blue acetal fittings are a known defect in Texas real estate law.' },
  '1985to1995-gray-gray': { likelihood: 'High', color: '#f59e0b', details: ['Mid-period poly-B installations common in DFW suburbs like Plano and Garland', 'Pipe may have degraded internally even if exterior looks acceptable', 'Internal oxidation from chlorinated water is not visible externally'], remedies: ['Schedule leak detection inspection — internal damage shows on pressure tests', 'Begin budgeting for repipe — most mid-period systems are at end of life', 'Check water heater connections first — highest failure concentration'], disclosure: 'Disclose to buyers and inform your insurance carrier if not already noted.' },
  '1985to1995-gray-copper': { likelihood: 'Moderate-High', color: '#f59e0b', details: ['Copper crimps with gray pipe — probable poly-B installation', 'Request pressure test and internal pipe inspection before assuming condition', 'DFW water hardness accelerates interior scale buildup hiding degradation'], remedies: ['Professional leak detection within 90 days', 'Insurance review for coverage gaps on poly-B systems', 'Staged repipe approach possible to spread cost'], disclosure: 'Disclose if identified — moderate-high likelihood warrants documentation.' },
  'post1995-gray-gray': { likelihood: 'Low', color: '#22c55e', details: ['Poly-B production ended in 1995 — post-1995 homes should not have it', 'Gray flexible pipe post-1995 may be PEX or other approved material', 'Verify with a licensed plumber before assuming poly-B'], remedies: ['No poly-B remedies needed if confirmed non-poly-B', 'PEX is an acceptable modern alternative', 'Document pipe material for home records'], disclosure: 'No disclosure required if pipe is confirmed non-poly-B.' },
  'post1995-gray-blue': { likelihood: 'Low', color: '#22c55e', details: ['Post-1995 installation with blue fittings may be PEX with blue end caps', 'PEX uses different fitting systems and is not a defect', 'Color alone does not confirm poly-B in post-1995 construction'], remedies: ['Have a plumber verify pipe material with simple identification test', 'PEX requires no action', 'Update home records with confirmed pipe material'], disclosure: 'No disclosure required if confirmed as PEX or approved modern material.' },
};

export default function DFWPolybutyleneClaims() {
  const [era, setEra] = useState('');
  const [pipeColor, setPipeColor] = useState('');
  const [fittingColor, setFittingColor] = useState('');
  const key = era && pipeColor && fittingColor ? era + '-' + pipeColor + '-' + fittingColor : '';
  const result = key && results[key] ? results[key] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif', color: '#e2e8f0' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>DFW PLUMBING GUIDE</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '1rem', color: '#fff' }}>🪛 Polybutylene Pipe Guide for DFW Homeowners</h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
            Polybutylene (poly-B) pipe was installed in millions of US homes between 1978 and 1995 — and DFW was heavily affected.
            The pipe reacts with chlorine in municipal water, causing internal degradation that leads to sudden, catastrophic failure.
            Use this guide to identify poly-B in your home and understand your options.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🔘', title: 'Pipe Color', desc: 'Poly-B pipe is typically gray, but may appear silver or black. Blue or red means PEX — not poly-B.' },
            { icon: '🔩', title: 'Fitting Color', desc: 'Gray, aluminum, blue, or black plastic fittings indicate poly-B. Copper crimps can appear with poly-B pipe.' },
            { icon: '📍', title: 'Where to Look', desc: 'Behind toilets, under sinks, near water heater, in utility closets, and in crawl spaces.' },
            { icon: '📅', title: 'Timeline', desc: 'Homes built 1978–1995 in DFW are at risk. Peak installations were 1985–1993 in suburban DFW.' },
          ].map((c, i) => (
            <div key={i} style={{ background: '#0f1e35', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{c.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: '0.88rem', marginBottom: '0.3rem' }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1e35', borderRadius: '16px', padding: '1.75rem', marginBottom: '2rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1.25rem', fontSize: '1.1rem' }}>🔎 Poly-B Likelihood Checker</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.35rem' }}>Home Build Era</label>
              <select value={era} onChange={e => setEra(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: '8px', color: '#e2e8f0', padding: '0.55rem', fontSize: '0.85rem' }}>
                <option value=''>Select...</option>
                <option value='pre1985'>Before 1985</option>
                <option value='1985to1995'>1985 – 1995</option>
                <option value='post1995'>After 1995</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.35rem' }}>Pipe Color</label>
              <select value={pipeColor} onChange={e => setPipeColor(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: '8px', color: '#e2e8f0', padding: '0.55rem', fontSize: '0.85rem' }}>
                <option value=''>Select...</option>
                <option value='gray'>Gray / Silver</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.35rem' }}>Fitting Color</label>
              <select value={fittingColor} onChange={e => setFittingColor(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: '8px', color: '#e2e8f0', padding: '0.55rem', fontSize: '0.85rem' }}>
                <option value=''>Select...</option>
                <option value='gray'>Gray Plastic</option>
                <option value='copper'>Copper / Brass</option>
                <option value='blue'>Blue Plastic</option>
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: '12px', padding: '1.25rem', border: `2px solid ${result.color}` }}>
              <div style={{ fontWeight: 700, color: result.color, fontSize: '1rem', marginBottom: '1rem' }}>Poly-B Likelihood: {result.likelihood}</div>
              <div style={{ marginBottom: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Key Findings</div>
                <ul style={{ margin: 0, padding: '0 0 0 1.2rem' }}>{result.details.map((d, i) => <li key={i} style={{ color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.3rem' }}>{d}</li>)}</ul>
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Available Remedies</div>
                <ul style={{ margin: 0, padding: '0 0 0 1.2rem' }}>{result.remedies.map((r, i) => <li key={i} style={{ color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '0.3rem' }}>{r}</li>)}</ul>
              </div>
              <div style={{ padding: '0.75rem', background: '#0f1e35', borderRadius: '8px', color: '#94a3b8', fontSize: '0.82rem' }}>
                📋 <strong style={{ color: '#F5E642' }}>Disclosure:</strong> {result.disclosure}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
