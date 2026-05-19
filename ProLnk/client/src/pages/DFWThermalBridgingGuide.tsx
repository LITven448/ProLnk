import { useState } from 'react';

export default function DFWThermalBridgingGuide() {
  const [wallType, setWallType] = useState('');
  const [problem, setProblem] = useState('');
  const [result, setResult] = useState<null | { severity: string; solution: string; cost: string }>(null);

  function assess() {
    const wt = wallType.toLowerCase();
    const pr = problem.toLowerCase();
    let severity = 'Moderate';
    let solution = 'Add R-5 continuous rigid foam over studs + house wrap';
    let cost = '$3,000 – $6,000 for 1,500 sq ft exterior';
    if (wt.includes('metal') || wt.includes('steel')) {
      severity = 'Severe';
      solution = 'Metal studs are 300–400x more conductive than wood. Install R-10+ continuous foam outboard of framing. Consider flash-and-batt interior.';
      cost = '$6,000 – $12,000 depending on scope';
    } else if (pr.includes('hot spot') || pr.includes('humid')) {
      severity = 'High';
      solution = 'Thermal bridging at studs is causing condensation risk in DFW humidity. Add exterior continuous insulation + vapor-smart retarder.';
      cost = '$4,000 – $8,000';
    } else if (wt.includes('wood') || wt.includes('frame')) {
      severity = 'Moderate';
      solution = 'Wood studs conduct ~3x vs. cavity insulation. R-5 polyiso outboard reduces thermal bridging by 40–60%.';
      cost = '$3,000 – $6,000';
    }
    setResult({ severity, solution, cost });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Energy Series</div>
        <h1 style={{ fontSize: 34, fontWeight: 800, color: '#fff', marginBottom: 8, lineHeight: 1.2 }}>DFW Thermal Bridging Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32 }}>Even a perfectly insulated wall has studs — and those studs conduct heat right through your insulation. In DFW's 100°F summers, thermal bridges quietly drive up your energy bill.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🔥 What Is Thermal Bridging?</h2>
          <p style={{ color: '#94a3b8', marginBottom: 12 }}>Thermal bridging occurs when a material with high thermal conductivity creates a direct path through your insulation layer. In a standard 2x4 wood-framed wall with R-13 batts, the actual whole-wall R-value drops to ~R-9 because the studs (comprising 25% of wall area) conduct heat at R-4.5.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Wood stud conductivity', value: '~R-4.5 per 3.5″' },
              { label: 'Metal stud conductivity', value: '300–400x worse than wood' },
              { label: 'Whole-wall R loss (wood)', value: '~30% of nominal R' },
              { label: 'Whole-wall R loss (metal)', value: '50–60% of nominal R' },
            ].map(item => (
              <div key={item.label} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🏗️ DFW's Metal Framing Problem</h2>
          <p style={{ color: '#94a3b8', marginBottom: 12 }}>DFW commercial construction and many townhomes built post-2000 use steel framing. Steel conducts heat 400x faster than wood. In a DFW summer, steel studs become hot rails driving 150°F attic heat directly into your conditioned space — destroying the R-value of any cavity insulation.</p>
          {[
            { step: '1', title: 'Identify your framing', desc: 'Tap walls. Metal framing sounds hollow and tinny. Check garage walls — steel framing is visible there.' },
            { step: '2', title: 'Add continuous exterior insulation', desc: 'Install polyiso or XPS rigid foam board over the entire exterior sheathing, outboard of studs. R-5 to R-10 recommended for DFW.' },
            { step: '3', title: 'Consider interior flash-and-batt', desc: '1″ closed-cell spray foam against exterior sheathing + fiberglass batts fills the cavity and blocks air movement that worsens bridging.' },
          ].map(item => (
            <div key={item.step} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#F5E642', color: '#0A1628', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.step}</div>
              <div><div style={{ fontWeight: 600, color: '#e2e8f0', marginBottom: 4 }}>{item.title}</div><div style={{ fontSize: 14, color: '#94a3b8′ }}>{item.desc}</div></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🧮 DFW Thermal Bridging Assessor</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Wall/Framing Type</label>
              <input value={wallType} onChange={e => setWallType(e.target.value)} placeholder="e.g. wood frame, metal stud" style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>DFW Energy Problem</label>
              <input value={problem} onChange={e => setProblem(e.target.value)} placeholder="e.g. hot spots, high bills, humidity" style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer' }}>Assess My DFW Walls →</button>
          {result && (
            <div style={{ marginTop: 20, padding: 16, background: '#1a2a3a', borderRadius: 8, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Severity: {result.severity}</div>
              <div style={{ color: '#cbd5e1', marginBottom: 8 }}>{result.solution}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>Estimated cost: <strong style={{ color: '#F5E642′ }}>{result.cost}</strong></div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🏠 Get DFW Thermal Bridging Quotes</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>ProLnk connects you with DFW insulation pros experienced with continuous insulation systems and metal framing solutions.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer' }}>Get Free DFW Quotes →</button>
        </div>
      </div>
    </div>
  );
}
