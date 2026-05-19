import { useState } from 'react';

export default function DFWFoundationBellBottom2026() {
  const [repairType, setRepairType] = useState('');
  const [result, setResult] = useState('');

  const repairTypes = [
    { id: 'settlement', label: '🏚️ Foundation Settlement' },
    { id: 'heave', label: '⬆️ Soil Heave / Lift' },
    { id: 'crack', label: '🔨 Structural Cracking' },
    { id: 'historic', label: '🏛️ Historic Home (Pre-1980)' },
    { id: 'modern', label: '🏠 Modern Home (Post-1990)' },
  ];

  const results: Record<string, { verdict: string; detail: string; color: string }> = {
    settlement: { verdict: 'Bell-Bottom Often Preferred', detail: 'For DFW settlement, bell-bottom piers reach stable load-bearing clay below the active zone. 24-inch bell diameter distributes weight across bedrock. Requires engineer stamp for permit.', color: '#F5E642′ },
    heave: { verdict: 'Bell-Bottom NOT Recommended', detail: 'Soil heave lifts piers — bell-bottom piers can be pushed out of position. Modern helical or steel push piers with grade beams better handle DFW expansive clay heave.', color: '#ef4444′ },
    crack: { verdict: 'Engineer Assessment First', detail: 'Cracking alone does not determine pier type. A structural engineer must assess crack pattern, width, and direction to recommend bell-bottom vs modern pier system.', color: '#f97316′ },
    historic: { verdict: 'Bell-Bottom Likely Installed', detail: 'Pre-1980 DFW homes almost certainly have bell-bottom piers if previously repaired. Match the existing system or consult engineer about hybrid approach.', color: '#3b82f6′ },
    modern: { verdict: 'Modern Pier System Preferred', detail: 'Post-1990 DFW construction typically uses steel push piers or helical piers — faster installation, no concrete cure time, easier permit inspection. Bell-bottom still valid with engineer oversight.', color: '#22c55e' },
  };

  const handleCheck = () => {
    if (repairType && results[repairType]) setResult(repairType);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🏗️ DFW FOUNDATION GUIDE 2026</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>Bell-Bottom Pier Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>The original Texas foundation repair method — engineered for DFW expansive black clay soils. Understand when bell-bottoms win vs modern alternatives.</p>

        <div style={{ background: '#0f2035', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1rem' }}>🔩 Bell-Bottom Pier Basics</h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              ['🕳️','How It Works','Crew drills 12-inch shaft, widens to 24-inch bell at bottom. Concrete poured into bell — mushroom shape distributes load across stable bearing strata.'],
              ['📐','Texas-Developed','Bell-bottom technique developed specifically for DFW and Houston expansive clay. Texas engineering firms refined the method through decades of trial on Blackland Prairie soil.'],
              ['📋','Permit Requirements','DFW jurisdictions require structural engineer of record for bell-bottom projects. Engineer provides stamped drawings, inspects bell diameter before pour.'],
              ['⚖️','vs Modern Piers','Bell-bottom: longer cure time (28 days), less adjustable, time-tested. Modern steel push piers: immediate load transfer, adjustable, faster install, higher per-pier cost.'],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                <div><div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{title}</div><div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{desc}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2035', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1rem' }}>🔍 Bell-Bottom vs Modern Pier Guide</h2>
          <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.9rem' }}>Select your repair situation:</p>
          <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
            {repairTypes.map(r => (
              <button key={r.id} onClick={() => setRepairType(r.id)} style={{ padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid', borderColor: repairType === r.id ? '#F5E642′ : '#1e3a5f', background: repairType === r.id ? '#1a2f4a' : '#0A1628', color: '#fff', textAlign: ’left', cursor: 'pointer', fontSize: '0.9rem' }}>{r.label}</button>
            ))}
          </div>
          <button onClick={handleCheck} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>Get Recommendation</button>
          {result && results[result] && (
            <div style={{ marginTop: '1.25rem', padding: '1rem', borderRadius: '8px', borderLeft: `4px solid ${results[result].color}`, background: '#0A1628′ }}>
              <div style={{ color: results[result].color, fontWeight: 700, marginBottom: '0.4rem' }}>{results[result].verdict}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{results[result].detail}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, marginBottom: '0.4rem' }}>🏠 Get a DFW Foundation Pro</div>
          <div style={{ color: '#0A1628', fontSize: '0.9rem' }}>ProLnk matches you with licensed DFW foundation engineers who can assess bell-bottom vs modern pier needs.</div>
        </div>
      </div>
    </div>
  );
}
