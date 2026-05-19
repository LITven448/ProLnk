import { useState } from 'react';

const profiles: Record<string, { label: string; priorities: string[] }> = {
  'new-inland': { label: 'New Build, Inland (2010–2026)', priorities: ['Foundation settling yrs 1–7, monitor for cracks', 'Builder-grade HVAC — upgrade filter systems', 'Irrigation startup each spring', 'HOA exterior paint compliance', 'Pest control quarterly in expanding lots'] },
  'new-lake': { label: 'New Build, Lakefront (2010–2026)', priorities: ['Dock and seawall inspection annually', 'Elevated humidity accelerates wood rot', 'HVAC coil corrosion risk near water', 'Foundation settling + soil erosion near shore', 'Waterproofing exterior siding every 3–5 yrs'] },
  'older-inland': { label: 'Older Home, Inland (pre-2010)', priorities: ['Plumbing at 15+ yrs — inspect for leaks', 'HVAC likely at end of life', 'Roof inspection — many hit 20-yr mark', 'Insulation upgrade for energy savings', 'Electrical panel inspection if original'] },
  'older-lake': { label: 'Older Home, Lakefront (pre-2010)', priorities: ['Seawall and dock critical — inspect bi-annually', 'Humidity-driven mold risk in crawl spaces', 'Exterior paint/stain every 2–3 yrs max', 'HVAC with dehumidifier system recommended', 'Foundation drainage away from lake shore'] },
};

export default function LittleElmHomeownerGuide2026() {
  const [age, setAge] = useState('');
  const [lake, setLake] = useState('');
  const key = age && lake ? `${age}-${lake}` : null;
  const profile = key ? profiles[key] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>⛵</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '12px 0 8px' }}>Little Elm TX Homeowner Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15, maxWidth: 560, margin: '0 auto' }}>
            Lake Lewisville waterfront living meets one of DFW's fastest-growing communities. Your maintenance needs depend heavily on age and lake proximity.
          </p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏠 Tell Us About Your Home</h2>
          <div style={{ marginBottom: 14 }}>
            <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Home Age:</p>
            <div style={{ display: 'flex', gap: 10 }}>
              {['new', 'older'].map(v => (
                <button key={v} onClick={() => setAge(v)}
                  style={{ flex: 1, background: age === v ? '#F5E642' : '#1a2f50', color: age === v ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '10px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                  {v === 'new' ? '🆕 Built 2010–2026' : '📅 Built Before 2010'}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Lake Proximity:</p>
            <div style={{ display: 'flex', gap: 10 }}>
              {['lake', 'inland'].map(v => (
                <button key={v} onClick={() => setLake(v)}
                  style={{ flex: 1, background: lake === v ? '#F5E642' : '#1a2f50', color: lake === v ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '10px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                  {v === 'lake' ? '🌊 Lakefront / Near Water' : '🏘️ Interior Neighborhood'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {profile ? (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 14 }}>✅ {profile.label} — Top Priorities</h3>
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              {profile.priorities.map((p, i) => <li key={i} style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 8 }}>{p}</li>)}
            </ul>
          </div>
        ) : (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24, textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>
            Select both options above to see your personalized maintenance profile.
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 32 }}>⚓</div>
          <h3 style={{ color: '#0A1628', fontSize: 18, margin: '8px 0 6px' }}>Little Elm Verified Contractors</h3>
          <p style={{ color: '#1a2f50', fontSize: 13, margin: '0 0 14px' }}>ProLnk connects you with pros who know lakefront and new-build Little Elm challenges.</p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}
