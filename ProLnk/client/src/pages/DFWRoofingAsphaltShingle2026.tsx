import { useState } from 'react';

const concerns: Record<string, { title: string; info: string[]; tip: string }> = {
  granule: {
    title: '🪨 Granule Loss & Coverage Quality',
    info: ['Granules are embedded into hot asphalt under high pressure during manufacturing', 'Budget shingles use lighter granule application — granules shed faster in DFW hail and UV exposure', 'Check the package weight per square (100 sq ft): 225–240 lbs is economy; 240–265 lbs is architectural quality', 'Look for "enhanced algae-resistant granules" (copper/zinc) — critical for DFW humidity seasons'],
    tip: 'Squeeze a handful of granules from leftover shingles — premium granules feel sharp and varied in size; budget granules feel uniform and small.',
  },
  mat: {
    title: '🧱 Fiberglass Mat Base Quality',
    info: ['The fiberglass mat is the structural backbone of the shingle — heavier mats resist impact and cracking', 'Class 4 impact-rated shingles (DFW insurance discount eligible) use reinforced, thicker fiberglass mat', 'Thin mats crack in DFW hail storms even if granules look intact', 'Ask for the "breaking strength" spec — premium mats exceed 90 lbf in both directions'],
    tip: 'In DFW, a Class 4 impact rating (UL 2218) can qualify for a 20–30% homeowner insurance discount. Verify with your carrier before specifying shingles.',
  },
  adhesive: {
    title: '🔒 Self-Seal Adhesive Strip Performance',
    info: ['Asphalt-based adhesive strip activates from heat — bonds adjacent shingles to resist wind uplift', 'DFW summer heat (130°F+ on roof deck) accelerates bond formation — good for new installs', 'In DFW winter, adhesive may not activate — installer should hand-seal in temps below 50°F', 'Budget shingles use smaller, intermittent adhesive strips — reduced wind rating in DFW storm season'],
    tip: 'Wind rating matters: DFW code requires 130 mph wind resistance. Verify the shingle\’s ASTM D3161 Class F or UL 997 wind rating on the package.',
  },
  asphalt: {
    title: '🛢️ Asphalt Coating Weight',
    info: ['Both sides of the fiberglass mat are coated in asphalt — more asphalt = more durability and waterproofing', 'High-quality shingles use polymer-modified asphalt (SBS or APP) for flexibility in DFW temperature swings', 'Standard oxidized asphalt gets brittle faster — accelerated by DFW UV index (among highest in US)', 'Total asphalt content per square is a key quality differentiator — premium shingles use 20–30% more asphalt'],
    tip: 'Ask your supplier for the "weight per square" spec sheet. More total weight generally means more asphalt content and longer DFW performance.',
  },
};

export default function DFWRoofingAsphaltShingle2026() {
  const [selected, setSelected] = useState('');

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>DFW ROOFING GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>🏭 Asphalt Shingle Manufacturing Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem', lineHeight: 1.6 }}>How DFW asphalt shingles are made and why manufacturing quality directly impacts performance in North Texas heat, hail, and UV exposure.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🏗️ Manufacturing Process Overview</h2>
          {[
            ['1', '🧱 Fiberglass Mat', 'Continuous fiberglass strands are formed into a mat — the structural skeleton of every shingle.'],
            ['2', '🛢️ Asphalt Coating', 'Mat passes through a bath of hot asphalt — coated on both sides to create a waterproof layer.'],
            ['3', '🪨 Granule Embedding', 'Colored mineral granules are dropped onto hot asphalt and pressed in — provide UV protection and fire resistance.'],
            ['4', '🔒 Adhesive Strip', 'Self-seal adhesive strip applied to back — bonds to adjacent shingle row under roof deck heat.'],
            ['5', '✂️ Cut & Package', 'Shingles cut to standard dimensions, bundled 3 per square, inspected for weight and coverage specs.'],
          ].map(([n, icon, text]) => (
            <div key={n} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.85rem', alignItems: 'flex-start' }}>
              <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem', flexShrink: 0 }}>{n}</div>
              <div><span style={{ color: '#FFFFFF', fontWeight: 600 }}>{icon} </span><span style={{ color: '#94A3B8', fontSize: '0.9rem' }}>{text}</span></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔍 Select a Shingle Concern</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            {Object.entries(concerns).map(([key, val]) => (
              <button key={key} onClick={() => setSelected(key)} style={{ background: selected === key ? '#F5E642' : '#0A1628', color: selected === key ? '#0A1628' : '#E2E8F0', border: `1px solid ${selected === key ? '#F5E642' : '#2D4A7A'}`, borderRadius: 8, padding: '0.75rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem', textAlign: 'left' }}>{val.title}</button>
            ))}
          </div>
          {selected && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.25rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>{concerns[selected].title}</div>
              {concerns[selected].info.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#F5E642', flexShrink: 0 }}>→</span>
                  <span style={{ color: '#94A3B8', fontSize: '0.9rem' }}>{s}</span>
                </div>
              ))}
              <div style={{ marginTop: '1rem', background: '#0F2040', borderLeft: '3px solid #F5E642', padding: '0.75rem', borderRadius: 6 }}>
                <span style={{ color: '#94A3B8', fontSize: '0.85rem' }}>💡 {concerns[selected].tip}</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#475569', fontSize: '0.8rem' }}>ProLnk DFW Roofing Resource · 2026</div>
      </div>
    </div>
  );
}