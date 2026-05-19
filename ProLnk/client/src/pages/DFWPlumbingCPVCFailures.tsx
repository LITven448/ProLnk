import { useState } from 'react';

const riskData: Record<string, { risk: string; color: string; points: string[]; urgency: string }> = {
  'pre1990-attic': { risk: 'Low', color: '#22c55e', points: ['Most pre-1990 DFW homes used copper or galvanized', 'Verify pipe material before assuming CPVC'], urgency: 'Schedule routine inspection within 2 years' },
  'pre1990-crawl': { risk: 'Low', color: '#22c55e', points: ['Pre-1990 construction rarely used CPVC', 'Check for any partial CPVC retrofits'], urgency: 'No immediate action required' },
  '1990s-attic': { risk: 'High', color: '#ef4444', points: ['Peak CPVC installation era in DFW', 'Attic UV and heat cycles cause rapid embrittlement', 'Check near skylights and roof penetrations', 'Inspect all joints for micro-cracking'], urgency: 'Schedule professional inspection within 90 days' },
  '1990s-crawl': { risk: 'Moderate', color: '#f59e0b', points: ['1990s CPVC approaching end of rated lifespan', 'Crawl space moisture can accelerate degradation', 'Chemical exposure from soil contact possible'], urgency: 'Inspect within 6 months' },
  '2000s-attic': { risk: 'High', color: '#ef4444', points: ['DFW attic temps can exceed 160°F in summer', 'UV through attic penetrations causes brittleness', 'Chloramine in DFW water supply degrades CPVC', 'Insulate all attic CPVC runs immediately'], urgency: 'Inspect within 60 days — high failure risk' },
  '2000s-crawl': { risk: 'Moderate', color: '#f59e0b', points: ['2000s CPVC still within rated life but watch closely', 'Avoid contact with drain cleaner and solvents', 'Check for discoloration or flaking at joints'], urgency: 'Annual inspection recommended' },
  'post2010-attic': { risk: 'Moderate', color: '#f59e0b', points: ['Newer CPVC formulations more UV-resistant', 'DFW attic conditions still reduce lifespan', 'Thermal expansion cycles stress fittings'], urgency: 'Inspect every 2 years' },
  'post2010-crawl': { risk: 'Low', color: '#22c55e', points: ['Newer CPVC within rated service life', 'Monitor for chemical cleaning product exposure', 'Document pipe locations for future reference'], urgency: 'Standard 3-year inspection cycle' },
};

export default function DFWPlumbingCPVCFailures() {
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const result = age && location ? riskData[age + '-' + location] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif', color: '#e2e8f0′ }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>DFW PLUMBING GUIDE</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '1rem', color: '#fff' }}>🔧 CPVC Pipe Failure Guide for DFW</h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
            CPVC (Chlorinated Polyvinyl Chloride) was the dominant pipe material in DFW residential construction from the early 1990s through mid-2000s.
            DFW's extreme summer heat, intense UV exposure through attic penetrations, and chloramine-treated municipal water create failure conditions
            not seen in other climates. Here is what you need to know.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '☀️', title: 'DFW Attic Heat', desc: 'Attic temps exceed 160°F in summer, far above CPVC’s rated threshold' },
            { icon: '🔵', title: 'Chloramine Water', desc: 'DFW uses chloramine disinfection which degrades CPVC fittings over time' },
            { icon: '🧪', title: 'Chemical Risk', desc: 'Common drain cleaners and certain oils dissolve CPVC from outside' },
          ].map((c, i) => (
            <div key={i} style={{ background: '#0f1e35', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{c.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.25rem', fontSize: '0.9rem' }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1e35', borderRadius: '16px', padding: '1.75rem', marginBottom: '2rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1.25rem', fontSize: '1.1rem' }}>🔍 Failure Risk Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.82rem', marginBottom: '0.4rem' }}>Home Construction Era</label>
              <select value={age} onChange={e => setAge(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: '8px', color: '#e2e8f0', padding: '0.6rem' }}>
                <option value=''>Select era...</option>
                <option value='pre1990'>Pre-1990</option>
                <option value='1990s'>1990s</option>
                <option value='2000s'>2000s</option>
                <option value='post2010'>Post-2010</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.82rem', marginBottom: '0.4rem' }}>Pipe Location</label>
              <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: '8px', color: '#e2e8f0', padding: '0.6rem' }}>
                <option value=''>Select location...</option>
                <option value='attic'>Attic / Roof Area</option>
                <option value='crawl'>Crawl Space / Under Floor</option>
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: '12px', padding: '1.25rem', border: `2px solid ${result.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ background: result.color, color: '#0A1628', padding: '0.2rem 0.75rem', borderRadius: '999px', fontWeight: 700, fontSize: '0.85rem' }}>{result.risk} Risk</span>
              </div>
              <ul style={{ margin: 0, padding: '0 0 0 1.2rem' }}>
                {result.points.map((p, i) => <li key={i} style={{ color: '#cbd5e1', fontSize: '0.88rem', marginBottom: '0.4rem' }}>{p}</li>)}
              </ul>
              <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#0f1e35', borderRadius: '8px', color: '#F5E642', fontSize: '0.85rem', fontWeight: 600 }}>
                ⏱ {result.urgency}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f1e35', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem', fontSize: '0.95rem' }}>⚠️ Chemical Incompatibility Warning</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
            Never use petroleum-based lubricants, solvent-based cleaners, or citrus degreasers near CPVC pipes.
            These substances cause a process called environmental stress cracking — the pipe appears intact but fails catastrophically under water pressure.
            Always check product labels before using near CPVC supply lines.
          </p>
        </div>
      </div>
    </div>
  );
}
