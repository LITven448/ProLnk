import { useState } from 'react';

const decisions = [
  { id: 'new', label: '🏠 New Roof — What Shingle?', desc: 'Choosing for new DFW installation' },
  { id: 'replace', label: '🔄 Replacing Existing Roof', desc: 'Upgrading from older shingles' },
  { id: 'color', label: '🎨 Picking HDZ Color', desc: 'Most popular DFW color options' },
  { id: 'hdz_vs_hd', label: '📊 HDZ vs HD Comparison', desc: 'What changed in the upgrade' },
];

const guideMap: Record<string, { title: string; points: string[] }> = {
  new: {
    title: 'GAF HDZ for New DFW Roofs',
    points: [
      'HDZ is the #1 specified shingle by DFW roofing contractors in 2024–2026',
      'StrikeZone nailing area is 4x wider — DFW installers have less margin for error',
      'LayerLock technology bonds courses together — critical for DFW wind events',
      'Class 4 impact rating available on HDZ IR version — may earn insurance discount',
      'Rated for 130 mph winds when properly nailed — covers most DFW storm scenarios',
      'Pairs with GAF Weatherwatch for full system warranty coverage',
    ],
  },
  replace: {
    title: 'Replacing Old Shingles with HDZ in DFW',
    points: [
      'Tear-off vs overlay: DFW code allows one layer overlay max, two layers often banned',
      'Inspect decking before HDZ installation — DFW heat cycles degrade OSB faster',
      'Check attic ventilation: HDZ warranty requires proper net free ventilation area',
      'Replace all flashing during re-roof — DFW thermal expansion degrades old flashing',
      'HDZ requires 4 nails per shingle minimum in DFW wind zones',
      'Golden Pledge warranty (50-yr) available through certified DFW contractors',
    ],
  },
  color: {
    title: 'Most Popular HDZ Colors in DFW 2026',
    points: [
      '#1 Charcoal — works with brick, stucco, and modern DFW exteriors',
      '#2 Pewter Gray — cooler tone, popular in newer DFW suburbs (Prosper, Frisco)',
      '#3 Weathered Wood — warm tones, classic DFW traditional homes',
      'Slate — gaining popularity in DFW custom homes and spec builds',
      'Barkwood — complements DFW homes with warm brick or cedar accents',
      'Light colors reflect DFW summer heat — can reduce cooling load marginally',
    ],
  },
  hdz_vs_hd: {
    title: 'HDZ vs HD: What Changed',
    points: [
      'StrikeZone: HDZ nailing zone is 4x larger than original HD',
      'LayerLock: HDZ adds adhesive bond strip between shingle courses',
      'Weight: HDZ is heavier — verify your DFW roof deck can handle it',
      'Wind resistance: HDZ rated 130 mph; HD was rated 110 mph',
      'Price: HDZ runs $10–$20/sq more than HD',
      'Availability: HD discontinued in most DFW markets — HDZ is the standard now',
    ],
  },
};

export default function DFWRoofingGAFHDZ2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>DFW ROOFING GUIDE 2026</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          🏠 GAF Timberline HDZ in DFW
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          The HDZ is the most-installed shingle in DFW. StrikeZone nailing and LayerLock technology are built for North Texas wind and heat conditions.
        </p>

        <div style={{ background: '#1e3a5f', borderRadius: 8, padding: '1rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>📌 Why HDZ Dominates DFW</div>
          <p style={{ color: '#cbd5e1', margin: 0 }}>
            DFW averages <strong style={{ color: '#F5E642′ }}>18+ hail events per year</strong> and frequent 60–80 mph straight-line wind gusts. The HDZ was engineered for exactly these conditions.
          </p>
        </div>

        <h2 style={{ fontSize: '1.1rem', color: '#F5E642', marginBottom: '1rem' }}>What Do You Need to Know?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {decisions.map(d => (
            <button key={d.id} onClick={() => setSelected(d.id)}
              style={{ background: selected === d.id ? '#F5E642′ : '#1e293b', color: selected === d.id ? '#0A1628' : '#fff', border: '2px solid' + (selected === d.id ? ' #F5E642' : ' #334155'), borderRadius: 8, padding: '1rem', cursor: ’pointer', textAlign: 'left' }}>
              <div style={{ fontWeight: 700 }}>{d.label}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{d.desc}</div>
            </button>
          ))}
        </div>

        {selected && guideMap[selected] && (
          <div style={{ background: '#1e293b', borderRadius: 8, padding: '1.5rem', borderLeft: '4px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>{guideMap[selected].title}</h3>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {guideMap[selected].points.map((p, i) => (
                <li key={i} style={{ padding: '0.5rem 0', borderBottom: '1px solid #334155', color: '#cbd5e1', display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: '#F5E642′ }}>✓</span>{p}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ marginTop: '2rem', color: '#64748b', fontSize: '0.8rem' }}>
          ProLnk DFW Roofing Resource · Updated 2026
        </div>
      </div>
    </div>
  );
}