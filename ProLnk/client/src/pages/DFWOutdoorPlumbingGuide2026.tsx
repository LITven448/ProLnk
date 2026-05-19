import { useState } from 'react';

export default function DFWOutdoorPlumbingGuide2026() {
  const [feature, setFeature] = useState('');
  const [result, setResult] = useState('');

  const getReqs = () => {
    if (!feature) { setResult('Please select an outdoor feature.'); return; }
    const reqs: Record<string,string> = {
      hosebib: '🚰 Hose Bib Winterization: DFW averages 1–2 hard freezes per year (see Feb 2021). All exterior hose bibs should be frost-free ball-style ($35–70 + $100–150 install). They self-drain when turned off. If you have old sillcock-style bibs, replace them before next winter. Add a vacuum breaker ($15) to prevent backflow — required in most DFW municipalities.',
      kitchen: '🍖 Outdoor Kitchen Plumbing: Requires a building permit from your city (Frisco, Plano, Dallas, etc. all require it). Licensed plumber must run hot + cold supply and a drain line. If adding a sink, a grease trap may be required. Budget $1,500–4,000 for plumbing portion. Weatherproof shutoffs required within 12 inches of each fixture.',
      irrigation: '🌿 Irrigation Backflow Preventer: Required by law in Dallas, Plano, Allen, Frisco, and most DFW cities. Must be tested annually by a licensed irrigator. New installs: $250–500 for a Wilkins 975XL or Watts 007. Annual test: $50–75. Failure to have one = possible water service disconnect from your city.',
      shower: '🌞 Outdoor Shower (DFW): A luxury given the 100°F DFW summers. Cold water only is simple ($400–800). Hot + cold requires a supply run from the house ($800–1,800 depending on distance). A simple drain to a gravel pit is usually allowed — check with your city. No permit required in most DFW jurisdictions for a cold-only outdoor shower.',
      pool: '🏊 Pool Fill Line: A dedicated pool fill line with a backflow preventer is required by most DFW water utilities. Plumber installs a 1-inch copper line with an ASSE 1013 backflow device. Cost: $600–1,200 installed. Some cities require an air gap instead — check with your municipality before digging.',
    };
    setResult(reqs[feature] || 'Select a feature for requirements.');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🌿 DFW PLUMBING GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Outdoor Plumbing Guide for DFW 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>From frost-free bibs to outdoor kitchens, DFW outdoor plumbing has unique requirements. Backflow preventers are legally required across most of the metroplex.</p>

        <div style={{ background: '#1e3a5f', borderRadius: '8px', padding: '1rem', marginBottom: '2rem', borderLeft: '4px solid #F5E642′ }}>
          <strong style={{ color: '#F5E642′ }}>❄️ Post-Winter 2021 Lesson:</strong>
          <span style={{ color: '#bfdbfe' }}> The Feb 2021 freeze damaged 1 in 3 DFW homes with exterior plumbing. Frost-free bibs and proper winterization are now standard requirements for any outdoor water feature.</span>
        </div>

        <div style={{ background: '#1e293b', borderRadius: '10px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Outdoor Feature Requirements</h2>
          <select value={feature} onChange={e=>setFeature(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: '6px', padding: '0.6rem', width: '100%', marginBottom: '1rem' }}>
            <option value="">Select outdoor feature...</option>
            <option value="hosebib">Hose bib winterization</option>
            <option value="kitchen">Outdoor kitchen</option>
            <option value="irrigation">Irrigation backflow preventer</option>
            <option value="shower">Outdoor shower</option>
            <option value="pool">Pool fill line</option>
          </select>
          <button onClick={getReqs} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '6px', padding: '0.7rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>Get Requirements</button>
          {result && <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: '6px', padding: '1rem', color: '#e2e8f0′ }}>{result}</div>}
        </div>

        <div style={{ background: '#1e293b', borderRadius: '10px', padding: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>📋 DFW Outdoor Plumbing Checklist</h3>
          {['All exterior hose bibs should be frost-free ball-type — especially post-2021','Irrigation backflow preventer required + annual test in most DFW cities','Outdoor kitchen plumbing requires a permit in virtually all DFW municipalities','Any outdoor water feature needs a shutoff inside the heated envelope of the home'].map((s,i)=>(
            <div key={i} style={{ display: 'flex', gap: '0.7rem', marginBottom: '0.5rem' }}>
              <span style={{ color: '#F5E642′ }}>✓</span>
              <span style={{ color: '#cbd5e1′ }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
