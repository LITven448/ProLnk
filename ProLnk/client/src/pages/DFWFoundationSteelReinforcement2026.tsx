import { useState } from 'react';

const vintages = [
  { range: 'Pre-1960', type: 'Plain Rebar Only', detail: 'Early DFW slab homes used basic deformed rebar on a simple grid — no post-tension cables, minimal steel density. If cracks appear, repair is more straightforward but foundation movement is less controlled.' },
  { range: '1960–1980', type: 'Rebar + Welded Wire Mesh', detail: 'Builders added welded wire mesh (WWM) to the slab surface for crack control. Rebar still provides primary structural reinforcement. Homes in this era are common across North Dallas and Arlington.' },
  { range: '1981–2000', type: 'Post-Tension Cables Dominant', detail: 'Post-tension became standard in DFW after expansive clay problems became clear. Cables are stressed to ~33,000 lbs — do NOT cut or core without an engineer verifying cable locations.' },
  { range: '2001–2015', type: 'Post-Tension + Fiber Supplement', detail: 'Polypropylene fiber reinforcement added to concrete mix for micro-crack resistance. Post-tension cables remain primary. Fiber is distributed throughout the slab — not visible from outside.' },
  { range: '2016–Present', type: 'Post-Tension + Structural Fiber', detail: 'Modern DFW homes use engineered fiber dosing with GPS-monitored cable layouts. Engineers specify exact cable spacing based on soil report. Most new DFW homes have digital slab plans on file.' },
];

export default function DFWFoundationSteelReinforcement2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [tab, setTab] = useState<'guide' | 'tool'>('guide');

  const match = vintages.find(v => v.range === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em' }}>
          PROLNK · DFW FOUNDATION GUIDE 2026
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem', lineHeight: 1.2 }}>
          🏗️ DFW Foundation Steel Reinforcement Guide 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '0.95rem' }}>
          DFW slab foundations can contain rebar, post-tension cables, welded wire mesh, or fiber — and each type responds differently to DFW's expansive clay. Know what's under your home.
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
          {(['guide', 'tool'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '0.5rem 1.2rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem',
              background: tab === t ? '#F5E642' : '#1e3a5f', color: tab === t ? '#0A1628' : '#94a3b8'
            }}>{t === 'guide' ? '📖 Guide' : '🏠 My Home'}</button>
          ))}
        </div>

        {tab === 'guide' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { icon: '🔩', title: 'Rebar (Passive Reinforcement)', body: 'Deformed steel bar embedded in concrete before pouring. Works by bonding with concrete to resist tension cracking. DFW homes use #3 or #4 rebar (3/8" or 1/2" diameter). Passive means it only activates when the slab moves — no pre-stress.' },
              { icon: '⚡', title: 'Post-Tension Cables (Active Reinforcement)', body: 'High-strength steel cables run through plastic sleeves in the slab. After concrete cures, cables are stressed to ~33,000 lbs, putting the slab in compression. This fights expansive clay movement proactively. CRITICAL: Never cut a cable without engineering review.' },
              { icon: '🔲', title: 'Welded Wire Mesh', body: 'Grid of light-gauge wire welded at intersections, placed in the upper portion of the slab. Controls surface cracking but provides limited structural reinforcement. Common in older DFW homes and garage slabs.' },
              { icon: '🌀', title: 'Fiber Reinforcement', body: 'Polypropylene or steel fibers mixed into the concrete — invisible from the surface. Modern DFW homes add this for micro-crack resistance. Fibers don\'t replace rebar or post-tension but supplement crack control throughout the full slab thickness.' },
              { icon: '📋', title: 'How to Identify Your Type', body: 'Check permit records at your city\'s building department. Look for cable ends (button-sized protrusions) at slab edge — these indicate post-tension. Pre-1980 homes almost never have post-tension. Your foundation report from home inspection should specify reinforcement type.' },
            ].map(card => (
              <div key={card.title} style={{ background: '#132240', borderRadius: '0.75rem', padding: '1.25rem', borderLeft: '4px solid #F5E642' }}>
                <div style={{ fontWeight: 700, marginBottom: '0.4rem', fontSize: '1rem' }}>{card.icon} {card.title}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>{card.body}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tool' && (
          <div>
            <p style={{ color: '#94a3b8', marginBottom: '1.2rem', fontSize: '0.9rem' }}>Select your home's build era to identify likely reinforcement type:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {vintages.map(v => (
                <button key={v.range} onClick={() => setSelected(v.range)} style={{
                  background: selected === v.range ? '#1e3a5f' : '#132240', border: selected === v.range ? '2px solid #F5E642' : '2px solid transparent',
                  borderRadius: '0.75rem', padding: '0.9rem 1.2rem', color: '#e2e8f0', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem', fontWeight: 600
                }}>🏚️ {v.range}</button>
              ))}
            </div>
            {match && (
              <div style={{ background: '#132240', borderRadius: '0.75rem', padding: '1.25rem', borderLeft: '4px solid #F5E642' }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.4rem' }}>🔍 Likely Reinforcement: {match.type}</div>
                <div style={{ color: '#e2e8f0', lineHeight: 1.7, fontSize: '0.95rem' }}>{match.detail}</div>
                <div style={{ marginTop: '1rem', padding: '0.8rem', background: '#0A1628', borderRadius: '0.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                  📞 Get a DFW foundation engineer through ProLnk to verify your slab's reinforcement before any drilling or repair.
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: '2.5rem', padding: '1rem 1.5rem', background: '#132240', borderRadius: '0.75rem', fontSize: '0.8rem', color: '#64748b', textAlign: 'center' }}>
          ProLnk connects DFW homeowners with vetted foundation professionals · prolnk.io
        </div>
      </div>
    </div>
  );
}