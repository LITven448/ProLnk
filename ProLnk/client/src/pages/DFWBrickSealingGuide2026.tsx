import { useState } from 'react';

const issues = [
  { id: 'efflorescence', label: '⬜ White Staining (Efflorescence)', guide: 'Do NOT seal over efflorescence. First dissolve the mineral deposits with diluted muriatic acid (10:1 water:acid), scrub with a stiff brush, rinse thoroughly, and allow to dry fully (2-3 weeks). Only seal after the source moisture is resolved.' },
  { id: 'spalling', label: '🧱 Brick Spalling / Flaking', guide: 'Spalling is caused by moisture freeze-thaw cycles. In DFW, this is less common than northern climates but still occurs. Sealing spalling brick can accelerate damage by trapping water inside. Replace severely spalled brick; do not seal as a fix.' },
  { id: 'painted', label: '🎨 Want to Paint Brick', guide: 'Painting brick is a permanent commitment. Paint traps moisture inside the brick and wall cavity. If you paint, use a masonry-specific breathable paint (elastomeric). Know that removal requires sandblasting and damages the brick surface permanently.' },
  { id: 'sealer-yes', label: '✅ When Sealing Makes Sense', guide: 'Silane/siloxane penetrating sealers (not film-forming) are appropriate for: new brick after first year, horizontal brick surfaces, retaining walls, and steps. These allow vapor transmission while repelling liquid water. Apply only to clean, dry brick.' },
  { id: 'sealer-no', label: '🚫 When NOT to Seal', guide: 'Do not seal brick if: weep holes are blocked, efflorescence is present, there is existing moisture infiltration, or you plan to re-point mortar soon. Sealing locks problems in. Fix the root cause first.' },
];

export default function DFWBrickSealingGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = issues.find(i => i.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🛡️</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 700, margin: 0 }}>DFW Brick Sealing Guide 2026</h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Should you seal your DFW brick? Usually no. Here is why.</p>
        </div>

        <div style={{ background: '#1a0a0a', border: '1px solid #7f1d1d', borderRadius: 8, padding: '1.2rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#fca5a5', fontWeight: 700, fontSize: '1rem', marginBottom: '0.4rem' }}>⚠️ Common Misconception</div>
          <div style={{ color: '#fecaca', fontSize: '0.9rem', lineHeight: 1.6 }}>Most homeowners think sealing brick protects it from water. The opposite is often true — film-forming sealers trap moisture INSIDE the brick, accelerating spalling, efflorescence, and mortar deterioration. DFW brick needs to breathe.</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: '🧪', title: 'Types of Sealers', body: 'Film-forming sealers (acrylic, polyurethane) coat the surface and block vapor — generally wrong for DFW brick. Penetrating sealers (silane, siloxane) soak in and repel liquid water while allowing vapor to escape — sometimes appropriate.' },
            { icon: '🌡️', title: 'DFW Heat Factor', body: 'DFW summers reach 105°F. Film-forming sealers bubble and peel in extreme heat. Even penetrating sealers degrade faster in DFW than cooler climates, requiring reapplication every 3-5 years versus 7-10 elsewhere.' },
            { icon: '⬜', title: 'Efflorescence Explained', body: 'Efflorescence is the white mineral salt deposit left as water evaporates from brick. It signals moisture movement through the masonry. Sealing over it traps moisture and the problem worsens. Always treat the source first.' },
            { icon: '🎨', title: 'Painted Brick Reality', body: 'Painting brick permanently changes its character. Paint failure on brick is difficult and expensive to address — sandblasting required. Resale: painted brick divides buyers. If you must paint, use breathable elastomeric masonry paint only.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 8, padding: '1.2rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.4rem' }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 8, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.1rem' }}>🔍 Brick Issue Finder</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Select your situation:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1rem' }}>
            {issues.map(i => (
              <button key={i.id} onClick={() => setSelected(i.id === selected ? null : i.id)}
                style={{ background: selected === i.id ? '#F5E642' : '#1e3a5f', color: selected === i.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
                {i.label}
              </button>
            ))}
          </div>
          {active && (
            <div style={{ background: '#0A1628', border: '1px solid #F5E642', borderRadius: 6, padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.4rem' }}>{active.label}</div>
              <div style={{ color: '#cbd5e1', lineHeight: 1.6, fontSize: '0.9rem' }}>{active.guide}</div>
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