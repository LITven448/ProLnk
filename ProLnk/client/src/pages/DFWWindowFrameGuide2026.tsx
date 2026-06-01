import { useState } from 'react';

const profiles = [
  { id: 'vinyl', label: '🪟 Vinyl', pros: 'Most affordable, no painting, low maintenance, good insulation, widely available', cons: 'Can warp or distort in extreme DFW heat (above 100°F), especially dark colors. Lower-end vinyl fades. Limited color palette without painting.', dfwRating: '★★★★☆', best: 'Budget-conscious homeowners, north/east-facing windows, shaded locations' },
  { id: 'fiberglass', label: '🔧 Fiberglass', pros: 'Best DFW performance — minimal thermal expansion, superior strength, paintable, 3x stronger than vinyl', cons: 'Costs 50-100% more than vinyl. Fewer manufacturers and styles. Harder to source in DFW than vinyl.', dfwRating: '★★★★★', best: 'South/west-facing windows, high-performance homes, long-term investment' },
  { id: 'aluminum', label: '🏗️ Aluminum', pros: 'Very durable, used commercially, slim sightlines for modern aesthetics, recyclable', cons: 'Conducts heat and cold rapidly — worst energy performance of any frame type. Condensation prone. Requires thermal break for energy code compliance in DFW.', dfwRating: '★★☆☆☆', best: 'Commercial buildings, covered porches, design-specific applications only' },
  { id: 'wood', label: '🪵 Wood', pros: 'Best aesthetics, historic character, paintable/stainable, excellent insulation value, premium curb appeal', cons: 'Requires painting every 5-7 years in DFW heat and humidity. Prone to rot if not maintained. Highest maintenance of any frame type.', dfwRating: '★★★☆☆', best: 'Historic homes, premium builds, homeowners committed to maintenance' },
];

export default function DFWWindowFrameGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = profiles.find(p => p.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🪟</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 700, margin: 0 }}>DFW Window Frame Material Guide 2026</h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Which frame material performs best in DFW heat, storms, and hail?</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: '🌡️', title: 'DFW Climate Demands', body: 'DFW summers hit 100-110°F with intense UV. Spring storms bring hail and 70+ mph winds. Thermal expansion of window frames across seasons is extreme. The ideal DFW frame handles heat, impact, and minimal maintenance.' },
            { icon: '⚡', title: 'Energy Code in DFW', body: 'DFW is in IECC Climate Zone 3. Windows must meet U-factor ≤0.30 and SHGC ≤0.25 for code compliance. Frame material affects the whole-window U-factor — fiberglass and vinyl outperform aluminum significantly.' },
            { icon: '🌪️', title: 'Storm Performance', body: 'For DFW hail and storm impact, look for AAMA 2605 coating certification and impact-rated glazing. Frame material matters less than glass specification for hail — laminated glass or impact-rated insulated units add significant protection.' },
            { icon: '💲', title: 'DFW Replacement Costs', body: 'Per window installed by a DFW contractor: Vinyl $400-$600, Fiberglass $700-$1,200, Aluminum $500-$900, Wood $1,200-$2,000. Full house replacement (15-20 windows): Vinyl $6-10K, Fiberglass $12-20K.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 8, padding: '1.2rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.4rem' }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 8, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.1rem' }}>🔍 Frame Material Comparison</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Select a material to see DFW-specific analysis:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1rem' }}>
            {profiles.map(p => (
              <button key={p.id} onClick={() => setSelected(p.id === selected ? null : p.id)}
                style={{ background: selected === p.id ? '#F5E642' : '#1e3a5f', color: selected === p.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
                {p.label}
              </button>
            ))}
          </div>
          {active && (
            <div style={{ background: '#0A1628', border: '1px solid #F5E642', borderRadius: 6, padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.6rem', fontSize: '1rem' }}>{active.label} — DFW Rating: {active.dfwRating}</div>
              <div style={{ marginBottom: '0.5rem' }}><span style={{ color: '#86efac', fontWeight: 600 }}>Pros: </span><span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{active.pros}</span></div>
              <div style={{ marginBottom: '0.5rem' }}><span style={{ color: '#fca5a5', fontWeight: 600 }}>Cons: </span><span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{active.cons}</span></div>
              <div><span style={{ color: '#93c5fd', fontWeight: 600 }}>Best For: </span><span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{active.best}</span></div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#475569', fontSize: '0.8rem' }}>
          ProLnk · DFW Home Intelligence · 2026
        </div>
      </div>
    </div>
  );
}