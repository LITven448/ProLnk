import { useState } from 'react';

const issues = [
  { id: 'tuckpoint', label: '🪨 Deteriorating Mortar', guide: 'Tuckpointing (repointing) removes the outer 3/4 inch of deteriorated mortar joints with an angle grinder and fills with fresh mortar. In DFW, use a Type S mortar mix — stronger than Type N and better for DFW climate. Match the original joint profile (concave, V-shaped, or flush).' },
  { id: 'color', label: '🎨 Matching Mortar Color', guide: 'Mortar color matching is notoriously difficult. New mortar dries 2-3 shades lighter than it looks wet. Get a sample from a hidden area, let it cure fully, then match at a masonry supply house. Consider full facade repointing if color match is impossible.' },
  { id: 'step-crack', label: '🪜 Step Cracking in Brick', guide: 'Step cracking (stair-step pattern along mortar joints) is almost always caused by DFW foundation movement on expansive clay soils. DO NOT repair the brick first — fix the foundation. Brick repair without foundation repair will re-crack within months.' },
  { id: 'replace', label: '🧱 Replacing Damaged Brick', guide: 'Finding matching brick for DFW homes is a real challenge. Brick manufacturers discontinue colors frequently. Check salvage yards, Craigslist, and brick matching services. A mason can often find close matches. Use replacement brick on less visible areas (back, sides) and move better-matched originals to the front.' },
  { id: 'lintel', label: '🔩 Sagging Brick Over Windows', guide: 'Sagging brick above window or door openings indicates a failing steel lintel (the beam supporting brick above the opening). This is a structural concern requiring immediate attention. The lintel must be replaced — typically -2,500 per opening in DFW including brick removal and replacement.' },
];

export default function DFWMasonryRepairGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = issues.find(i => i.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🔨</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 700, margin: 0 }}>DFW Masonry Repair Guide 2026</h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Fixing brick and mortar issues in DFW — in the right order</p>
        </div>

        <div style={{ background: '#0f1e10', border: '1px solid #166534', borderRadius: 8, padding: '1.2rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#86efac', fontWeight: 700, fontSize: '1rem', marginBottom: '0.4rem' }}>🏗️ DFW Masonry Rule #1</div>
          <div style={{ color: '#bbf7d0', fontSize: '0.9rem', lineHeight: 1.6 }}>Always fix foundation issues BEFORE repairing masonry. DFW expansive clay soil causes continuous movement. Brick and mortar repairs on a moving foundation will re-fail. Get a foundation evaluation first if you see step cracking, diagonal cracking, or displaced brick.</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: '⏰', title: 'Mortar Lifespan in DFW', body: 'Mortar in DFW typically lasts 25-50 years depending on original mix quality, drainage, and sun exposure. South and west-facing walls deteriorate faster. Annual inspection lets you catch small areas before they require full repointing.' },
            { icon: '🌡️', title: 'Seasonal Timing', body: 'Masonry repair in DFW should be done in spring (March-May) or fall (October-November). Summer heat (100°F+) causes mortar to cure too quickly, creating weak joints. Winter freezes risk cracking fresh mortar before it sets.' },
            { icon: '💰', title: 'DFW Cost Ranges', body: 'Tuckpointing: -15/sq ft. Brick replacement: -40/brick installed. Lintel replacement: -2,500/opening. Full facade repoint on average DFW home: ,500-8,000. Always get 3 bids from licensed masons.' },
            { icon: '📋', title: 'Contractor Checklist', body: 'Verify: Texas masonry contractor license, liability insurance (M+), experience matching DFW brick types, written scope specifying mortar type and joint profile, references from DFW projects. Avoid anyone who suggests sealing cracks rather than repointing.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 8, padding: '1.2rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.4rem' }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 8, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.1rem' }}>🔍 Masonry Issue Guide</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>What are you dealing with?</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1rem' }}>
            {issues.map(i => (
              <button key={i.id} onClick={() => setSelected(i.id === selected ? null : i.id)}
                style={{ background: selected === i.id ? '#F5E642′ : '#1e3a5f', color: selected === i.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 6, padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
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