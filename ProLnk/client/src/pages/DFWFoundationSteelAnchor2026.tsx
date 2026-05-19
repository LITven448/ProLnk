import { useState } from 'react';

export default function DFWFoundationSteelAnchor2026() {
  const [wallSituation, setWallSituation] = useState('');
  const [result, setResult] = useState('');

  const situations = [
    { id: 'bow_basement', label: '🏠 Bowing Basement Wall' },
    { id: 'retaining', label: '🧱 Failing Retaining Wall' },
    { id: 'crack_horizontal', label: '↔️ Horizontal Cracks in Foundation Wall' },
    { id: 'crack_vertical', label: '↕️ Vertical Foundation Cracks' },
    { id: 'slab', label: '🏗️ Slab Foundation (No Basement)' },
  ];

  const results: Record<string, { verdict: string; detail: string; color: string }> = {
    bow_basement: { verdict: 'Wall Anchors Apply — With Caveats', detail: 'Bowing basement walls are rare in DFW (most homes are slab). Where basements exist, helical wall anchors driven horizontally into stable soil can halt movement. Carbon fiber strips handle minor bowing under 2 inches. Engineer assessment mandatory.', color: '#F5E642′ },
    retaining: { verdict: 'Wall Anchors Highly Applicable', detail: 'DFW retaining walls commonly fail due to expansive clay soil pressure after heavy rain. Helical wall anchors driven perpendicular to wall into deadman anchors are standard repair. Tieback anchors used for taller retaining walls.', color: '#22c55e' },
    crack_horizontal: { verdict: 'Immediate Engineering Assessment', detail: 'Horizontal cracks in foundation walls indicate lateral soil pressure — the most serious crack type. Wall anchors may be needed but structural engineer must assess immediately. Do not delay — horizontal cracks can lead to wall collapse.', color: '#ef4444′ },
    crack_vertical: { verdict: 'Wall Anchors Likely NOT Needed', detail: 'Vertical cracks typically indicate settlement, not lateral pressure. Wall anchors address lateral force — they do not stabilize settlement. Vertical cracks in DFW are usually addressed with underpinning (piers), not wall anchors.', color: '#3b82f6′ },
    slab: { verdict: 'Wall Anchors Do Not Apply', detail: 'Steel wall anchors are for vertical foundation walls (basement or retaining walls). DFW slab foundations have no basement walls to anchor. Foundation issues on slabs are addressed with pier systems (helical, steel push, or bell-bottom).', color: '#94a3b8′ },
  };

  const handleCheck = () => {
    if (wallSituation && results[wallSituation]) setResult(wallSituation);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🏗️ DFW FOUNDATION GUIDE 2026</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>Foundation Wall Anchor Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Steel wall anchors address lateral pressure on foundation and retaining walls — understand when they apply in DFW vs other repair methods.</p>

        <div style={{ background: '#0f2035', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1rem' }}>⚓ Wall Anchor System Types</h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              ['🔩','Helical Wall Anchors','Driven horizontally through foundation wall into competent soil. Helix blades bite into stable material and resist lateral pull. Tightened over time to gradually straighten bowing wall.'],
              ['🪢','Carbon Fiber Straps','For minor bowing under 2 inches — carbon fiber strips epoxied to wall resist further movement. No soil anchor needed. Fastest and lowest cost solution for early-stage bowing.'],
              ['🏗️','Tieback Anchors','Used on taller retaining walls where helical anchors cannot reach competent soil. Tieback rod drilled through wall at angle, grouted into bedrock or stable clay. Used for commercial-grade retaining walls.'],
              ['📍','DFW Application Reality','DFW is 95% slab construction — wall anchors primarily apply to retaining walls and rare basement situations. Most DFW foundation repairs use pier systems, not wall anchors.'],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                <div><div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{title}</div><div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{desc}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2035', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1rem' }}>🔍 Wall Anchor Applicability Guide</h2>
          <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.9rem' }}>Select your wall situation:</p>
          <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setWallSituation(s.id)} style={{ padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid', borderColor: wallSituation === s.id ? '#F5E642′ : '#1e3a5f', background: wallSituation === s.id ? '#1a2f4a' : '#0A1628', color: '#fff', textAlign: ’left', cursor: 'pointer', fontSize: '0.9rem' }}>{s.label}</button>
            ))}
          </div>
          <button onClick={handleCheck} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>Check Applicability</button>
          {result && results[result] && (
            <div style={{ marginTop: '1.25rem', padding: '1rem', borderRadius: '8px', borderLeft: `4px solid ${results[result].color}`, background: '#0A1628′ }}>
              <div style={{ color: results[result].color, fontWeight: 700, marginBottom: '0.4rem' }}>{results[result].verdict}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{results[result].detail}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, marginBottom: '0.4rem' }}>🏠 Get a DFW Foundation Pro</div>
          <div style={{ color: '#0A1628', fontSize: '0.9rem' }}>ProLnk connects you with licensed DFW foundation engineers who assess wall anchor vs pier system needs.</div>
        </div>
      </div>
    </div>
  );
}
