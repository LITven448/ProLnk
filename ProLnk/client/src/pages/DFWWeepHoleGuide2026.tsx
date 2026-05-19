import { useState } from 'react';

const situations = [
  { id: 'blocked', label: '🚫 Blocked Weep Holes', guide: 'Clear immediately with a weep hole scraper or thin wire. Mortar droppings from original construction are the most common culprit. Never use filler, caulk, or sealant in weep holes — they must remain fully open.' },
  { id: 'painted', label: '🎨 Painted Over Weep Holes', guide: 'Painted-over weep holes are a serious problem. Use a drill with a small masonry bit to re-open each one. Sand the surrounding area and re-open the cavity. The water behind the brick has nowhere to go.' },
  { id: 'staining', label: '🟤 Staining Below Weep Holes', guide: 'Brown streaking below weep holes is normal weeping — it means they are working. Excessive staining may indicate mortar contamination. Clean with diluted muriatic acid (10:1 ratio) and rinse thoroughly.' },
  { id: 'missing', label: '❓ No Weep Holes Visible', guide: 'Older DFW homes (pre-1990s) sometimes lack weep holes. This is a building code violation now. A mason can drill openings between brick courses at the base of each veneer run — typically every 24-32 inches horizontally.' },
  { id: 'insects', label: '🐛 Insects Using Weep Holes', guide: 'Install stainless or copper weep hole covers with mesh. Available at masonry supply stores. The mesh blocks insects while maintaining airflow and drainage. Do NOT seal with foam or caulk.' },
];

export default function DFWWeepHoleGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = situations.find(s => s.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🕳️</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 700, margin: 0 }}>DFW Brick Weep Hole Guide 2026</h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Why your brick needs to breathe — and drain</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: '💦', title: 'Brick Is NOT Waterproof', body: 'This surprises many homeowners — brick veneer absorbs water. DFW storms drive rain directly into the face of brick. A drainage cavity exists behind the brick specifically to let that water drain out through weep holes at the base.' },
            { icon: '📍', title: 'Where Weep Holes Go', body: 'Weep holes should appear at the bottom of each brick veneer course, spaced every 24-32 inches horizontally. They are the small open joints (no mortar) at the very base of the brick run, just above the foundation.' },
            { icon: '🌧️', title: 'DFW Rain Pattern Risk', body: 'DFW receives 37 inches of rain annually with intense spring storms. Wind-driven rain at 40-60 mph forces water through brick face. Without functioning weep holes, water accumulates in the cavity and infiltrates the wall sheathing.' },
            { icon: '⚠️', title: 'Damage from Blocked Holes', body: 'Blocked weep holes lead to: trapped moisture rotting the wall sheathing, mold growth inside wall cavities, efflorescence (white mineral staining) on brick face, and eventual structural damage to the framing.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 8, padding: '1.2rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.4rem' }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 8, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.1rem' }}>🔍 Weep Hole Situation Guide</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>What are you seeing?</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1rem' }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
                style={{ background: selected === s.id ? '#F5E642' : '#1e3a5f', color: selected === s.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
                {s.label}
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