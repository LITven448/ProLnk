import { useState } from 'react';

export default function DFWRoofPitchGuide() {
  const [pitch, setPitch] = useState('');
  const [issue, setIssue] = useState('');
  const [result, setResult] = useState<null | { lifespan: string; hailNote: string; reroof: string; maintenance: string }>(null);

  const pitchData: Record<string, { lifespan: string; hailNote: string; reroof: string; maintenance: string }> = {
    low: {
      lifespan: '15-20 years in DFW — low-pitch roofs pool water longer after DFW thunderstorms, accelerating granule loss.',
      hailNote: 'Hail hits low-pitch roofs at a more direct angle — expect more circular bruising and faster granule loss per storm.',
      reroof: 'Reroofing low-pitch in DFW heat is faster — crews can move efficiently. Consider upgrading to modified bitumen or TPO for slopes under 2:12.',
      maintenance: 'Inspect gutters after every major DFW storm. Low-pitch relies on gutter flow — clogs cause standing water under shingles.'
    },
    medium: {
      lifespan: '20-28 years — medium pitch is the DFW sweet spot, shedding rain quickly without steep-pitch heat retention.',
      hailNote: 'Glancing hail impact at medium pitch. Damage is typically less severe than low-pitch but inspect ridge caps after large hail events.',
      reroof: 'Standard reroofing difficulty. DFW heat makes afternoon roofing miserable — most crews start at 6am. Plan accordingly.',
      maintenance: 'Annual inspection plus post-storm check of flashing, valleys, and ridge caps. Medium pitch self-clears debris well.'
    },
    steep: {
      lifespan: '25-35 years — steep pitch drains faster, but DFW UV hits upper surfaces more directly.',
      hailNote: 'Hail impact is glancing on steep roofs — less direct damage per stone, but steep roofs amplify wind-driven rain penetration at weak points.',
      reroof: 'Steep reroofing in DFW requires safety harness systems and typically adds 20-40% labor cost. August reroofing on steep roofs is dangerous — schedule spring or fall.',
      maintenance: 'Hire professionals for inspection — walking steep roofs in DFW heat is unsafe for homeowners. Biennial professional inspection recommended.'
    }
  };

  function analyze() {
    if (!pitch || !issue) return;
    setResult(pitchData[pitch]);
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: '2rem', marginBottom: '.25rem' }}>📐</div>
        <h1 style={{ color: '#F5E642', fontSize: '1.75rem', fontWeight: 700, marginBottom: '.5rem' }}>
          DFW Roof Pitch Guide
        </h1>
        <p style={{ color: '#9AAAB8', marginBottom: '2rem', lineHeight: 1.6 }}>
          Your roof's pitch — the ratio of rise to run — determines shingle lifespan, hail damage patterns, reroofing cost, and maintenance requirements in DFW’s brutal climate. Know your pitch before calling any contractor.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Low Pitch', range: '2:12 – 4:12', icon: '📏', color: '#3B82F6', desc: 'Nearly flat. Common on ranch homes and DFW additions. Water drains slowly.' },
            { label: 'Medium Pitch', range: '4:12 – 8:12', icon: '📐', color: '#10B981', desc: 'DFW standard. Balances drainage, aesthetics, and reroofing cost.' },
            { label: 'Steep Pitch', range: '8:12+', icon: '🏔️', color: '#F5E642', desc: 'Common on two-story homes. Drains fast but adds labor cost and heat risk.' },
          ].map(p => (
            <div key={p.label} style={{ background: '#0F2040', borderRadius: 10, padding: '1rem', borderTop: `4px solid ${p.color}`, textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '.25rem' }}>{p.icon}</div>
              <div style={{ fontWeight: 700, color: p.color, fontSize: '.9rem' }}>{p.label}</div>
              <div style={{ color: '#F5E642', fontSize: '.8rem', margin: '.25rem 0′ }}>{p.range}</div>
              <div style={{ color: '#9AAAB8', fontSize: '.8rem' }}>{p.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #F5E642', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '.5rem' }}>🌩️ How to Measure Your Pitch</div>
          <p style={{ color: '#9AAAB8', margin: 0, fontSize: '.95rem' }}>From the ground, count how many feet the roof rises for every 12 feet it runs horizontally. A 6:12 pitch rises 6 inches per foot of run. Most DFW homes built after 1990 are 4:12 or 6:12. Check your original builder docs or ask your roofer to confirm.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>🔍 Analyze Your Pitch</h2>
          <div style={{ display: 'grid', gap: '.75rem', marginBottom: '1rem' }}>
            <select value={pitch} onChange={e => setPitch(e.target.value)} style={{ background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '.75rem', fontSize: '1rem' }}>
              <option value=''>Select your pitch range</option>
              <option value='low'>Low Pitch (2:12 – 4:12)</option>
              <option value='medium'>Medium Pitch (4:12 – 8:12)</option>
              <option value='steep'>Steep Pitch (8:12+)</option>
            </select>
            <select value={issue} onChange={e => setIssue(e.target.value)} style={{ background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '.75rem', fontSize: '1rem' }}>
              <option value=''>What are you planning?</option>
              <option value='hail'>Assess hail damage</option>
              <option value='reroof'>Planning a reroof</option>
              <option value='maintain'>Routine maintenance</option>
              <option value='lifespan'>Estimate shingle life</option>
            </select>
          </div>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '.75rem 1.5rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', width: '100%' }}>
            Analyze My Roof Pitch
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>Pitch Analysis for DFW</h3>
            <div style={{ display: 'grid', gap: '.75rem' }}>
              <div><div style={{ color: '#9AAAB8', fontSize: '.85rem', marginBottom: '.25rem' }}>EXPECTED SHINGLE LIFESPAN</div><div style={{ color: '#E8EDF5′ }}>{result.lifespan}</div></div>
              <div><div style={{ color: '#9AAAB8', fontSize: '.85rem', marginBottom: '.25rem' }}>HAIL DAMAGE PATTERN</div><div style={{ color: '#E8EDF5′ }}>{result.hailNote}</div></div>
              <div><div style={{ color: '#9AAAB8', fontSize: '.85rem', marginBottom: '.25rem' }}>REROOFING CONSIDERATIONS</div><div style={{ color: '#E8EDF5′ }}>{result.reroof}</div></div>
              <div><div style={{ color: '#9AAAB8', fontSize: '.85rem', marginBottom: '.25rem' }}>MAINTENANCE APPROACH</div><div style={{ color: '#E8EDF5′ }}>{result.maintenance}</div></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
