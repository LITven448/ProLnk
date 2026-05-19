import { useState } from 'react';

const concerns = [
  { id: 'hail', label: '🌩 Post-April Hail Damage', guide: 'Inspect for dented ridge caps, cracked shingles, and bruised asphalt. Hail damage is often not visible from ground level — a 15-minute roof walk in May could save $15,000+ in denied claims.' },
  { id: 'boots', label: '🪠 Pipe Boot Replacement', guide: 'Rubber pipe boots degrade in DFW heat. If yours are 7+ years old, May is ideal to replace before summer expansion and monsoon rains. Cost: $50-150 per boot vs. $3,000+ water damage repair.' },
  { id: 'gutters', label: '🍂 Gutter Cleaning', guide: 'Spring debris (oak pollen, tree blossoms, seed pods) clogs gutters fast in DFW. Clean now before summer storms overwhelm clogged systems and push water toward the foundation.' },
  { id: 'unknown', label: '🤷 Not Sure Where to Start', guide: 'Start with a visual inspection from the ground using binoculars. Look for missing shingles, sagging sections, or dark staining. Then book a pro through ProLnk for a comprehensive evaluation before summer.' },
];

export default function DFWRoofingMayPrep2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = concerns.find(c => c.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW ROOFING · MAY 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.2, marginBottom: 12 }}>
          DFW Roofing May<br />Preparation Guide 2026
        </h1>
        <p style={{ color: '#8899AA', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          May is DFW's last window before summer roofing slow-down. April hail season has passed —
          now is the time to inspect for damage, replace worn components, and know your roofer
          before an emergency forces a rushed decision.
        </p>

        <div style={{ background: '#111D2E', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 16 }}>MAY ROOFING PRIORITY LIST</div>
          <div style={{ display: 'grid', gap: 14 }}>
            {[
              ['🌩', 'Post-Hail Inspection', 'DFW averages 12+ hail events per spring — inspect now before insurance claims windows close'],
              ['🪠', 'Pipe Boot Check', '7+ year old rubber boots = active leak risk in summer rainstorms'],
              ['🍂', 'Gutter Clearance', 'Spring debris is at peak — clean before June monsoon pattern begins'],
              ['📋', 'Know Your Roofer', 'Find a vetted pro now, not when water is coming through your ceiling at 11pm'],
            ].map(([icon, title, desc]) => (
              <div key={String(title)} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{title}</div>
                  <div style={{ color: '#8899AA', fontSize: 13 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 12 }}>SELECT YOUR ROOFING CONCERN</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {concerns.map(c => (
              <button key={c.id} onClick={() => setSelected(c.id)} style={{
                background: selected === c.id ? '#F5E642' : '#111D2E',
                color: selected === c.id ? '#0A1628' : '#fff',
                border: '1px solid #F5E642', borderRadius: 8, padding: '10px 16px',
                cursor: 'pointer', fontWeight: 600, fontSize: 13,
              }}>{c.label}</button>
            ))}
          </div>
        </div>

        {active && (
          <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 12, padding: 20, marginBottom: 32, fontWeight: 600, fontSize: 15 }}>
            {active.guide}
          </div>
        )}

        <div style={{ background: '#111D2E', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>PROLNK ROOFING PROS</div>
          <p style={{ color: '#8899AA', fontSize: 14, margin: 0 }}>
            Know your roofer before you need one. ProLnk connects DFW homeowners with pre-vetted
            roofing professionals. Join the homeowner waitlist for priority access at launch.
          </p>
        </div>
      </div>
    </div>
  );
}