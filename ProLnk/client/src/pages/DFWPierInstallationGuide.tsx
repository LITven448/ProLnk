import { useState } from 'react';

const HOME_TYPES = ['Single-story slab', 'Two-story slab', 'Single-story pier & beam', 'Two-story pier & beam'];
const PIER_COUNTS = ['1–5 piers', '6–10 piers', '11–20 piers', '21+ piers'];

type PierResult = { days: number; noise: string; disruption: string; reeval: string; care: string };

const timelines: Record<string, PierResult> = {
  '1–5 piers': { days: 1, noise: 'Moderate — hydraulic pump, concrete breaking (3–5 hrs)', disruption: 'Minimal — 1–2 rooms affected', reeval: '6–12 months post-install', care: 'No watering restrictions; avoid heavy vehicles near piers for 30 days' },
  '6–10 piers': { days: 1, noise: 'Significant — full day of jackhammer + pump activity', disruption: 'Half the home perimeter — plan to be out during work', reeval: '6–12 months post-install', care: 'Maintain consistent soil moisture; check for sticking doors monthly' },
  '11–20 piers': { days: 2, noise: 'Significant — two full days of mechanical work', disruption: 'Whole home perimeter — plan to be out both days', reeval: '6 months post-install (required)', care: 'Critical: establish watering schedule immediately; expect minor cosmetic cracking as house re-levels' },
  '21+ piers': { days: 3, noise: 'Major multi-day project — crews of 3–5 workers', disruption: 'Full home perimeter, possible interior access; be out all days', reeval: '3–6 months post-install (required)', care: 'Full post-repair monitoring protocol; cosmetic repairs should wait 6 months for settling' },
};

export default function DFWPierInstallationGuide() {
  const [homeType, setHomeType] = useState('');
  const [pierCount, setPierCount] = useState('');
  const result = pierCount ? timelines[pierCount] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '2.5rem' }}>🔩</span>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0′ }}>DFW Foundation Pier Installation Guide</h1>
          <p style={{ color: '#9CA3AF', lineHeight: 1.6 }}>
            Pier installation is the most common foundation repair in DFW. Knowing what to expect before, during, and after 
            the job helps you stay calm, make informed decisions, and protect your investment long-term.
          </p>
        </div>

        <div style={{ backgroundColor: '#111D35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🏗️ What Happens on Installation Day</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
            {[
              { step: '7–8 AM', desc: 'Crew arrives, marks pier locations, protects landscaping' },
              { step: '8–11 AM', desc: 'Concrete breaking and excavation to reach clay layer (3–5 ft deep)' },
              { step: '11 AM–2 PM', desc: 'Steel pier sections driven to load-bearing stratum (30–50 ft in DFW)' },
              { step: '2–4 PM', desc: 'Hydraulic lifting — home raised back to original grade where possible' },
              { step: '4–5 PM', desc: 'Pier caps set, concrete poured, holes backfilled and tamped' },
              { step: '5–6 PM', desc: 'Crew cleanup, walk-through with homeowner, documentation signed' },
            ].map((item, i) => (
              <div key={i} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: '0.8rem' }}>
                <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, marginBottom: 4 }}>{item.step}</div>
                <div style={{ color: '#CBD5E1', fontSize: '0.9rem', lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#111D35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>📋 Timeline & Post-Install Care Calculator</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ color: '#9CA3AF', display: 'block', marginBottom: 6 }}>Home Type</label>
              <select value={homeType} onChange={e => setHomeType(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, backgroundColor: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F' }}>
                <option value="">Select home type</option>
                {HOME_TYPES.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ color: '#9CA3AF', display: 'block', marginBottom: 6 }}>Pier Count</label>
              <select value={pierCount} onChange={e => setPierCount(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, backgroundColor: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F' }}>
                <option value="">Select pier count</option>
                {PIER_COUNTS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: '1.2rem', border: '1px solid #F5E642′ }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <div><span style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>INSTALL DURATION</span><div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.2rem' }}>{result.days} day{result.days > 1 ? 's' : ''}</div></div>
                <div><span style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>RE-EVALUATION</span><div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem' }}>{result.reeval}</div></div>
                <div style={{ gridColumn: '1 / -1′ }}><span style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>NOISE LEVEL</span><div style={{ color: '#E8EAF0', lineHeight: 1.5, marginTop: 4 }}>{result.noise}</div></div>
                <div style={{ gridColumn: '1 / -1′ }}><span style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>DISRUPTION</span><div style={{ color: '#E8EAF0', lineHeight: 1.5, marginTop: 4 }}>{result.disruption}</div></div>
                <div style={{ gridColumn: '1 / -1′ }}><span style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>POST-INSTALL CARE</span><div style={{ color: '#E8EAF0', lineHeight: 1.5, marginTop: 4 }}>{result.care}</div></div>
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#111D35', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>⚠️ Post-Installation: Normal vs. Concern</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <h3 style={{ color: '#22C55E', marginTop: 0 }}>✅ Normal (First 6 Months)</h3>
              <ul style={{ color: '#CBD5E1', lineHeight: 2, paddingLeft: '1rem' }}>
                <li>Minor cosmetic cracking in drywall</li>
                <li>Some doors that stick briefly</li>
                <li>Tile grout hairline cracks</li>
                <li>Minor floor level changes</li>
              </ul>
            </div>
            <div>
              <h3 style={{ color: '#EF4444', marginTop: 0 }}>🚨 Call Your Contractor</h3>
              <ul style={{ color: '#CBD5E1', lineHeight: 2, paddingLeft: '1rem' }}>
                <li>New cracks &gt;¼ inch wide</li>
                <li>Doors that won't close at all</li>
                <li>Visible floor slope worsening</li>
                <li>Exterior brick stair-step cracks worsening</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
