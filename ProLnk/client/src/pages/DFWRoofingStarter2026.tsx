import { useState } from 'react';

const concerns = [
  {
    id: 'blowoff',
    label: '💨 Shingles Blowing Up at Edge',
    diagnosis: 'Missing or improperly installed starter strip at eaves/rakes.',
    cause: 'Without starter strip, shingles at the edge have no self-seal bond to the layer below. DFW wind events (50–70 mph gusts) exploit this gap.',
    fix: ['Remove first course of shingles at affected edge', 'Install starter strip with adhesive bead facing down toward the drip edge', 'Reinstall first course — it now bonds to the starter beneath', 'Nail 1″ from edge and every 12″ across'],
    dfwNote: 'DFW tornado-prone zone: IRC requires 6-nail pattern in high-wind areas. Starter strip is first line of defense.',
  },
  {
    id: 'leaking_eave',
    label: '💧 Leak at Eave After Rain',
    diagnosis: 'Missing starter strip or reversed starter strip orientation.',
    cause: 'Water wicks under the first shingle course if there is no sealed layer below. Starter strip with adhesive facing up (wrong way) also fails.',
    fix: ['Inspect from attic with a flashlight during/after rain to find entry point', 'Check starter strip orientation — adhesive must face down/out toward eave', 'If missing: remove first shingle course, add starter, reinstall', 'Inspect drip edge — should be under felt at eave, over felt at rake'],
    dfwNote: 'DFW gets 38″ of rain annually with intense storm events. Eave leaks are one of the top 3 roof-related insurance claims in North Texas.',
  },
  {
    id: 'new_roof',
    label: '🏗️ New Roof — Verify Starter Strip',
    diagnosis: 'Confirm proper installation before final payment.',
    cause: 'Some DFW roofers skip starter strip to save time/materials. It is invisible after install but critical for wind and water resistance.',
    fix: ['Ask contractor to show starter strip before first shingle course is installed', 'Starter should be visible as a separate layer at eave edge (different color than shingles)', 'Check rake (side) edges as well — starter required there too', 'Photo-document installation before shingles cover it'],
    dfwNote: 'Texas does not require roofers to be licensed — DFW storm chasers often cut corners on starter strip. Verify with your own eyes or hire an independent inspector.',
  },
  {
    id: 'wind_damage',
    label: '🌪️ Wind Damage Assessment',
    diagnosis: 'Check if starter strip failure contributed to wind damage.',
    cause: 'When starter strip is missing or failed, shingles at the edge are the first to lift. Once an edge shingle lifts, wind pressure gets under the field shingles.',
    fix: ['After a DFW storm: inspect eave edges first for lifted/missing shingles', 'Document damage with photos for insurance claim', 'Temporary: hand-seal any lifted edges with roofing cement immediately', 'Permanent: full replacement of starter strip and first course during repair'],
    dfwNote: 'DFW is in the heart of Tornado Alley. IRC Chapter 9 high-wind provisions apply. Starter strip is not optional — it is code.',
  },
];

export default function DFWRoofingStarter2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const concern = concerns.find(c => c.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.6rem', margin: '0.5rem 0′ }}>DFW Roofing Starter Strip Guide 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>The most skipped component in DFW roofing — and the one that fails first in wind events</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem', background: '#0f2233', borderRadius: 10, padding: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>What It Does</div>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Creates a sealed base at eaves and rakes. Self-seal adhesive activates in DFW heat (85°F+) bonding the first shingle course to the roof deck.</div>
          </div>
          <div>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>Why DFW Specifically</div>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>DFW storms produce 50–70 mph gusts regularly. Without starter strip, edge shingles are the first point of failure. DFW summer heat (100°F+) also accelerates adhesive activation — properly installed starter bonds tight within days.</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {concerns.map(c => (
            <button key={c.id} onClick={() => setSelected(c.id === selected ? null : c.id)}
              style={{ background: selected === c.id ? '#1e3a5f' : '#0f2233', border: `2px solid ${selected === c.id ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: '1rem', color: '#fff', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ fontSize: '1rem' }}>{c.label}</div>
            </button>
          ))}
        </div>

        {concern && (
          <div style={{ background: '#0f2233', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f' }}>
            <h2 style={{ color: '#F5E642', margin: '0 0 0.5rem', fontSize: '1.1rem' }}>{concern.label}</h2>
            <div style={{ background: '#1e3a5f', borderRadius: 8, padding: '0.8rem', marginBottom: '1rem' }}>
              <div style={{ color: '#60a5fa', fontWeight: 700, fontSize: '0.85rem' }}>Diagnosis: <span style={{ color: '#cbd5e1', fontWeight: 400 }}>{concern.diagnosis}</span></div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.5rem' }}>{concern.cause}</div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ color: '#4ade80', fontWeight: 700, marginBottom: '0.5rem' }}>✅ Fix Steps</div>
              {concern.fix.map((step, i) => <div key={i} style={{ color: '#cbd5e1', padding: '0.3rem 0', borderBottom: '1px solid #1e3a5f', fontSize: '0.9rem' }}>{i + 1}. {step}</div>)}
            </div>
            <div style={{ background: '#1e3a5f', borderRadius: 8, padding: '1rem', borderLeft: '3px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.3rem' }}>🌪️ DFW Note</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>{concern.dfwNote}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
