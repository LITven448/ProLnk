import { useState } from 'react';

export default function DFWPolybutyleneGuide2026() {
  const [yearBuilt, setYearBuilt] = useState('');
  const [result, setResult] = useState('');

  const assess = () => {
    const yr = parseInt(yearBuilt);
    if (!yearBuilt || isNaN(yr)) { setResult('Enter a valid year.'); return; }
    if (yr < 1978) setResult('✅ Built before 1978 — PB pipe was not used in this era. Your home likely has copper or galvanized steel.');
    else if (yr <= 1986) setResult('🟡 Built 1978–1986 — PB pipe was common in DFW tract homes during this period. HIGH risk. Inspect under sinks and in utility room for gray pipe with blue/gray fittings. If found, budget for replacement.');
    else if (yr <= 1995) setResult('🔴 Built 1987–1995 — PEAK PB era. Very high probability your home has polybutylene. Class action settlement covered replacement (Cox v. Shell Oil, 1995) but many DFW homeowners missed the deadline. Get an inspection immediately.');
    else if (yr <= 2000) setResult('🟠 Built 1996–2000 — PB was phased out but some builders used remaining stock. Lower risk but still inspect. Look for gray/blue pipe + metal or plastic fittings with insert connections.');
    else setResult('✅ Built after 2000 — PB pipe was no longer installed. Your home should have copper, CPVC, or PEX plumbing.');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>ProLnk DFW Plumbing Guide 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>⚠️ DFW Polybutylene Pipe Guide 2026</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>Polybutylene (PB) was installed in hundreds of thousands of DFW homes — and it fails without warning. Here's what you need to know.</p>

        {[
          { icon: '📅', title: 'When It Was Installed', body: 'Polybutylene pipe was used in DFW residential construction from approximately 1978 to 1995. It was cheap, easy to install, and widely promoted as the future of home plumbing — until catastrophic failures began appearing nationwide.' },
          { icon: '🔍', title: 'How to Identify PB Pipe', body: 'Gray, blue-gray, or black flexible plastic pipe. Fittings are metal (copper or aluminum) or gray/white plastic with insert connections (not solvent-welded like CPVC). Usually found under sinks, in utility closets, or in the attic.' },
          { icon: '💣', title: 'Why It Fails', body: 'Chlorine and chloramine in municipal water (including DFW’s water) degrades PB from the inside out. The pipe becomes brittle and develops micro-fractures. Failures are sudden — a small stress (water hammer, temperature change) can split the pipe without warning.' },
          { icon: '⚖️', title: 'The Class Action Settlement', body: 'Cox v. Shell Oil (1995) established a fund for PB replacement. The settlement claim period ended in 2007. If your DFW home still has PB, replacement is now fully out-of-pocket. Disclosure required when selling.' },
          { icon: '🔧', title: 'Replacement Options', body: 'PEX (cross-linked polyethylene) is the most common replacement in DFW — flexible, handles temperature swings, compatible with DFW hard water. Whole-home repipe with PEX: $3,500–$8,000 depending on home size and access.' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#132035', borderRadius: 12, padding: '20px', marginBottom: 16 }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>{c.icon} <strong>{c.title}</strong></div>
            <div style={{ color: '#CBD5E1', lineHeight: 1.6 }}>{c.body}</div>
          </div>
        ))}

        <div style={{ background: '#132035', borderRadius: 12, padding: '24px' }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16 }}>🏠 PB Risk Assessment by Build Year</h2>
          <p style={{ color: '#94A3B8', marginBottom: 12 }}>Enter your home's year of construction:</p>
          <input value={yearBuilt} onChange={e => setYearBuilt(e.target.value)} type="number" placeholder="e.g. 1989" style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1px solid #1E3A5F', background: '#0A1628', color: '#fff', marginBottom: 12, boxSizing: 'border-box' }} />
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, cursor: 'pointer' }}>
            Check My Risk
          </button>
          {result && <div style={{ marginTop: 16, padding: '16px', background: '#0A1628', borderRadius: 8, color: '#F5E642', lineHeight: 1.6 }}>{result}</div>}
        </div>

        <div style={{ marginTop: 32, padding: '20px', background: '#132035', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Get a PB inspection or repipe quote in DFW</div>
          <div style={{ color: '#94A3B8' }}>ProLnk connects you with licensed plumbers who specialize in polybutylene replacement — free quotes.</div>
        </div>
      </div>
    </div>
  );
}