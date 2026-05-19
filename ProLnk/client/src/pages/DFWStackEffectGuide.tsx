import { useState } from 'react';

export default function DFWStackEffectGuide() {
  const [homeHeight, setHomeHeight] = useState('');
  const [season, setSeason] = useState('');
  const [result, setResult] = useState<null | { impact: string; sealWhere: string[]; priority: string }>(null);

  function assess() {
    const floors = parseFloat(homeHeight) || 1;
    const s = season.toLowerCase();
    let impact = 'Moderate stack effect';
    let sealWhere = ['Attic top plates', 'Recessed lights', 'Electrical outlets on exterior walls'];
    let priority = 'Seal the attic plane — it is the top of the stack and drives the most airflow.';

    if (s.includes('summer') || s.includes('hot')) {
      impact = 'Reverse stack effect — hot outside air enters at low points';
      sealWhere = ['Crawl space vents & rim joists', 'Bottom plates on slab', 'Under-door gaps', 'Low electrical outlets', 'Garage-to-house door'];
      priority = 'DFW summer reverses normal stack. Seal low points — exterior doors, under-slab penetrations, and garage entry — first.';
    } else if (floors >= 2) {
      impact = 'Amplified stack effect — taller homes have larger pressure differential';
      sealWhere = ['Attic top plates', 'Inter-floor chases (plumbing, wiring runs)', 'Stairwell ceiling penetrations', 'Recessed lights on top floor'];
      priority = 'Two-story homes have 2x the pressure differential. Seal the attic plane and all inter-floor bypasses.';
    }
    setResult({ impact, sealWhere, priority });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Energy Series</div>
        <h1 style={{ fontSize: 34, fontWeight: 800, color: '#fff', marginBottom: 8, lineHeight: 1.2 }}>DFW Stack Effect Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32 }}>Stack effect is the invisible pressure system inside your home that constantly pumps air in and out. DFW's extreme heat creates a unique reverse stack effect in summer that most homeowners never consider.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🔄 How Stack Effect Works</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>Stack effect (chimney effect) occurs because warm air rises. In winter, warm interior air escapes through the top of your home and cold outdoor air is drawn in at the bottom. The taller your home and the greater the indoor-outdoor temperature difference, the stronger the effect.</p>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, marginBottom: 16 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📐 Stack Pressure Formula</div>
            <div style={{ color: '#94a3b8', fontSize: 14 }}>Pressure ∝ Height × ΔTemperature. A 2-story DFW home with 30°F indoor-outdoor delta generates twice the stack pressure of a single-story with the same delta.</div>
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>☀️ DFW's Reverse Stack Effect</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>Here is where DFW is different: in July and August, outside air is 100–108°F and your home is 74–78°F. The air OUTSIDE is hotter than inside. This reverses the stack — hot outside air now wants to enter at the bottom of your home and cooler interior air escapes at the top.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            {[
              { season: 'Winter (normal)', flow: 'Heat rises, exits at top; cold enters at bottom', seal: 'Attic plane is priority' },
              { season: 'Summer DFW (reverse)', flow: 'Hot outside air enters at bottom; cool inside air exits at top', seal: 'Low points: slab gaps, doors, crawl vents' },
            ].map(item => (
              <div key={item.season} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6, fontSize: 13 }}>{item.season}</div>
                <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>{item.flow}</div>
                <div style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 600 }}>→ {item.seal}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🏗️ Attic vs. Slab — Where to Seal in DFW</h2>
          {[
            { title: 'Attic Plane (top of stack)', when: 'Year-round priority', desc: 'Seal where interior walls meet the attic floor. This is the interface between conditioned space and the hottest air in DFW (140–160°F attic).' },
            { title: 'Slab & Low Points (bottom of stack)', when: 'Critical for DFW summer', desc: 'Penetrations through your slab or bottom plates are where reverse stack effect draws in hot outside air. Foam and caulk all floor-level penetrations.' },
            { title: 'Inter-floor Bypasses (2-story)', when: 'All seasons', desc: 'Plumbing chases, wiring runs, and stairwell openings connect floors and amplify the stack column. Seal these to break the stack pathway.' },
          ].map(item => (
            <div key={item.title} style={{ marginBottom: 16, padding: 14, background: '#0A1628', borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <div style={{ fontWeight: 600, color: '#e2e8f0' }}>{item.title}</div>
                <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700 }}>{item.when}</div>
              </div>
              <div style={{ fontSize: 14, color: '#94a3b8' }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🧮 DFW Stack Effect Assessor</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Number of Floors</label>
              <input value={homeHeight} onChange={e => setHomeHeight(e.target.value)} placeholder="e.g. 1 or 2" style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Problem Season</label>
              <input value={season} onChange={e => setSeason(e.target.value)} placeholder="e.g. summer, winter, both" style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer' }}>Assess My DFW Stack Effect →</button>
          {result && (
            <div style={{ marginTop: 20, padding: 16, background: '#1a2a3a', borderRadius: 8, borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Impact: {result.impact}</div>
              <div style={{ color: '#e2e8f0', fontWeight: 600, marginBottom: 6 }}>Priority guidance:</div>
              <div style={{ color: '#94a3b8', fontSize: 14, marginBottom: 10 }}>{result.priority}</div>
              <div style={{ color: '#e2e8f0', fontWeight: 600, marginBottom: 6 }}>Where to seal:</div>
              {result.sealWhere.map(p => <div key={p} style={{ color: '#94a3b8', fontSize: 14, marginBottom: 4 }}>• {p}</div>)}
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🏠 Get DFW Air Sealing Quotes</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>ProLnk matches you with DFW pros who understand stack effect and can run blower door tests to verify before-and-after results.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer' }}>Get Free DFW Quotes →</button>
        </div>
      </div>
    </div>
  );
}
