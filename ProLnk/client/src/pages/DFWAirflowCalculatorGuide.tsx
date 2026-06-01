import { useState } from 'react';

export default function DFWAirflowCalculatorGuide() {
  const [sqft, setSqft] = useState('');
  const [stories, setStories] = useState('');
  const [layout, setLayout] = useState('');
  const [result, setResult] = useState<null | { cfm: string; challenges: string[]; solutions: string[] }>(null);

  function calculate() {
    const s = parseInt(sqft, 10);
    const fl = parseInt(stories, 10);
    if (!s || !fl || !layout) return;
    const baseCFM = Math.round(s * 0.05 * 400) / 10;
    const cfm = `${Math.round(baseCFM * 10)}–${Math.round(baseCFM * 12)} CFM`;
    const challenges: string[] = [];
    const solutions: string[] = [];
    if (fl >= 2) {
      challenges.push('🌡️ Temperature stratification: upper floors 5–10°F warmer in DFW summer');
      challenges.push('📐 Long duct runs to upper floor lose static pressure and airflow volume');
      solutions.push('Zone dampers with separate thermostat for each floor');
      solutions.push('Boost fans in long upper-floor duct runs');
    }
    if (layout === 'open') {
      challenges.push('🏠 Large open areas require higher static pressure to distribute air evenly');
      challenges.push('⚡ Single return grille in open floor plan creates dead zones in far corners');
      solutions.push('Multiple return air grilles distributed across open space');
      solutions.push('Properly sized ductwork — most DFW open floor plans are under-ducted');
    }
    if (layout === 'vaulted') {
      challenges.push('🔺 Vaulted/cathedral ceilings trap heat at the peak, raising thermostat reading');
      challenges.push('💨 Supply registers must reach the living zone below, not just the ceiling pocket');
      solutions.push('Ceiling fans to destratify air in vaulted spaces');
      solutions.push('Supply registers angled to push air toward occupied zone, not ceiling');
    }
    if (s > 3000) {
      challenges.push('📦 Homes over 3,000 sq ft often need multi-zone or multi-system HVAC in DFW');
      solutions.push('Consider 2-system setup: one for each floor or zone');
    }
    setResult({ cfm, challenges, solutions });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HVAC GUIDES</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Airflow Calculator Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          Proper airflow is why some DFW rooms are comfortable and others are sweltering. DFW's large homes,
          open floor plans, and two-story designs create unique distribution challenges that undersized or
          poorly designed duct systems can't solve. Here's how to understand your airflow needs.
        </p>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>📐 DFW-Specific Airflow Challenges</h2>
          {[
            ['Large square footage', 'DFW homes average 2,200–3,800 sq ft. Larger homes need more airflow volume and more duct branches to reach every room.'],
            ['Two-story stratification', 'Hot air rises. In DFW summer, upper floors can run 8–12°F hotter than the thermostat setting, pushing the system to overcool downstairs.'],
            ['Open floor plans', 'Great rooms and open kitchens need carefully placed supply and return grilles. A single central return in a large open space creates dead air zones.'],
          ].map(([title, desc]) => (
            <div key={title as string} style={{ marginBottom: 14 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🔍 Airflow Requirements Calculator</h2>
          <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: '#94a3b8' }}>Home Size (sq ft)</label>
          <input type="number" value={sqft} onChange={e => setSqft(e.target.value)} placeholder="e.g. 2800"
            style={{ background: '#1a2f4a', border: '1px solid #2a4060', borderRadius: 8, color: '#fff', padding: '10px 14px', width: '100%', marginBottom: 16, fontSize: 15, boxSizing: 'border-box' }} />
          <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: '#94a3b8' }}>Number of Stories</label>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            {['1', '2', '3'].map(n => (
              <button key={n} onClick={() => setStories(n)}
                style={{ flex: 1, background: stories === n ? '#F5E642' : '#1a2f4a', color: stories === n ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px', cursor: 'pointer', fontWeight: 700, fontSize: 15 }}>
                {n} {n === '1' ? 'Story' : 'Stories'}
              </button>
            ))}
          </div>
          <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: '#94a3b8' }}>Layout Type</label>
          <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
            {[['traditional', '🏡 Traditional (separate rooms, hallways)'], ['open', '🏠 Open Floor Plan (great room, open kitchen)'], ['vaulted', '🔺 Vaulted/Cathedral Ceilings']].map(([v, l]) => (
              <button key={v} onClick={() => setLayout(v)}
                style={{ background: layout === v ? '#F5E642' : '#1a2f4a', color: layout === v ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontSize: 14, fontWeight: 600 }}>
                {l}
              </button>
            ))}
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 16, cursor: 'pointer', width: '100%' }}>
            Calculate Airflow Requirements →
          </button>
        </div>

        {result && (
          <div style={{ background: '#0f2035', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18, marginBottom: 16 }}>System Airflow Target: {result.cfm}</div>
            {result.challenges.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>⚠️ DFW Challenges for Your Home:</div>
                {result.challenges.map((c, i) => <div key={i} style={{ color: '#94a3b8', fontSize: 14, marginBottom: 6, paddingLeft: 12 }}>{c}</div>)}
              </div>
            )}
            {result.solutions.length > 0 && (
              <div>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>✅ Recommended Solutions:</div>
                {result.solutions.map((s, i) => <div key={i} style={{ color: '#94a3b8', fontSize: 14, marginBottom: 6, paddingLeft: 12 }}>{s}</div>)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
