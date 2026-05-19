import { useState } from 'react';

export default function DFWAtticHatchGuide() {
  const [hatchType, setHatchType] = useState('');
  const [problem, setProblem] = useState('');
  const [result, setResult] = useState<null | { solution: string; cost: string; savings: string; steps: string[] }>(null);

  function assess() {
    const ht = hatchType.toLowerCase();
    const pr = problem.toLowerCase();
    let solution = '';
    let cost = '';
    let savings = '';
    let steps: string[] = [];

    if (ht.includes('pull') || ht.includes('folding') || ht.includes('stair')) {
      solution = 'Attic Stair Cover Kit (highest priority)';
      cost = '$50 – $150 DIY kit, or $300 – $600 installed';
      savings = '$15 – $35/month in DFW summers';
      steps = [
        'Purchase an insulated attic stair cover kit (R-50+ recommended for DFW)',
        'Weatherstrip the stair frame perimeter — gaps here are the biggest leak',
        'Install the cover box over stairs in the attic space',
        'Optional: Add rigid foam board on top of cover box for additional R-value',
        'Test: hold incense near stair edges on a hot day — smoke drift reveals air leaks',
      ];
    } else if (ht.includes('scuttle') || ht.includes('ceiling') || ht.includes('hatch')) {
      solution = 'Rigid Foam Lid + Weatherstripping';
      cost = '$20 – $60 DIY materials';
      savings = '$8 – $20/month in DFW summers';
      steps = [
        'Cut a piece of 2" polyiso rigid foam to fit the hatch opening (R-13 per inch)',
        'Add 3" polyiso for R-20+ — ideal for DFW\’s 150°F attic temperatures',
        'Glue foam layers together if stacking for added R-value',
        'Attach foam adhesive-backed weatherstripping to the hatch frame',
        'Add a latch or simple hook to pull hatch tight against weatherstripping',
      ];
    } else if (pr.includes('hot') || pr.includes('heat') || pr.includes('ceiling')) {
      solution = 'Weatherstrip + Insulation Cover — DFW Priority Fix';
      cost = '$30 – $80 DIY';
      savings = '$12 – $28/month in DFW summers';
      steps = [
        'Inspect the hatch frame for gaps — a lit incense stick on a hot day will show air movement',
        'Apply foam weatherstripping tape to all four sides of the hatch frame',
        'Cut rigid polyiso insulation to hatch size, secure with spray adhesive',
        'For scuttle hatches: add a simple rope pull to cinch hatch tight against new weatherstripping',
        'Get a DFW energy auditor to verify with thermal camera — small investment for big ROI',
      ];
    } else {
      solution = 'Standard Foam + Weatherstrip Solution';
      cost = '$25 – $75 DIY';
      savings = '$10 – $25/month in DFW summers';
      steps = [
        'Measure your attic hatch opening precisely',
        'Cut 2–4" rigid polyiso foam board to fit (stack layers for higher R-value)',
        'Apply weatherstripping tape to hatch frame perimeter',
        'Place foam on top of hatch when closed (or build a simple plywood box in the attic)',
        'Verify seal by feeling for air movement on a hot DFW afternoon',
      ];
    }
    setResult({ solution, cost, savings, steps });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Energy Series</div>
        <h1 style={{ fontSize: 34, fontWeight: 800, color: '#fff', marginBottom: 8, lineHeight: 1.2 }}>DFW Attic Hatch Insulation Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32 }}>Your attic access hatch is one of the single biggest energy leaks in a DFW home. A 150°F attic separated from a 78°F living space by a thin piece of drywall is a constant, invisible energy drain.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🌡️ The DFW Attic Hatch Problem</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>In DFW summer, your attic reaches 140–160°F. Your house sits at 75–78°F. That 70–80°F temperature difference, combined with an uninsulated or unsealed hatch, creates two simultaneous problems: <strong style={{ color: '#e2e8f0' }}>conductive heat transfer</strong> (heat passing through the thin drywall) and <strong style={{ color: '#e2e8f0' }}>air leakage</strong> (hot attic air flowing through gaps around the frame).</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              { label: 'Uninsulated hatch R-value', value: 'R-1 to R-3' },
              { label: 'DFW code wall R-value', value: 'R-13 minimum' },
              { label: 'DFW attic summer temp', value: '140–160°F' },
            ].map(item => (
              <div key={item.label} style={{ background: '#0A1628', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>{item.label}</div>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🔧 Three DFW Hatch Solutions</h2>
          {[
            { type: 'Scuttle Hatch (ceiling cutout)', solution: 'Rigid foam lid + weatherstrip tape', cost: '$20–60', when: 'Best for small square/rectangular hatches' },
            { type: 'Pull-Down Stair', solution: 'Insulated attic stair cover kit', cost: '$50–150 DIY / $300–600 installed', when: 'Stairs = biggest leak. Cover kit is non-negotiable in DFW.' },
            { type: 'Walk-In Attic Door', solution: 'Weatherstripped insulated door + door sweep', cost: '$150–400', when: 'Treat it like an exterior door — full weatherstripping and R-5+ door insulation.' },
          ].map(item => (
            <div key={item.type} style={{ marginBottom: 14, padding: 14, background: '#0A1628', borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <div style={{ fontWeight: 600, color: '#e2e8f0' }}>{item.type}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{item.cost}</div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>{item.solution}</div>
              <div style={{ color: '#64748b', fontSize: 12 }}>{item.when}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🧮 DFW Attic Hatch Fix Advisor</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Hatch Type</label>
              <input value={hatchType} onChange={e => setHatchType(e.target.value)} placeholder="e.g. scuttle, pull-down stairs, door" style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>DFW Problem</label>
              <input value={problem} onChange={e => setProblem(e.target.value)} placeholder="e.g. hot ceiling, high bills, drafts" style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer' }}>Get My DFW Hatch Fix Plan →</button>
          {result && (
            <div style={{ marginTop: 20, padding: 16, background: '#1a2a3a', borderRadius: 8, borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{result.solution}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>Cost: <strong style={{ color: '#e2e8f0' }}>{result.cost}</strong></div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>Estimated DFW savings: <strong style={{ color: '#F5E642' }}>{result.savings}</strong></div>
              <div style={{ color: '#e2e8f0', fontWeight: 600, marginBottom: 8 }}>Step-by-step for your DFW home:</div>
              {result.steps.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, minWidth: 20 }}>{i + 1}.</div>
                  <div style={{ color: '#94a3b8', fontSize: 14 }}>{s}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🏠 Get DFW Insulation & Air Sealing Quotes</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>ProLnk connects you with DFW pros who handle attic hatches, air sealing, and insulation upgrades. Most hatch fixes pay back in under 2 years in DFW's climate.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer' }}>Get Free DFW Quotes →</button>
        </div>
      </div>
    </div>
  );
}
