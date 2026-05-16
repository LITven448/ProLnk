import { useState } from 'react';

export default function DFWDrainageSlopingGuide2026() {
  const [challenge, setChallenge] = useState('');
  const [result, setResult] = useState('');

  const challenges = [
    { id: 'pooling-foundation', label: '🏠 Water pools next to foundation after rain' },
    { id: 'pooling-yard', label: '💧 Standing water in yard for 24+ hours' },
    { id: 'clay-heave', label: '🪨 Clay soil heaved grade toward house after dry season' },
    { id: 'new-construction', label: '🏗️ New construction, need to verify builder grading' },
    { id: 'downspout', label: '🌧️ Downspouts discharge near foundation' },
    { id: 'retaining-wall', label: '🧱 Retaining wall creating drainage blockage' },
  ];

  const recommendations: Record<string, string> = {
    'pooling-foundation': '🚨 URGENT — Water pooling at foundation is a direct threat in DFW clay soil. Positive slope of 6 inches over the first 10 feet away from structure is required. Hire a grading contractor to reestablish grade. This is the single most common cause of DFW foundation damage.',
    'pooling-yard': '⚠️ GRADE OR DRAIN — If water sits more than 24 hours after rain, you likely have a low spot. Check with a 4-ft level. Solutions: regrading the low area, installing a French drain, or adding a catch basin. Clay soil drains slowly — some pooling is normal up to 12 hours.',
    'clay-heave': '📐 RECHECK ANNUALLY — DFW clay expands and contracts seasonally. A grade that was correct last fall may pitch toward the house by spring. Use a 4-ft level to verify slope direction every spring and fall. Address heave with topsoil regrading before next wet season.',
    'new-construction': '📋 VERIFY BEFORE CLOSING — Builders are required to provide positive drainage. Use a level to confirm 2% minimum slope (about 1 inch per 5 feet) at all sides. Document any deficiencies in writing before closing — after closing it becomes your liability.',
    'downspout': '🔧 EXTEND IMMEDIATELY — Downspouts should discharge at least 6 feet from foundation. Add flexible extensions or underground pipes to carry water away. In DFW clay, water discharged at foundation concentrates exactly where you do not want moisture.',
    'retaining-wall': '🧱 ASSESS WALL DRAINAGE — Retaining walls must have weep holes or perforated pipe at base to prevent hydrostatic pressure buildup. Blocked drainage behind retaining walls can push walls out or force water toward the structure. Hire a grading contractor for assessment.',
  };

  const handleCheck = () => {
    if (challenge) setResult(recommendations[challenge] || '');
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>DFW Home Guide 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>DFW Positive Drainage Sloping Guide 2026</h1>
        <p style={{ color: '#a0aec0', marginBottom: '2rem', fontSize: '1.05rem' }}>Engineering proper drainage in DFW clay soil. The ADA requires 2% minimum slope away from structures — and DFW clay shifts grade seasonally, making annual checks essential.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '📐', label: 'Minimum Slope', value: '2% (1 in. per 5 ft.)' },
            { icon: '📏', label: 'From Foundation', value: '6 in. over first 10 ft.' },
            { icon: '🪨', label: 'DFW Clay Issue', value: 'Grade shifts each season' },
            { icon: '📅', label: 'Check Frequency', value: 'Spring and fall annually' },
          ].map(item => (
            <div key={item.label} style={{ backgroundColor: '#0f2040', border: '1px solid #1e3a5f', borderRadius: '10px', padding: '1.2rem' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>{item.icon}</div>
              <div style={{ color: '#F5E642', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>{item.label}</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.value}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2040', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>🔍 Drainage Challenge → Grading Solution</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
            {challenges.map(c => (
              <button key={c.id} onClick={() => setChallenge(c.id)}
                style={{ textAlign: 'left', padding: '0.75rem 1rem', borderRadius: '8px', border: challenge === c.id ? '2px solid #F5E642' : '1px solid #1e3a5f', backgroundColor: challenge === c.id ? '#1a3060' : '#0A1628', color: '#fff', cursor: 'pointer', fontSize: '0.9rem' }}>
                {c.label}
              </button>
            ))}
          </div>
          <button onClick={handleCheck} disabled={!challenge}
            style={{ backgroundColor: challenge ? '#F5E642' : '#2a3a50', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: '8px', padding: '0.75rem 1.5rem', cursor: challenge ? 'pointer' : 'not-allowed', fontSize: '0.95rem', width: '100%' }}>
            Get Grading Solution →
          </button>
          {result && (
            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#0A1628', borderRadius: '8px', border: '1px solid #F5E642', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {result}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0f2040', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>🛠️ DIY Level Check</h2>
          <p style={{ color: '#a0aec0', fontSize: '0.88rem', lineHeight: 1.7 }}>Place a 4-ft level on the soil starting at your foundation. The bubble should show the ground sloping away from the house. If it slopes toward the house, call a grading contractor. Cost for regrading a typical DFW lot side: –,500.</p>
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#0f2040', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ color: '#a0aec0', fontSize: '0.8rem' }}>Need a DFW grading contractor? <span style={{ color: '#F5E642', fontWeight: 700 }}>ProLnk</span> connects you with vetted local pros.</p>
        </div>
      </div>
    </div>
  );
}