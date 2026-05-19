import { useState } from 'react';

const noiseSources = [
  { type: 'Highway / Freeway', locations: ['Near I-635', 'Near I-30', 'Near I-35E', 'Near Hwy 183', 'Other'], risk: 'High', db: '70-85 dB', options: ['Triple-pane windows ($8K-$20K)', 'Mass loaded vinyl insulation ($3K-$8K)', 'Acoustic caulking + weatherstripping ($500-$2K)', 'Sound barrier landscaping ($2K-$10K)'] },
  { type: 'Airport (DFW/Love Field)', locations: ['Under flight path', 'Within 3 miles', 'Within 5 miles', 'Beyond 5 miles'], risk: 'Very High', db: '75-95 dB', options: ['Acoustic ceiling panels ($4K-$15K)', 'Solid-core interior doors ($2K-$6K)', 'Exterior wall insulation upgrade ($5K-$20K)', 'White noise system ($500-$2K)'] },
  { type: 'Rail / DART', locations: ['Within 500 ft', '500 ft - 1/4 mile', '1/4 - 1/2 mile', 'Beyond 1/2 mile'], risk: 'Medium-High', db: '65-80 dB', options: ['Resilient channel drywall ($3K-$10K)', 'Heavy curtains / soundproof blinds ($500-$3K)', 'Green Glue compound ($1K-$4K)', 'Bedroom relocation to far side of house'] },
  { type: 'Construction / Development', locations: ['Active site adjacent', 'Within 1/4 mile', 'Nearby area'], risk: 'Temporary', db: '80-90 dB (daytime)', options: ['Temporary acoustic barriers ($200-$1K)', 'HVAC white noise boost', 'Check city permits for timeline', 'HOA/city noise ordinance enforcement'] },
  { type: 'Neighbors / HOA', locations: ['Shared wall/fence', 'Adjacent lot', 'Same block'], risk: 'Variable', db: '45-70 dB', options: ['HOA noise violation reporting', 'City ordinance complaint (10pm-7am quiet hours)', 'Acoustic fence panels ($1K-$5K)', 'Mediation through HOA or city'] },
];

export default function DFWNeighborhoodNoiseGuide() {
  const [sourceIdx, setSourceIdx] = useState(0);
  const [locationIdx, setLocationIdx] = useState(0);
  const [result, setResult] = useState<null | typeof noiseSources[0]>(null);

  const assess = () => setResult(noiseSources[sourceIdx]);
  const src = noiseSources[sourceIdx];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🔊 DFW HOME GUIDE</div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>DFW Neighborhood Noise Guide</h1>
        <p style={{ color: '#9BA3B8', marginBottom: '2rem' }}>DFW is one of the noisiest metros in the US — two major airports, 300+ miles of freeway, expanding DART rail, and nonstop construction. Know your noise exposure before you buy.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🗺 Why DFW Is Loud</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[['✈️ DFW Airport', 'World’s 2nd busiest — approach paths over Grapevine, Irving, Euless, Coppell'], ['💛 Love Field', 'Southwest hub — flight paths over Oak Cliff, University Park, Highland Park'], ['🛣 Freeway Grid', 'I-635, I-30, I-35E, Hwy 183, SH-121, SH-114 — dense and loud'], ['🚊 DART Expansion', 'Light rail expanding through Plano, Garland, Richardson, Irving, DeSoto']].map(([icon, desc]) => (
              <div key={icon} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                <div style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>{icon}</div>
                <div style={{ fontSize: '0.85rem', color: '#9BA3B8' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Noise Assessment Tool</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#9BA3B8', marginBottom: '0.4rem', fontSize: '0.85rem' }}>Primary noise source</label>
            <select value={sourceIdx} onChange={e => { setSourceIdx(+e.target.value); setResult(null); }} style={{ width: '100%', padding: '0.7rem', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8 }}>
              {noiseSources.map((s, i) => <option key={i} value={i}>{s.type}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#9BA3B8', marginBottom: '0.4rem', fontSize: '0.85rem' }}>Your location relative to source</label>
            <select value={locationIdx} onChange={e => setLocationIdx(+e.target.value)} style={{ width: '100%', padding: '0.7rem', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8 }}>
              {src.locations.map((l, i) => <option key={i} value={i}>{l}</option>)}
            </select>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>Assess Noise Level</button>
          {result && (
            <div style={{ marginTop: '1.5rem', background: '#0A1628', borderRadius: 8, padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem' }}>Risk: {result.risk}</span>
                <span style={{ background: '#1E3A5F', padding: '0.3rem 0.8rem', borderRadius: 20, fontSize: '0.85rem' }}>Typical: {result.db}</span>
              </div>
              <div style={{ color: '#9BA3B8', fontSize: '0.85rem', marginBottom: '0.8rem' }}>Soundproofing options:</div>
              {result.options.map((o, i) => <div key={i} style={{ padding: '0.5rem 0', borderBottom: '1px solid #1E3A5F', fontSize: '0.9rem' }}>✅ {o}</div>)}
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>📋 Research Before You Buy</h2>
          {[['🗺 Noise Maps', 'FAA aviation noise maps at faa.gov — look up any address near DFW or Love Field'], ['📍 Street View + Visit', 'Visit the home at 7am, noon, and 6pm on a weekday to hear actual noise levels'], ['📄 HOA Docs', 'Review CC&Rs for noise hours, prohibited activities, fence/landscaping rules'], ['🏗 City Permits', 'Check city permit portal for approved construction within 1 mile']].map(([icon, desc]) => (
            <div key={icon} style={{ padding: '0.75rem 0', borderBottom: '1px solid #1E3A5F', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.2rem' }}>{icon}</span>
              <span style={{ fontSize: '0.9rem', color: '#9BA3B8' }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
